class SolidColorPainter {
  static get inputArguments() {
    return ['<color>'];
  }

  static get inputProperties() {
    return ['color'];
  }

  paint(ctx, size, props, args) {
    console.info(props.get('color').toString(), args)
    ctx.fillStyle = args[0] ? args[0].toString() : props.get('color').toString();
    ctx.fillRect(0, 0, size.width, size.height);
  }
}

registerPaint('solid-color', SolidColorPainter);