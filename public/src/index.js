const agents = document.getElementById('agents');
const messages = document.getElementById('messages');
const stepButton = document.getElementById('step');
const generateButton = document.getElementById('gen_user');

stepButton.addEventListener('click', () => {
	fetch('http://localhost:3000/step')
		.then(res => res.json())
		.then(data => {
			agents.innerText = '';
			messages.innerText = '';
			data.agents.forEach(agent => {
				const elem = document.createElement('div');
				elem.innerText = agent;
				agents.appendChild(elem);
			});
			data.messages.forEach(msg => {
				const elem = document.createElement('div');
				elem.innerText = msg;
				messages.appendChild(elem);
			});
		});
});

generateButton.addEventListener('click', () => {
	fetch('http://localhost:3000/generate').then(res => {}, err => {});
});
