(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var banner = document.getElementById('banner');
var size = { w: banner.offsetWidth, h: banner.offsetHeight };
var w = size.w;
var h = size.h;

gsap.defaults({
	ease: "power2.out"
});

var xy = w / h > 2 ? "y" : "x";

var READ_ALL = {};
READ_ALL["olg-bonus10"] = {
	t1: 2,
	t2a: 3,
	t2b: 4
};
READ_ALL["olg-bonus"] = {
	t1: 2,
	t2a: 3,
	t2b: 3.8
};

READ_ALL["olg-dream"] = {
	t1: 2.7,
	t2a: 1.7,
	t2b: 2.1
};

READ_ALL["olg-draw"] = {
	t1: 2.4,
	t2a: 2.4,
	t2b: 2.1
};

READ_ALL["olg-win"] = {
	t1: 2.8,
	t2a: 2.4,
	t2b: 2.6
};

var READ = READ_ALL[window.universalBanner.name];

function init() {
	var tl = new TimelineMax({ onComplete: function onComplete() {
			if (document.getElementById("legalBtn")) {
				TweenLite.set("#legalBtn", { display: "block" });
				document.getElementById("banner").addEventListener('mouseover', mouseover);
			}
		} });
	tl.set(".frame1", { opacity: 1 });
	return tl;
}

function xyIn() {
	var obj = { duration: .3, opacity: 0 };
	obj[xy] = "-=100";
	return obj;
}

function xyOut() {
	var obj = { duration: .3, opacity: 0 };
	var dist = {
		x: w, y: h
	};

	obj[xy] = "+=" + dist[xy] * .8;
	return obj;
}

var data_ = {};

function start(data) {

	data_ = _extends({ handShift: false, manScale: true, olgY: 80, ball_time: .5, ball_ease: 4.5 }, data);

	var _data_ = data_;
	var manScale = _data_.manScale;
	var olgY = _data_.olgY;
	var ball_time = _data_.ball_time;
	var ball_ease = _data_.ball_ease;
	var handShift = _data_.handShift;

	var tl = init();

	if (manScale) {
		gsap.set(".man", { x: -size.w / 2, y: -size.h / 2, transformOrigin: "50% 50%" });
		gsap.from(".man", { scale: .55, duration: 5 });
	}

	console.log(handShift);

	logo();

	tl.from(".t1", xyIn(), "+=.4");
	tl.add("t1", "+=" + READ.t1);
	tl.to([".t1", ".man"], { duration: .2, opacity: 0 }, "t1");

	tl.add(hand(handShift), "+=.3");

	var tlHideOLG = new TimelineMax();
	tlHideOLG.set(['#triangleRed'], { attr: { points: "5.76 240.21 17.19 240.26 55.04 240.26 5.76 240.21" }, duration: 0.01, delay: 0 });
	tlHideOLG.set('#GL_playForOntario', { opacity: 0 });
	tlHideOLG.set(['.group-O'], { y: olgY });
	tlHideOLG.set(['.group-L'], { y: olgY });
	tlHideOLG.set(['.group-G'], { y: olgY });

	tl.add(tlHideOLG, "-=.7");

	tl.add("test");
	tl.to("#GL_blueWedge", { y: olgY, duration: .13 }, "-=.4");
	tl.to("#GL_blueWedge", { y: 0, duration: .5 });
	tl.add(logo(), "-=.4");

	tl.set(".frame2", { opacity: 1 }, "-=.8");
	tl.from(".frame_end_text", { duration: .5, opacity: 0 }, "-=.8");
	tl.from(".frame_end_olg", { duration: .5, opacity: 0 }, "-=.6");
	tl.from(['#EF_cta'], 0.5, { opacity: 0, y: "+=20'", onComplete: mouseover }, '+=.25');

	// tl.play("test")
}

function hand(handShift) {

	var tl = new TimelineMax();
	var obj = w / h > 2 ? { y: "+=" + size.h } : { x: "+=" + size.w };

	tl.from([".hand_only", ".hand_1_screen"], _extends({ duration: .3 }, obj), 0);
	tl.from(".t2a", xyIn(), 0);
	tl.add("t2a-out", "+=" + READ.t2a);
	tl.to(".t2a", xyOut(), "t2a-out");

	if (document.getElementById("hand_1_screen_text")) {
		tl.set(".hand_1_screen_text", { opacity: 0 }, "t2a-out");
	}

	if (handShift) {
		tl.to([".hand_only", ".hand_1_screen"], { duration: .3, x: 9 }, "t2a-out");
	}

	tl.add("t2-in");
	tl.from(".t2b", xyIn(), "t2-in");
	tl.from(".hand_2_screen", { duration: .1, opacity: 0 }, "t2-in");

	tl.add("t2", "+=" + READ.t2b);
	tl.to(".t2b", xyOut(), "t2");
	tl.to(".hand", _extends({ duration: .35, opacity: 0 }, obj), "t2");

	return tl;
}

function mouseover(e) {
	gsap.to(['#EF_cta'], { duration: .4, yoyo: true, scale: .535, repeat: 1,
		onComplete: function onComplete() {
			// viewport.addEventListener('mouseover', mouseover)
		}
	});
}

function logo() {
	var _data_2 = data_;
	var manScale = _data_2.manScale;
	var olgY = _data_2.olgY;
	var ball_time = _data_2.ball_time;
	var ball_ease = _data_2.ball_ease;

	gsap.set(['#GL_logo'], { y: -6, x: 1 });
	var tl = new TimelineMax();
	tl.set('#GL_playForOntario', { opacity: 0 });
	tl.set(['.group-O'], { y: olgY });
	tl.set(['.group-L'], { y: olgY });
	tl.set(['.group-G'], { y: olgY });
	tl.set(['#triangleRed'], { attr: { points: "5.76 240.21 17.19 240.26 55.04 240.26 5.76 240.21" }, duration: 0.01, delay: 0 });
	tl.to('#triangleRed', { delay: 0.25, duration: .5, attr: { points: "17.19 202.41 17.19 240.26 55.04 240.26 17.19 202.41" } });

	var tlBall = new TimelineMax();

	tlBall.to(['.group-O'], { duration: ball_time, y: 0, ease: "back.out(" + ball_ease + ")" });
	tlBall.to(['.group-L'], { duration: ball_time, y: 0, ease: "back.out(" + ball_ease + ")" }, '-=0.45');
	tlBall.to(['.group-G'], { duration: ball_time, y: 0, ease: "back.out(" + ball_ease + ")" }, '-=0.45');

	tlBall.to(['#GL_playForOntario'], { opacity: 1, duration: 0.4 }, .6);
	tl.add(tlBall, .2);

	return tl;
}

function scale(_ref) {
	var x = _ref.x;
	var y = _ref.y;

	return { x: -x, y: -y, transformOrigin: x * 2 + "px " + y * 2 + "px" };
}

function start_320x50() {}

exports.size = size;
exports.init = init;
exports.start = start;
exports.scale = scale;
exports.start_320x50 = start_320x50;

},{}],2:[function(require,module,exports){
"use strict";

var _commonJsCommonJs = require('../../_common/js/common.js');

gsap.set("#EF_cta", (0, _commonJsCommonJs.scale)({ x: 150, y: 173 }));

(0, _commonJsCommonJs.start)();

module.exports = {};

},{"../../_common/js/common.js":1}]},{},[2])


//# sourceMappingURL=main.js.map
