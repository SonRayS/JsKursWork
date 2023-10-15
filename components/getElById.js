export function getElement() {
    const HeaderComponent = document.querySelector(".header-container");
    const PostHeader = document.querySelectorAll(".post-header");
    const appEl = document.getElementById("app");
    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    const descriptionInput = document.getElementById("descriptionInput");
    const fromError = appEl.querySelector(".form-error");
    const loginInput = document.getElementById("login-input");
    const passwordInput = document.getElementById("password-input");
    const nameInput = document.getElementById("name-input");
    const lableEl = document.querySelector(".file-upload-label");

    const module = {
        HeaderComponent: HeaderComponent,
        PostHeader: PostHeader,
        appEl: appEl,
        uploadImageContainer: uploadImageContainer,
        descriptionInput: descriptionInput,
        fromError: fromError,
        loginInput: loginInput,
        passwordInput: passwordInput,
        nameInput: nameInput,
        lableEl: lableEl,
    };

    return module;
}
