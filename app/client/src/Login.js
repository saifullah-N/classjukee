import React, { Component } from "react";
import { useState } from "react";
export default function Login({loginID}){
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
        return (
            <form className="form-control">

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email"  required/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" required />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" required />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={()=>{loginID(email,password)}} className="btn btn-dark btn-lg btn-block">Sign in</button>
                {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p> */}
            </form>
        );
    }
