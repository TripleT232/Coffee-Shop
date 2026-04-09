import React, { useState } from 'react'
import { Button, Select, InputNumber, Form, message } from 'antd'
import { ShoppingCartOutlined, RightOutlined } from '@ant-design/icons'
import './OrderWidget.css'

const { Option } = Select

const OrderWidget = ({ product }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  // 💰 Tính tiền
  const calculateTotal = () => {
    const quantity = form.getFieldValue('quantity') || 1
    const size = form.getFieldValue('size') || 'M'

    let total = product.price * quantity

    if (size === 'M') total += 5000 * quantity
    if (size === 'L') total += 10000 * quantity

    return total
  }

  // 🚀 Handle Order
  const handleOrder = async (values) => {
    try {
      setLoading(true)

      const payload = {
        product_id: product.id,
        quantity: values.quantity,
        size: values.size
      }

      console.log('ORDER:', payload)

      // 👉 call API Python sau
      // await createOrder(payload)

      setTimeout(() => {
        message.success('Đặt món thành công!')
        setLoading(false)
      }, 800)

    } catch (err) {
      console.log(err)
      message.error('Có lỗi xảy ra!')
      setLoading(false)
    }
  }

  return (
    <div className="order-widget">
      <div className="order-widget-card">
        <Form
          form={form}
          onFinish={handleOrder}
          initialValues={{
            quantity: 1,
            size: 'M'
          }}
        >
          <div className="widget-content-inline">

            {/* Size */}
            <div className="widget-field">
              <Form.Item name="size" className="widget-form-item">
                <Select className="widget-select">
                  <Option value="S">Size S</Option>
                  <Option value="M">Size M (+5k)</Option>
                  <Option value="L">Size L (+10k)</Option>
                </Select>
              </Form.Item>
            </div>

            {/* Quantity */}
            <div className="widget-field">
              <Form.Item name="quantity" className="widget-form-item">
                <InputNumber min={1} max={10} className="widget-input" />
              </Form.Item>
            </div>

            {/* Total */}
            <div className="widget-total">
              {calculateTotal()}đ
            </div>

            {/* Button */}
            <div className="widget-submit-wrapper">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="widget-submit-button"
                icon={<ShoppingCartOutlined />}
              >
                <span>ĐẶT NGAY</span>
                <RightOutlined />
              </Button>
            </div>

          </div>
        </Form>
      </div>
    </div>
  )
}

export default OrderWidget