import React, { useMemo } from 'react'
import {
  Breadcrumb,
  Typography,
  Collapse,
  Row,
  Col,
  Card,
  Tag,
  Button,
  Statistic,
  Space
} from 'antd'
import {
  HomeOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  MessageOutlined,
  SmileOutlined,
  CoffeeOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  GiftOutlined,
  WifiOutlined,
  ClockCircleOutlined,
  StarOutlined,
  EditOutlined,
  AppstoreOutlined
} from '@ant-design/icons'
import './FAQ.css'

const { Title, Paragraph, Text } = Typography

function FAQ() {
  const faqGroups = useMemo(() => ([
    {
      key: 'order',
      title: 'Đặt món & Giao hàng',
      description: 'Thưởng thức hương vị của Yanie & Friends ngay tại nhà hoặc đặt bàn trước cho buổi hẹn.',
      badge: 'Phổ biến',
      questions: [
        {
          icon: <ShoppingCartOutlined />,
          q: 'Tôi có thể đặt món trực tuyến bằng cách nào?',
          a: 'Bạn có thể đặt trực tiếp qua Website, nhắn tin Fanpage hoặc tìm Yanie & Friends & Friends trên các ứng dụng giao hàng. Chúng mình sẽ chuẩn bị thật nhanh để cafe đến tay bạn vẫn còn vẹn nguyên hương vị.'
        },
        {
          icon: <TeamOutlined />,
          q: 'Quán có nhận đặt bàn trước cho nhóm bạn không?',
          a: 'Có chứ! Nếu bạn cần một góc hiên nhà yên tĩnh hay bàn lớn cho nhóm bạn, hãy gọi hotline hoặc nhắn tin trước 30 phút để chúng mình giữ chỗ ưng ý nhất cho bạn nhé.'
        },
        {
          icon: <GiftOutlined />,
          q: 'Yanie & Friends & Friends có chương trình tích điểm không?',
          a: 'Chúng mình có thẻ "Bạn Thân". Với mỗi ly cafe, bạn sẽ được tích 1 dấu mộc. Đủ 10 dấu, Yanie & Friends gửi tặng bạn một món nước bất kỳ như lời cảm ơn sự gắn bó.'
        }
      ]
    },
    {
      key: 'space',
      title: 'Không gian & Tiện ích',
      description: 'Giờ giấc, chỗ ngồi làm việc và các quy định nhỏ tại hiên nhà.',
      badge: 'Quan trọng',
      questions: [
        {
          icon: <WifiOutlined />,
          q: 'Quán có chỗ ngồi làm việc và wifi ổn định không?',
          a: 'Yanie & Friends thiết kế những góc bàn rộng với ổ cắm điện đầy đủ và wifi tốc độ cao, rất phù hợp để bạn tập trung học tập hoặc làm việc cả ngày.'
        },
        {
          icon: <HeartOutlined />,
          q: 'Tôi có thể mang thú cưng theo không?',
          a: 'Rất hoan nghênh! Yanie & Friends & Friends là không gian pet-friendly. Bạn chỉ cần giữ các bé trong tầm kiểm soát để không làm ảnh hưởng đến những người bạn khác đang chill tại quán.'
        },
        {
          icon: <ClockCircleOutlined />,
          q: 'Quán mở cửa vào những khung giờ nào?',
          a: 'Chúng mình mở cửa từ 07:00 sáng đến 22:00 đêm tất cả các ngày trong tuần, kể cả ngày lễ để luôn sẵn sàng đón bạn ghé chơi.'
        }
      ]
    },
    {
      key: 'menu',
      title: 'Hương vị & Chất lượng',
      description: 'Tìm hiểu về nguồn gốc hạt cafe và các yêu cầu đặc biệt.',
      questions: [
        {
          icon: <StarOutlined />,
          q: 'Cafe của Yanie & Friends có gì đặc biệt?',
          a: 'Chúng mình dùng hạt cafe rang mộc nguyên chất, tuyển chọn kỹ lưỡng. Mỗi tách cafe đều được pha chế bằng cả tâm tình để mang lại vị đậm đà và hậu vị ngọt thanh nhất.'
        },
        {
          icon: <EditOutlined />,
          q: 'Tôi có thể yêu cầu thay đổi độ ngọt hoặc dùng sữa hạt?',
          a: 'Tất nhiên rồi! Đừng ngần ngại chia sẻ với chúng mình về sở thích của bạn (ít đường, nhiều đá, hoặc thay sữa đặc bằng sữa hạt) để chúng mình cá nhân hóa tách cafe cho riêng bạn.'
        },
        {
          icon: <AppstoreOutlined />,
          q: 'Quán có phục vụ đồ ăn nhẹ không?',
          a: 'Yanie & Friends luôn có sẵn các loại bánh ngọt nướng mới mỗi ngày như Croissant và Cookie Socola – người bạn đồng hành hoàn hảo cho tách cafe của bạn.'
        }
      ]
    }
  ]), [])

  return (
    <div className="faq-page">
      <div className="container">
        <Breadcrumb 
          className="breadcrumb-custom"
          items={[
            { title: <a onClick={() => navigate('/')}><HomeOutlined /> Hiên nhà tại 'Yanie & Friends'</a> },
            { title: 'Giải đáp thắc mắc' }
          ]}
        />

        <section className="faq-hero">
          <div className="hero-content">
            <Tag color="#BC6C25" className="hero-tag">Feel Like Home</Tag>
            <Title level={1} className="hero-title">
              Giải đáp mọi điều bạn băn khoăn
            </Title>
            <Paragraph className="hero-desc">
              Bạn cần tìm hiểu về không gian, menu hay muốn đặt một góc nhỏ cho buổi hẹn? 
              Yanie & Friends luôn ở đây để lắng nghe và hỗ trợ những người bạn của mình.
            </Paragraph>
            <Space size={16} wrap>
              <Button type="primary" size="large" className="hero-button" href="tel:0366228041">
                <PhoneOutlined /> Hotline
              </Button>
              <Button size="large" className="hero-button ghost" href="https://zalo.me/0366228041" target="_blank">
                <MessageOutlined /> Chat với Yanie & Friends
              </Button>
            </Space>
          </div>
          <div className="hero-stats">
            <Card className="stat-card">
              <Statistic title="Khách hàng hài lòng" value="98%" prefix={<HeartOutlined />} />
              <Text>Luôn nỗ lực mang lại trải nghiệm ấm cúng nhất</Text>
            </Card>
            <Card className="stat-card">
              <Statistic title="Thời gian phản hồi" value="5 phút" prefix={<MessageOutlined />} />
              <Text>Nhắn tin cho chúng mình bất cứ lúc nào</Text>
            </Card>
          </div>
        </section>

        <section className="faq-section">
          {faqGroups.map(group => (
            <div key={group.key} className="faq-block">
              <div className="faq-block-header">
                <div>
                  <Tag color="#BC6C25">{group.badge || 'Bạn có biết?'}</Tag>
                  <Title level={2} className="group-title">{group.title}</Title>
                  <Paragraph className="group-desc">{group.description}</Paragraph>
                </div>
              </div>
              <Collapse
                variant="borderless"
                accordion
                expandIcon={({ isActive, panelKey }) => {
                  const allItems = group.questions.map((q, i) => ({ key: `${group.key}-${i}`, icon: q.icon }))
                  const found = allItems.find(it => it.key === panelKey)
                  const icon = found?.icon ?? <QuestionCircleOutlined />
                  return <span style={{ color: isActive ? '#c9a96e' : '#aaa', fontSize: 16, transition: 'color 0.2s' }}>{icon}</span>
                }}
                items={group.questions.map((item, index) => ({
                  key: `${group.key}-${index}`,
                  label: <Text className="faq-question">{item.q}</Text>,
                  children: <Paragraph className="faq-answer">{item.a}</Paragraph>
                }))}
                className="faq-collapse"
              />
            </div>
          ))}
        </section>

        <section className="faq-footer-contact">
          <Card className="contact-highlight-card">
            <Row align="middle" gutter={[32, 32]}>
              <Col xs={24} md={16}>
                <Title level={3}>Vẫn còn điều muốn hỏi?</Title>
                <Paragraph>
                  Đừng ngần ngại, đội ngũ Yanie & Friends & Friends luôn sẵn sàng trò chuyện cùng bạn. 
                  Hãy ghé quán trực tiếp hoặc liên hệ qua các kênh trực tuyến nhé!
                </Paragraph>
              </Col>
              
              <Col xs={24} md={8}>
                <Button type="primary" block size="large" color="#8b5e3c" icon={<EnvironmentOutlined />} href="https://maps.google.com" target="_blank">
                  Chỉ đường tới quán
                </Button>
              </Col>
            </Row>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default FAQ