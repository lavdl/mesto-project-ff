// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
function createCard(element, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImage.src = element.link;
  cardImage.alt = `Изображение места: ${element.name}`;
  cardTitle.textContent = element.name;
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  return cardElement;
}
function loadCards(initialCards, deleteCard) {
  initialCards.forEach((element) => {
    const cardElement = createCard(element, deleteCard);
    cardContainer.append(cardElement);
  });
}
const deleteCard = (cardElement) => {
  cardElement.closest(".places__item").remove();
};
loadCards(initialCards, deleteCard);
