class LoginService {
  constructor ($http, $localStorage) {
    this.$http = $http;
    this.$localStorage = $localStorage;
  }

  login(data, callback) {
    let result = {};
    this.$http.post('/api/auth/token',data)
      .success((response) => {
        // The header that will be used to get information from the api
        result.authorizationHeader = {
          "headers" : {
            "Authorization": "Bearer " + response.access_token
          }
        };
        this.$http.get('/api/auth/profile', result.authorizationHeader)
          .success((user_data) => {
            // make the state logged in and go to the dashboard
            result.loggedIn = Date.now();
            result.tokenTime = Date.now();
            result.token = response.access_token;
            result.Name = user_data.FirstName;
            this.$localStorage.user = result;
            callback(result);
          })
          .error((res) => {
            callback(result);
          });
      })
      .error((response) => {
        if (response.error === "invalid_request") {
          result.errorMessage = "Please enter your phone number and password."
        } else if (response.error === "invalid_grant") {
          result.errorMessage = "Phone number and password do not match."
        }
        callback(result);
      });
  }

  checkTime() {
    if (!this.$localStorage.user) {
      this.$localStorage.user = {loggedIn: 0};
    } else if (Date.now() - this.$localStorage.user.loggedIn < 1800000) {
      this.$localStorage.user.loggedIn = Date.now();
      if (Date.now() - this.$localStorage.user.tokenTime > 3600000) {
        this.$localStorage.user.loggedIn = 0;
      }
    } else {
      this.$localStorage.user.loggedIn = 0;
    }
    return this.$localStorage.user.loggedIn;
  };

}

LoginService.$inject = ['$http', '$localStorage'];

export default LoginService;