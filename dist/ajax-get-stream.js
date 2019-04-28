export function doDownLoad(xhr) {
  var blob = new Blob([xhr.response], { type: "application/vnd.ms-excel" });
  var contentDisposition = xhr.getResponseHeader('content-disposition');
  var matchedObj = contentDisposition.match(/filename=([^;]+)/);
  var fileName = matchedObj && matchedObj[1] ? decodeURIComponent(matchedObj[1]) : 'download.excel';

  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
    return false;
  }

  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  var body = document.querySelector('body');
  if (url.indexOf(window.location.host) < 0) {
    url = url.replace(/^(blob:)(.+)$/, function (str, $1, $2) {
      return $1 + (window.location.protocol + '//' + window.location.host + '/') + $2;
    });
  }
  a.href = url;
  a.download = fileName;
  body.appendChild(a);
  a.click();
  body.removeChild(a);
}