//ID button : searchBtn

//Récupération des éléments clés de l'UI
const searchBtn = document.querySelector('#searchBtn')


const patternDepArr = /^(?!.*\s{2})[a-z]+(?:-[a-z]+|\s+[a-z]+)*$/i;
const patternDat = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/

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
    }
    if (!(patternDepArr.test(inputArr)))
    {
        document.querySelector('#inputArr').style.borderColor = 'red';
    }
    if (!(patternDat.test(inputDat)))
    {
        document.querySelector('#inputDat').style.borderColor = 'red';
    }
    
})