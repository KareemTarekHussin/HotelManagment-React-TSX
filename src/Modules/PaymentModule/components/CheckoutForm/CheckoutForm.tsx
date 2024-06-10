import { Box, Button } from "@mui/material"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios";
import { FormEvent } from "react";


export const CheckoutForm =  () => {

  const elements = useElements();
  const stripe = useStripe();

  const submitHandler = async (e:FormEvent)=>{

    e.preventDefault();

    if (!elements || !stripe) return;
    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) return;
    const {error,token} = await stripe.createToken(cardElement);

    if (error){
      console.log({tokenError:error});
      return;
    }
    console.log({token});

    try{
      const response = await axios.post('https://upskilling-egypt.com:3000/api/v0/portal/booking/66666628a17944edfda3da0a/pay',
        {
          token:token.id
        },
        {
          headers:{Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWExNGIxYTI4M2I1NmY1NjgyMTMyNGYiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTcxODAyNTcyNywiZXhwIjoxNzE5MjM1MzI3fQ.TI2XaB5g8PRNqwIV_ZV2RuQ90qwGZrOvWhcCrH1A9_E'}
        }
      )

    } catch(error){
      console.log({backendError: error});
      
    }

    
  }

  return (
    <>

    <Box 
      sx={{
        backgroundColor:'yellowgree',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100dvh'
      }}>
      <form 
        action="" 
        onSubmit={submitHandler}
        style={{
          width:'30rem',
          backgroundColor:'#f1f5f9',
          padding:'2rem',
          borderRadius:10
        }}>
        <CardElement/> 
        <Button variant="contained" sx={{width:'100%',marginTop:4}}>Pay</Button>
        <button>PAY</button>
      </form>
    </Box>

    </>
  )
}
