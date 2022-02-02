import React, { useState, useRef} from "react"
import { useReactToPrint } from "react-to-print"
import axios from "axios"
import { Row, Col, Card, Container, Button, Form,Dropdown } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Aux from "../hoc/_Aux/index"
import {ReportScreenToPrint} from "./ReportScreenToPrint"


const ReportScreen = () => {
  const [reportType,setReportType] = useState('')
  const [numberOfOtp, setNumberOfOtp] = useState("")
  const [branchName, setBranchName] = useState("")
  const [name, setName] = useState("")
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

  const onClickHandlerBranch = (e) => {
    e.preventDefault()
    const branchData = {
      name:null,
      branch:null,
      number:null
    }
    setLoading(true)
    if(name){
      branchData.name = name
      
      if(branchName){
        branchData.branch = branchName
        
        if(numberOfOtp){
          branchData.number = numberOfOtp
          setName("")
          setBranchName("")
          setNumberOfOtp("")
          setLoading(false)
          setMessage("successfully.")
          setError(null)
          setData(branchData)
        }else{
          // alert("Please enter all required data")
          setError("please enter all required data")
          setMessage(null)
          setLoading(false)
        }
      }else{
        // alert("Please enter all required data")
        setError("please enter all required data")
        setMessage(null)
        setLoading(false)
      }
    }else{
      // alert("Please enter all required data")
      setError("please enter all required data")
      setMessage(null)
      setLoading(false)
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
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          اختار نوع التقرير
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={(e)=>{
            e.preventDefault()
            setReportType('person')
          }}>تقرير لفرد</Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={(e)=>{
            e.preventDefault()
            setReportType('branch')
          }}>تقرير لفرع</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Row>
      {reportType === 'person' ? (
        <Row className='text-center py-3'>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Reports For Person</Card.Title>
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
      ) : (        
      <Row className='text-center py-3'>
      <Col>
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Reports For Branch</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form className='text-center py-3'>
              <Form.Group controlId='ControlInput1'>
                <Form.Control
                  className='my-1 w-50 mx-auto text-center'
                  type='input'
                  placeholder='اسم المستلم'
                  value={name}
                  onKeyPress={onKeyPressHandler}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group controlId='ControlInput1'>
                <Form.Control
                  className='my-1 w-50 mx-auto text-center'
                  type='input'
                  placeholder='اسم الفرع'
                  value={branchName}
                  onKeyPress={onKeyPressHandler}
                  onChange={(e) => {
                    setBranchName(e.target.value)
                  }}
                />
              </Form.Group>
              <Form.Group controlId='ControlInput1'>
                <Form.Control
                  className='my-1 w-50 mx-auto text-center'
                  type='input'
                  placeholder='العدد'
                  value={numberOfOtp}
                  onKeyPress={onKeyPressHandler}
                  onChange={(e) => {
                    setNumberOfOtp(e.target.value)
                  }}
                />
              </Form.Group>
              <Button
                className='m-2'
                variant='primary'
                type='button'
                onClick={onClickHandlerBranch}
              >
                Submit
              </Button>
            </Form>
            {loading ? <Loader /> : ""}

            {error ? <Message variant='danger'>{error}</Message> : ""}
          </Card.Body>
        </Card>
        {message ? (
          <Aux>
            <ReportScreenToPrint ref={componentRef} data={data} report={'branch'} />
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
    </Row>)}
      
    </Container>
  )
}

export default ReportScreen
