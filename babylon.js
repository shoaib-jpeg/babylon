var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true, { stencil: true }); // Generate the BABYLON 3D engine

/******* Add the create scene function ******/
var createScene = function () {
  // Create the scene space
  var scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.White();
  // Add a camera to the scene and attach it to the canvas
  let radius = 25;
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    -Math.PI / 2,
    Math.PI / 2,
    radius,
    new BABYLON.Vector3(17, 7, 0),
    scene
  );
  camera.attachControl(canvas, true);
  camera.wheelPrecision = 5;

  camera.upperBetaLimit = Math.PI / 2;
  camera.lowerBetaLimit = Math.PI / 2;
  camera.upperAlphaLimit = -Math.PI / 2;
  camera.lowerAlphaLimit = -Math.PI / 2;

  scene.ambientColor = new BABYLON.Color3(1, 1, 1);

  let axiscontainer = new BABYLON.AssetContainer(scene);

  var showAxis = function (size) {
    var makeTextPlane = function (text, color, size) {
      var dynamicTexture = new BABYLON.DynamicTexture(
        "DynamicTexture",
        50,
        scene,
        true
      );
      dynamicTexture.hasAlpha = true;
      dynamicTexture.drawText(
        text,
        5,
        40,
        "bold 36px Arial",
        color,
        "transparent",
        true
      );
      var plane = BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
      var planeMat = (plane.material = new BABYLON.StandardMaterial(
        "TextPlaneMaterial",
        scene
      ));
      planeMat.backFaceCulling = false;
      planeMat.specularColor = new BABYLON.Color3(0, 0, 0);
      planeMat.diffuseTexture = dynamicTexture;

      return plane;
    };
    var axisX = BABYLON.Mesh.CreateLines(
      "axisX",
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, 0.05 * size, 0),
        new BABYLON.Vector3(size, 0, 0),
        new BABYLON.Vector3(size * 0.95, -0.05 * size, 0),
      ],
      scene
    );
    axisX.color = new BABYLON.Color3(1, 0, 0);
    var xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    var axisY = BABYLON.Mesh.CreateLines(
      "axisY",
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3(-0.05 * size, size * 0.95, 0),
        new BABYLON.Vector3(0, size, 0),
        new BABYLON.Vector3(0.05 * size, size * 0.95, 0),
      ],
      scene
    );
    axisY.color = new BABYLON.Color3(0, 1, 0);
    var yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    var axisZ = BABYLON.Mesh.CreateLines(
      "axisZ",
      [
        BABYLON.Vector3.Zero(),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(0, -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size),
        new BABYLON.Vector3(0, 0.05 * size, size * 0.95),
      ],
      scene
    );
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    var zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);

    axiscontainer.meshes.push(axisX, axisY, axisZ, xChar, yChar, zChar);
    axiscontainer.meshes.forEach(function (thisMesh) {
      thisMesh.isPickable = false;
    });
  };
  showAxis(1);

  let color1 = "#4daae3";
  let color2 = "#c6e2f5";
  let axis = true; //show
  document.getElementById("axis").onclick = function () {
    axisFunc(axis);
  };
  document.getElementById("axis").onmouseover = function () {
    overFunc("axis");
  };
  document.getElementById("axis").onmouseout = function () {
    outFunc("axis");
  };
  function axisFunc(thisAxis) {
    axis = !thisAxis;
    console.log("axis:", axis);
    if (axis) {
      axiscontainer.addAllToScene();
      document.getElementById("axis").style.backgroundColor = color1;
    } else {
      axiscontainer.removeAllFromScene();
      document.getElementById("axis").style.backgroundColor = color2;
    }
  }
  function overFunc(thisId) {
    if (axis) {
      document.getElementById(thisId).style.backgroundColor = color2;
    } else {
      document.getElementById("axis").style.backgroundColor = color2;
    }
  }
  function outFunc(thisId) {
    if (axis) {
      document.getElementById(thisId).style.backgroundColor = color1;
    } else {
      document.getElementById(thisId).style.backgroundColor = color2;
    }
  }

  let zMeshContainer = new BABYLON.AssetContainer(scene);
  let cam = true; //locked
  document.getElementById("reset").onclick = function () {
    console.log("reset");
    camera.setPosition(new BABYLON.Vector3(-Math.PI / 2, Math.PI / 2, radius));
    camera.setTarget(new BABYLON.Vector3(17, 7, 0));
    camera.upperBetaLimit = Math.PI / 2;
    camera.lowerBetaLimit = Math.PI / 2;
    camera.upperAlphaLimit = -Math.PI / 2;
    camera.lowerAlphaLimit = -Math.PI / 2;
    cam = true;
    document.getElementById("camera").style.backgroundColor = color1;
    zMesh.setEnabled(false);
  };
  document.getElementById("camera").onclick = function () {
    cameraFunc(cam);
  };
  document.getElementById("camera").onmouseover = function () {
    overFunc2("camera");
  };
  document.getElementById("camera").onmouseout = function () {
    outFunc2("camera");
  };
  function cameraFunc(thisCam) {
    zMesh.setEnabled(true);
    cam = !thisCam;
    console.log("cam:", cam);
    if (cam) {
      document.getElementById("camera").style.backgroundColor = color1;
      camera.upperBetaLimit = camera.beta;
      camera.lowerBetaLimit = camera.beta;
      camera.upperAlphaLimit = camera.alpha;
      camera.lowerAlphaLimit = camera.alpha;
    } else {
      document.getElementById("camera").style.backgroundColor = color2;
      camera.upperBetaLimit = null;
      camera.lowerBetaLimit = null;
      camera.upperAlphaLimit = null;
      camera.lowerAlphaLimit = null;
    }
  }
  function overFunc2(thisId) {
    if (cam) {
      document.getElementById(thisId).style.backgroundColor = color2;
    } else {
      //
    }
  }
  function outFunc2(thisId) {
    if (cam) {
      document.getElementById(thisId).style.backgroundColor = color1;
    } else {
      document.getElementById(thisId).style.backgroundColor = color2;
    }
  }

  let pointsview = true; //locked
  document.getElementById("points").onclick = function () {
    pointsFunc(pointsview);
  };
  document.getElementById("points").onmouseover = function () {
    overFunc3("points");
  };
  document.getElementById("points").onmouseout = function () {
    outFunc3("points");
  };
  function pointsFunc(thisPointsView) {
    pointsview = !thisPointsView;
    console.log("pview:", pointsview);
    if (pointsview) {
      document.getElementById("points").style.backgroundColor = color1;
      pointsContainer.addAllToScene();
    } else {
      document.getElementById("points").style.backgroundColor = color2;
      pointsContainer.removeAllFromScene();
    }
  }
  function overFunc3(thisId) {
    if (pointsview) {
      document.getElementById(thisId).style.backgroundColor = color2;
    } else {
      //
    }
  }
  function outFunc3(thisId) {
    if (pointsview) {
      document.getElementById(thisId).style.backgroundColor = color1;
    } else {
      document.getElementById(thisId).style.backgroundColor = color2;
    }
  }

  let linesview = true; //locked
  document.getElementById("lines").onclick = function () {
    linesFunc(linesview);
  };
  document.getElementById("lines").onmouseover = function () {
    overFunc3("lines");
  };
  document.getElementById("lines").onmouseout = function () {
    outFunc3("lines");
  };
  function linesFunc(thisLinesView) {
    linesview = !thisLinesView;
    console.log("lview:", linesview);
    if (linesview) {
      document.getElementById("lines").style.backgroundColor = color1;
      linesContainer.addAllToScene();
      drawCircleContainer.addAllToScene();
    } else {
      document.getElementById("lines").style.backgroundColor = color2;
      linesContainer.removeAllFromScene();
      drawCircleContainer.removeAllFromScene();
    }
  }
  function overFunc3(thisId) {
    if (linesview) {
      document.getElementById(thisId).style.backgroundColor = color2;
    } else {
      //
    }
  }
  function outFunc3(thisId) {
    if (linesview) {
      document.getElementById(thisId).style.backgroundColor = color1;
    } else {
      document.getElementById(thisId).style.backgroundColor = color2;
    }
  }

  let size = 1000;
  //camera.setTarget(BABYLON.Vector3.Zero());
  let black = new BABYLON.StandardMaterial("black", scene);
  black.specularColor = new BABYLON.Color3(0, 0, 0);
  black.diffuseColor = new BABYLON.Color3(0, 0, 0);
  let white = new BABYLON.StandardMaterial("white", scene);
  white.alpha = 0;
  let green = new BABYLON.StandardMaterial("green", scene);
  green.ambientColor = BABYLON.Color3.Green();
  let gray = new BABYLON.StandardMaterial("gray", scene);
  gray.ambientColor = BABYLON.Color3.Gray();
  let lightgray = new BABYLON.StandardMaterial("lightgray", scene);
  lightgray.ambientColor = new BABYLON.Color3(242 / 255, 242 / 255, 242 / 255);

  let zMesh = BABYLON.Mesh.CreateLines(
    "Z",
    [new BABYLON.Vector3(0, 0, -size), new BABYLON.Vector3(0, 0, size)],
    scene
  );
  zMesh.color = new BABYLON.Color3(0, 92 / 255, 230 / 255);
  zMeshContainer.meshes.push(zMesh);
  zMesh.setEnabled(false);
  //OriginLines
  let originlinesContainer = new BABYLON.AssetContainer(scene);
  let pointsContainer = new BABYLON.AssetContainer(scene);
  let xMesh = BABYLON.Mesh.CreateLines(
    "X",
    [new BABYLON.Vector3(-size, 0, 0), new BABYLON.Vector3(size, 0, 0)],
    scene
  );
  xMesh.color = new BABYLON.Color3(0, 92 / 255, 230 / 255);
  let yMesh = BABYLON.Mesh.CreateLines(
    "Y",
    [new BABYLON.Vector3(0, -size, 0), new BABYLON.Vector3(0, size, 0)],
    scene
  );
  yMesh.color = new BABYLON.Color3(0, 92 / 255, 230 / 255);
  originlinesContainer.meshes.push(xMesh, yMesh);
  var originPoint = BABYLON.Mesh.CreateSphere("originPoint", 32, 0.3, scene);
  pointsContainer.meshes.push(originPoint);
  originPoint.material = black;
  let text =
    '{ "identity" : {"name":"' +
    originPoint.name +
    '", "id":"' +
    originPoint.id +
    '","username":null,"type":"point"},' +
    '"position":{"x":' +
    originPoint.position.x +
    ',"y":' +
    originPoint.position.y +
    ',"z":' +
    originPoint.position.z +
    '},"properties":{"color":"' +
    originPoint.material.name +
    '","radius":0.3,"angle":null},' +
    '"based_on":[{"name":"' +
    xMesh.name +
    '", "id":"' +
    xMesh.id +
    '","username":null,"type":"x-line"},{"name":"' +
    yMesh.name +
    '", "id":"' +
    yMesh.id +
    '","username":null,"type":"y-line"}]}';
  let obj = JSON.parse(text);
  originPoint.metadata = obj;

  originPoint.actionManager = new BABYLON.ActionManager(scene);
  originPoint.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      function () {
        originPoint.material = green;
      }
    )
  );
  originPoint.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      function () {
        originPoint.material = black;
      }
    )
  );

  let gridlinesContainer = new BABYLON.AssetContainer(scene);
  for (let i = 1; i <= size; i++) {
    let xpos = BABYLON.Mesh.CreateLines(
      "Xg",
      [new BABYLON.Vector3(-size, i, 0), new BABYLON.Vector3(size, i, 0)],
      scene
    );
    xpos.color = new BABYLON.Color3(224 / 255, 224 / 255, 209 / 255);
    xpos.isPickable = false;
    let ypos = BABYLON.Mesh.CreateLines(
      "Yg",
      [new BABYLON.Vector3(i, -size, 0), new BABYLON.Vector3(i, size, 0)],
      scene
    );
    ypos.color = new BABYLON.Color3(224 / 255, 224 / 255, 209 / 255);
    ypos.isPickable = false;
    let xneg = BABYLON.Mesh.CreateLines(
      "-Xg",
      [new BABYLON.Vector3(-size, -i, 0), new BABYLON.Vector3(size, -i, 0)],
      scene
    );
    xneg.color = new BABYLON.Color3(224 / 255, 224 / 255, 209 / 255);
    xneg.isPickable = false;
    let yneg = BABYLON.Mesh.CreateLines(
      "-Yg",
      [new BABYLON.Vector3(-i, -size, 0), new BABYLON.Vector3(-i, size, 0)],
      scene
    );
    yneg.color = new BABYLON.Color3(224 / 255, 224 / 255, 209 / 255);
    yneg.isPickable = false;
    gridlinesContainer.meshes.push(xpos, ypos, xneg, yneg);
  }
  gridlinesContainer.removeAllFromScene();
  let pointsCounter = 0;
  let angMeshCounter = 0;
  let angMeshCloneCounter = 0;
  let PerpMeshCounter = 0;
  let PerpMeshCloneCounter = 0;
  let CircleCounter = 0;
  let xMeshCounter = 0;
  let yMeshCounter = 0;
  let xMeshCloneCounter = 0;
  let yMeshCloneCounter = 0;
  let pointsMap = new Map(); //.has('')/.set('',val)/.delete('') //.size/.clear()
  let angMap = new Map(); //.has('')/.set('',val)/.delete('') //.size/.clear()
  let angCloneMap = new Map(); //.has('')/.set('',val)/.delete('') //.size/.clear()
  let linesContainer = new BABYLON.AssetContainer(scene);
  let drawCircleContainer = new BABYLON.AssetContainer(scene);
  let parentContainer = new BABYLON.AssetContainer(scene);
  let drawnLineContainer = new BABYLON.AssetContainer(scene);
  let pointx = 0;
  let pointy = 0;
  let prevx = 0;
  let prevy = 0;
  let offset = false;
  let lineLength = size * 4;
  let angleTemp = 0;
  let globalrad = 0;
  let tubecount = 0;
  let Mode = function (thisView, thisConstruct) {
    console.log("conMode", conMode);
    if (conMode === 1) {
      let tempContainer = new BABYLON.AssetContainer(scene);
      tempContainer.dispose();
      let drag = false;
      let dashLength = 0.2;
      let dashGap = 0.03;
      //let lineLength = size*4;
      console.log("Mode:", thisView, ",", thisConstruct);
      let coordinates = document.getElementById("coordinates");
      let angleView = document.getElementById("angle");
      let radiusView = document.getElementById("radius");
      if (thisView === "Top" && thisConstruct === "Offset") {
        document.getElementById("dialog").innerHTML =
          "Select a Line/Angled Line/Circle";
        offset = true;
        linesContainer.meshes
          .concat(zMeshContainer.meshes)
          .forEach(function (thisMesh) {
            thisMesh.isPickable = true;
          });
        originlinesContainer.meshes
          .concat(zMeshContainer.meshes)
          .forEach(function (thisMesh) {
            thisMesh.isPickable = true;
            thisMesh.actionManager = new BABYLON.ActionManager(scene);
            thisMesh.actionManager.registerAction(
              new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function () {
                  thisMesh.color = new BABYLON.Color3(
                    144 / 255,
                    217 / 255,
                    222 / 255
                  );
                }
              )
            );
            thisMesh.actionManager.registerAction(
              new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                function () {
                  thisMesh.color = new BABYLON.Color3(0, 92 / 255, 230 / 255);
                }
              )
            );
          });
      }
      if (thisView === "Top" && thisConstruct === "Angled") {
        document.getElementById("dialog").innerHTML = "Select a Point";
        offset = false;
        linesContainer.meshes
          .concat(originlinesContainer.meshes)
          .forEach(function (thisMesh) {
            thisMesh.isPickable = false;
          });
      }
      if (thisView === "Top" && thisConstruct === "Perpendicular") {
        document.getElementById("dialog").innerHTML = "Select an Line";
        offset = false;
        linesContainer.meshes
          .concat(originlinesContainer.meshes)
          .forEach(function (thisMesh) {
            thisMesh.isPickable = true;
          });
      }
      if (thisView === "Top" && thisConstruct === "Circle") {
        document.getElementById("dialog").innerHTML = "Select a Point";
        offset = false;
        linesContainer.meshes
          .concat(originlinesContainer.meshes)
          .forEach(function (thisMesh) {
            thisMesh.isPickable = false;
          });
        pointsContainer.meshes
          .concat([originPoint])
          .forEach(function (thisPoint) {
            thisPoint.isPickable = true;
          });
      }

      let pointAngMesh = null;
      scene.onPointerDown = function (evt, pickInfo) {
        //conmode===1
        if (conMode === 1 && thisView === "Top" && thisConstruct === "Offset") {
          offset = true;
          if (pickInfo.hit) {
            thisMesh = pickInfo.pickedMesh;
            console.log(thisMesh.name, thisConstruct);
            if (thisMesh.name.includes("X") || thisMesh.name.includes("Y")) {
              drag = !drag;
              console.log("drag", drag);

              if (drag && thisMesh.name === "X") {
                document.getElementById("dialog").innerHTML =
                  "Drop this line anywhere";
                let xDash = BABYLON.Mesh.CreateDashedLines(
                  "XDash",
                  [
                    new BABYLON.Vector3(-size, 0, 0),
                    new BABYLON.Vector3(size, 0, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                xDash.color = BABYLON.Color3.Red();
                tempContainer.meshes.push(xDash);
              } else if (drag && thisMesh.name === "Y") {
                document.getElementById("dialog").innerHTML =
                  "Drop this line anywhere";
                let yDash = BABYLON.Mesh.CreateDashedLines(
                  "YDash",
                  [
                    new BABYLON.Vector3(0, -size, 0),
                    new BABYLON.Vector3(0, size, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                yDash.color = BABYLON.Color3.Red();
                tempContainer.meshes.push(yDash);
              } else if (drag && thisMesh.name.includes("XDash")) {
                document.getElementById("dialog").innerHTML =
                  "Drop this line anywhere";
                let xDashC = BABYLON.Mesh.CreateDashedLines(
                  "XDashC",
                  [
                    new BABYLON.Vector3(-size, 0, 0),
                    new BABYLON.Vector3(size, 0, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                xDashC.color = BABYLON.Color3.Red();
                parentContainer.meshes.push(thisMesh);
                tempContainer.meshes.push(xDashC);
              } else if (drag && thisMesh.name.includes("YDash")) {
                document.getElementById("dialog").innerHTML =
                  "Drop this line anywhere";
                let yDashC = BABYLON.Mesh.CreateDashedLines(
                  "YDashC",
                  [
                    new BABYLON.Vector3(0, -size, 0),
                    new BABYLON.Vector3(0, size, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                yDashC.color = BABYLON.Color3.Red();
                parentContainer.meshes.push(thisMesh);
                tempContainer.meshes.push(yDashC);
              }
            } else if (
              thisMesh.name.includes("angDash") ||
              thisMesh.name.includes("angMeshC")
            ) {
              drag = !drag;
              console.log("drag", drag);
              if (drag) {
                //let checkMid =angMap.get(thisMesh.name);
                //console.log("x",checkMid[0],"y",checkMid[1]);
                document.getElementById("dialog").innerHTML =
                  "Drop this line anywhere";
                angMeshCloneCounter++;
                let angle = angMap.get(thisMesh.name);
                console.log("angMap", angle);
                //let angle = BABYLON.Angle.BetweenTwoPoints(new BABYLON.Vector2(thisMesh.position.x, thisMesh.position.y),new BABYLON.Vector2(anglePoint[0],anglePoint[1]));
                console.log("angle", angle.degrees());
                let angDashC = BABYLON.Mesh.CreateDashedLines(
                  "angMeshC",
                  [
                    new BABYLON.Vector3(-size, 0, 0),
                    new BABYLON.Vector3(size, 0, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                angDashC.position.x = thisMesh.position.x;
                angDashC.position.y = thisMesh.position.y;
                angDashC.rotateAround(
                  new BABYLON.Vector3(
                    thisMesh.position.x,
                    thisMesh.position.y,
                    0
                  ),
                  BABYLON.Axis.Z,
                  angle.radians()
                );
                //thisMesh.clone("angMeshC",null);
                angDashC.name = "angMeshC" + angMeshCloneCounter;
                angDashC.position.x = pickInfo.pickedPoint.x;
                angDashC.position.y = pickInfo.pickedPoint.y;
                angMap.set(angDashC.name, angle);
                angDashC.color = BABYLON.Color3.Red();

                angCloneMap.set(angDashC.name, thisMesh.name);
                parentContainer.meshes.push(thisMesh);
                tempContainer.meshes.push(angDashC);
                prevx = pickInfo.pickedPoint.x;
                prevy = pickInfo.pickedPoint.y;
              }
            } else if (thisMesh.name.includes("perpDash")) {
              drag = !drag;
              console.log("drag", drag);
              if (drag) {
                document.getElementById("dialog").innerHTML =
                  "Drop this line anywhere";
                let perpDashC = BABYLON.Mesh.CreateDashedLines(
                  "perpDashC",
                  [
                    new BABYLON.Vector3(-size, 0, 0),
                    new BABYLON.Vector3(size, 0, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                perpDashC.position.x = thisMesh.position.x;
                perpDashC.position.y = thisMesh.position.y;

                let text =
                  '{ "identity" : {"name":"' +
                  perpDashC.name +
                  '", "id":"' +
                  perpDashC.id +
                  '","username":null,"type":"perpendicular"},' +
                  '"position":{"x":' +
                  perpDashC.position.x +
                  ',"y":' +
                  perpDashC.position.y +
                  ',"z":' +
                  perpDashC.position.z +
                  '},"properties":{"color":"red"},' +
                  '"based_on":{"name":"' +
                  thisMesh.metadata.based_on.name +
                  '", "id":"' +
                  thisMesh.metadata.based_on.id +
                  '","username":null,"type":"perpendicular-line"}}';
                let obj = JSON.parse(text);
                perpDashC.metadata = obj;

                let parentAngle = angMap.get(thisMesh.metadata.based_on.name);
                let tempDeg = parentAngle.degrees() + 90;
                let angle = BABYLON.Angle.FromDegrees(tempDeg);
                perpDashC.rotateAround(
                  new BABYLON.Vector3(
                    thisMesh.position.x,
                    thisMesh.position.y,
                    0
                  ),
                  BABYLON.Axis.Z,
                  angle.radians()
                );
                perpDashC.position.x = pickInfo.pickedPoint.x;
                perpDashC.position.y = pickInfo.pickedPoint.y;
                perpDashC.id = "perpDashC";
                perpDashC.color = BABYLON.Color3.Red();
                parentContainer.meshes.push(thisMesh);
                tempContainer.meshes.push(perpDashC);
                prevx = pickInfo.pickedPoint.x;
                prevy = pickInfo.pickedPoint.y;
                angleTemp = angle;
              }
            } else if (thisMesh.name.includes("Circle")) {
              drag = !drag;
              console.log("drag", drag);
              if (drag) {
                let data = thisMesh.metadata;
                let name = data.based_on[0].name;
                console.log("basedon", name);
                pointsContainer.meshes.forEach(function (obj) {
                  if (obj.name === name) {
                    let newData = obj.metadata;

                    parentContainer.meshes.push(obj);
                    pointx = newData.position.x;
                    pointy = newData.position.y;
                  }
                });
                document.getElementById("dialog").innerHTML =
                  "Drop this circle anywhere";
                //let mid = pointsMap.get(thisMesh.name);
                //pointx = mid[0];
                // pointy = mid[1];
                let dummy = thisMesh.clone("CircleC", null);
                tempContainer.meshes.push(dummy);
              }
            } else {
              drag = false;
            }
          }
        }
        if (conMode === 1 && thisView === "Top" && thisConstruct === "Angled") {
          if (pickInfo.hit) {
            thisMesh = pickInfo.pickedMesh;
            console.log(thisMesh.name, thisConstruct);
            if (thisMesh.name.includes("Point")) {
              pointAngMesh = thisMesh.name;
              document.getElementById("dialog").innerHTML = "Select anywhere";
              drag = !drag;
              console.log("drag", drag);
              if (drag) {
                pointx = thisMesh.getAbsolutePosition().x;
                pointy = thisMesh.getAbsolutePosition().y;
                //console.log("midpoint",thisMesh.getAbsolutePosition());
                let angDash = BABYLON.Mesh.CreateDashedLines(
                  "angDash",
                  [
                    new BABYLON.Vector3(-size, 0, 0),
                    new BABYLON.Vector3(size, 0, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                angDash.color = BABYLON.Color3.White();
                tempContainer.meshes.push(angDash);
              }
            } else {
              drag = false;
            }
          }
        }
        if (
          conMode === 1 &&
          thisView === "Top" &&
          thisConstruct === "Perpendicular"
        ) {
          originlinesContainer.meshes.forEach(function (o) {
            o.isPickable = true;
          });
          offset = false;
          if (pickInfo.hit) {
            thisMesh = pickInfo.pickedMesh;
            console.log(thisMesh.name, thisConstruct);
            if (
              thisMesh.name.includes("ang") ||
              thisMesh.name.includes("perp") ||
              thisMesh.name.includes("X") ||
              thisMesh.name.includes("Y")
            ) {
              drag = !drag;
              console.log(drag);
              if (drag) {
                document.getElementById("dialog").innerHTML = "Select a Point";
                prevx = pickInfo.pickedPoint.x;
                prevy = pickInfo.pickedPoint.y;
                let angle = 0;
                if (thisMesh.name.includes("X")) {
                  angle = BABYLON.Angle.FromDegrees(0);
                  parentContainer.meshes.push(thisMesh);
                  angMap.set(thisMesh.name, angle);
                } else if (thisMesh.name.includes("Y")) {
                  angle = BABYLON.Angle.FromDegrees(90);
                  angMap.set(thisMesh.name, angle);
                  parentContainer.meshes.push(thisMesh);
                } else {
                  angle = angMap.get(thisMesh.name);
                  parentContainer.meshes.push(thisMesh);
                }
                console.log(angle.degrees());
                let perpDash = BABYLON.Mesh.CreateDashedLines(
                  "perpDash",
                  [
                    new BABYLON.Vector3(-size, 0, 0),
                    new BABYLON.Vector3(size, 0, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                perpDash.rotateAround(
                  new BABYLON.Vector3(prevx, prevy, 0),
                  BABYLON.Axis.Z,
                  angle.radians()
                );
                let tempDeg = angle.degrees() + 90;
                console.log(tempDeg);
                angleTemp = BABYLON.Angle.FromDegrees(tempDeg);
                perpDash.rotateAround(
                  pickInfo.pickedPoint,
                  BABYLON.Axis.Z,
                  Math.PI / 2
                );
                //console.log("vertices",perpDash.getVerticesData(BABYLON.VertexBuffer.PositionKind));
                perpDash.color = BABYLON.Color3.White();

                tempContainer.meshes.push(perpDash);
              }
            } else {
              drag = false;
            }
          }
        }
        if (conMode === 1 && thisView === "Top" && thisConstruct === "Circle") {
          if (pickInfo.hit) {
            thisMesh = pickInfo.pickedMesh;
            console.log(thisMesh.name, thisConstruct);
            if (thisMesh.name.includes("Point")) {
              drag = !drag;
              console.log("drag", drag);
              if (drag) {
                parentContainer.meshes.push(thisMesh);
                document.getElementById("dialog").innerHTML = "Select anywhere";
                pointx = thisMesh.getAbsolutePosition().x;
                pointy = thisMesh.getAbsolutePosition().y;
                let drawCircle = BABYLON.Mesh.CreateDashedLines(
                  "Circle",
                  [BABYLON.Vector3.Zero(), BABYLON.Vector3.Zero()],
                  dashLength - 0.1,
                  dashGap - 0.015,
                  2,
                  scene
                );
                tempContainer.meshes.push(drawCircle);
              }
            } else {
              drag = false;
            }
          }
        }
        if (
          conMode === 1 &&
          tempContainer.meshes.length > 0 &&
          drag === false
        ) {
          //conmode===1
          console.log("prepop", tempContainer.meshes.length);
          let tempMesh = tempContainer.meshes.pop();
          if (tempMesh != undefined) {
            // console.log(tempMesh.name,tempContainer.meshes.length);
            if (tempMesh.name === "XDash") {
              xMeshCounter++;
              tempMesh.name = "XDash" + xMeshCounter;
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersect = ray.intersectsMeshes(meshcounts);
              intersect.forEach(function (thisPoint) {
                pointsCounter++;
                let point = BABYLON.Mesh.CreateSphere(
                  "intersectPoint" + pointsCounter,
                  32,
                  0.3,
                  scene
                );
                point.material = black;
                point.position = thisPoint.pickedPoint;
                console.log("x axis line point of intersection: ", point.position);
                point.actionManager = new BABYLON.ActionManager(scene);
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      point.material = green;
                    }
                  )
                );
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      point.material = black;
                    }
                  )
                );
                //point.setParent(tempMesh);
                let text =
                  '{ "identity" : {"name":"' +
                  point.name +
                  '", "id":"' +
                  point.id +
                  '","username":null,"type":"point"},' +
                  '"position":{"x":' +
                  point.position.x +
                  ',"y":' +
                  point.position.y +
                  ',"z":' +
                  point.position.z +
                  '},"properties":{"color":"' +
                  point.material.name +
                  '","radius":0.3,"angle":null},' +
                  '"based_on":[{"name":"' +
                  tempMesh.name +
                  '", "id":"' +
                  tempMesh.id +
                  '","username":null,"type":"y-line"},{"name":"' +
                  thisPoint.pickedMesh.name +
                  '", "id":"' +
                  thisPoint.pickedMesh.id +
                  '","username":null,"type":"x-line"}]}';
                let obj = JSON.parse(text);
                point.metadata = obj;
                pointsContainer.meshes.push(point);
              });
              showRay.dispose();
              /*let ray2 = BABYLON.Ray.Zero();
                            let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                            showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(-1,0,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                            let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                            intersect2.forEach(function(thisPoint){
                                    pointsCounter++;
                                    let point = BABYLON.Mesh.CreateSphere("intersect2Point"+pointsCounter,32,0.3,scene);
                                    point.material=black;
                                    point.position=thisPoint.pickedPoint;

                                    point.actionManager = new BABYLON.ActionManager(scene);
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                        point.material= green;
                                    }));
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                        point.material= black;
                                    }));
                                    pointsContainer.meshes.push(point);
                            });
                            showRay2.dispose();*/
              let ray2 = BABYLON.Ray.Zero();
              let showRay2 = BABYLON.RayHelper.CreateAndShow(
                ray2,
                scene,
                BABYLON.Color3.Green()
              );
              showRay2.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(-1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.maximum,
                size * 2
              );

              let numCircles = drawCircleContainer.meshes.length;
              console.log("circles#", numCircles);
              if (numCircles > 0) {
                drawCircleContainer.meshes.forEach(function (newTempMesh) {
                  let count = 0;
                  let thisVertices = newTempMesh.getVerticesData(
                    BABYLON.VertexBuffer.PositionKind
                  );
                  //console.log("Vertices",thisVertices);
                  console.log("Length", thisVertices.length);
                  let xcoor = [];
                  let ycoor = [];
                  for (let i = 0; i < thisVertices.length; i += 3) {
                    //console.log("x",thisVertices[i]);
                    xcoor.push(thisVertices[i]);
                  }
                  for (let i = 1; i < thisVertices.length; i += 3) {
                    //console.log("y",thisVertices[i]);
                    ycoor.push(thisVertices[i]);
                    count++;
                  }
                  console.log(
                    "total",
                    count,
                    "xcoor",
                    xcoor.length,
                    "ycoor",
                    ycoor.length
                  );
                  for (let i = 0; i < xcoor.length - 1; i += 1) {
                    let intersect2 = ray2.intersectionSegment(
                      new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                      new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                      0.007
                    );
                    //console.log("v1",xcoor[i],ycoor[i],"v2",xcoor[i+1],ycoor[i+1],"Int @",intersect2);
                    if (intersect2 > 0) {
                      let thisTemp = BABYLON.Mesh.CreateLines(
                        newTempMesh.name,
                        [
                          new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                          new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        ]
                      );
                      thisTemp.color = BABYLON.Color3.Blue();
                      let thisIntersect = ray2.intersectsMesh(thisTemp);
                      let thisIntPoint = thisIntersect.pickedPoint;
                      pointsCounter++;
                      let point = BABYLON.Mesh.CreateSphere(
                        "intersect2Point" + pointsCounter,
                        32,
                        0.3,
                        scene
                      );
                      point.material = black;
                      point.position = thisIntPoint;

                      point.actionManager = new BABYLON.ActionManager(scene);
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOverTrigger,
                          function () {
                            point.material = green;
                          }
                        )
                      );
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOutTrigger,
                          function () {
                            point.material = black;
                          }
                        )
                      );
                      //point.setParent(tempMesh);
                      let text =
                        '{ "identity" : {"name":"' +
                        point.name +
                        '", "id":"' +
                        point.id +
                        '","username":null,"type":"point"},' +
                        '"position":{"x":' +
                        point.position.x +
                        ',"y":' +
                        point.position.y +
                        ',"z":' +
                        point.position.z +
                        '},"properties":{"color":"' +
                        point.material.name +
                        '","radius":0.3,"angle":null},' +
                        '"based_on":[{"name":"' +
                        tempMesh.name +
                        '", "id":"' +
                        tempMesh.id +
                        '","username":null,"type":"y-line"},{"name":"' +
                        newTempMesh.name +
                        '", "id":"' +
                        newTempMesh.id +
                        '","username":null,"type":"x-line"}]}';
                      let obj = JSON.parse(text);
                      point.metadata = obj;
                      pointsContainer.meshes.push(point);
                      thisTemp.dispose();
                    }
                  }
                });
              }
              showRay2.dispose();
              tempMesh.actionManager = new BABYLON.ActionManager(scene);
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOverTrigger,
                  function () {
                    tempMesh.color = new BABYLON.Color3(
                      144 / 255,
                      217 / 255,
                      222 / 255
                    );
                  }
                )
              );
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOutTrigger,
                  function () {
                    tempMesh.color = BABYLON.Color3.Red();
                    //console.log("Clones",getClones);
                  }
                )
              );

              linesContainer.meshes.push(tempMesh);
              document.getElementById("dialog").innerHTML =
                "Select a Line/Angled Line/Circle";
            } else if (tempMesh.name === "YDash") {
              yMeshCounter++;
              tempMesh.name = "YDash" + yMeshCounter;
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(0, 1, 0),
                tempMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersect = ray.intersectsMeshes(meshcounts);
              intersect.forEach(function (thisPoint) {
                pointsCounter++;
                let point = BABYLON.Mesh.CreateSphere(
                  "intersectPoint" + pointsCounter,
                  32,
                  0.3,
                  scene
                );
                point.material = black;
                point.position = thisPoint.pickedPoint;
                console.log("y axis line point of intersection: ", point.position)
                point.actionManager = new BABYLON.ActionManager(scene);
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      point.material = green;
                    }
                  )
                );
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      point.material = black;
                    }
                  )
                );
                //point.setParent(tempMesh);
                let text =
                  '{ "identity" : {"name":"' +
                  point.name +
                  '", "id":"' +
                  point.id +
                  '","username":null,"type":"point"},' +
                  '"position":{"x":' +
                  point.position.x +
                  ',"y":' +
                  point.position.y +
                  ',"z":' +
                  point.position.z +
                  '},"properties":{"color":"' +
                  point.material.name +
                  '","radius":0.3,"angle":null},' +
                  '"based_on":[{"name":"' +
                  tempMesh.name +
                  '", "id":"' +
                  tempMesh.id +
                  '","username":null,"type":"y-line"},{"name":"' +
                  thisPoint.pickedMesh.name +
                  '", "id":"' +
                  thisPoint.pickedMesh.id +
                  '","username":null,"type":"x-line"}]}';
                let obj = JSON.parse(text);
                point.metadata = obj;
                pointsContainer.meshes.push(point);
              });
              showRay.dispose();
              /*let ray2 = BABYLON.Ray.Zero();
                            let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                            showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(0,-1,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                            let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                            intersect2.forEach(function(thisPoint){
                                    pointsCounter++;
                                    let point = BABYLON.Mesh.CreateSphere("intersect2Point"+pointsCounter,32,0.3,scene);
                                    point.material=black;
                                    point.position=thisPoint.pickedPoint;

                                    point.actionManager = new BABYLON.ActionManager(scene);
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                        point.material= green;
                                    }));
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                        point.material= black;
                                    }));
                                    pointsContainer.meshes.push(point);
                            });
                            showRay2.dispose();*/
              let ray2 = BABYLON.Ray.Zero();
              let showRay2 = BABYLON.RayHelper.CreateAndShow(
                ray2,
                scene,
                BABYLON.Color3.Green()
              );
              showRay2.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(0, -1, 0),
                tempMesh.getBoundingInfo().boundingBox.maximum,
                size * 2
              );

              let numCircles = drawCircleContainer.meshes.length;
              console.log("circles#", numCircles);
              if (numCircles > 0) {
                drawCircleContainer.meshes.forEach(function (newTempMesh) {
                  let count = 0;
                  let thisVertices = newTempMesh.getVerticesData(
                    BABYLON.VertexBuffer.PositionKind
                  );
                  //console.log("Vertices",thisVertices);
                  console.log("Length", thisVertices.length);
                  let xcoor = [];
                  let ycoor = [];
                  for (let i = 0; i < thisVertices.length; i += 3) {
                    //console.log("x",thisVertices[i]);
                    xcoor.push(thisVertices[i]);
                  }
                  for (let i = 1; i < thisVertices.length; i += 3) {
                    //console.log("y",thisVertices[i]);
                    ycoor.push(thisVertices[i]);
                    count++;
                  }
                  //console.log("total",count,"xcoor",xcoor.length,"ycoor",ycoor.length);
                  for (let i = 0; i < xcoor.length - 1; i += 1) {
                    let intersect2 = ray2.intersectionSegment(
                      new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                      new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                      0.007
                    );
                    //console.log("v1",xcoor[i],ycoor[i],"v2",xcoor[i+1],ycoor[i+1],"Int @",intersect2);
                    if (intersect2 > 0) {
                      let thisTemp = BABYLON.Mesh.CreateLines(
                        newTempMesh.name,
                        [
                          new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                          new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        ]
                      );
                      thisTemp.color = BABYLON.Color3.Blue();
                      let thisIntersect = ray2.intersectsMesh(thisTemp);
                      let thisIntPoint = thisIntersect.pickedPoint;
                      pointsCounter++;
                      let point = BABYLON.Mesh.CreateSphere(
                        "intersect2Point" + pointsCounter,
                        32,
                        0.3,
                        scene
                      );
                      point.material = black;
                      point.position = thisIntPoint;

                      point.actionManager = new BABYLON.ActionManager(scene);
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOverTrigger,
                          function () {
                            point.material = green;
                          }
                        )
                      );
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOutTrigger,
                          function () {
                            point.material = black;
                          }
                        )
                      );
                      //point.setParent(tempMesh);
                      let text =
                        '{ "identity" : {"name":"' +
                        point.name +
                        '", "id":"' +
                        point.id +
                        '","username":null,"type":"point"},' +
                        '"position":{"x":' +
                        point.position.x +
                        ',"y":' +
                        point.position.y +
                        ',"z":' +
                        point.position.z +
                        '},"properties":{"color":"' +
                        point.material.name +
                        '","radius":0.3,"angle":null},' +
                        '"based_on":[{"name":"' +
                        tempMesh.name +
                        '", "id":"' +
                        tempMesh.id +
                        '","username":null,"type":"y-line"},{"name":"' +
                        newTempMesh.name +
                        '", "id":"' +
                        newTempMesh.id +
                        '","username":null,"type":"x-line"}]}';
                      let obj = JSON.parse(text);
                      point.metadata = obj;
                      pointsContainer.meshes.push(point);
                      thisTemp.dispose();
                    }
                  }
                });
              }
              showRay2.dispose();

              tempMesh.actionManager = new BABYLON.ActionManager(scene);
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOverTrigger,
                  function () {
                    tempMesh.color = new BABYLON.Color3(
                      144 / 255,
                      217 / 255,
                      222 / 255
                    );
                    //yMesh.color = new BABYLON.Color3(144/255, 217/255, 222/255);
                  }
                )
              );
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOutTrigger,
                  function () {
                    tempMesh.color = BABYLON.Color3.Red();
                    //yMesh.color= new BABYLON.Color3(0, 92/255, 230/255);
                  }
                )
              );
              linesContainer.meshes.push(tempMesh);
              document.getElementById("dialog").innerHTML =
                "Select a Line/Angled Line/Circle";
            } else if (tempMesh.name.includes("XDashC")) {
              xMeshCloneCounter++;
              tempMesh.name = "XDashC" + xMeshCloneCounter;
              let theParent = parentContainer.meshes.pop();
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersect = ray.intersectsMeshes(meshcounts);
              intersect.forEach(function (thisPoint) {
                pointsCounter++;
                let point = BABYLON.Mesh.CreateSphere(
                  "intersectPoint" + pointsCounter,
                  32,
                  0.3,
                  scene
                );
                point.material = black;
                point.position = thisPoint.pickedPoint;
                console.log("horizontal line point of intersection: ", point.position)
                point.actionManager = new BABYLON.ActionManager(scene);
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      point.material = green;
                    }
                  )
                );
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      point.material = black;
                    }
                  )
                );
                //point.setParent(tempMesh);
                let text =
                  '{ "identity" : {"name":"' +
                  point.name +
                  '", "id":"' +
                  point.id +
                  '","username":null,"type":"point"},' +
                  '"position":{"x":' +
                  point.position.x +
                  ',"y":' +
                  point.position.y +
                  ',"z":' +
                  point.position.z +
                  '},"properties":{"color":"' +
                  point.material.name +
                  '","radius":0.3,"angle":null},' +
                  '"based_on":[{"name":"' +
                  tempMesh.name +
                  '", "id":"' +
                  tempMesh.id +
                  '","username":null,"type":"y-line"},{"name":"' +
                  thisPoint.pickedMesh.name +
                  '", "id":"' +
                  thisPoint.pickedMesh.id +
                  '","username":null,"type":"x-line"}]}';
                let obj = JSON.parse(text);
                point.metadata = obj;
                pointsContainer.meshes.push(point);
              });
              showRay.dispose();
              /*let ray2 = BABYLON.Ray.Zero();
                            let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                            showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(-1,0,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                            let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                            intersect2.forEach(function(thisPoint){
                                    pointsCounter++;
                                    let point = BABYLON.Mesh.CreateSphere("intersect2Point"+pointsCounter,32,0.3,scene);
                                    point.material=black;
                                    point.position=thisPoint.pickedPoint;

                                    point.actionManager = new BABYLON.ActionManager(scene);
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                        point.material= green;
                                    }));
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                        point.material= black;
                                    }));
                                    pointsContainer.meshes.push(point);
                            });
                            showRay2.dispose();*/
              let ray2 = BABYLON.Ray.Zero();
              let showRay2 = BABYLON.RayHelper.CreateAndShow(
                ray2,
                scene,
                BABYLON.Color3.Green()
              );
              showRay2.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(-1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.maximum,
                size * 2
              );

              let numCircles = drawCircleContainer.meshes.length;
              console.log("circles#", numCircles);
              if (numCircles > 0) {
                drawCircleContainer.meshes.forEach(function (newTempMesh) {
                  let count = 0;
                  let thisVertices = newTempMesh.getVerticesData(
                    BABYLON.VertexBuffer.PositionKind
                  );
                  //console.log("Vertices",thisVertices);
                  console.log("Length", thisVertices.length);
                  let xcoor = [];
                  let ycoor = [];
                  for (let i = 0; i < thisVertices.length; i += 3) {
                    //console.log("x",thisVertices[i]);
                    xcoor.push(thisVertices[i]);
                  }
                  for (let i = 1; i < thisVertices.length; i += 3) {
                    //console.log("y",thisVertices[i]);
                    ycoor.push(thisVertices[i]);
                    count++;
                  }
                  console.log(
                    "total",
                    count,
                    "xcoor",
                    xcoor.length,
                    "ycoor",
                    ycoor.length
                  );
                  for (let i = 0; i < xcoor.length - 1; i += 1) {
                    let intersect2 = ray2.intersectionSegment(
                      new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                      new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                      0.007
                    );
                    console.log(
                      "v1",
                      xcoor[i],
                      ycoor[i],
                      "v2",
                      xcoor[i + 1],
                      ycoor[i + 1],
                      "Int @",
                      intersect2
                    );
                    if (intersect2 > 0) {
                      let thisTemp = BABYLON.Mesh.CreateLines(
                        newTempMesh.name,
                        [
                          new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                          new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        ]
                      );
                      thisTemp.color = BABYLON.Color3.Blue();
                      let thisIntersect = ray2.intersectsMesh(thisTemp);
                      let thisIntPoint = thisIntersect.pickedPoint;
                      pointsCounter++;
                      let point = BABYLON.Mesh.CreateSphere(
                        "intersect2Point" + pointsCounter,
                        32,
                        0.3,
                        scene
                      );
                      point.material = black;
                      point.position = thisIntPoint;

                      point.actionManager = new BABYLON.ActionManager(scene);
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOverTrigger,
                          function () {
                            point.material = green;
                          }
                        )
                      );
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOutTrigger,
                          function () {
                            point.material = black;
                          }
                        )
                      );
                      //point.setParent(tempMesh);
                      let text =
                        '{ "identity" : {"name":"' +
                        point.name +
                        '", "id":"' +
                        point.id +
                        '","username":null,"type":"point"},' +
                        '"position":{"x":' +
                        point.position.x +
                        ',"y":' +
                        point.position.y +
                        ',"z":' +
                        point.position.z +
                        '},"properties":{"color":"' +
                        point.material.name +
                        '","radius":0.3,"angle":null},' +
                        '"based_on":[{"name":"' +
                        tempMesh.name +
                        '", "id":"' +
                        tempMesh.id +
                        '","username":null,"type":"y-line"},{"name":"' +
                        newTempMesh.name +
                        '", "id":"' +
                        newTempMesh.id +
                        '","username":null,"type":"x-line"}]}';
                      let obj = JSON.parse(text);
                      point.metadata = obj;
                      pointsContainer.meshes.push(point);
                      thisTemp.dispose();
                    }
                  }
                });
              }
              showRay2.dispose();

              tempMesh.actionManager = new BABYLON.ActionManager(scene);
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOverTrigger,
                  function () {
                    tempMesh.color = new BABYLON.Color3(
                      144 / 255,
                      217 / 255,
                      222 / 255
                    );
                    //tempMesh.source.color = new BABYLON.Color3(144/255, 217/255, 222/255);
                  }
                )
              );
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOutTrigger,
                  function () {
                    tempMesh.color = BABYLON.Color3.Red();
                    //tempMesh.source.color = BABYLON.Color3.Red();
                  }
                )
              );
              tempMesh.setParent(theParent);
              linesContainer.meshes.push(tempMesh);
              document.getElementById("dialog").innerHTML =
                "Select a Line/Angled Line/Circle";
            } else if (tempMesh.name.includes("YDashC")) {
    
              yMeshCloneCounter++;
              tempMesh.name = "YDashC" + yMeshCloneCounter;
              let theParent = parentContainer.meshes.pop();
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(0, 1, 0),
                tempMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersect = ray.intersectsMeshes(meshcounts);
              intersect.forEach(function (thisPoint) {
                pointsCounter++;
                let point = BABYLON.Mesh.CreateSphere(
                  "intersectPoint" + pointsCounter,
                  32,
                  0.3,
                  scene
                );
                point.material = black;
                point.position = thisPoint.pickedPoint;
                console.log("vertical line point of intersection", point.position)
                point.actionManager = new BABYLON.ActionManager(scene);
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      point.material = green;
                    }
                  )
                );
                point.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      point.material = black;
                    }
                  )
                );
                //point.setParent(tempMesh);
                let text =
                  '{ "identity" : {"name":"' +
                  point.name +
                  '", "id":"' +
                  point.id +
                  '","username":null,"type":"point"},' +
                  '"position":{"x":' +
                  point.position.x +
                  ',"y":' +
                  point.position.y +
                  ',"z":' +
                  point.position.z +
                  '},"properties":{"color":"' +
                  point.material.name +
                  '","radius":0.3,"angle":null},' +
                  '"based_on":[{"name":"' +
                  tempMesh.name +
                  '", "id":"' +
                  tempMesh.id +
                  '","username":null,"type":"y-line"},{"name":"' +
                  thisPoint.pickedMesh.name +
                  '", "id":"' +
                  thisPoint.pickedMesh.id +
                  '","username":null,"type":"x-line"}]}';
                let obj = JSON.parse(text);
                point.metadata = obj;
                pointsContainer.meshes.push(point);
              });
              showRay.dispose();
              /*let ray2 = BABYLON.Ray.Zero();
                            let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                            showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(0,-1,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                            let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                            intersect2.forEach(function(thisPoint){
                                    pointsCounter++;
                                    let point = BABYLON.Mesh.CreateSphere("intersect2Point"+pointsCounter,32,0.3,scene);
                                    point.material=black;
                                    point.position=thisPoint.pickedPoint;

                                    point.actionManager = new BABYLON.ActionManager(scene);
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                        point.material= green;
                                    }));
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                        point.material= black;
                                    }));
                                    pointsContainer.meshes.push(point);
                            });
                            showRay2.dispose();*/
              let ray2 = BABYLON.Ray.Zero();
              let showRay2 = BABYLON.RayHelper.CreateAndShow(
                ray2,
                scene,
                BABYLON.Color3.Green()
              );
              showRay2.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(0, -1, 0),
                tempMesh.getBoundingInfo().boundingBox.maximum,
                size * 2
              );

              let numCircles = drawCircleContainer.meshes.length;
              console.log("circles#", numCircles);
              if (numCircles > 0) {
                drawCircleContainer.meshes.forEach(function (newTempMesh) {
                  let count = 0;
                  let thisVertices = newTempMesh.getVerticesData(
                    BABYLON.VertexBuffer.PositionKind
                  );
                  //console.log("Vertices",thisVertices);
                  console.log("Length", thisVertices.length);
                  let xcoor = [];
                  let ycoor = [];
                  for (let i = 0; i < thisVertices.length; i += 3) {
                    //console.log("x",thisVertices[i]);
                    xcoor.push(thisVertices[i]);
                  }
                  for (let i = 1; i < thisVertices.length; i += 3) {
                    //console.log("y",thisVertices[i]);
                    ycoor.push(thisVertices[i]);
                    count++;
                  }
                  console.log(
                    "total",
                    count,
                    "xcoor",
                    xcoor.length,
                    "ycoor",
                    ycoor.length
                  );
                  for (let i = 0; i < xcoor.length - 1; i += 1) {
                    let intersect2 = ray2.intersectionSegment(
                      new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                      new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                      0.007
                    );
                    console.log(
                      "v1",
                      xcoor[i],
                      ycoor[i],
                      "v2",
                      xcoor[i + 1],
                      ycoor[i + 1],
                      "Int @",
                      intersect2
                    );
                    if (intersect2 > 0) {
                      let thisTemp = BABYLON.Mesh.CreateLines(
                        newTempMesh.name,
                        [
                          new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                          new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        ]
                      );
                      thisTemp.color = BABYLON.Color3.Blue();
                      let thisIntersect = ray2.intersectsMesh(thisTemp);
                      let thisIntPoint = thisIntersect.pickedPoint;
                      pointsCounter++;
                      let point = BABYLON.Mesh.CreateSphere(
                        "intersect2Point" + pointsCounter,
                        32,
                        0.3,
                        scene
                      );
                      point.material = black;
                      point.position = thisIntPoint;

                      point.actionManager = new BABYLON.ActionManager(scene);
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOverTrigger,
                          function () {
                            point.material = green;
                          }
                        )
                      );
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOutTrigger,
                          function () {
                            point.material = black;
                          }
                        )
                      );
                      //point.setParent(tempMesh);
                      let text =
                        '{ "identity" : {"name":"' +
                        point.name +
                        '", "id":"' +
                        point.id +
                        '","username":null,"type":"point"},' +
                        '"position":{"x":' +
                        point.position.x +
                        ',"y":' +
                        point.position.y +
                        ',"z":' +
                        point.position.z +
                        '},"properties":{"color":"' +
                        point.material.name +
                        '","radius":0.3,"angle":null},' +
                        '"based_on":[{"name":"' +
                        tempMesh.name +
                        '", "id":"' +
                        tempMesh.id +
                        '","username":null,"type":"y-line"},{"name":"' +
                        newTempMesh.name +
                        '", "id":"' +
                        newTempMesh.id +
                        '","username":null,"type":"x-line"}]}';
                      let obj = JSON.parse(text);
                      point.metadata = obj;
                      pointsContainer.meshes.push(point);
                      thisTemp.dispose();
                    }
                  }
                });
              }
              showRay2.dispose();

              tempMesh.actionManager = new BABYLON.ActionManager(scene);
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOverTrigger,
                  function () {
                    tempMesh.color = new BABYLON.Color3(
                      144 / 255,
                      217 / 255,
                      222 / 255
                    );
                    //tempMesh.source.color = new BABYLON.Color3(144/255, 217/255, 222/255);
                  }
                )
              );
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOutTrigger,
                  function () {
                    tempMesh.color = BABYLON.Color3.Red();
                    //tempMesh.source.color = BABYLON.Color3.Red();
                  }
                )
              );
              tempMesh.setParent(theParent);
              linesContainer.meshes.push(tempMesh);
              document.getElementById("dialog").innerHTML =
                "Select a Line/Angled Line/Circle";
            } else if (tempMesh.name.includes("angDash")) {
              angMeshCounter++;
              tempMesh.name = "angDash" + angMeshCounter;
              let thisAngle = angMap.get("angDash");
              let thisAngleNum = Number(thisAngle.degrees());
              console.log(thisAngleNum, typeof thisAngleNum);
              angMap.set(tempMesh.name, thisAngle);
              console.log("midpointhere", pointx, pointy);
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersect = ray.intersectsMeshes(meshcounts);
              

              intersect.forEach(function (thisPoint) {
                console.log(thisPoint);
                let thisMid = thisPoint.pickedPoint;
                if (
                  thisMid.x.toFixed(2) - pointx.toFixed(2) >= -0.2 &&
                  thisMid.x.toFixed(2) - pointx.toFixed(2) <= 0.2 &&
                  thisMid.y.toFixed(2) - pointy.toFixed(2) >= -0.2 &&
                  thisMid.y.toFixed(2) - pointy.toFixed(2) <= 0.2
                ) {
                  console.log("exist @", pointx.toFixed(2), pointy.toFixed(2));
                } else {
                  console.log(
                    "point @",
                    thisPoint.pickedPoint.x.toFixed(2),
                    thisPoint.pickedPoint.y.toFixed(2)
                  );
                  pointsCounter++;
                  let point = BABYLON.Mesh.CreateSphere(
                    "intersectPoint" + pointsCounter,
                    32,
                    0.3,
                    scene
                  );
                  point.material = black;
                  point.position = thisPoint.pickedPoint;
                  console.log("angled line point of intersection: ", point.position)
                  point.actionManager = new BABYLON.ActionManager(scene);
                  point.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                      BABYLON.ActionManager.OnPointerOverTrigger,
                      function () {
                        point.material = green;
                      }
                    )
                  );
                  point.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                      BABYLON.ActionManager.OnPointerOutTrigger,
                      function () {
                        point.material = black;
                      }
                    )
                  );
                  let text =
                    '{ "identity" : {"name":"' +
                    point.name +
                    '", "id":"' +
                    point.id +
                    '","username":null,"type":"point"},' +
                    '"position":{"x":' +
                    point.position.x +
                    ',"y":' +
                    point.position.y +
                    ',"z":' +
                    point.position.z +
                    '},"properties":{"color":"' +
                    point.material.name +
                    '","radius":0.3,"angle":null},' +
                    '"based_on":[{"name":"' +
                    tempMesh.name +
                    '", "id":"' +
                    tempMesh.id +
                    '","username":null,"type":"y-line"},{"name":"' +
                    thisPoint.pickedMesh.name +
                    '", "id":"' +
                    thisPoint.pickedMesh.id +
                    '","username":null,"type":"x-line"}]}';
                  let obj = JSON.parse(text);
                  point.metadata = obj;
                  pointsContainer.meshes.push(point);
                }
              });
              showRay.dispose();
              /*let ray2 = BABYLON.Ray.Zero();
                            let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                            showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(-1,0,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                            let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                            intersect2.forEach(function(thisPoint){
                                    pointsCounter++;
                                    let point = BABYLON.Mesh.CreateSphere("intersect2Point"+pointsCounter,32,0.3,scene);
                                    point.material=black;
                                    point.position=thisPoint.pickedPoint;

                                    point.actionManager = new BABYLON.ActionManager(scene);
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                        point.material= green;
                                    }));
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                        point.material= black;
                                    }));
                                    pointsContainer.meshes.push(point);
                            });
                            showRay2.dispose();*/

              let ray2 = BABYLON.Ray.Zero();
              let showRay2 = BABYLON.RayHelper.CreateAndShow(
                ray2,
                scene,
                BABYLON.Color3.Green()
              );
              showRay2.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(-1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.maximum,
                size * 2
              );

              let numCircles = drawCircleContainer.meshes.length;
              console.log("circles#", numCircles);
              if (numCircles > 0) {
                drawCircleContainer.meshes.forEach(function (newTempMesh) {
                  let count = 0;
                  let thisVertices = newTempMesh.getVerticesData(
                    BABYLON.VertexBuffer.PositionKind
                  );
                  //console.log("Vertices",thisVertices);
                  console.log("Length", thisVertices.length);
                  let xcoor = [];
                  let ycoor = [];
                  for (let i = 0; i < thisVertices.length; i += 3) {
                    //console.log("x",thisVertices[i]);
                    xcoor.push(thisVertices[i]);
                  }
                  for (let i = 1; i < thisVertices.length; i += 3) {
                    //console.log("y",thisVertices[i]);
                    ycoor.push(thisVertices[i]);
                    count++;
                  }
                  console.log(
                    "total",
                    count,
                    "xcoor",
                    xcoor.length,
                    "ycoor",
                    ycoor.length
                  );
                  for (let i = 0; i < xcoor.length - 1; i += 1) {
                    let intersect2 = ray2.intersectionSegment(
                      new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                      new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                      0.007
                    );
                    //console.log("v1",xcoor[i],ycoor[i],"v2",xcoor[i+1],ycoor[i+1],"Int @",intersect2);
                    if (intersect2 > 0) {
                      let thisTemp = BABYLON.Mesh.CreateLines(
                        newTempMesh.name,
                        [
                          new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                          new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        ]
                      );
                      thisTemp.color = BABYLON.Color3.Blue();
                      let thisIntersect = ray2.intersectsMesh(thisTemp);
                      let thisIntPoint = thisIntersect.pickedPoint;
                      pointsCounter++;
                      let point = BABYLON.Mesh.CreateSphere(
                        "intersect2Point" + pointsCounter,
                        32,
                        0.3,
                        scene
                      );
                      point.material = black;
                      point.position = thisIntPoint;

                      point.actionManager = new BABYLON.ActionManager(scene);
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOverTrigger,
                          function () {
                            point.material = green;
                          }
                        )
                      );
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOutTrigger,
                          function () {
                            point.material = black;
                          }
                        )
                      );
                      let text =
                        '{ "identity" : {"name":"' +
                        point.name +
                        '", "id":"' +
                        point.id +
                        '","username":null,"type":"point"},' +
                        '"position":{"x":' +
                        point.position.x +
                        ',"y":' +
                        point.position.y +
                        ',"z":' +
                        point.position.z +
                        '},"properties":{"color":"' +
                        point.material.name +
                        '","radius":0.3,"angle":null},' +
                        '"based_on":[{"name":"' +
                        tempMesh.name +
                        '", "id":"' +
                        tempMesh.id +
                        '","username":null,"type":"y-line"},{"name":"' +
                        newTempMesh.name +
                        '", "id":"' +
                        newTempMesh.id +
                        '","username":null,"type":"x-line"}]}';
                      let obj = JSON.parse(text);
                      point.metadata = obj;
                      pointsContainer.meshes.push(point);
                      thisTemp.dispose();
                    }
                  }
                });
              }
              showRay2.dispose();

              tempMesh.actionManager = new BABYLON.ActionManager(scene);
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOverTrigger,
                  function () {
                    tempMesh.color = new BABYLON.Color3(
                      144 / 255,
                      217 / 255,
                      222 / 255
                    );
                  }
                )
              );
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOutTrigger,
                  function () {
                    tempMesh.color = BABYLON.Color3.Red();
                  }
                )
              );

              linesContainer.meshes.push(tempMesh);
              document.getElementById("dialog").innerHTML = "Select a Point";

              let text =
                '{ "identity" : {"name":"' +
                tempMesh.name +
                '", "id":"' +
                tempMesh.id +
                '","username":null,"type":"angle line"},' +
                '"position":{"x":' +
                tempMesh.position.x +
                ',"y":' +
                tempMesh.position.y +
                ',"z":' +
                tempMesh.position.z +
                '},"properties":{"color":"' +
                tempMesh.color +
                '","angle":' +
                thisAngleNum +
                "}," +
                '"based_on":[{"name":"' +
                pointAngMesh +
                '", "id":"' +
                pointAngMesh +
                '","username":null,"type":"point"}]}';
              let obj = JSON.parse(text);
              tempMesh.metadata = obj;
              pointAngMesh = null;
            } else if (tempMesh.name.includes("angMeshC")) {
              let theParent = parentContainer.meshes.pop();
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersect = ray.intersectsMeshes(meshcounts);
              intersect.forEach(function (thisPoint) {
                let thisMid = thisPoint.pickedPoint;
                if (
                  thisMid.x.toFixed(2) - pointx.toFixed(2) >= -0.2 &&
                  thisMid.x.toFixed(2) - pointx.toFixed(2) <= 0.2 &&
                  thisMid.y.toFixed(2) - pointy.toFixed(2) >= -0.2 &&
                  thisMid.y.toFixed(2) - pointy.toFixed(2) <= 0.2
                ) {
                  console.log("exist @", pointx.toFixed(2), pointy.toFixed(2));
                } else {
                  console.log(
                    "point @",
                    thisPoint.pickedPoint.x.toFixed(2),
                    thisPoint.pickedPoint.y.toFixed(2)
                  );
                  pointsCounter++;
                  let point = BABYLON.Mesh.CreateSphere(
                    "intersectPoint" + pointsCounter,
                    32,
                    0.3,
                    scene
                  );
                  point.material = black;
                  point.position = thisPoint.pickedPoint;
                  console.log("angledC line point of intersection: ", point.position)
                  point.actionManager = new BABYLON.ActionManager(scene);
                  point.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                      BABYLON.ActionManager.OnPointerOverTrigger,
                      function () {
                        point.material = green;
                      }
                    )
                  );
                  point.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                      BABYLON.ActionManager.OnPointerOutTrigger,
                      function () {
                        point.material = black;
                      }
                    )
                  );
                  let text =
                    '{ "identity" : {"name":"' +
                    point.name +
                    '", "id":"' +
                    point.id +
                    '","username":null,"type":"point"},' +
                    '"position":{"x":' +
                    point.position.x +
                    ',"y":' +
                    point.position.y +
                    ',"z":' +
                    point.position.z +
                    '},"properties":{"color":"' +
                    point.material.name +
                    '","radius":0.3,"angle":null},' +
                    '"based_on":[{"name":"' +
                    tempMesh.name +
                    '", "id":"' +
                    tempMesh.id +
                    '","username":null,"type":"y-line"},{"name":"' +
                    thisPoint.pickedMesh.name +
                    '", "id":"' +
                    thisPoint.pickedMesh.id +
                    '","username":null,"type":"x-line"}]}';
                  let obj = JSON.parse(text);
                  point.metadata = obj;
                  pointsContainer.meshes.push(point);
                }
              });
              showRay.dispose();
              /*let ray2 = BABYLON.Ray.Zero();
                            let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                            showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(-1,0,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                            let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                            intersect2.forEach(function(thisPoint){
                                    pointsCounter++;
                                    let point = BABYLON.Mesh.CreateSphere("intersect2Point"+pointsCounter,32,0.3,scene);
                                    point.material=black;
                                    point.position=thisPoint.pickedPoint;

                                    point.actionManager = new BABYLON.ActionManager(scene);
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                        point.material= green;
                                    }));
                                    point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                        point.material= black;
                                    }));
                                    pointsContainer.meshes.push(point);
                            });
                            showRay2.dispose();*/
              let ray2 = BABYLON.Ray.Zero();
              let showRay2 = BABYLON.RayHelper.CreateAndShow(
                ray2,
                scene,
                BABYLON.Color3.Green()
              );
              showRay2.attachToMesh(
                tempMesh,
                new BABYLON.Vector3(-1, 0, 0),
                tempMesh.getBoundingInfo().boundingBox.maximum,
                size * 2
              );

              let numCircles = drawCircleContainer.meshes.length;
              console.log("circles#", numCircles);
              if (numCircles > 0) {
                drawCircleContainer.meshes.forEach(function (newTempMesh) {
                  let count = 0;
                  let thisVertices = newTempMesh.getVerticesData(
                    BABYLON.VertexBuffer.PositionKind
                  );
                  //console.log("Vertices",thisVertices);
                  console.log("Length", thisVertices.length);
                  let xcoor = [];
                  let ycoor = [];
                  for (let i = 0; i < thisVertices.length; i += 3) {
                    //console.log("x",thisVertices[i]);
                    xcoor.push(thisVertices[i]);
                  }
                  for (let i = 1; i < thisVertices.length; i += 3) {
                    //console.log("y",thisVertices[i]);
                    ycoor.push(thisVertices[i]);
                    count++;
                  }
                  console.log(
                    "total",
                    count,
                    "xcoor",
                    xcoor.length,
                    "ycoor",
                    ycoor.length
                  );
                  for (let i = 0; i < xcoor.length - 1; i += 1) {
                    let intersect2 = ray2.intersectionSegment(
                      new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                      new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                      0.007
                    );
                    console.log(
                      "v1",
                      xcoor[i],
                      ycoor[i],
                      "v2",
                      xcoor[i + 1],
                      ycoor[i + 1],
                      "Int @",
                      intersect2
                    );
                    if (intersect2 > 0) {
                      let thisTemp = BABYLON.Mesh.CreateLines(
                        newTempMesh.name,
                        [
                          new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                          new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        ]
                      );
                      thisTemp.color = BABYLON.Color3.Blue();
                      let thisIntersect = ray2.intersectsMesh(thisTemp);
                      let thisIntPoint = thisIntersect.pickedPoint;
                      pointsCounter++;
                      let point = BABYLON.Mesh.CreateSphere(
                        "intersect2Point" + pointsCounter,
                        32,
                        0.3,
                        scene
                      );
                      point.material = black;
                      point.position = thisIntPoint;

                      point.actionManager = new BABYLON.ActionManager(scene);
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOverTrigger,
                          function () {
                            point.material = green;
                          }
                        )
                      );
                      point.actionManager.registerAction(
                        new BABYLON.ExecuteCodeAction(
                          BABYLON.ActionManager.OnPointerOutTrigger,
                          function () {
                            point.material = black;
                          }
                        )
                      );
                      let text =
                        '{ "identity" : {"name":"' +
                        point.name +
                        '", "id":"' +
                        point.id +
                        '","username":null,"type":"point"},' +
                        '"position":{"x":' +
                        point.position.x +
                        ',"y":' +
                        point.position.y +
                        ',"z":' +
                        point.position.z +
                        '},"properties":{"color":"' +
                        point.material.name +
                        '","radius":0.3,"angle":null},' +
                        '"based_on":[{"name":"' +
                        tempMesh.name +
                        '", "id":"' +
                        tempMesh.id +
                        '","username":null,"type":"y-line"},{"name":"' +
                        newTempMesh.name +
                        '", "id":"' +
                        newTempMesh.id +
                        '","username":null,"type":"x-line"}]}';
                      let obj = JSON.parse(text);
                      point.metadata = obj;
                      pointsContainer.meshes.push(point);
                      thisTemp.dispose();
                    }
                  }
                });
              }
              showRay2.dispose();
              tempMesh.actionManager = new BABYLON.ActionManager(scene);
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOverTrigger,
                  function () {
                    tempMesh.color = new BABYLON.Color3(
                      144 / 255,
                      217 / 255,
                      222 / 255
                    );
                  }
                )
              );
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOutTrigger,
                  function () {
                    tempMesh.color = BABYLON.Color3.Red();
                  }
                )
              );
              tempMesh.setParent(theParent);
              linesContainer.meshes.push(tempMesh);
              document.getElementById("dialog").innerHTML =
                "Select a Line/Angled Line/Circle";
            } else if (tempMesh.name.includes("perpDash")) {
              let thisCircle = "";
              let theParent = parentContainer.meshes.pop();
              console.log("perpmesh", tempMesh);
              tempMesh.color = BABYLON.Color3.Red();
              let pickedMesh = pickInfo.pickedMesh;
              console.log("status", pickedMesh.name, drag);

              let isPoint = false;
              if (pickedMesh.name.includes("Point")) isPoint = true;
              else isPoint = false;

              console.log("isPoint?", isPoint);
              if (tempMesh.name.includes("perpDashC")) {
                console.log("perp clone");
                PerpMeshCloneCounter++;
                tempMesh.name = "perpDashC" + PerpMeshCloneCounter;

                let ray = BABYLON.Ray.Zero();
                //ray = BABYLON.Ray.Transform( ray, tempMesh.getWorldMatrix().getTranslation());
                //console.log(tempMesh.getWorldMatrix().getTranslation());
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  ray,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay.attachToMesh(
                  tempMesh,
                  new BABYLON.Vector3(1, 0, 0),
                  tempMesh.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );
                let meshcounts = originlinesContainer.meshes.concat(
                  linesContainer.meshes
                );
                console.log("meshcount", meshcounts);
                let intersect = ray.intersectsMeshes(meshcounts);
                console.log("int", intersect);
                let pPoint = pickedMesh.getAbsolutePosition();
                console.log("midpoint", pPoint);
                intersect.forEach(function (thisPoint) {
                  let thisMid = thisPoint.pickedPoint;
                  if (
                    thisMid.x.toFixed(2) - pPoint.x.toFixed(2) >= -0.2 &&
                    thisMid.x.toFixed(2) - pPoint.x.toFixed(2) <= 0.2 &&
                    thisMid.y.toFixed(2) - pPoint.y.toFixed(2) >= -0.2 &&
                    thisMid.y.toFixed(2) - pPoint.y.toFixed(2) <= 0.2
                  ) {
                    console.log(
                      "exist",
                      thisMid.x.toFixed(2),
                      thisMid.y.toFixed(2)
                    );
                  } else {
                    console.log("ppoint @", thisMid);
                    pointsCounter++;
                    let point = BABYLON.Mesh.CreateSphere(
                      "intersectPoint" + pointsCounter,
                      32,
                      0.3,
                      scene
                    );
                    point.material = black;
                    point.position = thisPoint.pickedPoint;
                    console.log("perp line point of intersection: ", point.position)
                    point.actionManager = new BABYLON.ActionManager(scene);
                    point.actionManager.registerAction(
                      new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOverTrigger,
                        function () {
                          point.material = green;
                        }
                      )
                    );
                    point.actionManager.registerAction(
                      new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOutTrigger,
                        function () {
                          point.material = black;
                        }
                      )
                    );
                    let text =
                      '{ "identity" : {"name":"' +
                      point.name +
                      '", "id":"' +
                      point.id +
                      '","username":null,"type":"point"},' +
                      '"position":{"x":' +
                      point.position.x +
                      ',"y":' +
                      point.position.y +
                      ',"z":' +
                      point.position.z +
                      '},"properties":{"color":"' +
                      point.material.name +
                      '","radius":0.3,"angle":null},' +
                      '"based_on":[{"name":"' +
                      tempMesh.name +
                      '", "id":"' +
                      tempMesh.id +
                      '","username":null,"type":"y-line"},{"name":"' +
                      thisPoint.pickedMesh.name +
                      '", "id":"' +
                      thisPoint.pickedMesh.id +
                      '","username":null,"type":"x-line"}]}';
                    let obj = JSON.parse(text);
                    point.metadata = obj;
                    pointsContainer.meshes.push(point);
                  }
                });
                /*let ray2 = BABYLON.Ray.Zero();
                                let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                                showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(-1,0,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                                let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                                console.log("int2",intersect2)
                                intersect2.forEach(function(thisPoint){
                                    let thisMid=thisPoint.pickedPoint;
                                    if((thisMid.x.toFixed(2)-pPoint.x.toFixed(2)>=0 && thisMid.x.toFixed(2)-pPoint.x.toFixed(2)<=0.1) && (thisMid.y.toFixed(2)-pPoint.y.toFixed(2)>=0 && thisMid.y.toFixed(2)-pPoint.y.toFixed(2)<=0.1)){
                                        console.log("exist",thisMid.x.toFixed(2),thisMid.y.toFixed(2));
                                    }
                                    else{
                                        pointsCounter++;
                                        let point = BABYLON.Mesh.CreateSphere("intersectPoint"+pointsCounter,32,0.3,scene);
                                        point.material=black;
                                        point.position=thisPoint.pickedPoint;
                                        point.actionManager = new BABYLON.ActionManager(scene);
                                        point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                            point.material= green;
                                        }));
                                        point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                            point.material= black;
                                        }));
                                        pointsContainer.meshes.push(point);
                                    }
                                });*/
                let ray2 = BABYLON.Ray.Zero();
                let showRay2 = BABYLON.RayHelper.CreateAndShow(
                  ray2,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay2.attachToMesh(
                  tempMesh,
                  new BABYLON.Vector3(-1, 0, 0),
                  tempMesh.getBoundingInfo().boundingBox.maximum,
                  size * 2
                );

                let numCircles = drawCircleContainer.meshes.length;
                console.log("circles#", numCircles);
                if (numCircles > 0) {
                  drawCircleContainer.meshes.forEach(function (newTempMesh) {
                    let count = 0;
                    let thisVertices = newTempMesh.getVerticesData(
                      BABYLON.VertexBuffer.PositionKind
                    );
                    //console.log("Vertices",thisVertices);
                    console.log("Length", thisVertices.length);
                    let xcoor = [];
                    let ycoor = [];
                    for (let i = 0; i < thisVertices.length; i += 3) {
                      //console.log("x",thisVertices[i]);
                      xcoor.push(thisVertices[i]);
                    }
                    for (let i = 1; i < thisVertices.length; i += 3) {
                      //console.log("y",thisVertices[i]);
                      ycoor.push(thisVertices[i]);
                      count++;
                    }
                    console.log(
                      "total",
                      count,
                      "xcoor",
                      xcoor.length,
                      "ycoor",
                      ycoor.length
                    );
                    for (let i = 0; i < xcoor.length - 1; i += 1) {
                      let intersect2 = ray2.intersectionSegment(
                        new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                        new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        0.007
                      );
                      console.log(
                        "v1",
                        xcoor[i],
                        ycoor[i],
                        "v2",
                        xcoor[i + 1],
                        ycoor[i + 1],
                        "Int @",
                        intersect2
                      );
                      if (intersect2 > 0) {
                        let thisTemp = BABYLON.Mesh.CreateLines(
                          newTempMesh.name,
                          [
                            new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                            new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                          ]
                        );
                        thisTemp.color = BABYLON.Color3.Blue();
                        let thisIntersect = ray2.intersectsMesh(thisTemp);
                        let thisIntPoint = thisIntersect.pickedPoint;
                        console.log(
                          Math.abs(
                            thisIntPoint.x.toFixed(1) - pPoint.x.toFixed(1)
                          )
                        );
                        if (
                          Math.abs(
                            thisIntPoint.x.toFixed(1) - pPoint.x.toFixed(1)
                          ) > 0.1
                        ) {
                          //prevent tangent mult int
                          pointsCounter++;
                          let point = BABYLON.Mesh.CreateSphere(
                            "intersect2Point" + pointsCounter,
                            32,
                            0.3,
                            scene
                          );
                          point.material = black;
                          point.position = thisIntPoint;

                          point.actionManager = new BABYLON.ActionManager(
                            scene
                          );
                          point.actionManager.registerAction(
                            new BABYLON.ExecuteCodeAction(
                              BABYLON.ActionManager.OnPointerOverTrigger,
                              function () {
                                point.material = green;
                              }
                            )
                          );
                          point.actionManager.registerAction(
                            new BABYLON.ExecuteCodeAction(
                              BABYLON.ActionManager.OnPointerOutTrigger,
                              function () {
                                point.material = black;
                              }
                            )
                          );
                          let text =
                            '{ "identity" : {"name":"' +
                            point.name +
                            '", "id":"' +
                            point.id +
                            '","username":null,"type":"point"},' +
                            '"position":{"x":' +
                            point.position.x +
                            ',"y":' +
                            point.position.y +
                            ',"z":' +
                            point.position.z +
                            '},"properties":{"color":"' +
                            point.material.name +
                            '","radius":0.3,"angle":null},' +
                            '"based_on":[{"name":"' +
                            tempMesh.name +
                            '", "id":"' +
                            tempMesh.id +
                            '","username":null,"type":"y-line"},{"name":"' +
                            newTempMesh.name +
                            '", "id":"' +
                            newTempMesh.id +
                            '","username":null,"type":"x-line"}]}';
                          let obj = JSON.parse(text);
                          point.metadata = obj;
                          pointsContainer.meshes.push(point);
                        }
                        thisTemp.dispose();
                      }
                    }
                  });
                }
                showRay2.dispose();
                tempMesh.actionManager = new BABYLON.ActionManager(scene);
                tempMesh.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      tempMesh.color = new BABYLON.Color3(
                        144 / 255,
                        217 / 255,
                        222 / 255
                      );
                    }
                  )
                );
                tempMesh.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      tempMesh.color = BABYLON.Color3.Red();
                    }
                  )
                );
                showRay.dispose();
                // showRay2.dispose();
                tempMesh.setParent(theParent);
                console.log(tempMesh.name, angleTemp);
                angMap.set(tempMesh.name, angleTemp);
                linesContainer.meshes.push(tempMesh);
                document.getElementById("dialog").innerHTML =
                  "Select a Line/Angled Line/Circle";
              } else if (
                offset === false &&
                pickedMesh.name.includes("Point")
              ) {
                //tempMesh.rotateAround(pickedMesh.getAbsolutePosition(),BABYLON.Axis.Z,Math.PI/2);
                PerpMeshCounter++;
                tempMesh.name = "perpDash" + PerpMeshCounter;
                let ray = BABYLON.Ray.Zero();
                //ray = BABYLON.Ray.Transform( ray, tempMesh.getWorldMatrix().getTranslation());
                //console.log(tempMesh.getWorldMatrix().getTranslation());
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  ray,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay.attachToMesh(
                  tempMesh,
                  new BABYLON.Vector3(1, 0, 0),
                  tempMesh.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );
                let meshcounts = originlinesContainer.meshes.concat(
                  linesContainer.meshes
                );
                //console.log("meshcount",meshcounts);
                let pointData = pickedMesh.metadata.based_on;
                pointData.forEach(function (thisData) {
                  if (thisData.name.includes("Circle")) {
                    tangent = true;
                    thisCircle = thisData.name;
                  }
                });
                console.log("tangent @", thisCircle);
                let intersect = ray.intersectsMeshes(meshcounts);
                // console.log("int",intersect);
                let pPoint = pickedMesh.getAbsolutePosition();
                //console.log("midpoint",pPoint);
                intersect.forEach(function (thisPoint) {
                  let thisMid = thisPoint.pickedPoint;
                  let thisName = thisPoint.pickedMesh.name;
                  if (
                    thisMid.x.toFixed(2) - pPoint.x.toFixed(2) >= -0.2 &&
                    thisMid.x.toFixed(2) - pPoint.x.toFixed(2) <= 0.2 &&
                    thisMid.y.toFixed(2) - pPoint.y.toFixed(2) >= -0.2 &&
                    thisMid.y.toFixed(2) - pPoint.y.toFixed(2) <= 0.2
                  ) {
                    //console.log("exist",thisMid.x.toFixed(2),thisMid.y.toFixed(2));
                  } else if (thisName === thisCircle) {
                    console.log("except", thisName);
                  } else {
                    //console.log("ppoint @",thisMid);
                    pointsCounter++;
                    let point = BABYLON.Mesh.CreateSphere(
                      "intersectPoint" + pointsCounter,
                      32,
                      0.3,
                      scene
                    );
                    point.material = black;
                    point.position = thisPoint.pickedPoint;
                    point.actionManager = new BABYLON.ActionManager(scene);
                    point.actionManager.registerAction(
                      new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOverTrigger,
                        function () {
                          point.material = green;
                        }
                      )
                    );
                    point.actionManager.registerAction(
                      new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOutTrigger,
                        function () {
                          point.material = black;
                        }
                      )
                    );
                    let text =
                      '{ "identity" : {"name":"' +
                      point.name +
                      '", "id":"' +
                      point.id +
                      '","username":null,"type":"point"},' +
                      '"position":{"x":' +
                      point.position.x +
                      ',"y":' +
                      point.position.y +
                      ',"z":' +
                      point.position.z +
                      '},"properties":{"color":"' +
                      point.material.name +
                      '","radius":0.3,"angle":null},' +
                      '"based_on":[{"name":"' +
                      tempMesh.name +
                      '", "id":"' +
                      tempMesh.id +
                      '","username":null,"type":"y-line"},{"name":"' +
                      thisPoint.pickedMesh.name +
                      '", "id":"' +
                      thisPoint.pickedMesh.id +
                      '","username":null,"type":"x-line"}]}';
                    let obj = JSON.parse(text);
                    point.metadata = obj;
                    pointsContainer.meshes.push(point);
                  }
                });
                /*let ray2 = BABYLON.Ray.Zero();
                                let showRay2 = BABYLON.RayHelper.CreateAndShow(ray2,scene,BABYLON.Color3.Green());
                                showRay2.attachToMesh(tempMesh, new BABYLON.Vector3(-1,0,0),tempMesh.getBoundingInfo().boundingBox.maximum,size*2);
                                let intersect2 = ray2.intersectsMeshes(drawCircleContainer.meshes);
                                console.log("int2",intersect2)
                                intersect2.forEach(function(thisPoint){
                                    let thisMid=thisPoint.pickedPoint;
                                    if((thisMid.x.toFixed(2)-pPoint.x.toFixed(2)>=0 && thisMid.x.toFixed(2)-pPoint.x.toFixed(2)<=0.1) && (thisMid.y.toFixed(2)-pPoint.y.toFixed(2)>=0 && thisMid.y.toFixed(2)-pPoint.y.toFixed(2)<=0.1)){
                                        console.log("exist",thisMid.x.toFixed(2),thisMid.y.toFixed(2));
                                    }
                                    else{
                                        pointsCounter++;
                                        let point = BABYLON.Mesh.CreateSphere("intersectPoint"+pointsCounter,32,0.3,scene);
                                        point.material=black;
                                        point.position=thisPoint.pickedPoint;
                                        point.actionManager = new BABYLON.ActionManager(scene);
                                        point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,function(){
                                            point.material= green;
                                        }));
                                        point.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,function(){
                                            point.material= black;
                                        }));
                                        pointsContainer.meshes.push(point);
                                    }
                                });*/

                let ray2 = BABYLON.Ray.Zero();
                let showRay2 = BABYLON.RayHelper.CreateAndShow(
                  ray2,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay2.attachToMesh(
                  tempMesh,
                  new BABYLON.Vector3(-1, 0, 0),
                  tempMesh.getBoundingInfo().boundingBox.maximum,
                  size * 2
                );

                let numCircles = drawCircleContainer.meshes.length;
                console.log("circles#", numCircles);
                if (numCircles > 0) {
                  drawCircleContainer.meshes.forEach(function (newTempMesh) {
                    let count = 0;
                    let thisVertices = newTempMesh.getVerticesData(
                      BABYLON.VertexBuffer.PositionKind
                    );
                    //console.log("Vertices",thisVertices);
                    console.log("Length", thisVertices.length);
                    let xcoor = [];
                    let ycoor = [];
                    for (let i = 0; i < thisVertices.length; i += 3) {
                      //console.log("x",thisVertices[i]);
                      xcoor.push(thisVertices[i]);
                    }
                    for (let i = 1; i < thisVertices.length; i += 3) {
                      //console.log("y",thisVertices[i]);
                      ycoor.push(thisVertices[i]);
                      count++;
                    }
                    console.log(
                      "total",
                      count,
                      "xcoor",
                      xcoor.length,
                      "ycoor",
                      ycoor.length
                    );
                    for (let i = 0; i < xcoor.length - 1; i += 1) {
                      let intersect2 = ray2.intersectionSegment(
                        new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                        new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                        0.001
                      );
                      //console.log("v1",xcoor[i],ycoor[i],"v2",xcoor[i+1],ycoor[i+1],"Int @",intersect2);
                      if (intersect2 > 0) {
                        let thisTemp = BABYLON.Mesh.CreateLines(
                          newTempMesh.name,
                          [
                            new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                            new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0),
                          ]
                        );
                        thisTemp.color = BABYLON.Color3.Blue();
                        let thisIntersect = ray2.intersectsMesh(thisTemp);
                        let thisIntPoint = thisIntersect.pickedPoint;
                        console.log(
                          Math.abs(
                            thisIntPoint.x.toFixed(1) - pPoint.x.toFixed(1)
                          )
                        );
                        if (
                          Math.abs(
                            thisIntPoint.x.toFixed(1) - pPoint.x.toFixed(1)
                          ) > 0.1
                        ) {
                          //prevent tangent mult int
                          pointsCounter++;
                          let point = BABYLON.Mesh.CreateSphere(
                            "intersect2Point" + pointsCounter,
                            32,
                            0.3,
                            scene
                          );
                          point.material = black;
                          point.position = thisIntPoint;

                          point.actionManager = new BABYLON.ActionManager(
                            scene
                          );
                          point.actionManager.registerAction(
                            new BABYLON.ExecuteCodeAction(
                              BABYLON.ActionManager.OnPointerOverTrigger,
                              function () {
                                point.material = green;
                              }
                            )
                          );
                          point.actionManager.registerAction(
                            new BABYLON.ExecuteCodeAction(
                              BABYLON.ActionManager.OnPointerOutTrigger,
                              function () {
                                point.material = black;
                              }
                            )
                          );
                          let text =
                            '{ "identity" : {"name":"' +
                            point.name +
                            '", "id":"' +
                            point.id +
                            '","username":null,"type":"point"},' +
                            '"position":{"x":' +
                            point.position.x +
                            ',"y":' +
                            point.position.y +
                            ',"z":' +
                            point.position.z +
                            '},"properties":{"color":"' +
                            point.material.name +
                            '","radius":0.3,"angle":null},' +
                            '"based_on":[{"name":"' +
                            tempMesh.name +
                            '", "id":"' +
                            tempMesh.id +
                            '","username":null,"type":"y-line"},{"name":"' +
                            newTempMesh.name +
                            '", "id":"' +
                            newTempMesh.id +
                            '","username":null,"type":"x-line"}]}';
                          let obj = JSON.parse(text);
                          point.metadata = obj;
                          pointsContainer.meshes.push(point);
                        }
                        thisTemp.dispose();
                      }
                    }
                  });
                }
                showRay2.dispose();

                tempMesh.actionManager = new BABYLON.ActionManager(scene);
                tempMesh.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      tempMesh.color = new BABYLON.Color3(
                        144 / 255,
                        217 / 255,
                        222 / 255
                      );
                    }
                  )
                );
                tempMesh.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      tempMesh.color = BABYLON.Color3.Red();
                    }
                  )
                );
                showRay.dispose();
                //showRay2.dispose();
                console.log(
                  "parentAngle",
                  angMap.get(theParent.name).degrees()
                );
                console.log(thisCircle);
                let text =
                  '{ "identity" : {"name":"' +
                  tempMesh.name +
                  '", "id":"' +
                  tempMesh.id +
                  '","username":null,"type":"perpendicular"},' +
                  '"position":{"x":' +
                  tempMesh.position.x +
                  ',"y":' +
                  tempMesh.position.y +
                  ',"z":' +
                  tempMesh.position.z +
                  '},"properties":{"color":"red"},' +
                  '"based_on":{"name":"' +
                  theParent.name +
                  '", "id":"' +
                  theParent.id +
                  '","username":null,"type":"angled-line","angle":' +
                  angMap.get(theParent.name).degrees() +
                  "}," +
                  '"tangent":{"name":"' +
                  thisCircle +
                  '"}}';
                let obj = JSON.parse(text);
                tempMesh.metadata = obj;
                tempMesh.setParent(pickedMesh);
                angMap.set(tempMesh.name, angleTemp);
                linesContainer.meshes.push(tempMesh);
                document.getElementById("dialog").innerHTML =
                  "Select an Angled Line";
              } else {
                tempMesh.dispose();
              }
            } else if (tempMesh.name.includes("Circle")) {
              let pointParent = parentContainer.meshes.pop();
              let count = 0;
              let prevcpx = 0;
              let prevcpy = 0;
              console.log("status", tempMesh.name, drag);
              //console.log("currMid",pointx,pointy);
              CircleCounter++;
              tempMesh.name = "Circle" + CircleCounter;
              pointsMap.set(tempMesh.name, [pointx, pointy]);
              let text =
                '{ "identity" : {"name":"' +
                tempMesh.name +
                '", "id":"' +
                tempMesh.id +
                '","username":null,"type":"circle"},' +
                '"position":{"x":' +
                tempMesh.position.x +
                ',"y":' +
                tempMesh.position.y +
                ',"z":' +
                tempMesh.position.z +
                '},"properties":{"color":"' +
                tempMesh.color +
                '","radius":' +
                globalrad +
                ',"angle":null},' +
                '"based_on":[{"name":"' +
                pointParent.name +
                '", "id":"' +
                pointParent.id +
                '","username":null,"type":"point"}]}';
              let obj = JSON.parse(text);
              tempMesh.metadata = obj;

              let pdata = pointParent.metadata;
              let pbasedOn = pdata.based_on;
              //console.log(basedOn);
              pbasedOn.forEach(function (obj) {
                console.log(obj?.name);
                if (obj.name.includes("ang")) {
                  linesContainer.meshes.forEach(function (refMesh) {
                    if (refMesh.name === obj?.name) {
                      console.log(
                        "parent of",
                        tempMesh.name,
                        "is",
                        refMesh.name
                      );
                      tempMesh.setParent(refMesh);
                      //pointParent.setParent(refMesh);
                    }
                  });
                }
              });
              let thisVertices = tempMesh.getVerticesData(
                BABYLON.VertexBuffer.PositionKind
              );
              //console.log("Vertices",thisVertices);
              console.log("Length", thisVertices.length);
              let xcoor = [];
              let ycoor = [];
              for (let i = 0; i < thisVertices.length; i += 3) {
                //console.log("x",thisVertices[i]);
                xcoor.push(thisVertices[i]);
              }
              for (let i = 1; i < thisVertices.length; i += 3) {
                //console.log("y",thisVertices[i]);
                ycoor.push(thisVertices[i]);
                count++;
              }
              console.log(
                "total",
                count,
                "xcoor",
                xcoor.length,
                "ycoor",
                ycoor.length
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes.concat(drawCircleContainer.meshes)
              );
              console.log("meshcount", meshcounts);
              for (let i = 0; i < xcoor.length - 1; i += 1) {
                //console.log("v1",xcoor[i],ycoor[i],"v2",xcoor[i+1],ycoor[i+1]);
                let ray = BABYLON.Ray.CreateNewFromTo(
                  new BABYLON.Vector3(xcoor[i], ycoor[i], 0),
                  new BABYLON.Vector3(xcoor[i + 1], ycoor[i + 1], 0)
                );
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  ray,
                  scene,
                  BABYLON.Color3.Green()
                );
                //console.log("rayLength",i,ray.length);
                let intersect = ray.intersectsMeshes(meshcounts);
                //console.log(intersect);
                intersect.forEach(function (thisPoint) {
                  //console.log("hit @", xcoor[i],ycoor[i],thisPoint);
                  let thisLength = Math.sqrt(
                    Math.pow(xcoor[i] - thisPoint.pickedPoint.x, 2) +
                      Math.pow(ycoor[i] - thisPoint.pickedPoint.y, 2)
                  );
                  //console.log("Length",thisLength);
                  if (thisLength >= 0.0 && thisLength <= 0.3) {
                    pointsCounter++;
                    let point = BABYLON.Mesh.CreateSphere(
                      "intersectPoint" + pointsCounter,
                      32,
                      0.3,
                      scene
                    );
                    point.material = black;
                    point.position = thisPoint.pickedPoint;
                    console.log("circle point of intersection: ", point.position)
                    point.actionManager = new BABYLON.ActionManager(scene);
                    point.actionManager.registerAction(
                      new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOverTrigger,
                        function () {
                          point.material = green;
                        }
                      )
                    );
                    point.actionManager.registerAction(
                      new BABYLON.ExecuteCodeAction(
                        BABYLON.ActionManager.OnPointerOutTrigger,
                        function () {
                          point.material = black;
                        }
                      )
                    );
                    let cpx = thisPoint.pickedPoint.x;
                    let cpy = thisPoint.pickedPoint.y;
                    let thisLength2 = Math.sqrt(
                      Math.pow(cpx - prevcpx, 2) + Math.pow(cpy - prevcpy, 2)
                    );
                    prevcpx = cpx;
                    prevcpy = cpy;

                    // console.log("pointPosition",cpx.toFixed(2),cpy.toFixed(2),thisLength2.toFixed(2));
                    if (thisLength2 <= 0.1) {
                      //console.log("denied");
                      point.dispose();
                    } else {
                      //console.log("accepted");
                      //console.log("pointPosition",cpx.toFixed(2),cpy.toFixed(2),thisLength2.toFixed(2));
                      let text =
                        '{ "identity" : {"name":"' +
                        point.name +
                        '", "id":"' +
                        point.id +
                        '","username":null,"type":"point"},' +
                        '"position":{"x":' +
                        point.position.x +
                        ',"y":' +
                        point.position.y +
                        ',"z":' +
                        point.position.z +
                        '},"properties":{"color":"' +
                        point.material.name +
                        '","radius":0.3,"angle":null},' +
                        '"based_on":[{"name":"' +
                        tempMesh.name +
                        '", "id":"' +
                        tempMesh.id +
                        '","username":null,"type":"y-line"},{"name":"' +
                        thisPoint.pickedMesh.name +
                        '", "id":"' +
                        thisPoint.pickedMesh.id +
                        '","username":null,"type":"x-line"}]}';
                      let obj = JSON.parse(text);
                      point.metadata = obj;
                      pointsContainer.meshes.push(point);
                    }
                  }
                });
                showRay.dispose();
              }
              //console.log("v1",xcoor[i],ycoor[i],"v2",xcoor[i+1],ycoor[i+1]);
              let ray2 = BABYLON.Ray.CreateNewFromTo(
                new BABYLON.Vector3(
                  xcoor[xcoor.length - 1],
                  ycoor[ycoor.length - 1],
                  0
                ),
                new BABYLON.Vector3(xcoor[0], ycoor[0], 0)
              );
              let showRay2 = BABYLON.RayHelper.CreateAndShow(
                ray2,
                scene,
                BABYLON.Color3.Green()
              );
              //console.log("rayLength",i,ray.length);
              let intersect2 = ray2.intersectsMeshes(meshcounts);
              //console.log(intersect);
              intersect2.forEach(function (thisPoint) {
                //console.log("hit @", xcoor[i],ycoor[i],thisPoint);
                let thisLength = Math.sqrt(
                  Math.pow(
                    xcoor[xcoor.length - 1] - thisPoint.pickedPoint.x,
                    2
                  ) +
                    Math.pow(
                      ycoor[ycoor.length - 1] - thisPoint.pickedPoint.y,
                      2
                    )
                );
                //console.log("Length",thisLength);
                let cpx = thisPoint.pickedPoint.x;
                let cpy = thisPoint.pickedPoint.y;
                let thisLength2 = Math.sqrt(
                  Math.pow(cpx - prevcpx, 2) + Math.pow(cpy - prevcpy, 2)
                );
                console.log("diff", thisLength2);
                console.log();
                if (
                  thisLength > 0.0 &&
                  thisLength <= 0.45 &&
                  thisLength2 >= 0.1
                ) {
                  pointsCounter++;
                  let point = BABYLON.Mesh.CreateSphere(
                    "intersectPoint" + pointsCounter,
                    32,
                    0.3,
                    scene
                  );
                  point.material = black;
                  point.position = thisPoint.pickedPoint;
                  point.actionManager = new BABYLON.ActionManager(scene);
                  point.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                      BABYLON.ActionManager.OnPointerOverTrigger,
                      function () {
                        point.material = green;
                      }
                    )
                  );
                  point.actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(
                      BABYLON.ActionManager.OnPointerOutTrigger,
                      function () {
                        point.material = black;
                      }
                    )
                  );
                  let text =
                    '{ "identity" : {"name":"' +
                    point.name +
                    '", "id":"' +
                    point.id +
                    '","username":null,"type":"point"},' +
                    '"position":{"x":' +
                    point.position.x +
                    ',"y":' +
                    point.position.y +
                    ',"z":' +
                    point.position.z +
                    '},"properties":{"color":"' +
                    point.material.name +
                    '","radius":0.3,"angle":null},' +
                    '"based_on":[{"name":"' +
                    tempMesh.name +
                    '", "id":"' +
                    tempMesh.id +
                    '","username":null,"type":"y-line"},{"name":"' +
                    thisPoint.pickedMesh.name +
                    '", "id":"' +
                    thisPoint.pickedMesh.id +
                    '","username":null,"type":"x-line"}]}';
                  let obj = JSON.parse(text);
                  point.metadata = obj;
                  pointsContainer.meshes.push(point);
                }
              });
              showRay2.dispose();

              tempMesh.actionManager = new BABYLON.ActionManager(scene);
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOverTrigger,
                  function () {
                    tempMesh.color = new BABYLON.Color3(
                      144 / 255,
                      217 / 255,
                      222 / 255
                    );
                  }
                )
              );
              tempMesh.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(
                  BABYLON.ActionManager.OnPointerOutTrigger,
                  function () {
                    tempMesh.color = BABYLON.Color3.Red();
                  }
                )
              );
              //linesContainer.meshes.push(tempMesh);
              tempMesh.setParent(pointParent);
              //console.log("positionWorld",pointParent.getBoundingInfo().boundingBox.centerWorld);
              //tempMesh.setAbsolutePosition(pointParent.getBoundingInfo().boundingBox.centerWorld);
              drawCircleContainer.meshes.push(tempMesh);
              if (offset === true) {
                document.getElementById("dialog").innerHTML =
                  "Select a Line/Angled Line/Circle";
              } else {
                document.getElementById("dialog").innerHTML = "Select a Point";
              }
            }
          } else {
            console.log("undefined");
          }
        }
        //console.log("points#",pointsContainer.meshes.length);
      }; //pdown
      scene.onPointerMove = function (evt, pickInfo) {
        //conmode===1
        if (pickInfo.hit) {
          if (conMode === 1) {
            let dragMesh = tempContainer.meshes.pop();
            // console.log("tempSize",tempContainer.meshes.length);
            document.onkeydown = function (evt3) {
              evt3 = evt3 || window.event;
              if (evt3.keyCode == 27) {
                dragMesh = tempContainer.meshes.pop();
                parentContainer.meshes.pop();
                console.log(
                  "Esc, remove",
                  dragMesh?.name,
                  "construct",
                  thisConstruct
                );
                if (dragMesh != undefined) {
                  dragMesh.dispose();
                  drag = false;
                  if (thisConstruct === "Offset") {
                    document.getElementById("dialog").innerHTML =
                      "Select a Line/Circle";
                  } else if (thisConstruct === "Angled") {
                    document.getElementById("dialog").innerHTML =
                      "Select a Point";
                  } else if (thisConstruct === "Perpendicular") {
                    document.getElementById("dialog").innerHTML =
                      "Select an Angled Line";
                  } else if (thisConstruct === "Circle") {
                    document.getElementById("dialog").innerHTML =
                      "Select a Point";
                  }
                }
              }
            };
            if (pickInfo.hit) {
              let px = pickInfo.pickedPoint.x;
              let py = pickInfo.pickedPoint.y;
              coordinates.innerHTML =
                "X:" + px.toFixed(2) + " " + "Y:" + py.toFixed(2);
            }
            if (thisView === "Top" && thisConstruct === "Offset") {
              if (drag && dragMesh != undefined) {
                //console.log("dragging",dragMesh.name);
                if (dragMesh.name.includes("Circle")) {
                  //let mid = angMap.get(angCloneMap.get(dragMesh.name));
                  dragMesh.dispose();
                  let px = pickInfo?.pickedPoint?.x;
                  let py = pickInfo?.pickedPoint?.y;
                  if (pickInfo.pickedMesh.name.includes("Point")) {
                    px = pickInfo.pickedMesh.getAbsolutePosition().x;
                    py = pickInfo.pickedMesh.getAbsolutePosition().y;
                  }
                  console.log("midp", pointx, pointy);
                  let rad = Math.sqrt(
                    Math.pow(px - pointx, 2) + Math.pow(py - pointy, 2)
                  );
                  radiusView.innerHTML = "" + rad.toFixed(2);
                  let sides = rad * 10;
                  let circle = BABYLON.Polygon.Circle(
                    rad,
                    pointx,
                    pointy,
                    sides
                  );
                  let vector3 = [];
                  circle.forEach(function (val) {
                    vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                  });
                  vector3.push(vector3[0]);
                  let firstx = vector3[0].x;
                  let firsty = vector3[0].y;
                  let lastx = vector3[vector3.length - 2].x;
                  let lasty = vector3[vector3.length - 2].y;
                  let distance = Math.sqrt(
                    Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                  );
                  if (distance > 0.05) {
                    if (distance < 0.15) {
                      console.log("big gap");
                      sides = sides * 2;
                      circle = BABYLON.Polygon.Circle(
                        rad,
                        pointx,
                        pointy,
                        sides
                      );
                      vector3 = [];
                      circle.forEach(function (val) {
                        vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                      });
                      vector3.push(vector3[0]);
                      firstx = vector3[0].x;
                      firsty = vector3[0].y;
                      lastx = vector3[vector3.length - 2].x;
                      lasty = vector3[vector3.length - 2].y;
                      distance = Math.sqrt(
                        Math.pow(lastx - firstx, 2) +
                          Math.pow(lasty - firsty, 2)
                      );
                    } else if (distance >= 0.15 && distance < 0.3) {
                      console.log("big gap2");
                      sides = sides * 3;
                      circle = BABYLON.Polygon.Circle(
                        rad,
                        pointx,
                        pointy,
                        sides
                      );
                      vector3 = [];
                      circle.forEach(function (val) {
                        vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                      });
                      vector3.push(vector3[0]);
                      firstx = vector3[0].x;
                      firsty = vector3[0].y;
                      lastx = vector3[vector3.length - 2].x;
                      lasty = vector3[vector3.length - 2].y;
                      distance = Math.sqrt(
                        Math.pow(lastx - firstx, 2) +
                          Math.pow(lasty - firsty, 2)
                      );
                    } else if (distance >= 0.3 && distance < 0.4) {
                      console.log("big gap");
                      sides = sides * 3;
                      circle = BABYLON.Polygon.Circle(
                        rad,
                        pointx,
                        pointy,
                        sides
                      );
                      vector3 = [];
                      circle.forEach(function (val) {
                        vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                      });
                      vector3.push(vector3[0]);
                      firstx = vector3[0].x;
                      firsty = vector3[0].y;
                      lastx = vector3[vector3.length - 2].x;
                      lasty = vector3[vector3.length - 2].y;
                      distance = Math.sqrt(
                        Math.pow(lastx - firstx, 2) +
                          Math.pow(lasty - firsty, 2)
                      );
                    } else if (distance >= 0.4 && distance < 0.5) {
                      console.log("big gap5");
                      sides = sides * 4;
                      circle = BABYLON.Polygon.Circle(
                        rad,
                        pointx,
                        pointy,
                        sides
                      );
                      vector3 = [];
                      circle.forEach(function (val) {
                        vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                      });
                      vector3.push(vector3[0]);
                      firstx = vector3[0].x;
                      firsty = vector3[0].y;
                      lastx = vector3[vector3.length - 2].x;
                      lasty = vector3[vector3.length - 2].y;
                      distance = Math.sqrt(
                        Math.pow(lastx - firstx, 2) +
                          Math.pow(lasty - firsty, 2)
                      );
                    } else {
                      console.log("big gap6");
                      sides = sides * 5;
                      circle = BABYLON.Polygon.Circle(
                        rad,
                        pointx,
                        pointy,
                        sides
                      );
                      vector3 = [];
                      circle.forEach(function (val) {
                        vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                      });
                      vector3.push(vector3[0]);
                      firstx = vector3[0].x;
                      firsty = vector3[0].y;
                      lastx = vector3[vector3.length - 2].x;
                      lasty = vector3[vector3.length - 2].y;
                      distance = Math.sqrt(
                        Math.pow(lastx - firstx, 2) +
                          Math.pow(lasty - firsty, 2)
                      );
                    }
                  }
                  dragMesh = BABYLON.Mesh.CreateDashedLines(
                    "Circle",
                    vector3,
                    dashLength - 0.1,
                    dashGap,
                    sides + 1,
                    scene
                  );
                  dragMesh.color = BABYLON.Color3.Red();
                } else if (
                  dragMesh.name.includes("ang") ||
                  dragMesh.name.includes("perp")
                ) {
                  let px = pickInfo.pickedPoint.x;
                  let py = pickInfo.pickedPoint.y;
                  if (pickInfo.pickedMesh.name.includes("Point")) {
                    px = pickInfo.pickedMesh.getAbsolutePosition().x;
                    py = pickInfo.pickedMesh.getAbsolutePosition().y;
                  }
                  dragMesh.position.x = px;
                  dragMesh.position.y = py;
                } else if (dragMesh.name.includes("Point")) {
                  //do nothing
                } else {
                  //console.log("pos",dragMesh.position);
                  let px = pickInfo.pickedPoint.x;
                  let py = pickInfo.pickedPoint.y;
                  if (pickInfo.pickedMesh.name.includes("Point")) {
                    px = pickInfo.pickedMesh.getAbsolutePosition().x;
                    py = pickInfo.pickedMesh.getAbsolutePosition().y;
                  }
                  dragMesh.position.x = px;
                  dragMesh.position.y = py;
                }
              } else {
                console.log("done");
              }
            } else if (thisView === "Top" && thisConstruct === "Angled") {
              if (drag && dragMesh != undefined) {
                console.log("midpointMove", pointx, pointy);
                let px = pickInfo?.pickedPoint?.x;
                let py = pickInfo?.pickedPoint?.y;
                if (pickInfo.pickedMesh.name.includes("Point")) {
                  px = pickInfo.pickedMesh.getAbsolutePosition().x;
                  py = pickInfo.pickedMesh.getAbsolutePosition().y;
                }
                let angle = BABYLON.Angle.BetweenTwoPoints(
                  new BABYLON.Vector2(pointx, pointy),
                  new BABYLON.Vector2(px, py)
                );
                angleView.innerHTML = "Angle: " + angle.degrees().toFixed(2);
                // console.log(angle.degrees());
                dragMesh.dispose();
                dragMesh = BABYLON.Mesh.CreateDashedLines(
                  "angDash",
                  [
                    new BABYLON.Vector3(-size, 0, 0),
                    new BABYLON.Vector3(size, 0, 0),
                  ],
                  dashLength,
                  dashGap,
                  lineLength,
                  scene
                );
                dragMesh.position.x = pointx;
                dragMesh.position.y = pointy;
                dragMesh.color = BABYLON.Color3.Red();
                dragMesh.rotateAround(
                  new BABYLON.Vector3(pointx, pointy, 0),
                  BABYLON.Axis.Z,
                  angle.radians()
                );
                angMap.set(dragMesh.name, angle);
              }
            } else if (
              thisView === "Top" &&
              thisConstruct === "Perpendicular"
            ) {
              //do nothing for now
              if (drag && dragMesh != undefined) {
                let px = pickInfo.pickedPoint.x;
                let py = pickInfo.pickedPoint.y;
                if (pickInfo.pickedMesh.name.includes("Point")) {
                  px = pickInfo.pickedMesh.getAbsolutePosition().x;
                  py = pickInfo.pickedMesh.getAbsolutePosition().y;
                }
                dragMesh.position.x = px;
                dragMesh.position.y = py;
                dragMesh.position.z = 0;
              }
            } else if (thisView === "Top" && thisConstruct === "Circle") {
              if (drag && dragMesh != undefined) {
                dragMesh.dispose();
                let px = pickInfo?.pickedPoint?.x;
                let py = pickInfo?.pickedPoint?.y;

                //console.log("midp",pointx,pointy);
                let rad = Math.sqrt(
                  Math.pow(px - pointx, 2) + Math.pow(py - pointy, 2)
                );
                globalrad = rad;
                radiusView.innerHTML = "" + rad.toFixed(2);
                let sides = rad * 10;
                let circle = BABYLON.Polygon.Circle(rad, pointx, pointy, sides);
                let vector3 = [];
                circle.forEach(function (val) {
                  vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                });
                vector3.push(vector3[0]);
                let firstx = vector3[0].x;
                let firsty = vector3[0].y;
                let lastx = vector3[vector3.length - 2].x;
                let lasty = vector3[vector3.length - 2].y;
                let distance = Math.sqrt(
                  Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                );
                if (distance > 0.05) {
                  if (distance < 0.15) {
                    //console.log("big gap");
                    sides = sides * 2;
                    circle = BABYLON.Polygon.Circle(rad, pointx, pointy, sides);
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0 ].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else if (distance >= 0.05 && distance < 0.3) {
                    //console.log("big gap2");
                    sides = sides * 3;
                    circle = BABYLON.Polygon.Circle(rad, pointx, pointy, sides);
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else if (distance >= 0.3 && distance < 0.4) {
                    //console.log("big gap 4");
                    sides = sides * 3;
                    circle = BABYLON.Polygon.Circle(rad, pointx, pointy, sides);
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else if (distance >= 0.4 && distance < 0.5) {
                    // console.log("big gap5");
                    sides = sides * 4;
                    circle = BABYLON.Polygon.Circle(rad, pointx, pointy, sides);
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else {
                    //console.log("big gap6");
                    sides = sides * 5;
                    circle = BABYLON.Polygon.Circle(rad, pointx, pointy, sides);
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  }
                }
                //console.log("first",firstx,firsty,"last",lastx,lasty,"distance",distance);
                dragMesh = BABYLON.Mesh.CreateDashedLines(
                  "Circle",
                  vector3,
                  dashLength,
                  dashGap,
                  sides + 1,
                  scene
                );
                dragMesh.color = BABYLON.Color3.Red();
              }
            }

            if (dragMesh != undefined) tempContainer.meshes.push(dragMesh);
          }
        }
      }; //pmove
    } else if (conMode === 2) {
      linesContainer.meshes.forEach(function (thisMesh) {
        thisMesh.isPickable = true;
      });
      drawnLineContainer.meshes.forEach(function (dl) {
        dl.isPickable = true;
      });
      scene.onPointerDown = function (evt, pickInfo) {
        if (pickInfo.hit) {
          let thisMesh = pickInfo.pickedMesh;
          console.log(thisMesh.name, "parent", thisMesh.parent?.name);
          let data = thisMesh.metadata;
          if (data != null) {
            let name = data.identity.name;
            let position = data.position;
            let properties = data.properties;
            let basedOn = data.based_on;
            console.log(data);
            //console.log("name",name,"position",position,"properties",properties,"based_on",basedOn);
            //console.log("newpos",thisMesh.getBoundingInfo().boundingBox.centerWorld);
            //console.log("checkpos",thisMesh.position);
          }
        }
      };
      scene.onPointerMove = function (evt, pickInfo) {
        if (pickInfo.hit) {
          let px = pickInfo.pickedPoint.x;
          let py = pickInfo.pickedPoint.y;
          coordinates.innerHTML =
            "X:" + px.toFixed(2) + " " + "Y:" + py.toFixed(2);
        }
      };
    } else if (conMode === 6) {
      linesContainer.meshes.forEach(function (thisMesh) {
        thisMesh.isPickable = true;
      });
      drawnLineContainer.meshes.forEach(function (dl) {
        dl.isPickable = false;
      });
      originlinesContainer.meshes.forEach(function (thisMesh) {
        thisMesh.isPickable = true;
        thisMesh.actionManager = new BABYLON.ActionManager(scene);
        thisMesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            function () {
              thisMesh.color = new BABYLON.Color3(
                144 / 255,
                217 / 255,
                222 / 255
              );
            }
          )
        );
        thisMesh.actionManager.registerAction(
          new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function () {
              thisMesh.color = new BABYLON.Color3(0, 92 / 255, 230 / 255);
            }
          )
        );
      });
      let leftClick = 0;
      document.getElementById("dialog").innerHTML = "Select start element";
      let mesh1 = null;
      let mesh2 = null;
      let mesh3 = null;
      let userp1 = BABYLON.Vector3.Zero();
      let userp2 = BABYLON.Vector3.Zero();
      let userp3 = BABYLON.Vector3.Zero();
      scene.onPointerDown = function (evt, pickInfo) {
        if (pickInfo.hit) {
          var rightclick;
          var e = window.event;
          if (e.which) {
            rightclick = e.which == 3;
          } else if (e.button) {
            rightclick = e.button == 2;
          } // true or false, you can trap right click here by if comparison
          //console.log(rightclick);

          let thisMesh = pickInfo.pickedMesh;
          console.log("parent", thisMesh.parent?.name);
          let data = thisMesh.metadata;
          if (data != null) {
            let name = data.identity.name;
            let position = data.position;
            let properties = data.properties;
            let basedOn = data.based_on;
            console.log(data);
          }
          if (rightclick === false) {
            if (
              thisMesh.name.includes("X") ||
              thisMesh.name.includes("Y") ||
              thisMesh.name.includes("ang") ||
              thisMesh.name.includes("perp") ||
              thisMesh.name.includes("Circle")
            ) {
              leftClick++;
              console.log(leftClick);
              if (leftClick === 1) {
                mesh1 = thisMesh;
                userp1 = pickInfo.pickedPoint;
                document.getElementById("dialog").innerHTML =
                  "Select drawn element";
              }
              if (leftClick === 2) {
                mesh2 = thisMesh;
                userp2 = pickInfo.pickedPoint;
                document.getElementById("dialog").innerHTML =
                  "Select last element";
              }
              if (leftClick === 3) {
                mesh3 = thisMesh;
                userp3 = pickInfo.pickedPoint;
              }
              if (leftClick >= 3) {
                leftClick = 0;
              }
              if (leftClick === 0) {
                document.getElementById("dialog").innerHTML =
                  "Select start element";
                if (mesh2.name.includes("Circle")) {
                  console.log(leftClick, mesh1.name, mesh2.name, mesh3.name);
                  function showAngleSector(origin, vector1, vector2, radius) {
                    radius = radius || 1;
                    var cross = BABYLON.Vector3.Cross(vector1, vector2);
                    var dot = BABYLON.Vector3.Dot(vector1, vector2);
                    var angle = Math.acos(
                      dot / (vector1.length() * vector2.length())
                    );
                    var points = [];
                    var minNb = 4;
                    var factor = 2;
                    var nbPoints = Math.floor(radius * angle * factor);
                    nbPoints = nbPoints < minNb ? minNb : nbPoints;

                    var firstPoint = BABYLON.Vector3.Normalize(vector1).scale(
                      radius
                    );
                    var lastPoint = BABYLON.Vector3.Normalize(vector2).scale(
                      radius
                    );
                    var matrix;
                    var ang = angle / nbPoints;
                    var rotated;
                    for (var i = 0; i < nbPoints; i++) {
                      matrix = BABYLON.Matrix.RotationAxis(cross, ang * i);
                      rotated = BABYLON.Vector3.TransformCoordinates(
                        firstPoint,
                        matrix
                      );
                      points.push(rotated.add(origin));
                    }
                    points.push(lastPoint.add(origin));

                    var sector;
                    //sector = BABYLON.Mesh.CreateLines("sector", points, scene);
                    tubecount++;
                    sector = BABYLON.MeshBuilder.CreateTube(
                      "arctube" + tubecount,
                      { path: points, radius: 0.1 },
                      scene
                    );
                    sector.material = gray;
                    sector.isPickable = false;
                    let text =
                      '{ "identity" : {"name":"' +
                      sector.name +
                      '", "id":"' +
                      sector.id +
                      '","username":null,"type":"arc"},' +
                      '"position":{"x":' +
                      sector.position.x +
                      ',"y":' +
                      sector.position.y +
                      ',"z":' +
                      sector.position.z +
                      '},"properties":{"color":"' +
                      sector.material.name +
                      '","radius":' +
                      radius +
                      ',"angle":null},' +
                      '"based_on":{"point1":"' +
                      based_p1.name +
                      '", "point2":"' +
                      based_p2.name +
                      '","point3":"' +
                      based_p3.name +
                      '"}}';
                    let obj = JSON.parse(text);
                    sector.metadata = obj;
                    drawnLineContainer.meshes.push(sector);
                    return sector;
                  }
                  // triangle vertices
                  var point1 = new BABYLON.Vector3(0, 0, 0);
                  var point2 = new BABYLON.Vector3(0, 0, 0);
                  var point3 = new BABYLON.Vector3(0, 0, 0);
                  let based_p1 = null;
                  let based_p2 = null;
                  let based_p3 = null;
                  //if(mesh2.name.includes("Circle")){
                  point1 = new BABYLON.Vector3(
                    mesh2.parent.metadata.position.x,
                    mesh2.parent.metadata.position.y,
                    0
                  );
                  based_p1 = mesh2.parent;
                  //if(!mesh3.name.includes("Circle")){
                  let length = Number.MAX_VALUE;
                  let length2 = Number.MAX_VALUE;
                  console.log(userp2);
                  pointsContainer.meshes.forEach(function (p) {
                    if (mesh1.name.includes("perp")) {
                      if (
                        mesh1.parent.metadata.based_on[0].name === mesh2.name ||
                        mesh1.parent.metadata.based_on[1].name === mesh2.name
                      ) {
                        console.log(mesh1.parent.name);
                        point3 = new BABYLON.Vector3(
                          mesh1.parent.metadata.position.x,
                          mesh1.parent.metadata.position.y,
                          0
                        );
                        based_p3 = mesh1.parent;
                      }
                    }
                    if (mesh3.name.includes("perp")) {
                      if (
                        mesh3.parent.metadata.based_on[0].name === mesh2.name ||
                        mesh3.parent.metadata.based_on[1].name === mesh2.name
                      ) {
                        console.log(mesh3.parent.name);
                        point2 = new BABYLON.Vector3(
                          mesh3.parent.metadata.position.x,
                          mesh3.parent.metadata.position.y,
                          0
                        );
                        based_p2 = mesh3.parent;
                      }
                    }
                    if (
                      (p.metadata.based_on[0].name === mesh2.name &&
                        p.metadata.based_on[1].name === mesh3.name) ||
                      (p.metadata.based_on[1].name === mesh2.name &&
                        p.metadata.based_on[0].name === mesh3.name)
                    ) {
                      let thislength = Math.sqrt(
                        Math.pow(p.metadata.position.x - userp3.x, 2) +
                          Math.pow(p.metadata.position.y - userp3.y, 2)
                      );
                      console.log(p.name, thislength);
                      if (thislength < length) {
                        length = thislength;
                        point2 = new BABYLON.Vector3(
                          p.metadata.position.x,
                          p.metadata.position.y,
                          0
                        );
                        based_p2 = p;
                      }
                    }
                    if (
                      (p.metadata.based_on[0].name === mesh1.name &&
                        p.metadata.based_on[1].name === mesh2.name) ||
                      (p.metadata.based_on[1].name === mesh1.name &&
                        p.metadata.based_on[0].name === mesh2.name)
                    ) {
                      let thislength = Math.sqrt(
                        Math.pow(p.metadata.position.x - userp2.x, 2) +
                          Math.pow(p.metadata.position.y - userp2.y, 2)
                      );
                      console.log(p.name, thislength);
                      if (thislength < length2) {
                        length2 = thislength;
                        point3 = new BABYLON.Vector3(
                          p.metadata.position.x,
                          p.metadata.position.y,
                          0
                        );
                        based_p3 = p;
                      }
                    }
                  });
                  //}
                  console.log(point2, point3);
                  //}

                  var axis1 = point2.subtract(point1);
                  var axis3 = point3.subtract(point1);

                  let thisrad = mesh2.metadata.properties.radius;
                  var sector1 = showAngleSector(point1, axis1, axis3, thisrad);
                  sector1.color = BABYLON.Color3.Gray(); // sector1 is a Lines mesh
                  let tempmesh = mesh3;
                  mesh1 = mesh2;
                  leftClick++;
                  mesh2 = tempmesh;
                  leftClick++;
                  document.getElementById("dialog").innerHTML =
                    "Select last element";
                } //if mesh2 consist circle
                else {
                  let based_p1 = null;
                  let based_p2 = null;
                  console.log(userp2);
                  let length = Number.MAX_VALUE;
                  let length2 = Number.MAX_VALUE;
                  let points = [];
                  let p2found = false;
                  let p3found = false;
                  pointsContainer.meshes.forEach(function (p) {
                    if (mesh1.name.includes("perp")) {
                      if (
                        mesh1.parent.metadata.based_on[0].name === mesh2.name ||
                        mesh1.parent.metadata.based_on[1].name === mesh2.name
                      ) {
                        console.log(mesh1.parent.name);
                        point3 = new BABYLON.Vector3(
                          mesh1.parent.metadata.position.x,
                          mesh1.parent.metadata.position.y,
                          0
                        );
                        p3found = true;
                        based_p2 = mesh1.parent;
                      }
                    }
                    if (mesh2.name.includes("perp")) {
                      if (
                        mesh2.parent.metadata.based_on[0].name === mesh1.name ||
                        mesh2.parent.metadata.based_on[1].name === mesh1.name
                      ) {
                        console.log(mesh2.parent.name);
                        point3 = new BABYLON.Vector3(
                          mesh2.parent.metadata.position.x,
                          mesh2.parent.metadata.position.y,
                          0
                        );
                        p3found = true;
                        based_p2 = mesh2.parent;
                      }
                      if (
                        mesh2.parent.metadata.based_on[0].name === mesh3.name ||
                        mesh2.parent.metadata.based_on[1].name === mesh3.name
                      ) {
                        console.log(mesh2.parent.name);
                        point2 = new BABYLON.Vector3(
                          mesh2.parent.metadata.position.x,
                          mesh2.parent.metadata.position.y,
                          0
                        );
                        p2found = true;
                        based_p1 = mesh2.parent;
                      }
                    }
                    if (mesh3.name.includes("perp")) {
                      if (
                        mesh3.parent.metadata.based_on[0].name === mesh2.name ||
                        mesh3.parent.metadata.based_on[1].name === mesh2.name
                      ) {
                        console.log(mesh3.parent.name);
                        point2 = new BABYLON.Vector3(
                          mesh3.parent.metadata.position.x,
                          mesh3.parent.metadata.position.y,
                          0
                        );
                        p2found = true;
                        based_p1 = mesh3.parent;
                      }
                    }
                    if (
                      (p.metadata.based_on[0].name === mesh2.name &&
                        p.metadata.based_on[1].name === mesh3.name) ||
                      (p.metadata.based_on[1].name === mesh2.name &&
                        p.metadata.based_on[0].name === mesh3.name)
                    ) {
                      let thislength = Math.sqrt(
                        Math.pow(p.metadata.position.x - userp2.x, 2) +
                          Math.pow(p.metadata.position.y - userp2.y, 2)
                      );
                      console.log(p.name, thislength);
                      if (thislength < length) {
                        length = thislength;
                        point2 = new BABYLON.Vector3(
                          p.metadata.position.x,
                          p.metadata.position.y,
                          0
                        );
                        p2found = true;
                        based_p1 = p;
                      }
                    }
                    if (
                      (p.metadata.based_on[0].name === mesh1.name &&
                        p.metadata.based_on[1].name === mesh2.name) ||
                      (p.metadata.based_on[1].name === mesh1.name &&
                        p.metadata.based_on[0].name === mesh2.name)
                    ) {
                      let thislength = Math.sqrt(
                        Math.pow(p.metadata.position.x - userp3.x, 2) +
                          Math.pow(p.metadata.position.y - userp3.y, 2)
                      );
                      console.log(p.name, thislength);
                      if (thislength < length2) {
                        length2 = thislength;
                        point3 = new BABYLON.Vector3(
                          p.metadata.position.x,
                          p.metadata.position.y,
                          0
                        );
                        p3found = true;
                        based_p2 = p;
                      }
                    }
                  });
                  console.log(p2found, p3found);
                  if (p2found === false) {
                    point2 = new BABYLON.Vector3(0, 0, 0);
                    based_p1 = originPoint;
                  }
                  if (p3found === false) {
                    point3 = new BABYLON.Vector3(0, 0, 0);
                    based_p2 = originPoint;
                  }

                  points.push(point2);
                  points.push(point3);
                  console.log(point1, point2, point3);
                  let sector;
                  //sector = BABYLON.Mesh.CreateLines("sector", points, scene);
                  tubecount++;
                  sector = BABYLON.MeshBuilder.CreateTube(
                    "tube" + tubecount,
                    { path: points, radius: 0.1 },
                    scene
                  );
                  sector.material = gray;
                  sector.isPickable = false;
                  let text =
                    '{ "identity" : {"name":"' +
                    sector.name +
                    '", "id":"' +
                    sector.id +
                    '","username":null,"type":"line"},' +
                    '"position":{"x":' +
                    sector.position.x +
                    ',"y":' +
                    sector.position.y +
                    ',"z":' +
                    sector.position.z +
                    '},"properties":{"color":"' +
                    sector.material.name +
                    '","radius":' +
                    radius +
                    ',"angle":null},' +
                    '"based_on":{"point1":"' +
                    based_p1.name +
                    '", "point2":"' +
                    based_p2.name +
                    '"}}';
                  let obj = JSON.parse(text);
                  sector.metadata = obj;
                  drawnLineContainer.meshes.push(sector);
                  let tempmesh = mesh3;
                  mesh1 = mesh2;
                  leftClick++;
                  mesh2 = tempmesh;
                  leftClick++;
                  document.getElementById("dialog").innerHTML =
                    "Select last element";
                }
                console.log(leftClick, mesh1.name, mesh2.name, mesh3.name);
              } //left=0
            }
          }
        } //hit
      };
      scene.onPointerMove = function (evt, pickInfo) {
        if (pickInfo.hit) {
          let px = pickInfo.pickedPoint.x;
          let py = pickInfo.pickedPoint.y;
          coordinates.innerHTML =
            "X:" + px.toFixed(2) + " " + "Y:" + py.toFixed(2);
        }
      };
    } else if (conMode === 5) {
      let radiusView = document.getElementById("radius");
      let dashLength = 0.2;
      let dashGap = 0.03;
      linesContainer.meshes.forEach(function (thisMesh) {
        thisMesh.isPickable = true;
      });
      scene.onPointerDown = function (evt, pickInfo) {
        let canvasX = scene.pointerX;
        let canvasY = scene.pointerY;
        //console.log(canvasX,canvasY,typeof canvasX);
        if (pickInfo.hit) {
          let thisMesh = pickInfo.pickedMesh;
          console.log("parent", thisMesh.parent?.name);
          let data = thisMesh.metadata;
          if (data != null) {
            let name = data.identity.name;
            let position = data.position;
            let properties = data.properties;
            let basedOn = data.based_on;
            console.log("mesh data: ", data);
            //console.log("name",name,"position",position,"properties",properties,"based_on",basedOn);
            //console.log("newpos",thisMesh.getBoundingInfo().boundingBox.centerWorld);
            //console.log("checkpos",thisMesh.position);
          }
          if (thisMesh.name.includes("X")) {
            debugger;
            let thisLineContainer = new BABYLON.AssetContainer(scene);
            let thisPointsContainer = new BABYLON.AssetContainer(scene);
            let globalRay = BABYLON.Ray.Zero();

            pointsContainer.meshes.forEach(function (thisPoint) {
              let isYDash = false;
              let isAngle = false;
              let isCircle = false;
              let isThisMesh = false
              let YDashName = "";
              let angDashName = "";
              let circleName = "";

              thisPoint.metadata.based_on.forEach(function (pointInt) {
                let bname = pointInt.name;
                if (bname === thisMesh.name) {
                  isThisMesh = true;
                }
                if (bname.includes("YDash")) {
                  isYDash = true;
                  YDashName = bname;
                }
                if (bname.includes("ang")) {
                  isAngle = true;
                  angDashName = bname;
                }
                if (bname.includes("Circle")) {
                  isCircle = true;
                  circleName = bname;
                }
                
                
              });
              if (isThisMesh) {
                thisPointsContainer.meshes.push(thisPoint);
                if (isYDash) {
                  linesContainer.meshes.forEach(function (line) {
                    if (line.name === YDashName) {
                      thisLineContainer.mehses.push(line);
                    }
                  });
                }
                if (isAngle) {
                  linesContainer.meshes.forEach(function (line) {
                    if (line.name === angDashName) {
                      thisLineContainer.meshes.push(line);
                    }
                  });
                }
                if (isCircle) {
                  drawCircleContainer.meshes.forEach(function (c) {
                    if (c.name === circleName) {
                      thisLineContainer.meshes.push(c);
                    }
                  });
                }
              }
            }); 

            let thisPosY = thisMesh.position.y;
            console.log(thisPosY);
            let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
              "UI"
            );

            //handle input
            let input = new BABYLON.GUI.InputText();
            input.width = 0.07;
            input.maxWidth = 0.1;
            input.height = "40px";
            input.text = thisPosY;
            input.color = "white";
            input.background = "green";
            input.left = canvasX;
            input.top = canvasY;
            input.horizontalAlignment =
              BABYLON.GUI.Control.HORIZONTAlALIGNMENT_LEFT;
            input.verticalAlignment =
              BABYLON.GUI.Control.VERTICAlALIGNMENT_TOP;
            input.onKeyboardEventProcessedObservable.add(function (thisKey) {
              if (thisKey.keyCode === 13) { //when enter is pressed
                let newPos = input.text;
                thisMesh.position.y = newPos;

                thisMesh.computeWorldMatrix(true);
                let axis = BABYLON.Axis.Z;
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  globalRay,
                  scene,
                  BABYLON.Color3.Green()
                );

                showRay.attachToMesh(
                  thisMesh,
                  new BABYLON.Vector3(1, 0, 0),
                  thisMesh.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );

                let thisMeshCounts = thisLineContainer.meshes.concat(originlinesContainer.meshes)
                let thisIntersect = globalRay.intersectsMeshes(
                  thisMeshCounts
                );
                thisIntersect.forEach(function (ints) { //for each intersection
                  let mp = ints.pickedPoint;
                  let mm = ints.pickedMesh;
                  thisPointsContainer.meshes.forEach(function (tp) { //for each point in ang elements
                    tp.metadata.based_on.forEach(function (tpb) {
                      if (tpb.name === mm.name) {
                        tp.position = mp;
                        tp.metadata.position = mp;
                        tp.computeWorldMatrix();
                      }
                    });
                  });
                });

                input.dispose();
              }
            });
            advancedTexture.addControl(input);
          }
          if (thisMesh.name.includes("ang")) {
            let angPointContainer = new BABYLON.AssetContainer(scene);
            let angLineContainer = new BABYLON.AssetContainer(scene);
            let childAngPointContainer = new BABYLON.AssetContainer(scene);
            let childAngLineContainer = new BABYLON.AssetContainer(scene);
            let angPerpContainer = new BABYLON.AssetContainer(scene);
            let globalRay = BABYLON.Ray.Zero();

            //check to see if angled line has any perpendicular lines
            linesContainer.meshes.forEach(function (lmp) {
              if (lmp.name.includes("perp")) {
                if (
                  lmp.metadata.based_on.name === thisMesh.name &&
                  lmp.metadata.tangent.name === ""
                ) {
                  angPerpContainer.meshes.push(lmp);
                }
              }
            });
            let angleView = document.getElementById("angle");
            pointsContainer.meshes.forEach(function (thispoint) { //get all points in scene
              let thispdata = thispoint.metadata;
              let basedon = thispdata.based_on;
              let isAngle = false;
              let isCircle = false;
              let isXDash = false;
              let isChild = false;
              let XDashName = "";
              let isYDash = false;
              let isXAxis = false;
              let isYAxis = false;
              let YDashName = "";
              let angDashName = "";
              let angDashName2 = "";
              let angDashCounter = 0;
              let childName = "";
              basedon.forEach(function (based) { //get name of each point to see what element its part of
                let bname = based.name;
                if (bname.includes("ang")) {
                  angDashCounter++;
                  if(angDashCounter > 1) {
                    angDashName2 = bname;
                  } else {
                    angDashName = bname;
                  }
                }
                if (bname === thisMesh.name) {
                  isAngle = true;
                }
                if (bname.includes("angMeshC")) {
                  let children = thisMesh.getChildMeshes(true);
                  children.forEach(function (child) {
                    if (bname === child.name) {
                      isChild = true;
                      childName = bname;
                    }
                  })
                }
                if (bname.includes("Circle")) {
                  isCircle = true;
                  console.log(thispoint.name, "based on", bname);
                }
                if (bname === "X") {
                  isXAxis = true;
                }
                if (bname === "Y") {
                  isYAxis = true;
                }
                if (bname.includes("XDash")) {
                  isXDash = true;
                  XDashName = bname;
                }
                if (bname.includes("YDash")) {
                  isYDash = true;
                  YDashName = bname;
                }
              });
              if (isChild) {
                childAngPointContainer.meshes.push(thispoint);


              } else {
                if (angDashCounter > 1) {
                  angPointContainer.meshes.push(thispoint);
                  linesContainer.meshes.forEach(function (dp) {
                    if (dp.name === angDashName || dp.name === angDashName2) {
                      angLineContainer.meshes.push(dp);
                    }
                  });
                }
                if (isAngle && isCircle) {
                  console.log(thispoint.name, "angle&circle");
                  thispoint.setParent(thisMesh);
                }
                if (isAngle && isXDash) {
                  console.log(thispoint.name, "angle&xdash");
                  angPointContainer.meshes.push(thispoint);
                  console.log("line", XDashName);
                  linesContainer.meshes.forEach(function (dp) {
                    if (dp.name === XDashName) {
                      angLineContainer.meshes.push(dp);
                    }
                  });
                }
                if (isAngle && isYDash) {
                  console.log(thispoint.name, "angle&ydash");
                  angPointContainer.meshes.push(thispoint);
                  console.log("line", YDashName);
                  linesContainer.meshes.forEach(function (dp) {
                    if (dp.name === YDashName) {
                      angLineContainer.meshes.push(dp);
                    }
                  });
                }
                if (isAngle && isXAxis) {
                  console.log(thispoint.name, "angle&ydash");
                  angPointContainer.meshes.push(thispoint);
                }
                if (isAngle && isYAxis) {
                  console.log(thispoint.name, "angle&ydash");
                  angPointContainer.meshes.push(thispoint);
                }
              }
            });

            let thisAngle = thisMesh.metadata.properties.angle;
            let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
              "UI"
            );

            //handle input
            let input = new BABYLON.GUI.InputText();
            input.width = 0.07;
            input.maxWidth = 0.1;
            input.height = "40px";
            input.text = thisAngle.toFixed(2);
            input.color = "white";
            input.background = "green";
            input.left = canvasX;
            input.top = canvasY;
            input.horizontalAlignment =
              BABYLON.GUI.Control.HORIZONTAlALIGNMENT_LEFT;
            input.verticalAlignment =
              BABYLON.GUI.Control.VERTICAlALIGNMENT_TOP;
            input.onKeyboardEventProcessedObservable.add(function (thisKey) {
              if (thisKey.keyCode === 13) { //when enter is pressed
                let newAng = input.text;
                console.log(newAng);
                let angle = BABYLON.Angle.FromDegrees(newAng); //convert input text to radians
                let axis = BABYLON.Axis.Z;

                let quaternion = new BABYLON.Quaternion.RotationAxis(
                  axis,
                  angle.radians()
                );
                thisMesh.rotationQuaternion = quaternion;
                thisMesh.computeWorldMatrix(true);
                quaternion = new BABYLON.Quaternion.RotationAxis( //make the angled element roratable
                  axis,
                  angle.radians()
                );

                let diff = angle.degrees() + 90;
                let perpAng = new BABYLON.Angle.FromDegrees(diff);
                let quaternion2 = new BABYLON.Quaternion.RotationAxis( //roatation for perp
                  axis,
                  perpAng.radians()
                );
                angPerpContainer.meshes.forEach(function (ap) {
                  ap.rotationQuaternion = quaternion2;
                });
                quaternion2 = new BABYLON.Quaternion.RotationAxis(
                  axis,
                  perpAng.radians()
                );
                
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  globalRay,
                  scene,
                  BABYLON.Color3.Green()
                );

                showRay.attachToMesh(
                  thisMesh,
                  new BABYLON.Vector3(1, 0, 0),
                  thisMesh.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );

                
                //---------------------Parent---------------------

                let thisMeshCounts = angLineContainer.meshes.concat(originlinesContainer.meshes);
                let thisIntersect = globalRay.intersectsMeshes(
                  thisMeshCounts
                );
                thisIntersect.forEach(function (ints) { //for each intersection
                  let mp = ints.pickedPoint;
                  let mm = ints.pickedMesh;
                  angPointContainer.meshes.forEach(function (ap) { //for each point in ang elements
                    ap.metadata.based_on.forEach(function (apb) {
                      if (apb.name === mm.name) {
                        ap.position = mp;
                        ap.metadata.position = mp;
                        ap.computeWorldMatrix();
                      }
                    });
                  });
                });

                angMap.set(thisMesh.name, angle);
                thisMesh.metadata.properties.angle = Number(newAng);
                angleView.innerHTML = "Angle: " + angle.degrees().toFixed(2);

                input.dispose();
              }
            });
            advancedTexture.addControl(input);
          }
          if (thisMesh.name.includes("Circle")) {
            //get userInput
            //get parent
            //get children
            //set parent to null
            //set children parent to null
            //dispose thisMesh
            //recreate thisMesh with userInput specified
            //set parent back
            //set descendants back
            let radius = thisMesh.metadata.properties.radius;
            let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
              "UI"
            );
            let input = new BABYLON.GUI.InputText();
            input.width = 0.07;
            input.maxWidth = 0.1;
            input.height = "40px";
            input.text = radius.toFixed(2);
            input.color = "white";
            input.background = "green";
            input.left = canvasX;
            input.top = canvasY;
            input.horizontalAlignment =
              BABYLON.GUI.Control.HORIZONTAlALIGNMENT_LEFT;
            input.verticalAlignment = BABYLON.GUI.Control.VERTICAlALIGNMENT_TOP;
            input.onKeyboardEventProcessedObservable.add(function (thisKey) {
              if (thisKey.keyCode === 13) {
                (input.text);
                let thisName = thisMesh.name;
                let thisParent = thisMesh.parent;
                let thisMeta = thisMesh.metadata;
                let pointx2 = thisParent.metadata.position.x;
                let pointy2 = thisParent.metadata.position.y;
                let thisChildren = thisMesh.getChildMeshes(true);
                let disc = BABYLON.Mesh.CreateDisc(
                  "temp",
                  thisMesh.metadata.properties.radius,
                  64,
                  scene
                );
                disc.position.x = pointx2;
                disc.position.y = pointy2;
                disc.visibility = 0;

                pointsContainer.meshes.forEach(function (p) {
                  p.metadata.based_on.forEach(function (b) {
                    drawCircleContainer.meshes.forEach(function (dm) {
                      if (b.name === dm.name) {
                        p.setParent(dm);
                      }
                    });
                    if (b.name === thisMesh.name) {
                      //set p.parent to disc
                      p.setParent(disc);
                    }
                  });
                });
                ("parent/Child", thisParent.name, thisChildren);
                thisMesh.setParent(null);
                thisChildren.forEach(function (c) {
                  c.setParent(null);
                });

                drawCircleContainer.meshes.push(
                  drawCircleContainer.meshes.splice(
                    drawCircleContainer.meshes.indexOf(thisMesh),
                    1
                  )[0]
                );
                drawCircleContainer.meshes.pop();
                thisMesh.dispose();

                let rad = parseFloat(input.text);
                radiusView.innerHTML = "" + rad.toFixed(2);
                let sides = rad * 10;
                let circle = BABYLON.Polygon.Circle(
                  rad,
                  pointx2,
                  pointy2,
                  sides
                );
                let vector3 = [];
                circle.forEach(function (val) {
                  vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                });
                vector3.push(vector3[0]);
                let firstx = vector3[0].x;
                let firsty = vector3[0].y;
                let lastx = vector3[vector3.length - 2].x;
                let lasty = vector3[vector3.length - 2].y;
                let distance = Math.sqrt(
                  Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                );
                if (distance > 0.05) {
                  if (distance < 0.15) {
                    //("big gap");
                    sides = sides * 2;
                    circle = BABYLON.Polygon.Circle(
                      rad,
                      pointx2,
                      pointy2,
                      sides
                    );
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else if (distance >= 0.15 && distance < 0.3) {
                    //("big gap2");
                    sides = sides * 3;
                    circle = BABYLON.Polygon.Circle(
                      rad,
                      pointx2,
                      pointy2,
                      sides
                    );
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else if (distance >= 0.3 && distance < 0.4) {
                    //("big gap");
                    sides = sides * 3;
                    circle = BABYLON.Polygon.Circle(
                      rad,
                      pointx2,
                      pointy2,
                      sides
                    );
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else if (distance >= 0.4 && distance < 0.5) {
                    //console.log("big gap5");
                    sides = sides * 4;
                    circle = BABYLON.Polygon.Circle(
                      rad,
                      pointx2,
                      pointy2,
                      sides
                    );
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  } else {
                    //console.log("big gap6");
                    sides = sides * 5;
                    circle = BABYLON.Polygon.Circle(
                      rad,
                      pointx2,
                      pointy2,
                      sides
                    );
                    vector3 = [];
                    circle.forEach(function (val) {
                      vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                    });
                    vector3.push(vector3[0]);
                    firstx = vector3[0].x;
                    firsty = vector3[0].y;
                    lastx = vector3[vector3.length - 2].x;
                    lasty = vector3[vector3.length - 2].y;
                    distance = Math.sqrt(
                      Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                    );
                  }
                }
                disc.scaling = new BABYLON.Vector3(
                  rad / radius,
                  rad / radius,
                  1.0
                );
                let discChildren = disc.getChildMeshes(true);
                discChildren.forEach(function (dc) {
                  dc.setParent(null);
                  dc.scaling = new BABYLON.Vector3(1.0, 1.0, 1.0);
                });
                let newMesh = BABYLON.Mesh.CreateDashedLines(
                  thisName,
                  vector3,
                  dashLength - 0.1,
                  dashGap,
                  sides + 1,
                  scene
                );
                newMesh.color = BABYLON.Color3.Red();
                newMesh.setParent(thisParent);
                thisChildren.forEach(function (c) {
                  c.setParent(newMesh);
                });
                disc.dispose();
                newMesh.metadata = thisMeta;
                newMesh.metadata.properties.radius = rad;
                drawCircleContainer.meshes.push(newMesh);
                newMesh.actionManager = new BABYLON.ActionManager(scene);
                newMesh.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      newMesh.color = new BABYLON.Color3(
                        144 / 255,
                        217 / 255,
                        222 / 255
                      );
                    }
                  )
                );
                newMesh.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      newMesh.color = BABYLON.Color3.Red();
                    }
                  )
                );
                drawCircleContainer.meshes.forEach(function (a) {
                  console.log("circleContainer", a.name);
                  pointsContainer.meshes.forEach(function (p) {
                    if (a.metadata.based_on[0].name === p.name) {
                      a.setParent(p);
                    }
                  });
                });

                pointsContainer.meshes.forEach(function (np) {
                  np.setParent(null);
                  let newPos = np.getBoundingInfo().boundingBox.centerWorld;
                  np.metadata.position = newPos;
                  let ray = BABYLON.Ray.CreateNewFromTo(
                    new BABYLON.Vector3(newPos.x, newPos.y, 5),
                    new BABYLON.Vector3(newPos.x, newPos.y, -5)
                  );
                  let showRay = BABYLON.RayHelper.CreateAndShow(
                    ray,
                    scene,
                    BABYLON.Color3.Green()
                  );
                  let intersect = ray.intersectsMeshes(
                    linesContainer.meshes.concat(
                      originlinesContainer.meshes.concat(
                        drawCircleContainer.meshes
                      )
                    )
                  );
                  if (intersect.length < 2) {
                    np.setEnabled(false);
                    np.dispose();
                  }
                  showRay.dispose();
                });
                input.dispose();
              }
            });
            advancedTexture.addControl(input);
          }
        }
      };
      scene.onPointerMove = function (evt, pickInfo) {
        if (pickInfo.hit) {
          let px = pickInfo.pickedPoint.x;
          let py = pickInfo.pickedPoint.y;
          coordinates.innerHTML =
            "X:" + px.toFixed(2) + " " + "Y:" + py.toFixed(2);
        }
      };
    } else if (conMode === 3) {
      linesContainer.meshes.forEach(function (thisMesh) {
        thisMesh.isPickable = true;
      });
      let disc;
      let discRad = 0;
      let angleView = document.getElementById("angle");
      let radiusView = document.getElementById("radius");

      let globalrad2 = 0;
      let oldAng = 0;
      let moveMeshContainer = new BABYLON.AssetContainer(scene);
      let moveMeshContainer2 = new BABYLON.AssetContainer(scene);
      let movepointContainer2 = new BABYLON.AssetContainer(scene);
      let moveMeshContainer3 = new BABYLON.AssetContainer(scene);
      let movepointContainer3 = new BABYLON.AssetContainer(scene);
      let thisTempContainer = new BABYLON.AssetContainer(scene);
      let cpointTempContainer = new BABYLON.AssetContainer(scene);
      let cpointCloneTempContainer = new BABYLON.AssetContainer(scene);
      let circleTempContainer = new BABYLON.AssetContainer(scene);
      let angPointContainer = new BABYLON.AssetContainer(scene);
      let angLineContainer = new BABYLON.AssetContainer(scene);
      let angPerpContainer = new BABYLON.AssetContainer(scene);
      let drawnLineTempContainer = new BABYLON.AssetContainer(scene);
      let drawnLinePointTempContainer = new BABYLON.AssetContainer(scene);
      let disposeTempContainer = new BABYLON.AssetContainer(scene);
      let angCircleContainer = new BABYLON.AssetContainer(scene);
      let angCirclePointsContainer = new BABYLON.AssetContainer(scene);
      let ACContainer = new BABYLON.AssetContainer(scene);
      let ACPContainer = new BABYLON.AssetContainer(scene);
      let movement = false;
      let movingMesh = null;
      let theParent = null;
      let pointx2 = 0;
      let pointy2 = 0;
      let circleMeta = null;
      let dashLength = 0.2;
      let dashGap = 0.03;
      let globalRay = BABYLON.Ray.Zero();
      let ACRay = BABYLON.Ray.Zero();
      let ACRay2 = BABYLON.Ray.Zero();
      scene.onPointerDown = function (evt, pickInfo) {
        if (pickInfo.hit) {
          pointsContainer.meshes.forEach(function (p) {
            p.setParent(null);
          });
          let thisMesh = pickInfo.pickedMesh;
          console.log(thisMesh.name);
          if (movement === false) {
            let dltLen = drawnLineTempContainer.meshes.length;
            if (dltLen > 0) {
              for (let i = 0; i < dltLen; i++) {
                drawnLineTempContainer.meshes.pop();
              }
            }
            let drawlineLength = drawnLineContainer.meshes.length;
            console.log(drawlineLength);
            if (drawlineLength > 0) {
              drawnLineContainer.meshes.forEach(function (dlc) {
                console.log(dlc.name);
                //dlc.material=lightgray;
                drawnLineTempContainer.meshes.push(dlc);
              });
              console.log(drawnLineTempContainer.meshes.length);

              pointsContainer.meshes.forEach(function (p) {
                drawnLineTempContainer.meshes.forEach(function (dlt) {
                  if (dlt.name.includes("arc")) {
                    let exist = false;
                    if (
                      p.name === dlt.metadata.based_on.point1 ||
                      p.name === dlt.metadata.based_on.point2 ||
                      p.name === dlt.metadata.based_on.point3
                    ) {
                      drawnLinePointTempContainer.meshes.forEach(function (
                        dlpt
                      ) {
                        if (p.name === dlpt.name) {
                          exist = true;
                          console.log(p.name, "already exist");
                        }
                      });
                      if (exist === false) {
                        console.log("adding", p.name);
                        drawnLinePointTempContainer.meshes.push(p);
                      }
                    }
                  } else {
                    let exist = false;
                    if (
                      p.name === dlt.metadata.based_on.point1 ||
                      p.name === dlt.metadata.based_on.point2
                    ) {
                      drawnLinePointTempContainer.meshes.forEach(function (
                        dlpt
                      ) {
                        if (p.name === dlpt.name) {
                          exist = true;
                          console.log(p.name, "already exist");
                        }
                      });
                      if (exist === false) {
                        console.log("adding", p.name);
                        drawnLinePointTempContainer.meshes.push(p);
                      }
                    }
                  }
                });
              });
            }

            if (thisMesh.name.includes("YDash")) {
              let myParent = thisMesh.parent;
              console.log(myParent);
              /* let myChildren = thisMesh.getChildMeshes();
                            myChildren.forEach(function(meshy){
                                if(meshy.name.includes("Point")){
                                    meshy.dispose();
                                }
                            });*/
              if (myParent != null) {
                parentContainer.meshes.push(myParent);
                thisMesh.setParent(null);
              }
              moveMeshContainer.meshes.push(thisMesh);
              movement = true;

              pointsContainer.meshes.forEach(function (p) {
                p.metadata.based_on.forEach(function (pm) {
                  if (pm.name === thisMesh.name) {
                    console.log(p.name);
                    movepointContainer2.meshes.push(p);
                  }
                  if (pm.name.includes("Circle")) {
                    console.log(pm.name, p.name);
                    drawCircleContainer.meshes.forEach(function (dc) {
                      if (pm.name === dc.name) {
                        p.setParent(dc);
                      }
                    });
                  }
                });
                linesContainer.meshes.forEach(function (ln) {
                  if (ln.name.includes("perp")) {
                    if (ln.parent.name === p.name) {
                      console.log(ln.parent.name, p.name);
                      moveMeshContainer2.meshes.push(ln);
                      pointsContainer.meshes.forEach(function (pmthis) {
                        if (
                          pmthis.metadata.based_on[0].name === ln.name ||
                          pmthis.metadata.based_on[1].name === ln.name
                        ) {
                          console.log(ln.name, pmthis.name);
                          movepointContainer2.meshes.push(pmthis);
                        }
                      });
                    }
                  }
                });
              });
              let child = thisMesh.getChildMeshes();
              let childLength = child.length;

              if (childLength > 0) {
                child.forEach(function (c) {
                  console.log(c.name);
                  moveMeshContainer3.meshes.push(c);
                  pointsContainer.meshes.forEach(function (pmthis) {
                    if (
                      pmthis.metadata.based_on[0].name === c.name ||
                      pmthis.metadata.based_on[1].name === c.name
                    ) {
                      console.log(c.name, pmthis.name);
                      movepointContainer3.meshes.push(pmthis);
                    }
                  });
                });
              }
            } else if (thisMesh.name.includes("XDash")) {
              let myParent = thisMesh.parent;
              /*let myChildren = thisMesh.getChildMeshes();
                            myChildren.forEach(function(meshy){
                                if(meshy.name.includes("Point")){
                                    meshy.dispose();
                                }
                            });*/
              if (myParent != null) {
                parentContainer.meshes.push(myParent);
                thisMesh.setParent(null);
              }
              moveMeshContainer.meshes.push(thisMesh);
              movement = true;

              pointsContainer.meshes.forEach(function (p) {
                p.setParent(null);
                p.metadata.based_on.forEach(function (pm) {
                  if (pm.name === thisMesh.name) {
                    console.log(p.name);
                    movepointContainer2.meshes.push(p);
                  }
                  if (pm.name.includes("Circle")) {
                    console.log(pm.name, p.name);
                    drawCircleContainer.meshes.forEach(function (dc) {
                      if (pm.name === dc.name) {
                        p.setParent(dc);
                      }
                    });
                  }
                });
                linesContainer.meshes.forEach(function (ln) {
                  if (ln.name.includes("perp")) {
                    if (ln.parent.name === p.name) {
                      console.log(ln.parent.name, p.name);
                      moveMeshContainer2.meshes.push(ln);
                      pointsContainer.meshes.forEach(function (pmthis) {
                        if (
                          pmthis.metadata.based_on[0].name === ln.name ||
                          pmthis.metadata.based_on[1].name === ln.name
                        ) {
                          console.log(ln.name, pmthis.name);
                          movepointContainer2.meshes.push(pmthis);
                        }
                      });
                    }
                  }
                });
              });
              let child = thisMesh.getChildMeshes();
              let childLength = child.length;

              if (childLength > 0) {
                child.forEach(function (c) {
                  console.log(c.name);
                  moveMeshContainer3.meshes.push(c);
                  pointsContainer.meshes.forEach(function (pmthis) {
                    if (
                      pmthis.metadata.based_on[0].name === c.name ||
                      pmthis.metadata.based_on[1].name === c.name
                    ) {
                      console.log(c.name, pmthis.name);
                      movepointContainer3.meshes.push(pmthis);
                    }
                  });
                });
              }
            } else if (thisMesh.name.includes("ang")) {
              let tempContainer = new BABYLON.AssetContainer(scene);
              let myParent = thisMesh.parent;
              if (myParent != null) {
                parentContainer.meshes.push(myParent);
                thisMesh.setParent(null);
              }
              prevx = thisMesh.position.x;
              prevy = thisMesh.position.y;
              let angle = BABYLON.Angle.BetweenTwoPoints(
                new BABYLON.Vector2(prevx, prevy),
                new BABYLON.Vector2(
                  pickInfo.pickedPoint.x,
                  pickInfo.pickedPoint.y
                )
              );
              //console.log(angle.degrees());
              pointsContainer.meshes.forEach(function (thispoint) {
                //thispoint.setParent(null);
                let thispdata = thispoint.metadata;
                let basedon = thispdata.based_on;
                let isAngle = false;
                let isPerp = false;
                let PerpName = "";
                let isCircle = false;
                let isCircleName = "";
                let isXDash = false;
                let XDashName = "";
                let isYDash = false;
                let YDashName = "";
                basedon.forEach(function (based) {
                  let bname = based.name;
                  if (bname === thisMesh.name) {
                    isAngle = true;
                    //console.log(thispoint.name,"based on",bname);
                  }
                  if (bname.includes("Circle")) {
                    isCircle = true;
                    //console.log(thispoint.name,"based on",bname);
                    isCircleName = bname;
                    drawCircleContainer.meshes.forEach(function (dc) {
                      if (bname === dc.name) {
                        //thispoint.setParent(dc);
                      }
                    });
                  }
                  if (bname.includes("XDash")) {
                    isXDash = true;
                    XDashName = bname;
                  }
                  if (bname.includes("YDash")) {
                    isYDash = true;
                    YDashName = bname;
                  }
                  if (bname.includes("perp")) {
                    isPerp = true;
                    PerpName = bname;
                  }
                });
                if (isAngle && isCircle) {
                  //thispoint.setParent(null);
                  console.log(thispoint.name, "angle&circle", isCircleName);
                  //thispoint.setParent(thisMesh);
                  drawCircleContainer.meshes.forEach(function (dc) {
                    if (dc.name === isCircleName) {
                      let dcp = dc.parent;
                      //console.log(thispoint.name,dcp.name);
                      if (
                        dcp.metadata.based_on[0].name.includes("Circle") ||
                        dcp.metadata.based_on[1].name.includes("Circle")
                      ) {
                        thispoint.setParent(thisMesh);
                        dcp.setParent(thisMesh);
                      }
                      if (
                        dcp.metadata.based_on[0].name === "X" ||
                        dcp.metadata.based_on[1].name === "Y"
                      ) {
                        thispoint.setParent(thisMesh);
                      }
                    }
                  });
                }
                if (isAngle && isXDash) {
                  console.log(thispoint.name, "angle&xdash");
                  angPointContainer.meshes.push(thispoint);
                  console.log("line", XDashName);
                  linesContainer.meshes.forEach(function (dp) {
                    if (dp.name === XDashName) {
                      angLineContainer.meshes.push(dp);
                    }
                  });
                  drawCircleContainer.meshes.forEach(function (dc) {
                    if (dc.parent.name === thispoint.name) {
                      console.log(dc.name);
                      ACContainer.meshes.push(dc);
                      pointsContainer.meshes.forEach(function (p) {
                        if (
                          (p.metadata.based_on[0].name === dc.name &&
                            p.metadata.based_on[1].name === XDashName) ||
                          (p.metadata.based_on[1].name === dc.name &&
                            p.metadata.based_on[0].name === XDashName)
                        ) {
                          console.log(p.name);
                          p.setParent(dc);
                        }
                        if (
                          (p.metadata.based_on[0].name === dc.name &&
                            p.metadata.based_on[1].name === thisMesh.name) ||
                          (p.metadata.based_on[1].name === dc.name &&
                            p.metadata.based_on[0].name === thisMesh.name)
                        ) {
                          console.log(p.name);
                          p.setParent(null);
                          linesContainer.meshes.forEach(function (lc) {
                            if (lc.name.includes("perp")) {
                              if (lc.parent.name === p.name) {
                                console.log(lc.name);
                                angPerpContainer.meshes.push(lc);
                              }
                            }
                          });
                          let showRay = BABYLON.RayHelper.CreateAndShow(
                            ACRay,
                            scene,
                            BABYLON.Color3.Green()
                          );
                          showRay.attachToMesh(
                            thisMesh,
                            new BABYLON.Vector3(1, 0, 0),
                            thisMesh.getBoundingInfo().boundingBox.minimum,
                            size * 2
                          );
                          let showRay2 = BABYLON.RayHelper.CreateAndShow(
                            ACRay2,
                            scene,
                            BABYLON.Color3.Gray()
                          );
                          showRay2.attachToMesh(
                            thisMesh,
                            new BABYLON.Vector3(-1, 0, 0),
                            thisMesh.getBoundingInfo().boundingBox.maximum,
                            size * 2
                          );
                          ACPContainer.meshes.push(p);
                          showRay.hide();
                          showRay2.hide();
                        }
                      });
                    }
                  });
                }
                if (isAngle && isYDash) {
                  console.log(thispoint.name, "angle&ydash");
                  angPointContainer.meshes.push(thispoint);
                  console.log("line", YDashName);
                  linesContainer.meshes.forEach(function (dp) {
                    if (dp.name === YDashName) {
                      angLineContainer.meshes.push(dp);
                    }
                  });
                  drawCircleContainer.meshes.forEach(function (dc) {
                    if (dc.parent.name === thispoint.name) {
                      console.log(dc.name);
                      ACContainer.meshes.push(dc);
                      pointsContainer.meshes.forEach(function (p) {
                        if (
                          (p.metadata.based_on[0].name === dc.name &&
                            p.metadata.based_on[1].name === YDashName) ||
                          (p.metadata.based_on[1].name === dc.name &&
                            p.metadata.based_on[0].name === YDashName)
                        ) {
                          console.log(p.name);
                          p.setParent(dc);
                        }
                        if (
                          (p.metadata.based_on[0].name === dc.name &&
                            p.metadata.based_on[1].name === thisMesh.name) ||
                          (p.metadata.based_on[1].name === dc.name &&
                            p.metadata.based_on[0].name === thisMesh.name)
                        ) {
                          console.log(p.name);
                          p.setParent(null);
                          linesContainer.meshes.forEach(function (lc) {
                            if (lc.name.includes("perp")) {
                              if (lc.parent.name === p.name) {
                                console.log(lc.name);
                                angPerpContainer.meshes.push(lc);
                              }
                            }
                          });
                          let showRay = BABYLON.RayHelper.CreateAndShow(
                            ACRay,
                            scene,
                            BABYLON.Color3.Green()
                          );
                          showRay.attachToMesh(
                            thisMesh,
                            new BABYLON.Vector3(1, 0, 0),
                            thisMesh.getBoundingInfo().boundingBox.minimum,
                            size * 2
                          );
                          let showRay2 = BABYLON.RayHelper.CreateAndShow(
                            ACRay2,
                            scene,
                            BABYLON.Color3.Gray()
                          );
                          showRay2.attachToMesh(
                            thisMesh,
                            new BABYLON.Vector3(-1, 0, 0),
                            thisMesh.getBoundingInfo().boundingBox.maximum,
                            size * 2
                          );
                          ACPContainer.meshes.push(p);
                          showRay.hide();
                          showRay2.hide();
                        }
                      });
                    }
                  });
                }
                if (isAngle && isPerp) {
                  console.log(thispoint.name, "angle&perp");
                  angPointContainer.meshes.push(thispoint);
                  console.log("line", PerpName);
                  linesContainer.meshes.forEach(function (dp) {
                    if (dp.name === PerpName) {
                      angLineContainer.meshes.push(dp);
                    }
                  });
                }
                if (isAngle) {
                  //check for c2c
                  drawCircleContainer.meshes.forEach(function (dl) {
                    if (dl.parent.name === thispoint.name) {
                      //console.log(dl.name,thispoint.name);
                      //angCircleContainer.meshes.push(dl);
                      pointsContainer.meshes.forEach(function (ap) {
                        if (
                          ap.metadata.based_on[0].name === dl.name ||
                          ap.metadata.based_on[1].name === dl.name
                        ) {
                          //point on this circle
                          if (
                            ap.metadata.based_on[0].name === thisMesh.name ||
                            ap.metadata.based_on[1].name === thisMesh.name
                          ) {
                            //if point on circle and this angle line
                          } else if (
                            ap.metadata.based_on[0].name.includes("Circle") &&
                            ap.metadata.based_on[1].name.includes("Circle")
                          ) {
                            console.log(ap.name, dl.name);
                            ap.setParent(dl);
                            console.log(ap.name, ap.parent.name);
                            angCirclePointsContainer.meshes.push(ap);
                          } else {
                            console.log(ap.name);
                            //angCirclePointsContainer.meshes.push(ap);
                            //send their meshes also
                          }
                        }
                      });
                    }
                  });
                }
              });
              let pContainer = new BABYLON.AssetContainer(scene);
              oldAng = thisMesh.metadata.properties.angle;
              linesContainer.meshes.forEach(function (lmp) {
                if (lmp.name.includes("perp")) {
                  if (
                    lmp.parent.metadata.based_on[0].name === thisMesh.name ||
                    lmp.parent.metadata.based_on[1].name === thisMesh.name
                  ) {
                    if (
                      lmp.metadata.based_on.name === thisMesh.name &&
                      lmp.metadata.tangent.name === ""
                    ) {
                      angPerpContainer.meshes.push(lmp);
                    }
                    if (
                      lmp.metadata.based_on.name.includes("X") ||
                      lmp.metadata.based_on.name.includes("Y")
                    ) {
                      console.log(lmp.name);
                      pContainer.meshes.push(lmp);
                    }
                  }
                }
              });
              if (pContainer.meshes.length > 0) {
                for (let i = 0; i < pContainer.meshes.length; i++) {
                  let pmesh = pContainer.meshes.pop();
                  console.log(pmesh.name);
                  pointsContainer.meshes.forEach(function (p) {
                    p.metadata.based_on.forEach(function (pm) {
                      if (pm.name === pmesh.name) {
                        p.setParent(pmesh);
                        console.log(p.name, pmesh.name);
                      }
                    });
                  });
                }
              }
              let showRay = BABYLON.RayHelper.CreateAndShow(
                globalRay,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                thisMesh,
                new BABYLON.Vector3(1, 0, 0),
                thisMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              showRay.hide();
              moveMeshContainer.meshes.push(thisMesh);
              movement = true;

              linesContainer.meshes.forEach(function (p) {
                if (p.name.includes("perp")) {
                  if (p.metadata.based_on.name === thisMesh.name) {
                    console.log(p.name);
                    moveMeshContainer2.meshes.push(p);
                    pointsContainer.meshes.forEach(function (pp) {
                      pp.metadata.based_on.forEach(function (ppm) {
                        if (ppm.name === p.name) {
                          //console.log(pp.name);
                          movepointContainer2.meshes.push(pp);
                        }
                      });
                    });
                  }
                }
              });
              /*let child=thisMesh.getChildMeshes();
                            let childLength = child.length;
                            
                            if (childLength>0){
                                child.forEach(function(c){
                                    console.log(c.name);
                                    moveMeshContainer3.meshes.push(c);
                                    pointsContainer.meshes.forEach(function(pmthis){
                                        if(pmthis.metadata.based_on[0].name===c.name ||pmthis.metadata.based_on[1].name===c.name){
                                            //console.log(c.name,pmthis.name);
                                            tempContainer.meshes.forEach(function(p){
                                                if(p.name===pmthis.name){
                                                    //do nothing
                                                    console.log(c.name,pmthis.name);
                                                }
                                                else{
                                                    movepointContainer3.meshes.push(pmthis);
                                                }
                                            });
                                            //movepointContainer3.meshes.push(pmthis);
                                        }
                                    });
                                })
                            }*/
            } else if (thisMesh.name.includes("perp")) {
              if (thisMesh.name.includes("perpDashC")) {
                let myParent = thisMesh.parent;
                if (myParent != null) {
                  parentContainer.meshes.push(myParent);
                  thisMesh.setParent(null);
                }
                moveMeshContainer.meshes.push(thisMesh);
                movement = true;
              } else {
                alert("Perpendicular lines can't be modified");
                movement = false;
              }
            } else if (thisMesh.name.includes("Circle")) {
              pointsContainer.meshes.forEach(function (p) {
                p.setParent(null);
              });
              let myParent = thisMesh.parent;
              if (myParent != null) {
                parentContainer.meshes.push(myParent);
                thisMesh.setParent(null);
              }
              let data = thisMesh.metadata;
              let name = data.based_on[0].name;
              circleMeta = data;
              console.log("basedon", name);

              discRad = thisMesh.metadata.properties.radius;
              disc = BABYLON.Mesh.CreateDisc("temp", discRad, 64, scene);
              disc.visibility = 0;

              pointsContainer.meshes.forEach(function (obj) {
                if (obj.name === name) {
                  //place disc at selected circle
                  let newData = obj.metadata;
                  pointx2 = newData.position.x;
                  pointy2 = newData.position.y;
                  disc.position.x = pointx2;
                  disc.position.y = pointy2;
                }
                obj.metadata.based_on.forEach(function (met) {
                  //each points
                  if (met.name === thisMesh.name) {
                    //check if this point has connection to current circle
                    console.log("connected", obj.name);
                    // obj.setParent(disc);

                    if (
                      obj.metadata.based_on[0].name.includes("Circle") &&
                      obj.metadata.based_on[1].name.includes("Circle")
                    ) {
                      //dont clone other circle points
                      console.log(obj.name, "dont clone this");
                    } else {
                      let objkids = obj.getChildMeshes();
                      objkids.forEach(function (pcc) {
                        pcc.setParent(null);
                      });

                      let pclone = obj.clone(obj.name);
                      pclone.setParent(disc);
                      pclone.visibility = 0;
                      //pclone.material=green;
                      cpointCloneTempContainer.meshes.push(pclone);
                      cpointTempContainer.meshes.push(obj);

                      objkids.forEach(function (pcc) {
                        pcc.setParent(obj);
                      });

                      let pcChild = pclone.getChildMeshes();
                      pcChild.forEach(function (pcc) {
                        pcc.setParent(null);
                      });
                    }

                    drawCircleContainer.meshes.forEach(function (ct) {
                      if (ct.metadata.based_on[0].name === obj.name) {
                        //console.log("circle",ct,"should move");
                        //circleTempContainer.meshes.push(ct);

                        pointsContainer.meshes.forEach(function (cp) {
                          if (
                            cp.metadata.based_on[0].name === ct.name ||
                            cp.metadata.based_on[1].name === ct.name
                          ) {
                            console.log(cp.name, "set parent to", ct.name);
                            cp.setParent(ct);
                            linesContainer.meshes.forEach(function (ln) {
                              if (ln.name.includes("perp")) {
                                //console.log(fp.name,fp.parent.name);
                                if (ln.parent.name === cp.name) {
                                  console.log(cp.name, ln.name);
                                  moveMeshContainer2.meshes.push(ln);
                                  pointsContainer.meshes.forEach(function (
                                    pmthis
                                  ) {
                                    if (
                                      pmthis.metadata.based_on[0].name ===
                                        ln.name ||
                                      pmthis.metadata.based_on[1].name ===
                                        ln.name
                                    ) {
                                      console.log(ln.name, pmthis.name);
                                      movepointContainer2.meshes.push(pmthis);
                                    }
                                  });
                                }
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              });
              cpointTempContainer.meshes.forEach(function (p) {
                //console.log(p.name);
                linesContainer.meshes.forEach(function (ln) {
                  if (ln.name.includes("perp")) {
                    if (ln.parent.name === p.name) {
                      console.log(ln.parent.name, p.name);
                      moveMeshContainer2.meshes.push(ln);
                      pointsContainer.meshes.forEach(function (pmthis) {
                        if (
                          pmthis.metadata.based_on[0].name === ln.name ||
                          pmthis.metadata.based_on[1].name === ln.name
                        ) {
                          console.log(ln.name, pmthis.name);
                          movepointContainer2.meshes.push(pmthis);
                        }
                      });
                    }
                  }
                });
              });
              console.log("midpoint", pointx2, pointy2);
              thisTempContainer.meshes.push(thisMesh);
              moveMeshContainer.meshes.push(thisMesh);
              movement = true;
            } else {
              movement = false;
            }
          } else {
            if (movingMesh != null && theParent != null) {
              console.log(movingMesh.name, theParent.name);
              movingMesh.setParent(theParent);
            }
            movement = false;
          }
        } //pickhit

        if (movement) {
          movingMesh = moveMeshContainer.meshes.pop();
          theParent = parentContainer.meshes.pop();
        } else {
          function rightclick() {
            //conmode===3
            var rightclick;
            var e = window.event;
            if (e.which) {
              rightclick = e.which == 3;
            } else if (e.button) {
              rightclick = e.button == 2;
            } // true or false, you can trap right click here by if comparison
            //console.log(rightclick);
            if (rightclick === false && movingMesh != null) {
              console.log("halt");
              let globalMesh;
              pointsContainer.meshes.forEach(function (tp) {
                tp.setParent(null);
              });
              for (let i = 0; i < cpointCloneTempContainer.meshes.length; i++) {
                let cpp = cpointCloneTempContainer.meshes.pop();
                cpp.dispose();
              }

              if (disc != undefined || disc != null) disc.dispose();
              disc = null;
              pointsContainer.meshes.forEach(function (thisPoint) {
                let newPos = thisPoint.getBoundingInfo().boundingBox
                  .centerWorld;
                thisPoint.metadata.position = newPos;
                //console.log(thisPoint.name,newPos);
                if (
                  thisPoint.metadata.position.x.toFixed(2) !=
                    newPos.x.toFixed(2) &&
                  thisPoint.metadata.position.y.toFixed(2) !=
                    newPos.y.toFixed(2)
                ) {
                  //console.log(thisPoint.name,"parent",thisPoint.parent.name);
                  let thisMesh = thisPoint;
                  let data = thisMesh.metadata;
                  if (data != null) {
                    data.position = newPos;
                    let name = data.identity.name;
                    let position = data.position;
                    let properties = data.properties;
                    let basedOn = data.based_on;
                    console.log(data);
                    //console.log("name",name,"position",position,"properties",properties,"based_on",basedOn);
                  }
                } //point
                if (movingMesh.name.includes("Circle")) {
                  if (
                    thisPoint.metadata.based_on[0].name ===
                      circleMeta.identity.name ||
                    thisPoint.metadata.based_on[1].name ===
                      circleMeta.identity.name
                  ) {
                    //console.log(thisPoint.name);
                    //thisPoint.scaling=new BABYLON.Vector3(1.0,1.0,1.0);
                    //cpointTempContainer.meshes.push(thisPoint);
                  } else {
                    let ray = BABYLON.Ray.CreateNewFromTo(
                      new BABYLON.Vector3(newPos.x, newPos.y, 5),
                      new BABYLON.Vector3(newPos.x, newPos.y, -5)
                    );
                    let showRay = BABYLON.RayHelper.CreateAndShow(
                      ray,
                      scene,
                      BABYLON.Color3.Green()
                    );
                    let intersect = ray.intersectsMeshes(
                      linesContainer.meshes.concat(
                        originlinesContainer.meshes.concat(
                          drawCircleContainer.meshes
                        )
                      )
                    );
                    //console.log(thisPoint.name,intersect.length);
                    //console.log(newPos, intersect);
                    if (intersect.length < 2) {
                      thisPoint.setEnabled(false);
                      thisPoint.dispose();
                    }
                    showRay.dispose();
                  }
                } else {
                  let ray = BABYLON.Ray.CreateNewFromTo(
                    new BABYLON.Vector3(newPos.x, newPos.y, 5),
                    new BABYLON.Vector3(newPos.x, newPos.y, -5)
                  );
                  let showRay = BABYLON.RayHelper.CreateAndShow(
                    ray,
                    scene,
                    BABYLON.Color3.Green()
                  );
                  let intersect = ray.intersectsMeshes(
                    linesContainer.meshes.concat(
                      originlinesContainer.meshes.concat(
                        drawCircleContainer.meshes
                      )
                    )
                  );
                  //console.log(thisPoint.name,intersect.length);
                  //console.log(newPos, intersect);
                  if (intersect.length < 2) {
                    // thisPoint.setEnabled(false);
                    //thisPoint.dispose();
                  }
                  showRay.dispose();
                }
              });

              if (movingMesh.name.includes("Circle")) {
                drawCircleContainer.meshes.forEach(function (mycircle) {
                  console.log(mycircle);
                  console.log(circleMeta);
                  if (mycircle.name === circleMeta.identity.name) {
                    //mycircle.dispose();
                    drawCircleContainer.meshes.push(
                      drawCircleContainer.meshes.splice(
                        drawCircleContainer.meshes.indexOf(mycircle),
                        1
                      )[0]
                    );
                  }
                });
                drawCircleContainer.meshes.pop();
                console.log("circle#", drawCircleContainer.meshes.length);
                let modCircle = thisTempContainer.meshes.pop();
                modCircle.metadata = circleMeta;
                modCircle.name = circleMeta.identity.name;
                let raddiff = globalrad - modCircle.metadata.properties.radius;
                console.log(
                  "old rad",
                  modCircle.metadata.properties.radius,
                  "new rad",
                  globalrad,
                  "difference",
                  raddiff
                );
                modCircle.metadata.properties.radius = globalrad;
                let icount = 0;
                let count = 0;
                let prevcpx = 0;
                let prevcpy = 0;
                let pbasedOn = circleMeta.based_on;
                pbasedOn.forEach(function (obj) {
                  console.log(obj?.name);
                  if (obj.name.includes("ang")) {
                    linesContainer.meshes.forEach(function (refMesh) {
                      if (refMesh.name === obj?.name) {
                        console.log(
                          "parent of",
                          modCircle.name,
                          "is",
                          refMesh.name
                        );
                        modCircle.setParent(refMesh);
                      }
                    });
                  }
                });

                modCircle.actionManager = new BABYLON.ActionManager(scene);
                modCircle.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOverTrigger,
                    function () {
                      modCircle.color = new BABYLON.Color3(
                        144 / 255,
                        217 / 255,
                        222 / 255
                      );
                    }
                  )
                );
                modCircle.actionManager.registerAction(
                  new BABYLON.ExecuteCodeAction(
                    BABYLON.ActionManager.OnPointerOutTrigger,
                    function () {
                      modCircle.color = BABYLON.Color3.Red();
                    }
                  )
                );
                drawCircleContainer.meshes.push(modCircle);
              } else if (movingMesh.name.includes("ang")) {
                console.log(movingMesh.name);
                for (let i = 0; i < angLineContainer.meshes.length; i++) {
                  angLineContainer.meshes.pop();
                }
                for (let i = 0; i < angPerpContainer.meshes.length; i++) {
                  angPerpContainer.meshes.pop();
                }
                for (let i = 0; i < angPointContainer.meshes.length; i++) {
                  angPointContainer.meshes.pop();
                }
                for (let i = 0; i < movepointContainer2.meshes.length; i++) {
                  movepointContainer2.meshes.pop();
                }
                for (let i = 0; i < moveMeshContainer2.meshes.length; i++) {
                  moveMeshContainer2.meshes.pop();
                }
                for (let i = 0; i < angCircleContainer.meshes.length; i++) {
                  angCircleContainer.meshes.pop();
                }
                for (
                  let i = 0;
                  i < angCirclePointsContainer.meshes.length;
                  i++
                ) {
                  angCirclePointsContainer.meshes.pop();
                }
                for (let i = 0; i < ACContainer.meshes.length; i++) {
                  ACContainer.meshes.pop();
                }
                for (let i = 0; i < ACPContainer.meshes.length; i++) {
                  ACPContainer.meshes.pop();
                }
                //ACRay.dispose();
                //ACRay2.dispose();
              } else if (movingMesh.name.includes("YDash")) {
                for (let i = 0; i < movepointContainer2.meshes.length; i++) {
                  movepointContainer2.meshes.pop();
                }
                for (let i = 0; i < moveMeshContainer2.meshes.length; i++) {
                  moveMeshContainer2.meshes.pop();
                }
                for (let i = 0; i < movepointContainer3.meshes.length; i++) {
                  movepointContainer3.meshes.pop();
                }
                for (let i = 0; i < moveMeshContainer3.meshes.length; i++) {
                  moveMeshContainer3.meshes.pop();
                }
              } else if (movingMesh.name.includes("XDash")) {
                for (let i = 0; i < movepointContainer2.meshes.length; i++) {
                  movepointContainer2.meshes.pop();
                }
                for (let i = 0; i < moveMeshContainer2.meshes.length; i++) {
                  moveMeshContainer2.meshes.pop();
                }
                for (let i = 0; i < movepointContainer3.meshes.length; i++) {
                  movepointContainer3.meshes.pop();
                }
                for (let i = 0; i < moveMeshContainer3.meshes.length; i++) {
                  moveMeshContainer3.meshes.pop();
                }
              }
              for (let i = 0; i < circleTempContainer.meshes.length; i++) {
                circleTempContainer.meshes.pop();
              }
              if (movingMesh.name.includes("Circle")) {
                let cirMeshes = drawCircleContainer.meshes;
                console.log(globalMesh);
                for (let i = 0; i < angLineContainer.meshes.length; i++) {
                  angLineContainer.meshes.pop();
                }
                for (let i = 0; i < angPerpContainer.meshes.length; i++) {
                  angPerpContainer.meshes.pop();
                }
                for (let i = 0; i < angPointContainer.meshes.length; i++) {
                  angPointContainer.meshes.pop();
                }
                for (let i = 0; i < movepointContainer2.meshes.length; i++) {
                  movepointContainer2.meshes.pop();
                }
                for (let i = 0; i < moveMeshContainer2.meshes.length; i++) {
                  moveMeshContainer2.meshes.pop();
                }
                for (let i = 0; i < angCircleContainer.meshes.length; i++) {
                  angCircleContainer.meshes.pop();
                }
                for (
                  let i = 0;
                  i < angCirclePointsContainer.meshes.length;
                  i++
                ) {
                  angCirclePointsContainer.meshes.pop();
                }
              }
              let dltLength = drawnLineTempContainer.meshes.length;
              let dltpLength = drawnLinePointTempContainer.meshes.length;
              let disposeLen = disposeTempContainer.meshes.length;
              console.log(dltLength, dltpLength);
              if (dltLength > 0) {
                for (let i = 0; i < dltLength; i++) {
                  drawnLineTempContainer.meshes.pop();
                }
                for (let i = 0; i < dltpLength; i++) {
                  drawnLinePointTempContainer.meshes.pop();
                }
              }
              if (disposeLen > 0) {
                /*for(let i=0;i<disposeLen;i++){
                                    let dm=disposeTempContainer.meshes.pop();
                                    dm.dispose();
                                }*/
                disposeTempContainer.meshes.forEach(function (dis) {
                  let dd;
                  let dd2;
                  drawnLineContainer.meshes.forEach(function (dra) {
                    if (dis.name === dra.name) {
                      dd = dra;
                      dd2 = dis;
                    }
                  });
                  drawnLineContainer.meshes.push(
                    drawnLineContainer.meshes.splice(
                      drawnLineContainer.meshes.indexOf(dd),
                      1
                    )[0]
                  );
                  let tdis = drawnLineContainer.meshes.pop();
                  tdis.dispose();
                  drawnLineContainer.meshes.push(dd2);
                });
              }
            } //rightclick
          }
          rightclick();
          movingMesh = null;
        }
        //console.log("mvmesh",movingMesh);
      }; //pdown
      scene.onPointerMove = function (evt, pickInfo) {
        //conmode===3
        if (pickInfo.hit) {
          let pointx = pickInfo.pickedPoint.x;
          let pointy = pickInfo.pickedPoint.y;
          coordinates.innerHTML ==
            "X:" + pointx.toFixed(2) + " " + "Y:" + pointy.toFixed(2);
          if (movement && movingMesh != null) {
            if (movingMesh.name.includes("ang")) {
              if (movingMesh.name.includes("angMeshC")) {
                movingMesh.position.x = pointx;
                movingMesh.position.y = pointy;
              } else {
                let angle = BABYLON.Angle.BetweenTwoPoints(
                  new BABYLON.Vector2(prevx, prevy),
                  new BABYLON.Vector2(pointx, pointy)
                );
                let axis = BABYLON.Axis.Z;
                let quaternion = new BABYLON.Quaternion.RotationAxis(
                  axis,
                  angle.radians()
                );
                movingMesh.rotationQuaternion = quaternion;
                movingMesh.computeWorldMatrix(true);
                // console.log(oldAng);
                let diff = angle.degrees() + 90;
                let perpAng = new BABYLON.Angle.FromDegrees(diff);
                //console.log(perpAng.degrees());

                let quaternion2 = new BABYLON.Quaternion.RotationAxis(
                  axis,
                  perpAng.radians()
                );
                angPerpContainer.meshes.forEach(function (ap) {
                  ap.rotationQuaternion = quaternion2;
                });
                quaternion = new BABYLON.Quaternion.RotationAxis(
                  axis,
                  angle.radians()
                );
                quaternion2 = new BABYLON.Quaternion.RotationAxis(
                  axis,
                  perpAng.radians()
                );
                //console.log(angle.degrees(),movingMesh.rotation);
                angMap.set(movingMesh.name, angle);
                movingMesh.metadata.properties.angle = Number(angle.degrees());
                angleView.innerHTML = "Angle: " + angle.degrees().toFixed(2);
                let thisMeshCounts = angLineContainer.meshes;
                //console.log(thisMeshCounts.length);
                let thisIntersect = globalRay.intersectsMeshes(thisMeshCounts);
                thisIntersect.forEach(function (ints) {
                  let mp = ints.pickedPoint;
                  let mm = ints.pickedMesh;
                  //console.log(mm.name,mp.x,mp.y);
                  console.log("modified line point of intersection", mp.x, " ", mp.y);
                  angPointContainer.meshes.forEach(function (ap) {
                    ap.metadata.based_on.forEach(function (apb) {
                      if (apb.name === mm.name) {
                        ap.position.x = mp.x;
                        ap.position.y = mp.y;
                      }
                    });
                  });
                });

                moveMeshContainer2.meshes.forEach(function (m2) {
                  if (m2.name.includes("perp")) {
                    m2.computeWorldMatrix(true);
                    let ray = BABYLON.Ray.Zero();
                    let showRay = BABYLON.RayHelper.CreateAndShow(
                      ray,
                      scene,
                      BABYLON.Color3.Green()
                    );
                    showRay.attachToMesh(
                      m2,
                      new BABYLON.Vector3(1, 0, 0),
                      m2.getBoundingInfo().boundingBox.minimum,
                      size * 2
                    );
                    showRay.hide();
                    let MeshCounts = linesContainer.meshes.concat(
                      originlinesContainer.meshes
                    );
                    let intersects = ray.intersectsMeshes(MeshCounts);
                    intersects.forEach(function (ints) {
                      let mp = ints.pickedPoint;
                      let mm = ints.pickedMesh;
                      movepointContainer2.meshes.forEach(function (pc) {
                        //console.log(pc.name);
                        if (
                          (pc.metadata.based_on[0].name === m2.name &&
                            pc.metadata.based_on[1].name === mm.name) ||
                          (pc.metadata.based_on[1].name === m2.name &&
                            pc.metadata.based_on[0].name === mm.name)
                        ) {
                          pc.position = mp;
                          pc.metadata.position = mp;
                        }
                      });
                    });
                    showRay.dispose();
                  }
                });
              }
              moveMeshContainer3.meshes.forEach(function (m3) {
                //let thisparent=m3.parent;
                //m3.setParent(null);
                console.log(m3.name);
                m3.computeWorldMatrix(true);
                let ray = BABYLON.Ray.Zero();
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  ray,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay.attachToMesh(
                  m3,
                  new BABYLON.Vector3(1, 0, 0),
                  m3.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );
                let meshcounts = originlinesContainer.meshes.concat(
                  linesContainer.meshes
                );
                let intersects = ray.intersectsMeshes(meshcounts);
                intersects.forEach(function (ints) {
                  let mp = ints.pickedPoint;
                  let mm = ints.pickedMesh;
                  movepointContainer3.meshes.forEach(function (pc) {
                    //console.log(pc.name);
                    if (
                      (pc.metadata.based_on[0].name === m3.name &&
                        pc.metadata.based_on[1].name === mm.name) ||
                      (pc.metadata.based_on[1].name === m3.name &&
                        pc.metadata.based_on[0].name === mm.name)
                    ) {
                      pc.position = mp;
                      pc.metadata.position = mp;
                    }
                  });
                });
                showRay.dispose();
              });
              /*angCirclePointsContainer.meshes.forEach(function(acp){
                                console.log(acp.name,acp.parent.name);
                            });*/
              if (ACContainer.meshes.length > 0) {
                let intpos = ACRay.intersectsMeshes(ACContainer.meshes);
                intpos.forEach(function (ints) {
                  let pp = ints.pickedPoint;
                  //console.log(pp.x,pp.y);
                  ACPContainer.meshes.forEach(function (acp) {
                    //console.log(acp.name,acp.position.x,acp.position.y);
                    let distance = Math.sqrt(
                      Math.pow(acp.position.x - pp.x, 2) +
                        Math.pow(acp.position.y - pp.y, 2)
                    );
                    //console.log(acp.name,distance);
                    if (
                      acp.metadata.based_on[0].name === ints.pickedMesh.name ||
                      acp.metadata.based_on[1].name === ints.pickedMesh.name
                    ) {
                      if (distance < 0.8) {
                        acp.metadata.position.x = pp.x;
                        acp.metadata.position.y = pp.y;
                        acp.position.x = pp.x;
                        acp.position.y = pp.y;
                      }
                    }
                    acp.computeWorldMatrix(true);
                  });
                });
                let intpos2 = ACRay2.intersectsMeshes(ACContainer.meshes);
                intpos2.forEach(function (ints) {
                  let pp = ints.pickedPoint;
                  console.log(pp.x, pp.y);
                  ACPContainer.meshes.forEach(function (acp) {
                    //console.log(acp.name,acp.position.x,acp.position.y);
                    let distance = Math.sqrt(
                      Math.pow(acp.position.x - pp.x, 2) +
                        Math.pow(acp.position.y - pp.y, 2)
                    );
                    console.log(acp.name, distance);
                    if (
                      acp.metadata.based_on[0].name === ints.pickedMesh.name ||
                      acp.metadata.based_on[1].name === ints.pickedMesh.name
                    ) {
                      if (distance < 0.8) {
                        acp.metadata.position.x = pp.x;
                        acp.metadata.position.y = pp.y;
                        acp.position.x = pp.x;
                        acp.position.y = pp.y;
                      }
                    }
                    acp.computeWorldMatrix(true);
                  });
                });
              }
            } else if (movingMesh.name.includes("Circle")) {
              //console.log(circleMeta);

              let tmesh = thisTempContainer.meshes.pop();
              tmesh.dispose();
              movingMesh.dispose();

              let px = pickInfo?.pickedPoint?.x;
              let py = pickInfo?.pickedPoint?.y;
              if (pickInfo.pickedMesh.name.includes("Point")) {
                px = pickInfo.pickedMesh.getAbsolutePosition().x;
                py = pickInfo.pickedMesh.getAbsolutePosition().y;
              }
              //console.log("midp",pointx,pointy);
              let rad = Math.sqrt(
                Math.pow(px - pointx2, 2) + Math.pow(py - pointy2, 2)
              );
              globalrad = rad;
              radiusView.innerHTML = "" + rad.toFixed(2);
              let sides = rad * 10;
              let circle = BABYLON.Polygon.Circle(rad, pointx2, pointy2, sides);
              let vector3 = [];
              circle.forEach(function (val) {
                vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
              });
              vector3.push(vector3[0]);
              let firstx = vector3[0].x;
              let firsty = vector3[0].y;
              let lastx = vector3[vector3.length - 2].x;
              let lasty = vector3[vector3.length - 2].y;
              let distance = Math.sqrt(
                Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
              );
              if (distance > 0.05) {
                if (distance < 0.15) {
                  //console.log("big gap");
                  sides = sides * 2;
                  circle = BABYLON.Polygon.Circle(rad, pointx2, pointy2, sides);
                  vector3 = [];
                  circle.forEach(function (val) {
                    vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                  });
                  vector3.push(vector3[0]);
                  firstx = vector3[0].x;
                  firsty = vector3[0].y;
                  lastx = vector3[vector3.length - 2].x;
                  lasty = vector3[vector3.length - 2].y;
                  distance = Math.sqrt(
                    Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                  );
                } else if (distance >= 0.15 && distance < 0.3) {
                  //console.log("big gap2");
                  sides = sides * 3;
                  circle = BABYLON.Polygon.Circle(rad, pointx2, pointy2, sides);
                  vector3 = [];
                  circle.forEach(function (val) {
                    vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                  });
                  vector3.push(vector3[0]);
                  firstx = vector3[0].x;
                  firsty = vector3[0].y;
                  lastx = vector3[vector3.length - 2].x;
                  lasty = vector3[vector3.length - 2].y;
                  distance = Math.sqrt(
                    Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                  );
                } else if (distance >= 0.3 && distance < 0.4) {
                  //console.log("big gap");
                  sides = sides * 3;
                  circle = BABYLON.Polygon.Circle(rad, pointx2, pointy2, sides);
                  vector3 = [];
                  circle.forEach(function (val) {
                    vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                  });
                  vector3.push(vector3[0]);
                  firstx = vector3[0].x;
                  firsty = vector3[0].y;
                  lastx = vector3[vector3.length - 2].x;
                  lasty = vector3[vector3.length - 2].y;
                  distance = Math.sqrt(
                    Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                  );
                } else if (distance >= 0.4 && distance < 0.5) {
                  //console.log("big gap5");
                  sides = sides * 4;
                  circle = BABYLON.Polygon.Circle(rad, pointx2, pointy2, sides);
                  vector3 = [];
                  circle.forEach(function (val) {
                    vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                  });
                  vector3.push(vector3[0]);
                  firstx = vector3[0].x;
                  firsty = vector3[0].y;
                  lastx = vector3[vector3.length - 2].x;
                  lasty = vector3[vector3.length - 2].y;
                  distance = Math.sqrt(
                    Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                  );
                } else {
                  //console.log("big gap6");
                  sides = sides * 5;
                  circle = BABYLON.Polygon.Circle(rad, pointx2, pointy2, sides);
                  vector3 = [];
                  circle.forEach(function (val) {
                    vector3.push(new BABYLON.Vector3(val.x, val.y, 0));
                  });
                  vector3.push(vector3[0]);
                  firstx = vector3[0].x;
                  firsty = vector3[0].y;
                  lastx = vector3[vector3.length - 2].x;
                  lasty = vector3[vector3.length - 2].y;
                  distance = Math.sqrt(
                    Math.pow(lastx - firstx, 2) + Math.pow(lasty - firsty, 2)
                  );
                }
              }
              movingMesh = BABYLON.Mesh.CreateDashedLines(
                "Circle",
                vector3,
                dashLength - 0.1,
                dashGap,
                sides + 1,
                scene
              );
              movingMesh.color = BABYLON.Color3.Red();
              let rdiff = rad - discRad;
              // console.log("oldRad",discRad,"diff",rdiff);
              disc.scaling = new BABYLON.Vector3(
                rad / discRad,
                rad / discRad,
                1.0
              );
              cpointTempContainer.meshes.forEach(function (ctm) {
                cpointCloneTempContainer.meshes.forEach(function (cctm) {
                  if (ctm != undefined || cctm != undefined) {
                    if (ctm.name === cctm.name) {
                      ctm.position = cctm.getBoundingInfo().boundingBox.centerWorld;
                      //console.log(cctm.name,cctm.getBoundingInfo().boundingBox.centerWorld);
                    }
                  }
                });
              });
              thisTempContainer.meshes.push(movingMesh);

              moveMeshContainer2.meshes.forEach(function (m2) {
                if (m2.name.includes("perp")) {
                  m2.computeWorldMatrix(true);
                  let ray = BABYLON.Ray.Zero();
                  let showRay = BABYLON.RayHelper.CreateAndShow(
                    ray,
                    scene,
                    BABYLON.Color3.Green()
                  );
                  showRay.attachToMesh(
                    m2,
                    new BABYLON.Vector3(1, 0, 0),
                    m2.getBoundingInfo().boundingBox.minimum,
                    size * 2
                  );
                  showRay.hide();
                  let MeshCounts = linesContainer.meshes.concat(
                    originlinesContainer.meshes
                  );
                  let intersects = ray.intersectsMeshes(MeshCounts);
                  intersects.forEach(function (ints) {
                    let mp = ints.pickedPoint;
                    let mm = ints.pickedMesh;
                    //console.log(mm.name,mp.x,mp.y);
                    movepointContainer2.meshes.forEach(function (pc) {
                      //console.log(pc.name);
                      if (
                        (pc.metadata.based_on[0].name === m2.name &&
                          pc.metadata.based_on[1].name === mm.name) ||
                        (pc.metadata.based_on[1].name === m2.name &&
                          pc.metadata.based_on[0].name === mm.name)
                      ) {
                        pc.position = mp;
                        pc.metadata.position = mp;
                      }
                    });
                  });
                  showRay.dispose();
                }
              });
            } else if (movingMesh.name.includes("YDash")) {
              movingMesh.position.x = pointx;
              movingMesh.position.y = pointy;
              //console.log(movingMesh.name);
              movingMesh.computeWorldMatrix(true);
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                movingMesh,
                new BABYLON.Vector3(0, 1, 0),
                movingMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersects = ray.intersectsMeshes(meshcounts);
              intersects.forEach(function (ints) {
                let mp = ints.pickedPoint;
                let mm = ints.pickedMesh;
                // console.log(mm.name,mp.x,mp.y);
                movepointContainer2.meshes.forEach(function (pc) {
                  //console.log(pc.name);
                  if (
                    (pc.metadata.based_on[0].name === movingMesh.name &&
                      pc.metadata.based_on[1].name === mm.name) ||
                    (pc.metadata.based_on[1].name === movingMesh.name &&
                      pc.metadata.based_on[0].name === mm.name)
                  ) {
                    pc.position = mp;
                    pc.metadata.position = mp;
                  }
                });
              });
              showRay.dispose();

              moveMeshContainer2.meshes.forEach(function (m2) {
                //if(m2.name.includes("perp")){
                //console.log(m2.name);
                m2.computeWorldMatrix(true);
                let ray = BABYLON.Ray.Zero();
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  ray,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay.attachToMesh(
                  m2,
                  new BABYLON.Vector3(1, 0, 0),
                  m2.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );
                showRay.hide();
                let MeshCounts = linesContainer.meshes.concat(
                  originlinesContainer.meshes
                );
                let intersects = ray.intersectsMeshes(MeshCounts);
                intersects.forEach(function (ints) {
                  let mp = ints.pickedPoint;
                  let mm = ints.pickedMesh;
                  //console.log(mm.name,mp.x,mp.y);
                  movepointContainer2.meshes.forEach(function (pc) {
                    //console.log(pc.name);
                    if (
                      (pc.metadata.based_on[0].name === m2.name &&
                        pc.metadata.based_on[1].name === mm.name) ||
                      (pc.metadata.based_on[1].name === m2.name &&
                        pc.metadata.based_on[0].name === mm.name)
                    ) {
                      pc.position = mp;
                      pc.metadata.position = mp;
                    }
                  });
                });
                showRay.dispose();
                //}
              });
              moveMeshContainer3.meshes.forEach(function (m3) {
                //let thisparent=m3.parent;
                //m3.setParent(null);
                console.log(m3.name);
                m3.computeWorldMatrix(true);
                let ray = BABYLON.Ray.Zero();
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  ray,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay.attachToMesh(
                  m3,
                  new BABYLON.Vector3(0, 1, 0),
                  m3.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );
                let meshcounts = originlinesContainer.meshes.concat(
                  linesContainer.meshes
                );
                let intersects = ray.intersectsMeshes(meshcounts);
                intersects.forEach(function (ints) {
                  let mp = ints.pickedPoint;
                  let mm = ints.pickedMesh;
                  // console.log(mm.name,mp.x,mp.y);
                  movepointContainer3.meshes.forEach(function (pc) {
                    //console.log(pc.name);
                    if (
                      (pc.metadata.based_on[0].name === m3.name &&
                        pc.metadata.based_on[1].name === mm.name) ||
                      (pc.metadata.based_on[1].name === m3.name &&
                        pc.metadata.based_on[0].name === mm.name)
                    ) {
                      pc.position = mp;
                      pc.metadata.position = mp;
                    }
                  });
                });
                showRay.dispose();
              });
            } else if (movingMesh.name.includes("XDash")) {
              movingMesh.position.x = pointx;
              movingMesh.position.y = pointy;
              //console.log(movingMesh.name);
              movingMesh.computeWorldMatrix(true);
              let ray = BABYLON.Ray.Zero();
              let showRay = BABYLON.RayHelper.CreateAndShow(
                ray,
                scene,
                BABYLON.Color3.Green()
              );
              showRay.attachToMesh(
                movingMesh,
                new BABYLON.Vector3(1, 0, 0),
                movingMesh.getBoundingInfo().boundingBox.minimum,
                size * 2
              );
              let meshcounts = originlinesContainer.meshes.concat(
                linesContainer.meshes
              );
              let intersects = ray.intersectsMeshes(meshcounts);
              intersects.forEach(function (ints) {
                let mp = ints.pickedPoint;
                let mm = ints.pickedMesh;
                //console.log(mm.name,mp.x,mp.y);
                movepointContainer2.meshes.forEach(function (pc) {
                  //console.log(pc.name);
                  if (
                    (pc.metadata.based_on[0].name === movingMesh.name &&
                      pc.metadata.based_on[1].name === mm.name) ||
                    (pc.metadata.based_on[1].name === movingMesh.name &&
                      pc.metadata.based_on[0].name === mm.name)
                  ) {
                    pc.position = mp;
                    pc.metadata.position = mp;
                  }
                });
              });

              showRay.dispose();
              moveMeshContainer2.meshes.forEach(function (m2) {
                if (m2.name.includes("perp")) {
                  //console.log(m2.name);
                  m2.computeWorldMatrix(true);
                  let ray = BABYLON.Ray.Zero();
                  let showRay = BABYLON.RayHelper.CreateAndShow(
                    ray,
                    scene,
                    BABYLON.Color3.Green()
                  );
                  showRay.attachToMesh(
                    m2,
                    new BABYLON.Vector3(1, 0, 0),
                    m2.getBoundingInfo().boundingBox.minimum,
                    size * 2
                  );
                  showRay.hide();
                  let MeshCounts = linesContainer.meshes.concat(
                    originlinesContainer.meshes
                  );
                  let intersects = ray.intersectsMeshes(MeshCounts);
                  intersects.forEach(function (ints) {
                    let mp = ints.pickedPoint;
                    let mm = ints.pickedMesh;
                    //console.log(mm.name,mp.x,mp.y);
                    movepointContainer2.meshes.forEach(function (pc) {
                      //console.log(pc.name);
                      if (
                        (pc.metadata.based_on[0].name === m2.name &&
                          pc.metadata.based_on[1].name === mm.name) ||
                        (pc.metadata.based_on[1].name === m2.name &&
                          pc.metadata.based_on[0].name === mm.name)
                      ) {
                        pc.position = mp;
                        pc.metadata.position = mp;
                      }
                    });
                  });
                  showRay.dispose();
                }
              });
              moveMeshContainer3.meshes.forEach(function (m3) {
                //let thisparent=m3.parent;
                //m3.setParent(null);
                console.log(m3.name);
                m3.computeWorldMatrix(true);
                let ray = BABYLON.Ray.Zero();
                let showRay = BABYLON.RayHelper.CreateAndShow(
                  ray,
                  scene,
                  BABYLON.Color3.Green()
                );
                showRay.attachToMesh(
                  m3,
                  new BABYLON.Vector3(1, 0, 0),
                  m3.getBoundingInfo().boundingBox.minimum,
                  size * 2
                );
                let meshcounts = originlinesContainer.meshes.concat(
                  linesContainer.meshes
                );
                let intersects = ray.intersectsMeshes(meshcounts);
                intersects.forEach(function (ints) {
                  let mp = ints.pickedPoint;
                  let mm = ints.pickedMesh;
                  // console.log(mm.name,mp.x,mp.y);
                  movepointContainer3.meshes.forEach(function (pc) {
                    //console.log(pc.name);
                    if (
                      (pc.metadata.based_on[0].name === m3.name &&
                        pc.metadata.based_on[1].name === mm.name) ||
                      (pc.metadata.based_on[1].name === m3.name &&
                        pc.metadata.based_on[0].name === mm.name)
                    ) {
                      pc.position = mp;
                      pc.metadata.position = mp;
                    }
                  });
                });
                showRay.dispose();
              });
            } else {
              movingMesh.position.x = pointx;
              movingMesh.position.y = pointy;
            }
            //console.log(disposeTempContainer.meshes.length);
            if (disposeTempContainer.meshes.length > 0) {
              for (let i = 0; i < disposeTempContainer.meshes.length; i++) {
                let dm = disposeTempContainer.meshes.pop();
                dm.dispose();
              }
            }

            drawnLineTempContainer.meshes.forEach(function (dlt) {
              if (dlt.name.includes("arc")) {
                let point1 = new BABYLON.Vector3(0, 0, 0);
                let point2 = new BABYLON.Vector3(0, 0, 0);
                let point3 = new BABYLON.Vector3(0, 0, 0);
                drawnLinePointTempContainer.meshes.forEach(function (dltp) {
                  dltp.computeWorldMatrix(true);
                  if (dlt.metadata.based_on.point1 === dltp.name) {
                    point1 = dltp.getAbsolutePosition();
                  }
                  if (dlt.metadata.based_on.point2 === dltp.name) {
                    point2 = dltp.getAbsolutePosition();
                  }
                  if (dlt.metadata.based_on.point3 === dltp.name) {
                    point3 = dltp.getAbsolutePosition();
                  }
                });
                // console.log("point1",point1);
                // console.log("point2",point2);
                //console.log("point3",point3);

                function showAngleSector(origin, vector1, vector2, sradius) {
                  sradius = sradius || 1;
                  var cross = BABYLON.Vector3.Cross(vector1, vector2);
                  var dot = BABYLON.Vector3.Dot(vector1, vector2);
                  var angle = Math.acos(
                    dot / (vector1.length() * vector2.length())
                  );
                  var points = [];
                  var minNb = 4;
                  var factor = 2;
                  var nbPoints = Math.floor(sradius * angle * factor);
                  nbPoints = nbPoints < minNb ? minNb : nbPoints;

                  var firstPoint = BABYLON.Vector3.Normalize(vector1).scale(
                    sradius
                  );
                  var lastPoint = BABYLON.Vector3.Normalize(vector2).scale(
                    sradius
                  );
                  var matrix;
                  var ang = angle / nbPoints;
                  var rotated;
                  for (var i = 0; i < nbPoints; i++) {
                    matrix = BABYLON.Matrix.RotationAxis(cross, ang * i);
                    rotated = BABYLON.Vector3.TransformCoordinates(
                      firstPoint,
                      matrix
                    );
                    points.push(rotated.add(origin));
                  }
                  points.push(lastPoint.add(origin));

                  let sector;
                  //sector = BABYLON.Mesh.CreateLines("sector", points, scene);
                  sector = BABYLON.MeshBuilder.CreateTube(
                    dlt.name,
                    { path: points, radius: 0.1 },
                    scene
                  );
                  sector.material = gray;
                  sector.isPickable = false;
                  let text =
                    '{ "identity" : {"name":"' +
                    sector.name +
                    '", "id":"' +
                    sector.id +
                    '","username":null,"type":"arc"},' +
                    '"position":{"x":' +
                    sector.position.x +
                    ',"y":' +
                    sector.position.y +
                    ',"z":' +
                    sector.position.z +
                    '},"properties":{"color":"' +
                    sector.material.name +
                    '","radius":' +
                    sradius +
                    ',"angle":null},' +
                    '"based_on":{"point1":"' +
                    dlt.metadata.based_on.point1 +
                    '", "point2":"' +
                    dlt.metadata.based_on.point2 +
                    '","point3":"' +
                    dlt.metadata.based_on.point3 +
                    '"}}';
                  let obj = JSON.parse(text);
                  sector.metadata = obj;
                  return sector;
                }

                let axis1 = point2.subtract(point1);
                let axis3 = point3.subtract(point1);
                let thisrad = dlt.metadata.properties.radius;
                if (movingMesh.name.includes("Circle")) {
                  console.log(movingMesh.name, theParent.name);
                  if (
                    dlt.metadata.based_on.point1 === theParent.name ||
                    dlt.metadata.based_on.point2 === theParent.name ||
                    dlt.metadata.based_on.point3 === theParent.name
                  ) {
                    thisrad = globalrad;
                  } else {
                    thisrad = dlt.metadata.properties.radius;
                    console.log(dlt.name, dlt.metadata.properties.radius);
                  }
                }
                let sector1 = showAngleSector(point1, axis1, axis3, thisrad);
                disposeTempContainer.meshes.push(sector1);
              } else {
                let point1 = new BABYLON.Vector3(0, 0, 0);
                let point2 = new BABYLON.Vector3(0, 0, 0);
                let points = [];
                drawnLinePointTempContainer.meshes.forEach(function (dltp) {
                  dltp.computeWorldMatrix(true);
                  if (dlt.metadata.based_on.point1 === dltp.name) {
                    point1 = dltp.getAbsolutePosition();
                  }
                  if (dlt.metadata.based_on.point2 === dltp.name) {
                    point2 = dltp.getAbsolutePosition();
                  }
                });
                points.push(point1);
                points.push(point2);
                let sector;
                //sector = BABYLON.Mesh.CreateLines("sector", points, scene);
                sector = BABYLON.MeshBuilder.CreateTube(
                  dlt.name,
                  { path: points, radius: 0.1 },
                  scene
                );
                sector.material = gray;
                sector.isPickable = false;
                let text =
                  '{ "identity" : {"name":"' +
                  sector.name +
                  '", "id":"' +
                  sector.id +
                  '","username":null,"type":"arc"},' +
                  '"position":{"x":' +
                  sector.position.x +
                  ',"y":' +
                  sector.position.y +
                  ',"z":' +
                  sector.position.z +
                  '},"properties":{"color":"' +
                  sector.material.name +
                  '","radius":' +
                  radius +
                  ',"angle":null},' +
                  '"based_on":{"point1":"' +
                  dlt.metadata.based_on.point1 +
                  '", "point2":"' +
                  dlt.metadata.based_on.point2 +
                  '","point3":"' +
                  "" +
                  '"}}';
                let obj = JSON.parse(text);
                sector.metadata = obj;
                disposeTempContainer.meshes.push(sector);
              }
            });
          }
        }
      };
    } else if (conMode === 4) {
    }
  }; //mode

  let views = document.getElementById("views");
  //console.log(views.value);
  views.onchange = function changeViews() {
    //console.log(views.value);
    if (views.value === "Top") {
      camera.upperBetaLimit = Math.PI / 2;
      camera.lowerBetaLimit = Math.PI / 2;
      camera.upperAlphaLimit = -Math.PI / 2;
      camera.lowerAlphaLimit = -Math.PI / 2;
      cam = true;
      document.getElementById("camera").style.backgroundColor = color1;
    }
  };

  let topPlane = BABYLON.Mesh.CreatePlane("TopPlane", lineLength, scene);
  topPlane.material = white;
  topPlane.actionManager = new BABYLON.ActionManager(scene);
  topPlane.isPickable = true;
  let construct = document.getElementById("construct");

  let conMode = 10; //no default
  console.log("v1 show/hide lines");
  let assignVariable = document.getElementById("assignVariable");
  let assignValue = document.getElementById("assignValue");
  let moveElement = document.getElementById("moveElement");
  let deleteElement = document.getElementById("deleteElement");
  let drawLine = document.getElementById("drawLine");
  let consbgColor = "#999400";
  Mode(views.value, construct.value);
  construct.onclick = function () {
    conMode = 1;
    this.style.backgroundColor = consbgColor;
    this.style.color = "#ffffff";

    assignVariable.style.backgroundColor = "initial";
    assignVariable.style.color = "#818181";
    moveElement.style.backgroundColor = "initial";
    moveElement.style.color = "#818181";
    deleteElement.style.backgroundColor = "initial";
    deleteElement.style.color = "#818181";
    assignValue.style.backgroundColor = "initial";
    assignValue.style.color = "#818181";
    drawLine.style.backgroundColor = "initial";
    drawLine.style.color = "#818181";
    Mode(views.value, construct.value);
    construct.onchange = function changeConstruct() {
      Mode(views.value, construct.value);
    };
  };
  assignVariable.onclick = function () {
    conMode = 2;
    this.style.backgroundColor = consbgColor;
    this.style.color = "#ffffff";

    construct.style.backgroundColor = "initial";
    construct.style.color = "#818181";
    moveElement.style.backgroundColor = "initial";
    moveElement.style.color = "#818181";
    deleteElement.style.backgroundColor = "initial";
    deleteElement.style.color = "#818181";
    assignValue.style.backgroundColor = "initial";
    assignValue.style.color = "#818181";
    drawLine.style.backgroundColor = "initial";
    drawLine.style.color = "#818181";
    Mode(views.value, construct.value);
  };
  assignValue.onclick = function () {
    conMode = 5;
    this.style.backgroundColor = consbgColor;
    this.style.color = "#ffffff";

    construct.style.backgroundColor = "initial";
    construct.style.color = "#818181";
    moveElement.style.backgroundColor = "initial";
    moveElement.style.color = "#818181";
    deleteElement.style.backgroundColor = "initial";
    deleteElement.style.color = "#818181";
    assignVariable.style.backgroundColor = "initial";
    assignVariable.style.color = "#818181";
    drawLine.style.backgroundColor = "initial";
    drawLine.style.color = "#818181";
    Mode(views.value, construct.value);
  };
  moveElement.onclick = function () {
    conMode = 3;
    this.style.backgroundColor = consbgColor;
    this.style.color = "#ffffff";

    assignVariable.style.backgroundColor = "initial";
    assignVariable.style.color = "#818181";
    construct.style.backgroundColor = "initial";
    construct.style.color = "#818181";
    deleteElement.style.backgroundColor = "initial";
    deleteElement.style.color = "#818181";
    assignValue.style.backgroundColor = "initial";
    assignValue.style.color = "#818181";
    drawLine.style.backgroundColor = "initial";
    drawLine.style.color = "#818181";
    Mode(views.value, construct.value);
  };
  deleteElement.onclick = function () {
    conMode = 4;
    this.style.backgroundColor = consbgColor;
    this.style.color = "#ffffff";
    Mode(views.value, construct.value);

    assignVariable.style.backgroundColor = "initial";
    assignVariable.style.color = "#818181";
    moveElement.style.backgroundColor = "initial";
    moveElement.style.color = "#818181";
    assignValue.style.backgroundColor = "initial";
    assignValue.style.color = "#818181";
    drawLine.style.backgroundColor = "initial";
    drawLine.style.color = "#818181";
    //constructLine.style.backgroundColor = "initial";
    //constructLine.style.color = "#818181";
  };
  drawLine.onclick = function () {
    conMode = 6;
    this.style.backgroundColor = consbgColor;
    this.style.color = "#ffffff";

    assignVariable.style.backgroundColor = "initial";
    assignVariable.style.color = "#818181";
    construct.style.backgroundColor = "initial";
    construct.style.color = "#818181";
    deleteElement.style.backgroundColor = "initial";
    deleteElement.style.color = "#818181";
    assignValue.style.backgroundColor = "initial";
    assignValue.style.color = "#818181";
    moveElement.style.backgroundColor = "initial";
    moveElement.style.color = "#818181";
    Mode(views.value, construct.value);
  };

  return scene;
};
/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function
let color1 = "#4daae3";
let color2 = "#c6e2f5";
let clearButton = document.getElementById("clear");
clearButton.onclick = function () {
  if (
    confirm(
      "This will restart the program and delete any unsaved changed. Are you sure?"
    )
  ) {
    console.log("scene2", scene.camera);
    console.log("clear");
    scene.dispose();
    scene = createScene();
    document.getElementById("axis").style.backgroundColor = color1;
    document.getElementById("camera").style.backgroundColor = color1;
    document.getElementById("points").style.backgroundColor = color1;
  }
};

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});

function openNav() {
  document.getElementById("mySidenav").style.width = "210px";
  document.getElementById("main").style.marginLeft = "210px";
  console.log("open nav");
  engine.resize();
}
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  console.log("close nav");
  engine.resize();
}
