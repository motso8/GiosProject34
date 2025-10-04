

try{
    fetch("https://railway.stepprojects.ge/api/stations")
.then(resp => resp.json())
.then(resp => randerStationsFrom(resp))
.catch(er => alert(er))

}
catch(er){
alert(er)
}

let chosenSets = {
trainId: 0,
date: "2025-03-04T13:37:45.950Z",
email: "string",
phoneNumber: "string",
people: [

]
}




let from = document.querySelector(".from")
let to = document.querySelector(".to")
let inpDate = document.querySelector(".inpDate")
let search = document.querySelector(".search")
let cont = document.querySelector(".cont")
let email = document.querySelector(".email")
let stations =[]

function randerStationsFrom(arr){
from.innerHTML =` <option value="-1">საიდან</option>`
stations=[...arr]
 for(let el of arr){
      from.innerHTML+= `<option value="${el.name}">${el.name}</option>`
 }
}

from.addEventListener("change", function(){
to.innerHTML =` <option value="-1">სად</option>`
console.log(from.value)
let toStations = stations.filter(el => el.name!= from.value)
console.log(toStations)
for(let el of toStations){
to.innerHTML+= `<option value="${el.name}">${el.name}</option>`
}

})


search.addEventListener("click", function(){
    
    if (from.value === "-1" || to.value === "-1") {
            alert("ყველა ველი შესავსებია!")
            return
        }
        else if (inpDate.value === "-1"){
            alert("������������, აი����ი���� ��ა��ი��ი!")
            return
        }
let params = `?from=${from.value}&to=${to.value}&date=${inpDate.value}`
window.location.href=`./index2.html?params=${params}`
})


function radnerTrains(obj){
console.log(obj)
obj.trains.forEach(el => {
     

   let box =  document.createElement("div")
   box.className = "box"
   box.innerHTML = `
      <h2>${el.name}</h2>
      <p>${el.date}</p>
      <p>გამგზავრება -  ${el.departure} ჩასვლა - ${el.arrive}</p>
   `
   let getVagons = document.createElement("button")
   getVagons.innerText = "See Vagong"
   getVagons.addEventListener("click", function(){
      console.log(el.name, el.id)
        el.vagons.forEach(vag => {

            let vagonBox = document.createElement("div")
            vagonBox.className = "vagon"
            vagonBox.innerHTML = `
                     <h4>${vag.name}</h4>
            `
            

            vag.seats.forEach(seat => {
                let seatButton = document.createElement("button")
                seatButton.innerText = `${seat.number}`
                seatButton.className = "seatBtn"
                seatButton.addEventListener("click", function(){
                    console.log(seat.number)
                    if(seatButton.style.backgroundColor != "green"){
                        seatButton.style.backgroundColor =  "green"
                        chosenSetas.email = email.value
                        chosenSetas.people.push(
                            {
                                seatId: seat.seatId,
                                name: "string",
                                surname: "string",
                                idNumber: "string",
                                status: "string",
                                payoutCompleted: true
                              }
                        )
                    }
                    else {
                        seatButton.style.backgroundColor =  "white"
                        chosenSetas.people = chosenSetas.people.filter(el => el.seatId !=seat.seatId)
                    }

                    console.log(chosenSetas)
                })

                vagonBox.appendChild(seatButton)
            })
            









            box.appendChild(vagonBox)
        })
      
   })








   box.appendChild(getVagons)
   cont.appendChild(box)
})
}
