import { useState } from 'react';


const AISearchComponent = () => {

    const [age, setAge] = useState('');
    const [purpose, setPurpose] = useState('');
    const [type, setType] = useState('');
    const [context, setContext] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    return (
        <div className="w-full md:w-1/3 h-full flex flex-col items-center justify-evenly">
            {/*Search container*/}
            <div className="w-9/10 h-full flex flex-col justify-evenly">
                <h1 className="italic font-roboto font-bold text-white text-4xl">
                    Let AI find 
                    <span className='text-[#84B9FF]'> your </span> 
                    perfect gift
                </h1>
                {/*Search form*/}
                <form className="w-full max-w-2xl mx-auto p-6 grid grid-cols-2 gap-6 text-white text-lg font-roboto font-bold">
                    {/* Who is it for? */}
                    <label className="flex flex-col">
                        For who is it?
                        <select className="mt-2 h-12 p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none">
                            <option value="" disabled selected>Select</option>
                            <option value="self">Self</option>
                            <option value="friend">Friend</option>
                            <option value="partner">Partner</option>
                            <option value="family">Family</option>
                            <option value="colleague">Colleague</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    {/* Age */}
                    <label className="flex flex-col">
                        The age of this person?
                        <input type="number" className="mt-2 h-12 p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none" />
                    </label>

                    {/* Purpose */}
                    <label className="flex flex-col">
                        The purpose of this gift?
                        <input type="text" className="mt-2 h-12 p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none" />
                    </label>

                    {/* Type */}
                    <label className="flex flex-col">
                        The type of this gift?
                        <select className="mt-2 h-12 p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none">
                            <option value="" disabled selected>Select</option>
                            <option value="funny">Funny</option>
                            <option value="practical">Practical</option>
                            <option value="unique">Unique</option>
                            <option value="personal">Personal</option>
                            <option value="other">Other</option>
                        </select>
                    </label>

                    {/* Context */}
                    <label className="flex flex-col col-span-2">
                        More context about this gift?
                        <textarea className="mt-2 p-3 bg-white border border-gray-300 text-black rounded-lg resize-none h-24 focus:outline-none"></textarea>
                    </label>

                    {/* Price */}
                    <label className="flex flex-col col-span-2">
                        The price of this gift?
                        <div className="mt-2 flex gap-4">
                            <input type="number" className="w-1/2 h-12 p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none" placeholder="Min price" />
                            <input type="number" className="w-1/2 h-12 p-3 bg-white border border-gray-300 text-black rounded-lg focus:outline-none" placeholder="Max price" />
                        </div>
                    </label>

                    {/* Submit Button */}
                    <button type="submit" className="col-span-2 mt-4 h-12 p-3 bg-[#FF787A] hover:bg-red-400 transition rounded-lg text-white font-bold italic">
                        Let AI do its thing
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AISearchComponent;