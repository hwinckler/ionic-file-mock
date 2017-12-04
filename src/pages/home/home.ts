import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private file: File) {

    this.file.moveFile("", "", "", "")
    .then(s => {
      console.log(s);
      console.log(s.name);
    });

    this.file.listDir("", "")
    .then(s => {
      s.forEach(f => console.log(f.name));
    });
  }

}
