import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_KEY from '../../api'
import DetailsCoin from '../../components/DetailsCoin';
import Chart from '../../components/Chart';
import i18n from "../../i18n/config";

export default function DetailsPage(){
    const [itemDetails, setItemDetails] = useState(null)
    const [chartData, setChartData] = useState([])


    const {id} = useParams()
    { /* Chamando API das cryptomoedas e suas informações, como preço atual, volume, preço alto, baixo */ }
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
    { /* Chamando API para gráfico de preços */ }
    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&${API_KEY}`)
        .then(response => {
            const formattedData = response.data.prices.map(priceData => ({
              day: new Date(priceData[0]).toLocaleDateString(i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US'), 
              price: priceData[1].toFixed(3),
              preço: priceData[1].toFixed(3)
            }));
            setChartData(formattedData);
          })
            .catch(erro => {
            console.error(erro);
            
        })
    }, [id])
    return (
        <section>
            {itemDetails && (
                <DetailsCoin props={itemDetails}/>
            )}
            <hr style={{boxShadow: "0 0 5px 0 #00005f", backgroundColor: '#00005f', margin: '1em'}}/>
            <Chart data={chartData} price={i18n.language === 'pt-BR' ? "preço" : "price"} date="day"/>
        </section>
    )
}