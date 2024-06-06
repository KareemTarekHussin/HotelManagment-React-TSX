import React from 'react'
import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import AuthInterface from "../../interfaces/interface";

export let AuthContext = createContext<AuthInterface>({
  baseUrl: '',
  loginData: {},
  getUserData: () => { },
  requestHeaders: {
    Authorization: '',
  },
});

export const useAuth = () => {
  return useContext(AuthContext);
};


//?=================================================================> */
export default function AuthContextProvider(props: PropsWithChildren) {
  //?=================================================================> */

  let [loginData, setLoginData] = useState(null);

  let baseUrl = "https://upskilling-egypt.com:3000/api/v0";

  let requestHeaders = {
    Authorization: `${localStorage.getItem("token")}`,
  };


  // const getUserData = () => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token);
  //       setLoginData(decodedToken);
  //     } catch (error) {
  //       console.error("Failed to decode token", error);
  //       localStorage.removeItem('token');
  //       setLoginData(null);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     getUserData();
  //   }
  // }, []);

  let getUserData = () => {
    let encodedToken: any = localStorage.getItem('token');
    let decodedToken: any = jwtDecode(encodedToken);
    console.log(decodedToken);
    setLoginData(decodedToken);
  }


  useEffect(() => {
    if (localStorage.getItem("token") && loginData) {
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ getUserData, loginData, baseUrl, requestHeaders }}
    >
      {props.children}
    </AuthContext.Provider>
  );

}