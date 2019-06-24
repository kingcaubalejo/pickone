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
//   students = [
//     { 'Student_ID': 0, 'Student_Name': "bali-os, liezel joyce n." },
//     { 'Student_ID': 1, 'Student_Name': "bolivar, princess" },
//     { 'Student_ID': 2, 'Student_Name': "butlig, reziel r." },
//     { 'Student_ID': 3, 'Student_Name': "caravana, leo jomar t." },
//     { 'Student_ID': 4, 'Student_Name': "catanauan, gabriel paolo t." },
//     { 'Student_ID': 5, 'Student_Name': "dela cruz, lydon" },
//     { 'Student_ID': 6, 'Student_Name': "elarmo, jonelle g." },
//     { 'Student_ID': 7, 'Student_Name': "macaya, rosella p." },
//     { 'Student_ID': 8, 'Student_Name': "sarmiento, marikon d." },
//     { 'Student_ID': 9, 'Student_Name': "silawan, joven erick f." },
//     { 'Student_ID': 10, 'Student_Name': "sumang, liberty g." },
//     { 'Student_ID': 11, 'Student_Name': "surban, kathleen" },
//     { 'Student_ID': 12, 'Student_Name': "villanueva, melanie b." },
//     { 'Student_ID': 13, 'Student_Name': "villareal, ma. jessa" }
// ];

  // display: String = document.getElementById("display_name").innerHTML;

  constructor() { }

  ngOnInit() {
    console.log($("#master_list"), "jqueque");
    this.uploader.onProgressItem = (progress: any) => { 
      console.log(progress['progress']); }; 
    this.uploader.onSuccessItem = (progress: any) => { 
      console.log('I receive the response file posted in API'); 
    };
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
    
    var self            = this;
    let total: number   = self.students.length;
    let selected        = Math.floor(Math.random() * total);
    let i: number       = 0;
    var table_tbody     = "";
    
    $("#tbody_called_list").empty();
    
    console.log(this.students, "TEST");
    // document.getElementById("display_name").innerHTML = "";
    for (i=0; i<total; i++) {
      setTimeout((function(i){
          return function(){
              document.getElementById("display_name").innerHTML = self.students[i].Student_Name.toUpperCase();
              
              if(i === selected ) {
                self.called_students.push(self.students[i].Student_Name);
                var el = document.getElementById("display_name");
                el.innerHTML              = self.students[i].Student_Name.toUpperCase();
                el.style.fontWeight       = 'bold';
                firstEl.style.color       = "black";
                el.style.fontSize         = '2em';

                for(var j = 0; j < self.called_students.length; j++) {
                  table_tbody += "<tr>";
                    table_tbody += "<td>"+self.called_students[j].toUpperCase()+"</td>";
                  table_tbody += "</tr>";
                }
                $("#tbody_called_list").append(table_tbody);

                //animate it!
                el.className += "animated ";
                el.className += "infinite ";
                el.className += "fadeIn";
                console.log("Animate runs");
                console.log(self.called_students, "Called");
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
    let file: FileList = event.target.files;
    var self = this;
    if(file) {
      let f: File = file[0];
      let fileReader: FileReader = new FileReader();

      $("#tbody_master_list").empty();

      fileReader.onload = (e) => {
        console.log(self.students, "LUMA");
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i) {
          arr[i] = String.fromCharCode(data[i]);
        }
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, {type:"binary"});
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];

        var names = XLSX.utils.sheet_to_json(worksheet,{raw:true})
        var table_tbody = "";
        for(var i = 0; i < names.length; i++) {
          // console.log(names[i]["Name"], "test");
          table_tbody += "<tr>";
            table_tbody += "<td>"+names[i]["Student_Name"].toUpperCase()+"</td>";
          table_tbody += "</tr>";
        }

        setTimeout(function() {
          console.log("START");
          console.log($("#tbody_master_list"));
          $("#tbody_master_list").append(table_tbody);
          console.log("END");

          self.students = names;
          console.log(self.students, "NEW STUDENT");
        }, 1000);
        // console.log(names, "TEST1");
      }
      fileReader.readAsArrayBuffer(f);
    }
    console.log("TEST", file);
  }
}
