export const documentHelper = {
    changeBackgroundHeader: function (color = 'transparent') {
        var headerEl = document.getElementById('header');

        if (typeof headerEl != 'undefined' && headerEl != null) {
            if (headerEl.classList.contains('light')) {
                headerEl.classList.remove('light');
                headerEl.classList.add('dark');
                headerEl.classList.add('changed');
            } else {
                if (headerEl.classList.contains('changed')) {
                    headerEl.classList.remove('dark');
                    headerEl.classList.remove('changed');
                    headerEl.classList.add('light');
                }
            }

            headerEl.style.backgroundColor = color;
        }
    },

    handleEqualHeightItems: function (items: string[]) {
        let height = 0;
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let el = document.querySelector(item);
            if (typeof el !== "undefined" && el !== null) {
                if (i == 0) {
                    height = el.offsetHeight;
                } else {
                    el.style.height = height + 'px';
                }
            }

        }
    },

    getMobileOperatingSystem: function () {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        // Windows Phone must come first because its UA also contains "Android"
        if (/windows phone/i.test(userAgent)) {
            return "Windows Phone";
        }

        if (/android/i.test(userAgent)) {
            return "Android";
        }

        // iOS detection from: http://stackoverflow.com/a/9039885/177710
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }

        return "unknown";
    },

    getRectTop: function (el: any) {
        var rect = el.getBoundingClientRect();
        return rect.top;
    },

    checkOffset: function (el: HTMLElement | null, elStop: HTMLElement | null) {
        if (el != null && elStop != null) {
            if ((documentHelper.getRectTop(el) + document.body.scrollTop) + el.offsetHeight >= (documentHelper.getRectTop(elStop) + document.body.scrollTop) - 10) {
                const elTop = documentHelper.getRectTop(el);
                // el.classList.remove('fixed');
                let style = "top: " + (elTop) + "px !important;";
                // style += "transform: none";
                el.setAttribute('style', style);
                // el.style.position = 'absolute';
            }
            if (document.body.scrollTop + window.innerHeight < (documentHelper.getRectTop(elStop) + document.body.scrollTop)) {
                el.setAttribute('style', '');
                // el.classList.add('fixed'); // restore when you scroll up
            }

        }
    },
};

export class Croppenscaler {
    public url: string;
    public frameHeight: number;
    public frameWidth: number;
    public imageWidth: number;
    protected positionTop: number;
    protected positionLeft: number;
    public width: number;
    public top: number;
    public left: number;
    constructor (values: Object = {}) {
      Object.assign(this, values);
      this.frameHeight = this.frameHeight || 400;
      this.frameWidth = this.frameWidth || 300;
   
      var scale = this.frameWidth / 300;
   
      this.imageWidth = (this.width) * scale;
      this.positionTop = (this.top) * scale;
      this.positionLeft = (this.left) * scale;
    }
   
    buildFrame() {
   
      var img = new Element('img',{src:this.url, 'class':'zoom'});
      img.setStyle({
        width: this.imageWidth+'px',
        top: this.positionTop+'px',
        left: this.positionLeft+'px',
      });
   
      var frame = new Element('div',{'class':'croppenscaler'});
      frame.update(img);
      frame.setStyle({
        height:this.frameHeight+'px',
        width:this.frameWidth+'px',
      });
   
      return frame;
    }
  };