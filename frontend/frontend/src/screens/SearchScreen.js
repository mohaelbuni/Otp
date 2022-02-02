import React, { useState } from "react"
import axios from "axios"
import { Row, Col, Card, Container, Button, Form } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Aux from "../hoc/_Aux/index"

function SearchScreen() {
  const [barcode, setBarcode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState({})

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onClickHandler(e)
    }
  }

  const onClickHandler = (e) => {
    e.preventDefault()
    if (barcode) {
      async function postOTP() {
        try {
          setLoading(true)
          let { data } = await axios.get(`/barcode/getOTPs/${barcode}`)
          setLoading(false)
          setData(data)
          setMessage("successfully.")
          setError(null)
          setBarcode("")
        } catch (error) {
          setError(error.response.data.message)
          setMessage(null)
          setLoading(false)
        }
      }
      postOTP()
    } else {
      alert("Please enter all required data")
    }
  }

  return (
    <Container>
      <Row className='text-center py-3'>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Search</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form className='text-center py-3'>
                <Form.Group controlId='ControlInput1'>
                  <Form.Control
                    className='my-1 w-50 mx-auto text-center'
                    type='input'
                    placeholder='أدخل الشفرة'
                    value={barcode}
                    onKeyPress={onKeyPressHandler}
                    onChange={(e) => {
                      setBarcode(e.target.value)
                    }}
                  />
                </Form.Group>
                <Button
                  className='m-2'
                  variant='primary'
                  type='button'
                  onClick={onClickHandler}
                >
                  Search
                </Button>
              </Form>
              {loading ? <Loader /> : ""}
             
              {error ? <Message variant='danger'>{error}</Message> : ""}
            </Card.Body>
          </Card>
          {message ? (
                <Aux>
                  <Card className='my-5 py-5'>
                    <Row>
                      <Col md={3}><h4>Barcode</h4></Col>
                      <Col md={3}><h4>Recipent Name</h4></Col>
                      <Col md={3}><h4>Branch</h4></Col>
                      <Col md={3}><h4>date</h4></Col>
                    </Row>

                        <Row className='py-2'>
                          <Col md={3}>{data.barcode}</Col>
                          <Col md={3}>{data.recipent_name}</Col>
                          <Col md={3}>{data.branch}</Col>
                          <Col md={3}>{data.date}</Col>
                        </Row>
     
                  </Card>
                </Aux>
              ) : (
                ""
              )}
        </Col>
      </Row>
    </Container>
  )
}

export default SearchScreen
