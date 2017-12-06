var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}




var app = function(){
  loadBeers();
}

window.addEventListener('load', app);
