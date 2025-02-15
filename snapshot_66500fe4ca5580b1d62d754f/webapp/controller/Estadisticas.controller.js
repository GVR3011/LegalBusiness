sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.pruebasLina.controller.Estadisticas", {
		handleRouteMatched: function(oEvent) {
			var sAppId = "App66500fe4ca5580b1d62d754f";

			var oParams = {};

			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;

			} else {
				if (this.getOwnerComponent().getComponentData()) {
					var patternConvert = function(oParam) {
						if (Object.keys(oParam).length !== 0) {
							for (var prop in oParam) {
								if (prop !== "sourcePrototype" && prop.includes("Set")) {
									return prop + "(" + oParam[prop][0] + ")";
								}
							}
						}
					};

					this.sContext = patternConvert(this.getOwnerComponent().getComponentData().startupParameters);

				}
			}

			var oPath;

			if (this.sContext) {
				oPath = {
					path: "/" + this.sContext,
					parameters: oParams
				};
				this.getView().bindObject(oPath);
			}

		},
		_onButtonPress: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}

		},
		getQueryParameters: function(oLocation) {
			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		applyFiltersAndSorters: function(sControlId, sAggregationName, chartBindingInfo) {
			if (chartBindingInfo) {
				var oBindingInfo = chartBindingInfo;
			} else {
				var oBindingInfo = this.getView().byId(sControlId).getBindingInfo(sAggregationName);
			}
			var oBindingOptions = this.updateBindingOptions(sControlId);
			this.getView().byId(sControlId).bindAggregation(sAggregationName, {
				model: oBindingInfo.model,
				path: oBindingInfo.path,
				parameters: oBindingInfo.parameters,
				template: oBindingInfo.template,
				templateShareable: true,
				sorter: oBindingOptions.sorters,
				filters: oBindingOptions.filters
			});

		},
		updateBindingOptions: function(sCollectionId, oBindingData, sSourceId) {
			this.mBindingOptions = this.mBindingOptions || {};
			this.mBindingOptions[sCollectionId] = this.mBindingOptions[sCollectionId] || {};

			var aSorters = this.mBindingOptions[sCollectionId].sorters;
			var aGroupby = this.mBindingOptions[sCollectionId].groupby;

			// If there is no oBindingData parameter, we just need the processed filters and sorters from this function
			if (oBindingData) {
				if (oBindingData.sorters) {
					aSorters = oBindingData.sorters;
				}
				if (oBindingData.groupby || oBindingData.groupby === null) {
					aGroupby = oBindingData.groupby;
				}
				// 1) Update the filters map for the given collection and source
				this.mBindingOptions[sCollectionId].sorters = aSorters;
				this.mBindingOptions[sCollectionId].groupby = aGroupby;
				this.mBindingOptions[sCollectionId].filters = this.mBindingOptions[sCollectionId].filters || {};
				this.mBindingOptions[sCollectionId].filters[sSourceId] = oBindingData.filters || [];
			}

			// 2) Reapply all the filters and sorters
			var aFilters = [];
			for (var key in this.mBindingOptions[sCollectionId].filters) {
				aFilters = aFilters.concat(this.mBindingOptions[sCollectionId].filters[key]);
			}

			// Add the groupby first in the sorters array
			if (aGroupby) {
				aSorters = aSorters ? aGroupby.concat(aSorters) : aGroupby;
			}

			var aFinalFilters = aFilters.length > 0 ? [new sap.ui.model.Filter(aFilters, true)] : undefined;
			return {
				filters: aFinalFilters,
				sorters: aSorters
			};

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("Estadisticas").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

			var oView = this.getView(),
				oData = {},
				self = this;
			var oModel = new sap.ui.model.json.JSONModel();
			oView.setModel(oModel, "staticDataModel");
			self.oBindingParameters = {};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177"] = {};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177"]["data"] = [{
				"dim0": "1",
				"mea0": "4",
				"__id": 0
			}, {
				"dim0": "2",
				"mea0": "3",
				"__id": 1
			}, {
				"dim0": "3",
				"mea0": "1",
				"__id": 2
			}, {
				"dim0": "4",
				"mea0": "3",
				"__id": 3
			}, {
				"dim0": "5",
				"mea0": "1",
				"__id": 4
			}];

			self.oBindingParameters['sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177'] = {
				"path": "/sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177/data",
				"model": "staticDataModel",
				"parameters": {}
			};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177"]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878"] = {};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878"]["data"] = [{
				"dim0": "1",
				"mea0": "2",
				"__id": 0
			}, {
				"dim0": "2",
				"mea0": "3",
				"__id": 1
			}, {
				"dim0": "3",
				"mea0": "5",
				"__id": 2
			}, {
				"dim0": "4",
				"mea0": "3",
				"__id": 3
			}, {
				"dim0": "5",
				"mea0": "5",
				"__id": 4
			}];

			self.oBindingParameters['sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878'] = {
				"path": "/sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878/data",
				"model": "staticDataModel",
				"parameters": {}
			};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878"]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730"] = {};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730"]["data"] = [{
				"dim0": "1",
				"mea0": "0",
				"__id": 0
			}, {
				"dim0": "2",
				"mea0": "2",
				"__id": 1
			}, {
				"dim0": "3",
				"mea0": "6",
				"__id": 2
			}, {
				"dim0": "4",
				"mea0": "4",
				"__id": 3
			}, {
				"dim0": "5",
				"mea0": "1",
				"__id": 4
			}];

			self.oBindingParameters['sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730'] = {
				"path": "/sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730/data",
				"model": "staticDataModel",
				"parameters": {}
			};

			oData["sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730"]["vizProperties"] = {
				"plotArea": {
					"dataLabel": {
						"visible": true,
						"hideWhenOverlap": true
					}
				}
			};

			oView.getModel("staticDataModel").setData(oData, true);

			function dateDimensionFormatter(oDimensionValue, sTextValue) {
				var oValueToFormat = sTextValue !== undefined ? sTextValue : oDimensionValue;
				if (oValueToFormat instanceof Date) {
					var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
						style: "short"
					});
					return oFormat.format(oValueToFormat);
				}
				return oValueToFormat;
			}

			var aDimensions = oView.byId("sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

			var aDimensions = oView.byId("sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

			var aDimensions = oView.byId("sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730").getDimensions();
			aDimensions.forEach(function(oDimension) {
				oDimension.setTextFormatter(dateDimensionFormatter);
			});

		},
		onAfterRendering: function() {

			var oChart,
				self = this,
				oBindingParameters = this.oBindingParameters,
				oView = this.getView();

			oChart = oView.byId("sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177");
			oChart.bindData(oBindingParameters['sap_m_Page_0-content-sap_chart_ColumnChart-1716538252177']);

			oChart = oView.byId("sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878");
			oChart.bindData(oBindingParameters['sap_m_Page_0-content-sap_chart_ColumnChart-1716538227878']);

			oChart = oView.byId("sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730");
			oChart.bindData(oBindingParameters['sap_m_Page_0-content-sap_chart_ColumnChart-1716538245730']);

		}
	});
}, /* bExport= */ true);
