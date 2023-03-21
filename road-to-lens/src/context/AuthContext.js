import { createContext, useContext, useState } from "react";

const Context = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    return (
        <Context.Provider value={[token, setToken]}>
            {children}
        </Context.Provider>
    );
}

export function useAuthContext() {
    return useContext(Context);
}
