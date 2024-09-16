read('products.json')

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

function parseJson(str) {
    var json = JSON.parse(str)

    json.forEach(p => {
        var e = document.createElement("div")
        e.id = "card";
        e.innerHTML = `
            <img width="160" height="160" src="assets/pictures/${p.img}.png" alt="${p.img}">
            <div id="product-name">${p.name}</div>
            <div id="product-price">${p.price} ₽</div>
            <a href="#" id="buy-button">Купить</a>`
        var end = document.getElementById("product-list")
        end.appendChild(e)
    });
}