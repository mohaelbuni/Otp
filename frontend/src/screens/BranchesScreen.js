import React from "react"
import { Row, Col, Card, Table } from "react-bootstrap"
import Aux from "../hoc/_Aux/index"
import axios from "axios"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"

function BranchesScreen() {
  const [branches, setBranches] = useState([])
  useEffect(() => {
    async function fetchBranches() {
      const { data } = await axios.get("/barcode/companies")
      setBranches(data)
    }
    fetchBranches()
  }, [])

  return (
    <Aux>
      <Row className='text-center py-3'>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as='h5'>Company Codes</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Code</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch, index) => {
                    return (
                      <tr>
                        
                        <th scope='row'>{index + 1}</th>
                        <td><Link to={`/branch/${branch.code}`} >{branch.name}</Link></td>
                        <td>{branch.code}</td>
                      </tr>
                   
                    )
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Aux>
  )
}

export default BranchesScreen
