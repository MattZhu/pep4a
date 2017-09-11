var currentPage=0;
			
var audios=[];
var lastActive;
var container=document.getElementById("container");
container.addEventListener("touchstart", touchstart);
container.addEventListener("touchend", touchend);
var startX,startY;
function imgClick(e){
	if(e.offsetX>e.currentTarget.width-100){
		nextPage();
	}else if(e.offsetX<100){
		previousPage();
	}
}
function touchstart(e){
	startX=e.touches[0].pageX;
	startY=e.touches[0].pageY;
}
function touchend(e){
	var xMove=e.changedTouches[0].pageX-startX;
	var yMove=e.changedTouches[0].pageY-startY;
	if(xMove>20){
		previousPage();
		return;
	}
	if(xMove<-20){
		nextPage();
		return;
	}
}
function init(page){				
	container.innerHTML='';
	var img=document.createElement('img');
	
	var unitHeader=document.getElementById("unit");
	if(page.unit!==undefined){
		document.title='PEP 4A - '+units[page.unit].title;
	}else{
		document.title='PEP 4A';
   }
	img.src='picture/'+page.image;	
	img.addEventListener("click", imgClick);
	container.appendChild(img);
	img.onload=function(){
		var scale=img.clientWidth/540;
		audios=[];
		for(var i=0;i<page.audio.length;i++){
			var audio=page.audio[i];
			var div=document.createElement('div');
            if(audio.right){
				audio.width=audio.right-audio.left;
				audio.height=audio.bottom-audio.top;
			}
			div.style.position='absolute';
			div.style.left=img.x-container.offsetLeft+audio.left*scale+'px';
			div.style.top=img.y-container.offsetTop+audio.top*scale+'px';
			div.style.height=audio.height*scale+'px';
			div.style.width=audio.width*scale+'px';
			container.appendChild(div);
			var audioEle=document.createElement('audio');
			audioEle.src='audio/'+audio.src;
			audios[i]=audioEle;
			div.setAttribute('idx',i);
			div.addEventListener("click", playAudio);
		}
	}
}

function playAudio(){
	if(lastActive){
		lastActive.classList.remove('active');
	}
	lastActive=this;
	this.classList.add('active');
	audios[this.getAttribute('idx')].play();
}
function nextPage(){
	if(currentPage<pages.length-1){
		currentPage++;
		init(pages[currentPage]);
	}
}
function previousPage(){
	if(currentPage>0){
		currentPage--;
		init(pages[currentPage]);
	}
}
function unit(idx){
	var u=units[idx-1];
	if(u){
		 init(pages[u.firstPage]);
	}
}
init(pages[currentPage]);