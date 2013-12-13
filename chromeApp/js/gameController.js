define( 'gameController', ['messageWall'], function(messageWall){

	var log = []
	var clickCounter = 0;
	var url = 'http://10.10.10.111:8080';

	function addLog( clickedEl ){

			log.push( 'Clicked ' + clickedEl.getAttribute( 'href' ) );
	}

	function register( event ){
		
		if( event.target.tagName === 'A' ){

			addLog( event.Target );
			clickCounter++;
			messageWall.show( 'click' );
		}
	}

	function start(){
		microAjax(url, function (res) {
  			console.log(res);
  			startPage = res.articlle1.url;
  			endPage = res.article2.url;
		});
	}

	return{
		start : start,
		register : register,
		clickCounter : clickCounter
	}

} );