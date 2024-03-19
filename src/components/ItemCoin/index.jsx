import Translator from '../I18n/translator'
import './item.css'

export default function ItemCoin({props}){
    return (
        <a id="items" href={`/details/${props.id}`}>
            <p className='rank-item'><strong>#{props.market_cap_rank}</strong></p>
            <img className="image-item" src={props.image} width="80" height="auto"/> 
            <p className="name-item"><strong><Translator path="item.textName"/>:</strong> {props.name}, {props.symbol.toUpperCase()}</p>
            <p className="price-item"><strong><Translator path="item.textPrice"/>:</strong> ${props.current_price}</p>
        </a>
    )
}