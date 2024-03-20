import './details.css'
import Translator from '../I18n/translator'

export default function DetailsCoin({props}){
    return (
        <div id="box"> { /* Passando as informações da cryptomoeda para o box */ }
            <img className="box-image" src={props.image.small} width="50" height="50"/> 
            <p className="box-price"><strong><Translator path="details.price"/></strong>: {props.market_data.current_price.usd.toLocaleString('en-US', { style: 'currency', currency: 'usd' })}</p>
            <p className="box-price-high"><strong><Translator path="details.priceHigh"/></strong>: {props.market_data.high_24h.usd.toLocaleString('en-US', { style: 'currency', currency: 'usd' })}</p>
            <p className="box-price-low"><strong><Translator path="details.priceLow"/></strong>: {props.market_data.low_24h.usd.toLocaleString('en-US', { style: 'currency', currency: 'usd' })}</p>
            <p className="box-volume"><strong><Translator path="details.volume"/></strong>: {props.market_data.total_volume.usd.toLocaleString('en-US', { style: 'currency', currency: 'usd' })}</p>
            <a href='/wallet'><button className='buttonWallet'><Translator path="wallet.button"/></button></a>
        </div>
    )
}