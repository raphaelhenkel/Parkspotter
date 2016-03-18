function callAPI() {
    var parkJSON = [];
    $.getJSON("http://opendata.dbbahnpark.info/api/beta/occupancy", function (result) {
        var siteList = document.getElementById("siteList");
        $.each(result.allocations, function (i, var_allocation) {
            parkJSON[var_allocation.site.id] = {
                siteName: var_allocation.site.siteName,
                displayName: var_allocation.site.displayName,
                text: var_allocation.allocation.text,
                stationName: var_allocation.site.stationName
            }

            var siteNode = document.createElement('div');
            siteNode.setAttribute("data-role", "collapsible");
            siteNode.setAttribute("data-filtertext", (parkJSON[var_allocation.site.id].stationName));
            siteList.appendChild(siteNode);
            //h3
            var nameElement = document.createElement("h3")
            siteNode.appendChild(nameElement);

            var colorElement = document.createElement("img");
            var color = "yellow";
            switch (parkJSON[var_allocation.site.id].text) {
            case "> 50":
                color = "green.png";
                break;
            case "> 30":
                color = "green.png";
                break;
            case "> 10":
                color = "yellow.png";
                break;

            case "bis 10":
                color = "red.png";
                break;
            default:
                color = "red.png";
                break;
            }
            nameElement.appendChild(colorElement);
            colorElement.setAttribute("width", "15");
            colorElement.setAttribute("height", "15");
            colorElement.setAttribute("src", ("res/" + color));

            var nameNode = document.createTextNode(" " + parkJSON[var_allocation.site.id].stationName);
            nameElement.appendChild(nameNode);

            //li
            var textElement = document.createElement("li");
            siteNode.appendChild(textElement);
            var textNode = document.createTextNode(parkJSON[var_allocation.site.id].displayName + ", Freie Plätze: " + parkJSON[var_allocation.site.id].text);
            textElement.appendChild(textNode);

        });
    });

}