const emotions = require('./emotions.js');
const bb = require('./bb.js');
const Agent = require('./agent.js');
const express = require('express');
const app = express();
const port = 3000;

const agents = [];

let id = 0;
function gen_agent() {
	// add random mood init and tables init
	const reaction_table = {
		cry: 'happy',
		work: 'bored',
		complain: 'angry',
		rage: 'busy',
		punch: 'bored',
	};
	const action_array = ['cry', 'work', 'complain', 'rage', 'punch'];
	agents.push(new Agent(id, reaction_table, action_array));
	id += 1;
}


function generation(step) {
	const actions = agents.map((agent) => agent.gen_action(agents));
	bb.add_block(step, actions);
}


function reaction(step) {
	const messages = bb.get_block(step);
	messages.forEach((message) => {
		const emotion = emotions[message.emotion];
		if (message.receiver === "all") {
			agents.forEach(agent => agent.react(emotion));
			return;
		}
		message.receiver.react(emotion);
	});
}


app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/public/index.html`);
});

let step_num = 0;
app.get('/step', (req, res) => {
	generation(step_num);
	reaction(step_num);
	const retval = {
		agents: agents.map((agent) => agent.toString()),
		messages: bb.get_block(step_num).map((action) => `${action.emotion} to ${action.receiver === "all" ? "all" : action.receiver.id}`)
	};
	step_num += 1;
	res.send(JSON.stringify(retval));
});

app.get('/generate', (req, res) => {
	gen_agent();
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`)
});
