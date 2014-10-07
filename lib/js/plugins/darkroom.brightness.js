;(function(window, document, Darkroom) {
  'use strict';

  Darkroom.plugins['brightness'] = Darkroom.Plugin.extend({
    defaults: {
      callback: function() {
        this.darkroom.callBrightness();
      }
    },

    initialize: function InitDarkroomSavePlugin() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      this.destroyButton = buttonGroup.createButton({
        image: 'brightness'
      });

      this.destroyButton.addEventListener('click', this.options.callback.bind(this));
    },
  });
})(window, document, Darkroom);
