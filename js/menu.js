// -----------------[menu]---------------------//
const win = $(window);
const gnb = $('.menu_wrap div');
const sections = $('.section');
const sideNav = $('.sideNav li');
console.log(gnb);
gnb.on({
    click: function (e) {
        e.preventDefault();
        let tg = $(this);
        let index = tg.index();
        let section = sections.eq(index);
        console.log(1);

        let offset = section.offset().top;
        $('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
    }
});

sideNav.on({
    click: function (e) {
        e.preventDefault();
        let tg = $(this);
        let index = tg.index();
        let section = sections.eq(index);
        console.log(section);
        let offset = section.offset().top;
        $('html,body').stop().animate({ scrollTop: offset }, 1000, 'easeOutCirc');
    }
});

win.on('scroll', function () {
    let sct = win.scrollTop();
    sections.each(function (i) {
        if (sct >= sections.eq(i).offset().top - 300) {
            //gnb.removeClass('on')
            gnb.eq(i).addClass('on').siblings().removeClass('on');
            sideNav.eq(i).addClass('on').siblings().removeClass('on');
            sections.eq(i).addClass('on').siblings().removeClass('on');

        }
    });
    //if (sct > 400) {
    //	$('nav').addClass('sticky');
    //}else{
    //  $('nav').removeClass('sticky');
    //}
    sct > 400 ? $('nav').addClass('sticky') : $('nav').removeClass('sticky');
});
let speed = Math.floor(win.height() * 0.5);
let topArr = [];
let winSCT;
//------------------------------------[project]--------------------------------------------------// 

const project = $('.project');
//sections.offsetTop
project.each(function (i, o) {
    const sectionTop = $(o).offset().top;
    topArr.push(sectionTop)
})
win.on('scroll', () => {
    winSCT = win.scrollTop();
    if (winSCT > topArr[0] && winSCT < topArr[1]) {
        project.eq(0).addClass('is-animated').siblings().removeClass('is-animated');
        pipScroll();
    }
    if (winSCT > topArr[1] - speed && winSCT < topArr[2]) {
        project.eq(1).addClass('is-animated').siblings().removeClass('is-animated');
        pipScroll();
    }
    if (winSCT > topArr[2] - speed && winSCT < topArr[3]) {
        project.eq(2).addClass('is-animated').siblings().removeClass('is-animated');
        pipScroll();
    }
    if (winSCT > topArr[3] - speed) {
        project.eq(3).addClass('is-animated').siblings().removeClass('is-animated');
        pipScroll();
    }

});


function pipScroll(params) {
    const devices = ['.mockup.pc', '.mockup.mobile', '.mockup.tablet'];

    $.each(devices, function (i, deviceEl) {
        console.log(deviceEl);
        const device = $(deviceEl);
        const screen = device.find('.screen');
        const mask = device.find('.mask');
        const hightDifference = screen.innerHeight() - mask.innerHeight();
        console.log(hightDifference);
        device.on({
            mouseenter: function () {
                if (project.hasClass('is-animated')) {
                    screen.stop().animate({ top: -hightDifference }, 1000);
                }
            },
            mouseleave: function () {
                if (project.hasClass('is-animated')) {
                    screen.stop().animate({ top: 0 }, 1000);
                }
            },
            mouseleave: function () {
                if (project.hasClass('is-animated')) {
                    screen.stop().animate({ top: 0 }, 1000);
                }
            }
        });
    });

}
win.on('resize', function () {
    pipScroll();
});

// --------------------------[skills]-----------------------------------------//
$(function () {
    const progressWrap = $('.progress-bar');
    //animationOST =animation offset top 줄임 
    const animationOST = $('.animation').offset().top - 600;
    let isAni = false;
    $(window).on('scroll', function () {
        // 윈도우의 스크롤 탑값이 animationOST값보다 크거나 같고 isAni의 값이 flase 면 조건문 실행 => 윈도우의 스크롤 바가 스킬바섹션 안으로 진입했고 애니메이션은 미실행 상태
        if ($(window).scrollTop() >= animationOST && !isAni) {
            progressAnimation();
        }
    });
    function progressAnimation() {
        // i=인덱스번호, o=인덱스요소
        progressWrap.each(function (i, o) {
            const $this = $(this);
            const progressBar = $this.find('.bar');
            const progressText = $this.find('.rate');
            const progressRate = progressText.attr('data-rate')//%의값
            console.log(progressRate);
            progressBar.stop().animate({ width: progressRate + '%' }, 2500);//''하고 단위붙여주기!

            const textFn = function () {
                $({ rate: 0 })
                    .stop()
                    .animate(
                        { rate: progressRate },
                        {
                            duration: 2000,
                            progress: function () {
                                let now = this.rate;
                                progressText.text(Math.floor(now) + '%');
                            },
                            complete: function () {
                                isAni = true;//현재 진행하는 에니메이션이 트루인지 아닌지알아보는 함수
                            }
                        }
                    );
            };//textFn은 익명함수
            textFn();//익명함수는 호출한 바깥쪽에서 적어야보인다
        })

    }
});//jQuery