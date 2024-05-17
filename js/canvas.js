/*document.getElementById('idForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form inputs
    const fullName = document.getElementById('fullName').value;
    const membershipNumber = document.getElementById('membershipNumber').value;
    const membershipGrade = document.getElementById('membershipGrade').value;
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 3);

    // Handle file upload (passport photo)
    const passportPhoto = document.getElementById('passportPhoto').files[0];

    // Update card preview
    updateCardPreview(fullName, membershipNumber, membershipGrade, expirationDate, passportPhoto);
});

function updateCardPreview(fullName, membershipNumber, membershipGrade, expirationDate, passportPhoto) {
    const canvas = document.getElementById('cardCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size (adjust values as needed)
    canvas.width = 600; 
    canvas.height = 400; 

    // Clear canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color
    ctx.fillStyle = getMembershipColor(membershipGrade);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load NIM logo
    const logoImg = new Image();
    logoImg.src = "nimlogo.png"; 
    logoImg.onload = function() {
        ctx.drawImage(logoImg, 20, 20, 100, 100); 
    }; 

    // Load and draw passport photo
    const photoImg = new Image();
    photoImg.onload = function() {
        ctx.drawImage(photoImg, canvas.width - 170, 20, 150, 150); 

        // Draw Text elements
        ctx.fillStyle = 'black'; 
        ctx.font = 'bold 24px Arial'; 

        ctx.textAlign = 'center';
        ctx.fillText(membershipGrade, canvas.width - 75, 190); // Membership Grade

        ctx.textAlign = 'center';
        ctx.fillText(fullName.toUpperCase(), canvas.width / 2, 240); // Full Name (ALL CAPS)

        ctx.font = '16px Arial'; 

        ctx.textAlign = 'left'; 
        ctx.fillText('Membership Number', 20, 280); 
        ctx.fillText(membershipNumber, 20, 305); 

        ctx.textAlign = 'right'; 
        ctx.fillText('Valid till: ' + expirationDate.toLocaleDateString(), canvas.width - 20, 280); 

        // Show the save button
        document.querySelector('.save-button').classList.remove('hidden');
    };
    photoImg.onerror = function() {
        console.error("Error loading passport photo");
    };
    photoImg.src = URL.createObjectURL(passportPhoto); 
}

function getMembershipColor(membershipGrade) {
    switch (membershipGrade) {
        case 'Fellow':
            return '#b48b3a';
        case 'Member':
        case 'Associate':
            return '#b0aebc';
        case 'Graduate':
            return '#ffffff';
        default:
            return '#ccc'; // Default color
    }
}


function saveCardAsPNG() {
    const canvas = document.getElementById('cardCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'id-card.png';
    link.click();
} 
*/

document.getElementById('idForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form inputs
    const fullName = document.getElementById('fullName').value;
    const membershipNumber = document.getElementById('membershipNumber').value;
    const membershipGrade = document.getElementById('membershipGrade').value;
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);

    // Handle file upload (passport photo)
    const passportPhoto = document.getElementById('passportPhoto').files[0];

    // Update card preview
    updateCardPreview(fullName, membershipNumber, membershipGrade, expirationDate, passportPhoto);
});

function updateCardPreview(fullName, membershipNumber, membershipGrade, expirationDate, passportPhoto) {
    const canvas = document.getElementById('cardCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to accommodate both front and back (adjust values as needed)
    canvas.width = 600; 
    canvas.height = 800; // Twice the height for front and back

    // Clear canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background color for front of the card
    ctx.fillStyle = getMembershipColor(membershipGrade);
    ctx.fillRect(0, 0, canvas.width, 400); // Draw front at the top

    // Load and draw front content
    const logoImg = new Image();
    logoImg.onload = function() {
        ctx.drawImage(logoImg, 20, 20, 100, 100); 

        // Load and draw passport photo
        const photoImg = new Image();
        photoImg.onload = function() {
            ctx.drawImage(photoImg, canvas.width - 170, 20, 150, 150); 

            // Draw text elements for front content
            ctx.fillStyle = 'black'; 
            ctx.font = 'bold 24px Arial'; 

            ctx.textAlign = 'center';
            ctx.fillText(membershipGrade, canvas.width - 75, 190); // Membership Grade

            ctx.fillText(fullName.toUpperCase(), canvas.width / 2, 240); // Full Name (ALL CAPS)

            ctx.font = '16px Arial'; 

            ctx.textAlign = 'left'; 
            ctx.fillText('Membership Number', 20, 280); 
            ctx.fillText(membershipNumber, 20, 305); 

            ctx.textAlign = 'right'; 
            ctx.fillText('Valid till: ' + expirationDate.toLocaleDateString(), canvas.width - 20, 280); 

            // Load and draw back content
            const backImg = new Image();
            backImg.onload = function() {
                ctx.drawImage(backImg, 0, 400, canvas.width, 400); // Draw back at the bottom half

                // Show the save button
                document.querySelector('.save-button').classList.remove('hidden');
            };
            backImg.src = getBackImageURL(membershipGrade); // Get back image URL based on membership grade
        };
        photoImg.onerror = function() {
            console.error("Error loading passport photo");
        };
        photoImg.src = URL.createObjectURL(passportPhoto); 
    };
    logoImg.src = "nimlogo.png"; 
}

function getBackImageURL(membershipGrade) {
    // Function to return the URL of the back image based on membership grade
    // You need to implement this function to return the correct URL for each membership grade
    // For example:
    switch (membershipGrade) {
        case 'Fellow':
            return 'back_fellow.png'; // URL for back image for Fellow grade
        case 'Member':
        case 'Associate':
            return 'back_member.png'; // URL for back image for Member or Associate grade
        case 'Graduate':
            return 'back_graduate.png'; // URL for back image for Graduate grade
        default:
            return ''; // Default URL
    }
}

function saveCardAsPNG() {
    const canvas = document.getElementById('cardCanvas');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'id-card.png';
    link.click();
}
