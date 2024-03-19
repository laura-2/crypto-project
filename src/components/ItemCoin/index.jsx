/* eslint-disable react/prop-types */

import Translator from '../I18n/translator'
import './item.css'

export default function ItemCoin({props}){
    return (
        <a id="items" href={`/details/${props.id}`}>
            <img className="image-item" src={props.image} width="80" height="auto"/> 
            <p className="name-item"><strong><Translator path="item.textName"/>:</strong> {props.name}</p>
            <p className="price-item"><strong><Translator path="item.textPrice"/>:</strong> ${props.current_price}</p>
        </a>
    )
}