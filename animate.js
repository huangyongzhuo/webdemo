var div2 = document.getElementById('divId2');
var navlist = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var p = document.getElementById('p1');
var i = 1;
// var timer;
var isMoving = false;

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}

var timer = setInterval(
	function(){
		var now = parseInt(getStyle(p,'left'));
		if(now == -400){
			p.style.left = 800 + "px";
		}
		else{	
			p.style.left = now - 3 + "px";
		}				
	},30);
	

		
//轮播下一张
function next(){
	if(isMoving){
		return;
	}
	isMoving = true;
	i++;
	navChange();
	animate(slider,{left:-1200*i},function(){
		if(i > 5){
			slider.style.left = "-1200px";
			i = 1;
		}
		isMoving = false;
	});
}
			
function prev(){
	if(isMoving){
		return;
	}
	isMoving = true;
	i--;
	navChange();
	animate(slider,{left:-1200*i},function(){
		if(i ===0){
			slider.style.left = "-6000px";
			i = 5;
		}
		isMoving = false;
	});
}
var timer = setInterval(next,3000);
//鼠标划入
div2.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
div2.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next,3000);
}
right.onclick = next;
left.onclick = prev;
//小按钮点击时间
for(var j = 0;j<navlist.length;j++){
	navlist[j].idx = j;
	navlist[j].onclick = function(){
		i = this.idx + 1;
		navChange();
		animate(slider,{left:-1200*i});
	}
}
//小按钮背景色
function navChange(){
	for(var j = 0;j<navlist.length;j++){
		navlist[j].className = '';
	}
	if(i === 6){
		navlist[0].className = 'active';
	}else if(i === 0){
		navlist[4].className = 'active';
	}
	else{
		navlist[i - 1].className = 'active';
	}
			
}

function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}