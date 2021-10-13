import React, {useState, useEffect} from 'react'
import {Link, useHistory,useParams} from "react-router-dom"
import {FaUserCircle} from "react-icons/fa";
import {API} from "../backend"
import Base from "../core/Base"

export default function NewRestaurantPassword() {
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const {token} = useParams()
    
    const PostData = () =>{
        setLoading(true)
        fetch(`${API}/merchant/updatepassword`,{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
            }).then(response => {
                return response.json();
                })
        .then(data => {
            setLoading(false)
            if(data.error){
                console.log(data.error)
                
            }else{
            setPassword("")
            history.push('/login')
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


     return (
      <Base
        title="Update Password"
        description=""
        className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-sm-8 col-10">
                    <form>
                        <div className="form-group">
                            <p className="text-dark mt-3 ml-3"> Enter the Password <span className="text-info">*</span></p>
                            <input type="text"
                            className="form-control my-3 ml-3"
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                            autoFocus
                            required
                            placeholder="Password"
                            />
                            <button 
                            onClick={() => PostData()}
                            className="btn btn-outline-info ml-3"> Update Password </button>
                          </div>
                      </form>
                      {loadingMessage()}
                  </div>
            </div>
    </Base>       
    )
}
