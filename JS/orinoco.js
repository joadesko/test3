// Dans ce fichier, on récupère la liste des caméras de l'api
// et on affiche sur la page 

// Fonction permettant de récupérer la liste de produit du serveur
async function loadCameras() {
  const response = await fetch('http://localhost:3000/api/cameras');
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
  }
  return await response.json();
};

// Fonction exécuter au chargement de la page
(async function onPageload() {
  try {
    //On récupère la liste de caméras du serveur
    let cameras = await loadCameras();
    displayCameras(cameras);

  } catch(e) {
    console.log(e);
  }
})();

// Fonction qui prend en paramètre la liste de caméras récupérés du serveur et 
// crée un objet caméra qui est ajouté dans une card boostrap 
// l'objet caméra est créé à partir de la classe camera définie dans le fichier du fichier camera.js
function displayCameras(cameras) {
  //document.getElementById('productsList').innerHTML = '';
  let mainContainer = document.getElementById('productsList');
  

  cameras.forEach((camera) => {
    mainContainer.innerHTML += buildCamera(new Camera(camera));
  })
}