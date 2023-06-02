const themeButton = document.getElementById('themeButton');
const themeIcon = document.getElementById('themeIcon');
const headerText = document.getElementById('headerText');
const textarea = document.getElementById('memeTextarea');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modalText');
const doneButton = document.getElementById('doneButton');

themeButton.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    themeIcon.src = document.body.classList.contains('light-theme') ? 'assets/moon.svg' : 'assets/sun.svg';
    headerText.textContent = document.body.classList.contains('light-theme') ? 'Welcome to this Statement meme site (Light Mode)' : 'Welcome to this Statement meme site (Dark Mode)';
}

doneButton.addEventListener('click', () => {
    const text = textarea.value.trim();
    if (text !== '') {
        const confirmDialog = confirm(`Are you sure? Text: "${text}"`);
        if (confirmDialog) {
            modalText.textContent = text;
            modal.style.display = 'block';
        } else {
            textarea.focus();
        }
    }
});

modal.addEventListener('click', () => {
    modal.style.display = 'none';
});

function downloadModalImage() {
    const canvas = document.createElement('canvas');
    const modalContent = document.querySelector('.modal-content');

    canvas.width = modalContent.offsetWidth;
    canvas.height = modalContent.offsetHeight;

    const context = canvas.getContext('2d');
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const modalText = document.getElementById('modalText');
    const text = modalText.textContent;
    context.font = '24px Arial';
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const link = document.createElement('a');
    link.download = 'modal.png';
    link.href = canvas.toDataURL();
    link.click();
}

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;