$(document).ready(function(){
  var dkrm = new Darkroom('#target', {
      // Size options
      plugins: {
        //save: false,
        crop: {
          quickCropKey: 67, //key "c"
          minHeight: 50,
          minWidth: 50,
          ratio: 1
        }
      },
      // init: function() {
      //   var cropPlugin = this.getPlugin('crop');
      //   cropPlugin.selectZone(170, 25, 300, 300);
      //   //cropPlugin.requireFocus();
      // }
    });
  resetFilter();
  Caman(".lower-canvas", "./demo/images/domokun.jpg", function () {
    this.render();
  });
  var busy, changed;
  busy = false;
  changed = false;
  changeBrightNess();
  changeSaturation();
  changeRed();
  changeGreen();
  changeBlue();
});

function changeBrightNess(){
  $(".filter-brightness-setting input[type=range]").on("change", _.throttle(bright, 300));
}
 function bright(){
  var brightVal = $(this).val();
  $(".filter-brightness-setting span.filter-value").html(brightVal);
  Caman(".lower-canvas", "./demo/images/domokun.jpg", function () {
    this.revert(false);
    // this.nostalgia();
    this.brightness(parseInt(brightVal)).render();
  });
 }
function changeSaturation(){
  $(".filter-saturation-setting input[type=range]").change(function(){
    var satuVal = $(this).val();
    $(".filter-saturation-setting span.filter-value").html(satuVal);
    Caman(".lower-canvas", "./demo/images/domokun.jpg", function () {
      this.revert(true);
      this.saturation(parseInt(satuVal)).render();
    });
  })
}

function changeRed(){
  $(".filter-red-setting input[type=range]").change(function(){
    var self = this;
    var redVal = $(self).val();
    $(".filter-red-setting span.filter-value").html(redVal);
    Caman(".lower-canvas", "./demo/images/domokun.jpg", function () {
      this.revert(false);
      this.channels({red: parseInt(redVal)}).render();
    });
  })
}

function changeGreen(){
  $(".filter-green-setting input[type=range]").change(function(){
    var self = this;
    var greenVal = $(self).val();
    $(".filter-green-setting span.filter-value").html(greenVal);
    Caman(".lower-canvas", "./demo/images/domokun.jpg", function () {
      this.revert(false);
      this.channels({green: parseInt(greenVal)}).render();
    });
  })
}

function changeBlue(){
  $(".filter-blue-setting input[type=range]").change(function(){
    var self = this;
    var blueVal = $(self).val();
    $(".filter-blue-setting span.filter-value").html(blueVal);
    Caman(".lower-canvas", "./demo/images/domokun.jpg", function () {
      this.revert(false);
      this.channels({blue: parseInt(blueVal)}).render();
    });
  })
}

function resetFilter(){
  $("input[type=range]").each(function(){
    $(this).val(0);
  });
  $("span.filter-value").html("0");
}