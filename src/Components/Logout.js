import React from 'react';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';

function Logout() {
    let history = useHistory();
    const logOut = () => {
        localStorage.clear();
        history.push("/login");
    }
    useEffect(() => {
        logOut();

    }, [])
  return (
    <div className="">

    </div>
  );
}

export default Logout;
