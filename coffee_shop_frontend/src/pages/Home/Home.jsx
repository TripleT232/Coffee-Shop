import React from 'react'
import './Home.css'
import { Row, Col, Typography, Button, Grid } from 'antd'
const { useBreakpoint } = Grid
import { motion } from 'framer-motion'
import OrderingWidget from '../../components/OrderingWidget/OrderingWidget'
import banner from '../../assets/images/banner.webp'
import banner1 from "../../assets/images/banner/banner1.webp"
import banner2 from "../../assets/images/banner/banner2.webp"


function Home() {
    const screens = useBreakpoint()
    // const navigate = useNavigate()
    const scrollToBookingWidget = () => {
        const widget = document.querySelector('.booking-widget-container')
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
    }
    // Nó sẽ làm cho component con "nảy" lên và mờ dần xuất hiện khi cuộn tới
    const AnimatedSection = ({ children }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }} // Trạng thái ban đầu: mờ, ở dưới 50px
                whileInView={{ opacity: 1, y: 0 }} // Trạng thái khi lọt vào tầm nhìn: rõ, ở vị trí 0
                viewport={{ once: false }} // 
                transition={{ duration: 0.75, ease: "easeInOut" }} // Thời gian và kiểu hiệu ứng
                className="animated-section-home"
            >
                {children}
            </motion.div>
        );
    };
    
        return (
            <>
                <div className='banner-slider'>
                    <div className="banner-slider-container">
                        <img srcSet={[banner, banner1, banner2]} alt="Yanie & Friends" className='banner-slider-img'
                            loading='eager'
                            fetchPriority='high'
                        />

                        <div className='banner-overlay'>
                            <motion.div
                                className='banner-hero-content'
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                            >
                                <Button
                                    type='primary'
                                    size='large'
                                    className='banner-cta'
                                    onClick={scrollToOrderingWidget}
                                >
                                    Khám phá ngay
                                </Button>

                                <Button
                                    type='primary'
                                    size='large'
                                    className='banner-cta'
                                    onClick={scrollToAboutWidget}
                                >
                                    Tìm hiểu thêm
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Ordering Widget - Nổi trên banner*/}
                    <div className='ordering-widget-container'>
                        <OrderingWidget/>
                    </div>

                    {/* About Widget - Nổi trên banner*/}
                    <div className='about-widget-container'>
                        <AboutWidget/>
                    </div>
                </div>
                <div className='container'>
                    <div className='home-product-list'>
                        <ProductList />
                    </div>
                    <div className='home-page'>
                        <AnimatedSection>
                            <div className='about'>
                                <div className="about-container">
                                    <Row
                                        gutter={screens.xs ? [16, 24] : [32, 32]}
                                        align="middle"
                                        className="about-row"
                                    >
                                        <Col
                                            xs={24}
                                            md={12}
                                            order={screens.xs || screens.sm ? 1 : undefined}
                                        >
                                                <div className="about-content">
                                                    <Typography.Title
                                                        level={1}
                                                        className="about-title"
                                                    >
                                                        Hành Trình Từ Những Hạt Cà Phê Mộc Mạc
                                                    </Typography.Title>
                                                    <Typography.Paragraph className="about-text">
                                                        Giữa nhịp sống hối hả ngoài kia, đôi khi tất cả những gì chúng ta cần chỉ là một điểm dừng chân đủ ấm để tâm hồn được nghỉ ngơi. Yanie & Friends ra đời từ chính mong ước đó—một quán cafe nhỏ nằm yên bình ngay tại hiên nhà, nơi mà mỗi tách cafe đều được pha bằng sự tận tâm và mỗi vị khách ghé thăm đều được chào đón như một người bạn cũ trở về.

                                                        Tại đây, chúng mình không chỉ bán cafe, chúng mình trao gửi sự bình yên. Mời bạn ghé lại, gác lại những âu lo bên ngoài cánh cửa, nhâm nhi vị cafe đậm đà và cùng chúng mình kể tiếp những câu chuyện thường nhật bình dị nhất
                                                    </Typography.Paragraph>
                                                </div>
                                        </Col>
                                        <Col
                                            xs={24}
                                            md={12}
                                            order={screens.xs || screens.sm ? 1 : undefined}
                                        >
                                            <div className ="about-banner-container">
                                                <div className ="about-banner-images">
                                                    <div className = 'about-banner-item'>
                                                        <img
                                                            src={aboutBanner}
                                                            alt="Yanie & Friends"
                                                            className="about-banner-image"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </AnimatedSection>
                    </div>
                    {/* Tại sao bạn nên đến Yanie & Friends */}
                    <div className=''>
                        <AnimatedSection>
                            <WhyChooseUs />
                        </AnimatedSection>
                    </div>
                    <div className=''>
                        <Moments />
                    </div>
                </div>
            </>
        );
    };

export default Home;