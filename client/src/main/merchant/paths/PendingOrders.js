import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link,useParams} from "react-router-dom"
import { getacceptedorders,processOrder} from '../helper/merchantapicall';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'

export default function PendingOrders() {

    // For Modals 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [myModal, setMyModal] = useState(0);
  
    const {restaurantId} = useParams()

    const [orders, setorders] =useState([]);

    let status = ""
    
    const preload = () => {
        getacceptedorders(restaurantId).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setorders(data);
                console.log(data)
              }
        })
    }

    useEffect(() => {
        preload()
        setInterval(preload, 5000)
    }, [])

    const processThisOrder = (orderId,status) => {
      
      processOrder(orderId,restaurantId,{status,"updated":new Date().getTime()})
        .then(data=> {
            if(data.error){
                console.log(data.error)
            }
            else{
                preload();
            }
        })
    }

      

    return (
        <Base title="Welcome Kitchen" description="Process Orders">
        <Link className="btn btn-info rounded" to={`/merchant/dashboard`}>
        <span className="">Restaurant Home</span>
        </Link>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5" style={{fontFamily: 'Englebert'}}>PENDING ORDERS</h2>

            {orders.map((order, index) => (
              <div className="row">
              <div className="col-2">
              </div>
                <div key={index} className="row col-8 text-center mb-4 ml-3 mr-3 rounded bg-info">
                
                
                <div className="col-6 mt-2 mb-2">
                <ul className="list-group text-left">
                
                  <li className="list-group-item">
                      <span className="badge badge-success mr-2 ml-1">
                        Customer Table No:
                    </span><span className="text-primary">{order.tableNo}</span>
                    </li>

                    <li className="list-group-item">
                      <span className="badge badge-success mr-2 ml-1">
                        Transaction Id:
                    </span><span className="text-primary"> {order.transaction_id}</span>
                    </li>
                
                    <li className="list-group-item">
                      <span className="badge badge-success mr-2 ml-1">
                        Order Status:
                    </span><span className="text-primary">{order.status}</span>
                    </li>

                  </ul>
                </div>

                <div className="col-3 mt-4">
                  <button onClick={() => {
                      setMyModal(index)
                      handleShow()
                  }} className="btn btn-dark rounded">
                    View Order 
                  </button>
                </div>

                <div className="col-3 mt-4">
                  <button onClick={() => {
                    processThisOrder(order._id,"Processed")
                  }} className="btn btn-success rounded">
                    Process Order 
                  </button>
                </div>


                <Modal show={show} onHide={handleClose} centered >
                  <Modal.Header closeButton>
                      <Modal.Title>#{orders[myModal].transaction_id}</Modal.Title>
                  </Modal.Header>
                  
                  <Modal.Body>
                      <Container >
                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Transaction ID :
                          </Col>
                          <Col xs={6}>
                            {orders[myModal].transaction_id}
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Table No :
                          </Col>
                          <Col xs={6}>
                            {orders[myModal].tableNo ? orders[myModal].tableNo : 0}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Status :
                          </Col>
                          <Col xs={6}>
                            {orders[myModal].status}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4}className="btn btn-success rounded m-0 p-0 mb-1">
                              Amount :
                          </Col>
                          <Col xs={6}>
                            {orders[myModal].amount}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Payment Status :
                          </Col>
                          <Col xs={6}>
                          {orders[myModal].paymentStatus}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4} className="btn btn-info rounded m-0 p-0 mb-1">
                              Order Details :
                          </Col>
                        </Row>
                          
                            {orders[myModal].foods.map((f, index) => (
                              <Container>
                                <Row classname="mb-2">
                                    <Col xs={6}>
                                      <span className="font-weight-bold">Dish:</span>  {f.name}
                                    </Col>

                                    <Col xs={6}>
                                    <span className="font-weight-bold">Quantity:</span>  {f.count}
                                    </Col>

                                  </Row>
                              </Container>
                            ))}
                      
                        

                      </Container>
                  </Modal.Body>
          
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="btn btn-dark rounded">
                        Close
                    </Button>
                </Modal.Footer>
              </Modal>



            
              </div>
           </div>
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
