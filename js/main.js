'use strict'

var TABLE_LENGTH = null
var gNums = []
var gPreBtn = null
var winParagraph = document.querySelector('.win')
var timer = null;
var min_txt = document.getElementById("min");
var min = parseInt(min_txt.innerHTML);
var sec_txt = document.getElementById("sec");
var sec = parseInt(sec_txt.innerHTML);
var msec_txt = document.getElementById("msec");
var msec = parseInt(msec_txt.innerHTML);

function buttonClick(btn) {
    debugger
    var elbtn = parseInt(btn.innerText)
    if (elbtn === TABLE_LENGTH) {
        winParagraph.style.display = 'block'
        stopWatch()
    }else if (elbtn === 1) {
        startWatch()
        gPreBtn = 0
    }
    if (gPreBtn === (elbtn - 1)) {
        gPreBtn = elbtn
        btn.style.background = '#8b0000'
    }

}

function radioClick(radio) {
    var difficultLevel = radio.value
    switch (difficultLevel) {
        case 'Easy':
            TABLE_LENGTH = 16
            break;
        case 'Medium':
            TABLE_LENGTH = 25
            break;
        case 'Hard':
            TABLE_LENGTH = 36
            break;
    }
    for (let i = 0; i < TABLE_LENGTH; i++) {
        gNums[i] = i + 1
    }
    gPreBtn = null
    winParagraph.style.display = 'none'
    createTable()
    resetWatch()
}

function createTable() {
    var elTable = document.querySelector('table')
    var length = gNums.length
    var tableStr = '<tr>'
    var randomNum = null
    var rowCounter = 0
    for (let i = 0; i < length; i++) {
        randomNum = gNums.splice(getRandomIntInclusive(0, gNums.length - 1), 1)[0]
        if (rowCounter === Math.sqrt(TABLE_LENGTH)) {
            tableStr += '</tr><tr>'
            rowCounter = 0
        }
        tableStr += `<td><button onclick="buttonClick(this)" style="background-color: red;">${randomNum}</button></td>`
        rowCounter++
    }
    tableStr = tableStr.slice(0, tableStr.length - 5)
    elTable.innerHTML = tableStr
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function stopTimeMilliseconds(timer) {
    if (timer) {
        clearInterval(timer);
        return timer;
    }
    else return timer;
}

function startTimeMilliseconds() {
    var currDate = new Date();
    return currDate.getTime();
}

function getElapsedTimeMilliseconds(startMilliseconds) {
    if (startMilliseconds > 0) {
        var currDate = new Date();
        var elapsedMilliseconds = (currDate.getTime() - startMilliseconds);
        return elapsedMilliseconds;
    }
    else {
        return elapsedMilliseconds = 0;
    }
}

function startWatch() {
    // START TIMER
    timer = stopTimeMilliseconds(timer);
    var startMilliseconds = startTimeMilliseconds();
    timer = setInterval(function () {
        var elapsedMilliseconds = getElapsedTimeMilliseconds(startMilliseconds);
        if (msec < 10) {
            msec_txt.innerHTML = "00" + msec;
        }
        else if (msec < 100) {
            msec_txt.innerHTML = "0" + msec;
        }
        else {
            msec_txt.innerHTML = msec;
        }
        if (sec < 10) {
            sec_txt.innerHTML = "0" + sec;
        }
        else {
            sec_txt.innerHTML = sec;
        }
        min_txt.innerHTML = min;
        msec = elapsedMilliseconds;
        if (min >= 59 && sec >= 59 && msec > 900) {
            timer = stopTimeMilliseconds(timer);
            return true;
        }
        if (sec > 59) {
            sec = 0;
            min++;
        }
        if (msec > 999) {
            msec = 0;
            sec++;
            startWatch();
        }
    }, 10);
}

function stopWatch() {
    // STOP TIMER
    timer = stopTimeMilliseconds(timer);
    return true;
}

function resetWatch() {
    // REZERO TIMER
    timer = stopTimeMilliseconds(timer);
    msec_txt.innerHTML = "000";
    msec = 0;
    sec_txt.innerHTML = "00";
    sec = 0;
    min_txt.innerHTML = "0";
    min = 0;
    return true;
}