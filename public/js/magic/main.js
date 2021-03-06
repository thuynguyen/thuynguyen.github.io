;jQuery(document).ready(function($) {
  $("#voice-text").val("");
  magic.loadCanvas('playground')
  magic.loadBg()
  $('#image4doodle').change(magic.loadImageFile)
  //$('#addAnimation').click(magic.addAnimation)
  $('#_addAnimation').click(function() {
  	magic.disabledButton()
    magic.startRecordInWorker()
  })
  $('#_addLeftAnimation').click(function(){
    magic.disabledButton()
    magic.startRecordInWorker("", "fan")
  })
  $('#_addRightAnimation').click(function(){
    magic.disabledButton()
    magic.startRecordInWorker("", "train")
  })
  $('#_addBottomTopAnimation').click(function(){
    magic.disabledButton()
    magic.startRecordInWorker("", "shuttle")
  })

  //$('#startRecord').click(magic.startStopRecord)
  $('#preview').click(magic.preview)
  $('#view_text').click(magic.drawText)
  // Init for text magic
  textMagic.init({canvasId: 'playground',
                finished: function() { console.log('Done')},
                background: 'public/images/magic/sample_doodle.png',
                text: 'Google'
  })
  $("#addTextMagic").click(textMagic.startTransform)

  $("#voice-icon").click(function(e){
    $(e.target).hide();
    $("#voice-icon-disabled").show();
    $("#voice-text").val("");
    $("#voice-text").focus();
  });
  $("#voice-text").change(function(e){
    alert(e.target.value);
    var animations = [{ id: "train", hashtags: ["one","ten", "train", "dan", "man", "xe lửa", "tàu hoả"], image_url: "public/images/train.png", method: "magic.addTrain();" },
                      { id: "fan", hashtags: ["happy", "fan", "gió", "cối xay gió", "windmill"], image_url: "public/images/train.png", method: "magic.addFan();"},
                      { id: "shuttle", hashtags: ["shuttle", "tên lửa", "hoả tiển"], image_url: "public/images/train.png", method: "magic.addShuttle();"},
                      { id: "dove", hashtags: ["bồ câu", "chim bồ câu", "chim", "bird", "dove"], image_url: "public/images/train.png", method: "magic.addDove();"}];
    var current_animations = _.filter(animations, function(a){return a["hashtags"].indexOf(e.target.value.toLowerCase()) >= 0 });
    if (current_animations.length == 0){
      var hashtags = _.flatten(_.map(animations, function(a){return a["hashtags"]})).join(", ");
      alert("We only support the keywords: " + _.map(animations, function(a){return hashtags}));
      $("#voice-icon").show();
      $("#voice-icon-disabled").hide();
    }
    else{
      eval(current_animations[0]["method"]);
    }
  });
  
});
$(window).resize( magic.respondCanvas );
