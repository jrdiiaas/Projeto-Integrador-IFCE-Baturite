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

function loadProductHeader() {
    const headerDiv = document.getElementById('Productheader');

    fetch('../productheader.html')
        .then(response => response.text())
        .then(data => {
            headerDiv.innerHTML = data;
        });
}

function loadProductFooter() {
    const footerDiv = document.getElementById('Productfooter');

    fetch('../productfooter.html')
        .then(response => response.text())
        .then(data => {
            footerDiv.innerHTML = data;
        });
}

loadProductHeader();
loadProductFooter();

const userTable = document.querySelector('#userTable')
const newUserForm = document.querySelector('#newUserForm')
const userNameInput = document.querySelector('#userNameInput')
const userEmailInput = document.querySelector('#userEmailInput')
let users = []

// Adicionando um usuário
newUserForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const userName = userNameInput.value
    const userEmail = userEmailInput.value
    if (userName === null || userName === '' || userEmail === null || userEmail === '') return
    const user = createUser(userName, userEmail)
    userNameInput.value = null
    userEmailInput.value = null
    users.push(user)
    renderUsers()
})

// Função para criar um novo usuário
function createUser(name, email) {
    return { id: Date.now().toString(), name: name, email: email }
}

// Renderiza a lista de usuários
function renderUsers() {
    clearElement(userList)
    users.forEach(function (user) {
        const row = document.createElement('tr')
        const nameCell = document.createElement('td')
        const emailCell = document.createElement('td')
        const actionsCell = document.createElement('td')
        const deleteButton = document.createElement('button')
        const editButton = document.createElement('button')

        nameCell.textContent = user.name
        emailCell.textContent = user.email
        deleteButton.textContent = 'Deletar'
        editButton.textContent = 'Editar'
        deleteButton.dataset.deleteUser = user.id
        editButton.dataset.editUser = user.id

        actionsCell.appendChild(deleteButton)
        actionsCell.appendChild(editButton)

        row.appendChild(nameCell)
        row.appendChild(emailCell)
        row.appendChild(actionsCell)

        userList.appendChild(row)

        // Adicionando funcionalidade de excluir usuário
        deleteButton.addEventListener('click', function (e) {
            const id = e.target.dataset.deleteUser
            deleteUser(id)
        })

        // Adicionando funcionalidade de editar usuário
        editButton.addEventListener('click', function (e) {
            const id = e.target.dataset.editUser
            editUser(id)
        })
    })
}

// Função para limpar um elemento
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

// Função para deletar um usuário
function deleteUser(id) {
    users = users.filter(function (user) {
        return user.id !== id
    })
    renderUsers()
}

// Função para editar um usuário
function editUser(id) {
    const user = users.find(function (user) {
        return user.id === id
    })
    const newName = prompt('Digite o novo nome:', user.name)
    const newEmail = prompt('Digite o novo email:', user.email)
    if (newName !== null && newName !== '') {
        user.name = newName
    }
    if (newEmail !== null && newEmail !== '') {
        user.email = newEmail
    }
    renderUsers()
}

const productList = document.querySelector('#productList')
const newProductForm = document.querySelector('#newProductForm')
const productNameInput = document.querySelector('#productNameInput')
const productPriceInput = document.querySelector('#productPriceInput')
let products = []

// Adicionando um produto
newProductForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const productName = productNameInput.value
    const productPrice = productPriceInput.value
    if (productName === null || productName === '' || productPrice === null || productPrice === '') return
    const product = createProduct(productName, productPrice)
    productNameInput.value = null
    productPriceInput.value = null
    products.push(product)
    renderProducts()
})

// Função para criar um novo produto
function createProduct(name, price) {
    return { id: Date.now().toString(), name: name, price: price }
}

// Renderiza a lista de produtos
function renderProducts() {
    clearElement(productList)
    products.forEach(function (product) {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${product.name}</td>
            <td>R$ ${product.price}</td>
            <td>
                <button data-delete-product="${product.id}">Deletar</button>
                <button data-edit-product="${product.id}">Editar</button>
            </td>
        `
        productList.appendChild(row)

        // Adicionando funcionalidade de excluir produto
        const deleteButton = row.querySelector('[data-delete-product]')
        deleteButton.addEventListener('click', function (e) {
            const id = e.target.getAttribute('data-delete-product')
            deleteProduct(id)
        })

        // Adicionando funcionalidade de editar produto
        const editButton = row.querySelector('[data-edit-product]')
        editButton.addEventListener('click', function (e) {
            const id = e.target.getAttribute('data-edit-product')
            editProduct(id)
        })
    })
}

// Função para limpar um elemento
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

// Função para deletar um produto
function deleteProduct(id) {
    products = products.filter(function (product) {
        return product.id !== id
    })
    renderProducts()
}

// Função para editar um produto
function editProduct(id) {
    const product = products.find(function (product) {
        return product.id === id
    })
    const newName = prompt('Digite o novo nome:', product.name)
    const newPrice = prompt('Digite o novo preço:', product.price)
    if (newName !== null && newName !== '') {
        product.name = newName
    }
    if (newPrice !== null && newPrice !== '') {
        product.price = newPrice
    }
    renderProducts()
}

renderProducts()