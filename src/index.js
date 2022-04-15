// import "./index.css";
import img from "./public/微信图片_20220221112959.jpg";
import "./index.scss";
const img1 = new Image();
img1.src = img;
console.log();
document.getElementById("imgBox1").appendChild(img1);
function heapSort(arr) {
  let len = arr.length;

  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    heapify(arr, i, len);
  }
  for (let j = len - 1; j >= 1; j--) {
    let temp = arr[j];
    arr[j] = arr[0];
    arr[0] = temp;
    heapify(arr, 0, --len);
  }
  return arr;
}

function heapify(arr, i, len) {
  let l = 2 * i + 1,
    r = 2 * i + 2,
    largest = i;

  if (l < len && arr[largest] < arr[l]) {
    largest = l;
  }
  if (r < len && arr[largest] < arr[r]) {
    largest = r;
  }
  if (largest != i) {
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;
    heapify(arr, largest, len);
  }
}
console.log(
  heapSort([91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31, 77, 81, 22])
);
