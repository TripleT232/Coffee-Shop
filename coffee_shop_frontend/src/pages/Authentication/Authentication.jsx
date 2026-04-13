import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Typography, Space, Divider, message, Breadcrumb, Modal, Grid } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, HomeOutlined, HeartOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import './Authentication.css'
import { useAuth } from '../../context/AuthContext'
import { getUserProfile } from '../../services/user.service'
import authenticationService from '../../services/authentication.service'
import { motion, AnimatePresence } from 'framer-motion'

const { Title, Text, Link } = Typography
const { useBreakpoint } = Grid

const Authentication = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const screens = useBreakpoint()
  const [activeTab, setActiveTab] = useState('login')
  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { login, setUser, setAccessToken } = useAuth()
  const [messageApi, contextHolder] = message.useMessage()
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
  const [forgotPasswordForm] = Form.useForm()
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)

  // Tự động chuyển tab dựa vào URL
  useEffect(() => {
    if (location.pathname === '/register') {
      setActiveTab('register')
    } else {
      setActiveTab('login')
    }
  }, [location.pathname])

  // Xử lý Google OAuth callback
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')
    const success = searchParams.get('success')
    const error = searchParams.get('error')

    if (error) {
      let errorMessage = 'Đăng nhập với Google thất bại!'
      if (error === 'google_auth_failed') {
        errorMessage = 'Không thể xác thực với Google. Vui lòng thử lại!'
      } else if (error === 'server_error') {
        errorMessage = 'Lỗi server. Vui lòng thử lại sau!'
      }
      message.error(errorMessage)
      navigate(location.pathname, { replace: true })
      return
    }

    if (token && success === 'google_auth_success') {
      localStorage.setItem('accessToken', token)
      setAccessToken(token)
      getUserProfile()
        .then(userProfile => {
          const profileUser = userProfile?.user
          if (profileUser) {
            setUser(profileUser)
            messageApi.success('Đăng nhập với Google thành công!')
            if (profileUser.role === 'admin') {
              localStorage.setItem('user', JSON.stringify(profileUser))
              navigate('/admin', { replace: true })
            } else {
              navigate('/', { replace: true })
            }
          }
        })
        .catch(err => {
          console.error('Error fetching user profile:', err)
          message.error('Không thể lấy thông tin người dùng!')
          navigate(location.pathname, { replace: true })
        })
    }
  }, [location.search, navigate, setUser, setAccessToken, messageApi])

  const showSuccessMessage = () => {
    messageApi.open({ type: 'success', content: 'Đăng nhập thành công!', duration: 3 })
  }

  const handleLogin = async (values) => {
    setLoading(true)
    try {
      const response = await login(values)
      if (response) {
        showSuccessMessage()
        try {
          const userProfile = await getUserProfile()
          const profileUser = userProfile?.user
          if (profileUser) {
            localStorage.setItem('user', JSON.stringify(profileUser))
            setUser(profileUser)
            if (profileUser.role === 'admin') {
              navigate('/admin', { replace: true })
            } else {
              navigate('/', { replace: true })
            }
          }
        } catch (profileError) {
          console.error('Error fetching user profile:', profileError)
          navigate('/', { replace: true })
        }
      }
    } catch (error) {
      const errorCode = error?.status || error?.data?.statusCode || error?.data?.code
      if (errorCode === 403) {
        message.error('Tài khoản chưa xác thực! Vui lòng xác thực tài khoản để đăng nhập')
      } else {
        message.error('Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    import('../../services/httpClient').then(({ getBaseUrl }) => {
      const apiBaseUrl = getBaseUrl()
      window.location.href = `${apiBaseUrl}/auth/google`
    }).catch(() => {
      const apiBaseUrl = import.meta?.env?.VITE_API_BASE_URL ||
        (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
          ? 'http://localhost:5000/api'
          : 'https://api.yanieandfriends.id.vn/api')
      window.location.href = `${apiBaseUrl}/auth/google`
    })
  }

  const handleForgotPassword = async (values) => {
    setForgotPasswordLoading(true)
    try {
      await authenticationService.forgotPassword({ email: values.email })
      messageApi.success('Đã gửi email hướng dẫn đặt lại mật khẩu!')
      setForgotPasswordModal(false)
      forgotPasswordForm.resetFields()
    } catch (error) {
      const errMsg = error?.data?.message || error?.message || 'Có lỗi xảy ra!'
      messageApi.error(errMsg)
    } finally {
      setForgotPasswordLoading(false)
    }
  }

  const handleRegister = async (values) => {
    setLoading(true)
    try {
      const payload = {
        full_name: values.fullName,
        email: values.email,
        password: values.password,
      }
      await authenticationService.register(payload)
      message.success('Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.')
      registerForm.resetFields()
      navigate('/register')
    } catch (error) {
      const errMsg = error?.data?.message || error?.message || 'Đăng ký thất bại!'
      message.error(errMsg)
    } finally {
      setLoading(false)
    }
  }

  const togglePanel = (tab) => {
    setActiveTab(tab)
    navigate(`/${tab}`)
  }

  // Animation variants for forms
  const formVariants = {
    login: {
      opacity: activeTab === 'login' ? 1 : 0,
      pointerEvents: activeTab === 'login' ? 'auto' : 'none',
      transition: { duration: 0.4 }
    },
    register: {
      opacity: activeTab === 'register' ? 1 : 0,
      pointerEvents: activeTab === 'register' ? 'auto' : 'none',
      transition: { duration: 0.4 }
    }
  }

  return (
    <div className="auth-page-container">
      {contextHolder}

      {/* Breadcrumb Section with Glassmorphism and Nav-style Hover effects */}
      <div className="container" style={{ paddingTop: 20, marginBottom: 10, display: 'flex', justifyContent: 'flex-start' }}>
        <div style={{ 
          /* background: 'rgba(255, 255, 255, 0.06)', */
          backdropFilter: 'blur(20px)', 
          padding: '8px 25px', 
          borderRadius: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '0 150px', /* Center the pill */
          display: 'inline-block'
        }}>
          <Breadcrumb
            separator={<span style={{ color: 'rgba(255,255,255,0.6)' }}>/</span>}
            items={[
              {
                title: (
                  <span 
                    className="breadcrumb-nav-item"
                    style={{ color: 'white', fontWeight: 600, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }} 
                    onClick={() => navigate('/')}
                  >
                    <HomeOutlined /> Hiên nhà Yanie &amp; Friends
                  </span>
                )
              },
              { 
                title: (
                  <span 
                    className="breadcrumb-nav-item"
                    style={{ color: 'white', fontWeight: 600, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {activeTab === 'login' ? 'Đăng nhập' : 'Đăng ký'}
                  </span>
                )
              }
            ]}
          />
        </div>
      </div>

      <div className="auth-sliding-wrapper">
        <div className="auth-box" id="main">

          {/* Sign Up Form Container (Fixed Left Side) */}
          <motion.div
            className="form-container sign-up-container"
            animate={formVariants.register}
            style={{ display: screens.md ? 'block' : (activeTab === 'register' ? 'block' : 'none') }}
          >
            <div className="auth-form-wrapper">
              <Title level={2} style={{ fontFamily: "'Playfair Display', serif" , color: "#BC6C25"}}>Tạo tài khoản</Title>
              <Text type="secondary" style={{ marginBottom: 20, display: 'block' }}>
                Gia nhập gia đình Yanie &amp; Friends ngay hôm nay 🍵
              </Text>

              <Form
                form={registerForm}
                name="register"
                onFinish={handleRegister}
                layout="vertical"
              >
                <Form.Item
                  name="fullName"
                  label="Họ và tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Nhập họ và tên" className="auth-input" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Nhập email của bạn" className="auth-input" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[{ required: true, min: 6, message: 'Ít nhất 6 ký tự!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) return Promise.resolve()
                        return Promise.reject(new Error('Mật khẩu không khớp!'))
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" />
                </Form.Item>

                <Button type="primary" htmlType="submit" className="auth-main-btn" loading={loading}>
                  Đăng ký
                </Button>
              </Form>

              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Text type="secondary" style={{ fontSize: 13 }}>Bạn đã có tài khoản? </Text>
                <Link onClick={() => togglePanel('login')} style={{ fontSize: 13 }} color="#8b5e3c">Đăng nhập ngay</Link>
              </div>
            </div>
          </motion.div>

          {/* Sign In Form Container (Fixed Right Side) */}
          <motion.div
            className="form-container sign-in-container"
            animate={formVariants.login}
            style={{ display: screens.md ? 'block' : (activeTab === 'login' ? 'block' : 'none') }}
          >
            <div className="auth-form-wrapper">
              <Title level={2} style={{ fontFamily: "'Playfair Display', serif" , color:"#BC6C25"}} >Đăng nhập</Title>
              <Text type="secondary" fontSize={{ fontSize: 13 }} style={{ marginBottom: 20, display: 'block', color: '#8b5e3c' }}>
                Chào mừng bạn quay lại Hiên nhà 🍵
              </Text>

              <Form
                form={loginForm}
                name="login"
                onFinish={handleLogin}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: 'email', message: 'Email không hợp lệ!' }]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Nhập email" className="auth-input" />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <Link onClick={() => togglePanel('register')} style={{ fontSize: 13 }}>
                    Bạn chưa có tài khoản sao?
                  </Link>
                  <p style={{ color: '#8b5e3c', fontFamily: "'Playfair Display', serif", fontSize: 13, margin: 0 }}>hay là </p>
                  <Link onClick={() => setForgotPasswordModal(true)} style={{ fontSize: 13 }}>
                    Bạn đã quên mật khẩu rồi?
                  </Link>
                </div>

                <Button type="primary" htmlType="submit" className="auth-main-btn" loading={loading}>
                  Đăng nhập
                </Button>
              </Form>

              <Divider plain><Text type="secondary" style={{ fontSize: 12 }}>Hoặc</Text></Divider>

              <button className="social-pill" onClick={handleGoogleLogin}>
                <GoogleOutlined style={{ marginRight: 10, color: '#db4437' }} />
                Đăng nhập với Google
              </button>
            </div>
          </motion.div>


          <motion.div
            className="overlay-container"
            animate={{
              x: activeTab === 'register' ? '100%' : '0%',
              scaleX: 1.02,
              z: 0
            }}
            transition={{
              type: 'tween',
              ease: [0.7, 0, 0.3, 1],
              duration: 0.6
            }}
            style={{ willChange: 'transform', transformOrigin: 'left center' }}
          >
            <motion.div
              className="overlay"
              animate={{ x: activeTab === 'register' ? '-50%' : '0%' }}
              transition={{
                type: 'tween',
                ease: [0.7, 0, 0.3, 1],
                duration: 0.6
              }}
              style={{ willChange: 'transform' }}
            >
              {/* Panel 1 (Visible at Login) - Invites to Register */}
              <div className="overlay-panel overlay-left">
                <Title level={1} style={{ color: '#BC6C25' }}>Chào mừng trở lại!🎉 </Title>
                <p style={{ textAlign: 'justify', color: '#BC6C25' }}>
                  Gác lại những bộn bề ngoài cửa, mời bạn bước vào góc nhỏ của riêng mình tại <span style={{ color: '#BC6C25', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Yanie &amp; Friends</span>.
                  Chỉ cần một bước đăng nhập đơn giản để giữ cho sợi dây kết nối giữa chúng mình luôn bền chặt.
                  Hãy để <span style={{ color: '#BC6C25', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Yanie &amp; Friends</span> được nhận ra bạn, được kể cho bạn nghe những điều mới mẻ và cùng bạn viết tiếp những chương tiếp theo của câu chuyện chúng mình.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1.1 }}
                  animate={{ opacity: [0.3, 0.8, 0.3], x: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="arrow-hint-inline right"
                  onClick={(e) => { e.stopPropagation(); togglePanel('register'); }}
                  style={{ cursor: 'pointer', zIndex: 999 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowRightOutlined />
                </motion.div>
              </div>

              {/* Panel 2 (Visible at Register) - Invites to Login */}
              <div className="overlay-panel overlay-right" >
                <Title level={1} style={{ color: '#BC6C25' }}>👋 Xin chào bạn mới!</Title>
                <p style={{ textAlign: 'justify', color: '#BC6C25' }}>Mỗi người bạn ghé thăm hiên nhà <span style={{ color: '#BC6C25', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>Yanie &amp; Friends</span> đều mang theo một câu chuyện riêng. Hãy dành chút thời gian để chúng mình được biết tên bạn, để mỗi lần bạn trở về, Yanie có thể đón tiếp bạn bằng sự chân thành nhất.
                  Cùng nhau, chúng ta sẽ bắt đầu hành trình lưu giữ những kỷ niệm nhỏ bé nhưng ngọt ngào ngay từ hôm nay.</p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1.1 }}
                  animate={{ opacity: [0.3, 0.8, 0.3], x: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="arrow-hint-inline left"
                  onClick={(e) => { e.stopPropagation(); togglePanel('login'); }}
                  style={{ cursor: 'pointer', zIndex: 999 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ArrowLeftOutlined />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px 0', background: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(2px)' }}>
        <Text style={{ fontSize: 13, color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
          Với việc bạn đã đăng nhập hoặc đã đăng ký, đồng nghĩa với{' '}
          <Link href="/terms-of-service" style={{ color: '#8b5e3c', fontWeight: 500 }}>Điều khoản sử dụng</Link>
          {' '}và{' '}
          <Link href="/privacy-policy" style={{ color: '#8b5e3c', fontWeight: 500 }}>Chính sách bảo mật </Link>
          đã được bạn đọc và đồng ý!
        </Text>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        title={<span style={{ color: '#8b5e3c', fontFamily: "'Playfair Display', serif", fontSize: screens.xs ? 18 : 20, fontWeight: 600, textAlign: 'center', display: 'block' }}>Bạn đã quên mật khẩu?</span>}
        open={forgotPasswordModal}
        onCancel={() => { setForgotPasswordModal(false); forgotPasswordForm.resetFields() }}
        footer={null}
        centered
        width={screens.xs ? '90%' : 480}
      >
        <div style={{ padding: screens.xs ? '16px 0' : '20px 0' }}>
          <Text type="secondary" style={{ fontSize: screens.xs ? 14 : 15, display: 'block', marginBottom: 24 }}>
            Cho chúng mình biết Email của bạn nhé!
          </Text>
          <Form form={forgotPasswordForm} onFinish={handleForgotPassword} layout="vertical">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không hợp lệ!' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Nhập email của bạn" size="large" className="auth-input" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Button onClick={() => { setForgotPasswordModal(false); forgotPasswordForm.resetFields() }}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={forgotPasswordLoading} className="auth-main-btn" style={{ width: 'auto', padding: '0 30px' }}>
                  Gửi email
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default Authentication
