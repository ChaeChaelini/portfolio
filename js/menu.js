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
    const devices = ['.mockup.pc'];
    
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
                if (project.hasClass('is-animated'))
                {
                    screen.stop().animate({ top: 0 }, 1000);
                }
            }
        });
    });

}
win.on('resize', function () {
    pipScroll();
});
