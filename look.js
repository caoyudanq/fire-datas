var daoShiTop;
var daoShiTimeSlot;

var $searchButton ;
var medianame;
var color = ['#00a6ba', '#E73278', '#8dc556', '#ffa704', '#a092f1', '#3cb371', '#ffaf51'];
var paramsMap ={
		USERCOUNT:"收视人数",
		VIEWCOUNT:"收视次数",
		PERVIEWSECOND:"平均收视时长",
		UV:"收视人数",
		PV: "收视次数"
}


function hideDiv() {
	console.log("隐藏方法");
	document.getElementById("main").style.display = "none";
}

function showDiv() {
	console.log("显示方法");
	document.getElementById("main").style.display = "";
}

function bulidRankingEchart(qdi,div,yName,fields,type,productname,ordertype,title){
	var param = {
			qdi: qdi,
			starttime: document.getElementById("datetimepicker").value,
			endtime: document.getElementById("datetimepicker2").value,
			productname:productname
	};
	param = param;
	$.ajax({
		async: true,
		data: param,
		url: '/DaoShi/' + qdi,
		dataType: 'json',
		success: function (res) {
			var resultDate = res;
			var echartsData = bulidRankingData(resultDate,yName,fields,type);
			if(type=="ranking"){
				echartsData.yData = echartsData.yData.slice(-20);
				echartsData.seriseData = echartsData.seriseData.map(function (currentValue) {
					var tempValue = currentValue;
					tempValue.data = tempValue.data.slice(-20);
					return tempValue;
				});
			}
			div.clear();

			var option = buildRanking(echartsData.yData, echartsData.seriseData, echartsData.params,title);
			div.setOption(option);
			window.onresize = div.resize;
			$("#"+div._dom.id).html('<img src="' + div.getDataURL() + '"/>');
		}
	});
}

function bulidRankingData(data,yName,fields,type){
	var yData = [];
	var seriseData = new Map();
	for(var i = 0 ,len = fields.length;i<len;i++){
		seriseData.set(fields[i],{
			name:paramsMap[fields[i]],
			type:"bar",
			lineStyle : {
				normal : {
					width : 3,
					shadowColor : 'rgba(0,0,0,0.4)',
					shadowBlur : 10,
					shadowOffsetY : 10
				}
			},
			label:{
				normal:{
					show:true,
					position:type=="ranking"?"right":"top",
							formatter:function(params){
								return  getNumSeparator(params.value);
							}
				}
			},
			itemStyle: {
				normal: {
					color: color[i]
				}
			},
			data:[]
		});
	}

	for(var i = 0 ,len = data[yName].length;i<len;i++){
		yData.push(data[yName][i]);
		seriseData.forEach(function (value,key,map) {
			value.data.push(data[key][i]);
		});
	}
	var seriseTemp = [];
	var legendData = [];
	seriseData.forEach(function (value,key,map) {
		seriseTemp.push(value);
		legendData.push(value.name)
	});

	return {
		yData:yData,
		seriseData:seriseTemp,
		params:{
			legendData:legendData,
			type:type
		}
	};
}


function buildRanking(yData,seriesData,params,title){
	var option =  {
			title : {
				text : title,
				subtext : '',
				x : 'left'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				top:"4%",
				data:params.legendData||[""]
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '4%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap : [ 0, 0.01 ],
				splitLine:{
					show:false
				}
			},
			yAxis: {
				type: 'category',
				data: yData,
				inverse:params.type == "ranking" && params.legendData.length > 1,
				axisLabel:{
					textStyle: {
						fontFamily: '微软雅黑',
						fontSize: 13,
						color: '#00a6ba'
					}
				},
				splitLine:{
					show:false
				}
			},
			series: seriesData,
	};
	if(params.type=="bar"){
		var temp = option.xAxis;
		option.xAxis = option.yAxis;
		option.yAxis = temp;
		option.xAxis.type="category";
	}

	return option;
}

function myDate() {
	var mydate = new Date();
	var year = mydate.getFullYear();
	var month = mydate.getMonth() + 1;
	var day = mydate.getDate() ;
	if(day == "1")
	{
		if(month=="1")
		{year = year - 1;
		month = 12;}else
		{	month = month - 1 ;
		if(month=="1"||month=="3"||month=="5"||month=="7"||month=="8"||month=="10"||month=="12")
		{day = "31";}
		if(month=="4"||month=="6"||month=="9"||month=="11")
		{day = "30";}
		if(month=="2")
		{
			if (year % 400 == 0)
			{ day = 29;}else
			{if (year % 4==0&&(year % 100 != 0))
			{
				day =  29;
			}
			day =  28;
			}
		}
		}
	}else
	{
		day = day -1;
	}
	if (month < 10)
	{month = "0" + month;}
	if(day<10)
	{day = "0" + day;}
	document.getElementById("datetimepicker").value = year + "/"
	+ month + "/" + day;
	document.getElementById("datetimepicker2").value = year + "/"
	+ month + "/" + day;
}

function init() {
	$searchButton = $('#searchButton');
	//订购
	rhdbOrder_vip =  echarts.init(document.getElementById("rhdbOrder_vip"));
	rhdbOrder_tbyy =  echarts.init(document.getElementById("rhdbOrder_tbyy"));
	rhdbOrder_4k =  echarts.init(document.getElementById("rhdbOrder_4k"));
	rhdbOrder_cf =  echarts.init(document.getElementById("rhdbOrder_cf"));
}

function initView() {
	//订购
	bulidRankingEchart("RHDB4KTbyyServlet",rhdbOrder_vip,"pagename",["totle"],"bar","VIP","","PP订购情况");
	bulidRankingEchart("RHDB4KTbyyServlet",rhdbOrder_tbyy,"pagename",["totle"],"bar","productname","","YY订购情况");
	bulidRankingEchart("RHDB4KTbyyServlet",rhdbOrder_4k,"pagename",["totle"],"bar","4K","","XX订购情况");
	bulidRankingEchart("RHDBCFOrderChartServlet",rhdbOrder_cf,"mediacode",["totle"],"ranking","","","ZZ订购情况");

}

function initListener() {
	$searchButton.click(function () {
		initView();
	});
}
$(function () {

	myDate();
	init();
	initView();
	initListener();

});

