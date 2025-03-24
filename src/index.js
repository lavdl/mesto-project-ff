// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupOverlay, closePopupEscape} from './components/modal.js';

const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit')
const editPopupCloseButton = popupTypeEdit.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const formEditProfile = popupTypeEdit.querySelector('.popup__form') 
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title'); 
const profileDesc = document.querySelector('.profile__description');
const popupImg = document.querySelector('.popup_type_image');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');
const popupImgSrc = popupImg.querySelector('.popup__image');
const popupDesc = popupImg.querySelector('.popup__caption');
const formAddCard = popupNewCard.querySelector('.popup__form') 
const newCardName = formAddCard.querySelector('.popup__input_type_card-name');
const newCardUrl = formAddCard.querySelector('.popup__input_type_url');
const cardContainer = document.querySelector('.places__list');


function loadCards(initialCards, deleteCard, likeCard, apprImg) {
  initialCards.forEach((element) => {
    const cardElement = createCard(element, deleteCard, likeCard, apprImg);
    cardContainer.append(cardElement);
  });
};

editButton.addEventListener('click', () => {
  openPopup(popupTypeEdit); 
  fillInputForm();
});

popupTypeEdit.addEventListener('click', closePopupOverlay);
editPopupCloseButton.addEventListener('click', () => {
  closePopup(popupTypeEdit);
})

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

popupNewCard.addEventListener('click', closePopupOverlay)
newCardCloseButton.addEventListener('click', () => {
  closePopup(popupNewCard);
});

//форма редактирования профиля

function fillInputForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);  

//форма добавления карточки

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardArr = {name: newCardName.value, link: newCardUrl.value};
  addNewCard(newCardArr);
  formAddCard.reset();
  closePopup(popupNewCard);
}

function addNewCard(card) {
  const cardElement = createCard(card, deleteCard, likeCard, apprImg); 
  cardContainer.prepend(cardElement); 
}

popupNewCard.addEventListener('submit', handleFormAddCardSubmit); 

//функция приближения карточки

function apprImg (element) {
  openPopup(popupImg);
  popupImgSrc.src = element.link;
  popupImgSrc.alt = element.name;
  popupDesc.textContent = element.name;
}

popupImgCloseBtn.addEventListener('click', () => {
  closePopup(popupImg);
})

popupImg.addEventListener('click', closePopupOverlay);

loadCards(initialCards, deleteCard, likeCard, apprImg);