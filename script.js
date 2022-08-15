const searchButton = document.querySelector(".search-btn");
const courseList = document.querySelectorAll(".course-bar li");
const sectionContainer = document.querySelector(".course-container");
let courses = [];
[...courseList].forEach(function(link) {

    link.addEventListener('click', function(e) {
        e.preventDefault();
        fetchFromLink(link);
        document.querySelector(".search-input").value = "";
    });

});
activate(courseList[0]);
fetchFromLink(courseList[0]);

function activate(li) {
    [...courseList].forEach(function(link) {
        link.classList.remove("course-bar-item-active");
    });
    li.classList.add("course-bar-item-active");
}

function fetchFromLink(link) {
    fetch(link.getAttribute("href"))
        .then((response) => response.json())
        .then(function(container) {
            courses = container['courses'];
            return container;
        }).then((container) => {
            updateContent(container);
            return link;
        })
        .then((link) => {
            activate(link);
        });
}


function updateContent(container) {
    sectionContainer.innerHTML = "";
    sectionTitle = document.createElement("h3");
    sectionTitle.classList.add("course-item", "section-title");
    sectionTitle.innerHTML = container['sectionTitle'];
    sectionContainer.appendChild(sectionTitle);
    courseDesc = document.createElement("p");
    courseDesc.classList.add("course-item", "paragraph", "section-desc");
    courseDesc.innerHTML = container['courseDesc'];
    sectionContainer.appendChild(courseDesc);
    exploreButton = document.createElement("button");
    exploreButton.classList.add("course-item", "btn-outline", "explore-button");
    exploreButton.innerHTML = "Explore " + container['courseName'];
    sectionContainer.appendChild(exploreButton);
    updateTable();
}
searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    sectionContainer.removeChild(document.querySelector(".swiper"));
    updateTable();

});
const searchText = document.querySelector(".search-input");

function updateTable() {
    let here = [];
    here = filter(searchText.value);
    coursesContainer = document.createElement("div");
    coursesContainer.classList.add("swiper-wrapper");
    // console.log(here);
    for (let i = 0; i < here.length; i++) {

        render(coursesContainer, here[i]);
    }
    swip = buildSwiper();
    swip.appendChild(coursesContainer);
    var swiper = new Swiper(swip, {
        slidesPerView: 5,
        spaceBetween: 20,
        slidesPerGroup: 4,
        loop: false,
        loopFillGroupWithBlank: false,
        allowTouchMove: false,
        navigation: {
            nextEl: swip.querySelector(".swiper-button-next"),
            prevEl: swip.querySelector(".swiper-button-prev"),
        },
        breakpoints: {
            1280: {
                slidesPerView: 5,
                slidesPerGroup: 4,
                spaceBetween: 20
            },
            1100: {
                slidesPerView: 4,
                slidesPerGroup: 3,
                spaceBetween: 20
            },
            890: {
                slidesPerView: 3,
                slidesPerGroup: 2,
                spaceBetween: 20
            },
            550: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 20
            },
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20
            }
        }
    });
    sectionContainer.appendChild(swip);
}

function filter(searchText) {
    let filtered = [];
    if (searchText == "") {
        return courses;
    }
    for (let i = 0; i < courses.length; i++) {
        if (courses[i]['title'].toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
            filtered.push(courses[i]);
        }
    }
    return filtered;
}


function render(coursesContainer, course) {
    const courseDiv = document.createElement("div");
    courseDiv.classList.add("course", "swiper-slide");
    const Img = document.createElement("img");
    Img.classList.add("course-detail", "imageSize", "img-fluid");
    Img.setAttribute("src", course['image']);
    const title = document.createElement("h3");
    title.classList.add("course-title", "course-detail");
    title.innerText = course['title'];
    const author = document.createElement("p");
    author.classList.add("course-author", "course-detail");
    author.innerText = course['author'][0]['name'];
    const ratingDiv = document.createElement("div");
    ratingDiv.classList.add("course-detail");
    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("rating");
    ratingSpan.innerText = parseFloat(course['rating'].toString().substring(0, 3));
    const startsSpan = document.createElement("span");
    startsSpan.classList.add("rating");
    const icon1 = document.createElement("i");
    const icon2 = document.createElement("i");
    const icon3 = document.createElement("i");
    const icon4 = document.createElement("i");
    const icon5 = document.createElement("i");
    startsSpan.appendChild(icon1);
    startsSpan.appendChild(icon2);
    startsSpan.appendChild(icon3);
    startsSpan.appendChild(icon4);
    startsSpan.appendChild(icon5);
    icon1.classList.add("fa-solid", "fa-star");
    icon2.classList.add("fa-solid", "fa-star");
    icon3.classList.add("fa-solid", "fa-star");
    icon4.classList.add("fa-solid", "fa-star");
    icon5.classList.add("fa-regular", "fa-star-half-stroke");
    const ratingNumber = document.createElement("span");
    ratingNumber.innerText = course['people'];
    ratingNumber.classList.add("rating-numbers", "course-author");
    ratingDiv.appendChild(ratingSpan);
    ratingDiv.appendChild(startsSpan);
    ratingDiv.appendChild(ratingNumber);
    const price = document.createElement("div");
    price.classList.add("course-price", "course-detail");
    price.innerText = "E£" + course['price'];
    courseDiv.appendChild(Img);
    courseDiv.appendChild(title);
    courseDiv.appendChild(title);
    courseDiv.appendChild(author);
    courseDiv.appendChild(ratingDiv);
    courseDiv.appendChild(price);
    coursesContainer.appendChild(courseDiv);

}

function buildSwiper() {
    let swipper = document.createElement("div");
    swipper.classList.add("swiper", "mySwiper");
    let nextButton = document.createElement("div");
    nextButton.classList.add("swiper-button-next");
    let prevButton = document.createElement("div");
    prevButton.classList.add("swiper-button-prev");
    swipper.appendChild(prevButton);
    swipper.appendChild(nextButton);
    return swipper;
}