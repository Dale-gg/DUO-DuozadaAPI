import Lane from '@Modules/Users/Infra/Typeorm/Entities/Lane'
import ILanesRepository from '@Modules/Users/Repositories/ILanesRepository'
import { uuid } from 'uuidv4'

class FakeLanesRepository implements ILanesRepository {
  private lanes: Lane[] = []

  constructor() {
    const allLanes = [
      {
        id: uuid(),
        name: 'Top Laner',
        prefix: 'TOP',
        icons: [
          'iron',
          'silver',
          'gold',
          'platine',
          'diamond',
          'master',
          'grandmaster',
          'challenger',
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'Mid Laner',
        prefix: 'MID',
        icons: [
          'iron',
          'silver',
          'gold',
          'platine',
          'diamond',
          'master',
          'grandmaster',
          'challenger',
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'Jungler',
        prefix: 'JG',
        icons: [
          'iron',
          'silver',
          'gold',
          'platine',
          'diamond',
          'master',
          'grandmaster',
          'challenger',
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'Attack Damage Carry',
        prefix: 'ADC',
        icons: [
          'iron',
          'silver',
          'gold',
          'platine',
          'diamond',
          'master',
          'grandmaster',
          'challenger',
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuid(),
        name: 'Suport',
        prefix: 'SUP',
        icons: [
          'iron',
          'silver',
          'gold',
          'platine',
          'diamond',
          'master',
          'grandmaster',
          'challenger',
        ],
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]

    allLanes.map(lane => {
      const laneInstance = new Lane()

      Object.assign(laneInstance, lane)

      this.lanes.push(laneInstance)
    })
  }

  public async findById(id: string): Promise<Lane | undefined> {
    const findLane = this.lanes.find(lane => lane.id === id)

    return findLane
  }

  public async findByPrefix(prefix: string): Promise<Lane | undefined> {
    const findLane = this.lanes.find(lane => lane.prefix === prefix)

    return findLane
  }
}

export default FakeLanesRepository
