import { useEffect, useState } from "react"
import axios from "axios"
import './styles.css'
import API_KEY from '../../api'
import Translator from "../../components/I18n/translator"
import ItemCoin from '../../components/ItemCoin'
import I18n from "../../components/I18n"
export default function HomeScreen(){
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