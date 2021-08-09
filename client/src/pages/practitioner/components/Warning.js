import React, { useRef } from 'react'
import { Carousel, Button } from 'antd'
import style from '../styles.less'
import { Trans, withI18n } from '@lingui/react'

const onChange = (a, b, c) => {
  console.log(a, b, c)
}

const text =
  'Өвчтөн К. ТӨМӨРБАТ-ын ЭЛЭГНИЙ ҮЙЛ АЖИЛЛАГАА - АсаТ шинжилгээний үзүүлэлт +150IU нэгжээр өөрчлөгдөж гарлаа.'

const Warning = props => {
  const carousel = useRef(null)

  const onNext = () => {
    carousel.current.next()
  }

  const onPrevious = () => {
    carousel.current.prev()
  }

  return (
    <div style={{ height: '174px', border: '1px solid black' }}>
      <div className={style.carousel}>
        <Carousel ref={carousel} afterChange={onChange}>
          <div style={{ fontSize: '16px' }}>{text}</div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button className="button-grey" onClick={onPrevious}>
          <span className="uppercase">
            <Trans id="Previous" />
          </span>
        </Button>
        <Button
          className="button-red"
          style={{ marginLeft: '11px' }}
          onClick={onNext}
        >
          <span className="uppercase">
            <Trans id="Next" />
          </span>
        </Button>
      </div>
    </div>
  )
}

export default withI18n()(Warning)
