import CompB from './CompB';
import { useState, createContext } from 'react';
export const UserContext = createContext();
function CompA() {
    const [user, setUser] = useState("BroCode");
    return (
        <div className="box">
            <h1>Component A</h1>
            <p>Welcome, {user}!</p>
            <UserContext.Provider value={user}>
                <CompB/>
            </UserContext.Provider>
        </div>
    );
}
export default CompA;
