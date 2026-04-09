import React, { useState, Suspense, useMemo } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Typography,
  Button,
  Grid,
  Spin
} from 'antd'

import {
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  ShopOutlined,
  AppstoreOutlined,
  TagOutlined,
  StarOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  PictureOutlined,
  BarChartOutlined
} from '@ant-design/icons'

const { Sider, Header, Content } = Layout
const { Text } = Typography
const { useBreakpoint } = Grid

function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const screens = useBreakpoint()
  const [collapsed, setCollapsed] = useState(false)

  // 🔥 Full menu config
  const allMenuItems = [
    { key: '/admin', icon: <DashboardOutlined />, label: 'Dashboard' },

    { key: '/admin/users', icon: <UserOutlined />, label: 'Người dùng' },

    { key: '/admin/orders', icon: <ShoppingCartOutlined />, label: 'Đơn hàng' },

    { key: '/admin/products', icon: <ShopOutlined />, label: 'Sản phẩm' },

    { key: '/admin/categories', icon: <AppstoreOutlined />, label: 'Danh mục' },

    { key: '/admin/options', icon: <SettingOutlined />, label: 'Size & Topping' },

    { key: '/admin/promotions', icon: <TagOutlined />, label: 'Khuyến mãi' },

    { key: '/admin/reviews', icon: <StarOutlined />, label: 'Đánh giá' },

    { key: '/admin/posts', icon: <FileTextOutlined />, label: 'Bài viết' },

    { key: '/admin/stores', icon: <EnvironmentOutlined />, label: 'Chi nhánh' },

    { key: '/admin/payments', icon: <CreditCardOutlined />, label: 'Thanh toán' },

    { key: '/admin/banners', icon: <PictureOutlined />, label: 'Banner' },

    { key: '/admin/settings', icon: <SettingOutlined />, label: 'Cấu hình' },

    { key: '/admin/reports', icon: <BarChartOutlined />, label: 'Báo cáo' },
  ]

  // 🔐 Role-based filter
  const menuItems = useMemo(() => {
    if (!user) return []

    if (user.role === 'admin') return allMenuItems

    // staff chỉ thấy 1 số menu
    if (user.role === 'staff') {
      return allMenuItems.filter(item =>
        [
          '/admin',
          '/admin/orders',
          '/admin/products',
          '/admin/categories'
        ].includes(item.key)
      )
    }

    return []
  }, [user])

  // 👤 Dropdown user
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => navigate('/admin/profile')
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: () => {
        logout()
        localStorage.removeItem('access_token')
        navigate('/login')
      }
    }
  ]

  const handleMenuClick = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        width={280}
        theme="dark"
        style={{
          position: 'fixed',
          height: '100vh',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto'
        }}
      >
        {/* LOGO */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {!collapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <HomeOutlined style={{ fontSize: 22, color: '#c08a19' }} />
              <Text strong style={{ color: '#fff' }}>
                Coffee Admin
              </Text>
            </div>
          ) : (
            <HomeOutlined style={{ fontSize: 22, color: '#c08a19' }} />
          )}
        </div>

        {/* MENU */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ marginTop: 10 }}
        />
      </Sider>

      {/* MAIN */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 280,
          transition: 'margin-left 0.2s ease'
        }}
      >
        {/* HEADER */}
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: '#fff',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Text strong>Bảng điều khiển</Text>
          </div>

          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <Avatar
                size="large"
                src={user?.avatar}
                style={{ backgroundColor: '#c08a19' }}
              />
              {!screens.xs && (
                <div>
                  <Text strong>{user?.full_name || 'Admin'}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {user?.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
                  </Text>
                </div>
              )}
            </div>
          </Dropdown>
        </Header>

        {/* CONTENT */}
        <Content style={{ padding: 16, background: '#f5f5f5' }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 8,
              minHeight: 'calc(100vh - 140px)',
              padding: 16
            }}
          >
            <Suspense
              fallback={
                <div style={{ textAlign: 'center', paddingTop: 100 }}>
                  <Spin size="large" />
                  <div style={{ marginTop: 10 }}>Đang tải...</div>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout