registerPaint('wave', class {
  static get inputProperties() { return ['--rect-color']; }
  paint(ctx, geom, properties) {
    const color = properties.get('--rect-color'); 
    ctx.fillStyle = color.cssText; 
    ctx.fillRect(0, 0, geom.width, geom.height);
  }
})