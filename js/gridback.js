//
// class GridCell {
// 	constructor(initT) {
// 		this.s = 0;
// 		this.pr = 0;
// 		this.st = 0;
// 		this.x = 0;
// 		this.y = 0;
// 		this.ao = true;
// 		this.div = null;
// 	}
// }
// function createArray(length) {
// 	var arr = new Array(length || 0), i = length;
// 	if(arguments.length > 1) {
// 		var args = Array.prototype.slice.call(arguments, 1);
// 		while(i--) arr[length-1 - i] = createArray.apply(this, args);
// 	}
// 	else {
// 		arr.fill(0);
// 		arr= arr.map(x => new GridCell(x));
// 	}
// 	return arr;
// }

// function initGrid() {
// 	var height = $('#hexagon')[0].clientHeight;
// 	var width = $('#hexagon')[0].clientWidth;
// 	var w = width / size;
// 	var h = height / size;
// 	w = w.toPrecision();
// 	h = Math.floor(h);
// 	console.log(w);
// 	console.log(h);
// 	//h = 1;
// 	var m = Math.max(w,h);
// 	var grid_out  = createArray(w,h);
// 	//console.log("Grid out");
// 	//console.log(grid_out);
// 	var ctx2d = $('#hexagon')[0].getContext('2d');
// 	for(i = 0;i < h;i++) {
// 		for(j = 0;j < w;j++) {
// 			// console.log("j: ");
// 			// console.log(j);
// 			// console.log(grid_out[j]);
// 			// console.log("i: ");
// 			// console.log(i);
// 			grid_out[j][i].y = i;
// 			grid_out[j][i].x = j;
// 			// console.log(grid_out[j][i]);
// 			rotateSquare(ctx2d, grid_out[j][i].x, grid_out[j][i].y, size, -Math.PI/4.);
// 		}
// 	}

// 	return grid_out;
// }
var rows = 8;
var columns = 8;
// var $row = $("<div />", {
//     class: 'row'
// });
var $square = $("<div />", {
    class: 'square'
});

var size = 20;
var grid = 0;//initGrid();//createArray(1,1);
var delay = 20;

function test(objhh, z_ord) {
	objhh[0].style.zIndex = z_ord;
	objhh.toggleClass('rotated');
}

function drawPic(x,y) {


}


$(document).ready(function () {
    console.log("running init");
    var width = Math.max(/*$(document).width()*/20, screen.width);
    var height = Math.max($(document).height(), screen.height);
    var w = width / size;
    var h = height / size;
    console.log("Width: ");
    console.log(width);
    console.log("Height: ");
    console.log(height);
    w = Math.floor(w);
    h = Math.floor(h);
    console.log(w);
    console.log(h);
    columns = w;
    rows = h;
    //rows = 1;
    //add columns to the the temp row object
    for (var j = 0; j < rows; j++) {
	for (var i = 0; i < columns; i++) {
	    sq = $square.clone();
            //console.log(sq);
	    sq[0].style.left = (i*size).toString()+"px";
	    sq[0].style.top = (j*size).toString()+"px";
	    sq[0].id = i.toString()+"x"+j.toString();
	    sq[0].test = j*size;
	    sq[0].onmouseenter = function () {
                //console.log("NickTest");
                test(this, 1);
	    }.bind(sq);
            sq[0].style.zIndex = 0;
            //sq[0].onmouseclick = function() {
            ///    console.log("Test");
            //}.bind(sq);
	    sq[0].onmouseout = function () {//
		test(this, 0);
	    }.bind(sq);
            //console.log("appending new gridcell");
	    $("#background-id").append(sq);
	}
    }
});


//setInterval(repeat, 50);
//setTimeout(repeat, 1000);
function handleSquare(gridcell, ctx) {
	var d = new Date();
	var t = d.getTime();

	//grid[0][0].t = t;
	ctx2d = ctx.getContext('2d');

	var dt = (t - gridcell.st)/150.;
	//console.log("dt: " + dt.toString());
	dt = Math.min(Math.PI*2., Math.max(0.0, dt));

	var zero_one_time_sin = Math.sin(dt);
	var zero_one_time_cos = Math.cos(dt);
	console.log("sine: " + zero_one_time_sin.toString())
	var d_scale = (zero_one_time_sin*0.5);
	console.log("d_scale: " + d_scale.toString())
	var d_rot = Math.atan2(zero_one_time_sin, zero_one_time_cos);
	if(!gridcell.ao) {
		//console.log("Flipping");
		//console.log(dt);
		//var dtp = (t - gridcell.st)/150.;
		//console.log(dtp);
		d_scale = -d_scale;
		//console.log(d_rot);
		d_rot = -d_rot;
		//console.log(d_rot);
	}
	var scale = size*(d_scale + gridcell.s + 1.0);
	console.log("Scale compute: " + scale.toString())
	//console.log("PR: " + gridcell.pr.toString())
	var rot = d_rot + gridcell.pr;
	///console.log("DRot: " + d_rot.toString());
	//console.log("Rot: " + rot.toString());
	if(rot >= 0 && rot <= Math.PI/2.) {
		//not done
		setTimeout(handleSquare, delay, gridcell, ctx);
		gridcell.st = t;
		gridcell.pr += d_rot;
		gridcell.s += d_scale;
	}  else {
		//done - cleanup
		gridcell.st = 0;
		if(gridcell.ao) {
			// end of dilation, max the values
			gridcell.pr = Math.PI/2.;
			gridcell.s = 0.5;
		} else {
			// end of erosion, min the values
			gridcell.pr = 0.;
			gridcell.s = 0.;
		}
	}

	if (rot > Math.PI/2.) {
		// Clip the dilation
		rot = Math.PI/2.;

	} else if(rot < 0.0) {
		// Clip the erosion
		rot = 0.;
	}
	if(scale < size)
		scale = size;
	if(scale > 1.5*size)
		scale = 1.5*size;
	console.log("Scale: " + scale.toString());
	rotateSquare(ctx2d, 50, 50, scale, rot-Math.PI/4.);

	// console.log("Readout:")
	// console.log(dt);
	//console.log(scale);
	//console.log(rot);
	// console.log(gridcell);
	// console.log(scale);
}

function animateIn(ctx) {
	console.log("Animating in");
	grid[0][0].ao = false;
	console.log("Before: ");
	console.log(grid[0][0]);
	var d = new Date();
	var t = d.getTime();

	grid[0][0].st = t-delay;

	handleSquare(grid[0][0], ctx);
	console.log("After: ");
	console.log(grid[0][0]);
}

function animateOut(ctx) {
	console.log("Animating out");
	grid[0][0].ao = true;
	if(grid[0][0].st == 0) {
		var d = new Date();
		var t = d.getTime();
		grid[0][0].st = t;
	}
	handleSquare(grid[0][0], ctx);
}

function repeat() {
	var d = new Date();
	var t = d.getTime();
	var ctx = document.getElementById('hexagon').getContext('2d');
	var zero_one_time_sin = Math.sin(t/500);
	var zero_one_time_cos = Math.cos(t/500);

	var scale = size*(zero_one_time_sin*0.5+1.0);
	var rot = Math.atan2(zero_one_time_cos, zero_one_time_sin);
	rotateSquare(ctx, 50, 50, scale, rot);
}
function clearcanvas() {
	var c = document.getElementById("hexagon");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0, 0, 100, 100);
}

function rotateSquare(ctx, x, y, scale, rot) {


	// hexagon
	var numberOfSides = 4;

	ctx.beginPath();
	ctx.moveTo (x*size*1.5 +  scale * Math.cos(rot), y*size*1.5 +  scale *  Math.sin(rot));
	console.log("start: ");
	console.log(x*size);
	for (var i = 1; i <= numberOfSides;i += 1) {
		ctx.lineTo (x*size*1.5 + scale * Math.cos(i * 2 * Math.PI / numberOfSides +rot),
		y*size*1.5 + scale * Math.sin(i * 2 * Math.PI / numberOfSides+rot));
	}

	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 1;
	ctx.stroke();
}
