var store = {
  props: {
    /** 
     * @type {Properties}
     * Storage of values and states for channel updating
     */
    main: document.getElementById("channel"),
    interfaceDirection: undefined,
    primarySwiper: null,
    interfaceTransitioned: false,
    showcaseVideoPlayback: false,
  },

  methods: {
    /** 
     * @type {Methods}
     * These functions are prebuilt into this template, each function here is required 
     * to make the channel work and flow as smooth as possible.
     * 
     * NB!!! Do not remove any of these functions, modifications are allowed
     * inside the functions.
     * 
     * The purpose of these functions to build new html templates on the fly 
     * and remove existing html that is not in view, so depending on what is in view
     * in the browser, everything that is not viewed gets removed from the dom
     * to increase performance, the swiper framework allows seamless coding and performance
     * for this kind of functionality
     */
    slidesOnloadAppend: function () {
      swipers.methods.swiperStart(swipers.props.interfaceId);
      store.props.primarySwiper = swipers.data.swiperStorage[0];
      store.methods.swiperContentUpdate("template", "next", "home");
      store.methods.transitionEvents();
    },

    swiperContentUpdate: function (type, direction, template, gallery, target) {
       if (target && type === "template") {
        target.currentTarget.classList.add('pointer-event-disable');
      }
      
      switch (type) {
        case "template":
          store.props.interfaceDirection = direction;

          if (direction === "next") {
            store.props.primarySwiper.appendSlide(templates[template].template);
            setTimeout(function() { 
              store.props.primarySwiper.slideNext();
            }, 200);
          } else {
            store.props.primarySwiper.prependSlide(templates[template].template);
            setTimeout(function() { 
              store.props.primarySwiper.slidePrev(); 
            }, 200);

            if (template === "home") {
              if (target) {
                var element = target.nextSibling;

                if (element.nodeName === "VIDEO") {
                  if (element.currentTime !== element.duration) {
                    console.log("Video Skipped");
                  }
                }
              }
            }
          }
          
          store.methods.swiperInstanceDestroyOrNot(gallery);
          store.methods.customTemplateFunctions(template);
          break;
        case "popup":
          var popuptemplate = document.getElementById(template);
          
          if (!popuptemplate.classList.contains("popup-show")) {
            popuptemplate.classList.add("popup-show");
            popuptemplate.classList.remove("popup-remove");
          } else {
            popuptemplate.classList.add("popup-remove");
            popuptemplate.classList.remove("popup-show");
          }
        break;
      }
    },

    swiperInstanceDestroyOrNot: function (gallery) {
      if (gallery) {
        store.methods.buildSwiperInstanceOrNot(store.props.primarySwiper.slides[1]);
      } else {
        swipers.data.swiperStorage.pop();
      }
    },

    buildSwiperInstanceOrNot: function (target) {
      if (target) {
        if (target.dataset.style) {
          swipers.methods.swiperStart(target);
        }
      }
    },

    transitionEvents: function () {
      store.props.primarySwiper.on("transitionEnd", function () {
        var slide = this.slides[0];

        store.props.interfaceDirection === "next" ? this.removeSlide(this.activeIndex - 1) : this.removeSlide(this.activeIndex + 1);

        if (!store.props.interfaceTransitioned) {
          store.props.interfaceTransitioned = true;
          var slide = slide.dataset.slide;

          if (slide === "shipping") {
            store.methods.shippingShowcaseVideo();
          } else if (slide === "video") {
            store.methods.campaignVideoPlayback();
          }

          store.props.transitioned = true;
        } else {
          store.props.interfaceTransitioned = false;
        }
      });
    },

    formValidation: function(event) {
      var email = document.getElementById("email");
      var emailExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
	
			if (email.value == "") {
				if (email.value == "") {
					email.style.borderColor = "red";
					setTimeout (function () {
						email.removeAttribute("style");
						email.innerHTML = "";
					}, 2500);
				}
				
				return false;
			} else if (email.value != "") {
        if (!emailExpression) {
          email.style.borderColor = "red";
  
          setTimeout(function() {
            email.removeAttribute("style");
          }, 2000);

          return emailExpression;
        } else {
          event.currentTarget.style.pointerEvents = "none";
          store.methods.formHandler(event);
          return true;
        }
			}
    },

    formHandler: function (event) {
      var forms = {
        formSuccess: function() {
          var email = document.getElementById("email");
          
          email.style.borderColor = "#1ea744";

          setTimeout(function() {
            store.methods.swiperContentUpdate('template', 'next', 'video');
          }, 2000);
        }
      }

      try {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        var email = document.getElementById("email");

        const TRANSPORT_OBJECT = {
          formName: "Aramex",
          email: email.value,
          fingerprint: Date.now()
        }
        
        /**
         * Not Required - Testing
         * cabapi.uploadFormData(CONTENT_TYPE_JSON, JSON.stringify(TRANSPORT_OBJECT));
         */

        var settings = {
          "async": true,
          "crossDomain": true,
          "url": "https://fvnk111k6l.execute-api.eu-central-1.amazonaws.com/v1_3/form",
          "method": "POST",
          "headers": {
            "content-type": "application/json"
          },
          "processData": false,
          "data": JSON.stringify(TRANSPORT_OBJECT)
        }

        /**
         * Not Required - Testing
         * $.ajax(settings);
         */
        forms.formSuccess();
      } catch (error) {
        document.write(error);
      }
    },

    /**
     * @type {Methods}
     * All custom functions can be written here for cleaner code, these functions should 
     * only coded if some/all of the above functions cannot help in the execution of a
     * certain action. You can use these functions inside the above functions
     */
    shippingShowcaseVideo: function() {
      var shippingVideo = document.getElementById("shipping-video");
      var videoInfo = document.getElementById("video-info");

      shippingVideo.onplay = function() {
        this.volume = 0;
      }

      shippingVideo.play();

      shippingVideo.onended = function() {
        if (!store.props.showcaseVideoPlayback) {
          store.props.showcaseVideoPlayback = true;

          videoInfo.src = "src/img/06/poster-2.png";
          shippingVideo.src = "src/img/06/video-2.mp4";
          shippingVideo.play();
        } else {
          store.props.showcaseVideoPlayback = false;
          store.methods.swiperContentUpdate('template', 'next', 'form');
        }
      }
    },

    campaignVideoPlayback: function() {
      var campaignVideo = document.getElementById("campaign-video");

      campaignVideo.play();
      campaignVideo.onended = function() {
        store.methods.swiperContentUpdate('template', 'previous', 'home');
      }
    },

    customTemplateFunctions: function(template) {
      var customs = {
        methods: {
          shopperItemsDragging: function() {
            var cards = document.querySelectorAll('.shopper-item');

            for (var i = 0, length = cards.length; i < length; i++) {
              cardsInteract(cards[i]);
            }
          }
        }
      }

      if (template === 'shopper') {
        customs.methods.shopperItemsDragging();
      }
    },

    formAnimation: function(event) {
      var form = document.getElementById('form');
      
      if (event.type === "focus") {
        form.style.transform = "translateY(-360px)";
        form.style.webkitTransform = "translateY(-360px)";
      } else {
        form.removeAttribute("style");
      }
    },
  }
}

store.methods.slidesOnloadAppend();