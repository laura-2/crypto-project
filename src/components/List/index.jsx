import { useEffect, useState } from "react"
import ItemCoin from "../ItemCoin"
import axios from "axios"
import I18n from "../I18n"
import Translator from "../I18n/translator"
import './list.css'
import API_KEY from '../../api'

export default function List(){
    const [list, setList] = useState([])

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
            <I18n/>  { /* Escolha do idioma para aplicar ao projeto */ }
            <h2 className="title"><Translator path="home.title"/></h2>
            { /* Lista dos container com as TOP 10 cryptomoedas */ }
            {list.slice(0,10).map((items, index)=>(
                <ItemCoin key={index} props={items}/>
            ))}
        </div>
    )
}