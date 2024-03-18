/* eslint-disable react/prop-types */
import './styles.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AreaChart, CartesianGrid, Tooltip, YAxis, XAxis, Legend, Area} from 'recharts';

export default function Details(){
    const API_KEY = 'CG-LXmYKhvdPE2UFHWwoCzpFw8P';
    const [itemDetails, setItemDetails] = useState(null)
    const [chartData, setChartData] = useState([])


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

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&${API_KEY}`)
        .then(response => {
            const formattedData = response.data.prices.map(priceData => ({
              day: new Date(priceData[0]).toDateString(),
              price: priceData[1]
            }));
            setChartData(formattedData);
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
                <p className="box-volume">Volume: ${itemDetails.market_data.total_volume.usd}</p>
            </div>
        )}
        <AreaChart width={1200} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area dataKey="price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <a href='/wallet'>Wallet</a>
        </section>
    )
}