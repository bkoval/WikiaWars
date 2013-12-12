define( 'gameController', ['messageWall'], function(messageWall){

	var log = []
	var clickCounter;
	var startPage;
	var endPage;
	var url = 'http://10.10.10.111:8080';

	function addLog( clickedEl ){

			log.push( 'Clicked ' + clickedEl.getAttribute( 'href' ) );
	}

	function register ( event ){
		
		if( event.target.tagName === 'A' ){

			addLog( event.Target );
			clickCounter++;
			messageWall.show( 'click' );
		}
	}

	function start(){
		//reqwest( url, function ( resp ) {
  		//	console.log(resp);
		//} );
	}

	return{
		start : start,
		register : register
	}

} );