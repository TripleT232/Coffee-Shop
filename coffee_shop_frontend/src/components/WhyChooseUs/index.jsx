import React from 'react'
import { Row, Col, Card, Typography } from 'antd'
import {
  CoffeeOutlined,
  HeartOutlined,
  HomeOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import './WhyChooseUs.css'

const { Title, Paragraph } = Typography

const features = [
  {
    icon: <CoffeeOutlined />,
    title: 'Cafe Đậm Vị',
    description:
      'Từng hạt cafe được lựa chọn kỹ lưỡng và rang xay tỉ mỉ, giữ trọn hương vị nguyên bản nồng nàn.',
  },
  {
    icon: <HomeOutlined />,
    title: 'Không Gian Gần Gũi',
    description:
      'Góc hiên nhà yên tĩnh với ánh nắng nhẹ, nơi bạn có thể tìm thấy sự bình yên giữa phố thị ồn ào.',
  },
  {
    icon: <HeartOutlined />,
    title: 'Phục Vụ Tận Tâm',
    description:
      'Tại đây không có khách hàng, chỉ có những người bạn ghé chơi nhà. Chúng mình luôn đón tiếp bạn bằng sự chân thành nhất.',
  },
  {
    icon: <SmileOutlined />,
    title: 'Kết Nối Sẻ Chia',
    description:
      'Một không gian lý tưởng để gặp gỡ bạn bè, kể cho nhau nghe những câu chuyện thường nhật bên tách cafe ấm.',
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

function WhyChooseUs() {
  return (
    <section className="why-choose-us-section">
      <div className="why-choose-us-container">
        <motion.div
          className="why-choose-us-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Title level={2} className="why-choose-us-title">
            TẠI SAO CHỌN CHÚNG TÔI?
          </Title>
        
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col xs={24} md={12} lg={6} key={feature.title}>
                <motion.div variants={cardVariants}>
                  <Card hoverable className="why-choose-us-card">
                    <div className="why-choose-us-icon">
                      <span className="why-choose-us-icon-circle">{feature.icon}</span>
                    </div>
                    <Title level={4} className="why-choose-us-card-title">
                      {feature.title}
                    </Title>
                    <Paragraph className="why-choose-us-card-desc">
                      {feature.description}
                    </Paragraph>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs