// Configuration.

var startX = 100;
var startY = 200;

var topSpeed = 20;
var acceleration = 0.25;

var friction = 0.5;
var brakeFriction = 1;

let distanceText = getElementById("distanceText");

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

window.onload = function () {
  var theCanvas = document.getElementById("theCanvas");
  theCanvas.width = document.body.clientWidth;
  theCanvas.height = document.body.clientHeight;

  var stage = new createjs.Stage(theCanvas);

  var carImage = new Image();
  carImage.src =
    "http://www.clker.com/cliparts/b/E/S/r/1/r/car-top-view-2-md.png";

  carImage.onload = function () {
    var car = new createjs.Bitmap(carImage);

    car.scaleX = 0.5;
    car.scaleY = 0.5;

    car.x = startX;
    car.y = startY;

    car.regX = car.image.width * 0.5 * car.scaleX;
    car.regY = car.image.height * car.scaleY;

    car.rotation = 90;

    stage.addChild(car);

    stage.update();

    createjs.Ticker.setFPS(30);

    var speed = 0;
    var oldRotation;

    createjs.Ticker.addEventListener("tick", function () {
      let timeId = null;
      if (isStart) {
        speed += acceleration;
        distanceText.innerText =
          Math.ceil((car.x - 100) / 30) !== -1
            ? Math.ceil((car.x - 100) / 30)
            : 0;
      }

      if (isStop && speed !== 0) {
        speed = 1;
        timeId = setTimeout(() => {
          speed = 0;
        }, 2000);
        clearTimeout(timeId);
      }

      if (isReset) {
        car.x = 100;
        car.y = 200;
      }

      if (car.rotation !== oldRotation) {
        oldCos = cosDegree(car.rotation);
        oldSin = sinDegree(car.rotation);
      }

      car.y -= speed * oldCos;
      car.x += speed * oldSin;

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
      var checkSpeed = speed;

      stage.update();
    });
  };
};
