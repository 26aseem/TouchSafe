import React ,{useState} from 'react';
import StripeCheckoutButton from "react-stripe-checkout"
import {API,KEY} from "../backend"
import {useParams} from "react-router-dom"
import { MdPayment } from "react-icons/md"
import {alterpaystatusafterpayment} from "../menu/helper/orderHelper"


const StripeCheckout = ({totalamount, setReload = f => f, reload = undefined}) => {

    const {restaurantId} = useParams()

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        error: ""
    });
    
    const makePayment = token => {
    
        setInfo({loading: true})
        const body = {
            token,
            totalamount
        }
    
        const headers = {
            
            "Content-Type":"application/json"
        }
    
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log(response.status)
            let ors = []
            if (typeof window !== undefined){
                if(localStorage.getItem("orders")){
                    ors = JSON.parse(localStorage.getItem("orders"))
                }
                    ors.map(or => {
                        alterPay(or)
                    })
                
                    localStorage.removeItem("payment");
                    localStorage.removeItem("orders");
                
            }
            setReload(!reload); 
            setInfo({loading: false})
            window.location.reload(false);
        })
        .catch(error => {
            console.log(error)
            
        })
        setInfo({loading: false})
    }

    const loadingMessage = () => (
        info.loading && (
            <div className="alert alert-info">
                <h2>Processing Payment...</h2>
            </div>
        )
     )

     const alterPay = (orderId) => {
        let paymentStatus = "Completed"
          alterpaystatusafterpayment(orderId,{paymentStatus:paymentStatus,'updated': new Date().getTime()})
            .then(data=> {
                if(data.error){
                    console.log(data.error)
                }
                
            })
        }
 
     


    return (
        <div>
            <StripeCheckoutButton
                stripeKey="pk_test_51Hgdo6IaNK8j80R9YCwHc4KXSEd2mJ44ENjFK4Fj3FlLbcVQcPku0wluY4XNEpzbCGbHxPwFcZUJ7ZCtiBM2bQ0r00DnrCLaye"
                token={makePayment}
                amount={totalamount*100}
                description="TouchSafe Solutions Inc."
                shippingAddress
                billingAddress
            >
                <button className="btn btn-dark rounded">
                        Payment &nbsp;
                        <MdPayment/>
                </button>
            </StripeCheckoutButton>
            {loadingMessage()}
                        
        </div>
    );
}

export default StripeCheckout;