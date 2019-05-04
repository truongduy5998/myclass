jQuery(function($) {
	"use strict";

	const myClass = window.myClass || {};
	
	/*==========================
	=		MAIN FUNCTION      =
	============================*/
		myClass.sliderFunction = function() {
			if( $('.comp-slider').length ) {
				$('.comp-slider').each(function() {
					let mSlidesToShow = parseInt($(this).attr('data-slidesToShow')) || 1;
					let mSlidesToScroll = parseInt($(this).attr('data-slidesToScroll')) || 1;
					let mDots = parseInt($(this).attr('data-dots')) || 0;
					let mArrows = parseInt($(this).attr('data-arrows')) || 0;

					mDots = !!mDots;
					mArrows = !!mArrows;

					let mResponsive = []; // Khởi tạo mảng rỗng

					if(mSlidesToShow === 4) {
						mResponsive = [
							{
								breakpoint: 1280, // < 1024
								settings: {
									slidesToShow: 3,
									slidesToScroll: 3,
								},
							},
							{
								breakpoint: 768, // < 600
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2,
								}
							},
							{
								breakpoint: 481, // < 480
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
							}
						];
					} else if(mSlidesToShow === 3) {
						mResponsive = [
							{
								breakpoint: 992, // < 992
								settings: {
									slidesToShow: 2,
									slidesToScroll: 2,
								}
							},
							{
								breakpoint: 600, // < 600
								settings: {
									slidesToShow: 1,
									slidesToScroll: 1,
								}
							}
						];
					}
					$(this).not('.slick-initialized').slick({
						infinite: true,
						slidesToShow: mSlidesToShow,
						slidesToScroll: mSlidesToScroll,
						dots: mDots,
						arrows: mArrows,
						responsive: mResponsive
					});
				});
			}
		};

		myClass.setHeight = function() {
			if( $('.intro__item').length ) {
				let heightValue = 0;
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
				const $grid = $('.filter__component').isotope({
					itemSelector: '.filter__item',
					layoutMode: 'fitRows'
				});

				$('.button__list > .button__item').on('click', function() {
					const filterValue = $( this ).attr('data-filter');
					 $grid.isotope({ filter: filterValue });
				});

				$('.button__list').each(function() {
					const $button__list = $('.button__list');
					
					$($button__list).on('click', '.button__item', function() {
						$button__list.find('.active').removeClass('active');
						$(this).addClass('active');
					});
				});
			}
			
			if( $('.button__component').length ) {
				$('.button__show-tabs').on('click', function() {
					$(this).parent().toggleClass('button__open-list');
				});
				$(document).on('click', function(e) {
					if(!e.target.classList.contains('button__show-tabs')) {
						$('.button__show-tabs').parent().removeClass('button__open-list');
					}
				});
				$('.button__list .button__item').on('click', function() {
					const textName = $(this).text();
					$('.button__show-tabs').text(textName);
				});
			}
		};

		function isScrolledIntoView($element) {
			const docViewTop = $(window).scrollTop();
			const docViewBottom = docViewTop + $(window).height();
			const eleTop = $element.offset().top;
			const eleBottom = eleTop + $element.height();
			
			return ((eleBottom <= docViewBottom) && (eleTop >= docViewTop));
		}

		myClass.skillBar = function() {
			if( $('.section-strengths').length ) {
				$('.skill__item').each(function() {
					if( isScrolledIntoView($(this)) ) {
						const percent = $(this).find('.skill__run').attr('data-percent');
						
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
							const percent = $(this).find('.skill__run').attr('data-percent');
							
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
					const $this = $(this);
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
						// console.log($(window).scrollTop());
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
		
		myClass.backToTop = function() {
			if( $('#back-to-top').length ) {
				const valHeight = $(window).height();
				if($(window).scrollTop() < valHeight) {
					$('#back-to-top').toggleClass('hidden');
				} else {
					$('#back-to-top').removeClass('hidden');
				}
				$(window).scroll(function() {
					if($(window).scrollTop() < valHeight) {
						$('#back-to-top').addClass('hidden');
					} else {
						$('#back-to-top').removeClass('hidden');
					}
				});
				$('#back-to-top').on('click', function() {
					$('html, body').animate({
						scrollTop: 0
					}, 1000);
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
			myClass.countToItem();
			myClass.scrollToElement();
			myClass.backToTop();
		});
	
		$(window).on('load', function() {
			if( $('#loading-page').length ) {
				$('#loading-page').delay(1500).fadeOut(300);
			}
		});
		$(window).on('resize', function() {
			myClass.setHeight();
			myClass.sliderFunction();
		});
});