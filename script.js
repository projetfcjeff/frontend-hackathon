//ID button : searchBtn

//Récupération des éléments clés de l'UI
const searchBtn = document.querySelector('#searchBtn')


const patternDepArr = /^(?!.*\s{2})[a-z]+(?:-[a-z]+|\s+[a-z]+)*$/i;
const patternDat = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/
const url = ('http://localhost:3000/trips/')

//Positionne un écouteur sur le bouton recherche
searchBtn.addEventListener('click', ()=> {
    //Recuperation des valeurs saisies dans les champs
    const inputDep = document.querySelector('#inputDep').value
    const inputArr = document.querySelector('#inputArr').value
    const inputDat = document.querySelector('#inputDat').value
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
    
    //Appel de la route GET/trips pour récupérer les voyages correspondant aux critères de recherche
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("departure", inputDep);
    urlencoded.append("arrival", inputArr);
    urlencoded.append("date", inputDat);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/trips/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result)) //TODO mettre à jour la div pour ajouter les cartes de trajet
    .catch(error => console.log('error', error)); //TODO mettre à jour la div pour changer l'image de résultat

})