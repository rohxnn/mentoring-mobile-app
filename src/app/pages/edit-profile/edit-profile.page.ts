import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  DynamicFormComponent,
  JsonFormData,
} from 'src/app/shared/components/dynamic-form/dynamic-form.component';
import { FormService } from 'src/app/core/services/form/form.service';
import * as _ from 'lodash-es';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { EDIT_PROFILE_FORM } from 'src/app/core/constants/formConstant';
import {
  AttachmentService,
  LoaderService,
  LocalStorageService,
  ToastService,
  UtilService,
} from 'src/app/core/services';
import { localKeys } from 'src/app/core/constants/localStorage.keys';
import { urlConstants } from 'src/app/core/constants/urlConstants';
import { AlertController, Platform } from '@ionic/angular';
import { isDeactivatable } from 'src/app/core/guards/canDeactive/deactive.guard';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonRoutes } from 'src/global.routes';
import { PlatformLocation, Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit, isDeactivatable {
  private win: any = window;
  updated: boolean;
  @ViewChild('form1') form1: DynamicFormComponent;
  profileImageData: any = {
    type: 'profile',
  };
  public headerConfig: any = {
    backButton: true,
    label: 'PROFILE_DETAILS',
    notification: false,
  };
  path;
  localImage;
  showForm: any = false;
  userDetails: any;
  entityNames: any;
  entityList: any;
  formData: any;
  redirectUrl: any;
  constructor(
    private form: FormService,
    private api: HttpService,
    private profileService: ProfileService,
    private localStorage: LocalStorageService,
    private attachment: AttachmentService,
    private changeDetRef: ChangeDetectorRef,
    private loaderService: LoaderService,
    private alert: AlertController,
    private translate: TranslateService,
    private toast: ToastService,
    private utilService: UtilService,
    private router: Router,
    private platformLocation: PlatformLocation,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
  }

  ionViewWillEnter() {
    if(this.userDetails?.profile_mandatory_fields?.length || !this.userDetails?.about){
      history.pushState(null, '', location.href);
      this.platformLocation.onPopState(()=>{
      history.pushState(null, '', location.href)
    })
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.redirectUrl = params.redirectUrl;
    });
  }
  async ngOnInit() {
    this.userDetails = await this.localStorage.getLocalData(localKeys.USER_DETAILS);
    const response =  {
    "type": "editProfile",
    "sub_type": "editProfileForm",
    "action": "update",
    "data": {
      "templateName": "defaultTemplate",
      "fields": {
        "controls": [
          {
              "name": "name",
              "label": "Your name",
              "value": "Agastya",
              "class": "ion-no-margin",
              "type": "text",
              "position": "floating",
              "placeHolder": "Please enter your full name",
              "errorMessage": {
                  "required": "Enter your name",
                  "pattern": "This field can only contain alphabets"
              },
              "validators": {
                  "required": true,
                  "pattern": "^[^0-9!@#%$&()\\-`.+,/\"]*$"
              },
              "options": [],
              "meta": {
                  "showValidationError": true,
                  "maxLength": 255
              }
          },
          {
              "name": "designation",
              "label": "Designation",
              "class": "ion-no-margin",
              "value": [
                  {
                      "label": "Cluster officials",
                      "value": "co"
                  },
                  {
                      "label": "District education officer",
                      "value": "deo"
                  }
              ],
              "type": "chip",
              "position": "",
              "disabled": false,
              "errorMessage": {
                  "required": "Enter your designation"
              },
              "validators": {
                  "required": true
              },
              "options": [
                  {
                      "label": "Block education officer",
                      "value": "beo"
                  },
                  {
                      "label": "Cluster officials",
                      "value": "co"
                  },
                  {
                      "label": "District education officer",
                      "value": "deo"
                  },
                  {
                      "label": "Head master",
                      "value": "hm"
                  },
                  {
                      "label": "Teacher",
                      "value": "te"
                  }
              ],
              "meta": {
                  "entityType": "designation",
                  "addNewPopupHeader": "Add a designation",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": true,
                      "addChipLabel": "Other"
                  },
                  "errorLabel": "Designation"
              },
              "multiple": true
          },
          {
              "name": "experience",
              "label": "Your experience in years",
              "value": "3",
              "class": "ion-no-margin",
              "type": "text",
              "position": "floating",
              "placeHolder": "Ex. 5 years",
              "errorMessage": {
                  "required": "Enter your experience in years"
              },
              "isNumberOnly": false,
              "validators": {
                  "required": false,
                  "maxLength": 2
              },
              "options": []
          },
          {
              "name": "about",
              "label": "Tell us about yourself",
              "value": "QA",
              "class": "ion-no-margin",
              "type": "textarea",
              "position": "floating",
              "errorMessage": {
                  "required": "This field cannot be empty",
                  "pattern": "This field can only contain alphanumeric characters"
              },
              "placeHolder": "Please use only 150 characters",
              "validators": {
                  "required": false,
                  "maxLength": 150,
                  "pattern": "^[a-zA-Z0-9-.,s ]+$"
              },
              "options": []
          },
          {
              "name": "area_of_expertise",
              "label": "Your expertise",
              "class": "ion-no-margin",
              "value": [
                  {
                      "label": "Educational leadership",
                      "value": "educational_leadership"
                  }
              ],
              "type": "chip",
              "position": "",
              "disabled": false,
              "errorMessage": {
                  "required": "Enter your expertise"
              },
              "validators": {
                  "required": false
              },
              "options": [
                  {
                      "label": "Communication",
                      "value": "communication"
                  },
                  {
                      "label": "Educational leadership",
                      "value": "educational_leadership"
                  },
                  {
                      "label": "Professional development",
                      "value": "professional_development"
                  },
                  {
                      "label": "School process",
                      "value": "school_process"
                  },
                  {
                      "label": "SQAA",
                      "value": "sqaa"
                  }
              ],
              "meta": {
                  "entityType": "area_of_expertise",
                  "addNewPopupHeader": "Add your expertise",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": true,
                      "addChipLabel": "Other"
                  },
                  "errorLabel": "Expertise",
                  "addChipLabel": "Add"
              },
              "multiple": true
          },
          {
              "name": "education_qualification",
              "label": "Education qualification",
              "value": "BBA",
              "class": "ion-no-margin",
              "type": "text",
              "position": "floating",
              "errorMessage": {
                  "required": "Enter education qualification",
                  "pattern": "This field can only contain alphanumeric characters"
              },
              "placeHolder": "Ex. BA, B.ED",
              "validators": {
                  "required": false,
                  "maxLength": 255,
                  "pattern": "^[a-zA-Z0-9-.,s ]+$"
              },
              "options": [],
              "meta": {
                  "errorLabel": "Education qualification"
              }
          },
          {
              "name": "languages",
              "label": "Languages",
              "class": "ion-no-margin",
              "value": [
                  {
                      "label": "English",
                      "value": "en_in"
                  }
              ],
              "type": "chip",
              "position": "",
              "disabled": false,
              "errorMessage": {
                  "required": "Enter language"
              },
              "validators": {
                  "required": true
              },
              "options": [
                  {
                      "label": "English",
                      "value": "en_in"
                  },
                  {
                      "label": "Hindi",
                      "value": "hi"
                  }
              ],
              "meta": {
                  "entityType": "languages",
                  "addNewPopupHeader": "Add new language",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": true,
                      "addChipLabel": ""
                  },
                  "errorLabel": "Medium"
              },
              "multiple": true
          },
          {
              "name": "state",
              "label": "State",
              "class": "ion-no-margin",
              "value": [],
              "type": "text",
              "position": "",
              "disabled": true,
              "errorMessage": {
                  "required": "Enter state"
              },
              "validators": {
                  "required": true
              },
              "options": [],
              "meta": {
                  "entityType": "state",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": false,
                      "addChipLabel": ""
                  },
                  "errorLabel": "State"
              },
              "multiple": false
          },
          {
              "name": "district",
              "label": "District",
              "class": "ion-no-margin",
              "value": [],
              "type": "text",
              "position": "",
              "disabled": true,
              "errorMessage": {
                  "required": "Enter district"
              },
              "validators": {
                  "required": true
              },
              "options": [],
              "meta": {
                  "entityType": "district",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": false,
                      "addChipLabel": ""
                  },
                  "errorLabel": "district"
              },
              "multiple": false
          },
          {
              "name": "block",
              "label": "Block",
              "class": "ion-no-margin",
              "value": [],
              "type": "text",
              "position": "",
              "disabled": true,
              "errorMessage": {
                  "required": "Enter block"
              },
              "validators": {
                  "required": true
              },
              "options": [],
              "meta": {
                  "entityType": "block",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": false,
                      "addChipLabel": ""
                  },
                  "errorLabel": "block"
              },
              "multiple": false
          },
          {
              "name": "cluster",
              "label": "Cluster",
              "class": "ion-no-margin",
              "value": [],
              "type": "text",
              "position": "",
              "disabled": true,
              "errorMessage": {
                  "required": "Enter cluster"
              },
              "validators": {
                  "required": true
              },
              "options": [],
              "meta": {
                  "entityType": "cluster",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": false,
                      "addChipLabel": ""
                  },
                  "errorLabel": "cluster"
              },
              "multiple": false
          },
          {
              "name": "school",
              "label": "School",
              "class": "ion-no-margin",
              "value": [],
              "type": "text",
              "position": "",
              "disabled": true,
              "errorMessage": {
                  "required": "Enter school"
              },
              "validators": {
                  "required": true
              },
              "options": [],
              "meta": {
                  "entityType": "school",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": false,
                      "addChipLabel": ""
                  },
                  "errorLabel": "school"
              },
              "multiple": false
          },
          {
              "name": "professional_role",
              "label": "Professional role",
              "class": "ion-no-margin",
              "value": [],
              "type": "text",
              "position": "",
              "disabled": true,
              "errorMessage": {
                  "required": "Enter professional role"
              },
              "validators": {
                  "required": true
              },
              "options": [],
              "meta": {
                  "entityType": "professional_role",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": false,
                      "addChipLabel": ""
                  },
                  "errorLabel": "professional role"
              },
              "multiple": false
          },
          {
              "name": "professional_subroles",
              "label": "Professional subrole",
              "class": "ion-no-margin",
              "value": [],
              "type": "chip",
              "position": "",
              "disabled": true,
              "errorMessage": {
                  "required": "Enter professional subrole"
              },
              "validators": {
                  "required": true
              },
              "options": [],
              "meta": {
                  "entityType": "professional_subroles",
                  "showSelectAll": true,
                  "showAddOption": {
                      "showAddButton": false,
                      "addChipLabel": ""
                  },
                  "errorLabel": "professional subrole"
              },
              "multiple": true
          }
      ]
      }
    }
  };
    this.profileImageData.isUploaded = true;
    this.formData = _.get(response, 'data.fields');
    const entityNames = await this.form.getEntityNames(this.formData);
    this.entityNames = await this.updateEntityArray(this.userDetails?.profile_mandatory_fields, entityNames);
    this.entityList = await this.form.getEntities(this.entityNames, 'PROFILE');
    this.formData = await this.form.populateEntity(this.formData, this.entityList)
    this.changeDetRef.detectChanges();
    if (this.userDetails) {
      this.profileImageData.image = this.userDetails.image;
      this.profileService.prefillData(this.userDetails, this.entityNames, this.formData);
      this.showForm = true;
    }
    if(this.userDetails?.profile_mandatory_fields?.length || !this.userDetails?.about){
    this.headerConfig.backButton = false;
    let msg = {
        header: 'SETUP_PROFILE',
        message: 'SETUP_PROFILE_MESSAGE',
        cancel: "CONTINUE"
        }
        this.utilService.profileUpdatePopup(msg)
    }else{
        this.headerConfig.backButton = true;
    }

        console.log(this.formData, 'form')
  }

  async canPageLeave() {
    if(!this.updated) {
      let texts: any;
      this.translate
        .get(['PROFILE_FORM_UNSAVED_DATA', 'DONOT_SAVE', 'SAVE', 'PROFILE_EXIT_HEADER_LABEL', 'SETUP_PROFILE','SETUP_PROFILE_MESSAGE', 'CONTINUE'])
        .subscribe((text) => {
          texts = text;
        });
        let header = this.userDetails?.profile_mandatory_fields?.length ? texts['SETUP_PROFILE'] : texts['PROFILE_EXIT_HEADER_LABEL'];
      const alert = await this.alert.create({
        header: this.userDetails?.profile_mandatory_fields?.length ? texts['SETUP_PROFILE'] : texts['PROFILE_EXIT_HEADER_LABEL'] , 
        message: this.userDetails?.profile_mandatory_fields?.length ? texts['SETUP_PROFILE_MESSAGE'] : texts['PROFILE_FORM_UNSAVED_DATA'],
        buttons:  this.userDetails?.profile_mandatory_fields?.length ? [ {
          text: texts['CONTINUE'],
          role: 'cancel',
          cssClass: 'alert-button-red',
          handler: () => { },
        }] : [
          {
            text: texts['DONOT_SAVE'],
            cssClass: 'alert-button-bg-white',
            role: 'exit',
            handler: () => { },
          },
          {
            text: texts['SAVE'],
            role: 'cancel',
            cssClass: 'alert-button-red',
            handler: () => { },
          },
        ],
      });
      if (this.form1 && !this.form1.myForm.pristine || !this.profileImageData.isUploaded) {
      await alert.present();
      let data = await alert.onDidDismiss();
      if (data.role == 'exit' && this.headerConfig.backButton) {
        return true;
      }
      return false;
    } else {
      if(this.headerConfig.backButton === false) {
        await alert.present();
        return false;
      }
      return true;
    }
    }
  }

  async onSubmit() {
    this.form1.onSubmit();
    if (this.form1.myForm.valid) {
      if (this.profileImageData.image && !this.profileImageData.isUploaded) {
        this.getImageUploadUrl(this.localImage);
      } else {
        const form = Object.assign({}, this.form1.myForm.value);
        _.forEach(this.entityNames, (entityKey) => {
          let control = this.formData.controls.find(obj => 
          obj.name === entityKey
          );  
            if (['state', 'cluster', 'block', 'district', 'school', 'professional_role'].includes(entityKey)) {
              form[entityKey] = control.value?.value || '';
            } else if (entityKey === 'professional_subroles' && Array.isArray(control.value)) {
              form[entityKey] = control.value.map(item => item.value);
            } else {
            form[entityKey] = control.multiple ? _.map(form[entityKey], 'value') : form[entityKey];
            }
        });

       
          if (form.about === '') {
          form.about = 'NA';
          }
         console.log(form)
        this.form1.myForm.markAsPristine();
        
        console.log(this.form1.myForm, 'form')
        
        this.updated = await this.profileService.profileUpdate(form);
        this.userDetails.profile_mandatory_fields =[];
        if(this.updated && this.redirectUrl){ 
          this.router.navigate([this.redirectUrl], { replaceUrl: true })
        }else{
        this.router.navigate([`/${CommonRoutes.TABS}/${CommonRoutes.HOME}`], { replaceUrl: true });
        }
      }
    } else {
      this.toast.showToast('Please fill all the mandatory fields', 'danger');
    }
  }

  resetForm() {
    this.form1.reset();
  }
  removeCurrentPhoto(event) {
    this.form1.myForm.value.image = '';
    this.profileImageData.image = '';
    this.form1.myForm.markAsDirty();
    this.profileImageData.isUploaded = true;
  }
  async imageUploadEvent(event) {
    this.localImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (file: any) => {
      this.profileImageData.image = file.target.result
      this.profileImageData.isUploaded = false;
      this.profileImageData.haveValidationError = true;
    }
  }
  upload(data, uploadUrl) {
    return this.attachment.cloudImageUpload(data, uploadUrl).pipe(
      map((resp => {
        this.profileImageData.image = uploadUrl.destFilePath;
        this.form1.myForm.value.image = uploadUrl.destFilePath;
        this.profileImageData.isUploaded = true;
        this.onSubmit();
      })))
  }
  async getImageUploadUrl(file) {
    this.loaderService.startLoader();
    let config = {
      url: urlConstants.API_URLS.GET_FILE_UPLOAD_URL + file.name.replace(/[^A-Z0-9]+/ig, "_").toLowerCase()
    }
    let data: any = await this.api.get(config);
    return this.upload(file, data.result).subscribe()
  }

  updateEntityArray(arr1: string[], arr2: string[]) {
    arr1.forEach(value => {
      if (!arr2.includes(value)) {
        arr2.push(value);
      }
    });
    return arr2
  }
}
