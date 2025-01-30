// Charger le fichier JSON
fetch('data.json').then(function (response) {
    response.json().then(function (data) {
        console.log(data);

        // Sélection des éléments principaux du DOM
        var musicList = document.getElementById("musicList");

        // Gestion du pop-up pour les informations des musiques
        var popup = document.getElementById("popup");
        var popupTitle = document.getElementById("popupTitle");
        var popupDate = document.getElementById("popupDate");
        var popupArtist = document.getElementById("popupArtist");
        var popupFilm = document.getElementById("popupFilm");
        var popupExplication = document.getElementById("popupExplication");
        var popupAudio = document.getElementById("popupAudio");
        var popupLink = document.getElementById("popupLink");
        var closePopup = document.getElementById("closePopup");

        // Fonction pour ouvrir le pop-up avec les détails d'une musique
        function openPopup(element) {
            popupTitle.innerText = element.title;
            popupDate.innerText = "Date : " + element.date;
            popupArtist.innerText = "Artiste : " + element.artist;
            popupExplication.innerText = element.explication;
            popupAudio.innerHTML = "<audio id='audio-element' controls src='" + element.extrait + "'></audio>";
            popupLink.innerHTML = "<a href=" + element.lien + "> Écouter </a>";
            popupFilm.innerText = "Film : " + (element.film ?? "Aucun");

            // Afficher le pop-up
            popup.classList.remove("hidden");
        }

        // Ajouter un écouteur pour fermer le pop-up
        closePopup.addEventListener("click", () => {
            popup.classList.add("hidden");
            console.log("Pop-up fermé");
        });

        // Variable pour gérer l'audio en cours de lecture
        var currentAudio = null;
        var currentPlayButton = null;

        // Parcourir les données JSON et créer des éléments pour chaque musique
        data.forEach(element => {
            // Créer une section pour chaque musique
            var musicItem = document.createElement("section");
            musicItem.classList.add("music-item");
            musicItem.innerHTML =
                "<figure class='music-container'>" +
                "<img id='image' src='" + element.image + "' alt='Music image' class='music-image'>" +
                "<button class='play-button' data-audio='" + element.extrait + "'>▶</button>"  +
                "</figure>"+ 
                "<div class='music-info'>" + "<p class='titlemusique'>" + element.title + "</p>" + "<p class='circle'>+</p>" + "</div>";

            // Ajouter un écouteur d'événement pour ouvrir le pop-up via l'image
            musicItem.querySelector(".circle").addEventListener("click", () => openPopup(element));

            // Ajouter un gestionnaire pour les boutons "play"
            musicItem.querySelector(".play-button").addEventListener("click", function () {
                var audioUrl = this.getAttribute("data-audio");

                // Si on clique sur le même bouton en cours de lecture, on met en pause
                if (currentAudio && currentPlayButton === this) {
                    if (!currentAudio.paused) {
                        currentAudio.pause();
                        this.textContent = "▶";
                    } else {
                        currentAudio.play();
                        this.textContent = "⏸";
                    }
                    return;
                }

                // Si un autre audio est en cours, on le met en pause
                if (currentAudio) {
                    currentAudio.pause();
                    currentPlayButton.textContent = "▶";
                }

                // Charger et jouer le nouvel audio
                currentAudio = new Audio(audioUrl);
                currentPlayButton = this;

                currentAudio.play();
                this.textContent = "⏸";

                // Réinitialiser le bouton une fois l'audio terminé
                currentAudio.addEventListener("ended", () => {
                    this.textContent = "▶";
                    currentAudio = null;
                    currentPlayButton = null;
                });
            });

            // Ajouter l'élément à la liste des musiques
            musicList.appendChild(musicItem);
        });
    });
});

// Gestion du formulaire pour ajouter une nouvelle musique
var songTitleElement = document.getElementById('songTitle');
var anneeElement = document.getElementById('annee');
var artistElement = document.getElementById('artist');
var filmElement = document.getElementById('movie');
var descriptionElement = document.getElementById('Comment');
var musicElement = document.getElementById('musicImage');
var audioElement = document.getElementById('audio');
var lienElement = document.getElementById('SongLink');
var mailperso = document.getElementById('mail');

document.getElementById('musicDetails').addEventListener('submit', function (event) {
    // Empêcher le comportement par défaut du formulaire
    event.preventDefault();
    console.log("Soumission du formulaire interceptée !");

    // Récupérer les valeurs des champs du formulaire
    var title = songTitleElement.value;
    var date = anneeElement.value;
    var artist = artistElement.value;
    var film = filmElement.value || "Aucun";
    var explication = descriptionElement.value;

    // Récupérer les fichiers image/audio
    var image = musicElement.files[0];
    var audio = audioElement.files[0];
    var imageUrl = URL.createObjectURL(image);
    var audioUrl = URL.createObjectURL(audio);
    var lien = lienElement.value;

    // Créer un nouvel objet musique
    var newMusic = { title, date, artist, film, explication, imageUrl, audioUrl, lien };

    // Ajouter un élément HTML pour afficher la musique
    var musicList = document.getElementById('musicList');
    var musicItem = document.createElement("section");
    musicItem.classList.add("music-item");
    musicItem.innerHTML =
        "<figure class='music-container'>" +
            "<img id='image' src='" + newMusic.imageUrl + "' alt='Music image' class='music-image'>" +
            "<button class='play-button' data-audio='" + newMusic.audioUrl + "'>▶</button>"  +
        "</figure>"+ 
        "<div class='music-info'>" + 
            "<p class='titlemusique'>" + newMusic.title + "</p>" + 
            "<p class='circle'>+</p>" + 
        "</div>";

    // Ajouter un événement au clic sur l'image pour ouvrir le pop-up
    musicItem.querySelector(".circle").addEventListener("click", function () {
        openNewMusicPopup(newMusic);
    });

    // Ajouter l'élément à la liste des musiques
    musicList.appendChild(musicItem);

    // Fermer le formulaire
    document.getElementById('formOverlay').classList.add('hidden');

    // Variable pour gérer l'audio en cours de lecture
    var currentAudio = null;
    var currentPlayButton = null;
    
    // Gérer l'audio pour la nouvelle musique
    musicItem.querySelector(".play-button").addEventListener("click", function () {
        var newAudioUrl = this.getAttribute("data-audio");

        if (currentAudio && currentPlayButton === this) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                this.textContent = "▶";
            } else {
                currentAudio.play();
                this.textContent = "⏸";
            }
            return;
        }

        if (currentAudio) {
            currentAudio.pause();
            currentPlayButton.textContent = "▶";
        }

        currentAudio = new Audio(newAudioUrl);
        currentPlayButton = this;

        currentAudio.play();
        this.textContent = "⏸";

        currentAudio.addEventListener("ended", () => {
            this.textContent = "▶";
            currentAudio = null;
            currentPlayButton = null;
        });
    });
});

// Fonction pour ouvrir le pop-up avec les détails de la nouvelle musique
function openNewMusicPopup(music) {
    document.getElementById("popupNewMusicTitle").innerText = music.title;
    document.getElementById("popupNewMusicDate").innerText = "Date : " + music.date;
    document.getElementById("popupNewMusicArtist").innerText = "Artiste : " + music.artist;
    document.getElementById("popupNewMusicFilm").innerText = "Film : " + (music.film ?? "Aucun");
    document.getElementById("popupNewMusicDescription").innerText = music.explication;

    var audioElement = document.getElementById("popupNewMusicAudio");
    audioElement.src = music.audioUrl;

    var linkElement = document.getElementById("popupNewMusicLink");
    linkElement.href = music.lien;
    linkElement.innerText = "Écouter";

    // Afficher le pop-up
    document.getElementById("newMusicPopup").classList.remove('hidden');
}

// Ajouter un gestionnaire pour fermer le pop-up de la nouvelle musique
document.getElementById("closeNewMusicPopup").addEventListener("click", function () {
    document.getElementById("newMusicPopup").classList.add('hidden');
});

// Gestion des boutons pour ouvrir et fermer le formulaire
document.getElementById("FormButton").addEventListener("click", function () {
    document.getElementById("formOverlay").classList.remove("hidden");
});

document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("formOverlay").classList.add("hidden");
});





// Gestion des boutons pour les sections Mentions Légales, Droits d'Auteur et Protection des Données
var btnLegal = document.getElementById("btn-legal");
if (btnLegal) {
    btnLegal.addEventListener("click", function () {
        var legalSection = document.getElementById("legal");
        if (legalSection) {
            if (legalSection.style.display === "block") {
                legalSection.style.display = "none";
                btnLegal.textContent = "Mentions légales ▼";
            } else {
                legalSection.style.display = "block";
                btnLegal.textContent = "Mentions légales ▲";
            }
        }
    });
}

var btnCopyright = document.getElementById("btn-copyright");
if (btnCopyright) {
    btnCopyright.addEventListener("click", function () {
        var copyrightSection = document.getElementById("copyright");
        if (copyrightSection) {
            if (copyrightSection.style.display === "block") {
                copyrightSection.style.display = "none";
                btnCopyright.textContent = "Droits d'auteur ▼";
            } else {
                copyrightSection.style.display = "block";
                btnCopyright.textContent = "Droits d'auteur ▲";
            }
        }
    });
}

var btnData = document.getElementById("btn-data");
if (btnData) {
    btnData.addEventListener("click", function () {
        var dataSection = document.getElementById("data-protection");
        if (dataSection) {
            if (dataSection.style.display === "block") {
                dataSection.style.display = "none";
                btnData.textContent = "Protection des données ▼";
            } else {
                dataSection.style.display = "block";
                btnData.textContent = "Protection des données ▲";
            }
        }
    });
}



//Envoie les données
var saveButton = document.querySelector('[type="button"]');

saveButton.addEventListener('click', function(event){
    event.preventDefault();
    var apiUrl = "http://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=sirot&courriel="
    + mailperso.value
    + "&message=" + songTitleElement.value 
    + anneeElement.value
    + artistElement.value
    + filmElement.value
    + descriptionElement.value
    + musicElement.value
    + audioElement.value
    + lienElement.value;
    console.log('URL générée :', encodeURI(apiUrl));

        // Fermer le formulaire
    document.getElementById('formOverlay').classList.add('hidden');

    // Réinitialiser le formulaire
    document.getElementById('musicDetails').reset(); 

    var successMessage = document.getElementById("successMessage");
    var errorMessage = document.getElementById("errorMessage");

    // API
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data){
            console.log("Réponse reçue : ")
            console.log(data);
        })
        if (response.ok) {
            // Si la réponse est un succès
            successMessage.style.display = "block";
            errorMessage.style.display = "none";
            form.reset(); // Réinitialiser le formulaire après succès
        } else {
            // Si la réponse contient une erreur
            successMessage.style.display = "none";
            errorMessage.style.display = "block";
        }
    })
})    


