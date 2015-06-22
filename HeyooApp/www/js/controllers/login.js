class LoginCtrl {
  constructor($scope, $http, $state, loginService) {
    this.$scope = $scope;
    this.$http = $http;
    this.$state = $state;
    this.loginService = loginService;

    this.username = '';
    this.password = '';

      this.$scope.test = "testing controller binding";
  }

  /**
   * TODO: bundle this logic in a dedicated service
   */
  submit() {
    // the data to be sent to the api
    let data = {
      "grant_type": "password",
      "username": this.username,
      "password": this.password
    };

    this.loginService.login(data, (result) => {
      if (result.loggedIn) {
        this.$state.go('dashboard');
      } else {
        this.result = result;
      }
    });
  }

  retrieve() {
    console.log("This feature doesn't exist yet");
  }
}

LoginCtrl.$inject = ['$scope', '$http', '$state', 'loginService'];

export default LoginCtrl;