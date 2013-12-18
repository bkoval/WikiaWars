/**
 * Module for handling webview and looks of the app
 * 
 * @author Bartłomiej Kowalczyk brt.kowal@gmail.com
 */

define('skinController', ['gameController', 'templates'], function(gameController, templates){

	var webv = document.getElementById('foo');
	var goBack = document.getElementById('goBack');
	var wrapper = webv.parentElement;
	var url = 'http://alistra.wikia-dev.com/';
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
	var enableBack = false;

	//Wrapper for killing UI events
	function kill(){
		event.preventDefault();
		event.stopPropagation();
	}

	//ToDo -> css way to make it responsive
	function resizeWebv(){
		wrapper.style.height = (window.innerHeight - 70) + 'px';
	}

	//Gets JSON from server and initializes webview and title bar if ok
	function init(){
		microAjax(url, function (data) {
  			if(!data){
  				curtain.classList.add('on');
				scoreBox.classList.add('on');
				scoreBox.innerHTML = templates.connectionError;
  			}
  			res = JSON.parse(data);
  			startPage = res.article1.url;
  			startTitle = res.article1.name;
  			endPage = res.article2.url;
  			endTitle = res.article2.name;
  			webv.setAttribute('src', startPage);
  			artHeader.innerHTML = '<b>' + startTitle + '</b> &rarr; <b>' + endTitle + '</b>';
  			handleWebv();
		});
	}

	//Communicates with webview (js injection, catching load events)
	function handleWebv(){
		if(!webviewReady){
			webv.addEventListener('contentload', function() { 			
	  			webv.executeScript({ "file": "js/webviewController.js" });
	  			webv.style.visibility='';
			});
			webv.addEventListener('loadstop', function() {
			});
			webv.addEventListener('loadstart', function(){
				if( event.isTopLevel && !firstLoad && event.url.indexOf('wikia.com') != -1){
					enableBack = true;
					gameController.addClick();
					webv.style.visibility = 'hidden';
					if( event.url.indexOf(endPage) != -1 ){
						gameController.stopClock();
						endTime = new Date().getTime();
						var seconds = (endTime - startTime) / 1000;
						scoreBox.innerHTML = templates.endGameScreen(gameController.getClicks(), seconds);
						scoreBox.classList.add('on');
						curtain.classList.add('on');
					}
				}
				if(event.isTopLevel && !firstLoad && event.url.indexOf('wikia.com') === -1){
					webv.back();
				}
				else{
					if(firstLoad && event.isTopLevel){
						firstLoad = false;
						startTime = new Date().getTime();
						gameController.startClock();
					}	
				}
			});
			goBack.addEventListener( 'click', function(){
				event.preventDefault();
				if( webv.canGoBack() && enableBack ){
					webv.back();
				}
			} );
			webviewReady = true;
		}
	}

	//Blanks the state of the game and initializes the JSON get process
	function startGame(){
		resizeWebv();
		window.addEventListener('resize', function(){
			resizeWebv();
		});
		curtain.classList.add('on');
		scoreBox.classList.add('on');
		scoreBox.innerHTML = templates.landingScreen;
		document.addEventListener('click', function(){
			if(event.target.id === 'newGame' || event.target.id === 'resetGame'){
					if(event.target.id === 'newGame'){
						scoreBox.classList.remove('on');
						curtain.classList.remove('on');
					}
					firstLoad = true;
					startPage = undefined;
					endPage = undefined;
					enableBack = false;
					gameController.clearClicks();
					artHeader.innerText = '';
					init();
			}
			if(event.target.id === 'rulesButton'){
				scoreBox.innerHTML = templates.rulesScreen;
			}
			if(event.target.id === 'toMainMenu'){
				scoreBox.innerHTML = templates.landingScreen;
			}
		});

	}

	return {
		startGame: startGame
	}

});