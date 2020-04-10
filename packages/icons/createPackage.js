const fs = require('fs');
console.log('\x1b[42m%s\x1b[0m', "Package creation started .....................");
var myArgs = process.argv.slice(2);
var result = [];
const blankIconSet = require('./blankIconSet');
var selectedIconClassKey = '';
switch (myArgs[0]) {
    case 'FA5': selectedIconClassKey = "fas fa-"; break;
    case 'FA4': selectedIconClassKey = "fa fa-"; break;
    case 'FA3':selectedIconClassKey = "icon-"; break;
    case 'Material':selectedIconClassKey = "zmdi zmdi-"; break;
    default: selectedIconClassKey = myArgs[0]; break;
        icons.forEach(icon => {
            result.push({
                iconId: icon,
                iconClassKey: myArgs[0] + icon
            });
        });
}

blankIconSet.forEach(icon => {
    result.push({
        iconId: icon.iconId,
        iconClassKey: selectedIconClassKey + icon.iconId
    });
});

fs.writeFile('iconList.json', JSON.stringify(result, null, 2), function (err, data) {
    if (err) { return console.log(err); }
});

console.log("Below are the list of Icons Please verify all the icons..............");
console.log(result);