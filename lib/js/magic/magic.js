(function() {
  var root = this
  var magic = this.magic = {}
  var canvas = null
  var rawCanvasCtx = null
  var isRecording = false
  var encoder = new GIFEncoder()
  encoder.setRepeat(0)
  encoder.setDelay(1000/30)
  var startRecordingTime = null
  var lastDrawTime = null
  var animationButton = null

  magic.loadCanvas = function(canvasId) {
    rawCanvasCtx = document.getElementById(canvasId).getContext('2d')
    canvas = new fabric.Canvas(canvasId)

    // document.getElementById(canvasId).height = String(window.innerHeight)+"px"
    // document.getElementById(canvasId).width = String(window.innerWidth) +"px"
  }
  magic.loadBg = function() {
    fabric.Image.fromURL("img/sample_doodle1.png", function(img) {
        //img.set('top', fabric.util.getRandomInt(1, 1)).set('top', 0);
        //img.movingRight = !!Math.round(Math.random());

        canvas.add(img);
      });

    // img = new Image();
    // img.onload = function() {
    //   rawCanvasCtx.drawImage(img,0,0);
    // }
    // img.src = "img/sample_doodle.jpg";
  }
  magic.loadImageFile = function(evt) {
    var tgt = evt.target || window.event.srcElement, files = tgt.files
    var image = new Image()

    //FileReader support
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        image.src = fr.result;
        //ctx = document.getElementById('playground').getContext('2d')
        //ctx.drawImage(image, 0, 0)
        var imgInstance = new fabric.Image(image, {left: 0, top: 0})
        canvas.add(imgInstance)
      }
      fr.readAsDataURL(files[0]);
    } else {
      // Not supported
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
    }
  }

  magic.addAnimation = function() {
    var img = new Image()
    img.src = 'img/train.png'
    encoder.start()
    img.onload = function() {
      var imgInstance = new fabric.Image(this, {left: 0, top: 0})
      imgInstance.animate('left', 600, {
        onChange: canvas.renderAll.bind(canvas),
        duration: 1000,
        //easing: fabric.util.ease.easeOutBounce
      });
      canvas.add(imgInstance)
    }
    requestAnimationFrame(magic.recordFrame)
  }

  magic.startStopRecord = function(e) {
    // animationButton = $(e.currentTarget)
    // animationButton.val('Recording')
    
    requestAnimationFrame(magic.recordFrame)
  }

  magic.recordFrame = function(timestamp) {
    console.log("abc ----------------")
    if (startRecordingTime === null) {
      startRecordingTime = timestamp
    }

    if ((timestamp - startRecordingTime) > 5000) {
      lastDrawTime = null
      startRecordingTime = null
      //$(e.currentTarget).val('Start Recording')
      encoder.finish();
      var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
      var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
      localStorage.setItem("data_url", data_url)

      console.log(data_url.length)
      //animationButton.val('Start Record')
      return
    }

    if (lastDrawTime === null || (timestamp - lastDrawTime) > 33) {
      encoder.addFrame(canvas.contextContainer)
      lastDrawTime = timestamp
    }
    window.requestAnimationFrame(magic.recordFrame)
  }
  magic.preview = function() {
    window.location.href = "preview.html"
    
    //$("#animationImage").height = window.innerHeight+"px";
    //$("#animationImage").width = window.innerWidth+"px";
    //localStorage.clear();
  }
  magic.canvas = function() {
    return canvas
  }

}.call(this));
