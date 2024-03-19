/* eslint-disable react/prop-types */
import './details.css'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {AreaChart, CartesianGrid, Tooltip, YAxis, XAxis, Legend, Area} from 'recharts';
import API_KEY from '../../api'
import Translator from '../I18n/translator'

export default function Details(){
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
                <img className="box-image" src={itemDetails.image.small} width="50" height="50"/> 
                <p className="box-price"><Translator path="details.price"/>: ${itemDetails.market_data.current_price.usd}</p>
                <p className="box-price-high"><Translator path="details.priceHigh"/>: ${itemDetails.market_data.high_24h.usd}</p>
                <p className="box-price-low"><Translator path="details.priceLow"/>: ${itemDetails.market_data.low_24h.usd}</p>
                <p className="box-volume"><Translator path="details.volume"/>: ${itemDetails.market_data.total_volume.usd}</p>
                <a href='/wallet'><button className='buttonWallet'><Translator path="wallet.button"/></button></a>
            </div>
        )}
        <div id="areachart">
            <h2 className='chartText'><Translator path="details.chartText"/></h2>
        <AreaChart width={800} height={300} data={chartData} className='chart'>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area dataKey="price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      </div>
        </section>
    )
}