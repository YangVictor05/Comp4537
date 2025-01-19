document.addEventListener('DOMContentLoaded', () => {
    const writer = document.getElementById('write-box');
    const reader = document.getElementById('read-box');
    const lab = document.getElementById('lab-title');
    const name = document.getElementById('name');
    writer.textContent = messages.writerLink;
    reader.textContent = messages.readerLink;
    lab.textContent = messages.labTitle;
    name.textContent = messages.name;
});