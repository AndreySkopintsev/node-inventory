const Item = require('../models/item')
const Category = require('../models/category')
const async = require('async')

//Display a list of items

exports.item_list = (req,res)=>{
    Item.find()
    .populate('category')
    .exec(function(err,result){
        if(err){return next(err)}
        res.render('Item_list',{title:'List of all available items',items:result})
    })
}

//Display a single item

exports.item_single = (req,res)=>{
    Item.findById(req.params.id)
    .populate('category')
    .exec(function(err,result){
        if(err){return next(err)}
        res.render('item_single',{item:result})
    })
}

//Create new item GET

exports.item_create_get = (req,res)=>{
    Category.find()
    .exec(function(err,categories){
        if(err){return next(err)}
        res.render('item_create',{title:'Create new item',categories:categories})
    })
}

//Create new item POST

exports.item_create_post = (req,res)=>{
    let item = new Item({
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        price:Number(req.body.price),
        stock:Number(req.body.stock)
    })
    
    item.save(function(err){
        if(err){return next(err)}

        res.redirect(item.url)
    })
}

//Delete item GET

exports.item_delete_get = (req,res)=>{
    Item.findById(req.params.id)
    .exec(function(err,item){
        if(err){return next(err)}
        res.render('item_delete',{title:'Delete item',item:item})
    })
}

//Delete item POST

exports.item_delete_post = (req,res)=>{
    Item.findByIdAndRemove(req.body.itemid,function deleteItem(err){
        if(err){return next(err)}
        res.redirect(`/catalog/categories/${req.body.categoryid}`)
    })
}