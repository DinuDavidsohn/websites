var button = document.getElementsByClassName("media_button")[0]
var button_offset;

window.onscroll = scrolling_button

function scrolling_button() {
    button_offset = button.offsetTop;
    if (window.pageYOffset >= 38) {
        var newOffset = window.pageYOffset + 62 
        button.style.top = `${newOffset}px`
    }
    console.log(button_offset)
}
scrolling_button()

