#ui-lib使用说明

##调用方式

	@import "ui-lib.scss"

##示例

###@keyframes
	
	@include keyframes(large, webkit moz){
		0%   {background:red;@include transform(scale(1));}
		25%  {background:yellow;@include transform(scale(0.9));}
		50%  {background:blue;@include transform(scale(1.2));} 
		100% {background:green;@include transform(scale(0.8));}
	}

###transform

	@include transform(rotate(-4deg));

###animation

	@include animation(large 6s infinite);

###transition

	@include transition(width 5s ease-in-out, opacity 1s);

###clearfix

	@include clearfix();

###inline-block

	@include inline-block();

###border-radius

	@include border-radius(1px solid #ccc);

###gradient-vertical

	@include gradient-vertical();

###box-shadow

	@include box-shadow();

###alpha

	@include alpha();

###mediaMin

	@include mediaMin(480, root480) {
	    #mytestDiv{
	        text-align: center;
	        font-size: 20px;
	    }
	}

###mediaMax
	
	@include mediaMax(480, root480) {
	    #mytestDiv{
	        text-align: center;
	        font-size: 20px;
	    }
	}

###mediaMinMax

	@include mediaMinMax(480, 960, root480) {
	    #mytestDiv{
	        text-align: center;
	        font-size: 20px;
	    }
	}
