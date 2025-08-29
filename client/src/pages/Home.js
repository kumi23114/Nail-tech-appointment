import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Star, Users, Sparkles, Heart } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Calendar size={48} color="#667eea" />,
      title: '線上預約',
      description: '24小時隨時預約，方便快捷'
    },
    {
      icon: <Clock size={48} color="#667eea" />,
      title: '即時通知',
      description: '預約確認和提醒通知'
    },
    {
      icon: <Star size={48} color="#667eea" />,
      title: '專業服務',
      description: '經驗豐富的美甲師團隊'
    },
    {
      icon: <Users size={48} color="#667eea" />,
      title: '個人化服務',
      description: '根據需求定制美甲設計'
    }
  ];

  const services = [
    {
      name: '基礎美甲',
      price: 'NT$ 300',
      duration: '60分鐘',
      description: '基礎指甲護理和上色'
    },
    {
      name: '法式美甲',
      price: 'NT$ 500',
      duration: '90分鐘',
      description: '經典法式美甲設計'
    },
    {
      name: '水晶甲',
      price: 'NT$ 800',
      duration: '120分鐘',
      description: '水晶甲延長和設計'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ marginBottom: '2rem' }}>
            <Sparkles size={64} color="#667eea" style={{ marginBottom: '1rem' }} />
            <h1 style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              專業美甲預約系統
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              享受專業美甲服務，輕鬆預約您的美甲師。我們的系統提供即時通知和自動可用性檢查，讓您的預約體驗更加順暢。
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/booking" className="btn btn-primary">
                立即預約
              </Link>
              <Link to="/services" className="btn btn-secondary">
                查看服務
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#333'
          }}>
            為什麼選擇我們
          </h2>
          <div className="grid grid-2">
            {features.map((feature, index) => (
              <div key={index} className="card" style={{ textAlign: 'center' }}>
                <div style={{ marginBottom: '1rem' }}>
                  {feature.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
      }}>
        <div className="container">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#333'
          }}>
            熱門服務
          </h2>
          <div className="grid grid-3">
            {services.map((service, index) => (
              <div key={index} className="card" style={{
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                <Heart size={32} color="#667eea" style={{ marginBottom: '1rem' }} />
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: '#333'
                }}>
                  {service.name}
                </h3>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#667eea',
                  marginBottom: '0.5rem'
                }}>
                  {service.price}
                </p>
                <p style={{
                  color: '#666',
                  marginBottom: '1rem',
                  fontSize: '0.9rem'
                }}>
                  {service.duration}
                </p>
                <p style={{ color: '#666', lineHeight: '1.6' }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn btn-primary">
              查看所有服務
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            準備好預約您的美甲服務了嗎？
          </h2>
          <p style={{
            fontSize: '1.2rem',
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
      </section>
    </div>
  );
};

export default Home;
