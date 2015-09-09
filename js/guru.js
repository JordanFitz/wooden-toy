if (!window.guru) window.guru = {};
if (!guru.shapes) guru.shapes = {};

if (!guru.error) {
	guru.error = function(message) {
		console.log('%c ERROR %c %s', 'background-color: red; color: white;', 'background-color: transparent; color: inherit;', message);
	};
}

if (!guru.warn) {
	guru.warn = function(message) {
		console.log('%c WARN %c %s', 'background-color: gold; color: black;', 'background-color: transparent; color: inherit;', message);
	};
}

if (!guru.success) {
	guru.success = function(message) {
		console.log('%c SUCCESS %c %s', 'background-color: green; color: white;', 'background-color: transparent; color: inherit;', message);
	};
}

if (!guru.log) {
	guru.log = function(message) {
		console.log('%c LOG %c %s', 'background-color: #1c1c1c; color: white;', 'background-color: transparent; color: inherit;', message);
	};
}
if(!guru.getJSON) {
	guru.getJSON = function(url, success, error) {
		var xhr = new XMLHttpRequest();
		
		xhr.open("get", url, true);
		xhr.responseType = "json";

		xhr.onload = function() {
			if(xhr.status === 200) {
				success(xhr.response);
			} else {
				error(xhr.status);
			}
		};

		xhr.send();
	};
}

if(!guru.createID) {
	guru.createID = function() {
		return Math.random().toString(36).substr(2, 9);
	};
}

if (!guru.random) {
	guru.random = function(min, max, allowNegative) {
		var result = Math.floor(Math.random() * (max - min + 1) + min);
		var modifier = 1;

		if (allowNegative) {
			modifier = (Math.round(Math.random()) === 0 ? -1 : 1);
		}

		result *= modifier;

		return result;
	};
}

if(!guru.randomDecimal) {
	guru.randomDecimal = function(allowNegative) {
		var modifier = 1;

		if (allowNegative) {
			modifier = (Math.round(Math.random()) === 0 ? -1 : 1);
		}

		return Math.random() * modifier;
	};
}

if (!guru.createLoop) {
	guru.createLoop = function(callback) {
		function tick() {
			callback();
			window.requestAnimationFrame(tick);
		}

		window.requestAnimationFrame(tick);
	};
}

if (!guru.loadTheme) {
	guru.loadTheme = function(url) {
		var link = document.createElement("link");

		link.id = this._id;
		link.rel = "stylesheet";
		link.type = "text/css";
		link.media = "all";
		link.href = url;

		document.getElementsByTagName("head")[0].appendChild(link);
	};
}
if (!guru.Color) {
	guru.Color = function(r, g, b, a) {
		if (arguments.length === 3 || arguments.length === 4) {
			this._r = r;
			this._g = g;
			this._b = b;
			this._a = 255;

			if (arguments.length === 4) this._a = a;
		} else {
			this._r = 0;
			this._g = 0;
			this._b = 0;
			this._a = 255;
		}

		this._css = "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ")";
	};

	guru.Color.prototype.getRGB = function() {
		return {
			r: this._r,
			g: this._g,
			b: this._b,
			a: this._a
		};
	};

	guru.Color.prototype.setRGB = function(r, g, b, a) {
		if(!a) a = 255;
		
		this._r = r;
		this._g = g;
		this._b = b;
		this._a = a;

		this._css = "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ")";

		return this;
	};

	guru.Color.prototype.fromHex = function(hex) {
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		if(result) {
			this._r = parseInt(result[1], 16);
			this._g = parseInt(result[2], 16);
			this._b = parseInt(result[3], 16);
			this._a = 255;

			this._css = "rgba(" + this._r + ", " + this._g + ", " + this._b + ", " + this._a + ")";
		}

		return this;
	};
}
if (!guru.shapes.Polygon) {
	guru.shapes.Polygon = function() {
		this._color = new guru.Color();
		this._vertices = [];
		this.vertexCount = 0;
	};

	guru.shapes.Polygon.prototype.setColor = function(color) {
		this._color = color;

		return this;
	};

	guru.shapes.Polygon.prototype.addVertex = function(x, y) {
		this._vertices.push([x, y]);

		this.vertexCount = this._vertices.length;

		return this;
	};

	guru.shapes.Polygon.prototype.move = function(x, y) {
		for (var i = this._vertices.length - 1; i >= 0; i--) {
			this._vertices[i][0] += x;
			this._vertices[i][1] += y;
		};
	}

	guru.shapes.Polygon.prototype.moveVertex = function(i, x, y) {
		this._vertices[i][0] += x;
		this._vertices[i][1] += y;
	}

	guru.shapes.Polygon.prototype.render = function(context) {
		var oldStyle = context.fillStyle;
		context.fillStyle = this._color._css;

		context.beginPath();

		for (var i = this._vertices.length - 1; i >= 0; i--) {
			var vertex = this._vertices[i];

			if (i === this._vertices.length - 1) {
				context.moveTo(vertex[0], vertex[1]);
			} else {
				context.lineTo(vertex[0], vertex[1]);
			}
		};

		context.closePath();
		context.fill();

		context.fillStyle = oldStyle;

		return this;
	};
}
if (!guru.shapes.Rectangle) {
	guru.shapes.Rectangle = function(x, y, width, height) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
		this._color = new guru.Color();
	};

	guru.shapes.Rectangle.prototype.setColor = function(color) {
		this._color = color;

		return this;
	};

	guru.shapes.Rectangle.prototype.getPosition = function() {
		return {
			x: this._x,
			y: this._y
		};
	};

	guru.shapes.Rectangle.prototype.move = function(x, y) {
		this._x += x;
		this._y += y;

		return this;
	};

	guru.shapes.Rectangle.prototype.render = function(context) {
		var oldStyle = context.fillStyle;
		context.fillStyle = this._color._css;

		context.fillRect(this._x, this._y, this._width, this._height);
		
		context.fillStyle = oldStyle;

		return this;
	};
}
if(!guru.shapes.Circle) {
	guru.shapes.Circle = function(x, y, radius) {
		this._x = x;
		this._y = y;
		this._radius = radius;
		this._color = new guru.Color();
	};

	guru.shapes.Circle.prototype.setColor = function(color) {
		this._color = color;

		return this;
	};

	guru.shapes.Circle.prototype.getPosition = function() {
		return {
			x: this._x,
			y: this._y
		};
	};

	guru.shapes.Circle.prototype.move = function(x, y) {
		this._x += x;
		this._y += y;

		return this;
	};

	guru.shapes.Circle.prototype.render = function(context) {
		var oldStyle = context.fillStyle;
		context.fillStyle = this._color._css;
		
		context.beginPath();
		context.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, true);
		context.fill();
		context.closePath();

		context.fillStyle = oldStyle;

		return this;
	};
}
if (!guru.TextureManager) {
	guru.TextureManager = function() {
		this._textures = {};
		this.onCompleted = function() {};
	};

	guru.TextureManager.prototype.addTexture = function(id, src) {
		if (this._textures.hasOwnProperty(id)) {
			guru.error("[addTexture] A texture with the ID \"" + id + "\" is already registered within the TextureManager.");

			return this;
		}

		var texture = new Image();

		texture.src = src;
		texture.loaded = false;

		var that = this;

		texture.onload = function() {
			texture.loaded = true;
			if(that.completed()) that.onCompleted();
		}

		this._textures[id] = texture;

		return this;
	};

	guru.TextureManager.prototype.getTexture = function(id) {
		if (!this._textures.hasOwnProperty(id)) {
			guru.error("[getTexture] Texture \"" + id + "\" is not registered within the TextureManager.");

			return null;
		}

		if (!this._textures[id].loaded) {
			guru.warn("[getTexture] Texture \"" + id + "\" has not finished loading.");
		}

		return this._textures[id];
	};

	guru.TextureManager.prototype.completed = function() {
		for (var id in this._textures) {
			if (this._textures.hasOwnProperty(id)) {
				var texture = this._textures[id];
				if (!texture.loaded) return false;
			}
		}

		return true;
	};
}
if (!guru.Text) {
	guru.Text = function(text, x, y, font, size, color) {
		this._text = text;
		this._x = x;
		this._y = y;
		this._font = font;
		this._size = size;
		this._color = color;
		this._centerVertical = false;
		this._centerHorizontal = false;
	}

	guru.Text.prototype.setCentered = function(vertical, horizontal) {
		this._centerVertical = vertical;
		this._centerHorizontal = horizontal;

		return this;
	};

	guru.Text.prototype.setText = function(text) {
		this._text = text;

		return this;
	};
	
	guru.Text.prototype.setColor = function(color) {
		this._color = color;
		
		return this;
	};
	
	guru.Text.prototype.setSize = function(size) {
		this._size = size;
		
		return this;
	};

	guru.Text.prototype.render = function(context) {
		var oldBaseline = context.textBaseline,
			oldTextAlign = context.textTextAlign,
			oldFillStyle = context.fillStyle,
			oldFont = context.font;

		context.textBaseline = (!this._centerVertical ? "top" : "middle");
		context.textAlign = (!this._centerHorizontal ? "left" : "center");

		context.fillStyle = this._color._css;
		context.font = this._size + 'px "' + this._font + '"';

		context.fillText(this._text, this._x, this._y);

		context.textBaseline = oldBaseline;
		context.textAlign = oldTextAlign;
		context.fillStyle = oldFillStyle;
		context.font = oldFont;

		return this;
	};
}
if (!guru.Sprite) {
	guru.Sprite = function(x, y, width, height) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;

		this._cropping = {
			x: 0,
			y: 0,
			width: width,
			height: height
		};

		this._color = new guru.Color();
		this._texture = null;

		this._interval = -1;
		this._frames = [];
		this._frame = 0;

		this._frames.push(this._cropping);
	};

	guru.Sprite.prototype.move = function(x, y) {
		this._x += x;
		this._y += y;

		return this;
	};

	guru.Sprite.prototype.setColor = function(color) {
		this._color = color;

		return this;
	};

	guru.Sprite.prototype.setTexture = function(texture) {
		this._texture = texture;

		return this;
	};

	guru.Sprite.prototype.setCropping = function(cropping) {
		this._cropping = cropping;

		return this;
	};

	guru.Sprite.prototype.addFrame = function(cropping) {
		this._frames.push(cropping);

		return this;
	};

	guru.Sprite.prototype.render = function(context) {
		if (!this._texture) {
			var oldStyle = context.fillStyle;
			context.fillStyle = this._color._css;

			context.fillRect(this._x, this._y, this._width, this._height);

			context.fillStyle = oldStyle;
		} else {
			var cropping = this._frames[this._frame];
			context.drawImage(this._texture, cropping.x, cropping.y, cropping.width, cropping.height, this._x, this._y, this._width, this._height);
		}

		return this;
	};

	guru.Sprite.prototype.incrementAnimation = function() {
		this.setCropping(this._frames[this._frame]);

		if (this._frame < this._frames.length) this._frame++;
		if (this._frame === this._frames.length) this._frame = 0;

		return this;
	};

	guru.Sprite.prototype.stopAnimation = function() {
		clearInterval(this._interval)
		this._interval = -1;

		return this;
	};

	guru.Sprite.prototype.startAnimation = function(speed) {
		var that = this;

		this._interval = setInterval(function() {
			that.incrementAnimation(this);
		}, speed || 150);

		return this;
	};

	guru.Sprite.prototype.loadAnimation = function(url, error) {
		if (!error) {
			error = function(status) {
				guru.error("Could not load animation from \"" + url + "\": " + status + ".");
			};
		}

		var success = function(data) {
			if (data.frames) {
				this._frames = data.frames;
				
				if(this._frames.length === 0) {
					this._frames.push(this._cropping);
				}
			} else {
				guru.warn("Animation \"" + url + "\" did not contain an array of frames.");
			}
		};

		guru.getJSON(url, success, error);

		return this;
	};
}
if (!guru.GUIManager) {
	guru.GUIManager = function(id) {
		this._elements = [];

		this._container = document.createElement("div");
		this._inner = document.createElement("div");

		this._id = "_" + (id || guru.createID());

		this._container.id = "guru-gui-container" + this._id;
		this._container.style["z-index"] = "999";

		this._inner.id = "guru-gui-inner" + this._id;

		this._inner.style.position = "relative";
		this._inner.style.height = "100%";
		this._inner.style.width = "100%";
		this._inner.className = "guru-gui-inner";

		this._container.appendChild(this._inner);

		document.body.appendChild(this._container);
	};
	
	guru.GUIManager.prototype.clearElements = function() {
		while (this._inner.hasChildNodes()) {
			this._inner.removeChild(this._inner.lastChild);
		}
		
		return this;
	};

	guru.GUIManager.prototype.addElement = function(element) {
		this._inner.appendChild(element._element);

		return this;
	};

	guru.GUIManager.prototype.loadTheme = function(url) {
		var style = document.createElement("style");

		if(!(/firefox/.test(navigator.userAgent.toLowerCase()))) {
			guru.warn("Scoped styles are not supported in your browser, this theme will be applied to the entire document. (loadTheme: \"" + url + "\")");
		}

		style.id = this._id;
		style.type = "text/css";
		style.setAttribute("scoped", "");
		style.appendChild(document.createTextNode("@import url('" + url + "');"));

		this._container.appendChild(style);

		return this;
	};
}
if (!guru.GUIElement) {
	guru.GUIElement = function(type, value, id) {
		this._type = type || "button";
		this._value = value || "";
		this._id = id || guru.createID();

		this._element = document.createElement("input");
		this._element.type = this._type;
		this._element.value = this._value;
		this._element.id = this._id;
		this._element.className = "guru-gui-element";

		this.onclick = function() {};

		var that = this;
		this._element.onclick = function(e) {
			that.onclick(e);
		};
	};

	guru.GUIElement.prototype.center = function() {
		this._innerElement = this._element;

		this._element = document.createElement("div");
		this._element.id = this._id;
		this._element.style.width = "100%";
		this._element.style["box-sizing"] = "border-box";
		this._element.style.display = "block";

		this._element.style.textAlign = "center";
		this._innerElement.style.display = "inline-block";

		this._element.appendChild(this._innerElement);

		return this;
	};

	guru.GUIElement.prototype.setPlaceholder = function(value) {
		if (this._innerElement) {
			this._innerElement.placeholder = value;
		} else {
			this._element.placeholder = value;
		}

		return this;
	};

	guru.GUIElement.prototype.applyStyle = function(key, value) {
		if (typeof value === "Number") {
			value = value.toString() + "px";
		}

		if (this._innerElement) {
			this._innerElement.style[key] = value;
		} else {
			this._element.style[key] = value;
		}

		return this;
	};

	guru.GUIElement.prototype.setPosition = function(x, y) {
		if (this._innerElement) {
			this._innerElement.style.position = "absolute";
			this._innerElement.style.top = (y || 0).toString() + "px";
			this._innerElement.style.left = (x || 0).toString() + "px";
		} else {
			this._element.style.position = "absolute";
			this._element.style.top = y.toString() + "px";
			this._element.style.left = x.toString() + "px";
		}

		return this;
	};

	guru.GUIElement.prototype.setOnclick = function(onclick) {
		this.onclick = onclick;

		return this;
	};

	guru.GUIElement.prototype.setValue = function(value) {
		this._value = value || "";

		if(this._innerElement) {
			this._innerElement.value = this._value;
		} else {
			this._element.value = this._value;
		}

		return this;
	};
}
if (!guru.GUILabel) {
	guru.GUILabel = function(value, id) {
		this._value = value || "";
		this._id = id || guru.createID();

		this._element = document.createElement("span");
		this._element.appendChild(document.createTextNode(this._value));
		this._element.id = this._id;
		this._element.className = "guru-gui-label";

		this.onclick = function() {};

		var that = this;
		this._element.onclick = function(e) {
			that.onclick(e);
		};
	};

	guru.GUILabel.prototype.center = function() {
		this._innerElement = this._element;

		this._element = document.createElement("div");
		this._element.id = this._id;
		this._element.style.width = "100%";
		this._element.style["box-sizing"] = "border-box";
		this._element.style.display = "block";

		this._element.style.textAlign = "center";
		this._innerElement.style.display = "inline-block";

		this._element.appendChild(this._innerElement);

		return this;
	};

	guru.GUILabel.prototype.setPlaceholder = function(value) {
		if (this._innerElement) {
			this._innerElement.placeholder = value;
		} else {
			this._element.placeholder = value;
		}

		return this;
	};

	guru.GUILabel.prototype.applyStyle = function(key, value) {
		if (typeof value === "Number") {
			value = value.toString() + "px";
		}

		if (this._innerElement) {
			this._innerElement.style[key] = value;
		} else {
			this._element.style[key] = value;
		}

		return this;
	};

	guru.GUILabel.prototype.setPosition = function(x, y) {
		this._element.style.position = "absolute";
		this._element.style.top = y.toString() + "px";
		this._element.style.left = x.toString() + "px";

		return this;
	};

	guru.GUILabel.prototype.setOnclick = function(onclick) {
		this.onclick = onclick;

		return this;
	};

	guru.GUILabel.prototype.setValue = function(value) {
		this._value = value || "";

		if(this._innerElement) {
			this._innerElement.innerHTML = this._value;
		} else {
			this._element.innerHTML = this._value;
		}
	};
}
if (!guru.Canvas) {
	guru.Canvas = function(selector, options) {
		this._guiManager = null;

		this._element = document.querySelectorAll(selector)[0];
		this._context = this._element.getContext("2d");

		if (options) {
			if (options.width) this._element.width = options.width;
			if (options.height) this._element.height = options.height;

			if (options.fullscreen) {
				this._element.width = window.innerWidth;
				this._element.height = window.innerHeight;

				var oldResize = function() {};

				if (window.onresize) oldResize = window.onresize;

				var that = this;

				window.onresize = function() {
					oldResize();

					if(options.noResize) return;

					that._element.width = window.innerWidth;
					that._element.height = window.innerHeight;

					that.width = that._element.width;
					that.height = that._element.height;
				}

				if(options.css) {
					document.body.style.margin = "0";
					this._element.style.display = "inline-block";
					this._element.style.float = "left";
				}
			}
		}

		this.width = this._element.width;
		this.height = this._element.height;
	};

	guru.Canvas.prototype.clear = function(color) {
		if(color && color._css) {
			this._context.fillStyle = color._css;
			this._context.fillRect(0, 0, this.width, this.height);

			return this;
		}

		this._context.clearRect(0, 0, this.width, this.height);

		return this;
	};

	guru.Canvas.prototype.render = function(renderable) {
		renderable.render(this._context);

		return this;
	};

	guru.Canvas.prototype.setGUIManager = function(guiManager) {
		this._guiManager = guiManager;
		this._guiManager._container.style.position = "absolute";

		this._guiManager._container.style.top = this._element.getBoundingClientRect().top.toString() + "px";
		this._guiManager._container.style.left = this._element.getBoundingClientRect().left.toString() + "px";

		this._guiManager._container.style.width = this.width.toString() + "px";
		this._guiManager._container.style.height = this.height.toString() + "px";

		return this;
	};
}