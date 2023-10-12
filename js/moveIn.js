$(() => {
    const visual = $('#mainVisual>ul>li');
    const btnList = $('.btnList>li');
    const prevBtn = $('.btnImg .left');
    const nextBtn = $('.btnImg .right');
    let current = 0;
    let setIntervalId;


    const counterEl = '<dis class="counter">1';
    $('#gallery_wrap').append(counterEl);
    let counter = $('.counter');
    $('.counter').css({ textAlign: 'center', fontSize: '2em' })

    timer();
    function timer() {
        setIntervalId = setInterval(() => {
            let prev = visual.eq(current); //#mainVisual>ul>li[2]
            let pagerprev = btnList.eq(current);
            slideMove(prev, 0, '-100%');
            pagerprev.removeClass('on');
            current++; //0(1,2)
            if (current === visual.length) {
                current = 0;
            }
            let next = visual.eq(current);
            let pagerNext = btnList.eq(current);
            slideMove(next, '100%', 0);
            pagerNext.addClass('on');
            cnt(current);

        }, 3000);
    }


    //카운팅하는 함수
    function cnt(n) { counter.html(`${n + 1}`) }

    //움직이는 함수 slideMove
    function slideMove(tg, start, end) {
        tg.css('left', start).stop().animate({ left: end }, 500, 'easeOutCubic');
    }

    //hover 시 정지
    $('#mainVisual,.btnList,.left,.rtght').on({
        mouseover: function () {
            clearInterval(setIntervalId);
        },
        mouseout: function () {
            timer();
        },
    });

    //페이저 함수
    btnList.on({
        click: function () {
            let tg = $(this);
            let i = tg.index();
            btnList.removeClass('on');
            tg.addClass('on');
            pagerMove(i);
            cnt(i);
        },
    });
    console.log(current);

    //움직이는 함수 pagerMove
    function pagerMove(i) {
        if (current == i) {
            return;
        }
        let currentEl = visual.eq(current); //0(1)
        let nextEl = visual.eq(i);
        currentEl.css({ left: 0, top: 0 }).stop().animate({ left: '-100%' }, 500, 'easeOutCubic');
        nextEl.css({ left: '100%' }).stop().animate({ left: '0%' }, 500, 'easeOutCubic');
        current = i; //1
    }

    // //nextBtn 클릭시 움직이는 함수
    // nextBtn.on('click', function () {
    // 	let prev = visual.eq(current); //#mainVisual>ul>li[2]
    // 	let pagerprev = btnList.eq(current);
    // 	slideMove(prev, 0, '-100%');
    // 	pagerprev.removeClass('on');
    // 	current++; //0(1,2)
    // 	if (current === visual.length) {
    // 		current = 0;
    // 	}
    // 	let next = visual.eq(current);
    // 	let pagerNext = btnList.eq(current);
    // 	slideMove(next, '100%', 0);
    // 	pagerNext.addClass('on');
    // 	cnt(current);
    // })

    // //prevBtn 클릭시 움직이는 함수
    // prevBtn.on('click', function () {
    // 	let prev = visual.eq(current); //#mainVisual>ul>li[2]
    // 	let pagerprev = btnList.eq(current);
    // 	slideMove(prev, 0, '100%');
    // 	pagerprev.removeClass('on');
    // 	current--;
    // 	if (current < 0) {
    // 		current = visual.length - 1;
    // 	}
    // 	let next = visual.eq(current);
    // 	let pagerNext = btnList.eq(current);
    // 	slideMove(next, '-100%', 0);
    // 	pagerNext.addClass('on');
    // 	cnt(current);
    // })

    $(function () {
        $(window).mousemove(function (e) {
            var x = e.clientX;
            var y = e.clientY;
            $("#cursor_star")
                .css("top", y)
                .css("left", x);
            $("#cursor").css({ top: y, left: x });
        })
    })

}); //jQuery
