/* 
 In node js event loop, First the event loop check for fns like setTimeout(), setInterval(), and these codes are run.
Then fns that asynchronously reads/writes file are executed. after that
setImmediate callbacks are run
If close callbacks are pending, then the event loop runs again. otherwise it just exits.
  */
const fs = require("fs");
process.env.UV_THREADPOOL_SIZE = 10; // increasing the number of threads from default 4 to 10 (max 128)
/*
setTimeout(() => {
  console.log("TImer");
}, 0);
setImmediate(() => console.log("from immediate function 1"));
console.log("hello from top level code");
*/


//expected output -  hello from top level code and then timer should be printed followed  by from immediate function 1 .

// what if we remove the console.log here? then the output should be, just the timer and from immediate function 1 but in 
// actuality the output is from immediate functon 1 followed by the timer, this is wrong as per our understanding of event loop

setTimeout(() => {
  console.log("Timer");
}, 0);
setImmediate(() => console.log("from immediate function 1"));
// there is a reason of this, if the script that we wrote is not within the main thread, like this, 
// then the output is non deterministic,as it is bound by the performance of the process - nodejs official explaination 
fs.readFile("a.txt", 'utf-8', () => {
  console.log("file reading");
  setTimeout(() => { console.log("timer 2") }, 0);
  setTimeout(() => { console.log("timer 3") }, 2 * 1000);
  setImmediate(() => { console.log("immediate inside file read") });
})
console.log("hello world");
