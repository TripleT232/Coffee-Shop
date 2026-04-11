import React, { useMemo, useState } from 'react'
import { Row, Col, Tabs, Grid } from 'antd'
import { useNavigate } from 'react-router-dom'
import './BestList.css'


const { useBreakpoint } = Grid
// CATEGORY
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
    const screens = useBreakpoint()

  // Filter sản phẩm theo category
    const filteredItems = useMemo(() => {
        if (activeCategory === 'all') return menuItems
        return menuItems.filter(item => item.category === activeCategory)
    }, [menuItems, activeCategory])

    return (
        <div className="menu-container">

        {/* ===== HEADER ===== */}
        <div className="menu-header">
            <h1>MÓN NGON PHẢI THỬ</h1>
            <p>Gói ghém hương vị quen thuộc với những thức uống mà bạn yêu thích tại Yanie & Friends.</p>
        </div>

        {/* ===== CATEGORY TABS ===== */}
        <Tabs
            centered
            activeKey={activeCategory}
            onChange={(key) => setActiveCategory(key)}
            items={CATEGORY.map(c => ({
            key: c.key,
            label: c.label
            }))}
            className="menu-tabs"
        />

      {/* ===== PRODUCT GRID ===== */}
      <Row gutter={[24, 24]}>
        {filteredItems.map(item => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <div
              className="menu-card"
              onClick={() => navigate(`/menu/${item.id}`)}
            >
              <div className="menu-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="menu-info">
                <h4>{item.name}</h4>
                <span>{item.price?.toLocaleString()}đ</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>

    </div>
  )
}

export default MenuList