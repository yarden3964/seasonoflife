(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Group = function() {
	this.initialize(img.Group);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,811,284);


(lib.Mesh = function() {
	this.initialize(img.Mesh);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,192,190);


(lib.Mesh_1 = function() {
	this.initialize(img.Mesh_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,32,192);


(lib.Mesh_10 = function() {
	this.initialize(img.Mesh_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,2);


(lib.Mesh_11 = function() {
	this.initialize(img.Mesh_11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,19,15);


(lib.Mesh_12 = function() {
	this.initialize(img.Mesh_12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,25,15);


(lib.Mesh_13 = function() {
	this.initialize(img.Mesh_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,244,10);


(lib.Mesh_13_1 = function() {
	this.initialize(img.Mesh_13_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,7,25);


(lib.Mesh_138 = function() {
	this.initialize(img.Mesh_138);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2,5);


(lib.Mesh_14 = function() {
	this.initialize(img.Mesh_14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8,4);


(lib.Mesh_15 = function() {
	this.initialize(img.Mesh_15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,19,15);


(lib.Mesh_16 = function() {
	this.initialize(img.Mesh_16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,25,15);


(lib.Mesh_17 = function() {
	this.initialize(img.Mesh_17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,41,155);


(lib.Mesh_17_1 = function() {
	this.initialize(img.Mesh_17_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,7,25);


(lib.Mesh_18 = function() {
	this.initialize(img.Mesh_18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,6);


(lib.Mesh_1_0 = function() {
	this.initialize(img.Mesh_1_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,6);


(lib.Mesh_2_0 = function() {
	this.initialize(img.Mesh_2_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,2);


(lib.Mesh_3_0 = function() {
	this.initialize(img.Mesh_3_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,6);


(lib.Mesh_4_0 = function() {
	this.initialize(img.Mesh_4_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,2);


(lib.Mesh_5 = function() {
	this.initialize(img.Mesh_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,41,155);


(lib.Mesh_5_1 = function() {
	this.initialize(img.Mesh_5_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,158,13);


(lib.Mesh_5_0 = function() {
	this.initialize(img.Mesh_5_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,1);


(lib.Mesh_7 = function() {
	this.initialize(img.Mesh_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,32,192);


(lib.Mesh_7_1 = function() {
	this.initialize(img.Mesh_7_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,129,6);


(lib.Mesh_8 = function() {
	this.initialize(img.Mesh_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,158,7);


(lib.Mesh_9 = function() {
	this.initialize(img.Mesh_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2,27);


(lib.Path_0 = function() {
	this.initialize(img.Path_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,203,188);


(lib.Path_0_1 = function() {
	this.initialize(img.Path_0_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,202,179);


(lib.Path_1 = function() {
	this.initialize(img.Path_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,215,40);


(lib.Path_1_0 = function() {
	this.initialize(img.Path_1_0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,215,40);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00FFFF").s().p("AgDAKQgBgEgBgGQABgFABgEQACgEABAAQACAAACAEQACAEgBAFQABAGgCAEQgCAEgCAAQgBAAgCgEg");
	this.shape.setTransform(0.55,1.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol32, new cjs.Rectangle(0,0,1.1,2.8), null);


(lib.Symbol28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#666666").ss(1,1,1).p("AgbCOQgeA/glArQgmAqgPgMQgPgNAUgnQATgoAbgpQAbgoAggoQAfgnBqjQQBqjQhmDrQhnDqgcA/g");
	this.shape.setTransform(15.4124,28.066);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0099CC").s().p("AiTEWQgPgNAUgnQATgoAbgpQAbgoAggoQAfgnBqjQQBqjQhmDrQhnDqgcA/QgeA/glArQgdAhgQAAQgEAAgEgDg");
	this.shape_1.setTransform(15.4124,28.066);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol28, new cjs.Rectangle(-1,-1,32.9,58.2), null);


(lib.Symbol27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF6600").s().p("AgcAdQgNgLAAgSQAAgRANgLQALgNARAAQASAAALANQANALAAARQAAASgNALQgLANgSAAQgRAAgLgNg");
	this.shape.setTransform(4.2,4.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol27, new cjs.Rectangle(0,0,8.4,8.4), null);


(lib.Symbol23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,15.1398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvA9QgsgKAJggQAGgWAggfIAHgCQAMgEABgJQAcgDAcgJIABAAQAQAJAOAQQAOAPAFAOQAHASgKAIQgNAKgOgCQgVgEgPAEQgNADgOAUQgJAMgQAAIgLgBg");
	this.shape_1.setTransform(22.1455,16.1696,1,1.3203);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,7.2688,1,0.7449);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.8292,1,0.8802);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,4.4127,1,1.2315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol23, new cjs.Rectangle(0,0,33.8,25.5), null);


(lib.Symbol22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,20.0398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.0455,24.3067);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(14.201,8.1245);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.442,19.2942);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(24.223,6.5878,0.8082,0.8082);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol22, new cjs.Rectangle(0,0,33.8,33.6), null);


(lib.Symbol21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(21.6812,21.7398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("Ag/B4Qg5gUAMg/QAIgsApg+QAFgBAFgCQAQgIABgRQAlgIAkgQIACAAQAVARATAfQASAdAHAdQAJAlgOAQQgRATgTgFQgagIgUAIQgSAHgSAoQgMAXgWAAQgGAAgIgCg");
	this.shape_1.setTransform(24.0796,31.4538);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhYBFQg5gfAVg3QANgfAhAHQAsAJAQgJQASgLAKgZQAIgSAZgBQAVgBAYAeQASAYAMAhQAMAhAAAbQgfAQgjAcQgOgKgQAHQgFADgDADQhJgGgpgWg");
	this.shape_2.setTransform(13.0539,9.7246);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAHBDQgHgdgRgeQgTgdgVgRIgCgBIAEgBQAagNAWgQQAlAaASAgQAUAigNAbQgLAUgUAAQgIAAgJgDg");
	this.shape_3.setTransform(34.197,23.222);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(26.7694,7.4402);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol21, new cjs.Rectangle(0,0,40.2,43.7), null);


(lib.Symbol20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,15.1398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvA9QgsgKAJggQAGgWAggfIAHgCQAMgEABgJQAcgDAcgJIABAAQAQAJAOAQQAOAPAFAOQAHASgKAIQgNAKgOgCQgVgEgPAEQgNADgOAUQgJAMgQAAIgLgBg");
	this.shape_1.setTransform(22.1455,16.1696,1,1.3203);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,7.2688,1,0.7449);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.8292,1,0.8802);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,4.4127,1,1.2315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol20, new cjs.Rectangle(0,0,33.8,25.5), null);


(lib.Symbol19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,20.0398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.0455,24.3067);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(14.201,8.1245);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.442,19.2942);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(24.223,6.5878,0.8082,0.8082);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol19, new cjs.Rectangle(0,0,33.8,33.6), null);


(lib.Symbol18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,13.8898);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.1455,14.8213,1,0.6667);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,5.8932,1,0.6049);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.4963,1,0.6667);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,3.5694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol18, new cjs.Rectangle(0,0,33.8,24.3), null);


(lib.Symbol17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,15.1398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvA9QgsgKAJggQAGgWAggfIAHgCQAMgEABgJQAcgDAcgJIABAAQAQAJAOAQQAOAPAFAOQAHASgKAIQgNAKgOgCQgVgEgPAEQgNADgOAUQgJAMgQAAIgLgBg");
	this.shape_1.setTransform(22.1455,16.1696,1,1.3203);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,7.2688,1,0.7449);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.8292,1,0.8802);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,4.4127,1,1.2315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol17, new cjs.Rectangle(0,0,33.8,25.5), null);


(lib.Symbol16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,13.8898);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.1455,14.8213,1,0.6667);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,5.8932,1,0.6049);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.4963,1,0.6667);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,3.5694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol16, new cjs.Rectangle(0,0,33.8,24.3), null);


(lib.Symbol15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,20.0398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.0455,24.3067);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(14.201,8.1245);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.442,19.2942);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(24.223,6.5878,0.8082,0.8082);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol15, new cjs.Rectangle(0,0,33.8,33.6), null);


(lib.Symbol14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(21.6812,21.7398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("Ag/B4Qg5gUAMg/QAIgsApg+QAFgBAFgCQAQgIABgRQAlgIAkgQIACAAQAVARATAfQASAdAHAdQAJAlgOAQQgRATgTgFQgagIgUAIQgSAHgSAoQgMAXgWAAQgGAAgIgCg");
	this.shape_1.setTransform(24.0796,31.4538);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhYBFQg5gfAVg3QANgfAhAHQAsAJAQgJQASgLAKgZQAIgSAZgBQAVgBAYAeQASAYAMAhQAMAhAAAbQgfAQgjAcQgOgKgQAHQgFADgDADQhJgGgpgWg");
	this.shape_2.setTransform(13.0539,9.7246);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAHBDQgHgdgRgeQgTgdgVgRIgCgBIAEgBQAagNAWgQQAlAaASAgQAUAigNAbQgLAUgUAAQgIAAgJgDg");
	this.shape_3.setTransform(34.197,23.222);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(26.7694,7.4402);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol14, new cjs.Rectangle(0,0,40.2,43.7), null);


(lib.Symbol13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,20.0398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.0455,24.3067);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(14.201,8.1245);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.442,19.2942);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(24.223,6.5878,0.8082,0.8082);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol13, new cjs.Rectangle(0,0,33.8,33.6), null);


(lib.Symbol12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,13.8898);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.1455,14.8213,1,0.6667);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,5.8932,1,0.6049);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.4963,1,0.6667);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,3.5694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(0,0,33.8,24.3), null);


(lib.Symbol11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,15.1398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvA9QgsgKAJggQAGgWAggfIAHgCQAMgEABgJQAcgDAcgJIABAAQAQAJAOAQQAOAPAFAOQAHASgKAIQgNAKgOgCQgVgEgPAEQgNADgOAUQgJAMgQAAIgLgBg");
	this.shape_1.setTransform(22.1455,16.1696,1,1.3203);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,7.2688,1,0.7449);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.8292,1,0.8802);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,4.4127,1,1.2315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(0,0,33.8,25.5), null);


(lib.Symbol10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,13.8898);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.1455,14.8213,1,0.6667);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,5.8932,1,0.6049);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.4963,1,0.6667);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,3.5694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(0,0,33.8,24.3), null);


(lib.Symbol9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,20.0398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.0455,24.3067);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(14.201,8.1245);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.442,19.2942);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(24.223,6.5878,0.8082,0.8082);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol9, new cjs.Rectangle(0,0,33.8,33.6), null);


(lib.Symbol8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,15.1398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvA9QgsgKAJggQAGgWAggfIAHgCQAMgEABgJQAcgDAcgJIABAAQAQAJAOAQQAOAPAFAOQAHASgKAIQgNAKgOgCQgVgEgPAEQgNADgOAUQgJAMgQAAIgLgBg");
	this.shape_1.setTransform(22.1455,16.1696,1,1.3203);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,7.2688,1,0.7449);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.8292,1,0.8802);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,4.4127,1,1.2315);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(0,0,33.8,25.5), null);


(lib.Symbol7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(21.6812,21.7398);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("Ag/B4Qg5gUAMg/QAIgsApg+QAFgBAFgCQAQgIABgRQAlgIAkgQIACAAQAVARATAfQASAdAHAdQAJAlgOAQQgRATgTgFQgagIgUAIQgSAHgSAoQgMAXgWAAQgGAAgIgCg");
	this.shape_1.setTransform(24.0796,31.4538);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhYBFQg5gfAVg3QANgfAhAHQAsAJAQgJQASgLAKgZQAIgSAZgBQAVgBAYAeQASAYAMAhQAMAhAAAbQgfAQgjAcQgOgKgQAHQgFADgDADQhJgGgpgWg");
	this.shape_2.setTransform(13.0539,9.7246);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAHBDQgHgdgRgeQgTgdgVgRIgCgBIAEgBQAagNAWgQQAlAaASAgQAUAigNAbQgLAUgUAAQgIAAgJgDg");
	this.shape_3.setTransform(34.197,23.222);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgSAMQgMgggSgYQANgiAeAHQAdAHAOAlQAOAhgEAuQgXAGgcAOIgDABQAAgbgMgig");
	this.shape_4.setTransform(26.7694,7.4402);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(0,0,40.2,43.7), null);


(lib.Symbol6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3A2615").s().p("Ah4BWQADgSAUgVIAkgfIgDgFIgCgGIgvAIQgdADgQgJQgUgKAVgQQAUgQAGAYQABAEgEABQgEABgBgEQgCgJgJAEQgJAFADAHQACAFAMABQAKACAQgCIAxgGQABgLAHgJQADgDAFgDQAQgHAOAKQAigcAfgQIADgBQAdgOAXgGQAbgIAWgDQAUgDABADQAAACgOAOQgRAQgVAPQgWAQgaANIgEABQgkARglAHQgBAQgQAIQgFADgFAAQgMABgIgHQgcAZgJAJQgLALgFAJQgFAMACAEQAEAHAJgEQAJgEgGgIQgCgDADgCQABgBABgBQAAAAABAAQABAAAAAAQABABAAABQAPATgYAGIgKACQgPAAADgSg");
	this.shape.setTransform(16.8812,13.8898);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F0592B").s().p("AgvBbQgsgOAJgxQAGghAggvIAHgDQAMgGABgNQAcgFAcgNIABAAQAQANAOAYQAOAWAFAWQAHAcgKAMQgNAOgOgDQgVgGgPAGQgNAFgOAeQgJASgRAAQgFAAgFgCg");
	this.shape_1.setTransform(22.1455,14.8213,1,0.6667);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F0592B").s().p("AhJA5QgwgZARguQALgaAcAGQAkAIAOgIQAPgJAIgVQAHgPAVgBQASgBATAZQAPAUALAcQAKAbAAAXQgbANgcAXQgMgIgNAGQgFACgCADQg9gFgigTg");
	this.shape_2.setTransform(15.201,5.8932,1,0.6049);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E4B775").s().p("AAFAvQgFgUgMgVQgNgUgOgMIgCgBIADgBQASgJAPgLQAaASANAXQAOAXgKATQgHAOgPAAQgFAAgGgCg");
	this.shape_3.setTransform(29.542,11.4963,1,0.6667);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E4B775").s().p("AgOAGQgKgPgPgMQALgRAYAEQAXADAMASQALAQgDAWQgTADgWAHIgCABQAAgOgKgQg");
	this.shape_4.setTransform(24.231,3.5694);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(0,0,33.8,24.3), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC0BB").s().p("Ag6CRQgHgjAaheQAQg3AVg8IACgOIABAAIgBgHQAHgpACABIADAIIADAIIAEgMQADgLABAAIAAANIABALQABAAADgMQADgLACABQACAAgCANQgBAMABAAQABAAAEgNQAEgNABABQACAAgGAnQgBADADgCQASgHABACQABACgbAaQgSA8AABWQAAAsAEAfIgjAlQgPAMgLAAQgOAAgDgXg");
	this.shape.setTransform(13.5605,12.5256);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(7.5,-4.2,12.100000000000001,33.5), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Mesh_18();
	this.instance.setTransform(20.9,26.7);

	this.instance_1 = new lib.Mesh_1_0();
	this.instance_1.setTransform(20.9,34.95);

	this.instance_2 = new lib.Mesh_2_0();
	this.instance_2.setTransform(20.9,41.8);

	this.instance_3 = new lib.Mesh_3_0();
	this.instance_3.setTransform(20.9,43.25);

	this.instance_4 = new lib.Mesh_4_0();
	this.instance_4.setTransform(20.9,33.55);

	this.instance_5 = new lib.Mesh_5_0();
	this.instance_5.setTransform(20.9,18.2);

	this.instance_6 = new lib.Mesh_7_1();
	this.instance_6.setTransform(20.9,18.9);

	this.instance_7 = new lib.Mesh_5_1();
	this.instance_7.setTransform(6.4,50.2);

	this.instance_8 = new lib.Mesh_8();
	this.instance_8.setTransform(6.4,62.7);

	this.instance_9 = new lib.Mesh_9();
	this.instance_9.setTransform(6.85,45.9);

	this.instance_10 = new lib.Mesh_10();
	this.instance_10.setTransform(20.9,25.6);

	this.instance_11 = new lib.Mesh_11();
	this.instance_11.setTransform(7.25,33.65);

	this.instance_12 = new lib.Mesh_12();
	this.instance_12.setTransform(0,30.4);

	this.instance_13 = new lib.Mesh_13_1();
	this.instance_13.setTransform(0.7,48.05);

	this.instance_14 = new lib.Mesh_14();
	this.instance_14.setTransform(162.7,44.75);

	this.instance_15 = new lib.Mesh_15();
	this.instance_15.setTransform(143.65,33.65);

	this.instance_16 = new lib.Mesh_16();
	this.instance_16.setTransform(145,30.4);

	this.instance_17 = new lib.Mesh_17_1();
	this.instance_17.setTransform(163.1,48.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,18.2,170.7,54.89999999999999), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AseEjQgGg1AUgzQAUg1AqgkQBlhVCoAzQgRgyAagkQAXghAwgMQAugLAqAPQAuARAQAqIgCAHQAAAIAGAGQAGAGAIAAIgSgcQgfh8BXhRQBPhJCAgGQCCgHBXBDQBjBLgKCKIACAOQAEALAMgJQA6hCA/gKQA4gJAtAjQArAgANAzQAOA3gcAtQBVAWAtAtQApAoABAzg");
	this.shape.setTransform(80.0294,29.0961);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,160.1,58.2), null);


(lib.swinggg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Mesh_7();

	this.instance_1 = new lib.Mesh_13();
	this.instance_1.setTransform(28,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.swinggg, new cjs.Rectangle(0,0,272,192), null);


(lib.step = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("EghRAFiINpzyIPHlxIB5gJQCYgJChgBQIEgEGWBRQI5BvELEGQFOFIieIgQg2C5hvDTQgPAdgLghQgHgWgIhFQgUiigSgFQgHgCgIAKIgIANQq1Hlo9EfQmpDUlDBYQhvAfhbANQg3AIgkAAg");
	this.shape.setTransform(284.25,246.3,1,1,0,0,0,-0.1,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("EgL7AmEQhygWhtgjIhWgfMAHhhBOQBkk6EPizQEKiyExAmQD6AfDFCtQDGCtBMEAMgSnBCSQidAyi4AAQiQAAifgeg");
	this.shape_1.setTransform(107.25,804.4137);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("EgAwAkbQh4gCh8gOIhmgOMgFchBcQARgfAhgsQA8hQBLhEQDrjTEqgJQDsgHDQB4QDQB4BzDSQhDVOhVXmQgsLzgdHkQivBvliAAIglAAg");
	this.shape_2.setTransform(407.85,810.5453);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#07085B").s().p("ApxEwQggAAgYgXQgXgYAAggIAAoQQD6B9D0gyQB6gZBIgyIKmG6QA5AkgTBAQgTBBhDAAg");
	this.shape_3.setTransform(73.6282,1056.075);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#07085B").s().p("ApwEwQghAAgXgXQgYgYAAggIAAoQQD6B9D0gyQB6gZBIgyIKmG6QA5AkgTBAQgTBBhDAAg");
	this.shape_4.setTransform(438.7782,1056.075);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("EgQaAgKQichzhVh7MAF2gy1QCBmHFTjnQFQjkGKAfQE2AZECC5QEBC5CFEiQAfBCAWBGIgHADMgORAywQhWB6iJBpQkBDFk2AMIgqABQk9AAkRjHg");
	this.shape_5.setTransform(177.275,439.7831);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AlTfZQjZh3h8jXMgEOgyzQA4hKBMhJQCFiBCfhaQDWh3DxgkQFfg1FVCGQC2BHCUBvUgApAV+gBpAg3QhABwh2BqQjgDIkZASQgdACgbAAQjTAAi+hog");
	this.shape_6.setTransform(401.6,454.2741);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("EgAwAkbQh4gCh9gOIhkgOMgFdhBcQARgfAhgsQA8hQBLhEQDrjTEqgJQDsgHDQB4QDPB4B0DSQhDVOhWXmQgrLzgdHkQiwBvlhAAIglAAg");
	this.shape_7.setTransform(407.85,810.5453);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("Axlf/QiOhphIh1MAI/gx1QCWmDFSjwQFPjtF1ANQEmALDpCqQDpCpBrEWQAYA+ARBEIgHADMgRAAyHQhaB8iKBsQkCDLkoAaQgpADgoAAQkVAAjmiqg");
	this.shape_8.setTransform(146.5,428.5921);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:401.6,y:454.2741}},{t:this.shape_5,p:{rotation:0,x:177.275,y:439.7831,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_4,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:438.7782,y:1056.075}},{t:this.shape_3,p:{rotation:0,x:73.6282,y:1056.075,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_2},{t:this.shape_1,p:{rotation:0,x:107.25,y:804.4137,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape,p:{x:284.25}}]}).to({state:[{t:this.shape_6,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:401.6,y:454.2741}},{t:this.shape_5,p:{rotation:-14.9992,x:236.4978,y:443.908,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_4,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:438.7782,y:1056.075}},{t:this.shape_3,p:{rotation:-14.9992,x:295.8816,y:1066.0253,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_7,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:407.85,y:810.5453}},{t:this.shape_1,p:{rotation:-14.9992,x:263.2268,y:814.2374,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape,p:{x:284.25}}]},4).to({state:[{t:this.shape_6,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:341.1772,y:392.903}},{t:this.shape_5,p:{rotation:0,x:305.3996,y:409.302,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape_4,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:173.1371,y:1049.7839}},{t:this.shape_3,p:{rotation:0,x:609.7624,y:1014.9906,scaleX:1.0441,scaleY:1.068,skewX:-5.8263,skewY:-11.6239}},{t:this.shape_7,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:226.8648,y:775.7366}},{t:this.shape_1,p:{rotation:0,x:478.6836,y:773.6142,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape,p:{x:284.25}}]},5).to({state:[{t:this.shape_6,p:{scaleX:1.028,scaleY:1.1232,skewX:-12.7847,skewY:-7.596,x:416.6025,y:390.5709}},{t:this.shape_8},{t:this.shape_4,p:{scaleX:1.028,scaleY:1.1232,skewX:-12.7847,skewY:-7.596,x:603.9358,y:1044.7083}},{t:this.shape_3,p:{rotation:0,x:7.6325,y:1033.5339,scaleX:0.948,scaleY:0.9822,skewX:33.6572,skewY:27.6296}},{t:this.shape_7,p:{scaleX:1.028,scaleY:1.1232,skewX:-12.7847,skewY:-7.596,x:511.3964,y:779.9694}},{t:this.shape_1,p:{rotation:0,x:56.5782,y:786.7535,scaleX:0.9532,scaleY:0.9779,skewX:3.9476,skewY:-2.5974}},{t:this.shape,p:{x:214.8}}]},5).to({state:[{t:this.shape_6,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:341.1772,y:392.903}},{t:this.shape_5,p:{rotation:0,x:305.3996,y:409.302,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape_4,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:173.1371,y:1049.7839}},{t:this.shape_3,p:{rotation:0,x:609.7624,y:1014.9906,scaleX:1.0441,scaleY:1.068,skewX:-5.8263,skewY:-11.6239}},{t:this.shape_7,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:226.8648,y:775.7366}},{t:this.shape_1,p:{rotation:0,x:478.6836,y:773.6142,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape,p:{x:284.25}}]},6).to({state:[{t:this.shape_6,p:{scaleX:1.028,scaleY:1.1232,skewX:-27.7842,skewY:-22.5955,x:449.3292,y:431.9029}},{t:this.shape_5,p:{rotation:0,x:147.8063,y:428.0112,scaleX:0.9532,scaleY:0.9779,skewX:3.9476,skewY:-2.5974}},{t:this.shape_4,p:{scaleX:1.028,scaleY:1.1232,skewX:-27.7842,skewY:-22.5955,x:799.6099,y:1015.278}},{t:this.shape_3,p:{rotation:0,x:7.6325,y:1033.5339,scaleX:0.948,scaleY:0.9822,skewX:33.6572,skewY:27.6296}},{t:this.shape_7,p:{scaleX:1.028,scaleY:1.1232,skewX:-27.7842,skewY:-22.5955,x:641.7048,y:783.5072}},{t:this.shape_1,p:{rotation:0,x:56.5782,y:786.7535,scaleX:0.9532,scaleY:0.9779,skewX:3.9476,skewY:-2.5974}},{t:this.shape,p:{x:284.25}}]},6).to({state:[{t:this.shape_6,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:401.6,y:454.2741}},{t:this.shape_5,p:{rotation:0,x:177.275,y:439.7831,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_4,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:438.7782,y:1056.075}},{t:this.shape_3,p:{rotation:0,x:73.6282,y:1056.075,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_7,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:407.85,y:810.5453}},{t:this.shape_1,p:{rotation:0,x:107.25,y:804.4137,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape,p:{x:284.25}}]},7).to({state:[{t:this.shape_6,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:401.6,y:454.2741}},{t:this.shape_5,p:{rotation:-14.9992,x:236.4978,y:443.908,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_4,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:438.7782,y:1056.075}},{t:this.shape_3,p:{rotation:-14.9992,x:295.8816,y:1066.0253,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape_7,p:{scaleX:1,scaleY:1,skewX:0,skewY:0,x:407.85,y:810.5453}},{t:this.shape_1,p:{rotation:-14.9992,x:263.2268,y:814.2374,scaleX:1,scaleY:1,skewX:0,skewY:0}},{t:this.shape,p:{x:284.25}}]},4).to({state:[{t:this.shape_6,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:341.1772,y:392.903}},{t:this.shape_5,p:{rotation:0,x:305.3996,y:409.302,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape_4,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:173.1371,y:1049.7839}},{t:this.shape_3,p:{rotation:0,x:609.7624,y:1014.9906,scaleX:1.0441,scaleY:1.068,skewX:-5.8263,skewY:-11.6239}},{t:this.shape_7,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:226.8648,y:775.7366}},{t:this.shape_1,p:{rotation:0,x:478.6836,y:773.6142,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape,p:{x:284.25}}]},5).to({state:[{t:this.shape_6,p:{scaleX:1.0279,scaleY:1.1232,skewX:-15.5967,skewY:-10.4078,x:422.8091,y:397.7217}},{t:this.shape_5,p:{rotation:0,x:147.8063,y:428.0112,scaleX:0.9532,scaleY:0.9779,skewX:3.9476,skewY:-2.5974}},{t:this.shape_4,p:{scaleX:1.0279,scaleY:1.1232,skewX:-15.5967,skewY:-10.4078,x:641.9853,y:1041.9336}},{t:this.shape_3,p:{rotation:0,x:7.6325,y:1033.5339,scaleX:0.948,scaleY:0.9822,skewX:33.6572,skewY:27.6296}},{t:this.shape_7,p:{scaleX:1.0279,scaleY:1.1232,skewX:-15.5967,skewY:-10.4078,x:536.5697,y:782.0549}},{t:this.shape_1,p:{rotation:0,x:56.5782,y:786.7535,scaleX:0.9532,scaleY:0.9779,skewX:3.9476,skewY:-2.5974}},{t:this.shape,p:{x:284.25}}]},5).to({state:[{t:this.shape_6,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:341.1772,y:392.903}},{t:this.shape_5,p:{rotation:0,x:305.3996,y:409.302,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape_4,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:173.1371,y:1049.7839}},{t:this.shape_3,p:{rotation:0,x:609.7624,y:1014.9906,scaleX:1.0441,scaleY:1.068,skewX:-5.8263,skewY:-11.6239}},{t:this.shape_7,p:{scaleX:1.0162,scaleY:1.12,skewX:17.5334,skewY:22.1272,x:226.8648,y:775.7366}},{t:this.shape_1,p:{rotation:0,x:478.6836,y:773.6142,scaleX:1.0441,scaleY:1.068,skewX:-35.8256,skewY:-41.6238}},{t:this.shape,p:{x:284.25}}]},6).to({state:[{t:this.shape_6,p:{scaleX:1.0279,scaleY:1.1232,skewX:-20.3084,skewY:-15.1201,x:436.3641,y:413.4911}},{t:this.shape_5,p:{rotation:0,x:147.8063,y:428.0112,scaleX:0.9532,scaleY:0.9779,skewX:3.9476,skewY:-2.5974}},{t:this.shape_4,p:{scaleX:1.0279,scaleY:1.1232,skewX:-20.3084,skewY:-15.1201,x:707.6944,y:1037.5192}},{t:this.shape_3,p:{rotation:0,x:7.6325,y:1033.5339,scaleX:0.948,scaleY:0.9822,skewX:33.6572,skewY:27.6296}},{t:this.shape_7,p:{scaleX:1.0279,scaleY:1.1232,skewX:-20.3084,skewY:-15.1201,x:581.2879,y:787.177}},{t:this.shape_1,p:{rotation:0,x:56.5782,y:786.7535,scaleX:0.9532,scaleY:0.9779,skewX:3.9476,skewY:-2.5974}},{t:this.shape,p:{x:284.25}}]},7).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65,116.3,943.9,995.6000000000001);


(lib.Scene_1_Layer_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF5B7E").s().p("AhCAMQgGjAAHgTIAdgBQAOgBAPADIAMACIAEACIAMAEQAUAIAVAOQgFAMgNB7QgNBsgOAHIAIALQANASAMAbQANAaAHAXIgvAHQgzAHgfAAQgEhdgDhgg");
	this.shape.setTransform(653.7963,594.5444,1.2915,0.8741,0,9.882,180);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF5B7E").s().p("AhCAMQgGjAAHgTIAdgBQAOgBAPADIAMACIAEACIAMAEQAUAIAVAOQgFAMgNB7QgNBsgOAHIAIALQANASAMAbQANAaAHAXIgvAHQgzAHgfAAQgEhdgDhgg");
	this.shape_1.setTransform(665.0626,594.7814,1.1351,0.8311,0,-9.8822,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#666666").ss(1,1,1).p("Ag5AAIAsAAAAOABIAsAA");
	this.shape_2.setTransform(706.85,531.425);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF5B7E").s().p("AjRC1IBilpIBDAAIhiFpgACICwIhulYIBKAAIBuFYg");
	this.shape_3.setTransform(662.325,598.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},384).wait(190));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.playbotton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AhQB+QgIgHABgIQgBgIAGgFQAFgFAKAAQAGAAALAEIAKADQAGAAAHgGQAGgGAIgSIAMgfIhAiGQgDgGgGgJQgFgHgDgCQgFgDgJgCIAAgIIBTAAIAAAIIgFAAQgIAAgFADQgEAEAAAGQAAAHAGAOIArBaIAohjQADgIABgHQgBgEgBgCQgCgCgDgBIgLgBIAAgIIA5AAIAAAIQgHAAgEADQgDACgFAGIgHAQIhICxQgKAagRANQgSAOgPAAQgLAAgIgHg");
	this.shape.setTransform(104.85,55.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAYBXQgGgHAAgQQgaAWgHADQgLAFgMAAQgSAAgMgNQgMgMAAgVQAAgNAFgKQAIgNAUgMQAUgLAtgQIAAgHQAAgbgIgKQgJgKgPAAQgMAAgIAHQgHAGAAAJIAAALQAAAJgEAFQgFAFgHAAQgHAAgFgFQgFgFAAgJQAAgRASgOQARgOAfAAQAXAAAPAIQALAGAGANQADAIAAAaIAAA8QAAAaABAGQABAFADACQACACADAAQADAAACgBQAEgDAMgLIAAAKQgWAegUAAQgJAAgGgHgAgTAAQgPAJgHAJQgHAKAAALQAAAOAJAJQAIAJALAAQAPAAAXgTIAAhDQgcALgJAEg");
	this.shape_1.setTransform(86.675,51.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgqCLIAAgHQANAAAFgDQAEgCADgGQACgGAAgRIAAihQAAgegBgHQgBgHgEgDQgCgCgGAAQgEAAgJADIgCgHIA0gWIAJAAIAADsQAAARACAGQADAFAFADQAFADAOAAIAAAHg");
	this.shape_2.setTransform(71.75,46.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AhdCHIAAgHIAFAAQALAAAIgFQADgCACgEQACgFAAgUIAAioQAAgRgCgFQgBgFgDgCQgEgCgFAAQgGAAgHACIgCgGIA3gWIAIAAIAAAqQANgYAOgJQAOgKAPAAQAbAAASAVQAWAaAAApQAAAugaAeQgWAZgiAAQgOAAgKgEQgHgDgKgJIAAA2QAAATACAFQACAFAGADQAFADAOAAIAAAHgAgGhlQgHAEgQARIAABDQgBAVACAGQADAMALAIQAKAJAQAAQATAAAMgPQAQgUAAgjQAAgpgSgWQgMgQgRAAQgKAAgIAFg");
	this.shape_3.setTransform(55.25,55.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FF5B7E").s().p("AsPHmIAAvLIYfAAIAAPLg");
	this.shape_4.setTransform(78.425,48.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#B0CB80").s().p("AsPHmIAAvLIYfAAIAAPLg");
	this.shape_5.setTransform(78.425,48.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#CCFF00").s().p("AsPHmIAAvLIYfAAIAAPLg");
	this.shape_6.setTransform(78.425,48.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_5},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).to({state:[{t:this.shape_6},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,156.9,97.3);


(lib.hands = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC0BB").s().p("AAAAxQgBgBABgOIAAgNIgFANQgFANgCgBQgCAAADgPQACgPgBAAQgCAAgFAQQgGAOgBgBQgCgBAKgsQABgDgEABQgWAHgBgEQAAgBAkgfIAGgRIArAPIgOAVIgBAJQgKAugDAAQgBAAgCgLQgBgKgBAAQgBABgFAOQgEAMAAAAIAAAAg");
	this.shape.setTransform(26.575,4.9036);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hands, new cjs.Rectangle(22.3,0,8.599999999999998,9.8), null);


(lib.hairFront = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#07085B").s().p("AgRgBIgKgeIAEgGIAMADIAQAGQAFADAGAIQANAmgBAEIgEANQgagJgPgeg");
	this.shape.setTransform(14.4786,5.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#07085B").s().p("AgBgoIAkgEIAaAVQgHAhg6AVIg4AOg");
	this.shape_1.setTransform(7.5,5.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#07085B").s().p("AguAvQgBgWALgXQAXgtA8gEIgLAtQgVAsgvAGg");
	this.shape_2.setTransform(4.6958,4.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#07085B").s().p("AABAgQgjgXgKglIAFgTIANABQAPACAMAHQApAXADA8IgKACQgQgEgSgMg");
	this.shape_3.setTransform(13.375,4.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#08095C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_4.setTransform(8.9208,4.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#090A5C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_5.setTransform(8.9208,4.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0B0C5D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_6.setTransform(8.9208,4.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#0C0D5D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_7.setTransform(8.9208,4.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#0D0E5E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_8.setTransform(8.9208,4.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#0E0F5E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_9.setTransform(8.9208,4.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#10115F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_10.setTransform(8.9208,4.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#11125F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_11.setTransform(8.9208,4.775);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#121360").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_12.setTransform(8.9208,4.775);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#131460").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_13.setTransform(8.9208,4.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#141561").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_14.setTransform(8.9208,4.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#161761").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_15.setTransform(8.9208,4.775);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#171862").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_16.setTransform(8.9208,4.775);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#181962").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_17.setTransform(8.9208,4.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#191A63").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_18.setTransform(8.9208,4.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#1B1B63").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_19.setTransform(8.9208,4.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#1C1D64").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_20.setTransform(8.9208,4.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#1D1E64").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_21.setTransform(8.9208,4.775);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#1E1F65").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_22.setTransform(8.9208,4.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#202065").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_23.setTransform(8.9208,4.775);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#212266").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_24.setTransform(8.9208,4.775);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#222366").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_25.setTransform(8.9208,4.775);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#232467").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_26.setTransform(8.9208,4.775);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#242568").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_27.setTransform(8.9208,4.775);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#262668").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_28.setTransform(8.9208,4.775);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#272869").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_29.setTransform(8.9208,4.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#282969").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_30.setTransform(8.9208,4.775);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#292A6A").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_31.setTransform(8.9208,4.775);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2B2B6A").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_32.setTransform(8.9208,4.775);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2C2D6B").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_33.setTransform(8.9208,4.775);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#2D2E6B").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_34.setTransform(8.9208,4.775);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#2E2F6C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_35.setTransform(8.9208,4.775);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2F306C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_36.setTransform(8.9208,4.775);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#31316D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_37.setTransform(8.9208,4.775);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#32336D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_38.setTransform(8.9208,4.775);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#33346E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_39.setTransform(8.9208,4.775);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#34356E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_40.setTransform(8.9208,4.775);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#36366F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_41.setTransform(8.9208,4.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#37386F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_42.setTransform(8.9208,4.775);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#383970").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_43.setTransform(8.9208,4.775);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#393A70").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_44.setTransform(8.9208,4.775);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#3B3B71").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_45.setTransform(8.9208,4.775);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#3C3C71").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_46.setTransform(8.9208,4.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#3D3E72").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_47.setTransform(8.9208,4.775);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#3E3F72").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_48.setTransform(8.9208,4.775);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#3F4073").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_49.setTransform(8.9208,4.775);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#414173").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_50.setTransform(8.9208,4.775);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#424274").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_51.setTransform(8.9208,4.775);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#434475").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_52.setTransform(8.9208,4.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#444575").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_53.setTransform(8.9208,4.775);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#464676").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_54.setTransform(8.9208,4.775);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#474776").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_55.setTransform(8.9208,4.775);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#484977").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_56.setTransform(8.9208,4.775);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#494A77").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_57.setTransform(8.9208,4.775);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#4A4B78").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_58.setTransform(8.9208,4.775);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#4C4C78").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_59.setTransform(8.9208,4.775);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#4D4D79").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_60.setTransform(8.9208,4.775);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#4E4F79").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_61.setTransform(8.9208,4.775);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#4F507A").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_62.setTransform(8.9208,4.775);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#51517A").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_63.setTransform(8.9208,4.775);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#52527B").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_64.setTransform(8.9208,4.775);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#53547B").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_65.setTransform(8.9208,4.775);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#54557C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_66.setTransform(8.9208,4.775);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#56567C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_67.setTransform(8.9208,4.775);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#57577D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_68.setTransform(8.9208,4.775);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#58587D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_69.setTransform(8.9208,4.775);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#595A7E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_70.setTransform(8.9208,4.775);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#5A5B7E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_71.setTransform(8.9208,4.775);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#5C5C7F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_72.setTransform(8.9208,4.775);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#5D5D7F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_73.setTransform(8.9208,4.775);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#5E5F80").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_74.setTransform(8.9208,4.775);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#5F6081").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_75.setTransform(8.9208,4.775);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#616181").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_76.setTransform(8.9208,4.775);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#626282").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_77.setTransform(8.9208,4.775);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#636382").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_78.setTransform(8.9208,4.775);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#646583").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_79.setTransform(8.9208,4.775);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#656683").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_80.setTransform(8.9208,4.775);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#676784").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_81.setTransform(8.9208,4.775);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#686884").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_82.setTransform(8.9208,4.775);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#696985").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_83.setTransform(8.9208,4.775);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#6A6B85").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_84.setTransform(8.9208,4.775);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#6C6C86").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_85.setTransform(8.9208,4.775);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#6D6D86").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_86.setTransform(8.9208,4.775);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#6E6E87").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_87.setTransform(8.9208,4.775);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#6F7087").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_88.setTransform(8.9208,4.775);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#717188").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_89.setTransform(8.9208,4.775);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#727288").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_90.setTransform(8.9208,4.775);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#737389").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_91.setTransform(8.9208,4.775);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#747489").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_92.setTransform(8.9208,4.775);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#75768A").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_93.setTransform(8.9208,4.775);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#77778A").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_94.setTransform(8.9208,4.775);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#78788B").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_95.setTransform(8.9208,4.775);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#79798B").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_96.setTransform(8.9208,4.775);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#7A7B8C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_97.setTransform(8.9208,4.775);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#7C7C8C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_98.setTransform(8.9208,4.775);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#7D7D8D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_99.setTransform(8.9208,4.775);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#7E7E8E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_100.setTransform(8.9208,4.775);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#7F7F8E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_101.setTransform(8.9208,4.775);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#80818F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_102.setTransform(8.9208,4.775);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#82828F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_103.setTransform(8.9208,4.775);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#838390").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_104.setTransform(8.9208,4.775);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#848490").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_105.setTransform(8.9208,4.775);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#858691").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_106.setTransform(8.9208,4.775);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#878791").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_107.setTransform(8.9208,4.775);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#888892").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_108.setTransform(8.9208,4.775);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#898992").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_109.setTransform(8.9208,4.775);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#8A8A93").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_110.setTransform(8.9208,4.775);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#8C8C93").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_111.setTransform(8.9208,4.775);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#8D8D94").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_112.setTransform(8.9208,4.775);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#8E8E94").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_113.setTransform(8.9208,4.775);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#8F8F95").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_114.setTransform(8.9208,4.775);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#909095").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_115.setTransform(8.9208,4.775);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#929296").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_116.setTransform(8.9208,4.775);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#939396").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_117.setTransform(8.9208,4.775);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#949497").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_118.setTransform(8.9208,4.775);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#959597").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_119.setTransform(8.9208,4.775);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#979798").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_120.setTransform(8.9208,4.775);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#989898").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_121.setTransform(8.9208,4.775);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#999999").s().p("AgRgBIgKgdIAEgIIAMAEIAQAGQAFAEAGAGQANAngBADIgEAPQgagKgPgeg");
	this.shape_122.setTransform(14.4786,5.7);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#999999").s().p("AgBgoIAjgEIAbAVQgHAhg6AVIg4AOg");
	this.shape_123.setTransform(7.5,5.075);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#999999").s().p("AguAvQgBgWALgXQAXgtA8gEIgLAtQgVAsgvAGg");
	this.shape_124.setTransform(4.6958,4.775);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#999999").s().p("AABAgQgjgXgKglIAFgTIANABQAPACAMAHQApAXADA8IgKACQgQgEgSgMg");
	this.shape_125.setTransform(13.375,4.775);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#9A9A9A").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_126.setTransform(8.9208,4.775);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#9B9B9B").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_127.setTransform(8.9208,4.775);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#9C9C9C").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_128.setTransform(8.9208,4.775);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#9D9D9D").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_129.setTransform(8.9208,4.775);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#9E9E9E").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_130.setTransform(8.9208,4.775);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#9F9F9F").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_131.setTransform(8.9208,4.775);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#A0A0A0").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_132.setTransform(8.9208,4.775);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#A1A1A1").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_133.setTransform(8.9208,4.775);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#A2A2A2").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_134.setTransform(8.9208,4.775);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#A3A3A3").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_135.setTransform(8.9208,4.775);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#A4A4A4").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_136.setTransform(8.9208,4.775);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#A5A5A5").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_137.setTransform(8.9208,4.775);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#A6A6A6").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_138.setTransform(8.9208,4.775);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#A7A7A7").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_139.setTransform(8.9208,4.775);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#A8A8A8").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_140.setTransform(8.9208,4.775);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#A9A9A9").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_141.setTransform(8.9208,4.775);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#AAAAAA").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_142.setTransform(8.9208,4.775);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#ABABAB").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_143.setTransform(8.9208,4.775);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#ACACAC").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_144.setTransform(8.9208,4.775);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#ADADAD").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_145.setTransform(8.9208,4.775);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#AEAEAE").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_146.setTransform(8.9208,4.775);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#AFAFAF").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_147.setTransform(8.9208,4.775);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#B0B0B0").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_148.setTransform(8.9208,4.775);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#B1B1B1").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_149.setTransform(8.9208,4.775);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#B2B2B2").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_150.setTransform(8.9208,4.775);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#B3B3B3").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_151.setTransform(8.9208,4.775);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#B4B4B4").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_152.setTransform(8.9208,4.775);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#B5B5B5").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_153.setTransform(8.9208,4.775);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#B6B6B6").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_154.setTransform(8.9208,4.775);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#B7B7B7").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_155.setTransform(8.9208,4.775);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#B8B8B8").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_156.setTransform(8.9208,4.775);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#B9B9B9").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_157.setTransform(8.9208,4.775);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#BABABA").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_158.setTransform(8.9208,4.775);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#BBBBBB").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_159.setTransform(8.9208,4.775);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#BCBCBC").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_160.setTransform(8.9208,4.775);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#BDBDBD").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_161.setTransform(8.9208,4.775);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#BEBEBE").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_162.setTransform(8.9208,4.775);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#BFBFBF").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_163.setTransform(8.9208,4.775);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#C0C0C0").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_164.setTransform(8.9208,4.775);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#C1C1C1").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_165.setTransform(8.9208,4.775);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#C2C2C2").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_166.setTransform(8.9208,4.775);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#C3C3C3").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_167.setTransform(8.9208,4.775);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#C4C4C4").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_168.setTransform(8.9208,4.775);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#C5C5C5").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_169.setTransform(8.9208,4.775);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#C6C6C6").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_170.setTransform(8.9208,4.775);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#C7C7C7").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_171.setTransform(8.9208,4.775);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#C8C8C8").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_172.setTransform(8.9208,4.775);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#C9C9C9").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_173.setTransform(8.9208,4.775);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#CACACA").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_174.setTransform(8.9208,4.775);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#CBCBCB").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_175.setTransform(8.9208,4.775);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#CCCCCC").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_176.setTransform(8.9208,4.775);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#CDCDCD").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_177.setTransform(8.9208,4.775);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#CECECE").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_178.setTransform(8.9208,4.775);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#CFCFCF").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_179.setTransform(8.9208,4.775);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#D0D0D0").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_180.setTransform(8.9208,4.775);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#D1D1D1").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_181.setTransform(8.9208,4.775);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#D2D2D2").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_182.setTransform(8.9208,4.775);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#D3D3D3").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_183.setTransform(8.9208,4.775);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#D4D4D4").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_184.setTransform(8.9208,4.775);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#D5D5D5").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_185.setTransform(8.9208,4.775);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#D6D6D6").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_186.setTransform(8.9208,4.775);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#D7D7D7").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_187.setTransform(8.9208,4.775);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#D8D8D8").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_188.setTransform(8.9208,4.775);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#D9D9D9").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_189.setTransform(8.9208,4.775);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#DADADA").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_190.setTransform(8.9208,4.775);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#DBDBDB").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_191.setTransform(8.9208,4.775);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#DCDCDC").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_192.setTransform(8.9208,4.775);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#DDDDDD").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_193.setTransform(8.9208,4.775);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#DEDEDE").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_194.setTransform(8.9208,4.775);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#DFDFDF").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_195.setTransform(8.9208,4.775);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#E0E0E0").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_196.setTransform(8.9208,4.775);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#E1E1E1").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_197.setTransform(8.9208,4.775);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#E2E2E2").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_198.setTransform(8.9208,4.775);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#E3E3E3").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_199.setTransform(8.9208,4.775);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#E4E4E4").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_200.setTransform(8.9208,4.775);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#E5E5E5").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_201.setTransform(8.9208,4.775);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#E6E6E6").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_202.setTransform(8.9208,4.775);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#E7E7E7").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_203.setTransform(8.9208,4.775);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#E8E8E8").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_204.setTransform(8.9208,4.775);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#E9E9E9").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_205.setTransform(8.9208,4.775);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#EAEAEA").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_206.setTransform(8.9208,4.775);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#EBEBEB").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_207.setTransform(8.9208,4.775);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#ECECEC").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_208.setTransform(8.9208,4.775);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#EDEDED").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_209.setTransform(8.9208,4.775);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#EEEEEE").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_210.setTransform(8.9208,4.775);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#EFEFEF").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_211.setTransform(8.9208,4.775);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#F0F0F0").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_212.setTransform(8.9208,4.775);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#F1F1F1").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_213.setTransform(8.9208,4.775);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#F2F2F2").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_214.setTransform(8.9208,4.775);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#F3F3F3").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_215.setTransform(8.9208,4.775);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#F4F4F4").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_216.setTransform(8.9208,4.775);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#F5F5F5").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_217.setTransform(8.9208,4.775);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#F6F6F6").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_218.setTransform(8.9208,4.775);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#F7F7F7").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_219.setTransform(8.9208,4.775);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#F8F8F8").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_220.setTransform(8.9208,4.775);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#F9F9F9").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_221.setTransform(8.9208,4.775);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FAFAFA").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_222.setTransform(8.9208,4.775);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FBFBFB").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_223.setTransform(8.9208,4.775);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FCFCFC").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_224.setTransform(8.9208,4.775);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FDFDFD").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_225.setTransform(8.9208,4.775);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FEFEFE").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_226.setTransform(8.9208,4.775);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgRgBIgKgdIAEgIIAMAEIAQAGQAFAEAGAGQANAngBADIgEAPQgagKgPgeg");
	this.shape_227.setTransform(14.4786,5.7);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgBgoIAjgEIAbAVQgHAhg6AVIg4AOg");
	this.shape_228.setTransform(7.5,5.075);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AguAvQgBgWALgXQAXgtA8gEIgLAtQgVAsgvAGg");
	this.shape_229.setTransform(4.6958,4.775);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AABAgQgjgXgKglIAFgTIANABQAPACAMAHQApAXADA8IgKACQgQgEgSgMg");
	this.shape_230.setTransform(13.375,4.775);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AAuAgQgOgIgJgLQgQAMgZAJIggAIQgLAEgNACIgOgBQgBgWALgXQAWgtA9gEIAMABQAPACANAHQApAXADA8IgKACQgQgEgRgMg");
	this.shape_231.setTransform(8.9208,4.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_204}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_215}]},1).to({state:[{t:this.shape_215}]},1).to({state:[{t:this.shape_216}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_218}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_222}]},1).to({state:[{t:this.shape_222}]},1).to({state:[{t:this.shape_223}]},1).to({state:[{t:this.shape_223}]},1).to({state:[{t:this.shape_224}]},1).to({state:[{t:this.shape_225}]},1).to({state:[{t:this.shape_225}]},1).to({state:[{t:this.shape_226}]},1).to({state:[{t:this.shape_226}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227}]},1).to({state:[{t:this.shape_231}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,17.9,9.6);


(lib.hair_back = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#07085B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape.setTransform(35.8267,2.1547);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#08095C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_1.setTransform(35.8267,2.1547);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#090A5C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_2.setTransform(35.8267,2.1547);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0B0C5D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_3.setTransform(35.8267,2.1547);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0C0D5D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_4.setTransform(35.8267,2.1547);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#0D0E5E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_5.setTransform(35.8267,2.1547);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#0E0F5E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_6.setTransform(35.8267,2.1547);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#10115F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_7.setTransform(35.8267,2.1547);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#11125F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_8.setTransform(35.8267,2.1547);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#121360").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_9.setTransform(35.8267,2.1547);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#131460").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_10.setTransform(35.8267,2.1547);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#141561").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_11.setTransform(35.8267,2.1547);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#161761").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_12.setTransform(35.8267,2.1547);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#171862").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_13.setTransform(35.8267,2.1547);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#181962").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_14.setTransform(35.8267,2.1547);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#191A63").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_15.setTransform(35.8267,2.1547);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#1B1B63").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_16.setTransform(35.8267,2.1547);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#1C1D64").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_17.setTransform(35.8267,2.1547);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#1D1E64").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_18.setTransform(35.8267,2.1547);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#1E1F65").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_19.setTransform(35.8267,2.1547);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#202065").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_20.setTransform(35.8267,2.1547);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#212266").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_21.setTransform(35.8267,2.1547);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#222366").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_22.setTransform(35.8267,2.1547);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#232467").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_23.setTransform(35.8267,2.1547);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#242568").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_24.setTransform(35.8267,2.1547);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#262668").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_25.setTransform(35.8267,2.1547);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#272869").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_26.setTransform(35.8267,2.1547);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#282969").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_27.setTransform(35.8267,2.1547);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#292A6A").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_28.setTransform(35.8267,2.1547);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#2B2B6A").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_29.setTransform(35.8267,2.1547);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#2C2D6B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_30.setTransform(35.8267,2.1547);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#2D2E6B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_31.setTransform(35.8267,2.1547);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#2E2F6C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_32.setTransform(35.8267,2.1547);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#2F306C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_33.setTransform(35.8267,2.1547);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#31316D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_34.setTransform(35.8267,2.1547);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#32336D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_35.setTransform(35.8267,2.1547);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#33346E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_36.setTransform(35.8267,2.1547);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#34356E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_37.setTransform(35.8267,2.1547);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#36366F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_38.setTransform(35.8267,2.1547);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#37386F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_39.setTransform(35.8267,2.1547);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#383970").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_40.setTransform(35.8267,2.1547);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#393A70").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_41.setTransform(35.8267,2.1547);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#3B3B71").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_42.setTransform(35.8267,2.1547);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#3C3C71").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_43.setTransform(35.8267,2.1547);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#3D3E72").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_44.setTransform(35.8267,2.1547);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#3E3F72").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_45.setTransform(35.8267,2.1547);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#3F4073").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_46.setTransform(35.8267,2.1547);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#414173").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_47.setTransform(35.8267,2.1547);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#424274").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_48.setTransform(35.8267,2.1547);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#434475").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_49.setTransform(35.8267,2.1547);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#444575").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_50.setTransform(35.8267,2.1547);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#464676").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_51.setTransform(35.8267,2.1547);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#474776").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_52.setTransform(35.8267,2.1547);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#484977").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_53.setTransform(35.8267,2.1547);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#494A77").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_54.setTransform(35.8267,2.1547);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#4A4B78").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_55.setTransform(35.8267,2.1547);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#4C4C78").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_56.setTransform(35.8267,2.1547);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#4D4D79").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_57.setTransform(35.8267,2.1547);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#4E4F79").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_58.setTransform(35.8267,2.1547);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#4F507A").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_59.setTransform(35.8267,2.1547);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#51517A").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_60.setTransform(35.8267,2.1547);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#52527B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_61.setTransform(35.8267,2.1547);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#53547B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_62.setTransform(35.8267,2.1547);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#54557C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_63.setTransform(35.8267,2.1547);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#56567C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_64.setTransform(35.8267,2.1547);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#57577D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_65.setTransform(35.8267,2.1547);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#58587D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_66.setTransform(35.8267,2.1547);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#595A7E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_67.setTransform(35.8267,2.1547);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#5A5B7E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_68.setTransform(35.8267,2.1547);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#5C5C7F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_69.setTransform(35.8267,2.1547);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#5D5D7F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_70.setTransform(35.8267,2.1547);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#5E5F80").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_71.setTransform(35.8267,2.1547);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#5F6081").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_72.setTransform(35.8267,2.1547);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#616181").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_73.setTransform(35.8267,2.1547);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#626282").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_74.setTransform(35.8267,2.1547);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#636382").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_75.setTransform(35.8267,2.1547);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#646583").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_76.setTransform(35.8267,2.1547);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#656683").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_77.setTransform(35.8267,2.1547);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#676784").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_78.setTransform(35.8267,2.1547);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#686884").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_79.setTransform(35.8267,2.1547);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#696985").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_80.setTransform(35.8267,2.1547);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#6A6B85").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_81.setTransform(35.8267,2.1547);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#6C6C86").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_82.setTransform(35.8267,2.1547);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#6D6D86").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_83.setTransform(35.8267,2.1547);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#6E6E87").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_84.setTransform(35.8267,2.1547);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#6F7087").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_85.setTransform(35.8267,2.1547);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#717188").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_86.setTransform(35.8267,2.1547);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#727288").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_87.setTransform(35.8267,2.1547);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#737389").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_88.setTransform(35.8267,2.1547);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#747489").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_89.setTransform(35.8267,2.1547);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#75768A").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_90.setTransform(35.8267,2.1547);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#77778A").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_91.setTransform(35.8267,2.1547);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#78788B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_92.setTransform(35.8267,2.1547);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#79798B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_93.setTransform(35.8267,2.1547);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#7A7B8C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_94.setTransform(35.8267,2.1547);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#7C7C8C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_95.setTransform(35.8267,2.1547);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#7D7D8D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_96.setTransform(35.8267,2.1547);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#7E7E8E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_97.setTransform(35.8267,2.1547);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#7F7F8E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_98.setTransform(35.8267,2.1547);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#80818F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_99.setTransform(35.8267,2.1547);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#82828F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_100.setTransform(35.8267,2.1547);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#838390").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_101.setTransform(35.8267,2.1547);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#848490").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_102.setTransform(35.8267,2.1547);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#858691").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_103.setTransform(35.8267,2.1547);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#878791").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_104.setTransform(35.8267,2.1547);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#888892").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_105.setTransform(35.8267,2.1547);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#898992").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_106.setTransform(35.8267,2.1547);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#8A8A93").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_107.setTransform(35.8267,2.1547);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#8C8C93").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_108.setTransform(35.8267,2.1547);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#8D8D94").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_109.setTransform(35.8267,2.1547);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#8E8E94").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_110.setTransform(35.8267,2.1547);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#8F8F95").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_111.setTransform(35.8267,2.1547);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#909095").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_112.setTransform(35.8267,2.1547);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#929296").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_113.setTransform(35.8267,2.1547);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#939396").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_114.setTransform(35.8267,2.1547);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#949497").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_115.setTransform(35.8267,2.1547);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#959597").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_116.setTransform(35.8267,2.1547);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#979798").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_117.setTransform(35.8267,2.1547);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#989898").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_118.setTransform(35.8267,2.1547);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#999999").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_119.setTransform(35.8267,2.1547);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#9A9A9A").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_120.setTransform(35.8267,2.1547);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#9B9B9B").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_121.setTransform(35.8267,2.1547);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#9C9C9C").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_122.setTransform(35.8267,2.1547);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#9D9D9D").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_123.setTransform(35.8267,2.1547);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#9E9E9E").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_124.setTransform(35.8267,2.1547);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#9F9F9F").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_125.setTransform(35.8267,2.1547);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#A0A0A0").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_126.setTransform(35.8267,2.1547);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#A1A1A1").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_127.setTransform(35.8267,2.1547);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#A2A2A2").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_128.setTransform(35.8267,2.1547);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#A3A3A3").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_129.setTransform(35.8267,2.1547);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#A4A4A4").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_130.setTransform(35.8267,2.1547);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#A5A5A5").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_131.setTransform(35.8267,2.1547);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#A6A6A6").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_132.setTransform(35.8267,2.1547);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#A7A7A7").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_133.setTransform(35.8267,2.1547);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#A8A8A8").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_134.setTransform(35.8267,2.1547);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#A9A9A9").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_135.setTransform(35.8267,2.1547);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#AAAAAA").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_136.setTransform(35.8267,2.1547);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#ABABAB").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_137.setTransform(35.8267,2.1547);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#ACACAC").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_138.setTransform(35.8267,2.1547);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#ADADAD").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_139.setTransform(35.8267,2.1547);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#AEAEAE").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_140.setTransform(35.8267,2.1547);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#AFAFAF").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_141.setTransform(35.8267,2.1547);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#B0B0B0").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_142.setTransform(35.8267,2.1547);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#B1B1B1").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_143.setTransform(35.8267,2.1547);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#B2B2B2").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_144.setTransform(35.8267,2.1547);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#B3B3B3").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_145.setTransform(35.8267,2.1547);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#B4B4B4").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_146.setTransform(35.8267,2.1547);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#B5B5B5").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_147.setTransform(35.8267,2.1547);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#B6B6B6").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_148.setTransform(35.8267,2.1547);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#B7B7B7").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_149.setTransform(35.8267,2.1547);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#B8B8B8").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_150.setTransform(35.8267,2.1547);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#B9B9B9").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_151.setTransform(35.8267,2.1547);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#BABABA").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_152.setTransform(35.8267,2.1547);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#BBBBBB").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_153.setTransform(35.8267,2.1547);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#BCBCBC").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_154.setTransform(35.8267,2.1547);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#BDBDBD").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_155.setTransform(35.8267,2.1547);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#BEBEBE").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_156.setTransform(35.8267,2.1547);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#BFBFBF").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_157.setTransform(35.8267,2.1547);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#C0C0C0").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_158.setTransform(35.8267,2.1547);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#C1C1C1").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_159.setTransform(35.8267,2.1547);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#C2C2C2").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_160.setTransform(35.8267,2.1547);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#C3C3C3").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_161.setTransform(35.8267,2.1547);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#C4C4C4").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_162.setTransform(35.8267,2.1547);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#C5C5C5").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_163.setTransform(35.8267,2.1547);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#C6C6C6").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_164.setTransform(35.8267,2.1547);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#C7C7C7").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_165.setTransform(35.8267,2.1547);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#C8C8C8").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_166.setTransform(35.8267,2.1547);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#C9C9C9").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_167.setTransform(35.8267,2.1547);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#CACACA").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_168.setTransform(35.8267,2.1547);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#CBCBCB").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_169.setTransform(35.8267,2.1547);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#CCCCCC").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_170.setTransform(35.8267,2.1547);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#CDCDCD").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_171.setTransform(35.8267,2.1547);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#CECECE").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_172.setTransform(35.8267,2.1547);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#CFCFCF").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_173.setTransform(35.8267,2.1547);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#D0D0D0").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_174.setTransform(35.8267,2.1547);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#D1D1D1").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_175.setTransform(35.8267,2.1547);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#D2D2D2").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_176.setTransform(35.8267,2.1547);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#D3D3D3").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_177.setTransform(35.8267,2.1547);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#D4D4D4").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_178.setTransform(35.8267,2.1547);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#D5D5D5").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_179.setTransform(35.8267,2.1547);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#D6D6D6").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_180.setTransform(35.8267,2.1547);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#D7D7D7").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_181.setTransform(35.8267,2.1547);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#D8D8D8").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_182.setTransform(35.8267,2.1547);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#D9D9D9").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_183.setTransform(35.8267,2.1547);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#DADADA").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_184.setTransform(35.8267,2.1547);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#DBDBDB").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_185.setTransform(35.8267,2.1547);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#DCDCDC").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_186.setTransform(35.8267,2.1547);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#DDDDDD").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_187.setTransform(35.8267,2.1547);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#DEDEDE").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_188.setTransform(35.8267,2.1547);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#DFDFDF").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_189.setTransform(35.8267,2.1547);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#E0E0E0").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_190.setTransform(35.8267,2.1547);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#E1E1E1").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_191.setTransform(35.8267,2.1547);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#E2E2E2").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_192.setTransform(35.8267,2.1547);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#E3E3E3").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_193.setTransform(35.8267,2.1547);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#E4E4E4").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_194.setTransform(35.8267,2.1547);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#E5E5E5").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_195.setTransform(35.8267,2.1547);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#E6E6E6").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_196.setTransform(35.8267,2.1547);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#E7E7E7").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_197.setTransform(35.8267,2.1547);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#E8E8E8").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_198.setTransform(35.8267,2.1547);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#E9E9E9").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_199.setTransform(35.8267,2.1547);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#EAEAEA").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_200.setTransform(35.8267,2.1547);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#EBEBEB").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_201.setTransform(35.8267,2.1547);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#ECECEC").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_202.setTransform(35.8267,2.1547);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#EDEDED").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_203.setTransform(35.8267,2.1547);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#EEEEEE").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_204.setTransform(35.8267,2.1547);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#EFEFEF").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_205.setTransform(35.8267,2.1547);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#F0F0F0").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_206.setTransform(35.8267,2.1547);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#F1F1F1").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_207.setTransform(35.8267,2.1547);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#F2F2F2").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_208.setTransform(35.8267,2.1547);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#F3F3F3").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_209.setTransform(35.8267,2.1547);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#F4F4F4").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_210.setTransform(35.8267,2.1547);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#F5F5F5").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_211.setTransform(35.8267,2.1547);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#F6F6F6").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_212.setTransform(35.8267,2.1547);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#F7F7F7").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_213.setTransform(35.8267,2.1547);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#F8F8F8").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_214.setTransform(35.8267,2.1547);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#F9F9F9").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_215.setTransform(35.8267,2.1547);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FAFAFA").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_216.setTransform(35.8267,2.1547);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FBFBFB").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_217.setTransform(35.8267,2.1547);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FCFCFC").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_218.setTransform(35.8267,2.1547);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FDFDFD").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_219.setTransform(35.8267,2.1547);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FEFEFE").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_220.setTransform(35.8267,2.1547);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AiQBKQALgUAEgLQAIgTgEgRQgGggAQgVQAVgdADgLQAKgqAugMQAsgNAfAcQAhgDARAVQAJAMANAXQAgAggFAjQgFAlAFAHQALAQABAfQACAlgWANIkEAJQghgjASgkg");
	this.shape_221.setTransform(35.8267,2.1547);
	this.shape_221._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_204}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_215}]},1).to({state:[{t:this.shape_216}]},1).to({state:[{t:this.shape_216}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_218}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_221}]},1).to({state:[]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_221).wait(287).to({_off:false},0).wait(71).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20.7,-12.3,30.3,29);


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg+fA+gMAAAh8/MB8/AAAMAAAB8/g");
	mask.setTransform(406.35,405.95);

	// Layer_3
	this.instance = new lib.Group();

	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#E4F2E3","#6DD7CA","#5EC5C8"],[0.129,0.753,0.988],0,0,0,0,0,349).s().p("Eg+vA4dMAAAhw5MB9fAAAMAAABw5g");
	this.shape.setTransform(406.35,367.225);

	var maskedShapeInstanceList = [this.instance,this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(6.4,6,800,722.5), null);


(lib.Path_18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DAEEF7").s().p("AAAAIQgdANgKgQQgFgHACgLQAHAIAJAFQANAGANAAQAPAAANgGQAHgEAJgJQABAMgFAHQgGAIgLAAQgJAAgOgGg");
	this.shape.setTransform(4.3488,1.3894);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_18, new cjs.Rectangle(0,0,8.8,2.8), null);


(lib.Path_14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AAJAyQhAhkhcg3QA7ADBhgpQBBgbBKgsQglBEhCAjQA8BfAABvQAAA9gUA7QgchbgwhKg");
	this.shape.setTransform(14.8,21.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_14, new cjs.Rectangle(0,0,29.6,43), null);


(lib.Path_13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AhRBKQABhXAuhKQg1gcgbgzQA4AhA1AWQBKAgAugDQhIArgxBNQglA6gWBHQgPgsgBgxg");
	this.shape.setTransform(11.5,16.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_13, new cjs.Rectangle(0,0,23,33.5), null);


(lib.Path_12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2E4E3").s().p("AgsAoQAAguAagpQgcgOgQgdQBTAxAqgDQhEAogeBfQgJgaAAgZg");
	this.shape.setTransform(6.25,9.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_12, new cjs.Rectangle(0,0,12.5,18.2), null);


(lib.Path_9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgQgLQALAAAWgNQgDAHgJAFQAHALAAAMQAAAIgCAGQgIgZgSgLg");
	this.shape.setTransform(1.725,2.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9, new cjs.Rectangle(0,0,3.5,5), null);


(lib.Path_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F99893").s().p("AgMABQgCgCgBgDQAIgEAIAFQAIgGAHAEQgCAMgOAAIAAAAQgIAAgEgGg");
	this.shape.setTransform(1.575,0.7054);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F99893").s().p("AgMABQgCgCgBgDQAIgEAIAFQAIgHAHAFQgCANgOAAIAAAAQgIAAgEgHg");
	this.shape_1.setTransform(1.575,0.718);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F99893").s().p("AgMACQgCgDgBgEQAIgDAIAEQAIgGAHAFQgCANgOAAIAAAAQgIAAgEgGg");
	this.shape_2.setTransform(1.575,0.718);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F99893").s().p("AgMACQgCgDgBgEQAIgEAIAFQAIgHAHAGQgCAOgOAAIAAAAQgIAAgEgHg");
	this.shape_3.setTransform(1.575,0.7306);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F99893").s().p("AgMACQgCgDgBgEQAIgEAIAFQAIgHAHAFQgCAPgOAAIAAAAQgIAAgEgHg");
	this.shape_4.setTransform(1.575,0.7473);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F99893").s().p("AgMACIgDgHQAIgFAIAGQAIgHAHAFQgCAPgOAAIAAAAQgIAAgEgHg");
	this.shape_5.setTransform(1.575,0.7305);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F99893").s().p("AgMACIgDgHQAIgFAIAGQAIgIAHAGQgCAQgOAAIAAAAQgIAAgEgIg");
	this.shape_6.setTransform(1.575,0.7351);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F99893").s().p("AgMACIgDgIQAIgEAIAFQAIgHAHAGQgCAQgOAAIAAAAQgIAAgEgIg");
	this.shape_7.setTransform(1.575,0.7431);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F99893").s().p("AgMACIgDgHQAIgEAIAFQAIgHAHAFQgCAPgOAAIAAAAQgIAAgEgHg");
	this.shape_8.setTransform(1.575,0.7351);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F99893").s().p("AgMACQgCgDgBgEQAIgEAIAFQAIgGAHAFQgCANgOAAIAAAAQgIAAgEgGg");
	this.shape_9.setTransform(1.575,0.718);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F99893").s().p("AgMACIgDgGQAIgEAIAFQAIgHAHAFQgCANgOAAIAAAAQgIAAgEgGg");
	this.shape_10.setTransform(1.575,0.7097);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F99893").s().p("AgMABIgDgFQAIgEAIAFQAIgGAHAEQgCAMgOAAIAAAAQgIAAgEgGg");
	this.shape_11.setTransform(1.575,0.7097);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{scaleY:1,y:0.7054}}]}).to({state:[{t:this.shape,p:{scaleY:1,y:0.7054}}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6,p:{y:0.7351}}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape,p:{scaleY:1.4,y:0.7375}}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_6,p:{y:0.7351}}]},1).to({state:[{t:this.shape_6,p:{y:0.7431}}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape,p:{scaleY:0.9333,y:0.7083}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.3,3.2,2.1);


(lib.Path_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgQgLQAMAAAVgNQgEAIgIAEQAHALAAAMQAAAIgCAGQgIgZgSgLg");
	this.shape.setTransform(1.725,2.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_7, new cjs.Rectangle(0,0,3.5,5.1), null);


(lib.Path_6_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AB8AxQhUhhghAAQAeASAVBHQATA/gEAdQgshohXhYQgsgtgjgXIAOApQAJAqgXAFQgThMhVhSQAZgCAVgBQCsAAB9B1QB9ByAPCqQg+hYg4hAg");
	this.shape.setTransform(24.175,20.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_6, new cjs.Rectangle(0,0,48.4,40.1), null);


(lib.Path_6_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AhPhBQBihaCGAAQAPAAAVACQgWAUgTAZQgfApgJAlQgSgEAHggQADgRAIgPQgcASgiAiQhDBEgiBSQgFgWAQgyQAQg2AYgPQgaAAhCBLQgqAxgyBFQAMiEBhhZg");
	this.shape.setTransform(18.85,15.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_5, new cjs.Rectangle(0,0,37.7,31.3), null);


(lib.Path_6_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2E4E3").s().p("AgqgjQA0gxBJAAIATABQgkAkgIAfQgJgCAEgSIAFgRQgOAKgTATQgkAkgTAtQgCgNAIgaQAJgeANgIQgYAAhLBpQAGhIA1gwg");
	this.shape.setTransform(10.225,8.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_4, new cjs.Rectangle(0,0,20.5,17), null);


(lib.Path_6_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AABgFQADACADAIQACAHgBAEQgIgTgPgLQAEAJgEABQgDgJgJgJIAFAAQAUAAAOANQAOANACATQgVgcgGAAg");
	this.shape.setTransform(2.825,2.325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_1, new cjs.Rectangle(0,0,5.7,4.7), null);


(lib.Path_6_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AABgFQADADADAHQACAHgBADQgIgSgPgLQAEAJgEABQgDgJgJgJIAFgBQAUAAAOAOQAOANACATQgUgcgHAAg");
	this.shape.setTransform(2.825,2.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6_0, new cjs.Rectangle(0,0,5.7,4.7), null);


(lib.Path_5_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("ADQA+QhPiHh1goQiIgwiegQQBYgzBlAAQCbABBvBuQBuBuAACcQAAAogIAoQgWhYgthPg");
	this.shape.setTransform(28.325,22.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_6, new cjs.Rectangle(0,0,56.7,45.7), null);


(lib.Path_5_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AjcB0QAAh5BXhWQBVhWB5AAQBQAABDAoQh4AMhsAlQhbAfg9BqQgkA9gRBEQgGghgBgdg");
	this.shape.setTransform(22.05,17.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_5, new cjs.Rectangle(0,0,44.1,35.6), null);


(lib.Path_5_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2E4E3").s().p("Ah3A/QAAhBAvgvQAvgvBBAAQAqAAAmAWQhCAGg6AVQgxAQghA5QgTAggKAnQgEgTAAgPg");
	this.shape.setTransform(11.975,9.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_4, new cjs.Rectangle(0,0,24,19.4), null);


(lib.Path_5_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AABgMQgPgFgSgDQALgGALAAQARAAANANQANANAAASIgBAJQgJgfgWgIg");
	this.shape.setTransform(3.3,2.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_1, new cjs.Rectangle(0,0,6.6,5.4), null);


(lib.Path_5_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AABgMQgMgFgVgDQAKgGAMAAQARAAANANQANANAAARIgBAKQgIgggXgHg");
	this.shape.setTransform(3.3,2.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5_0, new cjs.Rectangle(0,0,6.6,5.4), null);


(lib.Path_4_9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AgiBbQhVgMg8AKQAOgmgEg3QgIhxhWhiQA8ArAoBAQAMgCANAAQA0AAAwAVQAsAUAjAkIAAA/IAoAOQAvASAlAUQB3BDgXBDQh+hnipgWg");
	this.shape.setTransform(26.4363,21.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_9, new cjs.Rectangle(0,0,52.9,43.1), null);


(lib.Path_4_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("Ah/BAQAugZAygPIAAgxQAbgcAjgQQAlgQAoAAIATABQAfgwAwgjQhDBMgHBYQgDArALAdQgvgHhCAJQiDARhiBQQgSg0Bdg0g");
	this.shape.setTransform(20.5784,16.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_8, new cjs.Rectangle(0,0,41.2,33.6), null);


(lib.Path_4_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2E4E3").s().p("AhFAjQAagOAbgIIAAgaQAeghAtAAIAKABQAQgbAbgSQglApgDAwQgCAXAGAQQgZgFgkAFQhHAKg1ArQgKgcAygcg");
	this.shape.setTransform(11.1742,9.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_7, new cjs.Rectangle(0,0,22.4,18.2), null);


(lib.Path_4_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgDAKQgKgBgHABQABgEAAgGQgBgNgKgLQAIAGAEAGIADAAQAMAAAIAJIAAAGIAOAHQAOAHgDAIQgOgMgTgDg");
	this.shape.setTransform(3.0765,2.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_4, new cjs.Rectangle(0,0,6.2,5.1), null);


(lib.Path_4_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgDAKQgKgBgHABQABgEAAgGQgBgNgKgLQAHAEAFAIIADAAQAMAAAIAJIAAAHIAOAFQAOAIgDAIQgOgMgTgDg");
	this.shape.setTransform(3.0765,2.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4_3, new cjs.Rectangle(0,0,6.2,5), null);


(lib.Path_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231F20").s().p("AibAgQgEgFADgKQAEgNAAgEQgJgXAGgIQAKgNBQAAQBcAABCANQBBAOAAARQAAAShBAOQhDANhbAAQhQAAgKgNg");
	this.shape.setTransform(15.805,4.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_4, new cjs.Rectangle(0,0,31.7,9), null);


(lib.Path_3_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AigCMQAAh/BVhdQBThdB9gNQALAlARAeQhhAChcBkQhNBSg0B6QgDgbAAgUg");
	this.shape.setTransform(16.125,18.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_8, new cjs.Rectangle(0,0,32.3,37.4), null);


(lib.Path_3_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AAWgNQhGhOhNgCQAOgVAIgfQBiAKBABJQBDBIAABjQAAASgDASQgohfg9g/g");
	this.shape.setTransform(12.55,14.55);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_7, new cjs.Rectangle(0,0,25.1,29.1), null);


(lib.Path_3_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2E4E3").s().p("AAMgGQgmgqgpgCQAGgLAGgRQA0AFAjAoQAkAnAAA1QAAALgCAJQgVgzghgig");
	this.shape.setTransform(6.8,7.925);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_6, new cjs.Rectangle(0,0,13.6,15.9), null);


(lib.Path_3_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgSARQAAgPAKgKQAJgLAOgCIAEAIQgMAAgKAMQgIAJgGAOg");
	this.shape.setTransform(1.9,2.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_3, new cjs.Rectangle(0,0,3.8,4.4), null);


(lib.Path_3_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgSAQQAAgOAKgKQAJgLAOgCIAEAIQgMAAgKAMQgIAJgGAOg");
	this.shape.setTransform(1.9,2.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_2, new cjs.Rectangle(0,0,3.8,4.4), null);


(lib.Path_3_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231F20").s().p("Ai/AnQhQgQAAgXQAAgWBQgPQBPgQBwAAQBwAABQAQQBPAPAAAWQAAAXhPAQQhQAPhwAAQhwAAhPgPg");
	this.shape.setTransform(27.15,5.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3_0, new cjs.Rectangle(0,0,54.3,10.8), null);


(lib.Path_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231F20").s().p("AuiChQmBhDAAheQAAhdGBhDQGChDIgAAQIhAAGCBDQGBBDAABdQAABemBBDQmCBDohAAQogAAmChDg");
	this.shape.setTransform(131.625,22.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_3, new cjs.Rectangle(0,0,263.3,45.5), null);


(lib.Path_2_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AjrAHQBQgzBiAAQBkAABVA5QAdhEA8gqQA+gsBNgBQgtAVgyAnQhhBOgRBYQhYhHigAeQiHAZh3BLQAphVBPgzg");
	this.shape.setTransform(35.6,14.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_7, new cjs.Rectangle(0,0,71.2,28.6), null);


(lib.Path_2_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("ABQAiQh+gXhDA2QgOhEhLg8QgmgfgkgQQA7ABAxAhQAwAiAVA0QBCgsBOAAQBMAAA/AoQA9AoAgBBQhcg7hpgSg");
	this.shape.setTransform(27.7,11.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_6, new cjs.Rectangle(0,0,55.4,22.2), null);


(lib.Path_2_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2E4E3").s().p("AArASQhDgMglAeQgHglgqghQgUgQgUgJQAhAAAaATQAaASAMAcQAjgYArAAQApAAAiAVQAiAWARAjQgygfg6gLg");
	this.shape.setTransform(15.075,6.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_5, new cjs.Rectangle(0,0,30.2,12.1), null);


(lib.Path_2_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgaABQAJgFALAAQALAAAKAGQAHgRATgBQgUAKgEAQQgKgIgSADQgQADgOAJQAFgKAKgGg");
	this.shape.setTransform(4.15,1.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_2, new cjs.Rectangle(0,0,8.3,3.4), null);


(lib.Path_2_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgaABQAJgFALAAQALAAAKAFQAHgQATgBIgLAIQgLAIgCAKQgKgIgSADQgPADgPAJQAFgKAKgGg");
	this.shape.setTransform(4.15,1.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2_1, new cjs.Rectangle(0,0,8.3,3.3), null);


(lib.Path_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231F20").s().p("AuiC6QmBhNAAhtQAAhsGBhMQGChOIgAAQIhAAGCBOQGBBMAABsQAABtmBBNQmCBMohAAQogAAmChMg");
	this.shape.setTransform(131.625,26.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_2, new cjs.Rectangle(0,0,263.3,52.5), null);


(lib.Path_1_9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AhsBEQAAhgA1hSQAzhPBUgoQATAQAKAVQhhBcgsCEQgfBegDBnQgqhLAAhWg");
	this.shape.setTransform(10.925,22.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_9, new cjs.Rectangle(0,0,21.9,45.9), null);


(lib.Path_1_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F6F8F7").s().p("AAaAaQgihohMhHQAKgTANgKQBBAgAoA9QApA/AABLQAABDghA7QgChRgYhIg");
	this.shape.setTransform(8.5,17.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_8, new cjs.Rectangle(0,0,17,35.7), null);


(lib.Path_1_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E2E4E3").s().p("AAOAOQgSg4gpgnQAFgKAHgFQAjAQAWAiQAWAiAAAoQAAAlgSAgQgBgsgNgng");
	this.shape.setTransform(4.625,9.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_7, new cjs.Rectangle(0,0,9.3,19.4), null);


(lib.Path_1_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgMAIQAAgLAGgJQAGgJAJgFQACABACADQgSASgCAfQgFgJAAgKg");
	this.shape.setTransform(1.275,2.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_4, new cjs.Rectangle(0,0,2.6,5.4), null);


(lib.Path_1_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D0D2D1").s().p("AgMAIQAAgKAGgKQAGgJAKgFIADAFQgSASgCAeQgFgJAAgKg");
	this.shape.setTransform(1.275,2.675);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_3, new cjs.Rectangle(0,0,2.6,5.4), null);


(lib.Path_1_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231F20").s().p("Ak9A1QiggUhQgMQAAgvCkgpQCqgrDfAAQDnAACjAgQCkAhAAAuQAAAvh8AfQiEAgjgAAQjggjirgXg");
	this.shape.setTransform(55.8,11.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1_1, new cjs.Rectangle(0,0,111.6,22.2), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231F20").s().p("AmKBPQijghAAguQAAgtCjghQCkggDmAAQDnAACkAgQCjAhAAAtQAAAuijAhQikAgjnAAQjmAAikggg");
	this.shape.setTransform(55.825,11.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,111.7,22.3), null);


(lib.ClipGroup_0 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AghDaIAAmuQAVgFAMAAQAOAAAUAFIAAGuQgigCghACg");
	mask.setTransform(3.375,21.825);

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_0, new cjs.Rectangle(0,0,0,0), null);


(lib.Path_8_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#DAEEF7").s().p("AgyHzQh2gIgDgTQgFggkio+IAAgUIHNlcIHYFcImRKRQg6AAg6gEg");
	this.shape_12.setTransform(46.675,50.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_8_1, new cjs.Rectangle(0,0,93.4,100.7), null);


(lib.CompoundPath = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#05AD99").s().p("AUjMuImSGSImSmSImSGSImRmSImTGSImSmSImSGSImMmLIiPCPIgflsICuCvIF2l1Il2l1IjODOQgRjygIjxIDnDnIF7l6Il7l6IjuDtQgCkmAOjYIDiDiIGMmLIGSGSIGSmSIGTGSIGRmSIGSGSIGSmSIGSGSIGSmSIGSGSIAPgPIgEA6IgLgKImBGBIFXFWIgIB+IlKFJIErEqQgEB2AABSIk9E8gAOnGSIF8F7IF8l7Il8l8gACDGSIF8F7IF8l7Il8l8gAqhGSIF9F7IF7l7Il7l8gA3FGSIF8F7IF8l7Il8l8gAOimLIGBGBIGCmBImCmBgAB9mLIGCGBIGBmBImBmBgAqmmLIGCGBIGAmBImAmBgA3KmLIGBGBIGCmBImCmBg");
	this.shape.setTransform(213.4311,121.575);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CompoundPath, new cjs.Rectangle(0,0,426.9,243.2), null);


(lib.Path_13_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FC8D84").s().p("AgnDFQiPgQiDgwIAQiLIJYjEIALF0QhwAhh/AAQg4AAg6gGg");
	this.shape_1.setTransform(31.425,20.2946);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_13_1, new cjs.Rectangle(0,0,62.9,40.6), null);


(lib.Path_10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EB8526").s().p("ADBFqQgYAFgnACQhQAEhOgNIAugmQgVABgjgGQhGgNhGgqIAvgXQgZgGgggNQhAgagngiIA7gNQgRgIgXgQQgvgggggnIA1gJQgWgPgZgZQgzgxgSgwIA3AMQgVgUgZgdQgwg5gKgnIA5AIQgNgSgQgaQgig1gOgtQAKAGATASQASASAKAGQAOAIAWAJIAmAPQgJACgMABIgWABQAAAAAAAAQgBABAAAAQgBAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAQAAABAAAAQAAABABAAQAPAcApASQAZALAuAKQAtAKAcgBIA0gCQAeACASAPQAwAnAdARQAqAbAsALQAqALAkgBQAxgBAXgYQAVgUAGgrQAEgwAEgWQAIAEAVAVQABABABAAQAAAAABAAQAAABABAAQAAgBABAAQABAAAAAAQABAAAAgBQAAAAABgBQAAgBAAAAQAJhghBhhQAWASAXAiQApA8APBLIAUg5IANANQAQASALAYQAmBKgNBhIAigoIAHBFQACBOgZAuIAwgXIgCA2QgFA9gTAhQgSAhASBDQAKAiANAbQgbgKghgGQhCgNgeAQQgeAQhGAHIhAAEg");
	this.shape.setTransform(48.4,40.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_10, new cjs.Rectangle(0,0,96.8,81.1), null);


(lib.Path_9_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EB8526").s().p("ACfEdQgYAFgoACQhPAEhOgNIAugmQgVABgjgGQhHgNhFgqIAugXQgZgGgggNQhAgagnghIA8gOQgRgIgXgQQgwgfgfgnIA1gJQgWgPgZgZQg0gygSgwIAHABQA6A1A0AeQA/AjBBAJQgMAEgSAGIghAIQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAABQAAABgBAAQAAABAAAAQAAABABAAQAAABABAAQAvAtBgATQAgAGAzgDQA+gEAigNIASgJIARgJQAMgEANAHIAWAOQAdARAegRQAggSATgkQARghADgpQAFAEAFAJIAIAOQADADADgCQAughAOhpQAHg5gRhAQAYAhANApQARA7gJBHIAhgpIAIBGQACBOgaAuIAxgYIgCA2QgGA+gSAhQgTAhATBDQAJAhAOAbQgcgJgggHQhDgNgeAQQgeARhGAHIhAADg");
	this.shape_1.setTransform(44.95,32.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_9_1, new cjs.Rectangle(0,0,89.9,65.7), null);


(lib.Path_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_0_1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_5, new cjs.Rectangle(0,0,202,179), null);


(lib.Path_19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFD90E").s().p("AiFHaQgWAGgfADQg+AIgvgJQgkgHhLg1QhEgygfABQAZgUAZgbQAxgzgCgXQgBgQhlhUQhxhcgdg5QArAOA1AJQBoARA1gZQA2gZAOg/QAEgXgBhBIAtAjQAAgNgIgRQgSgigtgWQgtgUhChCIg7g+QAaAGAeAAQA9AAAdgdIAGAOQAdAyA8ARQAvAOAogHQA0gHAMgoQAWAmApAjQAcAaAwAhQAvAhAsAOQAyARA0gHQApgEAlgUQBJgfAshGQAng9ANhOQAMhOgQhIQAaAxAQB7QAPBuALAIQASAMA/gSQAfgJAdgLQgRAagGA2QgIBAgLAeQgPApgzBBIgwA4QAVATBGAAQAjABAfgFQiNDIikADQgzABgvgTIglgTQACBPgzBTQhnClkGAUQA2g2AOgkg");
	this.shape.setTransform(65.25,56.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_19, new cjs.Rectangle(0,0,130.5,112.9), null);


(lib.Path_18_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFD90E").s().p("Ai0EaQAfglAIgVQgWAFgfAEQg+AHgvgJQgkgHhKg1QhEgyggABQAZgUAZgbQAygzgCgXQgBgQhZhJQhohVgjgxQAzAvBtAXQDAAoB5gTQBQgNAygzQArguAPhIQASAhAkAgQAYAXAqAdQB+BYCDgPQA+gGA9gTQBBgTAygeIANgBQiNDGijADQgzABgvgTIglgTQABBPgzBSQhnCmkGAVQAOgOAPgSg");
	this.shape_1.setTransform(64.475,31.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_18_1, new cjs.Rectangle(0,0,129,62.7), null);


(lib.Path_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance_1 = new lib.Path_0();

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_6, new cjs.Rectangle(0,0,203,188), null);


(lib.Path_29 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FC8D84").s().p("Al8DhIAAiqIK5k+IBAG+Qi7BQjrABIgIAAQirAAiggng");
	this.shape.setTransform(38.125,26.4262);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_29, new cjs.Rectangle(0,0,76.3,52.9), null);


(lib.Path_11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DAEEF7").s().p("ACGKlIoMhsQgdgGgSgaQgQgZAGgeIDkxNQAGgdAagRQAZgRAdAGIIMBsQAdAHASAZQAQAZgGAeIjkRNQgGAegZAQQgTAMgUAAQgIAAgIgBg");
	this.shape_1.setTransform(44.95,67.8349);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_11, new cjs.Rectangle(0,0,89.9,135.7), null);


(lib.eyebrow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#07085B").s().p("AASAEIgGgCQgFgCgHAAIgKAAIgLAEQADgEAHgDQAFgDAGABQAIAAAGAEQAEABAFAGIgFgCg");
	this.shape.setTransform(2.25,0.6214);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,4.5,1.3);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.teenager = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.eyebrow("synched",0);
	this.instance.setTransform(36.25,13.8,1,1,-14.9992,0,0,2.3,0.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#070606").s().p("Am8NLQgagHgyjyQgwjvglkmQgqlGgBjRQgCj3A4gOQCigpF6gqQGqgvA1AoIAvDyQA4EjAoDwQCAMChKgKQg7gHnsBNQmoBChNAAQgKAAgEgBg");
	this.shape.setTransform(39.68,59.2389,0.1065,0.1039);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFC0BB").s().p("AkMX0QmUgoh8gtQgngOgGgMIACgKIhuqAIAygKQBDgMBPgJQD/gaElAXQCiALBugUQCGgYggg/QgTgnjcuoQjnvYhNjcQF6JZEwIIQG9L7DKHIQkFCHrEJqQh2gJiEgOg");
	this.shape_1.setTransform(46.4514,46.9823,0.1065,0.1039);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC0BB").s().p("A2cYwQh6gjgKhjQgfkWJSxWQGBrOJDu0QhlEugxH5QgtHKADI5QiyFgg5B2QhBCFE7gYQEsgXLaibQFshOExhJIBaMMQkSAollAxQrJBimfArQiGAOluAyQklAniOAJQg+ADg1AAQh9AAhJgVg");
	this.shape_2.setTransform(16.7271,51.1687,0.1065,0.1039);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC0BB").s().p("AABgCIAAAEIgBAAIAAABg");
	this.shape_3.setTransform(18.7424,30.6237,0.1065,0.1039);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#07085B").s().p("AuVE8QAIk1Cnh/QADgWAJgjQAThEAjg7QBui6DjgKQDugLDEh5QCPhYBBhlIg8EGIA1gOQA/gTA2gZQCthTAMh5QATAsACBUQADCmhUDEIAdgMQAkgRAggXQBohKAihvQAIBGgLBWQgVCuhhBUIAlAWQArAcAmAeQB3BfAKBTIAGAnQARBggEB+QgGDMg9DZIhXoOQgNgrgqg2QhUhsiTg5Qh3A/iwAgQlfBCkdiZQg+ANhFApQiKBRgmCKIAAACQgEANgFAYQgEAcgDAgIhJG8QhKkfAGjbg");
	this.shape_4.setTransform(29.9257,8.5429,0.1065,0.1039);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F99893").s().p("AhbEFQBbgfAgg0QATgigJgZQgDgNgLgMIgcgbQgYgegPgzQgKgqgDgpQgHhXARhNIAeCeQAOA7AGAQQAPApARATIAfAhQAPATAFAYQAFAZgIAaQgHAYgRATQgdAigrAPQggALgkAAIgPgBg");
	this.shape_5.setTransform(33.4325,17.5095,0.1065,0.1039);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#07085B").s().p("AgNgBQAFgEAHgBQAGgBAHACQAHACADAEIgLgCQgGgBgFABIgLACIgGAEIgEACQADgHAFgBg");
	this.shape_6.setTransform(28.4812,14.2852,1,1,29.9992);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F99893").s().p("AAOAAQgHgCgGgBQgGAAgHADQgGAAgGADQAFgDAHgCQAHgCAGgBIAHABIAGADIAGACIAFAEQgFgEgGgBg");
	this.shape_7.setTransform(32.825,21.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AgwA7QgYgUgDgfQgDgeAUgZQAUgYAggEQAegDAZAUQAYAUADAgQADAegUAYQgUAZggADIgIAAQgaAAgVgRg");
	this.shape_8.setTransform(36.0845,15.8528,0.1065,0.1039);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AgvA7QgZgUgDgfQgDgfAUgYQAUgYAggEQAegDAZAUQAXAUAEAfQADAfgUAYQgUAZggADIgIAAQgZAAgVgRg");
	this.shape_9.setTransform(29.0987,16.0917,0.1065,0.1039);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFC0BB").s().p("AggBZQgbgVgGggIgEADQgIAEgKgEQgJgEgGgKQgFgJABgKQACgJAIgEQAEgCAFgBQAFABAEACQgBgUAGgRQAGgSANgOQANgNARgIQASgIATAAQAfgBAZASQAZASAJAdQAFARgBARIgBAIQAAAXgFATQgIAbgUAQQgUASgaACIgKABQgbAAgWgSg");
	this.shape_10.setTransform(28.425,16.7498);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F99893").s().p("Ag8DDQhBgUgbhIQgchHAZhQQAZhRBAgrQA/gqBAAUQBBAUAcBHQAbBIgZBPQgZBRhAArQgrAegqAAQgVAAgVgHg");
	this.shape_11.setTransform(39.3411,16.7234,0.1065,0.1039);

	this.instance_1 = new lib.Path_13_1();
	this.instance_1.setTransform(30.2,26.55,0.1065,0.1039,0,0,0,32.9,21.2);
	this.instance_1.alpha = 0.6016;

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFC0BB").s().p("AhjJLQhsgahwg3IhagxIAvuoIJQiBIBkIiQgBABAKA+IAsELIAbCpQh7CsjbAAQhNAAhagWg");
	this.shape_12.setTransform(30.8984,30.6328,0.1065,0.1039);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#55769F").s().p("AfAeEQiCgEhghZI8K6FQgBgBAAAAQgBAAgBAAQAAAAgBAAQAAAAgBABQraQZAAgBI+eC0QgghXAukFQBfobFpn3QGlpLMwqvQE7kJELi8QD+izBNgQQB1gYF9FYQFIEpHkIWQGkHPGxILQGSHnDdExQBMBpgLCBQgLCBhcBbQj1DwixCQQhhBPh8AAIgMAAg");
	this.shape_13.setTransform(45.9177,82.2348,0.1065,0.1039);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FF5B7E").s().p("AhjEaQhsgahwg3IhagxIAWnHILWAAIAsELIAbCoQh7CsjbAAQhNAAhagWg");
	this.shape_14.setTransform(30.8984,33.7991,0.1065,0.1039);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF5B7E").s().p("ArZj8QEtgXJhigQEwhQD1hMIhQPTQijAij1AqQnrBUmgAsQgrmQgVm8g");
	this.shape_15.setTransform(22.1688,62.2006,0.1065,0.1039);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FF5B7E").s().p("EgM9AmaQm/gZhyiXQhHhehCkuQg/kjgumoQGggsHrhUQD2gqCigiIBQvTQj0BLkxBQQphCgktAXQgOkxgBkRQgDo6AsnKQAxn5BmkuQBekZCHhZIACgBILyAAIgXHIIBbAyQBwA2BrAbQFXBTCmjqIgbioIgrkMIHZAAQAbAABcgDQBjgEBeBtQCXCvBXGsQESVEBwLvQDlX2jQCaQh7Bam3BwQm7Bwn0BCQmvA4lIABQhgAAhXgFg");
	this.shape_16.setTransform(32.5167,56.1861,0.1065,0.1039);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#55769F").s().p("AlXI1Igy0VIDujoQHCBQA0AAQAGAAADgRQgOi8gFhhQgHiJAMBcQAMBcAFBzQADBcgGAfIAbFMQBGNImBJLQh3C4iXCIQhMBEg0Afg");
	this.shape_17.setTransform(20.2621,82.3049,0.1065,0.1039);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#07085B").s().p("ALEERI2ag7QgngCgagTQgagUABgaIASmjQEcBvEdgcQCOgOBVgkIMDF/QBBAfgYAzQgWAvhHAAIgJAAg");
	this.shape_18.setTransform(93.1331,100.4512,0.1065,0.1039);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#446284").s().p("AgBAAIABAAIACAAQAAAAAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAIgCgBg");
	this.shape_19.setTransform(38.0555,94.4858,0.1065,0.1039);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#446284").s().p("EglfADtQAtg2HSmyQIroIHImNQLFppEDiHQA2gcAfgGQB2gZF9FaQFIEqHkIYQGjHQGyIOQGRHnDeEyQBMBpgLCBQgLCChcBbQjxDsi1CTQhmBTiDgEQiCgDhhhZI8K6GQgBAAAAAAQgBgBAAAAQgBAAAAABQgBAAgBAAI9ca1I1lBlQgBgBJ363g");
	this.shape_20.setTransform(55.6011,75.1975,0.1065,0.1039);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFC0BB").s().p("A5hwWIMqoXMAmYAvtIjbBGImHAog");
	this.shape_21.setTransform(76.9718,84.4995,0.1065,0.1039);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#07085B").s().p("ALEERI2ag7QgmgCgagTQgagTAAgaIASmkQEcBvEdgcQCOgOBVgkIMDF/QBBAfgYAzQgWAvhHAAIgJAAg");
	this.shape_22.setTransform(79.0498,102.3317,0.1065,0.1039);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFC0BB").s().p("ASNTPIn0AxMgjPghjIMooXMAlFAr1g");
	this.shape_23.setTransform(63.1492,87.7125,0.1065,0.1039);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.instance_1},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,101.8,105.2);


(lib.tears = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol32();
	this.instance.setTransform(0.6,0.4,1,1,0,0,0,0.6,1.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({_off:false},0).wait(1).to({scaleX:0.9886,scaleY:0.9988,y:0.6},0).wait(1).to({scaleX:0.9773,scaleY:0.9976,y:0.75},0).wait(1).to({scaleX:0.9659,scaleY:0.9964,y:0.95},0).wait(1).to({scaleX:0.9545,scaleY:0.9953,x:0.55,y:1.1},0).wait(1).to({scaleX:0.9432,scaleY:0.9941,y:1.25},0).wait(1).to({scaleX:0.9318,scaleY:0.9929,y:1.4},0).wait(1).to({scaleX:0.9205,scaleY:0.9917,y:1.55},0).wait(1).to({scaleX:0.9091,scaleY:0.9905,x:0.6,y:1.75},0).wait(1).to({scaleX:0.9123,scaleY:0.9909,x:0.55,y:2.05},0).wait(1).to({scaleX:0.9156,scaleY:0.9912,y:2.4},0).wait(1).to({scaleX:0.9188,scaleY:0.9915,y:2.7},0).wait(1).to({scaleX:0.9221,scaleY:0.9919,y:3.05},0).wait(1).to({scaleX:0.9253,scaleY:0.9922,y:3.35},0).wait(1).to({scaleX:0.9286,scaleY:0.9926,y:3.7},0).wait(1).to({scaleX:0.9318,scaleY:0.9929,y:4.05},0).wait(1).to({scaleX:0.9351,scaleY:0.9932,y:4.35},0).wait(1).to({scaleX:0.9383,scaleY:0.9936,y:4.7},0).wait(1).to({scaleX:0.9416,scaleY:0.9939,y:5},0).wait(1).to({scaleX:0.9448,scaleY:0.9942,y:5.35},0).wait(1).to({scaleX:0.9481,scaleY:0.9946,y:5.65},0).wait(1).to({scaleX:0.9513,scaleY:0.9949,y:6},0).wait(1).to({scaleX:0.9545,scaleY:0.9953,y:6.35},0).wait(1).to({scaleX:0.9578,scaleY:0.9956,y:6.65},0).wait(1).to({scaleX:0.961,scaleY:0.9959,x:0.6,y:7},0).wait(1).to({scaleX:0.9643,scaleY:0.9963,y:7.3},0).wait(1).to({scaleX:0.9675,scaleY:0.9966,y:7.65},0).wait(1).to({scaleX:0.9708,scaleY:0.997,y:7.95},0).wait(1).to({scaleX:0.974,scaleY:0.9973,y:8.3},0).wait(1).to({scaleX:0.9773,scaleY:0.9976,y:8.65},0).wait(1).to({scaleX:0.9805,scaleY:0.998,y:8.95},0).wait(1).to({scaleX:0.9838,scaleY:0.9983,y:9.3},0).wait(1).to({scaleX:0.987,scaleY:0.9986,y:9.6},0).wait(1).to({scaleX:0.9903,scaleY:0.999,y:9.95},0).wait(1).to({scaleX:0.9935,scaleY:0.9993,y:10.25},0).wait(1).to({scaleX:0.9968,scaleY:0.9997,y:10.6},0).wait(1).to({scaleX:1,scaleY:1,y:10.95},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1,1.2,13.4);


(lib.Symbol30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#381B0C").s().p("AgXBxQAbgOAKggQAIgbgDgjQgCgbgIgjQgJgjgJgZQAKAaAJAiQAKAjACAaQAEAkgIAcQgKAkgcAOg");
	this.shape.setTransform(75.1057,52.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#381B0C").s().p("AgiCCQARgGAMgQQAKgOAHgTQAMggAFgrQAEghAAgrQAAgegCgdQADAcABAfQABArgEAiQgEArgLAgQgIAWgJANQgNASgSAHg");
	this.shape_1.setTransform(92.3861,68.6375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#381B0C").s().p("AgxCbQAXgGARgQQANgNANgYQARglAIg2QAGgtAAgwQAAglgDgiQAEAiAAAlQABA1gFApQgHA3gRAkQgNAZgNAPQgSARgYAGg");
	this.shape_2.setTransform(109.0577,83.4);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#381B0C").s().p("AgeBlQATgMANgeQAKgVAHghQAGgUADgiQADglAAgUQABAdgCAcQgDAhgFAXQgGAegKAYQgNAggUAOg");
	this.shape_3.setTransform(121.6393,102.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#381B0C").s().p("AAAAPQgcAAglgFQgogHgZgGQAbAGAmAFQAfAEAiAAQAjgBAfgGQAegFAggOIADAGQggANggAFQghAFgdAAIgFAAg");
	this.shape_4.setTransform(107.825,116.2271);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#381B0C").s().p("AhNAMQgfgFgWgIQAWAHAgAFQAgAFAmgDQAhgCAjgIIAigIIAigLIACAGIgjAKQgWAGgMACQgfAHgmABIgQABQgdAAgagFg");
	this.shape_5.setTransform(89.6,98.9661);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#381B0C").s().p("AgCARQgfgEghgKQgjgLgYgMQAZAMAjAJQAhAKAfADQAZAEAmgCQAcgCAjgKIACAGQgjAJgeACIgNAAQgeAAgVgEg");
	this.shape_6.setTransform(73.8,79.2341);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#381B0C").s().p("AAiATQgUgEgQgHQgigKgjgTQAiARAkAKQASAFARADQAWAEAPgCIABAGIgIAAQgNAAgRgDg");
	this.shape_7.setTransform(62.625,58.5188);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#381B0C").s().p("AIJIJIhcgmIgsgXQhGgnhfhJQgUgPg4gwIhJhCQg/g7hMhSQh9iDiHikQiIiohoiRIACgCQBuCSCJChQCUCsB2B2QBIBLBEA9QBZBRA8AvQBPBCBPAyIAqAZIArAXIAsAVIAuARIAAACIgwgMg");
	this.shape_8.setTransform(107.975,89.55);

	this.instance = new lib.Path_9_1();
	this.instance.setTransform(93,97.45,1,1,0,0,0,45,32.9);
	this.instance.alpha = 0.3008;
	this.instance.compositeOperation = "multiply";

	this.instance_1 = new lib.Path_10();
	this.instance_1.setTransform(89.5,89.7,1,1,0,0,0,48.4,40.5);
	this.instance_1.alpha = 0.3008;
	this.instance_1.compositeOperation = "multiply";

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EB8526").s().p("ADYINQgYAEgnACQhQAEhOgNIAugmQgVACgjgHQhGgNhFgpIAugYQgZgGgggNQhAgagnghIA8gOQgRgIgYgQQgvgfgfgoIA1gJQgWgPgagZQgzgygSgwIA4ANQgWgVgYgcQgxg4gKgnIA6AHQgOgRgQgbQghg1gPgtIApgCQgSgYgUghQgnhDgKgwIA8AeQgLgPgNgkQgZhHgJhmIBeA6QBpA/A7AXIAAhHIBfA9QBpBAA0AOIgThNIAzAvQA5A5ATAwIAWg8IAtAyQAuA6ADAvIAZg5IApAuQAtA+APBQIAUg6IANAOQAQASALAXQAmBJgNBiIAigpIAIBGQACBPgaAuIAwgYIgCA3QgFA9gSAhQgTAhATBDQAJAiANAbQgbgKghgHQhCgNgeAQQgeARhGAHIhAAEg");
	this.shape_9.setTransform(87.175,73.475);

	this.instance_2 = new lib.Path_5();
	this.instance_2.setTransform(101,89.5,1,1,0,0,0,101,89.5);
	this.instance_2.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.shape_9},{t:this.instance_1},{t:this.instance},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol30, new cjs.Rectangle(0,0,202,179), null);


(lib.Symbol25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#381B0C").s().p("AA8ArQgMgCgMgFQgSgHgZgQQgkgVgqgjQAqAgAmAVQAVAMAWAIQAPAFAIABQANACAHgGIAFAGQgHAGgLAAIgIgBg");
	this.shape.setTransform(17.3649,15.691,0.23,0.23);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#381B0C").s().p("AAOAUQgJgDgKgIQgTgMgNgUQAPASATALQAJAFAKADQALADAKgBIABAIIgDAAQgKAAgLgEg");
	this.shape_1.setTransform(17.7732,10.9903,0.23,0.23);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#381B0C").s().p("AgRA/QAOgNAGgPQAHgRABgSQACgQgDgTQgDgVgFgQQAIATADARQAFASAAATQAAAVgGARQgGASgNAQg");
	this.shape_2.setTransform(20.2571,12.1512,0.23,0.23);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#381B0C").s().p("AAmAzQgZgJgagTQgYgRgVgUQgXgXgQgUQASAUAXAVQAVASAZAPQAbARAYAHQAcAIAagGIADANQgLACgKAAQgUAAgTgHg");
	this.shape_3.setTransform(20.1421,16.4534,0.23,0.23);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#381B0C").s().p("AgWAyQANgJAIgMQAIgMAFgOQAKgcAAgfQADAfgJAdQgEAOgJAOQgFALgPAOg");
	this.shape_4.setTransform(25.398,16.6878,0.23,0.23);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#381B0C").s().p("AAiALQgMgOgOgKQgcgWglgHQASADARAGQASAGAOALQAQAKAMAOQAKALAKAVIgHADQgJgVgIgLg");
	this.shape_5.setTransform(19.8489,22.9955,0.23,0.23);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#381B0C").s().p("AALA1QgYgBgigEIg8gJQgigFgZgBQgjgCgXAHQAXgIAjAAQAbAAAhAEQBZAJAcAAQBGAAAsgVQAygWAgg1IASALQgTAdgWARQgXAVgdAMQgrARg5AAIgVgBg");
	this.shape_6.setTransform(20.0559,22.8405,0.23,0.23);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#381B0C").s().p("AASDXQAYgtgCg/QgBgvgRhBQgNgxgWg9IgrhtIAwBrQAZA8APAxQAUA9AEA1QAFBFgYAyg");
	this.shape_7.setTransform(23.8476,15.8311,0.23,0.23);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#381B0C").s().p("AAmgCQgUgJgPgCQgTgEgSACQgUABgRAFQATgGASgCQATgDASADQARABAUAJQAOAGASAPIgGAGQgQgRgMgFg");
	this.shape_8.setTransform(24.3338,27.1613,0.23,0.23);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#381B0C").s().p("AAEAdQAFgIABgHQAAgIgDgIQgFgOgNgOQANAOAHAOQADAGAAAKQAAAJgGAIg");
	this.shape_9.setTransform(17.7329,28.3314,0.23,0.23);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#381B0C").s().p("AAZAGQgJgHgMgIQgVgMgdgFQAcADAYALQAOAHAJAHQALAIAHANIgIAEQgEgLgKgKg");
	this.shape_10.setTransform(17.4627,29.1191,0.23,0.23);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#381B0C").s().p("AgQArQAQgOAMgTIAMgSIAJgTQAGgNAGgdIAHACQgFAYgIASIgLAUIgNASQgMAPgSARQgSAQgSAJQASgLARgQg");
	this.shape_11.setTransform(22.7411,30.5221,0.23,0.23);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#381B0C").s().p("AgEAZQgZgCgagNQgRgIgZgWIAFgGQAYAYARAHQAXANAZADQAXAEAcgDQAbgEAXgKQgWALgcAFQgQADgPAAIgVgCg");
	this.shape_12.setTransform(31.6592,24.2225,0.23,0.23);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#381B0C").s().p("AhXAvIACgIQAZAIAagEQAYgFAXgOQAWgOAUgTQATgUAPgVQgMATgVAXQgTAVgWAOQgXAQgZAGQgLACgKAAQgRAAgQgEg");
	this.shape_13.setTransform(32.8437,18.5106,0.23,0.23);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#381B0C").s().p("AAAAfQgJgKgHgPQgLgYADgeQgBAdANAYQAGAMAJAKQAJAIANAIIgEAGQgOgJgHgJg");
	this.shape_14.setTransform(30.7166,16.7511,0.23,0.23);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#381B0C").s().p("Ah3BTIBLgIQAsgFAegEQAqgJAcgLQAjgNAbgYQAxgnAhhPIAYALQgmBRg3ApQggAZglAMQghAMgpAGQgeAEgtACIhMAEQhTAGhCAPQBAgRBVgKg");
	this.shape_15.setTransform(21.4704,27.6931,0.23,0.23);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#381B0C").s().p("Ah3D/QAhgRAYgZQAXgZARgkQANgdALgpIAUhJQAYhZATg4QAWhEAhhKQgcBGgVBKQgRA8gSBXIgRBKQgLAqgMAgQgPAlgZAfQgaAeglAUg");
	this.shape_16.setTransform(30.1355,19.3845,0.23,0.23);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#381B0C").s().p("AFMHZQgpgNgkgSQhLgmhCg1QgigdgagfIgOgRIh4i/Qh2i5g5heQguhNgmhCIgnhIQgWgrgNghIADgBQANAfAYArIApBHQAgAzA4BZQBWCFBgCMIB9C8IAMAPQAXAdAiAcQAZAWAmAdQAZARAsAbQBVAxBBAMIAAADQgjgBgvgPg");
	this.shape_17.setTransform(27.088,20.5748,0.23,0.23);

	this.instance = new lib.Path_18_1();
	this.instance.setTransform(23.55,27.55,0.2301,0.2301,0,0,0,65.7,32.6);
	this.instance.alpha = 0.5;
	this.instance.compositeOperation = "multiply";

	this.instance_1 = new lib.Path_19();
	this.instance_1.setTransform(23.4,21.75,0.2301,0.2301,0,0,0,66.5,57.6);
	this.instance_1.alpha = 0.5;
	this.instance_1.compositeOperation = "multiply";

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFE400").s().p("AiFJLQgWAFgfAEQg/AHgugJQgkgHhKg1QhEgxggABQAZgVAZgaQAyg0gCgXQgBgQhnhUQhvhcgdg5IBeAXQBpARA1gZQA1gZAOhAQAGgXgBg/IAtAiQAAgNgJgRQgSgigtgVQgtgVhDhCIg5g+IA5AGQA/gBAbgeQAcgegYh2IgfhxIAlAPQgQgSgNhJIgIhFICQBsQCWBqAegFQAfgEAagtQANgXAIgVQADB3BJBoQAyBHAsAZQAYAOAkgHQAqgIAygjQArgfAphPQAVgoAMgiQAdAvASCAQAPB1ALAHQASAMA/gSQAfgJAdgLQgRAagGA2QgHBBgMAdQgOAog0BBQgaAhgXAYQAXATBFAAQAjABAfgEQiODIiiACQg0ABgvgTIgkgTQABBPg0BTQhmClkGAVQA2g3AOgjg");
	this.shape_18.setTransform(23.34,19.0815,0.2301,0.2301);

	this.instance_2 = new lib.Path_6();
	this.instance_2.setTransform(23.4,21.7,0.2301,0.2301,0,0,0,101.7,94.3);
	this.instance_2.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.shape_18},{t:this.instance_1},{t:this.instance},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol25, new cjs.Rectangle(0,0,46.7,43.3), null);


(lib.Scene_1_buttons = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// buttons
	this.playbotton = new lib.playbotton();
	this.playbotton.name = "playbotton";
	this.playbotton.setTransform(370.35,354.5,1,1,0,0,0,78.5,48.6);
	new cjs.ButtonHelper(this.playbotton, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.playbotton).to({_off:true},2).wait(572));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.orangeleaf = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol30();
	this.instance.setTransform(178.6,149.5,1,1,0,0,0,101,89.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.9863,scaleY:0.9863,rotation:-5.3571,x:186.7,y:155.45},0).wait(1).to({scaleX:0.9725,scaleY:0.9725,rotation:-10.7142,x:194.75,y:161.4},0).wait(1).to({scaleX:0.9588,scaleY:0.9588,rotation:-16.0713,x:202.85,y:167.4},0).wait(1).to({scaleX:0.9451,scaleY:0.9451,rotation:-21.4284,x:210.9,y:173.4},0).wait(1).to({scaleX:0.9314,scaleY:0.9314,rotation:-26.7855,x:219,y:179.35},0).wait(1).to({scaleX:0.9176,scaleY:0.9176,rotation:-32.1426,x:227.1,y:185.35},0).wait(1).to({scaleX:0.9039,scaleY:0.9039,rotation:-37.4997,x:235.2,y:191.35},0).wait(1).to({scaleX:0.8902,scaleY:0.8902,rotation:-42.8569,x:243.3,y:197.25},0).wait(1).to({scaleX:0.8764,scaleY:0.8764,rotation:-48.214,x:251.4,y:203.25},0).wait(1).to({scaleX:0.8627,scaleY:0.8627,rotation:-53.5711,x:259.5,y:209.25},0).wait(1).to({scaleX:0.849,scaleY:0.849,rotation:-58.9282,x:267.55,y:215.2},0).wait(1).to({scaleX:0.8353,scaleY:0.8353,rotation:-64.2853,x:275.65,y:221.2},0).wait(1).to({scaleX:0.8216,scaleY:0.8216,rotation:-69.6424,x:283.75,y:227.15},0).wait(1).to({scaleX:0.8078,scaleY:0.8078,rotation:-74.9995,x:291.8,y:233.1},0).wait(1).to({scaleX:0.8065,scaleY:0.8065,rotation:-70.9995,x:284,y:239.2},0).wait(1).to({scaleX:0.8053,scaleY:0.8053,rotation:-66.9995,x:276.3,y:245.25},0).wait(1).to({scaleX:0.804,scaleY:0.804,rotation:-62.9995,x:268.45,y:251.3},0).wait(1).to({scaleX:0.8027,scaleY:0.8027,rotation:-58.9996,x:260.7,y:257.35},0).wait(1).to({scaleX:0.8015,scaleY:0.8015,rotation:-54.9996,x:252.9,y:263.45},0).wait(1).to({scaleX:0.8002,scaleY:0.8002,rotation:-50.9996,x:245.1,y:269.5},0).wait(1).to({scaleX:0.7989,scaleY:0.7989,rotation:-46.9996,x:237.35,y:275.55},0).wait(1).to({scaleX:0.7977,scaleY:0.7977,rotation:-42.9996,x:229.55,y:281.6},0).wait(1).to({scaleX:0.7964,scaleY:0.7964,rotation:-38.9996,x:221.75,y:287.7},0).wait(1).to({scaleX:0.7951,scaleY:0.7951,rotation:-34.9996,x:214,y:293.8},0).wait(1).to({scaleX:0.7939,scaleY:0.7939,rotation:-30.9996,x:206.25,y:299.8},0).wait(1).to({scaleX:0.7926,scaleY:0.7926,rotation:-26.9997,x:198.45,y:305.85},0).wait(1).to({scaleX:0.7913,scaleY:0.7913,rotation:-22.9997,x:190.6,y:311.95},0).wait(1).to({scaleX:0.79,scaleY:0.79,rotation:-18.9997,x:182.85,y:318},0).wait(1).to({scaleX:0.7888,scaleY:0.7888,rotation:-14.9997,x:175.05,y:324.1},0).wait(1).to({scaleX:0.7875,scaleY:0.7875,rotation:-18.9997,x:187.05,y:330.45},0).wait(1).to({scaleX:0.7862,scaleY:0.7862,rotation:-22.9997,x:199.05,y:336.8},0).wait(1).to({scaleX:0.785,scaleY:0.785,rotation:-26.9997,x:211,y:343.25},0).wait(1).to({scaleX:0.7837,scaleY:0.7837,rotation:-30.9996,x:222.95,y:349.65},0).wait(1).to({scaleX:0.7824,scaleY:0.7824,rotation:-34.9996,x:234.95,y:356.05},0).wait(1).to({scaleX:0.7811,scaleY:0.7811,rotation:-38.9996,x:246.9,y:362.45},0).wait(1).to({scaleX:0.7799,scaleY:0.7799,rotation:-42.9996,x:258.9,y:368.85},0).wait(1).to({scaleX:0.7786,scaleY:0.7786,rotation:-46.9996,x:270.85,y:375.3},0).wait(1).to({scaleX:0.7773,scaleY:0.7773,rotation:-50.9996,x:282.8,y:381.7},0).wait(1).to({scaleX:0.7761,scaleY:0.7761,rotation:-54.9996,x:294.8,y:388.05},0).wait(1).to({scaleX:0.7748,scaleY:0.7748,rotation:-58.9996,x:306.8,y:394.4},0).wait(1).to({scaleX:0.7735,scaleY:0.7735,rotation:-62.9995,x:318.75,y:400.85},0).wait(1).to({scaleX:0.7723,scaleY:0.7723,rotation:-66.9995,x:330.75,y:407.2},0).wait(1).to({scaleX:0.771,scaleY:0.771,rotation:-70.9995,x:342.7,y:413.6},0).wait(1).to({scaleX:0.7697,scaleY:0.7697,rotation:-74.9995,x:354.65,y:420.05},0).wait(1).to({scaleX:0.7684,scaleY:0.7684,rotation:-70.9995,x:343.85,y:425.75},0).wait(1).to({scaleX:0.7672,scaleY:0.7672,rotation:-66.9995,x:333.05,y:431.55},0).wait(1).to({scaleX:0.7659,scaleY:0.7659,rotation:-62.9995,x:322.2,y:437.25},0).wait(1).to({scaleX:0.7646,scaleY:0.7646,rotation:-58.9996,x:311.35,y:443},0).wait(1).to({scaleX:0.7634,scaleY:0.7634,rotation:-54.9996,x:300.5,y:448.75},0).wait(1).to({scaleX:0.7621,scaleY:0.7621,rotation:-50.9996,x:289.7,y:454.45},0).wait(1).to({scaleX:0.7608,scaleY:0.7608,rotation:-46.9996,x:278.85,y:460.2},0).wait(1).to({scaleX:0.7596,scaleY:0.7596,rotation:-42.9996,x:268,y:465.95},0).wait(1).to({scaleX:0.7583,scaleY:0.7583,rotation:-38.9996,x:257.2,y:471.7},0).wait(1).to({scaleX:0.757,scaleY:0.757,rotation:-34.9996,x:246.4,y:477.45},0).wait(1).to({scaleX:0.7558,scaleY:0.7558,rotation:-30.9996,x:235.6,y:483.2},0).wait(1).to({scaleX:0.7545,scaleY:0.7545,rotation:-26.9997,x:224.7,y:488.9},0).wait(1).to({scaleX:0.7532,scaleY:0.7532,rotation:-22.9997,x:213.9,y:494.65},0).wait(1).to({scaleX:0.7519,scaleY:0.7519,rotation:-18.9997,x:203.05,y:500.45},0).wait(1).to({scaleX:0.7507,scaleY:0.7507,rotation:-14.9997,x:192.25,y:506.15},0).wait(1).to({scaleX:0.7494,scaleY:0.7494,rotation:-19.9996,x:206.15,y:514.15},0).wait(1).to({scaleX:0.7481,scaleY:0.7481,rotation:-24.9995,x:220.15,y:522.2},0).wait(1).to({scaleX:0.7469,scaleY:0.7469,rotation:-29.9994,x:234.05,y:530.25},0).wait(1).to({scaleX:0.7456,scaleY:0.7456,rotation:-34.9993,x:248,y:538.25},0).wait(1).to({scaleX:0.7443,scaleY:0.7443,rotation:-39.9992,x:261.95,y:546.35},0).wait(1).to({scaleX:0.743,scaleY:0.743,rotation:-44.9991,x:275.85,y:554.4},0).wait(1).to({scaleX:0.7418,scaleY:0.7418,rotation:-49.999,x:289.8,y:562.35},0).wait(1).to({scaleX:0.7405,scaleY:0.7405,rotation:-54.9989,x:303.8,y:570.4},0).wait(1).to({scaleX:0.7392,scaleY:0.7392,rotation:-59.9988,x:317.75,y:578.5},0).wait(1).to({scaleX:0.738,scaleY:0.738,rotation:-64.9987,x:331.65,y:586.5},0).wait(1).to({scaleX:0.7367,scaleY:0.7367,rotation:-69.9986,x:345.6,y:594.55},0).wait(1).to({scaleX:0.7354,scaleY:0.7354,rotation:-74.9985,x:359.6,y:602.55},0).wait(1).to({scaleX:0.7342,scaleY:0.7342,rotation:-79.9984,x:373.5,y:610.6},0).wait(1).to({scaleX:0.7329,scaleY:0.7329,rotation:-84.9983,x:387.45,y:618.6},0).wait(1).to({scaleX:0.7316,scaleY:0.7316,rotation:-89.9982,x:401.4,y:626.65},0).wait(1).to({scaleX:0.7304,scaleY:0.7304,rotation:-85.9983,x:390.05,y:634.5},0).wait(1).to({scaleX:0.7291,scaleY:0.7291,rotation:-81.9983,x:378.7,y:642.45},0).wait(1).to({scaleX:0.7278,scaleY:0.7278,rotation:-77.9984,x:367.4,y:650.3},0).wait(1).to({scaleX:0.7266,scaleY:0.7266,rotation:-73.9985,x:356.1,y:658.1},0).wait(1).to({scaleX:0.7253,scaleY:0.7253,rotation:-69.9985,x:344.75,y:666},0).wait(1).to({scaleX:0.724,scaleY:0.724,rotation:-65.9986,x:333.45,y:673.9},0).wait(1).to({scaleX:0.7227,scaleY:0.7227,rotation:-61.9987,x:322.1,y:681.75},0).wait(1).to({scaleX:0.7215,scaleY:0.7215,rotation:-57.9987,x:310.75,y:689.6},0).wait(1).to({scaleX:0.7202,scaleY:0.7202,rotation:-53.9988,x:299.45,y:697.5},0).wait(1).to({scaleX:0.7189,scaleY:0.7189,rotation:-49.9989,x:288.15,y:705.4},0).wait(1).to({scaleX:0.7176,scaleY:0.7176,rotation:-45.9989,x:276.8,y:713.2},0).wait(1).to({scaleX:0.7164,scaleY:0.7164,rotation:-41.999,x:265.45,y:721.15},0).wait(1).to({scaleX:0.7151,scaleY:0.7151,rotation:-37.9991,x:254.15,y:729},0).wait(1).to({scaleX:0.7138,scaleY:0.7138,rotation:-33.9991,x:242.8,y:736.85},0).wait(1).to({scaleX:0.7126,scaleY:0.7126,rotation:-29.9992,x:231.55,y:744.75},0).wait(1).to({scaleX:0.7067,scaleY:0.7067,rotation:-34.4991,x:246.25,y:755.5},0).wait(1).to({scaleX:0.7008,scaleY:0.7008,rotation:-38.9991,x:261.05,y:766.4},0).wait(1).to({scaleX:0.6949,scaleY:0.6949,rotation:-43.499,x:275.8,y:777.2},0).wait(1).to({scaleX:0.689,scaleY:0.689,rotation:-47.999,x:290.55,y:788.05},0).wait(1).to({scaleX:0.6831,scaleY:0.6831,rotation:-52.4989,x:305.35,y:798.85},0).wait(1).to({scaleX:0.6772,scaleY:0.6772,rotation:-56.9988,x:320.15,y:809.7},0).wait(1).to({scaleX:0.6713,scaleY:0.6713,rotation:-61.4988,x:334.9,y:820.5},0).wait(1).to({scaleX:0.6654,scaleY:0.6654,rotation:-65.9987,x:349.7,y:831.35},0).wait(1).to({scaleX:0.6595,scaleY:0.6595,rotation:-70.4987,x:364.5,y:842.2},0).wait(1).to({scaleX:0.6536,scaleY:0.6536,rotation:-74.9986,x:379.25,y:853.05},0).wait(1).to({scaleX:0.6477,scaleY:0.6477,rotation:-67.4987,x:371.85,y:872.7},0).wait(1).to({scaleX:0.6418,scaleY:0.6418,rotation:-59.9988,x:364.5,y:892.35},0).wait(1).to({scaleX:0.6359,scaleY:0.6359,rotation:-52.4989,x:357.1,y:912.05},0).wait(1).to({scaleX:0.6301,scaleY:0.6301,rotation:-44.999,x:349.75,y:931.7},0).wait(1).to({scaleX:0.6242,scaleY:0.6242,rotation:-37.4991,x:342.35,y:951.35},0).wait(1).to({scaleX:0.6183,scaleY:0.6183,rotation:-29.9992,x:335.05,y:971.05},0).wait(1).to({scaleX:0.6124,scaleY:0.6124,rotation:-33.3323,x:346.45,y:976.25},0).wait(1).to({scaleX:0.6065,scaleY:0.6065,rotation:-36.6655,x:357.95,y:981.45},0).wait(1).to({scaleX:0.6006,scaleY:0.6006,rotation:-39.9986,x:369.4,y:986.7},0).wait(1).to({scaleX:0.5947,scaleY:0.5947,rotation:-43.3318,x:380.9,y:991.9},0).wait(1).to({scaleX:0.5888,scaleY:0.5888,rotation:-46.6649,x:392.35,y:997.05},0).wait(1).to({scaleX:0.5829,scaleY:0.5829,rotation:-49.9981,x:403.8,y:1002.3},0).wait(1).to({scaleX:0.577,scaleY:0.577,rotation:-53.3312,x:415.25,y:1007.5},0).wait(1).to({scaleX:0.5711,scaleY:0.5711,rotation:-56.6644,x:426.75,y:1012.7},0).wait(1).to({scaleX:0.5652,scaleY:0.5652,rotation:-59.9975,x:438.2,y:1017.85},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(77.6,57.8,433.1,1034.8);


(lib.orange = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol27();
	this.instance.setTransform(14,14,1,1,0,0,0,4.2,4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:1.0132,scaleY:1.0138,x:13.95,y:13.95},0).wait(1).to({scaleX:1.0263,scaleY:1.0276},0).wait(1).to({scaleX:1.0395,scaleY:1.0414},0).wait(1).to({scaleX:1.0526,scaleY:1.0551,y:14},0).wait(1).to({scaleX:1.0658,scaleY:1.0689,x:14},0).wait(1).to({scaleX:1.0789,scaleY:1.0827},0).wait(1).to({scaleX:1.0921,scaleY:1.0965,y:13.95},0).wait(1).to({scaleX:1.1053,scaleY:1.1103},0).wait(1).to({scaleX:1.1184,scaleY:1.1241},0).wait(1).to({scaleX:1.1316,scaleY:1.1378,x:13.95,y:14},0).wait(1).to({scaleX:1.1447,scaleY:1.1516},0).wait(1).to({scaleX:1.1579,scaleY:1.1654},0).wait(1).to({scaleX:1.1711,scaleY:1.1792,y:13.95},0).wait(1).to({scaleX:1.1842,scaleY:1.193},0).wait(1).to({scaleX:1.1974,scaleY:1.2068,x:14},0).wait(1).to({scaleX:1.2105,scaleY:1.2205,y:14},0).wait(1).to({scaleX:1.2237,scaleY:1.2343},0).wait(1).to({scaleX:1.2368,scaleY:1.2481},0).wait(1).to({scaleX:1.25,scaleY:1.2619},0).wait(1).to({scaleX:1.2656,scaleY:1.2777,x:13.95,y:13.95},0).wait(1).to({scaleX:1.2813,scaleY:1.2934,x:14,y:14},0).wait(1).to({scaleX:1.2969,scaleY:1.3092},0).wait(1).to({scaleX:1.3125,scaleY:1.325,x:13.95,y:13.95},0).wait(1).to({scaleX:1.3281,scaleY:1.3408,x:14,y:14},0).wait(1).to({scaleX:1.3438,scaleY:1.3565},0).wait(1).to({scaleX:1.3594,scaleY:1.3723,x:13.95,y:13.95},0).wait(1).to({scaleX:1.375,scaleY:1.3881,x:14,y:14},0).wait(1).to({scaleX:1.3906,scaleY:1.4039},0).wait(1).to({scaleX:1.4063,scaleY:1.4196,x:13.95,y:13.95},0).wait(1).to({scaleX:1.4219,scaleY:1.4354,y:14},0).wait(1).to({scaleX:1.4375,scaleY:1.4512,x:14},0).wait(1).to({scaleX:1.4531,scaleY:1.467,x:13.95,y:13.95},0).wait(1).to({scaleX:1.4688,scaleY:1.4827,y:14},0).wait(1).to({scaleX:1.4844,scaleY:1.4985,x:14},0).wait(1).to({scaleX:1.5,scaleY:1.5143,y:13.95},0).wait(1).to({scaleX:1.5156,scaleY:1.5301,x:13.95,y:14},0).wait(1).to({scaleX:1.5313,scaleY:1.5458,x:14},0).wait(1).to({scaleX:1.5469,scaleY:1.5616,y:13.95},0).wait(1).to({scaleX:1.5625,scaleY:1.5774,x:13.95},0).wait(1).to({scaleX:1.5802,scaleY:1.5952,x:14,y:14},0).wait(1).to({scaleX:1.5978,scaleY:1.6131,x:13.95,y:13.95},0).wait(1).to({scaleX:1.6155,scaleY:1.6309,x:14,y:14},0).wait(1).to({scaleX:1.6332,scaleY:1.6487,x:13.95,y:13.95},0).wait(1).to({scaleX:1.6509,scaleY:1.6666,x:14,y:14},0).wait(1).to({scaleX:1.6685,scaleY:1.6844,x:13.95,y:13.95},0).wait(1).to({scaleX:1.6862,scaleY:1.7023,x:14,y:14},0).wait(1).to({scaleX:1.7039,scaleY:1.7201,x:13.95,y:13.95},0).wait(1).to({scaleX:1.7215,scaleY:1.7379,x:14,y:14},0).wait(1).to({scaleX:1.7392,scaleY:1.7558,x:13.95,y:13.95},0).wait(1).to({scaleX:1.7569,scaleY:1.7736,x:14,y:14},0).wait(1).to({scaleX:1.7746,scaleY:1.7915,x:13.95,y:13.95},0).wait(1).to({scaleX:1.7922,scaleY:1.8093,x:14,y:14},0).wait(1).to({scaleX:1.8099,scaleY:1.8271,x:13.95,y:13.95},0).wait(1).to({scaleX:1.8276,scaleY:1.845,x:14,y:14},0).wait(1).to({scaleX:1.8452,scaleY:1.8628,y:13.95},0).wait(1).to({scaleX:1.8629,scaleY:1.8807,x:13.95,y:14},0).wait(1).to({scaleX:1.8806,scaleY:1.8985,x:14,y:13.95},0).wait(1).to({scaleX:1.8982,scaleY:1.9163,x:13.95,y:14},0).wait(1).to({scaleX:1.9159,scaleY:1.9342,x:14,y:13.95},0).wait(1).to({scaleX:1.9399,scaleY:1.9583,y:14},0).wait(1).to({scaleX:1.9638,scaleY:1.9825},0).wait(1).to({scaleX:1.9878,scaleY:2.0067},0).wait(1).to({scaleX:2.0117,scaleY:2.0309},0).wait(1).to({scaleX:2.0357,scaleY:2.0551},0).wait(1).to({scaleX:2.0596,scaleY:2.0792,x:13.95},0).wait(1).to({scaleX:2.0836,scaleY:2.1034},0).wait(1).to({scaleX:2.1075,scaleY:2.1276},0).wait(1).to({scaleX:2.1315,scaleY:2.1518},0).wait(1).to({scaleX:2.1554,scaleY:2.1759},0).wait(1).to({scaleX:2.1794,scaleY:2.2001},0).wait(1).to({scaleX:2.2033,scaleY:2.2243},0).wait(1).to({scaleX:2.2273,scaleY:2.2485},0).wait(1).to({scaleX:2.2512,scaleY:2.2726},0).wait(1).to({scaleX:2.2752,scaleY:2.2968},0).wait(1).to({scaleX:2.2991,scaleY:2.321},0).wait(1).to({scaleX:2.3231,scaleY:2.3452},0).wait(1).to({scaleX:2.347,scaleY:2.3694,y:13.95},0).wait(1).to({scaleX:2.371,scaleY:2.3935},0).wait(1).to({scaleX:2.3949,scaleY:2.4177},0).wait(41));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4,3.9,20.1,20.3);


(lib.mommy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.tears();
	this.instance.setTransform(27.55,28.4);

	this.instance_1 = new lib.tears();
	this.instance_1.setTransform(27.55,28.3,0.3636,0.5357,0,0,0,0.6,1.5);

	this.instance_2 = new lib.hands();
	this.instance_2.setTransform(28.8,67.35,1,1,0,-14.9992,165.0008,15.4,6.3);

	this.instance_3 = new lib.hairFront("synched",0,false);
	this.instance_3.setTransform(24.35,20.45,1,1,0,0,0,8.9,4.8);

	this.instance_4 = new lib.hands();
	this.instance_4.setTransform(20.9,68.35,1,1,14.9992,0,0,15.4,6.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC0BB").s().p("AgFACQgGgJAEgCQAEgCAEABIAFACIAEAIIgIALIAAAAQgCAAgFgJg");
	this.shape.setTransform(16.2738,26.119);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F99893").s().p("AgKADIAAAAIAWgCIAKgFIgEAEIgGADIgGACIgGAAQgFAAgFgCgAgVgDIAKAEIgBABQgGgCgDgDg");
	this.shape_1.setTransform(24.875,32.05,1,1,0,180,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F99893").s().p("AACAMIABgEIgDgEIgDgEIgCgGIAAgLIADALIACAFIACADQADACABACQABADgCAEQgEAFgGAAQAFgCACgEg");
	this.shape_2.setTransform(25.3583,28.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#07085B").s().p("AALACIgCgBQgFgBgDAAIgIAAIgKACQADgDAFgCQAEgCAGAAQAHABADADIAEACIADAFg");
	this.shape_3.setTransform(27.6885,25.0927,1,1,-165.0008);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#07085B").s().p("AgOABIAEgCQAEgDAGgBQAFAAAFACQAFACADADIgKgCIgIAAIgIABIgCABIgHAEg");
	this.shape_4.setTransform(21.4598,25.2014,1,1,0,150.0008,-29.9992);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AgFAAQAAgFAFAAQACgBADACQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQABAGgHABQgFAAAAgHg");
	this.shape_5.setTransform(27.55,26.845);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgDAFQgBgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAgBQABgFAFgBQACAAADACQAAABAAAAQABABAAABQAAAAAAABQABAAAAAAQAAAGgHAAIAAABIgDgCg");
	this.shape_6.setTransform(21.95,26.755);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFC0BB").s().p("AAABYQgZAAgUgRQgTgSgEgbIgEADQgGADgIgEQgHgDgEgIQgEgJACgHQABgHAHgEQAGgDAJAEQgCggAXgXQAXgXAgABQAhgBAXAXQAWAXgBAgQAIgEAHADQAGAEACAHQACAHgEAJQgEAIgIADQgHAEgHgDIgDgDQgEAbgUASQgTARgZAAIgBAAg");
	this.shape_7.setTransform(24.5608,26.2486);

	this.instance_5 = new lib.Path_18();
	this.instance_5.setTransform(24.85,38.8,1,1,0,0,0,4.4,1.4);
	this.instance_5.compositeOperation = "multiply";

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DAEEF7").s().p("AAICZIgggDQgtgFgChbQgChaABgGIhIgaQAeg2AYgSQAYgSAdAKIAZAQQAKAEAKABQAPgBANgGIASgOIAAADQAdgKAfAYQAcAXADAcQABAEgfARQgfASAAADQACAVAAAZQAAAVgBAFQgBADABAnIACBGIgVACIgYACIghADIgBAAg");
	this.shape_8.setTransform(23.9754,52.3359);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F99893").s().p("AgZAKIAAgaIA0AAIAAAfQgMACgLAAQgQAAgNgHg");
	this.shape_9.setTransform(24.8,34.0707);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFC0BB").s().p("AgaAvIAAhdIA1AAIAABdg");
	this.shape_10.setTransform(24.825,38.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFC0BB").s().p("AgdgBIgOgXIBXAAIgEANIg3AkIgOgag");
	this.shape_11.setTransform(24.8,39.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#55769F").s().p("Ag/D2Igki3IgKCzIhCgKQgTipA6irQATg2AYgwIAUglIA/APIABAAIAAgBIACAAIADAAIAAABIABAAIA+gPIATAaQAXAjATAuQA8CVAADSQhLAdhsAAQgdAAgfgCg");
	this.shape_12.setTransform(25.1563,87.1242);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#07085B").s().p("AgyAOQgGAAAAgHIAAgUQBQAZAQgTIAOAIQAEACgBAGQgCAFgFAAg");
	this.shape_13.setTransform(33.0688,142.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFC0BB").s().p("AglE4QgHAAAAgHIgZoxQAZgaAcgQQA2ggALAyQARBNg4HRIA4AlQAFACgCAGQgBAFgGAAg");
	this.shape_14.setTransform(31.8188,112.3294);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#07085B").s().p("AgxAOQgFAAgCgFQgBgGAEgCIANgIQARATBQgZIAAAUQAAAHgGAAg");
	this.shape_15.setTransform(17.6563,142.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFC0BB").s().p("Ag9E4QgGAAgBgFQgCgGAFgCIA4glQgQh+gMiFQgWjqALgxQAMgyA1AgQAcAQAZAaIgaIxQAAAHgGAAg");
	this.shape_16.setTransform(18.9313,112.3294);

	this.instance_6 = new lib.hair_back("synched",0,false);
	this.instance_6.setTransform(4.7,40.35,1,1,0,0,0,15.1,14.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFC0BB").s().p("AgHCBIgOgKIAnhrIhohtQACgMAGgLQALgYARADIB5BxQAPAVABAMQABAOgPATIg7BoQgMgGgJgHg");
	this.shape_17.setTransform(36.7155,56.4137,1,1,14.9992);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFC0BB").s().p("AgHCBIgOgKIAnhrIhohtQACgMAGgLQALgYARADIB5BxQAPAVABAMQABAOgPATIg7BoQgMgGgJgHg");
	this.shape_18.setTransform(12.9845,55.4137,1,1,0,-14.9992,165.0008);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FF5B7E").s().p("Ag8ANQgJjPAGgVIAaAAQAVgCARAGIAOAGQATAJATAPQgMAogoDNIARAZQASAeAMAeQAMAZAHAcQhJAPgsAAIgKjMg");
	this.shape_19.setTransform(33.88,58.935);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FF5B7E").s().p("AgQB8IAnhrIh/iCIAkgSQAngSAQADIBoBsQAOAUAAAYQAAAZgPATIhABiQgbgNgPgLg");
	this.shape_20.setTransform(41.05,55.7786);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FF5B7E").s().p("AAZDRIgpgHQAGgaALgbQgegfgmg+QgfgxgJgVQgFgNABgKIABgIQAvhaA9gvQASgPASgIIAPgGIALgDQAOgCANABIAWABQAGAUgHDPIgIDMQgcAAgvgIgAgbgTQgBAEBABjIANgVIgWiSQg1A8gBAEg");
	this.shape_21.setTransform(11.2112,58.9357);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FF5B7E").s().p("AgsgKIASgXIAtgHIAaAkIgqAtg");
	this.shape_22.setTransform(12.625,71.025);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFC0BB").s().p("AgeADIgFgGIAVggQArAJABACQABAEgWADIgBABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAQAdAfgBACQgBABgLgJQgLgKgCABQgBAAAJALQAJALgCABQgBACgKgJIgKgIIAGALQAHALAAABQAAABgKgJIgKgJQgBABADAJIACAJIgBABQgBAAgeghg");
	this.shape_23.setTransform(16.6267,74.7555);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#DAEEF7").s().p("AgECQQgRAAgQgDIgVgEIgBieIAah7IACABQANAIAOAAQAOAAANgIIACgBQAlCagCAJQgCAHAABtQgPAEgOACQgRADgPAAg");
	this.shape_24.setTransform(25.2551,53);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.instance_6,p:{startPosition:0,loop:false}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance_5},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{rotation:0,skewX:150.0008,skewY:-29.9992,x:21.4598,y:25.2014}},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{y:32.05}},{t:this.shape},{t:this.instance_4},{t:this.instance_3,p:{startPosition:0,loop:false}},{t:this.instance_2,p:{skewX:-14.9992,skewY:165.0008,y:67.35}},{t:this.instance_1},{t:this.instance,p:{regY:0,x:27.55,y:28.4}}]}).to({state:[{t:this.instance_6,p:{startPosition:119,loop:undefined}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_24},{t:this.instance_5},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{rotation:165.0008,skewX:0,skewY:0,x:21.4112,y:25.1447}},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{y:31.4}},{t:this.shape_23},{t:this.shape_22},{t:this.shape},{t:this.instance_2,p:{skewX:0,skewY:0,y:73}},{t:this.instance_3,p:{startPosition:119,loop:undefined}},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.instance,p:{regY:-0.5,x:28.15,y:28.3}}]},239).wait(240));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,13.5,51.6,130);


(lib.mommouth = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_8();
	this.instance.setTransform(1.6,0.75,1,1,0,0,0,1.6,0.7);
	this.instance.alpha = 0.1992;
	this.instance.compositeOperation = "multiply";

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,3.2,1.5);


(lib.man = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("Ag/AFQgIgWgUgsIC3gMQhLBJg3BKQgIgYgRgtg");
	this.shape.setTransform(379.375,1067.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#DAEEF7").s().p("AhKBoQiXgvhqhoQADgqAGgyQCKCpDxAjQCKATCFgaQADAeABAnQhQANhOAAQiFAAhzgkg");
	this.shape_1.setTransform(209.275,106.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#DAEEF7").s().p("AlHgcIgEhbQCpCUDZAWQCMAOCJgnIgDBGQhlAYhkAAQj/AAjIiUg");
	this.shape_2.setTransform(209.025,130.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFC0BB").s().p("AAHHmIAxjuQlRg+AFgfQACgMA0gFQAfgDBQgFQCegPgHhEQgBgEiQg7QiPg7AJgTQAJgTCYAMQCVALABgJQABgIiOhXQiOhXAEgTQAFgWCfAmQCkAoAHgFQAHgEglgoIhShVQh2h7AegRQAZgOBwBDQBKAtBkBIQAVAPAKAYQAKAYgFAaIjfMMg");
	this.shape_3.setTransform(915.9047,480.754);

	this.instance = new lib.Path_11();
	this.instance.setTransform(891.95,459.5,1,1,0,0,0,45,67.8);
	this.instance.alpha = 0.1016;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("ACeMAIpeh9QgegGgRgaQgRgZAHgeIEGzyQAGgdAZgRQAagRAdAGIJfB9QAdAGARAaQARAZgGAeIkHTyQgGAegZAQQgTANgVAAQgIAAgHgCg");
	this.shape_4.setTransform(891.0401,463.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F99893").s().p("AiFA2QhMgZg3gpQBAAkBGARQBMATBCgGQBGgGBDgiQA6geA6g3QgaAhgcAYQgXAUghAUQgiATgiALQgjALgnAEIgdABQg6AAg7gSg");
	this.shape_5.setTransform(342.075,238.036);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#07085B").s().p("Ai7YWQjziAitkGQiRjehFkQQg+jyAYimQg6htg+gXQg7gWg5AJQgkAGgcAQIgJAGQjDs7DjnLQC8l5HOhuQFlhUHVBRQCyAfClAyQCMAqBTAoQDwB2g8BNQgTAYguARIgrAMQFRDxhOCAQgoBAhqAQQBgC0hzBNQhcA+jfgGQifgEjQgnIiwglQBxCpnChfQiNgei1g1IiYgvIgBACQAQCBgUEcQgYFFAGCIQAKECBWCmQBrDLDqBiQAGiqBSh6QCCjDEtglQFCgnCuCgQBVBOAqB3QB1iqArj3QAOhNAEhMIACg8IAMA5QAOBJAIBPQAdD9gdDcQgpEyiWDDQi7DzlcA0QheAPhZAAQj3AAjQhugAFgJGQkCAfhqCfQhKBtABCkQCsA0DrAIQFmAMDSjdQgfiLhYhQQhwhmjGAAQg0AAg5AHg");
	this.shape_6.setTransform(301.2415,166.7561);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DAEEF7").s().p("EgEkAlQQhqgGhzgSQhugShrgdQBhAWB5APQB7APBjACQB6ACBhgOQBvgOBZgmQgHoKAiqRQAfpXBBpJQAikgAsktQAtktA4keIAdiRIAgiSQAWhhALgwIAkiQQBXlIBTjyQhVEng/EYQg9EXg1EvQgoDeg0FsQgjEFglFIQg+JRglJMQgmJ8gJImIAAALIgJADQhjAqh3ALQg9AHhHAAQgsAAgwgDg");
	this.shape_7.setTransform(115.05,782.9243);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#55769F").s().p("AgcLZQh0gPhtgaIhVgYQhnhLhtnrQgiiZgeixIgYiSII8lwILBAAIgKPbIAAHIQi1AyjTAAQiAAAiJgSg");
	this.shape_8.setTransform(68.15,945.5867);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFC0BB").s().p("AihEkQhBjSgNgFQgQgGgbCYQgdCbgNAAQgPABhdllQhMkfgwjSIEkA1QCyAFAGACQAEABBTgGIBUgGIDQg0QEED3gDAVQgEAeg2gJQhHgNjWhTQgPgGgMAKQgNALAEAPQAvDcAeCyQAvEYgZALQgYALhLjbQhNjigXgCQgPgCAFBDQADAjAQB0QAfDggcAIQgeAJg/jGIgsiKQgWhAgIAAQgMgBAJDJQAKDRgOAOIgCABQgQAAg6i7g");
	this.shape_9.setTransform(98.6017,1062.3239);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#446284").s().p("Agqm3Qip5KjG24IJ2K/IBBMoQBGPaAfN3UABjAsagFOAMgUACOgLegFQgySg");
	this.shape_10.setTransform(466.6568,689.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#446284").s().p("EgKUgrrIISs2QEmIeC/TlQCZPsBOWBQA5PwANRXQAHIrgEFig");
	this.shape_11.setTransform(265.663,699.65);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#55769F").s().p("EgAQA2+QhkAAhhgFIhMgEQAojNACmiIgBi2QgHmCghoNQgNjUgTj/Qhl0ljh9mQhGpShKpBIg8nNQKtCSGqWcQFDRCCabWQBLNRAaOOQAOHHgCEdQh9AviuAcQj0Ank8AAIgIAAg");
	this.shape_12.setTransform(510.8325,689.5753);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#55769F").s().p("EAFRA5QQj7gYj5guIjIgqIAAnZQkfBYlqguQhxgPhqgaIhVgXQlHpkgOw6QgMtyDDxwQCUtlDvtcQBZlEBQjxQBIjXAdgvQBYiOMmi0QGUhaGCg9QEnIeC/TmQCZPrBOWCQA5PvANRXQAHIrgEFiQlwCFoEAAQjOAAjmgVg");
	this.shape_13.setTransform(165.8559,706.3133);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#446284").s().p("AALBWQlOiQgRiQQCAArCSBKQEACDCYCdQikgsinhJg");
	this.shape_14.setTransform(869.55,554.65);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#446284").s().p("AEQcHIjYi+MgNSg7sQKuCSGpWcQFERBCabXQkAi4kLjkg");
	this.shape_15.setTransform(505.175,558.95);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#55769F").s().p("AAXejQiZ7XlExCQmg17qZirIAtAKQBlAgB6BIQGFDnHFIjQCyDYDPF5QBHCFEUIkQDOGaCCDKQC5EeCkBjQCIBIB+B/QDvDzAkE4QAjEyigEVQigEWkoCPQlvhmoumUg");
	this.shape_16.setTransform(582.3766,584.6375);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#55769F").s().p("AupW7QiDh6hoi5QjEldA1lxQAmkQCpjnQBfiEB5hhQB7BKB6gUQCDgWCIiDQHbnME+lzQCgi5BAheIAIADIKrGWQlOJlmbJ1Qs1TqmDBRQgtAJgzAAQhhAAh3ghg");
	this.shape_17.setTransform(770.9443,684.081);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#DAEEF7").s().p("EgK1ApdQnkhYiyteQiOqxA7x9QArs1CLvKQAskwAvkZIAojdIFxAAIBFA6QBYBBBfAgQEuBnEBkCIImAAMANTArcMAAAAlmQguAdhbAmQi3BOjiAzQlsBTmVAAQmNAAm1hQg");
	this.shape_18.setTransform(365.1715,611.0753);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#F99893").s().p("AArDJQASgsgNgcQgGgQgOgMIglgeQgigfgZg8QgRgrgLg4QgUhnAJhfIAdBeIAdBcIARAsQAKAZAJASQAYAxAWAUIAqAiQAUAWAKAcQAJAegGAgQgFAdgRAZQgfAtgzAZQgsAVg2ADQBqg0AfhCg");
	this.shape_19.setTransform(338.9621,177.55);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#07085B").s().p("AiZgcQBEgqBNgEQBTgFBCAgQAOAGATAMIAfAVQAdAXAXAcQgOgEgUgHIgigMIhBgSQg2gNhKADQg/AFg/AVQg8AWhCAkQAgg9BHgrg");
	this.shape_20.setTransform(368.325,136.5917);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#07085B").s().p("AjXAmIAWgeQAOgQAMgKQAzg0BSgWQBLgVBNASQBQATAzAwQhPgOg7gBQhDgBg9AQQhGAUgwAfIgOAIIgqAdQgkAegVAOQAPgnASgbg");
	this.shape_21.setTransform(280.875,153.1542);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("AgxBOQgggVgIglQgIglAUggQAVggAlgIQAlgIAgAUQAgAVAJAlQAIAlgVAgQgVAgglAIQgLACgJAAQgaAAgXgOg");
	this.shape_22.setTransform(368.4981,160.725);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("AgxBOQgggVgIglQgIglAUggQAVggAmgIQAkgIAgAVQAhAUAIAmQAIAkgVAgQgVAgglAIQgLADgKAAQgZAAgXgPg");
	this.shape_23.setTransform(289.7481,172.4871);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFC0BB").s().p("ABCTJQixggidhgQichghyiTQh1iWg5i4QgSAXgXAQQhUA7hxggQhwgghLhpQhLhpAHh0QAHh1BUg8QArgeA2gGQA1gGA3ASQgsjbAxjaQAvjTB+iwQB/ixC6hwQDBh0DjgdQFagqEzCvQEzCvCLE/QBUDAAEDPQACBBAEAgQAbESgkDfQgNBhgfBZQgnB3g8BfQgOAVgPATQhnCUiSBjQiXBoi0AmQhkAWhkAAQhUAAhUgPg");
	this.shape_24.setTransform(294.6406,177.5232);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#F99893").s().p("AguDzQhRgPgrhSQgrhTAThjQAThlBHg8QBHg9BPAPQBRARAsBRQArBTgTBkQgTBkhHA9Qg5Awg9AAQgQAAgRgEg");
	this.shape_25.setTransform(417.35,165.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#07085B").s().p("AiFloIDYBGIAzJQIheA7g");
	this.shape_26.setTransform(402.2,137.525);

	this.instance_1 = new lib.Path_29();
	this.instance_1.setTransform(327.85,287.5,1,1,0,0,0,38.1,26.4);
	this.instance_1.alpha = 0.6016;

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFC0BB").s().p("Amgk5IK4jtICMPLItHCCg");
	this.shape_27.setTransform(331.55,316.15);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#333333").s().p("AvHOfIA5gzQFQkwFalMQJAoqF2mjIAKgMQBqh2A/hNIBAhNQAMJigjSPQiVhwi1hGQlViGlgA1QjwAjjWB4QifBaiGCAQhLBKg4BKg");
	this.shape_28.setTransform(471.4782,972.65);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFC0BB").s().p("AhLJPQlOiRgSiQIgBgQQAAiMA4lRQA5lSAAgFQAAgwBwhrIATgSIAaAKQDQBWC9BJQBQAgAFAAQADAAAPBjIA0GSIACAMIAOB3IATChIiuGlQikgsimhJg");
	this.shape_29.setTransform(878.225,504.15);

	this.instance_2 = new lib.step();
	this.instance_2.setTransform(330,1374.55,1,1,0,0,0,254.6,601.4);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#55769F").s().p("ACedPInSmdQjzjWhbhCQgimDAylGQAfjEBZkgQBUkNAPiFQAajdhJj0Qmg17qZirIAtAKQBlAgB6BIQGFDnHFIjQCyDYDPF5QBHCFEUIkQDOGaCCDKQC5EeCkBjQCIBIB+B/QDvDzAkE4QAjEyigEVQigEWkoCPQipgvptofg");
	this.shape_30.setTransform(580.5738,535.9829,1,1,-14.9992);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFC0BB").s().p("AAqFUQgKgGAPgyIAjhqQAtiZhCgTQgDgBhuBxQhtBtgNgPQgOgPBDiIQBDiGgHgEQgIgFiGBiQiGBkgQgLQgSgNBfiEQBjiKgCgJQgBgHgzATIhuAsQifA/gEghQgDgdBohPQBFg0BphCQAWgNAaAAQAaAAAWAOIJ+H0IgxAdIjKiHQivERgiAAIgDgBg");
	this.shape_31.setTransform(530.7943,170.5196);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2,p:{y:1374.55,x:330}},{t:this.shape_29,p:{scaleX:1,scaleY:1,rotation:0,x:878.225,y:504.15}},{t:this.shape_28},{t:this.shape_27,p:{rotation:0,x:331.55,y:316.15}},{t:this.instance_1,p:{rotation:0,x:327.85,y:287.5}},{t:this.shape_26,p:{rotation:0,x:402.2,y:137.525}},{t:this.shape_25,p:{rotation:0,x:417.35,y:165.35}},{t:this.shape_24,p:{rotation:0,x:294.6406,y:177.5232}},{t:this.shape_23,p:{rotation:0,x:289.7481,y:172.4871}},{t:this.shape_22,p:{rotation:0,x:368.4981,y:160.725}},{t:this.shape_21,p:{rotation:0,x:280.875,y:153.1542}},{t:this.shape_20,p:{rotation:0,x:368.325,y:136.5917}},{t:this.shape_19,p:{rotation:0,x:338.9621,y:177.55}},{t:this.shape_18},{t:this.shape_17,p:{regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:770.9443,y:684.081}},{t:this.shape_16,p:{x:582.3766,y:584.6375}},{t:this.shape_15},{t:this.shape_14,p:{scaleX:1,scaleY:1,rotation:0,x:869.55,y:554.65}},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:0,x:301.2415,y:166.7561}},{t:this.shape_5,p:{rotation:0,x:342.075,y:238.036}},{t:this.shape_4,p:{scaleX:1,scaleY:1,rotation:0,x:891.0401,y:463.75}},{t:this.instance,p:{regX:45,regY:67.8,scaleX:1,scaleY:1,rotation:0,x:891.95,y:459.5}},{t:this.shape_3,p:{scaleX:1,scaleY:1,rotation:0,x:915.9047,y:480.754}},{t:this.shape_2,p:{rotation:0,x:209.025,y:130.8}},{t:this.shape_1,p:{rotation:0,x:209.275,y:106.05}},{t:this.shape}]}).to({state:[{t:this.instance_2,p:{y:1361.95,x:330}},{t:this.shape_28},{t:this.shape_27,p:{rotation:0,x:331.55,y:316.15}},{t:this.instance_1,p:{rotation:0,x:327.85,y:287.5}},{t:this.shape_26,p:{rotation:0,x:402.2,y:137.525}},{t:this.shape_25,p:{rotation:0,x:417.35,y:165.35}},{t:this.shape_24,p:{rotation:0,x:294.6406,y:177.5232}},{t:this.shape_23,p:{rotation:0,x:289.7481,y:172.4871}},{t:this.shape_22,p:{rotation:0,x:368.4981,y:160.725}},{t:this.shape_21,p:{rotation:0,x:280.875,y:153.1542}},{t:this.shape_20,p:{rotation:0,x:368.325,y:136.5917}},{t:this.shape_19,p:{rotation:0,x:338.9621,y:177.55}},{t:this.shape_18},{t:this.shape_16,p:{x:580.3266,y:579.5875}},{t:this.shape_15},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:0,x:301.2415,y:166.7561}},{t:this.shape_5,p:{rotation:0,x:342.075,y:238.036}},{t:this.shape_2,p:{rotation:0,x:209.025,y:130.8}},{t:this.shape_1,p:{rotation:0,x:209.275,y:106.05}},{t:this.shape},{t:this.shape_29,p:{scaleX:0.9999,scaleY:0.9999,rotation:-18.4507,x:774.7905,y:451.4259}},{t:this.shape_17,p:{regX:0.3,regY:0.2,scaleX:0.9999,scaleY:0.9999,rotation:-18.4507,x:729.65,y:652.75}},{t:this.shape_14,p:{scaleX:0.9999,scaleY:0.9999,rotation:-18.4507,x:782.5436,y:502.0722}},{t:this.shape_4,p:{scaleX:0.9999,scaleY:0.9999,rotation:-18.451,x:773.4459,y:405.792}},{t:this.instance,p:{regX:45.3,regY:68.2,scaleX:0.9999,scaleY:0.9999,rotation:-18.451,x:773.25,y:401.5}},{t:this.shape_3,p:{scaleX:0.9999,scaleY:0.9999,rotation:-18.4507,x:802.4768,y:413.9597}}]},4).to({state:[{t:this.instance_2,p:{y:1363,x:330}},{t:this.shape_30,p:{rotation:-14.9992,x:580.5738,y:535.9829}},{t:this.shape_28},{t:this.shape_27,p:{rotation:0,x:331.55,y:316.15}},{t:this.instance_1,p:{rotation:0,x:327.85,y:287.5}},{t:this.shape_26,p:{rotation:0,x:402.2,y:137.525}},{t:this.shape_25,p:{rotation:0,x:417.35,y:165.35}},{t:this.shape_24,p:{rotation:0,x:294.6406,y:177.5232}},{t:this.shape_23,p:{rotation:0,x:289.7481,y:172.4871}},{t:this.shape_22,p:{rotation:0,x:368.4981,y:160.725}},{t:this.shape_21,p:{rotation:0,x:280.875,y:153.1542}},{t:this.shape_20,p:{rotation:0,x:368.325,y:136.5917}},{t:this.shape_19,p:{rotation:0,x:338.9621,y:177.55}},{t:this.shape_18},{t:this.shape_15},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:0,x:301.2415,y:166.7561}},{t:this.shape_5,p:{rotation:0,x:342.075,y:238.036}},{t:this.shape_2,p:{rotation:0,x:209.025,y:130.8}},{t:this.shape_1,p:{rotation:0,x:209.275,y:106.05}},{t:this.shape},{t:this.shape_29,p:{scaleX:0.9999,scaleY:0.9999,rotation:-38.6815,x:692.3228,y:371.8861}},{t:this.shape_17,p:{regX:0.2,regY:-0.1,scaleX:0.9999,scaleY:0.9999,rotation:-38.6815,x:719.5,y:576.2}},{t:this.shape_14,p:{scaleX:0.9999,scaleY:0.9999,rotation:-38.6815,x:717.1102,y:416.725}},{t:this.shape_4,p:{scaleX:0.9998,scaleY:0.9998,rotation:-38.6815,x:675.0616,y:329.6569}},{t:this.instance,p:{regX:45,regY:68.6,scaleX:0.9998,scaleY:0.9998,rotation:-38.6815,x:673.25,y:325.6}},{t:this.shape_3,p:{scaleX:0.9999,scaleY:0.9999,rotation:-38.6815,x:705.5129,y:327.1275}}]},5).to({state:[{t:this.instance_2,p:{y:1356,x:313.6}},{t:this.shape_30,p:{rotation:-29.1414,x:569.4521,y:477.7688}},{t:this.shape_28},{t:this.shape_27,p:{rotation:0,x:331.55,y:316.15}},{t:this.instance_1,p:{rotation:0,x:327.85,y:287.5}},{t:this.shape_26,p:{rotation:0,x:402.2,y:137.525}},{t:this.shape_25,p:{rotation:0,x:417.35,y:165.35}},{t:this.shape_24,p:{rotation:0,x:294.6406,y:177.5232}},{t:this.shape_23,p:{rotation:0,x:289.7481,y:172.4871}},{t:this.shape_22,p:{rotation:0,x:368.4981,y:160.725}},{t:this.shape_21,p:{rotation:0,x:280.875,y:153.1542}},{t:this.shape_20,p:{rotation:0,x:368.325,y:136.5917}},{t:this.shape_19,p:{rotation:0,x:338.9621,y:177.55}},{t:this.shape_18},{t:this.shape_15},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6,p:{rotation:0,x:301.2415,y:166.7561}},{t:this.shape_5,p:{rotation:0,x:342.075,y:238.036}},{t:this.shape_2,p:{rotation:0,x:209.025,y:130.8}},{t:this.shape_1,p:{rotation:0,x:209.275,y:106.05}},{t:this.shape},{t:this.shape_29,p:{scaleX:0.9999,scaleY:0.9999,rotation:-52.8251,x:637.5457,y:291.0788}},{t:this.shape_17,p:{regX:0.1,regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:-52.8251,x:713.75,y:482.7}},{t:this.shape_14,p:{scaleX:0.9999,scaleY:0.9999,rotation:-52.8251,x:672.5375,y:328.5008}},{t:this.shape_4,p:{scaleX:0.9998,scaleY:0.9998,rotation:-52.8253,x:610.4028,y:254.2092}},{t:this.instance,p:{regX:45,regY:68.3,scaleX:0.9998,scaleY:0.9998,rotation:-52.8253,x:607.9,y:250.8}},{t:this.shape_3,p:{scaleX:0.9999,scaleY:0.9999,rotation:-52.8251,x:639.2214,y:244.4245}}]},5).to({state:[{t:this.instance_2,p:{y:1363.05,x:340.95}},{t:this.shape_30,p:{rotation:-44.1406,x:523.9759,y:416.7977}},{t:this.shape_28},{t:this.shape_27,p:{rotation:14.9992,x:323.3973,y:312.9461}},{t:this.instance_1,p:{rotation:14.9992,x:327.2,y:284.25}},{t:this.shape_26,p:{rotation:14.9992,x:437.8689,y:158.6919}},{t:this.shape_25,p:{rotation:14.9992,x:445.3015,y:189.4897}},{t:this.shape_18},{t:this.shape_15},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape},{t:this.shape_29,p:{scaleX:0.9999,scaleY:0.9999,rotation:-67.8247,x:541.3457,y:218.7183}},{t:this.shape_14,p:{scaleX:0.9999,scaleY:0.9999,rotation:-67.8247,x:584.8343,y:245.8113}},{t:this.shape_4,p:{scaleX:0.9999,scaleY:0.9999,rotation:-67.825,x:505.7348,y:189.9927}},{t:this.instance,p:{regX:44.9,regY:68.2,scaleX:0.9999,scaleY:0.9999,rotation:-67.825,x:502.3,y:187.45}},{t:this.shape_31},{t:this.shape_17,p:{regX:0.1,regY:0.2,scaleX:0.9999,scaleY:0.9999,rotation:-67.8247,x:664.85,y:384.05}},{t:this.shape_24,p:{rotation:14.9992,x:323.6227,y:169.4904}},{t:this.shape_23,p:{rotation:14.9992,x:320.2002,y:163.3597}},{t:this.shape_22,p:{rotation:14.9992,x:399.3111,y:172.3792}},{t:this.shape_21,p:{rotation:14.9992,x:316.6329,y:142.3892}},{t:this.shape_20,p:{rotation:14.9992,x:405.3897,y:149.0234}},{t:this.shape_19,p:{rotation:14.9992,x:366.4271,y:180.9869}},{t:this.shape_6,p:{rotation:14.9992,x:332.7853,y:160.7985}},{t:this.shape_5,p:{rotation:14.9992,x:353.7799,y:240.2176}},{t:this.shape_2,p:{rotation:14.9992,x:253.0164,y:102.2015}},{t:this.shape_1,p:{rotation:14.9992,x:259.6633,y:78.3595}}]},5).wait(101));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-8.6,943.6,1868.1999999999998);


(lib.kidhand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol3();
	this.instance.setTransform(7.65,8.8,1,1,-53.4837,0,0,10.6,12.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:13.6,regY:12.5,rotation:-57.8446,x:9.2,y:7.2},0).wait(1).to({rotation:-62.2055,x:8.6,y:7.9},0).wait(1).to({rotation:-66.5664,x:8.05,y:8.55},0).wait(1).to({rotation:-70.9273,x:7.5,y:9.3},0).wait(1).to({rotation:-75.2882,x:6.9,y:10},0).wait(1).to({rotation:-79.6491,x:6.35,y:10.75},0).wait(1).to({rotation:-84.01,x:5.75,y:11.5},0).wait(1).to({rotation:-88.3709,x:5.15,y:12.3},0).wait(1).to({rotation:-92.7318,x:4.55,y:13.1},0).wait(1).to({rotation:-88.807,x:5.1,y:12.45},0).wait(1).to({rotation:-84.8822,x:5.6,y:11.8},0).wait(1).to({rotation:-80.9574,x:6.15,y:11.2},0).wait(1).to({rotation:-77.0326,x:6.7,y:10.6},0).wait(1).to({rotation:-73.1077,x:7.2,y:10.05},0).wait(1).to({rotation:-69.1829,x:7.75,y:9.45},0).wait(1).to({rotation:-65.2581,x:8.25,y:8.9},0).wait(1).to({rotation:-61.3333,x:8.7,y:8.3},0).wait(1).to({rotation:-57.4085,x:9.25,y:7.8},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12.3,-8.2,39.1,29.7);


(lib.grandpa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DAEEF7").s().p("AqgdwQicgOiEgaQCLAVCVAHQCWAICMgHQCdgICAgdQCOgfBwg/Qhukqh0lWQhdkSh0mDQg2i0gqiZIgrinQgUhNgWhbQgShNgVhmQhQA5hGApIhsA8IgmARQhEAfhZATQCFgmCfhpQB1hOCQh3QDci5EAkFQDMjPD1kNQD9kZC1jRQi5D5jiEGQhcBsh9CKQhoBwh6B9QiBCBhrBkQiKB9hvBZQgsAig9AsIAuC6QBEEFB6GTQBOD+CGGUQB7F0BnEaIAFAMIgMAHQh2BCidAgQiBAaihAGIg/ABQhkAAiAgKg");
	this.shape.setTransform(162.55,564.3563);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#02CCC0").s().p("EgA7AqCQkCgEjogiQlksIihpWQibo/AInYQAHmzCUmcQB+lcEJmsQGUqNLImEQDfh5DjhQQBygoBFgQICFZnI0AXcMAKMAg8Qh7CGnNAAIg+gBg");
	this.shape_1.setTransform(121.4804,485.5547);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFC0BB").s().p("AhzGsQhojfgRgEQgRgDgICtQgICvgPADQgOACgKgKQgQgSgcg/QhBiVizoNIgJgxIABAAIGditIEli5IgBgDQH4FjABAeQgBAjg9gCQhRgEj7g8QgRgEgMANQgMANAFARQBYDyA8C9QBfEvgbARQgZAQh1jpQh4jvgaAAQgRABAQBKQAIAoAkB9QBFD0geANQghAPhljTIhFiSQghhDgJAAQgOABApDeQAqDmgNASQAAABAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQgTAAhbjFg");
	this.shape_2.setTransform(136.9,780.8738);

	this.instance = new lib.CompoundPath();
	this.instance.setTransform(279.85,648.95,1,1,0,0,0,213.4,121.5);
	this.instance.alpha = 0.3008;

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#55769F").s().p("AhCCAIiPh8IDVihIDOCYIhtB6QghAlgxADIgIABQgrAAgigeg");
	this.shape_3.setTransform(341.175,268.1629);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#DAEEF7").s().p("AmSDgQgMgYlIjhIDAjLIBwA2QCNA9CMAkQG/BzEUiyICxBzIjgDKQjkASjkAPQkvAThqAAQg1AAgDgFg");
	this.shape_4.setTransform(332.975,219.0278);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#02CCC0").s().p("EgErAv7QrLgrq2iPQiagfhoh1Qhoh1gOicIhUvAQgTj3gJk6QgTp1AvlUQAai3BfkjQA+i9CGlkQCTmEAyiRQBfkWAZifQAwktHPmbQDnjODeiSIBvDHQCLDyCMDaQHCK4EtC+QAkgSA7guQB1hbBviPQFjnHCfsYIAmAgQAwAqAzA1QCjCoCDDNQGjKThAMXIhYQlQg7K3geG0QhZUMBAESQAkCXktB1QknByoQAwQk5AdlXAAQkIAAkbgRg");
	this.shape_5.setTransform(286.7219,524.8124);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#05AD99").s().p("AF1QfQhGgnh2giQiagsgigNQhngohGhBQhWhQg5iGQg1h/hEhvQgjg3hOhtQg/hZgbg1QgohNgPhYQgdisgpiFQgQg0hHi/QgqhxgyikIgpiNIEiAAIBKCfQBeDDBkC0QFBJBEBDVQBoh7CDjjQEInHCMoHIDKAAIAAWGIg+CCQhNCahOB5QjLFAiKAAQgfAAgbgPg");
	this.shape_6.setTransform(328.575,323.454);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#446284").s().p("AkVA4IDkpiIB9AAIDKKUIjsHBg");
	this.shape_7.setTransform(341.725,331.225);

	this.instance_1 = new lib.Path_8_1();
	this.instance_1.setTransform(342.1,302.7,1,1,0,0,0,46.6,50.3);
	this.instance_1.compositeOperation = "multiply";

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DAEEF7").s().p("AljJKQi7i5islhQh7j7hnk3IhPkFIe6AAIA9GRIgpCfQg5DBhVCnQkPIYm8BXQgqAIgqAAQjHAAjCi+g");
	this.shape_8.setTransform(331.6,294.0886);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#05AD99").s().p("EgFhAquQimlNgNhIQgMhHhQ/wIhP/hIi+zsIAsAOQA3AUA+AhQDCBrCtDAQImJoB3TeQCQXaCJMFQCKMJCrEAIgCALQgEAPgLASQgiA4hUBAQkQDMqkDLQhRiYhTimg");
	this.shape_9.setTransform(516.9,521.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFC0BB").s().p("Ah0GsQhnjggRgDQgSgEgHCtQgICwgOADQgPACgKgKQgQgSgcg/QhCiViyoOIgJgwIABAAIGditIEli5IgCgDQH6FkAAAdQgCAjg8gDQhRgDj6g9QgSgEgMAOQgNANAHARQBYD4A6C3QBfEwgaAQQgaAQh0jpQh4jwgZABQgSAAAQBKQAIAoAkB+QBFD1geANQghAOhljTIhFiTQghhDgJABQgOABApDeQApDmgLASQgBABAAAAQAAAAgBAAQAAABAAAAQgBAAAAAAQgTAAhcjFg");
	this.shape_10.setTransform(572.25,841.5736);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#55769F").s().p("EggOAadQhjjqhlkiIhRj0IN6lUMgC5gpDICZBFQDABRDDA3QBElYAPAAILChbQKzhZAuAHQAvAHOrC9IOiC9Ii/DHQjwD0j6DZQseK4pJCwQgfNYkmJ1QjtH4mJFQQkZDwlLCEQimBDhuASQgVALgXAAQiuAAkZqXg");
	this.shape_11.setTransform(248.975,995.7945);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#446284").s().p("AizdyQrCg+qehSIRCuEMABHgsVIA5AcQBLAiBTAhQEJBqD+A1QMvCqGLmgQAaSRhPXJQgnLmgsH7QhQAsk/AAQmVAAsVhGg");
	this.shape_12.setTransform(326.2376,989.0082);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#DAEEF7").s().p("AkUGzQi6gdiDhWQh1hKgmhlQgth1BohGQBUg6CGgjQC6gyEDAAQFyAAAQiEQAIhBhChCIA8APQBGAXAzAkQClBzhSDNIBDgJQBKgPAkgXIAUgUIgLBIQgXBXg7BJQi9DrndAKQk1AGi/g0QBeAoCxAdQCoAdB6AAQBgAFAmAEQgbAGhqAQQhRAKhPAAQhdAAhZgOg");
	this.shape_13.setTransform(382.7455,-87.7332);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F99893").s().p("AA6ENQAYg7gSgmQgJgUgSgRIgxgnQgbgagVgiQgQgagQglQgYg/gNhFQgaiLALh/IAnB+QAXBKARAxIAWA7QANAjAMAWQAgBBAeAdQAvAkAKAKQAbAcAMAmQANAogIAsQgHAngXAhQgoA9hFAgQg8AchIAEQCNhDArhbg");
	this.shape_14.setTransform(412.7761,50.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F99893").s().p("ACtgNQhbgihTgCQhXgChXAhQhPAehNA7QAmglAlgaQAggVArgUQApgTAvgKQAtgJAwABQBdADBWAnQBZAmBAA9QhMg2hTgeg");
	this.shape_15.setTransform(395.925,118.645);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#DAEEF7").s().p("Ap7KeQjritiFkvQhfjXgjkEQgLhRgEhMIgBg8Qgwj8BohhQAogmAxACQAvACAbAjQAUAZAMCNQASDPALBGQA9FyDcgSQBygJEWhBQEfg1ELAcQBVAJCsAjQCZAfBHADQBvAFBHgpQBTgxAyh4IAGAyQAGA/gBBEQgDDZhEC1QhfD+jTCRQkHC2mvABIgEAAQmwAAkljWg");
	this.shape_16.setTransform(373.7023,110.7952);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#DAEEF7").s().p("AEBBMIgkgTQgTgIgRgIIgRgIIgSgHQg4gYhXgKQhEgHhOANQhGALhVAcQAxhBBXglQBUgkBZAJQBjALBEAyQAVAOANAMIAeAdQAaAfAXAoIgmgTg");
	this.shape_17.setTransform(445.2,1.834);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#DAEEF7").s().p("Aj2AYIAfgdQALgLAYgPQBCgyBkgLQBagJBTAkQBYAlAwBBQhWgchFgLQhOgNhEAHQhWAKg5AYIgSAHIgRAIQgRAJgTAHQgvAagbAMQAWgnAaggg");
	this.shape_18.setTransform(343.425,1.834);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AhGBPQghgegCgsQgCgrAdggQAdghAsgCQArgCAhAdQAhAdACAsQACArgdAhQgeAhgsACIgFAAQgoAAgegbg");
	this.shape_19.setTransform(442.0033,41.6033);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AhGBPQghgegCgsQgCgrAdggQAeghAsgCQArgCAgAdQAhAdACAsQADArgeAhQgdAhgtACIgGAAQgnAAgegbg");
	this.shape_20.setTransform(362.1784,41.5033);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFC0BB").s().p("AiOVYQjEhGigiKQigiKhmi7QhpjAgejbQgYAWgdAOQhrA0h5g5Qh5g6hCiFQhBiFAeiDQAdiCBrg0QA2gaA/ADQA9ADA7AfQgJkCBgjuQBdjmCwivQCxixDnhdQDxhgEHAKQGQAQE7EAQE7EABiGEQA7DoghDsQgJBBgDAtQgUE9hTD2QhvFikbDaQkRDSlUASIg5ABQi6AAiug+g");
	this.shape_21.setTransform(354.1346,50.1964);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#F99893").s().p("ACpG4QjigYjHhyQi/huiJiyQAaibAVinIAQiJIC8A1QDgBCC0BAQJDDNhIBvQg3BXg4EhQhdAQhcAAQg4AAg5gGg");
	this.shape_22.setTransform(339.3985,177.968);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFC0BB").s().p("AliK4QiDhKhzhyIhZhjQBsipBdocQAdipAYi7IATiYIC8A1QDgBBC0BAQJCDOhIBwQhIBwhHG/QgkDggVDJQjZCFjZAAQjIAAjKhxg");
	this.shape_23.setTransform(328.9235,214.3159);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F99893").s().p("AhhELQhZgggihmQgihlAphuQAphuBbg3QBbg3BYAgQBZAgAiBmQAiBlgpBuQgpBuhbA3Qg6Ajg4AAQghAAgggMg");
	this.shape_24.setTransform(496.5302,55.9466);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#07085B").s().p("AivNWQgmgFgagWQgdgZgEglIit2XQgEgmAbgfQAcgeArgFIK+hVQiDE0BkESQAyCJBMBMInsNWQgTAiglAQQgaAMgcAAIgTgCg");
	this.shape_25.setTransform(44.9184,1186.0625);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#07085B").s().p("AiTJvQg5gMgEg7IhIwxQgCgdATgVQATgWAcgCIHJgeQhdDfA5DRQAdBpAvA7IlXJmQgXApgpAAQgKAAgLgDg");
	this.shape_26.setTransform(191.0905,1151.606);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance_1},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-132.6,632.8,1404.1999999999998);


(lib.flyingBF = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol7();
	this.instance.setTransform(20.1,21.8,1,1,0,0,0,20.1,21.8);

	this.instance_1 = new lib.Symbol9();
	this.instance_1.setTransform(25.5,18.5,1,1,0,0,0,20.7,16.8);

	this.instance_2 = new lib.Symbol10();
	this.instance_2.setTransform(21.7,23.45,1,1,0,0,0,16.9,15.6);

	this.instance_3 = new lib.Symbol11();
	this.instance_3.setTransform(21.7,19.4,1,1,0,0,0,16.9,12.8);

	this.instance_4 = new lib.Symbol12();
	this.instance_4.setTransform(21.7,19.95,1,1,0,0,0,16.9,12.1);

	this.instance_5 = new lib.Symbol13();
	this.instance_5.setTransform(21.7,18.5,1,1,0,0,0,16.9,16.8);

	this.instance_6 = new lib.Symbol8();
	this.instance_6.setTransform(21.7,19.4,1,1,0,0,0,16.9,12.8);

	this.instance_7 = new lib.Symbol14();
	this.instance_7.setTransform(20.1,21.8,1,1,0,0,0,20.1,21.8);

	this.instance_8 = new lib.Symbol15();
	this.instance_8.setTransform(21.7,18.5,1,1,0,0,0,16.9,16.8);

	this.instance_9 = new lib.Symbol16();
	this.instance_9.setTransform(21.7,19.95,1,1,0,0,0,16.9,12.1);

	this.instance_10 = new lib.Symbol17();
	this.instance_10.setTransform(21.7,19.4,1,1,0,0,0,16.9,12.8);

	this.instance_11 = new lib.Symbol18();
	this.instance_11.setTransform(21.7,19.95,1,1,0,0,0,16.9,12.1);

	this.instance_12 = new lib.Symbol19();
	this.instance_12.setTransform(21.7,18.5,1,1,0,0,0,16.9,16.8);

	this.instance_13 = new lib.Symbol20();
	this.instance_13.setTransform(21.7,19.4,1,1,0,0,0,16.9,12.8);

	this.instance_14 = new lib.Symbol21();
	this.instance_14.setTransform(20.1,21.8,1,1,0,0,0,20.1,21.8);

	this.instance_15 = new lib.Symbol22();
	this.instance_15.setTransform(21.7,18.5,1,1,0,0,0,16.9,16.8);

	this.instance_16 = new lib.Symbol6();
	this.instance_16.setTransform(21.7,19.95,1,1,0,0,0,16.9,12.1);

	this.instance_17 = new lib.Symbol23();
	this.instance_17.setTransform(21.7,19.4,1,1,0,0,0,16.9,12.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},2).to({state:[{t:this.instance_2}]},12).to({state:[{t:this.instance_3}]},7).to({state:[{t:this.instance_4}]},7).to({state:[{t:this.instance_5}]},6).to({state:[{t:this.instance_6}]},7).to({state:[{t:this.instance_7}]},8).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_9}]},9).to({state:[{t:this.instance_10}]},7).to({state:[{t:this.instance_11}]},7).to({state:[{t:this.instance_12}]},6).to({state:[{t:this.instance_13}]},7).to({state:[{t:this.instance_14}]},13).to({state:[{t:this.instance_15}]},2).to({state:[{t:this.instance_16}]},9).to({state:[{t:this.instance_17}]},7).wait(5));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,40.2,43.7);


(lib.Group_111 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_14();
	this.instance.setTransform(279.85,195.15,1,1,0,0,0,14.8,21.4);
	this.instance.alpha = 0.1992;

	this.instance_1 = new lib.Path_1_9();
	this.instance_1.setTransform(10.9,157.15,1,1,0,0,0,10.9,22.9);
	this.instance_1.alpha = 0.1992;

	this.instance_2 = new lib.Path_2_7();
	this.instance_2.setTransform(79.15,34.05,1,1,0,0,0,35.6,14.3);
	this.instance_2.alpha = 0.1992;

	this.instance_3 = new lib.Path_3_8();
	this.instance_3.setTransform(29.8,100.2,1,1,0,0,0,16.1,18.7);
	this.instance_3.alpha = 0.1992;

	this.instance_4 = new lib.Path_4_9();
	this.instance_4.setTransform(199.15,21.6,1,1,0,0,0,26.4,21.6);
	this.instance_4.alpha = 0.1992;

	this.instance_5 = new lib.Path_5_6();
	this.instance_5.setTransform(240,29.9,1,1,0,0,0,28.3,22.9);
	this.instance_5.alpha = 0.1992;

	this.instance_6 = new lib.Path_6_6();
	this.instance_6.setTransform(286.05,87.15,1,1,0,0,0,24.2,20.1);
	this.instance_6.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_111, new cjs.Rectangle(0,0,310.2,216.7), null);


(lib.Group_110 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_13();
	this.instance.setTransform(23.65,152,1,1,0,0,0,11.5,16.7);
	this.instance.alpha = 0.1992;

	this.instance_1 = new lib.Path_1_8();
	this.instance_1.setTransform(233,122.45,1,1,0,0,0,8.5,17.9);
	this.instance_1.alpha = 0.1992;

	this.instance_2 = new lib.Path_2_6();
	this.instance_2.setTransform(179.9,26.5,1,1,0,0,0,27.7,11.1);
	this.instance_2.alpha = 0.1992;

	this.instance_3 = new lib.Path_3_7();
	this.instance_3.setTransform(218.35,78.1,1,1,0,0,0,12.6,14.6);
	this.instance_3.alpha = 0.1992;

	this.instance_4 = new lib.Path_4_8();
	this.instance_4.setTransform(86.5,16.8,1,1,0,0,0,20.6,16.8);
	this.instance_4.alpha = 0.1992;

	this.instance_5 = new lib.Path_5_5();
	this.instance_5.setTransform(54.7,23.25,1,1,0,0,0,22.1,17.8);
	this.instance_5.alpha = 0.1992;

	this.instance_6 = new lib.Path_6_5();
	this.instance_6.setTransform(18.9,67.8,1,1,0,0,0,18.9,15.6);
	this.instance_6.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_110, new cjs.Rectangle(0,0,241.5,168.8), null);


(lib.Group_109 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_12();
	this.instance.setTransform(12.9,82.6,1,1,0,0,0,6.3,9.1);
	this.instance.alpha = 0.1992;

	this.instance_1 = new lib.Path_1_7();
	this.instance_1.setTransform(126.55,66.5,1,1,0,0,0,4.6,9.7);
	this.instance_1.alpha = 0.1992;

	this.instance_2 = new lib.Path_2_5();
	this.instance_2.setTransform(97.75,14.35,1,1,0,0,0,15.1,6);
	this.instance_2.alpha = 0.1992;

	this.instance_3 = new lib.Path_3_6();
	this.instance_3.setTransform(118.6,42.35,1,1,0,0,0,6.8,7.9);
	this.instance_3.alpha = 0.1992;

	this.instance_4 = new lib.Path_4_7();
	this.instance_4.setTransform(47,9.1,1,1,0,0,0,11.2,9.1);
	this.instance_4.alpha = 0.1992;

	this.instance_5 = new lib.Path_5_4();
	this.instance_5.setTransform(29.7,12.65,1,1,0,0,0,12,9.7);
	this.instance_5.alpha = 0.1992;

	this.instance_6 = new lib.Path_6_4();
	this.instance_6.setTransform(10.2,36.75,1,1,0,0,0,10.2,8.4);
	this.instance_6.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_109, new cjs.Rectangle(0,0,131.2,91.7), null);


(lib.Group_106 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_9();
	this.instance.setTransform(32.65,22.8,1,1,0,0,0,1.7,2.5);
	this.instance.alpha = 0.1992;

	this.instance_1 = new lib.Path_1_4();
	this.instance_1.setTransform(1.3,18.3,1,1,0,0,0,1.3,2.6);
	this.instance_1.alpha = 0.1992;

	this.instance_2 = new lib.Path_2_2();
	this.instance_2.setTransform(9.3,4,1,1,0,0,0,4.2,1.7);
	this.instance_2.alpha = 0.1992;

	this.instance_3 = new lib.Path_3_3();
	this.instance_3.setTransform(3.5,11.7,1,1,0,0,0,1.9,2.2);
	this.instance_3.alpha = 0.1992;

	this.instance_4 = new lib.Path_4_4();
	this.instance_4.setTransform(23.3,2.5,1,1,0,0,0,3.1,2.5);
	this.instance_4.alpha = 0.1992;

	this.instance_5 = new lib.Path_5_1();
	this.instance_5.setTransform(28.05,3.4,1,1,0,0,0,3.3,2.6);
	this.instance_5.alpha = 0.1992;

	this.instance_6 = new lib.Path_6_1();
	this.instance_6.setTransform(33.4,10.15,1,1,0,0,0,2.8,2.3);
	this.instance_6.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_106, new cjs.Rectangle(0,0,36.3,25.3), null);


(lib.Group_105 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Path_7();
	this.instance.setTransform(32.65,22.75,1,1,0,0,0,1.7,2.5);
	this.instance.alpha = 0.1992;

	this.instance_1 = new lib.Path_1_3();
	this.instance_1.setTransform(1.3,18.25,1,1,0,0,0,1.3,2.6);
	this.instance_1.alpha = 0.1992;

	this.instance_2 = new lib.Path_2_1();
	this.instance_2.setTransform(9.3,4,1,1,0,0,0,4.2,1.7);
	this.instance_2.alpha = 0.1992;

	this.instance_3 = new lib.Path_3_2();
	this.instance_3.setTransform(3.5,11.6,1,1,0,0,0,1.9,2.1);
	this.instance_3.alpha = 0.1992;

	this.instance_4 = new lib.Path_4_3();
	this.instance_4.setTransform(23.3,2.5,1,1,0,0,0,3.1,2.5);
	this.instance_4.alpha = 0.1992;

	this.instance_5 = new lib.Path_5_0();
	this.instance_5.setTransform(28.05,3.4,1,1,0,0,0,3.3,2.6);
	this.instance_5.alpha = 0.1992;

	this.instance_6 = new lib.Path_6_0();
	this.instance_6.setTransform(33.4,10.2,1,1,0,0,0,2.8,2.4);
	this.instance_6.alpha = 0.1992;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_105, new cjs.Rectangle(0,0,36.3,25.3), null);


(lib.drop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol28();
	this.instance.setTransform(15.7,28.6,0.3963,0.3963,0,0,0,15.9,29.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:15.4,regY:28.1,scaleX:0.3964,scaleY:0.3964,x:8.8,y:39.55},0).wait(1).to({x:2.2,y:50.95},0).wait(1).to({x:-4.45,y:62.3},0).wait(1).to({x:-11.1,y:73.7},0).wait(1).to({x:-17.75,y:85.1},0).wait(1).to({x:-24.4,y:96.45},0).wait(1).to({x:-31.1,y:107.85},0).wait(1).to({x:-37.75,y:119.25},0).wait(1).to({x:-44.4,y:130.6},0).wait(1).to({x:-51.05,y:142},0).wait(1).to({x:-57.7,y:153.35},0).wait(1).to({x:-64.35,y:164.75},0).wait(1).to({x:-71.05,y:176.15},0).wait(1).to({x:-77.7,y:187.5},0).wait(1).to({x:-84.35,y:198.9},0).wait(1).to({x:-91,y:210.3},0).wait(1).to({x:-97.65,y:221.65},0).wait(1).to({x:-104.3,y:233.05},0).wait(1).to({x:-111,y:244.4},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-118,16.9,139.9,239.70000000000002);


(lib.cloud = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol1();
	this.instance.setTransform(80,29.1,1,1,0,0,0,80,29.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({x:73.15},0).wait(1).to({x:66.25},0).wait(1).to({x:59.4},0).wait(1).to({x:52.5},0).wait(1).to({x:45.6},0).wait(1).to({x:38.75},0).wait(1).to({x:31.85},0).wait(1).to({x:25},0).wait(1).to({x:18.1},0).wait(1).to({x:11.2},0).wait(1).to({x:4.35},0).wait(1).to({x:-2.55},0).wait(1).to({x:-9.45},0).wait(1).to({x:-16.3},0).wait(1).to({x:-23.2},0).wait(1).to({x:-30.05},0).wait(1).to({x:-36.95},0).wait(1).to({x:-43.85},0).wait(1).to({x:-50.7},0).wait(1).to({x:-57.6},0).wait(1).to({x:-64.5},0).wait(1).to({x:-71.35},0).wait(1).to({x:-78.25},0).wait(1).to({x:-85.1},0).wait(1).to({x:-92},0).wait(1).to({x:-98.9},0).wait(1).to({x:-105.75},0).wait(1).to({x:-112.65},0).wait(1).to({x:-119.5},0).wait(1).to({x:-126.4},0).wait(1).to({x:-133.3},0).wait(1).to({x:-140.15},0).wait(1).to({x:-147.05},0).wait(1).to({x:-153.95},0).wait(1).to({x:-160.8},0).wait(1).to({x:-167.7},0).wait(1).to({x:-174.55},0).wait(1).to({x:-181.45},0).wait(1).to({x:-188.35},0).wait(1).to({x:-195.2},0).wait(1).to({x:-202.1},0).wait(1).to({x:-209},0).wait(1).to({x:-215.85},0).wait(1).to({x:-222.75},0).wait(1).to({x:-229.6},0).wait(1).to({x:-236.5},0).wait(1).to({x:-243.4},0).wait(1).to({x:-250.25},0).wait(1).to({x:-257.15},0).wait(1).to({x:-264},0).wait(1).to({x:-270.9},0).wait(1).to({x:-277.8},0).wait(1).to({x:-284.65},0).wait(1).to({x:-291.55},0).wait(1).to({x:-298.45},0).wait(1).to({x:-305.3},0).wait(1).to({x:-312.2},0).wait(1).to({x:-319.05},0).wait(1).to({x:-325.95},0).wait(1).to({x:-332.85},0).wait(1).to({x:-339.7},0).wait(1).to({x:-346.6},0).wait(1).to({x:-353.5},0).wait(1).to({x:-360.35},0).wait(1).to({x:-367.25},0).wait(1).to({x:-374.1},0).wait(1).to({x:-381},0).wait(1).to({x:-387.9},0).wait(1).to({x:-394.75},0).wait(1).to({x:-401.65},0).wait(1).to({x:-408.5},0).wait(1).to({x:-415.4},0).wait(1).to({x:-422.3},0).wait(1).to({x:-429.15},0).wait(1).to({x:-436.05},0).wait(1).to({x:-442.95},0).wait(1).to({x:-449.8},0).wait(1).to({x:-456.7},0).wait(1).to({x:-463.55},0).wait(1).to({x:-470.45},0).wait(1).to({x:-477.35},0).wait(1).to({x:-484.2},0).wait(1).to({x:-491.1},0).wait(1).to({x:-498},0).wait(1).to({x:-504.85},0).wait(1).to({x:-511.75},0).wait(1).to({x:-518.6},0).wait(1).to({x:-525.5},0).wait(1).to({x:-532.4},0).wait(1).to({x:-539.25},0).wait(1).to({x:-546.15},0).wait(1).to({x:-553},0).wait(1).to({x:-559.9},0).wait(1).to({x:-566.8},0).wait(1).to({x:-573.65},0).wait(1).to({x:-580.55},0).wait(1).to({x:-587.45},0).wait(1).to({x:-594.3},0).wait(1).to({x:-601.2},0).wait(1).to({x:-608.05},0).wait(1).to({x:-614.95},0).wait(1).to({x:-621.85},0).wait(1).to({x:-628.7},0).wait(1).to({x:-635.6},0).wait(1).to({x:-642.5},0).wait(1).to({x:-649.35},0).wait(1).to({x:-656.25},0).wait(1).to({x:-663.1},0).wait(1).to({x:-670},0).wait(1).to({x:-676.9},0).wait(1).to({x:-683.75},0).wait(1).to({x:-690.65},0).wait(1).to({x:-697.5},0).wait(1).to({x:-704.4},0).wait(1).to({x:-711.3},0).wait(1).to({x:-718.15},0).wait(1).to({x:-725.05},0).wait(1).to({x:-731.95},0).wait(1).to({x:-738.8},0).wait(1).to({x:-745.7},0).wait(1).to({x:-752.55},0).wait(1).to({x:-759.45},0).wait(1).to({x:-766.35},0).wait(1).to({x:-773.2},0).wait(1).to({x:-780.1},0).wait(1).to({x:-787},0).wait(1).to({x:-793.85},0).wait(1).to({x:-800.75},0).wait(1).to({x:-807.6},0).wait(1).to({x:-814.5},0).wait(1).to({x:-821.4},0).wait(1).to({x:-828.25},0).wait(1).to({x:-835.15},0).wait(1).to({x:-842},0).wait(1).to({x:-848.9},0).wait(1).to({x:-855.8},0).wait(1).to({x:-862.65},0).wait(1).to({x:-869.55},0).wait(1).to({x:-876.45},0).wait(1).to({x:-883.3},0).wait(1).to({x:-890.2},0).wait(1).to({x:-897.05},0).wait(1).to({x:-903.95},0).wait(1).to({x:-910.85},0).wait(1).to({x:-917.7},0).wait(1).to({x:-924.6},0).wait(1).to({x:-931.5},0).wait(1).to({x:-928.4},0).wait(1).to({x:-925.3},0).wait(1).to({x:-922.2},0).wait(1).to({x:-919.1},0).wait(1).to({x:-916},0).wait(1).to({x:-912.9},0).wait(1).to({x:-909.8},0).wait(1).to({x:-906.7},0).wait(1).to({x:-903.6},0).wait(1).to({x:-900.5},0).wait(1).to({x:-897.4},0).wait(1).to({x:-894.3},0).wait(1).to({x:-891.2},0).wait(1).to({x:-888.1},0).wait(1).to({x:-885},0).wait(1).to({x:-881.9},0).wait(1).to({x:-878.8},0).wait(1).to({x:-875.7},0).wait(1).to({x:-872.6},0).wait(1).to({x:-869.5},0).wait(1).to({x:-866.4},0).wait(1).to({x:-863.3},0).wait(1).to({x:-860.2},0).wait(1).to({x:-857.1},0).wait(1).to({x:-854},0).wait(1).to({x:-850.9},0).wait(1).to({x:-847.8},0).wait(1).to({x:-844.7},0).wait(1).to({x:-841.6},0).wait(1).to({x:-838.5},0).wait(1).to({x:-835.4},0).wait(1).to({x:-832.3},0).wait(1).to({x:-829.2},0).wait(1).to({x:-826.15},0).wait(1).to({x:-823.05},0).wait(1).to({x:-819.95},0).wait(1).to({x:-816.85},0).wait(1).to({x:-813.75},0).wait(1).to({x:-810.65},0).wait(1).to({x:-807.55},0).wait(1).to({x:-804.45},0).wait(1).to({x:-801.35},0).wait(1).to({x:-798.25},0).wait(1).to({x:-795.15},0).wait(1).to({x:-792.05},0).wait(1).to({x:-788.95},0).wait(1).to({x:-785.85},0).wait(1).to({x:-782.75},0).wait(1).to({x:-779.65},0).wait(1).to({x:-776.55},0).wait(1).to({x:-773.45},0).wait(1).to({x:-770.35},0).wait(1).to({x:-767.25},0).wait(1).to({x:-764.15},0).wait(1).to({x:-761.05},0).wait(1).to({x:-757.95},0).wait(1).to({x:-754.85},0).wait(1).to({x:-751.75},0).wait(1).to({x:-748.65},0).wait(1).to({x:-745.55},0).wait(1).to({x:-742.45},0).wait(1).to({x:-739.35},0).wait(1).to({x:-736.25},0).wait(1).to({x:-733.15},0).wait(1).to({x:-730.05},0).wait(1).to({x:-726.95},0).wait(1).to({x:-723.9},0).wait(1).to({x:-720.8},0).wait(1).to({x:-717.7},0).wait(1).to({x:-714.6},0).wait(1).to({x:-711.5},0).wait(1).to({x:-708.4},0).wait(1).to({x:-705.3},0).wait(1).to({x:-702.2},0).wait(1).to({x:-699.1},0).wait(1).to({x:-696},0).wait(1).to({x:-692.9},0).wait(1).to({x:-689.8},0).wait(1).to({x:-686.7},0).wait(1).to({x:-683.6},0).wait(1).to({x:-680.5},0).wait(1).to({x:-677.4},0).wait(1).to({x:-674.3},0).wait(1).to({x:-671.2},0).wait(1).to({x:-668.1},0).wait(1).to({x:-665},0).wait(1).to({x:-661.9},0).wait(1).to({x:-658.8},0).wait(1).to({x:-655.7},0).wait(1).to({x:-652.6},0).wait(1).to({x:-649.5},0).wait(1).to({x:-646.4},0).wait(1).to({x:-643.3},0).wait(1).to({x:-640.2},0).wait(1).to({x:-637.1},0).wait(1).to({x:-634},0).wait(1).to({x:-630.9},0).wait(1).to({x:-627.8},0).wait(1).to({x:-624.7},0).wait(1).to({x:-621.65},0).wait(1).to({x:-618.55},0).wait(1).to({x:-615.45},0).wait(1).to({x:-612.35},0).wait(1).to({x:-609.25},0).wait(1).to({x:-606.15},0).wait(1).to({x:-603.05},0).wait(1).to({x:-599.95},0).wait(1).to({x:-596.85},0).wait(1).to({x:-593.75},0).wait(1).to({x:-590.65},0).wait(1).to({x:-587.55},0).wait(1).to({x:-584.45},0).wait(1).to({x:-581.35},0).wait(1).to({x:-578.25},0).wait(1).to({x:-575.15},0).wait(1).to({x:-572.05},0).wait(1).to({x:-568.95},0).wait(1).to({x:-565.85},0).wait(1).to({x:-562.75},0).wait(1).to({x:-559.65},0).wait(1).to({x:-556.55},0).wait(1).to({x:-553.45},0).wait(1).to({x:-550.35},0).wait(1).to({x:-547.25},0).wait(1).to({x:-544.15},0).wait(1).to({x:-541.05},0).wait(1).to({x:-537.95},0).wait(1).to({x:-534.85},0).wait(1).to({x:-531.75},0).wait(1).to({x:-528.65},0).wait(1).to({x:-525.55},0).wait(1).to({x:-522.45},0).wait(1).to({x:-519.4},0).wait(1).to({x:-516.3},0).wait(1).to({x:-513.2},0).wait(1).to({x:-510.1},0).wait(1).to({x:-507},0).wait(1).to({x:-503.9},0).wait(1).to({x:-500.8},0).wait(1).to({x:-497.7},0).wait(1).to({x:-494.6},0).wait(1).to({x:-491.5},0).wait(1).to({x:-488.4},0).wait(1).to({x:-485.3},0).wait(1).to({x:-482.2},0).wait(1).to({x:-479.1},0).wait(1).to({x:-476},0).wait(1).to({x:-472.9},0).wait(1).to({x:-469.8},0).wait(1).to({x:-466.7},0).wait(1).to({x:-463.6},0).wait(1).to({x:-460.5},0).wait(1).to({x:-457.4},0).wait(1).to({x:-454.3},0).wait(1).to({x:-451.2},0).wait(1).to({x:-448.1},0).wait(1).to({x:-445},0).wait(1).to({x:-441.9},0).wait(1).to({x:-438.8},0).wait(1).to({x:-435.7},0).wait(1).to({x:-432.6},0).wait(1).to({x:-429.5},0).wait(1).to({x:-426.4},0).wait(1).to({x:-423.3},0).wait(1).to({x:-420.2},0).wait(1).to({x:-417.15},0).wait(1).to({x:-414.05},0).wait(1).to({x:-410.95},0).wait(1).to({x:-407.85},0).wait(1).to({x:-404.75},0).wait(1).to({x:-401.65},0).wait(1).to({x:-398.55},0).wait(1).to({x:-395.45},0).wait(1).to({x:-392.35},0).wait(1).to({x:-389.25},0).wait(1).to({x:-386.15},0).wait(1).to({x:-383.05},0).wait(1).to({x:-379.95},0).wait(1).to({x:-376.85},0).wait(1).to({x:-373.75},0).wait(1).to({x:-370.65},0).wait(1).to({x:-367.55},0).wait(1).to({x:-364.45},0).wait(1).to({x:-361.35},0).wait(1).to({x:-358.25},0).wait(1).to({x:-355.15},0).wait(1).to({x:-352.05},0).wait(1).to({x:-348.95},0).wait(1).to({x:-345.85},0).wait(1).to({x:-342.75},0).wait(1).to({x:-339.65},0).wait(1).to({x:-336.55},0).wait(1).to({x:-333.45},0).wait(1).to({x:-330.35},0).wait(1).to({x:-327.25},0).wait(1).to({x:-324.15},0).wait(1).to({x:-321.05},0).wait(1).to({x:-317.95},0).wait(1).to({x:-314.9},0).wait(1).to({x:-311.8},0).wait(1).to({x:-308.7},0).wait(1).to({x:-305.6},0).wait(1).to({x:-302.5},0).wait(1).to({x:-299.4},0).wait(1).to({x:-296.3},0).wait(1).to({x:-293.2},0).wait(1).to({x:-290.1},0).wait(1).to({x:-287},0).wait(1).to({x:-283.9},0).wait(1).to({x:-280.8},0).wait(1).to({x:-277.7},0).wait(1).to({x:-274.6},0).wait(1).to({x:-271.5},0).wait(1).to({x:-268.4},0).wait(1).to({x:-265.3},0).wait(1).to({x:-262.2},0).wait(1).to({x:-259.1},0).wait(1).to({x:-256},0).wait(1).to({x:-252.9},0).wait(1).to({x:-249.8},0).wait(1).to({x:-246.7},0).wait(1).to({x:-243.6},0).wait(1).to({x:-240.5},0).wait(1).to({x:-237.4},0).wait(1).to({x:-234.3},0).wait(1).to({x:-231.2},0).wait(1).to({x:-228.1},0).wait(1).to({x:-225},0).wait(1).to({x:-221.9},0).wait(1).to({x:-218.8},0).wait(1).to({x:-215.7},0).wait(1).to({x:-212.65},0).wait(1).to({x:-209.55},0).wait(1).to({x:-206.45},0).wait(1).to({x:-203.35},0).wait(1).to({x:-200.25},0).wait(1).to({x:-197.15},0).wait(1).to({x:-194.05},0).wait(1).to({x:-190.95},0).wait(1).to({x:-187.85},0).wait(1).to({x:-184.75},0).wait(1).to({x:-181.65},0).wait(1).to({x:-178.55},0).wait(1).to({x:-175.45},0).wait(1).to({x:-172.35},0).wait(1).to({x:-169.25},0).wait(1).to({x:-166.15},0).wait(1).to({x:-163.05},0).wait(1).to({x:-159.95},0).wait(1).to({x:-156.85},0).wait(1).to({x:-153.75},0).wait(1).to({x:-150.65},0).wait(1).to({x:-147.55},0).wait(1).to({x:-144.45},0).wait(1).to({x:-141.35},0).wait(1).to({x:-138.25},0).wait(1).to({x:-135.15},0).wait(1).to({x:-132.05},0).wait(1).to({x:-128.95},0).wait(1).to({x:-125.85},0).wait(1).to({x:-122.75},0).wait(1).to({x:-119.65},0).wait(1).to({x:-116.55},0).wait(1).to({x:-113.45},0).wait(1).to({x:-110.4},0).wait(1).to({x:-107.3},0).wait(1).to({x:-104.2},0).wait(1).to({x:-101.1},0).wait(1).to({x:-98},0).wait(1).to({x:-94.9},0).wait(1).to({x:-91.8},0).wait(1).to({x:-88.7},0).wait(1).to({x:-85.6},0).wait(1).to({x:-82.5},0).wait(1).to({x:-79.4},0).wait(1).to({x:-76.3},0).wait(1).to({x:-73.2},0).wait(1).to({x:-70.1},0).wait(1).to({x:-67},0).wait(1).to({x:-63.9},0).wait(1).to({x:-60.8},0).wait(1).to({x:-57.7},0).wait(1).to({x:-54.6},0).wait(1).to({x:-51.5},0).wait(1).to({x:-48.4},0).wait(1).to({x:-45.3},0).wait(1).to({x:-42.2},0).wait(1).to({x:-39.1},0).wait(1).to({x:-36},0).wait(1).to({x:-32.9},0).wait(1).to({x:-29.8},0).wait(1).to({x:-26.7},0).wait(1).to({x:-23.6},0).wait(1).to({x:-20.5},0).wait(1).to({x:-17.4},0).wait(1).to({x:-14.3},0).wait(1).to({x:-11.2},0).wait(1).to({x:-8.15},0).wait(1).to({x:-5.05},0).wait(1).to({x:-1.95},0).wait(1).to({x:1.15},0).wait(1).to({x:4.25},0).wait(1).to({x:7.35},0).wait(1).to({x:10.45},0).wait(1).to({x:13.55},0).wait(1).to({x:16.65},0).wait(1).to({x:19.75},0).wait(1).to({x:22.85},0).wait(1).to({x:25.95},0).wait(1).to({x:29.05},0).wait(1).to({x:32.15},0).wait(1).to({x:35.25},0).wait(1).to({x:38.35},0).wait(1).to({x:41.45},0).wait(1).to({x:44.55},0).wait(1).to({x:47.65},0).wait(1).to({x:50.75},0).wait(1).to({x:53.85},0).wait(1).to({x:56.95},0).wait(1).to({x:60.05},0).wait(1).to({x:63.15},0).wait(1).to({x:66.25},0).wait(1).to({x:69.35},0).wait(1).to({x:72.45},0).wait(1).to({x:75.55},0).wait(1).to({x:78.65},0).wait(1).to({x:81.7},0).wait(1).to({x:84.8},0).wait(1).to({x:87.9},0).wait(1).to({x:91},0).wait(1).to({x:94.1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1011.5,0,1185.7,58.2);


(lib.butterfly = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.flyingBF();
	this.instance.setTransform(30,149.05,1,1,0,0,0,20.1,21.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:9.9998,x:20.05,y:126.05},0).wait(1).to({rotation:19.9996,x:10.2,y:103.1},0).wait(1).to({rotation:29.9994,x:0.25,y:80.15},0).wait(1).to({rotation:39.9992,x:-9.65,y:57.15},0).wait(1).to({rotation:49.999,x:-19.65,y:34.2},0).wait(1).to({rotation:59.9988,x:-29.55,y:11.25},0).wait(1).to({rotation:69.9986,x:-39.45,y:-11.7},0).wait(1).to({rotation:79.9984,x:-49.35,y:-34.65},0).wait(1).to({rotation:89.9982,x:-59.35,y:-57.65},0).wait(1).to({rotation:94.9983,x:-51.75,y:-61.05},0).wait(1).to({rotation:99.9983,x:-44.2,y:-64.4},0).wait(1).to({rotation:104.9984,x:-36.65,y:-67.8},0).wait(1).to({rotation:109.9984,x:-29.05,y:-71.1},0).wait(1).to({rotation:114.9985,x:-21.55,y:-74.5},0).wait(1).to({rotation:119.9985,x:-14,y:-77.9},0).wait(1).to({rotation:124.9986,x:-6.45,y:-81.25},0).wait(1).to({rotation:129.9986,x:1.15,y:-84.6},0).wait(1).to({rotation:134.9987,x:8.7,y:-88},0).wait(1).to({rotation:139.9987,x:16.25,y:-91.4},0).wait(1).to({rotation:144.9988,x:23.85,y:-94.75},0).wait(1).to({rotation:149.9988,x:31.4,y:-98.15},0).wait(1).to({rotation:154.9989,x:39,y:-101.5},0).wait(1).to({rotation:159.9989,x:46.5,y:-104.95},0).wait(1).to({rotation:164.999,x:54.1,y:-108.25},0).wait(1).to({rotation:136.499,x:65.45,y:-103.65},0).wait(1).to({rotation:107.999,x:76.9,y:-99.1},0).wait(1).to({rotation:79.499,x:88.3,y:-94.45},0).wait(1).to({rotation:50.999,x:99.7,y:-89.85},0).wait(1).to({rotation:22.499,x:111.1,y:-85.2},0).wait(1).to({rotation:-6.001,x:122.55,y:-80.55},0).wait(1).to({rotation:-34.501,x:133.95,y:-76},0).wait(1).to({rotation:-63.001,x:145.3,y:-71.35},0).wait(1).to({rotation:-91.501,x:156.75,y:-66.75},0).wait(1).to({rotation:-120.001,x:168.2,y:-62.1},0).wait(1).to({rotation:-102.001,x:175.05,y:-67.25},0).wait(1).to({rotation:-84.001,x:182.05,y:-72.35},0).wait(1).to({rotation:-66.001,x:188.9,y:-77.5},0).wait(1).to({rotation:-48.001,x:195.85,y:-82.65},0).wait(1).to({rotation:-30.001,x:202.8,y:-87.75},0).wait(1).to({rotation:-12.001,x:209.7,y:-92.95},0).wait(1).to({rotation:5.999,x:216.65,y:-98},0).wait(1).to({rotation:23.999,x:223.55,y:-103.2},0).wait(1).to({rotation:41.999,x:230.5,y:-108.3},0).wait(1).to({rotation:59.999,x:237.4,y:-113.45},0).wait(1).to({rotation:77.999,x:244.4,y:-118.55},0).wait(1).to({rotation:95.999,x:251.25,y:-123.7},0).wait(1).to({rotation:113.999,x:258.2,y:-128.8},0).wait(1).to({rotation:131.999,x:265.1,y:-133.95},0).wait(1).to({rotation:149.999,x:272.05,y:-139.1},0).wait(1).to({rotation:144.7491,x:264.35,y:-144.85},0).wait(1).to({rotation:139.4991,x:256.65,y:-150.65},0).wait(1).to({rotation:134.2491,x:248.95,y:-156.35},0).wait(1).to({rotation:128.9992,x:241.25,y:-162.15},0).wait(1).to({rotation:123.7493,x:233.55,y:-167.95},0).wait(1).to({rotation:118.4993,x:225.85,y:-173.7},0).wait(1).to({rotation:113.2494,x:218.15,y:-179.5},0).wait(1).to({rotation:107.9994,x:210.5,y:-185.25},0).wait(1).to({rotation:102.7495,x:202.8,y:-191},0).wait(1).to({rotation:97.4995,x:195.15,y:-196.75},0).wait(1).to({rotation:92.2496,x:187.4,y:-202.5},0).wait(1).to({rotation:86.9996,x:179.75,y:-208.35},0).wait(1).to({rotation:81.7497,x:172.05,y:-214.05},0).wait(1).to({rotation:76.4997,x:164.35,y:-219.85},0).wait(1).to({rotation:71.2498,x:156.6,y:-225.6},0).wait(1).to({rotation:65.9998,x:149,y:-231.4},0).wait(1).to({rotation:60.7499,x:141.25,y:-237.15},0).wait(1).to({rotation:55.4999,x:133.6,y:-242.95},0).wait(1).to({rotation:50.25,x:125.9,y:-248.7},0).wait(1).to({rotation:45,x:118.2,y:-254.5},0).wait(1).to({rotation:54,x:110.85,y:-264.35},0).wait(1).to({rotation:63,x:103.55,y:-274.2},0).wait(1).to({rotation:72,x:96.25,y:-284.1},0).wait(1).to({rotation:81,x:88.95,y:-293.95},0).wait(1).to({rotation:90,x:81.65,y:-303.85},0).wait(1).to({rotation:99,x:74.3,y:-313.7},0).wait(1).to({rotation:108,x:67.05,y:-323.6},0).wait(1).to({rotation:117,x:59.8,y:-333.45},0).wait(1).to({rotation:126,x:52.45,y:-343.3},0).wait(1).to({rotation:135,x:45.15,y:-353.15},0).wait(1).to({rotation:105,x:65.9,y:-372.05},0).wait(1).to({rotation:75,x:86.65,y:-390.9},0).wait(1).to({rotation:45,x:107.4,y:-409.75},0).wait(1).to({rotation:15,x:128.15,y:-428.6},0).wait(1).to({rotation:-15,x:148.95,y:-447.45},0).wait(1).to({rotation:-45,x:169.7,y:-466.3},0).wait(1).to({rotation:-75,x:190.45,y:-485.1},0).wait(1).to({rotation:-105,x:211.25,y:-503.95},0).wait(1).to({rotation:-135,x:232,y:-522.8},0).wait(1).to({rotation:-165,x:252.8,y:-541.65},0).wait(31));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.2,-562.7,377.2,733.6);


(lib.yellowleaf = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol25();
	this.instance.setTransform(23.6,21.65,1,1,0,0,0,23.4,21.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:21.6,scaleX:0.9984,scaleY:0.9984,rotation:5.4545,x:23.55,y:23.6},0).wait(1).to({scaleX:0.9968,scaleY:0.9968,rotation:10.909,y:25.4},0).wait(1).to({scaleX:0.9952,scaleY:0.9952,rotation:16.3635,x:23.5,y:27.2},0).wait(1).to({scaleX:0.9936,scaleY:0.9936,rotation:21.818,x:23.45,y:28.85},0).wait(1).to({scaleX:0.992,scaleY:0.992,rotation:27.2725,x:23.5,y:30.65},0).wait(1).to({scaleX:0.9904,scaleY:0.9904,rotation:32.727,x:23.45,y:32.4},0).wait(1).to({scaleX:0.9888,scaleY:0.9888,rotation:38.1815,y:34.15},0).wait(1).to({scaleX:0.9871,scaleY:0.9871,rotation:43.636,x:23.4,y:35.9},0).wait(1).to({scaleX:0.9856,scaleY:0.9856,rotation:49.0905,x:23.35,y:37.7},0).wait(1).to({scaleX:0.984,scaleY:0.984,rotation:54.545,y:39.4},0).wait(1).to({scaleX:0.9823,scaleY:0.9823,rotation:59.9995,x:23.3,y:41.1},0).wait(1).to({scaleX:0.9807,scaleY:0.9807,rotation:65.9995,x:23.35,y:42.7},0).wait(1).to({scaleX:0.9791,scaleY:0.9791,rotation:71.9994,y:44.3},0).wait(1).to({scaleX:0.9775,scaleY:0.9775,rotation:77.9994,x:23.3,y:45.85},0).wait(1).to({scaleX:0.9759,scaleY:0.9759,rotation:83.9993,y:47.4},0).wait(1).to({scaleX:0.9743,scaleY:0.9743,rotation:89.9993,y:49},0).wait(1).to({scaleX:0.9727,scaleY:0.9727,rotation:95.9992,x:23.25,y:50.6},0).wait(1).to({scaleX:0.9711,scaleY:0.9711,rotation:101.9992,x:23.3,y:52.2},0).wait(1).to({scaleX:0.9695,scaleY:0.9695,rotation:107.9991,y:53.75},0).wait(1).to({scaleX:0.9679,scaleY:0.9679,rotation:113.9991,y:55.3},0).wait(1).to({scaleX:0.9663,scaleY:0.9663,rotation:119.999,x:23.25,y:56.85},0).wait(1).to({scaleX:0.9647,scaleY:0.9647,rotation:123.2132,x:23.3,y:58.5},0).wait(1).to({scaleX:0.9631,scaleY:0.9631,rotation:126.4274,x:23.25,y:60.1},0).wait(1).to({scaleX:0.9615,scaleY:0.9615,rotation:129.6416,x:23.3,y:61.7},0).wait(1).to({scaleX:0.9599,scaleY:0.9599,rotation:132.8559,y:63.3},0).wait(1).to({scaleX:0.9583,scaleY:0.9583,rotation:136.0701,x:23.35,y:64.95},0).wait(1).to({scaleX:0.9567,scaleY:0.9567,rotation:139.2843,y:66.6},0).wait(1).to({scaleX:0.9551,scaleY:0.9551,rotation:142.4985,y:68.2},0).wait(1).to({scaleX:0.9535,scaleY:0.9535,rotation:145.7127,y:69.8},0).wait(1).to({scaleX:0.9518,scaleY:0.9518,rotation:148.9269,y:71.45},0).wait(1).to({scaleX:0.9502,scaleY:0.9502,rotation:152.1411,y:73.05},0).wait(1).to({scaleX:0.9486,scaleY:0.9486,rotation:155.3554,y:74.7},0).wait(1).to({scaleX:0.947,scaleY:0.947,rotation:158.5696,x:23.4,y:76.3},0).wait(1).to({scaleX:0.9454,scaleY:0.9454,rotation:161.7838,y:77.9},0).wait(1).to({scaleX:0.9438,scaleY:0.9438,rotation:164.998,y:79.5},0).wait(1).to({scaleX:0.9422,scaleY:0.9422,rotation:202.497,x:23.6,y:81.7},0).wait(1).to({scaleX:0.9406,scaleY:0.9406,rotation:203.0739,x:23.55,y:83.9},0).wait(1).to({scaleX:0.939,scaleY:0.939,rotation:203.6508,y:86.1},0).wait(1).to({scaleX:0.9374,scaleY:0.9374,rotation:204.2278,y:88.35},0).wait(1).to({scaleX:0.9358,scaleY:0.9358,rotation:204.8047,x:23.6,y:90.5},0).wait(1).to({scaleX:0.9342,scaleY:0.9342,rotation:205.3816,y:92.7},0).wait(1).to({scaleX:0.9326,scaleY:0.9326,rotation:205.9585,y:94.95},0).wait(1).to({scaleX:0.931,scaleY:0.931,rotation:206.5355,y:97.1},0).wait(1).to({scaleX:0.9294,scaleY:0.9294,rotation:207.1124,y:99.35},0).wait(1).to({scaleX:0.9278,scaleY:0.9278,rotation:207.6893,y:101.5},0).wait(1).to({scaleX:0.9262,scaleY:0.9262,rotation:208.2662,x:23.55,y:103.75},0).wait(1).to({scaleX:0.9246,scaleY:0.9246,rotation:208.8432,x:23.6,y:105.9},0).wait(1).to({scaleX:0.9229,scaleY:0.9229,rotation:209.4201,y:108.15},0).wait(1).to({scaleX:0.9213,scaleY:0.9213,rotation:209.997,y:110.3},0).wait(1).to({scaleX:0.9197,scaleY:0.9197,rotation:213.997,x:23.45,y:113},0).wait(1).to({scaleX:0.9181,scaleY:0.9181,rotation:217.9971,x:23.3,y:115.6},0).wait(1).to({scaleX:0.9165,scaleY:0.9165,rotation:221.9971,x:23.2,y:118.35},0).wait(1).to({scaleX:0.9149,scaleY:0.9149,rotation:225.9971,x:23.1,y:121},0).wait(1).to({scaleX:0.9133,scaleY:0.9133,rotation:229.9971,x:22.9,y:123.7},0).wait(1).to({scaleX:0.9117,scaleY:0.9117,rotation:233.9972,x:22.8,y:126.35},0).wait(1).to({scaleX:0.9101,scaleY:0.9101,rotation:237.9972,x:22.65,y:129.05},0).wait(1).to({scaleX:0.9085,scaleY:0.9085,rotation:241.9972,x:22.55,y:131.75},0).wait(1).to({scaleX:0.9069,scaleY:0.9069,rotation:245.9972,x:22.4,y:134.4},0).wait(1).to({scaleX:0.9053,scaleY:0.9053,rotation:249.9973,x:22.25,y:137.05},0).wait(1).to({scaleX:0.9037,scaleY:0.9037,rotation:253.9973,x:22.1,y:139.7},0).wait(1).to({scaleX:0.9021,scaleY:0.9021,rotation:257.9973,x:21.95,y:142.4},0).wait(1).to({scaleX:0.9005,scaleY:0.9005,rotation:261.9973,x:21.8,y:145.1},0).wait(1).to({scaleX:0.8989,scaleY:0.8989,rotation:265.9974,x:21.7,y:147.75},0).wait(1).to({scaleX:0.8973,scaleY:0.8973,rotation:269.9974,x:21.55,y:150.45},0).wait(1).to({scaleX:0.8957,scaleY:0.8957,rotation:272.9974,y:152.85},0).wait(1).to({scaleX:0.8941,scaleY:0.8941,rotation:275.9973,y:155.35},0).wait(1).to({scaleX:0.8925,scaleY:0.8925,rotation:278.9973,x:21.6,y:157.75},0).wait(1).to({scaleX:0.8909,scaleY:0.8909,rotation:281.9973,y:160.25},0).wait(1).to({scaleX:0.8892,scaleY:0.8892,rotation:284.9972,y:162.65},0).wait(1).to({scaleX:0.8876,scaleY:0.8876,rotation:287.9972,y:165.1},0).wait(1).to({scaleX:0.886,scaleY:0.886,rotation:290.9972,y:167.55},0).wait(1).to({scaleX:0.8844,scaleY:0.8844,rotation:293.9971,y:170},0).wait(1).to({scaleX:0.8828,scaleY:0.8828,rotation:296.9971,y:172.45},0).wait(1).to({scaleX:0.8812,scaleY:0.8812,rotation:299.9971,y:174.9},0).wait(1).to({scaleX:0.8796,scaleY:0.8796,rotation:302.997,y:177.35},0).wait(1).to({scaleX:0.878,scaleY:0.878,rotation:305.997,y:179.8},0).wait(1).to({scaleX:0.8764,scaleY:0.8764,rotation:308.997,x:21.55,y:182.2},0).wait(1).to({scaleX:0.8748,scaleY:0.8748,rotation:311.9969,x:21.6,y:184.7},0).wait(1).to({scaleX:0.8732,scaleY:0.8732,rotation:314.9969,y:187.15},0).wait(1).to({scaleX:0.8716,scaleY:0.8716,rotation:318.9968,x:21.55,y:189.55},0).wait(1).to({scaleX:0.87,scaleY:0.87,rotation:322.9967,x:21.5,y:192},0).wait(1).to({scaleX:0.8684,scaleY:0.8684,rotation:326.9967,y:194.5},0).wait(1).to({scaleX:0.8668,scaleY:0.8668,rotation:330.9966,x:21.55,y:196.85},0).wait(1).to({scaleX:0.8652,scaleY:0.8652,rotation:334.9965,x:21.5,y:199.35},0).wait(1).to({scaleX:0.8636,scaleY:0.8636,rotation:338.9964,y:201.75},0).wait(1).to({scaleX:0.862,scaleY:0.862,rotation:342.9963,y:204.2},0).wait(1).to({scaleX:0.8604,scaleY:0.8604,rotation:346.9963,x:21.45,y:206.65},0).wait(1).to({scaleX:0.8588,scaleY:0.8588,rotation:350.9962,y:209.1},0).wait(1).to({scaleX:0.8572,scaleY:0.8572,rotation:354.9961,y:211.55},0).wait(1).to({scaleX:0.8555,scaleY:0.8555,rotation:358.996,x:21.35,y:214},0).wait(1).to({scaleX:0.854,scaleY:0.854,rotation:362.9959,y:216.4},0).wait(1).to({scaleX:0.8523,scaleY:0.8523,rotation:366.9959,y:218.85},0).wait(1).to({scaleX:0.8507,scaleY:0.8507,rotation:370.9958,y:221.3},0).wait(1).to({scaleX:0.8491,scaleY:0.8491,rotation:374.9957,x:21.3,y:223.7},0).wait(1).to({scaleX:0.8475,scaleY:0.8475,rotation:378.9957,y:224.6},0).wait(1).to({scaleX:0.8459,scaleY:0.8459,rotation:382.9957,x:21.25,y:225.55},0).wait(1).to({scaleX:0.8443,scaleY:0.8443,rotation:386.9956,y:226.45},0).wait(1).to({scaleX:0.8427,scaleY:0.8427,rotation:390.9956,y:227.35},0).wait(1).to({scaleX:0.8411,scaleY:0.8411,rotation:394.9956,y:228.3},0).wait(1).to({scaleX:0.8395,scaleY:0.8395,rotation:398.9956,x:21.2,y:229.15},0).wait(1).to({scaleX:0.8379,scaleY:0.8379,rotation:402.9956,y:230.05},0).wait(1).to({scaleX:0.8363,scaleY:0.8363,rotation:406.9955,y:230.95},0).wait(1).to({scaleX:0.8347,scaleY:0.8347,rotation:410.9955,y:231.9},0).wait(1).to({scaleX:0.8331,scaleY:0.8331,rotation:414.9955,y:232.75},0).wait(1).to({scaleX:0.8315,scaleY:0.8315,rotation:418.9955,x:21.15,y:233.7},0).wait(1).to({scaleX:0.8299,scaleY:0.8299,rotation:422.9955,y:234.6},0).wait(1).to({scaleX:0.8283,scaleY:0.8283,rotation:426.9954,y:235.5},0).wait(1).to({scaleX:0.8266,scaleY:0.8266,rotation:430.9954,y:236.35},0).wait(1).to({scaleX:0.825,scaleY:0.825,rotation:434.9954,y:237.25},0).wait(1).to({scaleX:0.8234,scaleY:0.8234,rotation:437.9953,x:21.1,y:238.2},0).wait(1).to({scaleX:0.8218,scaleY:0.8218,rotation:440.9951,y:239.1},0).wait(1).to({scaleX:0.8202,scaleY:0.8202,rotation:443.995,x:21.15,y:240},0).wait(1).to({scaleX:0.8186,scaleY:0.8186,rotation:446.9948,y:240.9},0).wait(1).to({scaleX:0.817,scaleY:0.817,rotation:449.9947,x:21.1,y:241.75},0).wait(1).to({scaleX:0.8154,scaleY:0.8154,rotation:452.9946,y:242.7},0).wait(1).to({scaleX:0.8138,scaleY:0.8138,rotation:455.9944,y:243.6},0).wait(1).to({scaleX:0.8122,scaleY:0.8122,rotation:458.9943,y:244.45},0).wait(1).to({scaleX:0.8106,scaleY:0.8106,rotation:461.9941,y:245.35},0).wait(1).to({scaleX:0.809,scaleY:0.809,rotation:464.994,y:246.3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8,-0.1,62.9,269.20000000000005);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F99893").s().p("AACALIABgEIgDgDIgDgEIgCgGIAAgLIAFAPIACADQADADABACQABADgCAEQgEAFgGAAQAFgCACgFg");
	this.shape.setTransform(39.0198,15.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAFQgHgFgDgGIA1gCQgBAHgIAEQgHAFgKABIgBAAQgJAAgHgEg");
	this.shape_1.setTransform(38.5,19.4775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#07085B").s().p("AhPBBQgFgQgCgTQgDglARgOQgUABgBgEQgBgEAIgDQAJgDANACIgGgPQgFgOAFgCQAFgCAHAMIAGANIATgKQAagJAhACQAmACAQAVQAMAPADAjIgDAxQgPgPgSgpQgfAjgOgEQgIgDAGgNIAHgNIgjAbQgoAbgXAAIAAAAg");
	this.shape_2.setTransform(37.4944,6.4867);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#07085B").s().p("AAKABIgKgBQgFgBgEABIgKADQACgDAHgDQAGgDAFABQAHABAEADQAEABAEAGg");
	this.shape_3.setTransform(41.6,12.9208);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#07085B").s().p("AgLgBQAFgEAGAAQAFgBAFACQAGACAEAEIgLgCIgJAAIgJABIgKAFQACgFAGgCg");
	this.shape_4.setTransform(34.65,12.9607);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AgEAGQgCgCAAgDQAAgGAGgBQAHAAAAAGQAAAHgHAAIAAAAQAAAAgBAAQgBAAAAAAQAAAAgBgBQAAAAgBAAg");
	this.shape_5.setTransform(41.375,14.78);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgGAAQAAgGAGAAQADgBACADQACACAAACQABAGgHABQgGAAgBgHg");
	this.shape_6.setTransform(35.1309,14.7208);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#DAEEF7").s().p("AgFAAQABgFAEABQAGgBgBAFQABAFgGAAQgEAAgBgFg");
	this.shape_7.setTransform(43.8,34.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DAEEF7").s().p("AgFAAQABgFAEABQAGgBgBAFQABAFgGAAQgEAAgBgFg");
	this.shape_8.setTransform(32.2,34.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F4A640").s().p("AgCAXQgRAAgNgLQgMgMAAgRIAAgGIBZAAIAAAGQAAARgNAMQgMALgRAAg");
	this.shape_9.setTransform(38.025,40.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#DAEEF7").s().p("AgFAJIADAAIADAAIACgBIABAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQgDgBgCgDIgCgCIgBgGIgBgDIACAGIADAEIAEAEIAGACIACAAIgCABIgDACIgDAAQgDAAgDgBg");
	this.shape_10.setTransform(47.85,33.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#DAEEF7").s().p("AAAAKIgDgBIgFgCIACAAIAGgCIAEgEIAEgHIABgDIAAADIgBADIgCADIAAABIgBABIgFAEIgDACIAAAAIAGABIADAAIgFABIgBAAg");
	this.shape_11.setTransform(28.375,33.3563);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F4A640").s().p("AAAA4QgDAAgDgDQgDgCAAgEIAAheQAAgDADgCQADgDADAAIABAAQADAAADADQADACAAADIAABeQAAAEgDACQgCADgEAAg");
	this.shape_12.setTransform(43.775,30.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F4A640").s().p("AAAA4QgDAAgDgCQgDgDAAgEIAAhdQAAgEADgCQADgDADAAIABAAQADAAADADQADACAAAEIAABdQAAAEgDADQgCACgEAAg");
	this.shape_13.setTransform(32.175,30.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FEB546").s().p("AAXBaIiIgTQAOABAKgLQAJgMAFiMIA0ACQA6ABAjgDIADA4QAFA8AHAaQAEAQARADIAIABIgYAVg");
	this.shape_14.setTransform(38.275,42.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FF5B7E").s().p("AgMCPIhigFIAFifIhGgrQAOgWAIgfIAFgaIA6AZQAVAIAWACIAfASQAlAMAdgeQASgBAVgIIA8gaIAEAcQAGAfARAUIhFAqIAJCeQgUAIhDAAIgpgBg");
	this.shape_15.setTransform(38.025,36.2022);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFC0BB").s().p("AgTAIIgjgTIBtABQgYAWgbAAQgLAAgMgEg");
	this.shape_16.setTransform(38.125,26.496);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFC0BB").s().p("AAABiQgcABgWgUQgWgUgEgeIgEADQgHADgJgDQgHgEgFgJQgEgKABgJQADgHAGgEQAIgEAJAEQgBgkAZgaQAagZAjABQAkgBAaAZQAZAagBAkQAJgEAHAEQAHAEACAHQADAJgFAKQgEAJgJAEQgJAEgGgEIgEgDQgEAegWAUQgVATgdAAIgBAAg");
	this.shape_17.setTransform(38.05,14.1237);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F99893").s().p("AgXAJIAAgYIAvAAIAAAdQgKACgKAAQgPAAgMgHg");
	this.shape_18.setTransform(38.225,23.1841);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFC0BB").s().p("AgXAYIAAgvIAvAAIAAAvg");
	this.shape_19.setTransform(38.225,24.05);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#07085B").s().p("AgoAUQgFAAAAgFIAAgiQAQAIAQgDQAHgCAFgDIAtAcQAEACgCAFQgBAEgFAAg");
	this.shape_20.setTransform(56.1955,80.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#02CCC0").s().p("AgGAmIgYhKIAPABQASAAASgKIAKBCIgaAYg");
	this.shape_21.setTransform(52.825,76.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#07085B").s().p("AgoAUQgFAAAAgFIAAgiQAQAIAQgDQAHgCAFgDIAtAcQAEACgCAFQgBAEgFAAg");
	this.shape_22.setTransform(35.1455,80.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FF5B7E").s().p("AgWAQIgFg2QAYABAfgDIgIBCIgdAPg");
	this.shape_23.setTransform(32.8,76.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FEB546").s().p("AhzA7QgBgLgJgYQgJgXAAgLIgBg4IDjAAIAsBuQgdALgUAAIgdgDIg8g7IgdAMIAUA6QgXAEgWAAQggAAgbgIg");
	this.shape_24.setTransform(40.475,56.53);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFC0BB").s().p("AgYBaIgRjMIBTAHIgYDOIgcAQg");
	this.shape_25.setTransform(32.975,69.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFC0BB").s().p("AALBjIg8i7IBMgSIgEAYIAaCkIgaAZg");
	this.shape_26.setTransform(51,70.125);

	this.instance = new lib.kidhand();
	this.instance.setTransform(59.2,19,1,1,0,0,180,9.7,6.6);

	this.instance_1 = new lib.kidhand();
	this.instance_1.setTransform(17.1,19.2,1,1,0,0,0,9.7,6.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,76.3,82.3), null);


(lib.Scene_1_story = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// story
	this.instance = new lib.swinggg();
	this.instance.setTransform(390.55,392.95,1,1,0,0,0,136,96);

	this.instance_1 = new lib.Mesh_138();
	this.instance_1.setTransform(370,129);

	this.instance_2 = new lib.Mesh_1();
	this.instance_2.setTransform(506,296);

	this.instance_3 = new lib.Mesh_5();
	this.instance_3.setTransform(475,296);

	this.instance_4 = new lib.Mesh_17();
	this.instance_4.setTransform(286,306);

	this.instance_5 = new lib.cloud();
	this.instance_5.setTransform(-52,47.8,0.7277,0.7277,0,0,180);

	this.instance_6 = new lib.Group_111();
	this.instance_6.setTransform(191.3,205.6,1,1,0,0,0,155.1,108.4);
	this.instance_6.alpha = 0.6016;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#619700").s().p("AxNTvQhhhgAAiIQAAhTAnhIQgnhIAAhTQAAgVAEgVIgcABQhbAAhNguQhLgtgrhNQgrhLAAhWQAAhhA1hSQAzhPBVgnIAMgGQgwhAgMhTQgEgbAAgUQAAh+BVhfQBUhdB9gNIAhgCQgqg7gNhIQgCgsACgtIADgqQAIgjAPghQAphUBPg0QBRg0BhAAQBmAABVA6QAchFA9gqQA+grBNgBQAjh2BjhLQBkhLB/gBQB4AABhBHQA8ArApA/QAMgCANAAQAzAAAxAWQAtATAjAlIACACQAkglAugbQBYgyBlAAQCdAABuBvQBvBtgBCdQAAAogIAoQgKAsgUArQgNAbgTAaIgFAHIAKgBQAagDAUAAQCsABB+BzQB9B0APCqQACAQAAAWQAABsgxBeQgwBbhTA9QA1BEAABWQAAA/gfA4QgkBDhDAjQA9BfAABwQgBA9gTA7QgmB0hkBKQhkBKh/AAQghAAgfgGQgkAogvAWQgzAXg2AAQhAAAg2geQg2gcgjgzIgMABQgtAAgkgZQgkgZgPgoQgvA8hDAiQhFAjhOAAQg/AAg6gWQg3gXgugpQgSAjghAUQgiAVgoAAQgtAAglgaQgLA6gtAnQgvAng8gBQg7ABgvgmQgtBDhHAnQhKAohTgBQiIABhhhhg");
	this.shape.setTransform(191.4,226.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCFCFC").s().p("AgDAIQAAgkAHgkIgDApQgBAtABArQgEgdAAgcg");
	this.shape_1.setTransform(76.975,158.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#619700").s().p("AAmDPQgpAig0AAQg4AAgqgmQgogkgHg3IgNAAQgwAAgigiQgjgiABgvQgBgwAjgiQAigjAwAAQAcAAAbAOIAAgBQAAgwAhgiQAjgiAwAAQAmAAAeAXQAQgWAZgNQAZgNAcAAQAwAAAjAjQAhAiABAwQgBAVgHAUQAtAWAcArQAdArgBA0QAABKg0A0Qg0A1hKAAQhAAAgygqg");
	this.shape_2.setTransform(243.05,389.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#815719").s().p("AnkKQQBmgaBOgcQB2gpAbgXQAoghAlhsQAohygPiGQgDgVgiiYQgLgyhThuIhRhkIlyiMIAygoICBAxQCFAuARgFQARgEgng8Igqg5IA6guQDOFhAIAJQATATAEACQATANATgJQATgKAEjwIAAjwICeAiIgFBoQgDBpALAHQALAJBmg0QBjgyAKgQQAIgNgMhKIgOhIIAngNIAIBBQAJBDALAIQAKAHBCglIBAgmIAhA2IiOBUQiaBfg+AzQh/BqABCcQAACKACAqQAFB1ARAEQARAEB0hMIBvhMIAVAXIhtBcQhwBhgKARQgWAjAVBBQAcBZBpAyQBmAwCFAbQBCAMAuAEIy6AVg");
	this.shape_3.setTransform(187.525,397.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#624213").s().p("Aj2A9IADg8IHUkfIAnAvIipBjQixBrgrAmQhCA9gjBQQgWA3gPBWIARjig");
	this.shape_4.setTransform(223.15,367.825);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#477831").s().p("AhfBfQgngnAAg4QAAg3AngnQAogoA3AAQA4AAAoAoQAnAnAAA3QAAA4gnAnQgoAog4AAQg3AAgogog");
	this.shape_5.setTransform(83.35,179.35);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#477831").s().p("AhfBfQgngnAAg4QAAg3AngnQAogoA3AAQA4AAAnAoQAoAnAAA3QAAA4goAnQgnAog4AAQg3AAgogog");
	this.shape_6.setTransform(295.55,163.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#477831").s().p("AirCsQhIhHAAhlQAAhkBIhHQBHhIBkAAQBlAABHBIQBIBHAABkQAABlhIBHQhHBIhlAAQhkAAhHhIg");
	this.shape_7.setTransform(312.225,284.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#477831").s().p("Al2EgQgZgNgRgXQg+ArhMAAQhkAAhHhIQhIhHAAhlQAAhkBIhHQBHhIBkAAQBbAABFA7QBDA6AOBWQAOgxAqggQArghA2AAQAwAAAoAaQAWggAigSQAigTAoAAQAbAAAaAJIDqhcQCnhDAMAIQAIgUAKAOQAEAHASAoQAnBXAlAAQBBAAAvAvQAuAuAABCQAABAguAvQgvAuhBAAQgsAAgmgXQgRAvgpAdQgpAdgzAAQhBAAguguQgvgvAAhBQAAgbgigmQgBBAgvAuQguAthAAAQgwAAgogbQgVAggiASQgjATgoAAQgTAAgWgFQgJApghAaQghAbgrAAQgdAAgagNg");
	this.shape_8.setTransform(176.65,346.9246);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#477831").s().p("AhaDVQgugvAAhCQAAgoATgjQgdgWgQgfQgRgiAAgmQAAhBAvguQAugvBCAAQBAAAAvAvQAuAuAABBQAAAqgTAiQAdAXAQAfQARAhAAAlQAABCgvAvQguAuhCAAQhAAAgvgug");
	this.shape_9.setTransform(73.675,306.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#477831").s().p("AhvBwQgugvAAhBQAAhBAuguQAugvBBAAQBBAAAvAvQAuAuAABBQAABBguAvQgvAuhBAAQhBAAgugug");
	this.shape_10.setTransform(282.675,333.9);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#624213").s().p("AiHA3IEFjXIAJANIhuBkQhxBpgOAZQgQAcgEAcQgCANAAAJg");
	this.shape_11.setTransform(215.3,424.2625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#477831").s().p("AgvBsQhDgBgvgjQgxgiAAgvQABgxAwgiQAxgjBEAAQAwAAArAVQBFABAvAiQAwAigBAvQAAAygvAhQgxAjhEAAQgyAAgrgUg");
	this.shape_12.setTransform(239.75,405.55);

	this.instance_7 = new lib.Group_110();
	this.instance_7.setTransform(560.5,219.8,1,1,0,0,0,120.8,84.4);
	this.instance_7.alpha = 0.6016;

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#619700").s().p("AIrQDQg4gegjg0QgkAdguAAQgwAAgjgeQgkgegIguQgdAVgjAAQggAAgagRQgagPgOgbQgjAggrARQgsASgxAAQg9AAg3gbQg0gbgkgvQgMAfgcAUQgcATgiAAIgLAAQgbAngpAWQgrAYgxAAQgrAAgngSQglgSgbgfQgZAFgaAAQhiAAhPg6QhNg5gehaQgPgsAAgyQAAhXAvhKQg1gcgbg0QgYgrAAgxQAAhDApg1QhBgwglhHQgmhJAAhTIABgeQAMiEBhhaQBjhbCFAAQAQAAAUADIAIAAIgEgGQgNgRgLgXQgQgggIgkQgHghAAgdQAAh6BWhWQBWhWB6AAQBPAABEAoQAlAVAbAcIACgCQAbgcAkgQQAlgQAoAAIATABQAfgwAwgjQBNg2BcAAQBiAABPA7QBMA6AcBbQA7ABAxAiQAwAhAVA2QBDguBPAAQBLAAA/ApQA+AoAfBBQANAcAGAaIACAgQACAjgCAjQgKA4ggAuQANAAAMABQBhAKBBBJQBDBJAABjQAAASgDASQgJBAgmAyIAJAFQBDAfAnA9QApBAAABLQAABEghA6QghA7g7AkQg8AkhHAAIgVgBIACAhQAABAgeA4QAeA5AAA/QAABqhLBLQhLBLhqAAQhBAAg5gfg");
	this.shape_13.setTransform(560.375,235.775);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FCFCFC").s().p("AAAgSIgCggQAFAeAAAaQAAAVgDAYQABgigBgjg");
	this.shape_14.setTransform(649.475,183.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#619700").s().p("AjYCZQgogoAAg6QAAgpAWghQAVghAkgRQgGgPAAgSQAAgmAbgaQAagaAmgBQAWABATAJQATALANAQQAWgSAfAAQAlAAAbAbQAaAbAAAlIAAAAQAVgKAWAAQAlAAAbAbQAaAbAAAlQAAAlgaAaQgbAaglAAIgKAAQgFAqggAdQghAdgrABQgpAAgfgbQgmAhg0gBQg5AAgpgog");
	this.shape_15.setTransform(520.175,363.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#815719").s().p("AnyH9IBYgMQBogUBOgmQBTgnAWhFQAQgzgRgbQgIgOhXhLIhVhIIAQgRIBXA7QBZA7AOgDQANgDAFhbIABiMQAAh6hihSQgxgoh4hKIhuhBIAagrIAxAfQA0AdAIgGQANgKAIhkIAfALIgKA4QgKA6AGAJQAIANBNAnQBPAoAJgGQAIgGgChSIgDhRIB6gaIAAC6QADC8AOAHQAQAHAPgJQAGgEALgNQAHgHCgkTIAtAjQgRAXgPAXQgfAuAOADQAVAGDEhMIAmAfIkgBtQgeAjghArQhABWgJAnQgaB2gCAQQgMBoAfBZQAcBUAgAaQAVARBbAhQBhAiBvAYg");
	this.shape_16.setTransform(563.4,369.175);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#624213").s().p("ACwByQgag/g0gvQghgeiKhTIiDhNIAegkIFsDfIACAvIANCvQgLhCgSgrg");
	this.shape_17.setTransform(535.675,346.075);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#477831").s().p("AhJBKQgfgeAAgsQAAgrAfgeQAegfArAAQAsAAAeAfQAfAeAAArQAAAsgfAeQgeAfgsAAQgrAAgegfg");
	this.shape_18.setTransform(644.5,199.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#477831").s().p("AhJBLQgfggAAgrQAAgqAfgfQAegfArAAQArAAAfAfQAfAfAAAqQAAArgfAgQgfAegrAAQgrAAgegeg");
	this.shape_19.setTransform(479.325,186.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#477831").s().p("AiFCGQg4g3AAhPQAAhOA4g3QA3g4BOAAQBPAAA3A4QA4A3AABOQAABPg4A3Qg3A3hPAAQhOAAg3g3g");
	this.shape_20.setTransform(466.325,280.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#477831").s().p("AC+DWQgagVgHggQgQAEgPAAQggAAgbgPQgagOgRgZQggAVgkAAQgyAAgkgjQgkgjgBgyQgaAcAAAWQAAAzgkAlQglAkgzAAQgnAAgggXQgggXgNglQgdASgjAAQgzAAgkgkQgkgkAAgyQAAgzAkgkQAkgkAzAAQAdAAAehEQAOgfAEgFQAIgMAFAQQAKgGCBA0IC2BIQAUgHAWAAQAfAAAaAOQAbAPARAZQAfgVAmAAQAqAAAhAZQAgAZALAnQAMhDA0gtQA1guBHAAQBOAAA4A3QA3A4AABOQAABOg3A4Qg4A3hOAAQg7AAgwghQgOASgTAKQgUAKgXAAQghAAgagUg");
	this.shape_21.setTransform(571.875,329.8345);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#477831").s().p("AhnCmQgkglAAgzQAAgdANgaQAMgYAXgRQgPgcAAgfQAAgzAkgkQAlglAyAAQAyAAAlAlQAkAkAAAzQAAAdgNAaQgNAYgXARQAQAcAAAfQgBAzgjAlQglAkgyAAQgzAAgkgkg");
	this.shape_22.setTransform(652.05,298.225);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#477831").s().p("AhWBXQgkgkAAgzQAAgyAkgkQAkgkAyAAQAzAAAkAkQAkAkAAAyQAAAzgkAkQgkAkgzAAQgyAAgkgkg");
	this.shape_23.setTransform(489.325,319.675);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#624213").s().p("ABgBsQgEgWgMgWQgLgThXhRIhXhPIAIgKIDLCnIgJBUQAAgHgBgLg");
	this.shape_24.setTransform(541.8,390.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#477831").s().p("Ah+BJQglgbAAgmQAAglAlgaQAmgbA0gBQAhgQAmAAQA1AAAmAbQAmAbAAAmQAAAlglAbQglAag1ABQghAQgnAAQg1AAgmgbg");
	this.shape_25.setTransform(522.75,375.475);

	this.instance_8 = new lib.Group_109();
	this.instance_8.setTransform(718.2,279.5,1,1,0,0,0,65.6,45.8);
	this.instance_8.alpha = 0.6016;

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#4D8300").s().p("AEtIuQgegQgTgdQgTAQgaABQgZAAgUgRQgTgRgEgYQgQALgTAAQgRAAgPgJQgOgIgHgPQgoAkg1AAQghABgdgPQgdgPgUgZQgGARgPAKQgQALgTAAIgFgBQgPAWgWAMQgYAMgaAAQgvAAgggkQgPADgNAAQg2AAgqggQgqgegQgyQgJgZABgZQgBgwAagoQgcgPgPgcQgOgZAAgZQABglAWgdQgjgZgUgnQgWgnAAgtIABgRQAHhHA1gyQA1gwBJAAIATAAIAFABIgDgDQgGgJgHgNQgJgSgEgTQgDgTgBgPQABhCAugvQAvguBCAAQAqgBAmAWQATAMAQAPIABgBQAfghAtAAIAKABQARgbAagSQAqgeAxAAQA2AAArAgQApAgAPAyQAgAAAbATQAZARAMAdQAkgYAsAAQAoAAAjAWQAiAWARAjQAGAQAEANIABARQABAUgCATQgEAdgTAaIAOABQA1AFAkAoQAjAoABA1QgBAKgBAKQgFAigUAbIAEADQAkAQAXAiQAVAiAAAqQABAkgTAgQgSAggfAUQghATgmAAIgMAAIABARQAAAjgQAeQAQAfAAAjQAAA5gpApQgoApg6AAQgjAAgggRg");
	this.shape_26.setTransform(718.15,288.2);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#E8E8E8").s().p("AAAgKIgBgRQADARAAANQAAALgCAOQABgTgBgTg");
	this.shape_27.setTransform(766.575,259.8);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#4D8300").s().p("Ah1BTQgWgWAAgfQAAgWAMgSQAMgSATgJQgDgJAAgJQAAgUAPgOQAOgPAUAAQAZAAAPAUQANgKAPAAQAVAAAOAOQAPAPAAAVQAKgGAMAAQAVAAAOAPQAPAOAAAUQAAAUgPAOQgOAOgVAAIgFAAQgDAXgRAQQgSAPgXAAQgXABgQgOQgVARgcAAQgfAAgWgWg");
	this.shape_28.setTransform(696.325,357.4);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#6D4305").s().p("AkOEUIAwgGQA4gLArgVQAsgVAMglQAJgcgJgPQgHgMhbhLIAJgKQBbBCAMgDQAHgCADgxIAAhLQAAhDg1gsQgagWhCgoIg8gjIAPgYQA0AiAHgFQAHgFAEg2IARAFIgGAfQgFAfADAGQAFAGAqAWQAqAVAFgDQAIgFgGhWIBCgPIAABmQABBlAIAEQAMAGAOgQQAEgEBXiWIAZAUIgSAZQgRAZAHABQAMADBqgoIAWAQIidA7QgQAUgSAXQgjAvgFAUQgOBAgBAJQgHA4ARAxQAQAtARAOQALAKAyASQA0ASA8ANg");
	this.shape_29.setTransform(719.825,360.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#4E2E00").s().p("ABgA+QgPgigcgaQgSgQhKgtIhHgqIAQgTIDFB4IAJB5QgGgkgKgXg");
	this.shape_30.setTransform(704.75,348.175);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#33641D").s().p("AgnAoQgRgQAAgYQAAgXARgRQARgQAWAAQAXAAASAQQAQARAAAXQAAAYgQAQQgSARgXAAQgWAAgRgRg");
	this.shape_31.setTransform(763.85,268.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#33641D").s().p("AgoAoQgQgQAAgYQAAgXAQgRQASgQAWAAQAYAAAQAQQARARAAAXQAAAYgRAQQgQARgYAAQgWAAgSgRg");
	this.shape_32.setTransform(674.1,261.7);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#33641D").s().p("AhIBJQgegeAAgrQAAgqAegeQAegeAqAAQArAAAeAeQAeAeAAAqQAAArgeAeQgeAegrAAQgqAAgegeg");
	this.shape_33.setTransform(667.05,312.75);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#33641D").s().p("ABnBzQgOgLgEgRQgKACgHAAQgjAAgUgeQgQAMgVAAQgbAAgTgTQgUgTAAgcQgOAQAAAMQAAAcgUATQgTAUgcAAQgXAAgRgNQgRgMgGgUQgRAKgSAAQgcAAgUgUQgUgTAAgbQAAgcAUgUQAUgTAcAAQAPAAAQglQANgdAEAMQAGgEBHAcIBiAoQALgEALAAQARAAAPAIQAOAIAJANQAQgLAVAAQAXAAASAOQASANAGAVQAGgkAcgZQAdgZAnAAQArAAAeAeQAdAfAAApQAAArgdAeQgeAegrAAQggAAgbgRQgPAUgZAAQgTAAgOgLg");
	this.shape_34.setTransform(724.4,339.4015);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#33641D").s().p("Ag4BaQgTgUAAgbQAAghAagUQgIgOAAgRQAAgcATgUQAVgUAaAAQAcAAAUAUQATAUAAAcQAAAggaATQAIAQAAARQAAAbgTAUQgUATgbAAQgbAAgVgTg");
	this.shape_35.setTransform(767.95,322.15);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#33641D").s().p("AgvAvQgTgTAAgcQAAgaATgVQAVgTAaAAQAcAAAUATQATAVAAAaQAAAcgTATQgUAUgcAAQgaAAgVgUg");
	this.shape_36.setTransform(679.55,333.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#4E2E00").s().p("AArAkQgFgLgvgsIgvgqIAEgGIBtBbIgEAsQABgPgLgRg");
	this.shape_37.setTransform(708.075,371.975);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#33641D").s().p("AhEAoQgUgPAAgVQAAgTAUgPQAVgOAcAAQATgJATAAQAdAAAVAOQAUAPAAAVQAAATgUAPQgUAOgdAAQgSAJgUAAQgdAAgVgOg");
	this.shape_38.setTransform(697.7,364.125);

	this.instance_9 = new lib.Group_106();
	this.instance_9.setTransform(675.05,329.05,1,1,0,0,0,18.1,12.7);
	this.instance_9.alpha = 0.6016;

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#3B7100").s().p("AiACTQgLgKAAgRQAAgKAFgIQgFgHAAgLIAAgEIgDAAQgWAAgLgUQgFgJAAgKQAAgMAGgJQAGgJAKgEIABgBQgFgIgCgIIAAgGQAAgPAKgLQAKgLAOgBIAEAAQgFgHgBgJIAAgPIADgIQAEgKAKgGQAJgGALAAQANAAAJAHQAIgSATAAQAEgOAMgJQALgIAPgBQANABAMAHQAHAHAEAGIADAAQAMAAAJAJQAEgEAGgDQALgHALAAQASABANANQANAMAAATIgBAJIgDAKIgEAHIgBAAIACAAIAFAAQAUAAAPAOQAOANACATIAAAFQAAAZgVAPQAGAIAAAKQAAAJgDAGQgEAGgIAFQAHAMAAANQAAAHgCAGQgFAOgLAJQgMAJgPAAIgIgBQgIAKgOAAQgPAAgJgNIgBAAQgMAAgDgLQgNAPgSAAQgOABgLgKQgFAJgKAAQgEgBgFgDQgBAHgGAFQgFAEgHAAQgHAAgGgEQgKARgVAAQgQAAgMgMg");
	this.shape_39.setTransform(675.075,331.4);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#3B7100").s().p("AAEAYQgEAEgFAAQgHAAgFgEQgEgEgCgHIgBAAQgGAAgDgEQgFgEAAgFQAAgFAFgEQADgEAGAAQAEAAADACQAAgGADgEQAEgEAGAAQAEAAADADQAEgGAHAAQAFAAAEAEQAEAEABAGIgBAEQAMAFAAANQAAAIgHAHQgFAGgJAAQgHAAgHgFg");
	this.shape_40.setTransform(681.1,350.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#5B3100").s().p("AgjBGQAOgEADgDQAFgEAEgNQAFgNgCgQQAAgGgEgNQgBgFgKgNIgJgMIgsgQIAGgFQAdALAEgBQADgBgLgNIAHgGIAZArQAEAEADgBQAEgCgBg3IARADIAAANQAAAMABABQABABAMgGQAMgGABgCQABgCgDgQIAEgCIABAHQABAIABABQACACAPgKIAEAHQgfARgLAJQgPANAAATQAAAhADAAQADABAZgSIADADIgbAYQgDAEADAIQADAKAMAGQATAJAWACIiNACg");
	this.shape_41.setTransform(674.625,351.4);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#3C1C00").s().p("AgbAAIA1ghIAFAGQglAVgIAGQgLAMgFAWg");
	this.shape_42.setTransform(678.775,347.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#21520B").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgFAGAAQAGAAAFAFQAFAFAAAFQAAAHgFAEQgFAFgGAAQgGAAgEgFg");
	this.shape_43.setTransform(662.475,325.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#21520B").s().p("AgKALQgFgEAAgHQAAgFAFgFQAFgFAFAAQAHAAAEAFQAFAFAAAFQAAAHgFAEQgEAFgHAAQgFAAgFgFg");
	this.shape_44.setTransform(687.225,324.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#21520B").s().p("AgTAUQgJgIAAgMQAAgKAJgJQAIgIALAAQAMAAAIAIQAJAJAAAKQAAAMgJAIQgIAJgMgBQgLABgIgJg");
	this.shape_45.setTransform(689.2,338.15);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#21520B").s().p("AgwAdQgHAFgJAAQgMAAgIgIQgIgJAAgLQAAgLAIgIQAIgJAMAAQALAAAIAHQAIAHABAJQACgFAFgDQAFgEAGAAQAGAAAEADQAGgIAJAAIAGABIAbgLQAUgIABABQABgDAEAIQAEAKAFAAQAHAAAGAGQAFAFAAAHQAAAHgFAGQgGAFgHAAQgGAAgEgDQgFANgMAAQgIAAgFgGQgGgFAAgIQAAgCgEgFQAAAHgFAGQgGAFgHAAQgFAAgFgEQgGAJgJAAIgFgBQgCALgLAAQgIAAgEgGg");
	this.shape_46.setTransform(673.375,345.5217);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#21520B").s().p("AgJAZQgGgGAAgHQAAgGACgDQgHgFAAgJQAAgIAFgFQAFgFAJAAQAGAAAFAFQAGAFAAAIQAAAEgCAFQAHAEAAAKQAAAHgFAGQgGAFgIAAQgHAAgEgFg");
	this.shape_47.setTransform(661.35,340.775);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#21520B").s().p("AgMANQgFgFgBgIQABgHAFgFQAFgFAHAAQAHAAAGAFQAGAFgBAHQABAIgGAFQgGAFgHAAQgHAAgFgFg");
	this.shape_48.setTransform(685.75,344);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#3C1C00").s().p("AgPAGIAegYIABABIgbAaQgCAEgBADIAAADg");
	this.shape_49.setTransform(677.875,354.55);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#21520B").s().p("AgFAMQgIAAgFgDQgGgFAAgEQAAgGAGgEQAGgEAIAAQAEAAAGACQAIABAFAEQAGADAAAFQAAAGgGAEQgGAEgIAAQgFAAgFgDg");
	this.shape_50.setTransform(680.725,352.35);

	this.instance_10 = new lib.Group_105();
	this.instance_10.setTransform(637.65,330.35,1,1,0,0,0,18.1,12.7);
	this.instance_10.alpha = 0.6016;

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#3B7100").s().p("AiACUQgLgMAAgQQAAgJAFgJQgFgIAAgKIABgFIgEAAQgXAAgKgTQgFgJAAgKQAAgLAGgKQAGgJAKgFIABAAQgFgHgCgKIAAgFQAAgPAKgLQAKgLAOgBIAEAAQgFgGgBgKIAAgPIADgIQAEgKAKgGQAJgGALAAQANAAAJAHQAIgSATAAQAEgOAMgJQALgJAPAAQANAAAMAJQAGAEAFAIIADAAQAMAAAJAJIAAAAQAEgEAGgDQAKgGAMAAQASAAANANQANAMAAATIgBAJIgDAKIgEAGIgBABIACAAIAFAAQAUAAAPANQAOAOACAUIAAAEQAAAZgVAQQAGAHAAALQAAAIgDAFQgEAIgIAEQAHALAAAOQAAAIgCAGQgFANgLAJQgMAIgPAAIgIAAQgIAKgOAAQgPAAgJgNIgBAAQgMAAgDgLQgMAQgTAAQgOAAgLgLQgFAJgKAAQgFAAgEgDQgBAHgGAFQgFAEgHAAQgGAAgHgEQgLARgUAAQgQAAgMgLg");
	this.shape_51.setTransform(637.675,332.675);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#3B7100").s().p("AAFAYQgFAEgGAAQgGAAgFgEQgFgFgBgGIgBAAQgFAAgFgEQgDgEAAgFQAAgFADgEQAFgEAFAAQAEAAACABQAAgFAEgEQAFgEAFAAQAEAAADACQAFgFAGAAQAFAAAFAEQADAEAAAGIAAAEQALAGAAAMQAAAJgFAGQgHAGgIAAQgIAAgFgFg");
	this.shape_52.setTransform(643.7,351.775);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#5B3100").s().p("AgjBGQAOgFADgCQAFgFAEgMQAFgOgCgPIgEgTQgBgGgKgNIgJgMIgsgQIAGgEQAeALADgBQADgBgLgNIAHgFIAZAqQAEAEADgBQAEgCgBg4IARAFIAAALQAAANABABQABABAMgGQAMgGABgCQABgDgDgQIAEgBIABAIQABAHABABQACABAPgJIAEAHQgfARgLAKQgPALAAATQAAAhADABQADABAZgSIADACIgbAZQgDAEADAHQADALAMAFQATAKAWABIiNADg");
	this.shape_53.setTransform(637.225,352.7);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#3C1C00").s().p("AgbABIA1giIAFAGQglAVgIAHQgMALgEAWg");
	this.shape_54.setTransform(641.375,349.2);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#21520B").s().p("AgKALQgFgFAAgGQAAgGAFgEQAEgFAGAAQAGAAAFAFQAFAEAAAGQAAAHgFAEQgEAFgHAAQgGAAgEgFg");
	this.shape_55.setTransform(625.075,327.225);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#21520B").s().p("AgKALQgFgEAAgHQAAgGAFgEQAFgFAFAAQAHAAAEAFQAFAEAAAGQAAAGgFAFQgEAFgHAAQgFAAgFgFg");
	this.shape_56.setTransform(649.825,325.375);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#21520B").s().p("AgTAUQgIgIAAgMQAAgLAIgIQAIgJALAAQALAAAJAJQAIAIAAALQAAAMgIAIQgJAJgLAAQgLAAgIgJg");
	this.shape_57.setTransform(651.8,339.45);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#21520B").s().p("AgwAdQgGAFgKAAQgMAAgIgIQgIgJAAgLQAAgLAIgIQAIgJAMAAQALAAAIAHQAIAHABAJQACgFAFgEQAFgEAGAAQAFAAAFAEQAGgJAJAAIAGACIAbgLQAUgIABABQABgDAEAIQAEAKAFAAQAHAAAGAFQAFAGAAAHQAAAHgFAFQgGAGgHAAQgFAAgFgDQgFAMgMAAQgIAAgFgFQgGgFAAgIQAAgDgEgFQAAAIgFAFQgGAFgHAAQgGAAgEgDQgFAIgKAAIgFAAQgCALgLAAQgHAAgFgGg");
	this.shape_58.setTransform(635.975,346.8091);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#21520B").s().p("AgKAZQgFgFAAgIQAAgFACgEQgHgFAAgJQAAgHAGgGQAFgFAHAAQAHAAAGAFQAFAGAAAHQAAAFgDAEQAIAFAAAJQAAAIgGAFQgFAFgHAAQgHAAgGgFg");
	this.shape_59.setTransform(623.95,342.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#21520B").s().p("AgMANQgGgFABgIQgBgHAGgFQAFgFAHAAQAHAAAGAFQAFAFABAHQgBAIgFAFQgGAFgHAAQgHAAgFgFg");
	this.shape_60.setTransform(648.35,345.25);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#3C1C00").s().p("AgPAGIAegYIABACIgNALIgOAPQgCADgBADIAAADg");
	this.shape_61.setTransform(640.475,355.825);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#21520B").s().p("AgFANQgIgBgFgEQgGgEAAgEQAAgGAGgEQAGgEAIAAQAFAAAFACQAIABAFAEQAGAEAAAEQAAAGgGAEQgGAEgIAAQgFAAgFgCg");
	this.shape_62.setTransform(643.325,353.625);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#8E6426").s().p("AAQAfIg/gLIgNgIIgEgEQgDgFABgEQABgGAFgEQAEgDAFABIAPAAIAugQIANgCIAHAAQAIABAGADQASAIAEARQADAIgFAJQgFAIgJAFIgLAEIgHAAg");
	this.shape_63.setTransform(177.5779,442.325);

	this.instance_11 = new lib.Path_3_0();
	this.instance_11.setTransform(305.9,386.65,1,1,0,0,0,27.2,5.4);
	this.instance_11.alpha = 0.1016;

	this.instance_12 = new lib.Path_4();
	this.instance_12.setTransform(-12.65,359.75,1,1,0,0,0,15.8,4.5);
	this.instance_12.alpha = 0.1016;

	this.instance_13 = new lib.Path();
	this.instance_13.setTransform(46.6,368.7,1,1,0,0,0,55.8,11.1);
	this.instance_13.alpha = 0.1016;

	this.instance_14 = new lib.Path_1_1();
	this.instance_14.setTransform(715.9,388.35,1,1,0,0,0,55.8,11.1);
	this.instance_14.alpha = 0.1016;

	this.instance_15 = new lib.Path_2();
	this.instance_15.setTransform(554.4,422.5,1,1,0,0,0,131.6,26.3);
	this.instance_15.alpha = 0.1016;

	this.instance_16 = new lib.Path_3();
	this.instance_16.setTransform(191.4,465.95,1,1,0,0,0,131.6,22.8);
	this.instance_16.alpha = 0.1016;

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.lf(["#3BB100","#A3C300"],[0,1],0,-91.7,0,91.7).s().p("A/gOSIgD4VQDmhEGqhEQNViJPSAAQPUAAF/AFQC/ADgEADIACceg");
	this.shape_64.setTransform(157.175,554.7378,1,1.7939);

	this.instance_17 = new lib.Path_1_0();
	this.instance_17.setTransform(-43.75,378.25,1,1.794);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.lf(["#3BB100","#A3C300"],[0.247,1],0,-28.2,0,35.1).s().p("AzEkNQLUgjKdA2QOhBKB3DhQpugKvLB5QnmA9lqA+g");
	this.shape_65.setTransform(78.6,392.7167,1,1.7939);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.lf(["#3BB100","#A3C300"],[0,1],0,91.7,0,-91.7).s().p("A/huKIC7gFQF/gFPTAAQPTAANUCJQGrBEDmBEIgDYUMg/EAAEg");
	this.shape_66.setTransform(556.975,555.1863,1,1.7939);

	this.instance_18 = new lib.Path_1();
	this.instance_18.setTransform(543.5,378.7,1,1.794);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.lf(["#3BB100","#A3C300"],[0.247,1],0,35.2,0,-28.1).s().p("AF1CgQvLh5puALQB2jhOhhLQKgg2LSAkIAAInQlqg+nmg9g");
	this.shape_67.setTransform(635.525,393.0989,1,1.7939);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFFFFF").s().p("ADhCpQlbiPhKgrQhYg1hbgsQhbgsAZAVICbCGQi3htglggQgigegOhLQgOhOA6AjICmBnQC4BxBZA1QCOBTHnD0Qifg/iuhIg");
	this.shape_68.setTransform(530.6139,384.533);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#E3E4E4").s().p("ADiC4Qi2hphQgJQgdgsg4g0IgxgtIAeBcQAlBlAfAlIBbBsQgggXgpgiQhShGgng5Qg2hRgpg0Qg0hDgQgBQgIgBAKgDQALgDARgBQAxgCANAUQgBgNgbgoQg3hTg9gpQAaADBdA5IBRA+QBsBZCJCAQBnAsB+BjQBAAxAqAoQhJgyhbg0g");
	this.shape_69.setTransform(430.65,351.225);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#F0F1F1").s().p("AvbLrQg+gKjthYIjhhVIAAtIQH5l3CUhjQBbguCzClQBZBSBIBbICHBDQCLBKASAgQA0g2A2grQBthWARA6ICcBjQDAB4C4BmQJNFFEbAdQA+AGkdBbQksBgmMBfQncByl+A2QkkAojNAAQh7AAhbgOg");
	this.shape_70.setTransform(470.0958,398.1766);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#F2F2F2").s().p("AiJALQh8hOAAgUQAAgUAPgvIAPgrIExDMQArAdAkgBQARgBAKgGQBaA1gJAFQgQAMgRgCIgdgGQgbgEh2gzQhfgqgzgdIAyAqQCRCCAwA9Qg5gnjniTg");
	this.shape_71.setTransform(702.3867,336.8);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#F2F2F2").s().p("ACUAdQhQgtiFgUQg0gJgeACQgfABANAKQAWASADA7QACAdgDAbQgVgtgagsQg0hZgZAAQglAAgzgsQgUgSAAgIQABgJAeAJIDbA9QDsBIBZAwQA3AyBeA3IAXANQiChFhgg2g");
	this.shape_72.setTransform(525.6994,338.0186);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#F2F2F2").s().p("AAQCPQhDgyghgmQhyiGgXgFQAlgEAUAHIgtgnQhKhBAOACQAVAEBNAiIBEAtQBaA/ByBbQBUAaA0AnQAaATAJAOQgjgTgwgVQhggrhCgMQgZgegtglIgqggIAcA8QAhBCAZAaIBNBKQgbgRgjgYg");
	this.shape_73.setTransform(612.513,344.9954);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#E3E4E4").s().p("A7BI2QkagNhLhmQg/hVBUiEQBHhwCIhfQCDhbBEAGQE/AgH3jjQD7hxC8h4QApg8FLBoQCkA0CdA/QBQAICghMQBPgmBAgoIBNAcQBjAdBtAKQFbAdE2i9IA9A4QBGBCA6AsQDFCXBsgtQgQIvgEDuQt1ATuZARQ3bAcmLAAQhaAAghgBg");
	this.shape_74.setTransform(517.1668,373.7994);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#F2F2F2").s().p("AiJALQh8hNAAgVQAAgUAPgvIAPgrIExDMQArAdAjAAQASgBAKgHQBZA1gIAFQgQALgRgBIgegGQgagDh2g0QhhgqgzgeIA0AsQCRCBAwA+Qg5gojniTg");
	this.shape_75.setTransform(526.8828,304.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#F2F2F2").s().p("ACVAdQhQgsiFgVQg1gIgeABQgeABANALQAWASADA6QACAegDAaQgVgsgagtQg0hYgZAAQglAAgzgtQgUgRAAgIQABgJAeAIIDbA+QDsBIBZAwQA3AyBeA2IAVANQiBhFhfg2g");
	this.shape_76.setTransform(350.0994,305.9186);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#F2F2F2").s().p("AARCOQhEgxgggnQhziGgWgEQgggGA3AEQAVABANAFIgugoQhKhCAOADQAVAEBOAhIBDAuQBaA/ByBaQBUAbA0AnQAaATAJAOQgigTgwgWQhggrhCgMQgagdgtglIgpggIAbA8QAhBCAZAZIBNBLQgbgRgigZg");
	this.shape_77.setTransform(436.9886,312.9704);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#D0D2D3").s().p("A7BI2QkagNhLhmQg/hVBUiEQBHhwCIhfQCDhbBEAHQE+AfH3jiQD8hyC8h3QApg9FLBoQCkA0CdBAQBQAICfhNQBQgmA/goIBOAcQBjAdBtAKQFbAdE2i9IA9A4QBGBBA6AtQDFCXBsgtQgQIwgEDtQt2ATuZARQ3ZAcmMAAQhaAAghgBg");
	this.shape_78.setTransform(341.6668,341.7494);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#F2F2F2").s().p("AgGAmQg0hZgZAAQglAAg0gsQgTgSAAgIQABgJAeAJIBzAfQCGAmBnAjIAAAVQhLgRg8gEQg7gDASAPQAWAQADA8QACAegDAaQgVgtgZgsg");
	this.shape_79.setTransform(768.7244,330.2436);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#E3E4E4").s().p("ArQIYQkZgMhMhnQg+hVBUiEQBHhwCHheQCEhcBDAHQE/AfH2jiQD7hyC8h3QAcgpCkAjQB4AaC2BAIAAOwQ0iAZl5AAQhiAAgjgCg");
	this.shape_80.setTransform(677.4668,371.5708);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#F2F2F2").s().p("AiJALQh8hOAAgTQAAgWAPguIAPgrIExDMQArAdAkgBQARAAAKgHQBaA0gJAGQgQALgRgBIgegGQgagDh2g0QhhgqgzgeIA0ArQCRCCAwA+Qg9grjjiQg");
	this.shape_81.setTransform(287.2867,321.675);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#F2F2F2").s().p("ACUAdQhQgsiFgVQg1gIgdABQgfABANALQAWARADA7QACAegDAaQgVgtgagsQg0hZgZAAQglAAgzgsQgUgSAAgIQABgJAeAJIDbA9QDsBIBZAxQA3AxBeA3IAXANQiChFhgg2g");
	this.shape_82.setTransform(110.5744,322.8811);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#F2F2F2").s().p("AAQCPQhDgyghgnQhyiFgXgFQgggGA4AEQAVABANAFIgugoQhKhCAOADQAVAEBNAhIBEAuQBaA/ByBaQBUAbA0AnQAaATAJAOQgjgTgwgWQhggrhCgMQgZgdgtglIgqggIAcA8QAhBCAZAZIBNBLQgbgRgjgYg");
	this.shape_83.setTransform(197.413,329.8704);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#E3E4E4").s().p("A6cIqQgBjbgGiHQgHiGAAhoQE+AfFEjnQBlhHBZhbIBFhKQAqg9FKBoQClA0CdA/QBRAICehMQBQgnA/goIBOAcQBiAeBtAKQFbAdE2i9IA+A4QBFBBA7AtQDECWBsgtQgQIxgEDtQsHANsqALQy+ASmSAAQiHAAgrgCg");
	this.shape_84.setTransform(142.75,357.55);

	this.instance_19 = new lib.cloud();
	this.instance_19.setTransform(840,163.1,1,1,0,0,0,80,29.1);

	this.instance_20 = new lib.butterfly();
	this.instance_20.setTransform(636.35,150.6,1,1,0,0,180,20.1,21.8);

	this.instance_21 = new lib.butterfly();
	this.instance_21.setTransform(68.8,164.55,1,1,0,0,0,20.1,21.8);

	this.instance_22 = new lib.orange("synched",7);
	this.instance_22.setTransform(141.6,147.8,1,1,0,0,0,14,14);

	this.instance_23 = new lib.orange("synched",7);
	this.instance_23.setTransform(267.65,211.55,1,1,0,0,0,14,14);

	this.instance_24 = new lib.orange("synched",7);
	this.instance_24.setTransform(94.95,297.15,1,1,0,0,0,14,14);

	this.instance_25 = new lib.orange("synched",7);
	this.instance_25.setTransform(230.3,309.6,1,1,0,0,0,14,14);

	this.instance_26 = new lib.orange("synched",7);
	this.instance_26.setTransform(121.4,206.9,1,1,0,0,0,14,14);

	this.instance_27 = new lib.orange("synched",7);
	this.instance_27.setTransform(150.95,278.45,1,1,0,0,0,14,14);

	this.instance_28 = new lib.orange("synched",7);
	this.instance_28.setTransform(269.2,259.8,1,1,0,0,0,14,14);

	this.instance_29 = new lib.orange("synched",7);
	this.instance_29.setTransform(185.2,213.1,1,1,0,0,0,14,14);

	this.instance_30 = new lib.orange("synched",7);
	this.instance_30.setTransform(264.55,157.1,1,1,0,0,0,14,14);

	this.instance_31 = new lib.orange("synched",7);
	this.instance_31.setTransform(185.2,121.35);

	this.instance_32 = new lib.orange("synched",7);
	this.instance_32.setTransform(503.15,291.1,0.7925,0.7925,0,0,0,14.1,14.1);

	this.instance_33 = new lib.orange("synched",7);
	this.instance_33.setTransform(586.2,238.25,0.7925,0.7925,0,0,0,14,14.1);

	this.instance_34 = new lib.orange("synched",7);
	this.instance_34.setTransform(625.4,279.4,0.7925,0.7925,0,0,0,14,14);

	this.instance_35 = new lib.orange("synched",7);
	this.instance_35.setTransform(614.3,215.3,0.7925,0.7925,0,0,0,14,14);

	this.instance_36 = new lib.orange("synched",7);
	this.instance_36.setTransform(563.75,275.75,0.7925,0.7925,0,0,0,14,14.1);

	this.instance_37 = new lib.orange("synched",7);
	this.instance_37.setTransform(505.85,227.65,0.7925,0.7925,0,0,0,14.1,14.1);

	this.instance_38 = new lib.orange("synched",7);
	this.instance_38.setTransform(537.6,177.8,0.7925,0.7925,0,0,0,14,14.1);

	this.instance_39 = new lib.Mesh();
	this.instance_39.setTransform(547,-8,0.3169,0.3058);

	this.instance_40 = new lib.orange("synched",7);
	this.instance_40.setTransform(749.8,315.05,0.6404,0.6404,0,0,0,14,14.1);

	this.instance_41 = new lib.orange("synched",7);
	this.instance_41.setTransform(688.7,321.45,0.6404,0.6404,0,0,0,14.1,14.1);

	this.instance_42 = new lib.orange("synched",7);
	this.instance_42.setTransform(706.65,293.25,0.6404,0.6404,0,0,0,14.1,14.1);

	this.instance_43 = new lib.orange("synched",7);
	this.instance_43.setTransform(724.6,253.9,0.6404,0.6404,0,0,0,14.1,14);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgBACIgBgCIABAAQAAgBABAAQAAAAAAAAQAAAAAAAAQABAAAAABIABAAQABAAAAAAQAAAAAAAAQgBABAAAAQAAAAAAAAIgCABIgBAAg");
	this.shape_85.setTransform(711.0583,482.0944);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAAAFQgBAAgBABQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBABAAQAAgBAAAAQgBAAAAAAQgBAAgBAAQAAgBAAAAQAAAAAAAAQgBgDADABQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQABAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAAAAAIgCgCg");
	this.shape_86.setTransform(711.0411,482.1);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AAAAFQAAABgBAAQAAAAgBAAQAAABgBAAQAAgBgBAAQAAAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAgBQgBABAAAAQgBAAgBAAQAAAAAAAAQAAgBAAgBQgBAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAABABAAQAAABAAAAQAAgBABAAQAAAAABgBQAAAAABABQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQgBAAAAABQABgBABAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAABQAAAAAAAAQgBABAAAAQAAAAgBAAIAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBg");
	this.shape_87.setTransform(711.0386,482.0792);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgBABIAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAIgCABIgBgBg");
	this.shape_88.setTransform(691.7738,473.1694);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AAAAFQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQABAAAAgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAgBABAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABABQAAAAABAAIAAgBIABgBQABAAAAAAQAAAAAAAAQABABAAAAQAAABAAABQABgBAAAAQAAgBABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBABQAAAAgBAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAgBQgBAAgBAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBAAIAAAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_89.setTransform(691.7714,473.1286);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AAAAFQAAAAgBABQgBAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAABAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQgBgBgBAAQAAAAAAgBQgBAAABAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAABABAAQAAABAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAAAABQABgBAAAAQABAAABABQAAAAAAAAQABABAAAAQAAAAAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAAAgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_90.setTransform(691.7714,473.1286);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgBABQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABABABAAQAAAAAAAAQAAAAAAAAQAAABgBAAIgCABIgBgBg");
	this.shape_91.setTransform(734.6624,466.5623);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AAAAFQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQABAAAAAAIACAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQABABAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAAAAAABQgBAAAAAAQAAAAABAAQABAAAAABQABAAAAAAQAAABABAAQAAAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQAAABABAAQAAABABAAQAAAAAAAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAgBAAQgBAAAAgBQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_92.setTransform(765.3667,465.8042);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAgBAAABQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAAAQAAABgBAAIgCACIAAgBg");
	this.shape_93.setTransform(725.05,414.4373);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AAAAFQgBABAAABQgBAAAAAAQgBABAAgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAABAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAABAAAAQAAABAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAAAAAQgBABAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBABAAAAQgBAAAAAAQgBgBAAAAQAAABAAAAQgBABAAAAQAAABAAAAQgBAAAAABQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_94.setTransform(725.0325,414.45);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("AAAAFQAAABgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBQgBABgBAAQAAAAgBgBQAAAAAAAAQAAgBAAgBQgBAAAAgBQAAAAABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAABABABQAAAAAAABQAAAAAAABQAAAAgBAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAgBAAQAAAAgBABQAAAAgBAAQABABAAAAQABAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQgBgBAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_95.setTransform(725.0411,414.4625);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAAAQgBAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQgBAAAAABIgCAAIAAAAg");
	this.shape_96.setTransform(709.5,426.95);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AAAAFQgBABAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBABgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAABABQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAAAABQABAAAAAAQAAAAAAABQABAAAAABQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAAAABQAAAAABAAQABAAAAAAQAAABAAAAQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAABAAABQgBAAAAABQAAAAAAAAQgBAAAAAAIgBABQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_97.setTransform(709.4861,426.9531);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AAAAFQAAABgBABQAAAAAAABQgBAAAAAAQgBAAgBgBQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAABgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQABgBAAAAQABgBAAAAQABAAAAABQAAAAABAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAgBABAAQAAAAABAAQAAgBABAAQAAABAAAAQABAAAAAAQABABAAAAQAAABAAAAQgBABAAABQABgBABAAQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAABQgBAAAAAAQAAAAAAAAQgBABgBAAQABAAAAABQABAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAIAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_98.setTransform(709.5006,426.974);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBABAAQAAgBAAAAQAAAAAAAAQABABAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAAAABIgCABIAAgBg");
	this.shape_99.setTransform(712.6371,407.4877);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAABgBQgBAAAAgBQAAAAgBgBQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAAABABQAAAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAQgBAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_100.setTransform(712.6325,407.5139);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQAAAAABAAQABABAAAAQAAgBAAgBQABAAAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAABABQAAABAAAAQABAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAABABAAQAAABAAAAQAAABAAAAQAAABgBAAQABAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAgBQAAABAAABQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_101.setTransform(712.6246,407.5214);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAAAAAQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAAAAAAAQgBAAAAABIgCABIgBgBg");
	this.shape_102.setTransform(758.1623,487.2819);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("AACAHQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBQgBABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABAAQgBAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQgBgCAEABIgBgDQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQgBAAAAgBQAAAAAAAAQABAAAAgBQABAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAQAAABAAABQAAAAAAABQAAgBABAAQAAAAAAAAQABABAAAAQABAAAAAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABAAAAABQAAABAAAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAQgBAAgBAAQAAAAgBgBQAAABABAAQAAABAAAAQAAAAgBAAQAAAAgBAAIAAAAg");
	this.shape_103.setTransform(758.1389,487.2292);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AAAAFQgBABAAAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQAAgBAAAAQABgBAAAAQgBAAAAAAQgBAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAABAAQgBAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQAAABAAAAQgBABAAAAQABAAABABQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAABAAABQAAAAgBAAQAAABAAAAQAAAAgBAAIAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_104.setTransform(758.1286,487.2542);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAAAQAAAAABABQAAAAABAAIAAACIgCACIAAgBg");
	this.shape_105.setTransform(649.8762,397.9319);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAABABQAAgBAAAAQAAgBAAgBQAAAAABAAQAAAAABAAQAAgBAAABQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQgBAAAAABQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBABQABAAAAABQAAAAAAAAQABABgBAAQAAABAAAAQAAAAAAABQgBAAAAAAQgBAAAAgBQgBAAgBAAQAAAAAAABQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_106.setTransform(649.9,397.9464);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#FFFFFF").s().p("AAAAFQAAABgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAgBQABAAAAgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQgCgCAEAAQAAAAgBgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAAAAAQABABAAAAQAAgBAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQABgBAAAAQAAAAABgBQAAAAABAAQAAABABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBAAQABAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAABAAAAQAAAAgBAAQAAAAgBAAQAAABgBAAQABAAAAABQABAAAAAAQAAABAAAAQAAABAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAgBg");
	this.shape_107.setTransform(649.8831,397.95);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQgBAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAQABABAAAAQABAAAAAAQAAAAgBAAQAAABAAAAIgCABIAAAAg");
	this.shape_108.setTransform(706.025,402.5575);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#FFFFFF").s().p("AgBAGQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQgBAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAABABAAQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQABAAAAABQAAAAAAAAQABABAAAAQAAABABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQAAABABAAQAAABgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAABAAAAQAAABAAABQAAAAAAAAQgBABAAAAQgBAAgBAAQAAgBAAAAQAAAAAAgBQgBAAAAgBg");
	this.shape_109.setTransform(706.0361,402.575);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBABAAQAAgBAAAAQAAAAgBAAQgBgBAAAAQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAABQAAgBAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAQAAABgBABQABgBABAAQAAAAABABQAAAAAAAAQAAABAAAAQABAAAAABQAAAAgBAAQAAAAAAAAQgBABgBAAQABABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAABAAAAQAAAAgBABQAAAAgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_110.setTransform(706.0014,402.5861);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAAAABQAAAAgBABIgCAAIAAAAg");
	this.shape_111.setTransform(685.1169,409.0179);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AAAAFQgBABgBAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAIABgBIACAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAgBAAgBQgBAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAABQABAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAgBABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAgBAAQAAABAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAgBAAQAAgBgBAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_112.setTransform(685.1202,409.05);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAAAgBAAQAAABgBgBQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQABgBAAgBQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQABABAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAgBABAAQAAgBABAAQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAABgBAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAABAAAAQAAAAAAAAQgBAAAAAAQgBABgBAAQABAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAAAAAABQgBAAAAABQAAAAgBABQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAgBg");
	this.shape_113.setTransform(685.125,409.05);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgBAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAAAAAAAQAAABgBAAQAAABAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAAAABAAg");
	this.shape_114.setTransform(669.7635,396.6679);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABgBQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAABABQAAgBgBAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAgBABQAAAAAAAAQgBAAgBAAQABABABAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAIgCAAQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_115.setTransform(669.775,396.6839);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAgBABAAQAAgBAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAgBQABgBAAAAQAAAAAAgBQAAAAABAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQAAAAABgBQAAAAABgBQAAAAABAAQAAAAABABQAAAAAAABQABABAAAAQAAABAAAAQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAgBAAQAAABAAAAQgBAAgBAAQABABABAAQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAgBAAQgBAAAAgBQAAABAAABQAAAAAAABQAAAAgBAAQAAAAgBAAIAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBg");
	this.shape_116.setTransform(669.7675,396.6681);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQgBAAAAgBQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAAAQAAABgBABIgCAAIgBAAg");
	this.shape_117.setTransform(671.0095,412.8);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgBAFQAAABgBAAQAAABgBAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQAAAAABgBQAAAAAAgBQAAAAgBAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAABQAAgBAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQABAAAAABQAAAAAAAAQAAAAABABQAAAAAAABQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQABAAABABQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABABAAAAQAAABABAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAIgBABQAAAAgBgBQAAAAAAAAQAAgBAAAAQgBgBAAgBg");
	this.shape_118.setTransform(671.0246,412.8031);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAABgBAAQAAAAAAAAQgBAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQgBAAAAAAQgBAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBABABQABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABQABABAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAABQABAAAAAAQABgBAAABQABAAAAAAQABABAAAAQAAABAAAAQgBAAAAAAQAAABgBAAQAAAAgBABQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_119.setTransform(671.0139,412.7714);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AgBACIgBgCIABAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAAAgBAAQAAABAAAAIgCABIgBAAg");
	this.shape_120.setTransform(697.0071,409.25);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAABAAQAAgBAAAAQAAgBAAgBQAAAAABAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAAAAAAAQAAAAAAAAQgBABAAAAQgBAAgBABIACABQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAABIgBAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_121.setTransform(696.975,409.2425);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQgBAAAAAAQgBABAAgBQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAgBQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBAAAAgBIABgBIACAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQABAAABAAQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAgBAAABQAAAAABABQAAAAAAABQABgBAAAAQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQgBABAAAAQABAAABABQAAAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBAAgBAAQABABABAAQAAAAAAABQABAAgBABQAAAAAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQgBgBAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAgBg");
	this.shape_122.setTransform(696.9778,409.2525);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAgBgBQAAAAAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAgBAAABQABAAAAAAQABAAAAABQAAAAAAAAQABAAAAAAQgBABAAAAIgCACIAAgBg");
	this.shape_123.setTransform(760.075,440.2121);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AAAAFQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQgBAAAAgBQAAAAAAAAQAAgBAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQgBAAAAgBQAAAAgBgBQAAAAAAgBQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAAAABQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQABABAAAAQAAABgBABQAAAAAAAAQgBAAgBAAIgBABQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_124.setTransform(760.0611,440.21);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAABgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAgBQAAAAAAgBQAAAAABgBQgBABgBAAQAAAAgBgBQAAAAgBAAQAAgBAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBABABQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAABABQAAAAAAAAQAAAAABABQAAAAAAABQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABQgBAAAAABQABAAAAgBQABAAAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_125.setTransform(760.075,440.2);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgBACQAAAAAAgBQgBAAAAgBQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAABAAQAAABAAAAQABAAAAAAQAAAAAAAAQgBABAAAAIgCABIgBAAg");
	this.shape_126.setTransform(760.2,428.0467);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("AgBAGQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBgBAAgBQAAAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAABAAQABAAABABQgBgBABAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAAAAAQAAABAAAAQABAAAAABQAAABAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQABABAAAAQAAABABAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAABgBABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAgBgBg");
	this.shape_127.setTransform(760.1889,428.025);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAABABAAQAAAAAAAAQAAAAABABQAAAAAAABQAAgBABAAQABAAAAgBQABAAAAAAQAAAAABAAQAAABABAAQAAABAAAAQAAABAAAAQAAABgBABQABAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABgBAAQABABAAAAQABAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAAAQgBgBAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAgBg");
	this.shape_128.setTransform(760.175,428.05);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQAAgBgBAAQAAAAABAAQAAgBAAAAIADAAQAAAAAAAAQAAAAAAABQAAAAABAAQAAAAAAABIgDABIAAAAg");
	this.shape_129.setTransform(734.3929,425.19);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAQgBgBAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAABQABgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAIgBABQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_130.setTransform(734.4031,425.1536);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBAAAAAAQAAABgBgBQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAIAAgCIACAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABABQABAAAAAAQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAgBAAABQAAAAAAABQABAAAAABQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQABABgBAAQAAABAAAAQABAAAAABQABAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAgBAAQAAAAgBABQAAAAgBAAQABABAAAAQABABAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBgBgBAAQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBg");
	this.shape_131.setTransform(734.4156,425.1525);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQgBAAAAgBQAAAAAAAAQABAAAAAAQABgBAAAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABQgBAAAAABIgCAAIAAAAg");
	this.shape_132.setTransform(748.0377,453.2304);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABgBQgBAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAABAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAgBABQABAAABAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBABQABAAAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBgBQABABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_133.setTransform(748.0531,453.2139);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABgBQgBAAAAAAQgBAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQgBAAAAgBQgBgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABABQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQABABAAAAQAAAAABgBQAAAAABgBQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAABQABgBAAAAQABAAAAAAQABABAAAAQABAAAAABQAAABAAAAQAAAAAAAAQgBAAAAABQgBAAgBAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAIAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_134.setTransform(748.0611,453.225);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAgBABAAQAAABABAAQAAAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABIgCABIAAgBg");
	this.shape_135.setTransform(723.15,445.8208);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBAAAAABQAAAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAgBAAgBQAAAAABgBQgBAAgBAAQAAABgBgBQAAAAAAAAQAAgBAAgBQgBAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAABABQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQABABAAABQABAAAAABQAAAAAAABQAAAAAAAAQgBABgBAAQAAABgBAAQAAAAgBgBQAAAAAAgBQAAABgBABQAAAAAAABQAAAAgBAAQAAAAAAAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_136.setTransform(723.1411,445.8175);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAABgBAAQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABgBAAAAQABAAAAAAQABABABAAQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABgBAAABQAAAAAAAAQAAAAAAABQABAAAAABQABgBAAAAQAAAAABAAQAAgBABABQAAAAABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBABQABgBAAAAQABAAAAABQABAAAAAAQABABAAAAQAAABAAAAQAAAAgBAAQAAAAgBABQAAAAgBAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQgBABAAAAQgBAAAAgBQgBAAAAAAQAAAAgBABQAAABAAAAQAAABAAAAQgBAAAAABQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_137.setTransform(723.1464,445.8464);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQAAAAgBgBQAAAAAAAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAAAAAQgBABAAAAIgCABIAAAAg");
	this.shape_138.setTransform(738.2283,452.0871);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAgBABAAQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABgBQgBAAAAAAQAAgBAAAAQgBgBAAAAQABgBAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAABAAQAAAAAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAABAAQAAgBAAAAQABAAABAAQAAAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAABABAAQAAABAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQgBAAgBABQABAAAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBgBQAAABABAAQAAABgBAAQAAABAAAAQgBAAAAAAIgBAAQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_139.setTransform(738.225,452.0861);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBABAAQAAgBAAgBQgBAAAAABQgBAAgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAABAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAABABAAQAAABAAAAQAAAAABgBQAAAAABAAQAAgBABAAQAAAAABABQAAAAABABQAAAAAAAAQAAABAAABQAAAAgBABQABAAABgBQAAAAABABQAAAAABAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAAAAAABQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_140.setTransform(738.225,452.075);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAAAABIgCAAIgBAAg");
	this.shape_141.setTransform(685.75,429.9179);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAABABAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAQgBAAgBAAQABABAAAAQAAABABAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABABABQAAAAgBABQAAAAAAAAQgBAAAAAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_142.setTransform(685.725,429.9175);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBABAAQAAgBAAgBQgBABgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAgBABAAQABABAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAABABQAAABAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQgBABAAABQABAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAAAgBAAQAAABAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAgBAAQAAAAgBAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_143.setTransform(685.725,429.9214);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AgBACQAAAAAAgBQAAAAAAgBQgBAAABAAQAAAAAAAAQAAgBABAAQAAgBAAAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAABAAQAAAAgBABQAAAAAAAAIgCACIgBgBg");
	this.shape_144.setTransform(747.5621,418.5222);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAABABAAQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAABAAQAAAAAAAAQAAAAAAAAQABABAAAAQAAABABAAQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQABAAAAAAQAAABABAAQAAABAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQgBAAgBABQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQAAAAgBgBQABABAAABQAAAAAAAAQAAABgBAAQAAAAgBAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_145.setTransform(747.5254,418.5286);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBABQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQABgBAAgBQgBAAgBAAQAAABgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAABAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQABAAAAAAQAAAAAAAAQAAABAAAAQABABAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBABQABgBAAAAQABAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABABAAAAQAAABABAAQAAABAAAAQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBgBQgBAAAAAAQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_146.setTransform(747.5464,418.5286);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQAAgBgBAAQAAAAABAAQAAAAAAgBIADAAQAAAAAAABQAAAAAAAAQABAAgBAAQAAABAAAAIgCABIAAAAg");
	this.shape_147.setTransform(700.9379,424.02);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#FFFFFF").s().p("AgBAGQAAABgBAAQAAAAAAAAQgBABAAgBQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAgBQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQgBAAAAAAQAAgBABAAQAAgBAAAAQABAAABAAQAAAAAAAAQAAAAAAAAQABABAAAAQAAABAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABABAAAAQAAABABAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAAAABIgDgDg");
	this.shape_148.setTransform(700.9464,424);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQAAAAABgBQAAAAABAAQAAgBABAAQAAAAABAAQAAABABABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABgBAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQgBgBAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAgBg");
	this.shape_149.setTransform(700.925,424);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAAAIABgBIABAAQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAABIgCAAIAAAAg");
	this.shape_150.setTransform(684.1967,414.445);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAgBABgBQgBABgBAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQgBgBAAgBQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABABABAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAABQAAAAABABQAAgBAAAAQABAAAAAAQAAAAABAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQABABAAABQAAAAAAAAQAAAAAAAAQgBABAAAAQgBAAgBAAQABABAAAAQABABAAABQAAAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBgBQAAABAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAgBgBQAAAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_151.setTransform(684.1861,414.45);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAAAgBABQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQAAgBABAAQAAgBAAAAQgBAAAAgBQgBAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAgBABABQABAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAABABAAQAAABAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAgBABABQAAAAAAABQABAAAAABQAAAAgBABQAAAAAAABQABgBAAAAQABAAABAAQAAABAAAAQABAAAAABQAAABAAAAQAAAAgBAAQAAAAgBABQAAAAgBAAQABABAAAAQABABAAAAQAAAAAAABQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAABAAAAQgBABAAAAQAAAAgBAAIgBAAQgBAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_152.setTransform(684.1786,414.4375);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAAAABIgBAAIgBAAg");
	this.shape_153.setTransform(743.15,460.9179);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#FFFFFF").s().p("AAAAFQgBABAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAgBQgBAAABgBQAAAAAAAAQABgBAAAAQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAABQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAABABAAQAAABAAAAQAAABAAAAQAAABgBAAQABAAABABQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQABABAAAAQAAABABAAQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAIAAABQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_154.setTransform(743.1714,460.9531);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQgBAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAABAAQgBAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAgBQAAAAABAAQAAgBABAAQAAAAABABQAAAAABAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQAAAAABABQAAAAAAAAQAAABAAAAQAAABABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAABgBABQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQABABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAIgBABQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_155.setTransform(743.1825,460.9042);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQAAAAAAAAQgBgBABAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAgBABABQAAAAAAAAQABABAAAAQAAAAAAAAQABAAgBABQAAAAAAAAIgCACIAAgBg");
	this.shape_156.setTransform(633.6655,414.8373);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBIABgBIACAAQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAgBQgBAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAIABACIgBACQABAAABAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAAAAAQAAAAgBABQAAAAAAAAQgBAAgBABQABAAAAABQABAAAAAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBAAgBAAQAAAAgBgBQABABAAABQAAAAgBABQAAAAAAAAQgBAAgBAAIAAAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_157.setTransform(633.6702,414.825);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAgBABAAQgBAAgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQAAAAABAAQABABAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBABABQAAAAAAAAQAAAAABABQAAAAAAABQABgBAAAAQABAAAAAAQABgBAAABQAAAAABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBABQABgBAAAAQABAAAAAAQABABAAAAQABAAAAABQAAABAAAAQAAAAAAAAQgBAAAAAAQgBABgBAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAAAAAABQgBAAAAABQgBAAAAABQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_158.setTransform(633.675,414.8464);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAgBAAQAAgBABAAQAAAAAAAAQABgBAAAAQAAAAAAAAQAAgBABABQAAAAABAAQAAAAAAABQAAAAAAAAQABAAAAAAQgBABAAAAIgCABIAAAAg");
	this.shape_159.setTransform(663.2639,420.9155);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBIgEgCQAAAAAAgBQAAAAABAAQAAAAAAAAQABgBABAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQgBgBAAgBQAAgBAAAAQAAAAABAAQAAgBABABQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQAAgBABAAQABAAAAABQAAAAAAAAQABABAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBgBgBAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAIgCAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_160.setTransform(663.2825,420.9261);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABgBQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAQABAAABABIgBgCIACgBQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQAAgBABAAQAAAAABAAQAAgBABABQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQABAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQgBAAAAABQgBAAgBAAQABAAABABQAAAAAAABQAAAAAAABQAAAAAAABIgEAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAgBg");
	this.shape_161.setTransform(663.2825,420.9125);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAAAgBgBQAAAAABAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQABAAAAAAIABABQAAAAABAAQAAAAgBAAQAAAAAAABQAAAAAAAAIgCABIgBAAg");
	this.shape_162.setTransform(647.9633,408.5717);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFFFFF").s().p("AgBAGQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABABQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQABAAAAAAQAAABAAAAQABAAAAABQAAAAAAABQABgBAAAAQAAgBABAAQAAAAABAAQABABABABQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAAAABQAAAAABAAQAAAAABAAQAAABABAAQAAABAAAAQAAAAAAAAQAAAAgBAAQAAABAAAAQgBAAgBAAQABABAAABQABAAAAABQAAAAAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBAAIAAABQAAAAgBgBQAAAAAAAAQAAAAAAgBQAAAAgBgBg");
	this.shape_163.setTransform(647.95,408.55);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQgBgBAAAAQAAgBABAAQAAAAAAAAQABgBABAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQABAAABABQgBgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAABAAAAQABABAAAAQAAABAAAAQgBABAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABABQAAABAAAAQAAAAgBAAQAAAAAAABQgBAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAIgCAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_164.setTransform(647.9417,408.5819);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABABQAAAAAAABQABAAAAAAQAAAAAAAAQAAABgBAAIgCACIAAgBg");
	this.shape_165.setTransform(649.1669,424.6778);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#FFFFFF").s().p("AgBAFQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAIgBgCIABgCIgEgCQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAABAAQgBgBgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQAAgBAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAABAAAAQABAAAAABQAAAAAAABQABgBABAAQAAAAABAAQAAgBABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAAAgBABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAgBAAQAAgBAAAAQAAgBAAAAQgBgBAAgBg");
	this.shape_166.setTransform(649.1825,424.675);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQABgBAAAAQgBAAgBAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAABAAAAQAAAAAAAAIABACQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAABQgBAAAAABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAgBAAQAAABAAAAQgBAAgBABQABAAAAABQABAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBAAgBABQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_167.setTransform(649.175,424.6417);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#FFFFFF").s().p("AgBACQAAAAAAgBQgBAAAAgBQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQAAAAgBABIgCABIgBAAg");
	this.shape_168.setTransform(675.1595,421.1467);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQABAAAAAAQABABABAAQgBgBAAgBQAAAAAAgBQAAAAABAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQAAABgBAAQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAgBAAQAAgBgBAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_169.setTransform(675.16,421.125);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQABAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABABQABAAABAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQABAAAAAAQAAAAAAAAQAAAAAAABQABAAAAABQABAAAAgBQAAAAABAAQAAgBABAAQAAAAABABQAAAAAAABQABAAAAAAQAAABAAAAQAAABgBAAQABAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQAAAAAAAAQgBAAAAABQgBAAgBAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAgBAAQgBgBAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_170.setTransform(675.1496,421.125);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#FFFFFF").s().p("AAAABQgBAAAAAAQgBAAAAAAQAAgBABAAQAAAAAAAAQABgBAAAAQAAAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAABAAQAAAAAAAAQAAABgBAAIgCABIAAgBg");
	this.shape_171.setTransform(535.2722,400.95);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQABAAAAABQAAgBAAgBQAAgBAAAAQAAgBABAAQAAAAABABQAAgBAAABQAAAAABAAQAAAAAAABQABAAAAABQAAgBABAAQAAgBABAAQAAAAAAAAQABAAAAABQABAAAAAAQAAABABAAQAAABgBAAQAAABAAABQABgBAAAAQABAAAAABQAAAAABAAQAAABAAABQAAAAAAAAQAAAAAAAAQgBABAAAAQgBAAgBAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQAAABgBAAQAAABAAAAQgBAAAAABQgBgBAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_172.setTransform(535.2611,400.99);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQABgBAAgBQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABABQAAAAABAAQAAAAAAgBQAAgBAAAAQAAgBABAAQAAAAABAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQAAgBABAAQAAAAABgBQAAAAABAAQAAABAAAAQABAAAAAAQABABAAAAQAAABAAAAQAAABgBAAQABAAAAABQABAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAgBAAQAAAAgBABQAAAAgBAAQABABAAAAQABAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBgBgBAAQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_173.setTransform(535.3,400.95);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AgBACQAAAAAAgBQgBAAAAAAQAAgBABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAAAgBABQAAAAAAABIgCAAIgBAAg");
	this.shape_174.setTransform(603.0571,402.03);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAgBABAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAgBAAAAQAAAAABAAQAAAAABgBQAAAAABAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABABQgBgBAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAgBQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAABAAABQAAAAABAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAAAAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQABABgBAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAIgBAAQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_175.setTransform(603.033,402.0325);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQABgBABAAQAAAAABABQAAAAAAAAQAAAAABABQAAAAAAABQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABAAQABABAAAAQAAABAAAAQAAABgBAAQAAABAAABQABgBAAAAQABAAAAABQABAAAAAAQABAAAAABQAAABAAAAQAAAAAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_176.setTransform(603.0325,402.05);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQgBAAAAgBQAAAAAAAAQABAAAAAAQABgBAAAAQAAAAAAgBQAAAAABABQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAAAQgBABAAABIgBABIgBgBg");
	this.shape_177.setTransform(688.7877,449.1929);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBAAgBQAAAAAAgBQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABgBQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABABAAAAQAAABAAAAQABAAABgBQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQABAAAAABQABAAAAAAQAAAAAAABQAAAAAAAAQAAAAAAAAQgBAAAAABQgBAAgBABIACABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQABABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAIgBAAQgBAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_178.setTransform(688.8036,449.1861);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("AAAAGQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAIgEgCQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQABAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAAAABgBQAAAAABAAQAAAAABAAQAAgBABABQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAABQABgBAAAAQABAAAAAAQABABAAAAQABAAAAABQAAABAAAAQAAAAAAAAQgBAAAAAAQgBABgBAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQAAABgBgBQAAAAgBAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_179.setTransform(688.8111,449.1886);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAAAAAQgBgBABAAQAAAAAAAAIABgBIABABQABAAAAAAQAAAAAAAAQABAAgBABQAAAAAAABIgCAAIAAAAg");
	this.shape_180.setTransform(581.5155,401.595);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBAAAAAAQgBABAAAAQgBgBAAAAQgBAAAAgBQgBAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAAAAAQABABABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAAAABQABAAAAABQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABABQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBABQABAAAAABQABAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABAAABQAAAAAAAAQgBABAAAAQAAAAgBAAIAAAAQgBAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_181.setTransform(581.5286,401.5756);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQgBABgBAAQAAAAgBgBQAAAAAAAAQgBgBAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAABABQAAAAAAAAQAAAAABABQAAAAAAABQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQAAABgBABQABAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABgBAAQABABAAAAQABABAAAAQAAABAAAAQAAAAgBABQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAgBABQAAgBgBAAQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_182.setTransform(581.5175,401.6);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAAAQAAAAABAAQABAAAAABQAAAAAAAAQAAAAAAABQAAAAAAAAIgCABIAAAAg");
	this.shape_183.setTransform(706.2967,441.7033);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQgBAAgBAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAgBAAAAQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAABABQAAgBAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAgBAAABQAAAAAAAAQAAAAABABQAAAAABABQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABABQABAAAAAAQAAABAAAAQAAABAAAAQAAABAAABQAAAAABAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABABAAAAQAAABABAAQAAABAAAAQgBAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAABgBAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_184.setTransform(706.29,441.7464);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQgBAAAAABQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAgBQgBAAgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQgBgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAAAABAAQAAAAABAAQAAAAABAAQABAAABAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAABABQAAAAAAABQABgBAAAAQAAAAABgBQAAAAABAAQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBABQABAAAAAAQABABAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBABAAAAQgBAAAAAAQgBgBAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_185.setTransform(706.2831,441.7);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#FFFFFF").s().p("AAAACIgBgBIAAgBQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAIgCACIAAgBg");
	this.shape_186.setTransform(725.795,455.8278);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAABAAQgBgBAAgBQgBAAAAgBQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAgBAAAAQAAABAAAAQABAAAAAAQAAABAAABQABgBAAAAQABgBAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQABABgEAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAAAQgBgBAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_187.setTransform(725.7955,455.8458);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAgBQAAAAgBAAQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAABABQABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQABAAAAABQAAgBABAAQAAgBABAAQAAAAAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABgBAAQAAABAAABQABgBAAAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQAAABgBAAQABAAAAABQABAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBAAQAAAAgBAAQgBAAgBAAQABABAAAAQAAABAAAAQgBABAAAAQgBAAAAAAIgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_188.setTransform(725.8125,455.8393);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQgBAAAAgBQAAAAAAAAQABAAAAAAQAAgBAAAAQABAAAAgBQAAAAAAABQABAAAAAAQABABAAAAQABAAAAAAQAAAAgBAAQAAABAAAAIgCACIgBgBg");
	this.shape_189.setTransform(619.6744,406.3627);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#FFFFFF").s().p("AAAAFQgBABAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABgBQgBAAAAgBQAAAAgBgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAABABQAAAAgBABQAAAAAAABQAAAAABAAQABAAAAAAQAAABAAAAQABABAAAAQAAAAAAAAQAAABAAAAQgBAAAAAAQgBAAgBAAQABAAAAABQABABAAAAQAAABAAAAQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAABAAAAQgBABAAAAQAAABAAAAQgBAAAAAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_190.setTransform(619.6325,406.367);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#FFFFFF").s().p("AAAAFQAAABgBABQAAABgBAAQAAAAgBAAQAAAAgBAAQAAgBgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQgBABAAAAQgBAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAgBgBQAAAAAAgBQgBAAABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQABAAAAAAQAAAAAAAAQAAABABAAQAAABAAAAQAAAAABgBQAAAAABAAQAAgBABABQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAABQgBAAAAABQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQABAAAAABQABABAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQADADgEABQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAgBg");
	this.shape_191.setTransform(619.65,406.35);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#FFFFFF").s().p("AAAABQgBAAAAAAQgBAAAAgBQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAAAQgBABAAAAIgCABIAAgBg");
	this.shape_192.setTransform(596.8921,408.805);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#FFFFFF").s().p("AgBAGQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQABAAABgBQAAAAABAAQAAAAABAAQAAABABAAQAAgBAAAAQgBgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQABABAAAAQAAABAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAABgBAAQABAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBABQABAAAAAAQAAABABAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBAAgBAAQAAAAgBgBQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBgBAAg");
	this.shape_193.setTransform(596.9214,408.7786);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQAAABgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABAAQgBAAgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQABAAABABQAAAAAAABQAAAAAAABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQgBAAAAAAQAAAAgBABQAAAAgBAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBAAIAAAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_194.setTransform(596.9214,408.7681);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAAAAAAAQABAAAAAAIACABQAAAAAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIgCABIAAAAg");
	this.shape_195.setTransform(613.0417,394.6967);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQABABABAAQgBgBAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAABABQAAgBAAAAQABAAAAgBQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQABAAABAAQAAABAAAAQABAAgBABQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAAAQgBgBAAAAQAAABAAAAQgBABAAAAQAAABAAAAQgBAAAAAAIgBAAQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_196.setTransform(613.0286,394.675);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAAAgBAAQAAABgBgBQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQABAAAAAAIgEgCQAAgBAAgBQABAAAAAAQAAAAABAAQAAAAABAAQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABABQABAAAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAABABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAgBAAQAAAAgBABQAAAAgBAAQABAAABABQAAAAAAABQABAAgBABQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAABAAAAQgBAAAAABQAAAAgBAAIgBAAQgBAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_197.setTransform(613.0286,394.6839);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#FFFFFF").s().p("AAAABQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBQABAAAAAAQAAAAAAAAQAAAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQAAAAAAAAQAAABAAAAIgCABIAAgBg");
	this.shape_198.setTransform(669.725,404.5625);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#FFFFFF").s().p("AgBAGQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAABAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQAAAAABAAQABABABAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABgBAAABQAAAAAAAAQAAAAAAABQABAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAAAABQgBAAAAAAQgBABgBAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAgBAAIAAACQAAAAAAAAQAAAAgBAAQAAAAAAAAQAAAAgBAAIgBAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQgBgBAAAAg");
	this.shape_199.setTransform(669.7325,404.5419);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBABAAQgBAAgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAQABgBAAAAQABAAAAABQABAAAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAgBABABQAAAAAAAAQAAAAAAABQABAAAAABQAAgBABAAQABAAAAgBQABAAAAAAQAAAAABABQAAAAABABQAAAAAAABQAAAAAAABQgBAAAAABQABAAAAAAQABAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAABgBAAQABABABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_200.setTransform(669.7208,404.5464);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAAAAAgBQgBAAABAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAABAAQAAABgBAAQAAAAAAABIgCAAIgBAAg");
	this.shape_201.setTransform(663.9121,441.7804);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBAAAAAAQAAABgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAABAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABAAQAAABABAAQAAgBAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABgBAAQABAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAgBQgBAAAAgBQAAABAAAAQgBABAAAAQAAABAAAAQgBAAAAABQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_202.setTransform(663.8825,441.8);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#FFFFFF").s().p("AAAAGQAAABgBAAQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQgBABgBAAQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQAAAAABAAQAAAAABAAQABAAABAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQABAAAAAAQAAAAAAAAQAAAAAAABQABAAAAABQABgBAAAAQAAAAABgBQAAAAABAAQAAABABAAQAAAAAAAAQABABAAAAQAAABAAAAQgBABAAABQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAgBAAQAAAAgBABQAAAAgBABQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQgBAAAAgBQAAABgBABQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_203.setTransform(663.8964,441.8);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQgBAAAAgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQAAABgBABIgBABIgCgBg");
	this.shape_204.setTransform(635.5595,457);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAgBQAAAAABAAQAAAAAAAAQABgBABAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQAAgBAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAgBAAAAQAAAAABABQAAAAAAABQAAAAAAABQABgBAAAAQABAAAAAAQABgBAAABQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAAAQABAAAAAAQAAAAABAAQAAABAAABQAAAAAAAAQAAAAgBAAQAAAAgBABQAAAAgBABQABAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgBAAgBgBQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_205.setTransform(635.5746,456.9889);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAABgBAAQAAgBgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABAAQgBAAgBgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAgBABABQAAAAAAAAQAAAAAAABQAAAAABABQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABABQAAAAAAAAQAAABAAAAQABABgBAAQAAABAAABQABgBAAAAQABAAAAAAQABABAAAAQABAAAAABQAAABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBABQABAAAAABQABAAAAABQAAAAAAABQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_206.setTransform(635.5889,456.9964);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAgBgBQAAAAAAAAQAAAAABAAQAAgBABAAQAAAAAAgBQAAAAABABQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABQgBAAAAABIgCABIAAgBg");
	this.shape_207.setTransform(678.9783,448.0379);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAAAQAAABgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAgBABAAQgBAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAABAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABABABAAQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAABAAQAAAAAAAAQAAAAAAAAQABABAAAAQAAABABAAQAAAAAAAAQABgBAAAAQABAAAAAAQABAAABAAQAAABAAAAQAAAAAAABQAAAAAAABQAAABgBAAQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBAAAAAAQgBABgBAAQABAAAAABQABAAAAABQAAAAAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAgBgBQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAIgCAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_208.setTransform(678.9825,448.0361);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBABQAAAAgBAAQAAABAAgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABABABAAQAAgBgBAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABABQAAAAAAAAQAAAAABABQAAAAAAABQABgBAAAAQAAAAABAAQAAgBABABQAAAAABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBABQABgBABAAQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAAAAAAAQgBABgBAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAg");
	this.shape_209.setTransform(678.975,448.05);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQAAAAAAABQAAAAgBAAQAAAAAAABQAAAAAAAAQAAAAgBAAQAAAAAAAAIgBAAg");
	this.shape_210.setTransform(600.505,437.1917);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#FFFFFF").s().p("AgBAGQAAAAAAABQgBAAAAAAQgBABAAAAQAAAAgBgBQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABABABAAQgBgBABAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAAAAAQAAABAAAAQAAAAABABQAAAAABABQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQABABAAAAQABABAAABQAAAAAAAAQAAABAAAAQgBABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAgBAAQAAgBAAAAQAAAAAAgBQgBgBAAAAg");
	this.shape_211.setTransform(600.49,437.175);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#FFFFFF").s().p("AAAAFQAAABgBABQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAgBQABAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAIAEACQAAABAAAAQAAAAgBAAQAAAAAAAAQgBABgBAAQABAAAAABQABAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAgBg");
	this.shape_212.setTransform(600.4754,437.2);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBAAAAgBQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAABAAQAAAAAAAAQAAABgBAAIgCABIgBgBg");
	this.shape_213.setTransform(709.6717,451.9625);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#FFFFFF").s().p("AAAAGQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQAAgBABAAQgBAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAABgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAABQABgBAAAAQABAAABAAQAAAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQAAABAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABABAAQAAABAAAAQABABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABgBABQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBg");
	this.shape_214.setTransform(709.6746,451.9625);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQAAAAgBABQAAAAgBAAQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABgBQgBABAAAAQgBAAAAAAQgBAAAAgBQAAgBgBAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABAAQgBgBAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAABABQAAAAABgBQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAAAQAAABAAAAQgBABAAABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQABABAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAAAAAABQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAABgBAAQAAABAAAAQAAAAgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAAAgBg");
	this.shape_215.setTransform(709.675,451.9417);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#FFFFFF").s().p("AAAACQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAAAABQgBAAAAAAIgCABIAAAAg");
	this.shape_216.setTransform(554.975,399);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#FFFFFF").s().p("AAAAFQgBABAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABgBQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQAAAAABABQAAAAAAAAQAAABABAAQAAABABAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAIACAEQgBABAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABAAABQAAAAAAAAQgBAAAAAAIgCABQAAAAAAgBQAAAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_217.setTransform(554.9964,399.01);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#FFFFFF").s().p("AAAAGQAAAAgBAAQAAABgBAAQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAgBQAAAAABgBQgBAAAAAAQgBAAgBAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQgBgBgBAAQAAAAAAgBQgBAAABgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAABAAQAAAAABABQAAgBAAgBQAAAAAAAAQABgBAAAAQAAAAAAAAQABgBABAAQAAABAAAAQAAAAAAAAQABABAAABQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAABQABAAAAABQABAAAAABQAAAAAAABQgBAAAAABQABgBAAAAQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQAAABgBAAQABAAAAABQAAAAABABQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_218.setTransform(555,399.0458);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#FFFFFF").s().p("AgBgBQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAAAgBAAQAAABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQgBAAAAAAQABAAAAgBg");
	this.shape_219.setTransform(728.9208,436.375);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#FFFFFF").s().p("AgBAGQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAgBABAAQgBAAgBAAQgBAAAAgBQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABgBABAAQgBAAAAgBQAAAAgBgBQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAABABQgBgBAAgBQAAAAABAAQAAgBAAAAQABAAABAAQAAAAAAAAQAAAAAAAAQAAAAABABQAAABABAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBAAgBAAQABABAAAAQAAABABABQAAAAAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQAAAAgBgBQAAABAAABQAAAAAAAAQAAABAAAAQgBAAAAAAIgBAAQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBgBAAg");
	this.shape_220.setTransform(728.9325,436.375);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#FFFFFF").s().p("AAAAGQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABgBQgBAAgBAAQAAABgBgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBgBAAQAAAAAAgBQgBAAABgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQABAAABABQgBgBAAgBQAAAAAAgBQAAAAAAAAQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAQABABAAAAQAAAAABgBQAAAAABAAQAAgBABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQABAAAAAAQABAAABABQAAAAAAAAQABABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBABQABAAAAABQAAAAABAAQAAABAAABQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAIgBAAQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_221.setTransform(728.9464,436.3792);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#FFFFFF").s().p("AgBABQgBAAAAgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQAAAAgBABQAAAAgBABIgBAAIgBgBg");
	this.shape_222.setTransform(44.85,486.1321);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#FFFFFF").s().p("AgCAEQgBAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQAAAAAAABQAAAAAAABQABAAABAAQAAgBABAAQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAABgBAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAIgDgBQgBABAAABQAAAAgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_223.setTransform(44.8425,486.15);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#FFFFFF").s().p("AgDAEQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQAAAAABgBQAAAAAAgBQABAAAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBAAAAQABAAAAAAQABgBAAABQABAAAAAAQABABAAAAQAAAAAAgBQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAABQABgBAAAAQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAAAgBABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQAAABgBAAQAAABAAAAQAAAAAAABQgBAAgBAAQAAAAgBgBQAAABAAAAQABABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAABgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBg");
	this.shape_224.setTransform(44.8575,486.1214);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#FFFFFF").s().p("AgBABQgBAAAAgBQAAAAABAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAAAQABAAAAAAQABABAAAAQAAAAAAAAQABAAgBAAQAAAAAAABQAAAAAAABIgCAAIgBgBg");
	this.shape_225.setTransform(64.1388,477.1783);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#FFFFFF").s().p("AgBAHQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAAgBQgBABgBAAQAAABgBAAQAAAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBABAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBIAEgBQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQABAAAAAAQAAAAABABQAAAAAAAAQABAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQABABABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQAAAAgBgBQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_226.setTransform(64.1186,477.1542);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#FFFFFF").s().p("AgBAHQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAABAAQAAAAABAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAABQAAAAABABQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQABAAAAAAQAAABABAAQAAABAAAAQAAABAAAAQAAAAABgBQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAABgBAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAIgEACQABABAAAAQAAAAAAABQAAAAgBAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_227.setTransform(64.1286,477.1292);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#FFFFFF").s().p("AgBABQAAAAgBAAQAAgBAAAAQAAAAABAAQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQAAAAAAAAQABAAAAAAQAAAAAAAAQAAAAgBAAIgBABIgBABIgBgBg");
	this.shape_228.setTransform(21.2512,470.5833);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#FFFFFF").s().p("AgDAEQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQABgBAAAAQABgBAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQABAAABAAQgBAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAABQAAgBABAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAQAAAAAAAAQAAAAAAABQAAAAAAAAIgCACQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQABAAAAAAQAAABAAAAQAAAAgBABQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAABQgBAAAAAAQAAABAAAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBg");
	this.shape_229.setTransform(-9.4714,469.8458);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#FFFFFF").s().p("AgBABQAAAAgBgBQAAAAAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAgBABQAAAAAAABIgCAAIgBgBg");
	this.shape_230.setTransform(30.85,418.4944);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#FFFFFF").s().p("AAAAIQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAgBABgBQgBABgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAABAAQAAAAABAAQAAgBgBAAQAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAABAAAAQABABAAAAQAAAAAAABQABAAAAABQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAABAAABQABAAAAABQAAAAgBAAQAAABAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBQAAABAAABQAAAAAAABQgBAAAAAAQAAABAAAAIAAgBg");
	this.shape_231.setTransform(30.8436,418.46);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#FFFFFF").s().p("AgDAFQAAABgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAgBQABAAAAgBQAAAAABgBQAAAAABAAQAAAAAAABQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABgBAAAAQABAAAAAAQABABAAAAQAAABABAAQAAAAAAgBQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAABAAAAQABAAAAAAQABgBAAAAQABAAAAABQAAAAAAABQABAAAAAAQAAAAAAABQAAAAgBABQAAAAgBABQABAAABAAQAAAAAAAAQAAAAABABQAAAAgBAAQAAABAAABQAAAAAAAAQgBABAAAAQgBAAgBgBIAAAEQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABAAABQgBAAAAABQAAAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_232.setTransform(30.8506,418.4714);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAgBAAABQABAAAAAAQABAAAAAAQAAABAAAAQABAAAAABQgBAAAAAAQAAABgBAAIgBABIgBgCg");
	this.shape_233.setTransform(46.4071,431.0121);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#FFFFFF").s().p("AgCAFQgBAAAAABQgBAAgBAAQAAAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQABgBAAAAQAAgBABAAQgBgBgBAAQAAAAgBgBQAAAAAAAAQAAAAABAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAgBQAAAAAAAAQAAAAAAgBQABAAABABQAAAAABAAQAAAAAAAAQAAABABABQAAAAAAABQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABgBAAQAAAAAAABQAAAAgBAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAABQAAAAAAABQgBAAAAAAQAAABAAAAQgBgBgBAAQAAAAAAgBQgBAAAAgBQAAAAABgBg");
	this.shape_234.setTransform(46.3811,430.9958);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#FFFFFF").s().p("AgBAIQgDABABgEQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQgBAAAAgBQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABABQgBgBAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAABQABAAAAABQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAABQAAAAABABQAAAAAAAAQABABgBAAQAAABAAAAQgBAAgBABQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAgBAAQAAABABABQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_235.setTransform(46.3786,430.9968);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#FFFFFF").s().p("AAAACQgBgBAAAAQgBgBAAAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAgBAAAAQABAAAAABQABAAAAABQAAAAABAAQAAAAAAAAQAAABgBAAQAAABAAAAIgCABIAAgBg");
	this.shape_236.setTransform(43.2446,411.5256);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#FFFFFF").s().p("AgCAFQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQgBAAgBgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAAAABAAQABgBAAAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAAAQABAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQAAAAABAAQAAABAAAAQAAABgBAAQABAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQABAAABABQAAAAAAAAQABAAAAAAQAAAAAAABQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAABAAAAQgBABAAAAQAAAAAAAAQAAABgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_237.setTransform(43.2675,411.55);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAgBAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAAAAAAAQABgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQAAgBAAgBQAAAAAAgBQABAAAAAAQAAAAABAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAgBABQABAAABAAQAAgBABAAQAAAAABABQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAABgBAAQABAAABAAQAAAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQgBABgBAAQAAgBgBAAQAAABAAABQABAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABgBAAQAAABAAAAQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_238.setTransform(43.2589,411.5292);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#FFFFFF").s().p("AgBABQgBAAAAgBQAAAAAAAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAAAQAAAAgBAAQAAABgBAAIgBABIgBgBg");
	this.shape_239.setTransform(-2.25,491.3175);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#FFFFFF").s().p("AgCAFQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAAAAAgBQABAAAAAAQAAgBABAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAIADAAQABAAAAgBQAAAAAAgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAABQgBAAAAABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQAAABgBgBQAAAAgBAAQAAgBgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQABgBAAAAg");
	this.shape_240.setTransform(-2.2469,491.275);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQABgBAAAAQABAAABAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABAAQABgBAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABgBABQABgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBABQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAABAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAABgBAAQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAg");
	this.shape_241.setTransform(-2.2286,491.2958);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAAAgBQABAAAAAAQAAgBAAABQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABAAAAIgCABIgBgCg");
	this.shape_242.setTransform(106,401.9621);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQABAAAAAAQAAAAABAAQAAAAABAAQAAABAAAAQAAgBABAAQAAgBAAAAQAAAAAAAAQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQABgBABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAgBABIgBABQABAAAAABQABAAAAAAQABAAAAAAQAAABAAAAIgEACQABABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQgBABAAABQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQgBAAAAgBg");
	this.shape_243.setTransform(106,401.9639);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAABgBQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBABAAIgCgBIAAgBQAAAAAAgBQAAAAAAAAQABgBABAAQAAABABAAQAAgBAAAAQgBgBAAAAQABgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABABAAAAQABABAAAAQAAAAAAgBQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQABAAAAAAQABgBAAAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQgBABAAAAQgBAAAAgBQgBAAAAAAQgBgBAAgBQAAABAAABQgBAAAAABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_244.setTransform(105.9911,401.9746);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAABgBAAIgBAAIgBAAg");
	this.shape_245.setTransform(49.8506,406.595);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#FFFFFF").s().p("AgCAFQgBAAgBABQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAgBABAAQAAAAAAgBQAAAAAAAAQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAABQABAAABgBQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQABABAAAAQABAAAAAAQAAAAABAAQAAABAAAAQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBgBQAAABAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAAAgBgBQAAAAAAAAQgBgBABAAQAAgBAAgBg");
	this.shape_246.setTransform(49.8714,406.6);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#FFFFFF").s().p("AgDAEQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQgBAAgBAAQAAgBAAAAQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAABAAQAAAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAABgBQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQABAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBABQAAAAABABQAAAAAAABQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQgBABAAAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_247.setTransform(49.875,406.6);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#FFFFFF").s().p("AgBABQAAAAgBgBQAAAAABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAgBABABQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAABQgBAAAAAAQAAABgBAAIgBAAIgBgBg");
	this.shape_248.setTransform(70.7861,413.0655);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#FFFFFF").s().p("AAAAIQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQgBAAgBABQAAAAgBAAQAAgBgBAAQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAABAAABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQABAAAAABQABAAAAAAQABAAAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAAAAAAAIAAAAg");
	this.shape_249.setTransform(70.767,413.0825);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#FFFFFF").s().p("AgDAFIgEAAQAAgBAAAAQgBgBABAAQAAgBAAAAQABgBABAAQgBAAgBAAQAAgBAAAAQgBAAAAAAQAAAAAAgBQAAgBAAAAQABAAAAAAQABgBAAAAQABABABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABABAAAAQAAABABAAQAAAAAAgBQAAgBAAAAQABAAAAAAQAAAAABAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAgBABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAgBABQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBgBQABABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBg");
	this.shape_250.setTransform(70.775,413.0714);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#FFFFFF").s().p("AgBABIAAgBIABgBQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAABAAQAAAAgBAAQAAABAAAAQAAAAgBABIgBAAIgBgBg");
	this.shape_251.setTransform(86.1292,400.7095);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAgBQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABgBAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABABABAAQAAABAAAAQAAABABAAQAAAAgBABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQABABABAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAABAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgBgBg");
	this.shape_252.setTransform(86.1036,400.7036);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBABQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAgBQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQABgBAAABQABAAAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQABgBAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQABABAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAgBAAQAAAAgBAAQAAABABAAQAAABAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBgBAAAAQAAAAgBABQAAAAAAABQAAAAAAAAQAAAAgBAAIAAAAg");
	this.shape_253.setTransform(86.1214,400.7161);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBgBABAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBABAAQAAABAAAAQABAAAAABQAAAAAAAAQABAAgBAAQAAAAAAABQAAAAgBABIgBABIgBgCg");
	this.shape_254.setTransform(84.8655,416.8127);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#FFFFFF").s().p("AgCAFQgBABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAABABIABgDQABAAAAABQABAAAAAAQAAABABAAQAAABAAABQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQABAAgBABQAAAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAIgDACQAAABAAAAQABABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQgBAAAAABQAAABgBAAQAAAAAAABQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_255.setTransform(84.883,416.825);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#FFFFFF").s().p("AgDAGQgBAAAAgBQgBAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAAAABgBQAAAAABgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQAAgBABgBQAAAAABAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAIACgDQAAABABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAABAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABgBABQAAAAAAAAQgBABAAAAQgBAAgBgBQABABAAAAQAAABAAAAQAAABgBABQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABgBAAQAAABAAAAQAAAAAAAAQAAABgBAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAg");
	this.shape_256.setTransform(84.883,416.8);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAAAAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAgBABABQAAAAABAAQAAAAAAABQAAAAABAAQAAAAAAAAQAAABgBAAQAAAAAAABIgCABIgBgCg");
	this.shape_257.setTransform(58.8756,413.2873);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#FFFFFF").s().p("AgBAJQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQABAAABgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQAAgBABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQAAgBABAAQAAgBABAAQAAAAAAABQABAAAAABQABgBAAAAQAAgBAAAAQAAAAABgBQAAAAAAABQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAABAAAAIgBAAg");
	this.shape_258.setTransform(58.9036,413.2996);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQgBAAAAABQgBAAAAAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAgBgBAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAgBAAAAQgBgBAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAABQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAAAABQAAAAABAAQAAAAABAAQAAABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAgBQgBAAgBAAQAAABABAAQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAAAQAAgBgBAAQAAgBgBAAQAAAAAAABQgBAAAAABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_259.setTransform(58.892,413.2811);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBABAAQAAABAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAgBABIgBABIgBgBg");
	this.shape_260.setTransform(-42.975,431.4181);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAgBQAAAAAAAAQgBgBAAgBQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQABAAAAAAQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAABgBQAAAAAAgBQAAAAAAAAQAAAAABAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQABgBAAAAQABAAABAAQAAAAAAAAQABAAAAABQAAABABAAQAAAAAAABQgBAAAAABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAABABAAQAAABAAAAQAAABAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBAAAAgBQAAAAAAgBQgBAAAAABQgBAAAAABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_261.setTransform(-42.95,431.4286);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAQgBgBAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAABgBQABAAAAAAQABAAAAABQAAAAABABQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBABQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAABIgBACQgBAAAAAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQABABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAgBAAQAAgBAAAAQgBgBAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_262.setTransform(-42.9746,431.4325);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQAAgBAAAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAAAABQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAABgBAAIgBABIgBgCg");
	this.shape_263.setTransform(-4.1967,444.2222);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#FFFFFF").s().p("AgCAFQgBAAgBABQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAgBABAAQAAgBAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAABAAAAQgBABAAAAQAAABgBAAIADACQAAABgBAAQAAABAAAAQgBAAgBAAQAAAAgBgBQAAABABABQAAABAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAABAAAAQgBgBgBAAQAAAAAAgBQgBAAAAgBQAAAAABgBg");
	this.shape_264.setTransform(-4.1536,444.25);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#FFFFFF").s().p("AgDAEQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQABgBAAAAQAAAAABgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQABABAAAAQAAgBAAgBQgBAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAABQABAAAAAAQAAABABAAQAAABAAAAQgBABAAAAQgBAAgBABQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAABQgBAAAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQgBABgBAAQAAAAgBAAQAAABAAgBQgBAAAAAAQgBgBAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQgBgBAAgBg");
	this.shape_265.setTransform(-4.1964,444.25);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAAAAAQABAAAAAAQAAgBABAAIACAAQAAAAAAABQABAAgBAAQAAAAAAABQAAAAAAABIgCAAIgBgBg");
	this.shape_266.setTransform(-4.3121,432.0917);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQgBgBAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAAAAAgBQABAAAAAAQABgBAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQABgBAAAAQABAAAAAAQABAAAAABQAAAAAAABQABgBAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABABABAAQAAAAAAABQABAAAAABQAAAAgBABQABAAABAAQABgBAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAABQAAAAAAAAQAAABgBAAQAAAAgBAAQgBABgBAAQABAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAABgBAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQgBAAAAgBg");
	this.shape_267.setTransform(-4.2969,432.05);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBABQgBAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAAAAAgBQABAAAAgBQAAAAAAAAQABAAAAgBQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABAAAAABQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQABABAAAAQAAAAAAABQAAABAAAAQABAAAAAAQABgBAAAAQABAAAAABQAAAAAAAAQABABAAAAQAAABAAAAQAAAAgBABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAABQAAAAgBABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAgBgBQABABAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAABQAAAAAAAAQAAAAgBAAIAAAAg");
	this.shape_268.setTransform(-4.2925,432.0675);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#FFFFFF").s().p("AgBABQgBgBAAAAQAAAAAAAAQABAAAAgBQAAAAABAAQAAAAAAAAQAAgBABABQAAAAAAAAQABAAAAAAQAAABABAAQAAAAAAAAQAAABgBAAQAAABAAAAIgCAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQAAgBAAAAg");
	this.shape_269.setTransform(21.4783,429.2081);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBABgBQgBABgBAAQgBAAAAAAQgBAAAAAAQAAAAAAgBIAAgCIABgBQgBAAgBgBQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAABQABgBAAAAQABAAABAAQAAAAAAABQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQgBAAAAABIACABQAAABAAABQgBAAAAAAQgBABAAAAQgBAAgBgBQAAABABAAQAAABAAAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAAAAAAAQgBAAgBAAQAAgBgBAAQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAAAAAIgBAAg");
	this.shape_270.setTransform(21.49,429.175);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBAAgBQAAABgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQgBgBAAAAQgBgBAAAAQgBAAAAAAQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAABAAQAAAAABAAQAAgBgBgBQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAQABABAAAAQAAABABAAQAAAAAAgBQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAABAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBgBQABABAAAAQAAABAAABQAAAAAAAAQgBABAAAAQgBAAAAABQAAAAgBgBQAAAAgBAAQAAgBgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_271.setTransform(21.476,429.175);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAgBQgBAAABAAQAAAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQABAAgBABQAAAAAAAAQAAABgBAAIgBAAIgBAAg");
	this.shape_272.setTransform(7.8345,457.25);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBAAgBAAQgBABAAAAQgBAAAAgBQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQgBgBgBAAQAAgBgBAAQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQABgBAAAAQABAAABAAQgBAAAAgBQAAgBAAAAQAAAAAAgBQABAAAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAAAQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAQAAAAgBABQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAAAAAQgBAAgBAAQAAAAgBgBQAAABAAAAQAAABAAAAQAAAAgBAAQAAAAAAAAIgBAAg");
	this.shape_273.setTransform(7.825,457.2375);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBgBQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABABQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABgBAAAAQABAAAAAAQABABAAAAQABAAAAABQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQABgBAAAAQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQABAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBgBAAAAQgBAAAAgBQAAABAAAAQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_274.setTransform(7.825,457.25);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAgBABIgBAAIgBAAg");
	this.shape_275.setTransform(32.7467,449.8425);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#FFFFFF").s().p("AgCAFQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAAAQABgBAAAAQAAgBABgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAABAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQABAAABgBQAAAAABAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAABgBABQAAAAAAABQgBAAAAgBQgBAAgBgBQAAABABABQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQAAAAgBAAQAAgBgBAAQAAAAAAgBQgBABAAAAQAAABAAAAQgBAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_276.setTransform(32.7431,449.85);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBAAQgBABAAAAQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAgBQABAAAAgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQAAAAABAAQAAgBAAAAQgBgBAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABgBAAAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQABAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBg");
	this.shape_277.setTransform(32.7375,449.85);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAgBAAABQABAAAAAAQABAAAAAAQAAABAAAAQABAAAAAAQgBAAAAABQAAAAgBABIgBABIgBgCg");
	this.shape_278.setTransform(17.6621,456.1121);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAgBQAAAAAAAAQAAgBAAAAQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAgBABAAQAAgBAAAAQAAAAAAAAQABAAAAAAQABAAABAAQAAAAAAAAQABABAAAAQAAABgBABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQABABAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAQAAAAAAABQgBAAgBAAQAAAAgBAAQAAAAABABQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAABAAABQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAgBgBQAAAAAAgBg");
	this.shape_279.setTransform(17.6639,456.125);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBgBQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAgBAAAAQABgBAAAAQABAAAAAAQABAAABABQgBgBAAAAQAAgBAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQgBAAAAABQABAAAAgBQABAAABAAQAAABABAAQAAAAABABQAAABAAAAQAAAAAAABQAAAAgBAAQAAABgBAAQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAAAABABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBgBQAAAAAAAAQgBgBAAgBQAAABgBABQAAAAAAABQAAAAAAAAQgBABgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBg");
	this.shape_280.setTransform(17.675,456.1);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#FFFFFF").s().p("AgBACQAAgBgBAAQAAAAAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAAAQgBABAAAAQAAAAgBABIgBAAIgBAAg");
	this.shape_281.setTransform(70.17,433.93);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#FFFFFF").s().p("AgDAFQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQgBAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQABgBAAAAQAAgBAAAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAABAAAAQgBABAAAAQAAABgBAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABQAAABgBAAQAAABgBAAQAAAAAAAAQgBAAgBAAQABABAAAAQAAABAAABQAAAAAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQAAgBgBAAQAAAAgBgBQAAABAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAgBgBQAAAAAAgBg");
	this.shape_282.setTransform(70.1639,433.95);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQgBgBgBAAQAAgBAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAABABQAAAAAAABQAAgBABAAQAAAAABAAQAAAAABABQAAAAABABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQABAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAABgBAAQAAAAAAABQgBAAgBAAQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBgBAAAAQgBAAAAgBQAAABgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAgBAAAAg");
	this.shape_283.setTransform(70.175,433.95);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBgBABAAQAAAAAAAAQAAgBABAAQAAAAAAgBQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAAAQABAAgBAAQAAABAAAAQAAABgBAAIgBABIgBgCg");
	this.shape_284.setTransform(8.3345,422.55);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQgBABAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQABAAAAAAQAAgBAAAAQAAgBAAgBQAAAAAAAAQAAgBAAAAQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABgBAAAAQAAgBAAAAQAAAAAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAABAAABQABgBABAAQAAgBAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQABAAAAABQABAAAAAAQAAAAABAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAgBAAQAAAAgBAAQAAAAABABQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBgBQAAABAAABQAAAAAAABQgBAAAAAAQAAAAAAAAIgBAAg");
	this.shape_285.setTransform(8.3639,422.5781);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#FFFFFF").s().p("AgDAFQgBAAAAAAQgBABAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAABAAQAAAAABAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAABAAQAAgBABABQABAAAAAAQABAAAAABQAAABAAAAQAAAAAAABQAAAAgBAAQAAABgBAAQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBgBQABABAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAABQgBAAAAAAQgBgBAAAAQAAgBgBgBQAAABAAABQAAAAgBABQAAAAAAAAQAAABgBAAQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAAAAAgBg");
	this.shape_286.setTransform(8.3361,422.55);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAAAQgBABAAAAQAAABgBAAIgBAAIgBgBg");
	this.shape_287.setTransform(54.9621,428.0467);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#FFFFFF").s().p("AgBAIQAAAAAAAAQgBAAAAAAQAAgBAAgBQgBAAAAgBQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAABAAQAAAAABAAQgBAAAAgBQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAQABABAAAAQABABAAAAQAAABAAAAQABAAgBABQABAAABAAQABgBAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAgBgBAAQAAAAAAgBQgBABAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgBgBg");
	this.shape_288.setTransform(54.96,428.0036);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#FFFFFF").s().p("AgDAEQAAABgBAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAABgBQAAAAAAAAQABgBABAAQgBAAgBgBQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQABAAAAAAQAAgBAAgBQAAgBAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABgBQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAABgBQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAABgBAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAgBAAgBg");
	this.shape_289.setTransform(54.9746,428.05);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#FFFFFF").s().p("AgBACIAAgCIABgBQAAAAAAAAQAAgBAAAAQABAAAAABQABAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABAAAAIgCAAIgBAAg");
	this.shape_290.setTransform(71.695,418.45);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAAAQAAgBAAgBQAAAAAAgBQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQAAAAABAAQAAgBAAAAQAAgBAAAAQABAAAAgBQABABABAAQAAAAAAABQABAAAAABQAAABgBAAQABAAABgBQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABAAgBQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgBgBg");
	this.shape_291.setTransform(71.7139,418.4536);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQgBAAgBgBQAAAAgBAAQAAAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQABAAABABQgBgBAAAAQAAgBAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABAAAAABQABAAAAAAQAAABABAAQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAgBABAAQABAAAAAAQABABAAAAQAAAAABABIgCADQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBgBQAAABAAAAQABABAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAgBABQAAAAAAABQAAAAAAAAQAAAAgBAAIAAAAg");
	this.shape_292.setTransform(71.7139,418.475);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBAAAAgBQABAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABIABAAIgCACIgBAAIgBgBg");
	this.shape_293.setTransform(12.7429,464.9533);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#FFFFFF").s().p("AgCAFQgBABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQABAAAAgBQABAAAAABQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAABAAQAAABAAAAQABABAAAAQAAABgBABQABAAABgBQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAABgBAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBgBAAQAAAAAAABQAAABAAAAQgBAAAAABQAAAAAAAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_294.setTransform(12.7036,464.975);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBgBQAAAAAAAAQAAAAAAgBQABgBAAAAQAAAAABgBQAAAAABAAQABABAAAAQAAgBAAgBQgBAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABgBAAABQABAAAAAAQABABAAAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQABABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAABgBQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQABAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAABQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABgBAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAgBgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBg");
	this.shape_295.setTransform(12.7175,464.95);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#FFFFFF").s().p("AgBABIAAgCQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAgBABQAAAAAAAAQAAABgBAAIgBAAIgBgBg");
	this.shape_296.setTransform(122.2333,418.8719);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#FFFFFF").s().p("AAAAIQgBAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAgBQAAABgBAAQAAAAgBAAQAAAAgBgBQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQgBgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAgBABABQAAAAABAAQAAABABAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQABAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAABgBABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQABABABAAQAAAAAAAAQABAAAAAAQAAABAAAAIgEACQABABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAIAAAAg");
	this.shape_297.setTransform(122.225,418.8686);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#FFFFFF").s().p("AgDAFIgEAAQAAAAAAgBQgBAAABgBQAAgBAAAAQABgBABAAQgBAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQAAAAABAAQABAAAAAAQABAAAAAAQAAAAAAABQAAAAABABQAAAAAAABQAAAAABgBQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAgBAAQAAABABABQAAAAAAABQgBAAAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQgBAAAAgBQgBABAAAAQAAABAAAAQAAAAAAAAQAAABgBAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_298.setTransform(122.2325,418.85);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAABABQAAAAAAAAQABAAAAABQgBAAAAAAQAAABgBAAIgBAAIgBgBg");
	this.shape_299.setTransform(92.6121,424.9494);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBABgBQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQgBAAABgBQAAAAAAgBQABAAABAAQgBgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAgBQgBgBAAAAQABgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAABQAAAAABABQAAAAgBABQAAAAAAABQgBAAAAABQAEAAgBABQgBABAAAAQAAAAgBABQAAAAgBAAQAAAAgBABQABAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAABQgBAAAAABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_300.setTransform(92.6402,424.9286);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#FFFFFF").s().p("AgDAFQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAgBABAAQgBAAgBgBQAAAAgBAAQAAAAAAAAQAAAAAAgBQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABABQgBgBAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQAAgBABABQAAAAABAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABABQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAgBABAAQAAAAABABQAAAAABABQAAAAAAABQAAAAAAAAQAAABgBAAQAAABgBAAQABAAABAAQAAAAABAAQAAAAAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQAAAAABABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAABQgBAAAAgBQgBAAAAAAQgBgBAAAAQgBAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_301.setTransform(92.625,424.9464);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAAAAAAAQAAABgBAAQAAAAAAABIgCAAIgBgBg");
	this.shape_302.setTransform(107.93,412.575);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#FFFFFF").s().p("AgBAIQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAgBQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQABAAABgBQgBAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQABAAAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAABQgBAAAAAAQgBABAAAAQgBAAAAgBQAAABAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgBgBg");
	this.shape_303.setTransform(107.95,412.5542);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FFFFFF").s().p("AgCAIQAAAAAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQgBABgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBABAAQgBAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQABAAAAgBQAAAAAAAAQABgBAAAAQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAABQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQAAAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAABgBQABAAAAAAQAAAAABAAQAAABAAAAQABABAAAAQAAAAAAABQAAAAgBABQAAAAAAABQAAAAABAAQAAAAAAAAQAAAAABABQAAAAgBABQAAAAAAABQAAAAAAAAQgBAAAAABQgBAAgBAAQAAAAABABQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBgBQAAAAgBgBQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAAAAAIgCAAg");
	this.shape_304.setTransform(107.95,412.5839);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAgBAAAAQABABAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAABgBAAIgBABIgBgBg");
	this.shape_305.setTransform(106.7238,428.6879);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#FFFFFF").s().p("AgCAFQgBABAAAAQgBAAgBAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQgBAAAAgBQAAAAABgBQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABABABAAQAAAAAAgBQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBABgBAAIABABIgBACQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAABAAAAQAAABAAAAQgBAAAAABQAAAAgBAAQAAgBgBAAQAAAAAAgBQgBAAAAgBQABAAAAgBg");
	this.shape_306.setTransform(106.725,428.675);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAgBQAAABgBAAQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAAAgBQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAABQABAAAAAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAABABAAQAAABAAAAQABABAAAAQAAABAAAAQAAAAABAAQAAAAABAAQAAAAAAAAQABAAAAABQABAAAAABQAAAAAAAAQAAABgBAAQAAABgBAAQABAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQAAAAABABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAABgBAAQAAABAAAAQAAAAAAAAQAAABgBAAIAAgBg");
	this.shape_307.setTransform(106.725,428.6536);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#FFFFFF").s().p("AgBABQgBAAAAgBQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAAAAAAAQAAABgBAAQAAABAAAAIgCAAIgBgBg");
	this.shape_308.setTransform(80.7283,425.1467);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAAAgBQgBAAABgBQAAAAAAgBQgBAAAAABQgBAAgBAAQAAAAgBAAQAAgBAAAAIAAgCIABgCQgBAAgBAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAAAAAQABAAAAAAQABAAABABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABAAABQABgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAAAQAAABgBABQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAABAAAAQAAABAAAAQgBAAAAAAQAAABAAAAIgBgBg");
	this.shape_309.setTransform(80.74,425.1536);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#FFFFFF").s().p("AgCAFQgBAAgBABQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBQAAAAABAAQAAgBAAAAQABAAABgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABgBQAAAAABAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABgBAAABQABAAAAAAQAAAAABABQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAABAAQABgBAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAAAABQAAAAABAAQABAAAAAAQAAAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQAAABABAAQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAABgBAAQAAAAAAABQAAAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAABgBg");
	this.shape_310.setTransform(80.7444,425.1625);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#FFFFFF").s().p("AgBACQAAgBgBAAQAAAAAAgBQAAAAABAAQAAAAAAAAQABgBAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABgBAAQAAAAgBAAIgBAAIgBAAg");
	this.shape_311.setTransform(220.6123,404.9625);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#FFFFFF").s().p("AgCAFQgBAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAgBABAAQAAgBAAAAQABAAAAgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQAAgBAAgBQABAAAAAAQABgBAAAAQABAAABABQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQABAAAAAAQAAgBABABQAAAAABAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABABQAAAAABAAQAAAAAAAAQAAABAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAABAAQAAABABAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAAAQAAABAAABQAAAAAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAABQAAAAAAABQgBAAAAAAQAAABAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_312.setTransform(220.5969,404.9964);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAgBABgBQgBAAgBABQgBAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAgBABAAQAAAAABABQAAgBgBgBQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAABgBQABAAAAAAQABAAAAAAQABABAAAAQAAABAAABQAAAAAAABQAAAAgBAAQAAABAAAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQAAABAAABQABABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBQAAABAAAAQgBABAAAAQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_313.setTransform(220.5875,404.9756);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQgBgBAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQABAAAAAAQAAAAABAAQAAAAAAAAQAAABAAAAQABAAgBAAQAAABAAAAQAAABAAAAIgCAAIgBAAg");
	this.shape_314.setTransform(152.8379,406.05);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAAAgBABQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBQgBAAABgBQAAAAAAgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAgBAAAAQAAAAABAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAgBQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAABQABAAAAAAQAAABAAAAQAAABAAABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQABAAAAABQABAAAAAAQAAAAABAAQAAAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAgBAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBgBAAQAAABAAAAQAAABgBAAQAAAAAAAAQAAABAAAAIgBgBg");
	this.shape_315.setTransform(152.8639,406.0536);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#FFFFFF").s().p("AgDAFQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQgBAAABgBQAAAAAAgBQABAAABAAQgBAAgBAAQAAgBgBAAQAAAAAAAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAgBQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQABgBAAAAQABAAAAAAQABAAAAABQABAAAAABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAABQABgBAAAAQABAAAAAAQABAAAAABQAAAAAAABQABAAAAAAQAAABAAAAQAAAAgBABQAAAAgBABQABAAAAAAQABAAABAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQABABAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBABAAAAQgBgBAAAAQgBAAAAgBQAAAAgBABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBg");
	this.shape_316.setTransform(152.8739,406.0708);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQgBgBABAAQAAAAAAAAQAAAAABgBQAAAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAgBABQAAAAAAAAQAAABgBAAIgBAAIgBAAg");
	this.shape_317.setTransform(67.0845,453.2179);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#FFFFFF").s().p("AgCAFQgBABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQgBgBgBAAQAAAAgBgBQAAAAAAAAQAAAAAAAAQAAAAAAgBQAAAAABAAQABgBAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABgBAAAAQABAAAAAAQAAAAABAAQAAAAAAABQABgBAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQABAAABgBQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAIADADQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAgBgBQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBAAgBg");
	this.shape_318.setTransform(67.075,453.2);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQgBAAAAAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQgBAAgBgBQAAAAAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABABQAAgBgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAQABAAAAABQAAAAABABQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAgBABAAQABAAAAAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQgBAAAAABQAAAAgBABQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_319.setTransform(67.075,453.2319);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#FFFFFF").s().p("AgBABQgBAAAAAAQAAgBAAAAQABAAAAAAQAAAAABgBQAAAAAAAAQAAgBAAAAQABABAAAAQABAAAAABQAAAAABAAQAAAAgBABQAAAAAAAAQAAABgBAAIgBABIgBgCg");
	this.shape_320.setTransform(174.375,405.6127);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAAAQAAgBAAAAQAAgBAAgBQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAAAQAAgBABAAQAAgBABgBQgBAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAgBABAAQAAAAAAgBQABAAAAAAQABAAABAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABABQAAAAABAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAABABAAQAAAAAAABQABAAAAABQAAAAgBABQABAAABAAQAAgBABAAQAAAAABABQAAAAAAAAQABAAAAABQAAAAAAABQgBAAAAAAQAAABgBAAQABABAAAAQABAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABAAAAQgBAAAAAAQAAABAAAAIgBgBg");
	this.shape_321.setTransform(174.3639,405.6036);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQgBABAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAABgBQAAAAABgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAgBABAAQAAAAABABQAAgBgBgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQAAAAABABQAAAAABAAQAAABABAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBABQABAAABAAQAAgBABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAAAQAAABgBAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAgBABQAAAAAAAAQgBAAgBAAQAAAAgBAAQAAABABABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_322.setTransform(174.3714,405.6325);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQgBgBABAAQAAAAAAAAQAAAAABgBIABAAIABABQAAAAAAAAQABAAgBABQAAAAAAAAQAAABAAAAIgCAAIgBAAg");
	this.shape_323.setTransform(49.5919,445.725);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#FFFFFF").s().p("AgDAFQAAABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAgBgBQAAAAAAgBQABAAAAgBQAAAAABAAQgBAAAAgBQgBAAAAAAQgBgBAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABgBAAAAQAAAAAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQABAAAAgBQABAAAAAAQABABAAAAQAAAAAAABQABgBAAAAQAAgBAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQABAAABgBQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQABABgBAAQAAABAAAAQAAABgBAAQABABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAABgBAAQgBAAgBAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBgBQAAAAgBgBIgCAEQAAgBAAAAQgBAAAAAAQAAgBAAAAQgBgBAAgBg");
	this.shape_324.setTransform(49.6031,445.75);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#FFFFFF").s().p("AgCAFQgBAAgBAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAABgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAgBABAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABABAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAgBABQABAAABgBQABAAAAAAQABAAAAAAQAAABABAAQAAABAAAAQABABgBABQAAAAAAAAQgBABgBAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAgBAAQAAABABAAQAAABAAAAQAAABgBAAQAAABgBAAIgDgBQAAABgBAAQAAABAAAAQAAAAAAAAQgBABAAAAQgBgBAAAAQAAAAgBgBQAAAAAAgBQAAAAABgBg");
	this.shape_325.setTransform(49.6,445.75);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#FFFFFF").s().p("AgBABQAAAAgBAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABAAAAAAQAAgBAAABQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAABQAAAAgBAAQAAABgBAAIgBABIgBgCg");
	this.shape_326.setTransform(30.1,459.8621);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBABQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAABgBQgEAAABgBQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAABQABgBAAAAQAAgBAAAAQAAAAABAAQAAgBAAAAQABABAAAAQABAAAAABQAAAAAAABQAAAAAAABQABAAABgBQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAgBABQAAAAgBABQABAAABAAQAAAAAAAAQABAAAAAAQAAABAAAAQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAgBABQABAAAAABQAAAAAAABQAAAAAAAAQgBAAAAAAQAAABgBAAQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQAAAAAAgBQgBAAAAgBg");
	this.shape_327.setTransform(30.1045,459.85);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAABgBQgBAAgBAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAgBQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAgBgBQAAgBAAAAQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAABgBQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAAAAAABQgBAAAAABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAgBQgBAAAAAAQgBAAAAgBQAAAAgBgBQAAABAAABQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_328.setTransform(30.0792,459.858);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBgBAAAAQABAAAAAAQAAgBABAAQAAAAAAAAQABgBAAABQAAAAABAAQAAAAAAAAQAAABAAAAQABAAgBAAQAAABAAAAQAAABAAAAIgCABIgBgCg");
	this.shape_329.setTransform(136.2379,410.4121);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#FFFFFF").s().p("AgBAJQAAgBgBAAQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAABgBAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQABAAAAgBQAAAAABgBIgDAAIAAgBQAAgBABAAQAAgBAAAAQABAAAAAAQABAAAAAAQAAAAAAgBQgBAAAAgBQAAAAABgBQAAAAAAgBQABAAAAAAQABAAAAAAQABAAABABQAAAAABABQAAgBAAgBQAAgBAAAAQAAgBAAAAQABAAAAABQABAAAAAAQABAAAAAAQAAABAAABQAAAAAAABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAABAAAAIgBAAg");
	this.shape_330.setTransform(136.2625,410.3931);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#FFFFFF").s().p("AgDAFQgBAAAAABQgBAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAgBQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABABQAAgBgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABgBAAABQABAAAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQABAAAAAAQABgBAAABQABAAABAAQAAAAAAABQABAAgBABQAAAAAAABQAAAAABAAQABgBAAAAQABAAAAABQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQABAAAAABQAAAAAAAAQAAABAAAAQgBABAAAAQgBAAAAABQAAAAgBgBQAAAAgBAAQAAgBgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAABgBAAQgBgBAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_331.setTransform(136.2286,410.3964);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#FFFFFF").s().p("AgBABQgBAAAAgBQAAAAAAAAQABAAAAAAQAAgBABAAQAAAAAAAAQAAgBABABQAAAAAAAAQABAAAAAAQAAABABAAQAAAAgBAAQAAABAAAAQAAABgBAAIgBABIgBgCg");
	this.shape_332.setTransform(158.975,412.8121);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#FFFFFF").s().p("AgCAFQgBABgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQABAAAAgBQAAAAABAAQgBgBAAAAQgBAAAAgBQgBAAAAAAQAAAAAAAAQAAAAAAgBQABAAAAAAQAAgBABAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQABAAABABQAAAAABAAQAAAAAAAAQAAABAAABQAAAAgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAAAgBAAQAAABgBAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQgBABAAAAQgBABAAAAQAAAAAAAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQgBAAAAAAQAAgBABgBg");
	this.shape_333.setTransform(158.9861,412.8);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAgBABQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQgBAAgBgBQAAAAAAAAQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAgBABABQAAAAABAAQAAgBgBAAQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAgBABAAQAAAAABAAQAAAAABABQAAAAAAAAQABABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQABAAABAAQAAAAAAAAQABABAAAAQAAAAAAABQgBABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQAAAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBgBAAAAQAAAAgBgBQAAABAAAAQAAAAgBABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_334.setTransform(158.975,412.8);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQgBAAAAAAQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABABAAQAAAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBAAAAAAQAAAAAAAAQgBgBAAAAg");
	this.shape_335.setTransform(142.83,398.705);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#FFFFFF").s().p("AgCAFQgBABAAAAQgBAAAAAAQgBAAgBgBQAAAAgBAAIAAgCIACgCQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAgBABABQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQABgBAAAAQABAAAAAAQABABAAAAQAAABABAAQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQAAAAABABQAAAAAAAAQAAABgBABQABgBABAAQAAAAABAAQAAAAABABQAAAAABAAQAAABAAAAQAAAAAAABQAAAAgBAAQAAABAAAAQAAABABAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAABAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAAAABQABAAAAABQAAAAgBABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAgBAAQAAgBgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_336.setTransform(142.85,398.7214);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQgBABAAAAQAAAAgBAAQAAAAgBAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQgBAAgBAAQAAgBgBAAQAAAAAAAAQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAABAAQAAAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQAAAAABAAQAAABABABQAAgBAAgBQAAAAAAgBQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAABAAQAAgBABABQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQgBABAAAAQAAABgBAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQAAAAgBABQgBAAAAAAQAAAAABAAQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABAAAAQAAABgBAAQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_337.setTransform(142.8639,398.6844);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBgBAAAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQABAAAAABQAAAAgBAAQAAABgBAAIgBAAIgBgBg");
	this.shape_338.setTransform(86.175,408.5556);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAAAQAAgBgBAAQAAgBAAgBQAAABgBAAQAAAAgBAAQAAAAAAAAQgBAAAAgBQgBgBAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQgBAAgBgBQAAAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAAAAAQABAAABAAQAAABABAAQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAABABAAQAAAAAAABQABAAAAABQgBABAAAAQABAAAAAAQABgBABAAQAAAAAAAAQABABAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBAAQAAABAAAAQgBAAAAAAQgBABgBgBQABABAAABQABAAAAABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAABgBgBQAAAAgBAAQAAAAAAgBQAAABgBAAQAAABAAAAQgBAAAAAAQAAABAAAAIgBgBg");
	this.shape_339.setTransform(86.175,408.5611);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBABQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAgBAAAAQABABABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAgBQABAAAAABQABAAAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAAAABAAQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABQAAAAABgBQABAAAAAAQABAAAAABQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAAAQgBABgBAAQAAAAgBAAQABAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBgBAAQAAAAAAABQgBAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAAAAAgBg");
	this.shape_340.setTransform(86.1861,408.5708);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAgBQAAAAABABQAAAAAAAAQABAAAAABQAAAAAAAAQAAAAAAAAQAAABAAAAQAAAAgBABIgBABIgBgBg");
	this.shape_341.setTransform(91.9863,445.8208);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#FFFFFF").s().p("AAAAIQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAgBAAgBQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAAAAAAAQABgBAAgBQAAAAABgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAABAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAgBQABAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBABQAAAAAAAAQgBABAAgBQgBAAgBAAQAAABABAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBAAAAABQAAAAAAABQgBAAAAAAQAAAAAAAAIAAAAg");
	this.shape_342.setTransform(91.9931,445.825);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#FFFFFF").s().p("AgDAFQgBAAAAAAQgBABAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBABABQAAAAABAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABAAQAAABABAAQAAABABAAQAAAAAAgBQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAABgBAAQABAAABAAQAAgBABAAQAAAAABABQAAAAAAABQABAAAAABQAAAAAAAAQAAABgBAAQAAAAgBABQABAAABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBgBQAAABAAAAQABABAAABQAAAAgBAAQAAABgBAAQAAABgBAAQAAAAgBAAQAAgBgBAAQAAAAgBgBQAAAAAAABQAAAAAAABQAAAAAAAAQgBAAgBAAQAAAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBg");
	this.shape_343.setTransform(92.0036,445.8214);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#FFFFFF").s().p("AgBABQAAAAgBgBQAAAAAAAAQAAAAABAAQAAAAAAgBQABAAAAAAQAAAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAQABAAAAAAQAAABgBAAQAAABgBAAIgBAAIgBgBg");
	this.shape_344.setTransform(120.3244,461.0196);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#FFFFFF").s().p("AgBAIQAAAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAgBQAAABgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQABAAAAgBQAAAAABgBQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQAAAAAAgBQAAAAAAgBQAAAAAAAAQABgBABAAQAAAAABABQAAAAABAAQAAABAAAAQAAABAAABQAAgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQABAAAAABQAAAAAAABQgBAAAAAAQAAABgBAAQABABAAAAQABAAAAAAQABAAAAAAQAAABAAAAQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQABAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAABgBAAQAAABAAAAQAAAAgBAAQAAABAAAAIgBgBg");
	this.shape_345.setTransform(120.3,461.0111);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAAAAAQgBgBAAAAQgBAAAAAAQAAAAAAAAQAAgBABAAQAAgBABAAQAAAAABAAQAAAAABAAQAAgBgBgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABgBAAABQABAAAAAAQABABAAAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABgBAAAAQAAABABAAQAAAAAAABQABAAAAABQAAAAAAABQABAAAAAAQABAAAAAAQAAAAABAAQAAAAAAABQABAAAAAAQAAABAAAAQAAABgBAAQAAAAgBABQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABgBABQAAAAAAAAQgBABAAAAQgBAAgBgBQABABAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAAAAAQgBABAAgBQAAAAgBAAQAAAAgBgBQAAABgBAAQAAABAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_346.setTransform(120.3111,461);

	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAAAQgBgBABAAQAAAAAAAAQAAgBAAAAQABAAAAAAQAAAAAAAAQABAAAAAAQABAAAAABQAAAAAAAAQABAAAAAAQgBABAAAAQAAABgBAAIgBAAIgBgBg");
	this.shape_347.setTransform(76.9121,452.0533);

	this.shape_348 = new cjs.Shape();
	this.shape_348.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBQgBABgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAABgBQAAAAABgBQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQABAAAAgBQAAAAAAgBQAAAAAAAAQABAAAAAAQABAAABAAQAAAAAAABQABAAAAABQAAAAgBABQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABABAAABQAAAAAAABQgBAAAAABQAAAAgBAAIADACQAAABgBAAQAAABAAAAQgBAAgBAAQAAAAgBAAQAAAAABABQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQgBAAAAgBQAAAAgBAAQAAAAAAABQAAAAAAABQAAAAgBAAQAAAAAAAAIgBAAg");
	this.shape_348.setTransform(76.9139,452.0861);

	this.shape_349 = new cjs.Shape();
	this.shape_349.graphics.f("#FFFFFF").s().p("AgDAEQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAgBQAAAAABgBQAAAAABgBQgBAAgBAAQAAgBAAAAQgBAAAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABgBAAAAQABABABAAQgBgBAAgBQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAgBQAAgBAAAAQAAAAABAAQAAAAABAAQAAAAABAAQAAABAAAAQABABAAAAQAAABgBAAQABAAABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQABAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABgBABQAAAAAAAAQgBABgBAAQAAAAgBgBQAAABAAABQABAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAAAgBABQAAAAAAABQAAAAAAAAQgBAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_349.setTransform(76.925,452.0714);

	this.shape_350 = new cjs.Shape();
	this.shape_350.graphics.f("#FFFFFF").s().p("AgBABQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAgBAAAAQABAAAAgBQAAAAABAAQAAAAABABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABAAAAQAAABAAAAIgCABIgBgCg");
	this.shape_350.setTransform(155.4,441.2217);

	this.shape_351 = new cjs.Shape();
	this.shape_351.graphics.f("#FFFFFF").s().p("AgDAFQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAgBABAAQgBgBAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAAAAAgBQABAAAAAAQABgBAAAAQABAAAAAAQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAAAABAAQABgBAAAAQABAAAAAAQABAAAAABQAAAAAAABQABgBAAgBQAAgBAAAAQAAAAABAAQAAgBAAABQABAAABAAQAAAAAAABQABAAAAABQAAAAgBABIAEAAQABAAAAABQAAAAAAABQAAAAgBABQAAAAgBABQABAAAAAAQABAAAAAAQABAAAAAAQAAABAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAABQgBAAAAABQAAAAgBAAQAAAAgBgBQAAAAgBAAQAAAAgBgBQAAABAAAAQAAABAAAAQgBAAAAAAQAAABgBAAQAAgBAAAAQgBAAAAgBQAAAAAAgBQgBAAAAgBg");
	this.shape_351.setTransform(155.4031,441.1969);

	this.shape_352 = new cjs.Shape();
	this.shape_352.graphics.f("#FFFFFF").s().p("AgBAIQAAAAgBAAQAAgBAAAAQgBAAAAgBQAAgBABAAQgBAAgBAAQAAABgBgBQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAgBQABAAAAgBQAAAAABAAQAAAAABgBQABAAAAAAQAAAAAAAAQgBgBAAAAQAAgBABAAQAAgBAAgBQABAAABAAQAAAAABAAQAAABABAAQAAABAAAAQAAgBAAAAQAAgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABQABAAAAgBQABAAABAAQAAABAAAAQABAAAAAAQABABAAAAQAAABgBAAQAAABAAAAQgBAAgBABQABAAABAAQAAAAABAAQAAAAAAABQAAAAAAABQAAABgBAAQAAAAAAABQgBAAAAAAQgBgBgBAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBgBAAQAAAAAAABQgBAAAAABQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_352.setTransform(155.3861,441.2175);

	this.shape_353 = new cjs.Shape();
	this.shape_353.graphics.f("#FFFFFF").s().p("AgBABQgBAAAAgBQAAAAAAAAQAAAAABAAQAAAAABgBQAAAAAAAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAABABAAQAAAAAAAAQAAABgBAAQAAAAgBAAIgBABIgBgBg");
	this.shape_353.setTransform(46.2163,455.9875);

	this.shape_354 = new cjs.Shape();
	this.shape_354.graphics.f("#FFFFFF").s().p("AgDAFQAAAAgBAAQAAABgBAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAgBAAAAQABgBAAAAQAAAAABAAQgBgBgBAAQAAgBAAAAQgBAAAAAAQAAAAAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAAAAAQABAAAAAAQABAAAAAAQABAAABABQAAgBAAgBQAAAAAAAAQAAAAAAgBQABAAABABQAAAAABAAQAAAAAAAAQABABAAAAQAAABgBABQABgBABAAQAAAAABAAQAAAAABAAQAAAAAAABQAAAAABABQAAAAgBABQAAAAAAABQAAAAgBABQABAAABAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAABAAAAQgBAAAAABQgBAAAAAAQgBAAgBAAQABAAAAABQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQAAAAgBAAQgBAAAAAAQAAgBgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAgBABQAAgBgBAAQAAAAAAgBQAAAAgBgBQAAgBAAAAg");
	this.shape_354.setTransform(46.225,455.9958);

	this.shape_355 = new cjs.Shape();
	this.shape_355.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBABQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAgBABAAQAAABABAAQgBgBAAgBQAAAAAAgBQAAAAABAAQAAgBAAAAQABAAAAAAQAAAAABAAQAAAAABAAQAAAAABABQAAgBAAAAQAAgBABAAQAAAAABAAQAAAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAAAABQAAAAABgBQAAAAABAAQAAAAABAAQAAABAAAAQAAABABAAQAAAAgBABQAAAAAAABQAAABgBAAQABAAAAAAQABAAAAAAQAAAAABAAQAAABAAAAQAAABgBABQAAAAAAAAQgBABAAgBQgBAAgBAAQABABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQgBAAgBAAQAAAAgBAAQAAAAAAAAQgBgBAAAAQAAAAAAABQgBAAAAABQAAAAAAAAQAAAAgBAAIAAAAg");
	this.shape_355.setTransform(46.225,455.9744);

	this.shape_356 = new cjs.Shape();
	this.shape_356.graphics.f("#FFFFFF").s().p("AgBACQgBgBAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQAAAAAAAAQAAgBAAAAQABABAAAAQABAAAAABQABAAAAAAQAAAAAAABQgBAAAAAAQAAAAgBABIgBABIgBgBg");
	this.shape_356.setTransform(200.9135,403.0429);

	this.shape_357 = new cjs.Shape();
	this.shape_357.graphics.f("#FFFFFF").s().p("AgCAFQgBAAAAABQgBAAAAAAQgBAAAAAAQgBgBgBAAQAAAAAAgBQAAAAABgBQAAAAAAgBQABAAAAgBQgBAAAAAAQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAABAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQAAAAAAgBQABAAABAAQABgBAAABQABAAAAAAQAAAAABABQAAgBAAAAQAAgBAAAAQAAAAABAAQAAgBABAAQABABAAAAQAAAAABABQAAAAAAABQAAAAgBABQABgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAAAQgBABAAgBQgBAAgBAAQAAgBgBAAQAAAAAAABQAAAAAAABQgBAAAAAAQAAAAAAAAQgBAAgBAAQAAAAAAgBQAAAAAAgBQAAAAAAgBg");
	this.shape_357.setTransform(200.9,403.05);

	this.shape_358 = new cjs.Shape();
	this.shape_358.graphics.f("#FFFFFF").s().p("AgCAFQgBAAgBAAQAAABgBAAQAAAAgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBABAAQgBAAAAgBQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBABAAQAAAAABgBQAAAAABAAQAAAAABABQAAgBgBAAQAAgBAAgBQAAAAAAgBQABAAAAgBQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAgBAAAAQAAgBAAAAQABAAAAAAQABgBAAAAQABABAAAAQAAAAABABQAAAAAAABQAAAAAAABQAAgBABAAQAAAAABAAQAAAAABAAQAAAAABABQAAABAAAAQAAABAAAAQAAABAAAAQgBABAAAAQAAAAABAAQAAAAAAAAQABAAAAABQAAAAAAAAQAAABAAABQgBAAAAAAQgBAAAAAAQgBAAgBAAQAAABABAAQAAABAAAAQAAABAAAAQgBABAAAAQgBAAAAAAQAAABgBgBQAAAAgBAAQAAgBgBAAQAAAAAAABQAAAAgBABQAAAAAAAAQAAAAgBAAQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAgBABAAg");
	this.shape_358.setTransform(200.9,403.05);

	this.shape_359 = new cjs.Shape();
	this.shape_359.graphics.f("#FFFFFF").s().p("AgBACQAAgBAAAAQgBAAAAgBQAAAAABAAQAAAAAAgBQABAAAAAAQAAgBAAAAQABABAAAAQAAAAABABQAAAAAAAAQABAAAAAAQgBABAAAAQAAABgBAAIgBABIgBgBg");
	this.shape_359.setTransform(26.9819,440.3879);

	this.shape_360 = new cjs.Shape();
	this.shape_360.graphics.f("#FFFFFF").s().p("AgCAFQgBAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBABAAQAAgBAAgBQAAAAAAgBQABAAAAgBQgBAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQAAgBgBAAQAAgBAAgBQAAAAAAAAQABgBAAAAQABAAAAAAQABAAAAAAQAAAAABABQAAAAABABQAAgBAAgBQAAAAAAgBQAAAAABAAQAAgBABAAQAAAAABABQABAAAAAAQAAABAAAAQAAABAAABQAAgBABAAQAAAAABAAQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAAAQgBABAAAAQAAABAAAAQAAABABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQAAABAAAAQAAABAAAAQAAABAAAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBgBAAAAQgBABAAAAQAAABgBAAQAAAAAAAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQAAgBAAgBg");
	this.shape_360.setTransform(26.9375,440.4);

	this.shape_361 = new cjs.Shape();
	this.shape_361.graphics.f("#FFFFFF").s().p("AgBAIQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAAAAAgBQAAAAgBAAQgBABAAAAQgBAAAAgBQAAAAgBAAQAAgBAAAAQAAAAAAgBQABAAAAgBQAAAAABgBQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAAAAAAAQAAgBABgBQAAAAAAAAQABgBABAAQAAAAABABQgBgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAQABAAAAAAQABAAAAAAQABAAAAAAQAAABABAAQAAAAAAgBQAAAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQAAAAAAABQABAAAAABQAAAAgBABQABAAABAAQABgBAAAAQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABgBAAQABAAABAAQAAAAABAAQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAgBAAQABAAAAABQAAABAAAAQAAABAAAAQgBAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAgBQgBAAAAgBQAAABAAAAQgBABAAAAQAAAAAAAAQAAAAAAAAIgBAAg");
	this.shape_361.setTransform(26.9536,440.3792);

	this.shape_362 = new cjs.Shape();
	this.shape_362.graphics.f().s("#666666").ss(1,1,1).p("AgogZIBRA0");
	this.shape_362.setTransform(372.15,375.3);

	this.instance_44 = new lib.orangeleaf("synched",0);
	this.instance_44.setTransform(147.55,193.9,0.4136,0.4015,14.9985,0,0,216,81.5);

	this.instance_45 = new lib.orangeleaf("synched",0);
	this.instance_45.setTransform(194.7,149.7,0.3039,0.3039);

	this.instance_46 = new lib.yellowleaf("synched",0);
	this.instance_46.setTransform(605.95,199.65,1,1,0,0,0,23.4,21.6);

	this.instance_47 = new lib.yellowleaf("synched",0);
	this.instance_47.setTransform(437.1,211.2);

	this.shape_363 = new cjs.Shape();
	this.shape_363.graphics.f("#996600").s().p("AxNTvQhhhgAAiJQAAhSAnhIQgnhJAAhRQAAgWADgVIgbABQhaAAhOguQhLgtgshMQgqhLAAhXQAAhhA1hRQAzhPBWgoIALgGQgxhBgMhSQgDgbAAgUQAAh+BVheQBUheB9gNIAggCQgpg7gNhIQgDgrADgvIADgoQAIgkAPghQAphVBPgzQBRg0BhAAQBmAABVA7QAchFA9grQA+grBMgCQAkh1BjhLQBkhMB+ABQB4AABjBGQA7ArApA/QAMgBANgBQAzABAxAUQAtAVAjAkIADADQAkgmAtgaQBZgzBlAAQCcAABuBvQBuBtABCdQAAAogJAoQgJAtgVArQgNAagTAaIgGAHIAMgBQAZgCAVgBQCrAAB+B1QB+BzAOCqQACAQAAAWQAABrgxBeQgwBchTA9QA0BDAABXQAAA+geA5QgkBDhDAjQA9BggBBvQAAA9gTA7QgnB0hiBJQhmBLh9AAQgiAAgggGQgiAogxAWQgxAXg3AAQg/AAg4geQg1gdgigyIgOABQgsAAgkgZQgkgZgPgoQgvA8hDAiQhFAkhOAAQhAAAg5gYQg4gWgsgpQgTAighAVQgiAVgoAAQgtAAglgaQgKA6guAmQguAng9ABQg7gBgvglQgtBDhHAmQhKAohTABQiJgBhghgg");
	this.shape_363.setTransform(191.4,226.1);

	this.shape_364 = new cjs.Shape();
	this.shape_364.graphics.f("#996600").s().p("AAlDPQgoAig0AAQg4AAgqgmQgpgkgGg3IgNAAQgwAAgigiQgjgiAAgvQAAgwAjgiQAigjAwAAQAcAAAaAOIAAgBQABgwAhgiQAjgiAwAAQAmAAAeAXQARgWAXgNQAagNAcAAQAwAAAjAjQAhAiAAAwQAAAVgIAUQAvAWAbArQAcArABA0QAABKg1A0Qg0A1hKAAQhBAAgygqg");
	this.shape_364.setTransform(243.05,389.675);

	this.shape_365 = new cjs.Shape();
	this.shape_365.graphics.f("#815719").s().p("AnkKQQBmgaBOgcQB2gpAbgXQAogiAlhqQAoh0gPiFQgDgVgiiXQgLgzhThuIhRhkIlyiMIAygoICBAwQCFAvARgFQARgEgng7Igqg7IA6gtQDOFhAIAKQATASAEADQATANATgLQATgJAEjwIAAjwICeAiIgFBoQgDBpALAIQALAIBmg0QBjgyAKgQQAIgNgMhKIgOhIIAngOIAIBCQAJBDALAIQAKAIBCglIBAgoIAhA3IiOBVQiaBeg+AzQh/BqABCcQAACKACAqQAFB1ARAEQARAEB0hLIBvhNIAVAXIhtBcQhwBggKASQgWAjAVBCQAcBYBpAxQBmAyCFAaQBCAMAuADIy6AXg");
	this.shape_365.setTransform(187.525,397.45);

	this.shape_366 = new cjs.Shape();
	this.shape_366.graphics.f("#FFCC33").s().p("AhfBfQgngnAAg4QAAg3AngnQAogoA3AAQA4AAAoAoQAnAnAAA3QAAA4gnAnQgoAog4AAQg3AAgogog");
	this.shape_366.setTransform(83.35,179.35);

	this.shape_367 = new cjs.Shape();
	this.shape_367.graphics.f("#FFCC33").s().p("AhfBfQgngnAAg4QAAg3AngnQAogoA3AAQA4AAAnAoQAoAnAAA3QAAA4goAnQgnAog4AAQg3AAgogog");
	this.shape_367.setTransform(295.55,163.375);

	this.shape_368 = new cjs.Shape();
	this.shape_368.graphics.f("#FFCC33").s().p("AirCsQhIhHAAhlQAAhkBIhHQBHhIBkAAQBlAABHBIQBIBHAABkQAABlhIBHQhHBIhlAAQhkAAhHhIg");
	this.shape_368.setTransform(312.225,284.075);

	this.shape_369 = new cjs.Shape();
	this.shape_369.graphics.f("#FFCC33").s().p("Al2EgQgZgNgRgXQg/ArhKAAQhmAAhGhIQhIhHAAhlQAAhkBIhHQBGhIBmAAQBaAABEA7QBEA6AOBWQAOgxAqggQAqghA2AAQAyAAAnAaQAWggAigSQAigTAoAAQAbAAAbAJIDphcQCmhDANAIQAIgUAJAOQAGAHARAoQAnBXAlAAQBCAAAuAvQAuAuAABCQAABAguAvQguAuhCAAQgrAAgogXQgQAvgoAdQgqAdgyAAQhCAAgvguQgugvAAhBQAAgbgigmQgCBAgtAuQguAthBAAQgwAAgngbQgWAggiASQgjATgpAAQgSAAgVgFQgKApghAaQghAbgrAAQgdAAgagNg");
	this.shape_369.setTransform(176.65,346.9246);

	this.shape_370 = new cjs.Shape();
	this.shape_370.graphics.f("#FFCC33").s().p("AhaDVQgugvAAhCQAAgoATgjQgdgWgQgfQgRgiAAgmQAAhBAvguQAugvBCAAQBAAAAvAvQAuAuAABBQAAAqgTAiQAdAXAQAfQARAhAAAlQAABCgvAvQguAuhCAAQhAAAgvgug");
	this.shape_370.setTransform(73.675,306.3);

	this.shape_371 = new cjs.Shape();
	this.shape_371.graphics.f("#FFCC33").s().p("AhvBwQgugvAAhBQAAhBAuguQAugvBBAAQBBAAAvAvQAuAuAABBQAABBguAvQgvAuhBAAQhBAAgugug");
	this.shape_371.setTransform(282.675,333.9);

	this.shape_372 = new cjs.Shape();
	this.shape_372.graphics.f("#999900").s().p("AIrQDQg4gegjg0QgkAdguAAQgwAAgjgeQgkgegIguQgdAVgjAAQggAAgagRQgagPgOgbQgjAggrARQgsASgxAAQg9AAg3gbQg0gbgkgvQgMAfgcAUQgcATgiAAIgLAAQgbAngpAWQgrAYgxAAQgrAAgngSQglgSgbgfQgZAFgaAAQhiAAhPg6QhNg5gehaQgPgsAAgyQAAhXAvhKQg1gcgbg0QgYgrAAgxQAAhDApg1QhBgwglhHQgmhJAAhTIABgeQAMiEBhhaQBjhbCFAAQAQAAAUADIAIAAIgEgGQgNgRgLgXQgQgggIgkQgHghAAgdQAAh6BWhWQBWhWB6AAQBPAABEAoQAlAVAbAcIACgCQAbgcAkgQQAlgQAoAAIATABQAfgwAwgjQBNg2BcAAQBiAABPA7QBMA6AcBbQA7ABAxAiQAwAhAVA2QBDguBPAAQBLAAA/ApQA+AoAfBBQANAcAGAaIACAgQACAjgCAjQgKA4ggAuQANAAAMABQBhAKBBBJQBDBJAABjQAAASgDASQgJBAgmAyIAJAFQBDAfAnA9QApBAAABLQAABEghA6QghA7g7AkQg8AkhHAAIgVgBIACAhQAABAgeA4QAeA5AAA/QAABqhLBLQhLBLhqAAQhBAAg5gfg");
	this.shape_372.setTransform(560.375,235.775);

	this.shape_373 = new cjs.Shape();
	this.shape_373.graphics.f("#999900").s().p("AjYCZQgogpAAg5QAAgpAWghQAVgiAkgRQgGgOAAgRQAAgmAbgbQAagbAmAAQAWAAATALQATAJANASQAWgTAfABQAlAAAbAaQAaAaAAAmIAAABQAVgLAWAAQAlAAAbAbQAaAaAAAmQAAAkgaAbQgbAbglAAIgKgBQgFAqggAeQghAdgrAAQgpgBgfgaQgmAhg0gBQg5AAgpgog");
	this.shape_373.setTransform(520.175,363.1);

	this.shape_374 = new cjs.Shape();
	this.shape_374.graphics.f("#999900").s().p("AhJBKQgfgeAAgsQAAgrAfgeQAegfArAAQAsAAAeAfQAfAeAAArQAAAsgfAeQgeAfgsAAQgrAAgegfg");
	this.shape_374.setTransform(644.5,199.4);

	this.shape_375 = new cjs.Shape();
	this.shape_375.graphics.f("#999900").s().p("AhJBLQgfggAAgrQAAgqAfgfQAegfArAAQArAAAfAfQAfAfAAAqQAAArgfAgQgfAegrAAQgrAAgegeg");
	this.shape_375.setTransform(479.325,186.95);

	this.shape_376 = new cjs.Shape();
	this.shape_376.graphics.f("#999900").s().p("AiFCGQg4g3AAhPQAAhOA4g3QA3g4BOAAQBPAAA3A4QA4A3AABOQAABPg4A3Qg3A3hPAAQhOAAg3g3g");
	this.shape_376.setTransform(466.325,280.9);

	this.shape_377 = new cjs.Shape();
	this.shape_377.graphics.f("#999900").s().p("AC+DWQgagVgHggQgQAEgPAAQggAAgbgPQgagOgRgZQggAVgkAAQgyAAgkgjQgkgjgBgyQgaAcAAAWQAAAzgkAlQglAkgzAAQgnAAgggXQgggXgNglQgdASgjAAQgzAAgkgkQgkgkAAgyQAAgzAkgkQAkgkAzAAQAdAAAehEQAOgfAEgFQAIgMAFAQQAKgGCBA0IC2BIQAUgHAWAAQAfAAAaAOQAbAPARAZQAfgVAmAAQAqAAAhAZQAgAZALAnQAMhDA0gtQA1guBHAAQBOAAA4A3QA3A4AABOQAABOg3A4Qg4A3hOAAQg7AAgwghQgOASgTAKQgUAKgXAAQghAAgagUg");
	this.shape_377.setTransform(571.875,329.8345);

	this.shape_378 = new cjs.Shape();
	this.shape_378.graphics.f("#999900").s().p("AhnCmQgkglAAgzQAAgdANgaQAMgYAXgRQgPgcAAgfQAAgzAkgkQAlglAyAAQAyAAAlAlQAkAkAAAzQAAAdgNAaQgNAYgXARQAQAcAAAfQgBAzgjAlQglAkgyAAQgzAAgkgkg");
	this.shape_378.setTransform(652.05,298.225);

	this.shape_379 = new cjs.Shape();
	this.shape_379.graphics.f("#999900").s().p("AhWBXQgkgkAAgzQAAgyAkgkQAkgkAyAAQAzAAAkAkQAkAkAAAyQAAAzgkAkQgkAkgzAAQgyAAgkgkg");
	this.shape_379.setTransform(489.325,319.675);

	this.shape_380 = new cjs.Shape();
	this.shape_380.graphics.f("#999900").s().p("AEtIuQgegQgTgcQgTAQgaAAQgZgBgUgQQgTgRgFgYQgPALgTAAQgSAAgOgJQgOgJgHgOQgoAlg1AAQghgBgegPQgcgOgTgZQgHARgQALQgPAKgSAAIgGAAQgPAVgWAMQgXAMgbAAQgwABgfglQgQADgMAAQg2AAgqgfQgqgfgRgxQgHgagBgaQAAguAagpQgcgPgQgcQgNgYAAgbQAAgjAXgeQgjgZgVgnQgUgnAAguIAAgQQAHhHA1gyQA1gxBJABIATABIAEAAIgCgDQgGgKgHgMQgJgSgEgTQgEgTABgPQgBhCAwguQAugwBCAAQAqABAmAVQATALAPAQIACgBQAfggAtgBIALABQAPgaAbgTQAqgeAyAAQA1AAArAgQApAgAPAxQAhABAaATQAaASAMAdQAjgZArAAQApAAAjAWQAiAWAQAjQAHARAEAMIABASQABATgBASQgGAegSAaIAOAAQA1AGAjAnQAkAoAAA2QAAAKgBAKQgFAigVAcIAFACQAlARAVAhQAXAjAAAoQgBAmgRAfQgSAhghATQggATgnAAIgLAAIABASQAAAigRAfQARAeAAAjQAAA5gpApQgoApg6AAQgjAAgggRg");
	this.shape_380.setTransform(718.15,288.2);

	this.shape_381 = new cjs.Shape();
	this.shape_381.graphics.f("#999900").s().p("Ah1BTQgWgWAAgfQAAgWAMgSQAMgSATgKQgDgHAAgKQAAgUAPgOQAOgPAUAAQAZAAAPAUQANgKAPAAQAVAAAOAPQAPAOAAAVQAKgGAMAAQAVAAAOAPQAPANAAAVQAAATgPAPQgOAPgVAAIgFgBQgDAYgRAPQgSAQgXAAQgXgBgQgOQgVASgcAAQgfAAgWgWg");
	this.shape_381.setTransform(696.325,357.4);

	this.shape_382 = new cjs.Shape();
	this.shape_382.graphics.f("#999900").s().p("AgnAoQgRgQAAgYQAAgXARgRQARgQAWAAQAXAAASAQQAQARAAAXQAAAYgQAQQgSARgXAAQgWAAgRgRg");
	this.shape_382.setTransform(763.85,268.45);

	this.shape_383 = new cjs.Shape();
	this.shape_383.graphics.f("#999900").s().p("AgoAoQgQgQAAgYQAAgXAQgRQASgQAWAAQAYAAAQAQQARARAAAXQAAAYgRAQQgQARgYAAQgWAAgSgRg");
	this.shape_383.setTransform(674.1,261.7);

	this.shape_384 = new cjs.Shape();
	this.shape_384.graphics.f("#999900").s().p("AhIBJQgegeAAgrQAAgqAegeQAegeAqAAQArAAAeAeQAeAeAAAqQAAArgeAeQgeAegrAAQgqAAgegeg");
	this.shape_384.setTransform(667.05,312.75);

	this.shape_385 = new cjs.Shape();
	this.shape_385.graphics.f("#999900").s().p("ABnBzQgOgLgEgRQgKACgHAAQgjAAgUgeQgQAMgVAAQgbAAgTgTQgUgTAAgcQgOAQAAAMQAAAcgUATQgTAUgcAAQgXAAgRgNQgRgMgGgUQgRAKgSAAQgcAAgUgUQgUgTAAgbQAAgcAUgUQAUgTAcAAQAPAAAQglQANgdAEAMQAGgEBHAcIBiAoQALgEALAAQARAAAPAIQAOAIAJANQAQgLAVAAQAXAAASAOQASANAGAVQAGgkAcgZQAdgZAnAAQArAAAeAeQAdAfAAApQAAArgdAeQgeAegrAAQggAAgbgRQgPAUgZAAQgTAAgOgLg");
	this.shape_385.setTransform(724.4,339.4015);

	this.shape_386 = new cjs.Shape();
	this.shape_386.graphics.f("#999900").s().p("Ag4BaQgTgUAAgbQAAghAagUQgIgOAAgRQAAgcATgUQAVgUAaAAQAcAAAUAUQATAUAAAcQAAAggaATQAIAQAAARQAAAbgTAUQgUATgbAAQgbAAgVgTg");
	this.shape_386.setTransform(767.95,322.15);

	this.shape_387 = new cjs.Shape();
	this.shape_387.graphics.f("#999900").s().p("AgvAvQgTgTAAgcQAAgaATgVQAVgTAaAAQAcAAAUATQATAVAAAaQAAAcgTATQgUAUgcAAQgaAAgVgUg");
	this.shape_387.setTransform(679.55,333.8);

	this.shape_388 = new cjs.Shape();
	this.shape_388.graphics.f("#999900").s().p("AhEAoQgUgPAAgVQAAgTAUgPQAVgOAcAAQATgJAUAAQAdAAATAOQAVAPAAAVQAAATgUAPQgUAOgdAAQgSAJgUAAQgdAAgVgOg");
	this.shape_388.setTransform(697.7,364.125);

	this.shape_389 = new cjs.Shape();
	this.shape_389.graphics.f("#999900").s().p("AiACTQgLgLAAgQQAAgKAFgIQgFgHAAgLIAAgEIgDAAQgWgBgLgTQgFgJAAgKQAAgLAGgKQAGgJAKgFIABgBQgFgGgCgKIAAgFQAAgPAKgLQAKgKAOgCIAEAAQgFgHgBgJIAAgPIADgIQAEgKAKgGQAJgGALAAQANAAAJAHQAIgRATgBQAEgOAMgJQALgJAPAAQANAAAMAJQAHAFAEAHIADAAQAMAAAJAJQAEgEAGgDQALgHALABQASgBANANQANANAAATIgBAJIgDAKIgEAHIgBABIACgBIAFAAQAUAAAPANQAOAOACAUIAAAEQAAAagVAOQAGAIAAALQAAAIgDAGQgEAHgIAFQAHALAAANQAAAIgCAFQgFAOgLAJQgMAJgPAAIgIgCQgIALgOAAQgPAAgJgNIgBAAQgMAAgDgKQgNAPgSAAQgOgBgLgJQgFAIgKABQgEAAgFgEQgBAHgGAEQgFAFgHAAQgHAAgGgFQgKASgVgBQgQAAgMgLg");
	this.shape_389.setTransform(675.075,331.4);

	this.shape_390 = new cjs.Shape();
	this.shape_390.graphics.f("#996600").s().p("AAFAYQgFAEgFAAQgHAAgFgEQgFgFAAgGIgCAAQgFAAgFgEQgEgEAAgFQAAgFAEgEQAFgEAFAAQADAAADACQAAgGAFgEQAEgEAFAAQAEAAADACQAEgFAHAAQAGAAAEAEQADAEAAAFIAAAGQAMAEAAANQgBAJgFAGQgHAGgIAAQgIAAgFgFg");
	this.shape_390.setTransform(681.1,350.5);

	this.shape_391 = new cjs.Shape();
	this.shape_391.graphics.f("#996600").s().p("AgKALQgFgEAAgHQAAgFAFgFQAEgFAGAAQAGAAAFAFQAFAFAAAFQAAAHgFAEQgFAFgGAAQgGAAgEgFg");
	this.shape_391.setTransform(662.475,325.925);

	this.shape_392 = new cjs.Shape();
	this.shape_392.graphics.f("#996600").s().p("AgKALQgFgEAAgHQAAgFAFgFQAFgFAFAAQAHAAAEAFQAFAFAAAFQAAAHgFAEQgEAFgHAAQgFAAgFgFg");
	this.shape_392.setTransform(687.225,324.075);

	this.shape_393 = new cjs.Shape();
	this.shape_393.graphics.f("#996600").s().p("AgTAUQgJgIAAgMQAAgKAJgJQAIgIALAAQAMAAAIAIQAJAJAAAKQAAAMgJAIQgIAJgMgBQgLABgIgJg");
	this.shape_393.setTransform(689.2,338.15);

	this.shape_394 = new cjs.Shape();
	this.shape_394.graphics.f("#996600").s().p("AgwAdQgHAFgJAAQgMAAgIgIQgIgJAAgLQAAgLAIgIQAIgJAMAAQALAAAIAHQAIAHABAJQACgFAFgDQAFgEAGAAQAGAAAEADQAGgIAJAAIAGABIAbgLQAUgIABABQABgDAEAIQAEAKAFAAQAHAAAGAGQAFAFAAAHQAAAHgFAGQgGAFgHAAQgGAAgEgDQgFANgMAAQgIAAgFgGQgGgFAAgIQAAgCgEgFQAAAHgFAGQgGAFgHAAQgFAAgFgEQgGAJgJAAIgFgBQgCALgLAAQgIAAgEgGg");
	this.shape_394.setTransform(673.375,345.5217);

	this.shape_395 = new cjs.Shape();
	this.shape_395.graphics.f("#996600").s().p("AgJAZQgGgGAAgHQAAgGACgDQgHgFAAgJQAAgIAFgFQAFgFAJAAQAGAAAFAFQAGAFAAAIQAAAEgCAFQAHAEAAAKQAAAHgFAGQgGAFgIAAQgHAAgEgFg");
	this.shape_395.setTransform(661.35,340.775);

	this.shape_396 = new cjs.Shape();
	this.shape_396.graphics.f("#996600").s().p("AgMANQgFgFgBgIQABgHAFgFQAFgFAHAAQAHAAAGAFQAGAFgBAHQABAIgGAFQgGAFgHAAQgHAAgFgFg");
	this.shape_396.setTransform(685.75,344);

	this.shape_397 = new cjs.Shape();
	this.shape_397.graphics.f("#999900").s().p("AiACUQgLgMAAgQQAAgJAFgJQgFgIAAgKIABgFIgEAAQgXAAgKgTQgFgJAAgKQAAgLAGgKQAGgJAKgFIABAAQgFgHgCgKIAAgFQAAgPAKgLQAKgLAOgBIAEAAQgFgGgBgKIAAgPIADgIQAEgKAKgGQAJgGALAAQANAAAJAHQAIgSATAAQAEgOAMgJQALgJAPAAQANAAAMAJQAGAEAFAIIADAAQAMAAAJAJIAAAAQAEgEAGgDQAKgGAMAAQASAAANANQANAMAAATIgBAJIgDAKIgEAGIgBABIACAAIAFAAQAUAAAPANQAOAOACAUIAAAEQAAAZgVAQQAGAHAAALQAAAIgDAFQgEAIgIAEQAHALAAAOQAAAIgCAGQgFANgLAJQgMAIgPAAIgIAAQgIAKgOAAQgPAAgJgNIgBAAQgMAAgDgLQgMAQgTAAQgOAAgLgLQgFAJgKAAQgFAAgEgDQgBAHgGAFQgFAEgHAAQgGAAgHgEQgLARgUAAQgQAAgMgLg");
	this.shape_397.setTransform(637.675,332.675);

	this.shape_398 = new cjs.Shape();
	this.shape_398.graphics.f("#996600").s().p("AAEAYQgEAEgGAAQgGAAgFgEQgEgFgCgGIgBAAQgGAAgDgEQgEgEgBgFQABgFAEgEQADgEAGAAQADAAAEABQAAgFADgEQAEgEAGAAQAEAAADACQAEgFAHAAQAFAAAEAEQAFAEAAAGIgBAEQALAGAAAMQABAJgHAGQgFAGgJAAQgHAAgHgFg");
	this.shape_398.setTransform(643.7,351.775);

	this.shape_399 = new cjs.Shape();
	this.shape_399.graphics.f("#5B3100").s().p("AgjBGQAOgFADgDQAFgDAEgNQAFgOgCgPIgEgTQgBgGgKgNIgJgLIgsgRIAGgFQAeAMADgBQADgBgLgNIAHgGIAZArQAEAEADgCQAEgBgBg4IARAEIAAANQAAAMABAAQABACAMgGQAMgGABgCQABgDgDgPIAEgCIABAHQABAJABAAQACACAPgKIAEAGQgfASgLAJQgPANAAASQAAAiADAAQADABAZgSIADADIgbAYQgDAEADAIQADAJAMAHQATAIAWACIiNADg");
	this.shape_399.setTransform(637.225,352.7);

	this.shape_400 = new cjs.Shape();
	this.shape_400.graphics.f("#996600").s().p("AgwAdQgGAFgKAAQgMAAgIgIQgIgJAAgLQAAgLAIgIQAIgJAMAAQALAAAIAHQAIAHABAJQACgFAFgEQAFgEAGAAQAFAAAFAEQAGgJAJAAIAGACIAbgLQAUgIABABQABgDAEAIQAEAKAFAAQAHAAAGAFQAFAGAAAHQAAAHgFAFQgGAGgHAAQgFAAgFgDQgFAMgMAAQgIAAgFgFQgGgFAAgIQAAgDgEgFQAAAIgFAFQgGAFgHAAQgGAAgEgDQgFAIgKAAIgFAAQgCALgLAAQgHAAgFgGg");
	this.shape_400.setTransform(635.975,346.8091);

	this.shape_401 = new cjs.Shape();
	this.shape_401.graphics.f("rgba(192,194,89,0.898)").s().p("A/gZ4MgADgsGQDmh8Gqh7QNVj4PSAAQPUAAF/AKQC/AFgEAFMAACAzng");
	this.shape_401.setTransform(158.175,553.325);

	this.shape_402 = new cjs.Shape();
	this.shape_402.graphics.f("#C0C259").s().p("AzEnnQLUhAKdBhQOhCHB3GZQpugTvLDbQnmBvlqBxg");
	this.shape_402.setTransform(79.6,389.6438);

	this.shape_403 = new cjs.Shape();
	this.shape_403.graphics.f("#C0C259").s().p("EhXogZlQeEgaeFgDQdTgDc3BuQdyBtbSEhMgAKAsFMivTAAHg");
	this.shape_403.setTransform(558.025,553.296);

	this.shape_404 = new cjs.Shape();
	this.shape_404.graphics.f().s("#000000").ss(1,1,1).p("EgkFgK8IAAiQIAAp8IAAthMBJSAAAMAAABJTMhJSAAAMAAAgkaQhHiqAAi7QAAi8BHirgEgkFAAQIAArM");
	this.shape_404.setTransform(959.675,492.675);

	this.shape_405 = new cjs.Shape();
	this.shape_405.graphics.f("rgba(51,51,51,0.98)").s().p("EgkpAkqMAAAgkaIAArMIAAiQIAAp8IAAthMBJTAAAMAAABJTg");
	this.shape_405.setTransform(963.225,492.675);

	this.shape_406 = new cjs.Shape();
	this.shape_406.graphics.f("#C0C259").s().p("A2yDjUAFKgGZAoVgCHIAGAAIAAJ7Q6jhpzCAOg");
	this.shape_406.setTransform(582.775,376.3875);

	this.instance_48 = new lib.drop("synched",0);
	this.instance_48.setTransform(823.4,278.8,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_49 = new lib.drop("synched",0);
	this.instance_49.setTransform(1185.85,277.05,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_50 = new lib.drop("synched",0);
	this.instance_50.setTransform(1095.9,342.8,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_51 = new lib.drop("synched",0);
	this.instance_51.setTransform(1139.7,343.8,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_52 = new lib.drop("synched",0);
	this.instance_52.setTransform(1091.8,501.45,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_53 = new lib.drop("synched",0);
	this.instance_53.setTransform(1175.7,360.8,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_54 = new lib.drop("synched",0);
	this.instance_54.setTransform(1121.95,285.05,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_55 = new lib.drop("synched",0);
	this.instance_55.setTransform(1105.25,388.55,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_56 = new lib.drop("synched",0);
	this.instance_56.setTransform(1048.8,457.4,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_57 = new lib.drop("synched",0);
	this.instance_57.setTransform(1097.1,450,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_58 = new lib.drop("synched",0);
	this.instance_58.setTransform(1008.65,541.4,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_59 = new lib.drop("synched",0);
	this.instance_59.setTransform(984.45,453.35,1.805,1.8183,0,14.8779,15.1211,-47.6,136.4);

	this.instance_60 = new lib.drop("synched",0);
	this.instance_60.setTransform(1017.35,396.05,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_61 = new lib.drop("synched",0);
	this.instance_61.setTransform(1037.05,308.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_62 = new lib.drop("synched",0);
	this.instance_62.setTransform(1009.1,468.25,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_63 = new lib.drop("synched",0);
	this.instance_63.setTransform(1044.05,403.25,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_64 = new lib.drop("synched",0);
	this.instance_64.setTransform(1088.75,284.5,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_65 = new lib.drop("synched",0);
	this.instance_65.setTransform(1301.3,349.05,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_66 = new lib.drop("synched",0);
	this.instance_66.setTransform(11.3,-130.15,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_67 = new lib.drop("synched",0);
	this.instance_67.setTransform(260.2,-163.1,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_68 = new lib.drop("synched",0);
	this.instance_68.setTransform(439,-67.45,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_69 = new lib.drop("synched",0);
	this.instance_69.setTransform(567.55,-57.35,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_70 = new lib.drop("synched",0);
	this.instance_70.setTransform(946.65,364.5,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_71 = new lib.drop("synched",0);
	this.instance_71.setTransform(892.3,238.3,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_72 = new lib.drop("synched",0);
	this.instance_72.setTransform(546.4,114.7,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_73 = new lib.drop("synched",0);
	this.instance_73.setTransform(622.35,12.2,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_74 = new lib.drop("synched",0);
	this.instance_74.setTransform(267.25,-83.7,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_75 = new lib.drop("synched",0);
	this.instance_75.setTransform(191.15,-115.55,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_76 = new lib.drop("synched",0);
	this.instance_76.setTransform(88.7,-124.4,1.805,1.8183,0,14.8779,15.1211,-47.6,136.2);

	this.instance_77 = new lib.drop("synched",0);
	this.instance_77.setTransform(353.5,-105.65,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_78 = new lib.drop("synched",0);
	this.instance_78.setTransform(484.2,-40.15,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_79 = new lib.drop("synched",0);
	this.instance_79.setTransform(758.8,204.2,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_80 = new lib.drop("synched",0);
	this.instance_80.setTransform(734.45,324.25,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_81 = new lib.drop("synched",0);
	this.instance_81.setTransform(704.8,125.25,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_82 = new lib.drop("synched",0);
	this.instance_82.setTransform(594.2,89.7,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_83 = new lib.drop("synched",0);
	this.instance_83.setTransform(748.8,93.7,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_84 = new lib.drop("synched",0);
	this.instance_84.setTransform(684.8,235.15,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_85 = new lib.drop("synched",0);
	this.instance_85.setTransform(1038.65,251.4,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_86 = new lib.drop("synched",0);
	this.instance_86.setTransform(917.6,424.7,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_87 = new lib.drop("synched",0);
	this.instance_87.setTransform(1020.1,131.1,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_88 = new lib.drop("synched",0);
	this.instance_88.setTransform(933.45,111.45,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_89 = new lib.drop("synched",0);
	this.instance_89.setTransform(619.3,164.55,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_90 = new lib.drop("synched",0);
	this.instance_90.setTransform(143.75,0.1,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_91 = new lib.drop("synched",0);
	this.instance_91.setTransform(-37.25,-67.55,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_92 = new lib.drop("synched",0);
	this.instance_92.setTransform(-120.05,-122.05,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_93 = new lib.drop("synched",0);
	this.instance_93.setTransform(-91.75,25.4,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_94 = new lib.drop("synched",0);
	this.instance_94.setTransform(-159.5,61.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_95 = new lib.drop("synched",0);
	this.instance_95.setTransform(-197.45,6.25,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_96 = new lib.drop("synched",0);
	this.instance_96.setTransform(2.1,-53.25,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_97 = new lib.drop("synched",0);
	this.instance_97.setTransform(28.25,38.9,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_98 = new lib.drop("synched",0);
	this.instance_98.setTransform(119.5,76.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_99 = new lib.drop("synched",0);
	this.instance_99.setTransform(322.15,-8.35,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_100 = new lib.drop("synched",0);
	this.instance_100.setTransform(80.2,-43.55,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_101 = new lib.drop("synched",0);
	this.instance_101.setTransform(41.15,110.45,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_102 = new lib.drop("synched",0);
	this.instance_102.setTransform(315.4,109,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_103 = new lib.drop("synched",0);
	this.instance_103.setTransform(418.45,165.15,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_104 = new lib.drop("synched",0);
	this.instance_104.setTransform(341.25,102.65,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_105 = new lib.drop("synched",0);
	this.instance_105.setTransform(501.5,248.1,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_106 = new lib.drop("synched",0);
	this.instance_106.setTransform(686,224.2,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_107 = new lib.drop("synched",0);
	this.instance_107.setTransform(798.25,105.15,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_108 = new lib.drop("synched",0);
	this.instance_108.setTransform(696.35,43.6,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_109 = new lib.drop("synched",0);
	this.instance_109.setTransform(1048.15,187.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_110 = new lib.drop("synched",0);
	this.instance_110.setTransform(1019.4,323.75,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_111 = new lib.drop("synched",0);
	this.instance_111.setTransform(976.2,183.55,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_112 = new lib.drop("synched",0);
	this.instance_112.setTransform(811.8,229.75,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_113 = new lib.drop("synched",0);
	this.instance_113.setTransform(1021.3,80.9,1.805,1.8183,0,14.8779,15.1211,0.1,0.1);

	this.instance_114 = new lib.drop("synched",0);
	this.instance_114.setTransform(763.7,171.4,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_115 = new lib.drop("synched",0);
	this.instance_115.setTransform(886.7,174.45,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_116 = new lib.drop("synched",0);
	this.instance_116.setTransform(972.85,273.3,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_117 = new lib.drop("synched",0);
	this.instance_117.setTransform(-83.25,-34.75,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_118 = new lib.drop("synched",0);
	this.instance_118.setTransform(404.5,112.25,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_119 = new lib.drop("synched",0);
	this.instance_119.setTransform(508.05,174.2,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_120 = new lib.drop("synched",0);
	this.instance_120.setTransform(484.7,71.5,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_121 = new lib.drop("synched",0);
	this.instance_121.setTransform(388.95,-13.05,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_122 = new lib.drop("synched",0);
	this.instance_122.setTransform(562.1,41.3,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_123 = new lib.drop("synched",0);
	this.instance_123.setTransform(658.6,73.15,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_124 = new lib.drop("synched",0);
	this.instance_124.setTransform(511,14.3,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_125 = new lib.drop("synched",0);
	this.instance_125.setTransform(373.6,-11.45,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_126 = new lib.drop("synched",0);
	this.instance_126.setTransform(201.4,-33.45,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_127 = new lib.drop("synched",0);
	this.instance_127.setTransform(-36.3,70.6,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_128 = new lib.drop("synched",0);
	this.instance_128.setTransform(-79.7,113.75,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_129 = new lib.drop("synched",0);
	this.instance_129.setTransform(-213.3,17.1,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_130 = new lib.drop("synched",0);
	this.instance_130.setTransform(209.55,48.25,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_131 = new lib.drop("synched",0);
	this.instance_131.setTransform(415.8,83.2,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_132 = new lib.drop("synched",0);
	this.instance_132.setTransform(197.6,29.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_133 = new lib.drop("synched",0);
	this.instance_133.setTransform(626.75,379,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_134 = new lib.drop("synched",0);
	this.instance_134.setTransform(672.65,336.05,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_135 = new lib.drop("synched",0);
	this.instance_135.setTransform(826.4,422.15,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_136 = new lib.drop("synched",0);
	this.instance_136.setTransform(758.3,359.2,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_137 = new lib.drop("synched",0);
	this.instance_137.setTransform(827.5,373.05,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_138 = new lib.drop("synched",0);
	this.instance_138.setTransform(759.55,328.25,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_139 = new lib.drop("synched",0);
	this.instance_139.setTransform(704.25,450.55,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_140 = new lib.drop("synched",0);
	this.instance_140.setTransform(750.05,395.45,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_141 = new lib.drop("synched",0);
	this.instance_141.setTransform(737,458.15,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_142 = new lib.drop("synched",0);
	this.instance_142.setTransform(644.6,415.1,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_143 = new lib.drop("synched",0);
	this.instance_143.setTransform(610.25,310.8,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_144 = new lib.drop("synched",0);
	this.instance_144.setTransform(852.35,365.35,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_145 = new lib.drop("synched",0);
	this.instance_145.setTransform(925.55,493.5,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_146 = new lib.drop("synched",0);
	this.instance_146.setTransform(904.25,461.3,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_147 = new lib.drop("synched",0);
	this.instance_147.setTransform(808,347.4,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_148 = new lib.drop("synched",0);
	this.instance_148.setTransform(876.35,400.75,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_149 = new lib.drop("synched",0);
	this.instance_149.setTransform(229.9,282.6,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_150 = new lib.drop("synched",0);
	this.instance_150.setTransform(-13.15,231.4,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_151 = new lib.drop("synched",0);
	this.instance_151.setTransform(26.1,227.5,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_152 = new lib.drop("synched",0);
	this.instance_152.setTransform(197.35,179.95,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_153 = new lib.drop("synched",0);
	this.instance_153.setTransform(220.1,211.45,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_154 = new lib.drop("synched",0);
	this.instance_154.setTransform(362.05,261.75,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_155 = new lib.drop("synched",0);
	this.instance_155.setTransform(402.15,231.75,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_156 = new lib.drop("synched",0);
	this.instance_156.setTransform(526.45,307.4,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_157 = new lib.drop("synched",0);
	this.instance_157.setTransform(527.35,268.05,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_158 = new lib.drop("synched",0);
	this.instance_158.setTransform(413.9,281.75,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_159 = new lib.drop("synched",0);
	this.instance_159.setTransform(-279.9,184.6,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_160 = new lib.drop("synched",0);
	this.instance_160.setTransform(-227.6,157.8,1.805,1.8183,0,14.8779,15.1211,-47.8,136.3);

	this.instance_161 = new lib.drop("synched",0);
	this.instance_161.setTransform(-256.2,157.35,1.805,1.8183,0,14.8779,15.1211,-47.8,136.3);

	this.instance_162 = new lib.drop("synched",0);
	this.instance_162.setTransform(-229.65,233.15,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_163 = new lib.drop("synched",0);
	this.instance_163.setTransform(-196.25,207.2,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_164 = new lib.drop("synched",0);
	this.instance_164.setTransform(95.25,286,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_165 = new lib.drop("synched",0);
	this.instance_165.setTransform(156.25,334.95,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_166 = new lib.drop("synched",0);
	this.instance_166.setTransform(234.75,309.25,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_167 = new lib.drop("synched",0);
	this.instance_167.setTransform(88.2,245.55,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_168 = new lib.drop("synched",0);
	this.instance_168.setTransform(-89.15,216.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_169 = new lib.drop("synched",0);
	this.instance_169.setTransform(-76.85,170.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_170 = new lib.drop("synched",0);
	this.instance_170.setTransform(95.55,204.25,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_171 = new lib.drop("synched",0);
	this.instance_171.setTransform(-148.95,204.4,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_172 = new lib.drop("synched",0);
	this.instance_172.setTransform(-267.2,167.65,1.805,1.8183,0,14.8779,15.1211,-47.8,136.3);

	this.instance_173 = new lib.drop("synched",0);
	this.instance_173.setTransform(-169.55,119.5,1.805,1.8183,0,14.8779,15.1211,-47.7,136.4);

	this.instance_174 = new lib.drop("synched",0);
	this.instance_174.setTransform(119.75,162.65,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_175 = new lib.drop("synched",0);
	this.instance_175.setTransform(252.45,206.95,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_176 = new lib.drop("synched",0);
	this.instance_176.setTransform(13.05,258.95,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_177 = new lib.drop("synched",0);
	this.instance_177.setTransform(-61.85,253.15,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_178 = new lib.drop("synched",0);
	this.instance_178.setTransform(-146.65,164.1,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_179 = new lib.drop("synched",0);
	this.instance_179.setTransform(133.5,263.85,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_180 = new lib.drop("synched",0);
	this.instance_180.setTransform(89.75,176.25,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_181 = new lib.drop("synched",0);
	this.instance_181.setTransform(10.25,161.9,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_182 = new lib.drop("synched",0);
	this.instance_182.setTransform(257.4,228.65,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_183 = new lib.drop("synched",0);
	this.instance_183.setTransform(275.95,325.35,1.805,1.8183,0,14.8779,15.1211,-47.6,136.4);

	this.instance_184 = new lib.drop("synched",0);
	this.instance_184.setTransform(180.1,241.45,1.805,1.8183,0,14.8779,15.1211,-47.6,136.3);

	this.instance_185 = new lib.drop("synched",0);
	this.instance_185.setTransform(290.35,238.8,1.805,1.8183,0,14.8779,15.1211,-47.7,136.3);

	this.instance_186 = new lib.drop("synched",0);
	this.instance_186.setTransform(250.75,443.85,1.805,1.8183,0,14.8779,15.1211,-90.1,197.2);

	this.instance_187 = new lib.drop("synched",0);
	this.instance_187.setTransform(289,457.2,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_188 = new lib.drop("synched",0);
	this.instance_188.setTransform(312,460.35,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_189 = new lib.drop("synched",0);
	this.instance_189.setTransform(343.15,455.35,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_190 = new lib.drop("synched",0);
	this.instance_190.setTransform(381.1,458.1,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_191 = new lib.drop("synched",0);
	this.instance_191.setTransform(350.7,409.4,1.805,1.8183,0,14.8779,15.1211,-90.1,197.2);

	this.instance_192 = new lib.drop("synched",0);
	this.instance_192.setTransform(248.6,401.3,1.805,1.8183,0,14.8779,15.1211,-90.1,197.2);

	this.instance_193 = new lib.drop("synched",0);
	this.instance_193.setTransform(387.75,477.85,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_194 = new lib.drop("synched",0);
	this.instance_194.setTransform(445.05,463.4,1.805,1.8183,0,14.8779,15.1211,-90.1,197.2);

	this.instance_195 = new lib.drop("synched",0);
	this.instance_195.setTransform(509.55,428.25,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_196 = new lib.drop("synched",0);
	this.instance_196.setTransform(484.7,487.6,1.805,1.8183,0,14.8779,15.1211,-90.1,197.2);

	this.instance_197 = new lib.drop("synched",0);
	this.instance_197.setTransform(562.05,460.45,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_198 = new lib.drop("synched",0);
	this.instance_198.setTransform(704.9,550.05,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_199 = new lib.drop("synched",0);
	this.instance_199.setTransform(763.8,563,1.805,1.8183,0,14.8779,15.1211,-90.1,197.2);

	this.instance_200 = new lib.drop("synched",0);
	this.instance_200.setTransform(552.65,501.4,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_201 = new lib.drop("synched",0);
	this.instance_201.setTransform(673.6,522.15,1.805,1.8183,0,14.8779,15.1211,-90,197.2);

	this.instance_202 = new lib.drop("synched",0);
	this.instance_202.setTransform(1078.95,313.55,1.805,1.8183,0,14.8779,15.1211,15.5,28.1);

	this.instance_203 = new lib.drop("synched",13);
	this.instance_203.setTransform(570.45,-30.15,1,1,0,0,0,-47.7,136.3);

	this.instance_204 = new lib.drop("synched",13);
	this.instance_204.setTransform(764.25,-83.05,1,1,0,0,0,-47.7,136.3);

	this.instance_205 = new lib.drop("synched",13);
	this.instance_205.setTransform(725.35,-35.25,1,1,0,0,0,-47.7,136.3);

	this.instance_206 = new lib.drop("synched",13);
	this.instance_206.setTransform(748.95,-41,1,1,0,0,0,-47.7,136.3);

	this.instance_207 = new lib.drop("synched",13);
	this.instance_207.setTransform(745.75,49.55,1,1,0,0,0,-47.7,136.3);

	this.instance_208 = new lib.drop("synched",13);
	this.instance_208.setTransform(770.65,-37.15,1,1,0,0,0,-47.7,136.3);

	this.instance_209 = new lib.drop("synched",13);
	this.instance_209.setTransform(731.1,-69.65,1,1,0,0,0,-47.7,136.3);

	this.instance_210 = new lib.drop("synched",13);
	this.instance_210.setTransform(736.85,-12.3,1,1,0,0,0,-47.7,136.3);

	this.instance_211 = new lib.drop("synched",13);
	this.instance_211.setTransform(716.45,32.35,1,1,0,0,0,-47.7,136.3);

	this.instance_212 = new lib.drop("synched",13);
	this.instance_212.setTransform(741.3,21.5,1,1,0,0,0,-47.7,136.3);

	this.instance_213 = new lib.drop("synched",13);
	this.instance_213.setTransform(706.9,82.7,1,1,0,0,0,-47.7,136.3);

	this.instance_214 = new lib.drop("synched",13);
	this.instance_214.setTransform(681.4,39.35,1,1,0,0,0,-47.7,136.3);

	this.instance_215 = new lib.drop("synched",13);
	this.instance_215.setTransform(690.95,4.3,1,1,0,0,0,-47.7,136.3);

	this.instance_216 = new lib.drop("synched",13);
	this.instance_216.setTransform(689.05,-44.8,1,1,0,0,0,-47.7,136.3);

	this.instance_217 = new lib.drop("synched",13);
	this.instance_217.setTransform(696.7,43.8,1,1,0,0,0,-47.7,136.3);

	this.instance_218 = new lib.drop("synched",13);
	this.instance_218.setTransform(706.25,4.3,1,1,0,0,0,-47.7,136.3);

	this.instance_219 = new lib.drop("synched",13);
	this.instance_219.setTransform(713.25,-65.2,1,1,0,0,0,-47.7,136.3);

	this.instance_220 = new lib.drop("synched",13);
	this.instance_220.setTransform(836.3,-61.4,1,1,0,0,0,-47.7,136.3);

	this.instance_221 = new lib.drop("synched",13);
	this.instance_221.setTransform(77.4,-130.8,1,1,0,0,0,-47.7,136.3);

	this.instance_222 = new lib.drop("synched",13);
	this.instance_222.setTransform(205.9,-184,1,1,0,0,0,-47.7,136.3);

	this.instance_223 = new lib.drop("synched",13);
	this.instance_223.setTransform(315.3,-158.9,1,1,0,0,0,-47.7,136.3);

	this.instance_224 = new lib.drop("synched",13);
	this.instance_224.setTransform(385.6,-171.95,1,1,0,0,0,-47.7,136.3);

	this.instance_225 = new lib.drop("synched",13);
	this.instance_225.setTransform(648.6,-2.3,1,1,0,0,0,-47.7,136.3);

	this.instance_226 = new lib.drop("synched",13);
	this.instance_226.setTransform(601.45,-61.5,1,1,0,0,0,-47.7,136.3);

	this.instance_227 = new lib.drop("synched",13);
	this.instance_227.setTransform(398.65,-77.55,1,1,0,0,0,-47.7,136.3);

	this.instance_228 = new lib.drop("synched",13);
	this.instance_228.setTransform(424.75,-142.85,1,1,0,0,0,-47.7,136.3);

	this.instance_229 = new lib.drop("synched",13);
	this.instance_229.setTransform(220.95,-142.85,1,1,0,0,0,-47.7,136.3);

	this.instance_230 = new lib.drop("synched",13);
	this.instance_230.setTransform(175.75,-148.85,1,1,0,0,0,-47.7,136.3);

	this.instance_231 = new lib.drop("synched",13);
	this.instance_231.setTransform(119.55,-138.8,1,1,0,0,0,-47.7,136.3);

	this.instance_232 = new lib.drop("synched",13);
	this.instance_232.setTransform(264.1,-166.9,1,1,0,0,0,-47.7,136.3);

	this.instance_233 = new lib.drop("synched",13);
	this.instance_233.setTransform(343.4,-150.85,1,1,0,0,0,-47.7,136.3);

	this.instance_234 = new lib.drop("synched",13);
	this.instance_234.setTransform(525.15,-60.5,1,1,0,0,0,-47.7,136.3);

	this.instance_235 = new lib.drop("synched",13);
	this.instance_235.setTransform(529.15,6.75,1,1,0,0,0,-47.7,136.3);

	this.instance_236 = new lib.drop("synched",13);
	this.instance_236.setTransform(485,-94.65,1,1,0,0,0,-47.7,136.3);

	this.instance_237 = new lib.drop("synched",13);
	this.instance_237.setTransform(420.7,-97.65,1,1,0,0,0,-47.7,136.3);

	this.instance_238 = new lib.drop("synched",13);
	this.instance_238.setTransform(504.05,-117.75,1,1,0,0,0,-47.7,136.3);

	this.instance_239 = new lib.drop("synched",13);
	this.instance_239.setTransform(490,-33.4,1,1,0,0,0,-47.7,136.3);

	this.instance_240 = new lib.drop("synched",13);
	this.instance_240.setTransform(681.75,-75.55,1,1,0,0,0,-47.7,136.3);

	this.instance_241 = new lib.drop("synched",13);
	this.instance_241.setTransform(641.6,33.85,1,1,0,0,0,-47.7,136.3);

	this.instance_242 = new lib.drop("synched",13);
	this.instance_242.setTransform(654.65,-136.8,1,1,0,0,0,-47.7,136.3);

	this.instance_243 = new lib.drop("synched",13);
	this.instance_243.setTransform(605.45,-134.8,1,1,0,0,0,-47.7,136.3);

	this.instance_244 = new lib.drop("synched",13);
	this.instance_244.setTransform(444.8,-61.5,1,1,0,0,0,-47.7,136.3);

	this.instance_245 = new lib.drop("synched",13);
	this.instance_245.setTransform(166.75,-80.6,1,1,0,0,0,-47.7,136.3);

	this.instance_246 = new lib.drop("synched",13);
	this.instance_246.setTransform(60.3,-90.6,1,1,0,0,0,-47.7,136.3);

	this.instance_247 = new lib.drop("synched",13);
	this.instance_247.setTransform(8.1,-107.7,1,1,0,0,0,-47.7,136.3);

	this.instance_248 = new lib.drop("synched",13);
	this.instance_248.setTransform(44.25,-33.4,1,1,0,0,0,-47.7,136.3);

	this.instance_249 = new lib.drop("synched",13);
	this.instance_249.setTransform(13.15,-4.3,1,1,0,0,0,-47.7,136.3);

	this.instance_250 = new lib.drop("synched",13);
	this.instance_250.setTransform(-15,-28.4,1,1,0,0,0,-47.7,136.3);

	this.instance_251 = new lib.drop("synched",13);
	this.instance_251.setTransform(83.4,-88.6,1,1,0,0,0,-47.7,136.3);

	this.instance_252 = new lib.drop("synched",13);
	this.instance_252.setTransform(110.5,-43.45,1,1,0,0,0,-47.7,136.3);

	this.instance_253 = new lib.drop("synched",13);
	this.instance_253.setTransform(164.7,-36.4,1,1,0,0,0,-47.7,136.3);

	this.instance_254 = new lib.drop("synched",13);
	this.instance_254.setTransform(261.1,-110.7,1,1,0,0,0,-47.7,136.3);

	this.instance_255 = new lib.drop("synched",13);
	this.instance_255.setTransform(126.6,-94.65,1,1,0,0,0,-47.7,136.3);

	this.instance_256 = new lib.drop("synched",13);
	this.instance_256.setTransform(127.6,-7.3,1,1,0,0,0,-47.7,136.3);

	this.instance_257 = new lib.drop("synched",13);
	this.instance_257.setTransform(274.15,-47.45,1,1,0,0,0,-47.7,136.3);

	this.instance_258 = new lib.drop("synched",13);
	this.instance_258.setTransform(337.4,-32.4,1,1,0,0,0,-47.7,136.3);

	this.instance_259 = new lib.drop("synched",13);
	this.instance_259.setTransform(287.2,-54.5,1,1,0,0,0,-47.7,136.3);

	this.instance_260 = new lib.drop("synched",13);
	this.instance_260.setTransform(393.6,-0.25,1,1,0,0,0,-47.7,136.3);

	this.instance_261 = new lib.drop("synched",13);
	this.instance_261.setTransform(489,-39.4,1,1,0,0,0,-47.7,136.3);

	this.instance_262 = new lib.drop("synched",13);
	this.instance_262.setTransform(532.15,-118.75,1,1,0,0,0,-47.7,136.3);

	this.instance_263 = new lib.drop("synched",13);
	this.instance_263.setTransform(468.9,-136.8,1,1,0,0,0,-47.7,136.3);

	this.instance_264 = new lib.drop("synched",13);
	this.instance_264.setTransform(677.75,-110.7,1,1,0,0,0,-47.7,136.3);

	this.instance_265 = new lib.drop("synched",13);
	this.instance_265.setTransform(681.75,-34.4,1,1,0,0,0,-47.7,136.3);

	this.instance_266 = new lib.drop("synched",13);
	this.instance_266.setTransform(638.6,-102.65,1,1,0,0,0,-47.7,136.3);

	this.instance_267 = new lib.drop("synched",13);
	this.instance_267.setTransform(557.25,-54.5,1,1,0,0,0,-47.7,136.3);

	this.instance_268 = new lib.drop("synched",13);
	this.instance_268.setTransform(648.15,-163.7);

	this.instance_269 = new lib.drop("synched",13);
	this.instance_269.setTransform(523.1,-78.6,1,1,0,0,0,-47.7,136.3);

	this.instance_270 = new lib.drop("synched",13);
	this.instance_270.setTransform(589.4,-94.65,1,1,0,0,0,-47.7,136.3);

	this.instance_271 = new lib.drop("synched",13);
	this.instance_271.setTransform(649.6,-54.5,1,1,0,0,0,-47.7,136.3);

	this.instance_272 = new lib.drop("synched",13);
	this.instance_272.setTransform(40.25,-66.55,1,1,0,0,0,-47.7,136.3);

	this.instance_273 = new lib.drop("synched",13);
	this.instance_273.setTransform(322.35,-58.5,1,1,0,0,0,-47.7,136.3);

	this.instance_274 = new lib.drop("synched",13);
	this.instance_274.setTransform(386.6,-40.45,1,1,0,0,0,-47.7,136.3);

	this.instance_275 = new lib.drop("synched",13);
	this.instance_275.setTransform(359.5,-91.65,1,1,0,0,0,-47.7,136.3);

	this.instance_276 = new lib.drop("synched",13);
	this.instance_276.setTransform(296.25,-122.75,1,1,0,0,0,-47.7,136.3);

	this.instance_277 = new lib.drop("synched",13);
	this.instance_277.setTransform(396.65,-118.75,1,1,0,0,0,-47.7,136.3);

	this.instance_278 = new lib.drop("synched",13);
	this.instance_278.setTransform(452.85,-115.7,1,1,0,0,0,-47.7,136.3);

	this.instance_279 = new lib.drop("synched",13);
	this.instance_279.setTransform(365.5,-125.75,1,1,0,0,0,-47.7,136.3);

	this.instance_280 = new lib.drop("synched",13);
	this.instance_280.setTransform(288.2,-119.75,1,1,0,0,0,-47.7,136.3);

	this.instance_281 = new lib.drop("synched",13);
	this.instance_281.setTransform(192.85,-106.7,1,1,0,0,0,-47.7,136.3);

	this.instance_282 = new lib.drop("synched",13);
	this.instance_282.setTransform(80.4,-17.35,1,1,0,0,0,-47.7,136.3);

	this.instance_283 = new lib.drop("synched",13);
	this.instance_283.setTransform(63.35,11.8,1,1,0,0,0,-47.7,136.3);

	this.instance_284 = new lib.drop("synched",13);
	this.instance_284.setTransform(-22,-20.35,1,1,0,0,0,-47.7,136.3);

	this.instance_285 = new lib.drop("synched",13);
	this.instance_285.setTransform(208.9,-64.5,1,1,0,0,0,-47.7,136.3);

	this.instance_286 = new lib.drop("synched",13);
	this.instance_286.setTransform(324.35,-75.55,1,1,0,0,0,-47.7,136.3);

	this.instance_287 = new lib.drop("synched",13);
	this.instance_287.setTransform(199.85,-72.55,1,1,0,0,0,-47.7,136.3);

	this.instance_288 = new lib.drop("synched",13);
	this.instance_288.setTransform(479.3,51.3,1,1,0,0,0,-47.7,136.3);

	this.instance_289 = new lib.drop("synched",13);
	this.instance_289.setTransform(497.8,21.9,1,1,0,0,0,-47.7,136.3);

	this.instance_290 = new lib.drop("synched",13);
	this.instance_290.setTransform(592.4,45.55,1,1,0,0,0,-47.7,136.3);

	this.instance_291 = new lib.drop("synched",13);
	this.instance_291.setTransform(547,21.9,1,1,0,0,0,-47.7,136.3);

	this.instance_292 = new lib.drop("synched",13);
	this.instance_292.setTransform(586,19.35,1,1,0,0,0,-47.7,136.3);

	this.instance_293 = new lib.drop("synched",13);
	this.instance_293.setTransform(543.2,5.3,1,1,0,0,0,-47.7,136.3);

	this.instance_294 = new lib.drop("synched",13);
	this.instance_294.setTransform(531.05,78.15,1,1,0,0,0,-47.7,136.3);

	this.instance_295 = new lib.drop("synched",13);
	this.instance_295.setTransform(547.65,42.35,1,1,0,0,0,-47.7,136.3);

	this.instance_296 = new lib.drop("synched",13);
	this.instance_296.setTransform(549.6,77.5,1,1,0,0,0,-47.7,136.3);

	this.instance_297 = new lib.drop("synched",13);
	this.instance_297.setTransform(494,67.9,1,1,0,0,0,-47.7,136.3);

	this.instance_298 = new lib.drop("synched",13);
	this.instance_298.setTransform(460.75,17.45,1,1,0,0,0,-47.7,136.3);

	this.instance_299 = new lib.drop("synched",13);
	this.instance_299.setTransform(598.15,11.7,1,1,0,0,0,-47.7,136.3);

	this.instance_300 = new lib.drop("synched",13);
	this.instance_300.setTransform(655.65,69.2,1,1,0,0,0,-47.7,136.3);

	this.instance_301 = new lib.drop("synched",13);
	this.instance_301.setTransform(639.65,55.15,1,1,0,0,0,-47.7,136.3);

	this.instance_302 = new lib.drop("synched",13);
	this.instance_302.setTransform(571.95,8.5,1,1,0,0,0,-47.7,136.3);

	this.instance_303 = new lib.drop("synched",13);
	this.instance_303.setTransform(616.05,27,1,1,0,0,0,-47.7,136.3);

	this.instance_304 = new lib.drop("synched",13);
	this.instance_304.setTransform(253.1,57.05,1,1,0,0,0,-47.7,136.3);

	this.instance_305 = new lib.drop("synched",13);
	this.instance_305.setTransform(115.75,64.75,1,1,0,0,0,-47.7,136.3);

	this.instance_306 = new lib.drop("synched",13);
	this.instance_306.setTransform(136.2,57.05,1,1,0,0,0,-47.7,136.3);

	this.instance_307 = new lib.drop("synched",13);
	this.instance_307.setTransform(221.15,7.2,1,1,0,0,0,-47.7,136.3);

	this.instance_308 = new lib.drop("synched",13);
	this.instance_308.setTransform(237.8,20.65,1,1,0,0,0,-47.7,136.3);

	this.instance_309 = new lib.drop("synched",13);
	this.instance_309.setTransform(320.85,27,1,1,0,0,0,-47.7,136.3);

	this.instance_310 = new lib.drop("synched",13);
	this.instance_310.setTransform(338.1,5.3,1,1,0,0,0,-47.7,136.3);

	this.instance_311 = new lib.drop("synched",13);
	this.instance_311.setTransform(415.4,27.65,1,1,0,0,0,-47.7,136.3);

	this.instance_312 = new lib.drop("synched",13);
	this.instance_312.setTransform(410.3,6.6,1,1,0,0,0,-47.7,136.3);

	this.instance_313 = new lib.drop("synched",13);
	this.instance_313.setTransform(351.5,30.2,1,1,0,0,0,-47.7,136.3);

	this.instance_314 = new lib.drop("synched",13);
	this.instance_314.setTransform(-33.8,78.15,1,1,0,0,0,-47.7,136.3);

	this.instance_315 = new lib.drop("synched",13);
	this.instance_315.setTransform(-9.5,56.4,1,1,0,0,0,-47.7,136.3);

	this.instance_316 = new lib.drop("synched",13);
	this.instance_316.setTransform(-24.85,60.25,1,1,0,0,0,-47.7,136.3);

	this.instance_317 = new lib.drop("synched",13);
	this.instance_317.setTransform(0.05,96.7,1,1,0,0,0,-47.7,136.3);

	this.instance_318 = new lib.drop("synched",13);
	this.instance_318.setTransform(14.15,78.15,1,1,0,0,0,-47.7,136.3);

	this.instance_319 = new lib.drop("synched",13);
	this.instance_319.setTransform(181.55,78.15,1,1,0,0,0,-47.7,136.3);

	this.instance_320 = new lib.drop("synched",13);
	this.instance_320.setTransform(221.15,95.4,1,1,0,0,0,-47.7,136.3);

	this.instance_321 = new lib.drop("synched",13);
	this.instance_321.setTransform(259.5,70.5,1,1,0,0,0,-47.7,136.3);

	this.instance_322 = new lib.drop("synched",13);
	this.instance_322.setTransform(171.95,57.7,1,1,0,0,0,-47.7,136.3);

	this.instance_323 = new lib.drop("synched",13);
	this.instance_323.setTransform(72.9,67.9,1,1,0,0,0,-47.7,136.3);

	this.instance_324 = new lib.drop("synched",13);
	this.instance_324.setTransform(72.9,41.7,1,1,0,0,0,-47.7,136.3);

	this.instance_325 = new lib.drop("synched",13);
	this.instance_325.setTransform(170.05,34.7,1,1,0,0,0,-47.7,136.3);

	this.instance_326 = new lib.drop("synched",13);
	this.instance_326.setTransform(39.05,69.85,1,1,0,0,0,-47.7,136.3);

	this.instance_327 = new lib.drop("synched",13);
	this.instance_327.setTransform(-29.3,67.3,1,1,0,0,0,-47.7,136.3);

	this.instance_328 = new lib.drop("synched",13);
	this.instance_328.setTransform(16.05,27.65,1,1,0,0,0,-47.7,136.3);

	this.instance_329 = new lib.drop("synched",13);
	this.instance_329.setTransform(177.05,9.15,1,1,0,0,0,-47.7,136.3);

	this.instance_330 = new lib.drop("synched",13);
	this.instance_330.setTransform(254.4,13.6,1,1,0,0,0,-47.7,136.3);

	this.instance_331 = new lib.drop("synched",13);
	this.instance_331.setTransform(133.6,75.6,1,1,0,0,0,-47.7,136.3);

	this.instance_332 = new lib.drop("synched",13);
	this.instance_332.setTransform(92.75,83.25,1,1,0,0,0,-47.7,136.3);

	this.instance_333 = new lib.drop("synched",13);
	this.instance_333.setTransform(34.6,48.1,1,1,0,0,0,-47.7,136.3);

	this.instance_334 = new lib.drop("synched",13);
	this.instance_334.setTransform(198.8,60.9,1,1,0,0,0,-47.7,136.3);

	this.instance_335 = new lib.drop("synched",13);
	this.instance_335.setTransform(163,20.65,1,1,0,0,0,-47.7,136.3);

	this.instance_336 = new lib.drop("synched",13);
	this.instance_336.setTransform(118.3,24.45,1,1,0,0,0,-47.7,136.3);

	this.instance_337 = new lib.drop("synched",13);
	this.instance_337.setTransform(260.15,24.45,1,1,0,0,0,-47.7,136.3);

	this.instance_338 = new lib.drop("synched",13);
	this.instance_338.setTransform(283.8,73.05,1,1,0,0,0,-47.7,136.3);

	this.instance_339 = new lib.drop("synched",13);
	this.instance_339.setTransform(220.55,42.35,1,1,0,0,0,-47.7,136.3);

	this.instance_340 = new lib.drop("synched",13);
	this.instance_340.setTransform(279.3,25.1,1,1,0,0,0,-47.7,136.3);

	this.instance_341 = new lib.drop("synched",13);
	this.instance_341.setTransform(287.25,139.65,1,1,0,0,0,-90.1,197.2);

	this.instance_342 = new lib.drop("synched",13);
	this.instance_342.setTransform(309.55,141.25,1,1,0,0,0,-90.1,197.2);

	this.instance_343 = new lib.drop("synched",13);
	this.instance_343.setTransform(322.3,139.65,1,1,0,0,0,-90.1,197.2);

	this.instance_344 = new lib.drop("synched",13);
	this.instance_344.setTransform(338.25,132.5,1,1,0,0,0,-90.1,197.2);

	this.instance_345 = new lib.drop("synched",13);
	this.instance_345.setTransform(358.95,128.5,1,1,0,0,0,-90.1,197.2);

	this.instance_346 = new lib.drop("synched",13);
	this.instance_346.setTransform(335.85,107,1,1,0,0,0,-90.1,197.2);

	this.instance_347 = new lib.drop("synched",13);
	this.instance_347.setTransform(280.05,117.35,1,1,0,0,0,-90.1,197.2);

	this.instance_348 = new lib.drop("synched",13);
	this.instance_348.setTransform(365.35,138.05,1,1,0,0,0,-90.1,197.2);

	this.instance_349 = new lib.drop("synched",13);
	this.instance_349.setTransform(394.05,122.15,1,1,0,0,0,-90.1,197.2);

	this.instance_350 = new lib.drop("synched",13);
	this.instance_350.setTransform(423.5,94.25,1,1,0,0,0,-90.1,197.2);

	this.instance_351 = new lib.drop("synched",13);
	this.instance_351.setTransform(418.75,129.3,1,1,0,0,0,-90.1,197.2);

	this.instance_352 = new lib.drop("synched",13);
	this.instance_352.setTransform(456.2,103.8,1,1,0,0,0,-90.1,197.2);

	this.instance_353 = new lib.drop("synched",13);
	this.instance_353.setTransform(545.45,130.9,1,1,0,0,0,-90.1,197.2);

	this.instance_354 = new lib.drop("synched",13);
	this.instance_354.setTransform(578.9,129.3,1,1,0,0,0,-90.1,197.2);

	this.instance_355 = new lib.drop("synched",13);
	this.instance_355.setTransform(457,126.9,1,1,0,0,0,-90.1,197.2);

	this.instance_356 = new lib.drop("synched",13);
	this.instance_356.setTransform(524.7,120.55,1,1,0,0,0,-90.1,197.2);

	this.instance_357 = new lib.drop("synched",13);
	this.instance_357.setTransform(712.1,-48.35,1,1,0,0,0,15.4,28.1);

	this.shape_407 = new cjs.Shape();
	this.shape_407.graphics.f("#BCBEC0").s().p("Aj7gOIDiiDIEVCfIjjCEg");
	this.shape_407.setTransform(659.0062,597.2736,1.493,1.493);

	this.shape_408 = new cjs.Shape();
	this.shape_408.graphics.f("#A7A9AC").s().p("AiKhEIAAgWIEUCfIAAAWg");
	this.shape_408.setTransform(642.0601,608.7327,1.493,1.493);

	this.shape_409 = new cjs.Shape();
	this.shape_409.graphics.f("#939598").s().p("AhxA2IDiiCIAAAXIjiCCg");
	this.shape_409.setTransform(679.6848,610.8976,1.493,1.493);

	this.shape_410 = new cjs.Shape();
	this.shape_410.graphics.f("#939598").s().p("AAAAIQgGgEAAgHQAAgEACgBQACgCACACQAHAEAAAIQAAAGgDAAIgEgCg");
	this.shape_410.setTransform(693.4431,562.1143,1.4928,1.4928);

	this.shape_411 = new cjs.Shape();
	this.shape_411.graphics.f("#939598").s().p("AgRAXIAAg1IARALQATALAAARQAAAJgGACQgGABgHgEIgFgEIAAASgAgFACIAFADQAGAEAAgHQAAgGgGgEIgFgDg");
	this.shape_411.setTransform(690.1217,556.2449,1.4928,1.4928);

	this.shape_412 = new cjs.Shape();
	this.shape_412.graphics.f("#939598").s().p("AAAAJQgGgFAAgHQAAgIAGADQAHAEAAAIQAAAGgDAAIgEgBg");
	this.shape_412.setTransform(684.8597,557.1566,1.4928,1.4928);

	this.shape_413 = new cjs.Shape();
	this.shape_413.graphics.f("#939598").s().p("AgFAXIAAg1IALAIIAAA1g");
	this.shape_413.setTransform(681.4264,552.2891,1.4928,1.4928);

	this.shape_414 = new cjs.Shape();
	this.shape_414.graphics.f("#939598").s().p("AAAAJQgGgEAAgIQAAgIAGADQAHAFAAAHQAAAEgCABIgCABIgDgBg");
	this.shape_414.setTransform(677.993,553.1906,1.4928,1.4928);

	this.shape_415 = new cjs.Shape();
	this.shape_415.graphics.f("#939598").s().p("AAGAeIgHgWIgFgDIAAASIgNgHIAAg1IASAKQASAKAAARQAAALgHABIAKAagAgGgFIAEACQAHAEAAgHQAAgGgHgEIgEgDg");
	this.shape_415.setTransform(673.1788,547.5122,1.4928,1.4928);

	this.shape_416 = new cjs.Shape();
	this.shape_416.graphics.f("#939598").s().p("AgQAWIgfgSIAQgWIgQgoIAfASIAQgXIAQAqIAhASIgQAWIAQApIghgTIgQAXgAAAAsIAGgJIgLgHgAAhAoIgGgOIgFAIIALAGgAgVgMIAKAbIAWANIALgPIgLgbIgWgNgAgUAJIgHgNIgFAGIAMAHgAAbAGIAGgHIgLgHgAgbgZIAHgIIgMgGgAAGgbIgGgQIgFAJIALAHg");
	this.shape_416.setTransform(682.2976,571.2573,1.493,1.493);

	this.shape_417 = new cjs.Shape();
	this.shape_417.graphics.f("#BCBEC0").s().p("Ah9BtIAAkQQAAg8AlgWQAlgVAzAeQA0AeAlBAQAlBAAAA8IAAEQg");
	this.shape_417.setTransform(682.2976,559.2093,1.493,1.493);

	this.shape_418 = new cjs.Shape();
	this.shape_418.graphics.f("#939598").s().p("Ahzi0QABgLABgLIgWgZIA3ggQARgMAXACQAYABAaAQQA0AeAmBAQAlBAAAA8IAAEQIg4Agg");
	this.shape_418.setTransform(689.091,556.8365,1.493,1.493);

	this.shape_419 = new cjs.Shape();
	this.shape_419.graphics.f("#CDCFD1").s().p("AlpANIGAjdIFSDEIl/Ddg");
	this.shape_419.setTransform(666.0135,596.5496,1.4928,1.4928);

	this.shape_420 = new cjs.Shape();
	this.shape_420.graphics.f("#A7A9AC").s().p("AiohAIAAhCIFRDDIAABCg");
	this.shape_420.setTransform(637.3197,618.1015,1.493,1.493);

	this.shape_421 = new cjs.Shape();
	this.shape_421.graphics.f("#939598").s().p("Ai/BOIF/jdIAABCIl/Ddg");
	this.shape_421.setTransform(691.2932,616.1232,1.493,1.493);

	this.shape_422 = new cjs.Shape();
	this.shape_422.graphics.f().s("#666666").ss(1,1,1).p("AgVAAIArAA");
	this.shape_422.setTransform(549.5,553);

	this.shape_423 = new cjs.Shape();
	this.shape_423.graphics.f("#FF5B7E").s().p("AgfELIAAoGIAAgPIA/AAIAAIVg");
	this.shape_423.setTransform(554.875,578.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67,p:{scaleX:1,scaleY:1.7939,x:635.525,y:393.0989}},{t:this.instance_18,p:{scaleX:1,scaleY:1.794,x:543.5,y:378.7}},{t:this.shape_66,p:{scaleX:1,scaleY:1.7939,x:556.975,y:555.1863}},{t:this.shape_65,p:{scaleX:1,scaleY:1.7939,x:78.6,y:392.7167}},{t:this.instance_17,p:{scaleX:1,scaleY:1.794,x:-43.75,y:378.25}},{t:this.shape_64,p:{scaleX:1,scaleY:1.7939,x:157.175,y:554.7378}},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.instance_10},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.instance_9},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.instance_8},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.instance_7},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.shape_362},{t:this.instance_19},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67,p:{scaleX:0.9999,scaleY:1.7979,x:636.4318,y:391.8512}},{t:this.instance_18,p:{scaleX:0.9999,scaleY:1.798,x:543.75,y:377.55}},{t:this.shape_66,p:{scaleX:0.9999,scaleY:1.7979,x:557.8926,y:554.2998}},{t:this.shape_65,p:{scaleX:0.9999,scaleY:1.7979,x:79.5833,y:391.4681}},{t:this.instance_17,p:{scaleX:0.9999,scaleY:1.798,x:-42.3,y:377.1}},{t:this.shape_64,p:{scaleX:0.9999,scaleY:1.7979,x:158.1475,y:553.8504}},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.instance_10},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.instance_9},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.instance_8},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.instance_7},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_6},{t:this.instance_5},{t:this.instance_1},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20}]},119).to({state:[{t:this.instance_19},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_406,p:{scaleX:1,x:582.775}},{t:this.shape_405,p:{scaleX:1,x:963.225}},{t:this.shape_404,p:{scaleX:1,x:959.675}},{t:this.instance_18,p:{scaleX:2.7792,scaleY:1.8121,x:520.55,y:376.6}},{t:this.shape_403,p:{scaleX:1,x:558.025}},{t:this.shape_402},{t:this.instance_17,p:{scaleX:1,scaleY:1.8121,x:-42.75,y:376.15}},{t:this.shape_401},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_400},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.instance_10},{t:this.shape_50},{t:this.shape_49},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_42},{t:this.shape_41},{t:this.shape_390},{t:this.shape_389},{t:this.instance_9},{t:this.shape_388},{t:this.shape_37},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_30},{t:this.shape_29},{t:this.shape_381},{t:this.shape_27},{t:this.shape_380},{t:this.instance_8},{t:this.shape_25},{t:this.shape_24},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_17},{t:this.shape_16},{t:this.shape_373},{t:this.shape_14},{t:this.shape_372},{t:this.instance_7},{t:this.shape_12},{t:this.shape_11},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_4},{t:this.shape_365},{t:this.shape_364},{t:this.shape_1},{t:this.shape_363},{t:this.instance_6},{t:this.instance_5},{t:this.instance_1},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44}]},143).to({state:[{t:this.shape_423},{t:this.shape_422},{t:this.instance_19},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_406,p:{scaleX:0.4381,x:590.8375}},{t:this.shape_405,p:{scaleX:0.4381,x:757.5282}},{t:this.shape_404,p:{scaleX:0.4381,x:755.9728}},{t:this.instance_18,p:{scaleX:1.2178,scaleY:1.8121,x:563.45,y:376.6}},{t:this.shape_403,p:{scaleX:0.4381,x:579.9936}},{t:this.shape_402},{t:this.instance_17,p:{scaleX:1,scaleY:1.8121,x:-42.75,y:376.15}},{t:this.shape_401},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.shape_361},{t:this.shape_360},{t:this.shape_359},{t:this.shape_358},{t:this.shape_357},{t:this.shape_356},{t:this.shape_355},{t:this.shape_354},{t:this.shape_353},{t:this.shape_352},{t:this.shape_351},{t:this.shape_350},{t:this.shape_349},{t:this.shape_348},{t:this.shape_347},{t:this.shape_346},{t:this.shape_345},{t:this.shape_344},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_336},{t:this.shape_335},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_400},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_399},{t:this.shape_398},{t:this.shape_397},{t:this.instance_10},{t:this.shape_50},{t:this.shape_49},{t:this.shape_396},{t:this.shape_395},{t:this.shape_394},{t:this.shape_393},{t:this.shape_392},{t:this.shape_391},{t:this.shape_42},{t:this.shape_41},{t:this.shape_390},{t:this.shape_389},{t:this.instance_9},{t:this.shape_12},{t:this.shape_11},{t:this.shape_371},{t:this.shape_370},{t:this.shape_369},{t:this.shape_368},{t:this.shape_367},{t:this.shape_366},{t:this.shape_4},{t:this.shape_365},{t:this.shape_364},{t:this.shape_1},{t:this.shape_363},{t:this.instance_6},{t:this.instance_5},{t:this.shape_421},{t:this.shape_420},{t:this.shape_419},{t:this.shape_418},{t:this.shape_417},{t:this.shape_416},{t:this.shape_415},{t:this.shape_414},{t:this.shape_413},{t:this.shape_412},{t:this.shape_411},{t:this.shape_410},{t:this.shape_409},{t:this.shape_408},{t:this.shape_407},{t:this.shape_25},{t:this.shape_24},{t:this.shape_379},{t:this.shape_378},{t:this.shape_377},{t:this.shape_376},{t:this.shape_375},{t:this.shape_374},{t:this.shape_17},{t:this.shape_16},{t:this.shape_373},{t:this.shape_14},{t:this.shape_372},{t:this.instance_7},{t:this.shape_388},{t:this.shape_37},{t:this.shape_387},{t:this.shape_386},{t:this.shape_385},{t:this.shape_384},{t:this.shape_383},{t:this.shape_382},{t:this.shape_30},{t:this.shape_29},{t:this.shape_381},{t:this.shape_27},{t:this.shape_380},{t:this.instance_8},{t:this.instance_357},{t:this.instance_356},{t:this.instance_355},{t:this.instance_354},{t:this.instance_353},{t:this.instance_352},{t:this.instance_351},{t:this.instance_350},{t:this.instance_349},{t:this.instance_348},{t:this.instance_347},{t:this.instance_346},{t:this.instance_345},{t:this.instance_344},{t:this.instance_343},{t:this.instance_342},{t:this.instance_341},{t:this.instance_340},{t:this.instance_339},{t:this.instance_338},{t:this.instance_337},{t:this.instance_336},{t:this.instance_335},{t:this.instance_334},{t:this.instance_333},{t:this.instance_332},{t:this.instance_331},{t:this.instance_330},{t:this.instance_329},{t:this.instance_328},{t:this.instance_327},{t:this.instance_326},{t:this.instance_325},{t:this.instance_324},{t:this.instance_323},{t:this.instance_322},{t:this.instance_321},{t:this.instance_320},{t:this.instance_319},{t:this.instance_318},{t:this.instance_317},{t:this.instance_316},{t:this.instance_315},{t:this.instance_314},{t:this.instance_313},{t:this.instance_312},{t:this.instance_311},{t:this.instance_310},{t:this.instance_309},{t:this.instance_308},{t:this.instance_307},{t:this.instance_306},{t:this.instance_305},{t:this.instance_304},{t:this.instance_303},{t:this.instance_302},{t:this.instance_301},{t:this.instance_300},{t:this.instance_299},{t:this.instance_298},{t:this.instance_297},{t:this.instance_296},{t:this.instance_295},{t:this.instance_294},{t:this.instance_293},{t:this.instance_292},{t:this.instance_291},{t:this.instance_290},{t:this.instance_289},{t:this.instance_288},{t:this.instance_287},{t:this.instance_286},{t:this.instance_285},{t:this.instance_284},{t:this.instance_283},{t:this.instance_282},{t:this.instance_281},{t:this.instance_280},{t:this.instance_279},{t:this.instance_278},{t:this.instance_277},{t:this.instance_276},{t:this.instance_275},{t:this.instance_274},{t:this.instance_273},{t:this.instance_272},{t:this.instance_271},{t:this.instance_270},{t:this.instance_269},{t:this.instance_268},{t:this.instance_267},{t:this.instance_266},{t:this.instance_265},{t:this.instance_264},{t:this.instance_263},{t:this.instance_262},{t:this.instance_261},{t:this.instance_260},{t:this.instance_259},{t:this.instance_258},{t:this.instance_257},{t:this.instance_256},{t:this.instance_255},{t:this.instance_254},{t:this.instance_253},{t:this.instance_252},{t:this.instance_251},{t:this.instance_250},{t:this.instance_249},{t:this.instance_248},{t:this.instance_247},{t:this.instance_246},{t:this.instance_245},{t:this.instance_244},{t:this.instance_243},{t:this.instance_242},{t:this.instance_241},{t:this.instance_240},{t:this.instance_239},{t:this.instance_238},{t:this.instance_237},{t:this.instance_236},{t:this.instance_235},{t:this.instance_234},{t:this.instance_233},{t:this.instance_232},{t:this.instance_231},{t:this.instance_230},{t:this.instance_229},{t:this.instance_228},{t:this.instance_227},{t:this.instance_226},{t:this.instance_225},{t:this.instance_224},{t:this.instance_223},{t:this.instance_222},{t:this.instance_221},{t:this.instance_220},{t:this.instance_219},{t:this.instance_218},{t:this.instance_217},{t:this.instance_216},{t:this.instance_215},{t:this.instance_214},{t:this.instance_213},{t:this.instance_212},{t:this.instance_211},{t:this.instance_210},{t:this.instance_209},{t:this.instance_208},{t:this.instance_207},{t:this.instance_206},{t:this.instance_205},{t:this.instance_204},{t:this.instance_203},{t:this.instance_202},{t:this.instance_201},{t:this.instance_200},{t:this.instance_199},{t:this.instance_198},{t:this.instance_197},{t:this.instance_196},{t:this.instance_195},{t:this.instance_194},{t:this.instance_193},{t:this.instance_192},{t:this.instance_191},{t:this.instance_190},{t:this.instance_189},{t:this.instance_188},{t:this.instance_187},{t:this.instance_186},{t:this.instance_185},{t:this.instance_184},{t:this.instance_183},{t:this.instance_182},{t:this.instance_181},{t:this.instance_180},{t:this.instance_179},{t:this.instance_178},{t:this.instance_177},{t:this.instance_176},{t:this.instance_175},{t:this.instance_174},{t:this.instance_173},{t:this.instance_172},{t:this.instance_171},{t:this.instance_170},{t:this.instance_169},{t:this.instance_168},{t:this.instance_167},{t:this.instance_166},{t:this.instance_165},{t:this.instance_164},{t:this.instance_163},{t:this.instance_162},{t:this.instance_161},{t:this.instance_160},{t:this.instance_159},{t:this.instance_158},{t:this.instance_157},{t:this.instance_156},{t:this.instance_155},{t:this.instance_154},{t:this.instance_153},{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48}]},169).wait(143));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_background = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// background
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(355.3,394.4,1,1,0,0,0,405.5,402.9);

	this.instance_1 = new lib.yellowleaf("synched",0);
	this.instance_1.setTransform(591.1,239.6,1,1,0,0,0,23.4,21.6);

	this.instance_2 = new lib.yellowleaf("synched",0);
	this.instance_2.setTransform(610.5,148.3,1,1,0,0,0,23.4,21.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#86745D","#585A5D","#423142"],[0.153,0.514,1],0,-547.6,0,215.7).s().p("Eg6NAhhMAAAhDBMB0cAAAMAAABDBg");
	this.shape.setTransform(363.6,202.2);

	this.instance_3 = new lib.yellowleaf("synched",116);
	this.instance_3.setTransform(591.1,239.6,1,1,0,0,0,23.4,21.6);

	this.instance_4 = new lib.yellowleaf("synched",116);
	this.instance_4.setTransform(610.5,148.3,1,1,0,0,0,23.4,21.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance,p:{x:355.3,y:394.4}}]}).to({state:[{t:this.instance,p:{x:355.3,y:394.4}}]},119).to({state:[{t:this.instance,p:{x:377.7,y:382.3}}]},46).to({state:[{t:this.instance,p:{x:355.3,y:394.4}},{t:this.instance_2,p:{x:610.5,y:148.3,regY:21.6,startPosition:0}},{t:this.instance_1,p:{x:591.1,y:239.6,regY:21.6,startPosition:0}}]},97).to({state:[{t:this.instance_2,p:{x:610.5,y:148.3,regY:21.6,startPosition:0}},{t:this.instance_1,p:{x:591.1,y:239.6,regY:21.6,startPosition:0}},{t:this.shape,p:{x:363.6,y:202.2}}]},169).to({state:[{t:this.instance_4,p:{regY:21.6,x:610.5,y:148.3,startPosition:116}},{t:this.instance_3,p:{regY:21.6,x:591.1,y:239.6,startPosition:116}},{t:this.instance_2,p:{x:619.55,y:143.15,regY:21.6,startPosition:0}},{t:this.instance_1,p:{x:600.15,y:234.45,regY:21.6,startPosition:0}},{t:this.shape,p:{x:372.65,y:197.05}}]},80).to({state:[{t:this.instance_4,p:{regY:21.7,x:610.1,y:148.35,startPosition:35}},{t:this.instance_3,p:{regY:21.7,x:590.7,y:239.65,startPosition:35}},{t:this.instance_2,p:{x:619.15,y:143.2,regY:21.7,startPosition:39}},{t:this.instance_1,p:{x:599.75,y:234.5,regY:21.7,startPosition:39}},{t:this.shape,p:{x:372.2444,y:197.0968}}]},39).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.mommystatic = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.hands();
	this.instance.setTransform(28.8,67.35,1,1,0,-14.9992,165.0008,15.4,6.3);

	this.instance_1 = new lib.mommouth();
	this.instance_1.setTransform(23.4,31.1);

	this.instance_2 = new lib.hairFront("synched",0,false);
	this.instance_2.setTransform(24.35,20.45,1,1,0,0,0,8.9,4.8);

	this.instance_3 = new lib.hands();
	this.instance_3.setTransform(20.9,68.35,1,1,14.9992,0,0,15.4,6.3);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFC0BB").s().p("AgFACQgGgJAEgCQAEgCAEABIAFACIAEAIIgIALIAAAAQgCAAgFgJg");
	this.shape.setTransform(16.2738,26.119);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F99893").s().p("AgKADIAAAAIAWgCIAKgFIgEAEIgGADIgGACIgGAAQgFAAgFgCgAgVgDIAKAEIgBABQgGgCgDgDg");
	this.shape_1.setTransform(24.875,31.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F99893").s().p("AACAMIABgEIgDgEIgDgEIgCgGIAAgLIADALIACAFIACADQADACABACQABADgCAEQgEAFgGAAQAFgCACgEg");
	this.shape_2.setTransform(25.3583,28.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#07085B").s().p("AALACIgCgBQgFgBgDAAIgIAAIgKACQADgDAFgCQAEgCAGAAQAHABADADIAEACIADAFg");
	this.shape_3.setTransform(27.75,25.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#07085B").s().p("AgOABIAEgCQAEgDAGgBQAFAAAFACQAFACADADIgKgCIgIAAIgIABIgCABIgHAEg");
	this.shape_4.setTransform(21.5,25.22);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#333333").s().p("AgFAAQAAgFAFAAQACgBADACQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQABAGgHABQgFAAAAgHg");
	this.shape_5.setTransform(27.55,26.845);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgDAFQgBgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAgBQABgFAFgBQACAAADACQAAABAAAAQABABAAABQAAAAAAABQABAAAAAAQAAAGgHAAIAAABIgDgCg");
	this.shape_6.setTransform(21.95,26.755);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFC0BB").s().p("AAABYQgZAAgUgRQgTgSgEgbIgEADQgGADgIgEQgHgDgEgIQgEgJACgHQABgHAHgEQAGgDAJAEQgCggAXgXQAXgXAgABQAhgBAXAXQAWAXgBAgQAIgEAHADQAGAEACAHQACAHgEAJQgEAIgIADQgHAEgHgDIgDgDQgEAbgUASQgTARgZAAIgBAAg");
	this.shape_7.setTransform(24.5608,26.2486);

	this.instance_4 = new lib.Path_18();
	this.instance_4.setTransform(24.85,38.8,1,1,0,0,0,4.4,1.4);
	this.instance_4.compositeOperation = "multiply";

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#DAEEF7").s().p("AAICZIgggDQgtgFgChbQgChaABgGIhIgaQAeg2AYgSQAYgSAdAKIAZAQQAKAEAKABQAPgBANgGIASgOIAAADQAdgKAfAYQAcAXADAcQABAEgfARQgfASAAADQACAVAAAZQAAAVgBAFQgBADABAnIACBGIgVACIgYACIghADIgBAAg");
	this.shape_8.setTransform(23.9754,52.3359);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F99893").s().p("AgZAKIAAgaIA0AAIAAAfQgMACgLAAQgQAAgNgHg");
	this.shape_9.setTransform(24.8,34.0707);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFC0BB").s().p("AgaAvIAAhdIA1AAIAABdg");
	this.shape_10.setTransform(24.825,38.65);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFC0BB").s().p("AgdgBIgOgXIBXAAIgEANIg3AkIgOgag");
	this.shape_11.setTransform(24.8,39.95);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#55769F").s().p("Ag/D2Igki3IgKCzIhCgKQgTipA6irQATg2AYgwIAUglIA/APIABAAIAAgBIACAAIADAAIAAABIABAAIA+gPIATAaQAXAjATAuQA8CVAADSQhLAdhsAAQgdAAgfgCg");
	this.shape_12.setTransform(25.1563,87.1242);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#07085B").s().p("AgyAOQgGAAAAgHIAAgUQBQAZAQgTIAOAIQAEACgBAGQgCAFgFAAg");
	this.shape_13.setTransform(33.0688,142.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFC0BB").s().p("AglE4QgHAAAAgHIgZoxQAZgaAcgQQA2ggALAyQARBNg4HRIA4AlQAFACgCAGQgBAFgGAAg");
	this.shape_14.setTransform(31.8188,112.3294);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#07085B").s().p("AgxAOQgFAAgCgFQgBgGAEgCIANgIQARATBQgZIAAAUQAAAHgGAAg");
	this.shape_15.setTransform(17.6563,142.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFC0BB").s().p("Ag9E4QgGAAgBgFQgCgGAFgCIA4glQgQh+gMiFQgWjqALgxQAMgyA1AgQAcAQAZAaIgaIxQAAAHgGAAg");
	this.shape_16.setTransform(18.9313,112.3294);

	this.instance_5 = new lib.hair_back("synched",0,false);
	this.instance_5.setTransform(4.7,40.35,1,1,0,0,0,15.1,14.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFC0BB").s().p("AgHCBIgOgKIAnhrIhohtQACgMAGgLQALgYARADIB5BxQAPAVABAMQABAOgPATIg7BoQgMgGgJgHg");
	this.shape_17.setTransform(36.7155,56.4137,1,1,14.9992);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFC0BB").s().p("AgHCBIgOgKIAnhrIhohtQACgMAGgLQALgYARADIB5BxQAPAVABAMQABAOgPATIg7BoQgMgGgJgHg");
	this.shape_18.setTransform(12.9845,55.4137,1,1,0,-14.9992,165.0008);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.instance_5},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance_4},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.7,13.5,40.4,130);


(lib.manwalking = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.man("synched",0);
	this.instance.setTransform(-29.15,-298.4,0.0922,0.0921,0,0,0,430.2,948.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:479.8,regY:927,x:-17.7,y:-300.35,startPosition:1},0).wait(1).to({x:-10.8,startPosition:2},0).wait(1).to({x:-3.9,startPosition:3},0).wait(1).to({x:2.95,startPosition:4},0).wait(1).to({x:9.85,startPosition:5},0).wait(1).to({x:16.75,startPosition:6},0).wait(1).to({x:23.65,startPosition:7},0).wait(1).to({x:30.5,startPosition:8},0).wait(1).to({x:37.4,startPosition:9},0).wait(1).to({x:44.25,startPosition:10},0).wait(1).to({x:51.15,startPosition:11},0).wait(1).to({x:58,startPosition:12},0).wait(1).to({x:64.9,startPosition:13},0).wait(1).to({x:71.8,startPosition:14},0).wait(1).to({x:78.7,startPosition:15},0).wait(1).to({x:85.55,startPosition:16},0).wait(1).to({x:92.45,startPosition:17},0).wait(1).to({x:99.35,startPosition:18},0).wait(1).to({x:106.25,startPosition:19},0).wait(1).to({x:113.15,startPosition:20},0).wait(1).to({x:120,startPosition:21},0).wait(1).to({x:126.9,startPosition:22},0).wait(1).to({x:133.8,startPosition:23},0).wait(1).to({x:140.7,startPosition:24},0).wait(1).to({x:147.55,startPosition:25},0).wait(1).to({x:154.45,startPosition:26},0).wait(1).to({x:161.35,startPosition:27},0).wait(1).to({x:168.25,startPosition:28},0).wait(1).to({x:175.1,startPosition:29},0).wait(1).to({x:182,startPosition:30},0).wait(1).to({x:188.9,startPosition:31},0).wait(1).to({x:195.8,startPosition:32},0).wait(1).to({x:202.65,startPosition:33},0).wait(1).to({x:209.55,startPosition:34},0).wait(1).to({x:216.45,startPosition:35},0).wait(1).to({x:223.35,startPosition:36},0).wait(1).to({x:230.2,startPosition:37},0).wait(1).to({x:237.1,startPosition:38},0).wait(1).to({x:244,startPosition:39},0).wait(1).to({x:250.9,startPosition:40},0).wait(1).to({x:257.75,startPosition:41},0).wait(1).to({x:264.65,startPosition:42},0).wait(1).to({x:271.55,startPosition:43},0).wait(1).to({x:278.45,startPosition:44},0).wait(1).to({x:285.3,startPosition:45},0).wait(1).to({x:292.2,startPosition:46},0).wait(1).to({x:299.1,startPosition:47},0).wait(1).to({x:306,startPosition:48},0).wait(1).to({x:312.85,startPosition:49},0).wait(1).to({x:319.75,startPosition:50},0).wait(1).to({x:326.65,startPosition:51},0).wait(1).to({x:333.55,startPosition:52},0).wait(1).to({x:340.4,startPosition:53},0).wait(1).to({x:347.3,startPosition:54},0).wait(1).to({x:354.2,startPosition:55},0).wait(1).to({x:361.1,startPosition:56},0).wait(1).to({x:368,startPosition:57},0).wait(1).to({x:374.85,startPosition:58},0).wait(1).to({x:381.75,startPosition:59},0).wait(1).to({x:388.65,startPosition:60},0).wait(1).to({x:395.55,startPosition:61},0).wait(1).to({x:402.4,startPosition:62},0).wait(1).to({x:409.3,startPosition:63},0).wait(1).to({x:416.2,startPosition:64},0).wait(1).to({x:423.1,startPosition:65},0).wait(1).to({x:429.95,startPosition:66},0).wait(1).to({x:436.85,startPosition:67},0).wait(1).to({x:443.75,startPosition:68},0).wait(1).to({x:450.65,startPosition:69},0).wait(1).to({x:457.5,startPosition:70},0).wait(1).to({startPosition:71},0).wait(1).to({skewY:180,x:448.4,startPosition:72},0).wait(1).to({scaleX:0.0921,x:441.25,startPosition:73},0).wait(1).to({x:434.15,startPosition:74},0).wait(1).to({scaleX:0.092,x:426.95,startPosition:75},0).wait(1).to({scaleX:0.0919,x:419.85,startPosition:76},0).wait(1).to({x:412.7,startPosition:77},0).wait(1).to({scaleX:0.0918,x:405.55,startPosition:78},0).wait(1).to({x:398.4,startPosition:79},0).wait(1).to({scaleX:0.0917,x:391.3,startPosition:80},0).wait(1).to({x:384.15,startPosition:81},0).wait(1).to({scaleX:0.0916,x:377,startPosition:82},0).wait(1).to({scaleX:0.0915,x:369.9,startPosition:83},0).wait(1).to({x:362.7,startPosition:84},0).wait(1).to({scaleX:0.0914,x:355.6,startPosition:85},0).wait(1).to({x:348.45,startPosition:86},0).wait(1).to({scaleX:0.0913,x:341.3,startPosition:87},0).wait(1).to({x:334.15,startPosition:88},0).wait(1).to({scaleX:0.0912,x:327.05,startPosition:89},0).wait(1).to({scaleX:0.0911,x:319.85,startPosition:90},0).wait(1).to({x:312.75,startPosition:91},0).wait(1).to({scaleX:0.091,x:305.6,startPosition:92},0).wait(1).to({x:298.45,startPosition:93},0).wait(1).to({scaleX:0.0909,x:291.35,startPosition:94},0).wait(1).to({x:284.2,startPosition:95},0).wait(1).to({scaleX:0.0908,x:277.05,startPosition:96},0).wait(1).to({x:269.9,startPosition:97},0).wait(1).to({scaleX:0.0907,x:262.8,startPosition:98},0).wait(1).to({scaleX:0.0906,x:255.6,startPosition:99},0).wait(1).to({x:248.5,startPosition:100},0).wait(1).to({scaleX:0.0905,x:241.3,startPosition:101},0).wait(1).to({x:234.2,startPosition:102},0).wait(1).to({scaleX:0.0904,x:227.05,startPosition:103},0).wait(1).to({x:219.9,startPosition:104},0).wait(1).to({scaleX:0.0903,x:212.8,startPosition:105},0).wait(1).to({scaleX:0.0902,x:205.65,startPosition:106},0).wait(1).to({x:198.5,startPosition:107},0).wait(1).to({scaleX:0.0901,x:191.35,startPosition:108},0).wait(1).to({x:184.25,startPosition:109},0).wait(1).to({scaleX:0.09,x:177.05,startPosition:110},0).wait(1).to({x:169.95,startPosition:111},0).wait(1).to({scaleX:0.0899,x:162.8,startPosition:112},0).wait(1).to({scaleX:0.0898,x:155.65,startPosition:113},0).wait(1).to({x:148.5,startPosition:114},0).wait(1).to({scaleX:0.0897,x:141.4,startPosition:115},0).wait(1).to({x:134.2,startPosition:116},0).wait(1).to({scaleX:0.0896,x:127.1,startPosition:117},0).wait(1).to({x:120,startPosition:118},0).wait(1).to({scaleX:0.0895,x:112.8,startPosition:119},0).wait(1).to({x:105.7,startPosition:0},0).wait(1).to({scaleX:0.0894,x:98.55,startPosition:1},0).wait(1).to({scaleX:0.0893,x:91.4,startPosition:2},0).wait(1).to({x:84.25,startPosition:3},0).wait(1).to({scaleX:0.0892,x:77.15,startPosition:4},0).wait(1).to({x:69.95,startPosition:5},0).wait(1).to({scaleX:0.0891,x:62.85,startPosition:6},0).wait(1).to({x:55.7,startPosition:7},0).wait(1).to({scaleX:0.089,x:48.55,startPosition:8},0).wait(1).to({scaleX:0.0889,x:41.4,startPosition:9},0).wait(1).to({x:34.3,startPosition:10},0).wait(1).to({scaleX:0.0888,x:27.15,startPosition:11},0).wait(1).to({x:20,startPosition:12},0).wait(1).to({scaleX:0.0887,x:12.9,startPosition:13},0).wait(1).to({x:5.7,startPosition:14},0).wait(1).to({scaleX:0.0886,x:-1.4,startPosition:15},0).wait(1).to({scaleX:0.0885,x:-8.6,startPosition:16},0).wait(1).to({x:-15.7,startPosition:17},0).wait(1).to({scaleX:0.0884,x:-22.85,startPosition:18},0).wait(1).to({x:-30,startPosition:19},0).wait(1).to({scaleX:0.0883,x:-37.1,startPosition:20},0).wait(1).to({x:-44.2,startPosition:21},0).wait(1).to({scaleX:0.0882,x:-51.35,startPosition:22},0).wait(1).to({scaleX:0.0921,skewY:0,x:-42.4,startPosition:23},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.5,-386.5,579.1,172.1);


(lib.kid = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol4();
	this.instance.setTransform(38.1,61.95,1,1,0,0,0,38.1,41.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,20.9,76.3,82.30000000000001);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.kid("synched",0);
	this.instance.setTransform(91.1,41.15,1,1,0,0,0,40.6,62);

	this.instance_1 = new lib.Symbol2();
	this.instance_1.setTransform(85.4,39.35,1,1,0,0,0,85.4,36.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,170.7,82.3), null);


(lib.staticswing = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol5();
	this.instance.setTransform(85.4,38.25,1,1,0,0,0,85.4,41.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:41.2,scaleX:1.0099,scaleY:1.0099,x:85.45,y:38.35},0).wait(1).to({scaleX:1.0198,scaleY:1.0198},0).wait(1).to({scaleX:1.0297,scaleY:1.0297},0).wait(1).to({scaleX:1.0397,scaleY:1.0397,y:38.4},0).wait(1).to({scaleX:1.0496,scaleY:1.0496},0).wait(1).to({scaleX:1.0595,scaleY:1.0595},0).wait(1).to({scaleX:1.0694,scaleY:1.0694,y:38.35},0).wait(1).to({scaleX:1.0793,scaleY:1.0793,x:85.4},0).wait(1).to({scaleX:1.0892,scaleY:1.0892,y:38.4},0).wait(1).to({scaleX:1.0991,scaleY:1.0991},0).wait(1).to({scaleX:1.109,scaleY:1.109},0).wait(1).to({scaleX:1.119,scaleY:1.119},0).wait(1).to({scaleX:1.1289,scaleY:1.1289,x:85.45,y:38.35},0).wait(1).to({scaleX:1.1388,scaleY:1.1388},0).wait(1).to({scaleX:1.1487,scaleY:1.1487,y:38.4},0).wait(1).to({scaleX:1.1586,scaleY:1.1586},0).wait(1).to({scaleX:1.1685,scaleY:1.1685},0).wait(1).to({scaleX:1.1784,scaleY:1.1784},0).wait(1).to({scaleX:1.1883,scaleY:1.1883,y:38.35},0).wait(1).to({scaleX:1.1815,scaleY:1.1815,y:38.4},0).wait(1).to({scaleX:1.1746,scaleY:1.1746,x:85.4},0).wait(1).to({scaleX:1.1678,scaleY:1.1678,x:85.45,y:38.35},0).wait(1).to({scaleX:1.1609,scaleY:1.1609,y:38.4},0).wait(1).to({scaleX:1.154,scaleY:1.154},0).wait(1).to({scaleX:1.1472,scaleY:1.1472,x:85.4,y:38.35},0).wait(1).to({scaleX:1.1403,scaleY:1.1403,x:85.45,y:38.4},0).wait(1).to({scaleX:1.1335,scaleY:1.1335},0).wait(1).to({scaleX:1.1266,scaleY:1.1266,x:85.4,y:38.35},0).wait(1).to({scaleX:1.1198,scaleY:1.1198,x:85.45,y:38.4},0).wait(1).to({scaleX:1.1129,scaleY:1.1129},0).wait(1).to({scaleX:1.106,scaleY:1.106,y:38.35},0).wait(1).to({scaleX:1.0992,scaleY:1.0992,x:85.4,y:38.4},0).wait(1).to({scaleX:1.0923,scaleY:1.0923,x:85.45},0).wait(1).to({scaleX:1.0855,scaleY:1.0855,y:38.35},0).wait(1).to({scaleX:1.0786,scaleY:1.0786,x:85.4,y:38.4},0).wait(1).to({scaleX:1.0717,scaleY:1.0717,x:85.45,y:38.35},0).wait(1).to({scaleX:1.0649,scaleY:1.0649},0).wait(1).to({scaleX:1.058,scaleY:1.058,x:85.4,y:38.4},0).wait(1).to({scaleX:1.0512,scaleY:1.0512,y:38.35},0).wait(1).to({scaleX:1.059,scaleY:1.059,x:85.45,y:38.4},0).wait(1).to({scaleX:1.0668,scaleY:1.0668,x:85.4},0).wait(1).to({scaleX:1.0746,scaleY:1.0746,y:38.35},0).wait(1).to({scaleX:1.0824,scaleY:1.0824,x:85.45,y:38.4},0).wait(1).to({scaleX:1.0903,scaleY:1.0903,x:85.4,y:38.35},0).wait(1).to({scaleX:1.0981,scaleY:1.0981,x:85.45,y:38.4},0).wait(1).to({scaleX:1.1059,scaleY:1.1059,y:38.35},0).wait(1).to({scaleX:1.1137,scaleY:1.1137,x:85.4,y:38.4},0).wait(1).to({scaleX:1.1215,scaleY:1.1215,x:85.45,y:38.35},0).wait(1).to({scaleX:1.1294,scaleY:1.1294,y:38.4},0).wait(1).to({scaleX:1.1372,scaleY:1.1372,x:85.4},0).wait(1).to({scaleX:1.145,scaleY:1.145,x:85.45,y:38.35},0).wait(1).to({scaleX:1.1528,scaleY:1.1528,y:38.4},0).wait(1).to({scaleX:1.1606,scaleY:1.1606,x:85.4,y:38.35},0).wait(1).to({scaleX:1.1685,scaleY:1.1685,x:85.45,y:38.4},0).wait(1).to({scaleX:1.1763,scaleY:1.1763,y:38.35},0).wait(1).to({scaleX:1.1841,scaleY:1.1841,x:85.4,y:38.4},0).wait(1).to({scaleX:1.1919,scaleY:1.1919,x:85.45},0).wait(1).to({scaleX:1.1997,scaleY:1.1997},0).wait(1).to({scaleX:1.2076,scaleY:1.2076},0).wait(1).to({scaleX:1.1961,scaleY:1.1961},0).wait(1).to({scaleX:1.1847,scaleY:1.1847,x:85.4},0).wait(1).to({scaleX:1.1732,scaleY:1.1732,x:85.45},0).wait(1).to({scaleX:1.1618,scaleY:1.1618,x:85.4,y:38.35},0).wait(1).to({scaleX:1.1503,scaleY:1.1503,x:85.45,y:38.4},0).wait(1).to({scaleX:1.1389,scaleY:1.1389,x:85.4,y:38.35},0).wait(1).to({scaleX:1.1275,scaleY:1.1275,x:85.45,y:38.4},0).wait(1).to({scaleX:1.116,scaleY:1.116,x:85.4},0).wait(1).to({scaleX:1.1046,scaleY:1.1046,x:85.45,y:38.35},0).wait(1).to({scaleX:1.0931,scaleY:1.0931,y:38.4},0).wait(1).to({scaleX:1.0817,scaleY:1.0817,x:85.4,y:38.35},0).wait(1).to({scaleX:1.0702,scaleY:1.0702,x:85.45,y:38.4},0).wait(1).to({scaleX:1.0588,scaleY:1.0588,x:85.4,y:38.35},0).wait(1).to({scaleX:1.0473,scaleY:1.0473,x:85.45,y:38.4},0).wait(1).to({scaleX:1.0359,scaleY:1.0359,x:85.4},0).wait(1).to({scaleX:1.0244,scaleY:1.0244,x:85.45,y:38.35},0).wait(1).to({scaleX:1.013,scaleY:1.013,x:85.4,y:38.4},0).wait(1).to({scaleX:1.0016,scaleY:1.0016,x:85.45,y:38.35},0).wait(1).to({scaleX:0.9901,scaleY:0.9901,x:85.35,y:38.4},0).wait(1).to({scaleX:0.9787,scaleY:0.9787,x:85.4,y:38.35},0).wait(1).to({scaleX:0.9876,scaleY:0.9876,y:38.4},0).wait(1).to({scaleX:0.9965,scaleY:0.9965,x:85.35,y:38.35},0).wait(1).to({scaleX:1.0054,scaleY:1.0054,x:85.4},0).wait(1).to({scaleX:1.0143,scaleY:1.0143,y:38.4},0).wait(1).to({scaleX:1.0233,scaleY:1.0233,x:85.45,y:38.35},0).wait(1).to({scaleX:1.0322,scaleY:1.0322,y:38.4},0).wait(1).to({scaleX:1.0411,scaleY:1.0411,x:85.4},0).wait(1).to({scaleX:1.05,scaleY:1.05,y:38.35},0).wait(1).to({scaleX:1.0589,scaleY:1.0589,x:85.45,y:38.4},0).wait(1).to({scaleX:1.0679,scaleY:1.0679},0).wait(1).to({scaleX:1.0768,scaleY:1.0768,x:85.4,y:38.35},0).wait(1).to({scaleX:1.0857,scaleY:1.0857,y:38.4},0).wait(1).to({scaleX:1.0946,scaleY:1.0946,x:85.45},0).wait(1).to({scaleX:1.1035,scaleY:1.1035,y:38.35},0).wait(1).to({scaleX:1.1124,scaleY:1.1124,y:38.4},0).wait(1).to({scaleX:1.1214,scaleY:1.1214,x:85.4},0).wait(1).to({scaleX:1.1303,scaleY:1.1303,x:85.45,y:38.35},0).wait(1).to({scaleX:1.1392,scaleY:1.1392,y:38.4},0).wait(1).to({scaleX:1.1481,scaleY:1.1481},0).wait(1).to({scaleX:1.157,scaleY:1.157,x:85.4,y:38.35},0).wait(1).to({scaleX:1.1487,scaleY:1.1487,x:85.45,y:38.4},0).wait(1).to({scaleX:1.1403,scaleY:1.1403},0).wait(1).to({scaleX:1.1319,scaleY:1.1319,x:85.4},0).wait(1).to({scaleX:1.1236,scaleY:1.1236,x:85.45},0).wait(1).to({scaleX:1.1152,scaleY:1.1152},0).wait(1).to({scaleX:1.1068,scaleY:1.1068,x:85.4},0).wait(1).to({scaleX:1.0985,scaleY:1.0985,y:38.35},0).wait(1).to({scaleX:1.0901,scaleY:1.0901,x:85.45},0).wait(1).to({scaleX:1.0818,scaleY:1.0818},0).wait(1).to({scaleX:1.0734,scaleY:1.0734,x:85.4},0).wait(1).to({scaleX:1.065,scaleY:1.065,x:85.45,y:38.4},0).wait(1).to({scaleX:1.0567,scaleY:1.0567},0).wait(1).to({scaleX:1.0483,scaleY:1.0483,x:85.4},0).wait(1).to({scaleX:1.0399,scaleY:1.0399},0).wait(1).to({scaleX:1.0316,scaleY:1.0316,x:85.45},0).wait(1).to({scaleX:1.0232,scaleY:1.0232,y:38.35},0).wait(1).to({scaleX:1.0148,scaleY:1.0148,x:85.4},0).wait(1).to({scaleX:1.0065,scaleY:1.0065},0).wait(1).to({scaleX:0.9981,scaleY:0.9981},0).wait(1).to({scaleX:0.9897,scaleY:0.9897,x:85.35,y:38.4},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.7,-11.2,206.1,99.4);


(lib.Scene_1_mommy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// mommy
	this.instance = new lib.mommystatic();
	this.instance.setTransform(352.8,387.6,1,1,0,0,0,25.8,65.8);

	this.instance_1 = new lib.mommy("synched",0);
	this.instance_1.setTransform(352.8,387.6,1,1,0,0,0,25.8,65.8);

	this.instance_2 = new lib.tears();
	this.instance_2.setTransform(15.55,63.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1,p:{x:352.8,y:387.6,mode:"synched",startPosition:0,scaleX:1,scaleY:1}}]},1).to({state:[{t:this.instance_1,p:{x:389.2,y:393.05,mode:"independent",startPosition:undefined,scaleX:1,scaleY:1}}]},118).to({state:[{t:this.instance_1,p:{x:112.3,y:517.45,mode:"independent",startPosition:undefined,scaleX:1.4201,scaleY:1.4201}},{t:this.instance_2}]},143).to({state:[]},169).wait(143));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_kid = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// kid
	this.instance = new lib.staticswing();
	this.instance.setTransform(388.25,411.75,1,1,0,0,0,85.4,36.5);

	this.instance_1 = new lib.ClipGroup_0();
	this.instance_1.setTransform(359.95,397.05,1,1,0,0,0,3.4,21.8);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#B19575").ss(1,1,1).p("AszLAIAA2AAM0KdIAA1R");
	this.shape.setTransform(388.675,372.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#B19575").ss(0.1,1,1).p("AJxnuIAAOLApwnuIAAPd");
	this.shape_1.setTransform(388.175,351.625);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#B19575").ss(1,1,1).p("AM0KdIAA1RAszLAIAA2A");
	this.shape_2.setTransform(388.675,372.6);

	this.instance_2 = new lib.teenager("synched",0);
	this.instance_2.setTransform(235.2,421.75,1,1,0,0,0,50.9,52.6);

	this.instance_3 = new lib.manwalking("synched",0);
	this.instance_3.setTransform(492.65,878.25,1.2804,1.1749,0,0,180,5.4,5.5);

	this.instance_4 = new lib.grandpa("synched",0);
	this.instance_4.setTransform(526.2,568.95,0.1345,0.1345,0,0,0,316.4,702);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.shape_1},{t:this.shape_2},{t:this.instance_1},{t:this.instance}]},1).to({state:[{t:this.instance_2}]},118).to({state:[{t:this.instance_3}]},143).to({state:[{t:this.instance_4}]},169).wait(143));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.season = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2,573];
	this.streamSoundSymbolsList[0] = [{id:"גייןבורדומארחיםאתאברהםלגסהילדמזדקןבמסגרתחגיגות70לחברילהקתכוורתשלוואלהואקו99AudioTrimmercom1",startFrame:0,endFrame:574,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("גייןבורדומארחיםאתאברהםלגסהילדמזדקןבמסגרתחגיגות70לחברילהקתכוורתשלוואלהואקו99AudioTrimmercom1",0);
		this.InsertIntoSoundStreamData(soundInstance,0,574,1);
		this.playbotton = this.buttons.playbotton;
		var self=this;
		self.stop();
		
		self.playbotton.addEventListener ("click",playit)
		
		function playit(){
			self.gotoAndPlay(1);
		}
	}
	this.frame_2 = function() {
		this.playbotton = undefined;
	}
	this.frame_573 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(571).call(this.frame_573).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(360,360,0.3496,0.3496);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({scaleX:0.3587,scaleY:0.3587},0).wait(1).to({scaleX:0.3679,scaleY:0.3679},0).wait(1).to({scaleX:0.377,scaleY:0.377},0).wait(1).to({scaleX:0.3862,scaleY:0.3862},0).wait(1).to({scaleX:0.3954,scaleY:0.3954},0).wait(1).to({scaleX:0.4045,scaleY:0.4045},0).wait(1).to({scaleX:0.4137,scaleY:0.4137},0).wait(1).to({scaleX:0.4229,scaleY:0.4229},0).wait(1).to({scaleX:0.432,scaleY:0.432},0).wait(1).to({scaleX:0.4412,scaleY:0.4412},0).wait(1).to({scaleX:0.4503,scaleY:0.4503},0).wait(1).to({scaleX:0.4595,scaleY:0.4595},0).wait(1).to({scaleX:0.4687,scaleY:0.4687},0).wait(1).to({scaleX:0.4778,scaleY:0.4778},0).wait(1).to({scaleX:0.487,scaleY:0.487},0).wait(1).to({scaleX:0.4961,scaleY:0.4961},0).wait(1).to({scaleX:0.5053,scaleY:0.5053},0).wait(1).to({scaleX:0.5145,scaleY:0.5145},0).wait(1).to({scaleX:0.5236,scaleY:0.5236},0).wait(1).to({scaleX:0.5328,scaleY:0.5328},0).wait(1).to({scaleX:0.5419,scaleY:0.5419},0).wait(1).to({scaleX:0.5511,scaleY:0.5511},0).wait(1).to({scaleX:0.5603,scaleY:0.5603},0).wait(1).to({scaleX:0.5694,scaleY:0.5694},0).wait(1).to({scaleX:0.5786,scaleY:0.5786},0).wait(1).to({scaleX:0.5878,scaleY:0.5878},0).wait(1).to({scaleX:0.5969,scaleY:0.5969},0).wait(1).to({scaleX:0.6061,scaleY:0.6061},0).wait(1).to({scaleX:0.6152,scaleY:0.6152},0).wait(1).to({scaleX:0.6244,scaleY:0.6244},0).wait(1).to({scaleX:0.6336,scaleY:0.6336},0).wait(1).to({scaleX:0.6427,scaleY:0.6427},0).wait(1).to({scaleX:0.6519,scaleY:0.6519},0).wait(1).to({scaleX:0.661,scaleY:0.661},0).wait(1).to({scaleX:0.6702,scaleY:0.6702},0).wait(1).to({scaleX:0.6794,scaleY:0.6794},0).wait(1).to({scaleX:0.6885,scaleY:0.6885},0).wait(1).to({scaleX:0.6977,scaleY:0.6977},0).wait(1).to({scaleX:0.7068,scaleY:0.7068},0).wait(1).to({scaleX:0.716,scaleY:0.716},0).wait(1).to({scaleX:0.7252,scaleY:0.7252},0).wait(1).to({scaleX:0.7343,scaleY:0.7343},0).wait(1).to({scaleX:0.7435,scaleY:0.7435},0).wait(1).to({scaleX:0.7527,scaleY:0.7527},0).wait(1).to({scaleX:0.7618,scaleY:0.7618},0).wait(1).to({scaleX:0.771,scaleY:0.771},0).wait(1).to({scaleX:0.7801,scaleY:0.7801},0).wait(1).to({scaleX:0.7893,scaleY:0.7893},0).wait(1).to({scaleX:0.7985,scaleY:0.7985},0).wait(1).to({scaleX:0.8076,scaleY:0.8076},0).wait(1).to({scaleX:0.8168,scaleY:0.8168},0).wait(1).to({scaleX:0.8259,scaleY:0.8259},0).wait(1).to({scaleX:0.8351,scaleY:0.8351},0).wait(1).to({scaleX:0.8443,scaleY:0.8443},0).wait(1).to({scaleX:0.8534,scaleY:0.8534},0).wait(1).to({scaleX:0.8626,scaleY:0.8626},0).wait(1).to({scaleX:0.8717,scaleY:0.8717},0).wait(1).to({scaleX:0.8809,scaleY:0.8809},0).wait(1).to({scaleX:0.8901,scaleY:0.8901},0).wait(1).to({scaleX:0.8992,scaleY:0.8992},0).wait(1).to({scaleX:0.9084,scaleY:0.9084},0).wait(1).to({scaleX:0.9176,scaleY:0.9176},0).wait(1).to({scaleX:0.9267,scaleY:0.9267},0).wait(1).to({scaleX:0.9359,scaleY:0.9359},0).wait(1).to({scaleX:0.945,scaleY:0.945},0).wait(1).to({scaleX:0.9542,scaleY:0.9542},0).wait(1).to({scaleX:0.9634,scaleY:0.9634},0).wait(1).to({scaleX:0.9725,scaleY:0.9725},0).wait(1).to({scaleX:0.9817,scaleY:0.9817},0).wait(1).to({scaleX:0.9908,scaleY:0.9908},0).wait(1).to({scaleX:1,scaleY:1},0).wait(49).to({scaleX:0.991,scaleY:0.991,x:358.4374,y:360.5153},0).wait(1).to({scaleX:0.9821,scaleY:0.9821,x:356.8747,y:361.0305},0).wait(1).to({scaleX:0.9731,scaleY:0.9731,x:355.3121,y:361.5458},0).wait(1).to({scaleX:0.9642,scaleY:0.9642,x:353.7495,y:362.0611},0).wait(1).to({scaleX:0.9552,scaleY:0.9552,x:352.1868,y:362.5763},0).wait(1).to({scaleX:0.9463,scaleY:0.9463,x:350.6242,y:363.0916},0).wait(1).to({scaleX:0.9373,scaleY:0.9373,x:349.0616,y:363.6068},0).wait(1).to({scaleX:0.9284,scaleY:0.9284,x:347.499,y:364.1221},0).wait(1).to({scaleX:0.9194,scaleY:0.9194,x:345.9363,y:364.6374},0).wait(1).to({scaleX:0.9105,scaleY:0.9105,x:344.3737,y:365.1526},0).wait(1).to({scaleX:0.9015,scaleY:0.9015,x:342.8111,y:365.6679},0).wait(1).to({scaleX:0.8926,scaleY:0.8926,x:341.2484,y:366.1832},0).wait(1).to({scaleX:0.8836,scaleY:0.8836,x:339.6858,y:366.6984},0).wait(1).to({scaleX:0.8747,scaleY:0.8747,x:338.1232,y:367.2137},0).wait(1).to({scaleX:0.8657,scaleY:0.8657,x:336.5605,y:367.729},0).wait(1).to({scaleX:0.8567,scaleY:0.8567,x:334.9979,y:368.2442},0).wait(1).to({scaleX:0.8478,scaleY:0.8478,x:333.4353,y:368.7595},0).wait(1).to({scaleX:0.8388,scaleY:0.8388,x:331.8726,y:369.2747},0).wait(1).to({scaleX:0.8299,scaleY:0.8299,x:330.31,y:369.79},0).wait(1).to({scaleX:0.8209,scaleY:0.8209,x:328.7474,y:370.3053},0).wait(1).to({scaleX:0.812,scaleY:0.812,x:327.1847,y:370.8205},0).wait(1).to({scaleX:0.803,scaleY:0.803,x:325.6221,y:371.3358},0).wait(1).to({scaleX:0.7941,scaleY:0.7941,x:324.0595,y:371.8511},0).wait(1).to({scaleX:0.7851,scaleY:0.7851,x:322.4968,y:372.3663},0).wait(1).to({scaleX:0.7762,scaleY:0.7762,x:320.9342,y:372.8816},0).wait(1).to({scaleX:0.7672,scaleY:0.7672,x:319.3716,y:373.3968},0).wait(1).to({scaleX:0.7583,scaleY:0.7583,x:317.809,y:373.9121},0).wait(1).to({scaleX:0.7493,scaleY:0.7493,x:316.2463,y:374.4274},0).wait(1).to({scaleX:0.7404,scaleY:0.7404,x:314.6837,y:374.9426},0).wait(1).to({scaleX:0.7314,scaleY:0.7314,x:313.1211,y:375.4579},0).wait(1).to({scaleX:0.7225,scaleY:0.7225,x:311.5584,y:375.9732},0).wait(1).to({scaleX:0.7135,scaleY:0.7135,x:309.9958,y:376.4884},0).wait(1).to({scaleX:0.7045,scaleY:0.7045,x:308.4332,y:377.0037},0).wait(1).to({scaleX:0.6956,scaleY:0.6956,x:306.8705,y:377.519},0).wait(1).to({scaleX:0.6866,scaleY:0.6866,x:305.3079,y:378.0342},0).wait(1).to({scaleX:0.6777,scaleY:0.6777,x:303.7453,y:378.5495},0).wait(1).to({scaleX:0.6687,scaleY:0.6687,x:302.1826,y:379.0647},0).wait(1).to({scaleX:0.6598,scaleY:0.6598,x:300.62,y:379.58},0).wait(1).to({scaleX:0.6508,scaleY:0.6508,x:299.0574,y:380.0953},0).wait(1).to({scaleX:0.6419,scaleY:0.6419,x:297.4947,y:380.6105},0).wait(1).to({scaleX:0.6329,scaleY:0.6329,x:295.9321,y:381.1258},0).wait(1).to({scaleX:0.624,scaleY:0.624,x:294.3695,y:381.6411},0).wait(1).to({scaleX:0.615,scaleY:0.615,x:292.8068,y:382.1563},0).wait(1).to({scaleX:0.6061,scaleY:0.6061,x:291.2442,y:382.6716},0).wait(1).to({scaleX:0.5971,scaleY:0.5971,x:289.6816,y:383.1868},0).wait(1).to({scaleX:0.5882,scaleY:0.5882,x:288.119,y:383.7021},0).wait(1).to({scaleX:0.5792,scaleY:0.5792,x:286.5563,y:384.2174},0).wait(1).to({scaleX:0.5702,scaleY:0.5702,x:284.9937,y:384.7326},0).wait(1).to({scaleX:0.5613,scaleY:0.5613,x:283.4311,y:385.2479},0).wait(1).to({scaleX:0.5523,scaleY:0.5523,x:281.8684,y:385.7632},0).wait(1).to({scaleX:0.5434,scaleY:0.5434,x:280.3058,y:386.2784},0).wait(1).to({scaleX:0.5344,scaleY:0.5344,x:278.7432,y:386.7937},0).wait(1).to({scaleX:0.5255,scaleY:0.5255,x:277.1805,y:387.309},0).wait(1).to({scaleX:0.5165,scaleY:0.5165,x:275.6179,y:387.8242},0).wait(1).to({scaleX:0.5076,scaleY:0.5076,x:274.0553,y:388.3395},0).wait(1).to({scaleX:0.4986,scaleY:0.4986,x:272.4926,y:388.8547},0).wait(1).to({scaleX:0.4897,scaleY:0.4897,x:270.93,y:389.37},0).wait(1).to({scaleX:0.4807,scaleY:0.4807,x:269.3674,y:389.8853},0).wait(1).to({scaleX:0.4718,scaleY:0.4718,x:267.8047,y:390.4005},0).wait(1).to({scaleX:0.4628,scaleY:0.4628,x:266.2421,y:390.9158},0).wait(1).to({scaleX:0.4539,scaleY:0.4539,x:264.6795,y:391.4311},0).wait(1).to({scaleX:0.4449,scaleY:0.4449,x:263.1168,y:391.9463},0).wait(1).to({scaleX:0.4359,scaleY:0.4359,x:261.5542,y:392.4616},0).wait(1).to({scaleX:0.427,scaleY:0.427,x:259.9916,y:392.9768},0).wait(1).to({scaleX:0.418,scaleY:0.418,x:258.429,y:393.4921},0).wait(1).to({scaleX:0.4091,scaleY:0.4091,x:256.8663,y:394.0074},0).wait(1).to({scaleX:0.4001,scaleY:0.4001,x:255.3037,y:394.5226},0).wait(1).to({scaleX:0.3912,scaleY:0.3912,x:253.7411,y:395.0379},0).wait(1).to({scaleX:0.3822,scaleY:0.3822,x:252.1784,y:395.5532},0).wait(1).to({scaleX:0.3733,scaleY:0.3733,x:250.6158,y:396.0684},0).wait(1).to({scaleX:0.3643,scaleY:0.3643,x:249.0532,y:396.5837},0).wait(1).to({scaleX:0.3554,scaleY:0.3554,x:247.4905,y:397.099},0).wait(1).to({scaleX:0.3464,scaleY:0.3464,x:245.9279,y:397.6142},0).wait(1).to({scaleX:0.3375,scaleY:0.3375,x:244.3653,y:398.1295},0).wait(1).to({scaleX:0.3285,scaleY:0.3285,x:242.8026,y:398.6447},0).wait(1).to({scaleX:0.3196,scaleY:0.3196,x:241.24,y:399.16},0).wait(1).to({scaleX:0.3106,scaleY:0.3106,x:239.6774,y:399.6753},0).wait(1).to({scaleX:0.3016,scaleY:0.3016,x:238.1147,y:400.1905},0).wait(1).to({scaleX:0.2927,scaleY:0.2927,x:236.5521,y:400.7058},0).wait(1).to({scaleX:0.2837,scaleY:0.2837,x:234.9895,y:401.2211},0).wait(1).to({scaleX:0.2748,scaleY:0.2748,x:233.4268,y:401.7363},0).wait(1).to({scaleX:0.2658,scaleY:0.2658,x:231.8642,y:402.2516},0).wait(1).to({scaleX:0.2569,scaleY:0.2569,x:230.3016,y:402.7668},0).wait(1).to({scaleX:0.2479,scaleY:0.2479,x:228.739,y:403.2821},0).wait(1).to({scaleX:0.239,scaleY:0.239,x:227.1763,y:403.7974},0).wait(1).to({scaleX:0.23,scaleY:0.23,x:225.6137,y:404.3126},0).wait(1).to({scaleX:0.2211,scaleY:0.2211,x:224.0511,y:404.8279},0).wait(1).to({scaleX:0.2121,scaleY:0.2121,x:222.4884,y:405.3432},0).wait(1).to({scaleX:0.2032,scaleY:0.2032,x:220.9258,y:405.8584},0).wait(1).to({scaleX:0.1942,scaleY:0.1942,x:219.3632,y:406.3737},0).wait(1).to({scaleX:0.1853,scaleY:0.1853,x:217.8005,y:406.889},0).wait(1).to({scaleX:0.1763,scaleY:0.1763,x:216.2379,y:407.4042},0).wait(1).to({scaleX:0.1674,scaleY:0.1674,x:214.6753,y:407.9195},0).wait(1).to({scaleX:0.1584,scaleY:0.1584,x:213.1126,y:408.4347},0).wait(1).to({scaleX:0.1494,scaleY:0.1494,x:211.55,y:408.95},0).wait(1).to({scaleX:0.1492,scaleY:0.1492,x:210.7913,y:409.4988},0).wait(1).to({scaleX:0.1489,scaleY:0.1489,x:210.0326,y:410.0475},0).wait(1).to({scaleX:0.1486,scaleY:0.1486,x:209.274,y:410.5963},0).wait(1).to({scaleX:0.1483,scaleY:0.1483,x:208.5153,y:411.145},0).wait(1).to({scaleX:0.148,scaleY:0.148,x:207.7566,y:411.6938},0).wait(1).to({scaleX:0.1477,scaleY:0.1477,x:206.9979,y:412.2426},0).wait(1).to({scaleX:0.1474,scaleY:0.1474,x:206.2393,y:412.7913},0).wait(1).to({scaleX:0.1472,scaleY:0.1472,x:205.4806,y:413.3401},0).wait(1).to({scaleX:0.1469,scaleY:0.1469,x:204.7219,y:413.8888},0).wait(1).to({scaleX:0.1466,scaleY:0.1466,x:203.9632,y:414.4376},0).wait(1).to({scaleX:0.1463,scaleY:0.1463,x:203.2046,y:414.9864},0).wait(1).to({scaleX:0.146,scaleY:0.146,x:202.4459,y:415.5351},0).wait(1).to({scaleX:0.1457,scaleY:0.1457,x:201.6872,y:416.0839},0).wait(1).to({scaleX:0.1455,scaleY:0.1455,x:200.9285,y:416.6326},0).wait(1).to({scaleX:0.1452,scaleY:0.1452,x:200.1698,y:417.1814},0).wait(1).to({scaleX:0.1449,scaleY:0.1449,x:199.4112,y:417.7302},0).wait(1).to({scaleX:0.1446,scaleY:0.1446,x:198.6525,y:418.2789},0).wait(1).to({scaleX:0.1443,scaleY:0.1443,x:197.8938,y:418.8277},0).wait(1).to({scaleX:0.144,scaleY:0.144,x:197.1351,y:419.3765},0).wait(1).to({scaleX:0.1437,scaleY:0.1437,x:196.3765,y:419.9252},0).wait(1).to({scaleX:0.1435,scaleY:0.1435,x:195.6178,y:420.474},0).wait(1).to({scaleX:0.1432,scaleY:0.1432,x:194.8591,y:421.0227},0).wait(1).to({scaleX:0.1429,scaleY:0.1429,x:194.1004,y:421.5715},0).wait(1).to({scaleX:0.1426,scaleY:0.1426,x:193.3417,y:422.1203},0).wait(1).to({scaleX:0.1423,scaleY:0.1423,x:192.5831,y:422.669},0).wait(1).to({scaleX:0.142,scaleY:0.142,x:191.8244,y:423.2178},0).wait(1).to({scaleX:0.1417,scaleY:0.1417,x:191.0657,y:423.7665},0).wait(1).to({scaleX:0.1415,scaleY:0.1415,x:190.307,y:424.3153},0).wait(1).to({scaleX:0.1412,scaleY:0.1412,x:189.5484,y:424.8641},0).wait(1).to({scaleX:0.1409,scaleY:0.1409,x:188.7897,y:425.4128},0).wait(1).to({scaleX:0.1406,scaleY:0.1406,x:188.031,y:425.9616},0).wait(1).to({scaleX:0.1403,scaleY:0.1403,x:187.2723,y:426.5103},0).wait(1).to({scaleX:0.14,scaleY:0.14,x:186.5136,y:427.0591},0).wait(1).to({scaleX:0.1398,scaleY:0.1398,x:185.755,y:427.6079},0).wait(1).to({scaleX:0.1395,scaleY:0.1395,x:184.9963,y:428.1566},0).wait(1).to({scaleX:0.1392,scaleY:0.1392,x:184.2376,y:428.7054},0).wait(1).to({scaleX:0.1389,scaleY:0.1389,x:183.4789,y:429.2541},0).wait(1).to({scaleX:0.1386,scaleY:0.1386,x:182.7203,y:429.8029},0).wait(1).to({scaleX:0.1383,scaleY:0.1383,x:181.9616,y:430.3517},0).wait(1).to({scaleX:0.138,scaleY:0.138,x:181.2029,y:430.9004},0).wait(1).to({scaleX:0.1378,scaleY:0.1378,x:180.4442,y:431.4492},0).wait(1).to({scaleX:0.1375,scaleY:0.1375,x:179.6855,y:431.9979},0).wait(1).to({scaleX:0.1372,scaleY:0.1372,x:178.9269,y:432.5467},0).wait(1).to({scaleX:0.1369,scaleY:0.1369,x:178.1682,y:433.0955},0).wait(1).to({scaleX:0.1366,scaleY:0.1366,x:177.4095,y:433.6442},0).wait(1).to({scaleX:0.1363,scaleY:0.1363,x:176.6508,y:434.193},0).wait(1).to({scaleX:0.136,scaleY:0.136,x:175.8921,y:434.7417},0).wait(1).to({scaleX:0.1358,scaleY:0.1358,x:175.1335,y:435.2905},0).wait(1).to({scaleX:0.1355,scaleY:0.1355,x:174.3748,y:435.8393},0).wait(1).to({scaleX:0.1352,scaleY:0.1352,x:173.6161,y:436.388},0).wait(1).to({scaleX:0.1349,scaleY:0.1349,x:172.8574,y:436.9368},0).wait(1).to({scaleX:0.1346,scaleY:0.1346,x:172.0988,y:437.4855},0).wait(1).to({scaleX:0.1343,scaleY:0.1343,x:171.3401,y:438.0343},0).wait(1).to({scaleX:0.134,scaleY:0.134,x:170.5814,y:438.5831},0).wait(1).to({scaleX:0.1338,scaleY:0.1338,x:169.8227,y:439.1318},0).wait(1).to({scaleX:0.1335,scaleY:0.1335,x:169.0641,y:439.6806},0).wait(1).to({scaleX:0.1332,scaleY:0.1332,x:168.3054,y:440.2293},0).wait(1).to({scaleX:0.1329,scaleY:0.1329,x:167.5467,y:440.7781},0).wait(1).to({scaleX:0.1326,scaleY:0.1326,x:166.788,y:441.3269},0).wait(1).to({scaleX:0.1323,scaleY:0.1323,x:166.0293,y:441.8756},0).wait(1).to({scaleX:0.1321,scaleY:0.1321,x:165.2707,y:442.4244},0).wait(1).to({scaleX:0.1318,scaleY:0.1318,x:164.512,y:442.9731},0).wait(1).to({scaleX:0.1315,scaleY:0.1315,x:163.7533,y:443.5219},0).wait(1).to({scaleX:0.1312,scaleY:0.1312,x:162.9946,y:444.0707},0).wait(1).to({scaleX:0.1309,scaleY:0.1309,x:162.236,y:444.6194},0).wait(1).to({scaleX:0.1306,scaleY:0.1306,x:161.4773,y:445.1682},0).wait(1).to({scaleX:0.1303,scaleY:0.1303,x:160.7186,y:445.7169},0).wait(1).to({scaleX:0.1301,scaleY:0.1301,x:159.9599,y:446.2657},0).wait(1).to({scaleX:0.1298,scaleY:0.1298,x:159.2012,y:446.8145},0).wait(1).to({scaleX:0.1295,scaleY:0.1295,x:158.4426,y:447.3632},0).wait(1).to({scaleX:0.1292,scaleY:0.1292,x:157.6839,y:447.912},0).wait(1).to({scaleX:0.1289,scaleY:0.1289,x:156.9252,y:448.4607},0).wait(1).to({scaleX:0.1286,scaleY:0.1286,x:156.1665,y:449.0095},0).wait(1).to({scaleX:0.1283,scaleY:0.1283,x:155.4079,y:449.5583},0).wait(1).to({scaleX:0.1281,scaleY:0.1281,x:154.6492,y:450.107},0).wait(1).to({scaleX:0.1278,scaleY:0.1278,x:153.8905,y:450.6558},0).wait(1).to({scaleX:0.1275,scaleY:0.1275,x:153.1318,y:451.2046},0).wait(1).to({scaleX:0.1272,scaleY:0.1272,x:152.3731,y:451.7533},0).wait(1).to({scaleX:0.1269,scaleY:0.1269,x:151.6145,y:452.3021},0).wait(1).to({scaleX:0.1266,scaleY:0.1266,x:150.8558,y:452.8508},0).wait(1).to({scaleX:0.1263,scaleY:0.1263,x:150.0971,y:453.3996},0).wait(1).to({scaleX:0.1261,scaleY:0.1261,x:149.3384,y:453.9484},0).wait(1).to({scaleX:0.1258,scaleY:0.1258,x:148.5798,y:454.4971},0).wait(1).to({scaleX:0.1255,scaleY:0.1255,x:147.8211,y:455.0459},0).wait(1).to({scaleX:0.1252,scaleY:0.1252,x:147.0624,y:455.5946},0).wait(1).to({scaleX:0.1249,scaleY:0.1249,x:146.3037,y:456.1434},0).wait(1).to({scaleX:0.1246,scaleY:0.1246,x:145.545,y:456.6922},0).wait(1).to({scaleX:0.1244,scaleY:0.1244,x:144.7864,y:457.2409},0).wait(1).to({scaleX:0.1241,scaleY:0.1241,x:144.0277,y:457.7897},0).wait(1).to({scaleX:0.1238,scaleY:0.1238,x:143.269,y:458.3384},0).wait(1).to({scaleX:0.1235,scaleY:0.1235,x:142.5103,y:458.8872},0).wait(1).to({scaleX:0.1232,scaleY:0.1232,x:141.7517,y:459.436},0).wait(1).to({scaleX:0.1229,scaleY:0.1229,x:140.993,y:459.9847},0).wait(1).to({scaleX:0.1226,scaleY:0.1226,x:140.2343,y:460.5335},0).wait(1).to({scaleX:0.1224,scaleY:0.1224,x:139.4756,y:461.0822},0).wait(1).to({scaleX:0.1221,scaleY:0.1221,x:138.7169,y:461.631},0).wait(1).to({scaleX:0.1218,scaleY:0.1218,x:137.9583,y:462.1798},0).wait(1).to({scaleX:0.1215,scaleY:0.1215,x:137.1996,y:462.7285},0).wait(1).to({scaleX:0.1212,scaleY:0.1212,x:136.4409,y:463.2773},0).wait(1).to({scaleX:0.1209,scaleY:0.1209,x:135.6822,y:463.826},0).wait(1).to({scaleX:0.1206,scaleY:0.1206,x:134.9236,y:464.3748},0).wait(1).to({scaleX:0.1204,scaleY:0.1204,x:134.1649,y:464.9236},0).wait(1).to({scaleX:0.1201,scaleY:0.1201,x:133.4062,y:465.4723},0).wait(1).to({scaleX:0.1198,scaleY:0.1198,x:132.6475,y:466.0211},0).wait(1).to({scaleX:0.1195,scaleY:0.1195,x:131.8888,y:466.5698},0).wait(1).to({scaleX:0.1192,scaleY:0.1192,x:131.1302,y:467.1186},0).wait(1).to({scaleX:0.1189,scaleY:0.1189,x:130.3715,y:467.6674},0).wait(1).to({scaleX:0.1187,scaleY:0.1187,x:129.6128,y:468.2161},0).wait(1).to({scaleX:0.1184,scaleY:0.1184,x:128.8541,y:468.7649},0).wait(1).to({scaleX:0.1181,scaleY:0.1181,x:128.0955,y:469.3136},0).wait(1).to({scaleX:0.1178,scaleY:0.1178,x:127.3368,y:469.8624},0).wait(1).to({scaleX:0.1175,scaleY:0.1175,x:126.5781,y:470.4112},0).wait(1).to({scaleX:0.1172,scaleY:0.1172,x:125.8194,y:470.9599},0).wait(1).to({scaleX:0.1169,scaleY:0.1169,x:125.0607,y:471.5087},0).wait(1).to({scaleX:0.1167,scaleY:0.1167,x:124.3021,y:472.0574},0).wait(1).to({scaleX:0.1164,scaleY:0.1164,x:123.5434,y:472.6062},0).wait(1).to({scaleX:0.1161,scaleY:0.1161,x:122.7847,y:473.155},0).wait(1).to({scaleX:0.1158,scaleY:0.1158,x:122.026,y:473.7037},0).wait(1).to({scaleX:0.1155,scaleY:0.1155,x:121.2674,y:474.2525},0).wait(1).to({scaleX:0.1152,scaleY:0.1152,x:120.5087,y:474.8012},0).wait(1).to({scaleX:0.1149,scaleY:0.1149,x:119.75,y:475.35},0).wait(1).to({scaleX:0.1226,scaleY:0.1226,x:121.6458,y:474.4854},0).wait(1).to({scaleX:0.1303,scaleY:0.1303,x:123.5417,y:473.6208},0).wait(1).to({scaleX:0.138,scaleY:0.138,x:125.4375,y:472.7563},0).wait(1).to({scaleX:0.1457,scaleY:0.1457,x:127.3333,y:471.8917},0).wait(1).to({scaleX:0.1534,scaleY:0.1534,x:129.2292,y:471.0271},0).wait(1).to({scaleX:0.1611,scaleY:0.1611,x:131.125,y:470.1625},0).wait(1).to({scaleX:0.1688,scaleY:0.1688,x:133.0208,y:469.2979},0).wait(1).to({scaleX:0.1765,scaleY:0.1765,x:134.9167,y:468.4333},0).wait(1).to({scaleX:0.1842,scaleY:0.1842,x:136.8125,y:467.5688},0).wait(1).to({scaleX:0.1919,scaleY:0.1919,x:138.7083,y:466.7042},0).wait(1).to({scaleX:0.1996,scaleY:0.1996,x:140.6042,y:465.8396},0).wait(1).to({scaleX:0.2073,scaleY:0.2073,x:142.5,y:464.975},0).wait(1).to({scaleX:0.215,scaleY:0.215,x:144.3958,y:464.1104},0).wait(1).to({scaleX:0.2227,scaleY:0.2227,x:146.2917,y:463.2458},0).wait(1).to({scaleX:0.2304,scaleY:0.2304,x:148.1875,y:462.3813},0).wait(1).to({scaleX:0.2381,scaleY:0.2381,x:150.0833,y:461.5167},0).wait(1).to({scaleX:0.2458,scaleY:0.2458,x:151.9792,y:460.6521},0).wait(1).to({scaleX:0.2535,scaleY:0.2535,x:153.875,y:459.7875},0).wait(1).to({scaleX:0.2612,scaleY:0.2612,x:155.7708,y:458.9229},0).wait(1).to({scaleX:0.2689,scaleY:0.2689,x:157.6667,y:458.0583},0).wait(1).to({scaleX:0.2766,scaleY:0.2766,x:159.5625,y:457.1938},0).wait(1).to({scaleX:0.2843,scaleY:0.2843,x:161.4583,y:456.3292},0).wait(1).to({scaleX:0.292,scaleY:0.292,x:163.3542,y:455.4646},0).wait(1).to({scaleX:0.2996,scaleY:0.2996,x:165.25,y:454.6},0).wait(1).to({scaleX:0.3073,scaleY:0.3073,x:167.1458,y:453.7354},0).wait(1).to({scaleX:0.315,scaleY:0.315,x:169.0417,y:452.8708},0).wait(1).to({scaleX:0.3227,scaleY:0.3227,x:170.9375,y:452.0063},0).wait(1).to({scaleX:0.3304,scaleY:0.3304,x:172.8333,y:451.1417},0).wait(1).to({scaleX:0.3381,scaleY:0.3381,x:174.7292,y:450.2771},0).wait(1).to({scaleX:0.3458,scaleY:0.3458,x:176.625,y:449.4125},0).wait(1).to({scaleX:0.3535,scaleY:0.3535,x:178.5208,y:448.5479},0).wait(1).to({scaleX:0.3612,scaleY:0.3612,x:180.4167,y:447.6833},0).wait(1).to({scaleX:0.3689,scaleY:0.3689,x:182.3125,y:446.8188},0).wait(1).to({scaleX:0.3766,scaleY:0.3766,x:184.2083,y:445.9542},0).wait(1).to({scaleX:0.3843,scaleY:0.3843,x:186.1042,y:445.0896},0).wait(1).to({scaleX:0.392,scaleY:0.392,x:188,y:444.225},0).wait(1).to({scaleX:0.3997,scaleY:0.3997,x:189.8958,y:443.3604},0).wait(1).to({scaleX:0.4074,scaleY:0.4074,x:191.7917,y:442.4958},0).wait(1).to({scaleX:0.4151,scaleY:0.4151,x:193.6875,y:441.6313},0).wait(1).to({scaleX:0.4228,scaleY:0.4228,x:195.5833,y:440.7667},0).wait(1).to({scaleX:0.4305,scaleY:0.4305,x:197.4792,y:439.9021},0).wait(1).to({scaleX:0.4382,scaleY:0.4382,x:199.375,y:439.0375},0).wait(1).to({scaleX:0.4459,scaleY:0.4459,x:201.2708,y:438.1729},0).wait(1).to({scaleX:0.4536,scaleY:0.4536,x:203.1667,y:437.3083},0).wait(1).to({scaleX:0.4613,scaleY:0.4613,x:205.0625,y:436.4438},0).wait(1).to({scaleX:0.469,scaleY:0.469,x:206.9583,y:435.5792},0).wait(1).to({scaleX:0.4767,scaleY:0.4767,x:208.8542,y:434.7146},0).wait(1).to({scaleX:0.4843,scaleY:0.4843,x:210.75,y:433.85},0).wait(1).to({scaleX:0.492,scaleY:0.492,x:212.6458,y:432.9854},0).wait(1).to({scaleX:0.4997,scaleY:0.4997,x:214.5417,y:432.1208},0).wait(1).to({scaleX:0.5074,scaleY:0.5074,x:216.4375,y:431.2563},0).wait(1).to({scaleX:0.5151,scaleY:0.5151,x:218.3333,y:430.3917},0).wait(1).to({scaleX:0.5228,scaleY:0.5228,x:220.2292,y:429.5271},0).wait(1).to({scaleX:0.5305,scaleY:0.5305,x:222.125,y:428.6625},0).wait(1).to({scaleX:0.5382,scaleY:0.5382,x:224.0208,y:427.7979},0).wait(1).to({scaleX:0.5459,scaleY:0.5459,x:225.9167,y:426.9333},0).wait(1).to({scaleX:0.5536,scaleY:0.5536,x:227.8125,y:426.0688},0).wait(1).to({scaleX:0.5613,scaleY:0.5613,x:229.7083,y:425.2042},0).wait(1).to({scaleX:0.569,scaleY:0.569,x:231.6042,y:424.3396},0).wait(1).to({scaleX:0.5767,scaleY:0.5767,x:233.5,y:423.475},0).wait(1).to({scaleX:0.5844,scaleY:0.5844,x:235.3958,y:422.6104},0).wait(1).to({scaleX:0.5921,scaleY:0.5921,x:237.2917,y:421.7458},0).wait(1).to({scaleX:0.5998,scaleY:0.5998,x:239.1875,y:420.8813},0).wait(1).to({scaleX:0.6075,scaleY:0.6075,x:241.0833,y:420.0167},0).wait(1).to({scaleX:0.6152,scaleY:0.6152,x:242.9792,y:419.1521},0).wait(1).to({scaleX:0.6229,scaleY:0.6229,x:244.875,y:418.2875},0).wait(1).to({scaleX:0.6306,scaleY:0.6306,x:246.7708,y:417.4229},0).wait(1).to({scaleX:0.6383,scaleY:0.6383,x:248.6667,y:416.5583},0).wait(1).to({scaleX:0.646,scaleY:0.646,x:250.5625,y:415.6938},0).wait(1).to({scaleX:0.6537,scaleY:0.6537,x:252.4583,y:414.8292},0).wait(1).to({scaleX:0.6614,scaleY:0.6614,x:254.3542,y:413.9646},0).wait(1).to({scaleX:0.6691,scaleY:0.6691,x:256.25,y:413.1},0).wait(1).to({x:259.6042,y:413.3063},0).wait(1).to({x:262.9585,y:413.5127},0).wait(1).to({x:266.3127,y:413.719},0).wait(1).to({x:269.6669,y:413.9254},0).wait(1).to({x:273.0211,y:414.1317},0).wait(1).to({x:276.3754,y:414.338},0).wait(1).to({x:279.7296,y:414.5444},0).wait(1).to({x:283.0838,y:414.7507},0).wait(1).to({x:286.438,y:414.957},0).wait(1).to({x:289.7923,y:415.1634},0).wait(1).to({x:293.1465,y:415.3697},0).wait(1).to({x:296.5007,y:415.5761},0).wait(1).to({x:299.8549,y:415.7824},0).wait(1).to({x:303.2092,y:415.9887},0).wait(1).to({x:306.5634,y:416.1951},0).wait(1).to({x:309.9176,y:416.4014},0).wait(1).to({x:313.2718,y:416.6078},0).wait(1).to({x:316.6261,y:416.8141},0).wait(1).to({x:319.9803,y:417.0204},0).wait(1).to({x:323.3345,y:417.2268},0).wait(1).to({x:326.6887,y:417.4331},0).wait(1).to({x:330.043,y:417.6394},0).wait(1).to({x:333.3972,y:417.8458},0).wait(1).to({x:336.7514,y:418.0521},0).wait(1).to({x:340.1056,y:418.2585},0).wait(1).to({x:343.4599,y:418.4648},0).wait(1).to({x:346.8141,y:418.6711},0).wait(1).to({x:350.1683,y:418.8775},0).wait(1).to({x:353.5225,y:419.0838},0).wait(1).to({x:356.8768,y:419.2901},0).wait(1).to({x:360.231,y:419.4965},0).wait(1).to({x:363.5852,y:419.7028},0).wait(1).to({x:366.9394,y:419.9092},0).wait(1).to({x:370.2937,y:420.1155},0).wait(1).to({x:373.6479,y:420.3218},0).wait(1).to({x:377.0021,y:420.5282},0).wait(1).to({x:380.3563,y:420.7345},0).wait(1).to({x:383.7106,y:420.9409},0).wait(1).to({x:387.0648,y:421.1472},0).wait(1).to({x:390.419,y:421.3535},0).wait(1).to({x:393.7732,y:421.5599},0).wait(1).to({x:397.1275,y:421.7662},0).wait(1).to({x:400.4817,y:421.9725},0).wait(1).to({x:403.8359,y:422.1789},0).wait(1).to({x:407.1901,y:422.3852},0).wait(1).to({x:410.5444,y:422.5916},0).wait(1).to({x:413.8986,y:422.7979},0).wait(1).to({x:417.2528,y:423.0042},0).wait(1).to({x:420.607,y:423.2106},0).wait(1).to({x:423.9613,y:423.4169},0).wait(1).to({x:427.3155,y:423.6232},0).wait(1).to({x:430.6697,y:423.8296},0).wait(1).to({x:434.0239,y:424.0359},0).wait(1).to({x:437.3782,y:424.2423},0).wait(1).to({x:440.7324,y:424.4486},0).wait(1).to({x:444.0866,y:424.6549},0).wait(1).to({x:447.4409,y:424.8613},0).wait(1).to({x:450.7951,y:425.0676},0).wait(1).to({x:454.1493,y:425.2739},0).wait(1).to({x:457.5035,y:425.4803},0).wait(1).to({x:460.8578,y:425.6866},0).wait(1).to({x:464.212,y:425.893},0).wait(1).to({x:467.5662,y:426.0993},0).wait(1).to({x:470.9204,y:426.3056},0).wait(1).to({x:474.2747,y:426.512},0).wait(1).to({x:477.6289,y:426.7183},0).wait(1).to({x:480.9831,y:426.9247},0).wait(1).to({x:484.3373,y:427.131},0).wait(1).to({x:487.6916,y:427.3373},0).wait(1).to({x:491.0458,y:427.5437},0).wait(1).to({x:494.4,y:427.75},0).wait(1).to({scaleX:0.6669,scaleY:0.6669,x:495.0963,y:428.5784},0).wait(1).to({scaleX:0.6647,scaleY:0.6647,x:495.7926,y:429.4068},0).wait(1).to({scaleX:0.6626,scaleY:0.6626,x:496.489,y:430.2353},0).wait(1).to({scaleX:0.6604,scaleY:0.6604,x:497.1853,y:431.0637},0).wait(1).to({scaleX:0.6582,scaleY:0.6582,x:497.8816,y:431.8921},0).wait(1).to({scaleX:0.6561,scaleY:0.6561,x:498.5779,y:432.7205},0).wait(1).to({scaleX:0.6539,scaleY:0.6539,x:499.2742,y:433.549},0).wait(1).to({scaleX:0.6517,scaleY:0.6517,x:499.9705,y:434.3774},0).wait(1).to({scaleX:0.6496,scaleY:0.6496,x:500.6668,y:435.2058},0).wait(1).to({scaleX:0.6474,scaleY:0.6474,x:501.3632,y:436.0342},0).wait(1).to({scaleX:0.6452,scaleY:0.6452,x:502.0595,y:436.8626},0).wait(1).to({scaleX:0.6431,scaleY:0.6431,x:502.7558,y:437.6911},0).wait(1).to({scaleX:0.6409,scaleY:0.6409,x:503.4521,y:438.5195},0).wait(1).to({scaleX:0.6387,scaleY:0.6387,x:504.1484,y:439.3479},0).wait(1).to({scaleX:0.6366,scaleY:0.6366,x:504.8447,y:440.1763},0).wait(1).to({scaleX:0.6344,scaleY:0.6344,x:505.5411,y:441.0047},0).wait(1).to({scaleX:0.6322,scaleY:0.6322,x:506.2374,y:441.8332},0).wait(1).to({scaleX:0.6301,scaleY:0.6301,x:506.9337,y:442.6616},0).wait(1).to({scaleX:0.6279,scaleY:0.6279,x:507.63,y:443.49},0).wait(1).to({scaleX:0.6257,scaleY:0.6257,x:508.3263,y:444.3184},0).wait(1).to({scaleX:0.6236,scaleY:0.6236,x:509.0226,y:445.1468},0).wait(1).to({scaleX:0.6214,scaleY:0.6214,x:509.719,y:445.9753},0).wait(1).to({scaleX:0.6192,scaleY:0.6192,x:510.4153,y:446.8037},0).wait(1).to({scaleX:0.6171,scaleY:0.6171,x:511.1116,y:447.6321},0).wait(1).to({scaleX:0.6149,scaleY:0.6149,x:511.8079,y:448.4605},0).wait(1).to({scaleX:0.6127,scaleY:0.6127,x:512.5042,y:449.289},0).wait(1).to({scaleX:0.6106,scaleY:0.6106,x:513.2005,y:450.1174},0).wait(1).to({scaleX:0.6084,scaleY:0.6084,x:513.8968,y:450.9458},0).wait(1).to({scaleX:0.6062,scaleY:0.6062,x:514.5932,y:451.7742},0).wait(1).to({scaleX:0.6041,scaleY:0.6041,x:515.2895,y:452.6026},0).wait(1).to({scaleX:0.6019,scaleY:0.6019,x:515.9858,y:453.4311},0).wait(1).to({scaleX:0.5997,scaleY:0.5997,x:516.6821,y:454.2595},0).wait(1).to({scaleX:0.5976,scaleY:0.5976,x:517.3784,y:455.0879},0).wait(1).to({scaleX:0.5954,scaleY:0.5954,x:518.0747,y:455.9163},0).wait(1).to({scaleX:0.5932,scaleY:0.5932,x:518.771,y:456.7447},0).wait(1).to({scaleX:0.5911,scaleY:0.5911,x:519.4674,y:457.5732},0).wait(1).to({scaleX:0.5889,scaleY:0.5889,x:520.1637,y:458.4016},0).wait(1).to({scaleX:0.5867,scaleY:0.5867,x:520.86,y:459.23},0).wait(1).to({scaleX:0.5846,scaleY:0.5846,x:521.5563,y:460.0584},0).wait(1).to({scaleX:0.5824,scaleY:0.5824,x:522.2526,y:460.8868},0).wait(1).to({scaleX:0.5802,scaleY:0.5802,x:522.949,y:461.7153},0).wait(1).to({scaleX:0.5781,scaleY:0.5781,x:523.6453,y:462.5437},0).wait(1).to({scaleX:0.5759,scaleY:0.5759,x:524.3416,y:463.3721},0).wait(1).to({scaleX:0.5737,scaleY:0.5737,x:525.0379,y:464.2005},0).wait(1).to({scaleX:0.5716,scaleY:0.5716,x:525.7342,y:465.029},0).wait(1).to({scaleX:0.5694,scaleY:0.5694,x:526.4305,y:465.8574},0).wait(1).to({scaleX:0.5672,scaleY:0.5672,x:527.1268,y:466.6858},0).wait(1).to({scaleX:0.5651,scaleY:0.5651,x:527.8232,y:467.5142},0).wait(1).to({scaleX:0.5629,scaleY:0.5629,x:528.5195,y:468.3426},0).wait(1).to({scaleX:0.5607,scaleY:0.5607,x:529.2158,y:469.1711},0).wait(1).to({scaleX:0.5586,scaleY:0.5586,x:529.9121,y:469.9995},0).wait(1).to({scaleX:0.5564,scaleY:0.5564,x:530.6084,y:470.8279},0).wait(1).to({scaleX:0.5542,scaleY:0.5542,x:531.3047,y:471.6563},0).wait(1).to({scaleX:0.5521,scaleY:0.5521,x:532.0011,y:472.4847},0).wait(1).to({scaleX:0.5499,scaleY:0.5499,x:532.6974,y:473.3132},0).wait(1).to({scaleX:0.5477,scaleY:0.5477,x:533.3937,y:474.1416},0).wait(1).to({scaleX:0.5456,scaleY:0.5456,x:534.09,y:474.97},0).wait(1).to({scaleX:0.5434,scaleY:0.5434,x:534.7863,y:475.7984},0).wait(1).to({scaleX:0.5412,scaleY:0.5412,x:535.4826,y:476.6268},0).wait(1).to({scaleX:0.5391,scaleY:0.5391,x:536.179,y:477.4553},0).wait(1).to({scaleX:0.5369,scaleY:0.5369,x:536.8753,y:478.2837},0).wait(1).to({scaleX:0.5347,scaleY:0.5347,x:537.5716,y:479.1121},0).wait(1).to({scaleX:0.5326,scaleY:0.5326,x:538.2679,y:479.9405},0).wait(1).to({scaleX:0.5304,scaleY:0.5304,x:538.9642,y:480.769},0).wait(1).to({scaleX:0.5282,scaleY:0.5282,x:539.6605,y:481.5974},0).wait(1).to({scaleX:0.5261,scaleY:0.5261,x:540.3568,y:482.4258},0).wait(1).to({scaleX:0.5239,scaleY:0.5239,x:541.0532,y:483.2542},0).wait(1).to({scaleX:0.5217,scaleY:0.5217,x:541.7495,y:484.0826},0).wait(1).to({scaleX:0.5196,scaleY:0.5196,x:542.4458,y:484.9111},0).wait(1).to({scaleX:0.5174,scaleY:0.5174,x:543.1421,y:485.7395},0).wait(1).to({scaleX:0.5152,scaleY:0.5152,x:543.8384,y:486.5679},0).wait(1).to({scaleX:0.5131,scaleY:0.5131,x:544.5347,y:487.3963},0).wait(1).to({scaleX:0.5109,scaleY:0.5109,x:545.2311,y:488.2247},0).wait(1).to({scaleX:0.5087,scaleY:0.5087,x:545.9274,y:489.0532},0).wait(1).to({scaleX:0.5066,scaleY:0.5066,x:546.6237,y:489.8816},0).wait(1).to({scaleX:0.5044,scaleY:0.5044,x:547.32,y:490.71},0).wait(1).to({scaleX:0.5022,scaleY:0.5022,x:548.0163,y:491.5384},0).wait(1).to({scaleX:0.5001,scaleY:0.5001,x:548.7126,y:492.3668},0).wait(1).to({scaleX:0.4979,scaleY:0.4979,x:549.409,y:493.1953},0).wait(1).to({scaleX:0.4957,scaleY:0.4957,x:550.1053,y:494.0237},0).wait(1).to({scaleX:0.4936,scaleY:0.4936,x:550.8016,y:494.8521},0).wait(1).to({scaleX:0.4914,scaleY:0.4914,x:551.4979,y:495.6805},0).wait(1).to({scaleX:0.4892,scaleY:0.4892,x:552.1942,y:496.509},0).wait(1).to({scaleX:0.4871,scaleY:0.4871,x:552.8905,y:497.3374},0).wait(1).to({scaleX:0.4849,scaleY:0.4849,x:553.5868,y:498.1658},0).wait(1).to({scaleX:0.4827,scaleY:0.4827,x:554.2832,y:498.9942},0).wait(1).to({scaleX:0.4806,scaleY:0.4806,x:554.9795,y:499.8226},0).wait(1).to({scaleX:0.4784,scaleY:0.4784,x:555.6758,y:500.6511},0).wait(1).to({scaleX:0.4762,scaleY:0.4762,x:556.3721,y:501.4795},0).wait(1).to({scaleX:0.4741,scaleY:0.4741,x:557.0684,y:502.3079},0).wait(1).to({scaleX:0.4719,scaleY:0.4719,x:557.7647,y:503.1363},0).wait(1).to({scaleX:0.4697,scaleY:0.4697,x:558.4611,y:503.9647},0).wait(1).to({scaleX:0.4676,scaleY:0.4676,x:559.1574,y:504.7932},0).wait(1).to({scaleX:0.4654,scaleY:0.4654,x:559.8537,y:505.6216},0).wait(1).to({scaleX:0.4632,scaleY:0.4632,x:560.55,y:506.45},0).wait(1));

	// buttons_obj_
	this.buttons = new lib.Scene_1_buttons();
	this.buttons.name = "buttons";
	this.buttons.setTransform(370.35,354.6,2.8607,2.8607,0,0,0,363.6,358.1);
	this.buttons.depth = 0;
	this.buttons.isAttachedToCamera = 0
	this.buttons.isAttachedToMask = 0
	this.buttons.layerDepth = 0
	this.buttons.layerIndex = 0
	this.buttons.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.buttons).wait(2).to({regX:363.8,regY:357.9,scaleX:2.7184,scaleY:2.7184,x:370.4,y:354.4},0).wait(572));

	// Layer_1_obj_
	this.Layer_1 = new lib.Scene_1_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.setTransform(0.15,0.15,2.8607,2.8607,0,0,0,234.2,234.2);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 1
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(384).to({regX:35.5,regY:255.8,scaleX:2.0324,scaleY:2.0324,x:0,y:0.05},0).wait(190));

	// kid_obj_
	this.kid = new lib.Scene_1_kid();
	this.kid.name = "kid";
	this.kid.setTransform(388.35,378.35,2.8607,2.8607,0,0,0,369.9,366.4);
	this.kid.depth = 0;
	this.kid.isAttachedToCamera = 0
	this.kid.isAttachedToMask = 0
	this.kid.layerDepth = 0
	this.kid.layerIndex = 2
	this.kid.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.kid).wait(1).to({regX:370.1,regY:366.5,scaleX:2.7878,scaleY:2.7878,x:388.2,y:378.2},0).wait(118).to({regX:388.2,regY:378.2,scaleX:1,scaleY:1},0).wait(143).to({regX:179,regY:437.7,scaleX:7.3669,scaleY:7.3669,x:388.6,y:378.3},0).wait(169).to({regX:355.6,regY:430.1,scaleX:1.4947,scaleY:1.4947,x:388.2,y:378.1},0).wait(143));

	// mommy_obj_
	this.mommy = new lib.Scene_1_mommy();
	this.mommy.name = "mommy";
	this.mommy.setTransform(352.05,400.4,2.8607,2.8607,0,0,0,357.2,374.1);
	this.mommy.depth = 0;
	this.mommy.isAttachedToCamera = 0
	this.mommy.isAttachedToMask = 0
	this.mommy.layerDepth = 0
	this.mommy.layerIndex = 3
	this.mommy.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.mommy).wait(1).to({regX:357.1,regY:374.4,scaleX:2.7878,scaleY:2.7878,x:352,y:400.2},0).wait(118).to({regX:351.9,regY:400.3,scaleX:1,scaleY:1,x:351.9,y:400.3},0).wait(143).to({regX:174,regY:440.7,scaleX:7.3669,scaleY:7.3669,x:351.8,y:400.4},0).wait(169).to({regX:331.3,regY:444.9,scaleX:1.4947,scaleY:1.4947,x:351.9,y:400.25},0).wait(143));

	// story_obj_
	this.story = new lib.Scene_1_story();
	this.story.name = "story";
	this.story.setTransform(375.8,383.8,2.8607,2.8607,0,0,0,365.5,368.3);
	this.story.depth = 0;
	this.story.isAttachedToCamera = 0
	this.story.isAttachedToMask = 0
	this.story.layerDepth = 0
	this.story.layerIndex = 4
	this.story.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.story).wait(119).to({regX:375.8,regY:383.8,scaleX:1,scaleY:1},0).wait(143).to({regX:177.3,regY:438.4,scaleX:7.3669,scaleY:7.3669,x:376.1,y:383.45},0).wait(169).to({regX:347.3,regY:433.9,scaleX:1.4947,scaleY:1.4947,x:375.8,y:383.8},0).wait(143));

	// background_obj_
	this.background = new lib.Scene_1_background();
	this.background.name = "background";
	this.background.setTransform(355.45,394.4,2.8607,2.8607,0,0,0,358.4,372);
	this.background.depth = 0;
	this.background.isAttachedToCamera = 0
	this.background.isAttachedToMask = 0
	this.background.layerDepth = 0
	this.background.layerIndex = 5
	this.background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.background).wait(119).to({regX:355.3,regY:394.4,scaleX:1,scaleY:1,x:355.3},0).wait(46).to({regX:285.4,regY:403.9,scaleX:1.7003,scaleY:1.7003,x:355.35},0).wait(97).to({regX:174.5,regY:439.9,scaleX:7.3669,scaleY:7.3669,x:355.45,y:394.5},0).wait(169).to({regX:333.6,regY:441,scaleX:1.4947,scaleY:1.4947,x:355.35,y:394.4},0).wait(80).to({regX:514.5,regY:475.7,scaleX:1.6735,scaleY:1.6735,x:355.25,y:394.55},0).wait(39).to({regX:542.1,regY:505,scaleX:1.9491,scaleY:1.9491,x:355.3,y:394.4},0).wait(24));

	// stageBackground
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(1,1,1,3,true).p("Eg5zg5zMBznAAAMAAABznMhznAAAg");
	this.shape.setTransform(360,360);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Eg5zA50MAAAhznMBznAAAMAAABzng");
	this.shape_1.setTransform(360,360);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(574));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-97.1,18.9,1575.8999999999999,778.6);
// library properties:
lib.properties = {
	id: 'B49368C66F36454ABA6CA7539C69E853',
	width: 720,
	height: 720,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Group.png?1598375942835", id:"Group"},
		{src:"images/Mesh.png?1598375942835", id:"Mesh"},
		{src:"images/Mesh_1.png?1598375942835", id:"Mesh_1"},
		{src:"images/Mesh_10.png?1598375942835", id:"Mesh_10"},
		{src:"images/Mesh_11.png?1598375942835", id:"Mesh_11"},
		{src:"images/Mesh_12.png?1598375942835", id:"Mesh_12"},
		{src:"images/Mesh_13.png?1598375942835", id:"Mesh_13"},
		{src:"images/Mesh_13_1.png?1598375942835", id:"Mesh_13_1"},
		{src:"images/Mesh_138.png?1598375942835", id:"Mesh_138"},
		{src:"images/Mesh_14.png?1598375942835", id:"Mesh_14"},
		{src:"images/Mesh_15.png?1598375942835", id:"Mesh_15"},
		{src:"images/Mesh_16.png?1598375942835", id:"Mesh_16"},
		{src:"images/Mesh_17.png?1598375942835", id:"Mesh_17"},
		{src:"images/Mesh_17_1.png?1598375942835", id:"Mesh_17_1"},
		{src:"images/Mesh_18.png?1598375942835", id:"Mesh_18"},
		{src:"images/Mesh_1_0.png?1598375942835", id:"Mesh_1_0"},
		{src:"images/Mesh_2_0.png?1598375942835", id:"Mesh_2_0"},
		{src:"images/Mesh_3_0.png?1598375942835", id:"Mesh_3_0"},
		{src:"images/Mesh_4_0.png?1598375942835", id:"Mesh_4_0"},
		{src:"images/Mesh_5.png?1598375942835", id:"Mesh_5"},
		{src:"images/Mesh_5_1.png?1598375942835", id:"Mesh_5_1"},
		{src:"images/Mesh_5_0.png?1598375942835", id:"Mesh_5_0"},
		{src:"images/Mesh_7.png?1598375942835", id:"Mesh_7"},
		{src:"images/Mesh_7_1.png?1598375942835", id:"Mesh_7_1"},
		{src:"images/Mesh_8.png?1598375942835", id:"Mesh_8"},
		{src:"images/Mesh_9.png?1598375942835", id:"Mesh_9"},
		{src:"images/Path_0.png?1598375942835", id:"Path_0"},
		{src:"images/Path_0_1.png?1598375942835", id:"Path_0_1"},
		{src:"images/Path_1.png?1598375942835", id:"Path_1"},
		{src:"images/Path_1_0.png?1598375942835", id:"Path_1_0"},
		{src:"sounds/גייןבורדומארחיםאתאברהםלגסהילדמזדקןבמסגרתחגיגות70לחברילהקתכוורתשלוואלהואקו99AudioTrimmercom1.mp3?1598375942835", id:"גייןבורדומארחיםאתאברהםלגסהילדמזדקןבמסגרתחגיגות70לחברילהקתכוורתשלוואלהואקו99AudioTrimmercom1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['B49368C66F36454ABA6CA7539C69E853'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;