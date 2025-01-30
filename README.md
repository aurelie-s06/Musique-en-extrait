# Sélections musicales
SAÉ 1.05 - Produire un site web

## URL du site web 
Le site est hébergé sur le serveur o2switch et accessible à l’adresse suivante :  
[http://sirot.projetsmmichamps.fr/sae105]

## Description du projet  
Ce projet consiste à créer une page web interactive présentant une sélection de cinq morceaux de musique. Chaque section contient :  
- Un titre du morceau.  
- Une explication personnelle du choix.  
- Un extrait audio de 15 secondes maximum.  
- Une image d’illustration optimisée.  
- Un lien vers une plateforme de streaming pour écouter le morceau complet.  

Le site inclut également :  
- Un formulaire permettant aux utilisateurs de proposer des morceaux, avec une prévisualisation avant soumission.  
- Un pied de page interactif pour les crédits. 

## Fonctionnalités principales  
- Site one-page optimisé pour une largeur > 1024 pixels.  
- Chargement des données dynamiques à partir d’un fichier JSON avec un script en Javascript.  
- Formulaire contributif permettant de proposer des morceaux.  
- Extraits audio intégrés limités à 15 secondes pour chaque morceau.

## Arborescence du projet 
/sae105/ :
    README.md *Documentation du projet*
    index.html *Page principale du site*
    data.JSON *Fichier contenant les données des morceaux*
    styles/ :
        styles.css *Feuille de style CSS*
    script/ :
        main.js *Script Javascript principal*
    images/ : *Répertoire contenant les images optimisées*
        Fond.jpg
        Coco-img.jpg
        Raiponce-img.jpg
        Collabo.jpeg
        Vaiana.jpeg
        Samba-do-Brasil-img.jpg
        Icone-formulaire.png
    audio/ : *Répertoire contenant les extraits audio de 15 secondes*
        la-llorona.mp3
        kingdom-dance.mp3
        collabo.mp3
        Vaiana_musique.mp3
        samba-do-brasil.mp3

## Tableur Opquast  
Vous pouvez consulter le tableau des règles Opquast appliquées à ce projet ici :  
[https://docs.google.com/spreadsheets/d/1Rv3zzETU7eM-vj3PBAlS_EKEzUqrJvVnxmBRXShyRKY/edit?usp=sharing]  

## Installation sur un Serveur Local (XAMPP)  
Pour installer le projet sur un serveur local avec XAMPP, suivez ces étapes :  

1. *Téléchargez l’archive ZIP* : Téléchargez le dossier contenant les fichiers du projet et décompressez-les sur l'ordinateur.  

2. *Déplacez les fichiers* :  
   - Copiez le dossier "sae105" dans le répertoire "htdocs" de votre installation XAMPP.  

3. *Démarrez le serveur local* :  
   - Lancez le panneau de contrôle XAMPP.  
   - Démarrez les modules "Apache" et "MySQL".  

4. *Accédez au projet* :  
   - Ouvrez votre navigateur et accédez à l’URL suivante :  
     [http://localhost/sae105/index.html]
      
## Contributeurs  
- Philippe Gambette (R1.13 Développement Web)  
- Matthieu Berthet (R1.15 Hébergement)  
- Gaëlle Charpentier (R1.11 Intégration)  

Merci à l’équipe enseignante pour leur accompagnement dans ce projet !  
