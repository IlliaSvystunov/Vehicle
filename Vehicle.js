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
     * @param {string} name.
     * @param {number} weight. Measured in tons.
     * @param {Dimensions} dimensions. Measured in cubic meters.
     * @param {Dimensions} carryingDimensions. It is a max dimensions that fitsFor current vehicle. Measured in cubic meters.
     * @param {number} carryingWeight. It is a max weight that fitsFor current vehicle. Measured in tons.
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
     * Returns 'true' if this vehicle can carry other specified vehicle,
     * otherwise returns 'false'.
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
     * @param {number} weight. Measured in tons.
     * @param {Dimensions} dimensions. Measured in cubic meters.
     */
    constructor(weight, dimensions) {
        super("Bicycle", weight, dimensions, 0.1, new Dimensions(0.2,0.1,0.1));
    }

    /**
     * Returns 'false' because bicycle cannot carry any vehicle.
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
     * @param {number} weight. Measured in tons.
     * @param {Dimensions} dimensions. Measured in cubic meters.
     * @param {Dimensions} carryingDimensions. It is a max dimensions value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(weight, dimensions, carryingWeight, carryingDimensions) {
        super("Car", weight, dimensions, carryingWeight, carryingDimensions);
    }

    /**
     * Returns 'true' if specified vehicle can be placed on top of this car, 'false' otherwise.
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
     * Creates new bolid with with specified.
     *
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     */
    constructor(weight, dimensions) {
        super(weight, dimensions, 0.2, new Dimensions(0.5,0.5,0.5));
        this._name = "Bolid";
    }

    /**
     * Returns 'false' because bolid cannot carry any vehicle.
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
     * @param {Dimensions} dimensions.
     * @param {Dimensions} maxTrailerDimensions. It is a max dimensions value that wagon can carry.
     * @param {number} maxTrailerWeight. It is a max weight value that wagon can carry.
     */
    constructor(weight, dimensions, maxTrailerWeight, maxTrailerDimensions) {

        super(weight, dimensions, maxTrailerWeight, maxTrailerDimensions);
        this._name = "Wagon";
    }

    /**
     * Returns 'true' specified vehicle fitsFor trailer wagon's max dimensions and weight, otherwise returns 'false'.
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
     */
    constructor() {
        super("Tardis", 0.01, new Dimensions(1.5,1.5,2.5), 1,
            new Dimensions(1.5,1.5,2.5));
    }

    /**
     * Tardis can always carry any other vehicle, so it returns 'true'.
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
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     * @param {Dimensions} carryingDimensions. It is a max dimensions value that ship can carry.
     * @param {number} carryingWeight. It is a max weight value that ship can carry.
     */
    constructor(weight, dimensions, carryingWeight, carryingDimensions) {
        super("Ship", weight, dimensions, carryingWeight, carryingDimensions);
    }

    /**
     * Returns 'true' if this ship can carry other specified vehicle, otherwise returns 'false'.
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
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     */
    constructor(weight, dimensions) {

        super(weight, dimensions, 0.2, new Dimensions(3,1,0.5));
        this._name = "Fish boat";
    }

    /**
     * Boat hasn't place for other vehicles so it returns 'false'.
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
     * Creates new super tanker with specified parameters.
     *
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     * @param {number} carryingWeight. It is a max weight value tanker can carry.
     * @param {Dimensions} containerDimensions It is a max dimensions value that container can contain.
     */
    constructor(weight, dimensions, carryingWeight, containerDimensions) {
        super(weight, dimensions, carryingWeight, containerDimensions);
        this._name = "Super tanker";
        this.containerDimensions = containerDimensions;
    }

    /**
     * Returns 'true' if specified vehicle fitsFor container on board, otherwise returns 'false'.
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
     * Creates new aircraft carrier with with specified:
     * name, weight, dimensions, carrying dimensions, carrying weight.
     *
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     * @param {Dimensions} carryingDimensions. It is a max dimensions value that aircraft carrier can accommodate inside.
     * @param {number} carryingWeight. It is a max weight value that aircraft carrier can carry.
     */
    constructor(weight, dimensions, carryingWeight, carryingDimensions) {
        super(weight, dimensions, carryingWeight, carryingDimensions);
        this._name = "Super tanker";

    }

    /**
     * Returns 'true' if specified vehicle can be placed on board or fitsFor inner space, otherwise returns 'false'.
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
     * Creates new train with specified parameters.
     *
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     * @param {Dimensions} maxWagonDimensions. It is a max dimensions value that single wagon can accommodate.
     * @param {number} maxWagonWeight. It is a max weight value that single wagon can carry.
     */
    constructor(weight, dimensions, maxWagonWeight, maxWagonDimensions) {

        super("Train", weight, dimensions, maxWagonWeight, maxWagonDimensions);

        this.maxWagonDimensions = maxWagonDimensions;
        this.maxWagonWeight = maxWagonWeight;
    }

    /**
     * Returns 'true' if this train can carry other specified vehicle, otherwise returns 'false'.
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
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     * @param {Dimensions} maxWagonDimensions. It is a max liquid dimensions that single wagon can accommodate.
     * @param {number} maxWagonWeight. It is a max liquid weight value that single wagon can carry.
     */
    constructor(weight, dimensions, maxWagonWeight, maxWagonDimensions) {
        super(weight, dimensions, maxWagonWeight, maxWagonDimensions);
        this._name = "Oil train";

    }

    /**
     * Returns 'false' because there is no way to place vehicle into cylindrical wagon.
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
     * @param {number} weight.
     * @param {Dimensions} dimensions.
     * @param {Dimensions} maxWagonDimensions. It is a max dimensions value that single wagon can accommodate.
     * @param {number} maxWagonWeight. It is a max weight value that single wagon can carry.
     */
    constructor(weight, dimensions, maxWagonWeight, maxWagonDimensions) {
        super(weight, dimensions, maxWagonWeight, maxWagonDimensions);
        this._name = "Passenger train";

    }

    /**
     * Returns 'true' if specified vehicle can be placed in one-third wagon width, otherwise returns 'false'.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!(vehicle.dimensions.width < this.dimensions.width/5
        && vehicle.dimensions.length < this.dimensions.length/5
        && vehicle.dimensions.height < this.dimensions.height/3
        && vehicle.weight < this.maxWagonWeight/25);
    }
}

/**
 * Physical quantity that indicates the amount of occupied space.
 *
 * It is determined by three quantities: length, width, height.
 */
class Dimensions {

    constructor(length, width, height) {

        this.length = length;
        this.width = width;
        this.height = height;
    }

    fitsFor(dimensions) {

        return !!(this.length > dimensions.length
            && this.width > dimensions.width
            && this.height > dimensions.height)
    }

    calculateVolume() {
        return +(this.length * this.width * this.height);
    }
}