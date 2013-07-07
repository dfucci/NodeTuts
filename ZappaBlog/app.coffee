require('zappa') ->
  @enable 'default layout'
  mongoose = require 'mongoose'
  mongoose.connect('mongodb://localhost/zappaDB')

  Schema = mongoose.Schema
  User = new Schema
    name: String

  User = mongoose.model 'User', User
  @get '/': ->
    user = new User
    user.name = "TED"
    user.save ()->
      console.log 'inserted'
    title = "Testing"

    @render index: {user, title}

  @view 'index': ->
    h1 @title
    p @user.name

  @get '/user': ->
    myuser = mongoose.model 'User'
    myuser.find {}, (err,userdoc)=>
      if err?
        console.log 'something went wrong'
      if userdoc?
        console.log userdoc.length
      @render user: {userdoc}


  @view 'user': ->
    h1 @title
    p u.name for u in @userdoc
