
function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingAnimation(){
    var tl=gsap.timeline();
    tl.from('.line h1',{
        y:100,
        duration:0.5,
        delay:0.2,
        stagger:0.25
    })
    
    tl.from('#line1-part1 ',{
        opacity:0,
        onStart:function(){
            var h5=document.querySelector('#line1-part1 h5');
    var counter=0;
    var id=setInterval(()=>{
        if(counter===99){
            clearInterval(id);
        }
        counter++;
        var timer=""+counter
        h5.textContent=timer.padStart(2,0);
    },30)
        }
    })
    tl.to('.line h2',{
        opacity:1,
        animationName:"anime"
    })
    
    tl.to('#loader',{
        opacity:0,
        delay:4,
        duration:0.4,
        
    })
    tl.to('#loader',{
        display:"none"
    })
   
    tl.from('#page1',{
        delay:0.2,
        y:1200,
        opacity:0,
        duration:0.8,
        ease:Power4
    })
   
    tl.to('.center-line h4',{
        opacity:1,
    },"a")
    tl.from(".center-line h1",{
        y:200,
        opacity:0,
        duration:0.5,
        stagger:0.2
    },"a")
    // tl.to('#page2',{
    //     display:"block"
    // })

    
}
function cursorAnimation(){
    var cursor=document.querySelector('#crsc');
window.addEventListener('mousemove',(dets)=>{
    gsap.to(cursor,{
        left:dets.clientX,
        top:dets.clientY,
       
    })
})

Shery.makeMagnet("#nav-part2 h4", {
    
  });

  
  document.querySelector('#video-container').addEventListener('mouseenter',()=>{
    document.querySelector('#video-container').addEventListener('mousemove',(dets)=>{
     
        gsap.to('#crsc',{
            opacity:0
        })
            gsap.to('#video-cursor',{
                left:dets.clientX-(500),
                top:dets.clientY-(100),
                duration:0.5
             })
    })
  })
  document.querySelector('#video-container').addEventListener("mouseleave", function () {
    gsap.to("#crsc", {
      opacity: 1

    });
    gsap.to("#video-cursor", {
        top:"-10%",
        left: "80%",
        duration:0.5,
    });
  });

var video=document.querySelector("#video-container video");
var video_image=document.querySelector('#video-container img')
var flag=0;
document.querySelector("#video-container").addEventListener("click",()=>{
  if(flag===0){
    video.play();
    video.style.opacity=1;
    video_image.style.opacity=0;
    flag=1;
    document.querySelector('#video-container #video-cursor').innerHTML=`<i class="ri-pause-line"></i>`
    gsap.to('#video-container #video-cursor',{
        scale:0.5,
    })
  }
  else{
    video.pause();
    video.style.opacity=0;
    video_image.style.opacity=1;
    flag=0;
    document.querySelector('#video-container #video-cursor').innerHTML=`<i class="ri-play-large-fill"></i>`
    gsap.to('#video-container #video-cursor',{
        scale:1,
    })
  }

})
}
function sheryAnimation(){
    Shery.imageEffect(".image-div",{
        style:5,
       
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7241195453907675},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.23,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.5,"range":[0,10]},"metaball":{"value":0.33,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},

        gooey:true 
    })
}
function flagAnimation(){
    
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#flag", {
          x: dets.x,
          y: dets.y
        })
      })
      document.querySelectorAll(".center-line h1 span").forEach((elem)=>{
        elem.addEventListener("mouseenter", function () {
            gsap.to("#flag", {
              opacity: 1,
              transform:"translate(-50%,-50%)",
              onStart:function(){
                document.querySelector('#crsc').style.display="none"
              }
            })
          })
      })
      document.querySelectorAll(".center-line h1 span").forEach((elem)=>{
        elem.addEventListener("mouseleave", function () {
            gsap.to("#flag", {
              opacity: 0,
              onStart:function(){
                document.querySelector('#crsc').style.display="block"
              }
            })
          })
      })
    
    }
locomotive();
loadingAnimation();
cursorAnimation();
sheryAnimation();
flagAnimation();

