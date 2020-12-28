class Agent {
	constructor(id, reaction_table, action_array, mood={happy: 0, busy: 0, bored: 0, angry: 0}) {
		this.mood = mood;
		this.reaction_table = reaction_table;
		this.action_array = action_array;
		this._id = id;
	}

	get id() {
		return this._id;
	}

	react(emotion) {
		const mood_to_move = this.reaction_table[emotion.type];
		this.mood[mood_to_move] += emotion.shift * (Math.random() * 2 - 1);
	}

	gen_action(agents) {
		const rand = Math.floor(Math.random() * agents.length);
		let receiver = agents[rand] === this ? 'all' : agents[rand];
		const median = 3 * this.mood.happy - 0.5 * this.mood.busy + this.mood.bored - 2 * this.mood.angry;
		return {
			emotion: this.action_array[Math.abs(Math.round(median)) % this.action_array.length],
			receiver: receiver
		};
	}

	toString() {
		return `${this.id}: happy: ${this.mood.happy}, busy: ${this.mood.busy}, bored: ${this.mood.bored}, angry: ${this.mood.angry}`;
	}
}

module.exports = Agent;
