const homePriceInput = document.querySelector('#homePriceInput')
const homePrice = parseInt(homePriceInput.placeholder)
const downPaymentInput = document.querySelector('#downPaymentInput')
const downPayment = parseInt(downPaymentInput.placeholder)

const percentInterestDiv = document.querySelector('#percentInterest')
const percentPrincipalDiv = document.querySelector('#percentPrincipal')


const mortgageInterestRateInput = document.querySelector('#mortgageInterestRateInput')
const monthlyPaymentHolder = document.querySelector('#monthlyPaymentInput')
const monthlyPrincipalHolder = document.querySelector('#principalInput')
const monthlyInterestHolder = document.querySelector('#interestInput')
const loanTypeSelection = document.querySelector('#loanTypeSelection')

const calculate = document.querySelector('#calculate')
const form = document.querySelector('#form')

const percentInterestBox = document.querySelector('#percentBox')
const MONTHS_IN_YEAR = 12;
let dollars = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
 
 
function calculating(){
    form.addEventListener('click', (e) => { //When clicking the form we want to prevent the default acction from happening, the default action when clicking a form will reset what you are trying to acheive
        e.preventDefault();
    })
}
calculating();

function calc(){
    calculate.addEventListener('click', () => {
        let homePrice = parseInt(homePriceInput.value)
        let homeDownPayment = parseInt(downPaymentInput.value)
        let mortgageInterestRate = parseFloat(mortgageInterestRateInput.value) /  100 //interest rates are represented in decimal forms so we divide by 100
        let loanType = 0;
        //for lines 24-36 depdent on the drop down the user selects is the amount of years that they will have the loan for. Ranges from 10, 15, 20, 30yrs
         if(loanTypeSelection.value === 'twentyYears'){ 
             console.log('20 yr')
            loanType = 20;
        }else if(loanTypeSelection.value === 'thirtyYears'){
            console.log('30 yr')
            loanType = 30;
        }else if(loanTypeSelection.value === 'tenYears'){
            console.log('ten year')
            loanType = 10;
        }else if(loanTypeSelection.value === 'fifteenYears'){
            console.log('fifteen year')
            loanType = 15;
        }
        let rate = mortgageInterestRate / MONTHS_IN_YEAR; //rate is represented by interest divided by months in year
        let principal = homePrice - homeDownPayment; //principal of loan is found by subtracting cost of home from downpayment
        let numOfPayment = MONTHS_IN_YEAR * loanType; //num of payments needed is founded by multiplying type of loan by months in year
        let monthlyPayment =  Math.round(principal * (rate * Math.pow((1 + rate), numOfPayment)) / (Math.pow((1 + rate), numOfPayment)-1)) //gets the monthly payment the person can expect to make per year. 
        monthlyPaymentHolder.placeholder = dollars.format(monthlyPayment)
        let monthlyInterestPayed = (((loanType * MONTHS_IN_YEAR) * monthlyPayment) - (homePrice-homeDownPayment)) / (loanType * MONTHS_IN_YEAR) //Calculate the amount of interest the person is paying each monthly payment
        let monthlyPrincpialPayed = monthlyPayment - monthlyInterestPayed //Amount in princpial the person is paying
        monthlyInterestHolder.value = monthlyInterestPayed //set value of input field to monthly interest payment
        monthlyPrincipalHolder.value = monthlyPrincpialPayed //set value of princpial field to monthly princpial payment

        monthlyInterestPercent = (monthlyInterestPayed / monthlyPayment) * 100; //Represents the percentage of your monthly payment that goes to interest
        monthlyPrincipalPercent = (monthlyPrincpialPayed / monthlyPayment) * 100; //Represents the percentage of your monthly payment that goes to percent
        percentInterestDiv.style.width = monthlyInterestPercent + '%' //width of percentInterestDiv
        percentInterestDiv.style.backgroundColor = 'red'
        percentInterestDiv.style.zIndex = 100;
        percentPrincipalDiv.style.width = monthlyPrincipalPercent + + monthlyInterestPercent +  '%' //Make the width of principal 100% so we can see it
        percentPrincipalDiv.style.backgroundColor = 'green'

        percentInterestBox.innerHTML = `Interest Owed: $${monthlyInterestPayed}`
     })
}
calc();
//interest paid on loan overall, principal loan amount * interet rate * number of years in term


//Get the user info when the button is clicked, format value to dollars.format and assign it to the current value 
function formatUserInfo(){
    calculate.addEventListener('click', () => {
        homePriceInput.value = dollars.format(homePriceInput.value)
        downPaymentInput.value = dollars.format(downPaymentInput.value)
        monthlyInterestHolder.value = dollars.format(monthlyInterestHolder.value)
        monthlyPrincipalHolder.value = dollars.format(monthlyPrincipalHolder.value)
    })
}
formatUserInfo();
 