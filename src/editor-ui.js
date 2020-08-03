export const editorHtml = `<div id="editor" contenteditable="true"></div>`
// export const optListHtml = `
// <div class="editor-opt">
//   <ul class="edit-icon-text">
//     <li class="c3h5-bold" event="text-bold"></li>
//     <li class="c3h5-italic" event="text-italic"></li>
//     <li class="c3h5-a" event="text-change-size"></li>

//     <li class="c3h5-alignleft" event="text-align-left"></li>
//     <li class="c3h5-alignmiddle" event="text-align-center"></li>
//     <li class="c3h5-alignright" event="text-align-right"></li>

//     <li class="c3h5-colors" event="text-change-color"></li>
//     <li class="c3h5-link" event="insert-link"></li>
//     <li class="c3h5-video" event="insert-video"></li>
//     <li class="c3h5-image" event="insert-image"></li>
//   </ul>
// </div>`

export const optListHtml = `
<div class="editor-opt">
  <button><span class="c3h5-bold" event="text-bold"></span></button>
  <button><span class="c3h5-italic" event="text-italic"></span></button>
  <button class="change-text-size">
    <span class="c3h5-a" event="text-change-size"></span>
    <ul class="font-size-list">
      <li size="28">大号</li>
      <li size="18">中号</li>
      <li size="14">小号</li>
    </ul>
  </button>

  <button><span class="c3h5-alignleft" event="text-align-left"></span></button>
  <button><span class="c3h5-alignmiddle" event="text-align-center"></span></button>
  <button><span class="c3h5-alignright" event="text-align-right"></span></button>

  <button><span class="c3h5-colors" event="text-change-color"></span></button>
  <button><span class="c3h5-link" event="insert-link"></span></button>
  <button><span class="c3h5-video" event="insert-video"></span></button>
  <button><span class="c3h5-image" event="insert-image"></span></button>
</div>`
