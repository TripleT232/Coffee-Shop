import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Avatar, Button, Divider, Drawer, Dropdown, Space, Input, Badge } from 'antd'
import { MenuOutlined, UserOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'

import './Navigation.css'
import logo from '../../assets/images/logo.webp'
import { useAuth } from '../../context/AuthContext'

const { Search } = Input

function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // NAV ITEMS
  const navItems = useMemo(() => ([
    { key: '/', label: 'Trang chủ' },
    { key: '/about', label: 'Về chúng tôi' },
    { key: '/menu', label: 'Menu' },
    { key: '/promotions', label: 'Khuyến mãi' },
    { key: '/blogs', label: 'Câu chuyện' },
    { key: '/faq', label: 'FAQ' }
  ]), [])

  const activeKey =
    navItems.find(item => item.key === location.pathname)?.key || '/'

  // SEARCH
  const handleSearch = (value) => {
    if (!value) return
    navigate(`/menu?search=${value}`)
    setDrawerOpen(false)
  }

  // CART
  const goToCart = () => {
    navigate('/cart')
    setDrawerOpen(false)
  }

  // LOGOUT
  const handleLogout = () => {
    logout()
    navigate('/login')
    setDrawerOpen(false)
  }

  // USER MENU
  const userMenu = [
    {
      key: 'profile',
      label: <Link to="/user/profile">Thông tin tài khoản</Link>,
    },
    {
      key: 'orders',
      label: <Link to="/user/orders">Đơn hàng của tôi</Link>,
    },
    ...(user?.role?.toUpperCase() === 'ADMIN'
      ? [{
          key: 'admin',
          label: <Link to="/admin">Trang quản trị</Link>,
        }]
      : []),
    { type: 'divider', key: 'divider' },
    {
      key: 'address',
      label: <Link to="/user/address">Địa chỉ</Link>,
    },
    {
      key: 'logout',
      label: <span>Đăng xuất</span>,
    },
  ]

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') handleLogout()
  }

  // RENDER NAV LINKS
  const renderNavLinks = (isMobile = false) => (
    <ul className={`nav-menu${isMobile ? ' mobile' : ''}`}>
      {navItems.map(item => (
        <li
          key={item.key}
          className={`nav-item ${
            activeKey === item.key ? 'active' : ''
          }`}
        >
          <Link
            to={item.key}
            className="nav-link"
            onClick={() => isMobile && setDrawerOpen(false)}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* HEADER */}
      <header className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">

          {/* LEFT */}
          <div className="nav-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuOutlined />
            </button>

            <Link to="/" className="nav-logo">
              <img src={logo} alt="logo" className="logo-img" />
              <div className="nav-text-group">
                <span className="nav-name">Yanie & Friends</span>
                <span className="nav-sologan">Nơi những câu chuyện được tạo nên</span>
              </div>
            </Link>
          </div>

          {/* CENTER */}
          <nav className="nav-center">
            {renderNavLinks()}
          </nav>

          {/* RIGHT */}
          <div className="nav-right">

            {/* SEARCH */}
            <Input
              placeholder="Bạn muốn tìm kiếm điều gì cho hôm nay?..."
              prefix={<SearchOutlined style={{ color: '#9ca3af', marginRight: 4, fontSize: 16 }} />}
              onPressEnter={(e) => handleSearch(e.target.value)}
              className="nav-search-pill"
              allowClear
            />

            {/* CART */}
            <Badge count={cartCount} size="small">
              <Button
                type="text"
                icon={<ShoppingCartOutlined />}
                onClick={goToCart}
                className="cart-btn"
              />
            </Badge>

            {/* USER */}
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="action-link ghost">
                  Đăng nhập
                </Link>
                <Link to="/register" className="action-link primary">
                  Đăng ký
                </Link>
              </>
            ) : (
              <Dropdown
                trigger={['click']}
                placement="bottomRight"
                menu={{
                  items: userMenu,
                  onClick: handleUserMenuClick
                }}
              >
                <Space className="user-trigger">
                  <Avatar
                    src={user?.avatar}
                    icon={!user?.avatar && <UserOutlined />}
                  />
                  <span>{user?.full_name || 'User'}</span>
                </Space>
              </Dropdown>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <Drawer
        placement="left"

        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="nav-drawer"
      >
        {renderNavLinks(true)}

        <Divider />

        <Search
          placeholder="Bạn muốn tìm kiếm điều gì cho hôm nay?..."
          onSearch={handleSearch}
        />

        <Divider />

        <Button block onClick={goToCart}>
          Giỏ hàng ({cartCount})
        </Button>

        <Divider />

        {!isAuthenticated ? (
          <>
            <Button block onClick={() => navigate('/login')}>
              Đăng nhập
            </Button>
            <Button
              type="primary"
              block
              onClick={() => navigate('/register')}
            >
              Đăng ký
            </Button>
          </>
        ) : (
          <Button block onClick={handleLogout}>
            Đăng xuất
          </Button>
        )}
      </Drawer>
    </>
  )
}

export default Navigation