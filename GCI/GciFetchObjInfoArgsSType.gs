! ------------------- Remove existing behavior from GciFetchObjInfoArgsSType
removeAllMethods GciFetchObjInfoArgsSType
removeAllClassMethods GciFetchObjInfoArgsSType
! ------------------- Class methods for GciFetchObjInfoArgsSType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciFetchObjInfoArgsSType
new

	^self gcMalloc: 48.
%
category: 'Instance Creation'
classmethod: GciFetchObjInfoArgsSType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciFetchObjInfoArgsSType
set compile_env: 0
category: 'Accessing'
method: GciFetchObjInfoArgsSType
buffer

	^self
		pointerAt: 32
		resultClass: CByteArray.
%
category: 'Accessing'
method: GciFetchObjInfoArgsSType
bufSize

	^self int64At: 8.
%
category: 'Accessing'
method: GciFetchObjInfoArgsSType
info

	^self
		pointerAt: 24
		resultClass: CByteArray.
%
category: 'Accessing'
method: GciFetchObjInfoArgsSType
isRpc

	^self int32At: 44.
%
category: 'Accessing'
method: GciFetchObjInfoArgsSType
numReturned

	^self int64At: 16.
%
category: 'Accessing'
method: GciFetchObjInfoArgsSType
retrievalFlags

	^self int32At: 40.
%
category: 'Accessing'
method: GciFetchObjInfoArgsSType
startIndex

	^self int64At: 0.
%
set compile_env: 0
category: 'Conversion'
method: GciFetchObjInfoArgsSType
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
method: GciFetchObjInfoArgsSType
initialize
%
category: 'Initialization'
method: GciFetchObjInfoArgsSType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciFetchObjInfoArgsSType
buffer: aCByteArray

	self
		pointerAt: 32
		put: aCByteArray.
%
category: 'Updating'
method: GciFetchObjInfoArgsSType
bufSize: anObject

	self 
		int64At: 8
		put: anObject.
%
category: 'Updating'
method: GciFetchObjInfoArgsSType
info: aCByteArray

	self
		pointerAt: 24
		put: aCByteArray.
%
category: 'Updating'
method: GciFetchObjInfoArgsSType
isRpc: anObject

	self 
		int32At: 44
		put: anObject.
%
category: 'Updating'
method: GciFetchObjInfoArgsSType
numReturned: anObject

	self 
		int64At: 16
		put: anObject.
%
category: 'Updating'
method: GciFetchObjInfoArgsSType
retrievalFlags: anObject

	self 
		int32At: 40
		put: anObject.
%
category: 'Updating'
method: GciFetchObjInfoArgsSType
startIndex: anObject

	self 
		int64At: 0
		put: anObject.
%
