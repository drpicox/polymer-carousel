(function() {
	'use strict';

	Polymer({

		// Customizable element attributes
		/////////////////////////////////////////////////////////////////////

		active: true,


		// Component public methods
		/////////////////////////////////////////////////////////////////////

		show: function() {
			this.active = true;
			this.removeClass('hidden');
			this.removeClass('slide-out');
		},

		hide: function() {
			this.active = false;
			this.addClass('hidden');
			this.removeClass('slide-in');
		},

		slideIn: function() {
			this.active = true;
			this.removeClass('hidden');
			this.removeClass('slide-out');
			this.addClass('slide-in');
		},

		slideOut: function() {
			this.active = false;
			this.removeClass('slide-in');
			this.addClass('slide-out');
		},


		// Lifecycle callbacks
		/////////////////////////////////////////////////////////////////////
		
		ready: function() {
			this.style.backgroundImage = 'url('+this.src+')';
			this.parentNode.addSlide(this);

			// detect animation support and fallback if it is required (another fallback should be jquery)
			if (this.style.animationName !== '' && this.style.webkitAnimationName !== '') {
				this.slideIn = this.show;
				this.slideOut = this.hide;
			}
		},

		dettached: function() {
			this.parentNode.removeSlide(this);
		},


		// Private methods
		/////////////////////////////////////////////////////////////////////

		addClass: function(clazz) {
			this.removeClass(clazz);
			this.className = this.className +' '+ clazz;
		},

		removeClass: function(clazz) {
			this.className = this.className.split(' ').filter(function(c) { return c !== clazz; }).join(' ');
		},
	});
})();
