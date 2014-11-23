(function() {
	'use strict';

	Polymer({

		// Customizable element attributes
		/////////////////////////////////////////////////////////////////////


		// Component public methods
		/////////////////////////////////////////////////////////////////////

		selectSlideIdx: function(ev,sender,detail) {
			var slide, slideIdx;

			slideIdx = parseInt(detail.attributes['data-slideIdx'].value);
			slide = this.slides[slideIdx];

			this.parentNode.nextSlide(slide);
		},


		// Lifecycle callbacks
		/////////////////////////////////////////////////////////////////////
		
		ready: function() {
			this.slides = this.parentNode.slides;
		},


		// Private methods
		/////////////////////////////////////////////////////////////////////
		
	});

})();
