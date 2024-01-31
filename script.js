//Mise à jour de la homepage en page de la recherche effectuée

//Récupération des éléments clés de l'UI
const searchBtn = document.querySelector('#searchBtn')
const imgResult = document.querySelector('#picTrain')
const txtResult = document.querySelector('#txtBlock2')

//-------- 1. Test de la cohérence des champs saisis -----------------------------------------
//Definition des patterns regex utilisés pour vérifier la cohérence des inputs des champs texte
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
    
//-------- 2. Appel de la route trips du BE pour récupérer les data de la BDD correspondants aux inputs de recherche ---
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
    .then(result => 
        {
            console.log(result)
            if (result.result)
            {
                console.log(result)
            }
            else 
            {
                console.log(result.result)
                imgResult.innerHTML = `<img src="./images/notfound.png" alt="" srcset="" />`
                txtResult.textContent = `No trip found`
            }
        }) //Todo passer en variable le texte - error text de la route


// ------- 4. Mise à jour de l'image de la div #picTrain de droite de la HP pour retourner une absence de resultat ----------
   
    });

 //TODO mettre à jour la div pour ajouter les cartes de trajet
 