import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signin,authenticate ,isAuthenticated} from "../auth";

const Signin =()=>{

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        reDirectTo:false
      });
      const { email,password,error,loading,reDirectTo } = values;
      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

     
      const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false ,loading:true});
        signin({ email,password }).then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                      ...values,
                      reDirectTo: true
                    });
                  });
            }
          });
      };

    const signupForm=()=>(
     <div className="container">
        <form>
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
    
      const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );
  const redirectUser = () => {
    if (isAuthenticated()) {
        return <Redirect to="/products" />;
      }
  };

    return(
        <Layout title="Signup " description="Node+React CRUD operations app sign up if you are a new user">
        {showLoading()}
      {showError()}
      {signupForm()}
      {redirectUser()}
        </Layout>
    )
}

export default Signin;