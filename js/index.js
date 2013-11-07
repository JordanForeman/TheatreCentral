(function () {

	var init = function() {
		
		if ('querySelector' in document && 'addEventListener' in window && Array.prototype.forEach) {
			document.documentElement.className += 'js';
			addNavEventListeners();
			window.addEventListener('scroll', windowScrollHandler, true);
		}
	};

	var addNavEventListeners = function() {

		// Add event handlers to tabs
		var nav = document.querySelector('nav');
		var tabs = nav.querySelectorAll('.nav li');
		for (var i = 0; i < tabs.length; i++)
		{
			tabs[i].addEventListener('mouseover', navEventHandlers.navMouseOverHandler, true);
			tabs[i].addEventListener('mouseout', navEventHandlers.navMouseOutHandler, true);
		}
		var activeTab = nav.querySelector('.nav li.active');
		addClass(activeTab, 'thisPageTab');

	};

	/*====================================

		Event Handlers

	====================================*/

	var windowScrollHandler = function() {

		var header = document.querySelector('header');
		var nav = document.querySelector('nav');
		var navTop = header.getBoundingClientRect().bottom;

		if (navTop <= 45)
			addClass(nav, 'fixed');
		else
			removeClass(nav, 'fixed');
	};

	var navEventHandlers = {

		navMouseOverHandler: function(event){
			var tab = event.target;

			//TODO: subnav isn't being found properly. Fix that
			var subNav = tab.querySelector('.subNav');

			if (subNav)
			{
				console.log('Subnav!');
			}

			var nav = document.querySelector('nav');
			var activeSiblingTabs = nav.querySelectorAll('.active');
			for (var i = 0; i < activeSiblingTabs.length; i++)
			{
				removeClass(activeSiblingTabs[i], 'active');
			}

			addClass(tab, 'active');
		},

		navMouseOutHandler: function(event){
			removeClass(event.target, 'active');
			var original = document.querySelector('.thisPageTab');
			addClass(original, 'active');
		}
	};

	/*====================================

		Class Handlers

	====================================*/

	var hasClass = function (elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	};
	 
	var addClass = function (elem, className) {
		if (!hasClass(elem, className)) {
			elem.className += ' ' + className;
		}
	};
	 
	var removeClass = function (elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
		if (hasClass(elem, className)) {
			while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
				newClass = newClass.replace(' ' + className + ' ', ' ');
			}
			elem.className = newClass.replace(/^\s+|\s+$/g, '');
		}
	};

	init();

})();