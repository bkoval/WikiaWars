define('skinController', ['gameController', 'messageWall'], function(gameController, messageWall){

	var webv = document.getElementById('foo');
	var goBack = document.getElementById('goBack');
	var wrapper = webv.parentElement;
	var url = 'http://10.10.10.111:8080';
	var startPage;
	var startTitle;
	var endPage;
	var endTitle;
	var artHeader = document.getElementById('articles');
	var scoreBox = document.getElementById('scoreBox');
	var curtain = document.getElementById('curtain');
	var newGame = document.getElementById('newGame');
	var resetGame = document.getElementById('resetGame');
	var firstLoad = true;
	var webviewReady = false;
	var startTime;
	var endTime;
	var rules = '<h4>Both time and number of clicks matter! Remember - You\'ll be able to click only on article links!</h4>';

	function kill(){
		event.preventDefault();
		event.stopPropagation();
	}

	function init(){
		microAjax(url, function (data) {
  			if(!data){
  				curtain.classList.add('on');
				scoreBox.classList.add('on');
				scoreBox.innerHTML = "<h3>There seems to be a connection / server error.</h3><button class='btn btn-lg btn-info' id='newGame'>Try Again</button>";
  			}
  			res = JSON.parse(data);
  			startPage = res.article1.url;
  			startTitle = res.article1.name;
  			endPage = res.article2.url;
  			endTitle = res.article2.name;
  			webv.setAttribute('src', startPage);
  			artHeader.innerHTML = '<b>' + startTitle + '</b> --> <b>' + endTitle + '</b>';
  			handleWebv();
		});
	}

	function handleWebv(){
		if(!webviewReady){
			webv.addEventListener('contentload', function() { 			
	  			webv.executeScript({ "file": "js/webviewController.js" });
			});
			webv.addEventListener('loadstop', function() { 			
	  			webv.style.height='';
	  			wrapper.classList.remove('loading');
			});
			webv.addEventListener('loadstart', function(){
				if( event.isTopLevel && !firstLoad ){
					gameController.clickCounter++;
					webv.style.height='0px';
					wrapper.classList.add('loading');
					messageWall.show('You clicked a link to <b>' + event.url + '</b>. Current Score: ' + 
						gameController.clickCounter + ' clicks.');
					if( event.url.indexOf(endPage) != -1 ){
						endTime = new Date().getTime();
						var seconds = (endTime - startTime) / 1000;
						var result = 'You won the game with ' + gameController.clickCounter + ' clicks in ' + seconds + ' seconds!';
						messageWall.show(result);
						scoreBox.innerHTML = '<h2>' + result + '</h2>' + "<button class='btn btn-lg btn-info' id='newGame'>Play Again</button>";
						scoreBox.classList.add('on');
						curtain.classList.add('on');
					}
				}
				if(firstLoad) {
					firstLoad = false;
					startTime = new Date().getTime();
				}
			});
			if(!webviewReady) webviewReady = true;
			
		}

		goBack.addEventListener( 'click', function(){
			event.preventDefault();
			if( webv.canGoBack() ){
				webv.go( -1 );
			}
			messageWall.show('You went back. Still counts as a click! Current Score: ' + 
					gameController.clickCounter + ' clicks.');
		} );
	}

	function startGame(){
		wrapper.style.height = (window.innerHeight - document.getElementsByClassName('navbar')[0].offsetHeight - 50) + 'px';
		window.addEventListener('resize', function(){
			wrapper.style.height = (window.innerHeight - document.getElementsByClassName('navbar')[0].offsetHeight - 50) + 'px';
		});
		curtain.classList.add('on');
		scoreBox.classList.add('on');
		scoreBox.innerHTML = "<img class='starting-logo' src='img/logo.png'>"+"<button class='btn btn-lg btn-info' id='newGame'>Play Now!</button>"+rules;
		document.addEventListener('click', function(){
			if(event.target.id === 'newGame' || event.target.id === 'resetGame'){
					if(event.target.id === 'newGame'){
						scoreBox.classList.remove('on');
						curtain.classList.remove('on');
					}
					firstLoad = true;
					startPage = undefined;
					endPage = undefined;
					messageWall.clear();
					gameController.clickCounter = 0;
					artHeader.innerText = '';
					init();
			}
		});

	}

	return {
		startGame: startGame
	}

});