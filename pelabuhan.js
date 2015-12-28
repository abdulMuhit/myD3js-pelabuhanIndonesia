  var dataset;

//Define bar chart function 
	function barChart(dataset){	
	
		var margin = {top: 20, right: 20, bottom: 0, left: 90};
		var w = 960 - margin.left - margin.right,
			h = 350 - margin.top - margin.bottom;		
		var padding = 25;
		
		//Scale function for axes and radius
		var yScale = d3.scale.linear()
						.domain(d3.extent(dataset, function(d){return d.selisih_ekspor_impor;}))
						.range([h+padding,padding]);
						
		var xScale = d3.scale.ordinal()
						.domain(dataset.map(function(d){ return d.nama_provinsi;}))
						.rangeRoundBands([padding,w+padding],.1);

		//Create y axis
		var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10);//.tickFormat(formatPercent);
		
		//Define key function
		var key = function(d){return d.nama_provinsi};

		//Define tooltip for hover-over info windows
		var div = d3.select("body").append("div")   
  							.attr("class", "tooltip")               
  							.style("opacity", 0);

		//Create svg element
		var svg = d3.select("#chart-container").append("svg")
					.attr("viewBox", "0 0 960 500")
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.attr("id", "chart")
					.attr("preserveAspectRatio", "xMinYMin");
			
		//Initialize state of chart according to drop down menu
		var state = d3.selectAll("option");

		//Create barchart
		svg.selectAll("rect")
			.data(dataset, key)
			.enter()
		  	.append("rect")
		    .attr("class", function(d){return +d.selisih_ekspor_impor < 0 ? "negative" : "positive";})
		    .attr({
		    	x: function(d){
		    		return xScale(d.nama_provinsi);
		    	},
		    	y: function(d){
		    		return yScale(Math.max(0, d.selisih_ekspor_impor)); 
		    	},
		    	width: xScale.rangeBand(),
		    	height: function(d){
		    		return Math.abs(yScale(d.selisih_ekspor_impor) - yScale(0)); 
		    	}
		    })
		.on('mouseover', function(d){
			d3.select(this)
			.style("opacity", 0.2)
			.style("stroke", "black")
					
		var info = div
			.style("opacity", 1)
			.style("left", (d3.event.pageX-150) + "px")
			.style("top", (d3.event.pageY-30) + "px")
			.text(d.nama_provinsi);
					
		if(state[0][0].selected){
			info.append("p")
			.text(d.selisih_ekspor_impor);
		}
		else if(state[0][1].selected){
		info.append("p")
			.text(d.total_muat);
		}
		else if(state[0][2].selected){
			info.append("p")
			.text(d.total_bongkar);
		}
		})
        	.on('mouseout', function(d){
        		d3.select(this)
			.style({'stroke-opacity':0.5,'stroke':'#a8a8a8'})
			.style("opacity",1);
		div.style("opacity", 0);
        	});

		//Add y-axis
		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(0,0)")
			.call(yAxis);
		//Sort data when sort is checked
		d3.selectAll(".checkbox").
		on("change", function(){
			var x0 = xScale.domain(dataset.sort(sortChoice())
			.map(function(d){return d.nama_provinsi}))
			.copy();

			var transition = svg.transition().duration(750);
			var delay = function(d, i){return i*10;};

			transition.selectAll("rect")
			.delay(delay)
			.attr("x", function(d){return x0(d.nama_provinsi);});
		})

		//Function to sort data when sort box is checked
		function sortChoice(){
				var state = d3.selectAll("option");
				var sort = d3.selectAll(".checkbox");

				if(sort[0][0].checked && state[0][0].selected){
					var out = function(a,b){return b.selisih_ekspor_impor - a.selisih_ekspor_impor;}
					return out;
				}
				else if(sort[0][0].checked && state[0][1].selected){
					var out = function(a,b){return b.total_muat - a.total_muat;}
					return out;
				}
				else if(sort[0][0].checked && state[0][2].selected){
					var out = function(a,b){return b.total_bongkar - a.total_bongkar;}
					return out;
				}
				else{
					var out = function(a,b){return d3.ascending(a.kode_provinsi, b.kode_provinsi);}
					return out;
				}
		};

		//Change data to correct values on input change
			d3.selectAll("select").
			on("change", function() {
				var value= this.value;
				if(value=="tMuat"){
					var x_value = function(d){return d.total_muat;};
					var color = function(d){return d.total_muat < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.total_muat)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.total_muat) - yScale(0));
			    	};	
				}
				else if(value=="tSelisih"){
					var x_value = function(d){return +d.selisih_ekspor_impor;};
					var color = function(d){return d.selisih_ekspor_impor < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.selisih_ekspor_impor)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.selisih_ekspor_impor) - yScale(0)); 
			    	};	
				}
					else if(value=="tBongkar"){
					var x_value = function(d){return +d.total_bongkar;};
					var color = function(d){return d.total_bongkar < 0 ? "negative" : "positive";};
					var y_value = function(d){
			    		return yScale(Math.max(0, d.total_bongkar)); 
			    	};
			    	var height_value = function(d){
			    		return Math.abs(yScale(d.total_bongkar) - yScale(0)); 
			    	};	
				}

				//Update y scale
				yScale.domain(d3.extent(dataset, x_value));

				//Update with correct data
				var rect = svg.selectAll("rect").data(dataset, key);
				rect.exit().remove();

				//Transition chart to new data
				rect
				.transition()
				.duration(2000)
				.ease("linear")
				.each("start", function(){
					d3.select(this)
					.attr("width", "0.2")
					.attr("class", color)
				})
				.attr({
			    	x: function(d){
			    		return xScale(d.nama_provinsi)+50;
			    	},
			    	y: y_value,
			    	width: xScale.rangeBand(),
			    	height: height_value
				});
				//Update y-axis
				svg.select(".y.axis")
					.transition()
					.duration(1000)
					.ease("linear")
					.call(yAxis);
			});
		
	};

	//Load data and call bar chart function 
d3.csv("http://data.go.id/dataset/63db3064-1183-4afc-980f-b5089685095e/resource/c0de5494-44ba-4da3-843e-484a4da067f7/download/transportasilautperprovinsi2009.csv", function(error,data){
				if(error){
					console.log(error);
				}
				else{
					data.forEach(function(d) {
						d.selisih_ekspor_impor = +d.selisih_ekspor_impor;
						d.total_muat = +d.total_muat;
						d.total_bongkar = +d.total_bongkar;
						d.kode_provinsi = +d.kode_provinsi;
					});
					dataset=data;
					barChart(dataset);
				}
								
var width = document.getElementById("container").offsetWidth - 2,
    height = document.getElementById("container").offsetHeight - 2,
    active = d3.select(null);

// var projection = d3.geo.naturalEarth();
var projection = d3.geo.mercator();

var defaultZoom = 6;

var defaultTranslateX = -4300;
var defaultTranslateY = -1250;

var path = d3.geo.path()
    .projection(projection);
	
var tiptext = "no data";
	
var tooltipdiv = d3.select("body")
	.append("div")
	.attr("class", "tooltip1")
	.style("visibility", "hidden")

var tipshow = function() {
	tooltipdiv.style("visibility", "visible");

	tooltipdiv.html(function() {
			var tt = '<table><tr><td colspan="2"  style="color:#e66101;">'+ tiptext[0].nama_provinsi+
			'</td></tr><tr><td>Total Bongkar: </td><td>'
			+tiptext[0].total_bongkar+
			'</td></tr><tr><td>Total Muat: </td><td>'
			+tiptext[0].total_muat+'</td></tr><tr><td>selisih ekspor impor: </td><td>'
			+tiptext[0].selisih_ekspor_impor+'</td></tr>'
		
			return tt+
			'</table>';
		})
		.style("left", (d3.event.pageX - 200) + "px")
		.style("top", (d3.event.pageY) + "px");
}

var tiphide = function() {
	tooltipdiv.style("visibility", "hidden");
}	
	
var svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .on("click", stopped, true);
	
svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);

var g = svg.append("g");
	
var zoom = d3.behavior.zoom()
    .translate([defaultTranslateX, defaultTranslateY])
    .scale(defaultZoom)
    .scaleExtent([defaultZoom, 100])
    .on("zoom", zoomed);

svg
    .call(zoom) // delete this line to disable free zooming
    .call(zoom.event);

d3.json("https://bitbucket.org/rifani/geojson-political-indonesia/raw/0e89dcb0b0454c5afffd414fd0cd0c25f1688d10/IDN_adm_1_province.json", function(error, ina) {
  	g.selectAll("path")
       		.data(ina.features)
		.enter().append("path")
      		.attr("d", path)
      		.attr("class", "feature")
      		.on("click", clicked);
	  
// map the coordinates

 g.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("class","cnode")
       .attr("cx", function(d) {
               return projection([d.longitude, d.latitude])[0];
       })
       .attr("cy", function(d) {
               return projection([d.longitude, d.latitude])[1];
       })
       .attr("r", 1.1)
       .style("fill", "#ADCE98")
	   .on("mouseover", function(d) {
                    tiptext = [d,d.nama_provinsi,d.total_bongkar,d.total_muat,d.selisih_ekspor_impor];
                    tipshow();
                    return;
                })
		.on("mouseout", tiphide);
		
//--------------
var scale=defaultZoom;
var translate=[defaultTranslateX, defaultTranslateY];

reset();

function clicked(d) {
  if (active.node() === this) return reset();
  active.classed("active", false);
  active = d3.select(this).classed("active", true);

  var bounds = path.bounds(d),
      dx = bounds[1][0] - bounds[0][0],
      dy = bounds[1][1] - bounds[0][1],
      x = (bounds[0][0] + bounds[1][0]) / 2,
      y = (bounds[0][1] + bounds[1][1]) / 2;
      
  scale = 0.9 / Math.max(dx / width, dy / height);
  
  translate = [width / 2 - scale * x, height / 2 - scale * y];

  svg.transition()
      .duration(750)
      .call(zoom.translate(translate).scale(scale).event);
}
});

function reset() {
  active.classed("active", false);
  active = d3.select(null);
  scale=defaultZoom;
  translate=[defaultTranslateX, defaultTranslateY];
  svg.transition()
      .duration(750)
      .call(zoom.translate([defaultTranslateX, defaultTranslateY]).scale(defaultZoom).event);
}

function zoomed() {
  scale=d3.event.scale;
  translate=d3.event.translate;
  g.style("stroke-width", 1.5 / d3.event.scale + "px");
  g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  g.selectAll("circle")
        .attr("r", function(){
            var self = d3.select(this);
            var r = 6 / d3.event.scale;
            self.style("stroke-width", r < 4 ? (r < 2 ? 0.5 : 1) : 2);
            return r;
        });
}

// If the drag behavior prevents the default click,
// also stop propagation so we don’t click-to-zoom.
function stopped() {
  if (d3.event.defaultPrevented) d3.event.stopPropagation();
}
		
var rescale = function() {
//scale content
var scal = Math.min((document.getElementById("container").parentElement.offsetWidth) / document.getElementById("container").offsetWidth, (document.getElementById("container").parentElement.offsetHeight) / document.getElementById("container").offsetHeight)
document.getElementById("container").style.WebkitTransform = "scale(" + scal + ")";
document.getElementById("container").style.OTransform = "scale(" + scal + ")";
document.getElementById("container").style.MozTransform = "scale(" + scal + ")";
document.getElementById("container").style.msTransform = "scale(" + scal + ")";
document.getElementById("container").style.Transform = "scale(" + scal + ")";

document.getElementById("container").style.WebkitTransformOrigin = "0 0";
document.getElementById("container").style.OTransformOrigin = "0 0";
document.getElementById("container").style.MozTransformOrigin = "0 0";
document.getElementById("container").style.msTransformOrigin = "0 0";
document.getElementById("container").style.TransformOrigin = "0 0";

};

window.onresize = function() {
rescale();
}

//init content
 rescale();
 d3.select("#container").transition().delay(1000).duration(500).style("opacity", "1");
 d3.select("#social").transition().delay(1000).duration(500).style("opacity", "1");
});
