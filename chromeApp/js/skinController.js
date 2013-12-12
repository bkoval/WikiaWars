define('skinController', ['gameController', 'messageWall'], function(gameController, messageWall){

	var webv = document.getElementById('foo');
	var goBack = document.getElementById('goBack');

	function kill(){
		event.preventDefault();
		event.stopPropagation();
	}

	function init(){
		gameController.start();
		webv.addEventListener('contentload', function() {
  			webv.executeScript({ "file": "js/webviewController.js" });			
		});
		goBack.addEventListener( 'click', function(){
			event.preventDefault();
			if( webv.canGoBack() ){
				webv.go( -1 );
			}
			messageWall.show('click');
		} );
	}

	return {
		init: init
	}

});