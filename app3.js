fetch("https://railway.stepprojects.ge/api/stations")
.then(resp => resp.json())
.then(resp => randerStationsFrom(resp))
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
   
    
              
    })}
    