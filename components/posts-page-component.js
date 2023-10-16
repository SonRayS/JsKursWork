import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { getElement } from "./getElById.js";
import { dateFns } from "./formatDate.js";
import { handerLike } from "./isLike.js";

/* -------------------------------------------------- */

export function renderPostsPageComponent({ appEl }) {
    console.log("Актуальный список постов:", posts);

    const appHtml = posts
        .map((el, index) => {
            return `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                <li class="post">
                <div class="post-header" data-user-id="${el.user.id}">
                    <img src="${
                        el.user.imageUrl
                    }" class="post-header__user-image">
                    <p class="post-header__user-name">${el.user.name}</p>
                </div>
                <div class="post-image-container">
                  <img class="post-image" src="${el.imageUrl}">
                </div>
                <div class="post-likes">
                  <button data-index="${index}" 
                  data-post-id="${el.id}" 
                  data-isLike="${el.isLiked}" class="like-button">
                  <img src="${
                      el.isLiked
                          ? `./assets/images/like-active.svg`
                          : `./assets/images/like-not-active.svg`
                  }">
                  </button>
                  <p class="post-likes-text">
                  Нравится: <strong>${
                      el.likes.length >= 1 ? el.likes[0].name : "0"
                  }</strong> ${
                el.likes.length - 1 > 0
                    ? "и ещё" + " " + (el.likes.length - 1)
                    : ""
            }
                  </p>
                </div>
                <p class="post-text">
                  <span class="user-name">${el.user.name}</span>
                  ${el.description}
                </p>
                <p class="post-date">
                  ${dateFns(el.createdAt)}
                </p>
                </li>
                </ul>
              </div>`;
        })
        .join("");

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: getElement().HeaderComponent,
    });

    for (let userEl of getElement().PostHeader) {
        userEl.addEventListener("click", () => {
            goToPage(USER_POSTS_PAGE, {
                userId: userEl.dataset.userId,
            });
        });
    }

    handerLike();
}
