import React from "react";
import { useState } from "react";
import Button from "./Button";

export default function Interface(props){

    function handleClick(event){
        const {name, value} = event.target
        console.log(value);
    }

    const [nums, setNums] = useState([...Array(10).keys()]);
    const [operators, setOperators] = useState(["+", "-","/","*","^"]);

    const numberButtons = nums.map(num => {
        return <Button key={num} value={num} handleClick={handleClick}/>
    })


    const operatorButtons = operators.map(operator =>{
        return operator === "=" ? <button>{operator}</button> : <Button value={operator} handleClick={handleClick}/>
    })


    return (
        <div>
            {numberButtons}
            {operatorButtons}
        </div>
    )
}