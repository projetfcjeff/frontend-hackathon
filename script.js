//ID button : searchBtn

//Récupération des éléments clés de l'UI
const searchBtn = document.querySelector('#searchBtn')


const patternDepArr = /^(?!.*\s{2})[a-z]+(?:-[a-z]+|\s+[a-z]+)*$/i;
const patternDat = /^\d{4}-\d{2}-\d{2}$/
const url = ('http://localhost:3000/trips/')

//Positionne un écouteur sur le bouton recherche
searchBtn.addEventListener('click', ()=> {
    //Recuperation des valeurs saisies dans les champs
    document.querySelector('#inputArr').style.borderColor = 'black';
    document.querySelector('#inputDep').style.borderColor = 'black';
    document.querySelector('#inputDat').style.borderColor = 'black';

    const inputDep = document.querySelector('#inputDep').value
    const inputArr = document.querySelector('#inputArr').value
    const inputDat = document.querySelector('#inputDat').value
    console.log(inputDat)
    //Test sur les valeurs saisie dans les champs
    if (!(patternDepArr.test(inputDep)))
    {
        document.querySelector('#inputDep').style.borderColor = 'red';
        return alert('Vérifiez le format des champs saisis')
    }
    if (!(patternDepArr.test(inputArr)))
    {
        document.querySelector('#inputArr').style.borderColor = 'red';
        return alert('Vérifiez le format des champs saisis')
    }
    if (!(patternDat.test(inputDat)))
    {
        document.querySelector('#inputDat').style.borderColor = 'red';
        return alert('Vérifiez le format des champs saisis')
    }
    
    // Création de la chaîne de requête en ajoutant les paramètres d'URL
var queryString = new URLSearchParams({
    departure: inputDep,
    arrival: inputArr,
    date: inputDat
  }).toString();
  console.log(queryString)
  
  // Construction de l'URL complète avec les paramètres de requête
  var url = "http://localhost:3000/trips/?" + queryString;
  
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

 //TODO mettre à jour la div pour ajouter les cartes de trajet
 //TODO mettre à jour la div pour changer l'image de résultat

})