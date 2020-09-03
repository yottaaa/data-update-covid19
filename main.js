var ourRequest = new XMLHttpRequest();
var totalNumberFormat = new Intl.NumberFormat('en-US');
ourRequest.open('GET', 'https://corona.lmao.ninja/v2/countries', true);
ourRequest.onload = function(){
    let data = JSON.parse(ourRequest.responseText);
    let totalCases = 0;
    let totalDeaths = 0;
    let totalRecovery = 0;

    for(i = 0; i < data.length; i++){
        totalCases = totalCases + data[i].cases;
        totalDeaths = totalDeaths + data[i].deaths;
        totalRecovery = totalRecovery + data[i].recovered;
    }
    
    document.getElementById("total-cases").innerHTML = totalNumberFormat.format(totalCases);
    document.getElementById("total-deaths").innerHTML = totalNumberFormat.format(totalDeaths);
    document.getElementById("total-recov").innerHTML = totalNumberFormat.format(totalRecovery);
    
    var dataSorted = data.sort((a,b) => Number(b.cases) - Number(a.cases));
    document.getElementById("data-country").innerHTML = dataSorted[0].country;
    document.getElementById("data-cases").innerHTML = totalNumberFormat.format(dataSorted[0].cases);
    document.getElementById("data-Tcases").innerHTML = totalNumberFormat.format(dataSorted[0].todayCases);
    document.getElementById("data-deaths").innerHTML = totalNumberFormat.format(dataSorted[0].deaths);
    document.getElementById("data-Tdeaths").innerHTML = totalNumberFormat.format(dataSorted[0].todayDeaths);
    document.getElementById("data-recovered").innerHTML = totalNumberFormat.format(dataSorted[0].recovered);
    document.getElementById("data-active").innerHTML = totalNumberFormat.format(dataSorted[0].active);
    document.getElementById("data-critical").innerHTML = totalNumberFormat.format(dataSorted[0].critical);
    document.getElementById("data-test").innerHTML = totalNumberFormat.format(dataSorted[0].tests);
};

var searchInput = document.getElementById("search-txt");
var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", addAnimation);
searchBtn.addEventListener("click", changeData);
searchBtn.addEventListener("mouseout", removeAnimation);
searchBtn.addEventListener("touchend", removeAnimation);

searchInput.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        addAnimation();
        changeData();
        searchInput.blur();
    }
});
searchInput.addEventListener("click", function(event){
        removeAnimation();
});

function changeData(){
    let searchCountry = JSON.parse(ourRequest.responseText);
    let inputCountry = document.getElementById("search-txt").value;
    let el;
    for(el = 0; el < searchCountry.length; el++){
        if(searchCountry[el].country === inputCountry){
            break;
        }
    }
    document.getElementById("data-country").innerHTML = searchCountry[el].country;
    document.getElementById("data-cases").innerHTML = totalNumberFormat.format(searchCountry[el].cases);
    document.getElementById("data-Tcases").innerHTML = totalNumberFormat.format(searchCountry[el].todayCases);
    document.getElementById("data-deaths").innerHTML = totalNumberFormat.format(searchCountry[el].deaths);
    document.getElementById("data-Tdeaths").innerHTML = totalNumberFormat.format(searchCountry[el].todayDeaths);
    document.getElementById("data-recovered").innerHTML = totalNumberFormat.format(searchCountry[el].recovered);
    document.getElementById("data-active").innerHTML = totalNumberFormat.format(searchCountry[el].active);
    document.getElementById("data-critical").innerHTML = totalNumberFormat.format(searchCountry[el].critical);
    document.getElementById("data-test").innerHTML = totalNumberFormat.format(searchCountry[el].tests);
    searchInput.value = "";
}

function removeAnimation(){
    document.getElementById("line").classList.remove("line-shrink");
}
function addAnimation(){
    document.getElementById("line").classList.add("line-shrink");
}

ourRequest.send();


