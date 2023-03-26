const playBtn = document.getElementById('btnPlay');
const menu = document.getElementById('menu')

playBtn.addEventListener("click", function() {
    playBtn.style.filter="invert(1)"
    menu.remove();
})
