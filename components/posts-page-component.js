import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
    console.log("Актуальный список постов:", posts);

    /**
     * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
     * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
     */

    const appHtml = posts.map((el, index) => {
        return `<div class="page-container">
                  <div class="header-container">
                    <ul class="posts">
                        <li class="post">
                            <div class="post-header" data-user-id="${el.user.id}">
                                <img src="${el.user.imageUrl}" class="post-header__user-image">
                                <p class="post-header__user-name">${el.user.name}</p>
                            </div>
                            <div class="post-image-container">
                              <img class="post-image" src="${el.imageUrl}">
                            </div>
                            <div class="post-likes">
                              <button data-post-id="${el.id}" class="like-button">
                                <img src="./assets/images/like-active.svg">
                              </button>
                              <p class="post-likes-text">
                                Нравится: <strong>${el.likes.length}</strong>
                              </p>
                            </div>
                            <p class="post-text">
                              <span class="user-name">${el.user.name}</span>
                              ${el.description}
                            </p>
                            <p class="post-date">
                              19 минут назад
                            </p>
                        </li>
                    </ul>
                  </div>
                </div>`;
    });

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });

    for (let el of document.querySelectorAll(".post-header")) {
        el.addEventListener("click", () => {
            goToPage(USER_POSTS_PAGE, {
                userId: el.dataset.userId,
            });
        });
    }
}
