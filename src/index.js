import "./style/style.scss";

import { Keyboard } from "./js/Keyboard";
import { textArea } from "./js/createTextArea";

const lang = getLocalStorage();

//Build textarea
textArea();

let keyboard = new Keyboard();
if (lang === "ru") {
  keyboard.properties.lang = "ru";
  keyboard.init(keyboard.elements.keyLayoutRu);
  keyboard.changeLang();
  keyboard._keyClick();
  keyboard._addActiveButton();
  console.log(keyboard.properties.lang);
} else {
  keyboard.properties.lang = "en";
  keyboard.init(keyboard.elements.keyLayoutEn);
  keyboard.changeLang();
  keyboard._keyClick();
  keyboard._addActiveButton();
}

// Not lose focus from textArea
document.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("keyboard__key", "keyboard__keys", "keyboard")
  ) {
    evt.preventDefault();
  }
});

//LocalStorage
function setLocalStorage() {
  return localStorage.setItem("lang", JSON.stringify(keyboard.properties.lang));
}
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("lang"));
}
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
console.log(
  "1.Проверьте чтобы язык на Вашей клавиатурe совпадал с клавиатурой виртуальной(особенно при проверке задания на работу local storage)"
);
console.log(
  "2.Следите,чтобы CapsLock на Вашей клавиатуре совпадал с виртуальной"
);
