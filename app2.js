
let mn = document.querySelector(".mn")

let postObj = {
    trainId: 0,
    date: "2025-03-11T13:33:18.727Z",
    email: "string",
    phoneNumber: "string",
    people: []
  }


let fromcity = window.location.href.split("from=")[1].split("&")[0]

let tocity = window.location.href.split("to=")[1].split("&")[0]

let date = window.location.href.split("date=")[1]

console.log(fromcity)
fetch(`https://railway.stepprojects.ge/api/getdeparture?from=${fromcity}&to=${tocity}&date=${date}`)
.then(x => x.json())
.then(x => randering(x[0]))

function randering(obj){
    console.log(obj)
    let box = document.createElement("div");
    box.innerHTML = `
        <h2 class"hh2"> დრო - ${obj.date} </h2>
        <p class"pp2"> მიმართულება - ${obj.source} - ${obj.destination}</p>
        

     `
     let hh2 = document.querySelector(".hh2")
     let pp2 = document.querySelector(".pp2")

     
     box.className = "box"
  

     obj.trains.forEach(el => {
        let train = document.createElement("div")
     
let bbttnn = document.createElement("button")
bbttnn.className = "bbttnn"
bbttnn.innerText = "დაჯავშნა"
bbttnn.addEventListener("click", function(){
       
    window.location.href=`./index3.html`
})



        train.innerHTML =`
        
                <h3>გასვლა ${el.departure} - ჩასვლა ${el.arrive} </h3>       
                <p> ნომერი - ${el.number}</p>
               
                
             
            `
            
        
         train.className="trainBox"
    
        el.vagons.forEach(elvag =>{
            let vagon = document.createElement("div")
            vagon.innerHTML = `<h3>${elvag.name}</h3> `
            vagon.className = "vagon"
            

            elvag.seats.forEach(elSeat => {
                let seat = document.createElement("button")
                
                seat.innerText = `${elSeat.number} - ${elSeat.price} ლ  `  
                seat.addEventListener('click', function() {
                    if(seat.style.backgroundColor != "green"){
                        seat.style.backgroundColor = "green"
                        seat.style.color = "#2596be"
                            postObj.trainId = el.number
                            postObj.date = date
                            postObj.people.push({
                                seatId : elSeat.seatId,
                                name: "string",
                                surname: "string",
                                idNumber: "string",
                                status: "string",
                                payoutCompleted: true
                            })
                           localStorage.setItem("postObj", JSON.stringify(postObj))
                    }
                    else if(seat.style.backgroundColor = "white"){
                        seat.style.backgroundColor = "#2596be"
                        seat.style.color = "black"

                    }
                           
                    else {
                           seat.style.backgroundColor = "white"
                           seat.style.color = "green"
                        postObj.people= postObj.people.filter(el => 
                            el.seatId != elSeat.seatId
                        )
                        console.log(postObj)
                        localStorage.setItem("postObj", JSON.stringify(postObj))
                    }



 
                })


                vagon.appendChild(seat)


            } )
            
            train.appendChild(vagon)
         train.appendChild(bbttnn)

        })

        box.appendChild(train)
        
     });

     mn.appendChild(box)
}


