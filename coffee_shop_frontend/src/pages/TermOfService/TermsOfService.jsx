import React from 'react'
import { Typography, Row, Col, Divider, Card, Space, Grid } from 'antd'
import { 
  SafetyCertificateOutlined, 
  FileTextOutlined, 
  UserOutlined, 
  CreditCardOutlined,
  ShoppingOutlined,
  WarningOutlined,
  CopyrightOutlined,
  LockOutlined,
  EditOutlined,
  GlobalOutlined,
  PhoneOutlined,
  CoffeeOutlined
} from '@ant-design/icons'
import './TermsOfService.css'

const { Title, Paragraph, Text } = Typography
const { useBreakpoint } = Grid

const TermsOfService = () => {
  const screens = useBreakpoint()

  const sections = [
    {
      icon: <FileTextOutlined />,
      title: '1. Giới thiệu chung',
      content: (
        <>
          <Paragraph>
            Chào mừng Quý khách đến với <Text strong>Yanie & Friends</Text>. Khi sử dụng website <Text code>www.yanieandfriends.com</Text>, Quý khách đồng ý tuân thủ các điều khoản và điều kiện dưới đây.
          </Paragraph>
          <Paragraph>
            Chúng tôi cung cấp thông tin về thực đơn, không gian quán, dịch vụ đặt bàn, đặt món trực tuyến và các chương trình ưu đãi dành cho khách hàng.
          </Paragraph>
        </>
      )
    },
    {
      icon: <CoffeeOutlined />,
      title: '2. Dịch vụ cung cấp',
      content: (
        <ul className="terms-list">
          <li>Cung cấp thông tin chi tiết về thực đơn (đồ uống, bánh ngọt) và giá cả tại quán.</li>
          <li>Hỗ trợ đặt bàn trước và đặt món mang đi qua hệ thống trực tuyến.</li>
          <li>Cập nhật các chương trình khách hàng thân thiết và ưu đãi đặc biệt.</li>
        </ul>
      )
    },
    {
      icon: <UserOutlined />,
      title: '3. Tài khoản và Thông tin cá nhân',
      content: (
        <ul className="terms-list">
          <li>Quý khách có thể cần đăng ký thành viên để hưởng ưu đãi tích điểm "Bạn Thân".</li>
          <li>Thông tin cung cấp khi đặt bàn hoặc đặt món phải đảm bảo chính xác (Tên, Số điện thoại) để chúng mình phục vụ tốt nhất.</li>
          <li>Yanie & Friends có quyền từ chối phục vụ hoặc hủy đơn hàng nếu phát hiện thông tin giả mạo hoặc có dấu hiệu gian lận.</li>
        </ul>
      )
    },
    {
      icon: <CreditCardOutlined />,
      title: '4. Đặt món và Thanh toán',
      content: (
        <ul className="terms-list">
          <li>Giá niêm yết trên website đã bao gồm thuế phí liên quan, trừ phí vận chuyển (nếu có).</li>
          <li>Chúng tôi chấp nhận thanh toán tiền mặt, chuyển khoản ngân hàng và các ví điện tử phổ biến.</li>
          <li>Đối với các đơn đặt món mang đi với giá trị lớn, chúng tôi có thể yêu cầu thanh toán trước một phần hoặc toàn bộ.</li>
        </ul>
      )
    },
    {
      icon: <ShoppingOutlined />,
      title: '5. Chính sách Thay đổi & Hủy đơn',
      content: (
        <ul className="terms-list">
          <li>Quý khách vui lòng liên hệ hotline sớm nhất nếu có nhu cầu thay đổi đơn hàng hoặc thời gian đặt bàn.</li>
          <li>Đối với đặt bàn nhóm đông hoặc sự kiện, vui lòng báo trước ít nhất 2 giờ để chúng mình kịp chuẩn bị góc ngồi ưng ý nhất.</li>
          <li>Trong trường hợp đơn hàng đã bắt đầu pha chế, chúng tôi rất tiếc không thể hỗ trợ hủy hoặc thay đổi.</li>
        </ul>
      )
    },
    {
      icon: <WarningOutlined />,
      title: '6. Trách nhiệm giới hạn',
      content: (
        <ul className="terms-list">
          <li>Yanie & Friends cam kết đảm bảo vệ sinh an toàn thực phẩm theo tiêu chuẩn quy định.</li>
          <li>Chúng tôi không chịu trách nhiệm đối với các sự cố kỹ thuật từ bên thứ ba (như cổng thanh toán, dịch vụ giao hàng) nhưng sẽ nỗ lực hỗ trợ Quý khách giải quyết.</li>
          <li>Hình ảnh trên website là hình ảnh thật, tuy nhiên màu sắc thực tế có thể chênh lệch nhỏ do điều kiện ánh sáng hoặc thiết bị hiển thị.</li>
        </ul>
      )
    },
    {
      icon: <CopyrightOutlined />,
      title: '7. Bản quyền và Sở hữu trí tuệ',
      content: (
        <ul className="terms-list">
          <li>Toàn bộ nội dung, logo, hình ảnh "Yanie & Friends" trên website thuộc sở hữu độc quyền của chúng tôi.</li>
          <li>Mọi hành vi sao chép hình ảnh sản phẩm hoặc nội dung bài viết vì mục đích thương mại khác mà chưa có sự đồng ý đều là vi phạm.</li>
        </ul>
      )
    },
    {
      icon: <LockOutlined />,
      title: '8. Bảo mật dữ liệu',
      content: (
        <Paragraph>
          Mọi thông tin cá nhân của Quý khách chỉ được sử dụng cho mục đích phục vụ đơn hàng và gửi ưu đãi (nếu Quý khách đồng ý). Chúng tôi cam kết không chia sẻ dữ liệu cho bên thứ ba vì mục đích quảng cáo.
        </Paragraph>
      )
    },
    {
      icon: <PhoneOutlined />,
      title: '9. Thông tin liên hệ',
      content: (
        <Card className="contact-card" variant="borderless" style={{ background: '#fdf5e6' }}>
          <Space orientation="vertical" size={8}>
            <Text strong style={{ fontSize: 16, color: '#3E2723' }}>Yanie & Friends Coffee</Text>
            <Text><Text strong>Hotline:</Text> 0366 228 041</Text>
            <Text><Text strong>Email:</Text> hello@yanieandfriends.com</Text>
            <Text><Text strong>Website:</Text> <Text code>www.yanieandfriends.com</Text></Text>
          </Space>
        </Card>
      )
    }
  ]

  return (
    <div className="terms-container">
      <div className="terms-header">
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Space orientation="vertical" size={16} style={{ width: '100%', textAlign: 'center' }}>
              <Title 
                level={screens.xs ? 3 : 1} 
                className="terms-main-title"
                style={{ color: '#3E2723' }}
              >
                ĐIỀU KHOẢN DỊCH VỤ
              </Title>
              <Text type="secondary">
                Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
              </Text>
              <Paragraph className="terms-intro" style={{ textAlign: 'justify' }}>
                Chào mừng Quý khách đến với <Text strong>Yanie & Friends</Text> – nơi những câu chuyện được tạo nên. 
                Vui lòng đọc kỹ các Điều khoản này trước khi sử dụng dịch vụ. Bằng việc truy cập hoặc sử dụng website, 
                Quý khách đồng ý tuân thủ các quy định nhằm đảm bảo quyền lợi cho cả hai bên.
              </Paragraph>
            </Space>
          </Col>
        </Row>
      </div>

      <div className="terms-content">
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <Card className="terms-main-card" variant="borderless" style={{ borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Space orientation="vertical" size={32} style={{ width: '100%' }}>
                {sections.map((section, index) => (
                  <div key={index} className="terms-section">
                    <Title level={4} className="section-title">
                      <Space>
                        <span style={{ color: '#BC6C25' }}>{section.icon}</span>
                        <span>{section.title}</span>
                      </Space>
                    </Title>
                    <div className="section-content" style={{ paddingLeft: 32 }}>
                      {section.content}
                    </div>
                    {index < sections.length - 1 && <Divider />}
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TermsOfService