import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button"
import Screen from "./Screen";

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


    let operations = {
        "power" : function(a,b) {return Number(a)**Number(b)},
        "multiply" : function(a,b) {return Number(a)*Number(b)},
        "divide" : function(a,b) {return Number(a)/Number(b)},
        "add" : function(a,b) {return Number(a)+Number(b)},
        "subtract" : function(a,b) {return Number(a)-Number(b)}
     }

     function getValues(numArray,operator){
        let operatorIndex = numArray.indexOf(operator);
        return {
            firstVal: numArray[operatorIndex-1],
            secondVal: numArray[operatorIndex+1]
        }
     };

    function handleOperations(operationsArray,operator,operatorName=""){

        let operationsTracker = {
            "runner" : true,
            "answer" : "",
            "operationsArray" : operationsArray
        }
        let operatorIndex = operationsArray.indexOf(operator);
        let operation = getValues(operationsArray,operator)
        let answer = operations[`${operatorName}`](operation.firstVal,operation.secondVal)
        if(operationsArray.length == 3) {
            operationsTracker.runner = false
            operationsTracker["answer"] = answer;
        }
        // else if(operator == "("){
        //     operationsTracker["operationsArray"] = [...operationsArray.slice(0,operatorIndex-1),operationsTracker.answer,...operationsArray.slice(secondIndex+1,operationsArray.length)];
        // }
        else{
            operationsTracker["operationsArray"] = [...operationsArray.slice(0,operatorIndex-1),answer,...operationsArray.slice(operatorIndex+2,operationsArray.length)];
        }

        return operationsTracker;
    }

    function handlePEMDAS(numArray){
        let runner = true;
        while (runner){
            let operationsOutcome;
            switch(true){
                case (numArray.indexOf("^") != -1) : {
                    operationsOutcome = handleOperations(numArray,"^","power")
                    break
                }
                case (numArray.indexOf("*") != -1) : {
                    operationsOutcome = handleOperations(numArray,"*","multiply")
                    break
                }
                case (numArray.indexOf("/") != -1) : {
                    operationsOutcome = handleOperations(numArray,"/","divide")
                    break
                }
                case (numArray.indexOf("+") != -1) : {
                    operationsOutcome = handleOperations(numArray,"+","add")
                    break
                }
                case (numArray.indexOf("-") != -1) : {
                    operationsOutcome = handleOperations(numArray,"-","subtract")
                    break
                }
            }
            if(operationsOutcome.answer == ""){
                numArray = operationsOutcome.operationsArray;
            }
            else{
                runner = operationsOutcome.runner;
                return operationsOutcome.answer;
        }
    }
}

    function handleCalc(){
        setScreenText(prevScreenText => {
            let calcArray = prevScreenText.trim().split(" ");
            return String(handlePEMDAS(calcArray));
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

    const erasorButtons = erasors.map((button, index) => {
        return button =="CLR" ? <Button key={index} value={button} handleClick={handleClear}/> : <Button key={button} value={button} handleClick={handleBack}/>
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
                    {erasorButtons}
                    {numberButtons}
                </div>
                <div className="flex flex-col justify-center gap-5">
                <Button key={"."} value={"."} handleClick={handleClick}/>
                {operatorButtons}
                </div>
            </div>
        </div>
        </>
    )
}