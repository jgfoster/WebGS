! ------------------- Remove existing behavior from GciStoreTravDoArgsSType_perform
removeAllMethods GciStoreTravDoArgsSType_perform
removeAllClassMethods GciStoreTravDoArgsSType_perform
! ------------------- Class methods for GciStoreTravDoArgsSType_perform
set compile_env: 0
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType_perform
new

	^self gcMalloc: 56.
%
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType_perform
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciStoreTravDoArgsSType_perform
set compile_env: 0
category: 'Accessing'
method: GciStoreTravDoArgsSType_perform
args

	^self
		pointerAt: 40
		resultClass: CByteArray.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_perform
environmentId

	^self uint16At: 52.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_perform
numArgs

	^self int32At: 48.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_perform
pad

	^self _stringFromBytes: (self 
		byteArrayFrom: 8
		to: 31).
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_perform
receiver

	^self uint64At: 0.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_perform
selector

	^self
		pointerAt: 32
		resultClass: CByteArray.
%
set compile_env: 0
category: 'Conversion'
method: GciStoreTravDoArgsSType_perform
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
method: GciStoreTravDoArgsSType_perform
initialize
%
category: 'Initialization'
method: GciStoreTravDoArgsSType_perform
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciStoreTravDoArgsSType_perform
args: aCByteArray

	self
		pointerAt: 40
		put: aCByteArray.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_perform
environmentId: anObject

	self 
		uint16At: 52
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_perform
numArgs: anObject

	self 
		int32At: 48
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_perform
pad: aByteArray

	self
		replaceFrom: 8
		to: 7 + (24 min: aByteArray size)
		with: aByteArray
		startingAt: 1.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_perform
receiver: anObject

	self 
		uint64At: 0
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_perform
selector: aCByteArray

	self
		pointerAt: 32
		put: aCByteArray.
%
