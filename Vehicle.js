"use strict";

/**
 * Class representing a vehicle.
 * Common vehicle has name, volume, weight, carrying, volume, carrying weight.
 */
class Vehicle {

    /**
     * Creates new vehicle with specified name, volume, weight, carrying, volume, carrying weight.
     * @param name
     * @param weight
     * @param volume
     * @param carryingVolume
     * @param carryingWeight
     */
    constructor(name, weight, volume, carryingVolume, carryingWeight) {

        this.name = name;
        this.weight = weight;
        this.volume = volume;
        this.carryingVolume = carryingVolume;
        this.carryingWeight = carryingWeight;
    }

    /**
     * Returns true if this vehicle can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.volume <= this.carryingVolume && vehicle.weight <= this.carryingWeight);
    }
}