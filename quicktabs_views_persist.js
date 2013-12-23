/**
 * @file
 * Attach the quicktabs tabindex to each link on all tabpages.
 *
 * @see http://drupalcode.org/project/quicktabs.git/blob/refs/heads/7.x-3.x:/js/quicktabs.js
 */
(function ($) {
  Drupal.quicktabs_views_persist = Drupal.quicktabs_views_persist || {};

  Drupal.behaviors.quicktabs_views_persist = {
    attach: function (context, settings) {
      $.extend(true, Drupal.settings, settings);
      $('.quicktabs-wrapper', context).once(function(){
        Drupal.quicktabs_views_persist.prepare(this);
      });
    }
  }

  Drupal.quicktabs_views_persist.prepare = function(el) {
    var qt_name = Drupal.quicktabs.getQTName(el);
    var $main = $(el).find('div.quicktabs_main:first');
    $main.find('div.quicktabs-tabpage').each(function(i, element) {
      element.myTabIndex = i;
      element.qt_name = qt_name;

      $(element).find('div.quicktabs-views-group a').each(function() {
        if (!$(this).hasClass('quicktabs_views_persist')) {
          var _href = $(this).attr('href');
          if (_href.indexOf('?') == -1) {
            $(this).attr('href', _href + '?qt-' + qt_name + '=' + i);
          }
          else {
            $(this).attr('href', _href + '&qt-' + qt_name + '=' + i);
          }
          $(this).addClass('quicktabs_views_persist');
        }
      })
    });
  }

})(jQuery);
