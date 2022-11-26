const EventEmitter = require ('events')
class MyEmitter extends EventEmitter {};
const timeEmitter = new MyEmitter();

let input = process.argv[2]
let arr = input.split('-')

class Handler {
	static hour (payload){
		hourMessage = "Hour's are over";
	}
	static day (payload){
		dayMessage = "Day's are over";
	}
	static month (payload){
		monthMessage = "Month's are over"
	}
	static year (payload){
		yearMessage = "Year's are over"
	}
}

timeEmitter.once('hoursOver', Handler.hour);
timeEmitter.once('daysOver', Handler.day);
timeEmitter.once('monthsOver', Handler.month);
timeEmitter.once('yearsOver', Handler.year);

let hourCounter = arr[0];
let hourMessage = `часов: ${hourCounter}`;
let hourIncrement = setInterval(() => {
	if (dayCounter === 0) {
		timeEmitter.emit('hoursOver');
		clearInterval(hourIncrement);
		return
	}
	hourMessage = `часов: ${hourCounter}`;
	hourCounter = hourCounter - 1;
}, 1000);

let dayCounter = arr[1];
let dayMessage = `дней: ${dayCounter}`;
let dayIncrement = setInterval(() => {
		if (dayCounter === 0) {
			timeEmitter.emit('daysOver');
			clearInterval(dayIncrement);
			return
		}
	dayMessage = `дней: ${dayCounter}`;
	dayCounter = dayCounter - 1;
}, 2000);

let monthCounter = arr[2];
let monthMessage = `месяцев: ${monthCounter}`;
let monthIncrement = setInterval(() => {
	if (monthCounter === 0) {
		timeEmitter.emit('monthsOver');
		clearInterval(monthIncrement);
		return
	}
	monthMessage = `месяцев: ${monthCounter}`;
	monthCounter = monthCounter - 1;
}, 4000);

let yearCounter = arr[3];
let yearMessage = `месяцев: ${yearCounter}`;
let yearIncrement = setInterval(() => {
	if (yearCounter === 0) {
		timeEmitter.emit('yearsOver');
		clearInterval(yearIncrement);
		return
	}
	yearMessage = `лет: ${yearCounter}`;
	yearCounter = yearCounter - 1;
}, 8000);

console.log('Hi!')
console.log(`Для наглядности становлены длительности:
1 час = 1 секунда
1 день = 2 секунды
1 месяц = 4 секуныды
1 год = 8 секунд`)

setInterval(() => {
		console.log(`Осталось
		${hourMessage}
		${dayMessage}		
		${monthMessage}	
		${yearMessage}`)
}, 1000)