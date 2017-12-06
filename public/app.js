var beers;

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  beers = JSON.parse(jsonString);


  forEachBeer(beers, populateSelect);
  forEachBeer(beers, displayBeer);
}

var loadBeers = function(){
  var url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete);
}

var forEachBeer = function(array, callback){
  array.forEach(function(beer){
    callback(beer);
  })
}

var createBeerImage = function(beer){
  var newImage = document.createElement('img');
  newImage.src = beer.image_url;
  newImage.width = 50;
  newImage.height = 100;
  return newImage;
}

var getIngredientsByType = function(ingredientsArray){
  var allIngredients = [];
  ingredientsArray.forEach(function(ingredient){
    allIngredients.push(ingredient.name);
  })
  return allIngredients;
}

var createDiv = function(){
  var newDiv = document.createElement('div');
  return newDiv;
}

var createParagraph = function(text){
  var newP = document.createElement('p');
  newP.innerText = text;
  return newP;
}

var createHeader = function(type, text){
  var newHeader = document.createElement(type);
  newHeader.innerText = text;
  return newHeader;
}

var createOption = function(text){
  var option = document.createElement('option');
  option.innerText = text;
  return option;
}

var displayBeer = function(beer){
  var mainDiv = document.getElementById('beers');
  var div = createDiv();
  var hBeerName = createHeader("h3", beer.name);
  var imgBeer = createBeerImage(beer);
  var pIngredients = createParagraph("Ingredients");

  var malts = getIngredientsByType(beer.ingredients.malt);
  var string = "Malts: " + malts.join();
  var pMalts = createParagraph(string);

  var hops = getIngredientsByType(beer.ingredients.hops);
  var string = "Hops: " + hops.join();
  var pHops = createParagraph(string);

  var string = "Yeast: " + beer.ingredients.yeast;
  var pYeast = createParagraph(string);


  mainDiv.appendChild(div);
  div.appendChild(hBeerName);
  div.appendChild(imgBeer);
  div.appendChild(pIngredients);
  div.appendChild(pMalts);
  div.appendChild(pHops);
  div.appendChild(pYeast);


}

var populateSelect = function(beer){
  var select = document.getElementById('beer-select');
  var newOption = document.createElement('option');
  newOption.innerText = beer.name;
  select.appendChild(newOption);
}

var clearAllDivsFromMain = function(){
  var mainDiv = document.getElementById('beers');

  while (mainDiv.firstChild){
    mainDiv.removeChild(mainDiv.firstChild);
  }

}

var displaySelectedBeer = function(){
  var beerName = this.value;
  if(beerName === "All"){
    clearAllDivsFromMain();
    forEachBeer(beers, displayBeer);
  }else{
    var beer = findBeerByName(beerName);
    clearAllDivsFromMain();
    displayBeer(beer);
  }

}

var findBeerByName = function(name){
  return beer = beers.find(function(beer){
    return beer.name === name;
  })
}

var app = function(){
  loadBeers();

  var select = document.getElementById('beer-select');
  select.addEventListener('change', displaySelectedBeer);

}

window.addEventListener('load', app);
