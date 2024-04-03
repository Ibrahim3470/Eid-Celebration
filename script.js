document.getElementById('nameForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    generateCard(name);
});

function generateCard(name) {
    const aspectRatio = 1;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let canvasWidth = windowWidth;
    let canvasHeight = canvasWidth / aspectRatio;

    if (canvasHeight > windowHeight) {
        canvasHeight = windowHeight;
        canvasWidth = canvasHeight * aspectRatio;
    }

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.onload = function () {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, canvas.width / 2, canvas.height / 1.8);
        ctx.fillText('EID Card', canvas.width / 2, canvas.height / 1.5);

        const cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = '';
        cardContainer.appendChild(canvas);

        const downloadButton = document.getElementById('downloadButton');
        downloadButton.style.display = 'block';

        downloadButton.onclick = function () {
            downloadCanvas(canvas, 'eid_card.png');
        };
    };

    image.src = 'eid.png';

    window.addEventListener('resize', function () {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        generateCard(name);
    });
}

function downloadCanvas(canvas, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
