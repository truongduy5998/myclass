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

					// console.log(mSlidesToShow);
					// console.log(typeof mSlidesToShow);
					// console.log(mSlidesToScroll);
					// console.log(typeof mSlidesToScroll);
					// console.log(mDots);
					// console.log(typeof mDots);
					// console.log(mArrows);
					// console.log(typeof mArrows);
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

	/*==========================
	=		INIT FUNCTION      =
	============================*/
		$(document).ready(function() {
			myClass.sliderFunction();
			myClass.setHeight();
			myClass.filterProject();
		});
	
		$(window).on('load', function() {});
		$(window).on('resize', function() {});
});