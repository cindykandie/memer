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
    const isLightTheme = document.body.classList.contains('light-theme');
    const backgroundColor = isLightTheme ? '#ffffff' : '#000000';
    const textColor = isLightTheme ? '#000000' : '#ffffff';
    const maxWidth = 500; // Maximum width in pixels
    const maxHeight = 500; // Maximum height in pixels
    const padding = 20; // Padding in pixels
  
    canvas.width = modalContent.offsetWidth;
    canvas.height = modalContent.offsetHeight;
  
    const context = canvas.getContext('2d');
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    const modalText = document.getElementById('modalText');
    const text = modalText.textContent;
    let fontSize = 24;
    const lineHeight = 1.2;
    const words = text.split(' ');
    let lines = [];
  
    context.fillStyle = textColor;
    context.textAlign = 'center';
  
    while (fontSize > 0) {
      context.font = `${fontSize}px Arial`;
  
      let line = '';
      lines = [];
  
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const lineWidth = metrics.width;
  
        if (lineWidth > maxWidth - 2 * padding && i > 0) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
  
      lines.push(line);
  
      const textHeight = lines.length * fontSize * lineHeight;
      const textWidth = Math.max(...lines.map(line => context.measureText(line).width));
  
      if (textHeight <= maxHeight - 2 * padding && textWidth <= maxWidth - 2 * padding) {
        break;
      }
  
      fontSize--;
    }
  
    const startY = (canvas.height - lines.length * fontSize * lineHeight) / 2;
  
    for (let i = 0; i < lines.length; i++) {
      const lineY = startY + (i * fontSize * lineHeight);
      context.fillText(lines[i], canvas.width / 2, lineY);
    }
  
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  }
  
  
  

const yearElement = document.getElementById("year");
const currentYear = new Date().getFullYear();
yearElement.textContent = currentYear;