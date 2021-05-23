var n = 0

function buyAll(){
	falopa('buyNow')
}

function bidAll(){
	falopa('makeBid')
}

function falopa(action){
	var lengthItems = getPageItems().length;
	if(n<lengthItems){
		var item = getNextItem(n)
		setNextItemInView(item)
		var bidParams = {_observers:[{cb:getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._onBid,scope:getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController}]}
		this[action](bidParams,item)
		n = n+1
		setTimeout(function myFunction() {
		  falopa(action)
		}, 1500);
	} else {
		n = 0
	}
}

function makeBid(bidParams,item){
	var price = getBidPrice(item)
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._onBid(bidParams,price)
}

function buyNow(bidParams,item){
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._requestedBid = item._auction.buyNowPrice
	getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._itemDetailController._currentController._eBidConfirmed()
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
	return item._auction.currentBid?UTCurrencyInputControl.getIncrementAboveVal(item._auction.currentBid):item._auction.startingBid
}

UTTransferMarketPaginationViewModel.prototype.getCurrentItem = function getCurrentItem() {
	window.resultJumperInterface()
    return this._paginationList.current()
}

window.resultJumperInterface = function() {
  if (jQuery(".flat.pagination.prev").length) {
    if (jQuery(".flat.pagination.prev").first().length) {
      if (!jQuery("#bidAll").length) {
        jQuery(".flat.pagination.prev").first().after(`<button id="bidAll" class="flat" onclick="bidAll()" style="margin-left:10px">Bid all\n</button>`);
      }
      if (!jQuery("#buyAll").length) {
        jQuery(".flat.pagination.prev").first().after(`<button id="buyAll" class="flat" onclick="buyAll()" style="">Buy all\n</button>`);
      }
    }
  }
}



