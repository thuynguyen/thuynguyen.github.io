
// Scan the original image to get all particles + dest position
// random dep position (outside the canvas) into 4 groups
// - top: w > x > 0, -h < y < 0
// - left: -w < x < 0, h > y > 0
// - right: w < x < 2w, h > y > 0
// - bottom: w > x > 0, 2h > y > h
// moving the particles to destinations,
// when all particles has arrived theirs dest, clean all particles and draw the origin image
//
//  textMagic.init({canvasId: 'playground',
//                 finished: function() { console.log('Done')},
//                 background: '/img/sample_doodle.png',
//                 text: 'Hello world'
//  })

(function() {
  var ctx = null
  var density = 3
  var width, height = 0
  var textMagic = this.textMagic = {}
  var imageParticles = []
  var textParticles = []
  var imageParticleFinished = false
  var textParticleFinished = false
  var startTextAnimation = null
  var startImageAnimation = null
  var xSeek = 0
  var imageLoaded = false
  var text = ''
  var image = new Image()
  var finishedCallback = null

  // Particle Object
  var Particle = function() {
    this.size = density// Math.random() * 10.5;
    this.x = this. y = this.dx = this.dy = 0

    this.vy = Math.random() * 20 + 1.9;
    this.vx = Math.random() * 20 + 1.9;
    this.free = false

    // Color
    this.a = Math.random();
    //this.color = colors[parseInt(Math.random()*colors.length)];
    this.color = ''

    this.draw = function() {
      if (this.isInsideCanvas() && this.free === true) {
        ctx.fillStyle = this.color // "rgba("+this.color+","+this.a+")";
        ctx.fillRect(this.x, this.y,  this.size,  this.size);
      }
    }

    this.isInsideCanvas = function() {
      var xs = (this.x + this.size), ys = (this.y + this.size)
      if (xs < 0 || xs > width || ys < 0 || ys > height) {
        return false
      }
      return true
    }

    this.update = function(dt) {
      this.free = true
      var deltaX = this.dx - this.x
      var deltaY = this.dy - this.y
      var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      //console.log("deltaX " + deltaX + " dx: " + this.vx)
      var ax = this.vx * distance / 70 * (parseInt(dt/1000) + 1)
      if (deltaX > 0 && deltaX > this.vx) {
        this.x = this.x + ax
      } else if (deltaX < 0 && Math.abs(deltaX) > this.vx) {
        this.x = this.x - ax
      } else {
        //console.log("deltaX " + deltaX + " vx: " + this.vx)
        this.x = this.dx
      }

      var ay = this.vy * distance / 70 * (parseInt(dt/1000) + 1)
      if (deltaY > 0 && deltaY > this.vy) {
        this.y = this.y + ay
      } else if (deltaY < 0 && Math.abs(deltaY) > this.vy) {
        this.y = this.y - ay
      } else {
        this.y = this.dy
      }
    }

    this.updateForText = function(dt) {
      var deltaX = this.dx - this.x
      var deltaY = this.dy - this.y
      var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
      if (dt === NaN) return;

      if (this.x > xSeek && this.free === false) return;
      this.free = true
      //console.log(dt)
      //console.log("deltaX " + deltaX + " dx: " + this.vx)
      var ax = this.vx * distance / 2100 * ((dt/1000) + 2)
      if (deltaX > 0 && deltaX > this.vx) {
        this.x = this.x + ax //* distance / 70
      } else if (deltaX < 0 && Math.abs(deltaX) > this.vx) {
        this.x = this.x - ax //* distance / 70
      } else {
        //console.log("deltaX " + deltaX + " vx: " + this.vx)
        this.x = this.dx
      }

      var ay = this.vy * distance / 2100 * ((dt/1000) + 2)
      if (deltaY > 0 && deltaY > this.vy) {
        this.y = this.y + ay //* distance / 70
      } else if (deltaY < 0 && Math.abs(deltaY) > this.vy) {
        this.y = this.y - ay//* distance / 70
      } else {
        this.y = this.dy
      }

      if (this.x < 0 || this.y < 0 || this.x > width || this.y > height) {
        this.x = this.dx
        this.y = this.dy
      }
    }

    this.randomPosition = function() {
      var group = getRandomInt(0, 3) // random top-left-right-button
      var x, y = 0
      switch (group) {
        case 0: { // top
          x = getRandomInt(0, width)
          y = getRandomInt(-height, -this.size)
          break
        }
        case 1: { // left
          x = getRandomInt(-width, -this.size)
          y = getRandomInt(0, height)
          break
        }
        case 2: { // right
          x = getRandomInt(width, width * 2)
          y = getRandomInt(0, height)
          break
        }
        case 3: { // bottom
          x = getRandomInt(0, width)
          y = getRandomInt(height, height * 2)
          break
        }
      }
      return [x, y]
    }

    this.finished = function() {
      return this.dx === this.x && this.dy === this.y
    }
  }

  var initializeParticles = function(options) {

    if (options === undefined || options === null) {
      options = {}
    }

    imageData = ctx.getImageData(0, 0, width, height);
    var particles = []
    imageParticleFinished = false
    data = imageData.data;
    console.log("Data length " + data.length)
    console.log("Data Image height " + imageData.height)
    console.log("Data Image width " + imageData.width)
    for (var d = 0; d < 10; d++) {
      particles = []
      // reduce pixel density to avoid performance decreasing
      particleDensity = density + d //* 2
      var count = 0
      for (var i = 0; i < imageData.height; i += particleDensity) {
        // For perforamence, keep total particles below 3000
        if (particles.length > 3000) {
          console.log("Particle Count " + particles.length + "Particle Density " + particleDensity)
          break
        }

        for (var j = 0; j < imageData.width; j += particleDensity) {
          // For perforamence, keep total particles below 3000
          if (particles.length > 3000) {
            console.log("Particle Count " + particles.length + "Particle Density " + particleDensity)
            break
          }
          var addr = ((imageData.width * i) + j) * 4
          var colorR = data[addr];
          var colorG = data[addr+1];
          var colorB = data[addr+2];
          var colorA = data[addr+3];

          if (colorR === undefined) {
            console.log("i: " + i + " j: " + j + " Addr: " + addr)
          }

          if ((colorR === colorG && colorG === colorB && colorB === 255) || colorA === 0) {
            // do not draw white or invisible (zero alpha) pixel
            continue
          }

          var particle = new Particle()
          var color = "rgba("+ colorR + ',' + colorG +',' + colorB + ',' + colorA + ")"
          //console.log(color)
          particle.color = color
          particle.size = particleDensity
          var pos = particle.randomPosition()

          if (options.explode === true) {
            particle.dx = pos[0]
            particle.dy = pos[1]
            particle.x = j
            particle.y = i
          } else {
            particle.x = pos[0]
            particle.y = pos[1]
            particle.dx = j
            particle.dy = i
          }

          particles.push(particle)
          count++
        }
      }

      //console.log("Particle count " + particles.length + " with density " + particleDensity)
      if (particles.length <= 3000) {
        break
      }
    }
    return particles
  }

  var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  var updateAllParticles = function(particles, isText, dt) {
    // for debug, temp global var, need to fix later
    var notFinished = 0
    for (i = 0; i < particles.length; i++) {
      var particle = particles[i]
      if (isText) {
        particle.updateForText(dt)
      } else {
        particle.update(dt)
      }
      particle.draw()
      if (particle.finished() === false) {
        notFinished++
      }
    }

    if (notFinished === 0) {
      return true
    }

    return false
  }

  var clear = function() {
    ctx.clearRect(0, 0, width, height)
  }

  var loadCanvas = function(canvasId) {
    var canvases = $('#' + canvasId)
    if (canvases.length > 0) {
      var canvas = canvases[0]
      ctx = canvas.getContext('2d')
      width = canvas.width
      height = canvas.height
      console.log("Width: " + width + " Height: " + height)
    }
  }

  textMagic.init = function(options) {
    if (options === null || options === undefined) {
      options = {}
    }

    if (options.canvasId !== undefined) {
      loadCanvas(options.canvasId)
    }

    if (options.finished !== undefined) {
      finishedCallback = options.finished
    }

    if (options.background !== undefined) {
      image = new Image()
      image.src = options.background
      drawImage()
    }

    if (options.text !== undefined) {
      text = options.text
    }
  }

  textMagic.startTransform = function() {
    imageParticleFinished = false
    imageParticles = initializeParticles({explode: false})
    textParticleFinished = false
    startImageAnimation = undefined
    startTextAnimation = undefined

    console.log(imageParticles.length)
    clear()
    textMagic.drawText(text)
    textParticles = initializeParticles({explode: true, text: true})
    //draw()

    window.setTimeout(
    textMagic.update, 500)
   //textMagic.update()
  }

  var drawImage = function() {
    if (imageLoaded === true) {
      ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
    } else {
      //var image = new Image()
      image.src = image.src
        //image.src = "/img/rgb_2048_2.png"
        image.onload = function() {
          imageLoaded = true
          ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height)
        }
    }
  }

  textMagic.drawText = function(text) {
    ctx.fillStyle = "#000000";
    ctx.font = "50px 'Arial', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(text, width/2, height/2);
  }

  textMagic.update = function(timestamp) {
    clear()

    if (!textParticleFinished) {

      if (startTextAnimation === null || startTextAnimation === undefined) {
        startTextAnimation = timestamp
      }

      var dt = timestamp - startTextAnimation
      //dt = 0
      //console.log(dt)
      textMagic.drawText(text)
      if (dt > 0) {
        //console.log(dt)
        xSeek = parseInt(dt) / 10
        ctx.clearRect(0, 0, xSeek, height)
        textParticleFinished = updateAllParticles(textParticles, true, dt)
      }
    }

    if (textParticleFinished && !imageParticleFinished) {

      if (startImageAnimation === null || startImageAnimation === undefined) {
        startImageAnimation = timestamp
      }
      //console.log(startImageAnimation)
      var dt = timestamp - startImageAnimation

      if (dt > 0) {
        //console.log(dt)
        imageParticleFinished = updateAllParticles(imageParticles, false, dt)
      }
    }

    if (textParticleFinished && imageParticleFinished){
      drawImage()
      if (finishedCallback !== undefined && finishedCallback !== null) {
        // call the callback when animation has finished
        finishedCallback()
      }
    } else {
      requestAnimationFrame(textMagic.update)
    }
  }
}.call(this))
