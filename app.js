const BASE_URL= "https://2024-03-06.currency-api.pages.dev/v1/currencies";


let dropdowns= document.querySelectorAll(".dropdown select");
let btn= document.querySelector("form button");
let fromCur= document.querySelector(".from select");
let toCur= document.querySelector(".to select");
let msg=document.querySelector(".msg");

for(let select of dropdowns){
    for( curCode in countryList){
        let newOpt= document.createElement("option");
        newOpt.innerText=curCode;
        newOpt.value=curCode;
        select.append(newOpt);
       if(select.name==="from" && curCode==="USD"){
          newOpt.selected="selected";
       }else if(select.name==="to" && curCode==="INR"){
        newOpt.selected="selected";
     }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}


const updateFlag=(element)=>{
   let curCode= element.value;
   let countryCode= countryList[curCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newSrc;
}
const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
 let amtVal=amount.value;
 if( amtVal === ""  || amtVal<1){
    amount.value="1";
 }

 const URl= `${BASE_URL}/${fromCur.value.toLowerCase()}.json`;

 let response= await fetch(URl);
 let data= await response.json();
  let rateMap= await data[fromCur.value.toLowerCase()];
  let rate= rateMap[toCur.value.toLowerCase()];

 let finalAmount= amtVal*rate;
 msg.innerText=`${amtVal} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
}


btn.addEventListener("click", (evt)=>{
 evt.preventDefault();
 updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})
