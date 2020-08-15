const mongoose = require('mongoose')
const Category = require('./models/category')
const Item = require('./models/item')
const url = 'mongodb+srv://librarian123:librarian123.@my-database-vydwb.mongodb.net/inventory_db?retryWrites=true&w=majority'
const async = require('async')

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const categories = [];
const items = [];

function categoryCreate(name,description,cb){
    const category = new Category({
        name,
        description
    })

    category.save(function(err){
        if(err){
            cb(err,null)
            return
        }
        console.log(`Category ${name} added`)
        categories.push(category)
        cb(null,category)
    })
}

function createItem(name,description,category,price,stock,cb){
    const item = new Item({
        name,
        description,
        category,
        price,
        stock
    })

    item.save(function(err){
        if(err){
            cb(err,null)
            return
        }
        console.log(`Item ${name} added`)
        items.push(item)
        cb(null,item)
    })
}

function createCategories(cb) {
    async.series(
        [
            function (callback) {
                categoryCreate(
                    'Consumables',
                    'Consumable items such as Tango, Clarity and Observer Ward',
                    callback,
                );
            },
            function (callback) {
                categoryCreate(
                    'Attributes',
                    'Small items that boost your stats',
                    callback,
                );
            },
            function (callback) {
                categoryCreate(
                    'Secret',
                    'Items that can only be found in the Secret Shop',
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

function createItems(cb){
    async.series(
        [
            function(callback){
                createItem(
                    'Tango',
                    'Consumes a target tree to gain 7 health regeneration for 16 seconds. Consuming an Ironwood Tree doubles the heal amount.',
                    categories[0],
                    90,
                    12,
                    callback
                )
            },
            function(callback){
                createItem(
                    'Iron Branch',
                    'A seemingly ordinary branch, its ironlike qualities are bestowed upon the bearer.',
                    categories[1],
                    50,
                    10,
                    callback
                )
            },
            function(callback){
                createItem(
                    'Void Stone',
                    'Jewelry that was once used to channel nether realm magic, this ring pulses with energy.',
                    categories[2],
                    825,
                    1,
                    callback
                )
            },
        ]
    )
}

async.series(
    [createCategories,createItems],
    function(err,results){
        if(err){
            console.log(`ERROR: ${err}`)
        }
        mongoose.connection.close()
    }
)