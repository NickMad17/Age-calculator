"use strict";
const {log} = console;

const addData = () => {
    const date = new Date(2011,2,5);
    return `год: ${date.getFullYear()}, Месяц ${date.getMonth() + 1}`
} 


// log(addData())

// add DOM elements
const counters = document.querySelectorAll('.counters__text span');
log(counters)
const inputContainers = document.querySelectorAll('.form__input-wrapper');
const inputElements = document.querySelectorAll('.form__input');

const inputDay = document.getElementById('input-day');
const inputMonth = document.getElementById('input-month');
const inputYear = document.getElementById('input-year');

// labels

const labels = document.querySelectorAll('.form__label');

// btn
const btn = document.querySelector('.button img');
// countersLogic


const logCounters = (description, year, month, day) => {

    if(description){
        const date = new Date();
        let myYear = date.getFullYear() - year;
        let myMonth = (date.getMonth() + 1) - month;
        let myDay = date.getDate() - day;
        
        if (myDay < 0){
            myDay = +(day) + myDay;
            myMonth -= 1;
        }

        if(myMonth < 0 ){
            myMonth = 12 + myMonth;
            myYear -= 1;
        } 

        if(myDay < 0|| myMonth < 0 || myYear < 0){
            return true;
        }

        counters[0].innerHTML = String(myYear) + ' ';
        counters[1].innerHTML = String(myMonth) + ' ';
        counters[2].innerHTML = String(myDay) + ' ';
    } else {    
        counters.forEach(counter => {
            counter.innerHTML = '--'
        })
        
    }
}

// Validation
const clianingAfterComplete = () => {
    inputElements.forEach((element, index) => {
        element.classList.remove('input-complete');
        labels[index].classList.remove('label-complete');
        btn.classList.remove('complete');
    })
}

const clianing = () =>{
inputElements.forEach((element, index) => {
    element.addEventListener('input', () => {
        btn.classList.remove('err-btn');
        element.classList.remove('err-input');
        labels[index].classList.remove('err-label');
        element.classList.remove('input-hover');
        element.classList.remove('input-focus');
        clianingAfterComplete(false);
        logCounters()
    })
})
}
clianing()

const inputFocus = () =>{
    inputElements.forEach((element, index) => {
        element.addEventListener('focus', () => {
            labels[index].classList.add('label-focus');
        })
        element.addEventListener('blur', () => {
            labels[index].classList.remove('label-focus');
        })
    })
}
inputFocus()

btn.addEventListener('click', () =>{
    const classManipulation = (inputElement,inputNumber) => {
        inputElement.classList.add('err-input');
        inputElement.classList.add('input-focus');
        inputElement.classList.add('input-hover');
        btn.classList.add('err-btn');
        labels[inputNumber - 1].classList.add('err-label');
        clianingAfterComplete();
    }
    const conditionDay = (value) =>{
        const testOutDay = value > 31 
        return testOutDay
    }

    const conditionMonth = (value) =>{
        const testOutMonth = (value >= 13 || value < 0)
        return testOutMonth
    }

    const conditionYear = (value) => {
        let myYear = (new Date()).getFullYear();
        const testOutYear = value > myYear || value < 500;
        return testOutYear
    }
    
    const testFebruary = () => {
        const test = inputMonth.value == 2 && inputDay.value >= 29;
        return test;
        
    }

    const test =  (value,condition) => {
        const test =  condition(value) || isNaN(value) || value  === undefined || value === "" ;
        return test
    }

    const testMoreNewDate = (myDay, myMonth, myYear) => {
        const NewDate = new Date();
        const testYear = +(NewDate.getFullYear()) === +(myYear);
        const testMonth = (+(NewDate.getMonth()) + 1) < +(myMonth) || (+(NewDate.getMonth()) + 1) === +(myMonth);
        const testDay = +(NewDate.getDate()) < myDay;
        return testYear && testMonth && testDay;
    }
    
    const isDate = (myDay, myMonth, myYear) => {
        const myDate = new Date(myYear, (myMonth-1), myDay);
        return myDate.getFullYear() == myYear && (+(myDate.getMonth()) + 1) !== +myMonth
    } 

    if(testFebruary()){
        classManipulation(inputDay, 1);
    }

    if(test(inputDay.value,conditionDay) && test(inputMonth.value,conditionMonth) && test(inputYear.value,conditionYear)){
        classManipulation(inputDay, 1);
        classManipulation(inputMonth, 2);
        classManipulation(inputYear, 3);
        return;
    }

    if(test(inputDay.value,conditionDay) === true && test(inputMonth.value,conditionMonth) === false && test(inputYear.value,conditionYear) === false){
        classManipulation(inputDay, 1);
        return;
    } 

    if(test(inputDay.value,conditionDay) === false && test(inputMonth.value,conditionMonth) === true && test(inputYear.value,conditionYear) === false){
        classManipulation(inputMonth, 2);
        return;
    } 

    if(test(inputDay.value,conditionDay) === false && test(inputMonth.value,conditionMonth) === false && test(inputYear.value,conditionYear) === true){
        classManipulation(inputYear, 3);
        return;
    } 

    if(test(inputDay.value,conditionDay) === true && test(inputMonth.value,conditionMonth) === true && test(inputYear.value,conditionYear) === false){
        classManipulation(inputDay, 1);
        classManipulation(inputMonth, 2);
        return;
    } 

    if(test(inputDay.value,conditionDay) === false && test(inputMonth.value,conditionMonth) === true && test(inputYear.value,conditionYear) === true){
        classManipulation(inputMonth, 2);
        classManipulation(inputYear, 3);
        return;
    } 

    if(test(inputDay.value,conditionDay) === true && test(inputMonth.value,conditionMonth) === false && test(inputYear.value,conditionYear) === true){
        classManipulation(inputDay, 1);
        classManipulation(inputYear, 3);
        return;
    }

    if(testFebruary()){
        classManipulation(inputDay, 1);
        return;
    }

    if(isDate(inputDay.value, inputMonth.value, inputYear.value)){
        classManipulation(inputDay, 1);
        classManipulation(inputMonth, 2);
        classManipulation(inputYear, 3);
        return;
    }

    if(testMoreNewDate(inputDay.value, inputMonth.value, inputYear.value)){
        classManipulation(inputDay, 1);
        classManipulation(inputMonth, 2);
        classManipulation(inputYear, 3);
        return;
    }

    // Проверки оконченны
    const inputMyDay = inputDay.value;
    const inputMyMonth = inputMonth.value;
    const inputMyYear = inputYear.value;
    logCounters(true, inputMyYear, inputMyMonth, inputMyDay);

    if(logCounters(true, inputMyYear, inputMyMonth, inputMyDay)){
        classManipulation(inputDay, 1);
        classManipulation(inputMonth, 2);
        classManipulation(inputYear, 3);
        return;
    }
    btn.classList.add('complete');
    inputElements.forEach((element, index) => {
        element.classList.add('input-complete');
        labels[index].classList.add('label-complete');
        element.value = "";
        
    })
    
})