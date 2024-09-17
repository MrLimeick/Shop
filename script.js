const cart = document.getElementById("cart") 
const cartList = document.getElementById("cart-list") 

read('products.json')
closeCart()

function read(json)
{
    fetch(json)
    .then(checkResponse)
    .then(parseJson)
    .catch((error) => {
        console.error(error)
    });
}

function checkResponse(response) {
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    return response.text();
}

var assortment = []
var inCart = []

function parseJson(str) {
    assortment = JSON.parse(str)
    list = document.getElementById("product-list")
    
    for (let i = 0; i < assortment.length; i++) spawnCard(assortment[i], list, "Купить", `AddToCart(${i})`)
}

/**
 * 
 * @param {number} i 
 * @param {HTMLElement} parent 
 */
function spawnCard(p, parent, buttonName, buttonFun) {
    const e = document.createElement("div")
    e.id = "card";
    e.innerHTML = `
        <img width="160" height="160" src="assets/pictures/${p.img}.png" alt="${p.name}">
        <div id="product-name">${p.name}</div>
        <div id="product-price">${p.price} ₽</div>
        <a href="#" class="button" onClick="${buttonFun};return false">${buttonName}</a>`
    parent.appendChild(e)
    return e
}

/**
 * Добавляет товар в корзину 
 * @param {number} i Индекс в assortment
 */
function AddToCart(i) {
    inCart.push(i)
    document.getElementById("cartItemCount").innerHTML = inCart.length
}

/**
 * Удаляет товар из корзины
 * @param {number} i Индекс в inCart
 */
function RemoveFromCart(i) {
    inCart.splice(i, 1);
    UpdateCartContent()
}

/**
 * Закрывает корзину
 */
function closeCart() {
    console.log(cart)
    cart.style.display = 'none'
}

/**
 * Открывает корзину
 */
function openCart() {
    var cart = document.getElementById("cart") 
    cart.style.display = ''

    UpdateCartContent()
}

function UpdateCartContent() {
    if (inCart.length == 0) {
        cartList.innerHTML = "<h3>Кажется здесь нечего нет!</h3>"
        return
    } else cartList.innerHTML = ''

    for (let i = 0; i < inCart.length; i++) {
        const i2 = inCart[i];
        spawnCard(assortment[i2], cartList, "Убрать", `RemoveFromCart(${i})`)
    }
}