import React from "react"
import { useState, useEffect } from "react"
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap"
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from "axios"
function OTPRegisterationScreen() {
  const [barcode, setBarcode] = useState(null)
  const [name, setName] = useState(null)
  let [company, setCompany] = useState('')
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [branches, setBranches] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBranches() {
      const { data } = await axios.get("/barcode/companies")
      setBranches(data)
    }
    fetchBranches()
  }, [])

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onClickHandler(e)
    }
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const onClickHandler = (e) => {
    e.preventDefault()
    if (barcode) {
      async function postOTP() {
        try {
          setLoading(true)
          console.log(company)
          await axios.post(
            "/barcode/getOTPs",
            { barcode: barcode, recipent_name: name, company_code: company },
            config
          )
          setInputValue1("")
          setBarcode("")
          // setName(null)
          setLoading(false)
          setMessage('Added successfully.')
          setError(null)
          
        } catch (error) {
          setError(error.response.data.message)
          console.log(error.response)
          setInputValue1("")
          setInputValue2('')
          setName(null)
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
              <Card.Title as='h5'>OTP Register</Card.Title>
            </Card.Header>
            <Card.Body>
              {loading ? <Loader/>: ''}
              {message ? <Message variant='success'>{message}</Message>: ''}
              {error ? <Message variant='danger'>{error}</Message>: ''}
              <Form className='text-center py-3'>
                <Form.Group controlId='ControlInput1'>
                  <Form.Control
                    className='my-1 w-50 mx-auto text-center'
                    type='input'
                    placeholder='أدخل الشفرة'
                    value={inputValue1}
                    onChange={(e) => {
                      if(e.target.value === ''){
                        setInputValue1(null)
                        setBarcode(null)
                      }else{
                        setInputValue1(e.target.value)
                        setBarcode(e.target.value)
                      }
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  <Form.Control
                    className='my-1 w-50 mx-auto text-center'
                    type='input'
                    placeholder='اسم المستلم'
                    value={inputValue2}
                    onChange={(e) => {
                      if(e.target.value === ''){
                        setInputValue2(null)
                        setName(null)
                      }else{
                        setInputValue2(e.target.value)
                        setName(e.target.value)
                      }
                    }}
                    onKeyPress={handleKeyPress}
                  />
                  <Form.Select
                    className='my-1 w-50 mx-auto text-center'
                    aria-label='Default select example'
                    onChange={(e) => {
                        setCompany(e.target.value)
                    }}
                  >
                    <option key='option1'>أختار الفرع</option>
                    {branches.map((branch,index) => {
                      return <option key={index} value={branch.code}>{branch.name}</option>
                    })}
                  </Form.Select>
                </Form.Group>
                <Button
                  className='m-2'
                  variant='primary'
                  type='button'
                  onClick={onClickHandler}
                >
                  ADD
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OTPRegisterationScreen
