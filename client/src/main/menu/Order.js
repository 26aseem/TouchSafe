import React, { useState, useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { createorder } from "./helper/orderHelper";
import StripeCheckout from "./StripeCheckout";
import { TiTick } from "react-icons/ti";


const Order = ({products, setReload = f => f, reload = undefined}) => {
    
    const [fs, setFs] = useState([]);

    const {restaurantId} = useParams()
    const [tableNo, setTableNo] = useState("");


    let c = []
        if (typeof window !== undefined){
            if(!localStorage.getItem("cart")){
                localStorage.setItem("cart",JSON.stringify(c))
            }
        }
        
    let o = []
    if (typeof window !== undefined){
        if(!localStorage.getItem("orders")){
            localStorage.setItem("orders",JSON.stringify(o))
        }
        }

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        error: ""
    });


    const showDropIn = () => {
        return (
            <div>
              {products.length > 0 ? (
                <div>
                  <button className="btn btn-dark rounded" onClick={onOrder}>
                    Confirm Order &nbsp;
                    <TiTick/>
                  </button>
                </div>
              )
                  :(<h3/>)
                }
            </div>
        )
    }

    const showPaymentDropIn = () => {
        return (
            <div>
              {typeof window !== undefined && localStorage.getItem("payment") && localStorage.getItem("payment")>0
              ? (
                <div>  
                  <h3 className="text-dark">Payment Here</h3>
                  <h4 className="text-white">Total Amount Payable : {getDueAmount()}</h4>
                  <StripeCheckout totalamount={getDueAmount()} setReload={setReload}/>
                </div>
              )
                  :<h4 className="text-white">No Payment Due</h4>
                }
            </div>
        )
    }

    
    
    const onOrder = () => {
        setInfo({loading: true})
        
        products.map(product => {
            const f = {"name":product.name,"count":product.count,"price":product.price,"food": product._id}
            fs.push({...f})
            
        })
        
        const orderData = {
                        foods: fs,
                        transaction_id: getTransactionID(),
                        amount: getAmount(),
                        status: "Received",
                        updated: new Date().getTime(),
                        rest: restaurantId,
                        tableNo: tableNo
                    };
          
        createorder(restaurantId,orderData)
        .then(response => {
        if(response.error){
            console.log("Error in Order Creation");
            console.log("Table No is required. Kindly enter the Table No");
            alert("Table No is a required field")
        } 
        else{
            console.log("Order Created Successfully");
            let ors = []
            if (typeof window !== undefined){
                if(localStorage.getItem("orders")){
                    ors = JSON.parse(localStorage.getItem("orders"))
                }
                    ors.push(
                      response._id
                    )
                
                    
                localStorage.setItem("orders", JSON.stringify(ors))
            }
                     
            cartEmpty(() => {
                let payment = 0
                if (typeof window !== undefined){
                    if(localStorage.getItem("payment")){
                        payment = JSON.parse(localStorage.getItem("payment"))
                    }
            
                    payment = payment + getAmount()
                    localStorage.setItem("payment",payment)
                }
                setReload(!reload);   
                setInfo({loading: false})
                window.location.reload(false);
            })
            
              }
            }
        )
   
        
    }

    // Calculate Total Amount
    const getAmount = () => {
        let amount = 0
        products.map(product => {
            amount = amount + product.dishPrice * product.count
        })
        return amount
    }

    // Create Transaction Id
    const getTransactionID = () => {
        let transactionID = 0
        products.map(product => {
            transactionID = transactionID + parseInt(product.dishPrice.toString() + product.count.toString() + (product.dishStock).toString() + (product.sold).toString()+ (product.dishPrice*product.count).toString())
        })
        return (transactionID+new Date().getTime()).toString()
    }
    
    // Calculate Due Total Amount
    const getDueAmount = () => {
        let amount = 0
        if (typeof window !== undefined){
            if(localStorage.getItem("payment")){
                amount = JSON.parse(localStorage.getItem("payment"))
            }
        }
        return amount
    }

    // For Table Number
    const handleChange = (event) => {
        setTableNo(event.target.value)
    };


    const myTableForm = () => (
        <form>
            <div className="form-group">
                <input type="text"
                className="form-control my-3"
                onChange={handleChange}
                value={tableNo}
                required
                placeholder="Enter the Table No"
                />
            </div>
        </form>
    )



    return (
    <div>
        <div  className="btn btn-success col-8 rounded">
            <h3 className="text-dark">Checkout Here Folks!</h3>
            {getAmount() ? myTableForm():("")}
            <h4 className="text-white">Bill Amount : {getAmount()}</h4>
            {showDropIn()}
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="btn btn-success col-8 rounded">
            {showPaymentDropIn()}
        </div>
        <div className="col-8">
        </div>
    </div>
    )
}

export default Order;