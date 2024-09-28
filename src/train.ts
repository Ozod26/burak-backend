/*
ZU-TASK:

Shunday function yozing, u parametridagi 
array ichida takrorlanmagan raqamlar yig'indisini qaytarsin.
MASALAN: sumOfUnique([1,2,3,2]) return 4

@MITASK
*/

function sumOfUnique(nums: number[]): number {
  const frequency: { [key: number]: number } = {};

  // counting the occurences of each element
  for (const num of nums) {
    if (frequency[num] !== undefined) {
      frequency[num] += 1;
    } else {
      frequency[num] = 1;
    }
  }

  // sum the elements that appear exactly once
  let countUnique = 0;
  for (const num in frequency) {
    if (frequency[num] === 1) {
      countUnique += parseInt(num);
    }
  }
  return countUnique;
}

const result = sumOfUnique([1, 2, 3, 2]);
console.log("result:", result);

/*
ZT-TASK:

Shunday function yozing, u parametridagi string ichida
 1 martadan ortiq qaytarilmagan birinchi harf indeksini qaytarsin.
MASALAN: firstUniqueCharIndex(“stamp”) return 0

@MITASK
*/

/*
function firstUniqueCharIndex(str: string) {
  const charCount: { [key: string]: number } = {};

  // counting the occurences of each character in the string
  for (let char of str) {
    if (charCount[char] !== undefined) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }
  // finding the index of the first unique character
  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]] === 1) {
      return i;
    }
  }
  return -1;
}

const result = firstUniqueCharIndex("stamp");
console.log("result:", result);
*/

/* 
ZS-TASK:

Shunday function yozing, u parametridagi 
arrayni ichidagi 1 marta kelgan elemnetni qaytarsin.
MASALAN: singleNumber([4, 2, 1, 2, 1]) return 4

@MITASK

*/

/** Hash map usulida arrayni ichida bir marta kelgan elementni topish function() **/

/* function singleNumber(nums: number[]): number {
  // count variable to store the occurence of an element in the array and it stores them as key and value
  const count: { [key: number]: number } = {};

  // counting the elements
  for (const num of nums) {
    if (count[num]) {
      count[num] += 1;
    } else {
      count[num] = 1;
    }
  }

  // 1 marta uchragan elementni topish
  for (const num of nums) {
    if (count[num] === 1) {
      return num;
    }
  }
  return -1;
}

const result = singleNumber([4, 1, 2, 2, 1]);
console.log("result:", result);

*/

/** Solution 2 filter ni ikki marotaba ishlatib **/
/*
function singleNumber(arr: number[]) {
  return arr.filter((i) => arr.filter((j) => i === j).length === 1);
}

const result = singleNumber([4, 2, 1, 2, 1]);
console.log(result);
*/

/*
ZR-TASK:

Shunday function yozing, u parametridagi 
string ichidagi raqam va sonlarni sonini sanasin.
MASALAN: countNumberAndLetters(“string152%\¥”) 
return {number:3, letter:6}

@MITASK

*/

/*
function countNumberAndLetters(input: string): {
  number: number;
  letter: number;
} {
  let count = { number: 0, letter: 0 };

  for (let char of input) {
    if (/[0-9]/.test(char)) {
      count.number++;
    } else if (/[a-zA-Z]/.test(char)) {
      count.letter++;
    }
  }
  return count;
}

const result = countNumberAndLetters("string152%¥");
console.log(result); // Output: { number: 3, letter: 6 }

*/

/*

ZQ-TASK:

Shunday function yozing, u parametiriadgi 
array ichida 2 marta qaytarilgan sonlarni alohida arrayda
qaytarsin. MASLAN: findDuplicates([1,2,3,4,5,4,3,4]) return [3,4]

*/

/* function findDuplicates(arr: number[]): number[] {
  const countMap = new Map<number, number>();
  const duplicates: number[] = [];

  for (const num of arr) {
    if (countMap.has(num)) {
      countMap.set(num, countMap.get(num)! + 1);
    } else {
      countMap.set(num, 1);
    }
  }

  for (const num of arr) {
    if (countMap.get(num)! > 1 && !duplicates.includes(num)) {
      duplicates.push(num);
    }
  }

  return duplicates;
}

const result = findDuplicates([1, 2, 3, 4, 5, 4, 3, 4]);
console.log("result:", result);
*/

/*
ZP-TASK:

Shunday function yozing, u parametridagi 
array ichida eng kop takrorlangan raqamni topib qaytarsin.
MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4

@MITASK
*/

/*
function majorityElement(arr: any) {
  const counts = arr.reduce((acc: any, num: any) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).reduce((a: any, b: any) =>
    counts[a] > counts[b] ? a : b
  );
}

const result = majorityElement([1, 2, 3, 4, 5, 4, 3, 4]);
console.log("result:", result);
*/

/*
ZO-TASK:

Shunday function yozing, u parametrdagi string ichidagi qavslar miqdori 
balansda ekanligini aniqlasin. Ya'ni ochish("(") va yopish(")") qavslar soni bir xil bolishi kerak.
MASALAN: areParenthesesBalanced("string()ichida(qavslar)soni()balansda") return true


*/

/*
function areParenthesesBalanced(s: string): boolean {
  const stack: string[] = [];

  for (let char of s) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}

const result = areParenthesesBalanced("string()ichida(qavslar)soni()balansda");
console.log("result:", result);
*/

/*
ZN-Task
Shunday function yozing, uni array va number parametri bolsin. 
Ikkinchi parametrda berilgan raqamli indexgacha arrayni orqasiga ogirib qaytarsin.
MASALAN: rotateArray([1, 2, 3, 4, 5, 6], 3) return [5, 6, 1, 2, 3, 4]

*/

/*
function rotateArray(arr: number[], index: number): number[] {
  if (index < 0 || index >= arr.length) {
    throw new Error("Index out of bounds");
  }

  // Slice the array into two parts and concatenate them in reverse order
  const fPart = arr.slice(index + 1);
  const sPart = arr.slice(0, index + 1);

  return [...fPart, ...sPart];
}

const result = rotateArray([1, 2, 3, 4, 5, 6], 3);
console.log("result:", result);
*/

/*
ZM-TASK:

Shunday function yozing, u function parametrga
 berilgan raqamlarni orqasiga ogirib qaytarsin.
MASALAN: reverseInteger(123456789) return 987654321

@MITASK

*/

/*

function reverseInteger(num: number) {
  // variable to store reversed integer
  let reversed = 0;
  // the while loop continues untill 'num' becomes 0.
  while (num !== 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.trunc(num / 10);
  }
  return reversed;
}

const result = reverseInteger(123456789);
console.log("result:", result);
*/

/*

ZL-TASK:

Shunday function yozing, u parametrda berilgan 
stringni kebab casega otkazib qaytarsin. 
Bosh harflarni kichik harflarga ham otkazsin.
MASALAN: stringToKebab(“I love Kebab”) return “i-love-kebab”

@MITASK

*/

/*
function stringToKebab(str: string) {
  let new_str = str.split(" ");
  let toLower = new_str.map(function (letter) {
    return letter.charAt(0).toLocaleLowerCase() + letter.slice(1);
  });
  return toLower.join("-");
}

const result = stringToKebab("I Love Kebab");
console.log("result:", result);
*/

/*
 
 ZK-TASK:

Shunday function yozing, u har soniyada bir marta consolega 
1 dan 5 gacha bolgan raqamlarni chop etsin va 5 soniyadan keyin ishini toxtatsin.
MASALAN: printNumbers()
 */

/*
function printNumbers(): void {
  // loops through the numbers from to 5
  // and exits the iteration when it reaches 5
  for (let i = 1; i < 6; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
  setTimeout(() => {
    const message: string = "Iteration is done!";
    console.log(message);
  }, 6000);
}

printNumbers();
*/

/* ZJ-TASK:
 Shunday function yozing, u berilgan arrayni ichidagi numberlarni qiymatini hisoblab qaytarsin.
MASALAN: reduceNestedArray([1, [1, 2, [4]]]) return 8
*/
/* 
function reduceNestedArray(arr: any[]): number {
  return arr.reduce((sum, item) => {
    if (Array.isArray(item)) {
      return sum + reduceNestedArray(item);
    } else {
      return sum + item;
    }
  }, 0);
}
const result = reduceNestedArray([1, [1, 2, [4]]]); // 8)
console.log("result:", result);
*/

/*
Shunday function yozing, u function ishga tushganda 
3 soniyadan keyin "Hello World " ni qaytarsin. 

Masalan: delayHelloWorld("Hello World") return "Hello World"

*/

/*
async function delayHelloWorld(message: string): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, 3000);
  });
}

const result = delayHelloWorld("Hello World");
console.log("result:", result);
*/
/*
ZH-TASK:

Shunday function yozing, u berilgan array parametrni 
ichidagi eng katta raqamgacha tushib qolgan raqamlarni bir arrayda qaytarsin. 
MASALAN: findDisappearedNumbers([1, 3, 4, 7]) return [2, 5, 6]

@MITASK

*/

/* function findDisappearedNumbers(arr: number[]): number[] {
  const maxNum: number = Math.max(...arr); // Berilgan massivdagi eng katta raqam
  const missingNumbers: number[] = [];

  for (let i = 1; i < maxNum; i++) {
    if (!arr.includes(i)) {
      missingNumbers.push(i);
    }
  }

  return missingNumbers;
}
*/
/*
const result = findDisappearedNumbers([1, 3, 4, 7]);
console.log("result:", result);
/*

/* 
ZG-TASK:

Shunday function yozing, u berilgan string parametrni snake casega otkazib qaytarsin. 
MASALAN: capitalizeWords('name should be a string') return 'name_should_be_a_string'

@MITASK

*/

/* function snakeWords(str: string) {
  let words = str.split(" ");
  let capitalize = words.map(function (word) {
    return word.charAt(0).toLowerCase() + word.slice(1);
  });
  return capitalize.join("_");
}
const result = snakeWords("name should be a string");
console.log("result:", result);
*/
/*
ZF-TASK

Shunday function yozing, uni string parameteri bolsin. String ichidagi har bir 
sozni bosh harfilarini katta harf qilib qaytarsin lekin 1 yoki 2 harfdan 
iborat sozlarni esa oz holicha qaytarsin 
masalan: capitalizeWords("name should be string") return Name Should be a String

*/

/*
function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word.length <= 2) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const result = capitalizeWords("name should be a string");
console.log(result);
*/

/* ZE-TASK:

Shunday function yozing, uni  string parametri bolsin. 
String ichida takrorlangan harflarni olib tashlab qolganini qaytarsin
MASALAN: removeDuplicate('stringg') return 'string'

@MITASK

*/

/* function removeDuplicate(str: any) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    if (result.indexOf(str[i]) === -1) {
      result += str[i];
    }
  }
  return result;
}

const result = removeDuplicate("stringg");
console.log("result:", result); */

// solution 2:
/*function remDuplicate(str: any) {
  let result = "";
  let encountered: any = {};
  for (let char of str) {
    if (!encountered[char]) {
      result += char;
      encountered[char] = true;
    }
  }
  return result;
}

const res = remDuplicate("Martinn");
console.log("result:", res);
*/

/*
ZD-TASK:

Shunday function yozing, uni number, 
array va number parametrlari bolsin 
va berilgan 1-parametr numberga teng 
indexni array ichidan topib 3-parametrdagi 
raqam bilan almashtirib yangilangan arrayni qaytarsin
MASALAN: changeNumberInArray(1, [1,3,7,2], 2) return [1,2,7,2]

@MITASK

*/
/*
function changeNumberInArray(index: any, value: any, newVal: any) {
  if (index >= 0 && index < value.length) {
    value[index] = newVal;
  }


  return value;
}

const result = changeNumberInArray(1, [1, 3, 7, 2], 2);
console.log(result);
*/

/* 
ZC-TASK:

Shunday function yozing, uni number parametri bolsin
 va function qabul parametrni selsiy miqdori
  sifatida qabul qilib uni farenhitga ozgartirib bersin
MASALAN: celsiusToFahrenheit(0) return 32

@MITASK
*/
/*
function celsiusToFahrenheit(celsius: number) {
  const fahrenheit = (celsius * 9) / 5 + 32;
  return fahrenheit;
}
const result = celsiusToFahrenheit(0);
console.log(result);
*/

/* 
ZB-TASK:

Shunday function yozing, uni 2 ta number parametri bolsin
 va berilgan sonlar orasidan random raqam return qilsin
MASALAN: randomBetween(30, 50) return 45

@MITASK

*/
/*
function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
const result = randomNumber(30, 50);
console.log("result:", result); */

// agar har doim 45 sonini qaytishni hohlasak:
/* function random(min: number, max: number) {
  return 45;
}
const number = random(30, 50);
console.log("number:", number); */

/* function sortByAge(arr: number[]) {
  return arr.sort((a: any, b: any) => a.age - b.age);
}

let people: any = [{ age: 23 }, { age: 21 }, { age: 13 }];
const result = sortByAge(people);
console.log("result:", result);
*/
/*

Z-TASK:

Shunday function yozing, uni sonlardan tashkil topgan 
array qabul qilsin. Function arraydagi 
juft sonlarni yigindisini qaytarsin
MASALAN: sumEvens([1,2,3]) return 2

*/
/*
const sumEvens = (arr: number[]) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      sum = sum + arr[i];
    }
  }
  return sum;
};

const result = sumEvens([1, 2, 3]);
console.log("result:", result);
*/

/*   
Y-TASK:

 Shunday function yozing, uni 2 ta array parapetri bolsin. 
 Function ikkala arrayda ham ishtirok etgan qiymatlarni 
 bir arrayda qaytarsin
 MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3]

@MITASK
*/
/*
function findIntersection(arr1: number[], arr2: number[]) {
  const intersection: number[] = [];

  // iteration of arrays
  arr1.forEach((value) => {
    if (arr2.includes(value) && !intersection.includes(value)) {
      intersection.push(value);
    }
  });
  return intersection;
}
const result = findIntersection([1, 2, 3], [3, 2, 0]);
console.log("result:", result);
*/

/*
X-TASK:

Shunday function yozing, uni object va string parapetrlari bolsin. 
Function string parametri object ichida 
necha marotaba takrorlanganligini qaytarsin (nested object bolsa ham sanasin)
 MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

@MITASK
*/

/*
function countOccurences(obj: any, key: any) {
  let count = 0;

  function countKeys(val: any) {
    for (let prop in val) {
      if (obj.hasOwnProperty(prop)) {
        if (typeof val[prop] === "object") {
          countKeys(val[prop]);
        } else if (prop === key) {
          count++;
        }
      }
    }
  }
  countKeys(obj);
  return count;
}

let data = {
  model: "Bugatti",
  steer: { model: "HANKOOK", size: "Bugatti" },
  bmw: { model: "M5 xiDrive", speed: "320kmh" },
};

const result = countOccurences(data, "model");
console.log("result:", result);
*/

/* W-TASK:

Shunday function yozing, uni array va number parametrlari bolsin. 
Function arrayni numberda berilgan uzunlikda kesib 
bolaklarga ajratilgan array holatida qaytarsin
MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]]

@MITASK
*/
// n = chunk size

/*

const chunkArray = (arr: [], n: number) => {
  const new_arr = [];
  for (let i = 0; i < arr.length; i += n) {
    new_arr.push(arr.slice(i, i + n));
  }
  return new_arr;
};
const array: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = chunkArray(array, 3);
console.log(result);
*/

/* 
V-TASK:

Shunday function yozing, uni string parametri bolsin 
va stringdagi harf va u harf necha marta takrorlangani sonidan
 tashkil topgan object qaytarsin.
MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}

@MITASK
*/
/*
const countChars = (str: any) => {
  const charCount: any = {};

  // loop through each character in the string
  for (let idx of str) {
    // if the character already exists in the charCount object,increment its count
    if (charCount[idx]) {
      charCount[idx]++;
    } else {
      // otherwise, intialize its count to 1
      charCount[idx] = 1;
    }
  }
  return charCount;
};
const result = countChars("hello");
console.log("result:", result);

*/
/** 
 U-TASK:

Shunday function yozing, uni number parametri bolsin
 va 0 dan berilgan parametrgacha bolgan oraliqdagi 
 faqat toq sonlar nechtaligini return qilsin
MASALAN: sumOdds(9) return 4; sumOdds(11) return 5;

**/

/*
const sumOdds = (arr: any) => {
  let count = 0;
  for (let i = 0; i < arr; i++) {
    if (i % 2 !== 0) {
      count++;
    }
  }

  return count;
};

const result = sumOdds(9);
console.log("result:", result);
*/

/* T-TASK:
Shunday function yozing, u sonlardan tashkil topgan 
2 ta array qabul qilsin va ikkala arraydagi sonlarni 
tartiblab bir arrayda qaytarsin
MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]); return [0,3,4,4,6,30,31]
@MITASK
*/

/* const mergeSortedArrays = (arr1: any, arr2: any) => {
  let new_arr = [];

  // inserting all elements from arr1 to new_arr
  for (let i = 0; i < arr1.length; i++) {
    new_arr.push(arr1[i]);
  }

  // inserting all elements from arr2 to new_arr
  for (let i = 0; i < arr2.length; i++) {
    new_arr.push(arr2[i]);
  }

  // Sort the merged array in ascending order
  new_arr.sort((a, b) => a - b);
  return new_arr;
};

let result = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
console.log("result:", result);
*/

// if string output is wanted
/**  console.log("result:", result.join(" ")); **/

/*
       S-TASK:
Shunday function yozing, u numberlardan tashkil topgan
array qabul qilsin va osha numberlar orasidagi tushib
qolgan sonni topib uni return qilsin
MASALAN: missingNumber([3, 0, 1]) return 2
 */

/*

const missingNumber = (arr: number[]) => {
  for (let i = 1; i <= arr.length + 1; i++) {
    if (arr.indexOf(i) === -1) return i;
  }
};
const result = missingNumber([3, 0, 1]);
console.log("result:", result);

*/
// 2nd solution
/*
function missingNumber(arr: number[]) {
  const max = Math.max(...arr); // Will find the highest number
  const min = Math.min(...arr); // will find the lowest number
  const missing = [];

  for (let i = min; i <= max; i++) {
    if (!arr.includes(i)) {
      // Checking whether i(current value) present in num(argument)
      missing.push(i); //Adding numbers which are not in num(argument) array
    }
  }
  return missing;
}
*/

/*
R-TASK:

Shunday function yozing, u string parametrga ega bolsin. 
String "1+2" holatda pass qilinganda string ichidagi 
sonlar yigindisini number holatda qaytarsin.
MASALAN: calculate("1+3") return 4;

@MITASK

*/

/* const calculate_string = (str: any) => {
  let new_arr = str.split("").map(Number);
  let num_arr = [];

  for (let i = 0; i < new_arr.length; i++) {
    if (!isNaN(new_arr[i])) {
      num_arr.push(new_arr[i]);
    }
  }

  return num_arr.reduce((a: any, b: any) => a + b);
};

const result = calculate_string("1+2+3");
console.log("result:", result);
*/
// Q-TASK:

/* Shunday function yozing, u 2 ta parametrgga ega bolib
 birinchisi object, ikkinchisi string. Agar string parametr
 objectni propertysi bolsa true bolmasa false qaytarsin.
 MASALAN: hasProperty({name: "BMW", model: "M3"}, "model")
 return true; hasProperty({name: "BMW", model: "M3"}, "year") return false
*/

/* const hasProperty = (obj: any, str: any) => {
  let new_arr = [];
  let new_arr1 = [];
  for (const key of Object.keys(obj)) {
    if (key === str) {
      new_arr.push(key);
    } else {
      new_arr1.push(key);
    }
  }
  return new_arr.length === 0 ? false : true;
};
const result = hasProperty({ name: "BMW", model: "M3" }, "model");
console.log("result:", result);
*/

/*
P - TASK:

Shunday function yozing, u object qabul
 qilsin va arrayni object arrayga otkazib arrayni qaytarsin qaytarsin.
MASALAN: objectToArray( {a: 10, b: 20}) return [['a', 10], ['b', 20]]

@MITASK
*/

// Solution 1
/* function objectToArray(val: any) {
  const result = [];
  for (let key in val) {
    if (val.hasOwnProperty(key)) {
      result.push([key, val[key]]);
    }
  }
  return result;
}
// solution 2 shortest
/*  function objectToArray(obj: {}) {
  return Object.entries(obj);
}


const obj = { a: 10, b: 20 };
const result = objectToArray(obj);
console.log("result:", result); */

/**O-TASK:

Shunday function yozing, u har xil valuelardan iborat array
 qabul qilsin va array ichidagi sonlar yigindisini hisoblab 
 chiqqan javobni qaytarsin.
MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45

@MITASK */

/* function calculateSumOfNumbers(arr: any) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    if (typeof arr[i] === "number") sum += arr[i];
  }

  return sum;
}
const result = calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]);
console.log("result:", result);
*/

/**N-TASK: 

Shunday function yozing, u string qabul qilsin
 va string palindrom yani togri oqilganda ham, 
 orqasidan oqilganda ham bir hil oqiladigan 
 soz ekanligini aniqlab boolean qiymat qaytarsin.
MASALAN: palindromCheck("dad") return true;  palindromCheck("son") return false;

@MITASK
 * 
 */

/* function palindromCheck(str: string) {
  // find the length of a string
  const len = str.length;

  // looping through half of the string
  for (let i = 0; i < len / 2; i++) {
    // a logic to check if the first and last string are same
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
    return true;
  }
}
const result = palindromCheck("dad");
console.log(result);
*/
/* M-TASK
Shunday function yozing, 
u raqamlardan tashkil topgan array 
qabul qilsin va array ichidagi har bir raqam
 uchun raqamni ozi va hamda osha raqamni kvadratidan 
 tashkil topgan object hosil qilib, hosil bolgan 
 objectlarni array ichida qaytarsin.
MASALAN: getSquareNumbers([1, 2, 3]) return 
[{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}];
@MITASK

*/

/*
const getSquareNumbers = (ele: any[]) => {
  let result_store = [];

  for (let i = 0; i < ele.length; i++) {
    result_store.push({ number: ele[i], square: ele[i] * ele[i] });
  }
  return result_store;
};
const result = getSquareNumbers([1, 2, 3]);
console.log(result);*/

/* L-TASK: 

Shunday function yozing, u string qabul qilsin va 
string ichidagi hamma sozlarni chappasiga yozib 
va sozlar ketma-ketligini buzmasdan stringni qaytarsin.
MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc";
*/

/*
function reverseSentence(str: string) {
  const split_str = str.split(" ");
  let reversed_str = [];

  for (const word of split_str) {
    reversed_str.push(word.split("").reverse().join(""));
  }

  return reversed_str.join(" ");
}
const result = reverseSentence("we like coding!");
console.log(result); 
*/

/** K-TASK: 

Shunday function yozing, u string qabul qilsin 
va string ichidagi unli harflar sonini qaytarsin.
MASALAN: countVowels("string") return 1;
*/

/*
// defining a function to count the vowels in a string
const countVowel = (str: string) => {
  // find the count of vowels
  const matches = str.match(/[aeiou]/gi);

  // Ternary operator to handle the case when matches is null
  const count: number = matches ? matches.length : 0;
  // return number of vowels
  return count;
};
const result = countVowel("string");
console.log("result:", result); 
* /

/* J-TASK: 

Shunday function yozing, 
u string qabul qilsin va string ichidagi eng uzun sozni qaytarsin.
MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan"

@MITASK
*/

/* function findLongestWord(str: any) {
  // Split the string into array
  let strSplit = str.split(" ");

  // Return the first sorted item of the Array
  return strSplit.sort((a: any, b: any) => b.length - a.length)[0];
}
const result = findLongestWord("I come from Uzbekistan");
console.log("result:", result); */

/* I-TASK: 

Shunday function tuzing, unga string argument pass bolsin. 
Function ushbu agrumentdagi digitlarni yangi stringda return qilsin
MASALAN: getDigits("m14i1t") return qiladi "141"

@MITASK */

/* function getDigits(str: string) {
  let num_str = str.replace(/[^0-9]/g, "");
  return parseInt(num_str);
}

const result = getDigits("m14i1t");
console.log(result); */

/**
 * Project Standards:
 * - Logging standards
 * - Naming standards
 *    function, method, variable => CAMEL case  goHome/getLogin
 *    class => Pascal case                      MemberService
 *    folder, file => KEBAB case
 *    css Class => SNAKE case                   button_style
 * - Error handling
 *
 */

/** Cookie ni hislatlari
 * 1)
 * **/

/** Kop ishlatiladigon APIs
 *  Traditional API
 * Rest API
 * GraphQL API
 * **/

/* H-TASK: 

shunday function tuzing, u integerlardan iborat 
arrayni argument sifatida qabul qilib, 
faqat positive qiymatlarni olib string holatda return qilsin
MASALAN: getPositive([1, -4, 2]) return qiladi "12"

@MITASK */
/*
function getPositive(arr: number[]) {
  return arr.reduce((result: string, num: number) => {
    if (num > 0) {
      result += num.toString();
    }
    return result;
  }, "");
}
const result = getPositive([1, -4, 2]);
console.log(result); */

/*TASK: 

Shunday function tuzing, u string qabul qilib teskari qilib return qilsin
MASALAN: gerReverse("hello") return qiladi "olleh"

@MITASK
*/
/*
function string_reverse(str: string) {
  // empty string
  let new_str = "";
  for (let i = str.length - 1; i >= 0; i--) {
    new_str += str[i];
  }
  return new_str;
}
const result = string_reverse("hello");
console.log("result:", result);
*/
/*G-TASK: 

Shunday function tuzingki unga integerlardan iborat
 array pass bolsin va function bizga osha arrayning 
 eng katta qiymatiga tegishli birinchi indexni qaytarsin.
MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini.

@MITASK
*/
// type: array[]

// function getHighestIndex(arr: number[]): number {
//   let greatest: number | undefined;
//   let greatestIndex: number | undefined;
//   for (let i = 0; i < arr.length; i++) {
//     if (!greatest || arr[i] > greatest) {
//       greatest = arr[i];
//       greatestIndex = i;
//     }
//   }
//   return greatestIndex!;
// }

// const result: number = getHighestIndex([5, 21, 12, 21, 8]);
// console.log("result:", result);
