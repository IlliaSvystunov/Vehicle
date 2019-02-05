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
 * Vehicle for transporting people or charge.
 *
 * Common vehicle has name, volume, weight, carrying volume, carrying weight.
 *
 * @author Illia Svystunov.
 */
class Vehicle {

    /**
     * Creates new vehicle with specified:
     * name, weight, volume, carrying volume, carrying weight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     *
     * Weight and carryingWeight scale in tons.
     * Volume and carryingVolume scale in cubic meters and characterized by.
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
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.weight <= this.carryingWeight
            && this.volume.canPut(vehicle.volume));
    }
}

/**
 * Non-mechanical vehicle with 2 wheels and use pedaling as driving force.
 *
 * Carries things only in baskets.
 * Cannot carry another vehicle.
 *
 * @author Illia Svystunov.
 */
class Bicycle extends Vehicle {

    /**
     * Creates new bicycle with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns true if this bicycle can carry other specified vehicle, otherwise returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return false;
    }
}

/**
 * Mechanical vehicle for individual or family using that rides on the road.
 *
 * Can carry other vehicles on top if they aren't very large.
 *
 * @author Illia Svystunov.
 */
class Car extends Vehicle {

    /**
     * Creates new car with with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns true if this car can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.volume.width < this.volume.width
        && vehicle.volume.length < this.volume.length
        && vehicle.weight < this.carryingWeight);
    }
}

/**
 * Racing car.
 *
 * Doesn't baggage storage for accelerating to maximum speed.
 * Doesn't created for carrying cargo.
 *
 * @author Illia Svystunov.
 */
class Bolid extends Car {

    /**
     * Creates new bolid with with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns true if this bolid can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return false;
    }
}

/**
 * Mechanical vehicle for cargo transportation.
 *
 * It carries things in trailers.
 *
 * @author Illia Svystunov.
 */
class Wagon extends Car {

    /**
     * Creates new wagon with with specified:
     * name, weight, volume, maxTrailerWeight, maxTrailerVolume.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} maxTrailerVolume. It is a max volume value that vehicle can carry.
     * @param {number} maxTrailerWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, maxTrailerWeight, maxTrailerVolume) {

        super(name, weight, volume, maxTrailerWeight, maxTrailerVolume);
    }

    /**
     * Returns true if this wagon can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.weight <= this.carryingWeight
        && this.carryingVolume.canPut(vehicle.volume));
    }
}

/**
 * Vehicle that moves on water surface.
 *
 * Width of cargo cannot be greater than ship width, otherwise it will go under the water.
 *
 * @author Illia Svystunov.
 */
class Ship extends Vehicle {

    /**
     * Creates new ship with with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns true if this ship can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return super.canCarry(vehicle)
            && vehicle.volume.width < this.volume.width;
    }
}

/**
 * Ship that is usually used for fishing.
 *
 * Not intended for transportation vehicles.
 *
 * @author Illia Svystunov.
 */
class FishBoat extends Ship {

    /**
     * Creates new fish boat with with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns true if this fish boat can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return false;
    }
}

/**
 * Large ship for cargo transportation.
 *
 * Cargo is usually placed into containers.
 *
 * @author Illia Svystunov.
 */
class SuperTanker extends Ship {

    /**
     * Creates new super tanker with with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     * @param {volume} containerVolume It is a max volume value that container can contain.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume, containerVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
        this.containerVolume = containerVolume;
    }

    /**
     * Returns true if this super tanker can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(super.canCarry(vehicle) && this.containerVolume.canPut(vehicle.volume));
    }
}

/**
 * Very powerful military ship for transporting military vehicles.
 *
 * Can carry very large, wide and heavy things.
 * All free space on board is used for carrying vehicles.
 * Also can contain vehicles inside.
 *
 * @author Illia Svystunov.
 */
class AircraftCarrier extends Ship {

    /**
     * Creates new aircraft carrier with with specified:
     * name, weight, volume, carryingVolume, carryingWeight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns true if this aircraft carrier can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.volume.length < this.volume.length/3
        && vehicle.volume.width < this.volume.width/3
        && vehicle.weight < this.weight/5
        || this.carryingVolume.canPut(vehicle.volume)
        && vehicle.weight < this.weight/5);
    }
}

/**
 * Fast rail vehicle that used for long distant transporting.
 *
 * Usually transports people, coal, oil, mail and so on in wagons.
 * Cargo cannot be wider than wagon.
 *
 * @author Illia Svystunov.
 */
class Train extends Vehicle {

    /**
     * Creates new train with with specified:
     * name, weight, volume, maxWagonVolume, maxWagonWeight and amount of wagons.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} maxWagonVolume. It is a max volume value that vehicle can carry.
     * @param {number} maxWagonWeight. It is a max weight value that vehicle can carry.
     * @param {number} amountOfWagons
     */
    constructor(name, weight, volume, maxWagonWeight, maxWagonVolume, amountOfWagons) {

        super(name, weight, volume, maxWagonWeight*amountOfWagons,
            maxWagonVolume.calculateValue()*amountOfWagons);

        this.maxWagonVolume = maxWagonVolume;
        this.maxWagonWeight = maxWagonWeight;
        this.amountOfWagons = amountOfWagons;
    }

    /**
     * Returns true if this train can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {

        return !!(this.maxWagonVolume.canPut(vehicle.volume)
        && vehicle.weight < this.maxWagonWeight
        && vehicle.volume.width < this.maxWagonVolume.width);
    }
}

/**
 * Train for people transporting. Also known as electric train.
 *
 * Except people can transport bags or carts.
 * Also can transport small vehicles as bicycles or scooters.
 *
 * @author Illia Svystunov.
 */
class PassengerTrain extends Train {

    /**
     * Creates new passenger train with with specified:
     * name, weight, volume, maxWagonVolume, maxWagonWeight and amount of wagons.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {volume} volume.
     * @param {volume} maxWagonVolume. It is a max volume value that vehicle can carry.
     * @param {number} maxWagonWeight. It is a max weight value that vehicle can carry.
     * @param {number} amountOfWagons
     */
    constructor(name, weight, volume, maxWagonWeight, maxWagonVolume, amountOfWagons) {
        super(name, weight, volume, maxWagonWeight, maxWagonVolume, amountOfWagons);
    }

    /**
     * Returns true if this passenger train can carry other specified vehicle, else returns false.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.volume.width < this.volume.width/5
        && vehicle.volume.length < this.volume.length/5
        && vehicle.volume.height < this.volume.height/3
        && vehicle.weight < this.maxWagonWeight/25);
    }
}

/**
 * "Time And Relative Dimension In Space". Time machine and spacecraft.
 *
 * Invention of race of time masters from since fiction "Doctor who".
 * Looks as usual police telephone box, but endless inside.
 * Tt can carry any material cargo.
 * For more information see {@link https://en.wikipedia.org/wiki/TARDIS}.
 *
 * @author Illia Svystunov.
 */
class Tardis extends Vehicle {

    /**
     * Creates new tardis.
     */
    constructor() {
        super("Tardis", 0, null, NaN, null);
    }

    /**
     * Returns true if this train can carry other specified vehicle, else returns false.
     *
     * Tardis always can carry any other vehicle, so it always returns true.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return true;
    }
}