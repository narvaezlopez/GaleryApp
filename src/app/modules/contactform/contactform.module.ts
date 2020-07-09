import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactformPageRoutingModule } from './contactform-routing.module';

import { ContactformPage } from './contactform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactformPageRoutingModule
  ],
  declarations: [ContactformPage]
})
export class ContactformPageModule {}
