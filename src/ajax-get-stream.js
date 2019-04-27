export function doDownLoad(response) {
  let blob = new Blob([response], {type: "application/vnd.ms-excel"})
  let url = URL.createObjectURL(blob)
  window.open(url)
}
