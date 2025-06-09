import React from 'react';
import AISearchComponent from './AISearchComponent';
import AIResultComponent from './AIResultComponent';

const UnwrapzaAI = () => {
    return (
        <>
            <div className='w-full h-[calc(100vh-282px)] bg-[#60D8A5] flex flex-col md:flex-row'>
                <AISearchComponent/>
                <AIResultComponent/>
            </div>
            <div className='w-full h-2.5 flex justify-evenly'>
                <div className="w-1/3 h-full" style={{ backgroundColor: "#84F3FF"}}></div>
                <div className="w-1/3 h-full" style={{ backgroundColor: "#DC84FF"}}></div>
                <div className="w-1/3 h-full" style={{ backgroundColor: "#FF84F7"}}></div>
            </div>
        </>
    )
}
export default UnwrapzaAI;