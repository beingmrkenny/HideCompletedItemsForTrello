'use strict';

document.addEventListener('DOMContentLoaded', function () {
	setTimeout(watchForViewCard, 0);
	if (window.location.pathname.startsWith('/c/')) {
		keepCounting();
	}
});

function watchForViewCard() {
    observe({
        targets : document.querySelector('.window-wrapper'),
        options  : {childList: true, subtree: false},
        callback : function () {
			var cardDetailWindow = document.querySelector('.card-detail-window');
			if (cardDetailWindow) {
				keepCounting();
			}
		}
    });
}

function keepCounting(passedCount, interval, limit) {

	interval = (isNaN(interval) ? 500 : interval);
	limit = (isNaN(limit) ? 5 : --limit);

	// count how many checked items there are
	var currentCount = document.querySelectorAll('.js-hide-checked-items').length;

	if (
		limit > 0 &&
		(typeof passedCount == 'undefined' || currentCount !== passedCount || currentCount == 0)
	) {

		// if current and previous are different, assume the card hasn't been finished yet and pause before counting again
		window.setTimeout(function () {
			keepCounting(currentCount, interval, limit);
		}, interval);

	} else {

		if (currentCount > 0) {
			clickHideItems();
		}

	}

}

function clickHideItems() {
	var shownCompletedItems = document.querySelectorAll('.js-hide-checked-items:not(.hide)');
	for (let i = shownCompletedItems.length -1; i > -1; i--) {
		shownCompletedItems[i].click();
	}
}

function observe(params) {

    var observer = new MutationObserver(function (node) { params.callback(node, observer); });

    if (!params.targets && params.target) {
        params.targets = params.target;
    }

    if (params.targets instanceof NodeList || Array.isArray(params.targets)) {

        for (var i = params.targets.length - 1; i > -1; i--) {
            observer.observe(params.targets[i], params.options);
        }

    } else if (params.targets instanceof HTMLElement) {

        observer.observe(params.targets, params.options);

    }

	return observer;

}
