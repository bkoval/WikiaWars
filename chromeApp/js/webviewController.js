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

for(var i = 0; i < forbiddenEvents.length; i++){
	document.addEventListener(forbiddenEvents[i], function(){
		kill(event);
	});
}

var forbiddenEvents = [
	'keyup',
	'keydown',
	'keypress',
	'submit',
];

