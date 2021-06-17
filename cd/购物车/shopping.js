var rows = document.querySelectorAll('#goods .tr-item');
var checkboxs = document.querySelectorAll('.checkItem');
var price = document.querySelectorAll('.price');
var add = document.querySelectorAll('.add');
var count = document.querySelectorAll('.count');
var reduce = document.querySelectorAll('.reduce');
var del = document.querySelectorAll('.delete');

var checkAll = document.querySelector('.checkAll');
var total = document.querySelector('.total');
var confirm = document.querySelector('.confirm');
var yes = document.getElementById('yes');
var no = document.getElementById('no');

var sumTotal = 0; //结算总金额
var checkedNum = 0; //被选中的商品种类
var rowsLen = rows.length; //可选商品种类数
var currentDeletedIndex = 0; //当前被删除的索引值
//全选
checkAll.onchange = function() {
        sumTotal = 0; //计算前 清零总金额
        if (this.checked === true) {
            for (var i = 0; i < rowsLen; i++) {
                checkboxs[i].checked = true;
                sumTotal += parseFloat(price[i].innerText) * parseFloat(count[i].innerText);
            }
            checkedNum = rowsLen;
            total.innerText = sumTotal.toFixed(2) + '元';
        } else {
            for (var j = 0; j < rowsLen; j++) {
                checkboxs[j].checked = false;
            }
            checkedNum = 0;
            sumTotal = 0;
            total.innerText = sumTotal + '元';
        }
    }
    // 包含加法 减法 
function refresh() {
    for (var i = 0; i < rowsLen; i++) {
        // 加法
        add[i].index = i;
        // setAttribute('data-index', i)
        add[i].onclick = function() {
            var index = this.index;
            var num = parseFloat(count[index].innerText);
            num = num + 1;
            count[index].innerText = num;
            if (checkboxs[index].checked === true) {
                sumTotal += parseFloat(price[index].innerText)
            }
            total.innerText = sumTotal.toFixed(2) + '元';
        }

        // 减法
        reduce[i].index = i;
        reduce[i].onclick = function() {
            var index = this.index;
            var num = parseFloat(count[index].innerText);
            if (num === 1) { return false } // 下面的语句不会执行了
            num = num - 1;
            count[index].innerText = num;
            if (checkboxs[index].checked === true) {
                sumTotal -= parseFloat(price[index].innerText)
            }
            total.innerText = sumTotal.toFixed(2) + '元';
            confirm.style.display = 'none';
        }

        // 复选框
        checkboxs[i].index = i; // 去绑定正确的索引值
        checkboxs[i].onchange = function() {
            var index = this.index;
            if (checkboxs[index].checked === true) {
                sumTotal += parseFloat(price[this.index].innerText) * parseFloat(count[index].innerText);
                checkedNum++;
            } else {
                sumTotal -= parseFloat(price[this.index].innerText) * parseFloat(count[index].innerText);
                checkedNum--;
            }
            if (checkedNum === rowsLen) {
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
            total.innerText = sumTotal.toFixed(2) + '元';
        }
    }
}

// 删除操作
function refreshDelete() {
    for (var i = 0; i < rowsLen; i++) {
        del[i].index = i;
        del[i].onclick = function() {
            var index = this.index;
            currentDeletedIndex = index;
            confirm.style.display = 'block';
        }
    }
}
// yes 按钮
yes.onclick = function() {
        // var currentDeletedIndex = 0;
        if (checkboxs[currentDeletedIndex].checked === true) {
            sumTotal -= parseFloat(price[currentDeletedIndex].innerText) * parseFloat(count[currentDeletedIndex].innerText);
        }
        total.innerText = sumTotal.toFixed(2) + '元';
        // 把当前行的dom 删除
        rows[currentDeletedIndex].remove();
        confirm.style.display = 'none';
        //
        rows = document.querySelectorAll('#goods .tr-item');
        checkboxs = document.querySelectorAll('.checkItem');
        price = document.querySelectorAll('.price');
        add = document.querySelectorAll('.add');
        count = document.querySelectorAll('.count');
        reduce = document.querySelectorAll('.reduce');
        del = document.querySelectorAll('.delete');
        console.log(rows)
        rowsLen = rows.length;
        if (rowsLen === checkedNum) {
            checkAll.checked = true;
        }
        refresh(); // 重新去绑定
        refreshDelete(); // 重新绑定删除操作
    }
    // no 按钮
no.onclick = function() {
        confirm.style.display = 'none';
    }
    // 初始化
refresh();
refreshDelete();