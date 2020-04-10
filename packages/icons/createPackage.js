const fs = require('fs');

console.log('\x1b[42m%s\x1b[0m', "Package creation started .....................");
var myArgs = process.argv.slice(2);

console.log(myArgs);

var result = [];
var icons = ['bold', 'italic', 'underline'];

switch (myArgs[0]) {
    case 'FA5':
        icons.forEach(icon => {
            result.push({
                iconId: icon,
                iconClassKey: `fas fa-${icon}`
            });
        });
        break;
    case 'FA4':
        icons.forEach(icon => {
            result.push({
                iconId: icon,
                iconClassKey: `fa fa-${icon}`
            });
        });
        break;
    case 'FA3':
        icons.forEach(icon => {
            result.push({
                iconId: icon,
                iconClassKey: `icon-${icon}`
            });
        });
        break;
    case 'Material':
        icons.forEach(icon => {
            result.push({
                iconId: icon,
                iconClassKey: `zmdi zmdi-${icon}`
            });
        });
        break;
    default:
        icons.forEach(icon => {
            result.push({
                iconId: icon,
                iconClassKey: myArgs[0] + icon
            });
        });
}

fs.writeFile('iconList.json', JSON.stringify(result, null, 2), function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
});

console.log("Below are the list of Icons Please verify all the icons..............");
console.log(result);