import React from 'react'
import dp from "./dps.jpg"
import { useNavigate } from 'react-router-dom'
import * as signalR from '@microsoft/signalr';
import { useState } from 'react';
import { redirect } from "react-router-dom";
import { connect } from 'react-redux';

function Login() {
    let emaill="";
    let passs="";
    const navigate = useNavigate();
    const [role, setRole] = useState(null)
    const handleUser = (e) => {
        setRole(e.target.value)
    }
    const [receivedData, setReceivedData] = useState(null);
    const [email_i, set_email_i] = useState("")
    const email_change = event => {
        set_email_i(event.target.value)
    }
    const [pass_i, set_pass_i] = useState("")
    const pass_change = event => {
        set_pass_i(event.target.value)
    }


    const connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7123/servermanage")
        .configureLogging(signalR.LogLevel.Information)
        .build();
    const start = async () => {
        try {
            await connection.start();
            console.log("Connected to signal r hub");
        } catch (error) {
            console.log(error);
        }
    }
    async function login_try_user() {
        alert(email_i);
        await connection.invoke("login_try_user", email_i, pass_i);
        await connection.invoke("save_current_user", email_i, pass_i, "u");
     
      
    }
    async function login_try_sp() {
        emaill = email_i;
        passs = pass_i;
        alert(email_i);
        await connection.invoke("login_try_sp", email_i, pass_i);
        await connection.invoke("save_current_user", email_i, pass_i, "sp");


    }
    function navigateToPage(targetUrl) {
        window.location.href = targetUrl;
    }
    async function login() {
        
        if (role == "user") {
            login_try_user()
        }
        else if (role =="serviceprovider")
        {
            login_try_sp()
        }
        else 
        {
            alert("select user or service provider");
        }
        
    }

    // Usage
    
//false-no account, true- account pressent
 
    connection.onclose(async () => {
        await start();
    });

    // Handle browser back/forward cache navigation state
    window.addEventListener("pageshow", (event) => {
        if (event.persisted && connection.state === signalR.HubConnectionState.Disconnected) {
            start();
        }
    });

  
    start().then(() => {
        console.log('Connected to SignalR Hub!');

        // Listen for incoming data from the server
        connection.on('login_result', (data) => {
            setReceivedData(data);

            // Trigger browser confirmation dialog
           

            

            if (data == "true")
            {
                
                
                // Navigate to the target route and optionally pass the data via state
                navigateToPage('/home');
            }
            else {
                alert("No such user");
                ///user not found
                
            }
        });
    })
        .catch(error => console.error('Connection failed: ', error));
 

    return (
        <div>
            <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
                <form className="w-[300px] h-[350px] rounded-[15px] shadow-gray bg-white shadow-2xl flex flex-col justify-center items-center gap-[10px]">
                    <p className="text-2xl">Login Here</p>
                    <img className="w-[70px] h-[70px] rounded-full cursor-pointer border-blue-800 border-[2px] overflow-hidden" src={dp}></img>

                    <input onChange={email_change} value={email_i} className="w-[80%] h-[40px] border-[2px]  border-blue-800 outline-0 p-[8px] shadow-2xl rounded-[10px]" placeholder='Email' type='text'></input>
                    <input onChange={pass_change} value={pass_i} className="w-[80%] h-[40px] border-[2px]  border-blue-800 outline-0 p-[8px] shadow-2xl rounded-[10px]" placeholder='Password' type='text'></input>
                    <div className="flex gap-[10px]"><input type="radio" name="type" value="user" checked={role === "user"} onChange={handleUser} ></input>

                        <label >User</label>
                    </div>
                    <div className="flex gap-[10px]"><input type="radio" name="type" value="serviceprovider" checked={role === "serviceprovider"} onChange={handleUser}></input>
                        <label>Service Provider</label>
                    </div>
                 
                    <button className="w-[100px] h-[40px] bg-blue-800 rounded-[10px] text-white" onClick={() => login()  } >Submit</button>

                    <p>Want To Create A New Account? <span className="text-blue-800 cursor-pointer" onClick={() => navigate("/signup")}>Signup</span></p>

                </form>


           
            </div> </div>
    )
}

export default Login
