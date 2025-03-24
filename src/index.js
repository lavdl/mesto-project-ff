// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, loadCards, deleteCard, cardLike} from './components/card.js';
import {popupOpen, popupClose, popupCloseOverlay, popupCloseEscape} from './components/modal.js';

const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit')
const editPopupCloseButton = popupTypeEdit.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const formElement = popupTypeEdit.querySelector('.popup__form') 
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title'); 
const profileDesc = document.querySelector('.profile__description');
const popupImg = document.querySelector('.popup_type_image');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');
const popupImgSrc = popupImg.querySelector('.popup__image');
const popupDesc = popupImg.querySelector('.popup__caption');
const formAddCard = popupNewCard.querySelector('.popup__form') 
const newCardName = formAddCard.querySelector('.popup__input_type_card-name');
const newCardUrl = formAddCard.querySelector('.popup__input_type_url');


editButton.addEventListener('click', () => {
  popupOpen(popupTypeEdit); 
  formFill();
});

popupTypeEdit.addEventListener('click', popupCloseOverlay);
editPopupCloseButton.addEventListener('click', () => {
  popupClose(popupTypeEdit);
})

addButton.addEventListener('click', () => {
  popupOpen(popupNewCard);
});

popupNewCard.addEventListener('click', popupCloseOverlay)
newCardCloseButton.addEventListener('click', () => {
  popupClose(popupNewCard);
});

//форма редактирования профиля

function formFill () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  popupClose(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);  

//форма добавления карточки

function cardHandeFormSubmit(evt) {
  evt.preventDefault();
  const newCardArr = {name: newCardName.value, link: newCardUrl.value};
  initialCards.push(newCardArr);
  addNewCard(newCardArr);
  formAddCard.reset();
  popupClose(popupNewCard);
}

function addNewCard(card) {
  const cardElement = createCard(card, deleteCard, cardLike, imgAppr); 
  document.querySelector('.places__list').prepend(cardElement); 
}

popupNewCard.addEventListener('submit', cardHandeFormSubmit); 

//функция приближения карточки

function imgAppr (evt) {
  popupOpen(popupImg);
  popupImgSrc.src = evt.target.src;
  popupImgSrc.alt = evt.target.alt;
  popupDesc.textContent = evt.target.alt;
}

popupImgCloseBtn.addEventListener('click', () => {
  popupClose(popupImg);
})

popupImg.addEventListener('click', popupCloseOverlay);

loadCards(initialCards, deleteCard, cardLike, imgAppr);