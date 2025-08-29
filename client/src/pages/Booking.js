import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';

const Booking = ({ socket }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    techId: '',
    serviceId: '',
    date: new Date(),
    time: '',
    notes: ''
  });

  const [techs, setTechs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  // 載入美甲師和服務數據
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [techsResponse, servicesResponse] = await Promise.all([
          axios.get('/api/techs'),
          axios.get('/api/services')
        ]);
        setTechs(techsResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        toast.error('載入數據失敗');
      }
    };
    fetchData();
  }, []);

  // 當選擇美甲師、服務或日期時，檢查可用時間
  useEffect(() => {
    if (formData.techId && formData.serviceId && formData.date) {
      checkAvailability();
    }
  }, [formData.techId, formData.serviceId, formData.date]);

  // 當選擇服務時，更新選中的服務信息
  useEffect(() => {
    if (formData.serviceId) {
      const service = services.find(s => s.id === formData.serviceId);
      setSelectedService(service);
    }
  }, [formData.serviceId, services]);

  const checkAvailability = async () => {
    if (!formData.techId || !formData.serviceId || !formData.date) return;

    const service = services.find(s => s.id === formData.serviceId);
    if (!service) return;

    const selectedTech = techs.find(t => t.id === formData.techId);
    if (!selectedTech) return;

    const times = [];
    const workStart = parseInt(selectedTech.workingHours.start.split(':')[0]);
    const workEnd = parseInt(selectedTech.workingHours.end.split(':')[0]);
    const breakStart = parseInt(selectedTech.breakTime.split('-')[0].split(':')[0]);
    const breakEnd = parseInt(selectedTech.breakTime.split('-')[1].split(':')[0]);

    // 生成時間選項
    for (let hour = workStart; hour < workEnd; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // 跳過休息時間
        if (hour >= breakStart && hour < breakEnd) continue;
        
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }

    // 檢查每個時間的可用性
    const availableTimes = [];
    for (const time of times) {
      try {
        const response = await axios.post('/api/check-availability', {
          techId: formData.techId,
          date: formData.date.toISOString().split('T')[0],
          time: time,
          duration: service.duration
        });
        
        if (response.data.available) {
          availableTimes.push(time);
        }
      } catch (error) {
        console.error('檢查可用性失敗:', error);
      }
    }

    setAvailableTimes(availableTimes);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date: date,
      time: '' // 重置時間選擇
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const appointmentData = {
        ...formData,
        date: formData.date.toISOString().split('T')[0]
      };

      const response = await axios.post('/api/appointments', appointmentData);
      
      toast.success('預約成功！我們會盡快與您聯繫確認。');
      
      // 重置表單
      setFormData({
        customerName: '',
        phone: '',
        email: '',
        techId: '',
        serviceId: '',
        date: new Date(),
        time: '',
        notes: ''
      });
      setAvailableTimes([]);
      setSelectedService(null);
      
    } catch (error) {
      const message = error.response?.data?.error || '預約失敗，請稍後再試';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return formData.customerName && 
           formData.phone && 
           formData.techId && 
           formData.serviceId && 
           formData.date && 
           formData.time;
  };

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Calendar size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#333'
          }}>
            預約美甲服務
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            選擇您喜歡的美甲師和服務，我們會為您安排最佳時間
          </p>
        </div>

        <div className="grid grid-2">
          {/* 預約表單 */}
          <div className="card">
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#333'
            }}>
              預約信息
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* 客戶信息 */}
              <div className="form-group">
                <label className="form-label">
                  <User size={16} style={{ marginRight: '8px' }} />
                  姓名 *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="請輸入您的姓名"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={16} style={{ marginRight: '8px' }} />
                  電話 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="請輸入您的電話號碼"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} style={{ marginRight: '8px' }} />
                  電子郵件
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="請輸入您的電子郵件（選填）"
                />
              </div>

              {/* 服務選擇 */}
              <div className="form-group">
                <label className="form-label">選擇美甲師 *</label>
                <select
                  name="techId"
                  value={formData.techId}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">請選擇美甲師</option>
                  {techs.map(tech => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name} - {tech.specialties.join(', ')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">選擇服務 *</label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                >
                  <option value="">請選擇服務</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - NT$ {service.price} ({service.duration}分鐘)
                    </option>
                  ))}
                </select>
              </div>

              {/* 日期和時間選擇 */}
              <div className="form-group">
                <label className="form-label">選擇日期 *</label>
                <DatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                  className="form-input"
                  placeholderText="選擇日期"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock size={16} style={{ marginRight: '8px' }} />
                  選擇時間 *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-select"
                  required
                  disabled={availableTimes.length === 0}
                >
                  <option value="">
                    {availableTimes.length === 0 ? '請先選擇美甲師、服務和日期' : '請選擇時間'}
                  </option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {availableTimes.length > 0 && (
                  <small style={{ color: '#28a745', marginTop: '5px', display: 'block' }}>
                    可用時間：{availableTimes.length} 個時段
                  </small>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MessageSquare size={16} style={{ marginRight: '8px' }} />
                  備註
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="請輸入特殊需求或備註（選填）"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isFormValid() || loading}
                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
              >
                {loading ? '預約中...' : '確認預約'}
              </button>
            </form>
          </div>

          {/* 預約摘要 */}
          <div className="card">
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#333'
            }}>
              預約摘要
            </h2>

            {selectedService && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  選擇的服務
                </h3>
                <div style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {selectedService.name}
                  </p>
                  <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    NT$ {selectedService.price}
                  </p>
                  <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                    時長：{selectedService.duration} 分鐘
                  </p>
                  <p style={{ color: '#666' }}>
                    {selectedService.description}
                  </p>
                </div>
              </div>
            )}

            {formData.techId && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  選擇的美甲師
                </h3>
                {(() => {
                  const tech = techs.find(t => t.id === formData.techId);
                  return tech ? (
                    <div style={{
                      background: '#f8f9fa',
                      padding: '1rem',
                      borderRadius: '8px'
                    }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {tech.name}
                      </p>
                      <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                        專長：{tech.specialties.join(', ')}
                      </p>
                      <p style={{ color: '#666' }}>
                        工作時間：{tech.workingHours.start} - {tech.workingHours.end}
                      </p>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {formData.date && formData.time && (
              <div>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  預約時間
                </h3>
                <div style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {formData.date.toLocaleDateString('zh-TW')}
                  </p>
                  <p style={{ color: '#667eea', fontWeight: 'bold' }}>
                    {formData.time}
                  </p>
                </div>
              </div>
            )}

            <div style={{
              background: '#e8f5e8',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '2rem',
              border: '1px solid #c3e6cb'
            }}>
              <h4 style={{
                color: '#155724',
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                預約須知
              </h4>
              <ul style={{ color: '#155724', fontSize: '0.9rem', lineHeight: '1.5' }}>
                <li>請提前 10 分鐘到達</li>
                <li>如需取消，請提前 24 小時通知</li>
                <li>預約確認後會收到簡訊通知</li>
                <li>請攜帶有效身份證件</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
