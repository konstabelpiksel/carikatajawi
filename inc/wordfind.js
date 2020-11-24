/*
Based on Touch Compatible WordSearch ©2011 Caleb Jones vtcajones[at]gmail[dot]com
*/

var isMobile = (navigator.userAgent.match(/iPad|iPhone|android/i) != null);

var words = [
['merekayasa', [$('#gd81'), $('#gd82'), $('#gd83'), $('#gd84'), $('#gd85'), $('#gd86'), $('#gd87'), $('#gd88')], 8, '|', false, 'v'],
['melankolik', [$('#gd81'), $('#gd71'), $('#gd61'), $('#gd51'), $('#gd41'), $('#gd31'), $('#gd21'), $('#gd11'), $('#gd01')], 9, '-', false, 'h'],
['unilateral', [$('#gd85'), $('#gd75'), $('#gd65'), $('#gd55'), $('#gd45'), $('#gd35'), $('#gd25'), $('#gd15')], 8, '-', false, 'h'],
['novelis', [$('#gd72'), $('#gd62'), $('#gd52'), $('#gd42'), $('#gd32'), $('#gd22'),], 6, '-', false, 'h'],
['sanitasi', [$('#gd88'), $('#gd77'), $('#gd66'), $('#gd55'), $('#gd44'), $('#gd33'), $('#gd22'), $('#gd11')], 8, '\\', false, 'dd'],
['ekspres', [$('#gd18'), $('#gd28'), $('#gd38'), $('#gd48'), $('#gd58'), $('#gd68'), $('#gd78'), $('#gd88') ], 8, '-', false, 'h'],
['kuarantin', [$('#gd01'), $('#gd02'), $('#gd03'), $('#gd04'), $('#gd05'), $('#gd06'), $('#gd07'), $('#gd08')], 8, '|', false, 'v'],
['fiksyen', [$('#gd10'), $('#gd11'), $('#gd12'), $('#gd13'), $('#gd14')], 5, '|', false, 'v'],
['gerimit', [$('#gd56'), $('#gd46'), $('#gd36'), $('#gd26'), $('#gd16'), $('#gd06')], 6, '-', false, 'h'],
['plagiat', [$('#gd58'), $('#gd57'), $('#gd56'), $('#gd55'), $('#gd54'), $('#gd53')], 6, '|', false, 'v'],
['maya', [$('#gd26'), $('#gd27'), $('#gd28')], 3, '|', false, 'v'],
['moratorium', [$('#gd99'), $('#gd98'), $('#gd97'), $('#gd96'), $('#gd95'), $('#gd94'), $('#gd93'), $('#gd92'), $('#gd91'), $('#gd90')], 10, '|', false, 'v'],
['gegar', [$('#gd43'), $('#gd34'), $('#gd25')], 3, '/', false, 'da'],
['rias', [$('#gd25'), $('#gd24'), $('#gd23'), $('#gd22')], 4, '|', false, 'v'],
['matriks', [$('#gd99'), $('#gd89'), $('#gd79'), $('#gd69'), $('#gd59'), $('#gd49'), $('#gd39')], 7, '-', false, 'h'],
['telefilem', [$('#gd20'), $('#gd30'), $('#gd40'), $('#gd50'), $('#gd60'), $('#gd70'), $('#gd80'), $('#gd90')], 8, '-', false, 'h']
];

$(document).ready(function(){
	for(var i in words){
		$('#senkata').append('<span class="istilah" id="k'+i+'">'+words[i][0]+'</span> ')
	};
	$(".boxstyle").each(addListeners);
	if(isMobile){
		var o=document.getElementById("frame");
		o.ontouchstart=onGridItemTouchStart;
		o.ontouchend=onGridItemTouchEnd;
		o.ontouchmove=onGridItemTouchMove;
	}
});

function checkall(cord){
	for(var i in cord){
		if(!cord[i].hasClass("highlighted")){
			return false;
		}
	}
	return true;
}
function markedsolved(cord, solveclass){
	for(var i in cord){
		cord[i].addClass("solved").addClass("sol"+solveclass);
	}		
}
var selection = false;
function addListeners(){
	if(isMobile)return;
	$(this).mousedown(onGridItemMouseDown);
	$(this).mouseup(onGridItemMouseUp);
	$(this).mouseover(onGridItemMouseOver);
}
function onGridItemTouchStart(evt){
	var e=evt.touches[0];
	var gridItem=gic(e.pageX,e.pageY);
	gridItem.addClass("highlighted");
	var parts=gridItem.attr("id").toString();
	selection={dist:0};
	selection.start = {item:gridItem, x:parts.charAt(2), y:parts.charAt(3)};
	evt.preventDefault();  
	return false;  
}
function onGridItemTouchMove(evt){
	if(selection==false)return;
	var e=evt.touches[0];
	var gridItem=gic(e.pageX,e.pageY);
	var parts=gridItem.attr("id").toString();
	selection.current = {item:gridItem,	x:parts.charAt(2), y:parts.charAt(3)};
	$(".highlighted").removeClass("highlighted");
	drawGridLine(selection.start,selection.current);	
	evt.preventDefault();
	return false;  
}
function onGridItemTouchEnd(evt){
	var e=evt.touches[0];
	var allSolved=true;
	for(var i in words){
		if(checkall(words[i][1]) && selection.dist==words[i][2]){
			words[i][4] = true;
			markedsolved(words[i][1], words[i][5]);
			$('#k'+i).addClass("found");
		}
		if(words[i][4] == false){
			allSolved=false;
		}
	}
	selection=false;
	$(".highlighted").removeClass("highlighted");
	if(allSolved) $('#modal').show();	
	evt.preventDefault();  
	return false;  
}
function onGridItemMouseDown(e){
	var gridItem=$(this);
	gridItem.addClass("highlighted");
	var parts=gridItem.attr("id").toString();
	selection={dist:0};
	selection.start = {
		item:gridItem,
		x:parts.charAt(2),
		y:parts.charAt(3)
	};
}
function onGridItemMouseUp(e){
	var allSolved=true;
	for(var i in words){
		if(checkall(words[i][1]) && selection.dist==words[i][2]){
			words[i][4] = true;
			markedsolved(words[i][1], words[i][5]);
			$('#k'+i).addClass("found");
		}
		if(words[i][4] == false){
			allSolved=false;
		}
	}
	selection=false;
	$(".highlighted").removeClass("highlighted");
	if(allSolved) $('#modal').show();	
}
function onGridItemMouseOver(e){
	if(selection==false)return;
	var gridItem=$(this);
	var parts=gridItem.attr("id").toString();
	selection.current = {
		item:gridItem,
		x:parts.charAt(2),
		y:parts.charAt(3)
	};
	$(".highlighted").removeClass("highlighted");
	drawGridLine(selection.start,selection.current);
}

//------------------------------------------------------
function drawGridLine(start,end){
	var x0=parseInt(start.x);
	var y0=parseInt(start.y);
	var x1=parseInt(end.x);
	var y1=parseInt(end.y);
	
	var dx=Math.abs(x1-x0);
	var dy=Math.abs(y1-y0); 
	var sx=(x0 < x1)? 1:-1;
	var sy=(y0 < y1)? 1:-1;
	var err = dx-dy;
	selection.dist=0;
	while(true){
		selection.dist++;
		gi(x0,y0).addClass("highlighted");
		if (x0 == x1 && y0 == y1) break;
		var e2 = 2*err;
		if(e2 > -dy){
			err -= dy;
			x0 += sx;
		}
		if(e2 <  dx){ 
			err+=dx;
			y0+=sy;
		}
	}
}

function gi(x,y){
	a = x.toString();
	b = y.toString();
	return $("#gd"+a+b);
}

function gic(x,y){
	var c=$("#frame").offset();
	var x=Math.floor((x-c.left)/($(".boxstyle").width()+2));
	var y=Math.floor((y-c.top)/($(".boxstyle").height()+2));
	//var y=Math.floor((y-c.top)/($(".grid-item").height()+2));
	return gi(x,y);
}
