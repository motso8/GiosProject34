let phone = document.querySelector(".phone");
let email = document.querySelector(".email");
let peopleinputs = document.querySelector(".peopleinputs");
let form = document.querySelector(".form");

// Passenger Inputs Renderer
function renderPplInputs(arr){
    peopleinputs.innerHTML = ""; // გასუფთავება პირველსავე
    arr.forEach((el, index) => {
        // Passenger block
        let passengerDiv = document.createElement("div");
        passengerDiv.className = "passenger-block";

        // Passenger title
        let title = document.createElement("h4");
        title.innerText = `Passenger ${index + 1}`;
        title.className = "passenger-title";
        passengerDiv.appendChild(title);

        // Name input
        let nameDiv = document.createElement("div");
        nameDiv.className = "input-group";
        let nameInp = document.createElement("input");
        nameInp.className = "NameInp";
        nameInp.setAttribute("name", `firstname${index}`);
        nameInp.placeholder = "Name";
        nameDiv.appendChild(nameInp);

        // Surname input
        let surnameDiv = document.createElement("div");
        surnameDiv.className = "input-group";
        let lastNameInp = document.createElement("input");
        lastNameInp.className = "lastNameInp";
        lastNameInp.setAttribute("name", `lastname${index}`);
        lastNameInp.placeholder = "Surname";
        surnameDiv.appendChild(lastNameInp);

        // ID Number input
        let idDiv = document.createElement("div");
        idDiv.className = "input-group";
        let idNumberInp = document.createElement("input");
        idNumberInp.className = "idNumberInp";
        idNumberInp.setAttribute("name", `idnumber${index}`);
        idNumberInp.placeholder = "ID Number";
        idDiv.appendChild(idNumberInp);

        // Append input divs to passenger block
        passengerDiv.appendChild(nameDiv);
        passengerDiv.appendChild(surnameDiv);
        passengerDiv.appendChild(idDiv);

        // Append passenger block to peopleinputs
        peopleinputs.appendChild(passengerDiv);
    });
}

// Load postObj from localStorage
let postObj = JSON.parse(localStorage.getItem("postObj")) || {people: []};

// Render passenger inputs
renderPplInputs(postObj.people);

// Form submit
form.addEventListener("submit", function(e){
    e.preventDefault();
    postObj.email = email.value;
    postObj.phone = phone.value;

    fetch(`https://railway.stepprojects.ge/api/tickets/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    })
    .then(resp => {
        if(resp.status === 200){
            return resp.json();
        } else {
            alert("Error registering ticket");
            throw new Error("Registration failed");
        }
    })
    .then(resp => {
        alert("ბილეთი წარმატებით დაიჯავშნა");
        setTimeout(() => {
            window.location.href = "./index.html";
        }, 500);
    })
    .catch(error => console.log(error));
});




// let postObj = {
//     trainId: 0,
//     date: "2025-03-11T13:33:18.727Z",
//     email: "string",
//     phoneNumber: "string",
//     people: []
//   }


