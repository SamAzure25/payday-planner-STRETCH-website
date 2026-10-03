/* =========================================
   STRETCH MARKETING WEBSITE
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       GLOBAL ELEMENTS
    ========================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const siteHeader = document.getElementById("siteHeader");


    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    const closeMobileMenu = () => {

        if (!menuToggle || !mainNav) {
            return;
        }

        mainNav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    };


    const openMobileMenu = () => {

        if (!menuToggle || !mainNav) {
            return;
        }

        mainNav.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    };


    if (menuToggle && mainNav) {

        /* Make sure the initial state is correct */

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        /* Toggle mobile menu */

        menuToggle.addEventListener("click", event => {

            event.preventDefault();

            const isOpen =
                mainNav.classList.contains("active");

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });


        /* Close menu after selecting a navigation link */

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });

    }


    /* =========================================
       CLOSE MOBILE MENU WITH ESCAPE
    ========================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mainNav &&
            mainNav.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    });


    /* =========================================
       CLOSE MENU WHEN RESIZING TO DESKTOP
    ========================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 768 &&
            mainNav &&
            mainNav.classList.contains("active")
        ) {

            closeMobileMenu();

        }

    });


    /* =========================================
       HEADER SCROLL STATE
    ========================================== */

    const handleHeaderScroll = () => {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 20) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    };


    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =========================================
       FAQ ACCORDION
    ========================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    if (faqItems.length > 0) {

        faqItems.forEach(item => {

            const question =
                item.querySelector(".faq-question");

            if (!question) {
                return;
            }


            /* Initial accessibility state */

            question.setAttribute(
                "aria-expanded",
                item.classList.contains("active")
                    ? "true"
                    : "false"
            );


            question.addEventListener("click", () => {

                const isCurrentlyOpen =
                    item.classList.contains("active");


                /* Close all other FAQ items */

                faqItems.forEach(otherItem => {

                    if (otherItem !== item) {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherQuestion =
                            otherItem.querySelector(
                                ".faq-question"
                            );

                        if (otherQuestion) {

                            otherQuestion.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }

                });


                /* Toggle current FAQ item */

                item.classList.toggle(
                    "active",
                    !isCurrentlyOpen
                );

                question.setAttribute(
                    "aria-expanded",
                    String(!isCurrentlyOpen)
                );

            });

        });

    }


    /* =========================================
       SMOOTH ANCHOR OFFSET
    ========================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    if (anchorLinks.length > 0) {

        anchorLinks.forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");


                /* Ignore empty anchors */

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                let target = null;

                try {

                    target =
                        document.querySelector(targetId);

                } catch (error) {

                    /* Invalid selector - allow normal link behaviour */

                    return;

                }


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    15;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });

    }

});