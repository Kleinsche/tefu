var map = new AMap.Map('map', {
    zoom: 13,
    viewMode: '3D',
    pitch: 25,
    center: [120.654894,31.313023],
    showBuildingBlock: true,
});

// 在右下角添加缩放按钮
AMap.plugin(['AMap.ToolBar'], function() {
    map.addControl(new AMap.ToolBar({
        position: 'RB',           // RB = Right Bottom 右下角
        offset: new AMap.Pixel(-20, -20)  // 距离右下边缘的偏移
    }));
});

// 计算多边形中心（质心）
function getCenter(coordinates) {
    var ring = coordinates[0];
    var area = 0, cx = 0, cy = 0;
    var n = ring.length - 1;
    
    for (var i = 0; i < n; i++) {
        var x0 = ring[i][0], y0 = ring[i][1];
        var x1 = ring[(i + 1) % n][0], y1 = ring[(i + 1) % n][1];
        var a = x0 * y1 - x1 * y0;
        area += a;
        cx += (x0 + x1) * a;
        cy += (y0 + y1) * a;
    }
    area *= 0.5;
    return [cx / (6 * area), cy / (6 * area)];
}

function addPolygon(data, text, index) {
    // 创建多边形
    var polygon = new AMap.Polygon({
        path: data,
        fillColor: '#ccebc5',
        fillOpacity: 0.25,
        strokeColor: index >= 12 ? '#000000' : '#2b8cbe',
        strokeWeight: 1.5,
    });

    // 计算中心点
    var center = getCenter(data);

    // 第12个及之后（索引 >= 11）才限制 zooms 为 14-18
    var zooms = index >= 12 ? [14, 18] : [12, 18];

    // 创建文字标签
    var textLabel = new AMap.Text({
        text: text,
        position: center,
        anchor: 'center',
        zooms: zooms,  // 根据索引设置不同的显示层级
        style: {
            'background-color': 'rgba(255,255,255,0.85)',
            'border-color': '#2b8cbe',
            'border-width': '1px',
            'border-style': 'solid',
            'padding': '3px 8px',
            'border-radius': '4px',
            'font-size': '13px',
            'font-weight': 'bold',
            'color': '#2b8cbe',
            'text-align': 'center',
        },
        offset: new AMap.Pixel(0, 0)
    });

    // 联动效果
    polygon.on('mouseover', function() {
        polygon.setOptions({
            fillOpacity: 0.4,
            fillColor: '#7bccc4'
        });
        textLabel.setStyle({
            'background-color': '#7bccc4',
            'color': '#fff',
            'border-color': '#fff'
        });
    });

    polygon.on('mouseout', function() {
        polygon.setOptions({
            fillOpacity: 0.3,
            fillColor: '#ccebc5'
        });
        textLabel.setStyle({
            'background-color': 'rgba(255,255,255,0.85)',
            'color': '#2b8cbe',
            'border-color': '#2b8cbe'
        });
    });

    textLabel.on('mouseover', function() {
        polygon.emit('mouseover');
    });
    textLabel.on('mouseout', function() {
        polygon.emit('mouseout');
    });

    map.add(polygon);
    map.add(textLabel);
}

function renderGeoJSON(geojson) {
    var features = geojson.features || [];
    for (var i = 0; i < features.length; i++) {
        var feature = features[i];
        var props = feature.properties || {};
        var text = props.name || props.title || ('区域' + (i + 1));
        // 传入索引 i
        addPolygon(feature.geometry.coordinates, text, i);
    }
}

renderGeoJSON(customGeoJSON);
