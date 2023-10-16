import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { page } from "../index.js";

/* -------------------------------------------------- */

export function imgUserPosts({ el }) {
    if (page === POSTS_PAGE) {
        return `<div class="post-header" data-user-id="${el.user.id}">
                        <img src="${el.user.imageUrl}" 
                        class="post-header__user-image">
                        <p class="post-header__user-name">${el.user.name}</p>
                </div>`;
    } else {
        return "";
    }
}
