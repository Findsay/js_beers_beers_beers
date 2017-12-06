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
}


var app = function(){
  loadBeers();
}

window.addEventListener('load', app);
