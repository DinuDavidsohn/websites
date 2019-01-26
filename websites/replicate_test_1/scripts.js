function get_landscape() {
    var input, images;
    var images_found = 0

    input = document.getElementById("searchbar").value
    images = document.getElementsByClassName("image")

    for (i = 0; i < images.length; i++) {
        var image = images[i]
        var attribute_list_raw = image.getAttribute("data-landscape")
        var attribute_list = attribute_list_raw.split(",")
        var attributeFound = false
        for (j = 0; j < attribute_list.length; j++) {
            if (input != attribute_list[j] && attributeFound == false) {
                image.style.display = "none"
            } else if (input == attribute_list[j]) {
                image.style.display = "inline-block"
                images_found++
                attributeFound = true
            }
        }
    }
    if (images_found == 0) {
        for (i = 0; i < images.length; i++) {
            images[i].style.display = "inline-block"
            
        }
    }
}
function select_landscape() {
    var trait = document.getElementById("selectbar").value
    var images = document.getElementsByClassName("image")
    images_found = 0
    for (i = 0; i < images.length; i++) {
        var image = images[i]
        var attribute_list_raw = image.getAttribute("data-landscape")
        var attribute_list = attribute_list_raw.split(",")
        var attributeFound = false
        for (j = 0; j < attribute_list.length; j++) {
            if (trait != attribute_list[j] && attributeFound == false) {
                image.style.display = "none"
            } else if (trait == attribute_list[j]) {
                image.style.display = "inline-block"
                attributeFound = true
                images_found++
            }
        }
    }
    if (images_found == 0) {
        for (i = 0; i< images.length; i++) {
            images[i].style.display = "inline-block"
        }
    }
}