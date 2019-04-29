let sumarLento = number => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(number + 1);
        }, 800);
    });
};

let sumarRapido = number => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(number + 1);
        }, 300);
    });
}

Promise.all([sumarLento(5), sumarRapido(10)])
    .then(nuevoNumero => { console.log(nuevoNumero); })
    .catch(() => { console.log(':('); });