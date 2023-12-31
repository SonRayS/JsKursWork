import { loginUser, registerUser } from "../api.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import { getElement } from "./getElById.js";

/* -------------------------------------------------- */

export function renderAuthPageComponent({ appEl, setUser }) {
    let isLoginMode = true;
    let imageUrl = "";

    const renderForm = () => {
        const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
                ${
                    isLoginMode
                        ? "Вход в&nbsp;Instapro"
                        : "Регистрация в&nbsp;Instapro"
                }
                </h3>
              <div class="form-inputs">
    
                  ${
                      !isLoginMode
                          ? `
                      <div class="upload-image-container"></div>
                      <input type="text" id="name-input" class="input" placeholder="Имя" />
                      `
                          : ""
                  }
                  
                  <input type="text" id="login-input" class="input" placeholder="Логин" />
                  <input type="password" id="password-input" class="input" placeholder="Пароль" />
                  
                  <div class="form-error"></div>
                  
                  <button class="button" id="login-button">${
                      isLoginMode ? "Войти" : "Зарегистрироваться"
                  }</button>
              </div>
            
              <div class="form-footer">
                <p class="form-footer-title">
                  ${isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                  <button class="link-button" id="toggle-button">
                    ${isLoginMode ? "Зарегистрироваться." : "Войти."}
                  </button>
                </p> 
               
              </div>
          </div>
      </div>    
`;

        appEl.innerHTML = appHtml;

        // Не вызываем перерендер, чтобы не сбрасывалась заполненная форма
        // Точечно обновляем кусочек дом дерева
        const setError = (message) => {
            getElement().fromError.textContent = message;
        };

        if (getElement().uploadImageContainer) {
            renderUploadImageComponent({
                element: getElement().uploadImageContainer,
                onImageUrlChange(newImageUrl) {
                    imageUrl = newImageUrl;
                },
            });
        }

        document
            .getElementById("login-button")
            .addEventListener("click", () => {
                setError("");

                if (isLoginMode) {
                    const login = getElement().loginInput.value;
                    const password = getElement().passwordInput.value;

                    if (!login) {
                        alert("Введите логин");
                        return;
                    }

                    if (!password) {
                        alert("Введите пароль");
                        return;
                    }

                    loginUser({
                        login: login
                            .replaceAll("<", "&lt")
                            .replaceAll(">", "&gt")
                            .replaceAll('"', "&quot;")
                            .replaceAll("&", "&amp;"),
                        password: password
                            .replaceAll("<", "&lt")
                            .replaceAll(">", "&gt")
                            .replaceAll('"', "&quot;")
                            .replaceAll("&", "&amp;"),
                    })
                        .then((user) => {
                            setUser(user.user);
                        })
                        .catch((error) => {
                            console.warn(error);
                            setError(error.message);
                        });
                } else {
                    const login = getElement().loginInput.value;
                    const name = getElement().nameInput.value;
                    const password = getElement().passwordInput.value;
                    if (!name) {
                        alert("Введите имя");
                        return;
                    }
                    if (!login) {
                        alert("Введите логин");
                        return;
                    }

                    if (!password) {
                        alert("Введите пароль");
                        return;
                    }

                    if (!imageUrl) {
                        alert("Не выбрана фотография");
                        return;
                    }

                    registerUser({
                        login: login
                            .replaceAll("<", "&lt")
                            .replaceAll(">", "&gt")
                            .replaceAll('"', "&quot;")
                            .replaceAll("&", "&amp;"),
                        password: password
                            .replaceAll("<", "&lt")
                            .replaceAll(">", "&gt")
                            .replaceAll('"', "&quot;")
                            .replaceAll("&", "&amp;"),
                        name: name
                            .replaceAll("<", "&lt")
                            .replaceAll(">", "&gt")
                            .replaceAll('"', "&quot;")
                            .replaceAll("&", "&amp;"),
                        imageUrl,
                    })
                        .then((user) => {
                            setUser(user.user);
                        })
                        .catch((error) => {
                            console.warn(error);
                            setError(error.message);
                        });
                }
            });

        document
            .getElementById("toggle-button")
            .addEventListener("click", () => {
                isLoginMode = !isLoginMode;
                renderForm();
            });
    };

    renderForm();
}
