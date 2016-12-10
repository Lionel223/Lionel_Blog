var myEarthElement = document.getElementById('my-earth'),
	updateLocation,
	radius,
	speed,
	radian;

radius = 200;
speed = 1;
radian = 0;

updateLocation = function() {
	radian = radian + speed*0.1;
	myEarthElement.style.left = "calc(50vw - 25px + " + radius*Math.cos(radian) + "px)";
	myEarthElement.style.top = "calc(50vh - 25px - " + radius*Math.sin(radian) + "px)";
	myEarthElement.style.transform = "rotate(" + radian*100 + "deg)";
};

setInterval(updateLocation, 50);