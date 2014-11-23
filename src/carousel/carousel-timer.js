(function() {
	'use strict';

	Polymer({

		// Customizable element attributes
		/////////////////////////////////////////////////////////////////////

		delay: 5, // in seconds


		// Component public methods
		/////////////////////////////////////////////////////////////////////



		// Lifecycle callbacks
		/////////////////////////////////////////////////////////////////////
		
		ready: function() {
			var self = this;

			self.parentNode.addEventListener('mouseover', cancelListener);
			self.parentNode.addEventListener('mouseout', resetListener);
			self.removeEventListeners = function() {
				self.parentNode.removeEventListener('mouseover', cancelListener);
				self.parentNode.removeEventListener('mouseout', resetListener);
			};
			self.setTimer();

			function cancelListener() {
				self.cancelTimer();
			}
			function resetListener() {
				self.resetTimer();
			}
		},

		dettached: function() {
			this.removeEventListeners();
		},


		// Private state
		/////////////////////////////////////////////////////////////////////

		currentTimer: null,
		
		// Private methods
		/////////////////////////////////////////////////////////////////////
		
		cancelTimer: function() {
			if (this.currentTimer !== null) {
				this.cancelAsync(this.currentTimer);
			}
			this.currentTimer = null;
		},

		resetTimer: function() {
			this.cancelTimer();
			this.setTimer();
		},

		removeEventListeners: null, // to be defined when ready

		setTimer: function() {
			this.currentTimer = this.async(this.triggerTimer, null, this.delay*1000);
		},

		triggerTimer: function() {
			this.parentNode.nextSlide();
			this.setTimer();
		},

	});

})();
