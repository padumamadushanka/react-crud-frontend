import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth";

const Signup =()=>{

    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        phone:"",
        address:"",
        email: "",
        password: "",
        error: "",
        success: false
      });
      const { first_name, last_name, phone,  address,email,password,error,success } = values;
      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

     
      const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ first_name, last_name, phone, address,email,password }).then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                first_name: "",
                last_name:"",
                phone:"",
                address:"",
                email: "",
                password: "",
                error: "",
                success: true
              });
            }
          });
      };

    const signupForm=()=>(
     <div className="container">
        <form>
            <div className="form-group">
                <label >first name</label>
                <input onChange={handleChange("first_name")}value={first_name}type="text" className="form-control"  placeholder="Enter firstname"></input>
            </div>
            <div className="form-group">
                <label >last name</label>
                <input onChange={handleChange("last_name")}value={last_name}type="text" className="form-control"  placeholder="Enter lastname"></input>
            </div>
            <div className="form-group">
                <label >address</label>
                <input onChange={handleChange("address")}value={address}type="text" className="form-control"  placeholder="Enter address"></input>
            </div>
            <div className="form-group">
                <label >phone</label>
                <input onChange={handleChange("phone")}value={phone}type="text" className="form-control"  placeholder="Enter phone number"></input>
            </div>
            <div className="form-group">
                <label >Email address</label>
                <input onChange={handleChange("email")}value={email}type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
            
            </div>
            <div class="form-group">
                <label>Password</label>
                <input onChange={handleChange("password")}value={password}type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <button onClick={clickSubmit}type="submit" className="btn btn-primary">Submit</button>
        </form>
     </div>
    )
    const showError = () => (
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      );
    
      const showSuccess = () => (
        <div
          className="alert alert-info"
          style={{ display: success ? "" : "none" }}
        >
          New account is created. Please <Link to="/signin">Signin</Link>
        </div>
      );

    return(
        <Layout title="Signup " description="Node+React CRUD operations app sign up if you are a new user">
        {showSuccess()}
         {showError()}
        {signupForm()}
        </Layout>
    )
}

export default Signup;