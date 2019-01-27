function searchLandscapes() {
  var input = document.getElementById("searchbar").value    
  applyFilter(input)
}

function selectLandscapes() {
  var trait = document.getElementById("selectbar").value
  applyFilter(trait)
}

function autocomplete_search() {
  input = document.getElementById("autocompletebar").value
  var traits = ["cave", "city", "coast", "desert", "forest", "lake", "mountains", "river", "temple", "tropical", "watefall"]
}

function startPosition() {
  var images = document.getElementById("carouselImages").children
  for (i=0; i < images.length; i++) {
      if (i != 0) {
        images[i].style.display = "none"
      }
  }
}

function goRight() {
  var images = document.getElementById("carouselImages").children
  var counter = 0;
  for (i=0; i<images.length; i++) {
    if (images[i].style.display != "none") {
      counter = i
    }
  }
  images[counter].style.display = "none"
  if (counter == (images.length-1)) {
    images[0].style.display = "block"
  } else {
    images[counter+1].style.display = "block"
  }
}

function goLeft() {
  var images = document.getElementById("carouselImages").children
  var counter = 0;
  for (i=0; i<images.length; i++) {
    if (images[i].style.display != "none") {
      counter = i
    }
  }
  images[counter].style.display = "none"
  if (counter == 0) {
    images[images.length-1].style.display = "block"
  } else {
    images[counter-1].style.display = "block"
  }
}

function applyFilter(query) {
  var images_found = 0
  var imagesContainer = document.getElementsByClassName("images")
  var images = imagesContainer[0].children

  for (i = 0; i < images.length; i++) {
    var image = images[i]
    var attribute_list_raw = image.getAttribute("data-landscape")
    var attribute_list = attribute_list_raw.split(",")
    var attributeFound = false
    for (j = 0; j < attribute_list.length; j++) {
      if (query != attribute_list[j] && attributeFound == false) {
        image.style.display = "none"
      } else if (query == attribute_list[j]) {
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
window.onload = startPosition();