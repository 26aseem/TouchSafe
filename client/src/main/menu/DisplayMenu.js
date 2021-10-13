import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import "../styles.css"
import Base from "../core/Base"
import Card from "./Card"
import { getMenu } from './helper/coreapicalls'
import {getmerchantdetail} from "../merchant/helper/merchantapicall"
import { FiShoppingCart } from "react-icons/fi"

export default function DisplayMenu() {
    
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState(false);
    const [m,setM] = useState();

    const {restaurantId} = useParams()
        
    const loadAllMenu = (restaurantId) => {
      getMenu(restaurantId).then(data => {
        if(data.error){
          setError(data.error)
        } else{
          setFoods(data);
          }
      })
      getmerchantdetail(restaurantId).then(data => {
        if(data.error){
          setError(data.error)
        } else{
          setM(data.merchantName);
          }
      })

    }

    useEffect(() => {
      loadAllMenu(restaurantId)
      setInterval(loadAllMenu, 4000,restaurantId)
    },[])


    return (
        <Base title={m} description="La Carte">
          <div className="row mb-5 col-md-4 ">
             <Link to={`/cart/${restaurantId}`} className="btn brn-md btn-info mb-3 ml-3 rounded">
                Process to Checkout &nbsp;
                <FiShoppingCart/> 
              </Link>
            </div>
            
              <div className="row text-center">
                {foods.map((food, index) => {
                  return(
                    <div key={index} className="col-12 col-md-6 col-lg-4 mb-5">
                      <Card food={food} id={index}/>
                    </div>
                  )
                })}
              </div>
            
        </Base>
    )
}
