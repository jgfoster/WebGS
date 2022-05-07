! ------------------- Remove existing behavior from GciStoreTravDoArgsSType_executestr
removeAllMethods GciStoreTravDoArgsSType_executestr
removeAllClassMethods GciStoreTravDoArgsSType_executestr
! ------------------- Class methods for GciStoreTravDoArgsSType_executestr
set compile_env: 0
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType_executestr
new

	^self gcMalloc: 56.
%
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType_executestr
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciStoreTravDoArgsSType_executestr
set compile_env: 0
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
args

	^self
		pointerAt: 40
		resultClass: CByteArray.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
contextObject

	^self uint64At: 0.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
environmentId

	^self uint16At: 52.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
numArgs

	^self int32At: 48.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
source

	^self
		pointerAt: 32
		resultClass: CByteArray.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
sourceClass

	^self uint64At: 8.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
sourceSize

	^self int64At: 24.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType_executestr
symbolList

	^self uint64At: 16.
%
set compile_env: 0
category: 'Conversion'
method: GciStoreTravDoArgsSType_executestr
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
method: GciStoreTravDoArgsSType_executestr
initialize
%
category: 'Initialization'
method: GciStoreTravDoArgsSType_executestr
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
args: aCByteArray

	self
		pointerAt: 40
		put: aCByteArray.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
contextObject: anObject

	self 
		uint64At: 0
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
environmentId: anObject

	self 
		uint16At: 52
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
numArgs: anObject

	self 
		int32At: 48
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
source: aCByteArray

	self
		pointerAt: 32
		put: aCByteArray.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
sourceClass: anObject

	self 
		uint64At: 8
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
sourceSize: anObject

	self 
		int64At: 24
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType_executestr
symbolList: anObject

	self 
		uint64At: 16
		put: anObject.
%
