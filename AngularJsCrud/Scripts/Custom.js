/// <reference path="angular.js" />

var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $scope.employees = null;
    $scope.selectedId = null;
    $scope.getAllData = function () {
        $http({
            method: "get",
            url: "http://localhost:50204/Home/GetAllEmployee"
        }).then(function (response) {
            $scope.status = response.data.status;
            if ($scope.status == "ok") {
                $scope.employees = response.data.emp;
                console.log($scope.employees);
            } else {
                alert("Records not found");
            }
            
        }, function () {
            alert("Error Occur");
        })
    };


    $scope.InsertData = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Submit") {
            var Employee = {};
            Employee.Emp_Name = $scope.empName;
            Employee.Emp_City = $scope.empCity;
            Employee.Emp_Age = $scope.empAge;
            $http({
                method: "post",
                url: "http://localhost:50204/Home/AddEmployee",
                datatype: "json",
                data: JSON.stringify(Employee)
            }).then(function (response) {
                $scope.status = response.data.status;
                if ($scope.status == "ok") {
                    $scope.message = response.data.message;
                    //alert(response.data);
                    $scope.getAllData();
                    $scope.empName = "";
                    $scope.empCity = "";
                    $scope.empAge = "";
                    alert($scope.message);
                } else {
                    alert(response.data.message);
                }
            })
        } else {
            var Employee = {};
            Employee.Emp_Id = $scope.selectedId;
            Employee.Emp_Name = $scope.empName;
            Employee.Emp_City = $scope.empCity;
            Employee.Emp_Age = $scope.empAge;
            $http({
                method: "post",
                url: "http://localhost:50204/Home/UpdateEmployee",
                datatype: "json",
                data: JSON.stringify(Employee)
            }).then(function (response) {
                $scope.status = response.data.status;
                if ($scope.status == "ok") {
                    $scope.message = response.data.message;
                    //alert(response.data);
                    $scope.getAllData();
                    document.getElementById("btnSave").setAttribute("value", "Submit"); 
                    $scope.empName = "";
                    $scope.empCity = "";
                    $scope.empAge = "";
                    alert($scope.message);
                } else {
                    alert(response.data.message);
                }
            })
        }      
       
    };

    $scope.UpdateEmp = function (emp) {
        $scope.selectedId = emp.Emp_Id;
        $scope.empName = emp.Emp_Name;
        $scope.empCity = emp.Emp_City;
        $scope.empAge = emp.Emp_Age;
        document.getElementById("btnSave").setAttribute("value", "Update"); 
    };



    $scope.DeleteEmp = function (emp) {
        if (emp != null) {
            var Id = emp.Emp_Id;
            $http({
                method: "post",
                url: "http://localhost:50204/Home/DeleteEmployeeById",
                data: { Id: Id }
            }).then(function (response) {
                $scope.status = response.data.status;
                if ($scope.status == "ok") {
                    $scope.message = response.data.message;
                    //alert(response.data);
                    $scope.getAllData();
                    alert($scope.message);
                } else {
                    alert(response.data.message);
                }
            })
        } else {
            alert("Please select employee from row");
        }
    }








});