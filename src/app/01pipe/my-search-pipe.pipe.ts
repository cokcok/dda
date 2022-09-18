import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class MySearchPipe implements PipeTransform {
	/*
	 * @param items List of items to filter
	 * @param term  a string term to compare with every property of the list
	 * @param objectFieldName
	 */
	static filter(items: Array<{ [ key: string ]: any }>, term: string, objectFieldName: string): Array<{ [ key: string ]: any }> {
		const toCompare = term.toLowerCase();
		if ( objectFieldName === null || objectFieldName === undefined ) { // Object Field not defined so loop over object
			// tslint:disable-next-line:only-arrow-functions
			return items.filter(function(item: any) {
				for ( const property in item ) {
					if ( item[ property ] === null || item[ property ] === undefined ) {
						continue;
					}
					if ( item[ property ].toString().toLowerCase().includes(toCompare) ) {
						return true;
					}
				}
				return false;
			});
		}
		// tslint:disable-next-line:only-arrow-functions
		return items.filter( function(item: any) {
			return (item[objectFieldName].toString().toLowerCase().includes(toCompare)) ;
		});
	}

 /*
	 * @param items object from array
	 * @param term term's search
	 * @param objectFieldName (optional)
	 */
	transform(items: any, term: string, objectFieldName: string): any {
		if ( !term || !items ) { return items; }
		return MySearchPipe.filter(items, term, objectFieldName);
	}

}
