var xhr = Titanium.Network.createHTTPClient();
var tableView;
var data = [];
var words = [{creole:'test', english:'translation'},{creole:'test1', english:'translation'},{creole:'test2', english:'translation'}];
var template = {
 rowHeight:50,
 layout:[
   {type:'text', fontSize:16, fontWeight:'bold', left:10, top:14, width:290, height:40, color:'#222', name:'word'}
]};

function buildData(creole, english) {
	data.push({word:creole, translation:english, title:creole, hasChild:true});
}

function buildTable() {
	var search = Titanium.UI.createSearchBar({barColor:'#ddd', showCancel:false});
	search.addEventListener('change', function(e) {  e.value; }); 
	search.addEventListener('return', function(e) { search.blur(); });
	search.addEventListener('cancel', function(e) { search.blur(); });
	
	for(var index in words) {
	  buildData(words[index].creole,words[index].english);
	}
	
	var win;
	tableView = Titanium.UI.createTableView({
		template:template, 
		data:data,
		search:search,
		filterAttribute:'word'
		}, function(eventObject) {
		  if (eventObject.searchMode==true) { 
				search.blur();
			}
		  Titanium.API.info(eventObject.rowData);
		  Titanium.App.Properties.setString("englishTranslation",eventObject.rowData.translation);
      // win = Titanium.UI.createWindow({url:'/detail.html', title:eventObject.rowData.word});
      // win.open({animated:true});
		});

	Titanium.UI.currentWindow.addView(tableView);
	Titanium.UI.currentWindow.showView(tableView);
}

window.onload = function(){
  var infoButton = Titanium.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.INFO_LIGHT });
  infoButton.addEventListener("click", function(){
    var win = Titanium.UI.createWindow({url:'/about.html', title:"About"});
    win.open({modal:true});
  });
	Titanium.UI.currentWindow.setRightNavButton(infoButton);

  // document.getElementById("loading").style.display = "block";
	if(Titanium.Platform.name == 'android') {
		activityIndicator = Titanium.UI.createActivityIndicator();
		activityIndicator.setMessage('Loading...');
    activityIndicator.setLocation(Titanium.UI.ActivityIndicator.DIALOG);
    activityIndicator.setType(Titanium.UI.ActivityIndicator.INDETERMINANT);
	} else {
		activityIndicator = Titanium.UI.createActivityIndicator({id:'loading', style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG});
	}
	
  // activityIndicator.show();
	buildTable();
};