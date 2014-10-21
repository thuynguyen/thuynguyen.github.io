;jQuery(document).ready(function($) {
  
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
})
