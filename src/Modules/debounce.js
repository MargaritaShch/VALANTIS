function debounce(func, timeout){
    let timerId;
    return function(...args){
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            func.apply(this,args)
        },timeout)
    } 
}

export default debounce