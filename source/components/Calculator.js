import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button";
import Screen from "./Screen";

export default function Calculator(props){

    function handleClick(event){
        let {value} = event.target;
        setScreenText(prevscreenText => operators.includes(value) ? (prevscreenText + " "+ String(value)) : prevscreenText + String(value))
    }

    function handleCalc(event){
        const {value} = event.target;
        console.log("Calculated the total")
    }

    function handleBack(){
        setScreenText( prevScreenText => {
            let previousValue = prevScreenText.slice(-1);
            let length = prevScreenText.length
            return (operators.includes(previousValue) ? prevScreenText.slice(0,length-2) : prevScreenText.slice(0,length-1))
        })
    }

    function handleClear(){
        setScreenText("")
    }

    const nums = [...Array(10).keys()];
    const erasors = ["BCK","CLR"];
    const operators = ["+", "-","/","*","^","="];
    const [screenText, setScreenText] = useState("")

    const numberButtons = nums.map(num => {
       return <Button key={num} value={num} handleClick={handleClick}/>
    })

    const erasorButtons = erasors.map(num => {
        return num =="CLR" ? <Button key={num} value={num} handleClick={handleClear}/> : <Button key={num} value={num} handleClick={handleBack}/>
    })

    const operatorButtons = operators.map((operator, index) =>{
        return operator == "=" ? <Button key={index} value={operator} handleClick={handleCalc}/> : <Button key={index} value={operator} handleClick={handleClick}/>
    })


    return (
        <>
        <div className="flex flex-col items-center">
            <div className="mt-20">
                <Screen text={screenText}/>
            </div>
            <div className="mt-20 gap-10 flex">
                <div className="w-70 grid grid-cols-3 gap-5">
                    {numberButtons}
                    {erasorButtons}
                </div>
                <div className="flex flex-col justify-center gap-5">
                    {operatorButtons}
                </div>
            </div>
        </div>
        </>
    )
}