
import{API}  from '../config';
export const signup=( user)=>{
    return fetch(`http://localhost:8000/api/signup`,{
         method: "POST",
         headers: {
             'Access-Control-Allow-Origin': '*',
             'Authorization': 'Basic ' + btoa("<secretName>:<secretPass>"),
           Accept: "application/json",
           "Content-Type": "application/json",
           "Access-Control-Allow-Origin":'$http_origin'
         },
         body: JSON.stringify(user)
     })
     .then(response => {
       return response.json();
     })
     .catch(err => {
       console.log(err);
     });
}

export const signin = user => {
    return fetch(`http://localhost:8000/api/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //saving responsed data in local browser storage
export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
  };
  
  //signout
  
  export const signout = next => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      next();
      return fetch(`http://localhost:8000/api/signout`, {
        method: "GET"
      })
        .then(response => {
          console.log("signout", response);
        })
        .catch(err => console.log(err));
    }
  };
  
  //conditionaly show sign in and out
  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };