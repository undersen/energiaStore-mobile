'use strict';
/*
=========================================
ROUTES CONFIGURATION
=========================================
*/

(function() {
  this.app.config(function($stateProvider, $urlRouterProvider, $httpProvider,$ionicConfigProvider) {


    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);

    $httpProvider.defaults.headers.put["Content-Type"] = "application/json; charset=UTF-8";
    $httpProvider.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
    $httpProvider.defaults.headers.patch["Content-Type"] = "application/json; charset=UTF-8";


    // $stateProvider

    $stateProvider

    .state("/", {
      url: "/",
      cache: false,
      abstract: false,
      controller: "BaseController"
    })

    .state("introduction", {
      url: "/introduction",
      cache: false,
      abstract: false,
      templateUrl: "templates/introduction.html",
      controller: "IntroductionController"
    })

    .state("login", {
      url: "/login",
      cache: false,
      abstract: false,
      templateUrl: "templates/login.html",
      controller: "LoginController"
    })

    .state("register", {
      url: "/register",
      cache: false,
      abstract: false,
      templateUrl: "templates/register.html",
      controller: "RegisterController"
    })

    .state("dashboard", {
      url: "/dashboard",
      cache: false,
      abstract: false,
      templateUrl: "templates/dashboard.html",
      controller: "DashboardController"
    })

    .state("quotation", {
      url: "/quotation",
      cache: false,
      abstract: false,
      templateUrl: "templates/quotation.html",
      controller: "QuotationController"
    })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  });
}).call(this);
