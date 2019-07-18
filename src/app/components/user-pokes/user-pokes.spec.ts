import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IonicModule, ModalController, NavParams} from '@ionic/angular';

import {ApiServiceMock, CameraListServiceMock, NavParamsMock} from '../../../mocks';

import {AddCameraModal} from './user-pokes';
import {CameraListService} from '../../services/camera.list.service';
import {ApiService} from '../../services/api.service';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

describe('AddCameraModal', () => {

    let component: AddCameraModal;
    let fixture: ComponentFixture<AddCameraModal>;

    const formBuilder: FormBuilder = new FormBuilder();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddCameraModal],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                IonicModule
            ],
            providers: [
                {provide: ModalController},
                {provide: CameraListService, useClass: CameraListServiceMock},
                {provide: ApiService, useClass: ApiServiceMock},
                {provide: NavParams, useClass: NavParamsMock},
                {provide: FormBuilder, useValue: formBuilder},
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddCameraModal);
        component = fixture.componentInstance;

        component.createForm = formBuilder.group({
            name: new FormControl('', Validators.required),
            login: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
            url: new FormControl('', Validators.required),
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
