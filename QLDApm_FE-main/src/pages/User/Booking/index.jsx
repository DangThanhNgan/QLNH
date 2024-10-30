import './Booking.scss'
import dayjs from 'dayjs'
import { Icon } from '@iconify/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ReservationCard } from 'components'
import {
  Card,
  Col,
  Row,
  Checkbox,
  Tag,
  Popconfirm,
  Button,
  Table,
  TimePicker,
  Input,
  Modal,
} from 'antd'
import { fakeTable } from 'data'
import { formatCurrency } from 'components/CommonFunction/formatCurrency'
import { StarRating } from 'components'

const Booking = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useState({})
  const headerStickyRef = useRef(null)
  const [isSticky, setIsSticky] = useState(false)
  const [checkedValues, setCheckedValues] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  })
  const [open, setOpen] = useState(false)

  const [dataSource, setDataSource] = useState([
    {
      id: '20241001023Wk9u7KR',
      key: 1,
      dishName: 'Bánh mỳ bơ nhân mứt Kaya',
      image:
        'https://i.ytimg.com/vi/BeNcbyxsljg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCCMNvdaJJZnFuwVyTzpuOJg528kw',
      price: 89000,
      quantity: 2,
      rating: 4,
    },
    {
      id: '2024100102fxLzEcaF',
      key: 2,
      dishName: 'Sinh tố xoài',
      image:
        'https://dayphache.edu.vn/wp-content/uploads/2016/02/cach-lam-sinh-to-xoai-sua-dac.jpg',
      price: 89000,
      quantity: 2,
      rating: 4,
    },
    {
      id: '202410010538LHpHoT',
      key: 3,
      dishName: 'Panettone',
      image:
        'https://img-global.cpcdn.com/recipes/b44d69880fd60055/680x482cq70/panettone-recipe-main-photo.webp',
      price: 89000,
      quantity: 2,
      rating: 4,
    },
    {
      id: '202410010538LHpHoT',
      key: 4,
      dishName: 'Panettone',
      image:
        'https://img-global.cpcdn.com/recipes/b44d69880fd60055/680x482cq70/panettone-recipe-main-photo.webp',
      price: 89000,
      quantity: 2,
      rating: 4,
    },
    {
      id: '202410010538LHpHoT',
      key: 5,
      dishName: 'Panettone',
      image:
        'https://img-global.cpcdn.com/recipes/b44d69880fd60055/680x482cq70/panettone-recipe-main-photo.webp',
      price: 89000,
      quantity: 2,
      rating: 4,
    },
  ])
  const [time, setTime] = useState(dayjs('08:00', 'HH:mm'))

  const columns = [
    {
      title: 'Món ăn',
      dataIndex: 'dishName',
      key: 'dishNameBT',
      width: '35%',
      render: (_, record) => (
        <div className="d-wrapper">
          <img src={record.image} alt="dish" />
          <div>
            <p
              style={{ fontWeight: 'bold' }}
              onClick={() => {
                navigate(`/home/menu/dish/${record.id}`)
              }}
            >
              {record.dishName}
            </p>
            <StarRating rating={record.rating} />
          </div>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'priceBT',
      width: '20%',
      render: (e) => formatCurrency(e),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantityBT',
      width: '15%',
    },
    {
      title: 'Tổng',
      dataIndex: 'summaryPrice',
      key: 'summaryPriceBT',
      width: '20%',
      render: (_, record) => formatCurrency(record.price * record.quantity),
    },
    {
      title: 'Xóa',
      key: 'deleteBT',
      width: '10%',
      render: (_, record) => (
        <div className="btn-wrapper">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <Button>
              <Icon icon="material-symbols:delete" width={28} height={28} />
            </Button>
          </Popconfirm>
        </div>
      ),
      isSearched: false,
    },
  ]

  const onChangeTime = (time) => {
    setTime(time)
    console.log(time)
  }

  const showModal = () => {
    setOpen(true)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const handleDelete = (e) => {
    const updatedData = dataSource.filter((item) => item.id !== e.id)
    setDataSource(updatedData)
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  useEffect(() => {
    const handleScroll = () => {
      if (headerStickyRef.current) {
        const offsetTop = headerStickyRef.current.getBoundingClientRect().top
        setIsSticky(offsetTop <= 0)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const paramsArray = location.search.split('?').slice(1)

    const newParams = {}

    paramsArray.forEach((param) => {
      const [key, value] = param.split('=')
      newParams[key] = value
    })
    setParams(newParams)
    return () => {}
  }, [location])

  return (
    <div className="Booking">
      <ReservationCard />
      <Row>
        <Col sm={{ span: 0 }} md={{ span: 10 }} style={{ paddingRight: 60 }}>
          <Card className={`header-sticky ${isSticky ? 'sticky' : ''}`} ref={headerStickyRef}>
            <p>Bộ lọc tìm kiếm</p>
            <div style={{ marginBottom: 20 }}>
              <p>Khung giờ</p>
              <div>
                <Checkbox
                  name="morning"
                  checked={checkedValues.morning}
                  onChange={handleCheckboxChange}
                >
                  Buổi sáng 08:00 - 12:00 (0)
                </Checkbox>
                <Checkbox
                  name="afternoon"
                  checked={checkedValues.afternoon}
                  onChange={handleCheckboxChange}
                >
                  Buổi chiều 12:00 - 17:00 (0)
                </Checkbox>
                <Checkbox
                  name="evening"
                  checked={checkedValues.evening}
                  onChange={handleCheckboxChange}
                >
                  Buổi tối 17:00 - 20:00 (18)
                </Checkbox>
              </div>
            </div>
            <div className="t-b-type">
              <p>Loại bàn</p>
              <div>
                {[...new Map(fakeTable.map((item) => [item.capacity, item])).values()]
                  .sort((a, b) => a.capacity - b.capacity)
                  .map((item, index) => {
                    return (
                      <Tag className="pt" key={`type-table-${index}`}>
                        {item.capacity} người
                      </Tag>
                    )
                  })}
              </div>
            </div>
            <div className="payment">
              <p style={{ marginBottom: 25 }}>Coupon</p>
              <Input
                size="large"
                placeholder="large size"
                prefix={
                  <Icon icon="mingcute:coupon-line" width={28} height={28} style={{ height: 32 }} />
                }
              />
            </div>
          </Card>
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 14 }} className="m-content">
          <div className="t-wrapper">
            <div>
              <p>Giờ nhận bàn:</p>
              <TimePicker
                value={time}
                onChange={onChangeTime}
                size="large"
                format={'HH:mm'}
                allowClear={false}
              />
            </div>
            <div className="btn-order" onClick={showModal}>
              Đặt bàn
            </div>
            <Modal
              title="Kiểm tra lại thông tin đặt bàn!"
              open={open}
              onOk={hideModal}
              onCancel={hideModal}
              okText="Xác nhận"
              cancelText="Hủy"
              okButtonProps={{
                style: {
                  height: '42px',
                },
              }}
              cancelButtonProps={{
                style: {
                  height: '42px',
                },
              }}
            >
              <p style={{ paddingTop: 20, paddingBottom: 5 }}>
                Ngày đặt bàn: <b>{`${params.day}/${params.month}/${params.year}`}</b>
              </p>
              <p style={{ paddingBottom: 5 }}>
                Giờ đặt bàn: <b></b>
              </p>
              <p style={{ paddingBottom: 5 }}>
                Loại bàn: <b>{params.tT}</b> người
              </p>
              <p style={{ paddingBottom: 5 }}>
                Tổng số bàn: <b>{params.tC}</b> bàn
              </p>
              <div>
                <p>Món ăn:</p>
                <ul style={{ marginLeft: 50 }}>
                  {dataSource.map((item, index) => {
                    return (
                      <li key={`list-item-${index}`}>
                        {item.dishName} x{item.quantity}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Modal>
          </div>
          <Table
            dataSource={dataSource}
            columns={columns}
            className="d-table"
            pagination={false}
            footer={() => <div className="d-t-footer">Thêm món</div>}
          />

          {/* <div className="notification-content">
                        <img src={require('assets/images/notiMenu.png')} alt="" />
                        <p>Không tìm thấy bàn phù hợp!</p>
                    </div> */}
        </Col>
      </Row>
    </div>
  )
}

export default Booking
