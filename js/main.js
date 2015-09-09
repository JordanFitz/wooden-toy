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

	// Technically add lyric doesn't add a text object, it just sets the current lyric text to what you want it to be at a certain offset.
	// All time offsets are in milliseconds.
	function addLyric(timing, text, endTiming) {
		setTimeout(function() {
			currentLyric.setSize(lyricSize);
			currentLyric.setText(text);
		}, timing);
		if (typeof endTiming !== "undefined") {
			// Set the text to empty if we have a time to end
			setTimeout(function() {
				currentLyric.setSize(lyricSize);
				currentLyric.setText("");
			}, endTiming);
		}
	}
	
	// Technically add lyric doesn't add a text object, it just sets the current lyric text to what you want it to be at a certain offset.
	// All time offsets are in milliseconds.
	// This function is because I didn't feel like adding another param for half-sizing
	function addLyricHalfSize(timing, text, endTiming) {
		setTimeout(function() {
			currentLyric.setSize(lyricSize / 2);
			currentLyric.setText(text);
		}, timing);
		if (typeof endTiming !== "undefined") {
			// Set the text to empty if we have a time to end
			setTimeout(function() {
				currentLyric.setSize(lyricSize);
				currentLyric.setText("");
			}, endTiming);
		}
	}
	
	function addAllLyrics() {
		// The verse lyric, all offsets are in milliseconds
		addLyric(26548, "SHOULD");
		addLyric(27188, "YOU");
		addLyric(27501, "CHOOSE");
		addLyric(27935, "TO");
		addLyric(28173, "LOCOMOTIVATE");
		addLyric(30052, "YOURSELF");
		addLyric(30800, "INTO");
		addLyric(31531, "ANOTHER", 31531 + 922);
		// The Second Verse
		addLyric(37954, "OPEN");
 		addLyric(38720, "UP");
 		addLyric(39048, "A");
 		addLyric(39381, "DOOR");
 		addLyric(39811, "TO");
 		addLyric(40217, "MORE");
 		addLyric(40574, "THAN");
 		addLyric(40875, "YOU");
 		addLyric(41235, "COULD");
 		addLyric(41585, "EVER");
 		addLyric(42108, "LIVE");
 		addLyric(42678, "TO");
 		addLyric(42893, "LOVE", 42839 + 643);
		// Third Verse
		addLyric(49120, "TELL");
		addLyric(49553, "ME");
		addLyric(49861, "ALL");
		addLyric(50187, "ABOUT");
		addLyric(50761, "YOU");
		addLyric(50869, "EVEN");
		addLyricHalfSize(51824, "EVEN");
		addLyric(52377, "THOUGH");
		addLyric(52958, "YOU'VE");
		addLyric(53209, "GIVEN");
		addLyric(53822, "IN", 53822 + 1553);
		// Fourth Verse
		addLyric(59874, "LISTEN");
		addLyric(61006, "SAY");
		addLyric(61731, "THE");
		addLyric(61965, "DAYS");
		addLyric(62306, "THAT");
		addLyric(62641, "YOU");
		addLyric(63167, "LEAVE");
		addLyric(63754, "FOR");
		addLyric(64281, "THE");
		addLyric(64550, "REST", 64550 + 2855);
		// Fifth Verse
		addLyric(70763, "SING");
		addLyric(71206, "THE");
		addLyric(71399, "SONGS");
		addLyric(72272, "THAT");
		addLyric(72640, "RUMBLE");
		addLyric(73304, "IN");
		addLyric(73418, "THE");
		addLyric(73465, "TWILIGHT");
		addLyric(75487, "TO");
		addLyric(76000, "ABSCOND", 76000 + 3139);
		// Sixth Verse
		addLyric(81780, "CAN'T");
		addLyric(82440, "PUT");
		addLyric(82935, "YOUR");
		addLyric(83283, "INTELLECT");
		addLyric(84356, "BEFORE");
		addLyric(84892, "IT");
		addLyric(85228, "AND");
		addLyric(85559, "BEFORE");
		addLyric(85692, "YOU");
		addLyric(86287, "QUIT", 86287 + 2096);
		// Seventh Verse
		addLyric(92359, "DISAPPEAR");
		addLyric(93698, "INTO");
		addLyric(94284, "THE");
		addLyric(94617, "BEACON");
		addLyric(95160, "OF");
		addLyric(95565, "THE");
		addLyric(95828, "LONELY");
		addLyric(96864, "IF");
		addLyric(96970, "YOU");
		addLyric(97184, "CAN", 97184 + 2187);
		// Final Verse
		addLyric(103294, "GIVEN");
		addLyric(104090, "ALL");
		addLyric(104404, "THE");
		addLyric(104775, "VOICES");
		addLyric(105485, "YOU");
		addLyric(105814, "SHOULD");
		addLyric(106257, "CHOOSE");
		addLyric(106472, "TO");
		addLyric(106819, "FIT");
		addLyric(107142, "WITHOUT");
		addLyric(107896, "YOUR");
		addLyric(108435, "HEAD", 108435 + 2208);
	}

	var lyricSize = 64,
		white = new guru.Color().fromHex("#fff"),
		background = new guru.Color(0, 0, 0),
		colors = [new guru.Color().fromHex("#103349"), new guru.Color().fromHex("#B3B48A"), new guru.Color().fromHex("#030509"), new guru.Color().fromHex("#707C70")],
		pollies = [new guru.shapes.Polygon(), new guru.shapes.Polygon(), new guru.shapes.Polygon(), new guru.shapes.Polygon()],
		loading = new guru.Text("Loading...", canvas.width / 2, canvas.height / 2, "Merriweather", 35, white).setCentered(true, true),
		currentLyric = new guru.Text("", canvas.width / 2, canvas.height / 2, "Merriweather", lyricSize, white).setCentered(true, true),
		colorInterval,
		loaded = true,
		done = false,
		hasBypass = false,
		woodenToy = new Audio(),
		displayToy = false,
		guiManager = new guru.GUIManager("startgui"),
		titleLabel = new guru.GUILabel("WOODEN TOY", "toy-title").center(),
		descLabel = new guru.GUILabel("A PROJECT MADE BY JORDANFITZ AND TINFOILBOY", "toy-desc").center(),
		copywriteLabel = new guru.GUILabel("USES THE SONG \"WOODEN TOY\" BY AMON TOBIN", "toy-cpw").center(),
		toyEnterButton = new guru.GUIElement("button", "ENTER THE TOY", "toy-enter").center(),
		toyLinkContainer = new guru.GUIContainer("toy-link-container"),
		tinfoilLinkButton = new guru.GUIElement("button", "TINFOILBOY WEBSITE", "toy-tin").center(),
		jordanLinkButton = new guru.GUIElement("button", "JORDANFITZ WEBSITE", "toy-jdan").center(),
		toyReplayButton = new guru.GUIElement("button", "REPLAY", "toy-replay-button").center();
		
	toyEnterButton.setOnclick(function(e) {
		e.preventDefault();
		startToy();
	});
	
	toyReplayButton.setOnclick(function(e) {
		e.preventDefault();
		guiManager.clearElements();
		done = false;
		woodenToy.play();
	});
	
	tinfoilLinkButton.setOnclick(function(e) {
		e.preventDefault();
		document.location.href = "http://www.tinfoilboy.com";
	});
	
	jordanLinkButton.setOnclick(function(e) {
		e.preventDefault();
		document.location.href = "http://www.jordanfitz.com";
	});
	
	function startToy() {
		guiManager.clearElements();
		displayToy = true;

		woodenToy.src = "audio/wooden-toy.mp3";
		woodenToy.volume = 0.5;
	
		woodenToy.onended = function() {
			clearInterval(colorInterval);
			done = true;
			guiManager.addElement(toyReplayButton);
		};
	
		woodenToy.onplay = function() {
			loading = false;			
			
			addAllLyrics();
			
			setTimeout(function() {
				colorInterval = setInterval(function() {
					while (colors[0]._css === pollies[0]._color._css) shuffle(colors);
	
					for (var i = 0; i < 4; i++) {
						pollies[i].setColor(colors[i]);
					}
					currentLyric.setColor(colors[0]);
				}, 705.882352941);
			}, 705.882352941);
		};
	
		woodenToy.oncanplaythrough = function() {
			woodenToy.play();
		};
	}

	function render() {
		canvas.clear(background);

		// if we have pressed the "go" button
		if (displayToy) {
			if (loading) {
				canvas.render(loading);
				return;
			}
	
			if (done) return;
			
			var minInnerSizeX = -1;
			var maxInnerSizeX = -1;
			var minInnerSizeY = -1;
			var maxInnerSizeY = -1;
			
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < pollies[i].vertexCount; j++) {
					pollies[i].moveVertex(j, guru.randomDecimal(true) / 2, guru.randomDecimal(true) / 2);
					if (i === 3) {
						var coords = pollies[i].getVertexCoords(j);
						if (minInnerSizeX === -1 && minInnerSizeY === -1 && maxInnerSizeX === -1 && maxInnerSizeY === -1) {
							minInnerSizeX = coords.x;
							maxInnerSizeX = coords.x;
							minInnerSizeY = coords.y;
							maxInnerSizeY = coords.y;
						}
						if (minInnerSizeX > coords.x) {
							minInnerSizeX = coords.x;
						}
						if (maxInnerSizeX < coords.x) {
							maxInnerSizeX = coords.x;
						}
						if (minInnerSizeY > coords.y) {
							minInnerSizeY = coords.y;
						}
						if (maxInnerSizeY < coords.y) {
							maxInnerSizeY = coords.y;
						}
					}
				}
	
				canvas.render(pollies[i]);
			}
			
			var lyricCalcSize = Math.floor((((maxInnerSizeX - minInnerSizeX) + (maxInnerSizeY - minInnerSizeY)) / 15) + (currentLyric.getTextWidth() / 6));
			
			// Limit the minimum size of the text to 28
			if (lyricCalcSize < 28)
				lyricCalcSize = 28;
			
			console.log(lyricCalcSize);
			
			lyricSize = lyricCalcSize;
			
			canvas.render(currentLyric);
		}
	}

	function init() {
		guru.loadTheme("theme.css");
		
		hasBypass = location.hash.indexOf("bypass-continue-screen") > -1;
		var index = 0;

		for (var i = 3; i >= 0; i--) {
			index++;

			for (var j = 0; j < 20; j++) {
				var x = canvas.width / 2 + (index * 100 + 50) * Math.cos((j * 18) * (Math.PI / 180)),
					y = canvas.height / 2 + (index * 100 + 50) * Math.sin((j * 18) * (Math.PI / 180));

				pollies[i].addVertex(x + guru.random(0, 35, true), y + guru.random(0, 35, true));
			}
		}
		canvas.setGUIManager(guiManager);
		
		if (hasBypass) {
			startToy();
		}
		else {	
			guiManager.addElement(titleLabel);
			guiManager.addElement(descLabel);
			guiManager.addElement(copywriteLabel);
			guiManager.addElement(toyEnterButton);
			toyLinkContainer.addElement(tinfoilLinkButton);
			toyLinkContainer.addElement(jordanLinkButton);
			guiManager.addElement(toyLinkContainer);
		}

		guru.createLoop(render);
	}

	init();
})();