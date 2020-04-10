const fs = require('fs');
const { parse, stringify } = require('svgson')
const blankIconSet = require('./iconInfo/blankIconSet');

var compiledSVGSet = [];
var totalIcons = blankIconSet.length;

for (var i=0; i < blankIconSet.length; i++) {
  var icon = blankIconSet[i];
  var fileName = icon.iconId+'.svg';
  var fileIcon = fs.readFileSync('./icons/' + fileName, 'utf8');
  parse(fileIcon).then(getParsedData.bind(null, icon, i));
}

function getParsedData(icon, count, svgJsonObject) {
  const iconData = {
    iconId: icon.iconId,
    iconInfo: svgJsonObject
  };

  compiledSVGSet.push(iconData);

  if (count === totalIcons - 1) {
    fs.writeFileSync('output.json', JSON.stringify(compiledSVGSet, null, 2));
  }
}