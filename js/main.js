(function() {
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	var canvas = new guru.Canvas("#canvas", {
		fullscreen: true,
		css: true
	});

	var white = new guru.Color().fromHex("#fff"),
		background = new guru.Color(0, 0, 0),
		colors = [new guru.Color().fromHex("#103349"), new guru.Color().fromHex("#B3B48A"), new guru.Color().fromHex("#030509"), new guru.Color().fromHex("#707C70")],
		pollies = [new guru.shapes.Polygon(), new guru.shapes.Polygon(), new guru.shapes.Polygon(), new guru.shapes.Polygon()],
		loading = new guru.Text("Loading...", canvas.width / 2, canvas.height / 2, "Merriweather", 35, white).setCentered(true, true),
		colorInterval,
		loaded = true,
		done = false,
		woodenToy = new Audio();

	woodenToy.src = "audio/wooden-toy.mp3";
	woodenToy.volume = 0.5;

	woodenToy.onended = function() {
		clearInterval(colorInterval);
		done = true;
	};

	woodenToy.onplay = function() {
		loading = false;

		setTimeout(function() {
			colorInterval = setInterval(function() {
				while (colors[0]._css === pollies[0]._color._css) shuffle(colors);

				for (var i = 0; i < 4; i++) {
					pollies[i].setColor(colors[i]);
				}
			}, 705.882352941);
		}, 705.882352941);
	};

	woodenToy.oncanplaythrough = function() {
		woodenToy.play();
	};

	function render() {
		canvas.clear(background);

		if (loading) {
			canvas.render(loading);
			return;
		}

		if (done) return;

		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < pollies[i].vertexCount; j++) {
				pollies[i].moveVertex(j, guru.randomDecimal(true) / 2, guru.randomDecimal(true) / 2);
			}

			canvas.render(pollies[i]);
		}
	}

	function init() {
		var index = 0;

		for (var i = 3; i >= 0; i--) {
			index++;

			for (var j = 0; j < 20; j++) {
				var x = canvas.width / 2 + (index * 100 + 50) * Math.cos((j * 18) * (Math.PI / 180)),
					y = canvas.height / 2 + (index * 100 + 50) * Math.sin((j * 18) * (Math.PI / 180));

				pollies[i].addVertex(x + guru.random(0, 35, true), y + guru.random(0, 35, true));
			}
		}

		guru.createLoop(render);
	}

	init();
})();