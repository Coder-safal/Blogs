import React, { useEffect, useState } from 'react';

const Body = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = `At Insightful Reads, we are dedicated to providing high-quality content that educates, informs, and inspires. Our team of writers and experts covers a range of topics from the latest in technology to practical lifestyle tips. Join us on our journey to explore new ideas and gain valuable insights.`;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText(fullText.substring(0, index));
      index += 1;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 50); // Adjust typing speed here

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='w-[100%] bg-cyan-800 flex justify-center py-10'>
      <div className='w-[300px] text-white text-justify h-[500px]'>
        {displayText}
      </div>
    </div>
  );
};

export default Body;
