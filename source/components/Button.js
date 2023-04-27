import React from "react";
import { useState } from "react";

export default function Button(props){
    return (
        <>
        <button onClick={props.handleClick} value={props.value}>{props.value}</button>
        </>
    )
}