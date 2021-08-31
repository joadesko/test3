//---------------------------------------Récupération des caméras de l'API avec l'id-----------------------------------------//

//Création d'une variable pour la caméra sélectionné
let selectedCamera;

//Récupération de l'id du produit
function getCamera() { 
  const cameraId = new URL(location.href).searchParams.get("id");
  const url = `http://localhost:3000/api/cameras/${cameraId}`;
  fetch(url)
  .then((httpBodyResponse) => httpBodyResponse.json())
    .then((camera) =>{
      selectedCamera = camera;
      console.log(camera);
      hydratePage();
      })
        .catch((error) => {
          alert(error)
        });  
}

//Faire appel à la fonction
getCamera();

//Hydrater la page
function hydratePage() {
  if(selectedCamera){
    let mainContainerProduct = document.getElementById('cardProduct');
    mainContainerProduct.innerHTML = buildCameraProduct(selectedCamera); 
    buildCameraLensesSelectList(selectedCamera.lenses);
  }
}

//--------------------------------------------Ajout de la caméra au panier------------------------------------------------//
function addProductToLocalStorage (event){
  event.preventDefault();

  let selectLenses = document.getElementById("cameraLenses");
  console.log('Lense selectionné == > ' + selectLenses.value);

  const quantity = document.getElementById("plusOrMinusClick").valueAsNumber;
  console.log(quantity);

  //récupérer les données sélectionnées
  const productAdd = {
      imageUrl: selectedCamera.imageUrl,
      id: selectedCamera._id,
      name: selectedCamera.name,
      price: (selectedCamera.price / 100)*quantity,
      lense: selectLenses.value,
      quantity
  }
  console.log(productAdd);

  //envoyer les données sélectionnées au localStorage
  let basket = JSON.parse(localStorage.getItem('myBasket'));
  //vérifier si le panier est existe 
  //si le panier n'existe pas on initialise avec un array vide
  if (!basket){ 
    basket = [];
  }

  //Vérifier l'existence sélectionné par l'utilisateur dans le localStorage
  const add2Product = basket.find(product => product.id === productAdd.id);
  if (add2Product){
    add2Product.quantity = add2Product.quantity + productAdd.quantity;
    add2Product.price = add2Product.price + productAdd.price;
    /*basket.push(add2Product);*/
  }else{
    basket.push(productAdd);
  }

  localStorage.setItem('myBasket', JSON.stringify(basket));
}

//sélection du bouton ajouter le produit au panier
//const btn_addCart = document.querySelector("#add_product_to_basket");

//écouter le bouton et envoyer le panier
/*btn_addCart.addEventListener("click", (event) =>{
  event.preventDefault();

});*/