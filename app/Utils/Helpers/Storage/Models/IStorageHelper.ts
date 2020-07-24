export default interface IStorageHelper {
  saveFile(file: string): Promise<string>
  deleteFile(file: string): Promise<void>
}
