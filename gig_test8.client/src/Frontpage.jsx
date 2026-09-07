import React from 'react'
import logo from "./logofinal.png"
import img2 from "./img2.jpeg"
import img4 from "./img4.jpeg"
import img6 from "./img6.jpeg"
import img8 from "./img8.jpeg"
import { useNavigate } from 'react-router-dom'
function Frontpage() {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full gap-[50px] p-[20px] flex flex-col gap-[100px] ">
        <div className="w-full flex justify-between">
            <p className="text-4xl">Welcome To <span className="text-blue-800">COSERVE</span></p>
            <div className="p-[8px] "><button className="w-[120px] h-[40px] rounded-[10px] bg-blue-800 text-white shadow-2xl shadow-[black] cursor-pointer hover:bg-blue-500 " onClick={()=>navigate("/signup")}>Get Started</button></div>
        </div>
        <div className="w-full h-[400px] bg-[black] rounded-[28px] flex justify-between bg-blue-800 p-[26px] shadow-[black] shadow-2xl">
            <div className=" w-[50%] h-[100%] flex flex-col justify-center items-start"><p className="text-3xl text-white">COSERVE</p>
            <p className="text-3xl text-white">GIG Services Platform</p>
            <br></br>
            <p className="text-xl text-white">The most efficient way to hire top freelance talent.</p>
            <p className="text-xl text-white"> Enjoy unmatched flexibility, speed, and best-grade quality, </p>
            <p className="text-xl text-white"> while eliminating hiring complexity.</p>
            
            
            </div>
            <div className="w-[50%] h-[100%] justify-center items-center flex ">
                <img src={logo} className="rounded-[20px]"></img>
            </div>
            
        </div>
        <div className="w-full h-[300px] bg-white flex justify-between p-[20px] rounded-[20px] ">
            <div className="w-[50%] h-[100%] flex justify-center items-center "><img src={img2} className=" shadow-black shadow-2xl w-[70%] h-[80%] rounded-[18px]  border-blue-800 border-[2px]"></img></div>
            <div className="w-[50%] h-[100%]  flex flex-col justify-center items-start gap-[10px]">
                <p className="text-3xl text-black">Professional & High-End Talent</p>
                <br></br>
                <p className="text-xl text-black"> • Work with hand-picked experts. Build anything, anytime.</p>
                <p className="text-xl text-black"> • Unlock world-class talent—without the agency price tag.</p>
                <p className="text-xl text-black"> • Partner with top-tier pros who treat your goals like their own.</p>
                <p className="text-xl text-black"> • From quick tasks to complete builds, hire verified experts on demand.</p>
            </div>
        </div>
        <div className="w-full h-[300px] bg-white flex justify-between p-[20px] rounded-[20px] ">
            <div className="w-[50%] h-[100%]  flex flex-col justify-center items-start gap-[10px]">
                <p className="text-3xl text-black">Speed & On-Demand Delivery</p>
                <br></br>
                <p className="text-xl text-black"> • Immediate execution. Move from idea to delivery without the wait.</p>
                <p className="text-xl text-black"> • Need it done fast? Tap into a network of ready-to-work professionals.</p>
                <p className="text-xl text-black"> • Real-time hiring for tight deadlines and high-priority milestones.</p>
                <p className="text-xl text-black"> • Get instant access to top skills, exactly when you need them.</p>
            </div>
            <div className="w-[50%] h-[100%] flex justify-center items-center "><img src={img4} className="  shadow-black shadow-2xl w-[70%] h-[80%] rounded-[18px]  border-blue-800 border-[2px]"></img></div>
            
        </div>
        <div className="w-full h-[300px] bg-white flex justify-between p-[20px] rounded-[20px] ">
            <div className="w-[50%] h-[100%] flex justify-center items-center "><img src={img6} className="  shadow-black shadow-2xl w-[70%] h-[80%] rounded-[18px]  border-blue-800 border-[2px]"></img></div>
            <div className="w-[50%] h-[100%]  flex flex-col justify-center items-start gap-[10px]">
                 <p className="text-3xl text-black">Value & Cost Savings</p>
                 <br></br>
                <p className="text-xl text-black"> • Elite execution tailored to fit your project budget.</p>
                <p className="text-xl text-black"> • Premium quality without full-time overhead or traditional agency markups.</p>
                <p className="text-xl text-black"> • Pay only for completed, verified work—no hidden retainers. </p>
                <p className="text-xl text-black"> • Smarter resourcing: top-tier output engineered for maximum ROI.</p>
            </div>
        </div>
        <div className="w-full h-[300px] bg-white flex justify-between p-[20px] rounded-[20px] ">
            <div className="w-[50%] h-[100%]  flex flex-col justify-center items-start gap-[10px]">
                <p className="text-3xl text-black">Flexibility & Scalability</p>
                <br></br>
                <p className="text-xl text-black"> • The agile way to hire: assemble your dream team unit by unit.</p>
                <p className="text-xl text-black"> • From single tasks to end-to-end builds, scale at your own pace.</p>
                <p className="text-xl text-black"> • Build custom project teams on demand—no long-term lock-in.</p>
                <p className="text-xl text-black"> • Dynamic talent solutions that expand and shrink with your workload.</p>
            </div>
            <div className="w-[50%] h-[100%] flex justify-center items-center "><img src={img8} className="w-[70%] h-[80%] rounded-[18px]  border-blue-800 border-[2px] shadow-black shadow-2xl"></img></div>
            
        </div>
        <div className="w-full h-[100px] bg-blue-800 rounded-[20px]"></div>
        
      
    </div>
  );
}

export default Frontpage;