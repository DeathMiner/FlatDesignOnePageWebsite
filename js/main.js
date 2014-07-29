// DOC READY
$(function(){

	// IS MOBILE SMALL LIB
	var isMobile = {
	    Android: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    BlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    iOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Windows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    any: function() {
	        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	    }
	};

	// Play video just on desktop
	if(!isMobile.any()){

		// Init skrollr just on desktop
		skrollr.init({
			forceHeight: false
		})
	}

	// vars
	var inScroll = false;

	// HASH NAVIGATION
	// Hash nav links click event
	$("a[href^='#']:not([href='#'],[data-ignore])").on("click", function(){
	
		var hash = $(this).attr("href").replace(/^#/, '');
		
		// Set that we are scrolling
		inScroll = true;
	
		// Get required elements
		var $page = $("#"+hash),
			$link = $(".navbar ul li a[href='#"+hash+"']");
	
		// Scroll to the page
		$(window).scrollTo($page, {
			duration: 1000
		});
	
		// If we have a link, we update the navbar actives classes
		if($link.length > 0){
			$(".navbar ul li").removeClass("active");
			$link.parent().addClass("active");
		}
	
		// Check if page require navbar to be black
		if($page.attr("data-navbar-black") == "true"){
			$(".navbar").addClass("black");
		}
		else{
			$(".navbar").removeClass("black");
		}
	
		// Set that we don't scroll after animation
		setTimeout(function(){
			inScroll = false;
		}, 1000);
	
		// Disable link default behavior
		return false;
	});

	// Update navbar on scroll
	var update_menu = function(){
		// Get current page
		var page =  Math.round($(window).scrollTop()/$(window).height()),
			$page = $("section:eq("+page+")");

		// Do modifications if no scroll is on
		if(!inScroll){

			// Check if page exists
			if($page.length > 0){

				// Get the navbar link & check if it exists
				var $link = $(".navbar ul li a[href='#"+$("section:eq("+page+")").attr("id")+"']");
				if($link.length > 0){

					// If yes, we update the navbar active classes
					$(".navbar ul li").removeClass("active");
					$link.parent().addClass("active");
				}
			}

			// Check if page require navbar to be black
			if($page.attr("data-navbar-black") == "true"){
				$(".navbar").addClass("black");
			}
			else{
				$(".navbar").removeClass("black");
			}
		}
	};

	// Trigger navbar updates
	$(window).on("scroll", update_menu);
	update_menu();

	// Cancel single hash links
	$("a[href='#']").on("click", function(){
		return false;
	});
});