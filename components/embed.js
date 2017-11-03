define(["utils", "base"], function(utils, baseClass) {
	var Component = function(config) {
		var _this = this;
		Component.baseConstructor.call(this, config);
		_this.config.style = _this.config.style || {};
		var className = "";
		this.src = config.src || config.defaultSrc;
		this.title = this.config.title || "";
		var width = this.config.style.width;

		var height = this.config.style.height;

		this.embed = $('<embed class="yy-embed" align="middle" wmode="opaque"></embed>');
		this.embed.attr('width', width);
		this.embed.attr('height', height);

		
		this.embed.onerror = function() {
			var embedOnErrorMethodName = _this.config.comKey + "_error";
			var embedOnErrorMethod = _this.pageview.plugin[embedOnErrorMethodName];
			if(embedOnErrorMethod) {
				embedOnErrorMethod.call(_this.pageview.plugin, _this, {});
			}

		}
		this.src = this.src || "";
		if(this.src.length > 0) {
			this.embed.attr('src', this.src);
			_this.$el.append(_this.embed);			
		}
		
		this.$el.addClass(className);
	}
	utils.extends(Component, baseClass);

	Component.prototype.setSrc = function(src) {		
		
		var newscrElement=this.$el.find('embed');
		if(src.length>0){
			if(newscrElement.length>0){
				this.removeEmbed();
			}
			this.embed.attr('src', src);
			this.$el.append(this.embed);	
		}else{
			this.removeEmbed();
		}
		
	}
	Component.prototype.removeEmbed = function() {		
		if(this.$el.length>0){
			this.$el[0].innerHTML="";			
		}
	}
	Component.prototype.ShowIt = function() {
		this.$el.removeClass("displaynone");
	},
	Component.prototype.HideIt = function() {
		this.$el.addClass("displaynone");
	}
	return Component;
});