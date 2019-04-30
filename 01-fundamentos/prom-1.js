
function sumarUno (numero, callback) {
    console.log(numero);

    if (numero > 7) {
        throw `${numero} es un numero muy grande`;
    }

    setTimeout(function() {
        callback(numero + 1);
    }, 800);
}

try {
    sumarUno(8, function(nuevoNumero) {
        sumarUno(nuevoNumero, function(nuevoNumero) {
            sumarUno(nuevoNumero, function(nuevoNumero) {
                console.log(nuevoNumero);
            });
        });
    });
} catch (e) {
    console.log(e);
}
