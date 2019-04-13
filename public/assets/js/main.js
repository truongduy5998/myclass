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

					console.log(mSlidesToShow);
					console.log(typeof mSlidesToShow);
					console.log(mSlidesToScroll);
					console.log(typeof mSlidesToScroll);
					console.log(mDots);
					console.log(typeof mDots);
					console.log(mArrows);
					console.log(typeof mArrows);
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

	/*==========================
	=		INIT FUNCTION      =
	============================*/
		$(document).ready(function() {
			myClass.sliderFunction();
			myClass.setHeight();
		});
	
		$(window).on('load', function() {});
		$(window).on('resize', function() {});
});