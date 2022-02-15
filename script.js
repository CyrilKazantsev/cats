const cats = [
    {
        name: "Лара",
        rate: 7,
        img: "https://www.friendforpet.ru/api/sites/default/files/2021-09/167200DD-A44F-4845-8D4D-ACCFC180165A.jpeg",
        age: 8,
        description: "Лара – шотландская вислоухая, у нее остеохондродисплазия. Лара спокойная, очень ласковая и контактная. Болезнь не лечится и специального ухода не нужно."
    },
    {
        name: "Базиль",
        rate: 10,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-01/064AEBCB-45EC-4CE7-AB13-C65F10F00B7B.jpeg",
        age: 2,
        description: "Внимательный, активный и ласковый. Любит играть, катать мяч, и мурчать на пледе рядом с людьми! Прилично воспитан, приучен к лотку. Вакцинирован, имеет ветеринарный паспорт."
    },
    {
        name: "Риш",
        rate: 10,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-01/_DM34706.JPG",
        age: 1,
        description: "Риш любит лесенки, канаты. Очень активный и дружелюбный кот. Риш полностью здоров, привит, кастрирован. Использует лоточек и очень аккуратен."
    },
    {
        name: "Элли",
        rate: 8,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-01/1_25.jpg",
        age: 4,
        description: "Элли обладает мягким и добрым характером. Очень любит всевозможные лакомства и вкусно покушать. Не доверяет людям, потребуется время, чтобы стать ей другом. Приучена к лотку и когтеточке."
    },
    {
        name: "Чарли",
        rate: 8,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D0%BB%D0%B5%D0%B2%D0%B83_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
        age: 1,
        description: "Чёрно-белый юный котофилософ очень любит размышлять и быть наедине. Пока что не доверяет людям, не агрессивный. Ладит с другими животными, приучен к лотку и когтеточке."
    },
    {
        name: "Стефани",
        rate: 9,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-01/4_30.jpg",
        age: 6,
        description: "Прелестная Стефани – трогательная, добродушная и очень-очень общительная девочка как никто другой нуждается в заботе и любви. Приучена к лотку и когтеточке."
    },
    {
        name: "Дуся",
        rate: 9,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-02/B1444207-6EE3-4BA4-97F7-2F9666AE2F63.jpeg",
        age: 1,
        description: "Дусеньке около 1 года с небольшим, здорова, привита, стерилизована. Лоточек и когтеточку знает прекрасно. Очень общительная и нежная, хочет постоянного внимания."
    },
    {
        name: "Бруно",
        rate: 10,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-01/IMG-20211223-WA0049.jpg",
        age: 1,
        description: "Очаровательный активный кот Бруно, находится в постоянном движении! Очаровательный и ласковый кот. Приучен к лотку, ладит с другими котами, привит."
    },
    {
        name: "Светлячок",
        rate: 9,
        img: "https://www.friendforpet.ru/api/sites/default/files/2022-01/%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D1%8F%D1%87%D0%BE%D0%BA4_%D0%B0%D0%BB%D0%B5%D0%BA%D1%81.jpg",
        age: 1,
        description: "Немного боязливый, но очень добрый и нежный кот Светлячок. Приучен к лотку и когтеточке, ладит с детьми, привит. Станет вам хорошим другом"
    }
]


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
    catImg.style.backgroundImage = `url(${cat.img}`;
    catName.innerHTML = cat.name;
    catBlock.className = "cat__block";
    mainContainer.append(catBlock);
    catBlock.append(catImg);
    catBlock.append(catName);
    catBlock.append(catRates);

    catBlock.id = i; // Пока оставить
    ++i;
});

// Увеличение при наведении
// function enlarge() {
//     this.style.transform = "scale(1.2)";
// }
// function reduce() {
//     this.style.transform = "scale(1.0)"
// }
// catBlock.forEach((cat) => {
//     cat.addEventListener("mouseover", enlarge) // Навести мышь
// })
// catBlock.forEach((cat) => {
//     cat.addEventListener("mouseout", reduce) // Убрать мышь
// })

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
    popupImg.innerHTML = `<img class="popup__img" src=${cats[this.id].img} alt="catImg">`
    popup.className = "popup";
    popup.append(popupImg);
    popup.append(popupInfo);
    popup.append(closeButton);
    popupInfo.append(popupName);
    popupInfo.append(popupAge);
    popupInfo.append(popupText);
    infoCat.append(popup);
}
