(function () {
    // setLoding();
    anmt5();
})();

//做图片预加载
function setLoding() {
    var logoText = document.querySelector('#logoText');
    var data = [];
    var nub = 0;
    for (var s in imgData) {
        // console.log(imgData[s]);
        data = data.concat(imgData[s]);
    }
    for (var i = 0; i < data.length; i++) {
        var img = new Image();
        img.src = data[i];
        img.onload = function () {
            nub++;
            // console.log(Math.floor(nub / data.length * 100));
            logoText.innerHTML = '已加载' + Math.floor(nub / data.length * 100) + ' %';
            if (nub == data.length) {
                //图片加载完成之后，要做的事情
                anmt();
            }
        }
    }

}

//隐藏loading动画，开始让logo2显示出来
function anmt() {
    var view = document.querySelector('#view');
    var logo1 = document.querySelector('#logo1');
    var logo2 = document.createElement('div');
    var logo3 = document.createElement('div');
    var img = new Image();
    var img2 = new Image();
    img.src = imgData.logo[0];
    img2.src = imgData.logo[1];
    logo2.id = 'logo2';
    logo3.id = 'logo3';
    logo3.className = logo2.className = 'logoImg';
    logo2.appendChild(img);
    logo3.appendChild(img2);
    css(logo2, 'opacity', 0);
    css(logo3, 'opacity', 0);
    css(logo2, 'translateZ', -1000);
    css(logo3, 'translateZ', -1000);
    view.appendChild(logo2);
    view.appendChild(logo3);
    MTween({
        el: logo1,
        target: {opacity: 0},
        time: 1000,
        type: 'easeOut',
        callBack: function () {
            view.removeChild(logo1);
            css(logo2, 'opacity', 100);
            MTween({
                el: logo2,
                target: {translateZ: 0},
                time: 300,
                type: 'easeBoth',
                callBack: anmt2()
            })
        }
    })
}


//隐藏logo2，开始让logo3显示出来
function anmt2() {
    var view = document.querySelector('#view');
    var logo2 = document.querySelector('#logo2');
    var logo3 = document.querySelector('#logo3');
    setTimeout(function () {
        MTween({
            el: logo2,
            target: {translateZ: -1000},
            time: 800,
            type: 'linear',
            callBack: function () {
                view.removeChild(logo2);
                css(logo3, 'opacity', 100);
                setTimeout(function () {
                    MTween({
                        el: logo3,
                        target: {translateZ: 0},
                        time: 300,
                        type: 'easeBoth',
                        callBack: anmt3
                    })
                }, 300)
            }
        })
    }, 2000)
}

//隐藏logo3，显示小的爆炸效果
function anmt3() {
    var view = document.querySelector('#view');
    var logo3 = document.querySelector('#logo3');
    setTimeout(function () {
        MTween({
            el: logo3,
            target: {translateZ: -1000},
            time: 2000,
            type: 'easeIn',
            callBack: function () {
                view.removeChild(logo3);
                anmt4();
            }
        })
    }, 1000)
}

//logo4 生成
function anmt4() {
    var view = document.querySelector('#view');
    var logo4 = document.createElement('div');
    var logoIcos = document.createElement('div');
    var logo4Img = new Image();
    var iconsLength = 27;
    logo4.id = 'logo4';
    logoIcos.id = 'logoIcos';
    logo4Img.id = 'logo4Img';
    logo4Img.src = imgData.logo[2];
    //2种方案都可以
    // css(logo4,'scale',0)
    css(logo4, 'translateZ', -2000);
    for (var i = 0; i < iconsLength; i++) {
        var span = document.createElement('span');
        var xR = 10 + Math.round(Math.random() * 240);
        var xDeg = Math.round(Math.random() * 360);//(360 / 9) * (i % 9)
        var yR = 10 + Math.round(Math.random() * 240);
        var yDeg = Math.round(Math.random() * 360);//(360 / 9) * (i % 9)
        css(span, 'rotateY', xDeg);
        css(span, 'translateZ', xR);
        //还不是很清楚
        css(span, 'rotateX', yDeg);
        css(span, 'translateY', yR);
        span.style.backgroundImage = 'url(' + imgData.logoIco[(i % imgData.logoIco.length)] + ')';
        logoIcos.appendChild(span);
    }
    logo4.appendChild(logoIcos);
    logo4.appendChild(logo4Img);
    view.appendChild(logo4);
    MTween({
        el: logo4,
        // target: {scale: 100},
        target: {translateZ: 0},
        time: 3000,
        type: 'easeOutStrong',
        callBack: function () {
            setTimeout(function () {
                MTween({
                    el: logo4,
                    target: {translateZ: -1000, scale: 10},
                    time: 4000,
                    type: 'linear',
                    callBack: function () {
                        view.removeChild(logo4);
                    }
                });
            }, 100)
        }
    })
}

//主体开始入场
function anmt5() {
    var tZ = document.querySelector('#tZ');
    css(tZ, 'translateZ', -2000);
    anmt6();
    MTween({
        el: tZ,
        target: {translateZ: 200},
        time: 3600,
        type: 'easeBoth'
    })
}

//生成主体的背景圆柱，圆柱入场
function anmt6() {
    var panoBg = document.querySelector('#panoBg');
    var width = 129;
    var deg = 360 / imgData.bg.length;
    var R = parseInt(Math.tan((180 - deg) / 2 * Math.PI / 180) * (width / 2)) - 1;
    var startDeg = 180;
    css(panoBg, 'rotateY', -695);
    for (var i = 0; i < imgData.bg.length; i++) {
        var span = document.createElement('span');
        css(span, 'rotateY', startDeg);
        css(span, 'translateZ', -R);
        span.style.backgroundImage = 'url(' + imgData.bg[i] + ')';
        panoBg.appendChild(span);
        startDeg -= deg;
    }
    MTween({
        el: panoBg,
        target: {rotateY: 720},
        timer: 3600,
        type: 'linear'
    })
}