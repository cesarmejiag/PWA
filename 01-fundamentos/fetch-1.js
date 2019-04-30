
let endpoint = 'https://reqres.in/api/users?page=2';
let req = new XMLHttpRequest();

req.onreadystatechange = e => {
    if (req.status === 200) {
        if (req.readyState === 4) {
            let resObj = JSON.parse(req.response);
            console.log(resObj);
        }
    }
};

req.open('GET', endpoint, true);
req.send(null);

