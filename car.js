window.onload = function () {
  // Configuration.

  var startX = 100;
  var startY = 200;

  var topSpeed = 20;
  var acceleration = 0.25;

  var friction = 0.5;
  var brakeFriction = 1;

  let distanceText = getElementById("distanceText");
  let canvasBtn = document.querySelectorAll("#canvasBtn");
  var theCanvas = document.getElementById("theCanvas");
  theCanvas.width = document.body.clientWidth;
  theCanvas.height = document.body.clientHeight;

  var stage = new createjs.Stage(theCanvas);

  const speedType = {
    "равноускоренное движение": 1,
    "мгновенная скорость": 2,
  };

  let Km = new Proxy(
    { value: 0 },
    {
      get: () => {},
      set: (target, p, value) => {
        target[p] = value;
        distanceText.innerText = value;
      },
    }
  );

  let speedBust = new Proxy(
    { value: 1 },
    {
      get: (target, p) => {
        return target[p];
      },
      set: (target, p, value) => {
        target[p] = value;
      },
    }
  );

  let isResizeble = new Proxy(
    { value: false },
    {
      set: (target, p, value) => {
        target[p] = value;
      },
      get: (target, p) => {
        return target[p];
      },
    }
  );

  function toDegrees(angle) {
    return angle * (180 / Math.PI);
  }
  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  function sinDegree(degrees) {
    return Math.round(Math.sin(toRadians(degrees)) * 1000) / 1000;
  }
  function cosDegree(degrees) {
    return Math.round(Math.cos(toRadians(degrees)) * 1000) / 1000;
  }

  var carImage = new Image();
  carImage.src =
    "http://www.clker.com/cliparts/b/E/S/r/1/r/car-top-view-2-md.png";

  canvasBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const backgroundColor = "#bb7b05";
      canvasBtn.forEach((btn) => {
        btn.style.backgroundColor = "";
      });
      speedBust.value = speedType[e.target.innerText];
      e.target.style.backgroundColor = backgroundColor;
    });
  });

  carImage.onload = function () {
    var car = new createjs.Bitmap(carImage);
    var shape = new createjs.Shape();

    car.scaleX = 0.5;
    car.scaleY = 0.5;

    car.x = startX;
    car.y = startY;

    car.regX = car.image.width * 0.5 * car.scaleX;
    car.regY = car.image.height * car.scaleY;

    car.rotation = 90;

    stage.addChild(car);
    stage.addChild(shape);

    stage.update();

    createjs.Ticker.setFPS(30);

    var speed = new Proxy(
      { value: 0 },
      {
        set: (target, p, value) => {
          target[p] = value;
        },
        get: (target, p) => {
          return target[p];
        },
      }
    );
    var oldRotation;

    let timeOutStart = null;
    let timeOutEnd = null;
    let num = 1;

    createjs.Ticker.addEventListener("tick", function () {
      if (booleansProxy.isStart) {
        speed.value = 5;

        timeOutStart = setTimeout(() => {
          isResizeble.value = true;
          clearTimeout(timeOutStart);
        }, 1500);

        timeOutEnd = setTimeout(() => {
          isResizeble.value = false;
          num = 2;
          clearTimeout(timeOutEnd);
        }, 3000);

        if (isResizeble.value && num == 1) {
          speed.value *= speedBust.value;
        }

        distanceText.innerText =
          Math.ceil((car.x - 100) / 30) !== -1
            ? Math.ceil((car.x - 100) / 30)
            : 0;
      }

      if (window.innerWidth - 100 < car.x) {
        car.x = 100;
        booleansProxy.isStart = false;
        booleansProxy.isStop = false;
        booleansProxy.isReset = false;
        buttonStop.click();
        speed.value = 0;
      }
      if (speed.value > 30) {
        speed.value = 10;
      }

      if (booleansProxy.isStop && speed !== 0) {
        speed.value = 0;
      }

      if (booleansProxy.isReset) {
        car.x = 100;
        car.y = 200;
        Km.value = 0;
      }

      if (car.rotation !== oldRotation) {
        oldCos = cosDegree(car.rotation);
        oldSin = sinDegree(car.rotation);
      }

      car.y -= speed.value * oldCos;
      car.x += speed.value * oldSin;

      oldRotation = car.rotation;

      var recX = car.x;
      var recY = car.y;

      if (recX > theCanvas.width) {
        car.x = 0;
      }
      if (recX < 0) {
        car.x = theCanvas.width;
      }

      if (recY > theCanvas.height) {
        car.y = 0;
      }
      if (recY < 0) {
        car.y = theCanvas.height;
      }

      // Little performance improvement.

      stage.update();
    });
  };
};
