import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, getMetadata, deleteObject } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {
  private storage = getStorage();

  constructor() { }

  async uploadImage(file: File, filePath: string): Promise<string> {
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  async getImageURLs(directoryPath: string): Promise<string[]> {
    const storageRef = ref(this.storage, directoryPath);
    const result = await listAll(storageRef);
    const urls = await Promise.all(result.items.map(itemRef => getDownloadURL(itemRef)));
    return urls;
  }

  public getFilePathFromUrl(url: string): string {
    const storageRootUrl = 'gs://neuroline-af6a2.appspot.com/images/';
    return decodeURIComponent(url.replace(storageRootUrl, '').split('?')[0]);
  }

  public async deleteImage(url: string): Promise<void> {
    const storageRef = ref(this.storage, `images/${url}`);
    console.log(this.storage);
    try {
      await getMetadata(storageRef);
      console.log('File exists:', url);
      await deleteObject(storageRef);
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        console.log('File does not exist:', url);
      } else {
        console.error('Error deleting file:', error);
        throw error;
      }
    }
  }

  public async onGetImage(storeData): Promise<string> {
    const imageUrl = await this.getImageURLs('gs://neuroline-c426d.appspot.com/images');
    const ourUrl = storeData.avatar;
    const final = imageUrl.find(e => e.includes(ourUrl));
    return final;
  }

  public async updateProfilePhoto(newPhoto: File, oldPhotoUrl?: string): Promise<string> {
    if (oldPhotoUrl) {
      const filePath = this.getFilePathFromUrl(oldPhotoUrl);
      await this.deleteImage(filePath);
    }
    const filePath = `images/${newPhoto.name}`;
    const newPhotoUrl = await this.uploadImage(newPhoto, filePath);
    return newPhotoUrl;
  }

  // private getFilePathFromUrl(url: string): string {
  //   const storageRootUrl = 'https://firebasestorage.googleapis.com/v0/b/neuroline-c426d.appspot.com/o/';
  //   return decodeURIComponent(url.replace(storageRootUrl, '').split('?')[0]);
  // }
}
