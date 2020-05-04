const app = new App()
// document.querySelector("#charstart").addEventListener("click", start);

// function start(e) {
//     e.preventDefault();

//     fetch("http://localhost:3000/mkchar/start", {
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         method: "POST",
//         body: JSON.stringify({
//             charcter: {
//                 name: e.target.parentNode[0].value,
//                 race: e.target.parentNode[1].value,
//                 class: e.target.parentNode[2].value
//             }
//         })
//     })
//     .then(response => response.json())
//     // ERROR IF INVALID USER
//     .then(data=>console.log(data))
// }

// const BACKEND_URL = 'http://www.localhost:3000';
// fetch(`${BACKEND_URL}/test`)
//   .then(response => response.json())
//   .then(parsedResponse => console.log(parsedResponse));