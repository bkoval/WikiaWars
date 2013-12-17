define( 'gameController', ['messageWall'], function(messageWall){

	var log = []
	var clickCounter = 0;
	var url = 'http://10.10.10.111:8080';
	var clock = document.getElementById('clock').getElementsByTagName('b')[0];
	var clicks = document.getElementById('clicks').getElementsByTagName('b')[0];
	var startTime;
	var endTime;
	var clockOn = false;

	function onTick(){
		var time = new Date().getTime();
		clock.innerText = Math.floor((time - startTime)/1000);
		if(clockOn) setTimeout(onTick, 500);
	}

	function stopClock(){
		clockOn = false;
	}

	function startClock(){
		startTime = new Date().getTime();
		clockOn = true;
		onTick();
	}

	function addClick(){
		clickCounter++;
		clicks.innerText = clickCounter +'';
	}

	function getClicks(){
		return clickCounter;
	};

	function clearClicks(){
		clickCounter = 0;
		clicks.innerText = 0+'';
	}

	function addLog( clickedEl ){

			log.push( 'Clicked ' + clickedEl.getAttribute( 'href' ) );
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
		clickCounter : clickCounter,
		startClock: startClock,
		stopClock: stopClock,
		addClick: addClick,
		clearClicks: clearClicks,
		getClicks: getClicks
	}

} );