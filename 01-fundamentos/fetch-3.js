
// Petición POST
// https://reqres.in/api/users

let endpoint = 'https://reqres.in/api/users';
let user = {
    name: 'César Mejía',
    age: 31
};

fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
