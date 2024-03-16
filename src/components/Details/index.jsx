/* eslint-disable react/prop-types */
import './styles.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details(){
    const API_KEY = 'CG-LXmYKhvdPE2UFHWwoCzpFw8P';
    const [itemDetails, setItemDetails] = useState(null)


    const {id} = useParams()
    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=${API_KEY}`)
            .then(response => {
                if(response){
                    setItemDetails(response.data)
                } else{
                    console.error("Error API data")
                }
            
            })
            .catch(erro => {
            console.error(erro)
        })
    }, [id])
    return (
        <section>
        {itemDetails && (
            <div id="box">
                <img className="box-image" src={itemDetails.image.small} width="80" height="auto"/> 
                <p className="box-price">Current price: ${itemDetails.market_data.current_price.usd}</p>
                <p className="box-price-hight">High price 24h: ${itemDetails.market_data.high_24h.usd}</p>
                <p className="box-price-low">Low price 24h: ${itemDetails.market_data.low_24h.usd}</p>
                <p className="box-volume">Market Cap: ${itemDetails.market_data.total_volume.usd}</p>
            </div>
        )}
        </section>
    )
}