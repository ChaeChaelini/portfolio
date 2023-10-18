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