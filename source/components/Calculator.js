import React from "react";
import { useState, useEffect } from "react";
import Button from "./Button"
import Screen from "./Screen";

export default function Calculator(props){

    // Function will add text to the screen
    function handleClick(event){

        // Takes button value from event
        let {value} = event.target;

        // Sets the screen text
        setScreenText(prevScreenText => {
            switch(true) {

                // If the last value was an operator, there will be no change. Can't string together operators
                case((prevScreenText.charAt(prevScreenText.length-1) == " " || prevScreenText.charAt(prevScreenText.length-1) == "") && operators.includes(value))
                 :{
                    return prevScreenText
                }
                // case (operators.includes(value) && 
                //       operators.includes(prevScreenText.charAt(prevScreenText.length-2)))
                //  : {
                //     return value === "(" || ")" ? (prevScreenText + " " + String(value) + " "): prevScreenText;
                // }
                // If the value is an operator add two spaces to split to array
                case (operators.includes(value)) :{
                    return prevScreenText + " " + String(value) + " ";
                }

                // If it's a number allow consecutive numbers in a row
                default : {
                    return prevScreenText +String(value);
                }
            }
        })
    }

    // Object to call all math functions
    let operations = {
        "power" : function(a,b) {return Number(a)**Number(b)},
        "multiply" : function(a,b) {return Number(a)*Number(b)},
        "divide" : function(a,b) {return Number(a)/Number(b)},
        "add" : function(a,b) {return Number(a)+Number(b)},
        "subtract" : function(a,b) {return Number(a)-Number(b)}
     }

     // Grabs the values at either side of the operator
     function getValues(numArray,operator){
        let operatorIndex = numArray.indexOf(operator);
        return {
            firstVal: numArray[operatorIndex-1],
            secondVal: numArray[operatorIndex+1]
        }
     };

    function handleOperations(operationsArray,operator,operatorName=""){

        // Creates an object to perform operations and pass back
        let operationsTracker = {

            // Turns off while loop
            "runner" : true,

            // Answer of the entire problem
            "answer" : "",

            // Takes in array to do operations on
            "operationsArray" : operationsArray
        }
        let operatorIndex = operationsArray.indexOf(operator);
        let secondIndex;

        // if(operator == "("){
        //     operationsArray.reverse()
        //     let secondIndex = operationsArray.indexOf(")") == 0 ? -1 : operationsArray.indexOf(")");
        //     operationsArray.reverse()
        //     console.log(operationsArray.slice(0,operatorIndex-1))
        //     console.log(operationsArray.slice(secondIndex+3,operationsArray.length))
        //     let subArray = operationsArray.slice(operatorIndex+1,secondIndex+1)
        //     console.log(subArray)
        //     operationsTracker.answer = handlePEMDAS(subArray)
        // }
            // Grabs the index of the operator

            // Obtains values from array
            let operation = getValues(operationsArray,operator)

            // Calculates the answer to the given problem with values
            operationsTracker.answer = operations[`${operatorName}`](operation.firstVal,operation.secondVal)

        // If this is the last operation
        if(operationsArray.length == 3) {
            
            // Turn the runner off
            operationsTracker.runner = false
        }
        // else if(operator == "("){
        //     operationsTracker["operationsArray"] = [...operationsArray.slice(0,operatorIndex-1),operationsTracker.answer,...operationsArray.slice(secondIndex+1,operationsArray.length)];
        // }
        else{

            // Otherwise keep adding the answer the array and keep doing operations
            operationsTracker["operationsArray"] = [...operationsArray.slice(0,operatorIndex-1),operationsTracker.answer,...operationsArray.slice(operatorIndex+2,operationsArray.length)];
        }

        return operationsTracker;
    }

    // Handles all PEMDAS operations (Parenthesis will be added)
    function handlePEMDAS(numArray){

        // Runner keeps while loop running
        let runner = true;
        while (runner){

            // Instantiates operationsOutcome so that we can make changes and have access to it later
            let operationsOutcome;

            // Checks for each operation in order of importance
            // Loop performs operation and then breaks for check
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
            // Checks to see if a final answer has been assigned
            if(operationsOutcome.answer == ""){

                // If not pass the loop the array and keep chugging
                numArray = operationsOutcome.operationsArray;
            }
            else{

                // Stop the loop from running 
                runner = operationsOutcome.runner;

                // Return the answer
                return operationsOutcome.answer;
        }
    }
}

    function handleCalc(){

        setScreenText(prevScreenText => {

            // Takes entire screen text array and splits on spaces and trims whitespace
            let calcArray = prevScreenText.trim().split(" ");

            // Returns the outcome of operations as the screen text
            return String(handlePEMDAS(calcArray));
        })
    }
            

    function handleBack(){
        setScreenText( prevScreenText => {

            // Grabs previous value to do check
            let previousValue = prevScreenText.slice(-1);

            let length = prevScreenText.length

            // If the previous is a space it means it was an operator and the string needs to take out all the spaces and operator
            // If not normal value and just a backspace
            return (previousValue === " " ? prevScreenText.slice(0,length-3) : prevScreenText.slice(0,length-1))
        })
    }

    // Completely clears the screen texts
    function handleClear(){
        setScreenText("")
    }

    // Number array to pass to buttons
    const nums = [...Array(10).keys()];

    // Erasor array to pass to buttons
    const erasors = ["BCK","CLR"];

    // Operator array to pass to buttons
    const operators = ["+", "-","/","*","^","="];

    // State hook to set the screen text
    const [screenText, setScreenText] = useState("");

    // Maps all numbers to buttons with the handleClick function
    const numberButtons = nums.map(num => {
       return <Button key={num} value={num} handleClick={handleClick}/>
    })

    // Maps all erasor functions to buttons
    const erasorButtons = erasors.map((button, index) => {
        return button =="CLR" ? <Button key={index} value={button} handleClick={handleClear}/> : <Button key={button} value={button} handleClick={handleBack}/>
    })

    // Maps all operators to 
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