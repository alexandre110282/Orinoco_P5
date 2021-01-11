function panier() {
    let basketButton = document.createElement("button");
    basketButton.innerHTML = "<p>Hello</p>";
    let elt = document.getElementsByTagName('header');
    elt[0].appendChild(basketButton);
}