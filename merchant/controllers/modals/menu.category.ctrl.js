angular.module('merchantApp').controller('MenuCategoryController', ['$scope', '$modalInstance', 'category', 'is_new', 'SweetAlert', function($scope, $modalInstance, category, is_new, SweetAlert) {
    $scope.menu_categories = ['Indian', 'Desserts', 'Cakes', 'Chinese', 'Soup'];

    $scope.is_new = is_new;
    $scope.category = category;

    $scope.resolveCategory = function() {
        if (!$scope.category.category_name) {
            SweetAlert.swal("Validation Error", "Category Name cannot be left blank", "error");
        } else {
            $modalInstance.close($scope.category);
        }
    };

    $scope.discardCategory = function() {
        $modalInstance.dismiss('Cancel');
    };
}]);
