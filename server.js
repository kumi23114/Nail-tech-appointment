const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 中間件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// 數據存儲（在實際應用中應該使用數據庫）
let appointments = [];
let nailTechs = [
  {
    id: 'tech1',
    name: '張美甲師',
    email: 'tech1@nailstudio.com',
    specialties: ['法式美甲', '水晶甲', '光療甲'],
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    breakTime: '12:00-13:00'
  },
  {
    id: 'tech2',
    name: '李美甲師',
    email: 'tech2@nailstudio.com',
    specialties: ['手繪美甲', '3D美甲', '漸變美甲'],
    workingHours: {
      start: '10:00',
      end: '19:00'
    },
    breakTime: '13:00-14:00'
  }
];

let services = [
  {
    id: 'service1',
    name: '基礎美甲',
    duration: 60,
    price: 300,
    description: '基礎指甲護理和上色'
  },
  {
    id: 'service2',
    name: '法式美甲',
    duration: 90,
    price: 500,
    description: '經典法式美甲設計'
  },
  {
    id: 'service3',
    name: '水晶甲',
    duration: 120,
    price: 800,
    description: '水晶甲延長和設計'
  },
  {
    id: 'service4',
    name: '手繪美甲',
    duration: 90,
    price: 600,
    description: '個性化手繪設計'
  }
];

// 檢查可用性函數
function checkAvailability(techId, date, time, duration) {
  const requestedStart = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
  const requestedEnd = requestedStart.clone().add(duration, 'minutes');
  
  // 檢查工作時間
  const tech = nailTechs.find(t => t.id === techId);
  if (!tech) return false;
  
  const workStart = moment(`${date} ${tech.workingHours.start}`, 'YYYY-MM-DD HH:mm');
  const workEnd = moment(`${date} ${tech.workingHours.end}`, 'YYYY-MM-DD HH:mm');
  
  if (requestedStart.isBefore(workStart) || requestedEnd.isAfter(workEnd)) {
    return false;
  }
  
  // 檢查休息時間
  const breakStart = moment(`${date} ${tech.breakTime.split('-')[0]}`, 'YYYY-MM-DD HH:mm');
  const breakEnd = moment(`${date} ${tech.breakTime.split('-')[1]}`, 'YYYY-MM-DD HH:mm');
  
  if (requestedStart.isBefore(breakEnd) && requestedEnd.isAfter(breakStart)) {
    return false;
  }
  
  // 檢查現有預約衝突
  const conflictingAppointments = appointments.filter(apt => 
    apt.techId === techId && 
    apt.date === date &&
    apt.status !== 'cancelled'
  );
  
  for (let apt of conflictingAppointments) {
    const aptStart = moment(`${apt.date} ${apt.time}`, 'YYYY-MM-DD HH:mm');
    const aptEnd = aptStart.clone().add(apt.duration, 'minutes');
    
    if (requestedStart.isBefore(aptEnd) && requestedEnd.isAfter(aptStart)) {
      return false;
    }
  }
  
  return true;
}

// 發送通知函數
function sendNotification(appointment) {
  const tech = nailTechs.find(t => t.id === appointment.techId);
  
  // 通過 Socket.IO 發送實時通知
  io.emit('newAppointment', {
    appointment,
    tech: tech.name,
    message: `新預約：${appointment.customerName} - ${appointment.serviceName}`
  });
  
  // 發送郵件通知（需要配置 SMTP）
  // sendEmailNotification(appointment, tech);
}

// 郵件通知函數（需要配置 SMTP 服務器）
function sendEmailNotification(appointment, tech) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-app-password'
    }
  });
  
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: tech.email,
    subject: '新預約通知',
    html: `
      <h2>新預約通知</h2>
      <p>客戶：${appointment.customerName}</p>
      <p>服務：${appointment.serviceName}</p>
      <p>日期：${appointment.date}</p>
      <p>時間：${appointment.time}</p>
      <p>電話：${appointment.phone}</p>
    `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('郵件發送失敗:', error);
    } else {
      console.log('郵件發送成功:', info.response);
    }
  });
}

// API 路由

// 獲取所有美甲師
app.get('/api/techs', (req, res) => {
  res.json(nailTechs);
});

// 獲取所有服務
app.get('/api/services', (req, res) => {
  res.json(services);
});

// 獲取預約
app.get('/api/appointments', (req, res) => {
  const { techId, date } = req.query;
  let filteredAppointments = appointments;
  
  if (techId) {
    filteredAppointments = filteredAppointments.filter(apt => apt.techId === techId);
  }
  
  if (date) {
    filteredAppointments = filteredAppointments.filter(apt => apt.date === date);
  }
  
  res.json(filteredAppointments);
});

// 檢查可用性
app.post('/api/check-availability', (req, res) => {
  const { techId, date, time, duration } = req.body;
  
  if (!techId || !date || !time || !duration) {
    return res.status(400).json({ error: '缺少必要參數' });
  }
  
  const isAvailable = checkAvailability(techId, date, time, duration);
  res.json({ available: isAvailable });
});

// 創建預約
app.post('/api/appointments', (req, res) => {
  const {
    customerName,
    phone,
    email,
    techId,
    serviceId,
    date,
    time,
    notes
  } = req.body;
  
  if (!customerName || !phone || !techId || !serviceId || !date || !time) {
    return res.status(400).json({ error: '缺少必要參數' });
  }
  
  const service = services.find(s => s.id === serviceId);
  if (!service) {
    return res.status(400).json({ error: '服務不存在' });
  }
  
  // 檢查可用性
  if (!checkAvailability(techId, date, time, service.duration)) {
    return res.status(400).json({ error: '該時段不可用' });
  }
  
  const appointment = {
    id: uuidv4(),
    customerName,
    phone,
    email,
    techId,
    serviceId,
    serviceName: service.name,
    date,
    time,
    duration: service.duration,
    price: service.price,
    notes,
    status: 'confirmed',
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
  };
  
  appointments.push(appointment);
  
  // 發送通知
  sendNotification(appointment);
  
  res.status(201).json(appointment);
});

// 更新預約狀態
app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const appointment = appointments.find(apt => apt.id === id);
  if (!appointment) {
    return res.status(404).json({ error: '預約不存在' });
  }
  
  appointment.status = status;
  appointment.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
  
  // 發送狀態更新通知
  io.emit('appointmentUpdated', appointment);
  
  res.json(appointment);
});

// 取消預約
app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  
  const appointmentIndex = appointments.findIndex(apt => apt.id === id);
  if (appointmentIndex === -1) {
    return res.status(404).json({ error: '預約不存在' });
  }
  
  appointments[appointmentIndex].status = 'cancelled';
  appointments[appointmentIndex].updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
  
  // 發送取消通知
  io.emit('appointmentCancelled', appointments[appointmentIndex]);
  
  res.json({ message: '預約已取消' });
});

// Socket.IO 連接處理
io.on('connection', (socket) => {
  console.log('客戶端已連接:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('客戶端已斷開:', socket.id);
  });
  
  // 美甲師上線通知
  socket.on('techOnline', (techId) => {
    socket.broadcast.emit('techStatusChanged', { techId, status: 'online' });
  });
  
  // 美甲師離線通知
  socket.on('techOffline', (techId) => {
    socket.broadcast.emit('techStatusChanged', { techId, status: 'offline' });
  });
});

// 處理 React 路由
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`服務器運行在端口 ${PORT}`);
  console.log(`美甲師預約系統已啟動`);
});
