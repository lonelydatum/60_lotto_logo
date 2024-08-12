


import {init, start, scale} from '../../_common/js/common.js'
document.getElementById("man").className = "retina man"
gsap.set("#EF_cta", scale({x:270, y:25}))
start({manScale:false, olgY:70, handShift:true})



module.exports = {};

