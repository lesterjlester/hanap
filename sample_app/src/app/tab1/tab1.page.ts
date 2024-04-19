import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CrudService } from '../services/crud.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  nameVal: string = "";
  emailVal: string = "";
  records: any = [];
  constructor(
    private crud: CrudService,
    private firestore: AngularFirestore,
    private storage: Storage,
    private loadingCtrl: LoadingController
  ) {
    this.init();
  }

  ngOnInit() {
    this.success();
  }
  filteredItems: any = [];
  onSearch(event: any) {
    const searchTerm = event.detail.value;
    if (searchTerm.trim() !== '') {
      this.filteredItems = this.records.filter((item: any) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    } else {
      this.filteredItems = [...this.records]; // Reset to original items
    }
  }


  async success() {
    const data = await this.storage?.get('product');
    if (data !== null || data !== 'undefined') {
      this.records = await JSON.parse(data);
      this.filteredItems = [...this.records];
    }
  }
  async sync() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.firestore.collection('product').get().subscribe(async res => {
      if (res) {
        if (res.size > 0) {
          const products: any[] = [];
          res.forEach((doc: any) => {
            products.push({
              id: doc.id,
              ...doc.data()
            });
          });
          await this.storage?.set('product', JSON.stringify(products));
          this.success();
          alert('SYNC SUCESS');
          await loading.dismiss();
        } else {
          await loading.dismiss();
        }
      }
    });
  }
  async init() {
    const storage = await this.storage.create();
  }
}
