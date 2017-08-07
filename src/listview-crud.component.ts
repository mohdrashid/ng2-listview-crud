/**
 * Created by mohma on 7/27/2017.
 */
import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {NgFor} from "@angular/common";
import { Ng2ListViewCRUDProperty} from "./listview-crud";
declare let $:any;


@Component({
  templateUrl:'./listview-crud.component.html',
  selector:'ng2-listview-crud',
  styleUrls: ['./listview-crud.scss']
})

export class Ng2ListViewCRUDComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.subData=this.items;
  }
  public value:string="";
  public search:string="";
  public opType:string="Add";
  @Input('properties') properties:Ng2ListViewCRUDProperty;

  @Input('data') items:Array<any>;

  public subData:Array<any>;

  public selectedIndex:number;
  public path;

  constructor(){

  }

  ngOnInit(){
    this.properties.icon+=" fa-fw";
    this.subData=this.items;
    this.path="";
    for(let i=0;i<this.properties.path.length;i++) {
      this.path+=this.properties.path[i];
      if(i!==this.properties.path.length-1){
        this.path+=".";
      }
    }

  }

  ngAfterViewInit() {
    let self=this;
    $('ul.ng2-listview').on('click','li', function() {
      $('.selected').removeClass('selected');
      if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
      }
      else {
        self.selectedIndex=$(this).attr('id');
        $(this).addClass('selected');
        self.properties.onSelect(self.items[self.selectedIndex]);
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
      let data:any=lhs;
      if(self.properties.dataIsObject)
      {
        if(!lhs[self.properties.path[0]])
          return false;
        data=lhs[self.properties.path[0]];
        for(let i=1;i<self.properties.path.length;i++){
          if(data[self.properties.path[i]])
            data=data[self.properties.path[i]];
          else{
            return false;
          }
        }
      }
      return data.match(self.search);
    });
    this.subData=result;

  }



  changeJSONValue(obj, path, newValue):void{
    let parts = path.split('.');
    while(parts.length > 1 && (obj = obj[parts.shift()])){};
    obj[parts.shift()] = newValue;
    return obj;
  }

  getJSONValue(obj):string{
    if(!obj[this.properties.path[0]])
      return "Not Available";
    let data:any=obj[this.properties.path[0]];
    for(let i=1;i<this.properties.path.length;i++){
      if(!data[this.properties.path[i]])
        return "Not Available";
      data=data[this.properties.path[i]];
    }
    return data;
  }

  append(value):any{
    let data=value;
    if(this.properties.dataIsObject){
      data="";
      let closing="";
      for(let i=0;i<this.properties.path.length;i++){
        data+="{\"";
        data+=this.properties.path[i]+"\":";
        closing+="}";
      }
      data+=('"'+value+'"'+closing);
      try{
        data=JSON.parse(data);
      }
      catch (e){
        throw e;
      }
    }
    this.items.push(data);
    return data;
  }

  onAddClickListener() {
    if(this.value.length!==0&&this.opType==="Add"){
      if(this.properties.onAdd&&this.properties.onAdd(this.append(this.value))){
        this.value="";
      }
      else{
        console.log("Function onAdd not found");
      }
    }
    else if(this.value.length!==0&&this.opType==="Edit"){
      if(this.properties.onAdd&&this.properties.onUpdate(this.items[this.selectedIndex],this.value)){
        if(!this.properties.dataIsObject){
          this.items[this.selectedIndex]=this.value;
        }
        else{
          this.changeJSONValue(this.items[this.selectedIndex], this.path, this.value);
        }

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
    if(!this.properties.dataIsObject)
      this.value=this.items[this.selectedIndex];
    else{
      let data:any=this.items[this.selectedIndex][this.properties.path[0]];
      for(let i=1;i<this.properties.path.length;i++) {
        if (!data[this.properties.path[i]]){
          return null;
        }
        data=data[this.properties.path[i]];
      }
      this.value=data;
    }
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

  getData(item){
    if(!this.properties.dataIsObject){
      return item;
    }
    return this.getJSONValue(item)
  }

}
