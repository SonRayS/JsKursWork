import { getElement } from "./getElById";
import { handerApiLike } from "../api";
import { handerApiDislike } from "../api";
import { renderApp } from "..";
import { getToken } from "..";

/* -------------------------------------------------- */

export function handerLike({ user }) {
    for (const el of getElement().btnLike) {
        el.addEventListener("click", (event) => {
            event.stopPropagation();

            const index = el.dataset.index;

            if (user[index].isLiked === false) {
                handerApiLike({ isLike: user[index].id, token: getToken() });
            } else {
                handerApiDislike({ isLike: user[index].id, token: getToken() });
            }
            renderApp();
        });
    }
}

/* Если мы обращаемся к true ? false через дату html то в
 зависимости от ответа мы выполняем запрос в api меняя при 
 этом кнопку и счетчик */
/*like-not-active.svg-->*/
