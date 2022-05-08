import Home from 'pages/Home'
import Map from 'pages/Map'
import './App.scss'
import { Row, Col } from 'antd'

import 'antd/dist/antd.css'

function App() {
  return (
    <Row justify='center' wrap={false} span={24}>
      <Col flex='400px'>
        <Home />
      </Col>
      <Col flex='600px'>
        <Map />
      </Col>
    </Row>
  )
}

export default App
