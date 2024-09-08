import React, { useEffect, useState } from 'react'
// import Body from './Body';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/users/users.jsx";

function Signup() {

    // const [details, setDetails] = useState({});
    const [userName, setUsername] = useState("");
    const [currpassword, setPassword] = useState("");
    // const [currPage, setCurrPage] = useState(true);
    const navigate = useNavigate();

    const { data, isLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {

        if (!isLoading && data && data.statuscode < 400) {
            navigate("/blogPage");
        }

    }, [data, isLoading, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userName, currpassword);

        const details = { userName, password: currpassword };

        dispatch(fetchUser(details))
    }

    console.log("users : ", data);
    console.log("users : ", data?.message);
    // console.log("message : ", message);
    console.log("statusCode : ", data?.statusCode);



    return (
        <>

            <div
                className='h-[80vh] w-full bg-slate-200 flex  items-center justify-center'
            >

                <div
                    className=' bg-slate-600 w-fit flex flex-col  rounded-2xl  py-6 px-16 justify-center text-center'
                >
                    {data?.success ? (<div className='ui message success w-fit px-4 py-1 text-white mx-auto bg-slate-700'>you are login succesfylly</div>) : ""}
                    {data?.statusCode >= 400 ? (<div className='ui message success w-fit px-4 py-1 text-white mx-auto bg-slate-700'>{data?.message}</div>) : ""}
                    <h1
                        className='text-white text-2xl py-6'
                    >Login Form</h1>
                    <form
                        className='w-fit flex flex-col  pt-3 pb-5 px-16 justify-center text-center'
                        onSubmit={handleSubmit}
                    >

                        <input type="text" name="userName" id="userName"
                            className='text-black border-2 border-black outline-none rounded-md px-2 py-1 my-2'
                            placeholder='Username or Email'
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input type="password" name="password" id="password"
                            className='text-black outline-none border-2 border-black rounded-md px-2 py-1 '
                            placeholder='Password'
                            value={currpassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit"
                            className='bg-blue-500 my-5 rounded-2xl py-1 w-fit px-28 hover:bg-blue-600'
                            disabled={isLoading}
                        >
                            {isLoading ? "Loading..." : "Login"}</button>
                    </form>
                    <div
                        className='text-white w-[100%] flex justify-around py-3'
                    >
                        <button className='underline decoration-1 hover:text-blue-300'

                        >Forget Password?</button>

                        <NavLink to="/signup"
                            className='underline decoration-1 hover:text-blue-300'
                        >register?</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup