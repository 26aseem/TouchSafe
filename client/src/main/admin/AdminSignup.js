import React, {useState} from"react"
import Base from "../core/Base"
import {Link} from "react-router-dom"
import { signup } from "../auth/helper/adminIndex";

const AdminSignup = () => {

    const [values, setValues] = useState({
        username: "",
        password: "",
        error: "",
        success: false
    });

    const {username, password, error, success} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        signup({username, password})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
                
            } else{
                setValues({
                    ...values,
                    username: "",
                    password: "",error: "",
                    success: true
                });
            }
        })
        .catch(console.log("Error in Admin Signup"))
    };


    const onReset = event => {
        event.preventDefault()
        setValues({
                    ...values,
                    username: "",
                    password: "",
                    error: "",
                    success: false
                });
            };
        

    const signUpForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light"> Username <span className="text-warning">*</span></label>
                            <input type="text"  className="form-control" 
                            onChange={handleChange("username")}
                            placeholder="Username"
                            value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light"> Password <span className="text-warning">*</span></label>
                            <input type="password" className="form-control"
                            onChange={handleChange("password")}
                            placeholder="Password"
                            value={password}
                            />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block rounded">Submit</button>
                        
                        <button className="btn btn-info btn-block rounded" onClick={onReset}>Reset </button>
                    </form>
                </div>
            </div>
        );
    };

    const successMessage = () => (
        <div className="row mt-2">
            <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1 text-left">
        <div className="alert alert-success"
        style={{display: success ? "" : "none"}}
        >
            New Admin was created successfully.
            <Link to="/adminsignin"> Login Here</Link>
        </div>
        </div>
        </div>
    )

    const errorMessage = () => (
        <div className="row">
            <div className="col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1 text-left">
        <div className="alert alert-danger"
        style={{display: error ? "" : "none"}}
        >
            {error}
        </div>
        </div>
        </div>
    )



    return (
        <Base title="Admin Sign Up" description="A page for Admin to sign up">
            {signUpForm()}
            <br/>
            {successMessage()}
            {errorMessage()}
            <br/>       
        </Base>
    );
}

export default AdminSignup;