import './DishDetail.scss'
import { Col, Row, Image, InputNumber, Button } from 'antd'
import { Icon } from '@iconify/react'
import { StarRating, DishCarousel } from 'components'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { useNavigate } from 'react-router-dom'
import { Stamp } from 'components'

const DishDetail = ({ data, dishState, type }) => {
  const navigate = useNavigate()

  return (
    <div className="DishDetail">
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          xl={{ span: 12 }}
          className="image-wrapper"
        >
          <Image
            src={data.image}
            width={'100%'}
            height={'100%'}
            fallback={require('assets/images/image-not-found.png')}
          />
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          xl={{ span: 12 }}
          className="dish-content"
        >
          <div>
            {data.available ? (
              <div className="status available-true">Có phục vụ</div>
            ) : (
              <div className="status available-false">Ngưng phục vụ</div>
            )}
            <Icon
              icon="grommet-icons:link-previous"
              width={32}
              height={32}
              className="prev-button"
              onClick={() => {
                if (type !== 'management') return navigate(-1)
              }}
            />
          </div>
          <p className="title">{data.dishName}</p>
          <p className="description">{data.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p className="price">{formatCurrency(data.price)}</p>

              <div className="rating">
                <StarRating rating={data.rating} />
                <p>{data.rating} ratings</p>
              </div>
            </div>
            <div>
              {data.classify === 'starter' && (
                <Stamp fontSize={'1.5rem'} type={'is-starter'} content={'Món khai vị'} />
              )}
              {data.classify === 'main' && (
                <Stamp fontSize={'1.5rem'} type={'is-main'} content={'Món chính'} />
              )}
              {data.classify === 'dessert' && (
                <Stamp fontSize={'1.5rem'} type={'is-dessert'} content={'Món tráng miệng'} />
              )}
              {data.classify === 'drinks' && (
                <Stamp fontSize={'1.5rem'} type={'is-drinks'} content={'Thức uống'} />
              )}
            </div>
          </div>
          <div className="quantity">
            <p>Số lượng:</p>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              style={{
                width: '200px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
              }}
            />
            <div className="btn-wrapper">
              <Button size={'large'} className="btn-cart" disabled={type === 'management'}>
                Thêm vào yêu thích
              </Button>
              <Button size={'large'} className="btn-buy" disabled={type === 'management'}>
                Đặt món
              </Button>
            </div>
          </div>
          <p className="category">Phân loại: {data.categoryName}</p>
          <div className="share">
            <p>Chia sẽ:</p>
            <Icon icon="ic:sharp-facebook" width={32} height={32} className="s-fb" />
            <Icon icon="ant-design:twitter-circle-filled" width={32} height={32} className="s-tw" />
            <Icon icon="mage:instagram-circle" width={32} height={32} className="s-is" />
          </div>
        </Col>
      </Row>
      <div className="description">
        <p className="tabs">Mô tả chi tiết</p>
        {data.description.split('\n').map((item, index) => {
          return <p key={`dish-index-${index}`}>{item}</p>
        })}
      </div>
      <div className="similar-dishes">
        <p>Món ăn tương tự</p>
        {type !== 'management' ? (
          <DishCarousel
            data={dishState.lsDishes.filter((item) => item.classify === data.classify)}
          />
        ) : (
          <DishCarousel data={[data, data, data, data, data]} type={type} />
        )}
      </div>
    </div>
  )
}

export default DishDetail
