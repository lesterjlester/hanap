import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  bookingForm!: FormGroup;
  id: any = null;
  constructor(
    private aptService: CrudService,
    private router: Router,
    public fb: FormBuilder,
    private navParams: NavParams,
    private firestore: AngularFirestore,
    private modalController: ModalController
  ) {
  }
  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [''],
      quantity: [''],
      price: [''],
      profit: [''],
      sell_price: [''],
    });
    this.bookingForm?.get('price')?.valueChanges.subscribe(() => {
      this.updateSellPrice();
    });

    this.bookingForm?.get('profit')?.valueChanges.subscribe(() => {
      this.updateSellPrice();
    });

    const value = this.navParams.get('value');
    if (value) {
      const parseValue = JSON.parse(value);
      this.id = parseValue.id;
      this.bookingForm?.get('name')?.setValue(parseValue.name);
      this.bookingForm?.get('quantity')?.setValue(parseValue.quantity);
      this.bookingForm?.get('price')?.setValue(parseValue.price);
      this.bookingForm?.get('profit')?.setValue(parseValue.profit);
      this.bookingForm?.get('sell_price')?.setValue(parseValue.sell_price);
    }
  }

  updateSellPrice() {
    const price = this.bookingForm?.get('price')?.value;
    const profit = this.bookingForm?.get('profit')?.value;

    if (price && profit) {
      const price = parseFloat(this.bookingForm?.get('price')?.value);
      const profit = parseFloat(this.bookingForm?.get('profit')?.value);
      if (!isNaN(price) && !isNaN(profit)) {
        const sellPrice = price + profit;
        this.bookingForm?.get('sell_price')?.setValue(sellPrice.toFixed(2));
      }
    }
  }

  formSubmit() {
    if (!this.bookingForm.valid) return false;
    if (this.id) {
      this.firestore.doc('product/' + this.id).update(this.bookingForm.value).then(() => {
        alert('Update');
        this.modalController.dismiss('success');
      })
    } else {
      return this.aptService
        .createBooking(this.bookingForm.value)
        .then((res: any) => { 
          this.bookingForm.reset();
          alert('Saved');
          this.modalController.dismiss(null);
        })
        .catch((error: any) => console.log(error));
    }
    return;
  }
  closePage() {
    this.modalController.dismiss();
  }
}
