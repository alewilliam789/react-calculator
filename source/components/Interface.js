import React from "react";
import { useState } from "react";
import Button from "./Button";

export default function Interface(props){

    [nums, setNums] = useState([...Array(10).keys()]);
    [operators, setOperators] = useState(["+", "-","/","*","^"]);

    numberButtons = nums.map(num => {
        return <Button value={num}/>
    })

    operatorButtons =operators.map(operator =>{

        return operator === "=" ? <Button value={operator}/> : <Button value={operator} handleClick={handleClick} />
    })

    return (
        <div>
            numberButtons
            opertatorButtons
        </div>
    )
}