// pages/cal/cal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idBack: "back",//退格
    idClear: "clear",//清屏
    idPon: "+-",//正负号
    idPlus: "+",
    idMinus: "-",
    idMult: "*",
    idDiv: "÷",
    id9: "9",
    id8: "8",
    id7: "7",
    id6: "6",
    id5: "5",
    id4: "4",
    id3: "3",
    id2: "2",
    id1: "1",
    id0: "0",
    idPoint: ".",//小数点
    idIs: "=",//等于
    screenData: "0",//屏幕数据
    lastIsOperator: false,//判断用的
    arr:[],//
    logs:[]//记录储存结果
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},

  clientButton : function(e){
    var that  = this
    console.log(e.target.id)
    // 取得按钮id的数据,来if判断
    console.log(e)
    var id = e.target.id;
    // 赋值全局变量id,用于if判断

    if (id == that.data.idBack){//退格
    // 判断是否为对应按钮的id 
      var data = that.data.screenData;
      // 获取屏幕的数据
      if(data=="0")
        {//数据是0 ,还是0
          return;
        }
      data = data.substring(0,data.length-1);
      //截断数据,除去最后一位,减一位,
      if(data == "" || data == "-")
      {
        // 当数据为空时,为0,
        // data == "-"  当减到负号,
        data = "0";
      }
      that.setData({screenData: data})
      // 怎么加入result
      this.data.arr.pop();//把最后一个去掉

    }else if (id == that.data.idClear){//清屏

      that.setData({screenData : "0"})
      // 怎么加入result
      this.data.arr.length=0;

    }else if (id == that.data.idPon){//正负号

      var data = that.data.screenData;
      if(data == 0){//0,还是0
        return;
      }
      if (data.substring(0,1)=="-"){//变成正号
        data = data.substring(1,data.length)
            
      }else{//变成负号
        data = "-"+data;
        // 怎么加入result
        this.data.arr.unshift("-");//添加负号
      }
      that.setData({screenData:data});

    }else if (id == this.data.idIs)//等于
    {

      var data = this.data.screenData;

      if(data == 0){//为0是,就是直接为0
        return;
      }
      console.log(data)
      var lastWord  = data.substring(data.length-1,data.length);
      // 判断最后一个是否是+-*/
      if(isNaN(lastWord)){
        return;//判断不是不操作
      }

      // 第一步 , 一二加三四
      var num = "";//解析后的数字
      // var lastOperator;
      var arr = that.data.arr;//全局数组
      var optarr = [];//一个临时数组
      console.log("临时数组"+arr);
      for (var i in arr) {//把字符进行拆分成数字和运算符存到数组里
        if(isNaN(arr[i]) == false || arr[i] == that.data.idPon || arr[i] == that.data.idPoint)
        {//是+/- & .的话,要连在一起
          num += arr[i];//加入符号
        }else{//+-*/在这里触发,把前面几个数字相加
          // lastOperator = arr[i];
          optarr.push(num);//把前面的数字加起来
          optarr.push(arr[i]);//把前面的符号加起来
          num = "";
        } 
      }

      // 第二步 十二加三十四
      optarr.push(Number(num));//新的数组
      
      console.log("第二部optarr" + optarr)
      var result = Number(optarr[0])*1.0;//小数
      console.log("第二部" + result)
      for(var i=1 ; i<optarr.length; i++)
      {
        if(isNaN(optarr[i]))
        {
          
          if (optarr[1] == that.data.idPlus){
            result +=Number(optarr[i+1]);
          } else if (optarr[1] == that.data.idMult){
            result *= Number(optarr[i+1]);
          } else if (optarr[1] == that.data.idMinus){
            result -= Number(optarr[i+1]);
          } else if (optarr[1] == that.data.idDiv){
            result /=Number(optarr[i+1]);
          }
        }
      }
        console.log("第二部结束"+result);

      // 保存数据
      // var log  = data+result;申明
      
      that.data.logs.push(data+"="+result)
      console.log(that.data)
      wx.setStorageSync('calllogs', that.data.logs)
      // console.log(wx.getStorageSync('calllogs'))

      

      this.data.arr.length=0;//清空数组,后面算
      this.data.arr.push(result);//把结果放进去
      this.setData({ screenData: result });
      //具体怎么加入result

    }else{//输入数字数据
      
      if (//一开始判断+-*/
      id == this.data.idDiv ||
      id == this.data.idMinus || 
      id == this.data.idPlus || 
      id == this.data.idMult) {
        if (this.data.lastIsOperator == true || this.data.screenData == 0 )
        {
            return;
        }
      }

      var sd = that.data.screenData;
      var data;
      // 第一个输入是0,就还是0
      if (sd == 0) {
        data = id;
      } else {
        data = sd + id
      }
      this.setData({ screenData: data })
      // 怎么加入result
      this.data.arr.push(id)
      console.log("arr" + arr);
      console.log(this.data.arr);

      // 重复的+*/
      if (
      id == this.data.idDiv || 
      id == this.data.idMult || 
      id == this.data.idPlus || 
      id == this.data.idMinus)
      {
        this.setData({ lastIsOperator: true})
      }else{
        this.setData({ lastIsOperator: false})
      }
    }
  },

  history : function()
  {
    wx:wx.navigateTo({
      url: '../list/list',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })    
  }

})