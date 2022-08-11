function add(a, b) {

}

const v = function(a, b) {

}

let add1 = (a, b) => { return a + b };
let add2 = a => a * 5;

function f1(passedFuntion) {
    let a = 5;
    return passedFuntion(5);
}

let out = f1((a) => a * 5);