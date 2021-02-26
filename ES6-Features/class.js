// Classes

// ES5
var Person = function (name, job, yearOfBirth) {
    this.name = name;
    this.job = job;
    this.yearOfBirth = yearOfBirth;
}

Person.prototype.calculateAge = function () {
    return new Date().getFullYear() - this.yearOfBirth
}

var gokberk = new Person("Gokberk", "Developer", 1996)
console.log(gokberk.calculateAge())

class PersonES6 {
    constructor(name, job, yearOfBirth) {
        this.name = name;
        this.job = job;
        this.yearOfBirth = yearOfBirth;
    }

    calculateAge() {
        return new Date().getFullYear() - this.yearOfBirth
    }
}

var yildirim = new PersonES6("Yildirim", "Developer", 1996)
console.log(yildirim.calculateAge())