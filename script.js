(function () {
    var fourierApp = angular.module('fourierApp', ['ngRoute']);

    fourierApp.controller('FourierController', ['$scope', function (scope) {
        window.scrollTo(0, 0);

        scope.base ={
            selectedRA: 23, 
            iterator: 1,
            freqQtd: 4,
            time: 100,
            points: {}
        }
        scope.init = function () {
            scope.clearValues();

            var frquencyMin = 1 / (scope.base.selectedRA * 100);
            var frequencyMax = (scope.base.freqQtd - 1) / (scope.base.selectedRA * 100);
            var diffFreq = (frequencyMax - frquencyMin) / scope.base.time;
            for (var i = 0; i <= scope.base.time; i++) {
                var xValue = (diffFreq*i);
                var xAsis = xValue;
                var yAsis = [];

                var lastIterator = 0;
                if (scope.base.iterator > 1) {
                    for (var j = 1; j < scope.base.iterator; j++){
                        var multiplicity = j + lastIterator;

                        yAsis.push(getElement(multiplicity, scope.base.selectedRA, xValue));

                        lastIterator = j;
                    }
                }else{
                    yAsis.push(0);
                }

                yAsis = getFullElement(yAsis.reduce((total, num) => total+num));

                scope.base.points[xAsis] = yAsis; 
            }
            scope.createGraphic(scope.base.points);
        }
        scope.clearValues = function () {
            document.getElementById('graphic').innerHTML = '';
            scope.base.freqQtd = 4;
            scope.base.time = 100;
            scope.base.points = {};
        }
        scope.createGraphic = function (points){
            let xPoints = Object.keys(points);
            let yPoints = Object.values(points);

            new Chartist.Line('.ct-chart', {
                labels: xPoints,
                series: [
                    yPoints
                ]
            }, {
                axisY: {
                    type: Chartist.FixedScaleAxis,
                    ticks: [-0.2, 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2],
                    high: 1.2,
                    low: -0.2
                },
                width: '1500px',
                height: '750px',
                fullWidth: false
            });
        }
    }]);
})();
function getFullElement(yAsis){
    return (0.5 + ((2 / Math.PI) * yAsis));
}
function getElement(multiplicty, RA, qtdTime){
    var f0 = 100 * RA;  
    return (1 / multiplicty) * (Math.sin( multiplicty * (2*Math.PI*f0) * qtdTime));
}