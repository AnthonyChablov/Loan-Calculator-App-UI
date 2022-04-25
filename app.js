// select elements
let form = document.querySelector('#loan-form');
document.getElementById('img-loading').style.display = 'none';

form.addEventListener('submit', (e)=>{
    // We want the results to be defaultly hidden
    document.getElementById('results').style.display = 'none';
    
    // As soon as the form is submitted we want to show the loading gif img
    document.getElementById('img-loading').style.display = 'block';
    setTimeout(calcResults, 1500);
    // Then we show the results ---

    e.preventDefault();
})

// add event listener
function calcResults(){
    console.log('Calculating');
    // Ui variables that we need
    // Form fields
    let loanAmount = document.getElementById('amount');
    let interest = document.getElementById('interest');
    let yearsToRepay = document.getElementById('years');

    // Result fields
    let results = document.getElementById('results');
    let monthlyPayment = document.getElementById('monthly-payment');
    let totalPayment = document.getElementById('total-payment');
    let totalInterest = document.getElementById('total-interest');

    // Calculation tax
    const principal = parseFloat(loanAmount.value);
    const interestCalc = (parseFloat(interest.value)/100)/12;
    const paymentCalc = parseFloat(yearsToRepay.value) * 12;

    // Calculate the result payments
    const x = Math.pow(1 + interestCalc, paymentCalc);
    const monthly = (principal * x * interestCalc)/(x-1); 

    // Validation of entered variables to ensure they are finite numbs
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2); 
        totalPayment.value = ((monthly * paymentCalc)).toFixed(2);
        totalInterest.value = ((monthly * paymentCalc)-principal).toFixed(2);

        // Show Results
        document.getElementById('results').style.display='block';

        // Hiding loading gif after completing loading
        document.getElementById('img-loading').style.display='none';
    }else{
        displayError('Please enter valid number in all fields');
        if(monthlyPayment.value === ''){
            loanAmount.id = 'input-error';
        }
        document.getElementById('img-loading').style.display='none';
    }
};

// Display error if user does not enter valid inputs
function displayError(error){
    // create a div
    let errorDiv = document.createElement('div'); 
    
    // Get elements
    let card = document.querySelector('.card');         // card div
    let header = document.querySelector('.heading');    // header

    // add class alert danger
    errorDiv.className= 'alert alert-danger';

    // create text node and append to error Div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error before heading in side card
    card.insertBefore(errorDiv, header);    // you call insertBefore on a parent and pass in newNode and referenceNode

    // Clear error after x amount od seconds using setTimeout -- 
    //      takes in function of what to remove and time in milliseconds for that element to be removed
    setTimeout(()=>{
        document.querySelector('.card').removeChild(errorDiv);
    }, 2300);
}