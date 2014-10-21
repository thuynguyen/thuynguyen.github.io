(function() {
  var root = this
  var magic = this.magic = {}
  var canvas = null
  var rawCanvasCtx = null
  var isRecording = false
  var startRecordingTime = null
  var lastDrawTime = null
  var startAnimateTime = null
  var lastDrawAnimateTime = null
  var animationButton = null
  var worker = null
  var duration = 2000 // ms
  var fps = 30
  var totalFrames = fps * duration / 1000
  var frameTime = 1000 / 30
  var progress = 0
  var i = 1;
  var imgObj = null
  var rotateImage = null
  var left = "Left"
  var right = "Right"
  var top = "Top"
  var sprW = 60;
  var sprH = 60;
  var currentID = 0;
  var frame_index = 0
  var shuttleSprite = window.shuttleSprite["frames"]
  var fanSprite = window.fanSprite["frames"]
  var doveSprite = window.doveSprite["frames"]
  var bg = null;
  var currentDirection = "";
  var for_x = 1;
  magic.loadCanvas = function(canvasId) {
    canvas = document.getElementById(canvasId)
    rawCanvasCtx = canvas.getContext('2d')
    // canvas = new fabric.Canvas(canvasId)
    //canvas = document.getElementById(canvasId)
    bg = new Image()
    bg.src = "public/images/doodle1.gif"
  }
  
  magic.loadBg = function() {
    // fabric.Image.fromURL("public/images/magic/sample_doodle1.png", function(img) {
    //     //img.set('top', fabric.util.getRandomInt(1, 1)).set('top', 0);
    //     //img.movingRight = !!Math.round(Math.random());
    //     canvas.add(img);
    //     canvas.item(0).hasControls = canvas.item(0).hasBorders = false;
    //     canvas.item(0).lockMovementY = canvas.item(0).lockMovementX = true; 
    //   });
    bg.src = bg.src
    bg.onload = function() {
      rawCanvasCtx.drawImage(bg, 0, 0, canvas.width, canvas.height)
      //rawCanvasCtx.canvas.width  = window.innerWidth-35;
      // rawCanvasCtx.canvas.height = window.innerHeight;
    }
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
        var imgInstance = new fabric.Image(image, {left: 0, top: 0, hasBorders: false,
       hasControls: false})
        canvas.add(imgInstance)
      }
      fr.readAsDataURL(files[0]);
    } else {
      // Not supported
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
    }
  }
  
  magic.startRecordInWorker = function(src, direction) {
    worker = new Worker('public/js/magic/magicWorker.js')
    progress = 0
    // worker.onmessage = function(event) {
    //   if (event.data !== 'waiting') {
    //     $("#preview").removeClass("disabled")
    //     $("#preview").val("Preview")
    //     localStorage.setItem('data_url', event.data)
    //   } else {
    //     // Waiting
    //     progress += ((1.0/totalFrames) * 100)
    //     $("#preview").val(progress.toFixed(2).toString() + "%")
    //   }
    // }
    magic.addAnimation(src, direction)
  }

  magic.addAlreadyAnimation = function() {
    // For Left
    img = new Image();
    rotateImage = magic.sprite({
      context: canvas.getContext("2d"),
      width: 8286,
      height: 328,
      image: img,
      numberOfFrames: 40,
      ticksPerFrame: 4,
      direction: right,
      spriteSize: doveSprite.length,
      bg: bg
    });
  
  // Load sprite sheet
    img.onload = function() {
      magic.gameLoop()
    }
    img.src = "public/images/magic/dove.png";
  }

  magic.addRightAnimation = function() {
    // For Train
    img = new Image();
    rotateImage = magic.sprite({
      context: canvas.getContext("2d"),
      width: 8286,
      height: 328,
      image: img,
      numberOfFrames: 40,
      ticksPerFrame: 4,
      direction: "",
      spriteSize: shuttleSprite.length,
      bg: bg
    });
  
  // Load sprite sheet
    img.onload = function() {
      magic.gameLoop()
    }
    img.src = "public/images/magic/train.png";
  }

  magic.addBottomTopAnimation = function() {
    // For Top
    img = new Image();
    rotateImage = magic.sprite({
      context: canvas.getContext("2d"),
      width: 8286,
      height: 328,
      image: img,
      numberOfFrames: 40,
      ticksPerFrame: 4,
      direction: top,
      spriteSize: shuttleSprite.length,
      bg: bg
    });
  
  // Load sprite sheet
    img.onload = function() {
      magic.gameLoop()
    }
    img.src = "public/images/magic/shuttle.png";
  }
  magic.addLeftAnimation = function() {
    img = new Image();
    rotateImage = magic.sprite({
      context: canvas.getContext("2d"),
      width: 940,
      height: 90,
      image: img,
      numberOfFrames: 10,
      ticksPerFrame: 4,
      direction: left,
      spriteSize: fanSprite.length,
      bg: bg
    });
  
  // Load sprite sheet
    img.onload = function() {
      magic.gameLoop()
    }
    img.src =  "public/images/magic/fan.png"
  }

  magic.addAnimation = function(src_img, direction) {
    switch (direction) {
        case left:
          magic.addLeftAnimation()
          break;
        case right:
          magic.addRightAnimation()
          break;
        case top:
          magic.addBottomTopAnimation()
          break;
        default:
          magic.addAlreadyAnimation()
          break;
      }
    window.c = canvas;
    //magic.startStopRecord()
  }

  magic.startStopRecord = function(e) {
    requestAnimationFrame(magic.recordFrame)
  }

  magic.recordFrame = function(timestamp) {
    
    if (startRecordingTime === null) {
      startRecordingTime = timestamp
    }

    if ((timestamp - startRecordingTime) > duration) {
      lastDrawTime = null
      startRecordingTime = null
      worker.postMessage('finished')
      return
    }

    if (lastDrawTime === null || (timestamp - lastDrawTime) > frameTime) {
      var imageData = rawCanvasCtx.getImageData(0,0,canvas.width,canvas.height).data
      worker.postMessage({
        width: canvas.width,
        height: canvas.height,
        data: imageData})

        lastDrawTime = timestamp
    }
    window.requestAnimationFrame(magic.recordFrame)
  }

  magic.preview = function() {
    window.location.href = "preview.html"
  }
  

  magic.gameLoop = function(timestamp) {
    for_x++;
    //if (for_x > 300) {for_x = 0; return}
    
    if (startAnimateTime === undefined) {
      startAnimateTime = timestamp
    }

    if ((timestamp - startAnimateTime) > 10000) {
      lastDrawAnimateTime = undefined
      startAnimateTime = undefined
      for_x = 0
      rawCanvasCtx.drawImage(bg, 0, 0, canvas.width, canvas.height)
      return
    }
    
    if (lastDrawAnimateTime === undefined || (timestamp - lastDrawAnimateTime) > frameTime) {
      
      rotateImage.update();
      rotateImage.render();
      lastDrawAnimateTime = timestamp
    }
    
    console.log("timestamp==== "+timestamp)
    window.requestAnimationFrame(magic.gameLoop);
    if (timestamp === NaN || timestamp === undefined) return
    
  }
  magic.sprite = function(options) {
    var that = {},
      frameIndex = 0,
      tickCount = 0,
      ticksPerFrame = options.ticksPerFrame || 0,
      numberOfFrames = options.numberOfFrames || 1;
      
      that.context = options.context;
      that.width = options.width;
      that.height = options.height;
      that.direction = options.direction;
      that.image = options.image;
      that.spriteSize = options.spriteSize;
      that.bg = options.bg
      currentDirection = options.direction;
      that.update = function () {
         console.log("currentID in update===="+currentID)
        if (currentID < that.spriteSize - 1 )
          currentID ++;
        else
          currentID = 0;
      };
    
      that.render = function () {
        console.log("for_x "+for_x)
        that.context.clearRect(0,0, canvas.width, canvas.height); 
        that.context.drawImage(bg, 0, 0, canvas.width, canvas.height)
        console.log("currentID in render===="+currentID)
        if (that.direction == top) {
          that.context.drawImage(that.image, shuttleSprite[currentID].frame.x, shuttleSprite[currentID].frame.y, shuttleSprite[currentID].frame.w, shuttleSprite[currentID].frame.h, 
                                50, 300-currentID*10, shuttleSprite[currentID].frame.w, shuttleSprite[currentID].frame.h); //
        } else if (that.direction == left) {
            for (var i = 0; i < that.spriteSize; i++) {
              if (currentID == parseInt(fanSprite[i].filename)) {
                console.log("------order----"+fanSprite[i].filename)
                that.context.drawImage(that.image, fanSprite[currentID].frame.x, fanSprite[currentID].frame.y, fanSprite[currentID].frame.w, fanSprite[currentID].frame.h, 
                                  canvas.width/2-200,0, fanSprite[currentID].frame.w, fanSprite[currentID].frame.h);
              }
            }
        } else if (that.direction == right) {
          that.context.drawImage(that.image, doveSprite[currentID].frame.x, doveSprite[currentID].frame.y, doveSprite[currentID].frame.w, doveSprite[currentID].frame.h, 
                            canvas.width-for_x, 20, doveSprite[currentID].frame.w, doveSprite[currentID].frame.h);
        } else {
           that.context.drawImage(that.image, 0, 0, 558, 50, 
                                  canvas.width - for_x*10, 100, 558, 50);
        }
        

    };
    return that;
  }
 
  magic.canvas = function() {
    return canvas
  }

}.call(this));
