
var L = [];

for (var i=0, t = 499; i<500; i++) {
    L.push(Math.round(Math.random() * t))
}

console.log(JSON.stringify(L))