/**
 * Created by mohma on 7/27/2017.
 */
import {Component, Input} from "@angular/core";
import {NgFor} from "@angular/common";
import { Ng2ListViewCRUDProperty} from "./listview-crud";
declare let $:any;


@Component({
  templateUrl:'listview-crud.component.html',
  selector:'ng2-listview-crud',
  styleUrls: ['./listview-crud.scss']
})

export class Ng2ListViewCRUDComponent {
  public value:string="";
  public search:string="";
  public opType:string="Add";
  @Input('properties') properties:Ng2ListViewCRUDProperty;

  @Input('data') items:Array<any>=[
    "Hello Worlds"
  ];

  public subData:Array<any>;

  public selectedIndex:number;

  constructor(){

  }

  ngOnInit(){
    this.properties.icon+=" fa-fw";
    this.subData=this.items;

  }

  ngAfterViewInit() {
    let self=this;
    $('ul').on('click','li', function() {
      $('.selected').removeClass('selected');
      if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
      }
      else {
        self.selectedIndex=$(this).attr('id');
        $(this).addClass('selected');
        self.properties.onSelect($(this).val());
      }
    });
  }


  onChangeListener($event){
    let self=this;
    if(this.search===""){
      this.subData=this.items;
      return;
    }
    this.properties.onSearchChange(self.search)
    let result=this.items.filter(function(lhs){
      return lhs.match(self.search);
    });
    this.subData=result;

  }

  append(value){
    this.items.push(value)
  }

  onAddClickListener() {
    if(this.value.length!==0&&this.opType==="Add"){
      if(this.properties.onAdd&&this.properties.onAdd(this.value)){
        this.append(this.value);
        this.value="";
      }
      else{
        console.log("Function onAdd not found");
      }
    }
    else if(this.value.length!==0&&this.opType==="Edit"){
      if(this.properties.onAdd&&this.properties.onUpdate(this.value)){
        this.items[this.selectedIndex]=this.value;
        this.value="";
        this.opType="Add";
      }
      else{
        console.log("Function onEdit not found");
      }
    }
  }

  onEditClickListener(index){
    this.selectedIndex=index;
    this.value=this.items[this.selectedIndex];
    this.opType="Edit";
  }

  delete(index){
    this.items.splice(index,1);
  }

  get(index){
    return this.items[index];
  }

  onDeleteClickListener(index){
    this.selectedIndex=index;
    if(this.properties.onDelete&&this.properties.onDelete(this.get(this.selectedIndex))){
      this.delete(this.selectedIndex);
    }
  }

}
