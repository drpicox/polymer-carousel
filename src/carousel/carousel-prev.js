(function() {
	'use strict';

	Polymer({

		// Customizable element attributes
		/////////////////////////////////////////////////////////////////////



		// Component public methods
		/////////////////////////////////////////////////////////////////////



		// Lifecycle callbacks
		/////////////////////////////////////////////////////////////////////
		
		ready: function() {
			this.addEventListener('mousedown', this.prev);
		},

		dettached: function() {
		},


		// Private methods
		/////////////////////////////////////////////////////////////////////
		
		prev: function() {
			this.parentNode.prevSlide();
		},

	});

})();