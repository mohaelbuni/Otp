import React from "react"
import { Row, Col, Card, Table, Image } from "react-bootstrap"
import Aux from "../hoc/_Aux/index"

export const ReportScreenToPrint = React.forwardRef((props, ref) => {
  const date = new Date()
  return (
    <Aux>
      <Card
        ref={ref}
        style={{
          textAlign: "center",
          marginRight: "100px",
          marginLeft: "100px",
        }}
        className='my-5 py-5'
      >
        <Row style={{paddingTop:'20px'}}>
          <Col style={{ textAlign: "left", marginLeft: "50px" }}>
            <p>التـــــــــاريخ</p>
            <p>
              {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
            </p>
          </Col>
          <Col style={{ textAlign: "right", marginRight: "50px" }}>
            <p>
              <Image src='/images/Logo.png'></Image>{" "}
            </p>
          </Col>
        </Row>
        <hr />
        <br />
        <Row style={{ paddingTop: "50px" }}>
          <Col>
            <h2> الســـــــلام عليــــــكم </h2>
            <br />
            <h4> Information Security Department </h4>
          </Col>
        </Row>
        <br />
        <br />
        <Row style={{ paddingTop: "50px" }}>
          <Col style={{ textAlign: "right", marginRight: "5px" }}>
            <h4>:OTP إفــادة بتسليــم </h4>
          </Col>
        </Row>
        <Row style={{ paddingTop: "50px" }}>
          <Col md={1}></Col>

          <Col md={10}>
            {/* <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Number of OTP</th>
                  <th>Recipent Name</th>
                  <th>Branch</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>{"100"}</th>
                  <td>{"الصادق خيري ابوحميدة"}</td>
                  <td>{'السياحية'}</td>
                  <td>{date.getDate()}/{date.getMonth()}/{date.getFullYear()}</td>
                </tr>
              </tbody>
            </Table> */}
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Recipent Name</th>
                  <th>Branch</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>{props.data.barcode}</th>
                  <td>{props.data.recipent_name}</td>
                  <td>{props.data.branch}</td>
                  <td>{props.data.date}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={1}></Col>
        </Row>

        <Row
          style={{ textAlign: "right", marginRight: "5px", paddingTop: "70px" }}
        >
          <Col></Col>

          <Col style={{ textAlign: "right" }}>
            <h5> :التوقيع</h5>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <h5> :المستلم</h5>
          </Col>
        </Row>
        <Row
          style={{ textAlign: "left", marginLeft: "10px", paddingTop: "30px" }}
        >
          <Col>
            <h5 style={{ marginLeft: "0px" }}>
              مساعد مدير إدارة تقنية المعلومات
            </h5>
            <h6 style={{ marginLeft: "0px" }}>محمد الهادي رحاب</h6>
          </Col>
        </Row>
        <Row style={{ textAlign: "right", marginRight: "10px" }}>
          <Col>
            <h5>
              عبدالمهيمن البوني <i class='fas fa-feather-alt'></i>
            </h5>
          </Col>
        </Row>
      </Card>
    </Aux>
  )
})
