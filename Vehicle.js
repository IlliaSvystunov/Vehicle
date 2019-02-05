"use strict";

/**
 * A thing used for transporting people or cargo.
 *
 * Includes cars, bicycles, ships, wagons and so on.
 * Common vehicle has name, volume, weight, carrying volume, carrying weight.
 *
 * @author Illia Svystunov.
 */
class Vehicle {

    /**
     * Creates new vehicle with specified parameters.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     *
     * Weight and carryingWeight scale in tons.
     * Dimension and carryingVolume scale in cubic meters and characterized by.
     * All numeric parameters must be positive.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {

        if (weight <= 0) {
            throw "Weigh parameter must be positive";
        }
        if (carryingWeight <= 0) {
            throw "Carrying weight parameter must be positive";
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
     * Returns 'true' if this vehicle can carry other specified vehicle,
     * otherwise returns 'false'.
     *
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
     * Creates new bicycle.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     */
    constructor(name, weight, volume) {
        super(name, weight, volume, 0.1, new Dimension(0.2,0.1,0.1));
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
 *
 * @author Illia Svystunov.
 */
class Car extends Vehicle {

    /**
     * Creates new car.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} carryingVolume. It is a max volume value that vehicle can carry.
     * @param {number} carryingWeight. It is a max weight value that vehicle can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns 'true' if specified vehicle can be placed on top of this car, 'false' otherwise.
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
 * Doesn't have car trunk.
 * Doesn't created for carrying cargo.
 *
 * @author Illia Svystunov.
 */
class Bolid extends Car {

    /**
     * Creates new bolid with with specified.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     */
    constructor(name, weight, volume) {
        super(name, weight, volume, 0.2, new Dimension(0.5,0.5,0.5));
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
 *
 * @author Illia Svystunov.
 */
class Wagon extends Car {

    /**
     * Creates new wagon.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} maxTrailerVolume. It is a max volume value that wagon can carry.
     * @param {number} maxTrailerWeight. It is a max weight value that wagon can carry.
     */
    constructor(name, weight, volume, maxTrailerWeight, maxTrailerVolume) {

        super(name, weight, volume, maxTrailerWeight, maxTrailerVolume);
    }

    /**
     * Returns 'true' specified vehicle fits trailer wagon's max volume and weight, otherwise returns 'false'.
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
 * Time machine and spacecraft. Abbreviation from "Time And Relative Dimension In Space".
 *
 * Invention of Time Masters race from science fiction "Doctor who".
 * Looks as usual police telephone box, but endless inside.
 * It can carry any material cargo.
 *
 * For more information see {@link https://en.wikipedia.org/wiki/TARDIS}.
 *
 * @author Illia Svystunov.
 */
class Tardis extends Vehicle {

    /**
     * Creates new tardis.
     */
    constructor() {
        super("Tardis", 1, new Dimension(1.5,1.5,2.5), 1,
            new Dimension(1.5,1.5,2.5));
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
 *
 * @author Illia Svystunov.
 */
class Ship extends Vehicle {

    /**
     * Creates new ship with with specified parameters.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} carryingVolume. It is a max volume value that ship can carry.
     * @param {number} carryingWeight. It is a max weight value that ship can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns 'true' if this ship can carry other specified vehicle, otherwise returns 'false'.
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
     * Creates new fish boat.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     */
    constructor(name, weight, volume) {

        super(name, weight, volume, 0.2, new Dimension(3,1,0.5));
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
 *
 * @author Illia Svystunov.
 */
class SuperTanker extends Ship {

    /**
     * Creates new super tanker with specified parameters.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {number} carryingWeight. It is a max weight value tanker can carry.
     * @param {Dimension} containerVolume It is a max volume value that container can contain.
     */
    constructor(name, weight, volume, carryingWeight, containerVolume) {
        super(name, weight, volume, carryingWeight, containerVolume);
        this.containerVolume = containerVolume;
    }

    /**
     * Returns 'true' if specified vehicle fits container on board, otherwise returns 'false'.
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
     * name, weight, volume, carrying volume, carrying weight.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} carryingVolume. It is a max volume value that aircraft carrier can accommodate inside.
     * @param {number} carryingWeight. It is a max weight value that aircraft carrier can carry.
     */
    constructor(name, weight, volume, carryingWeight, carryingVolume) {
        super(name, weight, volume, carryingWeight, carryingVolume);
    }

    /**
     * Returns 'true' if specified vehicle can be placed on board or fits inner space, otherwise returns 'false'.
     *
     * @param vehicle {Vehicle}
     * @returns {boolean}
     */
    canCarry(vehicle) {
        return !!((vehicle.volume.length < this.volume.length
            && vehicle.volume.width < this.volume.width
            || this.volume.canPut(vehicle.volume))
            && vehicle.weight < this.carryingWeight);
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
     * Creates new train with specified parameters.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} maxWagonVolume. It is a max volume value that single wagon can accommodate.
     * @param {number} maxWagonWeight. It is a max weight value that single wagon can carry.
     */
    constructor(name, weight, volume, maxWagonWeight, maxWagonVolume) {

        super(name, weight, volume, maxWagonWeight, maxWagonVolume);

        this.maxWagonVolume = maxWagonVolume;
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
 *
 * @author Illia Svystunov.
 */
class OilTrain extends Train {

    /**
     * Creates new oil train.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} maxWagonVolume. It is a max liquid volume that single wagon can accommodate.
     * @param {number} maxWagonWeight. It is a max liquid weight value that single wagon can carry.
     */
    constructor(name, weight, volume, maxWagonWeight, maxWagonVolume) {
        super(name, weight, volume, maxWagonWeight, maxWagonVolume);
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
 *
 * @author Illia Svystunov.
 */
class PassengerTrain extends Train {

    /**
     * Creates new passenger train.
     *
     * @param {string} name.
     * @param {number} weight.
     * @param {Dimension} volume.
     * @param {Dimension} maxWagonVolume. It is a max volume value that single wagon can accommodate.
     * @param {number} maxWagonWeight. It is a max weight value that single wagon can carry.
     */
    constructor(name, weight, volume, maxWagonWeight, maxWagonVolume) {
        super(name, weight, volume, maxWagonWeight, maxWagonVolume);
    }

    /**
     * Returns 'true' if specified vehicle can be placed in one-third wagon width, otherwise returns 'false'.
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
 * Physical quantity that indicates the amount of occupied space.
 * It is determined by three quantities: length, width, height.
 */
class Dimension {

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

    calculateVolume() {
        return +(this.length * this.width * this.height);
    }
}