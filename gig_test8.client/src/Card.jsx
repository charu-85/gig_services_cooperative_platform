import React from 'react'
import bi from "./bi.jpg"
import dp from "./dps.jpg"
import { useNavigate } from 'react-router-dom'

function Card({name , service , price , image}) {
    const navigate = useNavigate()
    return (
        <div className="w-[250px] h-[250px] flex flex-col justify-center items-center p-[10px] rounded-[20px] shadow-2xl shadow-gray hover:border-blue-800 hover:border-[2px] cursor-pointer "  >
            <div className="w-[95%] h-[50%] relative "><img className="w-[100%] h-[100%] rounded-[10px] " src={bi}></img>
                <img className="w-[60px] h-[60px] rounded-full border-blue-800 border-[2px] overflow-hidden cursor-pointer absolute top-20 left-8" src={image}></img></div>

            <div className="w-[90%] h-[50%] flex justify-center items-center flex-col">
                <p className="font-bold text-2xl">{name}</p>
                <p className="font-semibold text-[16px]">{service}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}

export default Card
