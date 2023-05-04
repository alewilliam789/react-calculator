import React from "react";
import { useReducer, useState } from "react";
import Button from "../Button"
import Screen from "../Screen";
import calculatorReducer from "./calculatorReducer";

export default function Calculator(props){

    const [screenText, dispatch] = useReducer(calculatorReducer, "");

    function handleClick(event){
            let {value} = event.target;
            dispatch({
                type: 'output',
                character: value,
            })
        }


    function handleCalc(){
        dispatch({
            type: "calc",   
        })
    }
            

    function handleBack(){
        dispatch({
            type:"backspace"
        })
    }

    function handleClear(){
        dispatch({
            type:"clear"
        })
    }

    const nums = [...Array(10).keys()];
    const erasors = ["BCK","CLR"];
    const operators = ["+","-","x","÷","^","="];

    const numberButtons = nums.map(num => {
       return <Button key={num} value={num} handleClick={handleClick}/>
    })

    const erasorButtons = erasors.map((button, index) => {
        return button =="CLR" ? <Button key={index} value={button} handleClick={handleClear}/> : <Button key={button} value={button} handleClick={handleBack}/>
    })

    const operatorButtons = operators.map((operator, index) =>{
        return operator == "=" ? <Button key={index} value={operator} handleClick={handleCalc}/> : <Button key={index} value={operator} handleClick={handleClick}/>
    })


    return (
        <>
        <div className="flex flex-col items-center">
            <div className="mt-20 pt-20 px-8 pb-10 flex flex-col bg-gray-500 rounded-t-lg rounded-b-3xl justify-center">
                <div className="w-[400px] h-[100px] bg-yellow-100">
                    <Screen text={screenText}/>
                </div>
                <div className="mt-20 gap-10 flex">
                    <div className="grid grid-cols-3 gap-5">
                        {erasorButtons}
                        {numberButtons}
                    </div>
                    <div className="flex flex-col justify-center gap-5">
                    <Button key={"."} value={"."} handleClick={handleClick}/>
                    {operatorButtons}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}