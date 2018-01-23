import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(){
	
	}

  ngOnInit() {

		/*===== EVENTOS - INICIO =====*/

		//Eventos que activan el OnePageScroll
		document.addEventListener("swipeUp", function(event){
			moveDown();
		})
		document.addEventListener("swipeDown", function(event){
			moveUp();
		})
		document.addEventListener("teclaUp", function(event){
			moveUp();
		})
		document.addEventListener("teclaDown", function(event){
			moveDown();
		})
		document.addEventListener("ruedaUp", function(event){
			moveUp();
		})
		document.addEventListener("ruedaDown", function(event){
			moveDown();
		})
		window.addEventListener('resize', function(event){
			moveResize();
		})

		//Eventos para scroll de raton
		document.addEventListener("wheel", function(e){
			if (e.deltaY < 0) {
				var event:any = new Event('ruedaUp');
					document.dispatchEvent(event);
			}
			if (e.deltaY > 0) {
				var event:any = new Event('ruedaDown');
					document.dispatchEvent(event);
			}
		})

		//Eventos para teclas de flecha arriba/abajo
		document.addEventListener("keydown", function(e){
			var keyCode = e.keyCode;
			if (keyCode == 38) {
					var event:any = new Event('teclaUp');
					document.dispatchEvent(event);
			}
			if (keyCode == 40){
				var event:any = new Event('teclaDown');
					document.dispatchEvent(event);
			}
		})

  	//Eventos para movil (swipe Up y Down)
		var startX, startY
		
    document.addEventListener("touchstart", touchstart);  
	  
  	function touchstart(event) {
  		var touches = event.touches;
  		if (touches && touches.length) {
  			startX = touches[0].pageX;
  			startY = touches[0].pageY;
  			document.addEventListener("touchmove", touchmove);
  		}
  	}
	  
  	function touchmove(event) {
  		var touches = event.touches;
  		if (touches && touches.length) {
  		  event.preventDefault();
  			var deltaX = startX - touches[0].pageX;
  			var deltaY = startY - touches[0].pageY;
  
  			/*
  			if (deltaX >= 50) {
  			  var event:any = new Event('swipeLeft');
  			  document.dispatchEvent(event);
  			}
  			if (deltaX <= -50) {
  			  var event:any = new Event('swipeRight');
  			  document.dispatchEvent(event);
  			}
				*/
				
  			if (deltaY >= 50) {
  			  var event:any = new Event('swipeUp');
  			  document.dispatchEvent(event);
  			}
  			if (deltaY <= -50) {
  			  var event:any = new Event('swipeDown');
  			  document.dispatchEvent(event);
  			}
  
  			if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
  				document.removeEventListener('touchmove', touchmove);
  			}
  		}
  	}
  	/*===== EVENTOS - FIN =====*/

		function moveResize(){
			var a:number = Number(document.querySelector("main.home").getAttribute("data-step"))
			moveTo(a, false);
		}

		function moveDown(){
			var a:number = Number(document.querySelector("main.home").getAttribute("data-step"))
			var c:number = document.querySelectorAll("main.home > section").length
			if( a < c){ moveTo(a+1) }
		}

		function moveUp(){
			var a:number = Number(document.querySelector("main.home").getAttribute("data-step"))
				if( a > 1){ moveTo(a-1) }
		}

		var tiempo = false;
		function moveTo(d, t?){
			if (t != undefined){tiempo = t}
			if(tiempo == false){
				var h = window.innerHeight;
				var elemento = <HTMLElement>document.querySelector("main.home");
				elemento.setAttribute("data-step",d)
				elemento.style.transform = `translate3d(0,-${h*(d-1)}px,0)`;
				tiempo = true;
				setTimeout(function(){tiempo = false}, 800)
			}
		}

		/* Crear menu de bolas */
		function menuLateral(){
			var diapositivas:number = document.querySelectorAll("main.home > section").length
			console.log(diapositivas)
		}

  }//fin ngOnInit

}
