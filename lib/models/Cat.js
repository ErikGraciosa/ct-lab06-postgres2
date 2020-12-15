const pool = require('../utils/pool');

module.exports = class Cat {
    id;
    name;
    breed;

    constructor(row) {
        this.id = String(row.id);
        this.name = row.name;
        this.breed = row.breed
    }

    static async insert({ name, breed }) {
        const { rows } = await pool.query(
            'INSERT INTO cats (name, breed) VALUES ($1, $2) RETURNING *',
            [name, breed]
        );
        return new Cat(rows[0]);
    }
    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM cats',
        );
        return rows.map(row => new Cat(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM cats WHERE id=$1',
            [id]
        );
        return new Cat(rows[0]);
    }

    static async update({ name, breed }, id) {
        const { rows } = await pool.query(
            `UPDATE cats
                SET name=$1,
                    breed=$2
                WHERE id=$3
                RETURNING *`,
            [name, breed, id]
        );
        return new Cat(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM cats WHERE id=$1',
            [id]
        );
        return new Cat(rows[0]);
    }
}
