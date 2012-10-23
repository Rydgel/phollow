/*global jQuery */
/*! 
* FitText.js 1.0
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/
(function(e){e.fn.fitText=function(t){return this.each(function(){var n=e(this),r=parseFloat(n.css("font-size")),i=t||1,s=function(){n.css("font-size",Math.min(n.width()/(i*10),r))};s(),e(window).resize(s)})}})(jQuery);