import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coffee, Leaf, Star, Heart } from 'lucide-react'
import { HomeOutlined } from '@ant-design/icons'
import './About.css'
import aboutBanner from '../../assets/images/aboutBanner.webp'
import moments1 from '../../assets/images/moments/moments1.webp'
import moments2 from '../../assets/images/moments/moments2.webp'
import moments3 from '../../assets/images/moments/moments3.webp'
import moments4 from '../../assets/images/moments/moments4.webp'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' },
    }),
}

const services = [
    {
        icon: <Coffee size={32} />,
        title: 'Cà phê nguyên chất',
        desc: 'Nguồn cà phê chọn lọc từ các vùng trồng bền vững tại Đà Lạt và Đắk Lắk.',
    },
    {
        icon: <Leaf size={32} />,
        title: 'Không gian xanh',
        desc: 'Thiết kế gần gũi thiên nhiên, mang lại cảm giác thoáng đãng và thư thái.',
    },
    {
        icon: <Star size={32} />,
        title: 'Chất lượng đỉnh cao',
        desc: 'Mỗi sản phẩm đều qua kiểm định nghiêm ngặt để đảm bảo hương vị tốt nhất.',
    },
    {
        icon: <Heart size={32} />,
        title: 'Tận tâm phục vụ',
        desc: 'Đội ngũ barista nhiệt huyết, luôn sẵn sàng mang đến trải nghiệm ấm áp nhất.',
    },
]

const gallery = [moments1, moments2, moments3, moments4]

function About() {
    return (
        <div className="about-page">

            {/* ===== HERO BREADCRUMB ===== */}
            <div className="about-hero">
                <div className="about-hero-overlay" />
                <motion.div
                    className="about-hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="about-breadcrumb">
                        <Link to="/"><HomeOutlined /> Trang chủ</Link>
                        <span> / </span>
                        <span>Về chúng tôi</span>
                    </p>
                    <h1 className="about-hero-title">VỀ CHÚNG TÔI</h1>
                </motion.div>
            </div>

            {/* ===== INTRO SECTION ===== */}

            <section className="about-intro">
                <div className="about-intro-inner">

                    {/* LEFT: Text + Mission box */}
                    <motion.div
                        className="about-intro-text"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <p className="about-tag">Câu chuyện của chúng tôi</p>
                        <h2 className="about-intro-title">
                            Hành trình kiến tạo<br />
                            trải nghiệm cà phê tinh tế
                        </h2>
                        <p className="about-intro-para">
                            Hành trình của chúng tôi bắt đầu từ năm 2015, khi nhà sáng lập đặt chân
                            đến những vùng cao nguyên trù phú tại Đà Lạt và Đắk Lắk. Chứng kiến sự
                            tỉ mỉ của những người nông dân trong từng mùa thu hái, chúng tôi nhận ra
                            cà phê không chỉ là thức uống — đó là cả một tinh hoa đất trời.
                        </p>
                        <p className="about-intro-para">
                            Tại Yanie &amp; Friends, chúng tôi trực tiếp thu mua hạt cà phê từ các
                            trang trại bền vững, đảm bảo mỗi tách cà phê bạn thưởng thức đều có
                            nguồn gốc rõ ràng và hương vị thuần khiết nhất.
                        </p>

                        {/* Mission Box */}
                        <div className="about-mission-box">
                            <h3 className="about-mission-title">Sứ mệnh</h3>
                            <p className="about-mission-text">
                                Mang đến không gian ấm cúng, đủ để mỗi người tìm thấy khoảnh khắc
                                bình yên — trong một tách cà phê, một cuộc trò chuyện, hay chỉ là
                                một buổi sáng yên tĩnh cùng bản thân.
                            </p>
                        </div>

                        <Link to="/menu" className="about-cta-btn">
                            Khám phá thực đơn
                        </Link>
                    </motion.div>

                    {/* RIGHT: Portrait image */}
                    <motion.div
                        className="about-intro-img"
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <img
                            src={aboutBanner}
                            alt="Không gian quán"
                        />
                    </motion.div>
                </div>
            </section>

            {/* ===== SERVICES GRID ===== */}
            <section className="about-services">
                <div className="about-services-inner">
                    <motion.div
                        className="about-section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <p className="about-tag">Điều chúng tôi mang lại</p>
                        <h2 className="about-services-title">Trải nghiệm đẳng cấp</h2>
                    </motion.div>

                    <div className="about-services-grid">
                        {services.map((s, i) => (
                            <motion.div
                                key={i}
                                className="about-service-card"
                                variants={fadeUp}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <div className="about-service-icon">{s.icon}</div>
                                <h3 className="about-service-title">{s.title}</h3>
                                <p className="about-service-desc">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== GALLERY STRIP ===== */}
            <section className="about-gallery">
                <div className="about-gallery-inner">
                    <motion.div
                        className="about-section-header"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <p className="about-tag">Khoảnh khắc</p>
                        <h2 className="about-services-title">Khoảnh khắc tại Yanie &amp; Friends</h2>
                    </motion.div>
                    <div className="about-gallery-grid">
                        {gallery.map((src, i) => (
                            <motion.div
                                key={i}
                                className="about-gallery-item"
                                variants={fadeUp}
                                custom={i * 0.5}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <img src={src} alt={`Khoảnh khắc ${i + 1}`} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="about-cta-banner">
                <div className="about-cta-overlay" />
                <motion.div
                    className="about-cta-content"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="about-cta-title">Trải nghiệm sự khác biệt</h2>
                    <p className="about-cta-subtitle">
                        Hãy ghé thăm chúng tôi và để tách cà phê kể câu chuyện của riêng bạn
                    </p>
                    <Link to="/menu" className="about-cta-btn gold">
                        Khám phá thực đơn ngay
                    </Link>
                </motion.div>
            </section>

        </div>
    )
}

export default About
