import { React, useRef } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaSearch } from "react-icons/fa";
import Card from './Card.jsx';
import { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from "./dps.jpg"
import { Add,Clear } from './userslice.js';
import * as signalR from '@microsoft/signalr';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import logo from "./logofinal.png"



// Connection defined outside to prevent continuous re-creation on re-renders
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7123/servermanage")
    .configureLogging(signalR.LogLevel.Information)
    .build();
   
function Home() {

    const [rolee, setRolee] = useState(null);
    let noo = 0;
    const [serImage, setSerImage] = useState("");
    const base64DataRef = useRef("");
    const navigationEntries = performance.getEntriesByType('navigation');

    const location = useLocation();
    const email = location.state?.emaile;
    const pass = location.state?.passss;
    const img = useRef();
    const [fimage, setFimage] = useState();


    const [show, setShow] = useState(false)
    const [showadd, setShowAdd] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name, setname] = useState(null)
    const [service, setService] = useState(null)
    const [price, setPrice] = useState(null)
    const [skills, setSkills] = useState(null)
    const [number, setNumber] = useState(null)
    const handleLogout = () => {
        dispatch(Clear()); // Clears all Redux added cards
        navigate("/login");
    };
    // const [showprofile , setShowProfile] = useState(true)
    const [selectedCard, setSelectedCard] = useState(null);
    let items = useSelector(state => state.cart)
    const handleImage = (e) => {
        let file = e.target.files[0]
        if (!file) return;
        
       
        const reader = new FileReader();
        reader.onload = async () => {
            const base64String = reader.result;

            // REQUIRED CHANGE: Save base64 string directly inside fimage
            // This acts as both the preview source and the final database text data string
            setFimage(base64String);
        };

        reader.readAsDataURL(file);

    }
   

    const start = async () => {
        try {
            if (connection.state === signalR.HubConnectionState.Disconnected) {
                await connection.start();
                console.log("Connected to signal r hub");
            }
        } catch (error) {
            console.log("not connected");
        }
    }

    async function save_service() {
        if (connection.state === signalR.HubConnectionState.Connected) {
            
            await connection.invoke("save_service", name, service, price, skills, number, fimage);
        } else {
            console.log("SignalR is not connected yet.");
        }
    }

    async function get_services_db() {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.invoke("get_services");
        }
    }
    async function get_c_u() {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.invoke("get_curent_user");
        }
    }

    useEffect(() => {
        start().then(() => {
       
            get_services_db();
            get_c_u();


            console.log('Connected to SignalR Hub!');

            const navigationEntry = performance.getEntriesByType('navigation')[0];

            console.log('The page was refreshed.');
            connection.on('home_first_services', (data) => {
              
                if (data != "") {

                    const listOfLists = JSON.parse(data);
                    console.log(listOfLists);

                    for (const element of listOfLists) {

                        dispatch(Add({ name: element[0], service: element[1], price: element[2], skills: element[3], number: element[4], image: element[5] }))


                    }
                }
            
                

            });
            connection.on('current_user_type', (data) => {
        
                if (data == "u") {
                   
                    setRolee("user")
                }
                else {
                    setRolee("serviceprovider");
                }
            });
            
            console.log('The page is loaded for the first time!');
        })
            .catch(error => console.error('Connection failed: ', error));

        return () => {
           
        };
    }, []);

    return (
        <><input type="file" ref={img} className="hidden" onChange={handleImage} accept="image/png" />
            <div className="w-full h-[100vh]">
                {!showadd ? <div><div className="w-full h-[80px] bg-blue-800 flex justify-between items-center p-[20px] relative">
                    <div className="text-white"><img src={logo } className="w-[120px] h-[60px] rounded-[10px]"></img></div>
                    <div><input type="text" placeholder="Search..." className="w-[400px] h-[50px] bg-white rounded-2xl p-[10px] outline-0 border-0"></input></div>
                    <div><TiThMenu className="text-white size-5 cursor-pointer" onClick={() => setShow(s => !s)} /></div>
                    <div className={show ? `w-[100px] h-[150px] bg-white absolute right-4 top-18 z-30 rounded-[15px] shadow-gray shadow-2xl flex flex-col justify-center items-center gap-[20px] ` : "hidden"} >
                        <IoAddCircle className={rolee=="user"?`hidden`:`w-[30px] h-[30px] cursor-pointer`} onClick={() => setShowAdd(p => !p)} />
                        <p className=" text-red-600 cursor-pointer font-bold" onClick={() => { handleLogout()}}>Logout</p>
                    </div>
                </div>
                    <div className="w-full h-[100%] flex justify-center items-center flex-wrap p-[15px] gap-[20px]">
                        {items?.map((item, index) => (
                            <div key={index} onClick={() => setSelectedCard(item)} className="cursor-pointer">
                                <Card name={item.name} service={item.service} price={item.price} image={item.image} />
                            </div>
                        ))}
                    </div>
                </div> :
                    <div className={showadd ? `w-full h-[100vh] flex flex-col justify-center items-center z-[200px]` : `hidden`}>
                        <div className="w-[300px] h-[400px] shadow-gray shadow-2xl rounded-[20px] flex flex-col justify-center items-center p-[5px] gap-[10px]">
                            <img className="w-[70px] h-[70px] rounded-full border-blue-800 border-[2px] overflow-hidden cursor-pointer" src={fimage || dp} onClick={() => img.current.click()} ></img>

                            <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl p-[8px]" placeholder='Enter Name' onChange={(e) => setname(e.target.value)} value={name}></input></div>
                            <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter Service' onChange={(e) => setService(e.target.value)} value={service}></input></div>
                            <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} value={price}></input></div>
                            <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter Skills' onChange={(e) => setSkills(e.target.value)} value={skills}></input></div>
                            <div><input className=" w-[100%] h-[40px] border-0 outline-none rounded-[10px] shadow-2xl  p-[8px]" placeholder='Enter mobile Number' onChange={(e) => setNumber(e.target.value)} value={number}></input></div>
                            <button className="w-[100px] h-[40px] bg-blue-800 rounded-[10px] text-white cursor-pointer" onClick={() => { dispatch(Add({ name: name, service: service, price: price, skills: skills, number: number, image: fimage })); save_service(); }}>Add Service</button>
                        </div>
                        <IoMdArrowRoundBack className="absolute left-2.5 top-2.5 size-5 cursor-pointer" onClick={() => setShowAdd(p => !p)} />

                    </div>}
                <input type="file" hidden accept='image/*' ref={img} onChange={(e) => handleImage(e)}></input>
                {selectedCard && (
                    <div className="w-full h-[100vh] flex flex-col justify-center items-center bg-[black]/90 z-[200] fixed left-0 top-0">
                        <div className="w-[300px] h-[400px] shadow-gray shadow-2xl rounded-[20px] flex flex-col bg-[white] justify-center items-center relative p-[15px] gap-[15px]">
                            <img className="w-[70px] h-[70px] rounded-full border-blue-800 border-[2px] overflow-hidden object-cover" src={selectedCard.image || dp} alt="profile" />

                            <div><p className="font-bold text-xl">{"Name: "+selectedCard.name}</p></div>
                            <div><p className="font-bold text-xl">{"Service: " +selectedCard.service}</p></div>
                            <div><p className="font-bold text-xl">{"Price: " +selectedCard.price}</p></div>
                            <div><p className="font-bold text-xl">{"Skills: " +selectedCard.skills || "N/A"}</p></div>
                            <div><p className="font-bold text-xl">{"Mo.No: " +selectedCard.number || "N/A"}</p></div>
                            <div><IoMdArrowRoundBack className="absolute z-[200] left-2.5 top-2.5 size-5 cursor-pointer" onClick={() => setSelectedCard(null)} /></div>
                        </div>
                    </div>
                )}

            </div>
        </>
    )
}

export default Home