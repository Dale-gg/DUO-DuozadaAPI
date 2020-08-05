import { container } from 'tsyringe'

import IHashProvider from './HashProvider/Models/IHashProvider'
import BCryptHashProvider from './HashProvider/Implementations/BCryptHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
