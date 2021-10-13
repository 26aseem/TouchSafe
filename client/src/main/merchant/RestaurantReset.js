import React, {useState, useEffect} from 'react'
import {Link, Redirect} from "react-router-dom"
import {API,FAPI} from "../backend"
import Base from "../core/Base"
import Toast from 'react-bootstrap/Toast'

export default function RestaurantReset() {

    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [didRedirect, setDidRedirect] = useState(false)
    

    const PostData = () =>{
        setLoading(true)
        fetch(`${API}/merchant/resetpassword`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
            })
            }).then(response => {
                return response.json();
                })
            .then(data => {
                setLoading(false)
                if(data.error){
                    console.log(data.error)
                }
                else{
                    setEmail("")
                    setMessage(data.message)
                    setDidRedirect(true)
                                  
                }
        })
        .catch(err => {
            console.log(err)
        
        });
    };

    const loadingMessage = () => (
        loading && (
            
    <div class="alert alert-success rounded">
        Loading....
    </div>
      
        )
     )


     const performRedirect = () => {
        if(didRedirect){
            return(
                <div class="alert alert-success rounded">
                Done
            </div>
                )
            }   
        }



    return (
      <Base
        title="Reset Password"
        description=""
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-sm-8 col-10">
                    <form>
                        <div className="form-group">
                            <p className="text-dark mt-3 ml-3"> Enter the Email <span className="text-info">*</span></p>
                            <input type="text"
                            className="form-control my-3 ml-3"
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                            autoFocus
                            required
                            placeholder="Email"
                            />
                            <button 
                            onClick={() => PostData()}
                            className="btn btn-outline-info ml-3"> Reset Password </button>
                          </div>
                      </form>
                      <h6 className="text-dark ml-3">
                                Don't have an account? &nbsp; 
                                <Link to="/restaurantSignup"><span className="text-info">Sign Up</span> </Link>
                      </h6>
                      {loadingMessage()}
                      
                  </div>
            </div>
            {performRedirect()}
    </Base>       
    )
}