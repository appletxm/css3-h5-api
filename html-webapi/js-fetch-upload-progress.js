const [input, progress, label] = [
  document.querySelector("input")
  , document.querySelector("progress")
  , document.querySelector("label")
];

const url = "/path/to/server/";

input.onmousedown = () => {
  label.innerHTML = "";
  progress.value = "0"
};

input.onchange = (event) => {

  const file = event.target.files[0];
  const filename = file.name;
  progress.max = file.size;

  const request = new Request(url, {
    method: "POST",
    body: file,
    cache: "no-store"
  });

  const upload = settings => fetch(settings);

  const uploadProgress = new ReadableStream({
    start(controller) {
        console.log("starting upload, request.bodyUsed:", request.bodyUsed);
        controller.enqueue(request.bodyUsed);
    },
    pull(controller) {
      if (request.bodyUsed) {
        controller.close();
      }
      controller.enqueue(request.bodyUsed);
      console.log("pull, request.bodyUsed:", request.bodyUsed);
    },
    cancel(reason) {
      console.log(reason);
    }
  });

  const [fileUpload, reader] = [
    upload(request)
    .catch(e => {
      reader.cancel();
      throw e
    })
    , uploadProgress.getReader()
  ];

  const processUploadRequest = ({value, done}) => {
    if (value || done) {
      console.log("upload complete, request.bodyUsed:", request.bodyUsed);
      // set `progress.value` to `progress.max` here 
      // if not awaiting server response
      // progress.value = progress.max;
      return reader.closed.then(() => fileUpload);
    }
    console.log("upload progress:", value);
    progress.value = +progress.value + 1;
    return reader.read().then(result => processUploadRequest(result));
  };

  reader.read().then(({value, done}) => processUploadRequest({value,done}))
  .then(response => response.text())
  .then(text => {
    console.log("response:", text);
    progress.value = progress.max;
    input.value = "";
  })
  .catch(err => console.log("upload error:", err));

}