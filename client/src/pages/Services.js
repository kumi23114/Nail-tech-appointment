import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Heart, Clock, DollarSign, Star } from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('載入服務失敗:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
          <Heart size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#333'
          }}>
            我們的服務
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            專業美甲服務，讓您的美麗從指尖開始
          </p>
        </div>

        <div className="grid grid-3">
          {services.map(service => (
            <div key={service.id} className="card" style={{
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <Heart size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                {service.name}
              </h3>
              <p style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#667eea',
                marginBottom: '1rem'
              }}>
                NT$ {service.price}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
                color: '#666'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Clock size={16} />
                  {service.duration} 分鐘
                </span>
              </div>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
                {service.description}
              </p>
              <Link to="/booking" className="btn btn-primary" style={{ width: '100%' }}>
                立即預約
              </Link>
            </div>
          ))}
        </div>

        {/* 服務特色 */}
        <div style={{ marginTop: '4rem' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#333'
          }}>
            為什麼選擇我們
          </h2>
          
          <div className="grid grid-2">
            <div className="card" style={{ textAlign: 'center' }}>
              <Star size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                專業技術
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                我們的美甲師都經過專業培訓，擁有豐富的經驗和精湛的技術，為您提供最優質的美甲服務。
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <DollarSign size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                合理價格
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                我們提供高品質的美甲服務，價格合理透明，讓您享受專業服務的同時不會有負擔。
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <Clock size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                靈活預約
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                24小時線上預約系統，您可以隨時預約適合的時間，我們會為您安排最合適的美甲師。
              </p>
            </div>
            
            <div className="card" style={{ textAlign: 'center' }}>
              <Heart size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                個人化服務
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                根據您的需求和喜好，我們提供個人化的美甲設計，讓每個客戶都能擁有獨特的美麗。
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '3rem',
          borderRadius: '16px',
          marginTop: '4rem'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            準備好預約您的美甲服務了嗎？
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            立即預約，享受專業美甲服務
          </p>
          <Link to="/booking" className="btn" style={{
            background: 'white',
            color: '#667eea',
            fontSize: '1.1rem',
            padding: '1rem 2rem'
          }}>
            開始預約
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
