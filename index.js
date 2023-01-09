var roll = 0;
const values = [];
var bool = false;
var otherRoll = true;
var diceRoll = 0;
var doubleTimes = 0;
var tripleTimes = 0;
function getRandomInteger(lower, upper){
    //R = parseInt(rnd * (upper - (lower - 1))) + lower
    var multiplier = upper - (lower - 1);
    var rnd = parseInt(Math.random() * multiplier) + lower;
    return rnd;
    }
function initialize(){
    table=document.getElementById("diceTable");
    rollVal=document.getElementById("roll");
    resultVal=document.getElementById("result");
    meanVal=document.getElementById("mean");
    medianVal=document.getElementById("median");
    modeVal=document.getElementById("mode");
    doubles=document.getElementById("doubles");
    triples=document.getElementById("triples");
}
function oneDice(){
    if(otherRoll){
    for(var i = 1; i <= 6; i++){
        var newRow = table.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = i;
        newCell = newRow.insertCell();
        newCell.innerHTML = 0;
    }
    bool = true;
    diceRoll = 1;
    otherRoll = false;
}
}
function twoDice(){
    if(otherRoll){
    for(var i = 2; i <=12; i++){
        var newRow = table.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = i;
        newCell = newRow.insertCell();
        newCell.innerHTML = 0;
    }
    bool = true;
    diceRoll = 2;
    otherRoll=false;
}
}
function threeDice(){
    if(otherRoll){
    for(var i = 3; i <=18; i++){
        var newRow = table.insertRow();
        var newCell = newRow.insertCell();
        newCell.innerHTML = i;
        newCell = newRow.insertCell();
        newCell.innerHTML = 0;
    }
    bool = true;
    diceRoll = 3;
    otherRoll=false;
}
}
function rollDice(){
    if(bool){
    var dieRoll1 = getRandomInteger(1,6);
    var dieRoll2 = getRandomInteger(1,6);
    var dieRoll3 = getRandomInteger(1,6);
    var total = dieRoll1;
    if(diceRoll == 2){
        if(dieRoll1 == dieRoll2){
            doubleTimes++;
            doubles.innerHTML = "Doubles: " + doubleTimes;
        }
        total += dieRoll2;    
    }
    if(diceRoll == 3){
        if(dieRoll1 == dieRoll2 == dieRoll3){
            tripleTimes++;
            triples.innerHTML = "Triples: " + tripleTimes;
        }
        else if(dieRoll1 == dieRoll2 || dieRoll2 == dieRoll3 || dieRoll3 == dieRoll1){
            doubleTimes++;
            doubles.innerHTML = "Doubles: " + doubleTimes;
        }
        total += dieRoll2 + dieRoll3;
    }
    roll++;
    rollVal.innerHTML = "Roll: " + roll;
    resultVal.innerHTML = "Result: " + total;
    mValues(total);
    frequency(total);
    }
}
function frequency(rVal){
    var row = rVal - diceRoll + 1;
    var frequent = parseInt(table.rows[row].cells[1].innerHTML);
    table.rows[row].cells[1].innerHTML= frequent + 1;
}
function mValues(rVal){
    values[values.length] = rVal;
    values.sort(function(a, b){return a - b});
    var total = 0;
    for(let i =0; i < values.length; i++){
        total += values[i];
    }
    meanVal.innerHTML = "Mean: " + Math.round((total/values.length) * 10) / 10;
    var total1 = 0;
    if(values.length % 2 == 0){ //even
        total1 += values[values.length/2] + values[(values.length/2) - 1];
        total1 = total1/2;
    }
    else{
        total1 += values[(values.length/2) - 0.5];
    }
    medianVal.innerHTML = "Median: " + total1;
    var mode = a => {
        a = a.slice().sort((x, y) => x - y);
      
        var bestStreak = 1;
        var bestElem = a[0];
        var currentStreak = 1;
        var currentElem = a[0];
      
        for (let i = 1; i < a.length; i++) {
          if (a[i-1] !== a[i]) {
            if (currentStreak > bestStreak) {
              bestStreak = currentStreak;
              bestElem = currentElem;
            }
      
            currentStreak = 0;
            currentElem = a[i];
          }
      
          currentStreak++;
        }
      
        return currentStreak > bestStreak ? currentElem : bestElem;
      };
      
      modeVal.innerHTML = "Mode: " + mode(values);
}
