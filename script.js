// Efficient Script for Dialog & Form Handling
const dialog = document.getElementById('contact-dialog');
const contactBtn = document.getElementById('contact-btn');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

// Open Modal
contactBtn.addEventListener('click', () => {
    dialog.showModal();
});

// Close Modal
const closeDialog = () => {
    dialog.close();
    // Optional: reset form after closing if needed, or leave it
    // form.reset(); 
    // result.style.display = 'none';
};

closeBtn.addEventListener('click', closeDialog);

// Close on clicking outside
dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
    ) {
        closeDialog();
    }
});

// Handle Form Submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.style.display = "block";
    result.innerHTML = "Please wait...";
    result.className = "form-status sending";

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message || "Message sent successfully!";
                result.className = "form-status success";
                form.reset();
                // Close after 2 seconds
                setTimeout(() => {
                    closeDialog();
                    result.style.display = "none";
                }, 2000);
            } else {
                console.log(response);
                result.innerHTML = json.message || "Something went wrong!";
                result.className = "form-status error";
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
            result.className = "form-status error";
        });
});