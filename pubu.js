window.onload=function(){
	imgLocation("content","box");
	var imgData={"data":[
	{"src":"image/1.jpg"},
	{"src":"image/6.jpg"},
	{"src":"image/3.jpg"},
	{"src":"image/4.jpg"},
	{"src":"image/5.jpg"},
	{"src":"image/2.jpg"},
	{"src":"image/7.jpg"},
	{"src":"image/8.jpg"},
	{"src":"image/9.jpg"},
	{"src":"image/10.jpg"},
	{"src":"image/11.jpg"},
	{"src":"image/12.jpg"},
	{"src":"image/13.jpg"},
	{"src":"image/14.jpg"},
	{"src":"image/15.jpg"},
	{"src":"image/16.jpg"},
	]
}
	window.onscroll=function(){
		if(checkFlag()){
			var cparent=document.getElementById("content");
			for(var i=0;i<imgData.data.length;i++){
				var ccontent=document.createElement("div");
				ccontent.className="box";
				cparent.appendChild(ccontent);
				var boximg= document.createElement("div");
				boximg.className="box_img";
				ccontent.appendChild(boximg);
				var img=document.createElement("img");
				img.src=imgData.data[i].src;
				boximg.appendChild(img);
			}
			imgLocation("content","box");
		}
	}
}

function checkFlag(){
	var cparent=document.getElementById("content");
	var ccontent=getChildElement(cparent,"box");
	// 已最后一张距离顶部高度做标准
	var contentHeight=ccontent[ccontent.length-1].offsetTop;
	// 滑动高度
	var scroll=document.documentElement.scrollTop||document.body.scrollTop;
	// 可见高度
	var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
	if(contentHeight<scroll+pageHeight){
		return true;
	}
}
function imgLocation(parent,content){
	// 将parent父级下有的content全部取出
	var cparent= document.getElementById(parent);
	// console.log(cparent);
	//传入class 值 box
	var ccontent=getChildElement(cparent,content);
	// console.log(ccontent);
	//获取当个图片宽度
	var imgWidth= ccontent[0].offsetWidth;
	// 获取屏幕宽度 除以当个图片宽度   获得一排最多显示几条;向下取整
	var cols=Math.floor(document.documentElement.clientWidth / imgWidth);
	// 更改属性样式
	cparent.style.cssText = "width : " + imgWidth * cols + "px;margin:0 auto;";

	// 承载第一排的高度
	var  BoxHeighttArr=[];
	for(var i=0;i<ccontent.length;i++){
		// 第一排每排个数 即为第一排所以
		if(i<cols){
			BoxHeighttArr[i]=ccontent[i].offsetHeight;
			// console.log(BoxHeighttArr[i]);
		}else{
			var Minheight= Math.min.apply(null,BoxHeighttArr);
			// console.log(Minheight);
			// 最小位置
			var minIndex=getminheightLocation(BoxHeighttArr,Minheight);
			ccontent[i].style.position="absolute";
			ccontent[i].style.top=Minheight+"px";
			ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
			BoxHeighttArr[minIndex]=BoxHeighttArr[minIndex]+ccontent[i].offsetHeight;
		}
		
	}
}
function getminheightLocation(BoxHeighttArr,Minheight){
	for(var i in BoxHeighttArr){
		if(BoxHeighttArr[i] == Minheight){
			return i;
		}
	}
}
function getChildElement(parent,content){
	// 创建一个数组放入盒子内所包含的数量
	var contentArr=[];
	//获取所以name值
	var allcontent=parent.getElementsByTagName("*");
	// console.log(allcontent);
	// 遍历class值
	for(var i=0;i<allcontent.length;i++){
		//过滤无用name属性
		if(allcontent[i].className==content){
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}