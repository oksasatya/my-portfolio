/*
* ----------------------------------------------------------------------------------------
Author       : Tanvir Hossain
Template Name: Nino - Premium Portfolio Template
Version      : 1.0
* ----------------------------------------------------------------------------------------
*/


(function ($) {
    "use strict";


    /*
     * ----------------------------------------------------------------------------------------
     *  SWIPER JS
     * ----------------------------------------------------------------------------------------
     */
    var postboxSlider = new Swiper('.postbox__slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 3000,
        },
        // Navigation arrows
        navigation: {
            nextEl: ".postbox-slider-button-next",
            prevEl: ".postbox-slider-button-prev",
        },
        breakpoints: {
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });

    /*
     * ----------------------------------------------------------------------------------------
     *  EXTRA JS
     * ----------------------------------------------------------------------------------------
     */
    if ($('.counter-text-wrap').length) {
        $('.counter-text-wrap').appear(function () {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function () {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {
            accY: 0
        });
    }

    /*
     * ----------------------------------------------------------------------------------------
     *  EXTRA JS
     * ----------------------------------------------------------------------------------------
     */

    $('#mobile-menu').meanmenu({
        meanMenuContainer: '.mobile-menu',
        meanScreenWidth: "991",
        meanExpand: ['<i class="fal fa-plus"></i>'],
    });

    $(".sidebar__close-btn ,.mobile-menu .onepage li a  > *:not(button)").on("click", function () {
        $(".sidebar__area").removeClass("sidebar-opened");
        $(".body-overlay").removeClass("opened");
    });

    $(".sidebar-toggle-btn").on("click", function () {
        $(".sidebar__area").addClass("sidebar-opened");
        $(".body-overlay").addClass("opened");
    });
    $(".sidebar__close-btn").on("click", function () {
        $(".sidebar__area").removeClass("sidebar-opened");
        $(".body-overlay").removeClass("opened");
    });

    $(".body-overlay").on("click", function () {
        $(".sidebar__area").removeClass("sidebar-opened");
        $(".body-overlay").removeClass("opened");
    });


    /*
     * ----------------------------------------------------------------------------------------
     *  MAGNIFIC POPUP JS
     * ----------------------------------------------------------------------------------------
     */

    var magnifPopup = function () {
        $('.work-popup').magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: false, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function (openerElement) {
                    // openerElement is the element on which popup was initialized, in this case its <a> tag
                    // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });


        $('.popup-youtube, .popup-vimeo, .popup-gmaps, .popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });

    };
    // Call the functions
    magnifPopup();


    /*
     * ----------------------------------------------------------------------------------------
     *  SCROOL TO UP JS
     * ----------------------------------------------------------------------------------------
     */

    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength / height);
        progressPath.style.strokeDashoffset = progress;
    }
    updateProgress();


    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })

    /* ==========================================================================
                       SCROLLER ANIMATION
    ========================================================================== */

    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for recuded motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            // add data-animated="true" to every `.scroller` on the page
            scroller.setAttribute("data-animated", true);

            // Make an array from the elements within `.scroller-inner`
            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            // For each item in the array, clone it
            // add aria-hidden to it
            // add it into the `.scroller-inner`
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }


    /*
     * ----------------------------------------------------------------------------------------
     *  SMOTH SCROOL JS
     * ----------------------------------------------------------------------------------------
     */

    function scrollNav() {
        $('.onepage li a').click(function () {
            $(".onepage li a.active").removeClass("active");
            $(this).addClass("active");

            $('html, body').stop().animate({
                scrollTop: $($(this).attr('href')).offset().top - 100
            }, 1000);
            return false;
        });
    }

    scrollNav();

    /*
     * ----------------------------------------------------------------------------------------
     *  Lenis JS
     * ----------------------------------------------------------------------------------------
     */
    const lenis = new Lenis()


    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // ## Testimonials Active
    if ($('.testimonials-wrap').length) {
        $('.testimonials-wrap').slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            speed: 1000,
            focusOnSelect: false,
            prevArrow: '.testimonial-prev',
            nextArrow: '.testimonial-next',
            slidesToShow: 2,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            }]
        });
    }


    // ## Project Filter
    $(".project-filter li").on('click', function () {
        $(".project-filter li").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr('data-filter');
        $('.project-masonry-active').imagesLoaded(function () {
            $(".project-masonry-active").isotope({
                itemSelector: '.item',
                filter: selector,
                masonry: {
                    columnWidth: '.item'
                }
            });
        });

    });


    // ## Nice Select
    $('select').niceSelect();


    // ## WOW Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: false, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }


    /*
     * ----------------------------------------------------------------------------------------
     *  AJAX CONTACT JS
     * ----------------------------------------------------------------------------------------
     */

    // Function for email address validation
    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        return pattern.test(emailAddress);

    }

    $("#contactForm").on('submit', function (e) {
        e.preventDefault();
        var data = {
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val()
        };

        if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1) && (data['subject'].length > 1)) {
            $.ajax({
                type: "POST",
                url: "sendmail.php",
                data: data,
                success: function () {
                    $('#contactForm .input-success').delay(500).fadeIn(1000);
                    $('#contactForm .input-error').fadeOut(500);
                }
            });
        } else {
            $('#contactForm .input-error').delay(500).fadeIn(1000);
            $('#contactForm .input-success').fadeOut(500);
        }

        return false;
    });


    /* ==========================================================================
       When document is scroll, do
       ========================================================================== */

    $(window).on('scroll', function () {

        // ## Header Style and Scroll to Top
        function headerStyle() {
            if ($('.main-header').length) {
                var windowpos = $(window).scrollTop();
                var siteHeader = $('.main-header');
                var scrollLink = $('.scroll-top');
                if (windowpos >= 100) {
                    siteHeader.addClass('fixed-header');
                    scrollLink.fadeIn(300);
                } else {
                    siteHeader.removeClass('fixed-header');
                    scrollLink.fadeOut(300);
                }
            }
        }

        headerStyle();

    });


    /*
 * ----------------------------------------------------------------------------------------
 *  COMPLETE ADVANCED PRELOADER WITH GSAP ANIMATIONS
 * ----------------------------------------------------------------------------------------
 */

// Progress tracking
    let currentProgress = 0;
    let progressComplete = false;

// Function untuk memulai animasi keluar LANGSUNG
    function startExitAnimation() {
        if (typeof gsap !== 'undefined') {
            const svg = document.getElementById("preloaderSvg");
            const tl = gsap.timeline();
            const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
            const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

            // Timeline untuk keluar - CEPAT!
            tl.to(".status-message", {
                duration: 0.2,
                textContent: "Welcome!",
                ease: "none"
            })
                .to(".loading-dots .dot", {
                    duration: 0.3,
                    scale: 0,
                    opacity: 0,
                    stagger: 0.05,
                    ease: "back.in(1.7)"
                }, "+=0.1")
                .to(".progress-container", {
                    duration: 0.4,
                    scale: 0,
                    opacity: 0,
                    ease: "back.in(1.7)"
                }, "-=0.2")
                .to(".brand-text", {
                    duration: 0.3,
                    y: -50,
                    opacity: 0,
                    ease: "power2.in"
                }, "-=0.3")
                .to(".glitch-text span", {
                    duration: 0.5,
                    y: -100,
                    opacity: 0,
                    stagger: 0.03,
                    ease: "back.in(1.7)"
                }, "-=0.2")
                .to(".particles-bg, .grid-overlay", {
                    duration: 0.4,
                    opacity: 0,
                    ease: "power2.in"
                }, "-=0.4");

            // Exit effects
            tl.add(function () {
                createExitParticles();
                createGlitchEffect();
            });

            // SVG morphing - FASTER
            tl.to(svg, {
                duration: 0.6,
                attr: {d: curve},
                ease: "power2.easeIn"
            })
                .to(svg, {
                    duration: 0.6,
                    attr: {d: flat},
                    ease: "power2.easeOut"
                });

            // Final exit - IMMEDIATE
            tl.to(".preloader", {
                duration: 0.8,
                y: -1500,
                ease: "power2.inOut",
                onComplete: function () {
                    cleanupPreloader();
                }
            });

        } else {
            // Fallback tanpa GSAP - INSTANT
            $('.preloader').fadeOut(500, function () {
                cleanupPreloader();
            });
        }
    }

// Function untuk cleanup preloader
    function cleanupPreloader() {
        $('body').removeClass('loaded');

        // Restore scrollbar dan overflow dengan benar
        document.body.style.overflow = '';
        document.body.style.height = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';

        // Hide preloader dengan opacity, biarkan React remove dari DOM
        $('.preloader').css({
            'opacity': '0',
            'pointer-events': 'none',
            'z-index': '-1'
        });

        // Force browser untuk recalculate scrollbar
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

// Function to create exit particle effect
    function createExitParticles() {
        if (typeof gsap === 'undefined') return;

        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        for (let i = 0; i < 15; i++) { // Reduced particles for faster performance
            const particle = document.createElement('div');
            particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${i % 3 === 0 ? '#fff' : i % 3 === 1 ? '#ff0000' : '#00ffff'};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px rgba(255,255,255,0.5);
        `;
            preloader.appendChild(particle);

            gsap.to(particle, {
                duration: 1,
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
                rotation: Math.random() * 360,
                opacity: 0,
                scale: 0,
                ease: "power2.out",
                delay: Math.random() * 0.3,
                onComplete: function () {
                    particle.remove();
                }
            });
        }
    }

// Function to create glitch effect during exit
    function createGlitchEffect() {
        if (typeof gsap === 'undefined') return;

        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        const glitchOverlay = document.createElement('div');
        glitchOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,0,0,0.1);
        z-index: 1000;
        opacity: 0;
        pointer-events: none;
    `;
        preloader.appendChild(glitchOverlay);

        gsap.to(glitchOverlay, {
            duration: 0.05,
            opacity: 1,
            repeat: 3,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: function () {
                glitchOverlay.remove();
            }
        });
    }

// Enhanced scroll prevention during loading
    $(document).ready(function () {
        if ($('.preloader').length) {
            $('body').addClass('loaded');

            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
            document.documentElement.style.overflow = 'hidden';

            function preventScroll(e) {
                if ($('body').hasClass('loaded')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }

            $(window).on('wheel DOMMouseScroll mousewheel', preventScroll);
            $(document).on('touchmove', preventScroll);
            $(document).on('keydown', function (e) {
                if ($('body').hasClass('loaded')) {
                    if ([32, 33, 34, 35, 36, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                        e.preventDefault();
                        return false;
                    }
                }
            });
        }
    });

// Progress simulation yang realistis dengan INSTANT EXIT
    $(document).ready(function () {
        if ($('.preloader').length) {
            currentProgress = 0;

            const progressInterval = setInterval(() => {
                const increment = Math.random() * 8 + 2;
                currentProgress = Math.min(currentProgress + increment, 100);

                // Update progress di UI
                $('.progress-fill').css('width', currentProgress + '%');
                $('.progress-number').text(Math.floor(currentProgress));

                // Update status text berdasarkan progress
                let statusText = '';
                if (currentProgress < 25) {
                    statusText = 'Initializing System...';
                } else if (currentProgress < 50) {
                    statusText = 'Loading Assets...';
                } else if (currentProgress < 75) {
                    statusText = 'Preparing Interface...';
                } else if (currentProgress < 95) {
                    statusText = 'Almost Ready...';
                } else {
                    statusText = 'Complete!';
                }
                $('.status-message').text(statusText);

                // INSTANT EXIT saat 100%
                if (currentProgress >= 100) {
                    clearInterval(progressInterval);
                    progressComplete = true;
                    $('.progress-number').text('100');
                    $('.status-message').text('Complete!');

                    // LANGSUNG start exit animation tanpa delay!
                    setTimeout(() => {
                        startExitAnimation();
                    }, 200); // Hanya delay 200ms untuk user melihat "Complete!"
                }
            }, 150);
        }
    });

// Initialize preloader effects saat DOM ready
    $(document).ready(function () {
        if ($('.preloader').length && typeof gsap !== 'undefined') {
            // Set initial states
            gsap.set(".preloader-heading > *:not(.load-text)", {opacity: 0, y: 30});
            gsap.set(".glitch-text span", {opacity: 0, y: 20});

            // Animate elements masuk
            const initTl = gsap.timeline();

            initTl.to(".brand-text", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: 0.3,
                ease: "power2.out"
            })
                .to(".glitch-text span", {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "back.out(1.7)"
                }, "-=0.4")
                .to(".loading-progress", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.3")
                .to(".loading-dots", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.4")
                .to(".status-text", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.2");

            // Add random glitch effects during loading
            const glitchInterval = setInterval(() => {
                if ($('.preloader:visible').length && !progressComplete) {
                    gsap.to(".glitch-text", {
                        duration: 0.1,
                        x: Math.random() * 4 - 2,
                        y: Math.random() * 4 - 2,
                        ease: "power2.inOut",
                        yoyo: true,
                        repeat: 1,
                        onComplete: function () {
                            gsap.set(".glitch-text", {x: 0, y: 0});
                        }
                    });
                } else {
                    clearInterval(glitchInterval);
                }
            }, 3000 + Math.random() * 2000);
        }
    });

// Force hide preloader jika masih ada setelah 6 detik
    setTimeout(function () {
        if ($('.preloader:visible').length) {
            $('.preloader').fadeOut(500, function () {
                cleanupPreloader();
            });
        }
    }, 6000);
    /*
     * ----------------------------------------------------------------------------------------
     *  CUSTOM CURSOR JS
     * ----------------------------------------------------------------------------------------
     */
    const cursorBall = document.getElementById('ball');

    document.addEventListener('mousemove', function (e) {
        // Update cursor position and opacity on mousemove
        gsap.to(cursorBall, {
            duration: 0.3,
            x: e.clientX,
            y: e.clientY,
            opacity: 1, // Ensure cursor is visible
            ease: 'power2.out'
        });
    });

    // Hover effect on elements
    const hoverElements = document.querySelectorAll('a');
    hoverElements.forEach(function (element) {
        element.addEventListener('mouseenter', function () {
            // Animate cursorBall on mouseenter
            cursorBall.classList.add('hovered');
            gsap.to(cursorBall, {
                duration: 0.3,
                scale: 2, // Increase scale
                opacity: 0, // Set opacity to 0
                ease: 0.1
            });
        });

        element.addEventListener('mouseleave', function () {
            // Restore cursorBall on mouseleave
            cursorBall.classList.remove('hovered');
            gsap.to(cursorBall, {
                duration: 0.3,
                scale: 1, // Restore scale to normal
                opacity: 1, // Restore opacity
                ease: 'power2.out'
            });
        });
    });


})(jQuery); // End jQuery