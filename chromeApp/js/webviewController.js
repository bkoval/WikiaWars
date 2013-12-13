var wikiaArticle = document.getElementById('WikiaMainContent');

function kill( event ){
	event.preventDefault();
	event.stopPropagation();
}

document.addEventListener( 'click', function(){
	if( !wikiaArticle.contains( event.target ) ){
		kill( event );
	}
} );

var forbiddenEvents = [
	'keyup',
	'keydown',
	'keypress',
	'submit',
];

for(var i = 0; i < forbiddenEvents.length; i++){
	

	document.addEventListener(forbiddenEvents[i], function( event ){
		
		if(event.keyCode && (event.keyCode === 38 || event.keyCode && event.keyCode === 40)){

		}
		else{
			kill(event);
		}
	});
}

