class PlaceholderBoxPainter {
  static get inputProperties() {
    return ['border-top-width', 'border-top-color'];
  }

  paint(ctx, size, props) {
    // console.info(ctx, size, props)
    let borderTopWidthProp = props.get('border-top-width');
    let borderTopColorProp = props.get('border-top-color');
    // console.info(borderTopWidthProp, borderTopColorProp, borderTopColorProp.toString())
    ctx.lineWidth = borderTopWidthProp ? borderTopWidthProp.value : 2;
    ctx.strokeStyle = borderTopColorProp ? borderTopColorProp.toString(): '#666';
    // draw line from top left to bottom right
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size.width, size.height);
    ctx.stroke();

    // draw line from top right to bottom left
    ctx.beginPath();
    ctx.moveTo(size.width, 0);
    ctx.lineTo(0, size.height);
    ctx.stroke();
  }
}

registerPaint('placeholder-box', PlaceholderBoxPainter);
