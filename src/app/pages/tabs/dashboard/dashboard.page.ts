import * as _ from 'lodash';
import { BIG_NUMBER_DASHBOARD_FORM, DASHBOARD_TABLE_META_KEYS } from 'src/app/core/constants/formConstant';
import { HttpService, UtilService } from 'src/app/core/services';
import { FormService } from 'src/app/core/services/form/form.service';
import * as moment from 'moment';
import { urlConstants } from 'src/app/core/constants/urlConstants';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  sessions: any;
  filteredCards: any = [];
  bigNumbersConfig: any;
  startDate: moment.Moment;
  endDate: moment.Moment;
  data: any;
  dynamicFormControls: any[] = [];
  filteredFormData: any;
  bigNumberFormData =  {
        "mentee": {
          "ALL": {
            "bigNumbers": [
              {
                "Url": "total_number_of_sessions_attended",
                "data": [
                  {
                    "label": "TOTAL_PRIVATE_SESSIONS_ATTENDED",
                    "key": "private_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_PUBLIC_SESSIONS_ATTENDED",
                    "key": "public_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_SESSIONS_ATTENDED",
                    "key": "total_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_hours_of_learning",
                "data": [
                  {
                    "label": "TOTAL_HOURS_PRIVATE_LEARNING",
                    "key": "private_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_HOURS_PUBLIC_LEARNING",
                    "key": "public_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_HOURS_LEARNING",
                    "key": "total_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "private_session_enrolled": "PRIVATE_SESSION_ENROLLED",
                "backgroundColor": "#832215"
              },
              {
                "public_session_enrolled": "PUBLIC_SESSION_ENROLLED",
                "backgroundColor": "#b94a3b"
              },
              {
                "private_session_attended": "PRIVATE_SESSION_ATTENDED",
                "backgroundColor": "#999999"
              },
              {
                "public_session_attended": "PUBLIC_SESSION_ATTENDED",
                "backgroundColor": "#858585"
              }
            ]
          },
          "PUBLIC": {
            "bigNumbers": [
              {
                "Url": "total_number_of_sessions_attended",
                "data": [
                  {
                    "label": "TOTAL_SESSIONS_ATTENDED",
                    "key": "total_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_hours_of_learning",
                "data": [
                  {
                    "label": "TOTAL_HOURS_LEARNING",
                    "key": "total_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "public_session_enrolled": "SESSION_ENROLLED",
                "backgroundColor": "#832215"
              },
              {
                "public_session_attended": "SESSIONS_ATTENDED",
                "backgroundColor": "#999999"
              }
            ]
          },
          "PRIVATE": {
            "bigNumbers": [
              {
                "Url": "total_number_of_sessions_attended",
                "data": [
                  {
                    "label": "TOTAL_SESSIONS_ATTENDED",
                    "key": "total_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_hours_of_learning",
                "data": [
                  {
                    "label": "TOTAL_HOURS_LEARNING",
                    "key": "total_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "private_session_attended": "SESSIONS_CREATED_ASSIGNED",
                "backgroundColor": "#832215"
              },
              {
                "private_session_enrolled": "SESSIONS_CONDUCTED",
                "backgroundColor": "#999999"
              }
            ]
          },
          "form": {
            "controls": [
              {
                "label": "DURATION",
                "value": "duration",
                "type": "select",
                "defaultValue": "month",
                "entities": [
                  {
                    "label": "This week",
                    "value": "week"
                  },
                  {
                    "label": "This month",
                    "value": "month"
                  },
                  {
                    "label": "This quarter",
                    "value": "quarter"
                  }
                ]
              },
              {
                "label": "TYPE",
                "value": "type",
                "type": "select",
                "defaultValue": "ALL",
                "entities": []
              },
              {
                "label": "CATEGORIES",
                "value": "categories",
                "type": "select",
                "defaultValue": "",
                "isMultiple": true,
                "entities": []
              }
            ]
          },
          "chartUrl": "",

          "report_code": "split_of_sessions_enrolled_and_attended_by_user",
          "table_report_code": "mentee_session_details",
          "tableUrl": "",
          "tableTitle": "SESSIONS_DETAILS",
          "headers": ""
        },
        "mentor": {
          "ALL": {
            "bigNumbers": [
              {
                "Url": "total_number_of_sessions_conducted",
                "data": [
                  {
                    "label": "TOTAL_PRIVATE_SESSIONS_CONDUCTED",
                    "key": "private_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_PUBLIC_SESSIONS_CONDUCTED",
                    "key": "public_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_SESSIONS_CONDUCTED",
                    "key": "total_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_hours_of_mentoring_conducted",
                "data": [
                  {
                    "label": "TOTAL_PRIVATE_MENTORING_CONDUCTED",
                    "key": "private_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_PUBLIC_MENTORING_CONDUCTED",
                    "key": "public_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_MENTORING_CONDUCTED",
                    "key": "total_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "private_sessions_created": "PRIVATE_SESSIONS_CREATED_ASSIGNED",
                "backgroundColor": "#832215"
              },
              {
                "public_sessions_created": "PUBLIC_SESSIONS_CREATED_ASSIGNED",
                "backgroundColor": "#b94a3b"
              },
              {
                "private_sessions_conducted": "PRIVATE_SESSIONS_CONDUCTED",
                "backgroundColor": "#999999"
              },
              {
                "public_sessions_conducted": "PUBLIC_SESSIONS_CONDUCTED",
                "backgroundColor": "#858585"
              }
            ]
          },
          "PUBLIC": {
            "bigNumbers": [
              {
                "Url": "total_hours_of_mentoring_conducted",
                "data": [
                  {
                    "label": "TOTAL_MENTORING_CONDUCTED",
                    "key": "public_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_number_of_sessions_conducted",
                "data": [
                  {
                    "label": "TOTAL_SESSIONS_CONDUCTED",
                    "key": "public_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "public_sessions_created": "SESSIONS_CREATED_ASSIGNED",
                "backgroundColor": "#832215"
              },
              {
                "public_sessions_conducted": "SESSIONS_CONDUCTED",
                "backgroundColor": "#999999"
              }
            ]
          },
          "PRIVATE": {
            "bigNumbers": [
              {
                "Url": "total_hours_of_mentoring_conducted",
                "data": [
                  {
                    "label": "TOTAL_MENTORING_CONDUCTED",
                    "key": "private_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_number_of_sessions_conducted",
                "data": [
                  {
                    "label": "TOTAL_SESSIONS_CONDUCTED",
                    "key": "private_count",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "private_sessions_created": "SESSIONS_CREATED_ASSIGNED",
                "backgroundColor": "#832215"
              },
              {
                "private_sessions_conducted": "SESSIONS_CONDUCTED",
                "backgroundColor": "#999999"
              }
            ]
          },
          "form": {
            "controls": [
              {
                "label": "DURATION",
                "value": "duration",
                "type": "select",
                "defaultValue": "month",
                "entities": [
                  {
                    "label": "This week",
                    "value": "week"
                  },
                  {
                    "label": "This month",
                    "value": "month"
                  },
                  {
                    "label": "This quarter",
                    "value": "quarter"
                  }
                ]
              },
              {
                "label": "TYPE",
                "value": "type",
                "type": "select",
                "defaultValue": "ALL",
                "entities": []
              },
              {
                "label": "CATEGORIES",
                "value": "categories",
                "type": "select",
                "defaultValue": "",
                "isMultiple": true,
                "entities": []
              }
            ]
          },
          "chartUrl": "",
          "tableConfig": [
            {
            "report_code": "split_of_sessions_conducted",
            "table_report_code": "mentoring_session_details",
            "tableUrl": "",
            "tableTitle": "MENTORING_SESSION_DETAILS",
            },
            {
            "report_code": "split_of_sessions_conducted",
            "table_report_code": "mentoring_session_details",
            "tableUrl": "",
            "tableTitle": "MENTORING_SESSION_DETAILS",
            }
          ],
         
          "headers": ""
        },
        "session_manager": {
          "ALL": {
            "bigNumbers": [
              {
                "Url": "total_number_of_hours_of_mentoring_conducted",
                "data": [
                  {
                    "label": "TOTAL_PRIVATE_MENTORING_CONDUCTED",
                    "key": "private_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_PUBLIC_MENTORING_CONDUCTED",
                    "key": "public_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_MENTORING_CONDUCTED",
                    "key": "total_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_hours_of_sessions_created_by_session_manager",
                "data": [
                  {
                    "label": "TOTAL_PRIVATE_SESSIONS_CRETED_BY_SM",
                    "key": "total_private_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_PUBLIC_SESSIONS_CRETED_BY_SM",
                    "key": "total_public_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  },
                  {
                    "label": "TOTAL_SESSIONS_CRETED_BY_SM",
                    "key": "total_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "private_sessions_created": "PRIVATE_SESSIONS_CREATED",
                "backgroundColor": "#832215"
              },
              {
                "public_sessions_created": "PUBLIC_SESSIONS_CREATED",
                "backgroundColor": "#b94a3b"
              },
              {
                "private_sessions_conducted": "PRIVATE_SESSIONS_CONDUCTED",
                "backgroundColor": "#999999"
              },
              {
                "public_sessions_conducted": "PUBLIC_SESSIONS_CONDUCTED",
                "backgroundColor": "#858585"
              }
            ]
          },
          "PUBLIC": {
            "bigNumbers": [
              {
                "Url": "total_number_of_hours_of_mentoring_conducted",
                "data": [
                  {
                    "label": "TOTAL_PUBLIC_MENTORING_CONDUCTED",
                    "key": "public_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_hours_of_sessions_created_by_session_manager",
                "data": [
                  {
                    "label": "TOTAL_PUBLIC_SESSIONS_CRETED_BY_SM",
                    "key": "total_public_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "public_sessions_created": "SESSIONS_CREATED_ASSIGNED",
                "backgroundColor": "#832215"
              },
              {
                "public_sessions_conducted": "SESSIONS_CONDUCTED",
                "backgroundColor": "#999999"
              }
            ]
          },
          "PRIVATE": {
            "bigNumbers": [
              {
                "Url": "total_number_of_hours_of_mentoring_conducted",
                "data": [
                  {
                    "label": "TOTAL_PRIVATE_MENTORING_CONDUCTED",
                    "key": "private_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              },
              {
                "Url": "total_hours_of_sessions_created_by_session_manager",
                "data": [
                  {
                    "label": "TOTAL_PRIVATE_SESSIONS_CRETED_BY_SM",
                    "key": "total_private_hours",
                    "value": "0",
                    "Meta": {
                      "color": "#fff",
                      "background": "#ccc",
                      "textAlign": ""
                    }
                  }
                ]
              }
            ],
            "chartConfig": [
              {
                "private_sessions_created": "SESSIONS_CREATED_ASSIGNED",
                "backgroundColor": "#832215"
              },
              {
                "private_sessions_conducted": "SESSIONS_CONDUCTED",
                "backgroundColor": "#999999"
              }
            ]
          },
          "form": {
            "controls": [
              {
                "label": "DURATION",
                "value": "duration",
                "type": "select",
                "defaultValue": "month",
                "entities": [
                  {
                    "label": "This week",
                    "value": "week"
                  },
                  {
                    "label": "This month",
                    "value": "month"
                  },
                  {
                    "label": "This quarter",
                    "value": "quarter"
                  }
                ]
              },
              {
                "label": "TYPE",
                "value": "type",
                "type": "select",
                "defaultValue": "ALL",
                "entities": []
              },
              {
                "label": "CATEGORIES",
                "value": "categories",
                "type": "select",
                "defaultValue": "",
                "isMultiple": true,
                "entities": []
              }
            ]
          },
          "chartUrl": "",
          "report_code": "split_of_sessions_created_and_conducted",
          "table_report_code": "session_manger_session_details",
          "tableUrl": "",
          "tableTitle": "MENTORING_SESSION_DETAILS",
          "headers": ""
        }
      };
  result: any;
  selectedRole: any;
  report_code: any;
  session_type: any = 'ALL';
  filterType: any = 'session';
  selectedDuration: any = 'month';
  endDateEpoch: number;
  startDateEpoch: number;
  entityTypes: any = null;
  tableDataDownload: boolean = false;
  loading: boolean = false;
  chartData: any;
  completeDashboardForms: any;
  chartCreationJson: any;
  isMentor: boolean;
  segment: string;
  dataAvailable: boolean;
  chart: any;
  labels = [];
  groupBy: any;
  chartBody: any = {};
  chartBodyConfig :any= {}
  chartBodyPayload: any;
  translatedChartConfig : any;
  metaKeys =DASHBOARD_TABLE_META_KEYS

  constructor(
    private profile: ProfileService,
    private apiService: HttpService,
    private form: FormService,
    public translate: TranslateService,
    private utilService: UtilService) { }

  
  ionViewWillEnter() {
    this.isMentor = this.profile.isMentor;
    this.segment = this.isMentor ? "mentor" : "mentee";
    this.dataAvailable = true;
  }

  async ngOnInit() {
    this.result = await this.reportFilterListApi();
    this.user = await this.getUserRole(this.result);
    // const bigNumberResult = await this.form.getForm(BIG_NUMBER_DASHBOARD_FORM);
    // this.bigNumberFormData = _.get(bigNumberResult, 'data.fields');
    console.log(this.bigNumberFormData, 'bigNumberResult');
    this.filteredCards = !this.filteredCards.length ? this.bigNumberFormData[this.user[0]] : [];
    this.selectedRole = this.user[0];
    this.filteredFormData = this.bigNumberFormData[this.selectedRole] || [];
    this.updateFormData(this.result);
    this.session_type = 'ALL';
    this.chartBodyConfig = this.filteredFormData;
    this.chartBody = this.chartBodyConfig;
    console.log(this.chartBody, 'chartBody');
    await this.getTranslatedLabel();
    if(this.user){
      this.initialDuration();
    }
}

  public headerConfig: any = {
    menu: true,
    label: 'DASHBOARD_PAGE',
    headerColor: 'primary',
  };
  async downloadData() {
    this.tableDataDownload = true;
  }

  async initialDuration(){
    const today = moment();
    this.startDate = today.clone().startOf('month').add(1, 'second');
    this.endDate = today.clone().endOf('month');
    this.groupBy = 'day';
    const startDateEpoch = this.startDate ? this.startDate.unix() : null;
    const endDateEpoch = this.endDate ? this.endDate.unix() : null;
    this.startDateEpoch = startDateEpoch;
    this.endDateEpoch = endDateEpoch;
    this.prepareTableUrl();
    this.prepareChartUrl();
    if( this.filteredCards){
      this.bigNumberCount();
    }
  }

  async calculateDuration(){
    const today = moment();
    const firstDayOfYear = moment().startOf('year');
    const lastDayOfYear = moment().endOf('year');
  
    switch (this.selectedDuration) {
      case 'week':
        this.startDate = today.clone().startOf('week').add(1, 'second');
        this.endDate = today.clone().endOf('week');
        this.groupBy = 'day';
        break;
      case 'month':
        this.startDate = today.clone().startOf('month').add(1, 'second');
        this.endDate = today.clone().endOf('month');
        this.groupBy = 'day';
        break;
      case 'quarter':
        this.startDate = today.clone().startOf('quarter').add(1, 'second');
        this.endDate = today.clone().endOf('quarter');
        this.groupBy = 'month';
        console.log(this.startDate, 'start date', this.endDate, 'end date', today, 'todayy')
        break;
      case 'year':
        this.startDate = firstDayOfYear.clone().date(1).add(1, 'second');
        this.endDate = lastDayOfYear.clone();
        this.groupBy = 'month';
        break;
      default:
        this.startDate = null;
        this.endDate = null;
    }

   
    const startDateEpoch = this.startDate ? this.startDate.unix() : null;
    const endDateEpoch = this.endDate ? this.endDate.unix() : null;
    this.startDateEpoch = startDateEpoch;
    this.endDateEpoch = endDateEpoch;
      setTimeout(() => {
       this.bigNumberCount();
       this.prepareChartUrl();
      },100);
  }

  async handleRoleChange(e) {
    this.selectedRole = e.detail.value;
    this.session_type = 'ALL';
    this.selectedDuration = 'month';
    this.filteredFormData = this.bigNumberFormData[this.selectedRole] || [];
    console.log(this.filteredFormData, 'filteredFormData');
    this.filteredCards = this.filteredFormData|| [];
    this.chartBodyConfig = this.filteredCards;
    this.chartBody  = this.chartBodyConfig;
    await this.getTranslatedLabel();
    if(this.filteredCards){
      this.bigNumberCount();
    }
   
    this.updateFormData(this.result);
    this.chartBodyConfig = await this.filteredFormData;
    this.chartBody = this.chartBodyConfig;
    console.log(this.chartBody, 'chartBody');
    this.calculateDuration();
    setTimeout(() => { 
      this.prepareChartUrl();
      this.prepareTableUrl();
      },100)
  }

  async bigNumberCount(){
    for (let element of this.filteredCards[this.session_type].bigNumbers) {
      this.report_code = element.Url;
      element.data.forEach(async (el:any) => {
        let value   =  await this.preparedUrl(el.value);
        if(value){
          el.value = value[el.key] || 0;
        }
      })
    }
  }
  

  handleFormControlChange(value: any,event: any) {
    if(value === 'duration'){
      this.selectedDuration = event.detail.value ? event.detail.value : null;
      this.calculateDuration();
    }else if(value === 'type'){
      this.session_type = event.detail.value ? event.detail.value : null;
    }else{
      if(!this.entityTypes){
        this.entityTypes = {};
      }
      if(event.detail.value.length){
        this.entityTypes[value] = event.detail.value;
      }else{
        delete this.entityTypes[value];
      }
    }
   
    this.bigNumberCount();
    setTimeout(() => {  
    this.prepareChartUrl();
    },100)
  }

  async updateFormData(formData){
      const roleData = this.bigNumberFormData[this.selectedRole];
      const firstObject = this.transformData(roleData, formData);
      this.dynamicFormControls = firstObject.form.controls;
  }
  
  getTranslatedLabel() {
    const rawConfig = this.chartBody?.[this.session_type]?.chartConfig;
    if (rawConfig) {
      this.translatedChartConfig = rawConfig.map(item => {
        const key = Object.keys(item).find(k => k !== 'backgroundColor')!; // get the dynamic key
        const translationKey = item[key];
        return {
          [key]: this.translate.instant(translationKey),
          backgroundColor: item.backgroundColor
        };
      });
    }
    for (const key in DASHBOARD_TABLE_META_KEYS) {
      if (DASHBOARD_TABLE_META_KEYS.hasOwnProperty(key)) {
        this.metaKeys[key] = this.translate.instant(DASHBOARD_TABLE_META_KEYS[key]);
        console.log(this.metaKeys[key], 'metaKeys');
      }
    }
  }
  
  transformData(firstObj: any, secondObj: any): any {
    const updatedFirstObj = JSON.parse(JSON.stringify(firstObj));
    updatedFirstObj.form.controls = updatedFirstObj.form.controls.map((control: any) => {
      const matchingEntityType = secondObj.entityTypes.find(
        (entityType) => entityType.value === control.value
    );
      if (matchingEntityType) {
        return {
            ...control,
            entities: matchingEntityType.entities || [],
            type: 'select',
            label: matchingEntityType.label,
          };
      }
      return control
    });

    return updatedFirstObj;
  }

  async reportFilterListApi() {
    const config = {
      url: urlConstants.API_URLS.DASHBOARD_REPORT_FILTER + 'filter_type=' + this.filterType + '&' + 'report_filter=' + true,
      payload: {},
    };
    try {
      let data: any = await this.apiService.get(config);
      return data.result
    }
    catch (error) {
    }
  }

  async reportData(url, body?){
    const config = {
      url: url,
      payload: body,
    };
    try {
      let data: any = await this.apiService.post(config);
      return data.result
    }
    catch (error) {
    }
  }
  getUserRole(userDetails) {
    var roles = userDetails.roles.map(function(item) {
      return item['title'];
    });
    if (!roles.includes("mentee")) {
      roles.unshift("mentee");
    }
    return roles
  }

  calculateStepSize(maxDataValue) {
    return Math.ceil(maxDataValue / 5);
  }



  async preparedUrl(value?) {
    const queryParams = `&report_role=${this.selectedRole}` +
      `&session_type=${this.session_type}` +
      `&start_date=${this.startDateEpoch || ''}` +
      `&end_date=${this.endDateEpoch || ''}` +
      `&group_by=${this.groupBy}`;
    const params = `${urlConstants.API_URLS.DASHBOARD_REPORT_DATA}` +
      `report_code=${this.report_code}${queryParams}`;
    this.chartBodyPayload =  this.entityTypes ? { entityTypes: this.entityTypes}: {};
    console.log(this.chartBodyPayload, 'chartBodyPayload');
    const resp = await this.reportData(params, this.chartBodyPayload);
    if (value) {
      return resp.data;
    }
  }
  async prepareTableUrl() {
    const queryParams = `&report_role=${this.selectedRole}` +
      `&start_date=${this.startDateEpoch || ''}` +
      `&session_type=${this.session_type}` +
      `&end_date=${this.endDateEpoch || ''}`;

    if (Array.isArray(this.chartBody.tableConfig)) {
      this.chartBody.tableConfig.forEach((item: any) => {
        const r_code = item.table_report_code;
        item.tableUrl = `${environment.baseUrl}${urlConstants.API_URLS.DASHBOARD_REPORT_DATA}report_code=${r_code}${queryParams}`;
      });
    }

    this.chartBody.headers = await this.apiService.setHeaders();
  }
  async prepareChartUrl(){
    this.chartBody.chartUrl ="";
    this.chartBodyPayload = "";
    const queryParams = `&report_role=${this.selectedRole}` +
    `&session_type=${this.session_type}` +
    `&start_date=${this.startDateEpoch || ''}` +
    `&end_date=${this.endDateEpoch || ''}` +
    `&group_by=${this.groupBy}`;
  this.chartBody.chartUrl = this.chartBodyConfig.chartUrl;
  this.chartBodyPayload = this.entityTypes ? { entityTypes: this.entityTypes} : {};
  setTimeout(() => {
  this.chartBody.chartUrl = `${environment.baseUrl}${urlConstants.API_URLS.DASHBOARD_REPORT_DATA}` + 'report_code='+ this.chartBody.report_code + queryParams;
  }, 10);

  }

 downloadCSV(data: { url: string; fileName: string }) {
    let fileName = data.fileName?.toLowerCase().endsWith('.csv')
      ? data.fileName.slice(0, -4)
      : data.fileName;
    console.log(data.url, "104 --->", fileName);
    this.utilService.parseAndDownloadCSV(data.url, fileName + ".csv");
  }
}

