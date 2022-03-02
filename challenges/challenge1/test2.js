{
  class Swiper {
    // 时间间隔
    INTERVAL = 2800;

    // 当前页索引 
    index = 0;

    // 目标页索引
    target = 0;

    // 浏览器宽度 
    translateX = window.innerWidth;

    // transform中间位置属性
    center = 'translateX(0)';

    /** 定时调用 */
    intervalFunc = function () {
      this.target = (this.index + 1) % this.pages.length;
      this.resetActive();
    }

    constructor(scroll) {
      this.scroll = scroll;
      this.pages = scroll.querySelectorAll('.wrap img');
      this.arrowRight = scroll.querySelector('.right');
      this.arrowLeft = scroll.querySelector('.left');
      this.indicators = scroll.querySelectorAll('.indicator li');

      this.main();
    }

    main() {

      // 设置开始状态
      this.getInnerWidth();
      this.setTransformLR();
      let self = this;

      // 按钮导航跳转
      for (let i = 0; i < this.indicators.length; i++) {
        this.indicators[i].addEventListener('click', (function (index) {
          return function () {
            self.target = index;
            self.resetActive();
          };
        })(i));
      }

      // 左箭头
      this.arrowLeft.addEventListener('click', function () {
        self.target = (self.index + self.indicators.length - 1) % self.indicators.length; //target = index - 1;
        self.resetActive();
      });


      // 右箭头
      this.arrowRight.addEventListener('click', function () {
        self.target = (self.index + 1) % self.indicators.length; //target = index + 1;
        self.resetActive();
      });

      // 监视窗口大小变化
      window.onresize = function () {
        self.getInnerWidth();
        self.setTransformLR();
      };

      // 间隔时间切换
      this.autoChange();
    }

    /** 按目标切换状态 */
    resetActive() {

      // 初始化所有标记
      for (let j = 0; j < this.indicators.length; j++) {
        this.indicators[j].classList.remove('actived');

        // 上一个center保留is-transition
        this.pages[j].classList.remove('is-transition');
        if (this.pages[j].classList.contains('center')) {
          this.pages[j].classList.add('is-transition');
        }
        this.pages[j].classList.remove('center');
      }

      //目标导航按键激活
      this.indicators[this.target].classList.add('actived');

      //目标页面激活
      this.pages[this.target].setAttribute('class', 'is-transition center')
      this.pages[this.target].style.transform = this.center;

      //控制其余页面位置
      this.setTransformLR();

      //切换页面完成
      this.index = this.target;
    }

    /** 自动切换 */
    autoChange() {

      let self = this;
      this.intervalFunc = this.intervalFunc.bind(this);

      // 打开自动开始
      let timer = setInterval(self.intervalFunc, this.INTERVAL);

      // 鼠标移至感应范围内-暂停
      this.scroll.onmouseover = function () {
        clearInterval(timer);
      };

      // 鼠标移出感应范围-重新开始 
      this.scroll.addEventListener('mouseout', function () {
        timer = setInterval(self.intervalFunc, self.INTERVAL);
      })
    }


    /** 获取浏览器宽度 */
    getInnerWidth() {
      this.translateX = this.scroll.offsetWidth;
      this.right = 'translateX(' + -this.translateX + 'px)';
      this.left = 'translateX(' + this.translateX + 'px)';
    }

    /** 设置左右图片位置 */
    setTransformLR() {

      // 按当前目标页面控制其他页面位置
      for (let i = 0, len = this.pages.length; i < len; i++) {
        if (i < this.target) {
          this.pages[i].style.transform = this.right;
        } else if (i > this.target) {
          this.pages[i].style.transform = this.left;
        }
      }

      // 当页面为第一页或最后一页时 设置目标页前后页位置
      this.pages[this.target == 0 ? this.pages.length - 1 : this.target - 1].style.transform = this.right;
      this.pages[this.target + 1 > this.pages.length - 1 ? 0 : this.target + 1].style.transform = this.left;
    }
  }

  new Swiper(document.getElementById('scroll'));
}