import { initialCards } from "./cards";
export function createCard(element, deleteCard, cardLike, imgAppr) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  likeButton.addEventListener("click", () => {
    cardLike(likeButton);
  });
  cardImage.addEventListener('click', imgAppr);
  return cardElement;
};

export function loadCards(initialCards, deleteCard, cardLike, imgAppr) {
  initialCards.forEach((element) => {
    const cardContainer = document.querySelector('.places__list');
    const cardElement = createCard(element, deleteCard, cardLike, imgAppr);
    cardContainer.append(cardElement);
  });
};

export const deleteCard = (cardElement) => {
  cardElement.closest(".places__item").remove();
};

export function cardLike (likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};

