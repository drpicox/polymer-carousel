(function() {
	'use strict';

	Polymer({

		// Customizable element attributes
		/////////////////////////////////////////////////////////////////////

		aspect: '4:3',


		// Component public methods
		/////////////////////////////////////////////////////////////////////

		addSlide: function(slide) {
			this.slides.push(slide);

			if (this.slides.length === 1) {
				this.nextSlide(slide);
			} else {
				slide.hide();
			}
		},

		nextSlide: function(nextSlide) {
			var prevSlide, currentIdx;

			// keeps current slide
			prevSlide = this.currentSlide;

			// looks for current slide
			currentIdx = this.slides.indexOf(this.currentSlide);

			// computes next slide if not provided
			if (!nextSlide && this.slides.length > 0) {
				nextSlide = this.slides[(currentIdx + 1) % this.slides.length];
			}

			// changes slide
			this.currentSlide = nextSlide;
			this.currentSlideChange(prevSlide, nextSlide);
		},

		prevSlide: function() {
			var prevSlide, currentIdx;

			// keeps current slide
			prevSlide = this.currentSlide;

			// looks for current slide
			currentIdx = this.slides.indexOf(this.currentSlide);

			this.currentSlide = this.slides[(currentIdx + this.slides.length - 1) % this.slides.length] || null;
			this.currentSlideChange(prevSlide, this.currentSlide);
		},

		removeSlide: function(slide) {
			var idx;

			idx = this.slides.indexOf(slide);
			if (idx >= 0) {
				this.slides.splice(idx, 0);
			}

			if (this.currentSlide === slide) {
				this.nextSlide(this.slides[idx % this.slides.length] || null);
			}
		},
		

		// Initialization
		/////////////////////////////////////////////////////////////////////
		
		ready: function() {

			this.style.paddingTop = this.ratioPct(this.aspect);


			this.slides = [];
			this.currentSlide = null;
		},


		// Private methods
		/////////////////////////////////////////////////////////////////////

		// looks for changes in currentSlide
		currentSlideChange: function(prevSlide, currentSlide) {
			
			if (prevSlide === currentSlide) {
				return;
			} else if (prevSlide === null) {
				currentSlide.show();
			} else if (currentSlide === null) {
				prevSlide.hide();
			} else {
				prevSlide.slideOut();
				currentSlide.slideIn();
			}
		},


		// computes the exact aspect ratio to compute desidered height in %
		ratioPct: function(aspect) {
			var parts, pct, ratio;

			parts = aspect.split(':').map(function(n) { return parseFloat(n); });
			ratio = parts[1] / parts[0];
			pct = ratio * 100 + '%';

			return pct;
		},

	});
})();
