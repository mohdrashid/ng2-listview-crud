import { Ng2ListViewCRUDProperty } from "./listview-crud";
export declare class Ng2ListViewCRUDComponent {
    value: string;
    search: string;
    opType: string;
    properties: Ng2ListViewCRUDProperty;
    items: Array<any>;
    subData: Array<any>;
    selectedIndex: number;
    path: any;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onChangeListener($event: any): void;
    changeJSONValue(obj: any, path: any, newValue: any): void;
    getJSONValue(obj: any): string;
    append(value: any): any;
    onAddClickListener(): void;
    onEditClickListener(index: any): any;
    delete(index: any): void;
    get(index: any): any;
    onDeleteClickListener(index: any): void;
    getData(item: any): any;
}
