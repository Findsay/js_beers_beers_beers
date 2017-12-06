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

  forEachBeer(beers, createAndAppendLiToBeerList);
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

var createImage = function(beer){
  var newImage = document.createElement('img');
  newImage.src = beer.image_url;
  newImage.width = 50;
  newImage.height = 100;
  return newImage;
}

var app = function(){
  loadBeers();
}

window.addEventListener('load', app);
