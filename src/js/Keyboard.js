export class Keyboard {
  constructor() {
    (this.elements = {
      main: null,
      keysContainer: null,
      keys: [],
      specialKeys: [],
      textArea: document.querySelector("textarea"),
      keyValue: "",
      keyLayoutEn: [
        "`",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "=",
        "backspace",
        "tab",
        "q",
        "w",
        "e",
        "r",
        "t",
        "y",
        "u",
        "i",
        "o",
        "p",
        "[",
        "]",
        "\\",
        "caps",
        "a",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "k",
        "l",
        ";",
        '"',
        "enter",
        "done",
        "shift",
        "z",
        "x",
        "c",
        "v",
        "b",
        "n",
        "m",
        ",",
        ".",
        "/",
        "↑",
        "ctrl",
        "win",
        "alt",
        "ln",
        "space",
        "del",
        "←",
        "↓",
        "→",
      ],
      keyLayoutRu: [
        "`",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "-",
        "=",
        "backspace",
        "tab",
        "й",
        "ц",
        "у",
        "к",
        "е",
        "н",
        "г",
        "ш",
        "щ",
        "з",
        "х",
        "ъ",
        "|",
        "caps",
        "ф",
        "ы",
        "в",
        "а",
        "п",
        "р",
        "о",
        "л",
        "д",
        "ж",
        "э",
        "enter",
        "done",
        "shift",
        "я",
        "ч",
        "с",
        "м",
        "и",
        "т",
        "ь",
        "б",
        "ю",
        ".",
        "↑",
        "ctrl",
        "win",
        "alt",
        "ln",
        "space",
        "del",
        "←",
        "↓",
        "→",
      ],
      textAreas: document.querySelectorAll(".use-keyboard-input"),
    }),
      (this.eventHandlers = {
        oninput: null,
        onclose: null,
      }),
      (this.properties = {
        value: "",
        capsLock: false,
        lang: "",
        insertLineBreak: "",
      });
  }

  createIconHtml(icon_name) {
    return `<i class="${icon_name}"></i>`;
  }

  init(keyLayout) {
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    this.elements.main.classList.add("keyboard", "keyboard-hidden");
    this.elements.main.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys(keyLayout));
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    this.elements.keys = document.querySelectorAll(".keyboard__key");
    this._bindTextAreaToProperties();
  }

  //Bind textarea-value to properties
  _bindTextAreaToProperties() {
    this.elements.textArea.addEventListener("focus", () => {
      this.open(this.elements.textArea.value, (currentValue) => {
        this.elements.textArea.value = currentValue;
      });
      this.elements.textArea.value = this.properties.value;
    });
    this.elements.textArea.addEventListener("input", () => {
      this.elements.textArea.value = this.properties.value;
    });
  }
  // Change lang alt + shift
  changeLang() {
    let input = document.querySelector("textarea");
    let isAlt = false;
    let isShift = false;
    input.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "alt") {
        e.preventDefault();
        isAlt = true;
      } else if (e.key.toLowerCase() === "shift") {
        isShift = true;
        if (isAlt && isShift) {
          if (this.properties.lang === "en") {
            this.properties.lang = "ru";
          } else {
            this.properties.lang = "en";
          }
          document.querySelector(".keyboard").remove();
          this.init(this.identifyLang());
        }
      }
    });
    input.addEventListener("keyup", (e) => {
      if (e.key.toLowerCase() === "alt") {
        isAlt = false;
      } else if (e.key.toLowerCase() === "shift") {
        isShift = false;
      }
    });
  }
  //Identify how which of lang keyLayout we should use
  identifyLang() {
    if (this.properties.lang === "en") {
      return this.elements.keyLayoutEn;
    } else if (this.properties.lang === "ru") {
      return this.elements.keyLayoutRu;
    }
  }

  //Create Buttons and add 'click'
  _createKeys(keyLayout) {
    const fragment = document.createDocumentFragment();

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      if (this.properties.lang === "en") {
        this.properties.insertLineBreak =
          ["backspace", "\\", "enter", "ctrl"].indexOf(key) !== -1;
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
      } else if (this.properties.lang === "ru") {
        this.properties.insertLineBreak =
          ["backspace", "|", "enter", "ctrl"].indexOf(key) !== -1;
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
      }

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.dataset.key = "backspace";
          keyElement.innerHTML = this.createIconHtml("fa-solid fa-delete-left");

          keyElement.addEventListener("click", () => {
            this.backSpace();
            this._triggerEvent("oninput");
          });
          break;
        case "caps":
          keyElement.dataset.key = "capslock";
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = this.createIconHtml(
            "fa-solid fa-arrow-up-z-a"
          );
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });
          break;
        case "enter":
          keyElement.dataset.key = "enter";
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = this.createIconHtml("fa-solid fa-keyboard");
          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });
          break;
        case "space":
          keyElement.dataset.key = " ";
          keyElement.classList.add("keyboard__key--extra-wide");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });
          break;
        case "done":
          keyElement.innerHTML = this.createIconHtml("fa-solid fa-angle-up");
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });
          break;
        case "ln":
          keyElement.innerHTML = this.createIconHtml("fa-solid fa-globe");
          keyElement.addEventListener("click", () => {
            document.querySelector(".keyboard").remove();
            if (this.properties.lang === "en") {
              this.properties.lang = "ru";
            } else {
              this.properties.lang = "en";
            }

            this.init(this.identifyLang());
          });
          break;
        case "tab":
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value += "    ";
          });
          break;
        case "shift":
          keyElement.textContent = key.toLowerCase();
          keyElement.dataset.key = "shift";
          break;
        case "alt":
          keyElement.textContent = key.toLowerCase();
          this.properties.value = this.properties.value;
          break;
        case "ctrl":
          keyElement.textContent = key.toLowerCase();
          this.properties.value = this.properties.value;
          break;
        case "del":
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            console.log("del");
            this.delete();
            this._triggerEvent("oninput");
          });
          break;

        case "↑":
          keyElement.textContent = key.toLowerCase();
          keyElement.dataset.key = "arrowup";
          keyElement.addEventListener("click", () => {
            keyElement.textContent = key.toLowerCase();
            this.properties.value += "↑";
            this._triggerEvent("oninput");
          });
          break;
        case "↓":
          keyElement.textContent = key.toLowerCase();
          keyElement.dataset.key = "arrowdown";
          keyElement.addEventListener("click", () => {
            keyElement.textContent = key.toLowerCase();
            this.properties.value += "↓";
            this._triggerEvent("oninput");
          });
          break;
        case "←":
          keyElement.textContent = key.toLowerCase();
          keyElement.dataset.key = "arrowleft";
          keyElement.addEventListener("click", () => {
            keyElement.textContent = key.toLowerCase();
            this.properties.value += "←";
            this._triggerEvent("oninput");
          });
          break;
        case "→":
          keyElement.textContent = key.toLowerCase();
          keyElement.dataset.key = "arrowright";
          keyElement.addEventListener("click", () => {
            keyElement.textContent = key.toLowerCase();
            this.properties.value += "→";
            this._triggerEvent("oninput");
          });
          break;
        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }
      fragment.appendChild(keyElement);
      if (this.properties.insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  }

  //Backspace button
  backSpace() {
    let arr = [];
    Array.from(this.properties.value).forEach((el, i) => {
      if (i != this.elements.textArea.selectionStart - 1) {
        arr.push(el);
      }
    });
    this.properties.value = arr.join("");
  }

  //Delete button
  delete() {
    let arr = [];
    Array.from(this.properties.value).forEach((el, i) => {
      if (i != this.elements.textArea.selectionStart) {
        arr.push(el);
      }
    });
    this.properties.value = arr.join("");
  }

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  }

  _toggleCapsLock() {
    if (this.properties.capsLock) {
      this.properties.capsLock = false;
    } else {
      this.properties.capsLock = true;
    }

    this.elements.keys.forEach((el) => {
      if (
        el.children.length === 0 &&
        el.textContent != "tab" &&
        el.textContent != "del" &&
        el.textContent != "shift" &&
        el.textContent != "win" &&
        el.textContent != "alt" &&
        el.textContent != "ctrl"
      ) {
        el.textContent = this.properties.capsLock
          ? el.textContent.toUpperCase()
          : el.textContent.toLowerCase();
      }
    });
  }

  //Show the keyboard
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  }
  //close the keyboard
  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }

  //Add keydown on buttons
  _keyClick() {
    window.addEventListener("keydown", (e) => {
      this.elements.keyValue = "";
      if (this.properties.capsLock) {
        if (e.key != "CapsLock") {
          this._keyChecking(e);
        }
        this.elements.keyValue = this.elements.keyValue.toUpperCase();

        this.properties.value += this.elements.keyValue;
      } else if (!this.properties.capsLock) {
        this._keyChecking(e);
        this.properties.value += this.elements.keyValue.toLowerCase();
      }
    });
  }

  //Check up which of buttons is clicked
  _keyChecking(e) {
    switch (e.key) {
      case "Backspace":
        this.backSpace();
        break;
      case "CapsLock":
        e.preventDefault();
        break;
      case "Enter":
        this.properties.value += "\n";
        break;
      case " ":
        this.properties.value += " ";
        break;
      case "Tab":
        e.preventDefault();
        this.properties.value += "    ";
        break;
      case "Shift":
        this.properties.value = this.properties.value;
        this.keyDownShift();
        break;
      case "Alt":
        this.properties.value = this.properties.value;
        break;
      case "Control":
        this.properties.value = this.properties.value;
        break;
      case "Delete":
        this.delete();
        break;
      case "ArrowUp":
        e.preventDefault();
        this.elements.textArea.value += "↑";
        this.properties.value += "↑";
        break;
      case "ArrowLeft":
        e.preventDefault();
        this.elements.textArea.value += "←";
        this.properties.value += "←";
        break;
      case "ArrowRight":
        e.preventDefault();
        this.elements.textArea.value += "→";
        this.properties.value += "→";
        break;
      case "ArrowDown":
        e.preventDefault();
        this.elements.textArea.value += "↓";
        break;

      default:
        this.elements.keyValue = e.key;
    }
  }
  // Keydown on shift for uppercase
  keyDownShift() {
    const shift = document.querySelector("[data-key='shift']");
    let textArea = document.querySelector("textarea");
    let isShift = false;
    textArea.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "shift") {
        isShift = true;
        if (isShift) {
          this.properties.capsLock = true;
          shift.classList.add("keyboard__key-active");
        }
      }
    });
    textArea.addEventListener("keyup", (e) => {
      if (e.key.toLowerCase() === "shift") {
        isShift = false;
        this.properties.capsLock = false;
      }
    });
  }

  //Add active class for arrows
  addActiveArrows(el) {
    el.classList.add("keyboard__key-active");
    window.addEventListener("keyup", () => {
      el.classList.remove("keyboard__key-active");
    });
  }

  // Add class "active" for clicked buttons
  _addActiveButton() {
    this.elements.textArea.addEventListener("keydown", (e) => {
      this.elements.keys.forEach((el) => {
        if (el.dataset.key === e.key.toLowerCase()) {
          if (el.dataset.key === "capslock") {
            // this.properties.capsLock = !this.properties.capsLock;
            this._toggleCapsLock();
            el.classList.toggle("keyboard__key--active");
          }
          el.classList.add("keyboard__key-active");
          window.addEventListener("keyup", () => {
            el.classList.remove("keyboard__key-active");
          });
        } else if (e.key.toLowerCase() === el.textContent.toLowerCase()) {
          el.classList.add("keyboard__key-active");
          window.addEventListener("keyup", () => {
            el.classList.remove("keyboard__key-active");
          });
        }
      });
    });
  }
}
