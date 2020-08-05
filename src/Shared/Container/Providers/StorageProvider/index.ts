import { container } from 'tsyringe'
import uploadConfig from '@Config/upload'

import IStorageProvider from './Models/IStorageProvider'
import S3StorageProvider from './Implementations/S3StorageProvider'
import DiskStorageProvider from './Implementations/DiskStorageProvider'

const providers = {
  s3: S3StorageProvider,
  disk: DiskStorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
)
