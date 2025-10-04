// let postObj = localStorage.getItem("postObj")
// console.log(JSON.parse(postObj))


fetch(`https://railway.stepprojects.ge/api/getvagon/812`)
then(resp => resp.json())
.then(resp => console.log(resp))