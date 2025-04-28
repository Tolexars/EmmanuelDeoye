/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 



// sticky threshold
const stickyContactThreshold = 10;
const stickyButton = document.getElementById('sticky-contact');
const stickyButtonCloneId = 'sticky-contact-clone';
let stickyButtonIsCloned = false;

// get current position
function getCurrentStickyButtonPosition() {
	//let rect = stickyButton.getBoundingClientRect();
	return stickyButton.getBoundingClientRect();
}

// get screen width and height
function getCurrentScreenDimensions() {
	let viewportWidth = window.innerWidth;
	let viewportHeight = window.innerHeight;
	var viewportDimensions = {
		'width': {viewportWidth},
		'height': {viewportHeight}
	};
	return viewportDimensions;
}

// scroll
document.addEventListener("scroll", function() {
	//console.log(rect.top, stickyContactThreshold, stickyButtonActive);
  //console.log("position", rect);
	let rect = stickyButton.getBoundingClientRect();
  if(rect.top <= stickyContactThreshold){
		if(!stickyButtonIsCloned){
			// clone
			const clonedStickyButton = stickyButton.cloneNode(true);
			clonedStickyButton.id = stickyButtonCloneId;
			// add stuff
			stickyButtonIsCloned = true;
			stickyButton.classList.add('issticky');
			let currentStickyButtonPosition = getCurrentStickyButtonPosition();
			clonedStickyButton.style.top = stickyContactThreshold +'px';
			clonedStickyButton.style.left = currentStickyButtonPosition.left+'px';
			clonedStickyButton.style.width = currentStickyButtonPosition.width+'px';
			clonedStickyButton.style.height = currentStickyButtonPosition.height+'px';
			let activeClone = document.body.appendChild(clonedStickyButton);
			let screenDimensions = getCurrentScreenDimensions();
			let timer = setTimeout(() => activeClone.style.cssText += 'transform: translateX('+(screenDimensions.width.viewportWidth-currentStickyButtonPosition.left-currentStickyButtonPosition.width-30)+'px) translateY('+(screenDimensions.height.viewportHeight-stickyContactThreshold-currentStickyButtonPosition.height-15)+'px);', 0);
		}
  }else{
		if(stickyButtonIsCloned){
			// remove clone
			let clonedStickyButton = document.getElementById(stickyButtonCloneId);
      clonedStickyButton.remove();
			// remove stuff
			stickyButtonIsCloned = false;
			stickyButton.classList.remove('issticky');
			}
  }
});

// resize
window.addEventListener('resize', function() {
	if(stickyButtonIsCloned){
		let currentStickyButtonPosition = getCurrentStickyButtonPosition();
		let clonedStickyButton = document.getElementById(stickyButtonCloneId);
		let screenDimensions = getCurrentScreenDimensions();
		clonedStickyButton.style.top = stickyContactThreshold +'px';
		clonedStickyButton.style.left = currentStickyButtonPosition.left+'px';
		clonedStickyButton.style.transform = 'translate('+(screenDimensions.width.viewportWidth-currentStickyButtonPosition.left-currentStickyButtonPosition.width-50)+'px,'+(screenDimensions.height.viewportHeight-stickyContactThreshold-currentStickyButtonPosition.height-35)+'px)';
	}
});



const homeImage = document.getElementById('home-image-slide');
const images = [
    'assets/img/blue.png',
    'assets/img/blue.png',
];
let currentImageIndex = 0;

function changeHomeImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    homeImage.setAttribute('href', images[currentImageIndex]);
}

// Change the image every 3 seconds
setInterval(changeHomeImage, 3000);
