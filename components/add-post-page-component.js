import { renderUploadImageComponent } from "./upload-image-component.js";
import { getToken } from "../index.js";
import { goToPage } from "../index.js";
import { POSTS_PAGE } from "../routes.js";
import { getElement } from "./getElById.js";

/* -------------------------------------------------- */

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
    let imageUrl = "";

    const render = () => {
        const appHtml = `
      
          <div class="page-container">
            <div class="header-container">
              </div>
              
            </div>
                  <div class="form">
                    <h3 class="form-title">Добавить пост</h3>
                    <div class="form-inputs">
                      <div class="upload-image-container">
              <div class="upload=image">
                  
                        <label class="file-upload-label secondary-button">
                            <input type="file" class="file-upload-input" style="display:none">
                            Выберите фото
                        </label>
                      
                  
              </div>
            </div>
                      <label>
                        Опишите фотографию:
                        <textarea id="descriptionInput" class="input textarea" rows="4"></textarea>
                        </label>
                        <button class="button" id="add-button">Добавить</button>
                    </div>
          </div>
        </div>
              `;

        appEl.innerHTML = appHtml;

        if (getElement().uploadImageContainer) {
            renderUploadImageComponent({
                element: getElement().uploadImageContainer,
                onImageUrlChange(newImageUrl) {
                    imageUrl = newImageUrl;
                },
            });
        }

        document.getElementById("add-button").addEventListener("click", () => {
            onAddPostClick({
                description: getElement().descriptionInput.value,
                imageUrl: imageUrl,
                token: getToken(),
            });
            render();
            goToPage(POSTS_PAGE);
        });
    };

    render();
}
