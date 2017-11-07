/**
 * 
 */


		var raster = new ol.layer.Tile({
        source: new ol.source.OSM()
		});

		var source = new ol.source.Vector({wrapX: false});

		var vector = new ol.layer.Vector({
			source: source
        });

		var map = new ol.Map({
			layers: [raster, vector],
			target: 'map',
			view: new ol.View({
			center: ol.proj.transform([-4.49702, 48.39888], 'EPSG:4326', 'EPSG:3857'), //zoom sur l'UBO
			zoom: 15
         })
       });


	function dessin() {

		var draw;

		function addInteraction() {

			var value= 'Circle';
			geometryFunction = function(coordinate, geometry) {

				if (!geometry) {
				geometry = new ol.geom.Polygon(null);
				}


			var point = coordinate[0]; //point de dÃ©part


            var radius = document.formu.distance.value; //taille des segments

            var newCoordinates = []; //Tableau pour stoker les coordonnÃ©es des nouveaux points

				var angle1=document.formu.angle1.value*(Math.PI/180); //conversion en Radian
        var angle2=document.formu.angle2.value*(Math.PI/180); //conversion en Radian


			          var offsetY = radius * Math.cos(angle1); //dÃ©calage de Y
                var offsetX = radius * Math.sin(angle1); //dÃ©calage de X

                var offsetY2 = radius * Math.cos(angle2); //dÃ©calage de Y
                var offsetX2 = radius * Math.sin(angle2); //dÃ©calage de X

    newCoordinates.push([point[0] + offsetX, point[1] + offsetY], [point[0], point[1]], [point[0] + offsetX2, point[1] + offsetY2], [point[0], point[1]]); //Calculs des coordonnÃ©es des points


               newCoordinates.push(newCoordinates[0].slice()); // slice rencoi un copie du tableau
               geometry.setCoordinates([newCoordinates, vector]);
               return geometry;
             };

			draw = new ol.interaction.Draw({
			   source: source,
               type: (value),
               geometryFunction: geometryFunction
            });

		    map.addInteraction(draw);

       }
       addInteraction();
	}

    