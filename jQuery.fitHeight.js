/**
 * fitMaxHeightByRow plugin
 *
 * Copyright (c) 2011 Egor Vakhromtsev (vakhromtsev.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/*
 * Usage
 * Selected DOM Elements must use css float property.
 *
 * $("#panel .box").fitMaxHeightByRow();
 * $("#content div").fitMaxHeight();
 *
 * Notes
 * Some browsers (Chrome 9 for example) doesn't care about <img> height without "height" property.
 */

(function( $ ){
    $.fn.fitMaxHeight = function( ) {
      var max = 0;
      this.each(function() {
      max = Math.max(max, $(this).height());
      });
      this.height(max);
      return this;
    };
    $.fn.fitMaxHeightByRow = function( ) {
      var elements=this; //.children();
      elements.fitMaxHeight();
      var prev_top = NaN;
      return elements.each(function(i, el){
        var top = $(el).offset().top;
        if(prev_top != top)
        {
          /*
            Тут можно ускорить.
            Выбирать не из всех grep'ом, а только с предыдущей, до слудующей с другим top.
            Ведь нам известно, что нужные элементы лежат в одной строке
          */
          var els = $.grep(elements, function(e, i){return ($(e).offset().top==top);});
          $(els).height('auto').fitMaxHeight();
          prev_top = top;
        }
      });
      return this;
    }
})( jQuery );
