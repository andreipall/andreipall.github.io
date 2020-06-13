jQuery(document).ready(function($){
  // set up the base pattern
  const pattern = trianglify({
    height: window.innerHeight,
    width: window.innerWidth,
    xColors: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 1)'],
    yColors: 'match',
    cellSize: Math.ceil(window.innerWidth / 8)
  })
  var svg = pattern.toSVG()
  svg.id = 'trianglify-overlay'
  document.body.appendChild(svg)
});
