var Grid = require("./grid.js");//引用grid.js

function Manager(size) { 
  this.size = size;//棋盘的大小。从2048.js传入
  this.fillNum = 2;//填充的个数。初始填充2个格子
  this.init();//初始化
}
//Manager的原型。定义在原型对象上的所有属性和方法，都能被派生对象继承
Manager.prototype = {
  //初始化
  init() {
    this.checkerboard = new Grid(this.size);//得到大小为4的棋盘
    this.bproto = this.checkerboard.__proto__;//__proto__是指向父对象的指针
    this.getRandomCell();//随机填充格子
    this.fillNum = 1;//初始化后的每一步都随机生成一个格子
  },
  //随机填充格子
  getRandomCell() {
    //刚开始游戏，fillNum是2，随机生成两个格子
    //后面每操作一次，fillNum是1，随机生成一个格子
    for(var i = 0; i < this.fillNum; i++) {//遍历要填充的格子数
      this.getRandomNumber();//填充数字
    }
  },
  //填充数字
  getRandomNumber() {
    if(!this.checkerboard.isCellEmpty()) {//棋盘有空的可用的格子，就添加数据
      var value = Math.random() < 0.9 ? 2 : 4;//生成10%的4，90%的2
      var cell = this.checkerboard.selectCell();//从可填充格子中随机选一个格子作为当前要填充的格子
      cell.val = value;//随机到的空格子填入刚才生成的随机数value
      this.updateCell(cell);//更新格子
    }
  },
  //更新数据。传入的参数是随机到的空格子
  updateCell(cell) {
    this.checkerboard.grid[cell.x][cell.y] = cell.val;
  },
  //上下左右移动格子
  move(direction) {
    //direction分别为 0:上, 1:右, 2:下, 3:左
    var curList = this.formList(direction);//得到滑动生成的list数组
    var list = this.merge(curList);//合并相同数字的格子，list是合并后的棋盘数组
    // var res = [[],[],[],[]];//局部变量
    var res = [];//局部变量
    if(this.size === 4){
      res = [[],[],[],[]];
    }else if(this.size===5){
      res = [[],[],[],[],[]];
    }
    //滑动合并数字后更新棋盘的格子
    for(var i = 0; i < this.size; i++) {
      for(var j = 0; j < this.size; j++) {
        switch (direction) {
          case 0://上
            res[i][j] = list[j][i];
            break;
          case 1://右
            res[i][j] = list[i][this.size-1-j];
            break;
          case 2://下
            res[i][j] = list[j][this.size-1-i];
            break;
          case 3://左
            res[i][j] = list[i][j];
            break;
        }
      }
    }
    this.checkerboard.grid = res;//结果给棋盘的grid数组
    this.getRandomCell();//随机填充格子
    return res;
  },
  //根据滑动方向生成list的四个数组
  formList(direction) {
    var list=[];
    if(this.size===4){
      list = [[], [], [], []];
    }else if(this.size===5){
      list = [[], [], [], [], []];
    }
    //以该棋盘为例：
      //0 2 0 2
      //2 0 0 2
      //2 0 0 0
      //0 0 0 0
    for(var i = 0; i < this.size; i++) {
      for(var j = 0; j < this.size; j++) {
        switch(direction) {
          case 0://上
            list[i].push(this.checkerboard.grid[j][i]);
            break;
            //向上滑动每一个子数组都是从上边开始往下遍历
            //list[0]=[0,2,2,0]
            //list[1]=[2,0,0,0]
            //list[2]=[0,0,0,0]
            //list[3]=[2,2,0,0]
          case 1://右
            list[i].push(this.checkerboard.grid[i][this.size-1-j]);
            break;
            //向右滑动每一个子数组都是从右边开始往左遍历
            //list[0]=[2,0,2,0]
            //list[1]=[2,0,0,2]
            //list[2]=[0,0,0,2]
            //list[3]=[0,0,0,0]
          case 2://下
            list[i].push(this.checkerboard.grid[this.size-1-j][i]);
            break;
            //向下滑动每一个子数组都是从下边开始往上遍历
            //list[0]=[0,2,2,0]
            //list[1]=[0,0,0,2]
            //list[2]=[0,0,0,0]
            //list[3]=[0,0,2,2]
          case 3://左
            list[i].push(this.checkerboard.grid[i][j]);
            break;
            //向左滑动每一个子数组都是从左边开始往右遍历
            //list[0]=[0,2,0,2]
            //list[1]=[2,0,0,2]
            //list[2]=[2,0,0,0]
            //list[3]=[0,0,0,0]
        }
      }
    }
    return list;
  },
  //滑动时合并相同数字的格子
  merge(list) {//传入的参数是根据方向生成的list数组
    //遍历list的四个子数组
    for(var i = 0; i < list.length; i++) {//把数字向棋盘边界靠拢
      list[i]=this.changeItem(list[i]);
    }
    for(var i = 0; i < this.size; i++) { 
      for(var j = 1; j < this.size; j++) {
        if(list[i][j-1]===list[i][j] && list[i][j]!=="") {//当前格子和左边的格子数字相同且都不是空格字
          list[i][j-1]+=list[i][j];//list数组当前遍历的数字加到左边那个格子的数字上
          list[i][j]="";//并把当前遍历的数字所在格子变为''
        }
      }
    }
    for(var i = 0; i < list.length; i++) {//把数字向棋盘边界靠拢
      list[i] = this.changeItem(list[i]);
    }
    return list;
  },
  //改变数字位置
  changeItem(item) {//把['', 2, '', 2]改为[2, 2, '', '']
    var cnt = 0;//遍历的下标
    //以向上滑动为例，当前list数组的第一个子数组为[0,2,2,0]
    //i=1时，格子为2，cnt=0，item[0]=item[1]=2
    //i=2时，格子为2，cnt=1，item[1]=item[2]=2
    for(var i = 0; i < item.length; i++){//遍历每个list的子数组
      if(item[i]!=='') {//格子不为空
        item[cnt++] = item[i];
      }
    }
    //上述例子中，cnt=1
    //j从2遍历到3，把item[2]和item[3]变为''
    //for循环结束时，该子数组变为[2,2,0,0]，完成格子上移
    for(var j = cnt; j < item.length; j++) {
      item[j] = "";
    }
    return item;
  },
  //判断游戏是否结束，若可用格子为空且所有格子上下左右值不等，则游戏结束
  isOver() {
    this.checkerboard.__proto__ = this.bproto;//接下来能使用this.checkerboard的方法和属性
    if(!this.checkerboard.isCellEmpty()) {//有空格子，表明没有结束
      return false;
    }else {//没有空格字了
      //格子的左边和右边不相等
      for(var i = 0; i < this.size; i++) {
        for(var j = 1; j < this.size; j++) {
          if(this.checkerboard.grid[i][j]===this.checkerboard.grid[i][j - 1]) {//当前格子和左边格子相同，表明还能合并，游戏未结束
            return false;
          }
        }
      }
      //格子的上边和下边不相等
      for(var j = 0; j < this.size; j++) {
        for(var i = 1; i < this.size; i++) {
          if(this.checkerboard.grid[i][j]===this.checkerboard.grid[i - 1][j]) {//当前格子和上边格子相同，表明还能合并，游戏未结束
            return false;
          }
        }
      }
    }
    return true;//若上下左右都没有可继续合并的格子且没有空格子，表明游戏结束
  }
};
//把Manager暴露出去让2048.js使用
module.exports = Manager;