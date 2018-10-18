export function readFiles(file){
  let reader = new FileReader()
  let promise, resolveCb, rejectCb

  promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject 
  })

  reader.onloadstart = function() { 
    console.log("onloadstart", reader.readyState); 
  }

  reader.onerror = function() { 
    console.log("onerror", reader.readyState)
    rejectCb(new Error(`reader file error ${file.name}`))
  }

  reader.onprogress = function() { 
    console.log("onprogress", reader.readyState); 
  }

  reader.onload = function(event) { 
    console.log("onload", reader.readyState); 
    resolveCb(event.target.result)
    // resolveCb(reader.result)
  }

  reader.onloadend = function() { 
    console.log("onloadend", reader.readyState); 
  }

  reader.readAsBinaryString(file)
  // reader.readAsArrayBuffer(file)

  return promise
}
