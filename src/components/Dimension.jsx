import React, { useState } from 'react';
import Space from './Space';
import Unit from './Unit';
import TotalArea from './TotalArea';
import CalculateTotalArea from './CalculateTotalArea';


function Dimension({onNext}) {
    const [activeForm, setActiveForm] = useState(null);

    const handleSwitch = (formType) => {
        setActiveForm(formType);
    };


    return (
        <div className=' rounded shadow'>
            <form>

                <div className="flex flex-col lg:flex-row gap-8 m-4 ">
                    <div className="flex flex-col w-full lg:w-[500px] gap-2 m-0">
                        <h2 className="text-xl font-bold">Choose the space you need tiles for</h2>
                        <h3>Select if it is a wall or a floor</h3>
                    </div>
                    <Space />
                </div>


                <div className="flex flex-col lg:flex-row gap-8 m-4">
                    <div className="flex flex-col w-full lg:w-[500px] gap-2 m-0">
                        <h2 className="text-xl font-bold">Do You Know The Total Area?</h2>
                        <h3>Select Measurement Unit</h3>
                    </div>
                    <Unit />
                </div>


                <div className="flex flex-col lg:flex-row justify-center items-start m-6">
                    {/* Left Side Button */}
                    <div className="w-full lg:w-1/2 flex justify-center px-4">
                        {(activeForm === null || activeForm === 'total') && (
                            <button
                                type="button"
                                onClick={() => handleSwitch('calculate')}
                                className="border border-gray-300 px-5 py-3 rounded-md shadow-md hover:border-blue-500 transition"
                            >
                                Calculate Total Area
                            </button>
                        )}
                        {activeForm === 'calculate' && (
                            <button
                                type="button"
                                onClick={() => handleSwitch('total')}
                                className="border border-gray-300 px-5 py-3 rounded-md shadow-md hover:border-blue-500 transition"
                            >
                                I Know Total Area
                            </button>
                        )}
                    </div>

                    {/* Right Side: Button or Form */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center px-4 mt-4 lg:mt-0">
                        {activeForm === null && (
                            <button
                                type="button"
                                onClick={() => handleSwitch('total')}
                                className="border border-gray-300 px-5 py-3 rounded-md shadow-md hover:border-blue-500 transition"
                            >
                                I Know Total Area
                            </button>
                        )}

                        {activeForm === 'calculate' && <CalculateTotalArea />}
                        {activeForm === 'total' && <TotalArea />}
                    </div>
                </div>


                <button
                    type="button"
                    onClick={onNext}
                    className="border border-green-300 m-4 px-4 py-2 rounded-md shadow-md cursor-pointer hover:border-blue-500 bg-green-500 text-white"
                >
                    Next
                </button>

            </form>
        </div>
    );
}

export default Dimension;
