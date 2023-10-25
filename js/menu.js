// -----------------[menu]---------------------//
const win = $(window);
const gnb = $(".menu_wrap div");
const sections = $(".section");
const sideNav = $(".sideNav li");

gnb.on({
  click: function (e) {
    e.preventDefault();
    let tg = $(this);
    let index = tg.index();
    let section = sections.eq(index);

    let offset = section.offset().top - 150;
    $("html,body").stop().animate({ scrollTop: offset }, 1000, "easeOutCirc");
  },
});

sideNav.on({
  click: function (e) {
    e.preventDefault();
    let tg = $(this);
    let index = tg.index();
    let section = sections.eq(index);
    let offset = section.offset().top;
    $("html,body").stop().animate({ scrollTop: offset }, 1000, "easeOutCirc");
  },
});

win.on("scroll", function () {
  let sct = win.scrollTop();
  sections.each(function (i) {
    if (sct >= sections.eq(i).offset().top - 300) {
      //gnb.removeClass('on')
      gnb.eq(i).addClass("on").siblings().removeClass("on");
      sideNav.eq(i).addClass("on").siblings().removeClass("on");
      sections.eq(i).addClass("on").siblings().removeClass("on");
    }
  });

  sct > 400 ? $("nav").addClass("sticky") : $("nav").removeClass("sticky");
});
let speed = Math.floor(win.height() * 0.5);
let topArr = [];
let winSCT;
//------------------------------------[project]--------------------------------------------------//

const project = $(".project");
//sections.offsetTop
project.each(function (i, o) {
  const sectionTop = $(o).offset().top;
  topArr.push(sectionTop);
});
win.on("scroll", () => {
  winSCT = win.scrollTop();
  if (winSCT > topArr[0] && winSCT < topArr[1]) {
    project.eq(0).addClass("is-animated").siblings().removeClass("is-animated");
    pipScroll();
  }
  if (winSCT > topArr[1] - speed && winSCT < topArr[2]) {
    project.eq(1).addClass("is-animated").siblings().removeClass("is-animated");
    pipScroll();
  }
  if (winSCT > topArr[2] - speed && winSCT < topArr[3]) {
    project.eq(2).addClass("is-animated").siblings().removeClass("is-animated");
    pipScroll();
  }
  if (winSCT > topArr[3] - speed) {
    project.eq(3).addClass("is-animated").siblings().removeClass("is-animated");
    pipScroll();
  }
});

function pipScroll(params) {
  const devices = [".mockup.pc", ".mockup.mobile", ".mockup.tablet"];

  $.each(devices, function (i, deviceEl) {

    const device = $(deviceEl);
    const screen = device.find(".screen");
    const mask = device.find(".mask");
    const hightDifference = screen.innerHeight() - mask.innerHeight();
    // console.log(hightDifference);
    device.on({
      mouseenter: function () {
        if (project.hasClass("is-animated")) {
          screen.stop().animate({ top: -hightDifference }, 1000);
        }
      },
      mouseleave: function () {
        if (project.hasClass("is-animated")) {
          screen.stop().animate({ top: 0 }, 1000);
        }
      },
      mouseleave: function () {
        if (project.hasClass("is-animated")) {
          screen.stop().animate({ top: 0 }, 1000);
        }
      },
    });
  });
}
win.on("resize", function () {
  pipScroll();
});

// --------------------------[skills]-----------------------------------------//
$(function () {
  const progressWrap = $(".progress-bar");
  //animationOST =animation offset top 줄임
  const animationOST = $(".animation").offset().top - 600;
  let isAni = false;
  $(window).on("scroll", function () {
    // 윈도우의 스크롤 탑값이 animationOST값보다 크거나 같고 isAni의 값이 flase 면 조건문 실행 => 윈도우의 스크롤 바가 스킬바섹션 안으로 진입했고 애니메이션은 미실행 상태
    if ($(window).scrollTop() >= animationOST && !isAni) {
      progressAnimation();
    }
  });
  function progressAnimation() {
    // i=인덱스번호, o=인덱스요소
    progressWrap.each(function (i, o) {
      const $this = $(this);
      const progressBar = $this.find(".bar");
      const progressText = $this.find(".rate");
      const progressRate = progressText.attr("data-rate"); //%의값
      // console.log(progressRate);
      progressBar.stop().animate({ width: progressRate + "%" }, 2500); //''하고 단위붙여주기!

      const textFn = function () {
        $({ rate: 0 })
          .stop()
          .animate(
            { rate: progressRate },
            {
              duration: 2000,
              progress: function () {
                let now = this.rate;
                progressText.text(Math.floor(now) + "%");
              },
              complete: function () {
                isAni = true; //현재 진행하는 에니메이션이 트루인지 아닌지알아보는 함수
              },
            }
          );
      }; //textFn은 익명함수
      textFn(); //익명함수는 호출한 바깥쪽에서 적어야보인다
    });
  }
}); //jQuery


const slideWrapper = $('.slide_wrapper'); //최상위 부모
const slides = slideWrapper.find('.slides'); // 이동할요소 (li의 부모 ul)
const slide = slides.find('li'); // li 슬라이드
const slideCount = slide.length; //슬라이드의 총 갯수
const slideWidth = slide.width(); //li 각각 너비
const slideGap = 30; // li간격
const nextBtn = slideWrapper.find('.next');
const prevBtn = slideWrapper.find('.prev');
let currentIdx = 0; //초기값
let moveAmt; //slideWidth+slideGap 이동거리
let newSlides; //새 슬라이드 목록을 저장할 변수
const pager = $('.pager');
let pagerHTML = '';
let maxSlides = 3;
let responsiveGap = 20;
let responseWidth;

//페이저버튼
slide.each(function (i) {
  pagerHTML += `<a href="#">${i + 1}`;
});
pager.html(pagerHTML);

pager.find('a').on('click', function (e) {
  e.prevenDefault();
  let i = $(this).index();
  moveSlideCb(i);
});

//슬라이드 복제함수
cloneSlide();
function cloneSlide() {
  //:after
  slides.append(slide.clone().addClass('clone'));
  //:before
  slides.prepend(slide.clone().addClass('clone'));
}

//슬라이드 배치함수
slideLayout(slideWidth, slideGap);
function slideLayout(sw, sm) {
  //li 가로배치
  newSlides = $('.slide_wrapper li');
  moveAmt = sw + sm;
  newSlides.each(function (idx) {
    $(this).css({ left: moveAmt * idx + 'px', width: sw + 'px' });
  });
}
//ul 중앙정렬함수
setSlidePos()
function setSlidePos() {
  const ulMoveAmt = - moveAmt * slideCount;
  slides.css({ transform: `translateX(${ulMoveAmt}px)` });
}

//콜백을 활용한 이동함수
//정지, 재생 함수
let timer = undefined;
autoSlide();

function autoSlide() {
  timer = setInterval(() => {
    moveSlideCb(currentIdx + 1);
  }, 1000);
}
function stopSlide() {
  clearInterval(timer);
  timer = undefined;
}

function moveSlideCb(n) {
  //ㄱㅖ속 끊기지않고 실행되게 하는부분
  if (slides.is(':animated')) {
    return;
  }
  slides.stop().animate({ left: moveAmt * -n }, 800,
    function () {
      if (currentIdx > slideCount) {
        slides.css('left', 0);
        currentIdx = 0;
      } else if (currentIdx < -(slideCount - 1)) {
        slides.css('left', -moveAmt * slideCount)
        currentIdx = slideCount;
      }
    });
  currentIdx = n;
  // console.log(currentIdx);
  // console.log(slideCount);
}

//이벤트핸들러 작성
slideWrapper.on({
  mouseenter: function () { stopSlide() },
  mouseleave: function () { autoSlide() },
});

nextBtn.on('click', function () {
  moveSlideCb(currentIdx + 1);
});
prevBtn.on('click', function () {
  moveSlideCb(currentIdx - 1);
  // console.log(currentIdx);
});



//반응형함수
$(window).resize(function () {
  let winWidth = $(this).width();
  // console.log(winWidth);
  if (winWidth < 900) {
    responsiveGap = 10;

    responseWidth = slides.width() - (responsiveGap * (maxSlides - 1)) / maxSlides;
  } else {
    responseWidth = slideWidth;
    responsiveGap = slideGap;
  }
  if (winWidth <= 500) {
    responseWidth = slides.width();
    responsiveGap = 0;
  }
  slideLayout(responseWidth, responsiveGap);
  setSlidePos();
});

// popup 창 띄우기

$(document).ready(function () {
  $('.artWork1').click(function () {
    $('.artWork1_popup').show();
    
  });
  $('.close').click(function () {
    $('.artWork1_popup').hide();
  });
})




