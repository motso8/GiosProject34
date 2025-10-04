


let postObj = localStorage.getItem("postObj")
console.log(JSON.parse(postObj))

let btn = document.querySelector(".checkingb")

btn.addEventListener("click",function(){
    alert("თქვენ უკვე ბრძანდებით აღნიშნულ გვერძე")
})


let inp = document.querySelector(".sazebneli")
let saz = document.querySelector(".chasaweri")

function checkStatus(){
    let id = inp.value
    fetch(`https://railway.stepprojects.ge/api/tickets/checkstatus/${id}`)
   .then(resp => resp.json())
   .then(resp => checkStatus(resp))


 


}

inp.addEventListener("click",function(){
    if(saz.value == ""){
        alert("გთხოვთ შეავსოთ ინფუთი")
    }
})

let shem = document.querySelector(".shemowmeba")

