//-----------------------------------------Récupération de l'id de la commande sur le localStorage----------------------------------------//
const orderIdRecovery = localStorage.getItem('orderId');
console.log(orderIdRecovery);

//Affichage de la structure HTML de l'id de commande
const orderIdDisplay = () => {

    const positionOrderId = document.getElementById("order-id-display");

    const structureOrderId = `
    <p class="pIdOrder" tabindex="0">Numéros de votre commande :<strong>${orderIdRecovery}</strong></p>
    `;

    positionOrderId.insertAdjacentHTML("afterend", structureOrderId);

};

orderIdDisplay();

