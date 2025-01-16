document.addEventListener('DOMContentLoaded', () => {
    const writer = document.getElementById('write-box');
    const reader = document.getElementById('read-box');
    writer.textContent = messages.writerLink;
    reader.textContent = messages.readerLink;
});