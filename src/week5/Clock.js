import React from "react";
import ReactDOM from "react-dom/client";

function Clock(props) {
    return (
        <div>
            <h1>안녕, 리액트!</h1>
            <h1>현재 시간: {new Date().toLocaleTimeString()}</h1>
        </div>
    )
}

export default Clock;