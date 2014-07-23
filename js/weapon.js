//Position of the weapon body -> START
$(document).ready(function () {
    function resizer() {
        var container = $('.container');
        var weapon = $('.weaponBody');
        function percentOfHeoght(num) {
            var height = ($(window).height() / 100) * num;
            return height;
        }
        container.css('height', $(window).height() - percentOfHeoght(10));
        container.css('marginTop', percentOfHeoght(5));
        var containerSizes = {
            width: parseInt(container.css('width')),
            height: parseInt(container.css('height'))
        };
        var weaponSizes = {
            width: parseInt(weapon.css('width')),
            height: parseInt(weapon.css('height'))
        };
        weapon.css('marginTop', containerSizes.height - weaponSizes.height);
        weapon.css('marginLeft', (containerSizes.width / 2) - (weaponSizes.width / 2));
    }
    resizer();
    $(window).on('resize', function(){
        resizer();
    });
});
//position of the weapon body -> END