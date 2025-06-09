import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faE } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faEye} from '@fortawesome/free-solid-svg-icons'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Header = () => {

    return(
        <header className='w-full bg-white'>
            {/* Top Colors */}
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
            {/* Main Header */}
            <div className='w-full h-50 flex flex-col'>
                {/* Upper Main Header */}
                <div className='w-full h-1/2 flex flex justify-center'>
                    <div className='w-11/12 h-full flex'>
                        {/*slogan*/}
                        <div className='w-1/3 h-full flex justify-start items-center font-roboto font-bold text-1xl italic'> 
                            <p>Let the power of Ai surprise you</p>
                        </div>
                        {/*logo*/}
                        <div className='w-1/3 h-full flex justify-center align-center text-[#44A77D] font-bold text-5xl font-roboto items-center'> 
                            <h1>Unwrapza</h1>
                        </div>
                        {/*buttons-on-right*/}
                        <div className='w-1/3 h-full flex justify-end gap-8 items-end'>
                            <Link to="/Login" className='flex flex-col items-center'>
                                <FontAwesomeIcon icon={faCircleUser} size="2x" color="#44A77D"/>
                                <p className='underline text-[#44A77D]'>Account</p>
                            </Link>
                            <Link to="" className='flex flex-col items-center'>
                                <FontAwesomeIcon icon={faCalendarDays} size="2x" color="#84B9FF"/>
                                <p className='underline text-[#84B9FF]'>Calendar</p>
                            </Link>
                            <Link to="" className='flex flex-col items-center'>
                                <FontAwesomeIcon icon={faEye} size="2x" color='#DC84FF'/>
                                <p className='underline text-[#DC84FF]'>Wishlist</p>
                            </Link>
                            <Link to="" className='flex flex-col items-center'>
                                <FontAwesomeIcon icon={faCartShopping} size="2x" color="#FF787A"/>
                                <p className='underline text-[#FF787A]'>Cart</p>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Searchbar */}
                <div className='w-full h-1/3 flex justify-center '>
                        <input 
                        type='text' 
                        placeholder='Search for products, brands and more' 
                        className='w-150 h-11 rounded-3xl border border-gray-1000 px-5 focus:outline-none'
                        />
                </div>
            </div>
            {/* Lower header */}
            <div className='w-full h-16 bg-[#44A77D] flex justify-center'>
                <div className='4/5 h-full flex justify-evenly items-center'>
                   <ul className='flex gap-8 text-white text-lg font-roboto font-bold'>
                      <li>Home</li>
                      <li>Products</li>
                      <li>Brands</li>
                      <li>Categories</li>
                      <li>Gifts</li>
                      <li>Offers</li>
                    </ul>
                </div> 
            </div>
        </header>
    )
}

export default Header;
