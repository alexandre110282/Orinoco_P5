let getOneProductFromApi = new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            resolve(request.responseText);
        } else if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
            reject(this.status);
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + localStorage.getItem("teddieId"));
    request.send();
});



function getOneProduct() {
    getOneProductFromApi
        .then(function (response) {
            let product = JSON.parse(response);
            document.getElementById("main").innerHTML = `
            <h2>${product.name}</h2>
            <img src=${product.imageUrl}>
            <button id="addBasket">Ajouter au panier</button>`;
            document.getElementById("addBasket").addEventListener('click', () => {
                let basketContent = JSON.parse(localStorage.getItem("basketContent")) || [];

                console.log("var = ",basketContent);
                basketContent.push(product);

                localStorage.setItem("basketContent", JSON.stringify(basketContent));
            });


        })
        .catch(function (error) {
            document.getElementById("main").innerHTML += `<p>Connection au serveur échouée.</p>`;
            console.error(error);
        });
    console.log("ici");
}