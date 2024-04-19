import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CrudPage } from '../modal/crud/crud.page';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  bookingForm!: FormGroup;
  constructor( 
    public fb: FormBuilder,
    private modalCtrl: ModalController
  ) { }
  ngOnInit() {
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: CrudPage,
      mode: 'ios',
      componentProps: {
        value: null,
      },
    });
    await modal.present();
    const result = await modal.onDidDismiss();
    if (result?.data) {
      alert('Add');
    }
  }
}
