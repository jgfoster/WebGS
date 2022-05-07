! ------------------- Remove existing behavior from GciStoreTravDoArgsSType_continueArgs
removeAllMethods GciStoreTravDoArgsSType_continueArgs
removeAllClassMethods GciStoreTravDoArgsSType_continueArgs
! ------------------- Class methods for GciStoreTravDoArgsSType_continueArgs
set compile_env: 0
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType_continueArgs
new

	^self gcMalloc: 16.
%
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType_continueArgs
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciStoreTravDoArgsSType_continueArgs
set compile_env: 0
category: 'Accessing'
method: GciStoreTravDoArgsSType_continueArgs
process

	^self uint64At: 0.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_continueArgs
replaceTopOfStack

	^self uint64At: 8.
%
set compile_env: 0
category: 'Conversion'
method: GciStoreTravDoArgsSType_continueArgs
_stringFromBytes: aByteArray

	| index |
	index := aByteArray indexOf: 0.
	^aByteArray
		at: 1
		sizeBytes: 1
		stringSize: (0 == index ifTrue: [aByteArray size] ifFalse: [index - 1]).
%
set compile_env: 0
category: 'Initialization'
method: GciStoreTravDoArgsSType_continueArgs
initialize
%
category: 'Initialization'
method: GciStoreTravDoArgsSType_continueArgs
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciStoreTravDoArgsSType_continueArgs
process: anObject

	self 
		uint64At: 0
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_continueArgs
replaceTopOfStack: anObject

	self 
		uint64At: 8
		put: anObject.
%
