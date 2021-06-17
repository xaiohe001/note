### 数组冒泡排序算法
```javascript
function bSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len-1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      // 相邻元素两两对比，元素交换，大的元素交换到后面
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}
```