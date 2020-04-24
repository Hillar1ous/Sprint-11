import "./index.css";
import API from "./JS/API.js";
import UserInfo from "./JS/UserInfo.js";
import FormValidator from "./JS/FormValidator.js";
import Card from "./JS/Card.js";
import CardList from"./JS/CardList.js";
import Popup from "./JS/Popup.js";
import AddPlacePopup from "./JS/AddPlacePopup.js";
import EditUserPopup from "./JS/EditUserPopup.js";
import ImageViewPopup from "./JS/ImageViewerPopup.js";

const cardContainer = document.querySelector(".places-list");
const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort9' : 'https://praktikum.tk/cohort9';
const userParams = {
    baseUrl: serverUrl,
    token: "1e6b01fe-f602-4946-b19f-f830d7a5fc4a",
};
const api = new API(userParams);
const imageViewPopup = new ImageViewPopup();
const card = new Card(imageViewPopup);
const cardList = new CardList(cardContainer, card);
const userInfo = new UserInfo(api);
const formValidator = new FormValidator();
const addPlacePopup = new AddPlacePopup(cardList, formValidator);
const editUserPopup = new EditUserPopup(userInfo, formValidator, api);

document.querySelector('.profile').addEventListener('click', mainPopupShow);

loadInitialData(api, userInfo, cardList);

function mainPopupShow(event) {
    if (event.target.closest(".user-info__edit-button")) {
        editUserPopup.open();
    } else if (event.target.closest(".user-info__button")) {
        addPlacePopup.open();
    }
}

function loadInitialData(api, userInfo, cardList) {
    api.getUserInfo().then((result) => {
        userInfo.setUserInfo(result.name, result.about, result.avatar);
        userInfo.showUserInfo();
    });
    api.getInitialCards().then((result) => {
        cardList.render(result);
    });
}



// Добрый день, по возможности, прошу принять проект, т.к. уезжаю на один день => не буду имеют возможности поправить.
// Также обещаю, что поправлю все свои ошибки, если они имеются.
// Спасибо <3