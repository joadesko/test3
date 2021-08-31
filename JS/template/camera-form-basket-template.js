//------------------------------------------------Structure du formulaire------------------------------------//
const form = () => {

    const positionForm = document.getElementById("form");

    const structureFormulaire = `
    <form name="orderForm" class="form-order" onsubmit="handleSubmit(event)" role="search" aria-label="Formulaire" id="orderForm">
        <h4 class="formTitle">Merci de complèter ce formulaire pour valider la commande :</h4>
            <div class="input-form">
                <div class="name">
                    <input type="text" id="lastName" name="lastName" class="contact" pattern="[A-Z][A-Za-z' -]+" title="Votre nom de famille" placeholder="Nom" aria-labelledby="Nom" required>
                    <input type="text" id="firstName" name="firstName" class="contact" pattern="[A-Z][A-Za-z' -]+" title="Votre prénom" placeholder="Prénom" aria-labelledby="Prénom" required>
                </div>
                <div class="address">
                    <input type="text" id="adress" name="adress" class="contact-address" minlength="5" title="Votre adresse postale" placeholder="Adresse" aria-labelledby="Adresse" required>
                </div>
                <div class="cp">
                    <input type="text" id="postCode" name="postCode" class="contact" pattern="([A-Z]+[A-Z]?\-)?[0-9]{1,2} ?[0-9]{3}" title="Le code postale" placeholder="Code Postale" aria-labelledby="Code Postale" required>
                    <input type="text" id="city" name="city" class="contact" pattern="[A-Z][A-Za-z' -]+" title="La ville" placeholder="Ville" aria-labelledby="Ville" required>
                </div>
                <div class="tel-mail">
                    <input type="tel" id="tel" name="tel" class="contact-tel" pattern="0[1-9][0-9]{8}" max-lenght="10" title="Merci de nous communiquer votre numéro de téléphone" placeholder="Téléphone" aria-labelledby="Téléphone" required>
                    <input type="email" id="email" name="email" class="contact-mail" title="Merci de nous communiquer votre adresse mail"  placeholder="E-mail" required>
                </div>
                <div class="commentary">
                    <textarea type="text" id="commentary" name="commentary" class="commentary" maxlength="200" title="Informations complémentaires" placeholder="Informations complémentaires à la livraison" aria-labelledby="Informations complementaires"></textarea>
                </div>
            </div>
            <!--Bouton validé la commande-->
            <div class="btn-basket" role="button" aria-label="Bouton" tabindex="0">
                <button type="submit" id="validOrder" class="button">Validé la commande</button>
            </div>
    </form>
    `;

    positionForm.insertAdjacentHTML("afterend", structureFormulaire);

};

form();


//--------------------------------------------Validation des champs du formulaire-----------------------------------------//


//---------------------------------------------Vérification de l'adresse mail---------------------------------------------//
/*let email = document.getElementById("input-mail");
email.invalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		if (e.target.value.length == 0) {
e.target.setCustomValidity("Ce champ est obligatoire");
		} else {
e.target.setCustomValidity
alert("Entrez une adresse valide. Exemple : contact@nom.com");
		}
	}
};*/