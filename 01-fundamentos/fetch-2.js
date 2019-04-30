// https://reqres.in/
let endpoint = 'https://reqres.in/api/users?page=2';

fetch(endpoint)
    .then(res => {
        res.json()
            .then(console.log)
    });
