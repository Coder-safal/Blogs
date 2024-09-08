import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Signup() {

    const navigator = useNavigate();

    const [userName, setUsername] = useState("");
    const [currPassword, setCurrPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const [onButton, setOnbutton] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            navigator("/signin");
            setSuccess(false);
        }

    }, [success])



    useEffect(() => {
        console.log("Check Check bro!");

        if (onButton) {
            const details = { email: email, fullName: fullName, userName: userName, password: currPassword }

            fetch("http://localhost:8000/api/blogs/v1/users/register", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(details)

            })
                .then((value) => value.json())
                .then((value) => {

                    console.log("Users register succesfuly!", value);
                    setOnbutton(false);
                    setSuccess(true);
                })
                .catch((error) => {
                    setOnbutton(false);
                    console.log("Some Errors occurs!!");
                    throw error;
                })

        }

    }, [onButton])

    const HandleonSubmit = (e) => {
        // e.perventDefaule();
        e.preventDefault();

        setOnbutton(true);
    }

    return (
        <>
            <div
                className='h-[80vh] w-full bg-slate-200 flex items-center'>
                <div
                    className='w-fit  mx-auto flex flex-col h-700 bg-slate-600 px-10 py-16 text-center rounded-xl'>

                    <h1
                        className='text-2xl text-white'
                    >Register your credentials</h1>
                    <form
                        className='w-fit flex flex-col h-700 bg-slate-600 px-16 py-3'
                        onSubmit={HandleonSubmit}
                    >
                        <input type="text"
                            className='text-black px-6 py-1 my-1 border-black rounded-xl border-2 outline-none'
                            placeholder='Full Name'
                            value={fullName}
                            onChange={((e) => setFullName(e.target.value))}
                        />
                        <input type="text"
                            className='text-black px-6 py-1 my-1 border-black rounded-xl border-2 outline-none'
                            placeholder='Username'
                            value={userName}
                            onChange={((e) => setUsername(e.target.value))}
                        />
                        <input type="email"
                            className='text-black px-6 py-1 my-1 border-black rounded-xl border-2 outline-none'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password"
                            className='text-black px-6 py-1 my-1 border-black rounded-xl border-2 outline-none'
                            placeholder='Enter Curr-Password'
                            autoComplete='false'
                            value={currPassword}
                            onChange={(e) => setCurrPassword(e.target.value)}
                        />
                        <button type="submit"
                            className='bg-blue-500 mt-5 rounded-2xl py-1  w-fit px-28 hover:bg-blue-600'
                        >
                            Register</button>
                    </form>
                    <NavLink to="/signin"
                        className='underline decoration-1 hover:text-blue-300 text-white 2'

                    >Log In?</NavLink>
                </div>
            </div>
        </>
    )
}

export default Signup