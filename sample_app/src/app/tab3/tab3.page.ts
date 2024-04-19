import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CrudPage } from '../modal/crud/crud.page';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  nameVal: string = "";
  emailVal: string = "";
  records: any = [];
  constructor(
    private crud: CrudService,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {
  }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.firestore.collection('product').snapshotChanges().subscribe(async res => {
      if (res) { 
        this.records = res.map((e: any) => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          };
        });
        console.log(this.records, 'this.records')
      }
      await loading.dismiss();
    });
  }

  async DeleteRecord(id: any) {
    const alert1 = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.firestore.doc('product/' + id).delete();
            alert('Delete');
          }
        }
      ]
    });
    await alert1.present();
  }

  async EditRecord(data: any) {
    const modal = await this.modalCtrl.create({
      component: CrudPage,
      mode: 'ios',
      componentProps: {
        value: JSON.stringify(data),
      },
    });
    await modal.present();
    const result = await modal.onDidDismiss(); 
    if (result?.data) {
      alert('Update');
    }
  }


}
