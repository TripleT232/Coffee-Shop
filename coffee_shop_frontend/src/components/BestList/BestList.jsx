import React, { useState, useMemo } from 'react'
import { Carousel, Tabs, Grid, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartOutlined, HeartFilled, ArrowRightOutlined, TagOutlined, ShopOutlined } from '@ant-design/icons'
import './BestList.css'
import { useCart } from '../../context/CartContext'

const { useBreakpoint } = Grid

const CATEGORY = [
  { key: 'all', label: 'TẤT CẢ' },
  { key: 'coffee', label: 'CÀ PHÊ' },
  { key: 'espresso', label: 'ESPRESSO'},
  { key: 'tea', label: 'TRÀ' },
  { key: 'freeze', label: 'FREEZE' },
  { key: 'cake', label: 'BÁNH' },
  { key: 'other', label: 'KHÁC'}
]

function MenuList({ menuItems = [] }) {
    const [activeCategory, setActiveCategory] = useState('all')
    const navigate = useNavigate()
    const { addToCart, toggleFavorite, favorites, cart } = useCart()

    const handleAddToCart = (e, item) => {
        e.stopPropagation();
        addToCart(item.id);
        message.success(`Đã thêm ${item.name} vào giỏ hàng!`);
    }

    const handleToggleFavorite = (e, id) => {
        e.stopPropagation();
        toggleFavorite(id);
    }

    const filteredItems = useMemo(() => {
        let items = activeCategory === 'all' 
            ? menuItems 
            : menuItems.filter(item => item.category === activeCategory);
        
        if (activeCategory !== 'all') {
            return items.slice(0, 6);
        }
        return items;
    }, [menuItems, activeCategory])

    const carouselSettings = {
        autoplay: true,
        speed: 1000,
        cssEase: "linear",
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    }

    return (
        <div className="bestlist-container">
            <div className="bestlist-header">
                <span className='bestlist-title'>MÓN NGON PHẢI THỬ</span>
                <p>Hương vị quen, trải nghiệm mới. Thử ngay tại Yanie &amp; Friends!</p>
            </div>

            <div className="bestlist-nav">
                <Tabs
                    centered
                    activeKey={activeCategory}
                    onChange={(key) => setActiveCategory(key)}
                    items={CATEGORY.map(c => ({
                        key: c.key,
                        label: c.label
                    }))}
                    className="bestlist-tabs"
                />
                <div className="bestlist-view-more-top" onClick={() => navigate('/menu')}>
                    Xem thêm món <ArrowRightOutlined />
                </div>
            </div>

            <Carousel {...carouselSettings} className="bestlist-carousel">
                {filteredItems.map(item => (
                    <div key={item.id} className="bestlist-slide-item">
                        <div className="bestlist-card" onClick={() => navigate(`/menu/${item.id}`)}>
                            <div className="bestlist-image">
                                {item.discount && (
                                    <div className="discount-tag">
                                        <TagOutlined /> -{item.discount}%
                                    </div>
                                )}
                                <div 
                                    className={`favorite-circle ${favorites.includes(item.id) ? 'active' : ''}`}
                                    onClick={(e) => handleToggleFavorite(e, item.id)}
                                >
                                    <HeartFilled />
                                </div>
                                <img src={item.image} alt={item.name} />
                            </div>

                            <div className="bestlist-info">
                                <div className="product-main-info">
                                    <h4 title={item.name} className="product-name-clamped">
                                        {item.isBestSeller && <span className="badge-best-mini">Best seller</span>}
                                        {item.name}
                                    </h4>
                                    <div className="price-tag">{item.price?.toLocaleString()}đ</div>
                                </div>

                                <div className="product-meta-row">
                                    <span className="flash-sale-badge">⚡ Flash Sale</span>
                                    <span className="meta-chip">
                                        <ShopOutlined /> Đã bán: {item.sold || Math.floor(Math.random() * 50) + 10}
                                    </span>
                                    <span className="meta-chip likes">
                                        <HeartFilled /> {(item.likes || 100) + (favorites.includes(item.id) ? 1 : 0)}
                                    </span>
                                </div>
                                
                                <div className="bestlist-actions">
                                    <button className="btn-order-now" onClick={(e) => handleAddToCart(e, item)}>
                                        Đặt ngay
                                    </button>
                                    <button 
                                        className={`btn-cart-icon ${cart && cart[item.id] ? 'active' : ''}`}
                                        onClick={(e) => handleAddToCart(e, item)}
                                    >
                                        <ShoppingCartOutlined />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default MenuList