// import React from 'react'
// import { jwtDecode } from "jwt-decode";
// import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

// export const DashContext = createContext({
//   baseUrl: '',
//   loginData: {},
//   getUserData: () => { },
//   requestHeaders: {
//     Authorization: '',
//   },
// });

// // export const useDash = () => {
// //   return useContext(DashContext);
// // };
 

// //?=================================================================> */
// export default function DashboardContextProvider(props: PropsWithChildren){
// //?=================================================================> */
// const[room, setRomms] = useState()

  
//   let baseUrl = "https://upskilling-egypt.com:3000/api/v0";




//   let getAllRooms = ()=>{
    
    

//   }


//   useEffect(() => {

//   }, []);

//   return (
//     <DashContext.Provider
//       value={{ getUserData, loginData, baseUrl, requestHeaders }}
//     >
//       {props.children}
//     </DashContext.Provider>
//   );

// }