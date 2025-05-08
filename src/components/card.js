import {deleteCardApi, likeApi} from './api.js';
import {openPopup, closePopup, closePopupOverlay, closePopupEscape} from './modal.js';

export function createCard(element, deleteCard, likeCard, apprImg) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const popupDeleteCard = document.querySelector('.popup_type_delete_card')
  const deleteCardPopupCloseButton = popupDeleteCard.querySelector('.popup__close');
  const ownerId = element.ownerId;
  const cardId = element.cardId;
  const isLiked = element.isLiked;
  let currentIsLiked = isLiked;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  likeCounter.textContent = element.likes;
  console.log(element.ownerId)
  console.log(ownerId)
  if (ownerId != '9ea42ce8114de9903985c7c8') {
    deleteButton.style.display = 'none';
  }
  if (isLiked) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  deleteButton.addEventListener("click", () => {
    openPopup(popupDeleteCard);
    popupDeleteCard.addEventListener('submit', handleFormDeleteCardSubmit); 
  });
  popupDeleteCard.addEventListener('click', closePopupOverlay);
  deleteCardPopupCloseButton.addEventListener('click', () => {
    closePopup(popupDeleteCard);
  })
  function handleFormDeleteCardSubmit(evt) {
    evt.preventDefault();
    deleteCard(cardElement, cardId)
    closePopup(popupDeleteCard);
  }
  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
    likeApi(currentIsLiked, cardId, likeCounter)
    .then((likes) => {
      if (likes) {
        if (likes.length === 0) {
          likeCounter.textContent = '';
          currentIsLiked = !currentIsLiked;
        } else {
          likeCounter.textContent = likes.length;
          currentIsLiked = !currentIsLiked;
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
  });
  cardImage.addEventListener('click', () => {
    apprImg(element);
  });
  return cardElement;
};

export const deleteCard = (cardElement, cardId) => {
  cardElement.closest(".places__item").remove();
  deleteCardApi(cardId);
};

export function likeCard (likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};