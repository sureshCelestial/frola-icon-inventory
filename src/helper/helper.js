import icons from '../resources/icons';

var data = [];

Object.keys(icons).forEach(function(index){
    icons[index].KEY = index;
    icons[index].THUMBNAIL = icons[index].FA5NAME || icons[index].NAME;
    data.push(icons[index]);
});

export default data;
