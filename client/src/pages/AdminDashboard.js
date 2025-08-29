import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BarChart3, Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = ({ socket }) => {
  const [appointments, setAppointments] = useState([]);
  const [techs, setTechs] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalRevenue: 0,
    completedAppointments: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appointmentsRes, techsRes, servicesRes] = await Promise.all([
        axios.get('/api/appointments'),
        axios.get('/api/techs'),
        axios.get('/api/services')
      ]);

      setAppointments(appointmentsRes.data);
      setTechs(techsRes.data);
      setServices(servicesRes.data);

      // 計算統計數據
      const today = new Date().toISOString().split('T')[0];
      const todayAppointments = appointmentsRes.data.filter(apt => apt.date === today);
      const completedAppointments = appointmentsRes.data.filter(apt => apt.status === 'completed');
      const totalRevenue = completedAppointments.reduce((sum, apt) => sum + apt.price, 0);

      setStats({
        totalAppointments: appointmentsRes.data.length,
        todayAppointments: todayAppointments.length,
        totalRevenue,
        completedAppointments: completedAppointments.length
      });

    } catch (error) {
      toast.error('載入數據失敗');
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="loading">載入中...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <BarChart3 size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#333'
          }}>
            管理員儀表板
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            查看系統概況和預約統計
          </p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-2" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <Calendar size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              {stats.totalAppointments}
            </h3>
            <p style={{ color: '#666' }}>總預約數</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Users size={48} color="#28a745" style={{ marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              {stats.todayAppointments}
            </h3>
            <p style={{ color: '#666' }}>今日預約</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <DollarSign size={48} color="#ffc107" style={{ marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              NT$ {stats.totalRevenue.toLocaleString()}
            </h3>
            <p style={{ color: '#666' }}>總營收</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <TrendingUp size={48} color="#17a2b8" style={{ marginBottom: '1rem' }} />
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              {stats.completedAppointments}
            </h3>
            <p style={{ color: '#666' }}>已完成</p>
          </div>
        </div>

        {/* 美甲師統計 */}
        <div className="card mb-20">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#333'
          }}>
            美甲師統計
          </h2>
          
          <div className="grid grid-2">
            {techs.map(tech => {
              const techAppointments = appointments.filter(apt => apt.techId === tech.id);
              const techCompleted = techAppointments.filter(apt => apt.status === 'completed');
              const techRevenue = techCompleted.reduce((sum, apt) => sum + apt.price, 0);
              
              return (
                <div key={tech.id} style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  background: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#333'
                  }}>
                    {tech.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666' }}>總預約：</span>
                    <span style={{ fontWeight: 'bold' }}>{techAppointments.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666' }}>已完成：</span>
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>{techCompleted.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666' }}>營收：</span>
                    <span style={{ fontWeight: 'bold', color: '#667eea' }}>NT$ {techRevenue.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>專長：</span>
                    <span style={{ fontSize: '0.9rem', color: '#666' }}>{tech.specialties.join(', ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 服務統計 */}
        <div className="card mb-20">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#333'
          }}>
            服務統計
          </h2>
          
          <div className="grid grid-2">
            {services.map(service => {
              const serviceAppointments = appointments.filter(apt => apt.serviceId === service.id);
              const serviceCompleted = serviceAppointments.filter(apt => apt.status === 'completed');
              const serviceRevenue = serviceCompleted.reduce((sum, apt) => sum + apt.price, 0);
              
              return (
                <div key={service.id} style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  background: 'white'
                }}>
                  <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#333'
                  }}>
                    {service.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666' }}>總預約：</span>
                    <span style={{ fontWeight: 'bold' }}>{serviceAppointments.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666' }}>已完成：</span>
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>{serviceCompleted.length}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#666' }}>營收：</span>
                    <span style={{ fontWeight: 'bold', color: '#667eea' }}>NT$ {serviceRevenue.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>單價：</span>
                    <span style={{ fontWeight: 'bold' }}>NT$ {service.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 最近預約 */}
        <div className="card">
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#333'
          }}>
            最近預約
          </h2>
          
          {appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              暫無預約記錄
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.slice(0, 10).map(appointment => (
                <div
                  key={appointment.id}
                  style={{
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    padding: '1rem',
                    background: 'white'
                  }}
                >
                  <div className="flex flex-between" style={{ alignItems: 'center' }}>
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        color: '#333'
                      }}>
                        {appointment.customerName}
                      </h4>
                      <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                        {appointment.serviceName} - NT$ {appointment.price}
                      </p>
                      <p style={{ color: '#666', fontSize: '0.9rem' }}>
                        {appointment.date} {appointment.time}
                      </p>
                    </div>
                    
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
