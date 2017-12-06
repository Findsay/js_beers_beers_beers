var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var beers = JSON.parse(jsonString);

  forEachBeer(beers, displayBeer);

  debugger;
}

var loadBeers = function(){
  var url = "https://api.punkapi.com/v2/beers"
  makeRequest(url, requestComplete);
}

var createAndAppendLiToBeerList = function(beer){
  var ul = document.getElementById('beer-list');
  var newLi = document.createElement('li');
  var newP = document.createElement('p');

  newP.innerText = beer.name;
  newLi.appendChild(newP);

  var image = createImage (beer);
  newLi.appendChild(image);

  ul.appendChild(newLi);
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

var displayBeer = function(beer){
  var div = createDiv();
  var pBeerName = createParagraph(beer.name);
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


  document.body.appendChild(div);
  div.appendChild(pBeerName);
  div.appendChild(imgBeer);
  div.appendChild(pIngredients);
  div.appendChild(pMalts);
  div.appendChild(pHops);
  div.appendChild(pYeast);


}



var app = function(){
  loadBeers();
}

window.addEventListener('load', app);
