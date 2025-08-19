// src/contexts/UserContext.jsx

import { createContext, useState } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
    const token = localStorage.getItem('token');

    if (!token) return null;

    return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
    // call getUserFromToken() to get our initial user state
    const [user, setUser] = useState(getUserFromToken());

    const value = { user, setUser };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

// When components need to use the value of the user context, they will need
// access to the UserContext object to know which context to access.
// Therefore, we export it here.
export { UserProvider, UserContext };



