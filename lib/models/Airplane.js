const pool = require('../utils/pool');

module.exports = class Airplane {
    id;
    manufacturer;
    model;
    engines;

    constructor(row) {
        this.id = String(row.id);
        this.manufacturer = row.manufacturer;
        this.model = row.model
        this.engines = rows.engines;
    }

    static async insert({ manufacturer, model, engines }) {
        const { rows } = await pool.query(
            'INSERT INTO airplanes (manufacturer, model, engines) VALUES ($1, $2, $3) RETURNING *',
            [manufacturer, model, engines]
        );
        return new Airplane(rows[0]);
    }
    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM airplanes',
        );
        return rows.map(row => new Airplane(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM airplanes WHERE id=$1',
            [id]
        );
        return new Airplane(rows[0]);
    }

    static async update({ manufacturer, model, engines }, id) {
        const { rows } = await pool.query(
            `UPDATE airplanes
                SET manufacturer=$1,
                    model=$2,
                    engines=$3
                WHERE id=$4
                RETURNING *`,
            [manufacturer, model, engines, id]
        );
        return new Airplane(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM airplanes WHERE id=$1',
            [id]
        );
        return new Airplane(rows[0]);
    }
}
