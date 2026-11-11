import CompD from './CompD';
import React, {useContext} from 'react';
import { UserContext } from './CompA';
function CompC() {
    const user = useContext(UserContext);
    return (
        <div className="box">
            <h1>Component C</h1>
            <p>{`Hello, ${user}!`}</p>
            <CompD/>
        </div>
    );
}
export default CompC;
