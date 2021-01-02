import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'bm-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.css']
})
export class FormMessagesComponent implements OnInit {

  @Input() control: AbstractControl = {} as AbstractControl;

  @Input() controlName = '';


  private allMessages: { [key: string]: any } = {
    title: {
      required: 'Ein Buchtitel muss angegeben werden.'
    }, 
    isbn: {
      required: 'Es muss eine ISBN angegeben werden.',
      minlength: 'Die ISBN muss mindestens 10 Zeichen haben.',
      maxlength: 'Die ISBN darf hoechstens 13 Zeichen haben.'
    },
    published: {
      required: 'Es muss ein Erscheinungsdatum angegeben werden.'
    },
    authors: {
      required: 'Es muss ein Autor angegeben werden.'
    }
};

  constructor() { }

  ngOnInit(): void {
  }

  errorsForControl(): string[] {
    const messages = this.allMessages[this.controlName];
    if(
      !this.control ||
      !this.control.errors ||
      !messages ||
      !this.control.dirty
    ) { return new Array; }

    return Object.keys(this.control.errors)
      .map(err => messages[err]);
  }

}