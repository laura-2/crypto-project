import { useEffect, useState } from "react"
import ItemCoin from "../ItemCoin"
import axios from "axios"

export default function List(){
    const [list, setList] = useState([])
    const API_KEY = 'CG-LXmYKhvdPE2UFHWwoCzpFw8P';

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${API_KEY}`)
            .then(response => {
                setList(response.data)
            })
            .catch(erro => {
            console.error(erro)
        })
    }, [])
    return (
        <div>
            <h1>Listing of TOP 10 cryptocurrencies:</h1>
        {list.slice(0,10).map((items, index)=>(
            <ItemCoin key={index} props={items}/>
        ))}
        </div>
    )
}