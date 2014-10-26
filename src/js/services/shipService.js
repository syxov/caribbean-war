caribbeanWarApp.service('shipControl', function () {

	var ship = {
		initiated: true,
		speed: 0,
		sailsMode: 0,
		wheelMode: 0,
		maxSpeed: 15,
		weight: 1000,
		position:{
			x: 0,
			y: 0,
			z: 0,
			angle: 0,
			verticalSlope: 0,
			horizontalSlope: 0
		}
	};
	var timer = 0;
	
	var checkFocus = function(){
		return !$("input").is(':focus');
	};

	KeyboardJS.on('up, w', function(){
		if(checkFocus() && ship.sailsMode <= 3){
			ship.sailsMode++;
		}
	});

	KeyboardJS.on('down, s', function(){
		if(checkFocus() && ship.sailsMode > 0){
			ship.sailsMode--;
		}
	});

	KeyboardJS.on('left, d',
		function(){
			if(checkFocus()){
				ship.wheelMode = -1;
			}
		},
		function(){
			if(checkFocus()){
				ship.wheelMode = 0;
			}
		});

	KeyboardJS.on('right, a', 
		function(){
			if(checkFocus()){
				ship.wheelMode = 1;
			}
		},
		function(){
			if(checkFocus()){
				ship.wheelMode = 0;
			}
		});

	var linearExtrapolation = function(start, end, delta){
		return (start + (delta || 0.01)*(end - start));
	};

	return {
		initShip: function(ship){

		},
		moveShip: function(delay){
			if(ship.initiated){
				timer = linearExtrapolation(timer, timer + delay%(2*Math.PI), 0.5);
				ship.speed = linearExtrapolation(ship.speed, ship.sailsMode*ship.maxSpeed*delay/4, 0.01);

				ship.position.x = ship.position.x + Math.cos(ship.position.angle)*ship.speed;
				ship.position.y = ship.position.y + Math.sin(ship.position.angle)*ship.speed;
				ship.position.z = ship.position.z + Math.sin(timer*1.4)/(ship.weight*0.25);
				console.log(timer);

				ship.position.angle = ship.position.angle + (ship.wheelMode*ship.speed*0.25)/(ship.sailsMode+1);
				ship.position.verticalSlope = linearExtrapolation(ship.position.verticalSlope, ship.wheelMode*ship.speed*0.7, 0.02);
				ship.position.horizontalSlope = ship.speed*0.6 + Math.sin(timer*1.4)*0.06;
			}
			return {
				x: ship.position.x,
				y: ship.position.y,
				z: ship.position.z,
				angle: ship.position.angle,
				vSlope: ship.position.verticalSlope,
				hSlope: ship.position.horizontalSlope
			};
		},
		lerp: linearExtrapolation
	};
});