(function () {
    setLoding();
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
            }
        })
    }, 1000)
}