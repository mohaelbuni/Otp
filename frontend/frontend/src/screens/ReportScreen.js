import React, { useState, useRef} from "react"
import { useReactToPrint } from "react-to-print"
import axios from "axios"
import { Row, Col, Card, Container, Button, Form } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Aux from "../hoc/_Aux/index"
import {ReportScreenToPrint} from "./ReportScreenToPrint"


const ReportScreen = () => {
  const [barcode, setBarcode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [data, setData] = useState({})


  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

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
              <Card.Title as='h5'>Reports</Card.Title>
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
              <ReportScreenToPrint ref={componentRef} data={data} />
              <Button
                className='m-2'
                variant='primary'
                type='button'
                onClick={handlePrint}
              >
                Print
              </Button>
            </Aux>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default ReportScreen
