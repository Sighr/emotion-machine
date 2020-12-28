class BB {
	constructor() {
		this._blocks = {};
		this._keys = [];
	}

	add_block(key, value) {
		if (this._blocks[key])
			return;
		this._blocks[key] = value;
		this._keys.push(key);
	}

	delete_block(key, value) {
		this._blocks[key] = undefined;
		this._keys.filter((k) => k!==key);
	}

	get keys() {
		return this._keys;
	}

	get_block(key) {
		return this._blocks[key];
	}
}

// singleton?
module.exports = new BB();
