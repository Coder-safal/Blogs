import React, { useEffect, useState } from 'react'
import Body from './Body'
import { fetchTodos } from '../features/todos/todoSlice.jsx';

import Card from './cards/Card.jsx';
import { useDispatch, useSelector } from 'react-redux';

// show all blogs in this pages

function MainPage() {



    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todo);
    // console.log("todos");

    console.log("todos is: ", todos);
    useEffect(() => {
        dispatch(fetchTodos());

    }, [])

    if (todos && todos.data)
        return (
            <>
                <div className='mx-auto'>
                    {
                        todos.data.map((value) => (
                            <Card value={value} key={value.id} />
                        ))
                    }
                </div>
            </>
        )
    if (todos.isLoading)
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
}

export default MainPage