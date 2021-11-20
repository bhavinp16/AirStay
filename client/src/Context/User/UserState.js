import React, { useState } from 'react'
import usercontext from './usercontext';


function UserState(props) {

    const [user, setuser] = useState(null);

    return (
        <usercontext.Provider value={{ user: user, setuser }} >
            {props.children}
        </usercontext.Provider>
    )
}

export default UserState;
