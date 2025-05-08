export function createCard(element, deleteCard, likeCard, openPopupImage, onLikeCard, ownerProfileId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const ownerId = element.ownerId;
  const cardId = element.cardId;
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;
  likeCounter.textContent = element.likes;
  const isLiked = element.likesList.some(function(likesList){
    return likesList._id === ownerProfileId;
  });

  const likeStatus = {isLiked: isLiked};

  deleteButton.addEventListener("click", () => { 
    deleteCard(cardElement, cardId);
  });

  likeButton.addEventListener("click", () => {
    onLikeCard(likeStatus, cardId, likeCounter, likeButton);
  });

  if (ownerId != ownerProfileId) {
    deleteButton.style.display = 'none';
  }

  if (isLiked) {
    likeButton.classList.toggle('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => {
    openPopupImage(element);
  });
  
  return cardElement;
};

export function likeCard (likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
};
