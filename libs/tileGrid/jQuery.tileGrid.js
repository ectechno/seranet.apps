(function($){

	var defaults = {
				tileWidth : 310,
				tileHeight : 150,
				tileGap : 5,
				reducedHeight: 0
			},
		listElement = $('<ul class="tile-column"></ul>'),
		listItemElement = $('<li></li>');


	var methods = {


		initialize : function(options){
			var settings = {};
			$.extend(settings, defaults, options);
			this.data('settings', settings);

			var section = $(this);
			var height = $(this).height() - settings.reducedHeight;
			var tileInColumn = Math.floor(height / (settings.tileHeight + 2 * settings.tileGap));

			//console.log("tileInColumn=" + tileInColumn);

			var currentColumn;
			var sectionWidth = 0;
			var tileCount = 0;
			$(this).children('.tile').each(function(index){
			    if (tileCount % tileInColumn == 0 || ((tileCount + 0.5) % tileInColumn == 0 && $(this).width() != settings.tileHeight)) {
			        //console.log("Create Column at=" + (index+1) + "Fill=" + tileCount);
					currentColumn = listElement.clone();
					section.append(currentColumn);
					sectionWidth += (settings.tileWidth + 2*settings.tileGap);				
				};
				var item = listItemElement.clone();
				currentColumn.append(item);
				item.append($(this));
				tileCount += (($(this).width() == settings.tileHeight)) ? 0.5 : (tileCount % 1 === 0) ? 1 : 1.5;
				//console.log("tileCount:" + $(this).width());
			});
			if (sectionWidth == 0)
			    section.append(listElement.clone());
            else
			    section.width(sectionWidth);
		},

		rearange : function(){
		    if (this.data('settings'))
		        var settings = this.data('settings');		    

			var sectionWidth = 0;
			var height = $(this).height() - settings.reducedHeight;
			var tileInColumn = Math.floor(height/(settings.tileHeight + 2*settings.tileGap));
			if(tileInColumn == 0) tileInColumn = 1;

			var tiles = $(this).find('li');
			var tileIndex = 0;
			
			for(var index = 0; index < $(this).children('.tile-column').length; index++){
				var currentColumn =$($(this).children('.tile-column')[index]);			
				var fillCount = 0;

				while(fillCount != tileInColumn && tiles.length > tileIndex){				
					var currentTile = $(tiles[tileIndex]);
					if((fillCount + 0.5 == tileInColumn) && (currentTile.children().first().width() != settings.tileHeight)) break;
					currentColumn.append(currentTile);				
					fillCount += (currentTile.children().first().width() == settings.tileHeight)?0.5:(fillCount % 1 === 0)?1:1.5;
					//console.log("Col:" + (index+1) + " | Tile:" + (tileIndex+1) + " | Fill:" + fillCount);
					tileIndex++;				
				}

				if (currentColumn.children().length){
					sectionWidth += (settings.tileWidth + 2*settings.tileGap)
					currentColumn.show();
				}else{
					currentColumn.hide();				
				}

				if((index + 1 == $(this).children('.tile-column').length) && (tiles.length > tileIndex)) {
					var newListElement = listElement.clone();
					currentColumn.parent().append(newListElement);
				};
			}
			$(this).width(sectionWidth);			
		},

		addTile : function(tile){

			//console.log(this);

			var tiles = $(this).find('li');

			if(tiles.length !=0){
				var lastTile = tiles.last();
				var item = listItemElement.clone();
				lastTile.parent().append(item);
				item.append(tile);
				methods.rearange.call($(this));
			}else{
				$(this).append(tile);
				methods.initialize.call($(this));
			}
		},

		removeTile : function(tile){
			tile.parent().remove();
			methods.rearange.call($(this));
		}

	};

	$.fn.tileGrid = function (method) {
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}else if (typeof method === 'object' || !method) {
			return methods.initialize.apply(this, arguments);
		}else{
			$.error('Method ' + method + 'does not exists in jQuery.tileGrid');
		}
	};

})(jQuery);