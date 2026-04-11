import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './Home.css'
import { Carousel, Row, Col, Typography, Grid } from 'antd'
const { useBreakpoint } = Grid
import { motion } from 'framer-motion'

import BestList from '../../components/BestList/BestList'
import banner from '../../assets/images/banner/banner.webp'
import banner1 from "../../assets/images/banner/banner1.webp"
import banner2 from "../../assets/images/banner/banner2.webp"
import aboutBanner from '../../assets/images/aboutBanner.webp'
import WhyChooseUs from '../../components/WhyChooseUs/index'
import Moments from '../../components/Moments/Moments'


function Home() {
    const screens = useBreakpoint()

    const scrollToOrderingWidget = () => {
        const widget = document.querySelector('.ordering-widget-container')
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const scrollToAboutWidget = () => {
        const widget = document.querySelector('.about-widget-container')
        if (widget) {
            widget.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // animation wrapper
    const AnimatedSection = ({ children }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="animated-section-home"
            >
                {children}
            </motion.div>
        )
    }

    return (
        <>
            {/* ===== BANNER ===== */}
            <div className='banner-slider'>
                <div className="banner-slider-container">

                    {/* Carousel */}
                    <Carousel autoplay effect="fade">
                        <div className="banner-slide-wrapper">
                            <img src={banner} className="banner-slider-img" />
                            {/* 👉 CONTENT NẰM GIỮA BANNER 1 */}
                            <div className="banner-content-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9 }}
                                >
                                    <div className="banner-buttons">
                                        <Link to="/menu" className="btn-primary">
                                            Khám phá ngay
                                            <ArrowRight size={25} />
                                        </Link>
                                        <button onClick={scrollToAboutWidget} className="btn-outline">
                                            Tìm hiểu thêm
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div>
                            <img src={banner1} className="banner-slider-img" />
                        </div>
                        <div>
                            <img src={banner2} className="banner-slider-img" />
                        </div>
                    </Carousel>



                </div>
            </div>
            
            {/* ===== CONTENT ===== */}
            <div className='container'>

                <div className='home-product-list'>
                    <BestList />
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
                                    <Col xs={24} md={12}>
                                        <div className="about-content">
                                            <Typography.Title level={1} className="about-title">
                                                Hành Trình Từ Những Hạt Cà Phê Mộc Mạc
                                            </Typography.Title>

                                            <Typography.Paragraph className="about-text">
                                                Giữa nhịp sống hối hả ngoài kia, đôi khi tất cả những gì chúng ta cần chỉ là một điểm dừng chân đủ ấm để tâm hồn được nghỉ ngơi...
                                            </Typography.Paragraph>
                                        </div>
                                    </Col>

                                    <Col xs={24} md={12}>
                                        <div className="about-banner-container">
                                            <img
                                                src={aboutBanner}
                                                alt="Yanie & Friends"
                                                className="about-banner-image"
                                            />
                                        </div>
                                    </Col>

                                </Row>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>

                <AnimatedSection>
                    <WhyChooseUs />
                </AnimatedSection>

                <Moments />

            </div>
        </>
    )
}

export default Home