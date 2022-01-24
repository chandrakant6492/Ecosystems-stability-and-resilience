/*
Coded by Chandrakant Singh
Updated 24.01.2022
*/
var MOD44B = ee.ImageCollection("MODIS/006/MOD44B"),
    CHIRPS = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    Sr = ee.Image("users/chandrakant/Sr_paper1"),
    Globcover = ee.Image("ESA/GLOBCOVER_L4_200901_200912_V2_3"),
    SA = 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[-81.375, -56.125],
          [-81.375, 12.625],
          [-34.625, 12.625],
          [-34.625, -56.125]]]),
    AF = 
    /* color: #ffc82d */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[-20, 20],
          [-20, -35],
          [50, -35],
          [50, 20]]], null, false),
    visualization = {"bands":["Percent_Tree_Cover"],"min":0,"max":100,"palette":["bbe029","0a9501","074b03"]},
    visualization2 = {"bands":["b1"],"min":0,"max":800,"palette":["#0571b0","#92c5de","#d9d9d9","#f4a582","#ca0020"]},
    visualization3 = {"bands":["precipitation"],"min":0,"max":4000,"palette":["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"]},
    vizbistable = {"opacity":1,"bands":["Class"],"min":1,"max":2,"palette":["8c510a","2ca25f"]},
    vis_del_TC = {"bands":["Percent_Tree_Cover"],"min":-15,"max":15,"palette":["#8c510a","#d8b365","#f6e8c3","#f5f5f5","#c7eae5","#5ab4ac","#01665e"]},
    vizoutlier = {"opacity":1,"bands":["Class"],"min":1,"max":2,"palette":["980043","045a8d"]},
    SA_admin0 = ee.FeatureCollection("users/chandrakant/South_America_admin0"),
    AF_admin0 = ee.FeatureCollection("users/chandrakant/Africa_admin0"),
    imageVisParam = {"opacity":1,"bands":["vis-red"],"palette":["000000"]},
    mask = {"opacity":1,"bands":["landcover"],"palette":["ffffff","ffffff"]},
    Studyarea = 
    /* color: #d6d6d6 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[-84.19314669679623, 38.989238853201584],
          [-84.19314669679623, -56.82798343884713],
          [54.67404080320376, -56.82798343884713],
          [54.67404080320376, 38.989238853201584]]], null, false),
    G1_SA = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-51.80557706199942, -2.6680148249691014],
          [-51.80557706199942, -6.827568116543116],
          [-48.37784268699942, -6.827568116543116],
          [-48.37784268699942, -2.6680148249691014]]], null, false),
    G2_SA = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-58.38034863789086, -9.10375412369372],
          [-58.38034863789086, -13.9250330987863],
          [-53.94187207539086, -13.9250330987863],
          [-53.94187207539086, -9.10375412369372]]], null, false),
    G3_SA = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-77.52457120262441, 8.969690472269939],
          [-77.52457120262441, 4.015470801779572],
          [-72.38296964012441, 4.015470801779572],
          [-72.38296964012441, 8.969690472269939]]], null, false),
    G4_SA = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-52.50870206199942, -25.09516432530887],
          [-52.50870206199942, -28.42967979486563],
          [-48.72940518699942, -28.42967979486563],
          [-48.72940518699942, -25.09516432530887]]], null, false),
    G5_AF = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[9.915614344250558, -1.1742068704116937],
          [9.915614344250558, -3.4134789427805945],
          [14.002528406750558, -3.4134789427805945],
          [14.002528406750558, -1.1742068704116937]]], null, false),
    G6_AF = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[34.98641512550056, -14.900783985370158],
          [34.98641512550056, -17.893599926683727],
          [39.29305575050056, -17.893599926683727],
          [39.29305575050056, -14.900783985370158]]], null, false),
    G7_AF = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-10.321202061999442, 6.88438013039644],
          [-10.321202061999442, 4.654666031221056],
          [-6.673741124499442, 4.654666031221056],
          [-6.673741124499442, 6.88438013039644]]], null, false),
    G8_AF = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[24.52749780572593, 6.412965178130758],
          [24.52749780572593, 4.532015585894342],
          [27.38394311822593, 4.532015585894342],
          [27.38394311822593, 6.412965178130758]]], null, false),
    geometry1 = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-76.580078125, 7.401853204090046],
          [-76.580078125, 5.568039993952247],
          [-74.822265625, 5.568039993952247],
          [-74.822265625, 7.401853204090046]]], null, false),
    geometry2 = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-64.36328125, -1.1027944952856563],
          [-64.36328125, -2.9472651029681876],
          [-62.60546875, -2.9472651029681876],
          [-62.60546875, -1.1027944952856563]]], null, false),
    geometry3 = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-51.970703125, -2.8594873052688947],
          [-51.970703125, -4.701094589592704],
          [-50.212890625, -4.701094589592704],
          [-50.212890625, -2.8594873052688947]]], null, false),
    geometry4 = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-44.587890625, -4.701094589592666],
          [-44.587890625, -6.537847421087335],
          [-42.830078125, -6.537847421087335],
          [-42.830078125, -4.701094589592666]]], null, false),
    geometry5 = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-67.703125, -5.488978417551024],
          [-67.703125, -7.323077028275151],
          [-65.9453125, -7.323077028275151],
          [-65.9453125, -5.488978417551024]]], null, false),
    geometry6 = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-56.62890625, -10.448757390049366],
          [-56.62890625, -12.258261112907766],
          [-54.87109375, -12.258261112907766],
          [-54.87109375, -10.448757390049366]]], null, false),
    geometry7 = 
    /* color: #8b8b8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-51.794921875, -26.553006267681724],
          [-51.794921875, -28.19197170634869],
          [-50.037109375, -28.19197170634869],
          [-50.037109375, -26.553006267681724]]], null, false),
    geometry8 = 
    /* color: #00ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-2.9277343750000018, 5.480557589022218],
          [-2.9277343750000018, 3.640778567682091],
          [-1.1699218750000018, 3.640778567682091],
          [-1.1699218750000018, 5.480557589022218]]], null, false),
    geometry9 = 
    /* color: #0000ff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.1035156250000018, 3.2898594282779734],
          [-3.1035156250000018, 1.4458120682096833],
          [-1.3457031250000018, 1.4458120682096833],
          [-1.3457031250000018, 3.2898594282779734]]], null, false),
    geometry10 = 
    /* color: #999900 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.1914062500000218, 1.0064606438463741],
          [-3.1914062500000218, -0.8391607143780236],
          [-1.4335937500000218, -0.8391607143780236],
          [-1.4335937500000218, 1.0064606438463741]]], null, false),
    geometry11 = 
    /* color: #009999 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.1914062500000018, -2.7717027900922933],
          [-3.1914062500000018, -4.613494171985764],
          [-1.4335937500000018, -4.613494171985764],
          [-1.4335937500000018, -2.7717027900922933]]], null, false),
    geometry12 = 
    /* color: #ff00ff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.2792968750000018, -5.838824017033779],
          [-3.2792968750000018, -7.671633424076269],
          [-1.5214843750000018, -7.671633424076269],
          [-1.5214843750000018, -5.838824017033779]]], null, false),
    geometry13 = 
    /* color: #ff9999 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.2792968750000018, -8.802405443806387],
          [-3.2792968750000018, -10.621575402937138],
          [-1.5214843750000018, -10.621575402937138],
          [-1.5214843750000018, -8.802405443806387]]], null, false),
    geometry14 = 
    /* color: #99ff99 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-3.0156250000000018, -11.398025623139151],
          [-3.0156250000000018, -13.201282560656486],
          [-1.2578125000000018, -13.201282560656486],
          [-1.2578125000000018, -11.398025623139151]]], null, false);
//////////////// Other datasets ////////////////////////
var elevation = ee.Image("MERIT/DEM/v1_0_3");
var visele = {
  bands: ['precipitation'],
  min: 958,
  max: 8284,
  opacity: 1,
  palette: ['#ffffff','#f0f0f0','#d9d9d9','#bdbdbd','#969696','#737373','#525252','#252525','#000000']
};

//////////////////////////////////////////////////////////////////////////////////
var MOD44Bi = MOD44B.select('Percent_Tree_Cover').filterDate('2000-01-01', '2002-12-31')
var MOD44Bi = MOD44Bi.mean()	
//var MOD44Bi = MOD44Bi.clip(SA)

var MOD44Bf = MOD44B.select('Percent_Tree_Cover').filterDate('2017-01-01', '2019-12-31')
var MOD44Bf = MOD44Bf.mean()	
//var MOD44Bf = MOD44Bf.clip(SA)
var delTC = MOD44Bf.subtract(MOD44Bi)

////////////////////////////////////////////////////////////////////////////////////////
var MOD44B = MOD44B.filterDate('2000-01-01', '2019-12-31')
var MOD44B = MOD44B.select('Percent_Tree_Cover')
var MOD44B_unmod = MOD44B.select('Percent_Tree_Cover')

var MOD44B = MOD44B.mean()	
//var MOD44B = MOD44B.clip(SA)


/////////////////////////////////////////////////////////////////////////////////////////
var CHIRPS = CHIRPS.filterDate('2000-01-01', '2019-12-31')
var CHIRPS = CHIRPS.select(['precipitation'])
var CHIRPS = CHIRPS.sum().divide(20)
//var CHIRPS = CHIRPS.clip(SA)

var Sr = Sr.select('b1')
//var Sr = Sr.clip(SA)

var Globcover = Globcover.select('landcover')
var Class = Globcover
//var Globcover = Globcover.clip(SA)
var Globcover = Globcover.updateMask(Globcover.gte(40).and(Globcover.lte(180)))

Map.setCenter(-22,-4, 4);

Map.addLayer(Globcover, {}, 'Landcover', false);

//////// Admistrative boundary ///////////////////
var Boundary_SA = SA_admin0;
var styleParams = {
  fillColor: '0000',
  color: '9B9B9B',
  width: 1.0,
};
Boundary_SA = Boundary_SA.style(styleParams);

var Boundary_AF = AF_admin0;
var styleParams = {
  fillColor: '0000',
  color: '9B9B9B',
  width: 1.0,
};
Boundary_AF = Boundary_AF.style(styleParams);

//Map.addLayer(Sr, visualization2, 'Sr_original');

// Get information about the MODIS projection.
var modisProjection = MOD44B.projection();
//print('MODIS projection:', modisProjection);
//print('CRS:', MOD44B.projection().crs());

var Sr = Sr.resample('bilinear').reproject({
  crs: MOD44B.projection().crs(),
  scale: 250
});
var CHIRPS = CHIRPS.resample('bilinear').reproject({
  crs: MOD44B.projection().crs(),
  scale: 250
});

//////////////////////////////////////////
// Standard deviation MOD44B
var Class = Class.gt(30).and(Class.lt(190)).rename('Class');
MOD44B_unmod = MOD44B_unmod.map(function (image) {
  return image.updateMask(Class);
});

var MOD44B_unmod_SD = MOD44B_unmod.reduce(ee.Reducer.stdDev())

/////////////////////////////////////

Map.addLayer(MOD44B.updateMask(Globcover.gte(40).and(Globcover.lte(180)).and(MOD44B.gt(50))).clip(Studyarea), {palette: ["c7e9c0"], opacity:0.55}, 'High TC')
Map.addLayer(MOD44B.updateMask(Globcover.gte(40).and(Globcover.lte(180)).and(MOD44B.lte(50))).clip(Studyarea), {palette: ["f6e8c3"], opacity:0.55}, 'Low TC')

/////////////////////////////////////////////////////////////////////
var mask_white = Globcover = ee.Image("ESA/GLOBCOVER_L4_200901_200912_V2_3").select(['landcover'])
var mask_white = Globcover.updateMask(Globcover.lt(40).or(Globcover.gt(180)))
Map.addLayer(mask_white.clip(Studyarea), mask, 'Mask-landuse')

/////////////////////////////////////////////////////////////////////
//Map.addLayer(elevation, visele, 'Elevation (m)', false)
var d = ui.Map.Layer(Sr.updateMask(Globcover.gte(40).and(Globcover.lte(180))), visualization2, 'Root zone storage capacity (mm)', false);
Map.add(d)
var c = ui.Map.Layer(CHIRPS.updateMask(Globcover.gte(40).and(Globcover.lte(180))), visualization3, 'Rainfall (mm/year)', false);
Map.add(c)
var b = ui.Map.Layer(delTC.updateMask(Globcover.gte(40).and(Globcover.lte(180))), vis_del_TC, 'Delta tree cover (% change)', false);
Map.add(b)
var a = ui.Map.Layer(MOD44B.updateMask(Globcover.gte(40).and(Globcover.lte(180))), visualization, 'Tree cover (%)', false);
Map.add(a)
///////////////////////////////////////////////
var CHIRPS_SA = CHIRPS.clip(SA)
var Globcover_SA = Globcover.clip(SA)
var MOD44B_SA = MOD44B.clip(SA)
var delTC_SA = delTC.clip(SA)
var Sr_SA = Sr.clip(SA)

///////////////////////////////////////////////////////////////////////////
//////////// For SOUTH AMERICA (MAP) ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// Classification of MAP for Unstable states
var MAP_class = [   0,985,1834,2384,8284]
var Class_1 = [ 41.54999923706055 , 61.29999923706055 ]; var Class_2 = [null,null]
var Class_3 = [ 30.450000762939453 , 62.650001525878906 ]
var Class_4 = [ 33.5 , 51.349998474121094 ]
var Class_5 = [ 19.049999237060547 , 63.95000076293945 ]
var Class_6 = [ 31.799999237060547 , 58.29999923706055 ]
var Class_7 = [ 23.75 , 60.150001525878906 ]
var Class_8 = [ 29.850000381469727 , 58.29999923706055 ]

var Un_MAP_SA_1 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_1[0])).and(MOD44B_SA.lte(Class_1[1])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0)))
var Un_MAP_SA_1 = ui.Map.Layer(Un_MAP_SA_1, {palette:['red'], min:1, max:1}, 'Un_MAP_SA_1',false)
Map.add(Un_MAP_SA_1)
/*
var Un_MAP_SA_2 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_2[0])).and(MOD44B_SA.lte(Class_2[1])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.gt(0)))
var Un_MAP_SA_2 = ui.Map.Layer(Un_MAP_SA_2, {palette:['blue'], min:1, max:1}, 'Un_MAP_SA_2',false)
Map.add(Un_MAP_SA_2)
*/
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_1[0])).and(MOD44B_SA.lte(Class_1[1])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0))),{palette: 'red'}, 'MAP_Un-Class-1', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_2[0])).and(MOD44B_SA.lte(Class_2[1])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.gt(0))),{palette: 'blue'}, 'MAP_Un-Class-2', false);
var Un_MAP_SA_3 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_3[0])).and(MOD44B_SA.lte(Class_3[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.lt(0)))
var Un_MAP_SA_3 = ui.Map.Layer(Un_MAP_SA_3, {palette:['red'], min:1, max:1}, 'Un_MAP_SA_3',false)
Map.add(Un_MAP_SA_3)
var Un_MAP_SA_4 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_4[0])).and(MOD44B_SA.lte(Class_4[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.gte(0)))
var Un_MAP_SA_4 = ui.Map.Layer(Un_MAP_SA_4, {palette:['blue'], min:1, max:1}, 'Un_MAP_SA_4',false)
Map.add(Un_MAP_SA_4)
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_3[0])).and(MOD44B_SA.lte(Class_3[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.lt(0))),{palette: 'red'}, 'MAP_Un-Class-3', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_4[0])).and(MOD44B_SA.lte(Class_4[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.gt(0))),{palette: 'blue'}, 'MAP_Un-Class-4', false);
var Un_MAP_SA_5 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_5[0])).and(MOD44B_SA.lte(Class_5[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.lt(0)))
var Un_MAP_SA_5 = ui.Map.Layer(Un_MAP_SA_5, {palette:['red'], min:1, max:1}, 'Un_MAP_SA_5',false)
Map.add(Un_MAP_SA_5)
var Un_MAP_SA_6 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_6[0])).and(MOD44B_SA.lte(Class_6[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.gte(0)))
var Un_MAP_SA_6 = ui.Map.Layer(Un_MAP_SA_6, {palette:['blue'], min:1, max:1}, 'Un_MAP_SA_6',false)
Map.add(Un_MAP_SA_6)
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_5[0])).and(MOD44B_SA.lte(Class_5[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.lt(0))),{palette: 'red'}, 'MAP_Un-Class-5', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_6[0])).and(MOD44B_SA.lte(Class_6[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.gt(0))),{palette: 'blue'}, 'MAP_Un-Class-6', false);
var Un_MAP_SA_7 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_7[0])).and(MOD44B_SA.lte(Class_7[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.lt(0)))
var Un_MAP_SA_7 = ui.Map.Layer(Un_MAP_SA_7, {palette:['red'], min:1, max:1}, 'Un_MAP_SA_7',false)
Map.add(Un_MAP_SA_7)
var Un_MAP_SA_8 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_8[0])).and(MOD44B_SA.lte(Class_8[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.gte(0)))
var Un_MAP_SA_8 = ui.Map.Layer(Un_MAP_SA_8, {palette:['blue'], min:1, max:1}, 'Un_MAP_SA_8',false)
Map.add(Un_MAP_SA_8)
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_7[0])).and(MOD44B_SA.lte(Class_7[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.lt(0))),{palette: 'red'}, 'MAP_Un-Class-7', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_8[0])).and(MOD44B_SA.lte(Class_8[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.gt(0))),{palette: 'blue'}, 'MAP_Un-Class-8', false);

///////////////////////////////////////////////////////////////////////////

var Un_MAP_SA_1_mos = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_1[0])).and(MOD44B_SA.lte(Class_1[1])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0)))
var Un_MAP_SA_3_mos = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_3[0])).and(MOD44B_SA.lte(Class_3[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.lt(0)))
var Un_MAP_SA_4_mos = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_4[0])).and(MOD44B_SA.lte(Class_4[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.gte(0)))
var Un_MAP_SA_5_mos = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_5[0])).and(MOD44B_SA.lte(Class_5[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.lt(0)))
var Un_MAP_SA_6_mos = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_6[0])).and(MOD44B_SA.lte(Class_6[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.gte(0)))
var Un_MAP_SA_7_mos = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_7[0])).and(MOD44B_SA.lte(Class_7[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.lt(0)))
var Un_MAP_SA_8_mos = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_8[0])).and(MOD44B_SA.lte(Class_8[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.gte(0)))
var U_1 = Un_MAP_SA_1_mos.divide(Un_MAP_SA_1_mos).multiply(1); U_1 = U_1.toShort().select(0).rename('Class');
var U_3 = Un_MAP_SA_3_mos.divide(Un_MAP_SA_3_mos).multiply(1); U_3 = U_3.toShort().select(0).rename('Class');
var U_4 = Un_MAP_SA_4_mos.divide(Un_MAP_SA_4_mos).multiply(1); U_4 = U_4.toShort().select(0).rename('Class');
var U_5 = Un_MAP_SA_5_mos.divide(Un_MAP_SA_5_mos).multiply(1); U_5 = U_5.toShort().select(0).rename('Class');
var U_6 = Un_MAP_SA_6_mos.divide(Un_MAP_SA_6_mos).multiply(1); U_6 = U_6.toShort().select(0).rename('Class');
var U_7 = Un_MAP_SA_7_mos.divide(Un_MAP_SA_7_mos).multiply(1); U_7 = U_7.toShort().select(0).rename('Class');
var U_8 = Un_MAP_SA_8_mos.divide(Un_MAP_SA_8_mos).multiply(1); U_8 = U_8.toShort().select(0).rename('Class');
var Uns = ee.ImageCollection.fromImages([U_1,U_3,U_4,U_5,U_6,U_7,U_8]);
var Uns = Uns.mosaic()
//Map.addLayer(Uns);

var SA_Uns_SD = MOD44B_unmod_SD.updateMask(Uns.gte(0).and(MOD44B_unmod_SD.gte(1)))
Map.addLayer(SA_Uns_SD, {palette: ['#f1eef6','#d7b5d8','#df65b0','#dd1c77','#980043'], min: 0, max: 10}, 'SA_Uns_SD', false);


//////////////// Other analysis /////////////////////////

var Outlier_forest_l = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gt(Class_1[1])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0)))
var Outlier_forest_l = Outlier_forest_l.divide(Outlier_forest_l).multiply(1)
var Outlier_forest_g = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gt(50)).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.gte(0)))
var Outlier_forest_g = Outlier_forest_g.divide(Outlier_forest_g).multiply(2)
Outlier_forest_l = Outlier_forest_l.toShort().select(0).rename('Class');
Outlier_forest_g = Outlier_forest_g.toShort().select(0).rename('Class');
var Outlier_forest = ee.ImageCollection.fromImages([Outlier_forest_l, Outlier_forest_g]);
var Outlier_forest = Outlier_forest.mosaic();

Map.addLayer(Outlier_forest, vizoutlier, 'SA: Low MAP forest (not-unstable)-(Class 1,2)', false)

//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(36.650001525878906)).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0))),{palette: '#980043'}, 'Forest-not-unstable_low_MAP_loss_(1)', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(46.849998474121094)).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.gt(0))),{palette: '#045a8d'}, 'Forest-not-unstable_low_MAP_gain_(2)', false);

var Outlier_forest_l_5 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lt(Class_5[0])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.lt(0)))
var Outlier_forest_l_5 = Outlier_forest_l_5.divide(Outlier_forest_l_5).multiply(1)
var Outlier_forest_g_6 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lt(Class_6[0])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.gte(0)))
var Outlier_forest_g_6 = Outlier_forest_g_6.divide(Outlier_forest_g_6).multiply(2)
var Outlier_forest_l_7 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lt(Class_7[0])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.lt(0)))
var Outlier_forest_l_7 = Outlier_forest_l_7.divide(Outlier_forest_l_7).multiply(1)
var Outlier_forest_g_8 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lt(Class_8[0])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.gte(0)))
var Outlier_forest_g_8 = Outlier_forest_g_8.divide(Outlier_forest_g_8).multiply(2)

Outlier_forest_l_5 = Outlier_forest_l_5.toShort().select(0).rename('Class');
Outlier_forest_g_6 = Outlier_forest_g_6.toShort().select(0).rename('Class');
Outlier_forest_l_7 = Outlier_forest_l_7.toShort().select(0).rename('Class');
Outlier_forest_g_8 = Outlier_forest_g_8.toShort().select(0).rename('Class');
var Outlier_forest = ee.ImageCollection.fromImages([Outlier_forest_l_5, Outlier_forest_g_6, Outlier_forest_l_7, Outlier_forest_g_8]);
var Outlier_forest = Outlier_forest.mosaic();
Map.addLayer(Outlier_forest, vizoutlier, 'SA: High MAP savanna (not-unstable)-(Class 5,6,7,8)', false)

//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(24.600000381469727)).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.lt(0))),{palette: '#980043'}, 'Savanna-not-unstable_high_MAP_(7)', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(32.700000762939450)).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.gt(0))),{palette: '#045a8d'}, 'Savanna-not-unstable_high_MAP_(8)', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(19.25)).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lte(MAP_class[3])).and(delTC_SA.lt(0))),{palette: '#980043'}, 'Savanna-not-unstable_high_MAP_(5)', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(34.45000076293945)).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lte(MAP_class[3])).and(delTC_SA.gt(0))),{palette: '#045a8d'}, 'Savanna-not-unstable_high_MAP_(6)', false);


///////// MAP Stable regions //////////
var Class_1 = [ 9.899999618530273 , null ]
var Class_2 = [ 10.25 , null ]
var Class_3 = [ 12.600000381469727 , 75.69999694824219 ]
var Class_4 = [ 7.199999809265137 , 72.1500015258789 ]
var Class_5 = [ null , 75.05000305175781 ]
var Class_6 = [ null , 75.75 ]
var Class_7 = [ null , 76.3499984741211 ]
var Class_8 = [ null , 77.55000305175781 ]

var St_MAP_SA_1 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(Class_1[0])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0)));
var St_MAP_SA_1 = ui.Map.Layer(St_MAP_SA_1, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_SA_1',false);
Map.add(St_MAP_SA_1);
var St_MAP_SA_2 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(Class_2[0])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.gte(0)));
var St_MAP_SA_2 = ui.Map.Layer(St_MAP_SA_2, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_SA_2',false);
Map.add(St_MAP_SA_2);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(Class_1[0])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0))),{palette: '#fec44f'}, 'MAP_St-Class-1', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(Class_2[0])).and(CHIRPS_SA.gte(MAP_class[0])).and(CHIRPS_SA.lt(MAP_class[1])).and(delTC_SA.lt(0))),{palette: '#fec44f'}, 'MAP_St-Class-2', false);

var MAP_St_Class_3_Sv = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(Class_3[0])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.lt(0)))
var MAP_St_Class_3_Sv = MAP_St_Class_3_Sv.divide(MAP_St_Class_3_Sv).multiply(1)
var MAP_St_Class_3_Fr = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_3[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.lt(0)))
var MAP_St_Class_3_Fr = MAP_St_Class_3_Fr.divide(MAP_St_Class_3_Fr).multiply(2)
MAP_St_Class_3_Sv = MAP_St_Class_3_Sv.toShort().select(0).rename('Class');
MAP_St_Class_3_Fr = MAP_St_Class_3_Fr.toShort().select(0).rename('Class');
var MAP_St_Class_3 = ee.ImageCollection.fromImages([MAP_St_Class_3_Sv, MAP_St_Class_3_Fr]);
var MAP_St_Class_3 = MAP_St_Class_3.mosaic();
//Map.addLayer(MAP_St_Class_3, vizbistable, 'MAP_St-Class-3', false)
var MAP_St_Class_4_Sv = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(Class_4[0])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.gte(0)))
var MAP_St_Class_4_Sv = MAP_St_Class_4_Sv.divide(MAP_St_Class_4_Sv).multiply(1)
var MAP_St_Class_4_Fr = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_4[1])).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.gte(0)))
var MAP_St_Class_4_Fr = MAP_St_Class_4_Fr.divide(MAP_St_Class_4_Fr).multiply(2)
MAP_St_Class_4_Sv = MAP_St_Class_4_Sv.toShort().select(0).rename('Class');
MAP_St_Class_4_Fr = MAP_St_Class_4_Fr.toShort().select(0).rename('Class');
var MAP_St_Class_4 = ee.ImageCollection.fromImages([MAP_St_Class_4_Sv, MAP_St_Class_4_Fr]);
var MAP_St_Class_4 = MAP_St_Class_4.mosaic();
//Map.addLayer(MAP_St_Class_4, vizbistable, 'MAP_St-Class-4', false)
var St_MAP_SA_3 = MAP_St_Class_3
var St_MAP_SA_3 = ui.Map.Layer(St_MAP_SA_3, vizbistable, 'St_MAP_SA_3',false)
Map.add(St_MAP_SA_3)
var St_MAP_SA_4 = MAP_St_Class_4
var St_MAP_SA_4 = ui.Map.Layer(St_MAP_SA_4, vizbistable, 'St_MAP_SA_4',false)
Map.add(St_MAP_SA_4)
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(10)).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.lt(0))),{palette: ['#fec44f']}, 'MAP_St-Class-3', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(76)).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.lt(0))),{palette: ['#2ca25f']}, 'MAP_St-Class-3', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.lte(7)).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.gt(0))),{palette: ['#fec44f']}, 'MAP_St-Class-4', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(72)).and(CHIRPS_SA.gte(MAP_class[1])).and(CHIRPS_SA.lt(MAP_class[2])).and(delTC_SA.gt(0))),{palette: ['#2ca25f']}, 'MAP_St_Class-4', false);
var St_MAP_SA_5 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_5[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.lt(0)))
var St_MAP_SA_5 = ui.Map.Layer(St_MAP_SA_5, {palette:['#2ca25f'], min:1, max:1}, 'St_MAP_SA_5',false)
Map.add(St_MAP_SA_5)
var St_MAP_SA_6 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_6[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.gte(0)))
var St_MAP_SA_6 = ui.Map.Layer(St_MAP_SA_6, {palette:['#2ca25f'], min:1, max:1}, 'St_MAP_SA_6',false)
Map.add(St_MAP_SA_6)
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_5[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.lt(0))),{palette: ['#2ca25f']}, 'MAP_St-Class-5', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_6[1])).and(CHIRPS_SA.gte(MAP_class[2])).and(CHIRPS_SA.lt(MAP_class[3])).and(delTC_SA.gt(0))),{palette: ['#2ca25f']}, 'MAP_St-Class-6', false);
var St_MAP_SA_7 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_7[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.lt(0)))
var St_MAP_SA_7 = ui.Map.Layer(St_MAP_SA_7, {palette:['#2ca25f'], min:1, max:1}, 'St_MAP_SA_7',false)
Map.add(St_MAP_SA_7)
var St_MAP_SA_8 = MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_8[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.gte(0)))
var St_MAP_SA_8 = ui.Map.Layer(St_MAP_SA_8, {palette:['#2ca25f'], min:1, max:1}, 'St_MAP_SA_8',false)
Map.add(St_MAP_SA_8)
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_7[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.lt(0))),{palette: ['#2ca25f']}, 'MAP_St-Class-7', false);
//Map.addLayer(MOD44B_SA.updateMask(Globcover_SA.gte(40).and(Globcover_SA.lte(180)).and(MOD44B_SA.gte(Class_8[1])).and(CHIRPS_SA.gte(MAP_class[3])).and(CHIRPS_SA.lte(MAP_class[4])).and(delTC_SA.gt(0))),{palette: ['#2ca25f']}, 'MAP_St-Class-8', false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////BASEMAP//////////////////
var GRAYMAP = [
{   // Dial down the map saturation.
stylers: [ { saturation: -85 } ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 10 } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'road',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}];
Map.setOptions('Gray', {'Gray': GRAYMAP});

/////////////////// For the App (South America) /////////////////////////////
Map.style().set('cursor', 'crosshair');
// App title
var header = ui.Label('Transient state of the terrestrial ecosystem',
{fontSize: '25px', fontWeight: 'bold', color: '0570b0'});

// App Summary
var text = ui.Label(
'This spatial map displays unstable and stable regions of the tropical rainforest and savanna ecosystem. This analysis is based on the change in tree/canopy cover (2000-2019) and mean annual precipitation (2000-2019).',
{fontSize: '12px'});

var panel = ui.Panel({
widgets:[header, text], // Adds header and text
style:{width: '410px',position:'middle-right'}});

//We want to create another panel to house a line separator and instructions.
/*var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold', color: '4A997E'},
    }),
]);

panel.add(intro);
*/
ui.root.insert(1,panel);

//Map.add(panel)

//// Creating labels
var LocLabel = ui.Label({value:'For South America',
style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
});
var DataLabel = ui.Label({value:'Note: Ranges below represent the Mean Annual Precipitation. Loss and Gain represents tree cover loss (i.e., ΔTC < 0) and gain (ΔTC ≥ 0), respectively within each mean annual precipitation class.',
style: {fontSize: '12px', margin: '2px 5px', color: '225ea8'}
});

var UnstLabel = ui.Label({value:'Select classes below to display stable and unstable regions:',
style: {fontWeight: 'bold', fontSize: '14px', margin: '1px 5px', color: '4a1486'}
});

/// Checkbox
var extCheck1 = ui.Checkbox('0-985 mm/yr (Loss)').setValue(false); // false = unchecked
var extCheck2 = ui.Checkbox('0-985 mm/yr (Gain)').setValue(false);
var extCheck3 = ui.Checkbox('985-1834 mm/yr (Loss)').setValue(false);
var extCheck4 = ui.Checkbox('985-1834 mm/yr (Gain)').setValue(false); // false = unchecked
var extCheck5 = ui.Checkbox('1834-2384 mm/yr (Loss)').setValue(false);
var extCheck6 = ui.Checkbox('1834-2384 mm/yr (Gain)').setValue(false);
var extCheck7 = ui.Checkbox('≥ 2384 mm/yr (Loss)').setValue(false); // false = unchecked
var extCheck8 = ui.Checkbox('≥ 2384 mm/yr (Gain)').setValue(false);

// Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
    }
    });

var makeRowa = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {backgroundColor: '#' + color,
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '0 0 4px 0' }});
    // Create a label with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'} });
      // Return the panel.
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal') });};
        
var paletteMAPa = [
'FF0000',//Forest-loss (Unstable)
'0000FF',//Forest-gain (Unstable)
'8c510a',//Stable
'2ca25f'
];

// Name of each legend value.
var namesa = ['Unstable (Tree cover decrease)','Unstable (Tree cover increase)','Stable (Savanna)', 'Stable (Forest)'];
// Add color and names to legend.
for (var i = 0; i < 4; i++) {
extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
}

// Pannel for Unstable regions
panel.add(extentLegend)
panel.add(UnstLabel).add(DataLabel).add(LocLabel)
var savePanel = ui.Panel(
  [
    extCheck1, extCheck2, extCheck3, extCheck4, 
    extCheck5, extCheck6, extCheck7, extCheck8
  ],
  ui.Panel.Layout.Flow('vertical'))
  
// Previous next and search pannel
var mainPanel = ui.Panel({
  widgets: 
    [
      savePanel
    ],
  style: 
    {
      position: 'bottom-right', 
      width: '280px', 
      stretch: 'vertical',
    }
});
panel.add(mainPanel)

/////////// Adding function for each checkbox ////////////////
var doCheckbox_SA_MAP1 = function() {
  extCheck1.onChange(function(checked){
    Un_MAP_SA_1.setShown(checked),
    St_MAP_SA_1.setShown(checked)})
}
doCheckbox_SA_MAP1();
var doCheckbox_SA_MAP2 = function() {
  extCheck2.onChange(function(checked){
    //Un_MAP_SA_2.setShown(checked),
    St_MAP_SA_2.setShown(checked)})
}
doCheckbox_SA_MAP2();
var doCheckbox_SA_MAP3 = function() {
  extCheck3.onChange(function(checked){
    Un_MAP_SA_3.setShown(checked),
    St_MAP_SA_3.setShown(checked)})
}
doCheckbox_SA_MAP3();
var doCheckbox_SA_MAP4 = function() {
  extCheck4.onChange(function(checked){
    Un_MAP_SA_4.setShown(checked),
    St_MAP_SA_4.setShown(checked)})
}
doCheckbox_SA_MAP4();
var doCheckbox_SA_MAP5 = function() {
  extCheck5.onChange(function(checked){
    Un_MAP_SA_5.setShown(checked),
    St_MAP_SA_5.setShown(checked)})
}
doCheckbox_SA_MAP5();
var doCheckbox_SA_MAP6 = function() {
  extCheck6.onChange(function(checked){
    Un_MAP_SA_6.setShown(checked),
    St_MAP_SA_6.setShown(checked)})
}
doCheckbox_SA_MAP6();
var doCheckbox_SA_MAP7 = function() {
  extCheck7.onChange(function(checked){
    Un_MAP_SA_7.setShown(checked),
    St_MAP_SA_7.setShown(checked)})
}
doCheckbox_SA_MAP7();
var doCheckbox_SA_MAP8 = function() {
  extCheck8.onChange(function(checked){
    Un_MAP_SA_8.setShown(checked),
    St_MAP_SA_8.setShown(checked)})
}
doCheckbox_SA_MAP8();

///////////////////////////////////////////////////////////////////////////
//////////// For AFRICA (MAP) ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

var CHIRPS_AF = CHIRPS.clip(AF)
var Globcover_AF = Globcover.clip(AF)
var MOD44B_AF = MOD44B.clip(AF)
var delTC_AF = delTC.clip(AF)
var Sr_AF = Sr.clip(AF)

// Classification of MAP for Unstable states
var MAP_class = [0,593,1075,1468,3936]
var Class_1 = [null,null]; var Class_2 = [null,null]
var Class_3 = [ 39.04999923706055 , 80.25 ]
var Class_4 = [ 34.04999923706055 , 43.349998474121094 ]
var Class_5 = [ 27.299999237060547 , 47.54999923706055 ]
var Class_6 = [ 33.04999923706055 , 47.70000076293945 ]
var Class_7 = [ 24.450000762939453 , 67.94999694824219 ]
var Class_8 = [ 22.350000381469727 , 68.5999984741211 ]

/*
var Un_MAP_AF_1 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_1[0])).and(MOD44B_AF.lte(Class_1[1])).and(CHIRPS_AF.gte(MAP_class[0])).and(CHIRPS_AF.lt(MAP_class[1])).and(delTC_AF.lt(0)))
var Un_MAP_AF_1 = ui.Map.Layer(Un_MAP_AF_1, {palette:['red'], min:1, max:1}, 'Un_MAP_AF_1',false)
Map.add(Un_MAP_AF_1)

var Un_MAP_AF_2 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_2[0])).and(MOD44B_AF.lte(Class_2[1])).and(CHIRPS_AF.gte(MAP_class[0])).and(CHIRPS_AF.lt(MAP_class[1])).and(delTC_AF.gt(0)))
var Un_MAP_AF_2 = ui.Map.Layer(Un_MAP_AF_2, {palette:['blue'], min:1, max:1}, 'Un_MAP_AF_2',false)
Map.add(Un_MAP_AF_2)
*/
var Un_MAP_AF_3 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_3[0])).and(MOD44B_AF.lte(Class_3[1])).and(CHIRPS_AF.gte(MAP_class[1])).and(CHIRPS_AF.lt(MAP_class[2])).and(delTC_AF.lt(0)))
var Un_MAP_AF_3 = ui.Map.Layer(Un_MAP_AF_3, {palette:['red'], min:1, max:1}, 'Un_MAP_AF_3',false)
Map.add(Un_MAP_AF_3)

var Un_MAP_AF_4 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_4[0])).and(MOD44B_AF.lte(Class_4[1])).and(CHIRPS_AF.gte(MAP_class[1])).and(CHIRPS_AF.lt(MAP_class[2])).and(delTC_AF.gte(0)))
var Un_MAP_AF_4 = ui.Map.Layer(Un_MAP_AF_4, {palette:['blue'], min:1, max:1}, 'Un_MAP_AF_4',false)
Map.add(Un_MAP_AF_4)

var Un_MAP_AF_5 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_5[0])).and(MOD44B_AF.lte(Class_5[1])).and(CHIRPS_AF.gte(MAP_class[2])).and(CHIRPS_AF.lt(MAP_class[3])).and(delTC_AF.lt(0)))
var Un_MAP_AF_5 = ui.Map.Layer(Un_MAP_AF_5, {palette:['red'], min:1, max:1}, 'Un_MAP_AF_5',false)
Map.add(Un_MAP_AF_5)
var Un_MAP_AF_6 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_6[0])).and(MOD44B_AF.lte(Class_6[1])).and(CHIRPS_AF.gte(MAP_class[2])).and(CHIRPS_AF.lt(MAP_class[3])).and(delTC_AF.gte(0)))
var Un_MAP_AF_6 = ui.Map.Layer(Un_MAP_AF_6, {palette:['blue'], min:1, max:1}, 'Un_MAP_AF_6',false)
Map.add(Un_MAP_AF_6)
var Un_MAP_AF_7 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_7[0])).and(MOD44B_AF.lte(Class_7[1])).and(CHIRPS_AF.gte(MAP_class[3])).and(CHIRPS_AF.lte(MAP_class[4])).and(delTC_AF.lt(0)))
var Un_MAP_AF_7 = ui.Map.Layer(Un_MAP_AF_7, {palette:['red'], min:1, max:1}, 'Un_MAP_AF_7',false)
Map.add(Un_MAP_AF_7)
var Un_MAP_AF_8 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_8[0])).and(MOD44B_AF.lte(Class_8[1])).and(CHIRPS_AF.gte(MAP_class[3])).and(CHIRPS_AF.lte(MAP_class[4])).and(delTC_AF.gte(0)))
var Un_MAP_AF_8 = ui.Map.Layer(Un_MAP_AF_8, {palette:['blue'], min:1, max:1}, 'Un_MAP_AF_8',false)
Map.add(Un_MAP_AF_8)

//////////////// Other analysis /////////////////////////
// Outlier for Class 2,4 is taken above 50% Tree cover (MOD44B)
var Outlier_forest_g_2 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(50)).and(CHIRPS_AF.gte(MAP_class[0])).and(CHIRPS_AF.lt(MAP_class[1])).and(delTC_AF.gte(0)))
var Outlier_forest_g_2 = Outlier_forest_g_2.divide(Outlier_forest_g_2).multiply(2)
var Outlier_forest_g_4 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(50)).and(CHIRPS_AF.gte(MAP_class[1])).and(CHIRPS_AF.lt(MAP_class[2])).and(delTC_AF.gte(0)))
var Outlier_forest_g_4 = Outlier_forest_g_4.divide(Outlier_forest_g_4).multiply(2)
var Outlier_forest_l_5 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gt(Class_5[1])).and(CHIRPS_AF.gte(MAP_class[2])).and(CHIRPS_AF.lt(MAP_class[3])).and(delTC_AF.lt(0)))
var Outlier_forest_l_5 = Outlier_forest_l_5.divide(Outlier_forest_l_5).multiply(1)
var Outlier_forest_g_6 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gt(Class_6[1])).and(MOD44B_AF.lt(78.44999694824219)).and(CHIRPS_AF.gte(MAP_class[2])).and(CHIRPS_AF.lt(MAP_class[3])).and(delTC_AF.gte(0)))
var Outlier_forest_g_6 = Outlier_forest_g_6.divide(Outlier_forest_g_6).multiply(2)

Outlier_forest_g_2 = Outlier_forest_g_2.toShort().select(0).rename('Class');
Outlier_forest_g_4 = Outlier_forest_g_4.toShort().select(0).rename('Class');
Outlier_forest_l_5 = Outlier_forest_l_5.toShort().select(0).rename('Class');
Outlier_forest_g_6 = Outlier_forest_g_6.toShort().select(0).rename('Class');
var Outlier_forest = ee.ImageCollection.fromImages([Outlier_forest_g_2, Outlier_forest_g_4, Outlier_forest_l_5, Outlier_forest_g_6]);
var Outlier_forest = Outlier_forest.mosaic();
Map.addLayer(Outlier_forest, vizoutlier, 'AF: Low MAP forest (not-unstable)-(Class 2,4,5,6)', false)

///////// MAP Stable regions //////////
var Class_1 = [ 8.949999809265137 , null ]
var Class_2 = [ 9.949999809265137 , null]
var Class_3 = [ 8.550000190734863 , null]
var Class_4 = [ 7.25 , null]
var Class_5 = [ 4.250000189989805 , null ]
var Class_6 = [ 7.650000095367432 , null]
var Class_7 = [ 12.350000381469727 , 76.69999694824219 ]
var Class_8 = [ 7.650000095367432 , 78.4000015258789 ]

var St_MAP_AF_1 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_1[0])).and(CHIRPS_AF.gte(MAP_class[0])).and(CHIRPS_AF.lt(MAP_class[1])).and(delTC_AF.lt(0)))
var St_MAP_AF_1 = ui.Map.Layer(St_MAP_AF_1, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_AF_1',false)
Map.add(St_MAP_AF_1)
var St_MAP_AF_2 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_2[0])).and(CHIRPS_AF.gte(MAP_class[0])).and(CHIRPS_AF.lt(MAP_class[1])).and(delTC_AF.gte(0)))
var St_MAP_AF_2 = ui.Map.Layer(St_MAP_AF_2, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_AF_2',false)
Map.add(St_MAP_AF_2)
var St_MAP_AF_3 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_3[0])).and(CHIRPS_AF.gte(MAP_class[1])).and(CHIRPS_AF.lt(MAP_class[2])).and(delTC_AF.lt(0)))
var St_MAP_AF_3 = ui.Map.Layer(St_MAP_AF_3, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_AF_3',false)
Map.add(St_MAP_AF_3)
var St_MAP_AF_4 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_4[0])).and(CHIRPS_AF.gte(MAP_class[1])).and(CHIRPS_AF.lt(MAP_class[2])).and(delTC_AF.gte(0)))
var St_MAP_AF_4 = ui.Map.Layer(St_MAP_AF_4, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_AF_4',false)
Map.add(St_MAP_AF_4)
var St_MAP_AF_5 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_5[0])).and(CHIRPS_AF.gte(MAP_class[2])).and(CHIRPS_AF.lt(MAP_class[3])).and(delTC_AF.lt(0)))
var St_MAP_AF_5 = ui.Map.Layer(St_MAP_AF_5, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_AF_5',false)
Map.add(St_MAP_AF_5)
var St_MAP_AF_6 = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_6[0])).and(CHIRPS_AF.gte(MAP_class[2])).and(CHIRPS_AF.lt(MAP_class[3])).and(delTC_AF.gte(0)))
var St_MAP_AF_6 = ui.Map.Layer(St_MAP_AF_6, {palette:['#8c510a'], min:1, max:1}, 'St_MAP_AF_6',false)
Map.add(St_MAP_AF_6)
var MAP_St_Class_7_Sv = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_7[0])).and(CHIRPS_AF.gte(MAP_class[3])).and(CHIRPS_AF.lt(MAP_class[4])).and(delTC_AF.lt(0)))
var MAP_St_Class_7_Sv = MAP_St_Class_7_Sv.divide(MAP_St_Class_7_Sv).multiply(1)
var MAP_St_Class_7_Fr = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_7[1])).and(CHIRPS_AF.gte(MAP_class[3])).and(CHIRPS_AF.lt(MAP_class[4])).and(delTC_AF.lt(0)))
var MAP_St_Class_7_Fr = MAP_St_Class_7_Fr.divide(MAP_St_Class_7_Fr).multiply(2)
MAP_St_Class_7_Sv = MAP_St_Class_7_Sv.toShort().select(0).rename('Class');
MAP_St_Class_7_Fr = MAP_St_Class_7_Fr.toShort().select(0).rename('Class');
var MAP_St_Class_7 = ee.ImageCollection.fromImages([MAP_St_Class_7_Sv, MAP_St_Class_7_Fr]);
var MAP_St_Class_7 = MAP_St_Class_7.mosaic();
//Map.addLayer(MAP_St_Class_3, vizbistable, 'MAP_St-Class-3', false)
var MAP_St_Class_8_Sv = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.lte(Class_8[0])).and(CHIRPS_AF.gte(MAP_class[3])).and(CHIRPS_AF.lte(MAP_class[4])).and(delTC_AF.gte(0)))
var MAP_St_Class_8_Sv = MAP_St_Class_8_Sv.divide(MAP_St_Class_8_Sv).multiply(1)
var MAP_St_Class_8_Fr = MOD44B_AF.updateMask(Globcover_AF.gte(40).and(Globcover_AF.lte(180)).and(MOD44B_AF.gte(Class_8[1])).and(CHIRPS_AF.gte(MAP_class[3])).and(CHIRPS_AF.lte(MAP_class[4])).and(delTC_AF.gte(0)))
var MAP_St_Class_8_Fr = MAP_St_Class_8_Fr.divide(MAP_St_Class_8_Fr).multiply(2)
MAP_St_Class_8_Sv = MAP_St_Class_8_Sv.toShort().select(0).rename('Class');
MAP_St_Class_8_Fr = MAP_St_Class_8_Fr.toShort().select(0).rename('Class');
var MAP_St_Class_8 = ee.ImageCollection.fromImages([MAP_St_Class_8_Sv, MAP_St_Class_8_Fr]);
var MAP_St_Class_8 = MAP_St_Class_8.mosaic();
//Map.addLayer(MAP_St_Class_4, vizbistable, 'MAP_St-Class-4', false)
var St_MAP_AF_7 = MAP_St_Class_7
var St_MAP_AF_7 = ui.Map.Layer(St_MAP_AF_7, vizbistable, 'St_MAP_AF_7',false)
Map.add(St_MAP_AF_7)
var St_MAP_AF_8 = MAP_St_Class_8
var St_MAP_AF_8 = ui.Map.Layer(St_MAP_AF_8, vizbistable, 'St_MAP_AF_8',false)
Map.add(St_MAP_AF_8)

var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {color: 'black'},
    }),
]);
panel.add(intro);
//////////////////////////////////////////////////////////////////////

/////////////////// For the App (Africa) /////////////////////////////

//Map.add(panel)

//// Creating labels
var LocLabel = ui.Label({value:'For Africa',
style: {fontWeight: 'bold', fontSize: '14px', margin: '5px 5px'}
});

/// Checkbox
var extCheck1S = ui.Checkbox('0-593 mm/yr (Loss)').setValue(false); // false = unchecked
var extCheck2S = ui.Checkbox('0-593 mm/yr (Gain)').setValue(false);
var extCheck3S = ui.Checkbox('593-1075 mm/yr (Loss)').setValue(false);
var extCheck4S = ui.Checkbox('593-1075 mm/yr (Gain)').setValue(false); // false = unchecked
var extCheck5S = ui.Checkbox('1075-1468 mm/yr (Loss)').setValue(false);
var extCheck6S = ui.Checkbox('1075-1468 mm/yr (Gain)').setValue(false);
var extCheck7S = ui.Checkbox('≥ 1468 mm/yr (Loss)').setValue(false); // false = unchecked
var extCheck8S = ui.Checkbox('≥ 1468 mm/yr (Gain)').setValue(false);

// Pannel for Unstable regions
panel.add(LocLabel)
var savePanel = ui.Panel(
  [
    extCheck1S, extCheck2S, extCheck3S, extCheck4S, 
    extCheck5S, extCheck6S, extCheck7S, extCheck8S
  ],
  ui.Panel.Layout.Flow('vertical'))
  
// Previous next and search pannel
var mainPanel = ui.Panel({
  widgets: 
    [
      savePanel
    ],
  style: 
    {
      position: 'bottom-left', 
      width: '280px', 
      stretch: 'vertical',
    }
});
panel.add(mainPanel)


/////////// Adding function for each checkbox ////////////////
var doCheckbox_AF_MAP1 = function() {
  extCheck1S.onChange(function(checked){
    //Un_MAP_AF_1.setShown(checked),
    St_MAP_AF_1.setShown(checked)})
}
doCheckbox_AF_MAP1();
var doCheckbox_AF_MAP2 = function() {
  extCheck2S.onChange(function(checked){
    St_MAP_AF_2.setShown(checked)})
}
doCheckbox_AF_MAP2();
var doCheckbox_AF_MAP3 = function() {
  extCheck3S.onChange(function(checked){
    Un_MAP_AF_3.setShown(checked),
    St_MAP_AF_3.setShown(checked)})
}
doCheckbox_AF_MAP3();
var doCheckbox_AF_MAP4 = function() {
  extCheck4S.onChange(function(checked){
    Un_MAP_AF_4.setShown(checked),
    St_MAP_AF_4.setShown(checked)})
}
doCheckbox_AF_MAP4();
var doCheckbox_AF_MAP5 = function() {
  extCheck5S.onChange(function(checked){
    Un_MAP_AF_5.setShown(checked),
    St_MAP_AF_5.setShown(checked)})
}
doCheckbox_AF_MAP5();
var doCheckbox_AF_MAP6 = function() {
  extCheck6S.onChange(function(checked){
    Un_MAP_AF_6.setShown(checked),
    St_MAP_AF_6.setShown(checked)})
}
doCheckbox_AF_MAP6();
var doCheckbox_AF_MAP7 = function() {
  extCheck7S.onChange(function(checked){
    Un_MAP_AF_7.setShown(checked),
    St_MAP_AF_7.setShown(checked)})
}
doCheckbox_AF_MAP7();
var doCheckbox_AF_MAP8 = function() {
  extCheck8S.onChange(function(checked){
    Un_MAP_AF_8.setShown(checked),
    St_MAP_AF_8.setShown(checked)})
}
doCheckbox_AF_MAP8();



var panel3 = ui.Panel({
  style: {
    position: 'top-right',
    padding: '8px 15px',
  }
});
Map.add(panel3);
var extentLegend1 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
    }
    });
var paletteMAPa = [
'c7e9c0',//Forest
'f6e8c3',//Savanna
'ffffff'];

// Name of each legend value.
var namesa = ['High tree cover or Forest (Tree cover > 50%)','Low tree cover or Savanna (Tree cover ≤ 50)', 'Human-influenced land cover mask'];
// Add color and names to legend.
for (var i = 0; i < 3; i++) {
extentLegend1.add(makeRowa(paletteMAPa[i], namesa[i]));
}

// Pannel for Unstable regions
panel3.add(extentLegend1)

function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1], dimensions: '200x10',
      format: 'png', min: 0, max: 1, palette: palette,
    }, style: {stretch: 'horizontal', margin: '0px 8px'},
  });}

function makeLegend(low, mid, high, palette) {
  var labelPanel = ui.Panel(
      [ui.Label(low, {margin: '4px 8px'}),
        ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px'})
      ],ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([ColorBar(palette), labelPanel])
}

var LocLabel = ui.Label({value:'Select the variables below to plot',
style: {fontWeight: 'bold', fontSize: '16px', margin: '0px 5px'}
});
panel3.add(LocLabel);


/// Checkbox
var extCheck1_DD = ui.Checkbox('Tree cover (%)').setValue(false); // false = unchecked
var extCheck2_DD = ui.Checkbox('Tree cover change (ΔTC; pp)').setValue(false);
var extCheck3_DD = ui.Checkbox('Mean annual precipitation (mm/year)').setValue(false);
var extCheck4_DD = ui.Checkbox('Root zone storage capacity (Sr; mm)').setValue(false); // false = unchecked

// Pannel for Unstable regions

var savePanel = ui.Panel(
  [
    extCheck1_DD, extCheck2_DD, extCheck3_DD, extCheck4_DD  ],
  ui.Panel.Layout.Flow('vertical'))

var mainPanel = ui.Panel({
  widgets: 
    [
      savePanel
    ],
  style: 
    {
      position: 'bottom-left', 
      width: '400px', 
      stretch: 'vertical',
    }
});
panel3.add(mainPanel)

var doCheckbox_var1 = function() {
  extCheck1_DD.onChange(function(checked){
    a.setShown(checked)})
}
doCheckbox_var1();
var doCheckbox_var2 = function() {
  extCheck2_DD.onChange(function(checked){
    b.setShown(checked)})
}
doCheckbox_var2();
var doCheckbox_var3 = function() {
  extCheck3_DD.onChange(function(checked){
    c.setShown(checked)})
}
doCheckbox_var3();
var doCheckbox_var4 = function() {
  extCheck4_DD.onChange(function(checked){
    d.setShown(checked)})
}
doCheckbox_var4();


panel3.style().set('width', '400px');
var DataLabel = ui.Label({value:'Tree cover (TC; %)', style: {fontWeight: 'bold', fontSize: '12px', margin: '2px 10px', color: 'brown'}}); panel3.add(DataLabel)
panel3.add(makeLegend(0, 50, 100, ["bbe029","0a9501","074b03"]))
var DataLabel = ui.Label({value:'Change in tree cover (ΔTC; % change)', style: {fontWeight: 'bold', fontSize: '12px', margin: '2px 10px', color: 'brown'}}); panel3.add(DataLabel)
panel3.add(makeLegend(-15, 0, 15, ["#8c510a","#d8b365","#f6e8c3","#f5f5f5","#c7eae5","#5ab4ac","#01665e"]))
var DataLabel = ui.Label({value:'Rainfall (MAP; mm/year)', style: {fontWeight: 'bold', fontSize: '12px', margin: '2px 10px', color: 'brown'}}); panel3.add(DataLabel)
panel3.add(makeLegend(0, 2250, 4500, ['#eff3ff','#c6dbef','#9ecae1','#6baed6','#3182bd','#08519c']))
var DataLabel = ui.Label({value:'Root zone storage capacity (Sr; mm)', style: {fontWeight: 'bold', fontSize: '12px', margin: '2px 10px', color: 'brown'}}); panel3.add(DataLabel)
panel3.add(makeLegend(0, 400, 800, ['#0571b0','#92c5de','#d9d9d9','#f4a582','#ca0020']))

//////////////////////////////////////////////////

Map.addLayer(MOD44B_unmod_SD,{palette: ['#edf8fb','#88419d'], min: 6, max: 10}, 'TC_SD', false)

//Map.addLayer(MOD44B_unmod, visualization, 'TC')
//////////// Click chart //////////////////////////
// Create a panel to hold our widgets.
var panel2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
panel2.style().set('width', '300px');

// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Tree cover time series plot',
    style: {fontSize: '20px', fontWeight: 'bold', position:'bottom-left'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);

Map.add(panel2);

panel2.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel2.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));

// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Longitude: ' + coords.lon.toFixed(2)),
  lat.setValue('Latitude: ' + coords.lat.toFixed(2));
  
  var extent = 0.1 // Chenge this to change the extent of the area of interest
  // Register a callback on the default map to be invoked when the map is clicked.
    var AOI = ee.FeatureCollection(ee.Geometry.Polygon(
          [[[coords.lon-extent, coords.lat-extent],
            [coords.lon-extent, coords.lat+extent],
            [coords.lon+extent, coords.lat+extent],
            [coords.lon+extent, coords.lat-extent]]]));
    var box = ui.Map.Layer(AOI, {color: 'FF0000'});
    Map.layers().set(0, AOI);

  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point);
  //Map.layers().set(0, dot);
  
  var rgbChart = ui.Chart.image.seriesByRegion(MOD44B_unmod, AOI, 
    ee.Reducer.mean())
      .setOptions({
        title: 'Tree cover (%) trend',
        vAxis: {title: 'Tree cover (%)', 
        titleTextStyle: {italic: false, bold: true}, viewWindow: {min: 0, max: 100}},
        hAxis: {title: 'Year', format: 'yyyy', 
        titleTextStyle: {italic: false, bold: true}, gridlines: {count: 7}},
        colors: ['1d6b99'], lineSize: 3,  pointSize: 0, legend: {position: 'none'}, curveType: 'function'
      });
   panel2.widgets().set(2, rgbChart);


  var resolution = 5550;
});


Map.addLayer(Boundary_SA, imageVisParam, 'Administrative Boundaries');
Map.addLayer(Boundary_AF, imageVisParam, 'Administrative Boundaries');
