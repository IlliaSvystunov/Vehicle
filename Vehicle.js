"use strict";

/**
 * Physical quantity that indicates the amount of occupied space.
 * It is determined by three quantities: length, width, height.
 */
class Volume {

    constructor(length, width, height) {

        this.length = length;
        this.width = width;
        this.height = height;
    }

    canPut(volume) {

        return !!(this.length < volume.length
        && this.width < volume.width
        && this.height < volume.height)
    }

    calculateValue() {
        return +(this.length * this.width * this.height);
    }
}

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
        return this.volume.canPut(vehicle.volume);
    }
}

/**
 * Non-mechanical vehicle with 2 wheels and use pedaling as driving force.
 * Carries things only in baskets.
 * Cannot carry another vehicle.
 */
class Bicycle extends Vehicle {

    /**
     * Creates new bicycle with with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     * @param name
     * @param weight
     * @param volume
     * @param carryingWeight
     * @param carryingVolume
     * Default amount of baskets is 1.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {

        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns true if this bicycle can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return false;
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
            && this.baggageContainerVolume.canPut(vehicle.volume));
    }
}

/**
 * Mechanical vehicle for cargo transportation.
 * It carries things in trailers.
 */
class AutoTrain extends Car {

    /**
     * Creates new auto train with with specified:
     * name, weight, volume, maxTrailerWeight, maxTrailerVolume.
     * @param name
     * @param weight
     * @param volume
     * @param maxTrailerWeight
     * @param maxTrailerVolume
     */
    constructor(name, weight, volume, maxTrailerWeight, maxTrailerVolume) {

        super(name, weight, volume, maxTrailerWeight, maxTrailerVolume, 0);
    }

    /**
     * Returns true if this auto train can carry other specified vehicle, else returns false.
     * @param vehicle
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.weight <= this.carryingWeight
        && this.carryingVolume.canPut(vehicle.volume));
    }
}

/**
 * Vehicle that moves on water surface.
 */
class Ship extends Vehicle {

    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    canCarry(vehicle) {
        return super.canCarry(vehicle) && vehicle.volume.length < this.volume.length;
    }
}

/**
 * Ship that is usually used for fishing.
 * Not intended for transportation vehicles.
 */
class FishBoat extends Ship {

    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    canCarry(vehicle) {
        return false;
    }
}

/**
 * Ship for cargo transportation.
 * Cargo is usually placed into containers.
 */
class SuperTanker extends Ship {

    constructor(name, weight, volume, carryingWeight, carryingVolume, length, containerVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume, length);
        this.containerVolume = containerVolume;
    }

    canCarry(vehicle) {
        return !!(super.canCarry(vehicle) && this.containerVolume.canPut(vehicle.volume));
    }
}

/**
 * Very powerful military ship for transporting military vehicles.
 * Can carry very large, wide and heavy things.
 * All free space on board is used for carrying vehicles.
 */
class AircraftCarrier extends Ship {

    constructor(name, weight, volume, carryingWeight, carryingVolume, length, width) {
        super(name, weight, volume, carryingWeight, carryingVolume, length);
        this.width = width;
    }

    canCarry(vehicle) {
        return !!(vehicle.volume.length < this.volume.length/4
        && vehicle.volume.width < this.volume.width/4
        && vehicle.weight < this.weight/10);
    }
}