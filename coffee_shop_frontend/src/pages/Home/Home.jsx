import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './Home.css'
import { Carousel, Row, Col, Typography, Grid } from 'antd'
const { useBreakpoint } = Grid
import { motion } from 'framer-motion'

import BestList from '../../components/BestList/BestList'
import { productsData } from '../../data/products'
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

    const homeProducts = productsData.filter(p => p.isBestSeller);

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
                    <BestList menuItems={homeProducts} />
                </div>

                <div className='home-page'>
                    <AnimatedSection>
                        <section className="home-experience">
                            <div className="experience-header">
                                <span className="bestlist-subtitle">KHÁM PHÁ</span>
                                <h2 className="experience-main-title">Điểm Đến Của Không Gian Sang Trọng</h2>
                            </div>

                            <div className="experience-container">
                                {/* ROW 1 */}
                                <div className="experience-row">
                                    <div className="experience-content-card">
                                        <span className="card-number">01</span>
                                        <h3 className="card-title">Hành Trình Từ Những Hạt Cà Phê Mộc Mạc</h3>
                                        <p className="card-text">
                                            Giữa nhịp sống hối hả ngoài kia, đôi khi tất cả những gì chúng ta cần chỉ là một điểm dừng chân đủ ấm để tâm hồn được nghỉ ngơi. Tại Yanie & Friends, chúng tôi tin rằng mỗi hạt cà phê đều mang trong mình một câu chuyện riêng về vùng đất và con người đã tạo ra nó.
                                        </p>
                                        <p className="card-text">
                                            Đó là lý do chúng tôi luôn chăm chút cho từng giai đoạn, từ khâu chọn lọc nguyên liệu mộc mạc nhất đến khi ly cà phê thơm nồng được đặt trên mặt bàn gỗ quen thuộc.
                                        </p>
                                        <div className="card-footer">
                                            <Link to="/about" className="learn-more">Tìm hiểu thêm <ArrowRight size={18} /></Link>
                                        </div>
                                    </div>
                                    <div className="experience-image-wrapper">
                                        <img src={aboutBanner} alt="Không gian sang trọng" className="experience-img" />
                                    </div>
                                </div>

                                {/* ROW 2 */}
                                <div className="experience-row">
                                    <div className="experience-content-card">
                                        <span className="card-number">02</span>
                                        <h3 className="card-title">Những Hương Vị Tinh Tế & Đầy Cảm Hứng</h3>
                                        <p className="card-text">
                                            Sự sáng tạo trong hành trình ẩm thực với thực đơn phong phú từ khắp mọi nơi trên thế giới cùng nét chấm phá đặc biệt với hương vị truyền thống. Dù là bữa tiệc như thế nào đi nữa, các đầu bếp tài năng của chúng tôi sẽ mang đến cho quý khách những món ăn hào hạng nhất.
                                        </p>
                                        <p className="card-text">
                                            Hãy để vị giác của bạn được dẫn dắt qua những tầng hương vị đan xen, nơi mà sự hiện đại gặp gỡ nét cổ điển trong từng ngụm trà hay từng tách cà phê đậm đà.
                                        </p>
                                        <div className="card-footer">
                                            <Link to="/menu" className="learn-more">Khám phá thực đơn <ArrowRight size={18} /></Link>
                                        </div>
                                    </div>
                                    <div className="experience-image-wrapper">
                                        <img src={banner1} alt="Hương vị tinh tế" className="experience-img" />
                                    </div>
                                </div>

                                {/* ROW 3 */}
                                <div className="experience-row">
                                    <div className="experience-content-card">
                                        <span className="card-number">03</span>
                                        <h3 className="card-title">Không Gian Nghệ Thuật & Sự Kết Nối</h3>
                                        <p className="card-text">
                                            Tại Yanie & Friends, chúng tôi không chỉ bán cà phê, chúng tôi tạo ra không gian để bạn kết nối. Mỗi góc nhỏ đều được chăm chút tỉ mỉ, từ ánh sáng dịu nhẹ đến âm nhạc du dương, tất cả hòa quyện tạo nên một bản giao hưởng tuyệt vời.
                                        </p>
                                        <p className="card-text">
                                            Dù bạn cần một nơi yên tĩnh để làm việc hay một góc ấm cúng để hàn huyên cùng bạn bè, chúng tôi luôn sẵn sàng chào đón bạn với nụ cười nồng hậu nhất.
                                        </p>
                                        <div className="card-footer">
                                            <Link to="/contact" className="learn-more">Ghé thăm chúng tôi <ArrowRight size={18} /></Link>
                                        </div>
                                    </div>
                                    <div className="experience-image-wrapper">
                                        <img src={aboutBanner} alt="Không gian nghệ thuật" className="experience-img" />
                                    </div>
                                </div>
                            </div>
                        </section>
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