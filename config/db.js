'use strict'

const env = process.env.NODE_ENV || 'development'
const knexfile = require('../db/knexfile')
const knex = require('knex');
let db;

const start = async ()=>{
  if(!db){
    db = await knex(knexfile[env]);
  }

  return db;
}

const stop = async ()=>{
  if(db){
    await db.stop()
  }
  db = null;

}

module.exports = {start,stop,db}
