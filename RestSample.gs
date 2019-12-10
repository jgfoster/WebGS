
expectvalue /Class
doit
RestSample comment:
'No class-specific documentation for WebAppSample, hierarchy is:
Object
  WebApp( begin end exception html request response)
    WebAppSample( main)
'
%
expectvalue /Class
doit
RestSample category: 'User Interface'
%

! ------------------- Remove existing behavior from RestSample
expectvalue /Metaclass3
doit
RestSample removeAllMethods.
RestSample class removeAllMethods.
%
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
