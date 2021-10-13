import { API } from "../../backend";

export const createorder = (merchantId,orderData) => {
return fetch(`${API}/order/create/${merchantId}`,{   
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({order:orderData})
})
.then(response => {
    return response.json();
})
.catch(err => console.log(err));
};

// alter payment status
export const alterpaystatusafterpayment = (orderId,order) => {
    return fetch(`${API}/order/${orderId}/updatepaymentstatus`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    body: JSON.stringify(order)
    })
    .then(response => {
        console.log(response)
        return response.json();
        
    })
    .catch(err => console.log(err));
};