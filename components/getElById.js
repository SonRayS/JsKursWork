export function getElement() {
    const HeaderComponent = document.querySelector(".header-container");
    const PostHeader = document.querySelectorAll(".post-header");

    const module = {
        HeaderComponent: HeaderComponent,
        PostHeader: PostHeader,
    };

    return module;
}
