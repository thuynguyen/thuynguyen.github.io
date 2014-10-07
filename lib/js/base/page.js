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
  Caman(".lower-canvas", "./demo/images/sample_doodle.jpg", function () {
    this.render();
  });
  var busy, changed;
  busy = false;
  changed = false;
  $(".filter-brightness-setting input[type=range]").on("change", _.throttle(bright, 300));

  $(".filter-saturation-setting input[type=range]").change(function(){
    var satuVal = $(this).val();
    Caman(".lower-canvas", "./demo/images/sample_doodle.jpg", function () {
      this.revert(true);
      this.saturation(parseInt(satuVal)).render();
    });
  })
});

function changeBrightNess(){
  $(".filter-brightness-setting input[type=range]").on("change", _.throttle(bright, 300));
}
 function bright(){
  console.log("vao bright");
  var brightVal = $(this).val();
  Caman(".lower-canvas", "./demo/images/sample_doodle.jpg", function () {
    this.revert(false);
    // this.nostalgia();
    this.brightness(parseInt(brightVal)).render();
  });
 }
function changeSaturation(){
  console.log("vao saturation");
  $(".filter-saturation-setting input[type=range]").change(function(){
    var satuVal = $(this).val();
    Caman(".lower-canvas", "./demo/images/sample_doodle.jpg", function () {
      this.revert(true);
      this.saturation(parseInt(satuVal)).render();
    });
  })
}

function changeRed(){
  console.log("vao red");
  $(".filter-red-setting input[type=range]").change(function(){
    var self = this;
    var redVal = $(self).val();
    Caman(".lower-canvas", "./demo/images/sample_doodle.jpg", function () {
      this.revert(false);
      this.channels({red: parseInt(redVal)}).render();
    });
  })
}

function changeGreen(){
  $(".filter-green-setting input[type=range]").change(function(){
    var self = this;
    var greenVal = $(self).val();
    Caman(".lower-canvas", "./demo/images/sample_doodle.jpg", function () {
      this.revert(false);
      this.channels({green: parseInt(greenVal)}).render();
    });
  })
}

function changeBlue(){
  $(".filter-blue-setting input[type=range]").change(function(){
    alert("ok");
    var self = this;
    var blueVal = $(self).val();
    Caman(".lower-canvas", "./demo/images/sample_doodle.jpg", function () {
      this.revert(false);
      this.channels({blue: parseInt(blueVal)}).render();
    });
  });
}

function resetFilter(){
  $("input[type=range]").each(function(){
    $(this).val(0);
  });
  $("span.filter-value").html("0");
}