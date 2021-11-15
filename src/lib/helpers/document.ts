export const documentHelper = {
    changeBackgroundHeader: function (color = 'transparent') {
        var headerEl = document.getElementById('header');

        if (typeof headerEl != 'undefined' && headerEl != null) {
            if (headerEl.classList.contains('light')) {
                headerEl.classList.remove('light');
                headerEl.classList.add('dark');
                headerEl.classList.add('changed');
            } else {
                if (headerEl.classList.contains('changed')) {
                    headerEl.classList.remove('dark');
                    headerEl.classList.remove('changed');
                    headerEl.classList.add('light');
                }
            }

            headerEl.style.backgroundColor = color;
        }
    },

    handleEqualHeightItems: function (items: string[]) {
        let height = 0;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let el = document.querySelector(item);
            if (typeof el !== "undefined" && el !== null) {
                if (i == 0) {
                    height = el.offsetHeight;
                } else {
                    el.style.height = height + 'px';
                }
            }

        }
    },

    getMobileOperatingSystem: function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    },

    getRectTop: function (el: any) {
        var rect = el.getBoundingClientRect();
        return rect.top;
    },

    checkOffset: function (el: HTMLElement | null, elStop: HTMLElement | null) {
        if (el != null && elStop != null) {
            if ((documentHelper.getRectTop(el) + document.body.scrollTop) + el.offsetHeight >= (documentHelper.getRectTop(elStop) + document.body.scrollTop) - 10) {
                const elTop = documentHelper.getRectTop(el);
                // el.classList.remove('fixed');
                let style = "top: " + (elTop) + "px !important;";
                // style += "transform: none";
                el.setAttribute('style', style);
                // el.style.position = 'absolute';
            }
            if (document.body.scrollTop + window.innerHeight < (documentHelper.getRectTop(elStop) + document.body.scrollTop)) {
                el.setAttribute('style', '');
                // el.classList.add('fixed'); // restore when you scroll up
            }

        }
    },

    makeMasoryGrid: function (wrapItems: string,itemIdentifier: string) {
            // Programmatically get the column width
            let item = document.querySelector(itemIdentifier);
            let parentWidth = item.parentNode.getBoundingClientRect().width;
            let itemWidth = item.getBoundingClientRect().width + parseFloat(getComputedStyle(item).marginLeft) + parseFloat(getComputedStyle(item).marginRight);
            let columnWidth = Math.round((1 / (itemWidth / parentWidth)));
            console.log(item);
            // We need this line since JS nodes are dumb
            let arrayOfItems = Array.prototype.slice.call( document.querySelectorAll(itemIdentifier) );
            let trackHeights = {};
            arrayOfItems.forEach(function(item) {
                // Get index of item
                let thisIndex = arrayOfItems.indexOf(item);
                // Get column this and set width
                let thisColumn = thisIndex % columnWidth;
                if(typeof trackHeights[thisColumn] == "undefined") {
                    trackHeights[thisColumn] = 0;
                }
                trackHeights[thisColumn] += item.getBoundingClientRect().height + parseFloat(getComputedStyle(item).marginBottom);
                // If the item has an item above it, then move it to fill the gap
                if(thisIndex - columnWidth >= 0) {
                    let getItemAbove = document.querySelector(`${itemIdentifier}:nth-of-type(${thisIndex - columnWidth + 1})`);
                    let previousBottom = getItemAbove.getBoundingClientRect().bottom;
                    let currentTop = item.getBoundingClientRect().top - parseFloat(getComputedStyle(item).marginBottom);
                    item.style.top = `-${currentTop - previousBottom}px`;
                }
            });
            let max = Math.max(...Object.values(trackHeights));
            document.querySelector(wrapItems).style.height = `${max}px`;
    },

};