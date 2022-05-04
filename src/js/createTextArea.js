export const textArea = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  const textArea = document.createElement("textarea");
  const title = document.createElement("h1");
  title.textContent = "OS Windows";
  textArea.classList.add("use-keyboard-input");
  textArea.setAttribute("placeholder", "Please input your text...");
  container.appendChild(title);
  container.appendChild(textArea);
  document.querySelector("body").appendChild(container);
};
