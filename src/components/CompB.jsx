import CompC from './CompC';
import React, {useContext} from 'react';
import { UserContext } from './CompA';
function CompB() {
    const user = useContext(UserContext);
    return (
        <div className="box">
            <h1>Component B</h1>
            <p>{`Hello again, ${user}!`}</p>
            <CompC/>
        </div>
    );
}
export default CompB;
