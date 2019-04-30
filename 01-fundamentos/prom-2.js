let sumarUno = number => {
    return new Promise((res, rej) => {

        console.log(number);

        if (number > 7) {
            rej("El número es muy alto");
        }

        setTimeout(() => {
            res(number + 1);
        }, 800);
    });
};

sumarUno(5)
    .then(nuevoNumero => sumarUno(nuevoNumero))
    .then(nuevoNumero => sumarUno(nuevoNumero))
    .then(nuevoNumero => sumarUno(nuevoNumero))
    .catch(error => { console.log(error); });