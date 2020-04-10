import icons from '../resources/icons.json';

var data = [];
for (let key in icons) {
    data.push({
        KEY: key,
        NAME: icons[key].NAME || '',
        SVG_KEY: icons[key].SVG_KEY || '',
        FA5NAME: icons[key].FA5NAME || '',
        THUMBNAIL: icons[key].FA5NAME || icons[key].NAME
    });
}

export default data;
