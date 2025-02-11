const bill=document.getElementById('bill');
const people=document.getElementById('people');
const button=document.querySelectorAll('.tip_selection button');
const tipPercentCustom=document.getElementById('customTip');
const resetButton=document.getElementById('reset');
const tipPersonOutput=document.getElementById('tip_person');
const totalPersonOutput=document.getElementById('total_person');



button.forEach(button=>{
    button.addEventListener('click',(e)=>{

        //using innerText because it's value + %
        let tipValue=e.target.innerText;
        tipValue = tipValue.substr(0, tipValue.length - 1);

        if (bill.value === "") {
            resetEverything();
            return;
        }
        
        if (people.value==="" || people.value==="0") people.value=1;

        //converting strings to numbers
        calculateTip(
            parseFloat(bill.value),
            parseFloat(tipValue),
            parseInt(people.value)
        )
    })

});

tipPercentCustom.addEventListener("blur", (e) => {
    if (bill.value === "") {
      resetEverything();
      return;
    }

    if (bill.value==="") return;
    if (people.value==="") people.value=1;

    const customPercent=parseFloat(e.target.value)

    if (isNaN(customPercent)) { // Check if it's NaN
        alert("Please enter a valid number for the custom tip percentage."); // Or some other error handling
        e.target.value = ""; // Clear the invalid input (optional)
        return; // Don't call calculateTip if it's not a number
    }
  
    calculateTip(
      parseFloat(bill.value),
      customPercent,
      parseInt(people.value)
    );
  });


function calculateTip(bill, percentage, people){
    let tipAmount = bill*percentage/100
    let totalPerPerson=(bill+tipAmount)/people;
    let tipPerPerson=tipAmount/people;

    
    const TipPerPerson = tipPerPerson.toFixed(2);
    const TotalPerPerson = totalPerPerson.toFixed(2);

    tipPersonOutput.textContent = `$${TipPerPerson}`;
    totalPersonOutput.textContent = `$${TotalPerPerson}`;

}

//Reset Everything
resetButton.addEventListener("click", resetEverything);

function resetEverything() {
    tipPersonOutput.textContent = "$0.00";
    totalPersonOutput.textContent = "$0.00";
  bill.value = "";
  people.value = "";
  tipPercentCustom.value = "";
}