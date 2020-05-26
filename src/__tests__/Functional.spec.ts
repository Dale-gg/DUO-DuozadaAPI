import createConnection from '../Database'
import { Connection, getConnection } from 'typeorm'

import test from 'japa'
import request from 'supertest'

import Factory from '../Database/factory'

import app from '../server'
import { LolApi } from '@jlenon7/zedjs'

let connection: Connection

const factory = new Factory()

test.group('> 1️⃣  User Tests', group => {
  group.before(async () => {
    connection = await createConnection('test-connection')
  })

  group.beforeEach(async () => {
    await connection.query('DELETE FROM duo_users')
    await connection.query('DELETE FROM duo_lanes')
    await connection.query('DELETE FROM gg_champions')
  })

  group.after(async () => {
    const mainConnection = getConnection()

    await connection.close()
    await mainConnection.close()
  })

  const name = 'João Lenon'
  const email = 'lenon@lenonsec.dev'
  const password = '123456'
  const avatar = 'http://localhost:3333/files/avatar.png'
  const media = 'http://localhost:3333/files/video.mp4'

  test('A) it should list all Users', async assert => {
    const factory = new Factory()
    await factory.manyUsers(5)

    const response = await request(app)
      .get(`${process.env.APP_PREFIX}/users`)
      .expect(200)

    assert.exists(response.body.data[0])
  }).timeout(30000)

  test('B) it should create a User', async assert => {
    const api = new LolApi()
    const { data } = await api.DataDragon.getChampion()

    const promises = []
    for (const champion in data) {
      promises.push(factory.champion(data[champion]))
    }
    await Promise.all(promises)

    const lanesFactorized = await factory.lanes()

    const champions = {
      champKey1: 266,
      champKey2: 103,
      champKey3: 84,
    }
    const lanes = {
      laneId1: lanesFactorized.top.id,
      laneId2: lanesFactorized.sup.id,
    }

    const response = await request(app)
      .post(`${process.env.APP_PREFIX}/users`)
      .send({
        name,
        email,
        password,
        avatar,
        champions,
        lanes,
        media,
      })
      .expect(200)

    assert.exists(response.body.data.id)
    assert.equal(response.body.data.name, 'João Lenon')
  }).timeout(30000)
})
