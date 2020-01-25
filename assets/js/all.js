jQuery(document).ready(function($){
    var pattern = Trianglify({
    height: window.innerHeight,
    width: window.innerWidth,
    x_colors: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 1)'],
    stroke_width: 0,
    cell_size: Math.ceil(window.innerWidth / 8)});
    var svg = pattern.svg();
    svg.id = 'trianglify-overlay';
    document.body.appendChild(svg);
});
