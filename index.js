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
var colors = [  'rgba(0,0,255,0.3)',//顾鹤刚
                'rgba(0,255,0,0.3)',//周康敏
                'rgba(0,255,0,0.3)',//叶振
                'rgba(0,100,255,0.3)',//陈晓栋
                'rgba(100,100,100,0.3)',//周强
                'rgba(0,255,255,0.3)',//王振
                'rgba(255,255,0,0.3)',//陈奇安
                'rgba(255,100,0,0.3)',//张华捷
                'rgba(0,0,0,0.3)',//朱文彬
                'rgba(200,0,100,0.3)',//李艾思
                'rgba(100,255,100,0.3)',//王俊杰
                ];
var pl = new Loca.PolygonLayer({
    zIndex: 120,
    opacity: 1,
    shininess: 1,
});
pl.setSource(geo);
pl.setStyle({
    height: 0,
    topColor: function (index, feature) {
        //  if (feature.properties.name = "苏虹大楼"){

        //  }
        return colors[index]
    },
    // label配置即AMap.LabelMarker的配置
    label: {
        text: {
            // 每个配置项都可通过回调函数动态配置
            content: (index, feat) => feat.properties.name,
            // offset: [0, 10],
            style: {
                fontSize: 18,
                fontWeight: 'normal',
                fillColor: '#000000',
                strokeColor: '#FFFFFF',
                strokeWidth: 2,
                padding: '2, 5',
            }
        },
        onclick:{}
    },
    // 通过labelAltitude控制标注相对于图形顶面的海拔高度，单位同altitude配置项，默认为0
    labelAltitude: 0
});
loca.add(pl);



