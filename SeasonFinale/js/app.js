const container = document.querySelector(".container")
const coffees = [
  { name: "Perspiciatis", image: "images/coffee1.jpg" },
  { name: "Voluptatem", image: "images/coffee2.jpg" },
  { name: "Explicabo", image: "images/coffee3.jpg" },
  { name: "Rchitecto", image: "images/coffee4.jpg" },
  { name: " Beatae", image: "images/coffee5.jpg" },
  { name: " Vitae", image: "images/coffee6.jpg" },
  { name: "Inventore", image: "images/coffee7.jpg" },
  { name: "Veritatis", image: "images/coffee8.jpg" },
  { name: "Accusantium", image: "images/coffee9.jpg" },
]

const showCoffees = () => {
    let output = ""
    coffees.forEach(
      ({ name, image }) =>
        (output += `
                <div class="card">
                  <img class="card--avatar" src=${image} />
                  <h1 class="card--title">${name}</h1>
                  <a class="card--link" href="#">Taste</a>
                </div>
                `)
    )
    container.innerHTML = output
  }
  
  //document.addEventListener("DOMContentLoaded", showCoffees)

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
  }


  let button= document.getElementById('button');
button.addEventListener('click',getData);
function getData(){
  try {
    
  
    // create XHR object
     let xml = new XMLHttpRequest();
    // the function with the 3 parameters
    var Principal = document.getElementById("nbrPrincipal").value;
    var Interest = document.getElementById("nbrInterest").value;
    var Months = document.getElementById("nbrMonths").value;
//Finish the error checking to get full points
try {
  if (!isNumber(Principal)) {
   alert('Principal is not a valid number');
   document.getElementById("nbrPrincipal").focus();
   return;
  }

   if (!isNumber(Balance)) {
    alert('Balance is not a valid number');
    document.getElementById("nbrBalance").focus();
    return;
   }
   
   if (!isNumber(Interest)) {
    alert('Interest is not a valid number');
    document.getElementById("nbrInterest").focus();
    return;
   }
} catch (error) {
  
  
}

    var url = 'https://loanmasterted.azurewebsites.net/api/Loan/' + Principal + '/' + Interest + '/' + Months + '';//'https://jsonplaceholder.typicode.com/todos/1';

      xml.open('GET',url,true );
      // the function called when an xhr transaction is completed
        xml.onload  = function(){
        if(this.status ==200){
          var json = JSON.parse(this.responseText);
          //Create a new loan from the template and remove the template class
          var NewLoan =  document.querySelector('.LoanTemplate').cloneNode(true);
          NewLoan.classList.remove("LoanTemplate");
          NewLoan.querySelector('.Payment').innerHTML=formatter.format(json.Payment);
          NewLoan.querySelector('.InterestRate').innerHTML=json.InterestRate;
          NewLoan.querySelector('.Principal').innerHTML=formatter.format(json.Principal);

//if I want to add wordle, go to this code for button
NewLoan.querySelector('.btnShow').addEventListener("click", function(){
//alert(1);
NewLoan.querySelector(".clsSchedule").classList.remove("Hidden");
});
          //Set up the header at the top
          var NewHeader = document.querySelector(".LineTemplate").cloneNode(true);
          NewHeader.classList.remove("LineTemplate");
          NewLoan.querySelector(".clsSchedule").appendChild(NewHeader); 

          //Set up the full Amortization Schedule
          var array = json.Schedule.Schedule;
          for (let index = 0; index < array.length; index++) {
            const AmortLine = array[index];
            var NewLine = document.querySelector(".LineTemplate").cloneNode(true);
            NewLine.classList.remove("LineTemplate");
            NewLine.querySelector(".Balance").innerHTML = formatter.format(AmortLine.Balance);
            NewLine.querySelector(".Interest").innerHTML = formatter.format(AmortLine.Interest);
            NewLine.querySelector(".Principal").innerHTML = formatter.format(AmortLine.Principal);
            NewLine.querySelector(".Month").innerHTML = DateConverter(AmortLine.Month);
            NewLoan.querySelector(".clsSchedule").appendChild(NewLine); 
          }
  
          //Add the new loan to the container
          container.appendChild(NewLoan);
        }
}
   // the function that sends the request
   xml.send();  
  } catch (error) {
    console.warn('Issue with the API');
  }
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
function DateConverter(GivenDate){
  return GivenDate.slice(0, 10);
}