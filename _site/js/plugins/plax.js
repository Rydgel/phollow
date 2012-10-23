/*
  Copyright (c) 2011 Cameron McEfee

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function(e){function u(){return window.DeviceMotionEvent!=undefined}function a(e){if((new Date).getTime()<r+n)return;r=(new Date).getTime();var t=u()?e.rotationRate.beta:e.pageX,a=u()?e.rotationRate.alpha:e.pageY,f=t/(u()?90:s),l=a/(u()?180:o),c,h;for(h=i.length;h--;)c=i[h],c.invert!=1?c.obj.css("left",c.startX+c.xRange*f).css("top",c.startY+c.yRange*l):c.obj.css("left",c.startX-c.xRange*f).css("top",c.startY-c.yRange*l)}var t=25,n=1/t*1e3,r=(new Date).getTime(),i=[],s=e(window).width(),o=e(window).height();e(window).resize(function(){s=e(window).width(),o=e(window).height()}),e.fn.plaxify=function(t){return this.each(function(){var n={xRange:0,yRange:0,invert:!1};for(var r in t)n[r]==0&&(n[r]=t[r]);n.obj=e(this),n.startX=this.offsetLeft,n.startY=this.offsetTop,n.invert==0?(n.startX-=Math.floor(n.xRange/2),n.startY-=Math.floor(n.yRange/2)):(n.startX+=Math.floor(n.xRange/2),n.startY+=Math.floor(n.yRange/2)),i.push(n)})},e.plax={enable:function(){e(document).bind("mousemove.plax",function(e){a(e)}),u()&&(window.ondevicemotion=function(e){a(e)})},disable:function(){e(document).unbind("mousemove.plax")}},typeof ender!="undefined"&&e.ender(e.fn,!0)})(function(){return typeof jQuery!="undefined"?jQuery:ender}());