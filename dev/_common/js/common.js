import {olg} from "./proline"
const banner = document.getElementById('banner')
const size = {w:banner.offsetWidth, h:banner.offsetHeight}
const {w, h} = size

gsap.defaults({
  ease: "power2.out"
});


const xy = w/h>2?"y":"x"



const READ_ALL = {}
READ_ALL["olg-bonus10"] = {
	t1: 2,
	t2a: 3,
	t2b: 4,
}
READ_ALL["olg-bonus"] = {
	t1: 2,
	t2a: 3,
	t2b: 3.8,
}

READ_ALL["olg-dream"] = {
	t1: 2.7,
	t2a: 1.7,
	t2b: 2.1,
}

READ_ALL["olg-draw"] = {
	t1: 2.4,
	t2a: 2.4,
	t2b: 2.1,
}

READ_ALL["olg-win"] = {
	t1: 2.8,
	t2a: 2.4,
	t2b: 2.6,
}

const READ = READ_ALL[window.universalBanner.name]

	
function init(){	
	const tl = new TimelineMax({onComplete:()=>{
		if(document.getElementById("legalBtn")){			
			TweenLite.set("#legalBtn", {display:"block"})
			document.getElementById("banner").addEventListener('mouseover', mouseover)
		}
	}})
	tl.set(".frame1", {opacity:1})
	return tl
}

function xyIn(){
	const obj = {duration:.3, opacity:0}
	obj[xy] = "-=100"
	return obj
}



function xyOut(){
	const obj = {duration:.3, opacity:0}
	const dist = {
		x:w,y:h
	}
	
	obj[xy] = `+=${dist[xy]*.8}`
	return obj
}


let data_ = {}


function start(data){
	
	data_ = {handShift:false, manScale:true, olgY:80, ball_time:.5, ball_ease:4.5, ...data}

	
	const {manScale, olgY, ball_time, ball_ease, handShift} = data_
	
	const tl = init()
	
	if(manScale){
		gsap.set(".man", {x:-size.w/2, y:-size.h/2, transformOrigin: "50% 50%"})	
		gsap.from(".man", {scale:.55, duration:5})	
	}
	
	olg("#logo_1")
	
	tl.from(".t1", xyIn() , "+=.4")
	tl.add("t1", `+=${READ.t1}`)
	tl.to([".t1", ".man"], {duration:.2, opacity:0}, "t1")

	
	
	tl.add(hand(handShift), "+=.3")


	// const tlHideOLG = new TimelineMax()
	// tlHideOLG.set(['#triangleRed'], {attr:{points:"5.76 240.21 17.19 240.26 55.04 240.26 5.76 240.21"}, duration: 0.01, delay:0});
	// tlHideOLG.set('#GL_playForOntario', {opacity:0})
	// tlHideOLG.set(['.group-O'], { y:olgY})
	// tlHideOLG.set(['.group-L'], { y:olgY})
	// tlHideOLG.set(['.group-G'], { y:olgY})

	// tl.add(tlHideOLG, "-=.7")
	
	// tl.add("test")
	// tl.to("#GL_blueWedge", {y:olgY, duration:.13}, "-=.4")
	// tl.to("#GL_blueWedge", {y:0, duration:.5})	
	tl.set("#logo_1", {display:"none"})
	tl.add(olg("#logo_2"), "-=.4")


	
	tl.set(".frame2", {opacity:1}, "-=.8")
	tl.from(".frame_end_text", {duration:.5, opacity:0}, "-=.8")
	tl.from(".frame_end_olg", {duration:.5, opacity:0}, "-=.6")	
	
	// tl.add("test")

	tl.from(['#EF_cta'], 0.5, {opacity:0, y:"+=20'", onComplete:mouseover}, '+=.25');

	// tl.play("test")
}


function hand(handShift){
	
	var tl = new TimelineMax()	
	const obj = w/h>2 ? {y:`+=${size.h}`}: {x:`+=${size.w}`}

	tl.from([".hand_only", ".hand_1_screen"], {duration:.3, ...obj }, 0)
	tl.from(".t2a",xyIn(), 0)
	tl.add("t2a-out", `+=${READ.t2a}`)
	tl.to(".t2a",xyOut(), "t2a-out")
	
	if(document.getElementById("hand_1_screen_text")){
		tl.set(".hand_1_screen_text", {opacity:0 }, "t2a-out")
		
	}

	if(handShift){		
		tl.to([".hand_only", ".hand_1_screen"], {duration:.3, x:9 }, "t2a-out")	
	}
	
	tl.add("t2-in")
	tl.from(".t2b", xyIn(), "t2-in")
	tl.from(".hand_2_screen", {duration:.1, opacity:0 }, "t2-in")


	tl.add("t2", `+=${READ.t2b}`)
	tl.to(".t2b", xyOut(), "t2")
	tl.to(".hand", {duration:.35, opacity:0, ...obj}, "t2")
	
	return tl
}

function mouseover(e){	
	gsap.to(['#EF_cta'], {duration:.4,yoyo:true, scale:.535, repeat:1,
		onComplete:
		function () {
			// viewport.addEventListener('mouseover', mouseover)
		}
	});
}


// function logo(){"#logo_2"

// 	const {manScale, olgY, ball_time, ball_ease} = data_

// 	gsap.set([ '#GL_logo' ], {y:-6, x:1});
// 	var tl = new TimelineMax()
// 	tl.set('#GL_playForOntario', {opacity:0})
// 	tl.set(['.group-O'], { y:olgY})
// 	tl.set(['.group-L'], { y:olgY})
// 	tl.set(['.group-G'], { y:olgY})	
// 	tl.set(['#triangleRed'], {attr:{points:"5.76 240.21 17.19 240.26 55.04 240.26 5.76 240.21"}, duration: 0.01, delay:0});
// 	tl.to('#triangleRed', {delay:0.25, duration:.5, attr:{points:"17.19 202.41 17.19 240.26 55.04 240.26 17.19 202.41"}});

// 	var tlBall = new TimelineMax()
	
	

// 	tlBall.to(['.group-O'], {duration:ball_time, y:0, ease:`back.out(${ball_ease})`})
// 	tlBall.to(['.group-L'], {duration:ball_time, y:0, ease:`back.out(${ball_ease})`}, '-=0.45')
// 	tlBall.to(['.group-G'], {duration:ball_time, y:0, ease:`back.out(${ball_ease})`}, '-=0.45')
	
// 	tlBall.to(['#GL_playForOntario'], {opacity:1, duration:0.4, }, .6)
// 	tl.add(tlBall, .2)
		
// 	return tl

// }

function scale({x, y}){
	return {x:-x, y:-y, transformOrigin:`${x*2}px ${y*2}px`}
}


function start_320x50(){

}


export {size, init, start, scale, start_320x50}



