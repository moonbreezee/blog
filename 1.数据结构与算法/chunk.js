// chunk, 数组分块
const chunk = (arr, size) =>
// from，用于格式化array，接受一个数组和一个格式化函数
Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
  arr.slice(i * size, i * size + size),
);
console.log('chunk:', chunk([1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5], 6));
