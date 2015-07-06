document.write('<div id="divCalendar" onmouseover="isOut=false" onmouseout="isOut=true"><div id="header"><select id="year"></select>年<select id="month"></select>月</div>'+
			'<hr /><table border="0" id="table"></table></div>');
var isOut = true; //保存鼠标是否在div中这个状态(默认不在区域中)
var codediv = document.getElementById("divCalendar"); //日历大div
var inputElem = document.getElementById("time"); //input
var yearID = document.getElementById("year"); //年
var monthID = document.getElementById("month"); //月
/*当天年月日*/
var nowDate = new Date();
var nowYear = nowDate.getFullYear();
var nowMonth = nowDate.getMonth() + 1;
var nowDate = nowDate.getDate();
//通常情况下每月的天数
var  MonthDay  =  new  Array(31,  28,  31,  30,  31,  30,  31,  31,  30,  31,  30,  31);  
//判断是否为闰年
function  isBissextile(year) {     
		var  isBis  =  false;  
		//如果是闰年返回true，否则返回false。   
		if  (0 == year % 4 && ((year % 100 != 0) || (year % 400 == 0)))  {      
			isBis  =  true;     
		}     
		return  isBis;    
	}  
	//计算每月天数,闰年二月为29天    

function everyMonthCount(year, month) {
		var mCount = MonthDay[month - 1];
		//闰年二月为29天
		if (month == 2 && isBissextile(year)) {
			mCount = MonthDay[month - 1] + 1;
		}
		return mCount;
	}
	//计算某年某月某天为星期几

function WeekDay(year, month, date) {
		var myDate = new Date();
		myDate.setFullYear(year, month - 1, date);
		var dayNum = myDate.getDay();
		return dayNum;
	}
	//初始化日期面板

function initialCalen(thisYear, thisMonth) {
		var talbeHtml = '	<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr><tr>';
		//算出当前年月1号是星期几,从而确定1号的位置
		var weekCount = WeekDay(thisYear, thisMonth, 1);
		for (var spaceCount = 0; spaceCount < weekCount; spaceCount++) {
			talbeHtml += '<td></td>';
		}
		//计算出当前年月的天数
		var dayCount = everyMonthCount(thisYear, thisMonth);
		//循环输出天数
		for (var dayShow = 1; dayShow <= dayCount; dayShow++) {
			if (dayShow == nowDate && thisYear == nowYear && thisMonth == nowMonth) {
				talbeHtml += '<td id="tdNow" onclick="showDate(' + dayShow + ')">' + dayShow + '</td>';
			} else {
				talbeHtml += '<td onclick="showDate(' + dayShow + ')">' + dayShow + '</td>';
			}
			if (WeekDay(thisYear, thisMonth, dayShow) == 6) {
				//星期六换行显示
				talbeHtml += '</tr><tr>';
			}
		}
		//每月最后一天是星期几
		var lastDayWeek = WeekDay(thisYear, thisMonth, dayCount);
		//最后一天不是星期六，用空单元格填充
		if (lastDayWeek != 6) {
			for (var dayI = lastDayWeek; dayI < 6; dayI++) {
				talbeHtml += '<td></td>';
			}
		}
		talbeHtml += '<tr>';
		document.getElementById("table").innerHTML = talbeHtml;
	}
	//input文本框显示日期

function showDate(obj) {
		var yValue = yearID.value;
		var mValue = monthID.value;
		if (obj < 10) {
			obj = '0' + obj;
		}
		if (mValue < 10) {
			mValue = "0" + mValue;
		}
		var totalDate = yValue + "/" + mValue + "/" + obj;
		inputElem.value = totalDate;
		hiddenCalen();
	}
	//阻止冒泡

function stopBubble(e) {
		//一般用在鼠标或键盘事件上
		if (e && e.stopPropagation) {
			//W3C取消冒泡事件
			e.stopPropagation();
		} else {
			//IE取消冒泡事件
			window.event.cancelBubble = true;
		}
	}
	//显示日期面板

function showCalen(e) {
		codediv.style.display = "block";
		stopBubble(e); //阻止冒泡，防止触发document.onmousedown事件
	}
	//不显示日期面板

function hiddenCalen() {
		codediv.style.display = "none";
	}
	//改变年或月时，日期面板改变

function changeYearMonth() {
	var yearValue = yearID.value;
	var monthValue = monthID.value;
	initialCalen(yearValue, monthValue);
}

window.onload = function() {
		//初始化日历控件的位置，使其紧跟input
        var inputLeft=inputElem.offsetLeft;
        var inputTop=inputElem.offsetTop+29;
        codediv.style.left=inputLeft+"px";
        codediv.style.top=inputTop+"px";
       
		//初始化年月下拉列表和当前年月日日前面板
		var yearHtml = "";
		var monthHtml = "";
		for (var i = 2020; i > 1970; i--) {
			if (i == nowYear) {
				yearHtml += '<option selected="selected">' + i + '</option>';
			} else {
				yearHtml += '<option>' + i + '</option>';
			}
		}
		for (var j = 1; j < 13; j++) {
			if (j == nowMonth) {
				monthHtml += '<option selected="selected">' + j + '</option>';
			} else {
				monthHtml += '<option>' + j + '</option>';
			}
		}
		yearID.innerHTML = yearHtml;
		monthID.innerHTML = monthHtml;
		initialCalen(nowYear, nowMonth);
	}
	/*点击DIV以外的地方，隐藏该DIV*/
document.onmousedown = function() {
	if (codediv.style.display != "none" && isOut) {
		hiddenCalen();
	}
}
inputElem.onfocus = function() {
	showCalen(event);
}
yearID.onchange = function() {
	changeYearMonth();
}
monthID.onchange = function() {
	changeYearMonth();
}