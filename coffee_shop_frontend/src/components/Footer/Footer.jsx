import React from 'react'
import { Layout, Row, Col, Space, Button, Typography, Divider, Select } from 'antd'
import { PhoneFilled, MessageFilled, EnvironmentFilled, MailFilled, ClockCircleFilled, CarFilled, InfoCircleFilled, LockFilled, FileTextFilled, GlobalOutlined, DollarOutlined, ArrowRightOutlined, FacebookFilled, InstagramFilled, TwitterOutlined } from '@ant-design/icons'
import logo from '../../assets/images/logo.webp'
const { Footer: AntFooter } = Layout
const { Title, Text, Link } = Typography

function AppFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <AntFooter style={{
  
      backgroundSize: 'cover',
      color: '#1f2937',
      padding: '48px 16px 16px',
      borderTop: '1px solid rgba(2,6,23,0.08)',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 8px', 
      }}>
        <Row
          gutter={[
            { xs: 16, sm: 24, md: 24 },
            { xs: 24, sm: 32, md: 32 }
          ]}
          justify="center"
          align="top"
        >
          {/* Cột 1: Logo, Tên quán cafe, Nút đặt hàng, QR */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Space orientation="vertical" size={16} style={{ width: '100%' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer'
              }} onClick={() => window.location.href = '/'}>
                <img
                  src={logo}
                  alt="Yanie & Friends"
                  style={{
                    width: window.innerWidth < 768 ? 60 : 100,
                    height: window.innerWidth < 768 ? 60 : 100
                  }}
                />
                <div>
                  <Title
                    level={4}
                    style={{
                      color: '#0f172a',
                      margin: 0,
                      fontSize: window.innerWidth < 768 ? '16px' : '18px'
                    }}
                  >
                    Yanie & Friends
                  </Title>
                  <Text style={{ color: '#64748b', fontSize: '14px' }}>Nơi những câu chuyện được tạo nên.</Text>
                </div>
              </div>

              <a href="/orders" style={{ width: '100%', display: 'block' }}>
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  size="large"
                  style={{
                    width: window.innerWidth < 768 ? '100%' : '70%',
                    height: '48px',
                    fontSize: window.innerWidth < 768 ? '14px' : '16px'
                  }}
                >
                  Khám phá
                </Button>
              </a>

            </Space>
          </Col>

          {/* Cột 2: Liên hệ */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Title
              level={4}
              style={{
                color: '#0f172a',
                marginTop: 0,
                marginBottom: 16,
                fontSize: window.innerWidth < 768 ? '16px' : '18px'
              }}
            >
              Liên hệ
            </Title>
            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <PhoneFilled style={{ color: '#000'}} />
                <a href="tel:0367552043" style={{ color: '#000' }}>
                  Hotline: 0367 552 043
                </a>
              </div>

              <div
              >
                <MailFilled style={{ color: '#000', marginRight: 8 }} />
                <a href="mailto:yanieandfriends@gmail.com" style={{ color: '#334155' }}>
                  yanieandfriends@gmail.com
                </a>
              </div>

              <div>
                <EnvironmentFilled style={{ color: '#64748b', marginRight: 8 }} />
                <Text style={{ color: '#334155' }}>
                  Nguyễn Văn Bảo/ 12 Đ. Hạnh Thông, Phường, Gò Vấp, Thành phố Hồ Chí Minh
                </Text>
              </div>

              <div>
                <GlobalOutlined style={{ color: '#000', marginRight: 8 }} />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+C%C3%B4ng+nghi%E1%BB%87p+TP.HCM/@10.8221642,106.6842705,17z/data=!3m1!4b1!4m6!3m5!1s0x3174deb3ef536f31:0x8b7bb8b7c956157b!8m2!3d10.8221589!4d106.6868454!16s%2Fm%2F02pyzdj?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
                  style={{ color: '#334155' }}
                >
                  Xem bản đồ
                </a>
              </div>
            </Space>
          </Col>

          {/* Cột 3: Hỗ trợ & Chính sách */}
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <Title
              level={4}
              style={{
                color: '#0f172a',
                marginTop: 0,
                marginBottom: 16,
                fontSize: window.innerWidth < 768 ? '16px' : '18px'
              }}
            >
              Hỗ trợ & Chính sách
            </Title>
            <Space orientation="vertical" size={8} style={{ width: '100%' }}>
              <a href="/faq" style={{ color: '#334155', display: 'block' }}>
                <InfoCircleFilled style={{ marginRight: 8, color: '#64748b' }} />
                Câu hỏi thường gặp
              </a>

              <a href="/privacy-policy" style={{ color: '#334155', display: 'block' }}>
                <LockFilled style={{ marginRight: 8, color: '#64748b' }} />
                Bảo mật dữ liệu cá nhân
              </a>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: 'rgba(2,6,23,0.08)', margin: '24px 0' }} />

        {/* Bottom bar */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12} style={{ textAlign: 'center' }}>
            <Text style={{ color: '#334155' }}>© {currentYear} Yanie & Friends. All rights reserved.</Text>
          </Col>
          <Col ></Col>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:opacity-80 transition">
                <FacebookFilled style={{ fontSize: 20 }} />
                </a>
                <a href="#" className="hover:opacity-80 transition">
                <InstagramFilled style={{ fontSize: 20 }} />
                </a>
                <a href="#" className="hover:opacity-80 transition">
                <TwitterOutlined style={{ fontSize: 20 }} />
                </a>
            </div>
          <Col xs={24} md={12} style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
            <a href="/terms-of-service" style={{ color: '#1d4ed8' }}>Điều khoản</a>
            <a href="/privacy-policy" style={{ color: '#1d4ed8' }}>Bảo mật</a>
            <a href="/cookie-policy" style={{ color: '#1d4ed8' }}>Cookie</a>
        
          </Col>
        </Row>
      </div>
    </AntFooter>
  )
}

export default AppFooter