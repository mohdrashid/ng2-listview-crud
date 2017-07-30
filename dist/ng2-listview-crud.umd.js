(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', '@angular/forms'], factory) :
	(factory((global['ng2-listview-crud'] = {}),global._angular_common,global._angular_core,global._angular_forms));
}(this, (function (exports,_angular_common,_angular_core,_angular_forms) { 'use strict';

/**
 * Created by mohma on 7/27/2017.
 */
var Ng2ListViewCRUDComponent = (function () {
    function Ng2ListViewCRUDComponent() {
        this.value = "";
        this.search = "";
        this.opType = "Add";
        this.listView = {
            label: "CRUD ListView",
            color: "#3752ff",
            icon: "fa fa-cogs",
            onDelete: function (value) {
                console.log("Deleting Value: " + value);
                return true;
            },
            onUpdate: function (value) {
                console.log("Editing Value: " + value);
                return true;
            },
            onSearch: function () { },
            onAdd: function (value) {
                console.log("Adding Value: " + value);
                return true;
            }
        };
        this.items = [
            "Hello Worlds"
        ];
    }
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngOnInit = function () {
        this.listView.icon += " fa-fw";
        this.subData = this.items;
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.ngAfterViewInit = function () {
        var /** @type {?} */ self = this;
        $('ul').on('click', 'li', function () {
            $('.selected').removeClass('selected');
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                self.selectedIndex = $(this).attr('id');
                $(this).addClass('selected');
            }
        });
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onChangeListener = function ($event) {
        var /** @type {?} */ self = this;
        if (this.search === "") {
            this.subData = this.items;
            return;
        }
        var /** @type {?} */ result = this.items.filter(function (lhs) {
            return lhs.match(self.search);
        });
        this.subData = result;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.append = function (value) {
        this.items.push(value);
    };
    /**
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onAddClickListener = function () {
        if (this.value.length !== 0 && this.opType === "Add") {
            if (this.listView.onAdd && this.listView.onAdd(this.value)) {
                this.append(this.value);
                this.value = "";
            }
            else {
                console.log("Function onAdd not found");
            }
        }
        else if (this.value.length !== 0 && this.opType === "Edit") {
            if (this.listView.onAdd && this.listView.onUpdate(this.value)) {
                this.items[this.selectedIndex] = this.value;
                this.value = "";
                this.opType = "Add";
            }
            else {
                console.log("Function onEdit not found");
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onEditClickListener = function (index) {
        this.selectedIndex = index;
        this.value = this.items[this.selectedIndex];
        this.opType = "Edit";
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.delete = function (index) {
        this.items.splice(index, 1);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.get = function (index) {
        return this.items[index];
    };
    /**
     * @param {?} index
     * @return {?}
     */
    Ng2ListViewCRUDComponent.prototype.onDeleteClickListener = function (index) {
        this.selectedIndex = index;
        if (this.listView.onDelete && this.listView.onDelete(this.get(this.selectedIndex))) {
            this.delete(this.selectedIndex);
        }
    };
    return Ng2ListViewCRUDComponent;
}());
Ng2ListViewCRUDComponent.decorators = [
    { type: _angular_core.Component, args: [{
                template: "<div class=\"panel\"> <div class=\"panel-heading\" [style.background]=\"listView['color']\"> <i [class]=\"listView['icon']\" style=\"margin-right: 10px\"></i>{{listView['label']}} </div> <input type=\"text\" class=\"form-control searchBoxListView\" placeholder=\"Search....\" [(ngModel)]=\"search\" (keyup)=\"onChangeListener($event)\"> <div class=\"panel-body\"> <ul class=\"todo-list\"> <li *ngFor=\"let item of subData; index as i\" class=\"todo-list-item\" [id]=\"i\" > {{item}} <div class=\"pull-right action-buttons\"> <a href=\"javascript:void(0)\" (click)=\"onEditClickListener(i)\"><i class=\"fa fa-pencil fa-fw\"></i> </a> <a href=\"javascript:void(0)\" (click)=\"onDeleteClickListener(i)\"><i class=\"fa-fw fa fa-remove\"></i> </a> </div> </li> </ul> </div> <div class=\"panel-footer\"> <div class=\"input-group\"> <input type=\"text\" class=\"form-control input-md\" placeholder=\"Add\" [(ngModel)]=\"value\"> <span class=\"input-group-btn\"> <button class=\"btn btn-success btn-md\" id=\"btn-todo\" (click)=\"onAddClickListener()\">{{opType}}</button> </span> </div> </div> </div> ",
                selector: 'ng2-listview-crud',
                styles: [".selected { background: bisque; } /*Todo List Widget*/ .todo-list-item .glyphicon { margin-right: 5px; color: #9fadbb; } .todo-list-item .glyphicon:hover { margin-right: 5px; color: #1b3548; } .todo-list { padding: 0; margin: -15px; background: #fff; color: #5f6468; } #checkbox { margin: 0; } .todo-list .checkbox { display: inline-block; margin: 0px; } .panel-body input[type=checkbox]:checked + label { text-decoration: line-through; color: #777; } .todo-list-item { list-style: none; line-height: 0.9; padding: 14px 15px 8px 15px; } .todo-list-item:hover, a.todo-list-item:focus { text-decoration: none; background-color: #f6f6f6; } .todo-list-item .trash .glyph:hover { color: #ef4040; } .searchBoxListView { border-radius: 0px; } ul li a { text-decoration: none; } ul li div { display: none; } ul li:hover div { display: inline; } "]
            },] },
];
/**
 * @nocollapse
 */
Ng2ListViewCRUDComponent.ctorParameters = function () { return []; };
Ng2ListViewCRUDComponent.propDecorators = {
    'listView': [{ type: _angular_core.Input, args: ['properties',] },],
    'items': [{ type: _angular_core.Input, args: ['data',] },],
};

var Ng2ListViewCRUD = (function () {
    function Ng2ListViewCRUD() {
    }
    return Ng2ListViewCRUD;
}());
Ng2ListViewCRUD.decorators = [
    { type: _angular_core.NgModule, args: [{
                imports: [
                    _angular_common.CommonModule, _angular_forms.FormsModule, _angular_forms.ReactiveFormsModule,
                ],
                declarations: [
                    Ng2ListViewCRUDComponent
                ],
                exports: [
                    Ng2ListViewCRUDComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
Ng2ListViewCRUD.ctorParameters = function () { return []; };

exports.Ng2ListViewCRUD = Ng2ListViewCRUD;

Object.defineProperty(exports, '__esModule', { value: true });

})));
