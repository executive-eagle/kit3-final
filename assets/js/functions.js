$(function() {
    // we declare our functions up here
    smoothScroll(400);
    workBelt();
	workLoad();
	clientStuff();
	
	$("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
	//$(".biglink").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
	
	$('textarea').autosize();
	
});



// Used in the nav bar
// this is how we get from the nav bar to different sections on the site like "About", "Work", "Contact", etc..
function smoothScroll (duration) {
    $('a[href^="#"]').on('click', function(event) {
        
        var target = $( $(this).attr('href') );
        
        if(target.length){
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}


// Used in the work section
// this is how we move back and forth between the project thumbnails and the projects themselves
function workBelt() {
    
    $('.thumb-unit').click(function() {
        $('.work-belt').css('left','-100%');
		// this will show the bottom portion when the user clicks on the thumbnails to get to the documents of the projects
		$('.work-container').show();
    });
    
    $('.work-return').click(function() {
        $('.work-belt').css('left','0%');
		// this will hide the bottom portion below the thumbnail section
		// the 800 in the .hide() will help the bottom portion fade
		// refer to the +transition in _work.sass to change the speed
		$('.work-container').hide(800);
    });
    
}



// Used for the project section in the work section
// this will help us dynamically load the projects
function workLoad(){
	
	// we want to tell the browser that we want to cache the content
	// cache - a temporary storage space or memory that allows fast access to data
	// if we were bringing in really random things like blog-posts or products that are only going to be used once
	// what we have are only the 8 projects.
	// they won't change frequently and we're not adding comments to it
	// they're going to be the same the majority of the time
	// it's okay to cahche it. This will make it load faster when you go back and forth between the project and the thumbnail
	$.ajaxSetup({ cache: true });
	
	
	$('.thumb-unit').click(function(){
		
		// this is the loading icon/spinning beach ball
		// you can get them here http://projects.lukehaas.me/css-loaders/
		// the html below is all we need in the function but we also need the css to animate the spinner
		// copy the css and paste it in assets/css/1-tools/spinner.scss
		
		// for the 'newHTML' is the document that is going to be loaded in.
		// we point it in the direction of work-1.html so it can load the project images
		
		// here we cache our 'this()'
		// every time you want to use and reuse the object of 'this()' we will cache it like this so we do not dip back into the pool
		// 'this()' represents the thing (in this case, the thumbnail 'thumb-unit') you clicked.
		
		// 'newTitle = $this.find('strong').text()' finds the headline/title for the project and populates that space in the html with the correct title for the correct project
		// it finds the text that is in the strong tag
		
		// 'newFolder' this new variable will pull out that information and print out the information in each project folder in the work folder
		
		// 'newHTML' we add the newFolder variable so that it can identify each project folder, rather then have us type each one out separately 
		var $this = $(this),
			newTitle = $this.find('strong').text(),
			newFolder = $this.data('folder'),
			spinner = '<div class="loader">Loading...</div>',
			newHTML = '/work/' + newFolder + '.html';
		
		$('.project-load').html(spinner).load(newHTML);
		
		// here we will be more specific in what we want the function to refer to with 'project.load'
		// the spinner will then spin if needed
		// then .load(newHTML) will load the projects
		// it will then override the spinner once the newHTML is ready to display
		$('.project-load').html(spinner).load(newHTML);
		// here we declare the new title for the project
		$('.project-title').text(newTitle);
	});
	
}




function clientStuff() {
	
	$('.client-unit').first().addClass('active-client');
	$('.client-logo').first().addClass('active-client');
	
	// this is so our mobile version of the client section is able to also receive the 'active-client' attribute
	$('.clients-mobile-nav span').first().addClass('active-client');
	
	// we then add the '.clients-mobil-nav' so that it can correspond with the '.client-logo'
	// it will act just like the logos
	$('.client-logo, .clients-mobile-nav span').click(function(){
		var $this = $(this),
			$siblings = $this.parent().children(),
			position = $siblings.index($this);
		
		$('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
		$siblings.removeClass('active-client');
		$this.addClass('active-client');
	});
	
	$('.client-control-next, .client-control-prev').click(function(){
		
		var $this = $(this),
			curActiveClient = $('.clients-belt').find('.active-client'),
			position = $('.clients-belt').children().index(curActiveClient),
			clientNum = $('.client-unit').length;
		
		if($this.hasClass('client-control-next')) {
			
			if(position < clientNum -1){
				$('.active-client').removeClass('active-client').next().addClass('active-client');
			} else {
				$('.client-unit').removeClass('active-client').first().addClass('active-client');
				$('.client-logo').removeClass('active-client').first().addClass('active-client');
			}
		
		} else {	
			
			if (position === 0){
				$('.client-unit').removeClass('active-client').last().addClass('active-client');
				$('.client-logo').removeClass('active-client').last().addClass('active-client');
			} else {
				$('.active-client').removeClass('active-client').prev().addClass('active-client');
			}
		}
		
	});
}





// Used for the title of the page 
// title is found in _data/settings.yml
// this program allows the for the name to shrink in size according to the size of the device
(function( $ ){
	
	$.fn.fitText = function( kompressor, options ) {
		
		// Setup Options
		var compressor = kompressor || 1,
			settings = $.extend({
				'minFontSize' : Number.NEGATIVE_INFINITY,
				'maxFontSize' : Number.POSITIVE_INFINITY
			}, options);
		
		return this.each(function(){
			
			// Store the object 
			var $this = $(this);
			
			// Resizer() resizes items based on the object width divided by the compressor * 10
			var resizer = function () {
				
				$this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));	
			};
			
			// Call once to set.
			resizer();
			
			// Call on resize. Opera debounces their resize by default.
			$(window).on('resize.fittext orientationchange.fittext', resizer);
			
		});
		
	};
	
})( jQuery );













/*
// because the the clients (their testimonials and logos) are in a loop
// we cannot change one client without changinf the others
// with this function we are able to assign 'active-client' to whichever one the user is accessing
function clientStuff(){
	// we find all the client-units with "$('.client-unit')"
	// narrow them down to the first with ".first"
	// we then add 'active-client' to the client class in the clients.html
	$('.client-unit').first().addClass('active-client');
	// this one is for the client logos
	$('.client-logo').first().addClass('active-client');
	
	// $('.client-logo') = look for the client logos
	// .click() = when a user clicks on the logo, the function stored in click will run
	$('.client-logo').click(function(){
		// here we store the information which logo the user clicks by collecting the position of the logo
		// it will be done with index numbers
		// first logo is 0, the second is 1, etc.
		// $this = is a go-to way to capture $(this)
		// $(this) is a jQuery object that takes the scope of the object (in this case, clicking the client logo)
		// it only refers to the one that the user clicks
		var $this = $(this),
			// we will capture all of the siblings of $(this)
			// and then jump up to the parent and then say "what are all of your children doing?"
			$siblings = $this.parent().children(),
			// within those siblings, what is the position, in numerical order, of $(this) -> the one that the user just clicked.
			// in this case we have four logos at the bottom, we want to know which one we just clicked.
			// we store this info. in a variable called 'position'
			// we say "look at those siblings"
			// "and index the one that is referred to as $this in the variable above that"
			position = $siblings.index($this);
		
		// Find everything that is a client-unit and remove the class of "active-client" from the html file
		// above we add the class "active-class"
		// now we are going to remove it
		// 'eq' allows us to find (out of all those client-units) a specific number
		// we find that specific number with the variable 'position' because it was stored there earlier in the program
		// after it finds the position, it will add the class 'active-client'
		$('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
		
		// Here we have the logo selection
		// this takes off the highlight line
		$siblings.removeClass('active-client');
		
		// Here we put the line back onto the logo we click on
		$this.addClass('active-client');
	});
	
	// this part of the function will activate the arrows on the sides of the testimonials
	$('.client-control-next').click(function(){
		// like in the first part, we will assign some variables to stash some information to be used later
		var $this = $(this),
			// here we find the currently active client
			// find the clients-belt (in the HTML) and then find the assigned active-client
			curActiveClient = $('.clients-belt').find('.active-client'),
			// we get the currently active position by having the function look at the clients-belt
			// then look at the children of clients-belt (look at all of the children, not a specific one yet)
			// the function will then look at all of the children and then find the number of the one that the user is looking for
			// similar to what we did above
			position = $('.clients-belt').children().index(curActiveClient),
			// we also want to be able to compare if the one the user is looking at is the first one or the last one
			// so, we need to know how many there are
			// we count them with .length
			clientNum = $('.client-unit').length;
		
			// if the position the user is at, is greater than the number of these client-units available (in this case 4)
			// -1 because it is 0-index
			// then complete the function below
			if(position < clientNum -1){
			
			// Now that we know the position of the logos, clients and the number of logos paired with the same number of clients
			// we're taking all the active-clients (from the logos and clients) and removing the class of active-client (redundant yes, but it's legit)
			// we then switch over in the DOM to the next one
			$('.active-client').removeClass('.active-client').next().addClass('.active-client');
			} else {
				
				// if the position is not greater than, we want to jump back first
				$('.client-unit').removeClass('.active-client').first().addClass('.active-client');
				// same thing for the other guy, instead it is labeled as client-logo rather than unit
				$('.client-logo').removeClass('.active-client').first().addClass('.active-client');
			}
	});
	
}

*/




/*

// This function allows the site to scroll down to sections in animated fashion

// This function states to not run the contents of this function until the document is ready
$(function() {
    // Here we call the function of smoothScroll() with an argument of 400
    // You can change the argument at any time to make it go faster or slower.
    // the number is measured in milliseconds
    smoothScroll(400);
});

function smoothScroll (duration) {
    // Here, $('a[href^="#"]') looks in the whole document for all of the anchor tags with an href="#..." that starts with a '#'
    // Once it finds an href with a '#', it will be ready with .on('click', )
    // if you click them then the function(event) will occur
    $('a[href^="#"]').on('click', function(event) {
        
        // first, it will store a variable called 'target' 
        // this target will look at the link that you just clicked and look at its .attr (attribute) of the 'href' to then store it
        
        // let's say you have a link <a href="#about">about</a>, it will take the #about and then store it. So, the variables will look like #about, #contact, etc. 
        var target = $( $(this).attr('href') );
        
        // if this target (the '#') is followed by a string, then -->
        if(target.length){
            // --> it will preventDefault()
            // essentially, preventing the browser from reloading.
            // the event is the click
            event.preventDefault();
            
            // what the function will do is take the html and body and animate them
            $('html, body').animate({
                
                // the animation will start scrolling
                // it will scroll them to the target
                // (which is the #about, #contact, etc.)
                // when we id the header, about or footer sections, we id them and the function identifies the #name with the id="name"
                // when you call the target, you're talking about the id="name", which will match the same 
                // #name in the a=href"#name" link
                // when you're going to the header.html
                // the <a href="#about">About</a> needs to match the link in the section it is referring to
                // in this case, the about.html needs an id
                // <h3 id="about">About</h3>
                
                // when it finds the header/section you wish to go to, it will animate the body to its offset from the top
                // so, if the section is 1000px down it will animate the whole body to scroll a 1000px down
                scrollTop: target.offset().top
            // it will scroll down over a period of time that we define (in milliseconds) in the argument of smoothScroll(argument) on line 8
            }, duration);
        }
    });
}

*/







// change the settings of the function above
// this function is used to navigate between the thumbnails of the artist's work and the full documents of the artist's projects
// Note that this is jQuery

/*function workBelt(){
    
    // '$' means 'jQuery, listen up'
    // we are going to say look for all of the .thumb-units
    // and then when somebody .clicks on one
    // this is gonna happen -> moves onto the function commands in the two brackets '{}'
    $('.thumb-unit').click(function(){
        // take .work-belt and move it left, '-100%' to the full documents from the thumbnails
        $(.work-belt).css('left', '-100%');
    });
    
    // listen up jQuery, when somebody clicks the .work-return (returns you back)/the return button
    $('.work-return').click(function(){
        // take the .work-belt and put left at 0%
        $('.work-belt').css('left', '0%')
    });
    
}
*/





















