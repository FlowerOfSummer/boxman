# boxman
推箱子游戏
游戏规则：
1.小人将箱子分别推到金蛋上，等每个箱子都覆盖到金蛋上，则完成游戏。
2.小人不能推树，不能推两个箱子一起
3.小人可以踩金蛋
4.游戏共5关，每一关完成后都可以重玩
设计步骤：
 1.寻找素材：人物、金蛋、树、箱子的小图标在阿里的图标库下载的
 2.设计游戏规则
 3.将地图用数组存放，0代表空地，1代表树，2代表金蛋，3代表箱子，4代表人物
 4.遍历数组动态创建div节点，插入相应的图片
 5.控制按钮，上一关，重玩，下一关，设置点击事件。
 6.用数组存放已完成的关卡，用于判断是否完成所有关卡。
