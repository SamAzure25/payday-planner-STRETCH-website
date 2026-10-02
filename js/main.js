/* =========================================
   STRETCH MARKETING WEBSITE
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const siteHeader = document.getElementById("siteHeader");


    /* =========================================
       MOBILE NAVIGATION
    ========================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu after selecting a link */

        mainNav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

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

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });


        /* Close with Escape */

        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                mainNav.classList.contains("active")
            ) {

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

                document.body.classList.remove(
                    "menu-open"
                );

            }

        });

    }


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


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        if (!question) {
            return;
        }


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


            /* Toggle current item */

            item.classList.toggle(
                "active",
                !isCurrentlyOpen
            );

            question.setAttribute(
                "aria-expanded",
                String(!isCurrentlyOpen)
            );

        });

        question.setAttribute(
            "aria-expanded",
            "false"
        );

    });


    /* =========================================
       SMOOTH ANCHOR OFFSET
    ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

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

});