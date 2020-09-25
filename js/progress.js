(function(windom){
    function Progress($progressBar,$progressLine,$progressDot){
        return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }
    Progress.prototype = {
        construcyor:Progress,
        init:function($progressBar,$progressLine,$progressDot){
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        IsMove: false,
        progressClick:function(callBack){
            var $this = this;
            //监听背景的点击
            this.$progressBar.click(function(event){
                //获取背景距离窗口默认的位置
                var normalLeft = $(this).offset().left;
               /*  console.log(normalLeft); */
               //获取点击位置距离窗口的位置
                var eventLeft = event.pageX;
              /*   console.log(eventLeft); */
              //设置背景的宽度 
                $this.$progressLine.css("width",eventLeft - normalLeft);
                $this.$progressDot.css("left",eventLeft - normalLeft);
            
                var value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            });
        },
        progressMove:function(callBack){

            var eventLeft;
            var $this = this;
            var normalLeft = this.$progressBar.offset().left;
            //1.监听鼠标的按下事件
            var barWidth = this.$progressBar.width();
            this.$progressBar.mousedown(function(){
                $this.IsMove = true;

                //2.监听鼠标的移动
                $(document).mousemove(function(event){
                     //获取背景距离窗口默offset认的位置
                /*  console.log(normalLeft); */
                //获取点击位置距离窗口的位置
                    var eventLeft = event.pageX;
                    var offset = eventLeft - normalLeft;

                    if(offset >= 0 && offset <=barWidth){
                        $this.$progressLine.css("width",eventLeft - normalLeft );
                        $this.$progressDot.css("left",eventLeft - normalLeft);
                    }
                /*   console.log(eventLeft); */
                //设置背景的宽度 
                    
                

                
                

                });
            });
           
            
            //3.监听鼠标的抬起事件
            $(document).mouseup(function(){
                $(document).off("mousemove");
                $this.IsMove = false;
                
                //计算进度条比例
                var value = (eventLeft - normalLeft) / $this.$progressBar.width();
                callBack(value);
            });
        },
        setProgress: function(value){
            if(this.IsMove)return;
            if(value < 0 || value > 100)return;
            this.$progressLine.css({
                width: value + "%",
            })
            this.$progressDot.css({
                left:value + "%",
            })
        },
    }
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window)