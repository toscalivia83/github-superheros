
const heroId = 107; 
const apiUrl = `https://superheroapi.com/api.php/6570e44801f81594f8a913d3e21be5ab/${heroId}`;

const heroContainer = document.getElementById('hero-info'); 


async function fetchHeroData() {
    heroContainer.innerHTML = '<p>Chargement des données...</p>';

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - Vérifiez la connexion ou l'URL.`);
        }
        
        const data = await response.json();

        if (data.response === 'error') {
            throw new Error(`Erreur API: ${data.error}`);
        }

        const heroImageUrl = "https://corsproxy.io/?" + encodeURIComponent(data.image.url);
        
        const htmlContent = `
            <h2>${data.name}</h2>
            <img src="${heroImageUrl}" alt="${data.name} image" style="width: 250px; border: 2px solid red;">
            
            <h3>Biographie</h3>
            <p><strong>Nom Complet:</strong> ${data.biography['full-name']}</p>
            <p><strong>Éditeur:</strong> ${data.biography.publisher}</p>
            <p><strong>Lieu de Naissance:</strong> ${data.biography['place-of-birth']}</p>

            <h3>Statistiques de Pouvoir</h3>
            <ul>
                <li>Intelligence: ${data.powerstats.intelligence}/100</li>
                <li>Force: ${data.powerstats.strength}/100</li>
                <li>Vitesse: ${data.powerstats.speed}/100</li>
                <li>Combat: ${data.powerstats.combat}/100</li>
            </ul>
        `;
        
        heroContainer.innerHTML = htmlContent;

    } catch (error) {
        console.error('Erreur de chargement:', error);
        heroContainer.innerHTML = `<p style="color: red;">Erreur: Impossible d'afficher les données du héros. (${error.message})</p>`;
    }
}

fetchHeroData();