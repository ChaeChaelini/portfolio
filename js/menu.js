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
  // const devices = [".mockup.pc", ".mockup.mobile", ".mockup.tablet"];
  const devices = $(".mockup.pc,.mockup.mobile,.mockup.tablet");

  devices.each(function (i, deviceEl) {
    let device = $(deviceEl);
    let screen = device.find(".mask_screen>img");
    const mask = device.find(".mask_screen");
    const hightDifference = screen.innerHeight() - mask.innerHeight();
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


//반응형함수
$(window).resize(function () {
  let winWidth = $(this).width();
  if (winWidth < 900) {
    responsiveGap = 10;

    responseWidth =
      slides.width() - (responsiveGap * (maxSlides - 1)) / maxSlides;
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


// -----
const artwork1 = document.getElementById("artwork1");
const artwork2 = document.getElementById("artwork2");
const artwork3 = document.getElementById("artwork3");
const artwork4 = document.getElementById("artwork4");
const popupcontent1 = document.getElementById("popup-content1");
const popupcontent2 = document.getElementById("popup-content2");
const popupcontent3 = document.getElementById("popup-content3");
const popupcontent4 = document.getElementById("popup-content4");
const background = document.getElementById("background");

artwork1.addEventListener("click", () => {
  background.style.display = "flex";
  popupcontent1.style.display = "flex";
});
artwork2.addEventListener("click", () => {
  background.style.display = "flex";
  popupcontent2.style.display = "flex";
});
artwork3.addEventListener("click", () => {
  background.style.display = "flex";
  popupcontent3.style.display = "flex";
});
artwork4.addEventListener("click", () => {
  background.style.display = "flex";
  popupcontent4.style.display = "flex";
});

background.addEventListener("click", (event) => {
  if (event.target === background) {
    popupcontent1.style.display = "none";
    popupcontent2.style.display = "none";
    popupcontent3.style.display = "none";
    popupcontent4.style.display = "none";
    background.style.display = "none";
  }
});

//
const pics = $(".pic");
const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");

pics.on("click", function () {
  const bigLocation = $(this).attr("data-src");
  lightboxImage.load(bigLocation);
  $("html").addClass("all_scrollFixed");
  lightbox.css("display", "block");
});

lightbox.on("click", function () {
  lightbox.css("display", "none");
  $("html").removeClass("all_scrollFixed");
});
