let getListOfProductsFromApi = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(request.responseText);
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            reject(this.status);
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies");
    request.send();
});

function getAllProducts() {
    getListOfProductsFromApi
        .then(function (response) {
            let products = JSON.parse(response); // Place les produits dans un tableau products

            for (let product of products) {
                const newTeddie = new Teddie(product.colors, product._id, product.name, product.price, product.description, product.imageUrl);
                document.getElementById("main").appendChild(newTeddie.createHtmlBlock());
            }
        })
        .catch(function (error) {
            document.getElementById("main").innerHTML += `<p>Connection au serveur échouée.</p>`;
            console.error(error);
        });
        console.log("ici");
}

class Teddie {
	constructor(colors, _id, name, price, imageUrl, description) {
		this.colors = colors;
		this._id = _id;
		this.name = name;
		this.price = price;
		this.imageUrl = imageUrl;  
	  	this.description = description;
          console.log("this = ", this);
	  
    }
    createHtmlBlock(){
        let articleBlock = document.createElement("article");
        articleBlock.innerHTML = `
            <div>
                <h3>${this.name}</h3>
                <p>${this.price/100}</p>
                <button id="${this._id}">Ajouter au panier</button>
            </div>`;
        let button = articleBlock.getElementsByTagName("button");
        button[0].addEventListener('click', Teddie.addBasket);

        return articleBlock;
    }
static addBasket(event){
    console.log("event= ", event.srcElement.id);
}        
}
