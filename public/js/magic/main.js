;jQuery(document).ready(function($) {
  $("#voice-text").val("");
  magic.loadCanvas('playground')
  magic.loadBg()
  $('#image4doodle').change(magic.loadImageFile)
  //$('#addAnimation').click(magic.addAnimation)
  $('#_addAnimation').click(function() {
  	magic.startRecordInWorker()
  })
  $('#_addLeftAnimation').click(function() {magic.startRecordInWorker("public/images/magic/train.png", "Left")})
  $('#_addRightAnimation').click(function() {magic.startRecordInWorker("public/images/magic/train.png", "Right")})
  $('#_addBottomTopAnimation').click(function() {magic.startRecordInWorker("img/space_ship.png", "Top")})
  //$('#startRecord').click(magic.startStopRecord)
  $('#preview').click(magic.preview)
  $('#view_text').click(magic.drawText)
  // Init for text magic
  textMagic.init({canvasId: 'playground',
                finished: function() { console.log('Done')},
                background: 'public/images/doodle1.gif',
                text: 'Hello world'
  })
  $("#addTextMagic").click(textMagic.startTransform)

  $("#voice-icon").click(function(e){
    $("#voice-text").val("");
    $("#voice-text").focus();
  });
  $("#voice-text").change(function(e){
    var animations = [{ id: "train", hashtags: ["one","ten", "train", "dan", "man", "xe lửa", "tàu hoả"], image_url: "public/images/train.png", method: "magic.addTrain();" },
                      { id: "fan", hashtags: ["happy", "fan", "gió", "cối xay gió", "windmill"], image_url: "public/images/train.png", method: "magic.addFan();"},
                      { id: "shuttle", hashtags: ["shuttle", "tên lửa", "hoả tiển"], image_url: "public/images/train.png", method: "magic.addShuttle();"},
                      { id: "dove", hashtags: ["bồ câu", "chim bồ câu", "chim", "bird", "dove"], image_url: "public/images/train.png", method: "magic.addDove();"}];
    var current_animations = _.filter(animations, function(a){return a["hashtags"].indexOf(e.target.value.toLowerCase()) >= 0 });
    if (current_animations.length == 0){
      var hashtags = _.flatten(_.map(animations, function(a){return a["hashtags"]})).join(", ");
      alert("We only support the keywords: " + _.map(animations, function(a){return hashtags}))
    }
    else{
      eval(current_animations[0]["method"]);
    }
  });

  textMagic.init({canvasId: 'playground',
                finished: function() { console.log('Done')},
                background: 'public/images/doodle1.gif',
                text: 'Hello world'
  })
  $("#addTextMagic").click(textMagic.startTransform)
});
