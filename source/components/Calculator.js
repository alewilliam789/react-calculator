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

    function handleOperations(event){

    }


    function power(a,b){
        return Number(a)**Number(b);
    }

    function multiply(a,b){
        return Number(a)*Number(b);
    }

    function divide(a,b){
        return Number(a)/Number(b);
    }

    function add(a,b){
        return Number(a)+Number(b)
    }
     function subtract(a,b){
        return Number(a)-Number(b)
     }

     function getValues(numArray,operator){
        let operatorIndex = numArray.indexOf(operator);
        console.log(operatorIndex)
        return {
            firstVal: numArray[operatorIndex-1],
            secondVal: numArray[operatorIndex+1]
        }
     }

    

    function handlePEMDAS(numArray){
        let runner = true;
        while (runner){
            switch(true){
                case (numArray.indexOf("^") != -1) : {
                    let operatorIndex = numArray.indexOf("^");
                    let operation = getValues(numArray,"^")
                    let answer = power(operation.firstVal,operation.secondVal)
                    if(numArray.length == 3) {
                        runner = false;
                        console.log(answer)
                        return answer
                    }
                    else{
                        numArray = [...numArray.slice(0,operatorIndex-1),answer,...numArray.slice(operatorIndex+2,numArray.length)];
                        console.log(numArray)
                        break
                    }
                }
                case (numArray.indexOf("*") != -1) : {
                    let operatorIndex = numArray.indexOf("*");
                    let operation = getValues(numArray,"*")
                    let answer = multiply(operation.firstVal,operation.secondVal)
                    if(numArray.length == 3) {
                        runner = false;
                        console.log(answer)
                        return answer
                    }
                    else{
                        numArray = [...numArray.slice(0,operatorIndex-1),answer,...numArray.slice(operatorIndex+2,numArray.length)];
                        console.log(numArray)
                        break
                    }
                }
                case (numArray.indexOf("/") != -1) : {
                    let operatorIndex = numArray.indexOf("/");
                    let operation = getValues(numArray,"/")
                    let answer = divide(operation.firstVal,operation.secondVal)
                    if(numArray.length == 3) {
                        runner = false;
                        console.log(answer)
                        return answer
                    }
                    else{
                        numArray = [...numArray.slice(0,operatorIndex-1),answer,...numArray.slice(operatorIndex+2,numArray.length)];
                        console.log(numArray)
                        break
                    }
                }
                case (numArray.indexOf("+") != -1) : {
                    let operatorIndex = numArray.indexOf("+");
                    console.log('We are adding')
                    let operation = getValues(numArray,"+")
                    let answer = add(operation.firstVal,operation.secondVal)
                    if(numArray.length == 3) {
                        runner = false;
                        console.log(answer)
                        return answer
                    }
                    else{
                        numArray = [...numArray.slice(0,operatorIndex-1),answer,...numArray.slice(operatorIndex+2,numArray.length)];
                        console.log(numArray)
                        break
                    }
                }
                case (numArray.indexOf("-") != -1) : {
                    let operatorIndex = numArray.indexOf("-");
                    console.log('We are subtracting');
                    let operation = getValues(numArray,"-")
                    let answer = subtract(operation.firstVal,operation.secondVal)
                    if(numArray.length == 3) {
                        runner = false;
                        console.log(answer)
                        return answer
                    }
                    else{
                        numArray = [...numArray.slice(0,operatorIndex-1),answer,...numArray.slice(operatorIndex+2,numArray.length)];
                        console.log(numArray)
                        break
                    }
                }
                
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
                    {erasorButtons}
                    {numberButtons}
                </div>
                <div className="flex flex-col justify-center gap-5">
                    {operatorButtons}
                </div>
            </div>
        </div>
        </>
    )
}