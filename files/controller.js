var controller = {
	// x & y might be used later in order to change which
	// part of map is displayed.
	x: 0,
	y: 0,
	// blockSize in display also needs to be changed if this is
	_blockSize: 25,
	get blockSize() {
		return this._blockSize;
	},
	offsetLeft: 0,
	offsetTop: 0,
	setOffset(x, y) {
		this.offsetLeft = x;
		this.offsetTop = y;
	},
	
	// If canvasMenu is false, click will run as it normally does
	// meaning that clicks will register to map. Else, if it is
	// not false, it'll point to a function that'll will when
	// use clicks.
	_canvasMenu: false,
	set canvasMenu(status) { this._canvasMenu = status; },
	get canvasMenu() { return this._canvasMenu; },
	// menu is for the city selections. Prevents keypresses.
	_menu: false,
	set menu(status) { this._menu = status; },
	get menu() { return this._menu; },

	// There is a start menu due to plans later (options selected by player)
	startMenu() {
		// Note: it sets CanvasMenuStatus to point to startGame!
		this.canvasMenu = this.startGame;
		display.displayStartMenu();
	},
	startGame() {
		this.canvasMenu = false;
		p1 = new Player();
		p1.dispInfo();
		map.makeMap();
		display.startGame();

		game.run();
	},
	keyPressed(e) {
		//Note: keyCode is deprecated
		var that = controller,
			selected = that.selected;

	  if (selected != null) {
	    switch(true) {
	  	  case (e.keyCode == 83): // s key
		    that.settle(p1, selected);
		    break;
		  case (e.keyCode == 66 && // b key
		  	selected.getType() == "settlement"):
		    selected.buildMenu();
		};
	  }
	},
	// reference to instance that user has selected
	selected: null,
	
	clicked(e){
		// handles click of user. Displays info of the clicked
		// cell normally by calling on ui.
		var that = controller;
		that.menu = false;

		if (that.canvasMenu == false) {
			var blockSize = that.blockSize;

			var x = Math.floor( (e.clientX - that.offsetLeft) / blockSize),
				y = Math.floor( (e.clientY - that.offsetTop) / blockSize);

			// Returns obj of what to display (for ui.displayInfo).
			// world[x][y] is a pointer into an instance which has click method
			that.selected = map.getBlock(x, y);

			display.setSelected(x,y);
			display.highlight(x,y);

			that.uiSelect();
		} else {
			(that.canvasMenu).bind(that)();
		}
	},
	uiSelect() {
		// gets info obj from selected & then passes on to ui for it to 
		// display.
		try {
			var obj = this.selected.click();
			ui.setSelected(obj);

			ui.displayInfo(obj.type);
		} catch(e) {
			// Player hasn't selected yet. Left blank.	
		}
		
	},

	highlighted: [0,0],
	highlight(e) {
		// when user scrolls mouse over canvas, this will activate
		// and gives x, y to canvas for which block to highlight
		var that = controller;
		if (that.canvasMenu == false) {
			var hl = that.highlighted,
				blockSize = that.blockSize;

			var x = Math.floor( (e.clientX - that.offsetLeft) / blockSize),
				y = Math.floor( (e.clientY - that.offsetTop) / blockSize);
			if (hl[0] != x || hl[1] != y) {
				that.highlighted = [x,y];

				display.highlight(x,y);
			}
		}	
	},
	settle(player, land) {
		if (land instanceof Land) {
			var settle = player.settle(land),
				obj = settle.click();
				
			this.selected = settle;

			ui.setSelected(obj);
			ui.settleMsg();
		} else {
			ui.notLand();
		}
	},

	run() {
		// functions run in game loop.
	}
};