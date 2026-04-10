import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from '../components/Loading'

import UserLayout from '../layouts/UserLayout'
import AdminLayout from '../layouts/AdminLayout'

import AuthGuard from '../components/AuthGuard/AuthGuard'
import GuestGuard from '../components/AuthGuard/GuestGuard'

// ===== Public Pages =====
const Home = lazy(() => import('../pages/Home'))
const Menu = lazy(() => import('../pages/Menu'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const Blogs = lazy(() => import('../pages/Blogs'))
const BlogsDetail = lazy(() => import('../pages/BlogsDetail'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))

// ===== User =====
const UserProfile = lazy(() => import('../pages/UserProfile'))
const UserOrdersHistory = lazy(() => import('../pages/UserOrdersHistory'))
const UserAddress = lazy(() => import('../pages/UserAddress'))

// ===== Cart =====
const Cart = lazy(() => import('../pages/Cart'))
const OrderConfirmation = lazy(() => import('../pages/OrderConfirmation'))
const OrderSuccess = lazy(() => import('../pages/OrderSuccess'))

// ===== Auth =====
const Authentication = lazy(() => import('../pages/Authentication'))
const RegistrationSuccess = lazy(() => import('../pages/RegistrationSuccess'))
const VerifyEmail = lazy(() => import('../pages/VerifyEmail'))
const ResetPassword = lazy(() => import('../pages/ResetPassword'))

// ===== Services =====
const Services = lazy(() => import('../pages/Services'))
const ServicesDetail = lazy(() => import('../pages/ServicesDetail'))
const FAQ = lazy(() => import('../pages/FAQ/FAQ'))

// ===== Admin =====
const Dashboard = lazy(() => import('../pages/Admin/Dashboard'))
const AdminProducts = lazy(() => import('../pages/Admin/Products'))
const AdminCategories = lazy(() => import('../pages/Admin/Categories'))
const AdminOrders = lazy(() => import('../pages/Admin/Orders'))
const AdminUsers = lazy(() => import('../pages/Admin/Users'))
// const AdminBlogs = lazy(() => import('../pages/Admin/Blogs'))
// const AdminBlogsCreate = lazy(() => import('../pages/Admin/Blogs/Create'))
// const AdminBlogsEdit = lazy(() => import('../pages/Admin/Blogs/Edit'))
// const AdminBlogsDetail = lazy(() => import('../pages/Admin/Blogs/Detail'))
// const Reports = lazy(() => import('../pages/Admin/Reports/Reports'))
const AdminProfile = lazy(() => import('../pages/Admin/Profile/AdminProfile'))

// ===== Other =====
const AccessDenied = lazy(() => import('../pages/AccessDenied'))
const NotFound = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading message="Đang tải..." />}>
      <Routes>

        {/* ===== USER LAYOUT ===== */}
        <Route path="/" element={<UserLayout />}>

          {/* Public */}
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogsDetail />} />

          {/* Services */}
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServicesDetail />} />
          <Route path="faq" element={<FAQ />} />

          {/* Auth */}
          <Route
            path="auth"
            element={
              <GuestGuard>
                <Authentication />
              </GuestGuard>
            }
          />
          <Route path="register-success" element={<RegistrationSuccess />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="reset-password" element={<ResetPassword />} />

          {/* Cart */}
          <Route path="cart" element={<Cart />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="order-success" element={<OrderSuccess />} />

          {/* Protected User */}
          <Route element={<AuthGuard roles={['USER', 'ADMIN']} />}>
            <Route path="user/profile" element={<UserProfile />} />
            <Route path="user/orders" element={<UserOrdersHistory />} />
            <Route path="user/address" element={<UserAddress />} />
          </Route>

        </Route>

        {/* ===== ADMIN ===== */}
        <Route element={<AuthGuard roles={['ADMIN', 'STAFF']} />}>
          <Route path="/admin" element={<AdminLayout />}>

            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />

            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />

            {/* <Route path="blogs" element={<AdminBlogs />} />
            <Route path="blogs/create" element={<AdminBlogsCreate />} />
            <Route path="blogs/edit/:id" element={<AdminBlogsEdit />} />
            <Route path="blogs/:id" element={<AdminBlogsDetail />} /> */}

            {/* <Route path="reports" element={<Reports />} /> */}
            <Route path="profile" element={<AdminProfile />} />

          </Route>
        </Route>

        {/* ===== ACCESS DENIED ===== */}
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* ===== 404 ===== */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Suspense>
  )
}