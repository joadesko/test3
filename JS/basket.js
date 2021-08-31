//Récuperation du panier
const basketRecovery = JSON.parse(localStorage.getItem('myBasket'));
// Contenu pour le prix
const divTotalPrice2 = document.getElementById("divTotalPrice");
// On récupère la section où afficher le panier
const basketDisplay = document.getElementById("getProductFromLocalStorageToBasket");
// on initiliase le structureProductBasket à vide.

let structureProductBasket='';
let totalPrice=0;
basketRecovery.forEach(item => {
  totalPrice+=Number(item.price);
      structureProductBasket = structureProductBasket + ` 
      <div class="full-basket">
      <img  class="img-basket" src="${item.imageUrl}" alt="Card image">
        <div><p class="info-basket">${item.name}</p></div>
        <div><p class="info-basket">${item.price}.00€</p></div> 
        <div><p class="info-basket">x${item.quantity}</p></div>
        <i class="far fa-trash-alt btn-supprimer" id="btnDeleted" onclick="deleteItem(event, '${item.id}')"></i></div>
      </div>`;  
});
//----------------------------------------------Retour de l'affiche du prix total de la commande-------------------------------------------//
//Afficher le prix total de la commande
const totalPriceDisplay = `
<div id="total-price" class="total-cart-price"> Le prix total de vos achats est de : ${totalPrice}.00€</div>
`
// on insère les produits récupérés du localstorage
if(structureProductBasket) {
  basketDisplay.innerHTML =  structureProductBasket;
  divTotalPrice2.innerHTML = totalPriceDisplay;

}

// Fonction pour supprimer l'article de la commande
function deleteItem(event, itemId) {
  event.preventDefault();
  // on affiche un message de confirmation
  let choice = confirm("Voulez-vous retirer l'arctile du panier!");
  if(choice) {
    const newBasket = basketRecovery.filter(product => product.id !== itemId);
    // On vérifie le contenu du nouveau panier
     if(newBasket) {
       localStorage.setItem('myBasket', JSON.stringify(newBasket));
       // On reload la page pour afficher le contenu du new panier
       location.reload();
     }
  }
}




//Suppression d'un produit
/*let btnSupprimer = document.querySelectorAll("#btnDeleted");

for (let l = 0; l < btnSupprimer.length; l++){
  //le clic
  btnSupprimer[l].addEventListener("click", (event) => {
    event.preventDefault();
    //Supression dans le localeStorage
    let idDeleted = basketRecovery[l].id;
    console.log(idDeleted)

    const productInBasket = JSON.parse(localStorage.getItem('myBasket'));
    if (productInBasket != null && productInBasket.length > 0){
      let productDeleted = productInBasket.filter(camera => {
      let isFind = camera.id !== idDeleted;
        if(isFind){
          //Traiter le prix
          let priceToRemove = basketRecovery[l].price;
          console.log(priceToRemove);
          let newPrice = totalPrice - basketRecovery[l].price;
          console.log(newPrice);
          return true;
        }

      });
      console.log(productDeleted);
      localStorage.setItem("myBasket", JSON.stringify(productDeleted));
      window.location.reload();
    }
  })
}*/


//-------------------------------------------------------------Calcul du prix total---------------------------------------------------------------//
/*let totalPriceCalcul = [];

for (let m = 0; m < basketRecovery.length; m++){
  let totalPriceInBasket = basketRecovery[m].price;

  totalPriceCalcul.push(totalPriceInBasket);
}
//Addition des prix si plusieurs produits
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const totalPrice = totalPriceCalcul.reduce(reducer,0);
console.log(totalPrice);

//Afficher le prix total
const basketDisplay = document.getElementById("divTotalPrice");
const totalPriceDisplay = `
<div id="total-price" class="total-cart-price"> Le prix total de vos achats est de : ${totalPrice}.00€</div>
`
basketDisplay.insertAdjacentHTML("beforeend", totalPriceDisplay);*/




//----------------------------------------------------------Envoie du panier et du formulaire--------------------------------------------------------//
//Fonction pour obtenir un Id de commande
function getOrderId(responseId) {
  let orderId = responseId.orderId;
  console.log(orderId);
  localStorage.setItem("orderId", orderId);
  window.location.href='../pages/confirmation.html?orderId=' + orderId;
}

//getOrderId();
//Fonction pour gérer la soumission du formulaire
 async function handleSubmit(event) {
    //Récupération des données saisie dans le formulaire
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      const lastName = data.get('lastName');
      const firstName = data.get('firstName');
      const adress = data.get('adress');
      const postCode = data.get('postCode');
      const city = data.get('city');
      const tel = data.get('tel');
      const email = data.get('email');
      const commentary = data.get('commentary');
      
        //Envoyer le panier et le contact avec la methode POST
        if(basketRecovery && basketRecovery.length > 0){
          //créer le contact
          const contact = new Contact(firstName, lastName, adress, city, postCode, tel, email, commentary);
          // On récupère les id des produits se trouvant dans le panier
          const productIdList = [];
          basketRecovery.forEach(product => productIdList.push(product.id));
          //créer la commande avec le contact et le panier
          const order = new Order (contact, productIdList);
          let response = await sendCommandToServer(order);
          getOrderId(response);
        }

          //Après faire un POST en passant la variable order
          /*const sendOrder = {
            method: "POST",
            body : JSON.stringify(order),
            headers: {
              "Accept": "Application/json",
              "Content-Type" : "application/json",
            }
          }
          fetch("http://localhost:3000/api/cameras/order", sendOrder)
          .then(response => response.json())
          .then(response => console.log(response));
          
          if (response.ok) {
            let responseId = await response.json()
            getOrderConfId(responseId);
            window.location.href='./confirmation.html/orderId=' + response.orderId;
          } else{
          console.error(error, response.status);
          }
          
        } else{
          //il faut arreter avant le processus si le panier est vide
          document.getElementById("seeBasket").addEventListener("click", function(event) {
            console.log("Merci de choisir un produit avant d'accèder à votre panier !");
            event.preventDefault();
          }, false);
        }*/
      }catch(e) {
        console.log(e);
      }
  }
async  function sendCommandToServer(order) {
      const config = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(order)
      }
      const response = await fetch("http://localhost:3000/api/cameras/order", config)
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }
      return await response.json();
 }