import React, { useState } from 'react'
import {
  Modal, Form, InputNumber, Radio, Checkbox,
  Button, Typography, Row, Col, Card, Divider,
  message
} from 'antd'
import {
  ShoppingCartOutlined,
  CreditCardOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography

const OrderModal = ({ open, onCancel, product }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const [promoCode, setPromoCode] = useState('')

  // 💰 Tính tiền
  const calculateTotal = () => {
    const quantity = form.getFieldValue('quantity') || 1
    const size = form.getFieldValue('size')
    const toppings = form.getFieldValue('toppings') || []

    let total = product.price * quantity

    if (size === 'M') total += 5000 * quantity
    if (size === 'L') total += 10000 * quantity

    total += toppings.length * 5000 * quantity

    return total
  }

  // 🧾 Handle Order
  const handleOrder = async () => {
    try {
      const values = await form.validateFields()

      const payload = {
        product_id: product.id,
        quantity: values.quantity,
        size: values.size,
        toppings: values.toppings || [],
        promotion_code: promoCode || null
      }

      console.log('ORDER PAYLOAD:', payload)

      setLoading(true)

      // 👉 gọi API Python ở đây
      // await createOrder(payload)

      setTimeout(() => {
        message.success('Đặt món thành công!')
        setLoading(false)
        onCancel()
      }, 1000)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Title level={3}>
        <ShoppingCartOutlined /> Đặt món
      </Title>

      <Row gutter={24}>
        {/* LEFT */}
        <Col span={12}>
          <Card>
            <img
              src={product?.image}
              alt={product?.name}
              style={{ width: '100%', borderRadius: 8 }}
            />

            <Title level={4}>{product?.name}</Title>
            <Text type="secondary">{product?.description}</Text>

            <Divider />

            <Text strong>Giá: {product?.price}đ</Text>
          </Card>
        </Col>

        {/* RIGHT */}
        <Col span={12}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              quantity: 1,
              size: 'M'
            }}
          >
            {/* Quantity */}
            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={10} style={{ width: '100%' }} />
            </Form.Item>

            {/* Size */}
            <Form.Item name="size" label="Size">
              <Radio.Group>
                <Radio value="S">Nhỏ</Radio>
                <Radio value="M">Vừa (+5k)</Radio>
                <Radio value="L">Lớn (+10k)</Radio>
              </Radio.Group>
            </Form.Item>

            {/* Topping */}
            <Form.Item name="toppings" label="Topping">
              <Checkbox.Group>
                <Row>
                  <Col span={12}>
                    <Checkbox value="pearl">Trân châu (+5k)</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="foam">Kem cheese (+5k)</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value="jelly">Thạch (+5k)</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>

            {/* Promo */}
            <Form.Item label="Mã giảm giá">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Nhập mã..."
                style={{ width: '100%', padding: 8 }}
              />
            </Form.Item>

            <Divider />

            {/* TOTAL */}
            <div style={{ marginBottom: 16 }}>
              <Text strong>Tổng tiền: </Text>
              <Text style={{ fontSize: 18, color: '#d4380d' }}>
                {calculateTotal()}đ
              </Text>
            </div>

            <Button
              type="primary"
              block
              size="large"
              icon={<CreditCardOutlined />}
              loading={loading}
              onClick={handleOrder}
            >
              Thanh toán
            </Button>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}

export default OrderModal