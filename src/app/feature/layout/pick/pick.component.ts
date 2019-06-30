import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import * as $ from 'jquery';
import * as XLSX from 'xlsx';
const { read, write, utils } = XLSX;

const URL = "https://evening-anchorage-3159.herokuapp.com/api";

@Component({
  selector: 'app-pick',
  templateUrl: './pick.component.html',
  styleUrls: ['./pick.component.scss']
})
export class PickComponent implements OnInit {

  @ViewChild('import_master_list') master_list
  students          = [];
  called_students   = [];

  constructor() { }

  ngOnInit() {
  }
  

  onShuffle(event: Event) {

    var firstEl = document.getElementById("display_name");
    if(firstEl.classList.contains("animated") && firstEl.classList.contains("infinite") && firstEl.classList.contains("fadeIn")) {
      firstEl.classList.remove("animated");
      firstEl.classList.remove("infinite");
      firstEl.classList.remove("fadeIn");
    }

    firstEl.innerHTML           = "Be ready, your name will be called randomly.";
    firstEl.style.color         = "black";
    firstEl.style.fontSize      = '1em';
    
    var self                    = this;
    let total: number           = self.students.length;
    let selected                = Math.floor(Math.random() * total);
    let i: number               = 0;
    var table_tbody_done        = "";
    
    $("#tbody_called_list").empty();
    console.log(self.students);
    for (i=0; i<total; i++) {
      setTimeout((function(i){
          return function(){
              document.getElementById("display_name").innerHTML = self.students[i].Student_Name.toUpperCase();
              
              if(i === selected ) {
                console.log(i);
                self.called_students.push(self.students[i].Student_Name);

                var el                    = document.getElementById("display_name");
                el.innerHTML              = self.students[i].Student_Name.toUpperCase();
                el.style.fontWeight       = 'bold';
                firstEl.style.color       = "black";
                el.style.fontSize         = '2em';

                //put the called student(s) in the Done table
                for(var j = 0; j < self.called_students.length; j++) {
                  table_tbody_done += "<tr style='display: block'>";
                    table_tbody_done += "<td class='has-text-centered' style='display: block'>"+self.called_students[j].toUpperCase()+"</td>";
                  table_tbody_done += "</tr>";
                }
                $("#tbody_called_list").append(table_tbody_done);

                //animate the selected name in the display
                el.className = "animated infinite fadeIn";

                self.students.splice(i, 1); 
              }
          };
      }(i)), i*50);

      if( i === selected ) {
          break;
      }
    }
  }

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  arrayBuffer: any;
  onUploadFiles(event) {
    let file: FileList      = event.target.files;
    var self                = this;

    if(file) {
      let f: File                   = file[0];
      let fileReader: FileReader    = new FileReader();

      $("#tbody_master_list").empty();

      fileReader.onload = (e) => {

        this.arrayBuffer      = fileReader.result;
        var data              = new Uint8Array(this.arrayBuffer);
        var arr               = new Array();
        
        for (var i = 0; i != data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }

        var bstr                = arr.join("");
        var workbook            = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name    = workbook.SheetNames[0];
        var worksheet           = workbook.Sheets[first_sheet_name];

        var names                     = XLSX.utils.sheet_to_json(worksheet,{raw:true})
        var table_tbody               = "";
        var table_tbody_importing     = "";

        table_tbody_importing += "<tr style='display: block;'>";
          table_tbody_importing += "<td class='has-text-danger' style='display: block;'>Importing...</td>";
        table_tbody_importing += "</tr>";
        $("#tbody_master_list").append(table_tbody_importing);

        for(var i = 0; i < names.length; i++) {
          table_tbody += "<tr style='display: block;'>";
            table_tbody += "<td style='display: block;'>"+names[i]["Student_Name"].toUpperCase()+"</td>";
          table_tbody += "</tr>";
        }

        let idleTime: number = 1000;
        setTimeout(function() {
          $("#tbody_master_list").empty();
          $("#tbody_master_list").append(table_tbody);
          self.students = names;
        }, idleTime);
      }
      fileReader.readAsArrayBuffer(f);
    }
  }
}
