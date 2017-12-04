import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {VoidCallback, DirectoryEntryCallback, File, Entry, MetadataCallback, ErrorCallback, Metadata, FileSystem, DirectoryEntry, EntryCallback } from '@ionic-native/file';


class EntryMock implements Entry{

    constructor(
      private _isFile: boolean,
      private _name: string
    ){
    }

    isFile: boolean = this._isFile;
    isDirectory: boolean;
    getMetadata(successCallback: MetadataCallback, errorCallback?: ErrorCallback): void{

    }
    setMetadata(successCallback: MetadataCallback, errorCallback: ErrorCallback, metadataObject: Metadata): void{

    }
    name: string = this._name;
    fullPath: string;
    filesystem: FileSystem;

    nativeURL: string;
    moveTo(parent: DirectoryEntry, newName?: string, successCallback?: EntryCallback, errorCallback?: ErrorCallback): void;

    copyTo(parent: DirectoryEntry, newName?: string, successCallback?: EntryCallback, errorCallback?: ErrorCallback): void;
    toURL(): string;

    toInternalURL(): string;
    remove(successCallback: VoidCallback, errorCallback?: ErrorCallback): void;
    getParent(successCallback: DirectoryEntryCallback, errorCallback?: ErrorCallback): void{
      
    }
}

class FileMock extends File{

  moveFile(path: string, fileName: string, newPath: string, newFileName: string): Promise<Entry>{
    return new Promise<Entry>((resolve, reject) => {
      resolve(new EntryMock(true, "teste.txt"));
    })
  }

  listDir(path: string, dirName: string): Promise<Entry[]>{
    return new Promise<Entry[]>((resolve, reject) => {
      var dirs: EntryMock[] = [];
      dirs.push(new EntryMock(true, "arquivo1.txt"));
      dirs.push(new EntryMock(true, "arquivo2.txt"));
      resolve(dirs);
    })
  }

}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: File, useClass: FileMock}
  ]
})
export class AppModule {}
