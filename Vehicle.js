"use strict";

/**
 * A thing used for transporting people or cargo.
 *
 * Includes cars, bicycles, ships, wagons and so on.
 * Common vehicle has name, dimensions, weight, carrying dimensions, carrying weight.
 */
class Vehicle {

    /**
     * Creates new vehicle with specified parameters.
     *
     * @param {string} name Name of vehicle.
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} carryingDimensions It is a max dimensions that fitsFor current vehicle. Measured in cubic meters.
     * @param {number} carryingWeight It is a max weight that fitsFor current vehicle. Measured in tons.
     */
    constructor(name, weight, dimensions, carryingWeight, carryingDimensions) {

        if (weight <= 0) {
            throw "Weigh parameter must be positive";
        }
        if (carryingWeight <= 0) {
            throw "Carrying weight parameter must be positive";
        }

        this._name = name;
        this._weight = weight;
        this._dimensions = dimensions;
        this._carryingWeight = carryingWeight;
        this._carryingDimensions = carryingDimensions;
    }


    get name() {
        return this._name;
    }

    get weight() {
        return this._weight;
    }

    get dimensions() {
        return this._dimensions;
    }

    get carryingWeight() {
        return this._carryingWeight;
    }

    get carryingDimensions() {
        return this._carryingDimensions;
    }

    /**
     * Returns `true` if this vehicle can carry other specified vehicle, otherwise returns `false`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.weight <= this.carryingWeight
            && this.dimensions.fitsFor(vehicle.dimensions));
    }
}

/**
 * Non-mechanical vehicle with 2 wheels and use pedaling as driving force.
 *
 * Carries things only in baskets.
 * Cannot carry another vehicle.
 */
class Bicycle extends Vehicle {

    /**
     * Creates new bicycle.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     */
    constructor(weight, dimensions) {
        super("Bicycle", weight, dimensions, 0.1, new Dimensions(0.2,0.1,0.1));
    }

    /**
     * Returns `false` because bicycle cannot carry any vehicle.
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
 */
class Car extends Vehicle {

    /**
     * Creates new car.
     *
     * @param {string} name Name of car.
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} carryingDimensions It is a max dimensions value that car can carry inside trunk. Measured in cubic meters.
     * @param {number} carryingWeight It is a max weight value that vehicle can carry. Measured in tons.
     */
    constructor(name, weight, dimensions, carryingWeight, carryingDimensions) {
        super(name, weight, dimensions, carryingWeight, carryingDimensions);
    }

    /**
     * Returns `true` if specified vehicle can be placed on top of this car, `false` otherwise.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.dimensions.width < this.dimensions.width
        && vehicle.dimensions.length < this.dimensions.length
        && vehicle.weight < this.carryingWeight);
    }
}

/**
 * Racing car.
 *
 * Doesn't have car trunk.
 * Isn't created for carrying cargo.
 */
class Bolid extends Car {

    /**
     * Creates new bolid.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     */
    constructor(weight, dimensions) {
        super("Bolid", weight, dimensions, 0.2, new Dimensions(0.5,0.5,0.5));
    }

    /**
     * Returns `false` because bolid cannot carry any vehicle.
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
 * It carries things in trailer.
 */
class Wagon extends Car {

    /**
     * Creates new wagon.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} maxTrailerDimensions It is a max dimensions value that wagon can carry. Measured in cubic meters.
     * @param {number} maxTrailerWeight It is a max weight value that wagon can carry. Measured in tons.
     */
    constructor(weight, dimensions, maxTrailerWeight, maxTrailerDimensions) {

        super("Wagon", weight, dimensions, maxTrailerWeight, maxTrailerDimensions);
    }

    /**
     * Returns `true` specified vehicle fitsFor trailer wagon's max dimensions and weight, otherwise returns `false`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {

        return !!(vehicle.weight <= this.carryingWeight
        && this.carryingDimensions.fitsFor(vehicle.dimensions));
    }
}

/**
 * Time machine and spacecraft. Abbreviation from "Time And Relative Dimensions In Space".
 *
 * Invention of Time Masters race from science fiction "Doctor who".
 * Looks as usual police telephone box, but endless inside.
 * It can carry any material cargo.
 *
 * For more information see {@link https://en.wikipedia.org/wiki/TARDIS}.
 */
class Tardis extends Vehicle {

    /**
     * Creates new tardis.
     *
     * Tardis is 10 kg weight and 1.5*1.5*2.5 size.
     */
    constructor() {
        super("Tardis", 0.01, new Dimensions(1.5,1.5,2.5), 1,
            new Dimensions(1.5,1.5,2.5));
    }

    /**
     * Tardis can always carry any other vehicle, so it returns `true`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return true;
    }
}

/**
 * Vehicle that moves on water surface.
 *
 * Width of cargo cannot be greater than ship width, otherwise it will go under the water.
 */
class Ship extends Vehicle {

    /**
     * Creates new ship with with specified parameters.
     *
     * @param {string} name Name of ship.
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} carryingDimensions It is a max dimensions value that ship can carry. Measured in cubic meters.
     * @param {number} carryingWeight It is a max weight value that ship can carry. Measured in tons.
     */
    constructor(name, weight, dimensions, carryingWeight, carryingDimensions) {
        super(name, weight, dimensions, carryingWeight, carryingDimensions);
    }

    /**
     * Returns `true` if this ship can carry other specified vehicle, otherwise returns `false`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return super.canCarry(vehicle)
            && vehicle.dimensions.width < this.dimensions.width;
    }
}

/**
 * Ship that is usually used for fishing.
 *
 * Not intended for transportation vehicles.
 */
class FishBoat extends Ship {

    /**
     * Creates new fish boat.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     */
    constructor(weight, dimensions) {

        super("Fish boat", weight, dimensions, 0.2, new Dimensions(3,1,0.5));
    }

    /**
     * Boat hasn't place for other vehicles so it returns `false`.
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
 */
class SuperTanker extends Ship {

    /**
     * Creates new super tanker.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {number} carryingWeight. It is a max weight value tanker can carry. Measured in tons.
     * @param {Dimensions} containerDimensions It is a max dimensions value that container can contain. Measured in cubic meters.
     */
    constructor(weight, dimensions, carryingWeight, containerDimensions) {
        super("Super tanker", weight, dimensions, carryingWeight, containerDimensions);
        this.containerDimensions = containerDimensions;
    }

    /**
     * Returns `true` if specified vehicle fits for container on board, otherwise returns `false`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(super.canCarry(vehicle) && this.containerDimensions.fitsFor(vehicle.dimensions));
    }
}

/**
 * Very powerful military ship for transporting military vehicles.
 *
 * Can carry very large, wide and heavy things.
 * All free space on board is used for carrying vehicles.
 * Also can contain vehicles inside.
 */
class AircraftCarrier extends Ship {

    /**
     * Creates new aircraft carrier.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} carryingDimensions It is a max dimensions value that aircraft carrier can accommodate inside. Measured in cubic meters.
     * @param {number} carryingWeight It is a max weight value that aircraft carrier can carry. Measured in tons.
     */
    constructor(weight, dimensions, carryingWeight, carryingDimensions) {
        super("Aircraft carrier", weight, dimensions, carryingWeight, carryingDimensions);
    }

    /**
     * Returns `true` if specified vehicle can be placed on board or fitsFor inner space, otherwise returns `false`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!((vehicle.dimensions.length < this.dimensions.length
            && vehicle.dimensions.width < this.dimensions.width
            || this.dimensions.fitsFor(vehicle.dimensions))
            && vehicle.weight < this.carryingWeight);
    }
}

/**
 * Fast rail vehicle that used for long distant transporting.
 *
 * Usually transports people, coal, oil, mail and so on in wagons.
 * Cargo cannot be wider than wagon.
 */
class Train extends Vehicle {

    /**
     * Creates new train.
     *
     * @param {string} name Name of train.
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} maxWagonDimensions It is a max dimensions value that single wagon can accommodate. Measured in cubic meters.
     * @param {number} maxWagonWeight It is a max weight value that single wagon can carry. Measured in tons.
     */
    constructor(name, weight, dimensions, maxWagonWeight, maxWagonDimensions) {

        super(name, weight, dimensions, maxWagonWeight, maxWagonDimensions);

        this.maxWagonDimensions = maxWagonDimensions;
        this.maxWagonWeight = maxWagonWeight;
    }

    /**
     * Returns `true` if this train can carry other specified vehicle, otherwise returns `false`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {

        return super.canCarry(vehicle);
    }
}

/**
 * Train for liquid substances transporting.
 *
 * Consists of large cylindrical wagons for liquids.
 * Isn't used for transporting solid things.
 */
class OilTrain extends Train {

    /**
     * Creates new oil train.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} maxWagonDimensions It is a max liquid dimensions that single wagon can accommodate. Measured in cubic meters.
     * @param {number} maxWagonWeight It is a max liquid weight value that single wagon can carry. Measured in tons.
     */
    constructor(weight, dimensions, maxWagonWeight, maxWagonDimensions) {
        super("Oil train", weight, dimensions, maxWagonWeight, maxWagonDimensions);

    }

    /**
     * Returns `false` because there is no way to place vehicle into cylindrical wagon.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return false;
    }
}

/**
 * Train for people transporting. Also known as electric train.
 *
 * Except people can transport bags or carts.
 * Also can transport small vehicles as bicycles or scooters.
 */
class PassengerTrain extends Train {

    /**
     * Creates new passenger train.
     *
     * @param {number} weight Measured in tons.
     * @param {Dimensions} dimensions Measured in cubic meters.
     * @param {Dimensions} maxWagonDimensions It is a max dimensions value that single wagon can accommodate. Measured in cubic meters.
     * @param {number} maxWagonWeight It is a max weight value that single wagon can carry. Measured in tons.
     */
    constructor(weight, dimensions, maxWagonWeight, maxWagonDimensions) {
        super("Passenger train", weight, dimensions, maxWagonWeight, maxWagonDimensions);
    }

    /**
     * Returns `true` if specified vehicle can be placed in one-third wagon width, otherwise returns `false`.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.dimensions.width < this.dimensions.width
        && vehicle.dimensions.length < this.dimensions.length
        && vehicle.dimensions.height < this.dimensions.height/3
        && vehicle.weight < this.maxWagonWeight);
    }
}

/**
 * Physical quantity that indicates the amount of occupied space.
 *
 * It is determined by three quantities: length, width, height.
 */
class Dimensions {

    /**
     * Creates new dimensions object.
     *
     * @param {number} length
     * @param {number} width
     * @param {number} height
     */
    constructor(length, width, height) {

        this.length = length;
        this.width = width;
        this.height = height;
    }

    /**
     * Returns `true` if specified dimensions can be placed into these dimensions. Otherwise `false`.
     *
     * @param {Dimensions} dimensions
     * @returns {boolean}
     */
    fitsFor(dimensions) {

        return !!(this.length >= dimensions.length
            && this.width >= dimensions.width
            && this.height >= dimensions.height)
    }

    /**
     * Returns volume of these dimensions scaled in cubic meters.
     *
     * @returns {number}
     */
    calculateVolume() {
        return +(this.length * this.width * this.height);
    }
}