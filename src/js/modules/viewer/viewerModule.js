caribbeanWarApp
	.directive('viewer', ['shipControl', '$document', function (shipControl, $document) {
        return { 
            templateUrl: 'js/modules/viewer/viewer-template.html',
            restrict: 'E',
            scope:{},
            link:function(scope, element, attr){
				if (BABYLON.Engine.isSupported()) {

				    var canvas = $('#renderCanvas')[0];
				    var engine = new BABYLON.Engine(canvas, true);
				    var delay = 0;

					BABYLON.SceneLoader.Load('js/modules/viewer/', "login.babylon", engine, function (newScene) {

			            newScene.executeWhenReady(function () {
			            	var deltaTime = +Date.now();

			                var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), newScene);
			                var ground = BABYLON.Mesh.CreateGround("ground", 10000, 10001, 2, newScene);
			                var ship = newScene.meshes[0];

							camera.target = ship.position || BABYLON.Vector3.Zero();
							camera.alpha = -(Math.PI + (ship.rotation.y || 0));
							camera.beta = 1.2;
							camera.attachControl(canvas);

							newScene.activeCamera = camera;	

			                var lockCamera = false;

			                $document.on('mouseup', function(event) {
			                	lockCamera = false;
			                	console.log(ship.position);
					        });

					        element.on('mousedown', function(event) {
					        	lockCamera = true;
					        });

			                var beforeRenderFunction = function () {
					            //MOTOR
					            delay = Math.abs(deltaTime - +Date.now())*0.001;

								var t = shipControl.moveShip(delay);

			                	ship.position.x = t.x;
								ship.position.z = t.y;
								ship.position.y = t.z;

			                	ship.rotation.y = - t.angle;
			                	ship.rotation.x = - t.vSlope;
			                	ship.rotation.z = t.hSlope;

			                    // CAMERA
					            if(!lockCamera){
					            	camera.alpha = shipControl.lerp(camera.alpha, -(Math.PI + ship.rotation.y), 0.1);
					            	camera.beta = shipControl.lerp(camera.beta, 1.2, 0.1);
					            }
					            if (camera.beta < 0.1)
					                camera.beta = 0.1;
					            else if (camera.beta > (Math.PI / 2) * 0.9)
					                camera.beta = (Math.PI / 2) * 0.9;

					            if (camera.radius > 50)
					                camera.radius = 50;

					            if (camera.radius < 5)
					                camera.radius = 5;

					            deltaTime = +Date.now();
					        };

        					newScene.registerBeforeRender(beforeRenderFunction);

			                engine.runRenderLoop(function() {
			                    newScene.render();
			                });
			            });
			        }, function (progress) {
			            // To do: give progress feedback to user
			        });

					window.addEventListener("resize", function () {
						engine.resize();
					});
				}
            }    
        };
    }]);