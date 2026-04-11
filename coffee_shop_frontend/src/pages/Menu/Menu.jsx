import React, { useState } from "react";
import "./Menu.css";

const CATEGORY = [
  { key: "all", label: "TẤT CẢ" },
  { key: "coffee", label: "CÀ PHÊ" },
  { key: "espresso", label: "ESPRESSO" },
  { key: "tea", label: "TRÀ" },
  { key: "freeze", label: "FREEZE" },
  { key: "cake", label: "BÁNH" },
  { key: "other", label: "KHÁC" },
];

const productsData = [
  {
    id: 1,
    name: "Phê Sữa Đá Sài Gòn",
    price: 35000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9",
  },
  {
    id: 2,
    name: "Trà Đào Cam Sả",
    price: 45000,
    category: "tea",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
  },
  {
    id: 3,
    name: "Latte Nghệ Thuật",
    price: 55000,
    category: "espresso",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    id: 4,
    name: "Croissant Bơ",
    price: 32000,
    category: "cake",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
  {
    id: 5,
    name: "Cold Brew",
    price: 40000,
    category: "coffee",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",
  },
  {
    id: 6,
    name: "Matcha Đá Xay",
    price: 42000,
    category: "freeze",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc",
  },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  return (
    <div className="menu-page">
      {/* HEADER */}
      <div className="menu-header">
        <h1>MENU</h1>
        <p>Khám phá hương vị đặc trưng của quán</p>
      </div>

      {/* CATEGORY TAB */}
      <div className="menu-tabs">
        {CATEGORY.map((cat) => (
          <button
            key={cat.key}
            className={`tab ${
              activeCategory === cat.key ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="menu-content">
        {/* LEFT FILTER */}
        <div className="menu-filter">
          <h3>Tìm kiếm</h3>
          <input placeholder="Bạn muốn uống gì..." />

          <h3>Danh mục</h3>
          <ul>
            {CATEGORY.slice(1).map((cat) => (
              <li key={cat.key}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    checked={activeCategory === cat.key}
                    onChange={() => setActiveCategory(cat.key)}
                  />
                  {cat.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCT GRID */}
        <div className="menu-products">
          {filteredProducts.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="product-info">
                <h4>{item.name}</h4>
                <p>{item.price.toLocaleString()}đ</p>
                <button>Đặt ngay</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}