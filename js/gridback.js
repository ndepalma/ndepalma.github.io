// We don't know these yet 
var rows = null;
var columns = null;

// Basic div square we can use to color and such
var $square = $("<div />", {
    class: 'square'
});

// Initialize the grid
var pixmaps = [robot, ufo, arcade];
var grid = new math.SparseMatrix()
grid.resize([10000,10000])

// some parameters
var size = 15;
var delay = 15;
var nrotates = 500;


/**
 * A function that rotates a square
 */
function rotate_square(objhh, z_ord) {
    //console.log(objhh);
    objhh.zIndex(z_ord);
	  //objhh[0].style.zIndex = z_ord;
	  objhh.toggleClass('rotated');
}

function get_id(x,y) {
    id = "U"+x.toString()+"x"+y.toString();
    return id;
}

function does_exist(x,y) {
    return !(grid.get([x,y]) == 0);
}

function create_block(x, y) {
 	  sq = $square.clone();
    //console.log(sq);
    sq[0].style.left = (x*size).toString()+"px";
    sq[0].style.top = (y*size+1).toString()+"px";
    sq[0].id = get_id(x,y); 
    sq[0].style.zIndex = 0;
    //console.log("appending new gridcell");
    $("#background-id").append(sq);

    grid.set([x,y], 1);
}


/**
 * Draw a picture into the grid
 */ 
function drawPic(x,y, w, h, pix) {
    //console.log("Print robot");
    //console.log(robot);
    for(j = 0;j < pix.length;j++) {
        jy = y+j;
        if(jy < 0 || jy >= h)
            continue;
        for(i = 0;i < pix[0].length;i++) {
            ix = x+i;
            if(ix < 0 || ix >= w)
                continue;
            if(pix[j][i] !== "#FFFFFF") {
                create_block(ix,jy);
                id = "#U"+ix.toString()+"x"+jy.toString();
                //console.log("Setting " + id + " to " + pix[j][i]);
                $(id).css( "background-color",pix[j][i]);
            }
        }
    }
}


function init() {
    // console.log("running init");
    var width = Math.max(/*$(document).width()*/20, screen.width);
    var height = Math.max($(document).height(), screen.height);
    var w = width / size;
    var h = height / size;
    // console.log("Width: ");
    // console.log(width);
    // console.log("Height: ");
    // console.log(height);
    w = Math.floor(w);
    h = Math.floor(h);
    // console.log(w);
    // console.log(h);
    columns = w;
    rows = h;

    rows = 80;
    columns = 30;
    //add columns to the the temp row object
    // for (var j = 0; j < rows; j++) {
    // 	  for (var i = 0; i < columns; i++) {
    //         create_block(i, j);
    // 	  }
    // }
    for(i = 0;i < 4;i++) {
        whattodraw = Math.floor(Math.random() * pixmaps.length); 
        atx = Math.floor(Math.random() * w*0.7);
        aty = Math.floor(Math.random() * h*0.7);
        drawPic(atx,aty,w,h, pixmaps[whattodraw]);
    }

    populated = new math.SparseMatrix();
    populated.resize([10000,10000]);
    for(j = 0;j < nrotates;j++) {
        do {
            atx = Math.floor(Math.random() * w*0.7);
            aty = Math.floor(Math.random() * h*0.7);
            // atx = 10;
            // aty = 10;
        } while(populated.get([atx,aty])==1);
        populated.set([atx,aty],1);

        if(!does_exist(atx, aty)) {
            // console.log("Creating...");
            create_block(atx,aty);
        }
        sq = $("#"+get_id(atx,aty));
        sq.css( "opacity", 1.0);
        // if(Math.floor(Math.random()*5) == 0) {
        sq[0].onmouseenter = function () {
            console.log("Entered");
            rotate_square(this, 5);
        }.bind(sq);
        sq[0].onmouseout = function () {//
            rotate_square(this, 0);
        }.bind(sq);
    }

}


