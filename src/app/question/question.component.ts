import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder, } from '@angular/forms';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questionForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    // this.createForm();
  }

  // createForm() {
  //   this.questionForm = this.fb.group({
  //      question: [ ],
  //      answer: [ ]
  //     })
  //   }
  // values: any[]= [];
  // public lists: any[] = [{
  //   answer_1:'', 
  // }];

public questions: any[] = [{
    question:'', 
    answers : [{
      answer : "",
    }]
}];

  add(ind){
      // this.lists.push({
      // id: this.lists.length + 1 , 
      // answer_1:'',     
      // })
      this.questions[ind].answers.push({
        answer : "",
      })
    
  }
  delete (i: number,ind){
   this.questions[ind].answers.splice(i, 1);
  }
  addQuestion(){
     
        this.questions.push({
          // id: this.questions.length + 1 , 
          question:'',    
          answers : [{
            answer : "",
          }] 
          })
     
  }
  submit(){
     console.log(this.questions);
  }

  

  ngOnInit(): void {
  }

}
