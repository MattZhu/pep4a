var currentPage=0;
			
var audios=[];
var lastActive;
var container=document.getElementById("container");
var startX,startY;
container.addEventListener("mousedown", mousedownHandler);
container.addEventListener("click", imgClick);	

function imgClick(e){
	if(e.offsetX>e.currentTarget.width-20){
		nextPage();
	}else if(e.offsetX<20){
		previousPage();
	}
}
function init(page){				

	var unitHeader=document.getElementById("unit");
	if(page.unit!==undefined){
		document.title='PEP 4A - '+units[page.unit].title;
	}else{
		document.title='PEP 4A';
   }

	container.style.backgroundImage="url('picture/"+page.image+"')";
	container.style.backgroundSize ="540px 800px";
}
var initialW,initialH;

var positionEle= document.getElementById("positionEle");
var ghost = document.getElementById('ghost');
var currentW,currentY;
function mousedownHandler(e){
	
	 console.log("mousedownHandler offsetX, offsetY,pageX,pageY",e.offsetX,e.offsetY,e.pageX,e.pageY);
	currentX=0;
	currentY=0;
		ghost.width=0;
		ghost.height=0;
		ghost.style.position='absolute';
		ghost.style.left=e.offsetX+"px";
		ghost.style.top=e.offsetY+"px";
     initialW = e.offsetX;
     initialH = e.offsetY;
     container.addEventListener("mouseup", mouseupHandler);
     container.addEventListener("mousemove", openSelector);
}

function copy(){
	positionEle.select();
	document.execCommand("copy");
}

function mouseupHandler(e) {
	container.removeEventListener("mousemove", openSelector);
    container.removeEventListener("mouseup", mouseupHandler);

	console.log("mouseupHandler offsetX, offsetY,pageX,pageY",e.offsetX,e.offsetY,e.pageX,e.pageY);
	
    var aTop = ghost.offsetTop
    var aLeft = ghost.offsetLeft
    var aW = Math.abs(currentX)
    var aH = Math.abs(currentY)

    positionEle.innerHTML="{left:"+aLeft+",top:"+aTop+",right:"+(aLeft+aW)+",bottom:"+(aTop+aH)+",src:''}";
}

function openSelector(e) {
    currentX += e.movementX;	
    currentY += e.movementY;
	var w=Math.abs(currentX);
    var h =Math.abs(currentY); Math.abs(initialH - e.offsetY);
	console.log("openSelector offsetX, offsetY,pageX,pageY,w,h",e.offsetX,e.offsetY,e.pageX,e.pageY,e.movementX,e.movementY);
	
  
    	ghost.style.width=w+"px";
		ghost.style.height=h+"px";
		if(currentX<0){
			ghost.style.left=e.offsetX+"px";
		}
		else{
			ghost.style.left=initialW+"px";		
		}
		if(currentY<0){
			ghost.style.top=e.offsetY+"px";
		}
		else{		
			ghost.style.top=initialH+"px";
		}
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