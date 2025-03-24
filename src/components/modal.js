let openedPopup = '';

export function openPopup (popupName) {
  openedPopup = popupName;
  popupName.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape);
};

export function closePopup (popupName) {
  openedPopup = '';
  popupName.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscape);
};

export function closePopupOverlay (evt) {
  if(evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);  
  }
};

export function closePopupEscape (evt) {
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};
