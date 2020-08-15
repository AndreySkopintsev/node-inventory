const Category = require('../models/category')
const Item = require('../models/item')
const async = require('async')

//Display homepage

exports.index = (req,res)=>{
    res.render('layout')
}

//Display a list of categories

exports.category_list = (req,res)=>{
    Category.find()
    .exec(function(err,results){
        if(err){return next(err)}
        res.render('category_list',{title:'List of available categories',categories:results})
    })
}

//Display a single category

exports.category_single = (req,res)=>{
    async.parallel({
        category:function(callback){
            Category.findById(req.params.id)
            .exec(callback)
        },
        items:function(callback){
            Item.find({'category':req.params.id})
            .exec(callback)
        }
    },function(err,results){
        if(err){return next(err)}
        if(results.category==null){
            let err = new Error('Category not found')
            err.status = 404
            return next(err)
        }
        res.render('category_single',{title:results.category.name,category:results.category,items:results.items})
    })
}

//Create new category GET

exports.category_create_get = (req,res)=>{
    res.render('category_create',{title:'Create a new category'})
}

//Create new category POST

exports.category_create_post = (req,res)=>{
    let category = new Category({
        name:req.body.category,
        description:req.body.description
    })

    category.save(function(err){
        if(err){return next(err)}

        res.redirect(category.url)
    })
}

//Delete category GET

exports.category_delete_get = (req,res)=>{
    async.parallel({
        category:function(callback){
            Category.findById(req.params.id)
            .exec(callback)
        },
        items:function(callback){
            Item.find({'category':req.params.id})
            .exec(callback)
        }
    },function(err,results){
        if(err){return next(err)}
        if(results.category == null){
            res.redirect('/catalog/categories')
        }
        res.render('category_delete',{title:'Delete category',category:results.category,items:results.items})
    })
}

//Delete category POST

exports.category_delete_post = (req,res)=>{
    Category.findByIdAndRemove(req.body.categoryid,function deleteCategory(err){
        if(err){return next(err)}
        res.redirect('/catalog/categories')
    })
}