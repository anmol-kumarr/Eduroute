import { paymentApi } from "../api"
import { apiConnector } from '../apiconnector'
import { toast } from 'react-hot-toast'
import RzrPayLogo from '../../assets/Logo/rzp_logo.png'
import { addToCart } from "../../redux/slice/cartSlice"


const scriptLoad = (src) => {

    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


export const buyCourse = async (courseId, user, dispatch, navigate) => {
    const key = process.env.REACT_APP_RAZROPAY_KEY
    toast.loading('loading')
    try {
        const res = await scriptLoad('https://checkout.razorpay.com/v1/checkout.js')
        if (!res) {
            toast.error('failed to load razorpay sdk')
            return
        }
        // initiate the order
        const api = paymentApi.paymentCapture
        const orderResponse = await apiConnector('POST', api, { courseId })
        toast.error(orderResponse?.data?.data?.message)
        if (!orderResponse.data.success) {
            throw new Error(orderResponse?.data?.message)
        }
        
        const options = {
            key: key,
            currency: orderResponse?.data?.data?.currency,
            amount: orderResponse?.data?.data?.amount,
            order_id:orderResponse?.data?.data?.id,
            name: 'Eduroute',
            description: 'Thank you for purchasing course from eduroute',
            image: RzrPayLogo,
            prefix: {
                name: user?.firstName,
                email: user?.email,
            },
            handler: function (response) {
                console.log(response)
                paymentMailSender(response, orderResponse?.data?.data?.amount)
                verifyPayment({ ...response, courseId }, dispatch, navigate)
            }

        }
        
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function handler(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (err) {
        toast.dismiss()
        console.log('payment fn err', err)
        toast.error('could not make payment')
    }
    toast.dismiss()
}

const paymentMailSender = async (razorpayResponse, amount) => {

    // console.log('mail send')
    // console.log('razorpayResponse', razorpayResponse)
    const api = paymentApi.mailSendApi
    try {
        const response = await apiConnector('POST', api, {
            orderId: razorpayResponse.razorpay_order_id,
            razorpay_payment_id: razorpayResponse.razorpay_payment_id,
            amount
        })

        console.log(response)
        toast.success('Confirmation mail sent ')
    } catch (err) {
        console.log('err in mail sending', err)
        toast.error('Error in sending confirmation mail')
    }
}




const verifyPayment = async (bodyData, dispatch, navigate) => {
    console.log('body data', bodyData)
    const api = paymentApi.paymentVerify
    // toast.loading('loading')

    try {
        const response = await apiConnector('POST', api, bodyData)
        console.log('verifypayment',response)
        if (!response?.data?.success) {

            throw new Error('Error while verified payment')
        }
        dispatch(addToCart(null))
        navigate('/dashboard/enrolled-courses')
        // toast.dismiss()
        toast.success('You are enrolled')


    } catch (err) {
        console.log('verify payment', err)
        toast.dismiss()
        toast.error('Error while  verifying payment')
    }
    // toast.dismiss()
}





