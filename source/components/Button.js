import React from "react";
import { useState } from "react";

export default function Button(props){
    return (
        <>
        <input type="button" onClick={props.send}>{props.value}</input>
        </>
    )
}