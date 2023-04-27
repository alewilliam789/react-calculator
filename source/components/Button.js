import React from "react";
import { useState } from "react";

export default function Button(props){
    return (
        <>
        <button className="w-20 border rounded text-xl bg-gray-300 hover:bg-gray-400"
        onClick={props.handleClick} value={props.value}>{props.value}</button>
        </>
    )
}