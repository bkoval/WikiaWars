define('skinController', function(){

	webv = document.getElementById('foo');
	debugger;

	function kill(){
		event.preventDefault();
		event.stopPropagation();
	}

	function killForbiddenEvents(){
		var evTab = ['keyup', 'keydown', 'keypress', 'submit'];
		for( var i = 0; i < evTab.length; i++ ){
			webv.addEventListener( evTab[i], kill );
		}
	}

	function init(){
		killForbiddenEvents();
	}

	return {
		init: init
	}

});