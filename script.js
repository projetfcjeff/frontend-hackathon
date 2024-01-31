//Mise à jour de la homepage en page de la recherche effectuée

//-------- 1. Test de la cohérence des champs saisis -----------------------------------------
//Definition des patterns regex utilisés pour vérifier la cohérence des inputs des champs texte
const patternDepArr = /^(?!.*\s{2})[a-z]+(?:-[a-z]+|\s+[a-z]+)*$/i;
const patternDat = /^\d{4}-\d{2}-\d{2}$/
const url = ('http://localhost:3000/trips/')

//Positionne un écouteur sur le bouton recherche
searchBtn.addEventListener('click', ()=> {
    //Récupération des éléments clés de l'UI
    const searchBtn = document.querySelector('#searchBtn')
    const imgResult = document.querySelector('#picTrain')
    const txtResult = document.querySelector('#txtBlock2')
    const block2 = document.querySelector('#block2')
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
            // console.log(result)
//----------3. MAJ liste des voyages -------------------------------------------------------------------
            if (result.result)
            {
                block2.innerHTML =''
                for (let res of result.result)
                {
                    let date = new Date(res.date)
                    block2.innerHTML += `<div class="tripRes">
                    <div class="tripContent tripDepArr">${res.departure} > ${res.arrival}</div>
                    <div class="tripContent tripDate">${date.getHours()}:${date.getMinutes()}</div>
                    <div class="tripContent tripPrice">${res.price}€</div>
                    <div class="tripContent">
                        <button class="btnBook">Book</button>
                    </div>`
                }
                block2.classList.add('tripResContainerDyn');
            
                const buttonsBook = document.querySelectorAll('.btnBook')

                for (let buttonBook of buttonsBook){
                    buttonBook.addEventListener('click', function () 
                    {
                        // console.log((this.parentNode.parentNode).querySelector('.tripPrice').textContent)

                        
                        let depFinal = inputDep
                        let arrFinal = inputArr
                        let pricSelec = (this.parentNode.parentNode).querySelector('.tripPrice').textContent
                        pricFinal = pricSelec.replace(/\D/g, "");
                        console.log(pricFinal)

                        let myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                        let urlencoded = new URLSearchParams();
                        urlencoded.append("departure", inputDep);
                        urlencoded.append("arrival", inputArr);
                        urlencoded.append("price", pricFinal);
                        urlencoded.append("date", "2024-01-31");

                        var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: urlencoded,
                        redirect: 'follow'
                        };

                        fetch("http://localhost:3000/selections/", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            console.log(result)
                            window.location.href = "./cart/cart.html"
                        })
                        .catch(error => console.log('error', error));

                    })
                }
            
            }
// ------- 4. Mise à jour de l'image de la div #picTrain de droite de la HP pour retourner une absence de resultat ---------- 
            else 
            {
                console.log(result.result)
                block2.innerHTML = `<div id="block2">
                <div id="picTrain">
                  <img src="./images/notfound.png" alt="" srcset="" />
                </div>
                <hr />
                <div id="txtBlock2">No trip found.</div>
                </div>
              </div>`
                // imgResult.innerHTML = `<img src="./images/notfound.png" alt="" srcset="" />`
                // txtResult.textContent = `No trip found`
            }
        }) //Todo passer en variable le texte - error text de la route 
    });



