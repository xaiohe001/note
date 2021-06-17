// // 轮播图片外边的容器
// var imgList = document.querySelector('.img-list');
// //获取所有图片
// var banner = document.getElementsByClassName('banner')[0];
// var dots = document.querySelectorAll('.dot');
// var pre = document.querySelector('.pre'); //向左
// var next = document.querySelector('.next'); //向右
// var imgs = document.querySelectorAll('.img-list img');
// var imgsLen = imgs.length; //图片个数
// var currentIndex = 0; //当前显示图片的索引
// var imgWidth = imgs[0].clientWidth + 2; //clientWidth(content+padding,不包含border)
// //拷贝第一张图片放在最后面,是为了无缝切换
// var newImage = imgs[0].cloneNode(true);
// imgList.appendChild(newImage);
// imgList.style.width = imgWidth * (imgsLen + 1) + 'px';

// //setInterval的缺陷
// // 它本身有时间误差:4-16ms
// // 使用setInterval函数页面在 视口最小化时,会继续运行,有时会造成紊乱

// // 动画结束时触发
// imgList.ontransitionend = function() {
//     if (currentIndex === imgsLen) {
//         currentIndex = 0;
//         imgList.classList.remove('tran');
//         imgList.style.transform = 'translateX(-0)';
//     }
//     autoPlay();
// }

// function toggle() {
//     currentIndex++;
//     imgList.classList.add('tran');
//     imgList.style.transform = 'translateX(-' + currentIndex * imgWidth + 'px)';
// }

// function autoPlay() {
//     setTimeout(function() {
//         toggle()
//     }, 3000)
// }
// 删
//修改样式
// function changeActive() {
//     var imgsLen = imgs.length; //图片个数
//     for (var i = 0; i < imgsLen; i++) {
//         if (i === currentIndex) {
//             imgs[i].classList.add('active'); // 给当前的img的class 添加 active 类名
//             dots[i].classList.add('active'); // 给当前的img的class 添加 active 类名
//         } else {
//             imgs[i].classList.remove('active'); // 先给所有的img的class 去除 active 类名
//             dots[i].classList.remove('active'); // 先给所有的img的class 去除 active 类名
//         }


//     }
// }

// banner.onmouseover = function() {
//     ontransitionend();
// }
// banner.onmouseout = function() {
//         toggle();
//     }
//向左点击箭头
// pre.onclick = function() {
//     if (currentIndex === 0) {
//         currentIndex = imgsLen - 1;
//     } else {
//         currentIndex--;
//     }
//     add()
// }
// next.onclick = function() {
//         if (currentIndex === imgsLen - 1) {
//             currentIndex = 0;
//         } else {
//             currentIndex++;
//         }
//         add()
//     }
// for (var i = 0; i < imgsLen; i++) {
//     dots[i].setAttribute('data-index', i);
//     dots[i].onclick = function() {
//         var index = this.getAttribute('data-index');
//         currentIndex = parseInt(index);
//         toggle();
//     }
// }

// autoPlay();


// 获取所有的图片
var imgs = $('.img-list img');
var banner = $('.banner');
var btnList = $('.dot');
// 获取当前显示的索引
var currentIndex = 0;
var imgsNum = imgs.length; // 图片的个数
var timer; // 定时器  自动播放

function autoPlay() {
    // 设置一个定时器，让图片轮流播放显示，时间间隔为3000ms
    timer = setInterval(function() {
        // 显示的索引递增+1
        if (currentIndex === (imgsNum - 1)) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        changeActive();

    }, 3000);
}


// 对所有的图片进行循环，对当前索引值(即currentIndex)对应的图片加上active类名，其他索引值对应的图片，去掉active类名
function changeActive() {
    imgs.eq(currentIndex).addClass('active').siblings().removeClass('active');
    btnList.eq(currentIndex).addClass('active').siblings().removeClass('active');
}

banner.on('mouseenter', function() {
    clearInterval(timer);
})

banner.on('mouseleave', function() {
    autoPlay();
})

function jumpPre() {
    if (currentIndex === 0) {
        currentIndex = imgsNum - 1;
    } else {
        currentIndex--;
    }
    changeActive();
}

function jumpNext() {
    if (currentIndex === (imgsNum - 1)) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    changeActive();
}

btnList.on('click', function() {
    var index = $(this).index();
    currentIndex = index;
    changeActive();
})

autoPlay();