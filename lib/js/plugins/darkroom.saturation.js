;(function(window, document, Darkroom) {
  'use strict';

  Darkroom.plugins['saturation'] = Darkroom.Plugin.extend({
    defaults: {
      callback: function() {
        this.darkroom.callSaturation();
      }
    },

    initialize: function InitDarkroomSavePlugin() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      this.destroyButton = buttonGroup.createButton({
        image: 'saturation'
      });

      this.destroyButton.addEventListener('click', this.options.callback.bind(this));
    },
  });
})(window, document, Darkroom);
