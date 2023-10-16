import { getElement } from "./getElById";
import { handerApiLike } from "../api";
import { handerApiDislike } from "../api";
import { getToken } from "..";
import { renderApp } from "..";
import { getPosts } from "../api";
import { setPosts } from "..";
import { posts } from "..";

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
                        getPosts({ token: getToken() }).then((response) => {
                            setPosts(response);
                            renderApp();
                        });
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
                        getPosts({ token: getToken() }).then((response) => {
                            setPosts(response);
                            renderApp();
                        });
                    });
            }
        });
    });

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
                        getPosts({ token: getToken() }).then((response) => {
                            setPosts(response);
                            renderApp();
                        });
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
                        getPosts({ token: getToken() }).then((response) => {
                            setPosts(response);
                            renderApp();
                        });
                    });
            }
        });
    });
}
