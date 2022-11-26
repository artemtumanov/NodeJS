import colors from 'colors';

let [ num1, num2 ] = process.argv.slice(2);

function isSimple(n) {
    for(let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

num1 = +num1; num2 = +num2;
let arr = [];

while(num1 <= num2) {
    if(isSimple(num1)) {
        arr.push(num1)
    }
    num1++;
}

if (isNaN(num1/num2)) {
    console.log('Ошибка! Переданные аргументы не являются числом')
} else {
    if (arr.length == 0) {
        console.log(colors.red('Простых чисел в диапазоне нет'))
    } else {
        if (arr.length % 3 === 0) {
            for (let i = 0; i < arr.length; i = i + 3) {
                console.log(colors.green(arr[i]));
                console.log(colors.yellow(arr[i+1]));
                console.log(colors.red(arr[i+2]));
            }
        } else if (arr.length % 3 === 2) {
            arr.push('')
            for (let i = 0; i < arr.length; i = i + 3) {
                console.log(colors.green(arr[i]));
                console.log(colors.yellow(arr[i+1]));
                console.log(colors.red(arr[i+2]));
            }
        } else {
            arr.push('');
            arr.push('');
            for (let i = 0; i < arr.length; i = i + 3) {
                console.log(colors.green(arr[i]));
                console.log(colors.yellow(arr[i+1]));
                console.log(colors.red(arr[i+2]));
            }
        }
    }
}


