document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    generateCard(name);
});

function generateCard(name) {
    var canvas = document.createElement('canvas');
    canvas.width = 500; // Set canvas width
    canvas.height = 500; // Set canvas height
    var ctx = canvas.getContext('2d');

    var image = new Image();
    image.onload = function() {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Draw the image

        ctx.fillStyle = 'white'; // Set text color
        ctx.font = '30px Arial'; // Set font size and style
        var textX = canvas.width / 2; // X-coordinate for centering text horizontally
        var textY = canvas.height / 2; // Y-coordinate for centering text vertically
        ctx.textAlign = 'center'; // Align text horizontally to center
        ctx.textBaseline = 'middle'; // Align text vertically to middle
        ctx.fillText(name, textX, textY); // Write user's name

        var cardContainer = document.getElementById('cardContainer');
        cardContainer.innerHTML = ''; // Clear previous card
        cardContainer.appendChild(canvas); // Append canvas to card container

        var downloadButton = document.getElementById('downloadButton');
        downloadButton.style.display = 'block'; // Display download button
        downloadButton.onclick = function() {
            downloadCanvas(canvas, 'eid_card.png'); // Call downloadCanvas function when button is clicked
        };
    };

    image.src = 'eid_image.jpg'; // Set the image source
}

function downloadCanvas(canvas, filename) {
    var link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
}
