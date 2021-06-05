const homePriceInput = document.querySelector('#homePriceInput')
const downPaymentInput = document.querySelector('#downPaymentInput')
const mortgageInterestRateInput = document.querySelector('#mortgageInterestRateInput')
const loanTypeSelection = document.querySelector('#loanTypeSelection')
const calculate = document.querySelector('#calculate')
const form = document.querySelector('#form')
const MONTHS_IN_YEAR = 12;


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
     })
}
calc();
 

 