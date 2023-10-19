const win = $(window);
const sections = $('.project');
let speed = Math.floor(win.height() * 0.5);
let topArr = [];
let winSCT;
console.log(speed);
//sections.offsetTop
sections.each(function (i, o) {
	const sectionTop = $(o).offset().top;
	topArr.push(sectionTop);
});
win.on('scroll', () => {
	winSCT = win.scrollTop();
	if (winSCT > topArr[0] && winSCT < topArr[1]) {
		sections.eq(0).addClass('is-animated').siblings().removeClass('is-animated');
	}
	if (winSCT > topArr[1] - speed && winSCT < topArr[2]) {
		sections.eq(1).addClass('is-animated').siblings().removeClass('is-animated');
	}
	if (winSCT > topArr[2] - speed && winSCT < topArr[3]) {
		sections.eq(2).addClass('is-animated').siblings().removeClass('is-animated');
	}
	if (winSCT > topArr[3] - speed && winSCT < topArr[4]) {
		sections.eq(3).addClass('is-animated').siblings().removeClass('is-animated');
    pipScroll();
    console.log(topArr[4],winSCT);
	}
	if (winSCT > topArr[4] - speed ) {
		sections.eq(4).addClass('is-animated').siblings().removeClass('is-animated');
    pipScroll();
	}
});

function pipScroll(params) {
	const devices = ['.mockup.pc', '.mockup.mobile'];
	$.each(devices, function (i, deviceEl) {
		const device = $(deviceEl);
		const screen = device.find('.screen');
		const mask = device.find('.mask');
		const hightDifference = screen.innerHeight() - mask.innerHeight();
		console.log('hightDifference',hightDifference);
		device.on({
			mouseenter: function () {
				screen.stop().animate({ top: -hightDifference }, 1000);
			},
			mouseleave: function () {
				screen.stop().animate({ top: 0 }, 1000);
			},
		});
	});
}
win.on('resize', function () {
	pipScroll();
});
