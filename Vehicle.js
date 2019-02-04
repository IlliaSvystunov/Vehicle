"use strict";

/**
 * Class representing a vehicle.
 * Common vehicle has name, volume, weight, carrying volume, carrying weight.
 */
class Vehicle {

    /**
     * Creates new vehicle with specified:
     * @param name.
     * @param weight.
     * @param volume.
     * @param carryingVolume. It is a max volume value that vehicle can carry.
     * @param carryingWeight. It is a max weight value that vehicle can carry.
     * Weight and carryingWeight scale in tons.
     * Volume and carryingVolume scale in cubic meters.
     * All numeric parameters must be positive.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {

        //Checking arguments.
        if (weight <= 0) {
            throw "Weigh parameter must be positive";
        }
        if (volume <= 0) {
            throw "Volume parameter must be positive";
        }
        if (carryingWeight <= 0) {
            throw "Carrying weight parameter must be positive";
        }
        if (carryingVolume <= 0) {
            throw "Carrying volume parameter must be positive";
        }

        this.name = "" + name;
        this.weight = +weight;
        this.volume = +volume;
        this.carryingWeight = +carryingWeight;
        this.carryingVolume = +carryingVolume;
    }

    /**
     * Returns true if this vehicle can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(this.isWeightMatches(vehicle) && this.isVolumeMatches(vehicle));
    }

    isWeightMatches(vehicle) {
        return vehicle.weight <= this.carryingWeight;
    }

    isVolumeMatches(vehicle) {
        return vehicle.volume <= this.carryingVolume;
    }
}

/**
 * Non-mechanical vehicle with 2 wheels and use pedaling as driving force.
 * Carries things only in baskets.
 */
class Bicycle extends Vehicle {

    /**
     * Creates new vehicle with with specified:
     * @param name
     * @param weight
     * @param volume
     * @param carryingWeight
     * @param carryingVolume
     * @param amountOfBaskets
     * Default amount of baskets is 1.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume, amountOfBaskets = 1) {

        super(name, weight, volume, carryingWeight, carryingVolume);
        this.amountOfBascets = amountOfBaskets;
    }

    /**
     * Returns true if this bicycle can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(this.isWeightMatches(vehicle)
            && vehicle.volume <= this.carryingVolume/this.amountOfBascets);
    }
}

/**
 * Mechanical vehicle that carries things in baggage container.
 */
class Car extends Vehicle {

    /**
     * Creates new vehicle with with specified:
     * @param name
     * @param weight
     * @param volume
     * @param carryingWeight
     * @param carryingVolume
     * @param baggageContainerVolume
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume, baggageContainerVolume) {

        super(name, weight, volume, carryingWeight, carryingVolume);

        if (baggageContainerVolume >= carryingVolume) {
            throw "Baggage container volume must be less than total carrying volume.";
        }

        this.baggageContainerVolume = baggageContainerVolume;
    }

    /**
     * Returns true if this bicycle can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(super.isWeightMatches(vehicle)
            && vehicle.volume <= this.baggageContainerVolume);
    }
}