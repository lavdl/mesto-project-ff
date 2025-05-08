// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCard, likeCard} from './components/card.js';
import {openPopup, closePopup, closePopupOverlay, closePopupEscape} from './components/modal.js';
import {enableValidation, clearValidation, validationConfig} from './components/validation.js';
import {getUser, getCardsList, editProfile, addNewCardApi, updateAvatar, deleteCardApi, likeApi, onLoadInfo} from './components/api.js';

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
const popupDeleteCard = document.querySelector('.popup_type_delete_card')
const deleteCardPopupCloseButton = popupDeleteCard.querySelector('.popup__close');
const loadCardArr = [];
let ownerProfileId = '';
let currentCard = '';
let currentCardId = '';

function loadProfile (data) {
  ownerProfileId = data._id;
  profileName.textContent = data.name;
  profileDesc.textContent = data.about;
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
}

function loadCards(cardsData, deleteCard, likeCard, openPopupImage, onLikeCard, ownerProfileId) {
  cardsData.forEach((element) => {
    const card = {name: element.name, link: element.link, likes: element.likes.length > 0 ? element.likes.length : '', ownerId: element.owner._id, cardId:element._id, likesList: element.likes}
    loadCardArr.push(card);
  })
  loadCardArr.forEach((element) => {
    const cardElement = createCard(element, deleteCard, likeCard, openPopupImage, onLikeCard, ownerProfileId);
    cardContainer.append(cardElement);
  });
};

function onLikeCard (likeStatus, cardId, likeCounter, likeButton) {
  likeApi(likeStatus.isLiked, cardId)
  .then(({likes, isLikedApi}) => {
    if (likes) {
      if (likes.length === 0) {
        likeCounter.textContent = '';
        likeStatus.isLiked = isLikedApi;
        likeCard(likeButton);
      } else {
        likeCounter.textContent = likes.length;
        likeStatus.isLiked = isLikedApi;
        likeCard(likeButton);
      }
    }
  })
  .catch((err) => {
    console.log(err)
  })
}

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

Promise.all([getUser(), getCardsList()])
  .then(([userData, cardsData]) => {
    loadProfile(userData);
    loadCards(cardsData, deleteCard, likeCard, openPopupImage, onLikeCard, ownerProfileId);
  })
  .catch((err) => {
    console.log(err);
  });

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formEditProfile);
  editProfile(nameInput, jobInput)
  .then(() => {
    profileName.textContent = nameInput.value;
    profileDesc.textContent = jobInput.value;
    closePopup(popupTypeEdit);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, formEditProfile);
  });
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);  

function handleFormAddCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formAddCard);
  addNewCardApi(newCardName, newCardUrl)
  .then((data) => {
    const newCardArr = {name: data.name, link: data.link, ownerId: data.owner._id, cardId:data._id, likesList: data.likes}
    addNewCard(newCardArr);
    formAddCard.reset();
    clearValidation(formAddCard, validationConfig);
    closePopup(popupNewCard);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, formAddCard);
  });
}

function addNewCard(card) {
  const cardElement = createCard(card, deleteCard, likeCard, openPopupImage, onLikeCard, ownerProfileId); 
  console.log(card)
  cardContainer.prepend(cardElement); 
}

popupNewCard.addEventListener('submit', handleFormAddCardSubmit); 

function handleFormUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, formUpdateAvatar);
  updateAvatar(updateAvatarUrl)
  .then((data) => {
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, formUpdateAvatar);
    formUpdateAvatar.reset();
    closePopup(popupTypeEditAvatar);
    clearValidation(formUpdateAvatar, validationConfig);
  })
}

popupTypeEditAvatar.addEventListener('submit', handleFormUpdateAvatarSubmit); 

function openPopupImage (element) {
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

function deleteCard (cardElement, cardId) {
  currentCard = cardElement;
  currentCardId = cardId;
  openPopup(popupDeleteCard);
}

function handleFormDeleteCardSubmit(evt) {
   evt.preventDefault();
   onDeleteCard(currentCard, currentCardId)
   closePopup(popupDeleteCard);
}

popupDeleteCard.addEventListener('submit', handleFormDeleteCardSubmit);

popupDeleteCard.addEventListener('click', closePopupOverlay);
 deleteCardPopupCloseButton.addEventListener('click', () => {
   closePopup(popupDeleteCard);
 })

const onDeleteCard = (cardElement, cardId) => {
  deleteCardApi(cardId)
  .then(() => {
    cardElement.closest(".places__item").remove();
    closePopup(popupDeleteCard);
  })
  .catch((err) => {
    console.log(err)
  });
};
