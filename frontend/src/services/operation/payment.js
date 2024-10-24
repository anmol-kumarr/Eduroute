import { paymentApi } from "../api"
import { apiConnector } from '../apiconnector'
import { toast } from 'react-hot-toast'
import RzrPayLogo from '../../assets/Logo/rzp_logo.png'


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


export const buyCourse = async (courseId, user, navigate, dispatch) => {
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
        // const userInfo = await apiConnector()

        if (!orderResponse.data.success) {
            throw new Error(orderResponse?.data?.message)
        }
        console.log(orderResponse)

        const options = {
            'key':process.env.RAZROPAY_KEY,
            "currency": orderResponse?.data?.currency,
            "amount": orderResponse?.data?.amount,
            "order_id": orderResponse?.data?.receipt,
            "name": 'Eduroute',
            "description": 'Thank you for purchasing course from eduroute',
            "image": RzrPayLogo,
            "prefix": {
                name: user?.firstName,
                email: user?.email,
            },
            handler: function (response) {
                paymentMailSender(response, orderResponse?.data?.data?.amount)
                verifyPayment({ ...response }, navigate, dispatch)
            }

        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (err) {
        console.log(err)
        toast.error('could not make payment')
    }
    toast.dismiss()
}

const paymentMailSender = (razorpayResponse, amount, token) => {
    return async () => {
        const api = paymentApi.mailSendApi
        try {
            const response = await apiConnector('POST', api, {
                orderId: razorpayResponse.razorpay_order_id,
                paymentId: razorpayResponse.razorpay.payment_id,
                amount
            })

            console.log(response)
        } catch (err) {
            console.log('err in mail sending', err)
            toast.error('Error in sending confirmation mail')
        }
    }
}



const verifyPayment = (bodyData, dispatch, navigate) => {
    const api = paymentApi.paymentVerify
    toast.loading(true)
    return async () => {
        try {
            const response = await apiConnector('POST', api, bodyData)
            if (!response?.data?.success) {

                throw new Error('Error while verified payment')
            }
            navigate('/dashboard/enrolled-courses')
            toast.dismiss()


        } catch (err) {
            console.log(err)
            toast.dismiss()
            toast.error('Error while  verifying payment')
        }
    }
}




