! ------------------- Remove existing behavior from GciObjRepSType
removeAllMethods GciObjRepSType
removeAllClassMethods GciObjRepSType
! ------------------- Class methods for GciObjRepSType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciObjRepSType
new

	^self gcMalloc: 48.
%
category: 'Instance Creation'
classmethod: GciObjRepSType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciObjRepSType
set compile_env: 0
category: 'Accessing'
method: GciObjRepSType
hdr

	^self
		newFrom: 0
		numBytes: 40.
%
category: 'Accessing'
method: GciObjRepSType
u

	^self
		newFrom: 40
		numBytes: 8.
%
set compile_env: 0
category: 'Conversion'
method: GciObjRepSType
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
method: GciObjRepSType
initialize
%
category: 'Initialization'
method: GciObjRepSType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciObjRepSType
hdr: aByteArray

	self
		replaceFrom: 0
		to: -1 + (40 min: aByteArray size)
		with: aByteArray
		startingAt: 1.
%
category: 'Updating'
method: GciObjRepSType
u: aByteArray

	self
		replaceFrom: 40
		to: 39 + (8 min: aByteArray size)
		with: aByteArray
		startingAt: 1.
%
