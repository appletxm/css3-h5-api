export function readFiles(file) {
  var reader = new FileReader();
  reader.onloadstart = function () {
    console.log("onloadstart");
  };

  reader.onprogress = function () {
    console.log("onprogress");
  };

  reader.onload = function () {
    console.log("onload");
  };

  reader.onloadend = function () {
    console.log("onloadend");
  };
}