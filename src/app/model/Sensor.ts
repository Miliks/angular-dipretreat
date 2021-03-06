export class Sensor {
    public get premises_name() {
        return this._premises_name;
    }
    public set premises_name(value) {
        this._premises_name = value;
    }
    public get sensor_coord() {
        return this._sensor_coord;
    }
    public set sensor_coord(value) {
        this._sensor_coord = value;
    }
    public get sensor_timestamp() {
        return this._sensor_timestamp;
    }
    public set sensor_timestamp(value) {
        this._sensor_timestamp = value;
    }
    public get sensor_data() {
        return this._sensor_data;
    }
    public set sensor_data(value) {
        this._sensor_data = value;
    }
    public get sensor_description() {
        return this._sensor_description;
    }
    public set sensor_description(value) {
        this._sensor_description = value;
    }

    constructor(
        private _sensor_description,
        private _sensor_data,
        private _sensor_timestamp,
        private _sensor_coord,
        private _premises_name) {

    }

    toString() {
        return `${this._premises_name} ${this._sensor_description} ${this._sensor_data}`
    }



}