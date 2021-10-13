import React, {useState, useEffect} from 'react'
import Base from "../../core/Base"
import {Link} from "react-router-dom"
import { misAuthenticated } from '../../auth/helper/merchantIndex';
import { getfoods, deletefood } from '../helper/merchantapicall';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'

export default function ManageMenu() {

  // For Modals 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [myModal, setMyModal] = useState(0);

    const [foods, setfoods] =useState([]);
    
    const {merchant, token} = misAuthenticated();
   
    const preload = () => {
        getfoods(merchant._id, token).then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setfoods(data);
                console.log(data)
            }
        })
    }

    useEffect(() => {
        preload()
        setInterval(preload, 5000)
    }, [])

    const deleteThisFood = (foodId) => {
      deletefood(foodId,merchant._id,token)
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
        <Base title="Welcome Team" description="Manage Menu here">
        <Link className="btn btn-info rounded" to={`/merchant/dashboard`}>
        <span className="">Restaurant Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-success my-3 mt-5 mb-5" style={{fontFamily: 'Englebert'}}>Food Items</h2>

            {foods.map((food, index) => (
              
                <div key={index} className="row text-center mb-3 ml-3 mr-3 ">
                
                  <div className="col-2">
                    <Link
                      className="btn btn-success rounded"
                      to={`/merchant/update/food/${food._id}`}
                    >
                    <span className="">
                      Update Food
                      </span>
                    </Link>
                  </div>
                
                <div className="col-2">
                  <button onClick={() => {
                      deleteThisFood(food._id)
                  }} className="btn btn-danger rounded">
                    Delete Food 
                  </button>
                </div>
              
                <div className="col-2">
                  <button onClick={() => {
                      setMyModal(index)
                      handleShow()
                      
                  }} className="btn btn-info rounded">
                    Display Food 
                  </button>
                </div>

                <div className="col-5 offset-1">
                    <h3 className="text-white text-left" style={{fontFamily: 'Englebert'}}>{food.dishName}</h3>
                </div>

                <Modal show={show} onHide={handleClose} centered >
                  <Modal.Header closeButton>
                      <Modal.Title>{foods[myModal].dishName}</Modal.Title>
                  </Modal.Header>
                  
                  <Modal.Body>
                      <Container >
                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Dish Name :
                          </Col>
                          <Col xs={6}>
                            {foods[myModal].dishName}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Description :
                          </Col>
                          <Col xs={6}>
                            {foods[myModal].dishDesc}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4}className="btn btn-success rounded m-0 p-0 mb-1">
                              Price :
                          </Col>
                          <Col xs={6}>
                            {foods[myModal].dishPrice}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Stock :
                          </Col>
                          <Col xs={6}>
                            {foods[myModal].dishStock}
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={4} className="btn btn-success rounded m-0 p-0 mb-1">
                              Sold :
                          </Col>
                          <Col xs={6}>
                            {foods[myModal].sold}
                          </Col>
                        </Row>

                      </Container>
                  </Modal.Body>
          
                <Modal.Footer>
                    <Link
                      className="btn btn-info rounded"
                      to={`/merchant/update/food/${foods[myModal]._id}`}
                    >
                      Update
                    </Link>

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
