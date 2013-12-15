define( 'messageWall',[], function(){

	var wall = document.getElementById( 'msgWall' );
	var toast = document.getElementById( 'toast' );

	function show( message ){
		wall.innerHTML = '<li>' + message + '</li>' + wall.innerHTML;
		toast.innerHTML = message;
		toast.classList.add('on');
		setTimeout( function(){

			toast.classList.remove('on')
		}, 4000 );
	}

	function clear(){
		wall.innerHTML = '';
	}

	return{
		show: show,
		clear: clear
	}
} );