let myChart1 = document.querySelector('#myChart').getContext('2d') //we get the chart canvas that we created in html and we use 'getContext because we are creating 2 dimensional charts, nothing 3D. 
let labels1 = ['Monthly Interest', 'Monthly Principal', 'Monthly Property Tax', 'Monthly Home Insurance']
let colors1 = ['#e9d30b', 'rgb(126, 228, 126)', 'red', 'orange']
 
const homePriceInput = document.querySelector('#homePriceInput')
const homePrice = parseInt(homePriceInput.placeholder)
const downPaymentInput = document.querySelector('#downPaymentInput')
const downPayment = parseInt(downPaymentInput.placeholder)

const mortgageInterestRateInput = document.querySelector('#mortgageInterestRateInput')
const monthlyPaymentHolder = document.querySelector('#monthlyPaymentInput')
const monthlyPrincipalHolder = document.querySelector('#principalInput')
const monthlyInterestHolder = document.querySelector('#interestInput')
const monthlyPropertyTaxHolder = document.querySelector('#propertyTaxInput')
const monthlyHomeOwnerInsurance = document.querySelector('#homeInsuranceInput')
const loanTypeSelection = document.querySelector('#loanTypeSelection')

const monthlyDollarPropertyTaxHolder = document.querySelector('#homePropertyTaxInput')
const monthlyDollarHomeOwnerInsurance = document.querySelector('#homeOwnerInsuranceInput')

const monthlyPaymentLbl = document.querySelector('.monthlyPaymentLbl');

const calculate = document.querySelector('#calculate')
const form = document.querySelector('#form')
const calcContainer = document.querySelector('#calc-container')
const form2 = document.querySelector('.form2')
const table = document.querySelector('.tableInformation')

const clearTable = document.querySelector('#clearTbl')

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
        let annualPropertyTax = parseFloat(monthlyPropertyTaxHolder.value)
        let annualHomeOwnerInsurance = parseFloat(monthlyHomeOwnerInsurance.value)
        let loanType = 0;

        //for lines 24-36 depdent on the drop down the user selects is the amount of years that they will have the loan for. Ranges from 10, 15, 20, 30yrs
         if(loanTypeSelection.value === 'twentyYears'){ 
            loanType = 20;
        }else if(loanTypeSelection.value === 'thirtyYears'){
            loanType = 30;
        }else if(loanTypeSelection.value === 'tenYears'){
            loanType = 10;
        }else if(loanTypeSelection.value === 'fifteenYears'){
            loanType = 15;
        }

        let monthlyPropertyTax = Math.round(annualPropertyTax / 12)

        let monthlyHomeInsurance = Math.round(annualHomeOwnerInsurance / 12)

        let rate = mortgageInterestRate / MONTHS_IN_YEAR; //rate is represented by interest divided by months in year
        let principal = homePrice - homeDownPayment; //principal of loan is found by subtracting cost of home from downpayment
        let numOfPayment = MONTHS_IN_YEAR * loanType; //num of payments needed is founded by multiplying type of loan by months in year
        let monthlyPayment =  Math.round(principal * (rate * Math.pow((1 + rate), numOfPayment)) / (Math.pow((1 + rate), numOfPayment)-1)) //+ Math.round(annualPropertyTax / 12) //gets the monthly payment the person can expect to make per year. 
        let monthlyInterestPayed = (((loanType * MONTHS_IN_YEAR) * monthlyPayment) - (homePrice-homeDownPayment)) / (loanType * MONTHS_IN_YEAR) //Calculate the amount of interest the person is paying each monthly payment
        let monthlyPrincpialPayed = monthlyPayment - monthlyInterestPayed //Amount in princpial the person is paying
        
        let combiendMonthlyPayment =  monthlyPayment + monthlyPropertyTax + monthlyHomeInsurance
        monthlyInterestHolder.value = monthlyInterestPayed //set value of input field to monthly interest payment
        monthlyPrincipalHolder.value = monthlyPrincpialPayed //set value of princpial field to monthly princpial payment

        monthlyPaymentLbl.innerHTML = 'Monthly Payment: ' + dollars.format(combiendMonthlyPayment)

        monthlyDollarPropertyTaxHolder.value = monthlyPropertyTax; //set value of in
        monthlyDollarHomeOwnerInsurance.value= monthlyHomeInsurance;

        let monthlyInterestPercent = (monthlyInterestPayed / combiendMonthlyPayment) * 100; //Represents the percentage of your monthly payment that goes to interest //monthlyPayment
        let monthlyPrincipalPercent = (monthlyPrincpialPayed / combiendMonthlyPayment) * 100; //Represents the percentage of your monthly payment that goes to percent //monthlyPayment
        let monthlyPropertyTaxPercent = (monthlyPropertyTax / combiendMonthlyPayment) * 100
        let monthlyHomeInsurancePercent = (monthlyHomeInsurance / combiendMonthlyPayment) * 100;

        //Get new data from the input of the user and the output that we calculate for them
        let informatics = [homePrice, homeDownPayment, loanType, mortgageInterestRate, annualPropertyTax, annualHomeOwnerInsurance, monthlyInterestPayed, monthlyPrincpialPayed, monthlyPropertyTax, monthlyHomeInsurance, combiendMonthlyPayment]
        let new_data = informatics; //assign our array to a variable called new_data
    
        if(localStorage.getItem('information')==null){ //When first setting up a localStorage it has a value of null so we are able to initialize the localStorage with whatever we want in this case an empty array
            localStorage.setItem('information', '[]')
        }

         let old_data = JSON.parse(localStorage.getItem('information')) //Parse the old data already inside of the localStorage 
         old_data.push(new_data) //Push the new Data we colelcted from user and our computations and push it inside of the existing array from localStorage
         localStorage.setItem('information', JSON.stringify(old_data)) //Set localStorage back to old_data containing the new information        

        let data1 = [monthlyInterestPercent, monthlyPrincipalPercent, monthlyPropertyTaxPercent, monthlyHomeInsurancePercent] //Holds the data set we are using for the chart
        let chart1 = new Chart(myChart1, { //we are creating a new chart which is a doughnut chart
            type: 'doughnut', 
            data: {
                labels: labels1, //labels is the labels1 array
                datasets: [{
                    data: data1, //data is the data1 array
                    backgroundColor: colors1,
                    borderColor: 'none'
                }]
            },
            options: {
                title:{
                    text: 'Monthly Payment', //Display tthe title
                    display: true
                },
                layout:{
                    padding:{
                        right: 0, left: 0, bottom: 0, top: 0,
                    }
                },
                responsive: true, //responsive graph
                plugins:{
                    legend:{
                        font:{
                            size: 6 //make font of legend smaller
                        },
                        labels:{ 
                            font:{
                                size: 6 //make font of labels smaller
                            }
                        }
                    }
                }
            }
        })
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
         monthlyPropertyTaxHolder.value = dollars.format(monthlyPropertyTaxHolder.value)
        monthlyHomeOwnerInsurance.value  = dollars.format(monthlyHomeOwnerInsurance.value)
        monthlyDollarPropertyTaxHolder.value = dollars.format(monthlyDollarPropertyTaxHolder.value)
        monthlyDollarHomeOwnerInsurance.value =dollars.format(monthlyDollarHomeOwnerInsurance.value)
    })
}
formatUserInfo();
 
 

const bttn = document.querySelector('#btn')
function hideMainPage(){ //When I click the btn on the first page I want to bury this page behind the second page so it is not visible whatso ever
    bttn.addEventListener('click', () => {
        form.style.opacity = 0;
        form.style.zIndex = -100
        calcContainer.style.opacity = 0;
        calcContainer.style.zIndex = -100;
        console.log('hihhh')
        form2.style.opacity = 1;
    })
}
hideMainPage();

 
const bttn2 = document.querySelector('#btn2') //When I click the btn on the second page I want to hide the second page behind the first page so it is not visible whatsoever
function hideSecondPage(){
    bttn2.addEventListener('click', () => {
        form2.style.opacity = 0;
        calcContainer.style.opacity = 1;
        form.style.opacity = 1;
        form.style.zIndex = 100;
        calcContainer.style.zIndex = 100;
    })
}
hideSecondPage();
let arrayCounter =0;
let stack = JSON.parse(localStorage.getItem('information')) //Pass all parsed infrom into stack which is a nested array
for(let i = 0; i < stack.length; i++){ //loop through stack to see all information currently inside of the localStorage
    for(let j = 0; j < stack[i].length; j++){
        console.log(stack[i][j])
        if(j % 9 === 0 && j !==0){
                 ++arrayCounter;
                console.log('this is the row', arrayCounter)
        }
    }
}

 function generate_table(){
     //create table and tbody elements
      let tblBody = document.createElement('tbody')

     //create the cells
     for(let i = 0; i < stack.length; i++){
         //create table row
         console.log('this is i', i)
         let row = document.createElement('tr')
         for(let j = 0; j < 12; j++){
             //create td element and text node make text node contets of td and put td at the end of table row
             let cell = document.createElement('td')
            //  let cellText = the localStorage item, localStorage was set to stack which is a nested array that can be traversed using numbers here.
            if(j === 11){ // j represents how long each row is, when j is 10 we want to set cellText to i + 1 and append that to the cell of 10. Else for all of the other cells we would like to just append the information from stack[i][j] which contains all of the information inside of localStorage
                console.log('j is 10')
                let cellText = document.createTextNode(i + 1)
                cell.append(cellText)
            }else if(j === 0 || j === 1 || j === 4 || j === 5 || j === 6 || j === 7 || j===8 || j === 9 || j === 10) { //The information inside of these cells are numbers and we want to format them as such with dollar signs and decimal places
                let cellText = document.createTextNode(dollars.format(stack[i][j]))
                cell.appendChild(cellText)
            }else{
                let cellText = document.createTextNode(stack[i][j])
                cell.appendChild(cellText)
            }
             row.appendChild(cell)

         }
         //add the row to the end of table body
         tblBody.appendChild(row)
     }
     //put tbody inside of the table
     table.appendChild(tblBody)
     //append table into form2
     form2.appendChild(table)
     //set the border attrbiute of table to 2
     table.setAttribute('border', '2')
 }
//  generate_table()
generate_table();

function clearStrg(){ //Clear the storage on click
    clearTable.addEventListener('click', () => {
        localStorage.clear();
        console.log('cleared')
    })
}
clearStrg();