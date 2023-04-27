import React from "react";
import { useState } from "react";
import Button from "./Button";

export default function Calculator(props){

    function handleClick(event){
        const {value} = event.target
        console.log(value)

        
    }

    function handleCalc(event){
        const {value} = event.target;
        console.log("Calculated the total")
    }

    const [nums, setNums] = useState([...Array(10).keys()]);
    const [operators, setOperators] = useState(["+", "-","/","*","^","="]);

    const numberButtons = nums.map(num => {
        return <Button key={num} value={num} handleClick={handleClick}/>
    })


    const operatorButtons = operators.map((operator, index) =>{
        return operator == "=" ? <Button key={index} value={operator} handleClick={handleCalc}/> : <Button key={index} value={operator} handleClick={handleClick}/>
    })


    return (
        <>
        <div className="flex">
        <div className=" w-36 grid grid-cols-3">
            {numberButtons}
        </div>
        <div className="flex flex-col">
            {operatorButtons}
        </div>
        </div>
        </>
    )
}