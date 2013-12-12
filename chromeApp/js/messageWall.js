define( 'messageWall',[], function(){

	var wall = document.getElementById( 'msgWall' );
	var toast = document.getElementById( 'toast' );

	var messages = {
		"click" : "You just clicked a link",
		"error" : "An error occured"
	}

	function show( messageType ){
		wall.innerHTML = '<li>' + messages[messageType] + '</li>' + wall.innerHTML;
		toast.innerHTML = messages[messageType];
		toast.style.display = 'block';
		setTimeout( function(){

			toast.style.display = '';
		}, 2000 );
	}

	return{
		show: show
	}
} );