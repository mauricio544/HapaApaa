import { Component, OnInit } from '@angular/core';
import { CameraResultType, CameraSource, Camera, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  public pics: IncidenciaPic[] = [];
  public PHOTO_STORAGE: string = 'photos';
  public imagen: any = '';
  public photos: Photo[] = [];
  constructor(public ac: AlertController) { }

  ngOnInit() {}

  private convertBlobTo64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async readAs64(photo: Photo) {
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    return await this.convertBlobTo64(blob) as string;
  }

  private async savePhoto(photo: Photo) {
    const base64 = await this.readAs64(photo);
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Documents
    });
        
    return {
      filepath: fileName,
      webviewPath: base64
    };
  }

  async showMessage(msg) {
    const alert = await this.ac.create({
      header: 'Base64',
      subHeader: 'Result',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  public async addPhoto() {    
    const captureImage = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 24
    }); 
    
    //const savedImage = await this.savePhoto(captureImage);    
    const savedImage = {
      filepath: new Date().getTime() + '.jpeg',
      webviewPath: await this.readAs64(captureImage)
    }    
    this.pics.unshift(savedImage);
    // Storage.set({
    //   key: this.PHOTO_STORAGE,
    //   value: JSON.stringify(this.pics),
    // });  
    localStorage.setItem(this.PHOTO_STORAGE, JSON.stringify(this.pics));  
  }

}

export interface IncidenciaPic {
  filepath: string;
  webviewPath: string;
}