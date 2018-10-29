var s = document.getElementsByClassName('countdownspan');
var oneDay = 24 * 60 * 60 * 1000;
var firstDate = new Date("16:45 1 november 2018 GMT+5:30");var secondDate = new Date();
var days = (firstDate.getTime() - secondDate.getTime()) / (oneDay);
var hrs = (days - Math.floor(days)) * 24;
var min = (hrs - Math.floor(hrs)) * 60;
s[0].innerHTML = Math.floor(days);
s[1].innerHTML = Math.floor(hrs);
s[2].innerHTML = Math.floor(min);
s[3].innerHTML = Math.floor((min - Math.floor(min)) * 60);
var i = setInterval(function() {n()}, 1000)
function f(d, x) {s[d].innerHTML = x;s[d - 1].innerHTML = Number(s[d - 1].innerHTML) - 1;}
function n() {s[3].innerHTML = Number(s[3].innerHTML) - 1;
if (s[3].innerHTML == -1) {f(3, 59)
if (s[2].innerHTML == -1) {f(2, 59)
if (s[1].innerHTML == -1) {f(1, 23)
}}}if(s[0].innerHTML <= -1) {clearInterval(i);document.getElementsByClassName('countdowndiv')[0].innerHTML='<h2>The event is over.</h2>'}}