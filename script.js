const mainContainer = document.querySelector(".main__container")
i = 0;
// Создаю карточку кота
cats.forEach((cat) => {
    const catBlock = document.createElement("div");
    const catName = document.createElement("h1");
    const catImg = document.createElement("div");
    const catRates = document.createElement("div");
    for (let i = 0; i < cat.rate; i++) {
        const catRate = document.createElement("div");
        catRate.className = "cat__rate";
        catRate.style.backgroundImage = `url(img/blackCat.svg)`;
        catRates.append(catRate);
    }
    for (let i = 0; i < (10 - cat.rate); i++) {
        const catRate = document.createElement("div");
        catRate.className = "cat__rate";
        catRate.style.backgroundImage = `url(img/whiteCat.svg)`;
        catRates.append(catRate);
    }
    catRates.className = "cat__rates";
    catImg.className = "cat__img";
    catImg.style.backgroundImage = `url(${cat.img_link}`;
    catName.innerHTML = cat.name;
    catBlock.className = "cat__block";
    mainContainer.append(catBlock);
    catBlock.append(catImg);
    catBlock.append(catName);
    catBlock.append(catRates);

    catBlock.id = i; // Пока оставить
    ++i;
});

// Popup
const catBlock = document.querySelectorAll(".cat__block")
catBlock.forEach((cat) => {
    cat.addEventListener("click", popupCat) // Попап
});

function popupCat(e) {
    infoCat.classList.add("active");
    infoCat.style.display = "block";
    const popup = document.createElement("div");
    const popupImg = document.createElement("div");
    const popupInfo = document.createElement("div");
    const popupName = document.createElement("div");
    popupName.style.paddingBottom = "20px";
    popupName.style.fontWeight = "800"
    const popupAge = document.createElement("div");
    popupAge.style.paddingBottom = "20px";
    const popupText = document.createElement("div");
    const closeButton = document.createElement("div");
    closeButton.innerHTML = `<img class="close__button" src="img/close.png" alt="closeButton">`;
    popupName.innerText = cats[this.id].name;
    if (cats[this.id].age == 1) {
        popupAge.innerText = `${cats[this.id].age} год`;
    } else if (cats[this.id].age < 5) {
        popupAge.innerText = `${cats[this.id].age} года`
    } else {
        popupAge.innerText = `${cats[this.id].age} лет`
    };
    popupText.innerText = cats[this.id].description;

    popupInfo.className = "popup__info";
    popupImg.innerHTML = `<img class="popup__img" src=${cats[this.id].img_link} alt="catImg">`
    popup.className = "popup";
    popup.append(popupImg);
    popup.append(popupInfo);
    popup.append(closeButton);
    popupInfo.append(popupName);
    popupInfo.append(popupAge);
    popupInfo.append(popupText);
    infoCat.append(popup);
}

// Закрытие Popup
const infoCat = document.querySelector(".info__cat")
infoCat.addEventListener("click", closePopup)


function closePopup(e) {
    if (e.target.className == "close__button") {
        infoCat.classList.remove("active");
        infoCat.style.display = "none"
        infoCat.lastChild.remove();
    }
};

// Закрытие popup при нажатии вне
document.addEventListener("click", function(event) {
    if (event.target.className == "info__cat active") {
        infoCat.classList.remove("active");
        infoCat.style.display = "none";
        infoCat.lastChild.remove();
    }
})

// Event на нажатие "Escape"
document.addEventListener("keydown", function(event){
    if (event.code === "Escape") {
        event.preventDefault();
        infoCat.classList.remove("active");
        infoCat.style.display = "none";
        infoCat.lastChild.remove();
    }
})