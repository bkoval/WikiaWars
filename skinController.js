define('skinController', ['gameController', 'messageWall'], function(gameController, messageWall){

	var webv = document.getElementById('foo');
	var goBack = document.getElementById('goBack');
	var code1 = "document.addEventListener('click', function(event){debuger;"
	var code2 = "event.preventDefault();event.stopPropagation();});"
	var code = code1+code2;

	function kill(){
		event.preventDefault();
		event.stopPropagation();
	}


	function killForbiddenEvents(){
		var evTab = ['keyup', 'keydown', 'keypress', 'submit', 'click'];
		for( var i = 0; i < evTab.length; i++ ){
			webv.addEventListener( evTab[i], kill );
		}
	}

	function init(){
		gameController.start();
		webv.addEventListener('contentload', function() {
  			killForbiddenEvents();
  			webv.executeScript({ "code": "document.addEventListener('click', function(){debugger;});" });			
		});
		webv.executeScript({"code" : "document.addEventListener( 'click', function(){document.write('helloworld');} );"});
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