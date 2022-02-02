import React from "react"
import { Row, Col, Card, Table } from "react-bootstrap"
import Aux from "../hoc/_Aux/index"

export const BranchHistoryToPrint = React.forwardRef((props, ref) => {
  return (
    <Aux>
      <div ref={ref}>
        <Card  className='text-center py-3'>
          <Card.Header>
            <h4>المصرف الليبي الإسلامي فرع ({props.data[0].branch})</h4>
          </Card.Header>
          <Card.Body>
            <Row style={{ paddingTop: "50px" }}>
              <Col md={1}></Col>

              <Col md={10}>
                <Table responsive bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Barcode</th>
                      <th>Recipent Name</th>
                      <th>Branch</th>
                      <th>date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope='row'>{index + 1}</th>
                          <th>{item.barcode}</th>
                          <td>{item.recipent_name}</td>
                          <td>{item.branch}</td>
                          <td>{item.date}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Col>
              <Col md={1}></Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Aux>
  )
})
