const slider = document.querySelector(".slider");
const sliderBack = document.querySelector(".sliderBack");
const ingridients = document.querySelector(".ingridients");
const cookInstruction = document.querySelector(".cookInstruction");
const recieptName = document.querySelector(".recieptName");
const reciept = document.querySelector(".reciept");
const opacityBg = document.querySelector("#opacityBg");
const nextSlide = document.querySelector(".carousel-control-next-icon");
const prevSlide = document.querySelector(".carousel-control-prev-icon");
const slideOne = document.querySelector("#slideOne");
const slideOneTitle = document.querySelector("#slideOneTitle");
const slideTwo = document.querySelector("#slideTwo");
const slideTwoTitle = document.querySelector("#slideTwoTitle");
const slideThree = document.querySelector("#slideThree");
const slideThreeTitle = document.querySelector("#slideThreeTitle");

const chooseFoodType = document.querySelector(".maxWidth");
const tempHeight = getComputedStyle(sliderBack).height;

slider.addEventListener("click", handleReciept);
chooseFoodType.addEventListener("click", handleFoodType);

function handleReciept(event) {
    event.preventDefault();
    const element = event.target;
    if (element.id === "closeReciept") {
        hideReciept();
    } else if (
        element !== prevSlide &&
        element !== nextSlide &&
        element !== reciept &&
        element.type !== "button"
    ) {
        ingridients.innerHTML = "Loading...";
        cookInstruction.innerHTML = "Loading...";
        getRecieptData(element.name);
        makeRecieptVisible();
    }
}
async function getRecieptData(name) {
    await fetch(
        `https://cooking-8e34b-default-rtdb.europe-west1.firebasedatabase.app/${name}.json`
    )
        .then((response) => response.json())
        .then((data) => inputRecieptData(data));
}
function inputRecieptData(data) {
    ingridients.innerHTML = "";
    cookInstruction.innerHTML = "";
    for (key in data) {
        if (key === "actions") {
            cookInstruction.append(data[key]);
        } else if (key === "name") {
            recieptName.innerHTML = data[key];
        } else if (key !== "actions" && key !== "name") {
            let li = document.createElement("li");
            li.textContent = data[key];
            ingridients.append(li);
        }
    }
}

function handleFoodType(event) {
    event.preventDefault();
    let name = event.target.name;
    if (name === "salads") {
        changeToSalads();
    } else if (name === "cakes") {
        changeToCakes();
    } else if (name === "meat") {
        changeToMeat();
    }
}
function changeToSalads() {
    const tempHeight = getComputedStyle(sliderBack).height;
    sliderBack.style.height = tempHeight;
    slider.style.animationName = "changeSlider";
    setTimeout(() => {
        slideOne.name = "mashroomsSalad";
        slideOne.src = "./img/salads/mashroomsSalad.jpg";
        slideOneTitle.innerHTML = "Салат из шампиньонов";

        slideTwo.name = "olivjeSalad";
        slideTwo.src = "./img/salads/olivjeSalad.jpg";
        slideTwoTitle.innerHTML = "Оливье классический";

        slideThree.name = "melonSalad";
        slideThree.src = "./img/salads/melonSalad.jpg";
        slideThreeTitle.innerHTML = "Салат Арбуз с фетой";
    }, 1200);

    setTimeout(() => {
        sliderBack.style.height = "auto";
        slider.style.animationName = "";
    }, 3000);
}
function changeToCakes() {
    const tempHeight = getComputedStyle(sliderBack).height;
    sliderBack.style.height = tempHeight;
    slider.style.animationName = "changeSlider";
    setTimeout(() => {
        slideOne.name = "strawberryCake";
        slideOne.src = "./img/cakes/strawberry.png";
        slideOneTitle.innerHTML = "Клубничный пирог";

        slideTwo.name = "cabbageCake";
        slideTwo.src = "./img/cakes/cabbage.jpg";
        slideTwoTitle.innerHTML = "Капустный пирог";

        slideThree.name = "panCake";
        slideThree.src = "./img/cakes/pancake.jpg";
        slideThreeTitle.innerHTML = "Оладьи на кефире";
    }, 1200);

    setTimeout(() => {
        sliderBack.style.height = "auto";
        slider.style.animationName = "";
    }, 3000);
}
function changeToMeat() {
    const tempHeight = getComputedStyle(sliderBack).height;
    sliderBack.style.height = tempHeight;
    slider.style.animationName = "changeSlider";
    setTimeout(() => {
        slideOne.name = "muttonKebab";
        slideOne.src = "./img/meat/muttonKebab.jpg";
        slideOneTitle.innerHTML = "Шашлык из баранины с баклажанами";

        slideTwo.name = "potatoMeat";
        slideTwo.src = "./img/meat/potatoMeat.jpg";
        slideTwoTitle.innerHTML = "Картофель, запеченный с мясом";

        slideThree.name = "beefMeat";
        slideThree.src = "./img/meat/beefMeat.jpg";
        slideThreeTitle.innerHTML = "Стейк говяжий на гриле";
    }, 1200);

    setTimeout(() => {
        sliderBack.style.height = "auto";
        slider.style.animationName = "";
    }, 3000);
}

function makeRecieptVisible() {
    opacityBg.style.animationName = "changeOpacityOn";
    reciept.style.zIndex = 10;
}
function hideReciept() {
    opacityBg.style.animationName = "changeOpacityOff";
    reciept.style.zIndex = 0;
    ingridients.innerHTML = "";
    cookInstruction.innerHTML = "";
    recieptName.innerHTML = "";
}
