import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Users, Award, MapPin, Phone, Mail } from 'lucide-react';

const About = () => {
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
            關於我們
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            專業美甲服務，讓每個客戶都能擁有美麗的指尖
          </p>
        </div>

        {/* 公司介紹 */}
        <div className="card mb-20">
          <div className="grid grid-2">
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: '#333'
              }}>
                我們的故事
              </h2>
              <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem' }}>
                我們是一家專業的美甲工作室，致力於為客戶提供最優質的美甲服務。自成立以來，
                我們一直秉持著「專業、品質、服務」的理念，為每一位客戶打造獨特的美麗。
              </p>
              <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1rem' }}>
                我們的美甲師都經過嚴格的專業培訓，擁有豐富的經驗和精湛的技術。
                我們使用高品質的美甲產品，確保每一位客戶都能享受到安全、舒適的美甲服務。
              </p>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                我們相信，美麗從指尖開始。讓我們一起創造屬於您的獨特美麗。
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              padding: '2rem',
              color: 'white',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                我們的使命
              </h3>
              <p style={{ lineHeight: '1.6', opacity: 0.9 }}>
                為每一位客戶提供專業、安全、舒適的美甲服務，
                讓美麗從指尖綻放，讓自信從內心升起。
              </p>
            </div>
          </div>
        </div>

        {/* 我們的優勢 */}
        <div className="card mb-20">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#333'
          }}>
            我們的優勢
          </h2>
          
          <div className="grid grid-2">
            <div style={{ textAlign: 'center' }}>
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
                我們的美甲師都經過專業培訓，擁有豐富的經驗和精湛的技術，
                能夠為您提供各種風格的美甲服務。
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Award size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                品質保證
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                我們使用高品質的美甲產品，確保每一位客戶都能享受到
                安全、舒適、持久的美甲服務。
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Users size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                貼心服務
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                我們提供24小時線上預約服務，靈活的時間安排，
                讓您能夠輕鬆預約適合的時間。
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Heart size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                個人化設計
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                根據您的需求和喜好，我們提供個人化的美甲設計，
                讓每個客戶都能擁有獨特的美麗。
              </p>
            </div>
          </div>
        </div>

        {/* 聯繫信息 */}
        <div className="card mb-20">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#333'
          }}>
            聯繫我們
          </h2>
          
          <div className="grid grid-3">
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                地址
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                台北市信義區信義路五段7號<br />
                台北101大樓
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Phone size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                電話
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                02-2345-6789<br />
                服務時間：09:00-21:00
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Mail size={48} color="#667eea" style={{ marginBottom: '1rem' }} />
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                電子郵件
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                info@nailstudio.com<br />
                我們會盡快回覆您
              </p>
            </div>
          </div>
        </div>

        {/* 營業時間 */}
        <div className="card mb-20">
          <h2 style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '3rem',
            color: '#333'
          }}>
            營業時間
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '2rem'
          }}>
            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '200px'
            }}>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                週一至週五
              </h4>
              <p style={{ color: '#666' }}>09:00 - 21:00</p>
            </div>
            
            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '200px'
            }}>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                週六至週日
              </h4>
              <p style={{ color: '#666' }}>10:00 - 20:00</p>
            </div>
            
            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '200px'
            }}>
              <h4 style={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                國定假日
              </h4>
              <p style={{ color: '#666' }}>10:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center',
          padding: '3rem',
          borderRadius: '16px'
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

export default About;
