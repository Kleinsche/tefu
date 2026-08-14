var map = new AMap.Map('map', {
    zoom: 12.5,
    viewMode: '3D',
    pitch: 25,
    // mapStyle: 'amap://styles/blue',
    center: [120.759349,31.321537],
    showBuildingBlock: true,
    // showLabel: false,
});

var loca = (window.loca = new Loca.Container({
    map,
}));

var geo = new Loca.GeoJSONSource({
    data: customGeoJSON,
});
var colors = [  'rgba(0,0,0,0.4)',//0
                'rgba(255, 0, 200, 0.4)',//1
                'rgba(255, 0, 0, 0.4)',//2
                'rgba(0,100,255,0.4)',//3
                'rgba(100,100,100,0.4)',//4
                'rgba(100,100,100,0.4)',//5
                'rgba(0,255,255,0.4)',//6
                'rgba(255,255,0,0.4)',//7
                'rgba(255,100,0,0.4)',//8
                'rgba(72, 255, 0, 0.4)',//9
                'rgba(0,0,255,0.4)',//10
                'rgba(100,255,100,0.4)',//11
                

                'rgba(255, 0, 0, 0.4)',//12
                'rgba(100,255,100,0.4)',//13
                'rgba(0,0,0,0.4)',//14
                'rgba(255,255,0,0.4)',//15
                'rgba(0,0,255,0.4)',//16
                'rgba(255,100,0,0.4)',//17
                'rgba(100,100,100,0.4)',//18
                'rgba(0,255,255,0.4)',//19
                'rgba(255, 0, 200, 0.4)',//20
                'rgba(0,100,255,0.4)',//21
                'rgba(72, 255, 0, 0.4)',//22
                ];

// 根据缩放级别计算字体大小
function getFontSizeByZoom(zoom) {
    // 示例：zoom 越小字体越小，zoom 越大字体越大
    // 你可以根据需求自定义映射关系
    if (zoom <= 12) return 0.1;
    if (zoom <= 12.6) return 9;
    if (zoom <= 14) return 12;
    if (zoom <= 15) return 16;
    return 16;
}

var pl = new Loca.PolygonLayer({
    zIndex: 120,
    opacity: 1,
    shininess: 1,
});
pl.setSource(geo);

function updateLabelStyle() {
    var zoom = map.getZoom();
    var fontSize = getFontSizeByZoom(zoom);

    pl.setStyle({
        height: 0,
        topColor: function (index, feature) {
            return colors[index % colors.length];
        },
        label: {
            text: {
                content: (index, feat) => feat.properties.name,
                style: {
                     fontSize: (index, feat) => index > 11 ? fontSize : fontSize*2,        // 动态字体大小
                    fontWeight: 'normal',
                    fillColor: '#000000',
                    strokeColor: '#FFFFFF',
                    strokeWidth: (index, feat) => index > 11 ? 0:2,
                    padding: '2, 5',
                }
            },
            onclick:{}
        },
        labelAltitude: 0
    });
}

// 初始化样式
updateLabelStyle();

loca.add(pl);


// 监听缩放变化，实时更新字体大小
map.on('zoomchange', function () {
    updateLabelStyle();
});
