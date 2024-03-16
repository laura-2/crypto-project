/* eslint-disable react/prop-types */

import './styles.css'

export default function ItemCoin({props}){
    return (
        <a id="items" href={`/details/${props.id}`}>
            <img className="image-item" src={props.image} width="80" height="auto"/> 
            <p className="name-item"><strong>Name:</strong> {props.name}</p>
            <p className="price-item"><strong>Current price:</strong> ${props.current_price}</p>
        </a>
    )
}