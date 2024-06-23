import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FavouriteInterface } from "../../interfaces/interface";
import axios from "axios";
import { useToast } from "../Context/ToastContext";
import { userRequest } from ".././../utils/request";



export const FavsContext = createContext<FavouriteInterface>({
   baseUrl: '',
  requestHeaders: {
    Authorization: '',
  },
  addToFav: () => { }
});




// use fav context in all component

export function useFav() {
  return useContext(FavsContext);
}




export default function FavsContextProvider({ children }: PropsWithChildren) {
      const [fav,setFav] = useState("")


  const requestHeaders = {
    Authorization: `${localStorage.getItem("token")}`,
  };

  // ADD TO FAV


   const addToFav = async (roomId) => {
      // const { showToast } = useToast();
    try {
      let response = await userRequest.post('/portal/favorite-rooms',roomId, {
        headers: requestHeaders,
      });
      setFav(response.data.message);
      alert("good");
      console.log(fav)

    } catch (error) {
      console.log(error)
      console.log("come from context", error);
    } 
  };
useEffect(()=> {
  addToFav()
},[])




  return (
    <FavsContext.Provider value={{ addToFav,requestHeaders }}>
      {children}
    </FavsContext.Provider>
  );
}
