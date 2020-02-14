var templates = {
  "home": {
    template: '<div class="swiper-slide disable-swipe" id="cmp-home">' +
      '<div class="flex flex-row">' +
        '<div class="flex-half home-image">' +
          '<div class="home-row-image"></div>' +
        '</div>' +
        '<div class="flex-half align-self-center home-information">' +
          '<div class="home-text"></div>' +
          '<div class="button-enter"' +
            'onclick="store.methods.swiperContentUpdate(this.dataset.type, this.dataset.direction, this.dataset.template, this.dataset.close)"' +
            'data-type="template" data-direction="next" data-template="countries"' + 
          '></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  },

  "countries": {
    template: '<div class="swiper-slide disable-swipe" id="cmp-countries">' +
      '<div class="flex flex-row">' +
        '<div class="flex-half">' +
          '<div class="countries-headline"></div>' +

          '<div class="flex flex-row countries-list">' +
            '<div class="countries-list-1"></div>' +
            '<div class="countries-list-2"></div>' +
            '<div class="countries-list-3"></div>' +
          '</div>' +
        '</div>' +
        '<div class="flex-half align-self-end">' +
          '<div class="button-lets-go"' +
            'onclick="store.methods.swiperContentUpdate(this.dataset.type, this.dataset.direction, this.dataset.template, this.dataset.close)"' +
            'data-type="template" data-direction="next" data-template="map"' + 
          '></div>' +
        '</div>' +
      '</div>' +
    '</div>'
  },

  "map": {
    template: '<div class="swiper-slide disable-swipe" id="cmp-map">' +
      '<div class="map-text"></div>' +
      '<div class="map-press-point"' +
        'onclick="store.methods.swiperContentUpdate(this.dataset.type, this.dataset.direction, this.dataset.template, this.dataset.close)"' +
        'data-type="template" data-direction="next" data-template="shopper"' + 
      '></div>' +
    '</div>'
  },

  "shopper": {
    template: '<div class="swiper-slide disable-swipe flex flex-row" id="cmp-shopper">' +
      '<div class="cmp-shopper-interact shopper-content">' +
        '<div class="shopper-headline"></div>' +

        '<div class="shopper-items">' +
          '<div class="shopper-item item-1" data-item="0" data-target-offset="0"></div>' +
          '<div class="shopper-item item-2" data-item="1" data-target-offset="182"></div>' +
          '<div class="shopper-item item-3" data-item="2" data-target-offset="364"></div>' +

          '<div class="shopper-item-count">0</div>' +
          '<div class="shopper-item-dropzone shopper-building"></div>' +
        '</div>' +
      '</div>' +
      '<div class="cmp-shopper-details shopper-content"' +
        'onclick="store.methods.swiperContentUpdate(this.dataset.type, this.dataset.direction, this.dataset.template, this.dataset.close)"' +
        'data-type="template" data-direction="next" data-template="shipping"' + 
      '></div>' +
    '</div>'
  },

  "shipping": {
    template: '<div class="swiper-slide disable-swipe" id="cmp-shipping" data-slide="shipping">' +
      '<img src="src/img/06/logo.png" id="aramex-logo" />'  +

      '<video src="src/img/06/video-1.mp4" id="shipping-video" poster="src/img/06/poster.jpg" width="1146" height="670"></video>' +
      '<img id="video-info" src="src/img/06/poster-1.png" />' +
    '</div>'
  },

  "form": {
    template: '<div class="swiper-slide disable-swipe" id="cmp-form" data-slide="form">' +
      '<div class="flex flex-row">' +
        '<div class="flex-half form-image">' +
          '<div class="form-row-image"></div>' +
        '</div>' +
        '<div class="flex-half align-self-center form-input-image">' +
          '<form id="form">' +
            '<input type="email" onfocus="store.methods.formAnimation(event)" onfocusout="store.methods.formAnimation(event)" id="email" placeholder="Email Address" />' +
            '<div id="submit" onclick="store.methods.formValidation(event)"></div>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>'
  },

  "video": {
    template: '<div class="swiper-slide disable-swipe" id="cmp-video" data-slide="video">' +
      '<img src="src/img/08/close.png" id="btn-close"' +
        'onclick="store.methods.swiperContentUpdate(this.dataset.type, this.dataset.direction, this.dataset.template, this.dataset.close, event)"' +
        'data-type="template" data-direction="previous" data-template="home"' + 
      ' />' +
      '<video src="src/img/08/full-video.mp4" id="campaign-video" width="1146" height="670" poster="src/img/08/poster.png"></video>' +
    '</div>'
  }
}