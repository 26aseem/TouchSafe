import React from 'react'
import {Link} from 'react-router-dom'
import "../styles.css"
import { API } from "../backend"
import Base from "./Base"
import logo from "../images/logo1.png"
import applogo from "../images/app.jpeg"
import base from "../images/base.apk"
import { HiDownload } from "react-icons/hi"

export default function Home() {
    console.log("API IS", API);
    return (
        <Base title="TouchSafe Solutions" description="Stay TouchFree Stay Safe">
            <div className="row justify-content-center">
                <div className="col-6 col-sm-3 col-lg-2">
                    <img className="mb-5" src={logo}   alt="TouchSafe Solutions Inc." title="TouchSafe Solutions Inc."></img>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-md-1 col-lg-2">
                </div>

                <div className="col-offset-1 col-11 col-sm-offset-6 col-sm-6 col-md-5 col-lg-4">
                    <img className="mb-5 rounded" src={applogo}   alt="TouchSafe Solutions Inc." title="TouchSafe Solutions Inc." 
                    style={{height:500, width:300}}/>
                </div>

                <div className="col-offset-2 col-10 col-md-6 col-lg-6 mt-5">
                    <h3 style={{fontFamily: 'Helvetica'}} className="p-2 text-info">
                        Download the TouchSafe App!
                    </h3>
                    <h4 style={{fontFamily: 'Helvetica'}} className="p-2">
                        <ul style={{"list-style-type":"square"}}>
                            <li>
                                Find your Favourite Restaurants 
                            </li>
                            <li>
                                Scan QR Code
                            </li>
                            <li>
                                Get customized Menu 
                            </li>
                            <li>
                                Get real-time order updates
                            </li>
                            <li>
                                Exclusive app-only offers
                            </li>
                        </ul>
                        
                    </h4>
                    <Link to={base} target="_blank" download>
                        <button className="btn btn-danger text-white mr-2 p-2 mt-4 ml-2 rounded ">
                            Download Our App &nbsp;
                            <HiDownload/>
                        </button>
                    </Link>
                </div>

            </div>
        </Base>
    )
}
