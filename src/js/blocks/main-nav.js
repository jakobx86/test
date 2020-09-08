let mainNav = $(".main-nav");
let html = $("html");
let body = $("body");

$('.main-nav__toggle').on('click', function (event) {
    event.preventDefault();

    html.toggleClass('no-scroll');
    body.toggleClass('no-scroll');

    // disable scrolling in iOS mobile devices
    if (body.hasClass('no-scroll')) {
        body.on('touchmove', function (e) {
            e.preventDefault();
        });
    }

    mainNav.toggleClass('main-nav--opened');
});
