
fetch('georgina.jpg')
    .then(res => res.blob())
    .then(blob => {
        let image = new Image();

        image.src = URL.createObjectURL(blob);
        image.width = '200';

        document.body.appendChild(image);
    });