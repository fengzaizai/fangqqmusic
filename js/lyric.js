(function(window) {
    function Lyric(path){
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor:Lyric,
        init:function(path){
            this.path = path;
        },
        times:[],
        lyrics:[],
        index:-1,
        loadLyric:function(callBack){
            var $this = this;
            $.ajax({
                dataType:"text",
                url:$this.path,
                success:function(data){
                   /*  console.log(data) */
                   $this.parseLyric(data);
                   callBack()
                },
                error:function(e){
                    console.log(e);
                }
                
            });
        },
        parseLyric:function(data){
            var $this = this;
            //清空上一首的歌词和时间
            $this.times = [];
            $this.lyrics =[];
            var array = data.split("\n");
            /* console.log(array); */
            //[00:00.00]
            var timeRag = /\[(\d*:\d*\.\d*)\]/;
            //遍历取出每一条歌词
            $.each(array, function(index,ele){
                //处理歌词
                var lrc = ele.split("]")[1];
                if(lrc.length <= 1) return true;
                $this.lyrics.push(lrc);


                var res = timeRag.exec(ele);
                /* console.log(res); */
                if(res == null) return true;
                var timeStr = res[1];//00:00.92
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0])*60;
                var sec = parseFloat(res2[1]);

                /* var time = parseFloat(Number(min + sec).toFixed(2));
                    *在前面添加一个“+”也可以使字符串变为数值
                */
                var time = +Number(min + sec).toFixed(2); 
                /* console.log(time); */
                $this.times.push(time);

                /* console.log(lrc); */
                //排除空字符串
            });
           /*  console.log($this.times);
            console.log($this.lyrics); */
        },
        currentIndex:function(currentTime){
            /* console.log(currentTime); */
            if(currentTime >= this.times[0]){
                this.index++;
                this.times.shift();//删除数组最前面的一个元素

            }
            return this.index;
        }
    }
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;


})(window)