import React from 'react'
import dp from "./dps.jpg"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { MdAdd } from "react-icons/md";
import * as signalR from '@microsoft/signalr';
import { useRef } from 'react';
import { useEffect } from 'react';

function Signup() {
    let profile_image_path = "";
    const bl = useRef()
    const connectionRef = useRef(null); // REQUIRED FIX: Persistent ref for connection
    const navigate = useNavigate();
    const [role, setRole] = useState(null)
    const handleUser = (e) => {
        setRole(e.target.value)
    }



    const [filePath, setFilePath] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Browsers restrict full local paths for security; 
            // file.name gives the file name, or file.webkitRelativePath for folder uploads
            setFilePath(file.name);
        }
    };
    const [profileName, setproFileName] = useState("");

    const handleproFileChange = (event) => {
        const file = event.target.files[0];
        setproFileName(file ? file.name : "");
    };

    const [fn_i, set_fn_i] = useState(" sd")
    const fn_change = event => {
        set_fn_i(event.target.value)
    }

    const [ln_i, set_ln_i] = useState(" sd")
    const ln_change = event => {
        set_ln_i(event.target.value)
    }

    const [e_i, set_e_i] = useState(" sd")
    const e_change = event => {
        set_e_i(event.target.value)
    }

    const [p_i, set_p_i] = useState(" sd")
    const p_change = event => {
        set_p_i(event.target.value)
    }

    const [cn_i, set_cn_i] = useState(" sd")
    const cn_change = event => {
        set_cn_i(event.target.value)
    }


    // REQUIRED FIX: Start connection only inside useEffect using ref to prevent recreating on every keystroke
    const start = async () => {
        try {
            if (connectionRef.current) {
                await connectionRef.current.start();
                console.log("Connected to signal r hub");
            }
        } catch (error) {
            console.log(error);
        }
    }



    async function sign_up_user(first_name, last_name, email, password, profile_imagepath) {
        if (!connectionRef.current) return;
        await connectionRef.current.invoke("signup_user", first_name, last_name, email, password, profile_imagepath);
        await connectionRef.current.invoke("save_current_user", e_i, p_i, "u");
    }
    async function sign_up_service_provider(first_name, last_name, email, password, profile_imagepath, company_name, license_path) {
        if (!connectionRef.current) return;
        await connectionRef.current.invoke("signup_sp", first_name, last_name, email, password, profile_imagepath, company_name, license_path);
        await connectionRef.current.invoke("save_current_user", e_i, p_i, "sp");
    }
    async function true_sign_up() {
       // alert("signing");
        if (role == "user") {
          //  alert("signed up user");
            await sign_up_user(fn_i, ln_i, e_i, p_i, profileName); // REQUIRED FIX: await server update before route change

            navigate("/home");


        }
        else {
            await sign_up_service_provider(fn_i, ln_i, e_i, p_i, profileName, cn_i, filePath); // REQUIRED FIX: await server update before route change

           // alert("signed up sp");

            navigate("/home");
        }
    }

    useEffect(() => {
        // REQUIRED FIX: Build connection instance exactly once on mount
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7123/servermanage")
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connectionRef.current = connection;

        connection.onclose(async () => {
            await start();
        });

        // Handle browser back/forward cache navigation state
        const handlePageShow = (event) => {
            if (event.persisted && connectionRef.current && connectionRef.current.state === signalR.HubConnectionState.Disconnected) {
                start();
            }
        };
        window.addEventListener("pageshow", handlePageShow);

        start();

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);


    return (
        <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
            <form className="w-[300px] min-h-[500px] rounded-[15px] shadow-gray bg-white shadow-2xl flex flex-col justify-center items-center gap-[10px] p-[10px]" onSubmit={(e) => e.preventDefault()}>
                <p className="text-2xl">Signup Here</p>
                <img className="w-[70px] h-[70px] rounded-full border-blue-800 border-[2px] overflow-hidden cursor-pointer" src={dp}></img>
                <input value={fn_i} onChange={fn_change} className="w-[80%] h-[40px] border-[2px]  border-blue-800 outline-0 p-[8px] shadow-2xl rounded-[10px]" placeholder='Firstname' type='text'></input>
                <input value={ln_i} onChange={ln_change} className="w-[80%] h-[40px] border-[2px]  border-blue-800 outline-0 p-[8px] shadow-2xl rounded-[10px]" placeholder='Lastname' type='text'></input>
                <input value={e_i} onChange={e_change} className="w-[80%] h-[40px] border-[2px]  border-blue-800 outline-0 p-[8px] shadow-2xl rounded-[10px]" placeholder='Email' type='text'></input>
                <input value={p_i} onChange={p_change} className="w-[80%] h-[40px] border-[2px]  border-blue-800 outline-0 p-[8px] shadow-2xl rounded-[10px]" placeholder='Password' type='text'></input>

                <p>Select Role</p>

                <div className="flex gap-[10px]"><input type="radio" name="type" value="user" checked={role === "user"} onChange={handleUser} ></input>

                    <label >User</label>
                </div>
                <div className="flex gap-[10px]"><input type="radio" name="type" value="serviceprovider" checked={role === "serviceprovider"} onChange={handleUser}></input>
                    <label>Service Provider</label>
                </div>
                {role === "serviceprovider" && <div className='flex-col flex gap-[20px]'>
                    <input value={cn_i} onChange={cn_change} type="text" className="w-[100%] h-[40px] border-[2px] border-blue-800 outline-0 p-[8px] shadow-2xl rounded-[10px]" placeholder='Enter Company Name' ></input>
                    <input
                        type="file"
                        ref={bl}
                        onChange={handleFileChange}
                        className="hidden"
                    /> <div className="flex gap-[10px] items-center"> <MdAdd className="cursor-pointer" onClick={() => bl.current.click()} /> <p>Add Business Linsence</p></div>
                </div>}

                <button type="button" className="w-[100px] h-[40px] bg-blue-800 rounded-[10px] text-white" onClick={() => true_sign_up()} >Submit</button>
                <p>Already Have An Account? <span className="text-blue-800 cursor-pointer" onClick={() => navigate("/login")}>Login..</span></p>

            </form>
            <input type="file" accept=".pdf" hidden ref={bl} ></input>

        </div>
    )
}

export default Signup