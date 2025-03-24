export function popupOpen (popupName) {
  popupName.classList.add('popup_is-opened');
  document.addEventListener('keydown', function (evt) {
    popupCloseEscape(evt, popupName);
  });
};

export function popupClose (popupName) {
  popupName.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', function (evt) {
    popupCloseEscape(evt, popupName);
  });
};

export function popupCloseOverlay (evt) {
  if(evt.currentTarget === evt.target) {
    popupClose(evt.currentTarget);
  }
};

export function popupCloseEscape (evt, popupName) {
  if (evt.key === 'Escape') {
    popupClose(popupName);
  }
};
