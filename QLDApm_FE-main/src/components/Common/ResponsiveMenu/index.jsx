import './ResponsiveMenu.scss'
import { Row, Col } from 'antd'
import { Dish } from 'components'

const ResponsiveMenu = ({ data }) => {
  return (
    <div className="ResponsiveMenu">
      {data.length !== 0 ? (
        <Row>
          {data.map((item, index) => {
            return (
              <Col
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                xl={{ span: 6 }}
                className="product-wrapper"
                key={`dish-index-${index}`}
              >
                <Dish dataDish={item} cls={''} />
              </Col>
            )
          })}
        </Row>
      ) : (
        <div className="notification-content">
          <img src={require('assets/images/notiMenu.png')} alt="" />
          <p>Không có món ăn liên quan!</p>
        </div>
      )}
    </div>
  )
}

export default ResponsiveMenu
