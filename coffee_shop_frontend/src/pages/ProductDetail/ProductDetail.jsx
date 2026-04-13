import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumb, Rate, Tabs, InputNumber, Button, message, Grid } from "antd";
import { 
  HomeOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined, 
  HeartFilled,
  ShareAltOutlined,
  CheckCircleFilled
} from "@ant-design/icons";
import { productsData } from "../../data/products";
import { useCart } from "../../context/CartContext";
import "./ProductDetail.css";

const { useBreakpoint } = Grid;

const SIZE_OPTIONS = [
  { key: "S", label: "Nhỏ (S)", price: 0 },
  { key: "M", label: "Vừa (M)", price: 5000 },
  { key: "L", label: "Lớn (L)", price: 10000 },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { addToCart, toggleFavorite, favorites } = useCart();
  
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("1");
  const [mainImage, setMainImage] = useState(null);

  // Find product
  const product = useMemo(() => {
    return productsData.find(p => p.id === parseInt(id));
  }, [id]);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Rất tiếc, không tìm thấy món này! 😢</h2>
        <Button type="primary" onClick={() => navigate('/menu')}>Quay lại Menu</Button>
      </div>
    );
  }

  const selectedSize = SIZE_OPTIONS.find((s) => s.key === size);
  const totalPrice = (product.price + selectedSize.price) * quantity;
  const currentImage = mainImage || product.image;

  // Mock similar products
  const similarProducts = productsData
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product.id);
    message.success(`Đã thêm ${quantity} x ${product.name} (Size ${size}) vào giỏ hàng!`);
  };

  const galleryItems = product.gallery || [product.image, ...Array(3).fill(product.image)];

  const tabItems = [
    {
      key: '1',
      label: 'Thông tin chi tiết',
      children: (
        <div className="tab-content">
          <p>{product.description || "Hương vị tuyệt hảo được tuyển chọn từ những nguyên liệu tươi ngon nhất, mang lại trải nghiệm tinh tế cho từng khách hàng."}</p>
          <ul>
            <li><CheckCircleFilled /> Nguyên liệu 100% tự nhiên</li>
            <li><CheckCircleFilled /> Pha chế thủ công theo công thức độc quyền</li>
            <li><CheckCircleFilled /> Phục vụ nóng hoặc đá tùy chọn</li>
          </ul>
        </div>
      ),
    },
    {
      key: '2',
      label: `Đánh giá (${product.reviews || 0})`,
      children: (
        <div className="tab-content reviews-section">
          <div className="rating-summary">
            <div className="big-score">
              <h1>{product.rating || 4.5}</h1>
              <Rate disabled defaultValue={product.rating || 4.5} />
              <p>{product.reviews || 0} nhận xét</p>
            </div>
            <div className="rating-bars">
              {[5, 4, 3, 2, 1].map(star => (
                <div key={star} className="bar-item">
                  <span>{star} sao</span>
                  <div className="bar-bg"><div className="bar-fill" style={{ width: star === 5 ? '80%' : '10%' }}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* BREADCRUMB */}
        <Breadcrumb 
          className="breadcrumb-custom"
          items={[
            { title: <a onClick={() => navigate('/')}><HomeOutlined /></a> },
            { title: <a onClick={() => navigate('/menu')}>Menu</a> },
            { title: <span className="category-tag">{product.category.toUpperCase()}</span> },
            { title: product.name }
          ]}
        />

        <div className="product-main-row">
          {/* GALLERY AREA */}
          <div className="product-gallery">
            <div className="main-image-wrapper">
              <img src={currentImage} alt={product.name} className="main-image" />
              <button 
                className={`fav-btn-large ${favorites.includes(product.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(product.id)}
              >
                {favorites.includes(product.id) ? <HeartFilled /> : <HeartOutlined />}
              </button>
            </div>
            <div className="thumbnail-list">
              {galleryItems.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumb-item ${currentImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`thumb-${idx}`} />
                </div>
              ))}
            </div>
          </div>

          {/* INFO AREA */}
          <div className="product-info-panel">
            <div className="info-header">
              {product.isBestSeller && <span className="best-seller-badge">Best Seller</span>}
              <div className="action-icons">
                <ShareAltOutlined title="Chia sẻ" />
              </div>
            </div>

            <h1 className="product-name">{product.name}</h1>
            
            <div className="rating-row">
              <Rate disabled defaultValue={product.rating || 4.5} className="small-rate" />
              <span className="count-text">({product.reviews || 0} đánh giá)</span>
              <span className="divider">|</span>
              <span className="count-text">{product.sold || 823} đã bán</span>
            </div>

            <div className="price-display">
              {totalPrice.toLocaleString()}đ
            </div>

            <p className="brief-desc">
              Một tuyệt phẩm của nghệ thuật pha chế, mang đến sự thăng hoa trong từng giọt thưởng thức. 
              {product.description || ""}
            </p>

            {/* OPTIONS */}
            <div className="option-section">
              <h4>Kích cỡ</h4>
              <div className="size-selector">
                {SIZE_OPTIONS.map(s => (
                  <button 
                    key={s.key}
                    className={`size-tag ${size === s.key ? 'active' : ''}`}
                    onClick={() => setSize(s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="buy-section">
              <div className="quantity-box">
                <span className="label">Số lượng</span>
                <InputNumber min={1} max={100} value={quantity} onChange={setQuantity} size="large" />
              </div>

              <div className="action-buttons">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<ShoppingCartOutlined />} 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ
                </Button>
                <Button 
                  size="large" 
                  className="buy-now-btn"
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                >
                  Mua ngay
                </Button>
              </div>
            </div>

            <div className="shipping-info">
              <div className="info-item">
                <CheckCircleFilled /> Giao hàng nhanh chớp nhoáng (15 - 30 phút)
              </div>
              <div className="info-item">
                <CheckCircleFilled /> Miễn phí vận chuyển cho đơn trên 150k
              </div>
            </div>
          </div>
        </div>

        {/* TABS AREA */}
        <div className="product-details-tabs">
          <Tabs defaultActiveKey="1" items={tabItems} size="large" centered />
        </div>

        {/* SIMILAR PRODUCTS */}
        <div className="similar-products">
          <div className="section-title">
            <h2>Món ngon tương tự</h2>
            <Button type="link" onClick={() => navigate('/menu')}>Xem tất cả</Button>
          </div>
          <div className="similar-grid">
            {similarProducts.map(item => (
              <div key={item.id} className="small-product-card" onClick={() => navigate(`/menu/${item.id}`)}>
                <img src={item.image} alt={item.name} />
                <div className="small-info">
                  <h4>{item.name}</h4>
                  <div className="bottom">
                    <Rate disabled defaultValue={item.rating || 4.5} style={{ fontSize: 10 }} />
                    <span className="price">{item.price.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}