angular.module('consoleApp').controller('BulkSMSController', ['$scope', 'consoleRESTSvc', 'SweetAlert', 'toastr',
    function($scope, consoleRESTSvc, SweetAlert, toastr) {

        $scope.message = {
          header: "TWYSTR",
          body:"",
          phone_number:""
        };
        $scope.fileChanged = function() {
            var reader = new FileReader();
            reader.onload = function(e) {
                $scope.$apply(function() {
                    $scope.jsonData = csvToJson(e.target.result);
                });
            };

            var csvFileInput = document.getElementById('fileInput');
            var csvFile = csvFileInput.files[0];
            reader.readAsText(csvFile);
        };

        $scope.submitUserList = function() {
            var csvFileInput = document.getElementById('fileInput');
            if (csvFileInput.files[0]) {
                console.log("scope.json",$scope.jsonData);

                for(var i = 0; i < $scope.jsonData.length; i++) {
                    $scope.message.phone_number = $scope.jsonData[i];
                    console.log($scope.message.phone_number);
                    var obj = {
                      header: $scope.message.header,
                      body: $scope.message.body,
                      phone_number: $scope.jsonData[i]
                    };
                    consoleRESTSvc.bulkSMS(obj).then(function(res) {
                      console.log(res);
                      toastr.success("SUCCESS", "Message Sent", 'success');
                    }, function(err) {
                      toastr.error("ERROR", err.message ? err.message : "Unable to Send Messages", 'error');
                      console.log(err);
                    });
                }
            } else {
                alert("Plese Upload a CSV File");
                return false;
            }
        };

        function csvToJson(csvFile) {

            var allUsers = csvFile.split("\n");
            //console.log(allUsers.length+ " allUsers");

            var result = [];
            if(allUsers[allUsers.length - 1] === "") {
              allUsers.pop();
            }
            // var headers = allUsers[0].split(",");
            //
            // for (var i = 1; i < allUsers.length; i++) {
            //
            //     var obj = {};
            //     var currentUser = allUsers[i].split(",");
            //
            //     for (var j = 0; j < headers.length; j++) {
            //         if (currentUser[j] != undefined) {
            //             obj[headers[j].trim()] = currentUser[j].trim();
            //         }
            //     }
            //     //console.log(obj);
            //     result.push(obj);
            // }
            return allUsers;
        };

        function isMobileNumber(phone) {
            if (phone && (phone.length === 10) && isNumber(phone) && isValidFirstDigit(phone)) {
                return true;
            };
            return false;
        };

        function isValidFirstDigit(phone) {
            if (phone[0] === '7' || phone[0] === '8' || phone[0] === '9') {
                return true;
            }
            return false;
        };

        function isNumber(str) {
            var numeric = /^-?[0-9]+$/;
            return numeric.test(str);
        };

        function isValidPhone() {
            if (!$scope.user.phone || isNaN($scope.user.phone) || $scope.user.phone.length !== 10) {
                return false;
            }
            return true;
        };
    }
])
