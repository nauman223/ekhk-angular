import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter_pipe'
})
export class FilterSearchPipe implements PipeTransform {

    transform(items: any, searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();

        return items.filter(item => item.name.toLowerCase().includes(searchText));
    }

}