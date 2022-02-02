import React, { useState, useRef, useEffect } from "react"
import { useReactToPrint } from "react-to-print"
import { Button ,Row,Col } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { BranchHistoryToPrint } from "./BranchHistoryToPrint"
import Aux from "../hoc/_Aux/index"
import axios from "axios"
function BranchHistory() {
  const { code } = useParams()

  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchBrachData = async () => {
      const { data } = await axios.get(`/barcode/company/${code}`)
      setData(data)
    }
    fetchBrachData()
  }, [code])

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Aux>
      {data ? (
        <Aux>
          <Row >
          <Col className="text-center">
          <Button
            className='m-2'
            variant='primary'
            type='button'
            onClick={handlePrint}
          >
            Print
          </Button>
          </Col>
          </Row>

          <BranchHistoryToPrint ref={componentRef} data={data} />

          {/* <Button
            className='m-2'
            variant='primary'
            type='button'
            onClick={handlePrint}
          >
            Print
          </Button> */}
        </Aux>
      ) : (
        ""
      )}
    </Aux>
  )
}

export default BranchHistory
