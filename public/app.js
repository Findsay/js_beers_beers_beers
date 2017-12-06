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
  newLi.innerText = beer.name;
  ul.appendChild(newLi);
}

var forEachBeer = function(array, callback){
  array.forEach(function(beer){
    callback(beer);
  })
}

var app = function(){
  loadBeers();
}

window.addEventListener('load', app);
