/**
 *
 * SugarCRM Community Edition is a customer relationship management program developed by
 * SugarCRM, Inc. Copyright (C) 2004-2013 SugarCRM Inc.
 *
 * SuiteCRM is an extension to SugarCRM Community Edition developed by SalesAgility Ltd.
 * Copyright (C) 2011 - 2017 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SUGARCRM, SUGARCRM DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 *
 * You can contact SugarCRM, Inc. headquarters at 10050 North Wolfe Road,
 * SW2-130, Cupertino, CA 95014, USA. or at email address contact@sugarcrm.com.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * SugarCRM" logo and "Supercharged by SuiteCRM" logo. If the display of the logos is not
 * reasonably feasible for technical reasons, the Appropriate Legal Notices must
 * display the words "Powered by SugarCRM" and "Supercharged by SuiteCRM".
 */
SugarClass.inherit("SugarWidgetListView","SugarClass");function SugarWidgetListView(){this.init();}
SugarWidgetListView.prototype.init=function(){}
SugarWidgetListView.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetListView.prototype.display=function(){if(typeof GLOBAL_REGISTRY['result_list']=='undefined'){this.display_loading();return;}
var div=document.getElementById('list_div_win');div.style.display='block';var html='<table width="100%" cellpadding="0" cellspacing="0" border="0" class="list view">';html+='<tr>';html+='<th width="2%" nowrap="nowrap">&nbsp;</th>';html+='<th width="20%" nowrap="nowrap">'+GLOBAL_REGISTRY['meeting_strings']['LBL_NAME']+'</th>';html+='<th width="20%" nowrap="nowrap">'+GLOBAL_REGISTRY['meeting_strings']['LBL_EMAIL']+'</th>';html+='<th width="20%" nowrap="nowrap">'+GLOBAL_REGISTRY['meeting_strings']['LBL_PHONE']+'</th>';html+='<th width="18%" nowrap="nowrap">&nbsp;</th>';html+='</tr>';for(var i=0;i<GLOBAL_REGISTRY['result_list'].length;i++){var bean=GLOBAL_REGISTRY['result_list'][i];var disabled=false;var className='evenListRowS1';if(typeof(GLOBAL_REGISTRY.focus.users_arr_hash[bean.fields.id])!='undefined'){disabled=true;}
if((i%2)==0){className='oddListRowS1';}else{className='evenListRowS1';}
if(typeof(bean.fields.first_name)=='undefined'){bean.fields.first_name='';}
if(typeof(bean.fields.email1)=='undefined'||bean.fields.email1==""){bean.fields.email1='&nbsp;';}
if(typeof(bean.fields.phone_work)=='undefined'||bean.fields.phone_work==""){bean.fields.phone_work='&nbsp;';}
html+='<tr class="'+className+'">';html+='<td><span class="suitepicon suitepicon-module-'+bean.module.toLowerCase().replace('_','-')+'"></span></td>';html+='<td>'+bean.fields.full_name+'</td>';html+='<td>'+bean.fields.email1+'</td>';html+='<td>'+bean.fields.phone_work+'</td>';html+='<td align="right">';hidden='visible';if(!disabled){}
html+='<input type="button" id="invitees_add_'+(i+1)+'" class="button" onclick="this.disabled=true;SugarWidgetSchedulerAttendees.form_add_attendee('+i+');" value="'+GLOBAL_REGISTRY['meeting_strings']['LBL_ADD_BUTTON']+'"/ style="visibility: '+hidden+'"/>';html+='</td>';html+='</tr>';}
html+='</table>';div.innerHTML=html;}
SugarWidgetListView.prototype.display_loading=function(){}
SugarClass.inherit("SugarWidgetSchedulerSearch","SugarClass");function SugarWidgetSchedulerSearch(){this.init();}
SugarWidgetSchedulerSearch.prototype.init=function(){this.form_id='scheduler_search';GLOBAL_REGISTRY['widget_element_map']=new Object();GLOBAL_REGISTRY['widget_element_map'][this.form_id]=this;GLOBAL_REGISTRY.scheduler_search_obj=this;}
SugarWidgetSchedulerSearch.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetSchedulerSearch.submit=function(form){SugarWidgetSchedulerSearch.hideCreateForm();var conditions=new Array();if(form.search_first_name.value!=''){conditions[conditions.length]={"name":"first_name","op":"starts_with","value":form.search_first_name.value}}
if(form.search_last_name.value!=''){conditions[conditions.length]={"name":"last_name","op":"starts_with","value":form.search_last_name.value}}
if(form.search_email.value!=''){conditions[conditions.length]={"name":"email1","op":"starts_with","value":form.search_email.value}}
var query={"modules":["Users","Contacts"],"group":"and","field_list":['id','full_name','email1','phone_work'],"conditions":conditions};global_request_registry[req_count]=[this,'display'];req_id=global_rpcClient.call_method('query',query);global_request_registry[req_id]=[GLOBAL_REGISTRY['widget_element_map'][form.id],'refresh_list'];}
SugarWidgetSchedulerSearch.prototype.refresh_list=function(rslt){GLOBAL_REGISTRY['result_list']=rslt['list'];if(rslt['list'].length>0){this.list_view.display();document.getElementById('empty-search-message').style.display='none';}else{document.getElementById('list_div_win').style.display='none';document.getElementById('empty-search-message').style.display='';}}
SugarWidgetSchedulerSearch.prototype.display=function(){var html=document.createElement("div");html.setAttribute('class','schedulerInvitees');var h3=document.createElement("h3");h3.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_ADD_INVITEE'];html.appendChild(h3);var table1=document.createElement("table");table1.setAttribute('class','edit view');table1.setAttribute('border','0');table1.setAttribute('cellpadding','0');table1.setAttribute('cellspacing','0');table1.setAttribute('width','100%');var row1=table1.insertRow(0);var cell1=row1.insertCell(0);var form=document.createElement("form");form.setAttribute('name','schedulerwidget');form.setAttribute('id',this.form_id);form.setAttribute('onsubmit','SugarWidgetSchedulerSearch.submit(this);return false;');var table2=document.createElement("table");table2.setAttribute('border','0');table2.setAttribute('cellpadding','0');table2.setAttribute('cellspacing','0');table2.setAttribute('width','100%');var row2=table2.insertRow(0);var cell21=row2.insertCell(0);cell21.setAttribute('scope','col');cell21.setAttribute('nowrap','nowrap');var label1=document.createElement("label");label1.setAttribute('for','search_first_name');label1.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_FIRST_NAME']+':&nbsp;&nbsp;';cell21.appendChild(label1);var input1=document.createElement("input");input1.setAttribute('name','search_first_name');input1.setAttribute('id','search_first_name');input1.setAttribute('value','');input1.setAttribute('type','text');input1.setAttribute('size','10');cell21.appendChild(input1);var cell22=row2.insertCell(1);cell22.setAttribute('scope','col');cell22.setAttribute('nowrap','nowrap');var label2=document.createElement("label");label2.setAttribute('for','search_last_name');label2.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_LAST_NAME']+':&nbsp;&nbsp;';cell22.appendChild(label2);var input2=document.createElement("input");input2.setAttribute('name','search_last_name');input2.setAttribute('id','search_last_name');input2.setAttribute('value','');input2.setAttribute('type','text');input2.setAttribute('size','10');cell22.appendChild(input2);var cell23=row2.insertCell(2);cell23.setAttribute('scope','col');cell23.setAttribute('nowrap','nowrap');var label3=document.createElement("label");label3.setAttribute('for','search_email');label3.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_EMAIL']+':&nbsp;&nbsp;';cell23.appendChild(label3);var input3=document.createElement("input");input3.setAttribute('name','search_email');input3.setAttribute('id','search_email');input3.setAttribute('value','');input3.setAttribute('type','text');input3.setAttribute('size','10');cell23.appendChild(input3);var cell24=row2.insertCell(3);cell24.setAttribute('valign','center');var input3=document.createElement("input");input3.setAttribute('class','button');input3.setAttribute('id','invitees_search');input3.setAttribute('value',GLOBAL_REGISTRY['meeting_strings']['LBL_SEARCH_BUTTON']);input3.setAttribute('type','submit');cell24.appendChild(input3);form.appendChild(table2);cell1.appendChild(form);html.appendChild(table1);this.parentNode.appendChild(html);var div=document.createElement('div');div.setAttribute('id','list_div_win');div.style.overflow='auto';div.style.width='100%';div.style.height='100%';div.style.display='none';this.parentNode.appendChild(div);var create_invitees=document.createElement("div");create_invitees.setAttribute('id','create-invitees');create_invitees.setAttribute('style','margin-bottom: 10px;');var empty_search_message=document.createElement("div");empty_search_message.setAttribute('id','empty-search-message');empty_search_message.setAttribute('style','display: none;');empty_search_message.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_EMPTY_SEARCH_RESULT'];create_invitees.appendChild(empty_search_message);var h3=document.createElement("h3");h3.setAttribute('id','create-invitees-title');h3.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_CREATE_INVITEE'];create_invitees.appendChild(h3);var create_invitees_buttons=document.createElement("div");create_invitees_buttons.setAttribute('id','create-invitees-buttons');var button1=document.createElement("button");button1.setAttribute('id','create_invitee_as_contact');button1.setAttribute('type','button');button1.setAttribute('onclick','SugarWidgetSchedulerSearch.showCreateForm(\'Contacts\');');button1.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_CREATE_CONTACT'];create_invitees_buttons.appendChild(button1);create_invitees.appendChild(create_invitees_buttons);var create_invitee_edit=document.createElement("div");create_invitee_edit.setAttribute('id','create-invitee-edit');create_invitee_edit.setAttribute('style','display: none;');var form1=document.createElement("form");form1.setAttribute('name','createInviteeForm');form1.setAttribute('id','createInviteeForm');form1.setAttribute('onsubmit','SugarWidgetSchedulerSearch.createInvitee(this); return false;');var input4=document.createElement("input");input4.setAttribute('name','inviteeModule');input4.setAttribute('value','Contacts');input4.setAttribute('type','hidden');form1.appendChild(input4);var table3=document.createElement("table");table3.setAttribute('class','edit view');table3.setAttribute('cellpadding','0');table3.setAttribute('cellspacing','0');table3.setAttribute('style','width: 330px; margin-top: 2px;');var row3=table3.insertRow(0);var cell31=row3.insertCell(0);cell31.setAttribute('valign','top');cell31.setAttribute('width','33%');cell31.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_FIRST_NAME']+':';var cell32=row3.insertCell(1);cell32.setAttribute('valign','top');var input5=document.createElement("input");input5.setAttribute('name','first_name');input5.setAttribute('size','19');input5.setAttribute('type','text');cell32.appendChild(input5);var row4=table3.insertRow(1);var cell41=row4.insertCell(0);cell41.setAttribute('valign','top');cell41.setAttribute('width','33%');cell41.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_LAST_NAME']+':';var cell42=row4.insertCell(1);cell42.setAttribute('valign','top');var input6=document.createElement("input");input6.setAttribute('name','last_name');input6.setAttribute('size','19');input6.setAttribute('type','text');cell42.appendChild(input6);var row5=table3.insertRow(2);var cell51=row5.insertCell(0);cell51.setAttribute('valign','top');cell51.setAttribute('width','33%');cell51.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_EMAIL']+':';var cell52=row5.insertCell(1);cell52.setAttribute('valign','top');var input7=document.createElement("input");input7.setAttribute('name','email1');input7.setAttribute('size','19');input7.setAttribute('type','text');cell52.appendChild(input7);form1.appendChild(table3);var button3=document.createElement("button");button3.setAttribute('id','create-invitee-btn');button3.setAttribute('type','button');button3.setAttribute('onclick','SugarWidgetSchedulerSearch.createInvitee(this.form);');button3.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_CREATE_AND_ADD'];form1.appendChild(button3);var button4=document.createElement("button");button4.setAttribute('id','cancel-create-invitee-btn');button4.setAttribute('type','button');button4.setAttribute('onclick','SugarWidgetSchedulerSearch.hideCreateForm();');button4.innerHTML=GLOBAL_REGISTRY['meeting_strings']['LBL_CANCEL_CREATE_INVITEE'];form1.appendChild(button4);create_invitee_edit.appendChild(form1);create_invitees.appendChild(create_invitee_edit);this.parentNode.appendChild(create_invitees);addToValidate('createInviteeForm','last_name','last_name',true,GLOBAL_REGISTRY['meeting_strings']['LBL_LAST_NAME']);this.list_view=new SugarWidgetListView();this.list_view.load(div);}
SugarWidgetSchedulerSearch.showCreateForm=function(module){document.getElementById('create-invitee-edit').style.display='';document.getElementById('create-invitees-buttons').style.display='none';document.getElementById('list_div_win').style.display='none';document.forms['createInviteeForm'].elements['inviteeModule'].value=module;document.getElementById('empty-search-message').style.display='none';if(typeof document.createInviteeForm.first_name!='undefined'&&typeof document.schedulerwidget.search_first_name!='undefined')
document.createInviteeForm.first_name.value=document.schedulerwidget.search_first_name.value;if(typeof document.createInviteeForm.last_name!='undefined'&&typeof document.schedulerwidget.search_last_name!='undefined')
document.createInviteeForm.last_name.value=document.schedulerwidget.search_last_name.value;if(typeof document.createInviteeForm.email1!='undefined'&&typeof document.schedulerwidget.search_email!='undefined')
document.createInviteeForm.email1.value=document.schedulerwidget.search_email.value;}
SugarWidgetSchedulerSearch.hideCreateForm=function(module){document.getElementById('create-invitee-edit').style.display='none';document.getElementById('create-invitees-buttons').style.display='';document.forms['createInviteeForm'].reset();}
SugarWidgetSchedulerSearch.resetSearchForm=function(){if(GLOBAL_REGISTRY.scheduler_search_obj&&document.forms[GLOBAL_REGISTRY.scheduler_search_obj.form_id]){document.forms[GLOBAL_REGISTRY.scheduler_search_obj.form_id].reset();}}
SugarWidgetSchedulerSearch.createInvitee=function(form){if(!(check_form('createInviteeForm'))){return false;}
document.getElementById('create-invitee-btn').setAttribute('disabled','disabled');document.getElementById('cancel-create-invitee-btn').setAttribute('disabled','disabled');ajaxStatus.showStatus(SUGAR.language.get('app_strings','LBL_SAVING'));var callback={success:function(response){SUGAR.util.globalEval("e=("+response.responseText+")");var rObj=e;ajaxStatus.hideStatus();if(typeof rObj.noAccess!='undefined'){var alertMsg=GLOBAL_REGISTRY['meeting_strings']['LBL_NO_ACCESS'];alertMsg=alertMsg.replace("\$module",rObj.module);SugarWidgetSchedulerSearch.hideCreateForm();alert(alertMsg);return false;}
GLOBAL_REGISTRY.focus.users_arr[GLOBAL_REGISTRY.focus.users_arr.length]=rObj;GLOBAL_REGISTRY.scheduler_attendees_obj.display();SugarWidgetSchedulerSearch.hideCreateForm();SugarWidgetSchedulerSearch.resetSearchForm();document.getElementById('create-invitee-btn').removeAttribute('disabled');document.getElementById('cancel-create-invitee-btn').removeAttribute('disabled');}};var fieldList=['id','full_name','email1','phone_work'];var t=[];for(i in fieldList){t.push("fieldList[]="+encodeURIComponent(fieldList[i]));}
var postData=t.join("&");var url="index.php?module=Calendar&action=CreateInvitee&sugar_body_only=true";YAHOO.util.Connect.setForm(document.forms['createInviteeForm']);YAHOO.util.Connect.asyncRequest('POST',url,callback,postData);}
SugarClass.inherit("SugarWidgetScheduler","SugarClass");SugarWidgetScheduler.popupControl=null;SugarWidgetScheduler.popupControlDelayTime=600;SugarWidgetScheduler.mouseX=0;SugarWidgetScheduler.mouseY=0;SugarWidgetScheduler.isMouseOverToolTip=false;function SugarWidgetScheduler(){this.init();}
SugarWidgetScheduler.prototype.init=function(){}
SugarWidgetScheduler.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetScheduler.fill_invitees=function(form){for(var i=0;i<GLOBAL_REGISTRY.focus.users_arr.length;i++){if(GLOBAL_REGISTRY.focus.users_arr[i].module=='User'){form.user_invitees.value+=GLOBAL_REGISTRY.focus.users_arr[i].fields.id+",";}else if(GLOBAL_REGISTRY.focus.users_arr[i].module=='Contact'){form.contact_invitees.value+=GLOBAL_REGISTRY.focus.users_arr[i].fields.id+",";}}}
SugarWidgetScheduler.update_time=function(){var form_name;if(typeof document.EditView!='undefined')
form_name="EditView";else if(typeof document.CalendarEditView!='undefined')
form_name="CalendarEditView";else
return;if(typeof document.forms[form_name].date_start=='undefined')
return;var date_start=document.forms[form_name].date_start.value;if(date_start.length<16){return;}
var hour_start=parseInt(date_start.substring(11,13),10);var minute_start=parseInt(date_start.substring(14,16),10);var has_meridiem=/am|pm/i.test(date_start);if(has_meridiem){var meridiem=trim(date_start.substring(16));}
GLOBAL_REGISTRY.focus.fields.date_start=date_start;if(has_meridiem){GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start+meridiem;}else{GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start;}
GLOBAL_REGISTRY.focus.fields.duration_hours=document.forms[form_name].duration_hours.value;GLOBAL_REGISTRY.focus.fields.duration_minutes=document.forms[form_name].duration_minutes.value;GLOBAL_REGISTRY.focus.fields.datetime_start=SugarDateTime.mysql2jsDateTime(GLOBAL_REGISTRY.focus.fields.date_start,GLOBAL_REGISTRY.focus.fields.time_start);GLOBAL_REGISTRY.scheduler_attendees_obj.init();GLOBAL_REGISTRY.scheduler_attendees_obj.display();}
SugarWidgetScheduler.prototype.display=function(){this.parentNode.innerHTML='';var attendees=new SugarWidgetSchedulerAttendees();attendees.load(this.parentNode);var search=new SugarWidgetSchedulerSearch();search.load(this.parentNode);$('div#scheduler').append('<div id="SugarWidgetSchedulerPopup"></div>');YUI().use('overlay','event','widget-anim',function(Y){SugarWidgetScheduler.popupControl=new Y.Overlay({srcNode:"#SugarWidgetSchedulerPopup",visible:false,width:"50em"}).plug(Y.Plugin.WidgetAnim);SugarWidgetScheduler.popupControl.render();});$('div#SugarWidgetSchedulerPopup').hover(function(e){SugarWidgetScheduler.isMouseOverToolTip=true;},function(e){SugarWidgetScheduler.isMouseOverToolTip=false;SugarWidgetScheduler.popupControl.hide();});}
SugarWidgetScheduler.sortByStartdate=function(a,b){var dateA=new Date($('<div></div>').append(a).find('span[data-field=DATE_START]').attr('data-date'));var dateB=new Date($('<div></div>').append(b).find('span[data-field=DATE_START]').attr('data-date'));if(dateA<dateB){return-1;}
else if(dateA>dateB){return 1;}
return 0;}
SugarWidgetScheduler.sortByType=function(a,b){var valueA=$('<div></div>').append(a).find('input[id=type]').attr('value');var valueB=$('<div></div>').append(b).find('input[id=type]').attr('value');if(valueA==valueB){return 0;}
else if(valueB=='Meeting'){return 1;}
return 0;}
SugarWidgetScheduler.createDialog=function(elementId,body,caption,width,theme){caption=caption.replace(SUGAR.language.get('app_strings','LBL_ADDITIONAL_DETAILS'),'');$(".ui-dialog").find(".open").dialog("close");var $dialog=$('<div class="open"></div>').html(body).dialog({autoOpen:false,title:caption,width:width,height:250,position:{my:'right top',at:'left top',of:$(elementId)},open:function(){var closeBtn=$('.ui-dialog-titlebar-close');closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');}});$("a[title='Edit']").remove();$("a[title='View']").remove();var width=$dialog.dialog("option","width");var pos=$(elementId).offset({top:SugarWidgetScheduler.mouseY,left:SugarWidgetScheduler.mouseX});var ofWidth=$(elementId).width();if((pos.left+ofWidth)-40<width){$dialog.dialog("option","position",{my:'left top',at:'right top',of:$(elementId)});}
$dialog.dialog('open');$(".ui-dialog").appendTo("#content");var timeout=function(){setTimeout(function(){if($($dialog).is(":hover")){timeout();}else{$dialog.dialog('close');}},3000)};timeout();return $dialog;}
SugarWidgetScheduler.getScheduleDetails=function(beans,ids){var elementId='#SugarWidgetSchedulerPopup';var show_buttons=true;var caption='';var body=new Array();var width=300;var theme='';var $dialog=SugarWidgetScheduler.createDialog(elementId,body,caption,width,theme);var getScheduleItems=function(){var deffereds=[];$dialog.html(SUGAR.language.get('app_strings','LBL_LOADING'));body='';jQuery.each(ids,function(index,value){var url='index.php?to_pdf=1&module=Home&action=AdditionalDetailsRetrieve&bean='+beans[index]+'&id='+ids[index]+'&show_buttons=true';deffereds.push($.ajax(url).done(function(){}).fail(function(){}).always(function(){}));});return deffereds;}
var requests=getScheduleItems();$.when.apply(null,requests).done(function(){var containers=[];if(typeof arguments[0]==="string"){var oldArgs=arguments;arguments=new Array();arguments[0]=oldArgs;}
$.each(arguments,function(index,value){SUGAR.util.globalEval(value[0]);var container=result.body;containers.push(container);});containers.sort(SugarWidgetScheduler.sortByStartdate);containers.sort(SugarWidgetScheduler.sortByType);$dialog.html(containers);});}
SugarClass.inherit("SugarWidgetSchedulerAttendees","SugarClass");function SugarWidgetSchedulerAttendees(){this.init();}
SugarWidgetSchedulerAttendees.prototype.init=function(){var form_name;if(typeof document.EditView!='undefined')
form_name="EditView";else if(typeof document.CalendarEditView!='undefined')
form_name="CalendarEditView";else
return;GLOBAL_REGISTRY.scheduler_attendees_obj=this;var date_start=document.forms[form_name].date_start.value;var hour_start=parseInt(date_start.substring(11,13),10);var minute_start=parseInt(date_start.substring(14,16),10);var has_meridiem=/am|pm/i.test(date_start);if(has_meridiem){var meridiem=trim(date_start.substring(16));}
if(has_meridiem){GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start+meridiem;}else{GLOBAL_REGISTRY.focus.fields.time_start=hour_start+time_separator+minute_start;}
GLOBAL_REGISTRY.focus.fields.date_start=document.forms[form_name].date_start.value;GLOBAL_REGISTRY.focus.fields.duration_hours=document.forms[form_name].duration_hours.value;GLOBAL_REGISTRY.focus.fields.duration_minutes=document.forms[form_name].duration_minutes.value;GLOBAL_REGISTRY.focus.fields.datetime_start=SugarDateTime.mysql2jsDateTime(GLOBAL_REGISTRY.focus.fields.date_start,GLOBAL_REGISTRY.focus.fields.time_start);this.timeslots=new Array();this.hours=9;this.segments=4;this.start_hours_before=4;var minute_interval=15;var dtstart=GLOBAL_REGISTRY.focus.fields.datetime_start;var curdate=new Date(dtstart.getFullYear(),dtstart.getMonth(),dtstart.getDate(),dtstart.getHours()-this.start_hours_before,0);if(typeof(GLOBAL_REGISTRY.focus.fields.duration_minutes)=='undefined'){GLOBAL_REGISTRY.focus.fields.duration_minutes=0;}
GLOBAL_REGISTRY.focus.fields.datetime_end=new Date(dtstart.getFullYear(),dtstart.getMonth(),dtstart.getDate(),dtstart.getHours()+parseInt(GLOBAL_REGISTRY.focus.fields.duration_hours),dtstart.getMinutes()+parseInt(GLOBAL_REGISTRY.focus.fields.duration_minutes),0);var has_start=false;var has_end=false;for(i=0;i<this.hours*this.segments;i++){var hash=SugarDateTime.getUTCHash(curdate);var obj={"hash":hash,"date_obj":curdate};if(has_start==false&&GLOBAL_REGISTRY.focus.fields.datetime_start.getTime()<=curdate.getTime()){obj.is_start=true;has_start=true;}
if(has_end==false&&GLOBAL_REGISTRY.focus.fields.datetime_end.getTime()<=curdate.getTime()){obj.is_end=true;has_end=true;}
this.timeslots.push(obj);curdate=new Date(curdate.getFullYear(),curdate.getMonth(),curdate.getDate(),curdate.getHours(),curdate.getMinutes()+minute_interval);}
SugarWidgetSchedulerSearch.resetSearchForm();}
SugarWidgetSchedulerAttendees.prototype.load=function(parentNode){this.parentNode=parentNode;this.display();}
SugarWidgetSchedulerAttendees.prototype.display=function(){var form_name;if(typeof document.EditView!='undefined')
form_name="EditView";else if(typeof document.CalendarEditView!='undefined')
form_name="CalendarEditView";else
return;var dtstart=GLOBAL_REGISTRY.focus.fields.datetime_start;var top_date=SugarDateTime.getFormattedDate(dtstart);var html='<h2>'+GLOBAL_REGISTRY['meeting_strings']['LBL_SCHEDULING_FORM_TITLE']+'</h2><table id ="schedulerTable">';html+='</table>';if(this.parentNode.childNodes.length<1)
this.parentNode.innerHTML+='<div class="schedulerDiv">'+html+'</div>';else
this.parentNode.childNodes[0].innerHTML=html;var thetable="schedulerTable";if(typeof(GLOBAL_REGISTRY)=='undefined'){return;}
if((typeof(GLOBAL_REGISTRY.focus.users_arr)=='undefined'||GLOBAL_REGISTRY.focus.users_arr.length==0)&&document.forms[form_name].record.value==''&&typeof(GLOBAL_REGISTRY.FIRST_REMOVE)=='undefined'){GLOBAL_REGISTRY.focus.users_arr=[GLOBAL_REGISTRY.current_user];}
if(typeof GLOBAL_REGISTRY.focus.users_arr_hash=='undefined'){GLOBAL_REGISTRY.focus.users_arr_hash=new Object();}
for(var i=0;i<GLOBAL_REGISTRY.focus.users_arr.length;i++){var row=new SugarWidgetScheduleRow(this.timeslots);row.focus_bean=GLOBAL_REGISTRY.focus.users_arr[i];GLOBAL_REGISTRY.focus.users_arr_hash[GLOBAL_REGISTRY.focus.users_arr[i]['fields']['id']]=GLOBAL_REGISTRY.focus.users_arr[i];row.load(thetable);}}
SugarWidgetSchedulerAttendees.form_add_attendee=function(list_row){if(typeof(GLOBAL_REGISTRY.result_list[list_row])!='undefined'&&typeof(GLOBAL_REGISTRY.focus.users_arr_hash[GLOBAL_REGISTRY.result_list[list_row].fields.id])=='undefined'){GLOBAL_REGISTRY.focus.users_arr[GLOBAL_REGISTRY.focus.users_arr.length]=GLOBAL_REGISTRY.result_list[list_row];}
GLOBAL_REGISTRY.scheduler_attendees_obj.display();}
SugarClass.inherit("SugarWidgetScheduleRow","SugarClass");function SugarWidgetScheduleRow(timeslots){this.init(timeslots);}
SugarWidgetScheduleRow.prototype.init=function(timeslots){this.timeslots=timeslots;}
SugarWidgetScheduleRow.prototype.load=function(thetableid){this.thetableid=thetableid;var self=this;vcalClient=new SugarVCalClient();if(typeof(GLOBAL_REGISTRY['freebusy_adjusted'])=='undefined'||typeof(GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id])=='undefined'){global_request_registry[req_count]=[this,'display'];vcalClient.load(this.focus_bean.fields.id,req_count);req_count++;}else{this.display();}}
SugarWidgetScheduleRow.prototype.display=function(){SUGAR.util.doWhen("document.getElementById('"+this.thetableid+"') != null",function(){var tr;this.thetable=document.getElementById(this.thetableid);if(typeof(this.element)!='undefined'){if(this.element.parentNode!=null)
this.thetable.deleteRow(this.element.rowIndex);tr=document.createElement('tr');this.thetable.appendChild(tr);}else{tr=this.thetable.insertRow(this.thetable.rows.length);}
tr.className="schedulerAttendeeRow";$(tr).attr('data-id',this.focus_bean.fields.id);$(tr).attr('data-module',this.focus_bean.module+'s');td=document.createElement('td');tr.appendChild(td);td.scope='row';var img='<span class="suitepicon suitepicon-module-'+this.focus_bean.module.toLowerCase().replace('_','-')+'"></span>';td.innerHTML=img;td.innerHTML=td.innerHTML;if(this.focus_bean.fields.full_name)
td.innerHTML+=' '+this.focus_bean.fields.full_name;else
td.innerHTML+=' '+this.focus_bean.fields.name;this.add_freebusy_nodes(tr);var td=document.createElement('td');tr.appendChild(td);td.className='schedulerAttendeeDeleteCell';td.noWrap=true;td.innerHTML='<a title="'+GLOBAL_REGISTRY['meeting_strings']['LBL_REMOVE']
+'" class="listViewTdToolsS1" style="text-decoration:none;" '
+'href="javascript:SugarWidgetScheduleRow.deleteRow(\''+this.focus_bean.fields.id+'\');">&nbsp;'
+'<img src="index.php?entryPoint=getImage&themeName='+SUGAR.themes.theme_name+'&imageName=delete_inline.gif" '
+'align="absmiddle" alt="'+GLOBAL_REGISTRY['meeting_strings']['LBL_REMOVE']+'" border="0"> '
+GLOBAL_REGISTRY['meeting_strings']['LBL_REMOVE']+'</a>';this.element=tr;this.element_index=this.thetable.rows.length-1;},null,this);}
SugarWidgetScheduleRow.deleteRow=function(bean_id){for(var i=0;i<GLOBAL_REGISTRY.focus.users_arr.length;i++){if(GLOBAL_REGISTRY.focus.users_arr[i]['fields']['id']==bean_id){delete GLOBAL_REGISTRY.focus.users_arr_hash[GLOBAL_REGISTRY.focus.users_arr[i]['fields']['id']];GLOBAL_REGISTRY.focus.users_arr.splice(i,1);GLOBAL_REGISTRY.FIRST_REMOVE=true;GLOBAL_REGISTRY.container.root_widget.display();}}}
function DL_GetElementLeft(eElement){if(!eElement&&this){eElement=this;}
var nLeftPos=eElement.offsetLeft;var eParElement=eElement.offsetParent;while(eParElement!=null){nLeftPos+=eParElement.offsetLeft;eParElement=eParElement.offsetParent;}
return nLeftPos;}
function DL_GetElementTop(eElement){if(!eElement&&this){eElement=this;}
var nTopPos=eElement.offsetTop;var eParElement=eElement.offsetParent;while(eParElement!=null){nTopPos+=eParElement.offsetTop;eParElement=eParElement.offsetParent;}
return nTopPos;}
SugarWidgetScheduleRow.prototype.add_freebusy_nodes=function(tr,attendee){var hours=9;var segments=4;var html='';var is_loaded=false;if(typeof GLOBAL_REGISTRY['freebusy_adjusted']!='undefined'&&typeof GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id]!='undefined'){is_loaded=true;}
for(var i=0;i<this.timeslots.length;i++){var td=document.createElement('td');tr.appendChild(td);td.innerHTML='&nbsp;';td.style.borderLeft="0px solid #dddddd";td.style.borderRight="0px solid #dddddd";td.style.backgroundColor="transparent";if(typeof(this.timeslots[i]['is_start'])!='undefined'){td.className='schedulerSlotCellStartTime1';}
if(typeof(this.timeslots[i]['is_end'])!='undefined'){td.className='schedulerSlotCellEndTime1';}
if(is_loaded){if(typeof(GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id][this.timeslots[i].hash])!='undefined'){td.style.backgroundColor="#4D5EAA";var dataid='',module='';$.each(GLOBAL_REGISTRY['freebusy_adjusted'][this.focus_bean.fields.id][this.timeslots[i].hash]['records'],function(index,value){if(dataid=='')
dataid=index;else
dataid+=','+index;if(module=='')
module=value+'s';else
module+=','+value+'s';});$(td).attr('data-id',dataid);$(td).attr('data-module',module);if((dataid.split(',').length)>1){td.style.backgroundColor="#AA4D4D";}}}
$(td).hover(function(e){var domElement=$(this);if(domElement.css("background-color")||domElement.hasClass('schedulerSlotCellStartTime1')){if(domElement.attr('data-id')!=null){var id=domElement.attr('data-id').split(',');var module=domElement.attr('data-module').split(',');if(module=="undefined"||module==null){module='Meetings';}
setTimeout(function(){if($(domElement).is(":hover")){SugarWidgetScheduler.getScheduleDetails(module,id);}},SugarWidgetScheduler.popupControlDelayTime);}}},function(e){});}
$(tr).find('td').first().hover(function(e){var domElement=$(this);var module=domElement.closest('tr').attr('data-module').split(','),id=domElement.closest('tr').attr('data-id').split(',');if(id!='undefined'||id!=null){setTimeout(function(){if($(domElement).is(":hover")){SugarWidgetScheduler.getScheduleDetails(module,id);}},SugarWidgetScheduler.popupControlDelayTime);}},function(e){});}
$().ready(function(e){$(document).on("mousemove",function(event){SugarWidgetScheduler.mouseX=event.pageX;SugarWidgetScheduler.mouseY=event.pageY;});});