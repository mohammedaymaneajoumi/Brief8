///////////////////////////send data
let data;
let xhr = new XMLHttpRequest();
xhr.open("GET", "movies.json");

xhr.onload = function() {
//ready state  => the status of the request
//[0] request not initialized
//[1] server  connection established
//[2] request recieved
//[3] processing request 
//[4] request s finished and response is ready 

//status => response status code 
//[200] ok
//[404] not found 

//console.log(this.reposetext)all file as tring
//console.log(this.responseText);

//as object to could find each string easy
data = JSON.parse(this.responseText);
afficher(data);
}

xhr.send();
//////////////////////////////////search
document.getElementById('btnSearch').onclick = recherche;
function recherche() {
    var searchValue = document.getElementById('searchIN').value;
    if (searchValue == "") {
        afficher(data);
    } else {
        for (var k = 0; k < searchValue.length; k++) {
            var filteredData = data.filter(function (item) {
                return item.titreDeFilm.toLowerCase()[k] == searchValue.toLowerCase()[k];
            });
            afficher(filteredData);
        }
    }
};
/////////////////////////////////sort
    document.getElementById('triTit').onchange = function(){
        let triLIst = document.getElementById('triTit').value;
        if (triLIst == "1"){
            data.sort((a,b) => b.titreDeFilm.localeCompare(a.titreDeFilm))
            afficher(data);
        }
        else if (triLIst == "2"){
            data.sort((a,b) => a.titreDeFilm.localeCompare(b.titreDeFilm))
            afficher(data);
        }
        else if (triLIst == "3"){
            data.sort((a,b) => a.durée.localeCompare(b.durée))
            afficher(data);
        }
        else if (triLIst == "4"){
            data.sort((a,b) => b.durée.localeCompare(a.durée))
            afficher(data);
        }
        else if (triLIst == "5"){
            data.sort((a,b) => b.LannéeDeProduction - a.LannéeDeProduction)
            afficher(data);
        }
        else if (triLIst == "6"){
            data.sort((a,b) => a.LannéeDeProduction - b.LannéeDeProduction)
            afficher(data);
        }
        else {
            afficher(data);
        }
    }

/////////////////////////////// afficher data dans html
function afficher(data){
    document.getElementById('tbody').innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
    
        let td1 = document.createElement('td');
        td1.append(i+1)
        tr.append(td1);
    
        ///////le poster
        let poster = document.createElement('img');
        poster.setAttribute('src',data[i].poster)
        poster.style.width = "70px"
        let td2 = document.createElement('td')
        td2.append(poster)
        tr.append(td2)
    
        //////le titre de film
        let titreDeFilm = document.createElement('td');
        titreDeFilm.append(data[i].titreDeFilm)
        tr.append(titreDeFilm);
    
        ////le réalisateur
        let réalisateur = document.createElement('td');
        réalisateur.append(data[i].réalisateur)
        tr.append(réalisateur);
    
        /////La durée
        let durée = document.createElement('td');
        durée.append(data[i].durée)
        tr.append(durée);
    
        /////année De Production
        let annéeDeProduction = document.createElement('td');
        annéeDeProduction.append(data[i].annéeDeProduction)
        tr.append(annéeDeProduction);
    
        /////Les festivals
        let festvUl = document.createElement('ul');
        let tdfes = document.createElement('td')
    
            for (const festivalList of data[i].festivals) {
    
                let festvLi = document.createElement('li');
                festvLi.append(festivalList);
                festvUl.append(festvLi);
            }
            tdfes.append(festvUl);
            tr.appendChild(tdfes);
        
            ////les Acteurs 
            let ActeurUl = document.createElement('ul');
            let tdAct= document.createElement('td')
            for (const ActeurlList of data[i].Acteur) {
    
                let ActeurLi = document.createElement('li');
                ActeurLi.append(ActeurlList.nom + " " + ActeurlList.prénom + " " + ActeurlList.nationalité);
                tdAct.append(ActeurLi);
            }
            tdAct.append(ActeurUl);
            tr.appendChild(tdAct);
    
            document.querySelector('tbody').appendChild(tr);
        //mathode
        // let td1 = document.createElement('td');
        // td1.append(data[i].poster)
        // tr.append(td1);
    }
};



