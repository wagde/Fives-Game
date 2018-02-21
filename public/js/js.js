(function () {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var clickOption = [];
    var squarePoint = [];
    var squarePoint2 = [];
    var point = new Image();
    var players = { player1: {}, player2: {} };
    var winChickPoint;
    var audio = new Audio('./public/sound/sound1.wav');
    var audio1 = new Audio('./public/sound/sound2.wav');
    var audio2 = new Audio("./public/sound/win.mp3");
    var playerTurn = "player1";
    var allPoint;
    point.src = "./public/img/pin.png";
    var reset = function () {
        document.getElementById("toggel").style.display = "block";
        document.getElementById("toggel1").style.display = "none";
        document.getElementById("playername").innerHTML = "";
        ctx.clearRect(0, 0, 500, 500)
    }

    document.getElementById("toggel1").onclick = function () {
        reset()
    }
    document.getElementById("startGame").onclick = function () {
        player2[name] = document.getElementById("player2").value
        players.player1["color"] = "red";
        players.player2["color"] = "blue";
        players.player1['name'] = document.getElementById("player1").value;
        players.player2["name"] = document.getElementById("player2").value;
        players.player1["point"] = 0;
        players.player2["point"] = 0;
        size = parseInt(document.getElementById("size").value);
        winChickPoint = size * size;
        if (size > 8 || size < 2 || !players.player1['name'] || !players.player2["name"]) {
            alert("chose size btween 2 and 8")
        } else {
            document.getElementById("playername").innerHTML = players.player1["name"];
            drawDots(size + 2);
            document.getElementById("toggel").style.display = "none";
            document.getElementById("toggel1").style.display = "block";
        }
    }
    var winChick = function () {
        players[playerTurn]["point"]++;
        winChickPoint--
        console.log(winChickPoint)
        if (!winChickPoint) {
            if (players.player1["point"] > players.player2["point"]) {
                audio2.play()
                alert(players.player1["name"] + "  " + "win");
                reset()

            }
            else {
                audio2.play()
                alert(players.player2["name"] + "  " + "win")
                reset()
            }

        }


    }

    var drawDots = function (borderSize) {

        var numberSquare = 1;
        for (var x = 1; x < borderSize; x++) {
            for (var y = 1; y < borderSize; y++) {
                squarePoint.push({ numberSquare: [[[x * 50, y * 50], [x * 50 + 50, y * 50]], [[x * 50 + 50, y * 50], [x * 50 + 50, y * 50 + 50]], [[x * 50 + 50, y * 50 + 50], [x * 50, y * 50 + 50]], [[x * 50, y * 50 + 50], [x * 50, y * 50]]] })
                squarePoint2.push({ numberSquare: [[[x * 50, y * 50], [x * 50 + 50, y * 50]], [[x * 50 + 50, y * 50], [x * 50 + 50, y * 50 + 50]], [[x * 50 + 50, y * 50 + 50], [x * 50, y * 50 + 50]], [[x * 50, y * 50 + 50], [x * 50, y * 50]]] })
                clickOption.push([x * 50, y * 50])
                ctx.beginPath();
                ctx.drawImage(point, x * 50, y * 50, 13, 13);
                ctx.stroke();
                numberSquare++
            }
        }
    }
    var turn = function () {
        if (playerTurn == "player1") {
            playerTurn = "player2"
        }
        else {
            playerTurn = "player1"
        }

    }

    var checkClickSquare = function (mySqaure, x1) {
        var c = 0;
        for (x in mySqaure) {
            if (mySqaure[x][0][0] == undefined && mySqaure[x][1][0] == undefined) {
                c++;
            }
        }
        if (c == 4) {
``
            // setTimeout(() => {
                audio1.play();
                var res = players[playerTurn].name.slice(0, 1);
                ctx.font = "30px Comic Sans MS";
                ctx.fillText(res, squarePoint2[x1]["numberSquare"][0][0][0] + 17, squarePoint2[x1]["numberSquare"][0][0][1] + 34);
                winChick()
            // }, 1000);

            return true;
        }
        else {
            return false;
        }

    }
    var squarePointCheck = function (x1, y1, x2, y2) {
        var c = 0;
        var k = false;

        for (x in squarePoint) {
            for (y in squarePoint[x]["numberSquare"]) {
                if (squarePoint[x]["numberSquare"][y][0][0] == x1 && squarePoint[x]["numberSquare"][y][0][1] == y1 && squarePoint[x]["numberSquare"][y][1][0] == x2 && squarePoint[x]["numberSquare"][y][1][1] == y2) {
                    squarePoint[x]["numberSquare"][y][0][0] = undefined;
                    squarePoint[x]["numberSquare"][y][0][1] = undefined;
                    squarePoint[x]["numberSquare"][y][1][0] = undefined;
                    squarePoint[x]["numberSquare"][y][1][1] = undefined;
                    c++;
                    if (checkClickSquare(squarePoint[x]["numberSquare"], x)) {

                        k = true;
                    }
                }
                if (squarePoint[x]["numberSquare"][y][0][0] == x2 && squarePoint[x]["numberSquare"][y][0][1] == y2 && squarePoint[x]["numberSquare"][y][1][0] == x1 && squarePoint[x]["numberSquare"][y][1][1] == y1) {
                    squarePoint[x]["numberSquare"][y][0][0] = undefined;
                    squarePoint[x]["numberSquare"][y][0][1] = undefined;
                    squarePoint[x]["numberSquare"][y][1][0] = undefined;
                    squarePoint[x]["numberSquare"][y][1][1] = undefined;
                    c++;
                    if (checkClickSquare(squarePoint[x]["numberSquare"], x)) {
                        k = true;


                    }
                }

            }
        }
        if (c) {
            return [true, k]
        }
        else {
            return [false, 0]

        }
    }


    var checkLineLength = function (e, x, y) {
        if (45 < Math.abs(e.x - x) && Math.abs(e.x - x) < 60 && Math.abs(e.x - x - 30) > Math.abs(e.y - y)) {
            return true
        }
        if (48 < Math.abs(e.y - y) && Math.abs(e.y - y) < 60 && Math.abs(e.x - x) < Math.abs(e.y - y - 30)) {
            return true
        }
        else {
            return false;
        }
    }

    canvas.onmousedown = (e) => {
        var x = e.x;
        var y = e.y;
        canvas.onmouseup = (e) => {
            if (checkLineLength(e, x, y)) {
                var checker = squarePointCheck(Math.floor((x / 10)) * 10, Math.floor((y / 10)) * 10, Math.floor((e.x / 10)) * 10, Math.floor((e.y / 10)) * 10);
                if (checker[0]) {

                    audio.play();
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(e.x, e.y);
                    ctx.lineWidth = 4;
                    // console.log(checker[1])
                    // console.log(playerTurn);
                    ctx.strokeStyle = players[playerTurn].color;

                    if (!checker[1]) {

                        turn();
                        document.getElementById("playername").innerHTML = players[playerTurn]["name"];

                    }
                    // turn();
                    ctx.stroke()

                }
            }
        };
    }
})()