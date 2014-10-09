;jQuery(document).ready(function($) {
  $("#magicpage").height = String(window.innerHeight)+"px";
  $("#magicpage").width = String(window.innerWidth)+"px"
  magic.loadCanvas('playground')
  magic.loadBg()
  $('#image4doodle').change(magic.loadImageFile)
  $('#addAnimation').click(magic.addAnimation)
  $('#startRecord').click(magic.startStopRecord)
  $('#preview').click(magic.preview)
})
// $(document).on("pagecreate","#magicpage",function(){
//   $("#magicpage").on("swipeleft",function(){
//     alert(12);
//     magic.addAnimation()
//   });                       
// });