
window.onload = function () {
    Game.exe();
}
var Game = {
    //先找wrap
    oWrap: document.getElementById("wrap"),
    exe: function () {
        Game.CreateWrap(Game.level);

    },
    //赢的次数，方便计算是否所有关卡都通关！
    winArr: [],
    winCount: 0,
    //当前关卡
    level: 0,
    size: { x: 16, y: 16 },
    CreateWrap: function (lel) {
        size = { x: 16, y: 16 };
        Game.oWrap.style.cssText = "width:" + size.x * 35 + "px;height:" + size.y * 35 + "px;";
        //将将小格子变成div
        for (var i = 0; i < size.x * size.y; i++) {

            var opeople;

            /*  Game.oWrap.appendChild(appenddiv);*/
            var x, y;
            switch (Game.mapdata[lel][i]) {
                case 1:
                    //算坐标
                    x = i % size.x;
                    y = parseInt(i / size.x);


                    var appenddiv = document.createElement("div");
                    appenddiv.style.cssText = "left:" + x * 35 + "px;top:" + y * 35 + "px;";
                    //这种image对象的方式 有一种预加载的功能  当你给他src 的时候 就会开始加载图片
                    var ima = new Image();
                    //游戏边界  树的图片
                    ima.src = "./src/image/tree .png";
                    appenddiv.appendChild(ima);
                    appenddiv.className = "tree";
                    appenddiv.x = x;
                    appenddiv.y = y;
                    appenddiv.appendChild(ima);
                    Game.oWrap.appendChild(appenddiv);
                    break;
                case 2:
                    x = i % size.x;
                    y = parseInt(i / size.x);
                    /*alert(x+"  "+y);*/

                    var appenddiv = document.createElement("div");
                    appenddiv.x = x;
                    appenddiv.y = y;

                    appenddiv.style.cssText = "left:" + x * 35 + "px;top:" + y * 35 + "px;";
                    var ima = new Image();
                    //金蛋图片
                    ima.src = "./src/image/egg.png";
                    appenddiv.className = "ball";
                    appenddiv.appendChild(ima);
                    Game.oWrap.appendChild(appenddiv);
                    break;
                case 3:
                    x = i % size.x;
                    y = parseInt(i / size.x);


                    var appenddiv = document.createElement("div");
                    appenddiv.x = x;
                    appenddiv.y = y;
                    appenddiv.style.cssText = "left:" + x * 35 + "px;top:" + y * 35 + "px;";
                    var ima = new Image();
                    //箱子图片
                    ima.src = "./src/image/box.png"
                    appenddiv.className = "box";
                    appenddiv.appendChild(ima);
                    Game.oWrap.appendChild(appenddiv);
                    break;
                case 4:
                    x = i % size.x;
                    y = parseInt(i / size.x);


                    var appenddiv = document.createElement("div");
                    appenddiv.x = x;
                    appenddiv.y = y;
                    appenddiv.style.cssText = "left:" + x * 35 + "px;top:" + y * 35 + "px;";
                    var ima = new Image();
                    //推箱子的小人图片
                    ima.src = "./src/image/people.png"
                    opeople = ima;
                    appenddiv.className = "people";
                    appenddiv.appendChild(ima);
                    Game.oWrap.appendChild(appenddiv);
                    opeople = ima;
                    break;
            }
        }
        Game.contralPeople(opeople);
    },
    //控制小人


    contralPeople: function (op) {
        //先找到opeople div
        oparent = op.parentNode;
        document.onkeydown = function (event) {
            event = event || window.event;
            var keyCode = event.keyCode;
            switch (keyCode) {
                //往左走
                case 37:
                    Game.movePeople({ x: -1 }, op);
                    break;

                //向上走
                case 38:
                    Game.movePeople({ y: -1 }, op);
                    break;
                //向右走
                case 39:
                    Game.movePeople({ x: 1 }, op);
                    break;
                //向下走
                case 40:
                    Game.movePeople({ y: 1 }, op);
                    break;
            }
        }

    },
    movePeople: function (json, op) {
        //临时存放box[i]

        opeople = op;
        oparent = opeople.parentNode;
        var box = Game.getClass(Game.oWrap, "box");

        x = json.x || 0;
        y = json.y || 0;
        if (Game.mapdata[Game.level][oparent.x + x + (oparent.y + y) * Game.size.x] != 1) {

            //不是边界树就可以走,计算当前位置
            oparent.x = oparent.x + x;
            oparent.y = oparent.y + y;
            oparent.style.left = oparent.offsetLeft + x * 35 + "px";
            oparent.style.top = oparent.offsetTop + y * 35 + "px";

            for (var i = 0; i < box.length; i++) {

                if (box[i].x == oparent.x && box[i].y == oparent.y) {

                    if (Game.mapdata[Game.level][box[i].x + x + (box[i].y + y) * Game.size.x] != 1) {
                        //检测两个箱子是否碰撞   碰撞 小人则不能再走
                        if (!Game.twoBoxJianCe(box[i], x, y)) {
                            box[i].x = box[i].x + x;
                            box[i].y = box[i].y + y;
                            box[i].style.left = box[i].offsetLeft + x * 35 + "px";
                            box[i].style.top = box[i].offsetTop + y * 35 + "px";
                            Game.isOrNoSuccess();
                        } else {
                            oparent.x = oparent.x - x;
                            oparent.y = oparent.y - y;
                            oparent.style.left = oparent.offsetLeft - x * 35 + "px";
                            oparent.style.top = oparent.offsetTop - y * 35 + "px";
                        }
                    } else {
                        //因为之前计算了当前移动后的位置，所以当不能移动时，人物的位置变回之前的位置
                        oparent.x = oparent.x - x;
                        oparent.y = oparent.y - y;
                        oparent.style.left = oparent.offsetLeft - x * 35 + "px";
                        oparent.style.top = oparent.offsetTop - y * 35 + "px";

                    }
                }

            }

        }

    },



    twoBoxJianCe: function (box, x, y) {
        var obox = Game.getClass(Game.oWrap, "box");

        for (var i = 0; i < obox.length; i++) {

            if (obox[i] != box) {
                if (obox[i].x == box.x + x && obox[i].y == box.y + y) {
                    // alert(obox[i]);
                    // console.log("两个箱子相撞了，请注意是否可以继续游戏");
                    confirm("小人儿力量有限，不能同时推两个箱子哦！");
                    //碰撞
                    return true;
                }
            }

        }
        //没碰撞
        return false;
    },

    //判断
    isOrNoSuccess: function () {

        var ball = Game.getClass(Game.oWrap, "ball");
        var box = Game.getClass(Game.oWrap, "box");
        var successnum = 0;
            /*console.log(box.length);
            console.log(ball.length)*/;
        for (var i = 0; i < box.length; i++) {
            for (var j = 0; j < ball.length; j++) {
                if (box[i].x == ball[j].x && box[i].y == ball[j].y) {
                    successnum++;
                }
            }
        }
        /*console.log(successnum);*/
        if (successnum == ball.length) {
            var trees = document.getElementsByClassName('tree');
            for (var i = trees.length - 1; i >= 0; i--) {
                trees[i].parentNode.removeChild(trees[i]);
            }
            var boxes = document.getElementsByClassName('box');
            for (var i = boxes.length - 1; i >= 0; i--) {
                boxes[i].parentNode.removeChild(boxes[i]);
            }
            var people = document.getElementsByClassName('people');
            for (var i = people.length - 1; i >= 0; i--) {
                people[i].parentNode.removeChild(people[i]);
            }
            var eggs = document.getElementsByClassName('ball');
            for (var i = eggs.length - 1; i >= 0; i--) {
                eggs[i].parentNode.removeChild(eggs[i]);
            }
            let level = Game.level + 1;

            let wintext = "恭喜你通过第" + level + "关！请点击下一关！";
            document.getElementById("text").innerHTML = wintext;

            if (!Game.winArr.includes(Game.level)) {
                Game.winArr.push(Game.level);
                Game.winCount++;
            }


        }

    },



    //存放关卡数据
    mapdata: [
        //第一关关卡数据     数组下标对应一个div  1表示边界  2表示球  3是箱子 4表示小人
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 3, 0, 3, 2, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 0, 3, 4, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 1, 3, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        // 第二关
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
            0, 1, 2, 0, 3, 0, 3, 0, 0, 0, 1, 1, 0, 0, 0, 0,
            0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 1, 0, 0,
            0, 1, 1, 1, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0,
            0, 1, 2, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        // 第三关
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 0, 0, 3, 0, 1, 1, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 0, 3, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 0, 3, 0, 4, 0, 1, 0, 0, 0, 0, 0,
            0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        // 第四关
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 3, 0, 3, 2, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 4, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 1, 1, 1, 0, 0, 0, 3, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        // 第五关
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 3, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 3, 0, 3, 2, 1, 0, 0, 0, 0,
            0, 0, 1, 1, 1, 0, 0, 0, 4, 1, 1, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 3, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 3, 0, 0, 1, 1, 1, 1, 0, 0, 0,
            0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0,
            0, 0, 1, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
            0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    ],


    getClass: function (node, classname) {
        if (node.getElementsByClassName) {
            return node.getElementsByClassName(classname);
            //如果存在该标签 就返回
        } else {
            var elems = node.getElementsByTagName(node),
                defualt = [];
            for (var i = 0; i < elems.length; i++) {
                //遍历所有标签
                if (elems[i].className.indexOf(classname) != -1) {
                    //查找相应类名的标签
                    defualt[defualt.length] = elems[i];
                }
            }
            return defualt;
        }

    },


};

function levelCount(data) {
    if (data == -1) {
        var trees = document.getElementsByClassName('tree');
        for (var i = trees.length - 1; i >= 0; i--) {
            trees[i].parentNode.removeChild(trees[i]);
        }
        var boxes = document.getElementsByClassName('box');
        for (var i = boxes.length - 1; i >= 0; i--) {
            boxes[i].parentNode.removeChild(boxes[i]);
        }
        var people = document.getElementsByClassName('people');
        for (var i = people.length - 1; i >= 0; i--) {
            people[i].parentNode.removeChild(people[i]);
        }
        var eggs = document.getElementsByClassName('ball');
        for (var i = eggs.length - 1; i >= 0; i--) {
            eggs[i].parentNode.removeChild(eggs[i]);
        }
        document.getElementById("text").innerHTML = "";
        Game.level--;
        // console.log(Game.level);
        // console.log(Game.winArr);
        if (Game.level > -1) {
            // console.log(Game.winArr.includes(Game.level));
            if (Game.winArr.includes(Game.level)) {
                var wintext = document.createTextNode("您已通过这一关卡，可以选择重玩！");
                document.getElementById("text").appendChild(wintext);
            } else {
                Game.CreateWrap(Game.level);
            }
        } else {
            if (Game.winCount === 5) {
                var wintext = document.createTextNode("恭喜你通过所有关卡！");
                document.getElementById("text").appendChild(wintext);
            } else {
                var wintext = document.createTextNode("这已经是第一关，请继续下一关！");
                document.getElementById("text").appendChild(wintext);
            }

        }
    } else if (data === 0) {
        var trees = document.getElementsByClassName('tree');
        for (var i = trees.length - 1; i >= 0; i--) {
            trees[i].parentNode.removeChild(trees[i]);
        }
        var boxes = document.getElementsByClassName('box');
        for (var i = boxes.length - 1; i >= 0; i--) {
            boxes[i].parentNode.removeChild(boxes[i]);
        }
        var people = document.getElementsByClassName('people');
        for (var i = people.length - 1; i >= 0; i--) {
            people[i].parentNode.removeChild(people[i]);
        }
        var eggs = document.getElementsByClassName('ball');
        for (var i = eggs.length - 1; i >= 0; i--) {
            eggs[i].parentNode.removeChild(eggs[i]);
        }
        Game.CreateWrap(Game.level);
    } else if (data === 1) {
        var trees = document.getElementsByClassName('tree');
        for (var i = trees.length - 1; i >= 0; i--) {
            trees[i].parentNode.removeChild(trees[i]);
        }
        var boxes = document.getElementsByClassName('box');
        for (var i = boxes.length - 1; i >= 0; i--) {
            boxes[i].parentNode.removeChild(boxes[i]);
        }
        var people = document.getElementsByClassName('people');
        for (var i = people.length - 1; i >= 0; i--) {
            people[i].parentNode.removeChild(people[i]);
        }
        var eggs = document.getElementsByClassName('ball');
        for (var i = eggs.length - 1; i >= 0; i--) {
            eggs[i].parentNode.removeChild(eggs[i]);
        }
        // let text = document.getElementById('text');
        // Game.oWrap.removeChild(text);
        document.getElementById("text").innerHTML = "";
        Game.level++;
        if (Game.level <= 4) {
            if (Game.winArr.includes(Game.level)) {
                var wintext = document.createTextNode("您已通过这一关卡，可以选择重玩！");
                document.getElementById("text").appendChild(wintext);
            } else {
                Game.CreateWrap(Game.level);
            }
        } else {
            if (Game.winCount === 5) {
                var wintext = document.createTextNode("恭喜你通过所有关卡！");
                document.getElementById("text").appendChild(wintext);
            } else {
                var wintext = document.createTextNode("这已经是最后一关啦！");
                document.getElementById("text").appendChild(wintext);
            }

        }

    }
}
