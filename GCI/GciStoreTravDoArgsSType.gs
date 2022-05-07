! ------------------- Remove existing behavior from GciStoreTravDoArgsSType
removeAllMethods GciStoreTravDoArgsSType
removeAllClassMethods GciStoreTravDoArgsSType
! ------------------- Class methods for GciStoreTravDoArgsSType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType
new

	^self gcMalloc: 96.
%
category: 'Instance Creation'
classmethod: GciStoreTravDoArgsSType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciStoreTravDoArgsSType
set compile_env: 0
category: 'Accessing'
method: GciStoreTravDoArgsSType
alteredCompleted

	^self int32At: 12.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
alteredNumOops

	^self int32At: 8.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
alteredTheOops

	^self
		pointerAt: 78
		resultClass: CByteArray.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
doFlags

	^self int32At: 4.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
doPerform

	^self int32At: 0.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
storeTravBuff

	^self
		pointerAt: 70
		resultClass: CByteArray.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
storeTravFlags

	^self int32At: 86.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
u

	^self
		newFrom: 16
		numBytes: 54.
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
u_continueArgs

	^GciStoreTravDoArgsSType_continueArgs on: (self
		newFrom: 16
		numBytes: 54).
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
u_executestr

	^GciStoreTravDoArgsSType_executestr on: (self
		newFrom: 16
		numBytes: 54).
%
category: 'Accessing'
method: GciStoreTravDoArgsSType
u_perform

	^GciStoreTravDoArgsSType_perform on: (self
		newFrom: 16
		numBytes: 54).
%
set compile_env: 0
category: 'Conversion'
method: GciStoreTravDoArgsSType
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
method: GciStoreTravDoArgsSType
initialize
%
category: 'Initialization'
method: GciStoreTravDoArgsSType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciStoreTravDoArgsSType
alteredCompleted: anObject

	self 
		int32At: 12
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType
alteredNumOops: anObject

	self 
		int32At: 8
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType
alteredTheOops: aCByteArray

	self
		pointerAt: 78
		put: aCByteArray.
%
category: 'Updating'
method: GciStoreTravDoArgsSType
doFlags: anObject

	self 
		int32At: 4
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType
doPerform: anObject

	self 
		int32At: 0
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType
storeTravBuff: aCByteArray

	self
		pointerAt: 70
		put: aCByteArray.
%
category: 'Updating'
method: GciStoreTravDoArgsSType
storeTravFlags: anObject

	self 
		int32At: 86
		put: anObject.
%
category: 'Updating'
method: GciStoreTravDoArgsSType
u: aByteArray

	self
		replaceFrom: 16
		to: 15 + (54 min: aByteArray size)
		with: aByteArray
		startingAt: 1.
%
