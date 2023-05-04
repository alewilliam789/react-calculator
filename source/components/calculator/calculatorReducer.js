

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
            case (numArray.indexOf("x") != -1) : {
                operationsOutcome = handleOperations(numArray,"x","multiply")
                break
            }
            case (numArray.indexOf("÷") != -1) : {
                operationsOutcome = handleOperations(numArray,"÷","divide")
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
        let result = operators.map(operator => prevScreenText.includes(operator))
        if(result.includes(true) && calcArray.length >= 3){
        return String(handlePEMDAS(calcArray))
        }
        else{
            return prevScreenText;
        };
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



export default function calculatorReducer(screenText,action){

}