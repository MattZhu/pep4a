var currentPage=0;
			
var audios=[];
var lastActive,lastAudio;
var container=document.getElementById("container");
var img=document.createElement('img');
container.appendChild(img);
if ('ontouchstart' in document.documentElement){
	img.addEventListener("touchstart", touchstart);
	img.addEventListener("touchend", touchend);
}else {
	img.addEventListener("click", imgClick);

}

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
	if(xMove>60){
		previousPage();
		return;
	}
	if(xMove<-60){
		nextPage();
		return;
	}
}
function init(page){				
	container.innerHTML='';
	container.appendChild(img);
	var unitHeader=document.getElementById("unit");
	if(page.unit!==undefined){
		document.title='PEP 4A - '+units[page.unit].title;
	}else{
		document.title='PEP 4A';
   }

		img.src='picture/'+page.image;	
	img.onload=function(){
		var scale=img.clientWidth/540;
		console.log("scale:",scale);
		audios=[];
		for(var i=0;i<page.audio.length;i++){
			var audio=page.audio[i];
			var div=document.createElement('div');
            if(audio.right){
				audio.width=audio.right-audio.left;
				audio.height=audio.bottom-audio.top;
			}
			console.log("audio",i,"left:"+scaleValue(audio.left,scale)+",top:"+scaleValue(audio.top,scale)
			+",width:"+scaleValue(audio.width,scale)+",height:"+scaleValue(audio.height,scale));
			div.style.position='absolute';
			div.style.boxSizing='border-box';
			div.style.left=scaleValue(audio.left,scale)+'px';
			div.style.top=scaleValue(audio.top,scale)+'px';
			div.style.height=scaleValue(audio.height,scale)+'px';
			div.style.width=scaleValue(audio.width,scale)+'px';
			container.appendChild(div);
			var audioEle=document.createElement('audio');
			audioEle.src='audio/'+audio.src;
			audioEle.preload='auto';
			audios[i]=audioEle;
			div.setAttribute('idx',i);
			div.addEventListener("click", playAudio);
		}
	}
}
function scaleValue(val,s){
	return Math.round(val*s);
}

function playAudio(){
	if(lastActive){
		lastActive.classList.remove('active');
		if(!lastAudio.ended){
			lastAudio.pause();
			lastAudio.currentTime=0;
		}
	}
	lastActive=this;
	this.classList.add('active');	
	lastAudio=audios[this.getAttribute('idx')];
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
		 currentPage=u.firstPage;
	}
}
init(pages[currentPage]);