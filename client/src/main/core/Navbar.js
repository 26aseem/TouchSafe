import React, {Fragment} from 'react'
import {Link, withRouter} from "react-router-dom"
import {signout, isAuthenticated} from "../auth/helper/adminIndex"
import {msignout, misAuthenticated} from "../auth/helper/merchantIndex"
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc72"}
    }
    else{
        return {color: "#FFFFFF"}
    }
};

const MyNavbar = ({history}) => (

<div className="border border-left-0 border-right-0 border-top-0 border-white">
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link>
            <Link style={currentTab(history,"/")}
                     className="nav-link" to="/">
                        Home
            </Link>
        </Nav.Link>
        
        
        {isAuthenticated() && isAuthenticated().admin &&
                <Nav.Link>
                    <Link style={currentTab(history,"/admin/dashboard")}
                     className="nav-link" to="/admin/dashboard">
                        Admin Dashboard
                    </Link>
                </Nav.Link>
                }

        {misAuthenticated() && misAuthenticated().merchant &&
                <Nav.Link>
                    <Link style={currentTab(history,"/merchant/dashboard")}
                    className="nav-link" to="/merchant/dashboard">
                        Restaurant Dashboard
                    </Link>
                </Nav.Link>
                }

        {!isAuthenticated() && !misAuthenticated() && (
        <Fragment>
            <NavDropdown title={<span className="text-white">Admin</span>} id="basic-nav-dropdown" className="nav-link">
                <NavDropdown.Item >
                    <Link style={currentTab(history,"/adminsignup")}
                        className="nav-link text-dark" to="/adminsignup">
                        Admin Signup
                    </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                    <Link style={currentTab(history,"/adminsignin")}
                        className="nav-link text-dark" to="/adminsignin">
                        Admin Signin
                    </Link>
                </NavDropdown.Item>
                
            </NavDropdown>
            <NavDropdown title={<span className="text-white">Restaurant</span>} id="basic-nav-dropdown" className="nav-link">
                <NavDropdown.Item>
                <Link style={currentTab(history,"/restaurantSignup")}
                    className="nav-link text-dark" to="/restaurantSignup">
                        Restaurant Signup
                    </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                <Link style={currentTab(history,"/restaurantSignin")}
                    className="nav-link text-dark" to="/restaurantSignin">
                        Restaurant Signin
                    </Link>
                </NavDropdown.Item>
                               
            </NavDropdown>
        </Fragment>
        )}

        {(isAuthenticated().admin || misAuthenticated().merchant) && (
            <Nav.Link>
                <span
                className="nav-link text-warning"
                onClick={() => {
                    signout(() => {
                        history.push("/")
                    })
                }}
                >
                    Signout
                </span>
            </Nav.Link>
        )}
        
        </Nav>
    
    </Navbar.Collapse>
</Navbar>


        </div>
    
    )


export default withRouter(MyNavbar);
