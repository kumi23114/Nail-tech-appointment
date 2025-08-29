import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const TechDashboard = ({ socket }) => {
  const [appointments, setAppointments] = useState([]);
  const [techs, setTechs] = useState([]);
  const [selectedTech, setSelectedTech] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState({});

  // 載入美甲師數據
  useEffect(() => {
    const fetchTechs = async () => {
      try {
        const response = await axios.get('/api/techs');
        setTechs(response.data);
        if (response.data.length > 0) {
          setSelectedTech(response.data[0].id);
        }
      } catch (error) {
        toast.error('載入美甲師數據失敗');
      }
    };
    fetchTechs();
  }, []);

  // 載入預約數據
  useEffect(() => {
    if (selectedTech) {
      fetchAppointments();
    }
  }, [selectedTech, selectedDate]);

  // Socket.IO 監聽
  useEffect(() => {
    if (socket) {
      socket.on('newAppointment', (data) => {
        if (data.appointment.techId === selectedTech) {
          fetchAppointments(); // 重新載入預約
        }
      });

      socket.on('appointmentUpdated', (appointment) => {
        if (appointment.techId === selectedTech) {
          fetchAppointments(); // 重新載入預約
        }
      });

      socket.on('appointmentCancelled', (appointment) => {
        if (appointment.techId === selectedTech) {
          fetchAppointments(); // 重新載入預約
        }
      });

      return () => {
        socket.off('newAppointment');
        socket.off('appointmentUpdated');
        socket.off('appointmentCancelled');
      };
    }
  }, [socket, selectedTech]);

  const fetchAppointments = async () => {
    if (!selectedTech) return;
    
    setLoading(true);
    try {
      const response = await axios.get('/api/appointments', {
        params: {
          techId: selectedTech,
          date: selectedDate.toISOString().split('T')[0]
        }
      });
      setAppointments(response.data);
    } catch (error) {
      toast.error('載入預約數據失敗');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await axios.put(`/api/appointments/${appointmentId}`, {
        status: newStatus
      });
      
      toast.success('預約狀態已更新');
      fetchAppointments(); // 重新載入預約
    } catch (error) {
      toast.error('更新預約狀態失敗');
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm('確定要取消這個預約嗎？')) {
      try {
        await axios.delete(`/api/appointments/${appointmentId}`);
        toast.success('預約已取消');
        fetchAppointments(); // 重新載入預約
      } catch (error) {
        toast.error('取消預約失敗');
      }
    }
  };

  const toggleOnlineStatus = (techId) => {
    const newStatus = !onlineStatus[techId];
    setOnlineStatus(prev => ({
      ...prev,
      [techId]: newStatus
    }));

    if (socket) {
      if (newStatus) {
        socket.emit('techOnline', techId);
      } else {
        socket.emit('techOffline', techId);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return '#28a745';
      case 'completed':
        return '#17a2b8';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#ffc107';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return '已確認';
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return '待確認';
    }
  };

  const filteredAppointments = appointments.filter(apt => apt.status !== 'cancelled');

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
            美甲師工作面板
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            管理您的預約和客戶信息
          </p>
        </div>

        {/* 美甲師選擇和狀態控制 */}
        <div className="card mb-20">
          <div className="flex flex-between" style={{ alignItems: 'center' }}>
            <div>
              <label className="form-label">選擇美甲師</label>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="form-select"
                style={{ width: 'auto', minWidth: '200px' }}
              >
                {techs.map(tech => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>在線狀態：</span>
              <button
                onClick={() => toggleOnlineStatus(selectedTech)}
                className="btn"
                style={{
                  background: onlineStatus[selectedTech] ? '#28a745' : '#dc3545',
                  color: 'white',
                  padding: '0.5rem 1rem'
                }}
              >
                {onlineStatus[selectedTech] ? '在線' : '離線'}
              </button>
            </div>
          </div>
        </div>

        {/* 日期選擇 */}
        <div className="card mb-20">
          <div className="flex flex-between" style={{ alignItems: 'center' }}>
            <div>
              <label className="form-label">選擇日期</label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="form-input"
                style={{ width: 'auto' }}
              />
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                今日預約：{filteredAppointments.length} 個
              </p>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                {selectedDate.toLocaleDateString('zh-TW', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* 預約列表 */}
        <div className="card">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#333'
          }}>
            預約列表
          </h2>

          {loading ? (
            <div className="loading">載入中...</div>
          ) : filteredAppointments.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#666'
            }}>
              <Calendar size={64} color="#ccc" style={{ marginBottom: '1rem' }} />
              <p>今日沒有預約</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  style={{
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    background: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                >
                  <div className="flex flex-between" style={{ alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        color: '#333'
                      }}>
                        {appointment.customerName}
                      </h3>
                      <p style={{ color: '#667eea', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        {appointment.serviceName} - NT$ {appointment.price}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
                          <Clock size={16} />
                          {appointment.time} ({appointment.duration}分鐘)
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        background: getStatusColor(appointment.status),
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                      }}>
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    background: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={16} color="#666" />
                        <span style={{ color: '#666' }}>{appointment.phone}</span>
                      </div>
                      {appointment.email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Mail size={16} color="#666" />
                          <span style={{ color: '#666' }}>{appointment.email}</span>
                        </div>
                      )}
                    </div>
                    {appointment.notes && (
                      <div style={{ marginTop: '0.5rem', color: '#666' }}>
                        <strong>備註：</strong> {appointment.notes}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    {appointment.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'completed')}
                          className="btn"
                          style={{
                            background: '#17a2b8',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                          }}
                        >
                          <CheckCircle size={16} style={{ marginRight: '0.5rem' }} />
                          標記完成
                        </button>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="btn btn-danger"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        >
                          <XCircle size={16} style={{ marginRight: '0.5rem' }} />
                          取消預約
                        </button>
                      </>
                    )}
                    {appointment.status === 'completed' && (
                      <span style={{ color: '#17a2b8', fontWeight: 'bold' }}>
                        ✓ 服務已完成
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechDashboard;
