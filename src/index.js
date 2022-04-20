// import "./index.css";
import img from "./public/1.jpg";
import "./index.scss";
import Author from "./author.js";
const img1 = new Image();
img1.src = img;
console.log();
document.getElementById("imgBox1").appendChild(img1);
// function heapSort(arr) {
//   let len = arr.length;

//   for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
//     heapify(arr, i, len);
//   }
//   for (let j = len - 1; j >= 1; j--) {
//     let temp = arr[j];
//     arr[j] = arr[0];
//     arr[0] = temp;
//     heapify(arr, 0, --len);
//   }
//   return arr;
// }

// function heapify(arr, i, len) {
//   let l = 2 * i + 1,
//     r = 2 * i + 2,
//     largest = i;

//   if (l < len && arr[largest] < arr[l]) {
//     largest = l;
//   }
//   if (r < len && arr[largest] < arr[r]) {
//     largest = r;
//   }
//   if (largest != i) {
//     let temp = arr[i];
//     arr[i] = arr[largest];
//     arr[largest] = temp;
//     heapify(arr, largest, len);
//   }
// }
// console.log(
//   heapSort([91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31, 77, 81, 22])
// );

/*方法说明：桶排序
@param  array 数组
@param  num   桶的数量*/
function bucketSort(array, num) {
  if (array.length <= 1) {
    return array;
  }
  var len = array.length,
    max,
    buckets = [],
    result = [],
    min = (max = array[0]),
    regex = "/^[1-9]+[0-9]*$/",
    space,
    n = 0;
  num = num || (num > 1 && regex.test(num) ? num : 10);
  console.time("桶排序耗时");
  for (var i = 1; i < len; i++) {
    min = min <= array[i] ? min : array[i];
    max = max >= array[i] ? max : array[i];
  }
  space = (max - min + 1) / num;
  for (var j = 0; j < len; j++) {
    var index = Math.floor((array[j] - min) / space);
    if (buckets[index]) {
      //  非空桶，插入排序
      var k = buckets[index].length - 1;
      while (k >= 0 && buckets[index][k] > array[j]) {
        buckets[index][k + 1] = buckets[index][k];
        k--;
      }
      buckets[index][k + 1] = array[j];
    } else {
      //空桶，初始化
      buckets[index] = [];
      buckets[index].push(array[j]);
    }
  }
  while (n < num) {
    result = result.concat(buckets[n]);
    n++;
  }
  console.timeEnd("桶排序耗时");
  return result;
}

function bucketSoet2(arr, num) {
  let len = arr.length,
    max,
    min,
    space,
    n = 0,
    result = [],
    buckets = [];
  min = max = arr[0];
  for (let i = 0; i < len; i++) {
    min = min <= arr[i] ? min : arr[i];
    max = max >= arr[i] ? max : arr[i];
  }

  space = (max - min + 1) / num;
  for (let j = 0; j < len; j++) {
    let index = Math.floor((arr[j] - min) / space);
    if (buckets[index]) {
      let k = buckets[index].length - 1;
      while (k >= 0 && buckets[index][k] > arr[j]) {
        buckets[index][k + 1] = buckets[index][k];
        k--;
      }
      buckets[index][k + 1] = arr[j];
    } else {
      buckets[index] = [];
      buckets[index].push(arr[j]);
    }
  }
  while (n < num) {
    result = result.concat(buckets[n]);
    n++;
  }
  return result;
}

class myES6 {
  name;
  constructor(name) {
    this.name = name;
  }
}

const author = new Author();
console.log(author);
console.log(new myES6("jj"));
var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bucketSort(arr, 4)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(111, bucketSoet2(arr, 4));
