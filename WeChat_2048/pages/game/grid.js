function Grid(size) {
  this.size = size; //棋盘的大小是size*size，即4*4，从manager.js传入
  this.grid = this.init(); //棋盘初始化
}
//Grid的原型。定义在原型对象上的所有属性和方法，都能被派生对象继承
Grid.prototype = {
  //棋盘初始化
  init() {
    var grid = []; //二维数组
    for (var i = 0; i < this.size; i++) {
      grid[i] = []; //每一行都是一个空数组
      for (var j = 0; j < this.size; j++) {
        grid[i].push(""); //每一行的每一个格子都是空的
      }
    }
    return grid;
  },
  //查找所有空格子
  findEmptyCell() {
    var emptyCells = [];
    for (var i = 0; i < this.size; i++)
      for (var j = 0; j < this.size; j++) {
        if (this.grid[i][j] === "") { //若找到空格子则记录坐标，并加入到cells数组中
          emptyCells.push({
            x: i,
            y: j
          });
        }
      }
    return emptyCells;
  },
  //从可使用的空格子中随机选一个
  selectCell() {
    var emptyCells = this.findEmptyCell(); //所有空格子
    if (emptyCells.length) { //若存在空格子
      return emptyCells[Math.floor(Math.random() * emptyCells.length)]; //随机返回这些空格子中的一个
      //Math.random()生成[0,1)的随机数
      //Math.floor对生成的随机数向下取整
      //如emptyCells[2]表示第三个可用的空格子，存有该格子的x和y坐标值
    }
  },
  //判断格子是否是空的，不是返回true，否则返回false
  isCellEmpty() {
    return !this.findEmptyCell().length;
  }
};
//把Grid暴露出去让manager.js使用
module.exports = Grid;