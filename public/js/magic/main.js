;jQuery(document).ready(function($) {
  $("#magicpage").height = String(window.innerHeight)+"px";
  $("#magicpage").width = String(window.innerWidth)+"px"
  magic.loadCanvas('playground')
  magic.loadBg()
  $('#image4doodle').change(magic.loadImageFile)
  //$('#addAnimation').click(magic.addAnimation)
  $('#_addAnimation').click(function() {
  	magic.startRecordInWorker()
  })
     
  $('#_addLeftAnimation').click(function() {magic.startRecordInWorker("img/train.png", "Left")})
  $('#_addRightAnimation').click(function() {magic.startRecordInWorker("img/train.png", "Right")})
  $('#_addBottomTopAnimation').click(function() {magic.startRecordInWorker("img/space_ship.png", "Top")})
  //$('#startRecord').click(magic.startStopRecord)
  $('#preview').click(magic.preview)
  $('#view_text').click(magic.drawText)
})
// $(document).on("pagecreate","#magicpage",function(){
//   $("#magicpage").on("swipeleft",function(){
//     alert(12);
//     magic.addAnimation()
//   });                       
// });