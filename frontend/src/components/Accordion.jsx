import React, { useState, useEffect } from 'react';

const Accordion = ({ data, imagePosition = 'left' }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [fade, setFade] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    
    setFade(true);
    const timeout = setTimeout(() => setFade(false), 300); 
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  return (
    <div className="flex flex-col items-center justify-center space-y-10">
      <div
        className={`flex flex-col md:flex-row ${
          imagePosition === 'right' ? 'md:flex-row-reverse' : ''
        } items-center md:space-x-10 md:space-x-reverse`}
      >
        <div className="max-w-3xl flex justify-center items-center">
          <img
            src={activeIndex !== null ? data[activeIndex].image : data[0].image}
            alt="Feature"
            className={`transition-opacity duration-500 ease-in-out ${
              fade ? 'opacity-100' : ''
            }`}
          />
        </div>

        <div className="max-w-xl text-left">
          {data.map((item, index) => (
            <div key={index} className="mb-4">
              <li
                className="text-2xl text-gray-600 w-full text-left"
                onClick={() => toggleAccordion(index)}
              >
                {item.title}
              </li>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="text-lg text-gray-500 mt-2 text-left">{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
