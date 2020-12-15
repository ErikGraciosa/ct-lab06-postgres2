const pool = require('../utils/pool');

module.exports = class Appliance {
    id;
    type;
    voltage;

    constructor(row) {
        this.id = String(row.id);
        this.type = row.type;
        this.voltage = row.voltage
    }

    static async insert({ type, voltage }) {
        const { rows } = await pool.query(
            'INSERT INTO appliances (type, voltage) VALUES ($1, $2) RETURNING *',
            [type, voltage]
        );
        return new Appliance(rows[0]);
    }
    static async getAll() {
        const { rows } = await pool.query(
            'SELECT * FROM appliances',
        );
        return rows.map(row => new Appliance(row));
    }

    static async getById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM appliances WHERE id=$1',
            [id]
        );
        return new Appliance(rows[0]);
    }

    static async update({ type, voltage }, id) {
        const { rows } = await pool.query(
            `UPDATE appliances
                SET type=$1,
                    voltage=$2
                WHERE id=$3
                RETURNING *`,
            [type, voltage, id]
        );
        return new Appliance(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM appliances WHERE id=$1',
            [id]
        );
        return new Appliance(rows[0]);
    }
}
