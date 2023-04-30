import React from "react";
import { useState, useEffect } from "react";
import Button from "../Button"
import Screen from "../Screen";

export default function Calculator(props){

    function handleClick(event){
        let {value} = event.target;
        setScreenText(prevScreenText => {
            switch(true) {
                case (operators.includes(value) && 
                      operators.includes(prevScreenText.charAt(prevScreenText.length-2)))
                 : {
                    return prevScreenText;
                }
                case (operators.includes(value)) :{
                    return prevScreenText + " " + String(value) + " ";
                }
                default : {
                    return prevScreenText +String(value);
                }
            }
        })
    }
        

    

    function handlePEMDAS(numArray){
        let operationsArray = [];
            switch(true){
                case (numArray.indexOf("(") != -1) : {
                    let subArray1 = handleParenthesis(numArray);
                    console.log(subArray1)    
                }
                default : {
                    console.log('Calculated the total!')
                } 
            }
        }

    function handleCalc(){
        setScreenText(prevScreenText => {
            let calcArray = prevScreenText.trim().split(" ");
            console.log(calcArray);
            // handlePEMDAS(calcArray);
        })
    }
            

    function handleBack(){
        setScreenText( prevScreenText => {
            let previousValue = prevScreenText.slice(-1);
            let length = prevScreenText.length
            return (previousValue === " " ? prevScreenText.slice(0,length-3) : prevScreenText.slice(0,length-1))
        })
    }

    function handleClear(){
        setScreenText("")
    }

    const nums = [...Array(10).keys()];
    const erasors = ["BCK","CLR"];
    const operators = ["+", "-","/","*","^","="];
    const [screenText, setScreenText] = useState("");

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