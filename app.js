var images = ["./images/furnitures/img0.jpg",
    "./images/furnitures/img1.png", "./images/furnitures/img2.jpg",
    "./images/furnitures/img3.jpg", "./images/furnitures/img4.jpg",
    "./images/cars/ferrari.jpg", "./images/cars/ford.jpg",
    "./images/cars/maclaren.jpg", "./images/cars/porshe.jpg",
    "./images/games/fifa.jpg", "./images/games/speed.jpg", "./images/games/spiderman.jpg"
];

var imagesCopy = images;


var $leftImg = $("#left-img");
var $centralImg = $("#central-img");
var $rightImg = $("#right-img");

(function activetDeactivetfilter() {
    $(".filter-btn").on("click", function (event) {

        var filterBtns = document.getElementsByClassName("filter-btn");
        var counter = 0;

        for (var i = 0; i < filterBtns.length; i++) {
            if (filterBtns[i].classList.contains("filter-btn-active")) {
                counter += 1;
            }
        }

        if ($(event.target).hasClass("filter-btn-active") && counter != 1) {
            $(event.target).removeClass("filter-btn-active");
        } else {
            $(event.target).addClass("filter-btn-active");
        }

        var filter = $(".filter-btn-active").text();
        filter = filter.split(/(?=[A-Z])/);

        for (var k = 0; k < filter.length; k++) {
            filter[k] = filter[k].toLowerCase();
        }

        function filterData(value, index, arr) {
            for (var i = 0; i < arr.length; i++) {
                if (value.indexOf(filter[0]) > -1 ||
                    value.indexOf(filter[1]) > -1 ||
                    value.indexOf(filter[2]) > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        images = imagesCopy.filter(filterData);

        createNavPoint();
        navigateCarouselImg();

        var event = {
            target: {
                id: nextIndex = Math.floor(Math.random() * images.length)
            }
        };
        changeCarouselImg(event);
    })
}());

function createNavPoint() {
    $(".nav-carousel").empty();
    for (var i = 0; i < images.length; i += 1) {
        $(".nav-carousel").append("<span class=\"nav-point\" id=" + i + "></span>");
    }
}
createNavPoint();

(function showModal() {
    $centralImg.on("click", function () {
        $(".modal").css("display", "block");
        $(".modal-img").attr("src", $centralImg.attr("src"));
        stopCarousel();
    });
}());

(function hideModal() {
    $(".close-btn").on("click", function () {
        $(".modal").css("display", "none");
        carouselAutoMove();
    });
}());

function navigateCarouselImg() {
    $(".nav-point").on("click", function (event) {
        nextIndex = event.target.id * 1; // multiply by 1 to convert to number
        changeCarouselImg(event);
    });
}
navigateCarouselImg();

var startCarousel = "";
var nextIndex = Math.floor(Math.random() * images.length); // get random number form 1 to number of img



function carouselAutoMove() {

    startCarousel = setTimeout(function () {
        carouselAutoMove();
    }, 5000);

    var event = {
        target: {
            id: nextIndex
        }
    };

    changeCarouselImg(event)
    nextIndex += 1;
    if (nextIndex >= images.length) {
        nextIndex = 0;
    }

};

carouselAutoMove();

function stopCarousel() {
    clearTimeout(startCarousel);
}

function changeCarouselImg(event) {
    $(".nav-point-active").removeClass("nav-point-active");
    $("#" + event.target.id).addClass("nav-point-active");

    var selectedImg = event.target.id * 1; // multiply by 1 to convert to number
    var previousImg = (selectedImg - 1) % images.length;
    var nextImg = (selectedImg + 1) % images.length;

    if (previousImg < 0) {
        previousImg += images.length;
    }

    $centralImg.attr("src", images[selectedImg]);
    $leftImg.attr("src", images[previousImg]);
    $rightImg.attr("src", images[nextImg]);
}