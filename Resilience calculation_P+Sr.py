import numpy as np
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import rioxarray as rx
from tqdm import tqdm
import seaborn as sns 
import pandas as pd
import xarray as xr
from tqdm import trange, tqdm, tqdm_notebook
from shapely.geometry import Polygon
import cartopy

#############################################################
################# For South America #########################
#############################################################

## Running the logistic regression model ###
#RZS_TC = pd.read_pickle('/home/chandra/data/Stable_unstable_paper/Dataframe_updated_SA-29.03.2021.pkl')
RZS_TC = pd.read_pickle('/Input_/Dataframe_updated_SA-29.03.2021.pkl')

for classes in [11,14,20,30,190,200,210,220,230]:
    RZS_TC = RZS_TC[RZS_TC.Landuse != int(classes)]

RZS_TC['Mean_TC'] = RZS_TC['Mean_Treecover']

RZS_TC[['Sr','MAP','Mean_Treecover','TC_f-i']].columns.values

RZS_TC.loc[RZS_TC['Mean_Treecover'] <= 50, 'Mean_Treecover' ] = 0
RZS_TC.loc[RZS_TC['Mean_Treecover'] > 50, 'Mean_Treecover' ] = 1

RZS_TC['TC_f-i_mod'] = RZS_TC['TC_f-i'].abs()

RZS_TC.rename(columns = {'TC_f-i_mod' : 'delTCmod'}, inplace = True)

print(RZS_TC['Sr'].where(RZS_TC['Mean_TC'] > 50).dropna().quantile(0.99))

RZS_TC['Sr_expendable'] = RZS_TC['Sr']

print('Sr_max_99th-percentile')
RZS_TC.loc[RZS_TC['Mean_TC'] < 30, 'Sr_expendable' ] = RZS_TC['Sr'].where(RZS_TC['Mean_TC'] > 50).dropna().quantile(0.99)

from statsmodels.formula.api import mnlogit
import statsmodels.api as sm
model = mnlogit("Mean_Treecover ~ MAP+ Sr_expendable", RZS_TC).fit()
print(model.summary2())

###############

## Download and add CHIRPS precipitation data
MAP = xr.open_rasterio('/home/chandra/data/Stable_unstable_paper/MAP_chirps_2000-2019_SA.tif')[0,:-2]
MAP = MAP.where(MAP != -9999)

## Download and add Landuse data
Landuse = xr.open_rasterio('/home/chandra/data/Paper2/Landuse_Globcover_250m_SA.tif')[0,:-2,:-1]
for classes in [11,14,20,30,190,200,210,220]:
    Landuse = Landuse.where(Landuse != classes)

## Download and add tree cover data
Treecover_mean = xr.open_dataset('/home/chandra/data/MOD44B_Treecover/Tropic_250m/MOD44B.006_250m_aid0001_mean_2000-2019_SA.nc').Percent_Tree_Cover
Treecover_mean = Treecover_mean.where(Treecover_mean !=  200)

## Download and add root zone storage capacity data
S_r = xr.open_rasterio('/home/chandra/data/Paper2/Rootzone_250m_SA.tif')[0,:-1]
S_r = S_r.where(S_r !=  0)

## Add SA-dataframe here
dataframe = pd.DataFrame({'MAP': MAP.values.flatten(), 'Sr_expendable': S_r.values.flatten(), 'delTCmod': np.abs(TC_f_i.values.flatten()), 
                          'Mean_TC': Treecover_mean.values.flatten(), 'Landuse': Landuse.values.flatten()})

dataframe = dataframe.where(dataframe.Mean_TC > 50)

prediction = model.predict(sm.add_constant(dataframe[['MAP','Sr_expendable','delTCmod']]))[1].values
prediction = prediction.reshape(31200, 28800)

## Save the data as *.tif
import rioxarray
(prediction*(Landuse/Landuse)).rio.to_raster("/home/chandra/data/Stable_unstable_paper/Resilience/Resilience(P+Sr)_SA.tif")


#############################################################
################# For Africa ################################
#############################################################

## Running the logistic regression model ###
#RZS_TC = pd.read_pickle('/home/chandra/data/Stable_unstable_paper/Dataframe_updated_AF-29.03.2021.pkl')
RZS_TC = pd.read_pickle('/Input_data/Dataframe_updated_AF-29.03.2021.pkl')

for classes in [11,14,20,30,190,200,210,220,230]:
    RZS_TC = RZS_TC[RZS_TC.Landuse != int(classes)]

RZS_TC['Mean_TC'] = RZS_TC['Mean_Treecover']

RZS_TC[['Sr','MAP','Mean_Treecover','TC_f-i']].columns.values

RZS_TC.loc[RZS_TC['Mean_Treecover'] <= 50, 'Mean_Treecover' ] = 0
RZS_TC.loc[RZS_TC['Mean_Treecover'] > 50, 'Mean_Treecover' ] = 1

RZS_TC['TC_f-i_mod'] = RZS_TC['TC_f-i'].abs()

RZS_TC.rename(columns = {'TC_f-i_mod' : 'delTCmod'}, inplace = True)

print(RZS_TC['Sr'].where(RZS_TC['Mean_TC'] > 50).dropna().quantile(0.99))

RZS_TC['Sr_expendable'] = RZS_TC['Sr']

print('Sr_max_99th-percentile')
RZS_TC.loc[RZS_TC['Mean_TC'] < 30, 'Sr_expendable' ] = RZS_TC['Sr'].where(RZS_TC['Mean_TC'] > 50).dropna().quantile(0.99)

from statsmodels.formula.api import mnlogit
import statsmodels.api as sm
model = mnlogit("Mean_Treecover ~ MAP+ Sr_expendable", RZS_TC).fit()
print(model.summary2())

###############
## Download and add CHIRPS precipitation data
MAP = xr.open_rasterio('/home/chandra/data/Stable_unstable_paper/MAP_chirps_2000-2019_AF.tif')[0]
MAP = MAP.where(MAP != -9999)

## Download and add Landuse data
Landuse = xr.open_rasterio('/home/chandra/data/Paper2/Landuse_Globcover_250m_AF.tif').sel(y = slice(10,-35), x = slice(-20,50))[0]
for classes in [11,14,20,30,190,200,210,220]:
    Landuse = Landuse.where(Landuse != classes)

## Download and add Tree cover data
Treecover_mean = xr.open_dataset('/home/chandra/data/MOD44B_Treecover/Tropic_250m/MOD44B.006_250m_aid0001_mean_2000-2019_AF.nc').Percent_Tree_Cover
Treecover_mean = Treecover_mean.where(Treecover_mean !=  200)

## Download and add Root zone storage capacity data
S_r = xr.open_rasterio('/home/chandra/data/Paper2/Rootzone_250m_AF.tif').sel(y = slice(10,-35), x = slice(-20,50))[0]
S_r = S_r.where(S_r !=  0)

## Add AF-dataframe here
dataframe = pd.DataFrame({'MAP': MAP.values.flatten(), 'Sr_expendable': S_r.values.flatten(), 'delTCmod': np.abs(TC_f_i.values.flatten()), 
                          'Mean_TC': Treecover_mean.values.flatten(), 'Landuse': Landuse.values.flatten()})

dataframe = dataframe.where(dataframe.Mean_TC > 50)

prediction = model.predict(sm.add_constant(dataframe[['MAP','Sr_expendable','delTCmod']]))[1].values
prediction = prediction.reshape(21600, 33600)

## Save the data as *.tif
import rioxarray
(prediction*(Landuse/Landuse)).rio.to_raster("/home/chandra/data/Stable_unstable_paper/Resilience/Resilience(P+Sr)_AF.tif")