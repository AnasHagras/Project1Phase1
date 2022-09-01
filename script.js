const courseContainer = document.querySelector(".courses-container");
const searchButton = document.querySelector(".search-btn");
const searchText = document.querySelector(".search-input");
let courses = [];
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  updateTable();
});

function updateTable() {
  const currentCourses = filter(searchText.value);
  courseContainer.innerHTML = "";
  for (let i = 0; i < courses.length; i++) {
    render(currentCourses[i]);
  }
}

function filter(searchText) {
  let filtered = [];
  if (searchText == "") {
    return courses;
  }
  for (let i = 0; i < courses.length; i++) {
    if (
      courses[i]["title"].toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    ) {
      filtered.push(courses[i]);
    }
  }
  return filtered;
}

fetch("https://api.npoint.io/74d742bda6f905ced3c7")
  .then((response) => {
    return response.json();
  })
  .then((arr) => {
    courses = arr;
    for (let i = 0; i < arr.length; i++) {
      render(arr[i]);
    }
  });

function render(course) {
  const courseDiv = document.createElement("div");
  courseDiv.classList.add("course");
  const Img = document.createElement("img");
  Img.classList.add("course-detail", "imageSize");
  Img.setAttribute("src", course["image"]);
  const title = document.createElement("h3");
  title.classList.add("course-title", "course-detail");
  title.innerText = course["title"];
  const author = document.createElement("p");
  author.classList.add("course-author", "course-detail");
  author.innerText = course["author"];
  const ratingDiv = document.createElement("div");
  ratingDiv.classList.add("course-detail");
  const ratingSpan = document.createElement("span");
  ratingSpan.classList.add("rating");
  ratingSpan.innerText = course["rating"];
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
  ratingNumber.innerText = course["people"];
  ratingNumber.classList.add("rating-numbers", "course-author");
  ratingDiv.appendChild(ratingSpan);
  ratingDiv.appendChild(startsSpan);
  ratingDiv.appendChild(ratingNumber);
  const price = document.createElement("div");
  price.classList.add("course-price", "course-detail");
  price.innerText = course["price"];
  courseDiv.appendChild(Img);
  courseDiv.appendChild(title);
  courseDiv.appendChild(title);
  courseDiv.appendChild(author);
  courseDiv.appendChild(ratingDiv);
  courseDiv.appendChild(price);
  courseContainer.appendChild(courseDiv);
}
