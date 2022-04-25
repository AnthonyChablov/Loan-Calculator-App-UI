
console.log(1);
// alert(1);

// Selecting elements

let loanForm = document.querySelector('#loan-form');

loanForm.addEventListener(('click'), ((e)=>{
    console.log(e.type);
    e.preventDefault();
}));