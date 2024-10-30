import './NavBar.scss'
import { Icon } from '@iconify/react'
import { Row, Col } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

export default function NavBar({ page }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Row className={`NavBar ${page === 'Home' ? 'h' : ''}`}>
      <Col xs={{ span: 20 }} sm={{ span: 8 }} md={{ span: 6 }} xl={{ span: 5 }}>
        <a className="brand" href="/">
          SFlavors
        </a>
      </Col>
      <Col xs={{ span: 0 }} sm={{ span: 0 }} md={{ span: 0 }} xl={{ span: 11 }} className="nav-d">
        <a href="/" className={`${location.pathname === '/' ? 'selected' : ''}`}>
          Trang chủ
        </a>
        <a
          href="/home/menu"
          className={`${location.pathname.split('/')[2] === 'menu' ? 'selected' : ''} `}
        >
          Thực đơn
        </a>
        <a
          href="/home/reservation"
          className={`${location.pathname.split('/')[2] === 'reservation' ? 'selected' : ''} `}
        >
          Đặt chỗ
        </a>
        <a
          href="/home/chefs"
          className={`${location.pathname === '/home/chefs' ? 'selected' : ''} `}
        >
          Về chúng tôi
        </a>
      </Col>
      <Col xs={{ span: 4 }} sm={{ span: 16 }} md={{ span: 18 }} xl={{ span: 8 }} className="user-f">
        <Icon
          icon="uil:user"
          width={26}
          height={26}
          className="user-f-action"
          onClick={() => {
            return navigate('/auth/login')
          }}
          color="#FFFFFF"
        />
        <Icon
          icon="solar:cart-4-outline"
          width={26}
          height={26}
          className="user-f-action"
          onClick={() => {
            return navigate('/home/reservation/cart')
          }}
          color="#FFFFFF"
        />
        <Icon icon="ooui:menu" width={26} height={26} className="menu" />
      </Col>
    </Row>
  )
}
