function AutoFocus($element) {
  this.$ul = $element.find("ul");
  this.$li = this.$ul.find("li");
  this.$cur = $element.find(".current .cur");
  this.$active = this.$ul.find("li.active");

  this.paddingLeftWidth = parseInt(
    this.$li.css("padding-left").replace("px", "")
  );
  this.baseLeft = this.$ul.offset().left;
  var activeInfo = this.getActiveInfo();
  this.activeWidth = activeInfo.width;
  this.activeOffset = activeInfo.offset;
  //自动初始化
  this.init();
  this.addAutoFocusListener();
}

AutoFocus.prototype.getActiveInfo = function () {
  if (this.$active.length !== 1) {
    return {
      width: 0,
      offset: 0,
    };
  }
  return {
    width: this.$active.width(),
    offset: this.$active.offset().left - this.baseLeft,
  };
};

AutoFocus.prototype.init = function () {
  this.$cur.css({
    width: this.activeWidth,
    left: this.activeOffset + this.paddingLeftWidth,
  });
};

AutoFocus.prototype.addAutoFocusListener = function () {
  var self = this;
  this.$li.on("mouseenter", function () {
    var _width = $(this).width();
    var _offset = $(this).offset().left - self.$ul.offset().left;
    self.$cur
      .stop(true, true)
      .animate({ left: _offset + self.paddingLeftWidth, width: _width }, 200);
  });

  this.$ul.on("mouseleave", function () {
    self.$cur.stop(true, true).animate(
      {
        left: self.activeOffset + self.paddingLeftWidth,
        width: self.activeWidth,
      },
      200
    );
  });
};

$.fn.autoFocus = function () {
  this.each(function () {
    new AutoFocus($(this));
  });
};

// 百度统计
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?8d872460845144af2aa753b2d61d7791";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

$(document).ready(function () {
  $(".navbar").autoFocus();
  $("pre code").each(function (i, block) {
    hljs.highlightBlock(block);
  });
  // 消息通知
  // Push.Permission.request();
  // setInterval(function() {
  //   Push.create("Iray.me!", {
  //     body: "Time:" + new Date().toLocaleString(),
  //     icon: "/img/favicon.ico",
  //     timeout: 3000,
  //     onClick: function() {
  //       window.focus();
  //       this.close();
  //     }
  //   });
  // }, 12000);
});
