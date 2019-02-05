import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  base64Image: string = null;
  images: any = [];

  constructor(private camera: Camera, private imagePicker: ImagePicker) { }

  // From https://ionicframework.com/docs/native/camera/
  takePicture() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      // Handle error
    });
  }

  // from https://github.com/Telerik-Verified-Plugins/ImagePicker
  choosePicture() {
    //   const options = {
    //     // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    //     // selection of a single image, the plugin will return it.
    //     maximumImagesCount: 1,

    //     // max width and height to allow the images to be.  Will keep aspect
    //     // ratio no matter what.  So if both are 800, the returned image
    //     // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    //     // 800 and height 0 the image will be 800 pixels wide if the source
    //     // is at least that wide.
    //     width: 1000,
    //     height: 1000,

    //     // quality of resized image, defaults to 100
    //     // quality: int (0-100),

    //     // output type, defaults to FILE_URIs.
    //     // available options are 
    //     // window.imagePicker.OutputType.FILE_URI (0) or 
    //     // window.imagePicker.OutputType.BASE64_STRING (1)
    //     outputType: 1
    // };
    const options = {
      maximumImagesCount: 1,
      width: 500,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      // for (let i = 0; i < results.length; i++) {
      //   this.images.push(`data:image/jpeg;base64,${results[i]}`);
      // };
      this.base64Image = `data:image/jpeg;base64,${results[0]}`;
    }, (err) => { });
  }
}
