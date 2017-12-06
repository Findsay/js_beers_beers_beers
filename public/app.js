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
  forEachBeer(beers, getIngredients);
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

var getIngredients = function(beer){
  var ingredients = beer.ingredients;
  return ingredients;
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

  // var ingredients = beer.ingredients;




  document.body.appendChild(div);
  div.appendChild(pBeerName);
  div.appendChild(imgBeer);
  div.appendChild(pIngredients);
}



var app = function(){
  loadBeers();
}

window.addEventListener('load', app);
