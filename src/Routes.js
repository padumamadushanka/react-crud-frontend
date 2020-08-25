import React from "react";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Menu from "./core/Menu";
import AddProduct from "./product/addProduct"
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
            <Menu/>
            <Switch>
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/create/product" exact component={AddProduct} />
            <Route path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
        </div>

    );
  };
  
  export default Routes;