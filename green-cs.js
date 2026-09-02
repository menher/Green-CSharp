// ==UserScript==
// @name         github - restore old C# green
// @namespace    https://github.com/
// @version      1.0
// @description  restores the old green color for C# on GitHub
// @match        https://github.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    const GREEN = '#178600';

    const style = document.createElement('style');

    style.textContent = `
        /*
         * GitHub C# language colors
         */

        /* C# percentage bar */
        [role="progressbar"][aria-label^="C#:"] {
            background-color: ${GREEN} !important;
        }
    `;

    document.documentElement.appendChild(style);

    function applyCSharpGreen() {

        // C# repo language dot
        document.querySelectorAll(
            'span.repo-language-color + span[itemprop="programmingLanguage"]'
        ).forEach(label => {
            if (label.textContent.trim() === 'C#') {
                const dot = label.previousElementSibling;

                if (dot && dot.classList.contains('repo-language-color')) {
                    dot.style.setProperty(
                        'background-color',
                        GREEN,
                        'important'
                    );
                }
            }
        });


        // C# sidebar percentage
        document.querySelectorAll(
            '[role="progressbar"][aria-label^="C#:"]'
        ).forEach(bar => {
            bar.style.setProperty(
                'background-color',
                GREEN,
                'important'
            );
        });


        // C# sidebar language dot
        document.querySelectorAll(
            '.SidebarLanguages-module__languageItem__TkIfb'
        ).forEach(item => {
            const name = item.querySelector(
                '[itemprop="keywords"]'
            );

            if (name && name.textContent.trim() === 'C#') {
                const dot = item.querySelector(
                    '.SidebarLanguages-module__languageDot__mtE1V'
                );

                if (dot) {
                    dot.style.setProperty(
                        'background-color',
                        GREEN,
                        'important'
                    );
                }
            }
        });
    }


    applyCSharpGreen();

    // dynamically loads parts of the page
    let scheduled = false;

    const observer = new MutationObserver(() => {
        if (scheduled) {
            return;
        }

        scheduled = true;

        requestAnimationFrame(() => {
            scheduled = false;
            applyCSharpGreen();
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

})();