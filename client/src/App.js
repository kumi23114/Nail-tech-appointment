import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

// 組件導入
import Header from './components/Header';
import Home from './pages/Home';
import Booking from './pages/Booking';
import TechDashboard from './pages/TechDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Services from './pages/Services';
import About from './pages/About';

// Socket.IO 連接
const socket = io('http://localhost:5000');

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 監聽新預約通知
    socket.on('newAppointment', (data) => {
      toast.success(`新預約：${data.appointment.customerName} - ${data.appointment.serviceName}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setNotifications(prev => [...prev, data]);
    });

    // 監聽預約更新通知
    socket.on('appointmentUpdated', (appointment) => {
      toast.info(`預約已更新：${appointment.customerName}`, {
        position: "top-right",
        autoClose: 3000,
      });
    });

    // 監聽預約取消通知
    socket.on('appointmentCancelled', (appointment) => {
      toast.warning(`預約已取消：${appointment.customerName}`, {
        position: "top-right",
        autoClose: 3000,
      });
    });

    // 監聽美甲師狀態變化
    socket.on('techStatusChanged', (data) => {
      const statusText = data.status === 'online' ? '上線' : '離線';
      toast.info(`美甲師 ${data.techId} 已${statusText}`, {
        position: "top-right",
        autoClose: 2000,
      });
    });

    return () => {
      socket.off('newAppointment');
      socket.off('appointmentUpdated');
      socket.off('appointmentCancelled');
      socket.off('techStatusChanged');
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking socket={socket} />} />
          <Route path="/tech-dashboard" element={<TechDashboard socket={socket} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard socket={socket} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
