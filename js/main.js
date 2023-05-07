function loadHeader() {
    const headerDiv = document.getElementById('header');

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerDiv.innerHTML = data;
        });
}

function loadFooter() {
    const footerDiv = document.getElementById('footer');

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerDiv.innerHTML = data;
        });
}

loadHeader();
loadFooter();
