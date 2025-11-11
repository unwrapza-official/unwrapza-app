import { useState } from 'react';

const AISearchComponent = () => {
  const [age, setAge] = useState('');
  const [purpose, setPurpose] = useState('');
  const [type, setType] = useState('');
  const [context, setContext] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');


  const formatPrice = (value) => {
    if (!value) return "";
    const num = parseFloat(value.replace(",", "."));
    if (isNaN(num)) return "";
    return num.toFixed(2);
  };

  return (
    <div className="w-full md:w-1/3 h-full flex flex-col items-center md:items-start">
      {/* Search container */}
      <div className="w-9/10 h-full flex flex-col justify-evenly my-5">
        <h1 className="italic font-roboto font-bold text-white text-[26px]">
          Let AI find 
          <span className="text-[#388dff]"> your </span> 
          perfect gift
        </h1>

        {/* Search form */}
        <form className="w-full max-w-2xl mx-auto py-2 grid grid-cols-2 gap-3 text-white text-lg font-roboto font-bold">
          
          {/* Who is it for? */}
          <label className="flex flex-col">
            For who is it?
            <select
              className="mt-2 h-10 px-3 bg-green text-white font-semibold rounded-[6px] border-3
                         shadow-[4px_4px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                         hover:translate-x-[4px] hover:translate-y-[4px]
                         transition-all duration-300 ease-out focus:outline-none cursor-pointer"
            >
              <option value="" disabled selected>Select</option>
              <option value="self" className='text-black'>Self</option>
              <option value="friend" className='text-black'>Friend</option>
              <option value="partner" className='text-black'>Partner</option>
              <option value="family" className='text-black'>Family</option>
              <option value="colleague" className='text-black'>Colleague</option>
              <option value="other" className='text-black'>Other</option>
            </select>
          </label>

          {/* Age */}
          <label className="flex flex-col">
            How old is he/she?
            <input
              type="number"
              className="mt-2 h-10 px-3 bg-green text-white font-semibold rounded-[6px] border-3
                         shadow-[4px_4px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                         hover:translate-x-[4px] hover:translate-y-[4px]
                         transition-all duration-300 ease-out focus:outline-none placeholder-white/70
                         [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="e.g. 25"
            />
          </label>

          {/* Purpose */}
          <label className="flex flex-col">
            The purpose of this gift?
            <input
              type="text"
              className="mt-2 h-10 px-3 bg-green text-white font-semibold rounded-[6px] border-3
                         shadow-[4px_4px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                         hover:translate-x-[4px] hover:translate-y-[4px]
                         transition-all duration-300 ease-out focus:outline-none placeholder-white/70"
              placeholder="Birthday, graduation..."
            />
          </label>

          {/* Type */}
          <label className="flex flex-col">
            The type of this gift?
            <select
              className="mt-2 h-10 px-3 bg-green text-white font-semibold rounded-[6px] border-3
                         shadow-[4px_4px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                         hover:translate-x-[4px] hover:translate-y-[4px]
                         transition-all duration-300 ease-out focus:outline-none cursor-pointer"
            >
              <option value="" disabled selected>Select</option>
              <option value="funny" className='text-black'>Funny</option>
              <option value="practical" className='text-black'>Practical</option>
              <option value="unique" className='text-black'>Unique</option>
              <option value="personal" className='text-black'>Personal</option>
              <option value="other" className='text-black'>Other</option>
            </select>
          </label>

          {/* Context */}
          <label className="flex flex-col col-span-2">
            More context about this gift?
            <textarea
              className="mt-2 p-3 bg-green text-white font-semibold rounded-[6px] border-3
                         shadow-[4px_4px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                         hover:translate-x-[4px] hover:translate-y-[4px]
                         overflow-hidden
                         transition-all duration-300 ease-out focus:outline-none resize-none placeholder-white/70 h-20"
              placeholder="Describe hobbies, interests, or details..."
            ></textarea>
          </label>

          {/* Price */}
          <label className="flex flex-col col-span-2">
            The price of this gift?
            <div className="mt-2 flex gap-4">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                onBlur={() => setMinPrice(formatPrice(minPrice))}
                className="w-1/2 h-10 px-3 bg-green text-white font-semibold rounded-[6px] border-3
                           shadow-[4px_4px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                           hover:translate-x-[4px] hover:translate-y-[4px]
                           transition-all duration-300 ease-out focus:outline-none placeholder-white/70
                           [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Min price"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                onBlur={() => setMaxPrice(formatPrice(maxPrice))}
                className="w-1/2 h-10 px-3 bg-green text-white font-semibold rounded-[6px] border-3
                           shadow-[4px_4px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                           hover:translate-x-[4px] hover:translate-y-[4px]
                           transition-all duration-300 ease-out focus:outline-none placeholder-white/70
                           [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Max price"
              />
            </div>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 mt-4 p-3 px-6 bg-green border-3
                       text-white font-bold italic rounded-[6px]
                       shadow-[6px_6px_0_#FFFFFF] hover:shadow-[0_0_0_#FFFFFF]
                       hover:translate-x-[6px] hover:translate-y-[6px]
                       transition-all duration-300 ease-out active:scale-95
                       hover:cursor-pointer"
          >
            Let AI do its thing
          </button>
        </form>
      </div>
    </div>
  );
};

export default AISearchComponent;
