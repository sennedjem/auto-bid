var n = 0

function falopa(){
	var lengthItems = getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._paginationViewModel._paginationList._collection.length;
	if(n<lengthItems){
		var item = obtenerSiguienteItem(n)
		pasarASiguienteItem(item)
		var bidParams = {_observers:[{cb:getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._onBid,scope:getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController}]}
		var precio = item._auction.currentBid?item._auction.currentBid:item._auction.startingBid
		pujar(bidParams,precio)
		n = n+1
		setTimeout(function myFunction() {
		  falopa(n)
		}, 1500);
	}
}

function pujar(bidParams,precio){
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._onBid(bidParams,precio)
}

function obtenerSiguienteItem(n){
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._paginationViewModel._paginationList._collection[n]
}

function pasarASiguienteItem(item){
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._eRowSelected(getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._view, "rowselect", { item: item })
}
