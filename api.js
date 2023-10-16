const personalKey = "Hryn-illia";
const baseHost = "https://wedev-api.sky.pro";
export const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
    return fetch(postsHost, {
        method: "GET",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error("Нет авторизации");
            }

            return response.json();
        })
        .then((data) => {
            return data.posts;
        });
}

export function registerUser({ login, password, name, imageUrl }) {
    return fetch(baseHost + "/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Такой пользователь уже существует");
        }
        return response.json();
    });
}

export function loginUser({ login, password }) {
    return fetch(baseHost + "/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Неверный логин или пароль");
        }
        return response.json();
    });
}

export function uploadImage({ file }) {
    const data = new FormData();
    data.append("file", file);

    return fetch(baseHost + "/api/upload/image", {
        method: "POST",
        body: data,
    }).then((response) => {
        console.log(response.url);
        return response.json();
    });
}

export function onAddPostClick({ description, imageUrl, token }) {
    return fetch(postsHost, {
        method: "POST",
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            description,
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error(
                " В теле запроса не передан description / В теле запроса не передан imageUrl / В description пустая строчка "
            );
        }

        return response.json();
    });
}

export function userPosts({ userIdTest }) {
    return fetch(postsHost + `/user-posts/${userIdTest}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data.posts;
        });
}

export function handerApiLike({ isLike, token }) {
    return fetch(postsHost + `/${isLike}/like`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            /* console.log(response); */
            return response;
        });
}

export function handerApiDislike({ isLike, token }) {
    return fetch(postsHost + `/${isLike}/dislike`, {
        method: "POST",
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            /* console.log(response); */
            return response;
        });
}
