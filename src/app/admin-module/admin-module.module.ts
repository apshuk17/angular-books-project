import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AdminInterfaceComponent],
  exports: [AdminInterfaceComponent]
})
export class AdminModuleModule { }
