var n = 0

function falopa(){
	var lengthItems = getPageItems().length;
	if(n<lengthItems){
		var item = getNextItem(n)
		setNextItemInView(item)
		var bidParams = {_observers:[{cb:getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._onBid,scope:getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController}]}
		var price = getBidPrice(item)
		makeBid(bidParams,price)
		n = n+1
		setTimeout(function myFunction() {
		  falopa(n)
		}, 1500);
	} else {
		n = 0
	}
}

function makeBid(bidParams,precio){
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._onBid(bidParams,precio)
}

function getNextItem(n){
	return getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._paginationViewModel._paginationList._collection[n]
}

function setNextItemInView(item){
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._eRowSelected(getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._view, "rowselect", { item: item })
}

function getPageItems(){
	return getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._listController._paginationViewModel._paginationList._collection
}

function getBidPrice(item){
	return item._auction.currentBid?item._auction.currentBid:item._auction.startingBid
}
