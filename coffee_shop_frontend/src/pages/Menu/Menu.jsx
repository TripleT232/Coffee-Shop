import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Thêm motion cho hiệu ứng mượt mà
import { Breadcrumb, message, Input } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  HomeOutlined,
  TagOutlined,
  ShopOutlined
} from "@ant-design/icons";
import "./Menu.css";
import { useCart } from "../../context/CartContext";
import { CATEGORY, productsData } from "../../data/products";
import bannerHero from "../../assets/images/banner/banner1.webp"; // Sử dụng ảnh hero sang trọng

function Menu() {
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites, cart } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return productsData.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart(item.id);
    message.success(`Đã thêm ${item.name} vào giỏ!`);
  };

  const handleToggleFavorite = (e, id) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <div className="menu-page">
      {/* ===== HERO SECTION (Giống trang About) ===== */}
      <div className="menu-hero">
        <div className="menu-hero-overlay" />
        
        <Breadcrumb
          className="breadcrumb-custom-top"
          items={[
            { title: <a onClick={() => navigate("/")}><HomeOutlined /> Hiên nhà tại Yanie & Friends</a> },
            { title: "Thực đơn" },
          ]}
        />

        <motion.div 
          className="menu-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="menu-hero-title">THỰC ĐƠN</h1>
          <p className="menu-hero-subtitle">Hương vị của sự chân thành và bình yên</p>
        </motion.div>
      </div>

      <div className="menu-toolbar">
        <div className="menu-tabs">
          {CATEGORY.map((cat) => (
            <button
              key={cat.key}
              className={`tab ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="menu-toolbar-right">
          <div className="menu-search">
            <SearchOutlined className="search-icon" />
            <Input
              placeholder="Bạn muốn tìm món gì cho hôm nay?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bordered={false}
            />
          </div>
        </div>
      </div>

      <div className="menu-products">
        {filteredProducts.length === 0 ? (
          <div className="menu-empty">Không tìm thấy món nào 😢</div>
        ) : (
          filteredProducts.map((item) => (
            <div 
              className="product-card" 
              key={item.id}
              onClick={() => navigate(`/menu/${item.id}`)}
            >
              <div className="product-img">
                {item.discount && (
                  <div className="discount-tag">
                    <TagOutlined /> -{item.discount}%
                  </div>
                )}
                <button
                  className={`favorite-circle ${favorites.includes(item.id) ? "active" : ""}`}
                  onClick={(e) => handleToggleFavorite(e, item.id)}
                  title="Yêu thích"
                >
                  <HeartFilled />
                </button>
                <img src={item.image} alt={item.name} />
              </div>

              <div className="product-info">
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
                    <ShopOutlined /> Bán {item.sold || Math.floor(Math.random() * 50) + 10}
                  </span>
                  <span className="meta-chip likes">
                    <HeartFilled /> {(item.likes || 100) + (favorites.includes(item.id) ? 1 : 0)}
                  </span>
                </div>

                <div className="card-actions">
                  <button 
                    className="btn-order"
                    onClick={(e) => handleAddToCart(e, item)}
                  >
                    Đặt ngay
                  </button>
                  <button
                    className={`btn-cart-icon ${cart && cart[item.id] ? "active" : ""}`}
                    onClick={(e) => handleAddToCart(e, item)}
                    title="Thêm vào giỏ"
                  >
                    <ShoppingCartOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;