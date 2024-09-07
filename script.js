const loadData = (SearchName) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${SearchName}`)
    .then((res) => res.json())
    .then((data) => {
      ShowAllData(data.meals.slice(0, 20));
    })
    .catch((error) => {
      const datacontainer = document.querySelector("#show-data");
      datacontainer.innerHTML = "";
      datacontainer.innerHTML = `<h4 class="pound-item">NO RESULT FOUND</h4>`;
    });
};

const SearchForm = document.getElementById("from-box");
SearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const SearchName = document.querySelector(".search-name").value;
  loadData(SearchName);
  document.querySelector(".search-name").value = "";
});

const ShowAllData = (datas) => {
  console.log(datas);
  const datacontainer = document.querySelector("#show-data");
  datacontainer.innerHTML = "";
  if (datas) {
    datas.forEach((data) => {
      console.log(data);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card">
        <img src="${data.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <a class="button" href="${data.strYoutube}"> <i class="fa-brands fa-youtube"></i></a>
        <h5 class="card-title">${data.strMeal}</h5>
        <p class="card-text">${data.strArea}</p>
            <button onclick="ShowDatails('${data.idMeal}')" class="btn btn-primary mt-4">Details</button>
            <button onclick="hendeltocart('${data.idMeal}', '${data.strMeal}')" class="btn btn-success mt-4">Add to cart</button>
        </div>
      </div>
      `;
      datacontainer.appendChild(div);
    });
  } else {
    datacontainer.innerHTML = `<h4 class="pound-item">NO RESULT FOUND</h4>`;
  }
};
let cnt = 0;
const hendeltocart = (idMeal, strMeal) => {
  cnt += 1;
  const counter = document.getElementById("count");

  // for (let i = 1; i <= 11; i++) {
  if (cnt <= 11) {
    document.getElementById("count").innerText = cnt;
    const cardcontaine = document.getElementById("add-card");

    const div = document.createElement("div");
    div.classList.add("card-ditails");
    div.innerHTML = `
      <h4>${idMeal}</h4>
      <h4>${strMeal.slice(0, 10)}</h4>
  `;
    cardcontaine.appendChild(div);
  } else {
    cnt = 11;
    alert("You cannot add more than 11 items to the cart!");

    // const cardcontaine = document.getElementById("add-card");

    // // Add the new item after the alert
    // const div = document.createElement("div");
    // div.classList.add("card-ditails");
    // div.innerHTML = `
    //   <h4>${idMeal}</h4>
    //   <h4>${strMeal.slice(0, 10)}</h4>
    // `;
    // cardcontaine.appendChild(div);
  }
};

const ShowDatails = (idMeal) => {
  var modal1 = new bootstrap.Modal(document.getElementById("gfg"));
  modal1.show();
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      const MaleDitails = document.getElementById("male-ditails-body");
      MaleDitails.innerHTML = "";
      const div = document.createElement("div");
      let Ingredient = "";
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          Ingredient += `<p>${meal[`strIngredient${i}`]}</p>`;
        }
      }
      div.innerHTML = `
      <h4> ${meal.strMeal.slice(0, 10)} </h4>
        ${Ingredient}
      `;
      MaleDitails.appendChild(div);
    });
};
// Default load of 10 items when the page loads
window.onload = () => {
  loadData("b");
};
