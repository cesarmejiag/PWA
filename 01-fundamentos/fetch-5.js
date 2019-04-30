
let endpoint = 'https://reqres.in/api/users/1';

fetch(endpoint)
    .then(res => {
        res.json()
            .then(console.log);
    })
    .catch(error => {
        console.log('Error with the request');
        console.log(error);
    });
