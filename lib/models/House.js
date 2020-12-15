const pool = require('../utils/pool');

module.exports = class House {
    id;
    bedrooms;
    bathrooms;

    constructor(row) {
        this.id = String(row.id);
        this.bedrooms = row.bedrooms;
        this.bathrooms = row.bathrooms
    }

    static async insert({ bedrooms, bathrooms }) {
        const { rows } = await pool.query(
            'INSERT INTO houses (bedrooms, bathrooms) VALUES ($1, $2) RETURNING *',
            [bedrooms, bathrooms]
        );
        return new House(rows[0]);
    }
    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM houses',
        );
        return rows.map(row => new House(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM houses WHERE id=$1',
            [id]
        );
        return new House(rows[0]);
    }

    static async update({ bedrooms, bathrooms}, id) {
        const { rows } = await pool.query(
            `UPDATE houses
                SET bedrooms=$1,
                    bathrooms=$2
                WHERE id=$3
                RETURNING *`,
            [bedrooms, bathrooms, id]
        );
        return new House(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM houses WHERE id=$1',
            [id]
        );
        return new House(rows[0]);
    }
}
