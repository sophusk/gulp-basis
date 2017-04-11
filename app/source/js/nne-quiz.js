'use strict';

(function () {
    window.js = window.js || {};
    js.quiz = (function () {

        function initialize(domElm) {

			// #############################################
			// #########################
			// Variables
			var i, l, thisArr, thisSubArr;
			var curQuestion = 1;
			var maxQuestion;
			var curSection = 1;
			var maxSection;

			// #########################
			// Elements
			var tmlArr = document.getElementsByClassName('tml__item');
			var cardArr = document.getElementsByClassName('cards__item');
			var questionsArr = document.getElementsByClassName('qst__item');
			var questionsLength = questionsArr.length;
			
			// Progress bar - Setup
			var prgsBar = document.getElementById('prgs__bar');
			var prgsCurrent = document.getElementById('prgs__current');
			var prgsTotal = document.getElementById('prgs__total');
			prgsCurrent.innerHTML = 1;
			prgsTotal.innerHTML = questionsLength;

			// #########################
			// Polyfills
			// Closest vanilla polyfill
			function closest(el, sel){
			    var thisPar = el.parentNode;
			    
			    if (thisPar === document.querySelector('body')) {
			        return false;
			    }
			    else {
			        if(!thisPar.classList.contains(sel)) {
			            thisPar = closest(thisPar, sel);
			        }    
			    }
			    return thisPar;
			}

			// #########################
			function setCounter(n) {
				// Update pregres bar width
				prgsBar.style.width = (100 * ((n + 1) / (questionsLength + 1))) + '%';
				prgsBar.style.width = (100 * ((n - 1) / (questionsLength))) + '%';
				// Update counter text
				prgsCurrent.innerHTML = n;
			}
			setCounter(1);

			// Go to next Question - function
            function goToQst(n, elm) { // Zero indexed
        		// Get items
            	thisArr = elm.querySelectorAll('.qst__item');

            	// Remove active class from all items
            	for (i = 0, l = thisArr.length; i < l; i++) {
            		thisArr[i].classList.remove('qst__item--active');
            	}
            	// Add active class to current item
            	thisArr[n].classList.add('qst__item--active');

        		// Offset parent container
            	var qstContainer = elm;
        		var offset = (-1 * n * 100) + '%';
        		qstContainer.style.marginLeft = offset;

        		// Counter
        		curQuestion++;
				setCounter(Number(curQuestion));
            }


			// Go to next card - function
            function goToCard(n, elm) { // Zero indexed
				var tmlContainer = document.getElementsByClassName('tml__inner')[0];
				var cardContainer = document.getElementsByClassName('cards__inner')[0];
				var bgrContainer = document.getElementsByClassName('bgr__inner')[0];

				//var tmldArr = document.getElementsByClassName('tml__item');
				//var cardArr = document.getElementsByClassName('cards__item');
				var bgrArr = document.getElementsByClassName('bgr__item');
				var cardCount = cardArr.length;
				var offset = (-1 * n * 100) + '%'; // (n - 1)

				// Manipulate classes
				// Remove active class from all items
				for (i = 0; i < cardCount; i++) {
					tmlArr[i].classList.remove('tml__item--active');
					cardArr[i].classList.remove('cards__item--active');
					bgrArr[i].classList.remove('bgr__item--active');
				}
				// Add active class to current item
				if (tmlArr[n]) { tmlArr[n].classList.add('tml__item--active'); }
				if (cardArr[n]) { cardArr[n].classList.add('cards__item--active'); }
				if (bgrArr[n]) { bgrArr[n].classList.add('bgr__item--active'); }

				// Offset parent container
				tmlContainer.style.marginLeft = offset;
				cardContainer.style.marginLeft = offset;
				bgrContainer.style.marginLeft = offset;

				// Counter
				curSection++;
				curQuestion++;
				//setCounter(Number(n));
				setCounter(curQuestion);
			}



			// #########################
			// Setup buttons
			var buttonArr = document.getElementsByClassName('-js-button');
			
			function addPageQstEvent(elm) {
				// Declare parent class
				//var selector = 'cards__qst-list';

				// Get parent element
				var parent = closest(elm, 'qst__inner');

				// Add event listener
				elm.addEventListener('click', function () {
					// Get current index
					var index = parent.getAttribute('data-current');

					// Calculate destination data attribute
					var dest = Number(index) + 1;

					// Set current
					parent.setAttribute('data-current', dest);

					// Go to destination
					goToQst(dest, parent);
				});
			}
			function addPageCardEvent(elm) {
				// Declare parent class
				//var selector = 'cards__qst-list';

				// Get parent element
				var parent = closest(elm, 'cards__inner');

				// Add event listener
				elm.addEventListener('click', function () {
					// Get current index
					var index = parent.getAttribute('data-current');

					// Calculate destination data attribute
					var dest = Number(index) + 1;

					// Set current
					parent.setAttribute('data-current', dest);

					// Get destination data attribute
					//var dest = this.getAttribute('data-dest');

					// Go to destination
					goToCard(dest, parent);
				});
			}

			for (i = 0; i < buttonArr.length; i++) {
				var button = buttonArr[i];

				//new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
				
				if (button.classList) {
					if (button.classList.contains('-js-button--go-crd')) { // 'button--dest'
						
						addPageCardEvent(button);
					} else if (button.classList.contains('-js-button--go-qst')) {
						addPageQstEvent(button);
					}
				} else {

				}

				// button.addEventListener('click', function () {
				// 	// Get destination data attribute
				// 	var dest = this.getAttribute('data-dest');
				// 	// Go to destination
				// 	goToCard(dest);
				// });
			}

			// #########################
			// If no elements are active, make first card active;
			if (document.getElementsByClassName('cards__item--active').length < 1) {
				document.getElementsByClassName('cards__item')[0].classList.add('cards__item--active');
			}
			if (document.getElementsByClassName('bgr__item--active').length < 1) {
				document.getElementsByClassName('bgr__item')[0].classList.add('bgr__item--active');
			}
			for (i = 0, thisArr = document.getElementsByClassName('cards__item'), l = thisArr.length; i < l; i++) {
				
				thisSubArr = thisArr[i].querySelectorAll('.qst__item')

				if (thisSubArr.length >= 1) {
					thisSubArr[0].classList.add('qst__item--active');
				}
				
				
				//thisArr[i].querySelectorAll('.qst__item')[0].classList.add('qst__item--active');
			}



			// #############################################
        }

        return {
            initialize: initialize
        };

    })();
})();