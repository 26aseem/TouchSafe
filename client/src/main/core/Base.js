import React from 'react';
import MyNavbar from "./Navbar";
import { FiMail } from "react-icons/fi"

const Base= ({
    title = "My Title",
    description = "My description",
    className = "bg-dark text-white pt-4",
    children
}) => {
    return (
        <div>
            <MyNavbar/>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4" style={{fontFamily: 'Englebert'}}>{title}</h2>
                    <h4  style={{fontFamily: 'Englebert'}} className="text-info">{description}</h4>
                </div>
                <div className={className}> {children} </div>        
            </div>
            <br></br>
            <footer className="footer bg-dark mt-auto py-3" style={{fontFamily: 'Helvetica'}}>
                <div className="container-fluid bg-success text-white text-center py-2">
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <a href="mailto:akhullar981@gmail.com">
                        <button className="btn btn-info btn-lg rounded">
                            <FiMail/>
                            &nbsp; Contact Us
                        </button>
                    </a>
                </div>
                <div className="container text-center mt-2">
                    <span className="text-muted">An Amazing <span className="text-white">Platform</span> for all the <span className="text-white">Foodies</span></span>
                </div>
            </footer> 
        </div>
    )
}

export default Base;
