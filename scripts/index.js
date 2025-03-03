// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
function loadCards(initialCards, deleteCard) {
  initialCards.forEach((element) => {
    const cardElement = cardTemplate
      .querySelector(".places__item")
      .cloneNode(true);
    cardElement.querySelector(".card__image").src = element.link;
    cardElement.querySelector(".card__title").textContent = element.name;
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
    });
    cardContainer.append(cardElement);
  });
};
const deleteCard = (cardElement) => {
  cardElement.closest(".places__item").remove();
};
loadCards(initialCards, deleteCard);
