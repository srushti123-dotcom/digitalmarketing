import { ContactUsService } from './contact-us.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-ContactUs',
    templateUrl: './ContactUs.component.html',
    styleUrls:['./ContactUs.component.css']
})

export class ContactUSComponent implements OnInit {
    constructor(
        private ContactUsService: ContactUsService
    ) { }

    ngOnInit() { }
}