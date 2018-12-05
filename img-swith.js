/**
 * 
 * 图片渐变切换组件
 * 
 * 如何使用？
 *      1.在页面中引入本脚本文件，如 <script src="img-swith.js"></script>
 *      2.在页面中使用 <img-swith imgs="图片地址列表"></img-swith>
 *          或者<img-swith><img src="..."><img src="..."><img src="...">...</img-swith>
 * 
 * 
 * fdsafdsafds
 * @author zhangkai
 */
class imgSwith extends HTMLElement {
    constructor() {
        super();

        let speed = this.hasAttribute("speed") ? +this.getAttribute("speed") : 2;
        let interval = this.hasAttribute("interval") ? +this.getAttribute("interval") : 3;

        let imgMaxWidth = this.hasAttribute("imgmaxwidth") ? +this.getAttribute("imgmaxwidth") : 0;
        let imgMaxHeight = this.hasAttribute("imgmaxheight") ? +this.getAttribute("imgmaxheight") : 0;
        let imgElements = [];

        if (this.hasAttribute("imgs")) {
            //如果有 imgs 属性则解析属性内容
            //有三种写法：
            //  1.多个图片地址用竖线分隔，如：imgs="http://www.xxx.com/1.jpg|http://www.xxx.com/2.jpg|http://www.xxx.com/3.jpg"
            //  2.地址中的不同部分可用括号加逗号的方式分隔，如：imgs="http://www.xxx.com/(a,b,c,d,e).jpg"
            //  3.地址中的不同部分如果是连续的数字，可用两个点代表，如：imgs="http://www.xxx.com/(0..100).jpg"。第一个数字的位数决定了生成的数字是否补0
            //  三种写法可混用，如：imgs="http://www.xxx.com/(a,b,c,d,e).jpg|http://www.xxx.com/(0..10).jpg|http://www.xxx.com/xxx.jpg"

            //解析后的地址列表。原本是用 Set，确保列表不会添加重复的项。后来想到可能会有特殊的情况允许重复，就改用数组。比如想让图片按这样的顺序显示：1,0,2,0,3,0,4,0,5,0... ，那么0图片就会重复出现在列表中，如果用 Set 就不行。
            const _urlList = [];

            this.getAttribute("imgs").replace(/\r|\n/ig,"").split("|").forEach(n => { //先按竖线分隔
                n = n.trim();
                let _urls = n.match(/(.+)\((.+)\)(.+)/i);   //匹配类似 http://www.xxx.com/(1,2,3,4,5).jpg 这样的写法
                if (_urls) {
                    let _urlPrefix = _urls[1].trim();    //地址前缀
                    let _urlSuffix = _urls[3].trim();    //地址后缀
                    let _urlCenterList = [];       //地址中间部分
                    _urls[2].split(",").forEach(x => {  //将中间部分按逗号分隔遍历
                        x = x.trim();
                        if(!x){return};
                        let _range = x.match(/(.+)\.\.(.+)/ig);  //匹配类似于 0..100 这样的写法
                        if (_range) {
                            for (let i = (+_range[1] ? +_range[1] : 0); i <= (+_range[2] ? +_range[2] : -1); i++) {
                                _urlCenterList.push((i + "").padStart(_range[1].length, "0")); //长度不足补0
                            }
                        } else {
                            _urlCenterList.push(x);
                        };
                    });
                    _urlCenterList.forEach(y => _urlList.push(_urlPrefix + y + _urlSuffix));
                } else {
                    _urlList.push(n);
                }
            });

            _urlList.forEach(n => {
                let _img = document.createElement("img");
                _img.src = n;
                imgElements.push(_img);
            });
        }

        const shadow = this.attachShadow({ mode: "closed" });

        //样式
        const style = document.createElement("style");
        style.textContent = `
            :host{display:block;}
            img{${imgMaxWidth?"max-width:"+imgMaxWidth+"px":""};${imgMaxHeight?"max-height:"+imgMaxHeight+"px":""};position:absolute;filter:opacity(0);}
            .show{filter:opacity(1);transition: all ${speed}s;}
            .hide{filter:opacity(0);transition: all ${speed}s;}
        `;
        shadow.append(style);

        //移动图片
        imgElements = [...imgElements, ...this.querySelectorAll("img")];
        imgElements.forEach(n => shadow.append(n));

        let currentImgID = 0;
        imgElements[currentImgID].classList.add("show");
        setInterval(function () {
            imgElements[currentImgID].classList.remove("show");
            imgElements[currentImgID].classList.add("hide");
            currentImgID = ++currentImgID % imgElements.length;
            imgElements[currentImgID].classList.remove("hide");
            imgElements[currentImgID].classList.add("show");
        }, interval * 1000);

    }
}

document.addEventListener("DOMContentLoaded", function () {
    customElements.define("img-swith", imgSwith);
});