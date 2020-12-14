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
        console.log(rows[0])
        return new Beer(rows[0]);
    }

}