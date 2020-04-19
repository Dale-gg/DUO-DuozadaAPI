const Knex = require('knex')
const connection = require('../database/connection')
import { Model } from 'objection'

const KnexConnection = Knex(connection)
Model.knex(KnexConnection)