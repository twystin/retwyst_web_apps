angular.module('consoleApp').directive('imagereader', ['imageSvc', 'toastr',
    function(imageSvc, toastr) {
        return {
            require: 'ngModel',
            restrict: 'E',
            template: "<img class='img-polaroid'/><input id='fileInput' type='file' style='display: none;'/>",
            link: function(scope, element, attributes, ngModel) {
                var fileElement = $(angular.element('<input id="fileInput" type="file" />')),
                    imgElement = element.find('img')[0];

                fileElement.on('change', function(changeEvent) {
                    var file = changeEvent.target.files[0];
                    var regex = /^image\//i;

                    if (regex.test(file.type)) {
                        var reader = new FileReader();
                        reader.onload = function(loadEvent) {
                            var req_obj = {
                                image: loadEvent.target.result,
                                image_class: attributes.ngImageFor,
                                image_type: attributes.ngImageType,
                            };

                            if (_id) {
                                req_obj.id = _id;
                            }

                            if (attributes.ngImageFor === 'menu' && ngModel.$modelValue) {
                                req_obj.item = ngModel.$modelValue;
                            }
                            imageSvc.uploadImage(req_obj).then(function(res) {
                                _id = res.data.id;
                                console.log("uploadImage ",attributes.ngImageFor);
                                $(imgElement).attr('src', loadEvent.target.result);
                                ngModel.$setViewValue(res.data.key.toString());
                            }, function(err) {
                                console.log('err', err);
                            });
                        }
                        reader.readAsDataURL(changeEvent.target.files[0]);
                    }
                });
                element.bind('click', function() {
                    fileElement.trigger('click');
                })
                element.css('cursor', 'pointer');
                scope.$watch(function() {
                    return ngModel.$modelValue;
                }, function(val) {
                    console.log('ngImageFor', attributes.ngImageFor);
                    console.log("val: ", val);
                    if (!val) {
                        return;
                    }
                    if (/^http/i.test(val)) {
                        $(imgElement).attr('src', val);
                        console.log("[test]val: ", val);
                    } else if (attributes.ngImageFor === 'menu') {
                        $(imgElement).attr('src', 'https://s3-us-west-2.amazonaws.com/retwyst-merchants/retwyst-menus/' + _id + '/items/' + val);
                        console.log("[menu]val: ", val);
                    } else if (attributes.ngImageFor === 'outlet') {
                        $(imgElement).attr('src', 'https://s3-us-west-2.amazonaws.com/retwyst-merchants/retwyst-outlets/' + _id + '/' + val);
                        console.log("[outlet]val: ", val);
                    } else if (attributes.ngImageFor === 'shopping_offer') {
                        $(imgElement).attr('src', 'https://s3-us-west-2.amazonaws.com/retwyst-merchants/shopping-offers/partner/' + _id + '/logo');
                        console.log("[shopping_offer]val: ", val);
                    } else if (attributes.ngImageFor === 'promo') {
                      console.log(_id);
                      console.log('https://s3-us-west-2.amazonaws.com/retwyst-app/push_notifications/'+ _id + '/push_notif');
                        $(imgElement).attr('src', 'https://s3-us-west-2.amazonaws.com/retwyst-app/push_notifications/'+ _id + '/push_notif');
                    } else if (attributes.ngImageFor === 'banner') {
                        $(imgElement).attr('src', 'https://s3-us-west-2.amazonaws.com/retwyst-app/banners/' + _id + '/logo');
                        console.log("[banner]val: ", val);
                    }
                })
            }
        }
    }
])
