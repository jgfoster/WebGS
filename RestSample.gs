! ------------------- Remove existing behavior from RestSample
removeAllMethods RestSample
removeAllClassMethods RestSample
! ------------------- Class methods for RestSample
set compile_env: 0
category: 'required'
classmethod: RestSample
workerCount
	"Do everything in one Gem"
	^0
%
! ------------------- Instance methods for RestSample
set compile_env: 0
category: 'REST API'
method: RestSample
add_gs: args

	| x y |
	x := args at: 'x'.
	y := args at: 'y'.
	^Dictionary new
		at: 'sum' put: x + y;
		yourself.
%
category: 'REST API'
method: RestSample
stone_gs

	^System stoneConfigurationReport
%
