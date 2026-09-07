import React from 'react'
import dp from "./dps.jpg"
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function Add() {
    const navigate = useNavigate()
    return (
        <div>
            <div className="w-full h-[100vh] flex flex-col justify-center items-center relative">
                <div className="w-[300px] h-[400px] shadow-gray shadow-2xl rounded-[20px] flex flex-col justify-center items-center p-[5px] gap-[10px]">
                    <img className="w-[70px] h-[70px] rounded-full border-blue-800 border-[2px] overflow-hidden cursor-pointer" src={dp}></img>

                    <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl p-[8px]" placeholder='Enter Name'></input></div>
                    <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter Service'></input></div>
                    <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter Price'></input></div>
                    <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter Skills'></input></div>
                    <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter mobile Number'></input></div>
                    <button className="w-[100px] h-[40px] bg-blue-800 rounded-[10px] text-white cursor-pointer" >Add Service</button>
                </div>
                <IoMdArrowRoundBack className="absolute left-2.5 top-2.5 size-5 cursor-pointer" onClick={() => navigate("/home")} />

            </div>

        </div>
    )
}

export default Add
