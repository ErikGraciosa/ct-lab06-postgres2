const pool = require('../utils/pool');

module.exports = class Beer {
    id;
    brewery;
    beername;

    constructor(row) {
        this.id = String(row.id);
        this.brewery = row.brewery;
        this.beername = row.beername
    }

    static async insert({ brewery, beername }) {
        const { rows } = await pool.query(
            'INSERT INTO beers (brewery, beername) VALUES ($1, $2) RETURNING *',
            [brewery, beername]
        );
        return new Beer(rows[0]);
    }
    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM beers',
        );
        return rows.map(row => new Beer(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM beers WHERE id=$1',
            [id]
        );
        return new Beer(rows[0]);
    }
}
