$(document).ready(function(){
	WhiteboardUi.init($("#canvas"));

	//create white color board
	var blankimgcounter = 1;
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	context.fillStyle="#FFFFFF";
	context.fillRect(0,0,960,540);
	loadimagecanvas();

	$(document).on('mouseleave', '#canvas', function(){
		var img = Canvas2Image.saveAsPNG(Whiteboard.canvas, true);
		$('#imgslider li img[src="'+$('#canvas').attr('data-url')+'"]').attr('data-image', img.src);
	});
	$(document).on('click', '.controlicon', function(){
		$('.controlicon.active').removeClass('active');
		$(this).addClass('active');
	});
	$(document).on('click', '.coloricon', function(){
		$('.coloricon.active').removeClass('active');
		$(this).addClass('active');
	});
	$(document).on('click', '#button_clearall', function(){
		$('#imgslider li img[src="'+$('#canvas').attr('data-url')+'"]').attr('data-image', '');
		$('#imgslider li img[src="'+$('#canvas').attr('data-url')+'"]').trigger('mousedown');
	});
	$(document).on('mousedown', '#imgslider img', function(){
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var imageObj = new Image();
		var canvas_ratio = 640/480;
		imageObj.src = $(this).attr('src');
		imageObj.onload = function() {
			var rw = imageObj.width / 640; // width and height are maximum thumbnail's bounds
			var rh = imageObj.height / 480;

			if (rw > rh){
				var newh = Math.round(imageObj.height / rw);
				var neww = 640;
			}else{
				var neww = Math.round(imageObj.width / rh);
				var newh = 480;
			}
			//clear the canvas
			context.fillStyle="#FFFFFF";
			context.fillRect(0,0,640,480);
			if(neww < 640){
				var startxpt = (640-neww)/2;
			}else{
			  var startxpt = 0;
			}
			if(newh < 480){
				var startypt = (480-newh)/2;
			}else{
			  var startypt = 0;
			}
			context.drawImage(imageObj, startxpt, startypt, neww, newh);
		};
		$('#canvas').attr('data-url', $(this).attr('src'));
		for(i=0;i<$('video').length; i++){
			var video = $('video').get(i);
			video.pause();
		}
		Whiteboard.extraevents=Whiteboard.events=[];
	});
	$(document).on('mousedown', 'canvas', function(){
		var $this = $(this);
		for(i=0;i<$('video[src="'+$this.attr('data-url')+'"]').length; i++){
			var video = $('video[src="'+$this.attr('data-url')+'"]').get(i);
			video.pause();
		}
	});

});

function loadimagecanvas(){
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	var canvas_ratio = 640/480;
	imageObj.src = $('#imgslider li:first img').attr('src');
	imageObj.onload = function() {
		var rw = imageObj.width / 640; // width and height are maximum thumbnail's bounds
		var rh = imageObj.height / 480;

		if (rw > rh){
			var newh = Math.round(imageObj.height / rw);
			var neww = 640;
		}else{
			var neww = Math.round(imageObj.width / rh);
			var newh = 480;
		}
		//clear the canvas
		context.fillStyle="#FFFFFF";
		context.fillRect(0,0,640,480);
		if(neww < 640){
			var startxpt = (640-neww)/2;
		}else{
		  var startxpt = 0;
		}
		if(newh < 480){
			var startypt = (480-newh)/2;
		}else{
		  var startypt = 0;
		}
		context.drawImage(imageObj, startxpt, startypt, neww, newh);
	};
	$('#canvas').attr('data-url', $('#imgslider li:first img').attr('src'));
	for(i=0;i<$('video').length; i++){
		var video = $('video').get(i);
		video.pause();
	}
	Whiteboard.extraevents=Whiteboard.events=[];
}