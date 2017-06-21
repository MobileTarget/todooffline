/********* controllers ***********/
DomenowApp.controller('TodoCtrl', function($scope, $state, $timeout, $interval,
		$ionicScrollDelegate, $ionicPopup, $http,
		$templateRequest, $localStorage, $q, $window, 
		myService, utilityService, HttpService, BluemixService,
		Task, dbService,
		Socket, Chat) {
	var isIOS = ionic.Platform.isIOS();

	$scope.config = {
		page_id:		2,
		from_page_id:	1,
		task_id:		"2_0",
		edit_task_id:	"",
		task_name:		"Categories",
		child_task_id:	"",
	};
	//$scope.api_url = "https://platform.mybluemix.net"; 
  $scope.api_url = "https://live-platformapp.mybluemix.net";
	$scope.sort = {
		order:	"asc",
		key:	"name"
	};
	
	$scope.user = {};
	$scope.data = {};
	$scope.html = "";
	
	$scope.init = function() {
		var parser = $window.location;
		if(parser.search) {
			var search_url = utilityService.getJsonFromUrl(parser);
			console.log("search url params>>>", search_url);
			if(typeof search_url.page_id != "undefined") {
				$scope.config.page_id = parseInt(search_url.page_id);
			}
		}
		//$localStorage.access_token = "1495637591157.urd92aeugq1if6r";
		//$localStorage.user_id = "2c7e2220cb312aebfbe1b283d45d35db";
		console.log('access_token>>> ' + $localStorage.access_token);
		console.log('user_id>>> ' + $localStorage.user_id);
		console.log('offline_queue>>> ' + $localStorage.offline_queue);
		//dbService.doSync();
		
		$scope.is_test = true;
		$scope.is_test = false;
		$scope.is_template = true;
		$scope.is_template = false;
    
		if($scope.is_template){
			$scope.loadTemplate();
		}
		else {
			if(!$localStorage.access_token){
				console.log("go to login page>>>");
				$scope.config.page_id = 1;
				$scope.config.from_page_id = 0;
				$scope.goPage($scope.config.page_id);
			}
			else {
				$scope.goPage($scope.config.page_id);
			}
			$scope.updateGetUserTask();
		}
	};
	//
	$scope.getPageDetail = function() {
		var detailData = myService.getDetail();
		//console.log("get detail>>>", detailData);
		var myDetail = [];
		for (var ind = 0; ind<detailData.length; ind++) {
			var item = detailData[ind];
			var temp = {
				"id":		item._id,
				"name":		item.user_incoming.message,
				"page_id":	item.to_page_id,
				"active":	item.count.active,
				"unread":	item.count.unread
			};
			myDetail.push(temp);
		}
		$scope.details = myDetail;
		$scope.sort.order = ($scope.sort.order == "asc")?"desc":"asc";
		$scope.sortDetail();
	};
	$scope.setConfig = function() {
		var task_info = myService.getTaskInfo();
		if(task_info.from_page_id) {
			$scope.config.from_page_id = task_info.from_page_id;
		}
		$scope.config.task_id = task_info.task_id;
		$scope.config.task_name = task_info.task_name;
		$scope.config.child_task_id = task_info.child_task_id;
		console.log("$scope.config>>>" + JSON.stringify($scope.config));
		
		$scope.title = $scope.config.task_name;
		var user_info = myService.getUserInfo();
		if(typeof user_info != "undefined"
				&& typeof user_info.type !== "undefined"
				&& typeof user_info.type.admin !== "undefined"
				&& user_info.type.admin == "admin") {
			$scope.isAdmin = true;
		}
		else {
			$scope.isAdmin = false;
		}
		$scope.getPageDetail();
	};
  
	$scope.setPage = function() {
		$scope.setConfig();
		var header_html = myService.getTemplateHtml("header");
		var detail_html = myService.getTemplateHtml("detail");
		var footer_html = myService.getTemplateHtml("footer");
		$scope.html = header_html + detail_html + footer_html;
		var js_template = myService.getTemplateJs();
    
		if (!$scope.$$phase){
			$scope.$apply();
		}
		
    eval(js_template);
    
		utilityService.setBusy(false);
	};
  
	$scope.goPage = function(page_id) {
    if(page_id === 1){
      $timeout(function(){
        myService.apiResult = {
          page_id : 1,
          status  : 1 ,
          task    : {
            task_name : "Login",
            task_id   : "1_0",
            parent_id : "0",
            from_page_id : 0,
            date_created: "2017-03-15T10:29:39.453Z",
            child_task_id: null,
            template: {
              detail: {
                _id: "1_d",
                _rev: "17-c132016369c9335f48ffde72c4716c67",
                js:	"",
                name: "Login Form",
                table:"template",
                html: '<ion-content padding="true"><div class="login-container"><h1 style="text-align:center;">{{title}}</h1><ion-list><div class="row responsive-xs"><div class="col"><label class="item item-input item-select" style="min-height:46px;"><select name="countryCode" ng-model="user.country_code"><option data-countryCode="GB" value="44">UK (+44)</option><option data-countryCode="US" value="1">USA (+1)</option><optgroup label="Other countries"><option data-countryCode="DZ" value="213">Algeria (+213)</option><option data-countryCode="AD" value="376">Andorra (+376)</option><option data-countryCode="AO" value="244">Angola (+244)</option><option data-countryCode="AI" value="1264">Anguilla (+1264)</option><option data-countryCode="AG" value="1268">Antigua &amp; Barbuda (+1268)</option><option data-countryCode="AR" value="54">Argentina (+54)</option><option data-countryCode="AM" value="374">Armenia (+374)</option><option data-countryCode="AW" value="297">Aruba (+297)</option><option data-countryCode="AU" value="61">Australia (+61)</option><option data-countryCode="AT" value="43">Austria (+43)</option><option data-countryCode="AZ" value="994">Azerbaijan (+994)</option><option data-countryCode="BS" value="1242">Bahamas (+1242)</option><option data-countryCode="BH" value="973">Bahrain (+973)</option><option data-countryCode="BD" value="880">Bangladesh (+880)</option><option data-countryCode="BB" value="1246">Barbados (+1246)</option><option data-countryCode="BY" value="375">Belarus (+375)</option><option data-countryCode="BE" value="32">Belgium (+32)</option><option data-countryCode="BZ" value="501">Belize (+501)</option><option data-countryCode="BJ" value="229">Benin (+229)</option><option data-countryCode="BM" value="1441">Bermuda (+1441)</option><option data-countryCode="BT" value="975">Bhutan (+975)</option><option data-countryCode="BO" value="591">Bolivia (+591)</option><option data-countryCode="BA" value="387">Bosnia Herzegovina (+387)</option><option data-countryCode="BW" value="267">Botswana (+267)</option><option data-countryCode="BR" value="55">Brazil (+55)</option><option data-countryCode="BN" value="673">Brunei (+673)</option><option data-countryCode="BG" value="359">Bulgaria (+359)</option><option data-countryCode="BF" value="226">Burkina Faso (+226)</option><option data-countryCode="BI" value="257">Burundi (+257)</option><option data-countryCode="KH" value="855">Cambodia (+855)</option><option data-countryCode="CM" value="237">Cameroon (+237)</option><option data-countryCode="CA" value="1">Canada (+1)</option><option data-countryCode="CV" value="238">Cape Verde Islands (+238)</option><option data-countryCode="KY" value="1345">Cayman Islands (+1345)</option><option data-countryCode="CF" value="236">Central African Republic (+236)</option><option data-countryCode="CL" value="56">Chile (+56)</option><option data-countryCode="CN" value="86">China (+86)</option><option data-countryCode="CO" value="57">Colombia (+57)</option><option data-countryCode="KM" value="269">Comoros (+269)</option><option data-countryCode="CG" value="242">Congo (+242)</option><option data-countryCode="CK" value="682">Cook Islands (+682)</option><option data-countryCode="CR" value="506">Costa Rica (+506)</option><option data-countryCode="HR" value="385">Croatia (+385)</option><option data-countryCode="CU" value="53">Cuba (+53)</option><option data-countryCode="CY" value="90392">Cyprus North (+90392)</option><option data-countryCode="CY" value="357">Cyprus South (+357)</option><option data-countryCode="CZ" value="42">Czech Republic (+42)</option><option data-countryCode="DK" value="45">Denmark (+45)</option><option data-countryCode="DJ" value="253">Djibouti (+253)</option><option data-countryCode="DM" value="1809">Dominica (+1809)</option><option data-countryCode="DO" value="1809">Dominican Republic (+1809)</option><option data-countryCode="EC" value="593">Ecuador (+593)</option><option data-countryCode="EG" value="20">Egypt (+20)</option><option data-countryCode="SV" value="503">El Salvador (+503)</option><option data-countryCode="GQ" value="240">Equatorial Guinea (+240)</option><option data-countryCode="ER" value="291">Eritrea (+291)</option><option data-countryCode="EE" value="372">Estonia (+372)</option><option data-countryCode="ET" value="251">Ethiopia (+251)</option><option data-countryCode="FK" value="500">Falkland Islands (+500)</option><option data-countryCode="FO" value="298">Faroe Islands (+298)</option><option data-countryCode="FJ" value="679">Fiji (+679)</option><option data-countryCode="FI" value="358">Finland (+358)</option><option data-countryCode="FR" value="33">France (+33)</option><option data-countryCode="GF" value="594">French Guiana (+594)</option><option data-countryCode="PF" value="689">French Polynesia (+689)</option><option data-countryCode="GA" value="241">Gabon (+241)</option><option data-countryCode="GM" value="220">Gambia (+220)</option><option data-countryCode="GE" value="7880">Georgia (+7880)</option><option data-countryCode="DE" value="49">Germany (+49)</option><option data-countryCode="GH" value="233">Ghana (+233)</option><option data-countryCode="GI" value="350">Gibraltar (+350)</option><option data-countryCode="GR" value="30">Greece (+30)</option><option data-countryCode="GL" value="299">Greenland (+299)</option><option data-countryCode="GD" value="1473">Grenada (+1473)</option><option data-countryCode="GP" value="590">Guadeloupe (+590)</option><option data-countryCode="GU" value="671">Guam (+671)</option><option data-countryCode="GT" value="502">Guatemala (+502)</option><option data-countryCode="GN" value="224">Guinea (+224)</option><option data-countryCode="GW" value="245">Guinea - Bissau (+245)</option><option data-countryCode="GY" value="592">Guyana (+592)</option><option data-countryCode="HT" value="509">Haiti (+509)</option><option data-countryCode="HN" value="504">Honduras (+504)</option><option data-countryCode="HK" value="852">Hong Kong (+852)</option><option data-countryCode="HU" value="36">Hungary (+36)</option><option data-countryCode="IS" value="354">Iceland (+354)</option><option data-countryCode="IN" value="91">India (+91)</option><option data-countryCode="ID" value="62">Indonesia (+62)</option><option data-countryCode="IR" value="98">Iran (+98)</option><option data-countryCode="IQ" value="964">Iraq (+964)</option><option data-countryCode="IE" value="353">Ireland (+353)</option><option data-countryCode="IL" value="972">Israel (+972)</option><option data-countryCode="IT" value="39">Italy (+39)</option><option data-countryCode="JM" value="1876">Jamaica (+1876)</option><option data-countryCode="JP" value="81">Japan (+81)</option><option data-countryCode="JO" value="962">Jordan (+962)</option><option data-countryCode="KZ" value="7">Kazakhstan (+7)</option><option data-countryCode="KE" value="254">Kenya (+254)</option><option data-countryCode="KI" value="686">Kiribati (+686)</option><option data-countryCode="KP" value="850">Korea North (+850)</option><option data-countryCode="KR" value="82">Korea South (+82)</option><option data-countryCode="KW" value="965">Kuwait (+965)</option><option data-countryCode="KG" value="996">Kyrgyzstan (+996)</option><option data-countryCode="LA" value="856">Laos (+856)</option><option data-countryCode="LV" value="371">Latvia (+371)</option><option data-countryCode="LB" value="961">Lebanon (+961)</option><option data-countryCode="LS" value="266">Lesotho (+266)</option><option data-countryCode="LR" value="231">Liberia (+231)</option><option data-countryCode="LY" value="218">Libya (+218)</option><option data-countryCode="LI" value="417">Liechtenstein (+417)</option><option data-countryCode="LT" value="370">Lithuania (+370)</option><option data-countryCode="LU" value="352">Luxembourg (+352)</option><option data-countryCode="MO" value="853">Macao (+853)</option><option data-countryCode="MK" value="389">Macedonia (+389)</option><option data-countryCode="MG" value="261">Madagascar (+261)</option><option data-countryCode="MW" value="265">Malawi (+265)</option><option data-countryCode="MY" value="60">Malaysia (+60)</option><option data-countryCode="MV" value="960">Maldives (+960)</option><option data-countryCode="ML" value="223">Mali (+223)</option><option data-countryCode="MT" value="356">Malta (+356)</option><option data-countryCode="MH" value="692">Marshall Islands (+692)</option><option data-countryCode="MQ" value="596">Martinique (+596)</option><option data-countryCode="MR" value="222">Mauritania (+222)</option><option data-countryCode="YT" value="269">Mayotte (+269)</option><option data-countryCode="MX" value="52">Mexico (+52)</option><option data-countryCode="FM" value="691">Micronesia (+691)</option><option data-countryCode="MD" value="373">Moldova (+373)</option><option data-countryCode="MC" value="377">Monaco (+377)</option><option data-countryCode="MN" value="976">Mongolia (+976)</option><option data-countryCode="MS" value="1664">Montserrat (+1664)</option><option data-countryCode="MA" value="212">Morocco (+212)</option><option data-countryCode="MZ" value="258">Mozambique (+258)</option><option data-countryCode="MN" value="95">Myanmar (+95)</option><option data-countryCode="NA" value="264">Namibia (+264)</option><option data-countryCode="NR" value="674">Nauru (+674)</option><option data-countryCode="NP" value="977">Nepal (+977)</option><option data-countryCode="NL" value="31">Netherlands (+31)</option><option data-countryCode="NC" value="687">New Caledonia (+687)</option><option data-countryCode="NZ" value="64">New Zealand (+64)</option><option data-countryCode="NI" value="505">Nicaragua (+505)</option><option data-countryCode="NE" value="227">Niger (+227)</option><option data-countryCode="NG" value="234">Nigeria (+234)</option><option data-countryCode="NU" value="683">Niue (+683)</option><option data-countryCode="NF" value="672">Norfolk Islands (+672)</option><option data-countryCode="NP" value="670">Northern Marianas (+670)</option><option data-countryCode="NO" value="47">Norway (+47)</option><option data-countryCode="OM" value="968">Oman (+968)</option><option data-countryCode="PW" value="680">Palau (+680)</option><option data-countryCode="PA" value="507">Panama (+507)</option><option data-countryCode="PG" value="675">Papua New Guinea (+675)</option><option data-countryCode="PY" value="595">Paraguay (+595)</option><option data-countryCode="PE" value="51">Peru (+51)</option><option data-countryCode="PH" value="63">Philippines (+63)</option><option data-countryCode="PL" value="48">Poland (+48)</option><option data-countryCode="PT" value="351">Portugal (+351)</option><option data-countryCode="PR" value="1787">Puerto Rico (+1787)</option><option data-countryCode="QA" value="974">Qatar (+974)</option><option data-countryCode="RE" value="262">Reunion (+262)</option><option data-countryCode="RO" value="40">Romania (+40)</option><option data-countryCode="RU" value="7">Russia (+7)</option><option data-countryCode="RW" value="250">Rwanda (+250)</option><option data-countryCode="SM" value="378">San Marino (+378)</option><option data-countryCode="ST" value="239">Sao Tome &amp; Principe (+239)</option><option data-countryCode="SA" value="966">Saudi Arabia (+966)</option><option data-countryCode="SN" value="221">Senegal (+221)</option><option data-countryCode="CS" value="381">Serbia (+381)</option><option data-countryCode="SC" value="248">Seychelles (+248)</option><option data-countryCode="SL" value="232">Sierra Leone (+232)</option><option data-countryCode="SG" value="65">Singapore (+65)</option><option data-countryCode="SK" value="421">Slovak Republic (+421)</option><option data-countryCode="SI" value="386">Slovenia (+386)</option><option data-countryCode="SB" value="677">Solomon Islands (+677)</option><option data-countryCode="SO" value="252">Somalia (+252)</option><option data-countryCode="ZA" value="27">South Africa (+27)</option><option data-countryCode="ES" value="34">Spain (+34)</option><option data-countryCode="LK" value="94">Sri Lanka (+94)</option><option data-countryCode="SH" value="290">St. Helena (+290)</option><option data-countryCode="KN" value="1869">St. Kitts (+1869)</option><option data-countryCode="SC" value="1758">St. Lucia (+1758)</option><option data-countryCode="SD" value="249">Sudan (+249)</option><option data-countryCode="SR" value="597">Suriname (+597)</option><option data-countryCode="SZ" value="268">Swaziland (+268)</option><option data-countryCode="SE" value="46">Sweden (+46)</option><option data-countryCode="CH" value="41">Switzerland (+41)</option><option data-countryCode="SI" value="963">Syria (+963)</option><option data-countryCode="TW" value="886">Taiwan (+886)</option><option data-countryCode="TJ" value="7">Tajikstan (+7)</option><option data-countryCode="TH" value="66">Thailand (+66)</option><option data-countryCode="TG" value="228">Togo (+228)</option><option data-countryCode="TO" value="676">Tonga (+676)</option><option data-countryCode="TT" value="1868">Trinidad &amp; Tobago (+1868)</option><option data-countryCode="TN" value="216">Tunisia (+216)</option><option data-countryCode="TR" value="90">Turkey (+90)</option><option data-countryCode="TM" value="7">Turkmenistan (+7)</option><option data-countryCode="TM" value="993">Turkmenistan (+993)</option><option data-countryCode="TC" value="1649">Turks &amp; Caicos Islands (+1649)</option><option data-countryCode="TV" value="688">Tuvalu (+688)</option><option data-countryCode="UG" value="256">Uganda (+256)</option><option data-countryCode="UA" value="380">Ukraine (+380)</option><option data-countryCode="AE" value="971">United Arab Emirates (+971)</option><option data-countryCode="UY" value="598">Uruguay (+598)</option><option data-countryCode="UZ" value="7">Uzbekistan (+7)</option><option data-countryCode="VU" value="678">Vanuatu (+678)</option><option data-countryCode="VA" value="379">Vatican City (+379)</option><option data-countryCode="VE" value="58">Venezuela (+58)</option><option data-countryCode="VN" value="84">Vietnam (+84)</option><option data-countryCode="VG" value="84">Virgin Islands - British (+1284)</option><option data-countryCode="VI" value="84">Virgin Islands - US (+1340)</option><option data-countryCode="WF" value="681">Wallis &amp; Futuna (+681)</option><option data-countryCode="YE" value="969">Yemen (North)(+969)</option><option data-countryCode="YE" value="967">Yemen (South)(+967)</option><option data-countryCode="ZM" value="260">Zambia (+260)</option><option data-countryCode="ZW" value="263">Zimbabwe (+263)</option></optgroup></select></label></div><div class="col col-75"><label class="item item-input"><input type="text" id="phone" ng-model="user.phone" placeholder="Phone" ng-change="checkNumber(user.phone)"></label></div></div></ion-list><div style="height: 40px;" class="spacer"></div><button class="button button-stable button-block" id="login-button" ng-click="login(user)">NEXT</button></div></ion-content>'
              },
              footer: {
                _id: "1_f",
                _rev: "1-4017312ca4533ad832c19a06d1d79b5d",
                html:	"",
                js: "",
                name: "",
                table: "template"  
              },
              header: {
                _id : "1_h",
                _rev: "14-f23236b6f2180c633cddaea449130adb",
                html: "",
                name: "",
                table: "template",
                js: "var task_info = myService.getTaskInfo(); $scope.title = task_info.task_name; $scope.user = {phone: '', country_code: '1'}; $scope.login = function(user) { 	var number = user.phone ; 	if (!number) { utilityService.showAlert('Please enter phone number').then(function(res) { 		$timeout(function() { $('#phone').focus(); 		}, 100); 	}); 	return false; 	} 	number = number.replace(/[- )(]/g,'').trim(); 	var reg = new RegExp('^(0|[1-9][0-9]*)$'); 	if(!reg.test(number)){ 		utilityService.showAlert('Please enter valid phone number').then(function(res) { 			$timeout(function() { 				$('#phone').focus(); 			}, 100); 		}); 		return false; 	} 	number = user.country_code + number ; 	var endpoint = $scope.api_url + '/api/login'; 	var parameters = {phone:number, access_token: $localStorage.access_token }; 	var config = {params: parameters}; 	$http.get(endpoint, config).then(function(res) { var res_data = res.data; console.log('login res_data>>>'+ JSON.stringify(res_data)); 		$localStorage.access_token = res_data.access_token; 		myService.apiResult = res_data; 		$scope.goPage(res_data.page_id); 	}); }; $scope.checkNumber = function(){ 	if ($scope.user !== undefined && $scope.user.phone !== '') { 		var charLength = ('' + $scope.user.phone).length; 		if (charLength == 9) { 			if (phone1 === '') { 				phone1 = $scope.user.phone.toString(); 				$scope.user.phone = $scope.user.phone.toString(); 			} else { 				$scope.user.phone = phone1; 				phone1 = ''; 			} 		} else if (charLength == 10) { 			var phone = $scope.user.phone.toString(); 			formatted = '(' + phone.substr(0, 3) + ') ' + phone.substr(3, 3) + '-' + phone.substr(6, 4); 			$scope.user.phone = formatted; 		} else { 			if (charLength < 9) { 				phone1 = ''; 			} 			var phone2 = $scope.user.phone.toString(); 			$scope.user.phone = phone2; 		} 	} };"
              }
            }
          },
          detail: [{
            _id: "1",
            count: {
              active: 1,
              unread: 0
            },
            date_created: "",
            from_user: {},
            from_user_id: "9092618242e9895441bc9e978fa15098",
            image: "",
            page_id: 1,
            task_id: "1_0",
            to_page_id: 0,
            type: {},
            user_id: "23d5c58422026c68269cd6e9ac22ca4a",
            user_incoming: {},
            watson_incoming: {}
          }]
        };
        console.log("myService.apiResult", myService.apiResult);
        $scope.setPage();
      }, 200);
    }else{
      utilityService.setBusy(true);
      $scope.config.page_id = page_id;
      console.log("go to page>>>"+ JSON.stringify(page_id));
      //console.log("$scope.user_id>>>"+ $scope.user_id);
      //console.log($scope.config);
      $scope.details = [];
      $scope.data = {};
      
      if($scope.is_test) {
        for(ind=0;ind<samplePages.length;ind++){
          if(samplePages[ind].page_id == page_id){
            myService.apiResult = samplePages[ind];
            break;
          }
        }
        $scope.setPage();
      }
      else {
        //if(page_id == 1 || page_id == 11){
          HttpService.getServerPage(page_id).then(function(result) {
            console.log("server page response>>>", result);
            if(typeof result.error != "undefined" && result.error) {
              utilityService.showAlert("Error: "+result.msg);
              utilityService.setBusy(false);
            }
            else {
              $scope.config.page_id = result.page_id;
              if($scope.config.page_id == 1){
                //$localStorage.access_token = result.access_token;
                delete $localStorage.access_token;
                delete $localStorage.push_accepted;
              }
              myService.apiResult = result;
              console.log("result", result);
              $scope.setPage();
            }
          });
        /*}
        else {
          dbService.getLocalPage(page_id).then(function(result) {
            console.log("local page result>>>", result);
            if(typeof result.error != "undefined" && result.error) {
              if(page_id == 2) {
                utilityService.setBusy(false);
                utilityService.setBusy(true, "Please check your internet connection and try again.");
              }
              else {
                utilityService.setBusy(false);
                utilityService.setBusy(true, "Not synced.");
                $timeout(function() {
                  $scope.goPage($scope.config.from_page_id);
                }, 1000);
              }
            }
            else {
              dbService.synced = 1;
              $scope.config.page_id = page_id;
              myService.apiResult = result;
              $scope.setPage();
            }
          });
        }*/
      }
    }
	};
  
	$scope.updateGetUserTask = function() {
		var update_interval = 36000000;
		$interval(function() {
			console.log("dbService.synced>>>", dbService.synced);
			if(dbService.synced && $localStorage.user_id) {
				dbService.synced = 0;
				console.log("update get user task>>>");
				
				//get user_task list where user_task.dirty=true
				dbService.getDirtyUserTask().then(function(result) {
					console.log("dirty user task result>>>", JSON.stringify(result));
					var user_task_list = [];
					for(var ind=0; ind<result.length; ind++){
						var user_task = result[ind];
						user_task_list[ind] = {
							"task_id": user_task.task_id,
							"user_id": $localStorage.user_id,
							"page_id": user_task.page_id,
							"synchronized": 0,
							"status": 0,
							"count": {
							  "active": 1,
							  "unread": 0
							}
						};
					}
					console.log("updateGetUserTask", user_task_list);
					HttpService.updateGetUserTask(user_task_list).then(function(result) {
						console.log("update get user task response>>>", result);
						if(result.status == 200) {
							var update_task_list = result.data;
							HttpService.updateGetPages(update_task_list).then(function(result) {
								console.log("update get page response>>>", result);
								if(result.status == 200) {
									var update_pages = result.data;
									for(var ind=0; ind<update_pages.length; ind++){
										var update_page = update_pages[ind];
										dbService.updateLocalPage(update_page).then(function(result) {
											console.log("update local page response>>>", result);
											if(update_page.page_id == $scope.config.page_id) {
												dbService.synced = 1;
												myService.apiResult = result;
												$scope.data = {};
												$scope.setPage();
											}
										});
									}
									dbService.synced = 1;
								}
								else {
									dbService.synced = 1;
								}
							});
						}
						else {
							dbService.synced = 1;
						}
					});
				});
				
			}
		}, update_interval);
		
		
		
	};
	
	$scope.loadTemplate = function(){
		$scope.config = {
			page_id:		31,
			from_page_id:	1,
			task_id:		"31_0",
			task_name:		"Paradise Lost"
		};
		console.log("template page>>>"+ $scope.config.page_id);
		
		$scope.details = [];
		for(ind=0; ind<samplePages.length; ind++){
			if(samplePages[ind].page_id == $scope.config.page_id){
				myService.apiResult = samplePages[ind];
				break;
			}
		}
		$scope.setConfig();
		var templateUrl = "templates/books-detail.html";
		$templateRequest(templateUrl).then(function(template) {
			//console.log(template)
			$scope.html = template;
		}, function(err) {
			
		});
		var templateUrl = "templates/books-detail.js";
		$templateRequest(templateUrl).then(function(template) {
			//console.log(template)
			eval(template);
		}, function(err) {
			
		});
	};
	
	$scope.common_request_handler = function(request_data) {
		request_data.user_id = $localStorage.user_id;
		request_data.access_token = $localStorage.access_token;
		
		var api_url = request_data.api_url || $scope.api_url+"/master_api_handler";
		var api_mode = request_data.api_mode || "GET";
		var api_type = request_data.api_type || "";
		var api_next_fn = request_data.api_next_fn || "";
		var api_offline_queue = request_data.api_offline_queue || "";
		var api_offline_fn = request_data.api_offline_fn || "";
		var api_on_error_fn = request_data.api_on_error_fn || "";
		
		delete request_data["api_url"];
		delete request_data["api_mode"];
		delete request_data["api_type"];
		delete request_data["api_next_fn"];
		delete request_data["api_on_error_fn"];
		delete request_data["api_offline_queue"];
		delete request_data["api_offline_fn"];
		console.log("request_data>>>", request_data);
		
		var res_data = "";
		var err_data = "";
		api_type = api_type.toUpperCase();
		switch(api_type) {
			case "ADD_DETAIL": {
				api_offline_queue = true;
				api_offline_fn = "$scope.mark_detail_pending()";
				api_next_fn = api_next_fn || "$scope.getPage()";
				api_on_error_fn = api_on_error_fn || "$scope.add_error_fn(request_data, err_data)";
				api_mode = "POST";
				break;
			}
			case "DELETE_DETAIL": {
				api_offline_queue = true;
				api_offline_fn = "$scope.mark_detail_pending()";
				api_next_fn = api_next_fn || "$scope.deleteDetail(request_data)";
				api_on_error_fn = api_on_error_fn || "$scope.delete_error_fn(request_data, err_data)";
				api_mode = "POST";
				break;
			}
			case "GET_PAGE": {
				api_offline_queue = false;
				api_offline_fn = "$scope.goOffline()";
				api_next_fn = "";
				api_on_error_fn = api_on_error_fn || "get_error_fn";
				api_mode = "GET";
				break;
			}	
			case "UPDATE_GET_USER_TASK": {
				api_offline_queue = false;
				api_offline_fn = "$scope.goOffline()";
				api_next_fn = "";
				api_on_error_fn = api_on_error_fn || "";
				api_mode = "GET";
				break;
			}	
			case "UPDATE_GET_PAGES": {
				api_offline_queue = false;
				api_offline_fn = "$scope.goOffline()";
				api_next_fn = "";
				api_on_error_fn = api_on_error_fn || "";
				api_mode = "GET";
				break;
			}
			case "URL": {
				api_offline_queue = false;
				api_offline_fn = "$scope.goOffline()";
				api_next_fn = "";
				api_on_error_fn = api_on_error_fn || "";
				api_mode = "OTHER";
				break;
			}
			case "UPDATE_MORE_INFO": {
				api_offline_queue = true;
				api_offline_fn = "$scope.mark_detail_pending()";
				api_next_fn = api_next_fn || "$scope.getPage()";
				api_on_error_fn = api_on_error_fn || "$scope.add_error_fn()";
				api_mode = "POST";
				break;
			}
			case "UPDATE_USER_DETAILS": {
				api_offline_queue = true;
				api_offline_fn = "$scope.mark_detail_pending()";
				api_next_fn = api_next_fn || "$scope.getPage()";
				api_on_error_fn = api_on_error_fn || "$scope.add_error_fn()";
				api_mode = "POST";
				break;
			}
			case "UPDATE_EDIT_SHORT_DETAIL": {
				api_offline_queue = true;
				api_offline_fn = "$scope.mark_detail_pending()";
				api_next_fn = api_next_fn || "$scope.getPage()";
				api_on_error_fn = api_on_error_fn || "$scope.add_error_fn()";
				api_mode = "POST";
				break;
			}
			default: {
				api_offline_queue = false;
				api_offline_fn = "$scope.goOffline()";
				api_next_fn = api_next_fn || "$scope.defaultNextFn(request_data, res_data)";
				api_on_error_fn = api_on_error_fn || "";
				api_mode = "OTHER";
				break;
			}
		}
		var isOnline = HttpService.isOnline();
		if(isOnline) {//if network is online 
			utilityService.setBusy(true, "Processing...");
			var headers = {"Content-Type": "application/json"};
			var config = {headers: headers};
			api_mode = api_mode.toUpperCase();
			if(api_mode == "POST"){
				$http.post(api_url, request_data, config).then(function(res) {
					var res_data = res.data;
					console.log("res_data>>>", res_data);
					if(api_next_fn) {
            setTimeout(function(){
              eval(api_next_fn);
            }, 1000);
					}
					utilityService.setBusy(false);
				}, function(err_data) {
					console.log("api err>>>", err_data);
					if(api_on_error_fn) {
						eval(api_on_error_fn);
					}
					utilityService.setBusy(false);
				});
			}
			else if(api_mode == "GET") {
				config.params = request_data;
				$http.get(api_url, config).then(function(res){
					var res_data = res.data;
					console.log("res_data>>>", res_data);
					eval(api_next_fn);
					utilityService.setBusy(false);
				}, function(err_data) {
					console.log("api err>>>", err_data);
					utilityService.setBusy(false);
				});
			}
			else if(api_mode == "OTHER") {
				if(api_type == "URL") {
					utilityService.setBusy(false);
					
					var url = request_data.url || "";
					if(url) {
						if(window.cordova) {
							cordova.InAppBrowser.open(url, "_blank", "location=yes");
						}
						else {
							window.open(url, "_system");
						}
					}
					else {
						utilityService.showAlert("Warning: URL is missing.");
					}
				}
			}
			else {
				console.log("Warning: api_mode is missing.");
				utilityService.setBusy(false);
			}
		}
		else {//offline
			if(api_offline_queue) {//save to queue
				var offline_data = JSON.parse($localStorage.offline_queue);
				if( Object.prototype.toString.call( offline_data ) !== '[object Array]') {
					offline_data = [];
				}
				var queue_data = {
						"page_id":		$scope.config.page_id,
						"api_type":		api_type,
						"api_url":		api_url,
						"api_mode":		api_mode,
						"request_data":	request_data
					};
				offline_data.push(queue_data);
				$localStorage.offline_queue = JSON.stringify(offline_data);
			}
			if(api_offline_fn) {
				eval(api_offline_fn);
			}
		}
	}
	//custom js
	$scope.logout = function() {
		//$localStorage.$reset();
		delete $localStorage.access_token;
		delete $localStorage.push_accepted;
		$scope.goPage(1);
	};
	$scope.editUser = function(){
		$scope.config.from_page_id = 2;
		$scope.config.task_name = "User edit";
		var page_id = 14;
		$scope.goPage(page_id);
	};
	$scope.sortDetail = function() {
		$scope.sort.order = ($scope.sort.order == "asc")?"desc":"asc";
		console.log("$scope.sort>>>" + JSON.stringify($scope.sort));
		
		$scope.details = utilityService.sortByKey($scope.details, $scope.sort.key, $scope.sort.order);
	};
	$scope.subDetails = function(item){
		$scope.config.from_page_id = $scope.config.page_id;
		$scope.config.task_name = item.name;
		$scope.goPage(item.page_id);
	};
	$scope.editDetails = function(item){
		$scope.config.from_page_id = $scope.config.page_id;
		$scope.config.task_name = item.name;
		$scope.config.edit_task_id = $scope.config.task_id;
		$scope.short_info = {
			"detail_id": 	item.id,
			"message":	 	item.name,
			"task_id":		$scope.config.task_id,
			"task_name": 	$scope.config.task_name,
			"task_status":	"true"
		};
		var page_id = 15;
		$scope.goPage(page_id);
	};
	$scope.moreDetails = function(item) {
		$scope.config.from_page_id = $scope.config.page_id;
		$scope.config.task_name = item.name;
		$scope.config.edit_task_id = $scope.config.task_id;
		var page_id = 16;
		$scope.goPage(page_id);
	};
	$scope.deleteDetail = function(request_data) {
		var item_id = request_data.table_data.id;
		var item_index = null;
		angular.forEach($scope.details, function(value, key) {
			if(value.id == item_id) {
				item_index = key;
			}
		});
		if(item_index != null) {
			$scope.details.splice(item_index, 1);
		}
	};
	$scope.goSearch = function() {
		$scope.config.from_page_id = $scope.config.page_id;
		$scope.config.edit_task_id = $scope.config.task_id;
		var page_id = 17;
		$scope.goPage(page_id);
	};
	$scope.getPage = function() {
		utilityService.setBusy(true);
		$scope.details = [];
		$scope.data = {};
		
    $timeout(function(){
      HttpService.getServerPage($scope.config.page_id).then(function(result) {
        console.log("get server page response>>>", result);
        myService.apiResult = result;
        $scope.setPage();
      });
    }, 1000);
	};
	$scope.goOffline = function() {
		console.log("go to offline page");
		$scope.prev_page_id = $scope.config.page_id;
		
		var offlineResult = {};
		var page_id = 12;
		for(ind=0;ind<samplePages.length;ind++){
			if(samplePages[ind].page_id == page_id){
				offlineResult = samplePages[ind];
				break;
			}
		}
		var header_html = offlineResult.task.template.header.html;
		var detail_html = offlineResult.task.template.detail.html;
		var footer_html = offlineResult.task.template.footer.html;
		$scope.html = header_html + detail_html + footer_html;
		
		var js_template = offlineResult.task.template.header.js;
		eval(js_template);
		/*
		var templateUrl = "templates/offline.html";
		$templateRequest(templateUrl).then(function(template) {
			$scope.html = template;
		}, function(err) {
			
		});
		var templateUrl = "templates/offline.js";
		$templateRequest(templateUrl).then(function(template) {
			eval(template);
		}, function(err) {
			
		});*/
	};
	$scope.goPrevPage = function(prev_page_id) {
		console.log("go to prev page>>> id:" + prev_page_id);
		$scope.config.page_id = prev_page_id;
		$scope.setPage();
	};
	$scope.mark_detail_pending = function(request_data) {
		console.log("detail pending", request_data);
	};
	$scope.delete_error_fn = function(request_data, err_data) {
		utilityService.showAlert("Error: "+err_data.data.msg);
	};
	$scope.add_error_fn = function(request_data, err_data) {
		utilityService.showAlert("Error: "+err_data.data.msg);
	};
	$scope.defaultNextFn = function(request_data, res_data) {
		console.log(request_data, res_data);
	};
	//utils
	$scope.inputUp = function() {
		if (isIOS) $scope.data.keyboardHeight = 216;
		$timeout(function() {
		  $ionicScrollDelegate.scrollBottom(true);
		}, 300);
	};
	$scope.inputDown = function() {
		if (isIOS) $scope.data.keyboardHeight = 0;
		$ionicScrollDelegate.resize();
	};
	$scope.closeKeyboard = function() {
		// cordova.plugins.Keyboard.close();
	};
	//init
	$scope.init();
});