const secondsContainer = document.querySelector('#seconds');
const minutesContainer = document.querySelector('#minutes');
const hoursContainer = document.querySelector('#hours');
const daysContainer = document.querySelector('#days');
const nextYearContainer = document.querySelector('#year');
const spinnerLoading = document.querySelector('#loading');
const countdownContainer = document.querySelector('#countdown');

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`January 01 ${nextYear} 00:00:00`);

nextYearContainer.textContent = nextYear;

// valida unidade de tempo sem a necessidade de repetir o if ternario para cada container 
const getTimeUnit = unit => unit < 10 ? '0' + unit : unit;

// insere as unidades de tempo nos respectivos elementos da tela
const insertCountdownValues = ({ days, hours, minutes, seconds }) => {
	daysContainer.textContent = getTimeUnit(days);
	hoursContainer.textContent = getTimeUnit(hours);
	minutesContainer.textContent = getTimeUnit(minutes);
	secondsContainer.textContent = getTimeUnit(seconds);
}

// captura os de uma data e atualiza os valores
const updateCountdown = () => {
	const currentTime = new Date();
	const difference = newYearTime - currentTime;
	const days = Math.floor(difference / 1000 / 60 / 60 / 24);
	// para considerar o tempo do dia atual que já passaram(horas, minutos, segundos) utilizar o operador %
	const hours = Math.floor(difference / 1000 / 60 / 60) % 24; 
	const minutes = Math.floor(difference / 1000 / 60) % 60; 
	const seconds = Math.floor(difference / 1000) % 60; 

	insertCountdownValues({ days, hours, minutes, seconds });	
}

// remove a img de loading inicial, troca o elemento do css para flex, isso é feito para 
// quando entrar na tela os campos de tempo que estao como 00 00 00 00 nao aparecam
const handleCountdownDisplay = () => {
	spinnerLoading.remove(); 
	countdownContainer.style.display = 'flex';
}

// apos 1 segundo, executa a funcao dando tempo de carregar o js com os valores de data e tempo
setTimeout(handleCountdownDisplay, 1000);

// método que invoca uma funcao repetidamente que vai ocorrer num intervalo de tempo que for especificado
setInterval(updateCountdown, 1000);

