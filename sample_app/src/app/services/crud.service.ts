import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Platform } from '@ionic/angular'; 

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  bookingListRef!: AngularFireList<any>;
  bookingRef!: AngularFireObject<any>;
  constructor(private firestore: AngularFirestore, private db: AngularFireDatabase) {}
  // Create
  createBooking(apt: any) {
    return this.firestore.collection('product').add(apt).then(()=>{  
    })
  }
  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef;
  }
  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }
  // Update
  updateBooking(id: any, apt: any) {
    return this.bookingRef.update({
      name: apt.name,
      email: apt.email,
      mobile: apt.mobile,
    });
  }
  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}