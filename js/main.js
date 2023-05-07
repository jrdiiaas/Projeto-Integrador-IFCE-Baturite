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

const userList = document.querySelector('#userList')
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
        const item = document.createElement('li')
        item.classList.add('item')
        item.innerHTML = `${user.name} - ${user.email} <button data-delete-user="${user.id}">Deletar</button> <button data-edit-user="${user.id}">Editar</button>`
        userList.appendChild(item)

        // Adicionando funcionalidade de excluir usuário
        const deleteButton = item.querySelector('[data-delete-user]')
        deleteButton.addEventListener('click', function (e) {
            const id = e.target.getAttribute('data-delete-user')
            deleteUser(id)
        })

        // Adicionando funcionalidade de editar usuário
        const editButton = item.querySelector('[data-edit-user]')
        editButton.addEventListener('click', function (e) {
            const id = e.target.getAttribute('data-edit-user')
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
    const productPrice = parseFloat(productPriceInput.value)
    if (productName === null || productName === '' || isNaN(productPrice)) return
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
        const item = document.createElement('li')
        item.classList.add('item')
        item.innerHTML = `${product.name} - R$${product.price.toFixed(2)} <button data-delete-product="${product.id}">Deletar</button> <button data-edit-product="${product.id}">Editar</button>`
        productList.appendChild(item)

        // Adicionando funcionalidade de excluir produto
        const deleteButton = item.querySelector('[data-delete-product]')
        deleteButton.addEventListener('click', function (e) {
            const id = e.target.getAttribute('data-delete-product')
            deleteProduct(id)
        })

        // Adicionando funcionalidade de editar produto
        const editButton = item.querySelector('[data-edit-product]')
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
    const newPrice = parseFloat(prompt('Digite o novo preço:', product.price))
    if (newName !== null && newName !== '') {
        product.name = newName
    }
    if (!isNaN(newPrice)) {
        product.price = newPrice
    }
    renderProducts()
}

// Inicializando a lista de produtos
renderProducts()