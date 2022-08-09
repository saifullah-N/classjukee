import React, { Component } from "react";
import { useState } from "react";
export default function SignUp ({registerID}){
const [email,setEmail]= useState()
const [password,setPassword]= useState()
// registerID(email,password)
        return (
            <form>
                <h3>Register</h3>

                {/* <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div> */}

                <div className="form-group">
                    <label>Email</label>
                    <input    onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control" placeholder="Enter email" required />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" placeholder="Enter password" required/>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={()=>{registerID(email,password)}}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
    }
