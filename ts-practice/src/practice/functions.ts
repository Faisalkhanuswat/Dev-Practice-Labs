export const sum = (num1: number, num2: number): number => {
    return num1 + num2;
}

export const showSum = (res: number): void => {
    console.log("The Sum of number is", res)
}


// callbacks
export const multiple = (num: number, limit: number, cb: (num: number, count: number, result: number) => void): void => {
    for (let i = 1; i <= limit; i++) {
        cb(num, i, num * i);
    }
}


export const factorial = (num: number, cb: (result: number, num: number) => void) => {
    let total = 1;
    for (let i = num; i > 0; i--) {
        total *= i;
    }
    return cb(total, num)
}

export const fibonacci = (start: number, end: number, print: (sequence: number[]) => void) => {
    let seq = [0, 1];
    for (let i = 2; i <= end; i++) {
        const el = seq[i - 1] + seq[i - 2]
        if (el > end) {
            break;
        }
        seq.push(el);
    }
    seq = seq.filter(e => e > start);
    print(seq)
}

