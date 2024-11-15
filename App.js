const Base_URL = "https://2024-03-06.currency-api.pages.dev/v1/currencies";



const dropdowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form Button");
const fromCurr = document.querySelector(".From select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg");
const swapImage = document.getElementById("swapimg")

for (let select of dropdowns){
    for(let currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name ==="From" && currcode ==="USD"){
            newOption.selected = "selected";
        } else  if(select.name ==="To" && currcode ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag  = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

}

function swapCurrencies () {
    const temp = fromCurr.value;
    fromCurr.value = toCurr.value; 
    toCurr.value = temp;

    updateFlag(fromCurr);
    updateFlag(toCurr);
}

swapImage.addEventListener("click",swapCurrencies);



btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval  < 1){
        amtval = 1;
        amount.value = "1"
    }
    const url = `${Base_URL}/${fromCurr.value.toLowerCase()}.json`  
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtval*rate;

    msg.innerHTML =`<b> ${amtval}${fromCurr.value} = ${finalAmount} ${toCurr.value}</b>`


});




