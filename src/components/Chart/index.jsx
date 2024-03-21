import './chart.css'
import {AreaChart, CartesianGrid, Tooltip, YAxis, XAxis, Legend, Area, ResponsiveContainer} from 'recharts';
import Translator from '../I18n/translator'

export default function Chart({data, price}){
    return (
            <div id="areachart"> { /* Gráfico de preços */ }
                <h2 className='chartText'><Translator path="details.chartText"/></h2>
                <ResponsiveContainer width="80%" height={400} className='chart'>
                    <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area dataKey={price} stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
            </div>
    )
}