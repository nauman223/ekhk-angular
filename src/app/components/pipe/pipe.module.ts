import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// pipes

import { DatePipe } from '@angular/common';
import { FilterSearchPipe } from './filter.pipe';
// Directive



const CommonModulesList: any[] = [
    CommonModule,
    NgOptimizedImage,
    HttpClientModule, FormsModule, ReactiveFormsModule,
]

const CommonPipesList: any[] = [

    FilterSearchPipe,
]

@NgModule({
    declarations: [
        ...CommonPipesList,
    ],
    imports: [...CommonModulesList],
    exports: [...CommonModulesList, ...CommonPipesList],
    providers: [
        ...CommonPipesList,
        DatePipe,
        TitleCasePipe,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PipeDirectiveModule { }
