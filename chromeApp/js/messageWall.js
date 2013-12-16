define( 'messageWall',[], function(){

	var wall = document.getElementById( 'msgWall' );
	var toast = document.getElementById( 'toast' );

	function show( message ){
		wall.innerHTML = '<li>' + message + '</li>' + wall.innerHTML;
	}

	function clear(){
		wall.innerHTML = '';
	}

	return{
		show: show,
		clear: clear
	}
} );