

import React, { useState, useEffect } from 'react'

function About() {
    const [displayText, setDisplayText] = useState('');
    const fullText = `Hey! I'm Safal Bhattarai, 
    a 21-year-old CSIT student from Nepal, diving deep into the world of backend development. 
    My go-to tool is Node.js, and I'm all about crafting systems that are not just functional 
    but also efficient and reliable. Whether it's building APIs, managing databases, or optimizing 
    server-side performance, I love the challenge of making everything work smoothly behind the
     scenes. I'm constantly learning and experimenting with new technologies to push my skills 
     further. Beyond the code, I'm just a regular guy who enjoys exploring the ever-evolving tech 
     landscape and finding ways to make a difference through my work. If you're into tech, or just want to chat about the latest in backend development,
     I'm always up for a good conversation!`;

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
        <div className='bg-cyan-800 h-[100vh] '>
            <div className='w-[100%]  flex flex-col items-center justify-center py-10 '>
                <div className='w-[410px] h-[410px] rounded-full flex justify-center items-center border-2 border-black'>
                    <img className='w-[400px] rounded-full' src="https://imgs.search.brave.com/xFkz2rHVRFxHB3pOHKPh-9VUyP9DKszbVpTUzIP9HvM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvY29vbC1wcm9m/aWxlLXBpY3R1cmUt/ODdoNDZnY29iamw1/ZTR4dS5qcGc" alt="" />
                </div>
                <div className='w-[500px] text-white text-justify mt-8'>
                    {displayText}
                </div>
            </div>
        </div>
    );
}

export default About