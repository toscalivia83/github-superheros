// ========================================
// 🎯 INSTRUCTIONS
// ========================================
// 1. Changez l'ID du héros ci-dessous
// 2. Personnalisez l'affichage HTML
// 3. Ajoutez du CSS dans index.html si vous voulez
// 4. Faites des commits réguliers !
// ========================================

const heroId = 370; // 👈 L'ID du Joker !
// Note: Certains ID peuvent varier selon l'API. Si 370 ne marche pas, essayez 372.

// **CORRECTION ICI :** Utiliser une seule variable pour le token.
// C'est la ligne la plus importante : REMPLACEZ VOTRE TOKEN ENTRE GUILLEMETS.
const myToken = "6570e44801f81594f8a913d3e21be5ab"; // 👈 Votre TOKEN réel
const apiUrl = `https://superheroapi.com/api.php/${myToken}/${heroId}`;

const heroInfoDiv = document.getElementById('hero-info');

// ----------------------------------------------------
// Fonction d'affichage statique en cas d'échec de l'API
// ----------------------------------------------------
function afficherPresentationStatique(detailsErreur) {
    const staticPresentation = `
        <div class="hero-card static-joker">
            <h2>🤡 Le Joker : Le Clown Prince du Crime 🃏</h2>
            <img src="https://via.placeholder.com/250x300/7950a4/FFFFFF?text=JOKER" alt="Image du Joker (Statique)" height="250">
            
            <h3>Avis de Recherche : Risque Extrême</h3>
            <p><strong>Alias :</strong> Nom réel inconnu (souvent Jack Napier ou Arthur Fleck).</p>
            <p><strong>Éditeur :</strong> DC Comics</p>
            <p><strong>Motivation :</strong> Semer le chaos, prouver l'absurdité de l'existence et briser Batman.</p>
            
            <p style="color: red; font-weight: bold;">⚠️ Erreur API ou Token : ${detailsErreur}. Affichage d'une fiche statique.</p>
        </div>
    `;
    heroInfoDiv.innerHTML = staticPresentation;
}


// Récupérer les données du héros avec fetch()
fetch(apiUrl)
    .then(response => {
        // Vérifie si la réponse est OK (statut 200)
        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Vérifie si les données sont bien présentes et non une erreur de l'API (ex: mauvais token)
        if (data.error || data.response === "error") {
            // Appelle la fonction statique avec le message d'erreur de l'API
            afficherPresentationStatique(data.error || "Réponse non reconnue"); 
            return;
        }

        // Utilise le proxy pour l'image
        const heroImageUrl = "https://corsproxy.io/?" + encodeURIComponent(data.image.url);

        // Crée le contenu HTML à afficher
        const htmlContent = `
            <div class="hero-card">
                <h2>${data.name}</h2>
                <img src="${heroImageUrl}" alt="${data.name}" height="250">
                <p><strong>Nom complet :</strong> ${data.biography['full-name'] || 'Inconnu'}</p>
                <p><strong>Éditeur :</strong> ${data.biography.publisher}</p>
                
                <h3>Statistiques (Le Joker) :</h3>
                <p><strong>Intelligence :</strong> ${data.powerstats.intelligence}/100</p>
                <p><strong>Force :</strong> ${data.powerstats.strength}/100</p>
                <p><strong>Combat :</strong> ${data.powerstats.combat}/100</p>
            </div>
        `;

        // Injecte le contenu dans la div
        heroInfoDiv.innerHTML = htmlContent;
    })
    .catch(error => {
        // Gère les erreurs de réseau (ex: pas d'internet)
        afficherPresentationStatique(error.message);
        console.error("Erreur de récupération des données :", error);
    });