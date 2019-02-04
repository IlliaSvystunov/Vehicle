"use strict";

/**
 * Class representing a vehicle.
 * Common vehicle has name, volume, weight, carrying volume, carrying weight.
 */
class Vehicle {

    /**
     * Creates new vehicle with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
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

        this._name = name;
        this._weight = weight;
        this._volume = volume;
        this._carryingWeight = carryingWeight;
        this._carryingVolume = carryingVolume;
    }


    get name() {
        return this._name;
    }

    get weight() {
        return this._weight;
    }

    get volume() {
        return this._volume;
    }

    get carryingWeight() {
        return this._carryingWeight;
    }

    get carryingVolume() {
        return this._carryingVolume;
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
     * Creates new bicycle with with specified:
     * name, weight, volume, carryingVolume, carryingWeight, amountOfBaskets.
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
        this._amountOfBaskets = amountOfBaskets;
    }


    get amountOfBaskets() {
        return this._amountOfBaskets;
    }

    /**
     * Returns true if this bicycle can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(this.isWeightMatches(vehicle)
            && vehicle.volume <= this.carryingVolume/this.amountOfBaskets);
    }
}

/**
 * Mechanical vehicle that carries things in baggage container.
 */
class Car extends Vehicle {

    /**
     * Creates new car with with specified:
     * name, weight, volume, carryingVolume, carryingWeight, baggageContainerVolume.
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
        this._baggageContainerVolume = baggageContainerVolume;

    }


    get baggageContainerVolume() {
        return this._baggageContainerVolume;
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

/**
 * Mechanical vehicle for cargo transportation.
 * It carries things in trailers.
 */
class AutoTrain extends Car {

    /**
     * Creates new auto train with with specified:
     * name, weight, volume, amountOfTrailers, maxTrailerWeight, maxTrailerVolume.
     * @param name
     * @param weight
     * @param volume
     * @param amountOfTrailers
     * @param maxTrailerWeight
     * @param maxTrailerVolume
     */
    constructor(name, weight, volume, amountOfTrailers, maxTrailerWeight, maxTrailerVolume) {

        let carryingWeight = amountOfTrailers * maxTrailerWeight;
        let carryingVolume = amountOfTrailers * maxTrailerVolume;

        super(name, weight, volume, carryingWeight, carryingVolume, 0);
        this._amountOfTrailers = amountOfTrailers;
    }


    get amountOfTrailers() {
        return this._amountOfTrailers;
    }

    /**
     * Returns true if this auto train can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.weight <= this.carryingWeight/this.amountOfTrailers
        && vehicle.volume <= this.carryingVolume/this.amountOfTrailers);
    }
}