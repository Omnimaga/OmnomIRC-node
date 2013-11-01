var oldMessagesKeyHandle = function(e){
	var room = $o.ui.tabs.current().name,
		oldMessages = ($.localStorage('oldMessages-'+room)||[]),
		input = $('#input');
	if(input.data('oldMessageCounter')==oldMessages.length){
		input.data('currentMessage',input.val());
	}
	if(oldMessages.length!=0){
		switch(e.which){
			case 38:
				if(input.data('oldMessageCounter')!=0){
					input.data('oldMessageCounter',input.data('oldMessageCounter')-1);
				}
				input.val(oldMessages[input.data('oldMessageCounter')]);
			break;
			case 40:
				if(input.data('oldMessageCounter')!=oldMessages.length){
					input.data('oldMessageCounter',input.data('oldMessageCounter')+1);
				}
				if(input.data('oldMessageCounter')==oldMessages.length){
					input.val($('#input').data('currentMessage'));
				}else{
					input.val(oldMessages[input.data('oldMessageCounter')]);
				}
			break;
		}
	}
}
hook('start',function(){
	input.keydown(oldMessagesKeyHandle).data({
		'oldMessageCounter':1,
		'currentMessage':''
	});
});
hook('tabswitch',function(newT){
	var room = newT.name,
		oldMessages = ($.localStorage('oldMessages-'+room)||[]);
	$('#input').data('oldMessageCounter',oldMessages.length);
});
hook('load',function(){
	var room = newT.name,
		oldMessages = ($.localStorage('oldMessages-'+room)||[]);
	$('#input').data('oldMessageCounter',oldMessages.length);
});
hook('send',function(msg,room){
	var oldMessages = ($.localStorage('oldMessages-'+room)||[]);
	oldMessages.push(msg);
	if (oldMessages.length>20){
		oldMessages.shift();
	}
	$.localStorage('oldMessages-'+room,oldMessages);
	$('#input').data('oldMessageCounter',oldMessages.length);
	//$o.event('OldMessages','added old message');
	return true;
});
hook('stop',function(){
	$('#input').off(oldMessagesKeyHandle);
});