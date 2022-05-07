! ------------------- Remove existing behavior from GciDateTimeSType
removeAllMethods GciDateTimeSType
removeAllClassMethods GciDateTimeSType
! ------------------- Class methods for GciDateTimeSType
set compile_env: 0
category: 'Instance Creation'
classmethod: GciDateTimeSType
new

	^self gcMalloc: 24.
%
category: 'Instance Creation'
classmethod: GciDateTimeSType
on: aCByteArray

	^self withAll: aCByteArray.
%
! ------------------- Instance methods for GciDateTimeSType
set compile_env: 0
category: 'Accessing'
method: GciDateTimeSType
dayOfYear

	^self int32At: 4.
%
category: 'Accessing'
method: GciDateTimeSType
milliseconds

	^self int32At: 8.
%
category: 'Accessing'
method: GciDateTimeSType
timeZone

	^self uint64At: 12.
%
category: 'Accessing'
method: GciDateTimeSType
year

	^self int32At: 0.
%
set compile_env: 0
category: 'Conversion'
method: GciDateTimeSType
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
method: GciDateTimeSType
initialize
%
category: 'Initialization'
method: GciDateTimeSType
initialize: aCByteArray

	1 to: (self size min: aCByteArray size) do: [:i |
		self uint8At: i put: (aCByteArray uint8At: i).
	].
%
set compile_env: 0
category: 'Updating'
method: GciDateTimeSType
dayOfYear: anObject

	self 
		int32At: 4
		put: anObject.
%
category: 'Updating'
method: GciDateTimeSType
milliseconds: anObject

	self 
		int32At: 8
		put: anObject.
%
category: 'Updating'
method: GciDateTimeSType
timeZone: anObject

	self 
		uint64At: 12
		put: anObject.
%
category: 'Updating'
method: GciDateTimeSType
year: anObject

	self 
		int32At: 0
		put: anObject.
%
