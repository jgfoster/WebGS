set compile_env: 0
! ------------------- Class definition for GciJsonParser
expectvalue /Class
doit
Object subclass: 'GciJsonParser'
  instVarNames: #( stream)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: UserGlobals
  options: #()

%
expectvalue /Class
doit
GciJsonParser category: 'Kernel'
%
! ------------------- Remove existing behavior from GciJsonParser
expectvalue /Metaclass3
doit
GciJsonParser removeAllMethods.
GciJsonParser class removeAllMethods.
%
set compile_env: 0
! ------------------- Class methods for GciJsonParser
category: 'other'
classmethod: GciJsonParser
parse: aString

	^self new
		initialize: aString;
		value
%
! ------------------- Instance methods for GciJsonParser
category: 'other'
method: GciJsonParser
array

	| array char |
	array := Array new.
	self assert: self nextChar is: $[.
	[
		(char := self peekChar) ifNil: [self error: 'Unterminated array!'].
		char ~~ $].
	] whileTrue: [
		array add: self value.
		char := self peekChar.
		char == $, ifTrue: [
			self nextChar. 
			char := self peekChar.
		].
	].
	self assert: self nextChar is: $].
	^array
%
category: 'other'
method: GciJsonParser
assert: actual is: expected

	actual = expected ifTrue: [^self].
	self error: 'Invalid JSON'.
%
category: 'other'
method: GciJsonParser
initialize: aString

	stream := ReadStream on: aString.
%
category: 'other'
method: GciJsonParser
nextChar

	| char |
	char := self peekChar.
	char ifNotNil: [stream next].
	^char
%
category: 'other'
method: GciJsonParser
number

	| char sign number fraction divisor exponent |
	char := self peekChar.
	char == $- ifTrue: [
		sign := -1.
		char := stream next; peek.
	] ifFalse: [
		sign := 1.
	].
	number := 0.
	char == $0 ifTrue: [
		char := stream next; peek.
	] ifFalse: [
		[char notNil and: [char isDigit]] whileTrue: [
			number := number * 10 + char codePoint - $0 codePoint.
			char := stream next; peek.
		].
	].
	divisor := 1.0.
	fraction := 0.
	char == $. ifTrue: [
		[
			char := stream next; peek.
			char notNil and: [char isDigit].
		] whileTrue: [
			fraction := fraction * 10 + char codePoint - $0 codePoint.
			divisor := divisor * 10.
			
		].
		number := number + (fraction / divisor).
	].
	number := number * sign.
	(char == $e or: [char == $E]) ifTrue: [
		char := stream next; peek.
		sign := 1.
		char == $- ifTrue: [sign := -1. char := stream next; peek] ifFalse: [
		char == $+ ifTrue: [char := stream next; peek]].
		exponent := 0.
		[char notNil and: [char isDigit]] whileTrue: [
			exponent := exponent * 10 +char codePoint - $0 codePoint.
			char := stream next; peek.
		].
		number := number * (10 raisedTo: exponent * sign).
	].
	^number
%
category: 'other'
method: GciJsonParser
object

	| char key object |
	object := Dictionary new.
	self assert: self nextChar is: ${.
	[
		(char := self peekChar) ifNil: [self error: 'Unterminated object!'].
		char ~~ $}.
	] whileTrue: [
		key := self string.
		self assert: self nextChar is: $:.
		object at: key put: self value.
		char := self peekChar.
		char == $, ifTrue: [
			self nextChar.
			char := self peekChar.
		].
	].
	^object
%
category: 'other'
method: GciJsonParser
peekChar

	| char |
	[
		stream atEnd ifTrue: [^nil].
		char := stream peek.
		char isSeparator.
	] whileTrue: [stream next].
	^char
%
category: 'other'
method: GciJsonParser
string
	"Began with double quotes character"

	| char writeStream |
	writeStream := WriteStream on: String new.
	self assert: self nextChar is: $".
	[
		char := stream next.
		char ~~ $".
	] whileTrue: [
		char == $\ ifTrue: [
			char := stream next.
			char == $"	ifTrue: [writeStream nextPut: $"	] ifFalse: [
			char == $\	ifTrue: [writeStream nextPut: $\	] ifFalse: [
			char == $/	ifTrue: [writeStream nextPut: $/	] ifFalse: [
			char == $b	ifTrue: [writeStream nextPut: (Character codePoint: 8	)] ifFalse: [
			char == $f	ifTrue: [writeStream nextPut: (Character codePoint: 12	)] ifFalse: [
			char == $n	ifTrue: [writeStream nextPut: (Character codePoint: 10	)] ifFalse: [
			char == $r	ifTrue: [writeStream nextPut: (Character codePoint: 13	)] ifFalse: [
			char == $t	ifTrue: [writeStream nextPut: (Character codePoint: 9	)] ifFalse: [
			char == $u	ifTrue: [
				| code |
				code := '16r' , (stream next: 4).
				writeStream nextPut: (Character codePoint: code asNumber).
			]]]]]]]]]
		] ifFalse: [
			writeStream nextPut: char.
		].
	].
	^writeStream contents
%
category: 'other'
method: GciJsonParser
test
"
	GciJsonParser new test.
"

	| value |
	self initialize: 'true'.	self assert: self value is: true.
	self initialize: 'false'.	self assert: self value is: false.
	self initialize: 'null'.	self assert: self value is: nil.
	"number"
	self initialize: '0'.			self assert: self value is: 0.
	self initialize: '1'.			self assert: self value class is: SmallInteger.
	self initialize: '123'.		self assert: self value is: 123.
	self initialize: '-456'.		self assert: self value is: -456.
	self initialize: '0.'.			self assert: self value is: 0.
	self initialize: '0.0'.		self assert: self value is: 0.
	self initialize: '0.25'.		self assert: self value is: 0.25.
	self initialize: '0.25e2'.	self assert: self value is: 25.
	self initialize: '25e-2'.	self assert: self value is: 0.25.
	"string"
	self initialize: '"abc"'.		self assert: self value is: 'abc'.
	self initialize: '"x\ty"'.	self assert: self value is: 'x	y'.
	"array"
	self initialize: ' [ 1 , 2 ] '.	self assert: self value is: #(1 2).
	"object"
	self initialize: '{"x": 1, "y": [2], "z": 3}'.
	value := self value.
	self
		assert: value size is: 3;
		assert: (value at: 'x') is: 1;
		assert: (value at: 'y') is: #(2);
		assert: (value at: 'z') is: 3;
		yourself.
%
category: 'other'
method: GciJsonParser
value

	| char |
	char := self peekChar.
	char == ${	ifTrue: [^self object	].
	char == $[	ifTrue: [^self array	].
	char == $"	ifTrue: [^self string	].
	char == $t	ifTrue: [self assert: (stream next: 4) is: 'true'	. ^true	].
	char == $f	ifTrue: [self assert: (stream next: 5) is: 'false'	. ^false	].
	char == $n	ifTrue: [self assert: (stream next: 4) is: 'null'	. ^nil		].
	^self number
%
