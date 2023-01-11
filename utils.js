
function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

function debounce(func, timeout = 100){
    let timer;
    return (...args) => {
   
        clearTimeout(timer); 
        timer = setTimeout(() => { 
            func.apply(args); 
        }, timeout);
       
    };
}

export {
    lerp,
    debounce
}
