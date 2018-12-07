/**图形中每个单元格的构造函数**/
function Cell(row, col, img){
	this.row = row; //当前单元格行下标
	this.col = col; //当前单元格列下标
	this.img = img;
	//单元格下落一步
    if(!Cell.prototype.softDrop){
		Cell.prototype.softDrop=function(){this.row++;}
	}

	/*v07*/
	//单元格右移
	if(!Cell.prototype.moveRight){
		Cell.prototype.moveRight=function(){this.col++;}
	}
    //单元格左移
    if(!Cell.prototype.moveLeft){
		Cell.prototype.moveLeft=function(){this.col--;}
	}
	
}
/*V09*/
/**每种图形的一种旋转状态**/
function State(row0,col0, row1, col1, row2, col2, row3, col3){
	this.row0 = row0;
	this.col0 = col0;
	this.row1 = row1;
	this.col1 = col1;
	this.row2 = row2;
	this.col2 = col2;
	this.row3 = row3;
	this.col3 = col3;
}
/*所有图形的父类型，定义共同属性img和ori*/
function Shape(img,orgi){
	this.img=img;
	this.orgi=orgi;
	/*V09*/
	this.statei=0;
	this.states=[];

	//四格方块的下落
    if(!Shape.prototype.hasOwnProperty("softDrop"))
		Shape.prototype.softDrop = function(){
		for(var i=0;i<4;i++){
			this.cells[i].softDrop();
		}
	}

	/*v07*/
	//整个图形右移
    if(!Shape.prototype.moveRight){
		Shape.prototype.moveRight=function(){
			for(var i=0; i<this.cells.length; i++){
				this.cells[i].moveRight();
			}
		}
	}
	//整个图形左移
    if(!Shape.prototype.moveLeft){
		Shape.prototype.moveLeft=function(){
			for(var i=0; i<this.cells.length; i++){
				this.cells[i].moveLeft();
			}
		}
	}

	/*V09*/
	if(!Shape.prototype.rotateR){
		Shape.prototype.rotateR=function(){
			//首先判断图形是否是O型图形
			if(Object.getPrototypeOf(this)!=O.prototype){
				//下一个旋转状态
				this.statei!=this.states.length-1?
					this.statei++:this.statei=0;
				var state=this.states[this.statei]; 
				//轴点位置不变
				var r=this.cells[this.orgi].row;	
				var c=this.cells[this.orgi].col;
				for(var i=0;i<this.cells.length;i++){
					this.cells[i].row = r + state["row"+i];
					this.cells[i].col = c + state["col"+i];
				}
			}
		}
	}
	if(!Shape.prototype.rotateL){
		Shape.prototype.rotateL=function(){
			if(Object.getPrototypeOf(this)!=O.prototype){
			//下一个旋转状态
			this.statei!=0?
				this.statei--:this.statei=this.states.length-1;
			var state=this.states[this.statei]; 
			//轴点位置不变
			var r=this.cells[this.orgi].row;	
			var c=this.cells[this.orgi].col;
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].row=r+state["row"+i];
				this.cells[i].col=c+state["col"+i];
			}
			}
		}
	}
}
/**图形O的构造函数:
图形出现位置,及每个单元格下标始终固定**/
function O(){
	Shape.call(this,tetris.IMGS.O,0);
	Object.setPrototypeOf(O.prototype,new Shape());
	this.cells=[
		new Cell(0,4,this.img),new Cell(0,5,this.img),
		new Cell(1,4,this.img),new Cell(1,5,this.img)
	];
}

/**七种图形之二：I型**/
function I(){
	Shape.call(this,tetris.IMGS.I,1);
	Object.setPrototypeOf(I.prototype,new Shape());
	this.cells=[
		new Cell(0,3,this.img),
		new Cell(0,4,this.img),
		new Cell(0,5,this.img),
		new Cell(0,6,this.img)
	];
	this.states[0]=new State(0,-1, 0,0, 0,1, 0,2);
	this.states[1]=new State(-1,0, 0,0, 1,0, 2,0);
}
/**七种图形之三：T型**/
function T(){
	Shape.call(this,tetris.IMGS.T,1);
	Object.setPrototypeOf(T.prototype,new Shape());
	this.cells=[
new Cell(0,3,this.img),new Cell(0,4,this.img),new Cell(0,5,this.img),
				  new Cell(1,4,this.img)
	];
	this.states[0] = new State(0,-1, 0,0, 0,1, 1,0);
	this.states[1] = new State(-1,0, 0,0, 1,0, 0,-1);
	this.states[2] = new State(0,1, 0,0, 0,-1, -1,0);
	this.states[3] = new State(1,0, 0,0, -1,0, 0,1);
}

function S(){//04 05 13 14
	Shape.call(this,tetris.IMGS.S,3);
	Object.setPrototypeOf(S.prototype,new Shape());
	this.cells=[
		new Cell(0,4,this.img),
		new Cell(0,5,this.img),
		new Cell(1,3,this.img),
		new Cell(1,4,this.img)
	];

	this.states[0] = new State(0,-1, -1,0, -1,1, 0,0);
	this.states[1] = new State(-1,0, 0,1, 1,1, 0,0);
}
function Z(){//03 04 14 15
	Shape.call(this,tetris.IMGS.Z,2);
	Object.setPrototypeOf(Z.prototype,new Shape());
	this.cells=[
		new Cell(0,3,this.img),
		new Cell(0,4,this.img),
		new Cell(1,4,this.img),
		new Cell(1,5,this.img)
	];

	this.states[0] = new State(-1,-1, -1,0, 0,0, 0,1);
	this.states[1] = new State(-1,1, 0,1, 0,0, 1,0);
}
function L(){//03 04 05 13
	Shape.call(this,tetris.IMGS.L,1);
	Object.setPrototypeOf(L.prototype,new Shape());
	this.cells=[
		new Cell(0,3,this.img),
		new Cell(0,4,this.img),
		new Cell(0,5,this.img),
		new Cell(1,3,this.img)
	];

	this.states[0] = new State(0,1, 0,0, 0,-1, -1,1);
	this.states[1] = new State(1,0, 0,0, -1,0, 1,1);
	this.states[2] = new State(0,-1, 0,0, 0,1, 1,-1);
	this.states[3] = new State(-1,0, 0,0, 1,0, -1,-1);
}
function J(){//03 04 05 15
	Shape.call(this,tetris.IMGS.J,1);
	Object.setPrototypeOf(J.prototype,new Shape());
	this.cells=[
		new Cell(0,3,this.img),
		new Cell(0,4,this.img),
		new Cell(0,5,this.img),
		new Cell(1,5,this.img)
	];

	this.states[0] = new State(0,-1, 0,0, 0,1, 1,1);
	this.states[1] = new State(-1,0, 0,0, 1,0, 1,-1);
	this.states[2] = new State(0,1, 0,0, 0,-1, -1,-1);
	this.states[3] = new State(1,0, 0,0, -1,0,-1,1);
}
