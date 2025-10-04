let phone = document.querySelector(".phone");
let email = document.querySelector(".email");
let peopleinputs = document.querySelector(".peopleinputs");
let form = document.querySelector(".form");

// Load postObj from localStorage
let postObj = JSON.parse(localStorage.getItem("postObj")) || { trainId: 0, date: "", email: "", phoneNumber: "", people: [] };

// Render passenger inputs
function renderPplInputs(arr){
    peopleinputs.innerHTML = ""; 
    arr.forEach((el, index) => {
        let passengerDiv = document.createElement("div");
        passengerDiv.className = "passenger-block";

        let title = document.createElement("h4");
        title.innerText = `Passenger ${index + 1}`;
        title.className = "passenger-title";
        passengerDiv.appendChild(title);

        // Name
        let nameDiv = document.createElement("div");
        nameDiv.className = "input-group";
        let nameInp = document.createElement("input");
        nameInp.className = "NameInp";
        nameInp.placeholder = "Name";
        nameInp.value = el.name || "";
        nameDiv.appendChild(nameInp);

        // Surname
        let surnameDiv = document.createElement("div");
        surnameDiv.className = "input-group";
        let lastNameInp = document.createElement("input");
        lastNameInp.className = "lastNameInp";
        lastNameInp.placeholder = "Surname";
        lastNameInp.value = el.surname || "";
        surnameDiv.appendChild(lastNameInp);

        // ID Number
        let idDiv = document.createElement("div");
        idDiv.className = "input-group";
        let idNumberInp = document.createElement("input");
        idNumberInp.className = "idNumberInp";
        idNumberInp.placeholder = "ID Number";
        idNumberInp.value = el.idNumber || "";
        idDiv.appendChild(idNumberInp);

        passengerDiv.appendChild(nameDiv);
        passengerDiv.appendChild(surnameDiv);
        passengerDiv.appendChild(idDiv);

        peopleinputs.appendChild(passengerDiv);
    });
}

// If no passengers yet, create one empty
if(postObj.people.length === 0) postObj.people.push({seatId:0, name:"", surname:"", idNumber:"", status:"string", payoutCompleted:true});

renderPplInputs(postObj.people);

form.addEventListener("submit", function(e){
    e.preventDefault();

    postObj.email = email.value;
    postObj.phoneNumber = phone.value; // API expects phoneNumber

    // Collect input values dynamically
    let passengerBlocks = document.querySelectorAll(".passenger-block");
    postObj.people = []; // reset

    passengerBlocks.forEach((block, index) => {
        let name = block.querySelector(".NameInp").value.trim();
        let surname = block.querySelector(".lastNameInp").value.trim();
        let idNumber = block.querySelector(".idNumberInp").value.trim();
        let seatId = JSON.parse(localStorage.getItem("postObj"))?.people[index]?.seatId || 0;

        postObj.people.push({
            seatId: seatId,
            name: name,
            surname: surname,
            idNumber: idNumber,
            status: "string",
            payoutCompleted: true
        });
    });

    console.log("POST DATA:", postObj); // check before sending

    fetch(`https://railway.stepprojects.ge/api/tickets/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postObj)
    })
    .then(resp => resp.json().then(data => ({status: resp.status, body: data})))
    .then(({status, body}) => {
        if(status === 200) {
            alert("ბილეთი წარმატებით დაიჯავშნა");
            setTimeout(() => window.location.href = "./index.html", 500);
        } else {
            console.log("API ERROR:", body);
            alert("Error registering ticket: " + (body.message || JSON.stringify(body)));
        }
    })
    .catch(err => {
    });
});
