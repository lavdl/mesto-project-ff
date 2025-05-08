// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, deleteCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupOverlay, closePopupEscape} from './components/modal.js';
import {showInputError, hideInputError, isValid, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, clearValidation, validationConfig} from './components/validation.js';
import {getUser, getCardsList, editProfile, addNewCardApi, updateAvatar, deleteCardApi, likeApi} from './components/api.js';

const editButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit')
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar')
const editPopupCloseButton = popupTypeEdit.querySelector('.popup__close');
const editPopupAvatarCloseButton = popupTypeEditAvatar.querySelector('.popup__close');
const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const formEditProfile = popupTypeEdit.querySelector('.popup__form');
const formUpdateAvatar = popupTypeEditAvatar.querySelector('.popup__form') 
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title'); 
const profileDesc = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupImg = document.querySelector('.popup_type_image');
const popupImgCloseBtn = popupImg.querySelector('.popup__close');
const popupImgSrc = popupImg.querySelector('.popup__image');
const popupDesc = popupImg.querySelector('.popup__caption');
const formAddCard = popupNewCard.querySelector('.popup__form') 
const newCardName = formAddCard.querySelector('.popup__input_type_card-name');
const updateAvatarUrl = formUpdateAvatar.querySelector('.popup__input_type_url');
const newCardUrl = formAddCard.querySelector('.popup__input_type_url');
const cardContainer = document.querySelector('.places__list');
const loadCardArr = [];

function loadCards(cardsData, deleteCard, likeCard, apprImg) {
  const userId = '9ea42ce8114de9903985c7c8';
  cardsData.forEach((element) => {
    const isLiked = element.likes.some(function(likesList){
      return likesList._id === userId;
    });
    const card = {name: element.name, link: element.link, likes: element.likes.length > 0 ? element.likes.length : '', ownerId: element.owner._id, cardId:element._id, isLiked: isLiked}
    loadCardArr.push(card);
  })
  loadCardArr.forEach((element) => {
    const cardElement = createCard(element, deleteCard, likeCard, apprImg);
    cardContainer.append(cardElement);
  });
};

editButton.addEventListener('click', () => {
  openPopup(popupTypeEdit); 
  fillInputForm();
  clearValidation(formEditProfile, validationConfig);
});

popupTypeEdit.addEventListener('click', closePopupOverlay);
editPopupCloseButton.addEventListener('click', () => {
  closePopup(popupTypeEdit);
})

profileAvatar.addEventListener('click', () => {
  openPopup(popupTypeEditAvatar); 
  fillInputForm();
  clearValidation(formEditProfile, validationConfig);
});

popupTypeEditAvatar.addEventListener('click', closePopupOverlay);
editPopupAvatarCloseButton.addEventListener('click', () => {
  closePopup(popupTypeEditAvatar);
})

addButton.addEventListener('click', () => {
  openPopup(popupNewCard);
});

popupNewCard.addEventListener('click', closePopupOverlay)
newCardCloseButton.addEventListener('click', () => {
  closePopup(popupNewCard);
});

function fillInputForm () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
}

function loadProfile (data) {
  profileName.textContent = data.name;
  profileDesc.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
}

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formEditProfile);
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  editProfile(nameInput, jobInput)
  .finally(() => {
    renderLoading(false, formEditProfile);
    closePopup(popupTypeEdit);
  });
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);  

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formAddCard);
  addNewCardApi(newCardName, newCardUrl)
  .then((data) => {
    const newCardArr = {name: data.name, link: data.link, ownerId: data.owner._id, cardId:data._id}
    addNewCard(newCardArr);
  })
  .finally(() => {
    renderLoading(false, formAddCard);
    formAddCard.reset();
    closePopup(popupNewCard);
    clearValidation(formAddCard, validationConfig);
  });
}

function addNewCard(card) {
  const cardElement = createCard(card, deleteCard, likeCard, apprImg); 
  console.log(card)
  cardContainer.prepend(cardElement); 
}

popupNewCard.addEventListener('submit', handleFormAddCardSubmit); 

function handleFormUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formUpdateAvatar);
  updateAvatar(updateAvatarUrl, profileAvatar)
  .finally(() => {
    renderLoading(false, formUpdateAvatar);
    formUpdateAvatar.reset();
    closePopup(popupTypeEditAvatar);
    clearValidation(formUpdateAvatar, validationConfig);
  })
}

popupTypeEditAvatar.addEventListener('submit', handleFormUpdateAvatarSubmit); 

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

enableValidation(validationConfig); 

function renderLoading (isLoading, form) {
  const submitButton = form.querySelector('.popup__button');
  if (isLoading) {
    submitButton.textContent = 'Сохранение...'
  } else {
    submitButton.textContent = 'Сохранить'
  }
}

Promise.all([getUser(), getCardsList()])
.then(([userData, cardsData]) => {
  loadProfile(userData);
  loadCards(cardsData, deleteCard, likeCard, apprImg);
})
.catch((err) => {
  console.log(err);
});