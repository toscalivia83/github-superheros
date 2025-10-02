// ========================================
// 🎯 INSTRUCTIONS
// ========================================
// 1. Changez l'ID du héros ci-dessous
// 2. Personnalisez l'affichage HTML
// 3. Ajoutez du CSS dans index.html si vous voulez
// 4. Faites des commits réguliers !
// ========================================

const heroId = 620; // 👈 CHANGEZ CET ID !

// Liste des IDs disponibles :
// Spider-Man: 620, Batman: 70, Iron Man: 346, Superman: 644
// Wonder Woman: 720, Hulk: 332, Thor: 659, Flash: 263
const myToken = ""; // Ajoutez le token donné dans le cours
const apiUrl = `https://superheroapi.com/api.php/${myToken}/${heroId}`;

// Récupérer les données du héros
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Voir toutes les données dans la console
        
        // Afficher les informations de base dans le HTML
        const heroInfo = document.getElementById('hero-info');
        heroInfo.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${data.image.url}" alt="${data.name}" width="300">
            <p><strong>Nom complet :</strong> ${data.biography['full-name']}</p>
            <p><strong>Éditeur :</strong> ${data.biography.publisher}</p>
            <p><strong>Intelligence :</strong> ${data.powerstats.intelligence}/100</p>
            <p><strong>Force :</strong> ${data.powerstats.strength}/100</p>
        `;
    })
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('hero-info').innerHTML = 
            '<p style="color: red;">Erreur de chargement des données</p>';
    });