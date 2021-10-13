import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { misAuthenticated } from '../../auth/helper/merchantIndex';
import { getorders, acceptOrder,cancelOrder,alterpaystatus,generateReport } from '../helper/merchantapicall';
import CsvDownload from 'react-json-to-csv'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'


export default function ManageOrders() {

    // For Modals 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [myModal, setMyModal] = useState(0);

    const [orders, setorders] =useState([]);
    const [reports, setreports] =useState([]);

    const [s,sets] = useState(false)

    let status = ""
    const {merchant, token} = misAuthenticated();
   
    const preload = () => {
        getorders(merchant._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setorders(data);
                if(s){
                sets(false)
                }
              }
        })


    }

    useEffect(() => {
        preload()
        setInterval(preload, 5000)
    }, [])

    const acceptThisOrder = (orderId,myStatus) => {
      if(myStatus != 'Accepted'){
      status = "Accepted"
      acceptOrder(orderId,merchant._id,token,{status,'updated': new Date().getTime()})
        .then(data=> {
            if(data.error){
                console.log(data.error)
            }
            else{
                preload();
            }
        })
        status = ""
      }
    }

    const cancelThisOrder = (orderId,myStatus) => {
      if(myStatus == 'Accepted'){
      status = "Cancelled"
        cancelOrder(orderId,merchant._id,token,{status,'updated': new Date().getTime()})
          .then(data=> {
              if(data.error){
                  console.log(data.error)
              }
              else{
                  preload();
              }
          })
          status = ""
      }
    }

      const alterPay = (orderId,paystatus) => {
        let paymentStatus = paystatus === "Pending" ? "Completed" : "Pending"
          alterpaystatus(orderId,merchant._id,token,{paymentStatus,'updated': new Date().getTime()})
            .then(data=> {
                if(data.error){
                    console.log(data.error)
                }
                else{
                    preload();
                }
            })
        }

      
      const generateMyReport = () => {
        getorders(merchant._id, token).then(data => {
          if(data.error) {
              console.log(data.error);
          }else{
              setreports(data);
              preload()
            }
          })

        }

        const showreport = (s) => {
          return(
            !s ? (
              <button onClick={() => {
                generateMyReport()
                sets(true)
                      }} className="btn btn-success text-white float-right rounded">
                        Generate Report 
            </button>
            )
            :
            (
            
              <CsvDownload data={reports} filename="Restaurant Report.csv"  className="btn btn-success text-white float-right rounded"/>
            
            )
          )
          
        }



    return (
        <Base title="Welcome Management Team" description="Manage Orders here">
        <Link className="btn btn-success rounded" to={`/merchant/dashboard`}>
        <span className="">Restaurant Home</span>
        </Link>
        {showreport(s)}

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5" style={{fontFamily: 'Englebert'}}>ORDERS</h2>

            {orders.map((order, index) => (
              
                <div key={index} className="row text-center mb-4 ml-3 mr-3 rounded bg-info" >
                
                
                <div className="col-3 mt-2 mb-2">
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

                    <li className="list-group-item">
                      <span className="badge badge-success mr-2 ml-1">
                        Payment Status:
                    </span><span className="text-primary"> {order.paymentStatus}</span>
                    </li>

                  </ul>
                </div>

                <div className="col-2 mt-5">
                  <button onClick={() => {
                      setMyModal(index)
                      handleShow()
                  }} className="btn btn-dark rounded">
                    View Order 
                  </button>
                </div>
                
                { order.status == "Processed" 
                ? 
                (
                  <div className="col-4 mt-5">
                  <button className="btn btn-warning rounded text-dark">
                    {`Order Processed`} 
                  </button>
                </div>
                )
                :
                (
                  <>
                <div className="col-2 mt-5">
                  <button onClick={() => {
                    acceptThisOrder(order._id,order.status)
                  }} className="btn btn-success rounded">
                    {order.status != 'Accepted' ? `Accept Order` : `Order Accepted`} 
                  </button>
                </div>
                
                <div className="col-2 mt-5">
                  <button onClick={() => {
                      cancelThisOrder(order._id,order.status)
                  }} className="btn btn-danger rounded">
                    {order.status != 'Cancelled' ? `Cancel Order` : `Order Cancelled`} 
                  </button>
                </div>
                </>
                )
                }

              
                <div className="col-3 mt-5">
                  <button onClick={() => {
                      alterPay(order._id, order.paymentStatus)
                  }} className="btn btn-dark rounded">
                    Alter Payment Status 
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
           
            ))
                }
          
        </div>
      </div>
    </Base>
    )
}
