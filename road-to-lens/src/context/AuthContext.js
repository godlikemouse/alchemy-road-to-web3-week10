import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    return (
        <AuthContext.Provider value={[token, setToken]}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}

const ActiveProfileContext = createContext();
export function ActiveProfileProvider({ children }) {
    const [activeProfile, setActiveProfile] = useState(null);
    return (
        <ActiveProfileContext.Provider
            value={[activeProfile, setActiveProfile]}
        >
            {children}
        </ActiveProfileContext.Provider>
    );
}

export function useActiveProfileContext() {
    return useContext(ActiveProfileContext);
}
