import loginBackground from '../assets/Login_Background.jpg';



const LoginPage = () => {
    
    return (
        <div className="w-full h-[100vh]">
            <div className='w-full h-2.5 flex justify-evenly mb-5'>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#FFFB84"}}></div>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#84FF96"}}></div>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#84F3FF"}}></div>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#84B9FF"}}></div>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#9084FF"}}></div>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#DC84FF"}}></div>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#FF84F7"}}></div>
                <div className="w-1/8 h-full" style={{ backgroundColor: "#FF787A"}}></div>
            </div>
            <div className="w-full h-[calc(100vh-10px)] bg-cover flex flex-col justify-center items-center" 
               style={{ backgroundImage: `url(${loginBackground})` }}>
                <div className='w-[800px] h-[600px] bg-white flex flex-col  rounded-xl'>

                </div>
            </div>
        </div>
     );
}
export default LoginPage;
