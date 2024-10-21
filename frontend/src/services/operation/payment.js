import { paymentApi } from "../api"
import {apiConnector} from '../apiconnector'
import {toast} from 'react-hot-toast'


export const paymentMailSender=(razorpayResponse,amount,token)=>{
    return async()=>{
        const api=paymentApi.mailSendApi
        try{
            const response=await apiConnector('POST',api,{
                orderId:razorpayResponse.razorpay_order_id,
                paymentId:razorpayResponse.razorpay.payment_id,
                amount
            }) 

            console.log(response)
        }catch(err){
            console.log('err in mail sending',err)
            toast.error('Error in sending confirmation mail')
        }
    }
}



export const verifyPayment=(bodyData,dispatch,navigate)=>{
    const api=paymentApi.paymentVerify
    toast.loading(true)
    return async()=>{
        try{
            const response=await apiConnector('POST',api,bodyData)
            if(!response?.data?.success){
            
                throw new Error('Error while verified payment')
            }
            navigate('/dashboard/enrolled-courses')
            toast.dismiss()


        }catch(err){
            console.log(err)
            toast.dismiss()
            toast.error('Error while  verifying payment')
        }
    }
}

export const paymentCapture=()=>{
    return async()=>{
        const api=paymentApi.paymentCapture
        try{
            
        }catch(err){

        }
    }
}


