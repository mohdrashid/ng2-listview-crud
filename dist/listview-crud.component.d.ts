import { Ng2ListViewCRUDProperty } from "./listview-crud";
export declare class Ng2ListViewCRUDComponent {
    value: string;
    search: string;
    opType: string;
    properties: Ng2ListViewCRUDProperty;
    items: Array<any>;
    subData: Array<any>;
    selectedIndex: number;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onChangeListener($event: any): void;
    append(value: any): void;
    onAddClickListener(): void;
    onEditClickListener(index: any): void;
    delete(index: any): void;
    get(index: any): any;
    onDeleteClickListener(index: any): void;
    getData(item: any): any;
}
