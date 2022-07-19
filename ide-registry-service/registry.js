angular.module('ideRegistry', [])
    .provider('registryApi', function registryApiProvider() {
        this.registryServiceUrl = '/services/v4/core/registry';
        this.$get = ['$http', function registryApiFactory($http) {
            let getMetadata = function (resourceUrl) {
                return $http.get(resourceUrl, { headers: { 'describe': 'application/json' } })
                    .then(function successCallback(response) {
                        return { status: response.status, data: response.data };
                    }, function errorCallback(response) {
                        console.error('Registry service:', response);
                        return { status: response.status };
                    });
            }

            let loadregistry = function (resourcePath = '/') {
                let url = new UriBuilder().path(this.registryServiceUrl.split('/')).path(resourcePath.split('/')).build();
                return $http.get(url, { headers: { 'describe': 'application/json' } })
                    .then(function successCallback(response) {
                        return { status: response.status, data: response.data };
                    }, function errorCallback(response) {
                        console.error('Registry service:', response);
                        return { status: response.status };
                    });
            }.bind(this);

            return {
                getMetadata: getMetadata,
                load: loadregistry,
            };
        }];
    });
