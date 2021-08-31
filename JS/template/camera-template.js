  
// La fonction buildCamera permet d'afficher une camera dans un card bootstrap
// Avec cette fonction on affiche les produits sur la page d'affichage de produits (index.html)
// Lorsqu'on récupère les prouits de l'api
// On appelle la fonction buildCamera qui prend en paramètre l'objet camera 
// pour afficher chaque produit sur la page index.html
function buildCamera(camera){
    return `
    <div class="p-2">
        <div class="card" style="width: 18rem;">
            <img id="cardImg" src="${camera.imageUrl}" alt="Card image cap">
            <div class="card-body">
                <h5 id="cardTitle">${camera.name}</h5>
                    <p id="cardDescription">${camera.description}</p>
                    <a href="../pages/product.html?id=${camera.id}" id="btn" class="btn-primary"><p id="cardPrice">${camera.price}</p></a>
            </div>
        </div>
    </div>`;
}