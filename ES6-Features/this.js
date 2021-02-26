// ES5
let list = {
    category: 'phone',
    names: ['Iphone X', 'Samsung S8', 'Iphone 8S'],
    call: function () {
        this.names.map(name => console.log(name))
    }
}

// ES5 Solution
let list2 = {
    category: 'phone',
    names: ['Iphone X', 'Samsung S8', 'Iphone 8S'],
    call: function () {
        this.names.map(function (name) {
            console.log(this.category) // gives undefined
        })
    }
}
// new context created by scoped inside
let list2Solution = {
    category: 'phone',
    names: ['Iphone X', 'Samsung S8', 'Iphone 8S'],
    call: function () {
        var self = this
        this.names.map(function (name) {
            console.log(self.category) // gives undefined
        })
    }
}

// ES6 Solution
// no new context created in the scope
let list2ES6Solution = {
    category: 'phone',
    names: ['Iphone X', 'Samsung S8', 'Iphone 8S'],
    call: function () {
        this.names.map(name => {
            console.log(this.category) // gives result as phone
        })
    }
}
list2ES6Solution.call()