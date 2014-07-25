// ==UserScript==  
// @name         北京人事局平台自动登录工具
// @version		 1
// @author       jhzhuustc@gmail.com
// @namespace    com.toKnowEverything.help
// @icons        logo.png
// @description  北京人事局平台自动登录工具
// @include      *http://210.73.77.4/*
// @require	 https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UsesrScript== 



function withjQuery(callback, safe){
	if(typeof(jQuery) == "undefined") {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";

		if(safe) {
			var cb = document.createElement("script");
			cb.type = "text/javascript";
			cb.textContent = "jQuery.noConflict();(" + callback.toString() + ")(jQuery, window);";
			script.onreadystatechange = function() {
				if( script.readyState == 'complete' )
				{
					//alert( 'load success' );
					document.getElementsByTagName('head')[0].appendChild(cb);
					callback( jQuery, window );
				}
			} ;
		}
		else {
			var dollar = undefined;
			if(typeof($) != "undefined") dollar = $;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$ = dollar;
				callback(jQuery, window);
			});
		}
		
		document.getElementsByTagName('head')[0].appendChild(script);
	} else {
		setTimeout(function() {
			//Firefox supports
			callback(jQuery, typeof unsafeWindow === "undefined" ? window : unsafeWindow);
		}, 30);
	}
}


function onjQuery( $, window )
{
	//alert( 'onjQuery' );
	function startLogin()
	{
		id = setInterval( function()
			{
				//console.log( 'try login' );
				document.forms[0].submit();
			}, 1000 );

	}

	function checkLogin()
	{
		var ret = 0;
		var node1 = $( "img[src='images/login_r1_c1.jpg']" );
		var node2 = $( "img[src='img/img1.gif']" );
		if( node1.length > 0 )
		{
			ret = 1
		}
		else if( node2.length > 0 )
		{
			ret = 2;
		}
		return ret;
	}

	function setInfo()
	{
		var loginTypeNode = $( "[name='radion']" )[0];
		loginTypeNode.selectedIndex = 1;
		showmain( loginTypeNode.value )

		var userNameNode = $( "[name='loginName']" )[0];
		userNameNode.value = "{your-user-name}";
		var passwordNode = $( "[name='password']" )[0];
		passwordNode.value = "{your-password}";

		var script = document.createElement("script");
		script.type = "text/javascript";	
		script.textContent = startLogin.toString();
		//console.log( startLogin );
		document.getElementsByTagName('head')[0].appendChild(script);

		var node = $( "[onclick='doReset()']" )[0].parentNode;
		var bt = document.createElement( 'button' );
		//bt.textContent = 'Auto Login';
		bt.innerHTML= 'Auto Login';
		bt.innerText= 'Auto Login';
		bt.onclick = startLogin;
		node.appendChild( bt );

	}

	
	$( document ).ready( function()
	{
		var code = checkLogin();
		if( code == 1 )
		{
			setInfo();
		}
		else if( code == 2 )
		{
		}
	});
}


withjQuery( onjQuery, true );
