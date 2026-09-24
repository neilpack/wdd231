// select the button element
const colorBtn = document.getElementById('colorToggleBtn');

// add a click event listener
colorBtn.addEventListener('click', () => {
    // toggles 'alt-bg' class on the body tag
    document.body.classList.toggle('alt-bg');
});