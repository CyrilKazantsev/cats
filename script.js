if (!Cookies.get("user")) {
    window.location.replace("/auth.html")
} else {
    const greet = document.querySelector(".greet")
    greet.innerHTML = `Привет, ${Cookies.get("user")}!`
    console.log(Cookies.get("user"));
}
const formEdit = document.querySelector(".form-edit")
const mainContainer = document.querySelector(".main__container")
const infoCat = document.querySelector(".info__cat")
const addButton = document.querySelector("#add-cat");
const popupCatAdded = document.querySelector(".popup_type_cats-add");
const addForm = document.querySelector(".form-add");
const inputId = addForm.querySelector("#id");
const inputName = addForm.querySelector("#name");
const inputAge = addForm.querySelector("#age");
const inputLink = addForm.querySelector("#img_link");
const inputDescrition = addForm.querySelector("#description");
const inputRate = addForm.querySelector("#rate")
const buttonReloadLocalStorage = document.querySelector(".reload-data") 
let cats = JSON.parse(localStorage.getItem("cats"))
i = 0;

// Функции
// Собираю данные из формы
function dataTake(form) {
    const newData = {}
    const inputs = form.querySelectorAll("input");
    inputs.forEach(input => {
        newData[input.name] = input.value
    })
    return newData
}

// Создаю карточку кота
function addCat(cat) {
    const catBlock = document.createElement("div");
    const catName = document.createElement("h1");
    const catImg = document.createElement("div");
    const catRates = document.createElement("div");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const editApproveButton = document.querySelector(".edit")
    editButton.innerHTML = "Редактировать";
    editButton.className = "edit__button";
    deleteButton.innerHTML = "Удалить";
    deleteButton.className = "delete__button";
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
    catBlock.append(deleteButton)
    catBlock.append(editButton)
    catBlock.id = i; // Пока оставить
    ++i;

    // Удаление котика
    function clickDeleteButton() {
        if (confirm("Вы действительно хотите удалить котика?")) {
            fetch(`https://sb-cats.herokuapp.com/api/delete/${cat.id}`, {
                method: "DELETE"
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(response)
                })
                .then((data) => {
                    if (data.message === "ok") {
                        reload()
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    function clickEditButton() {
        const inputs = formEdit.querySelectorAll("input");
        inputs.forEach(input => {
            console.log(input.value);
            input.value = cat[input.name]
        });
    }
    editButton.addEventListener("click", clickEditButton)
    catBlock.addEventListener("click", popupCat)
    document.addEventListener("click", closePopup);
    document.addEventListener("keydown", closePopup);
    deleteButton.addEventListener("click", clickDeleteButton)
}
// Popup

function popupCat(e) {
    if (e.target.className !== "delete__button" && e.target.className !== "edit__button") {
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
    } else if (e.target.className === "edit__button") {
        infoCat.classList.add("active");
        infoCat.style.display = "block";
        formEdit.style.display = "block";
    }
}

// Закрытие Popup

function closePopup(e) {
    if (e.target.className == "close__button") {
        infoCat.classList.remove("active");
        infoCat.style.display = "none"
        addForm.style.display = "none"
        formEdit.style.display = "none";    
        infoCat.lastChild.remove();
    } else if (e.target.className == "info__cat active") {
        infoCat.classList.remove("active");
        infoCat.style.display = "none";
        addForm.style.display = "none"
        formEdit.style.display = "none";
        infoCat.lastChild.remove();
    } else if (e.code === "Escape") {
        e.preventDefault();
        infoCat.classList.remove("active");
        infoCat.style.display = "none";
        addForm.style.display = "none"
        formEdit.style.display = "none";
        infoCat.lastChild.remove();
    } 
};

if (!localStorage.cats) {
    getCats()
} else { 
    cats.forEach((cat) => {
        addCat(cat);
    });
}

// Показ всех котиков 

function getCats(){
    return fetch("https://sb-cats.herokuapp.com/api/show")
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response)
        })
        .then(({data}) => {
            localStorage.setItem("cats", JSON.stringify(data))
            cats = JSON.parse(localStorage.getItem("cats"))
            cats.forEach(cat => {
                addCat(cat)
            })
            console.log(data);
            return cats
        })
        .catch(err => {
            console.log(err);
        })
}
// Перезагрузка страницы
function reload() {
    localStorage.clear();
    mainContainer.innerHTML = "";
    getCats();
}

// Events
// Добавление котика

addButton.addEventListener("click", function(e) {
    e.preventDefault();
    infoCat.classList.add("active");
    infoCat.style.display = "block";
    addForm.style.display = "block"
    infoCat.append(addForm);
})

addForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const bodyJSON = {
        id: inputId.value,
        name: inputName.value,
        age: inputAge.value,
        img_link: inputLink.value,
        description: inputDescrition.value,
        rate: inputRate.value
    };

    return fetch("https://sb-cats.herokuapp.com/api/add", {
        method: "POST",
        body: JSON.stringify(bodyJSON),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response)
        })
        .then((data) => {
            if (data.message === "ok") {
                reload()
                infoCat.classList.remove("active");
                infoCat.style.display = "none";
                addForm.style.display = "none"
                infoCat.lastChild.remove();
            }
            // addCat(data)
        })
        .catch(err => {
            console.log(err);
        })
})

// Редактирование котика

formEdit.addEventListener("submit", (e) => {
    e.preventDefault()
    const bodyJSON = dataTake(formEdit)

    return fetch(`https://sb-cats.herokuapp.com/api/update/${bodyJSON.id}`, {
        method: "PUT",
        body: JSON.stringify(bodyJSON),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response)
        })
        .then((data) => {
            if (data.message === "ok") {
                reload()
                infoCat.classList.remove("active");
                infoCat.style.display = "none";
                formEdit.style.display = "none"
                infoCat.lastChild.remove();
            }
        })
        .catch(err => {
            console.log(err);
        })    
})

// Обновление страницы
buttonReloadLocalStorage.addEventListener("click", reload)
// Ошибки

/*
    1. Не закрывается попап после добавления котика - Сделано
    2. Нельзя прочитать карточку кота, нужно почему-то заново обновить хранилище через кнопку (хотя код такой же)
*/