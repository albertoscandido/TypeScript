type CallbackFilter<T> = (value: T, index?: number, totalArr?: Array<T>) => boolean;

function myFilter<T>(arr: Array<T>, callback: CallbackFilter<T>): Array<T> {
  const result : Array<T> = [];

  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      result.push(arr[i]);
    }
  }

  return result;
}

console.log(myFilter([1, 2, 3], (item) => item < 3 ));