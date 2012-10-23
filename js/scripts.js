$(window).load(function() {

  var $detailView = $('.detail-view'),
    $thumb = $('.thumb'),
    size = window.getComputedStyle(document.body,':after').getPropertyValue('content'),
    $portfolioWrap = $('.portfolio-wrap'),
    $portfolioFilterMenu = $('#portfolioFilterMenu');

  function mobilePortFilter() {
    var portMenu = "";

    portMenu += '<h2 class="select-head">Select a Category:</h2>';
    portMenu += '<select name="filter-selector" id="filterSelect">';
    portMenu += '<option data-filter="*" value="all">Show All</option>';
    portMenu += '<option data-filter=".advertising" value="advertising">Advertising</option>';
    portMenu += '<option data-filter=".print-design" value="print-design">Print Design</option>';
    portMenu += '<option data-filter=".branding" value="branding">Brand Development</option>';
    portMenu += '<option data-filter=".interactive" value="interactive">Interactive Design</option>';
    portMenu += '</select>';

    $portfolioFilterMenu.empty().hide().html(portMenu);
    $('#filterSelect').customSelect();
    $portfolioFilterMenu.slideDown(300);
  }

  function desktopPortFilter() {
    var portMenu = "";

    portMenu += '<nav class="sub-nav" id="servicesListing">';
    portMenu += '<h2 class="head">Select a Category:</h2>';
    portMenu += '<div class="item-wrap">';
    portMenu += '<div class="item selected" data-filter="*">Show All</div>';
    portMenu += '<div class="item" data-filter=".advertising">Advertising</div>';
    portMenu += '<div class="item" data-filter=".print-design">Print Design</div>';
    portMenu += '<div class="item" data-filter=".branding">Brand Development</div>';
    portMenu += '<div class="item" data-filter=".interactive">Interactive Design</div>';
    portMenu += '</div></nav>'

    $portfolioFilterMenu.empty().hide().html(portMenu).slideDown(300);
  }

  function buildMenu() {
    if (size == 'mobile') {
      mobilePortFilter();
    }
    else if (size == 'desktop') {
      desktopPortFilter();
    }
  }

  buildMenu();

  $portfolioWrap.isotope({
    itemSelector: '.thumb',
    layoutMode: 'fitRows'
  });

  // $(window).resize(function () {
  //   var resize = true;
  //   $portfolioFilterMenu.slideUp(300);
  //   while (resize === true) {
  //     window.setTimeout(1000);
  //     if (!$(window).resize()) {
  //       buildMenu();
  //       resize = false;
  //     }
  //   }
  // });

  $thumb.hover(
    function () {
      // $(this).children('.caption').animate({ 'bottom': 0 }, 100);
      $(this).children('.caption').css('bottom', 0);
    },
    function () {
      $(this).children('.caption').css('bottom', '-1.5em');
    }
  );

  $thumb.on("click", function () {
    $detailView.slideDown(300);
  })

  $('#closeDetailView').on("click", function () {
    $detailView.slideUp(300);
  });

  $('.item-wrap .item').on("click", function () {
    var selector = $(this).attr('data-filter');
    $('.item-wrap .item').removeClass("selected");
    $(this).addClass("selected");
    $portfolioWrap.isotope({ filter: selector });
    return false;
  });

  $('#filterSelect').change(function () {
    var selector = $(this).find('option:selected').attr('data-filter');
    $portfolioWrap.isotope({ filter: selector });
  });

});