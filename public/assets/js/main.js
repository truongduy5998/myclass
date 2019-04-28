jQuery(function($) {
	"use strict";

	var myClass = window.myClass || {};
	

	/*==========================
	=		MAIN FUNCTION      =
	============================*/
		myClass.sliderFunction = function() {
			if( $('.comp-slider').length ) {
				$('.comp-slider').each(function() {
					var mSlidesToShow = parseInt($(this).attr('data-slidesToShow')) || 1;
					var mSlidesToScroll = parseInt($(this).attr('data-slidesToScroll')) || 1;
					var mDots = parseInt($(this).attr('data-dots')) || 0;
					var mArrows = parseInt($(this).attr('data-arrows')) || 0;

					mDots = !!mDots;
					mArrows = !!mArrows;

					$(this).slick({
						infinite: true,
						slidesToShow: mSlidesToShow,
						slidesToScroll: mSlidesToScroll,
						dots: mDots,
						arrows: mArrows
					});
				});
			}
		};

		myClass.setHeight = function() {
			if( $('.intro__item').length ) {
				var heightValue = 0;
				$('.intro__item').each(function() {
					if($(this).outerHeight() > heightValue) {
						heightValue = $(this).outerHeight();
					}
				});
				$('.intro__item').css('height', heightValue);
			}
		};

		myClass.filterProject = function() {
			if( $('.filter__component').length ) {
				var $grid = $('.filter__component').isotope({
					itemSelector: '.filter__item',
					layoutMode: 'fitRows'
				});

				$('.button__list > .button__item').on('click', function() {
					var filterValue = $( this ).attr('data-filter');
					 $grid.isotope({ filter: filterValue });
				});

				$('.button__list').each(function() {
					var $button__list = $('.button__list');
					
					$($button__list).on('click', '.button__item', function() {
						$button__list.find('.active').removeClass('active');
						$(this).addClass('active');
					});
				});

			}
		};

		function isScrolledIntoView($element) {
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var eleTop = $element.offset().top;
			var eleBottom = eleTop + $element.height();
			
			return ((eleBottom <= docViewBottom) && (eleTop >= docViewTop));
		}

		myClass.skillBar = function() {
			if( $('.section-strengths').length ) {
				$('.skill__item').each(function() {
					if( isScrolledIntoView($(this)) ) {
						var percent = $(this).find('.skill__run').attr('data-percent');
						
						$(this).find('.skill__text').css('opacity', 1);
						$(this).find('.skill__percent').css('opacity', 1);
						
						$(this).find('.skill__run').animate({
							width: percent
						}, 7000);
					}
				});

				$(window).on('scroll', function() {
					$('.skill__item').each(function() {
						if( isScrolledIntoView($(this)) ) {
							var percent = $(this).find('.skill__run').attr('data-percent');
							
							$(this).find('.skill__text').css('opacity', 1);
							$(this).find('.skill__percent').css('opacity', 1);
							
							$(this).find('.skill__run').animate({
								width: percent
							}, 7000);
						}
					});
				});
			}
		};
		
		function countTo(element) {
			const numberTo = parseInt(element.getAttribute('data-count'));
			const speed = parseInt(element.getAttribute('data-speed'));
			
			// Chạy trong vòng số miliseconds quy định
			const miliseconds = Math.floor((speed / numberTo));

			let i = 0;
			
			const intervalValue = setInterval(() => {
				if(i >= numberTo) {
					clearInterval(intervalValue);
				}
				element.querySelector('.counter__number').textContent = i;
				i++;
			}, miliseconds);
		}

		myClass.countToItem = function() {
			const counterList = document.querySelectorAll('.counter__item');

			for(let i = 0; i < counterList.length; i++) {
				countTo(counterList[i]);
			}
		};

		myClass.scrollToElement = function() {
			if( $('#header.navigation').length ) {
				$('#header .nav-link').each(function() {
					var $this = $(this);
					// console.log($($this.attr('href')).offset().top);
					$this.on('click', function(e) {
						$('.navbar-nav').find('.active').removeClass('active');
						$this.parent().addClass('active');
						$('html, body').stop().animate({
							// 70 là do menu
							scrollTop: $($this.attr('href')).offset().top - 70
						}, 1500);
						e.preventDefault();
					});
					$(window).scroll(function() {
						// 75 là do padding-top: 50 + padding-bottom: 25
						console.log($(window).scrollTop());
						if($(window).scrollTop() >= $($this.attr('href')).offset().top - 75) {
							$('.navbar-nav').find('.active').removeClass('active');
							$this.parent().addClass('active');
						}
					});
				});
				

				// Background
				if($(window).scrollTop() > 0) {
					$('#header.navigation').addClass('background');
				} else {
					$('#header.navigation').removeClass('background');
				}
				$(window).scroll(function() {
					if($(window).scrollTop() > 0) {
						$('#header.navigation').addClass('background');
					} else {
						$('#header.navigation').removeClass('background');
					}
				});
			}
		};
		
	/*==========================
	=		INIT FUNCTION      =
	============================*/
		$(document).ready(function() {
			myClass.sliderFunction();
			myClass.setHeight();
			myClass.filterProject();
			myClass.skillBar();
			$('.section-statistical').parallax("0%", 0.1);
			myClass.countToItem();
			myClass.scrollToElement();
		});
	
		$(window).on('load', function() {});
		$(window).on('resize', function() {});
		
});