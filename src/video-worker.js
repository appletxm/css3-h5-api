function goGetVideoData(url) {
  var drawData = []
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function(){
    drawData = JSON.parse(xhr.responseText)
    postMessage(drawData)
  };
  xhr.send();
}

self.addEventListener('message', function (e) {
  console.log('start to get data');
  if (e.data && e.data.start === true) {
    goGetVideoData(e.data.url)
  }
}, false);
