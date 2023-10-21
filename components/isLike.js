import { getElement } from "./getElById";
import { handerApiLike } from "../api";
import { handerApiDislike } from "../api";
import { getToken } from "..";
import { renderApp } from "..";
import { getPosts } from "../api";
import { setPosts } from "..";
import { posts } from "..";
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { page } from "../index.js";
import { userPosts } from "../api";
import { renderPostsPageComponent } from "./posts-page-component";

/* -------------------------------------------------- */

export function handerLike() {
    getElement().btnLike.forEach((btnLike) => {
        btnLike.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = btnLike.dataset.index;

            if (posts[index].isLiked) {
                handerApiDislike({
                    isLike: posts[index].id,
                    token: getToken(),
                })
                    .then(() => {
                        posts[index].isLiked = false;
                    })
                    .then(() => {
                        if (page === POSTS_PAGE) {
                            getPosts({ token: getToken() }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        } else {
                            userPosts({
                                userIdTest: posts[index].user.id,
                                token: getToken(),
                            }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        }
                    });
            } else {
                handerApiLike({
                    isLike: posts[index].id,
                    token: getToken(),
                })
                    .then(() => {
                        posts[index].isLiked = true;
                    })
                    .then(() => {
                        if (page === POSTS_PAGE) {
                            getPosts({ token: getToken() }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        } else {
                            userPosts({
                                userIdTest: posts[index].user.id,
                                token: getToken(),
                            }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        }
                    });
            }
        });
    });

    /* -------------------------------------------------- */
    /* -------------------------------------------------- */
    /* -------------------------------------------------- */
    /* -------------------------------------------------- */

    getElement().likeDoubleClick.forEach((likeDoubleClick) => {
        likeDoubleClick.addEventListener("dblclick", (event) => {
            event.stopPropagation();
            const index = likeDoubleClick.dataset.index;

            if (posts[index].isLiked) {
                handerApiDislike({
                    isLike: posts[index].id,
                    token: getToken(),
                })
                    .then(() => {
                        posts[index].isLiked = false;
                    })
                    .then(() => {
                        if (page === POSTS_PAGE) {
                            getPosts({ token: getToken() }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        } else if (page === USER_POSTS_PAGE) {
                            userPosts({
                                userIdTest: posts[index].user.id,
                            }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        }
                    });
            } else if (page === USER_POSTS_PAGE) {
                handerApiLike({
                    isLike: posts[index].id,
                    token: getToken(),
                })
                    .then(() => {
                        posts[index].isLiked = true;
                    })
                    .then(() => {
                        if (page === POSTS_PAGE) {
                            getPosts({ token: getToken() }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        } else if (page === USER_POSTS_PAGE) {
                            userPosts({
                                userIdTest: posts[index].user.id,
                            }).then((response) => {
                                setPosts(response);
                                renderApp();
                            });
                        }
                    });
            }
        });
    });
}
