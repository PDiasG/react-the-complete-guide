import React, { useEffect, useRef, useContext } from 'react';

import classes from './Cockpit.css';

import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      // Http request...
      toggleBtnRef.current.click();
      return () => {
        console.log('[Cockpit.js] cleanup work in useEffect');
      };
    }, []);
  
    useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect');
      return () => {
        console.log('[Cockpit.js] cleanup work in 2nd useEffect');
      };
    });

    
    let assignedClasses = [];
    let btnClass = [classes.Button];

    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold);
    }
    
    if (props.showPersons) {
        btnClass.push(classes.Red);
    }

    return(
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is working</p>
            
            <button ref={toggleBtnRef} className={btnClass.join(' ')} onClick={props.clicked}>
                {props.showPersons ? 'Hide persons':'Show persons'}
            </button>

            <button onClick={authContext.login} className={classes.Button}>
                Log In
            </button>
        </div>
    );
};

export default React.memo(cockpit);