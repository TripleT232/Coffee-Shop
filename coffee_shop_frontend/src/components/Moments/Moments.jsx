import React from 'react'
import { Carousel, Typography, Image } from 'antd'
import './Moments.css'
import banner1 from "../../assets/images/banner/banner1.webp"
import banner2 from '../../assets/images/banner/banner2.webp'
import banner from '../../assets/images/banner/banner.webp'


const { Title, Text } = Typography

const defaultImages = [
  { id: 1, src: banner, alt: 'Khoảnh khắc 1' },
  { id: 2, src: banner1, alt: 'Khoảnh khắc 2' },
  { id: 3, src: banner2, alt: 'Khoảnh khắc 3' },
  { id: 4, src: banner, alt: 'Khoảnh khắc 4' },
  { id: 5, src: banner1, alt: 'Khoảnh khắc 5' },
  { id: 6, src: banner2, alt: 'Khoảnh khắc 6' },
]

function Moments({ images = defaultImages }) {
  const settings = {
    autoplay: true,
    autoplaySpeed: 0,
    speed: 4000,
    cssEase: "linear",
    infinite: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    slidesToShow: 4,
    slidesToScroll: 1,  
    draggable: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }

  return (
    <div className="moments-section">
      <div className="moments-header">
        <Title level={2} className="moments-title">Góc Nhỏ Lưu Giữ Kỷ Niệm Tại Yanie & Friends</Title>
        <Text type="secondary">Mỗi tấm hình là một mảnh ghép tạo nên tâm hồn của Yanie & Friends ngày hôm nay.</Text>
      </div>

      <Image.PreviewGroup>
        <Carousel {...settings} className="moments-carousel">
          {images.map((item) => (
            <div key={item.id} className="moments-slide">
              <div className="moments-image-wrapper">
                <Image
                  src={item.src}
                  alt={item.alt}
                  className="moments-image"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </Image.PreviewGroup>
    </div>
  )
}

export default Moments