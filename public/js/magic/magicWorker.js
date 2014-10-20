importScripts('/vendor/LZWEncoder.js', '/vendor/NeuQuant.js', '/vendor/GIFEncoder.js', '/vendor/b64.js')

  var encoder = new GIFEncoder()
  encoder.setRepeat(0)
  encoder.setDelay(1000/30)
  encoder.start()

self.onmessage = function(event) {
  //postMessage(event.data + " Done")
  if (event.data !== "finished") {
    var width = event.data.width
    var height = event.data.height
    encoder.setSize(width, height)
    encoder.addFrame(event.data.data, true)
    self.postMessage('waiting')
    //self.postMessage(encoder.stream().getData())
  } else {
    console.log("finished")
    encoder.finish()
    var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
    var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
    self.postMessage(data_url)
  }
}
