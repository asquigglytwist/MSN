// JavaScript Document

var MSN = MSN || {};
MSN.sGalleryDivID = "Gallery";
MSN.ndGallery = undefined;
MSN.sEventsClass = ".event";
MSN.ndAllEvents = [];
MSN.sEventTitleAttrib = "data-title";
MSN.sEventTimeAttrib = "data-on";
MSN.sEventLocationAttrib = "data-at";
MSN.sAllEventTitles = [];
MSN.sAllEventTimes = [];
MSN.sAllEventLocations = [];
MSN.ndAllImgs = [];
MSN.sFullScreenDivID = "FullScreen";
MSN.ndFullScreen = undefined;
MSN.sFSImgID = "FSImage";
MSN.ndFSImage = undefined;
MSN.sFSTitleID = "FSTitle";
MSN.ndFSTitle = undefined;
MSN.sFSCaptionID = "FSCaption";
MSN.ndFSCaption = undefined;

MSN.fnFullScreen = function () {
	if(MSN.ndFullScreen && MSN.ndFSImage)
	{
		MSN.fnLoadImage(this);
		MSN.ndFullScreen.style.display = "block";
	}
};
MSN.fnLoadImage = function (ndTemp) {
	MSN.ndFSImage.src = ndTemp.getAttribute("src").replace("/thumbs/", "/full/");
	var iTemp = Number(ndTemp.getAttribute("data-eventid"));
	if(MSN.sAllEventTitles[iTemp].length > 0)
		MSN.ndFSTitle.innerHTML = MSN.sAllEventTitles[iTemp];
	else
		MSN.ndFSTitle.innerHTML = "M.S. Natyalaya";
	MSN.ndFSImage.setAttribute("data-imageid", ndTemp.getAttribute("data-imageid"));
	var sTitle = ndTemp.getAttribute("title");
	if(sTitle.length > 0)
		MSN.ndFSCaption.innerHTML = sTitle;
	else
		MSN.ndFSCaption.innerHTML = "";
};
MSN.fnHideFS = function () {
	if(MSN.ndFullScreen)
	{
		MSN.ndFullScreen.style.display = "none";
	}
};
MSN.fnPrevImage = function () {
	var ixPrev = Number(MSN.ndFSImage.getAttribute("data-imageid")) - 1;
	if(ixPrev > -1)
		MSN.fnLoadImage(MSN.ndAllImgs[ixPrev]);
};
MSN.fnNextImage = function () {
	var ixNext = Number(MSN.ndFSImage.getAttribute("data-imageid")) + 1;
	if(ixNext < (MSN.ndAllImgs.length - 1))
		MSN.fnLoadImage(MSN.ndAllImgs[ixNext]);
};
MSN.fnFSKeyUp = function (evt) {
	var bHandled = false;
	if(MSN.ndFullScreen && ("block" == MSN.ndFullScreen.style.display))
	{
		//alert('' + evt.keyCode);
		if(evt.keyCode == 27)
		{
			//alert('Escape');
			MSN.fnHideFS();
		}
		else if(evt.keyCode == 37)
		{
			//alert('Left');
			MSN.fnPrevImage();
			bHandled = true;
		}
		else if(evt.keyCode==39)
		{
			//alert('Right');
			MSN.fnNextImage();
			bHandled = true;
		}
		else if(evt.keyCode==38)
		{
			//alert('Up');
			bHandled = true;
		}
		else if(evt.keyCode==40)
		{
			//alert('Down');
			bHandled = true;
		}
	}
	if(bHandled)
	{
		evt.preventDefault();
	}
};
MSN.fnStaticGallery = function () {
	MSN.ndGallery = document.getElementById(MSN.sGalleryDivID);
	MSN.ndAllEvents = MSN.ndGallery.querySelectorAll(MSN.sEventsClass);
	for(var i = 0; i < MSN.ndAllEvents.length; i++)
	{
		var sTitle = MSN.ndAllEvents[i].getAttribute(MSN.sEventTitleAttrib),
			sTime = MSN.ndAllEvents[i].getAttribute(MSN.sEventTimeAttrib),
			sLocation = MSN.ndAllEvents[i].getAttribute(MSN.sEventLocationAttrib);
		
		MSN.sAllEventTitles.push(sTitle);
		MSN.sAllEventTimes.push(sTime);
		MSN.sAllEventLocations.push(sLocation);
		
		var ndTitle = document.createElement("h2");
		ndTitle.innerHTML = sTitle;
		MSN.ndAllEvents[i].insertBefore(ndTitle, MSN.ndAllEvents[i].firstChild);
		
		var ndTime = document.createElement("span"), ndLoc = document.createElement("span");
		ndTime.innerHTML = sTime;
		ndLoc.innerHTML = sLocation;
		var ndWhenWhere = document.createElement("div");
		ndWhenWhere.innerHTML = "On ";
		ndWhenWhere.appendChild(ndTime);
		ndWhenWhere.innerHTML += " at ";
		ndWhenWhere.appendChild(ndLoc);
		MSN.ndAllEvents[i].appendChild(ndWhenWhere);
		
		var tmpAllImgs = MSN.ndAllEvents[i].getElementsByTagName("img");
		for(var j = 0; j < tmpAllImgs.length; j++)
		{
			tmpAllImgs[j].setAttribute("data-eventid", i.toString());
			tmpAllImgs[j].setAttribute("data-imageid", j.toString());
			tmpAllImgs[j].onclick = MSN.fnFullScreen;
			MSN.ndAllImgs.push(tmpAllImgs[j]);
		}
	}
	MSN.ndFullScreen = document.getElementById(MSN.sFullScreenDivID);
	MSN.ndFSImage = document.getElementById(MSN.sFSImgID);
	MSN.ndFSTitle = document.getElementById(MSN.sFSTitleID);
	MSN.ndFSCaption = document.getElementById(MSN.sFSCaptionID);
};
