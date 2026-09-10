document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ALTAF ALI — SMART PORTFOLIO JAVASCRIPT
       ========================================= */

    const body = document.body;
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("section");

  


    /* =========================================
       BACK TO TOP BUTTON
       ========================================= */

    const topButton = document.createElement("button");

    topButton.id = "back-to-top";
    topButton.type = "button";
    topButton.textContent = "↑";

    topButton.setAttribute(
        "aria-label",
        "Back to top"
    );

    document.body.appendChild(topButton);

    const updateTopButton = () => {

        if (window.scrollY > 500) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }

    };

    window.addEventListener(
        "scroll",
        updateTopButton,
        { passive: true }
    );

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show-section"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        sections.forEach(section => {
            revealObserver.observe(section);
        });

    } else {

        sections.forEach(section => {
            section.classList.add("show-section");
        });

    }


    /* =========================================
       ACTIVE NAVIGATION
       ========================================= */

    let isClickScrolling = false;

    const setActiveNav = (id) => {

        navLinks.forEach(link => {

            const linkTarget =
                link.getAttribute("href");

            link.classList.toggle(
                "active-nav",
                linkTarget === `#${id}`
            );

        });

    };


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                if (isClickScrolling) return;

                const visibleSections =
                    entries
                        .filter(entry => entry.isIntersecting)
                        .sort(
                            (a, b) =>
                                b.intersectionRatio -
                                a.intersectionRatio
                        );

                if (visibleSections.length > 0) {

                    setActiveNav(
                        visibleSections[0].target.id
                    );

                }

            },
            {
                threshold: [0.2, 0.4, 0.6],
                rootMargin: "-15% 0px -45% 0px"
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =========================================
       SMART SMOOTH NAVIGATION
       ========================================= */

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            isClickScrolling = true;

            setActiveNav(
                target.id
            );

            const navHeight =
                nav?.offsetHeight || 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

            history.replaceState(
                null,
                "",
                targetId
            );

            setTimeout(() => {
                isClickScrolling = false;
            }, 900);

        });

    });


    /* =========================================
       TYPING EFFECT
       ========================================= */

    const home = document.querySelector("#home");

    if (home) {

        const paragraphs =
            home.querySelectorAll("p");

        if (paragraphs.length > 0) {

            const typingElement =
                paragraphs[0];

            const originalText =
                typingElement.textContent.trim();

            typingElement.textContent = "";

            let index = 0;

            const typeText = () => {

                if (index < originalText.length) {

                    typingElement.textContent +=
                        originalText.charAt(index);

                    index++;

                    setTimeout(
                        typeText,
                        35
                    );

                }

            };

            setTimeout(
                typeText,
                500
            );
        }
    }


    /* =========================================
       CONTACT FORM
       ========================================= */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nameInput =
                    document.querySelector("#name");

                const emailInput =
                    document.querySelector("#email");

                const messageInput =
                    document.querySelector("#message");

                const name =
                    nameInput?.value.trim();

                const email =
                    emailInput?.value.trim();

                const message =
                    messageInput?.value.trim();


                if (!name || !email || !message) {

                    alert(
                        "Please fill in all fields."
                    );

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    alert(
                        "Please enter a valid email address."
                    );

                    return;
                }


                alert(
                    `Thank you, ${name}! Your message has been received.`
                );

                contactForm.reset();

            }
        );

    }


    /* =========================================
       KEYBOARD SHORTCUT
       HOME KEY → TOP
       ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            const isTyping =
                event.target.matches(
                    "input, textarea"
                );

            if (
                event.key === "Home" &&
                !isTyping
            ) {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );


    /* =========================================
       IMAGE LOADING EFFECT
       ========================================= */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        if (image.complete) {

            image.classList.add(
                "image-loaded"
            );

        } else {

            image.addEventListener(
                "load",
                () => {
                    image.classList.add(
                        "image-loaded"
                    );
                },
                { once: true }
            );

        }

    });


    /* =========================================
       PAGE VISIBILITY
       ========================================= */

    const originalTitle =
        document.title;

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                document.title =
                    "Come back 👋 | Altaf Ali";

            } else {

                document.title =
                    originalTitle;

            }

        }
    );


    /* =========================================
       CURRENT YEAR
       ========================================= */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });

    /* =========================================
   ALTAF ALI - JAVASCRIPT HERO ANIMATION
   ========================================= */

const heroName = document.querySelector("#home h1");

if (heroName) {

    heroName.animate(
        [
            {
                opacity: 0,
                transform: "translateY(-120px) scale(0.92)",
                filter: "brightness(0.4) blur(5px)",
                textShadow: "0 0 0 rgba(56,189,248,0)"
            },
            {
                opacity: 1,
                transform: "translateY(15px) scale(1.04)",
                filter: "brightness(2.2) blur(0)",
                textShadow:
                    "0 0 12px rgba(56,189,248,0.9), " +
                    "0 0 30px rgba(56,189,248,0.7), " +
                    "0 0 55px rgba(37,99,235,0.5)"
            },
            {
                opacity: 1,
                transform: "translateY(-5px) scale(1.01)",
                filter: "brightness(1.5)",
                textShadow:
                    "0 0 8px rgba(56,189,248,0.6)"
            },
            {
                opacity: 1,
                transform: "translateY(0) scale(1)",
                filter: "brightness(1)",
                textShadow: "0 0 0 rgba(56,189,248,0)"
            }
        ],
        {
            duration: 2200,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both"
        }
    );

}

    /* =========================================
       CONSOLE MESSAGE
       ========================================= */

    console.log(
        "%cAltaf Ali Portfolio",
        "font-size:22px;font-weight:bold;color:#38BDF8;"
    );

    console.log(
        "Portfolio JavaScript loaded successfully."
    );

});