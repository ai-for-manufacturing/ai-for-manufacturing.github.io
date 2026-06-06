(function ($) {
  var $window = $(window);
  var $body = $('body');
  var $main = $('#main');
  var $nav = $('#nav');

  $window.on('load', function () {
    window.setTimeout(function () {
      $body.removeClass('is-preload');
    }, 100);
  });

  if ($nav.length > 0) {
    $main.scrollex({
      mode: 'top',
      enter: function () { $nav.addClass('alt'); },
      leave: function () { $nav.removeClass('alt'); }
    });

    var $navLinks = $nav.find('a');

    $navLinks
      .scrolly({
        speed: 1000,
        offset: function () { return $nav.height(); }
      })
      .on('click', function () {
        var $link = $(this);
        if ($link.attr('href').charAt(0) !== '#') return;

        $navLinks.removeClass('active active-locked');
        $link.addClass('active active-locked');
      })
      .each(function () {
        var $link = $(this);
        var $section = $($link.attr('href'));
        if ($section.length < 1) return;

        $section.scrollex({
          mode: 'middle',
          enter: function () {
            if ($navLinks.filter('.active-locked').length === 0) {
              $navLinks.removeClass('active');
              $link.addClass('active');
            } else if ($link.hasClass('active-locked')) {
              $link.removeClass('active-locked');
            }
          }
        });
      });
  }

  document.querySelectorAll('.profile-pic').forEach(function (img) {
    img.addEventListener('error', function () {
      var wrap = this.parentElement;
      if (wrap.querySelector('.profile-pic-fallback')) return;

      var fallback = document.createElement('span');
      fallback.className = 'profile-pic-fallback';
      fallback.textContent = this.alt || '';
      this.style.display = 'none';
      wrap.appendChild(fallback);
    });
  });
})(jQuery);
