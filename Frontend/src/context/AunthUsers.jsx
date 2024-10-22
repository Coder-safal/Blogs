import { Children, createContext, useContext, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [authUser, setAuthUsers] = useState(null);

    return (
        <authContext.Provider value={{ authUser, setAuthUsers }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext);