import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject, 
  listAll,
  UploadResult 
} from 'firebase/storage';
import { storage } from './config';

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  percentage: number;
}

export class StorageService {
  private static readonly ADMIN_FOLDER = 'admin';
  private static readonly PROJECTS_FOLDER = 'projects';
  private static readonly BLOG_FOLDER = 'blog';

  static async uploadFile(
    file: File, 
    folder: 'admin' | 'projects' | 'blog',
    fileName?: string
  ): Promise<string> {
    try {
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const finalFileName = fileName || `${timestamp}_${file.name}`;
      
      const storageRef = ref(storage, `${folder}/${finalFileName}`);
      const uploadResult: UploadResult = await uploadBytes(storageRef, file);
      
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  static async uploadMultipleFiles(
    files: File[], 
    folder: 'admin' | 'projects' | 'blog'
  ): Promise<string[]> {
    try {
      const uploadPromises = files.map(file => this.uploadFile(file, folder));
      const downloadURLs = await Promise.all(uploadPromises);
      return downloadURLs;
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw new Error('Failed to upload files');
    }
  }

  static async deleteFile(fileUrl: string): Promise<void> {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error('Failed to delete file');
    }
  }

  static async listFiles(folder: 'admin' | 'projects' | 'blog'): Promise<string[]> {
    try {
      const folderRef = ref(storage, folder);
      const result = await listAll(folderRef);
      
      const downloadURLs = await Promise.all(
        result.items.map(item => getDownloadURL(item))
      );
      
      return downloadURLs;
    } catch (error) {
      console.error('Error listing files:', error);
      throw new Error('Failed to list files');
    }
  }

  static async uploadProjectImages(files: File[]): Promise<string[]> {
    return this.uploadMultipleFiles(files, 'projects');
  }

  static async uploadAdminFile(file: File): Promise<string> {
    return this.uploadFile(file, 'admin');
  }

  static async uploadBlogImage(file: File): Promise<string> {
    return this.uploadFile(file, 'blog');
  }

  static extractFileNameFromUrl(url: string): string {
    try {
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      return fileName.split('?')[0]; // Remove query parameters
    } catch (error) {
      console.error('Error extracting file name:', error);
      return 'unknown-file';
    }
  }
}
