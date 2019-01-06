! ------- Create dictionary if it is not present
run
| aSymbol names userProfile |
aSymbol := #'JSON'.
userProfile := System myUserProfile.
names := userProfile symbolList names.
(names includes: aSymbol) ifFalse: [
	| symbolDictionary |
	symbolDictionary := SymbolDictionary new name: aSymbol; yourself.
	userProfile insertDictionary: symbolDictionary at: names size + 1.
].
%
set compile_env: 0
! ------------------- Class definition for JsonParser
expectvalue /Class
doit
PPCompositeParser subclass: 'JsonParser'
  instVarNames: #( array character element
                    elements escape exp frac
                    int json member members
                    number object sign string
                    value)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: JSON
  options: #()

%
expectvalue /Class
doit
JsonParser comment: 
'https://www.json.org/

json
    element

value
    object
    array
    string
    number
    "true"
    "false"
    "null"

object
    ''{'' ws ''}''
    ''{'' members ''}''

members
    member
    member '','' members

member
    ws string ws '':'' element

array
    ''['' ws '']''
    ''['' elements '']''

elements
    element
    element '','' elements

element
    ws value ws

string
    ''"'' characters ''"''

characters
    ""
    character characters

character
    ''0020'' . ''10ffff'' - ''"'' - ''\''
    ''\'' escape

escape
    ''"''
    ''\''
    ''/''
    ''b''
    ''n''
    ''r''
    ''t''
    ''u'' hex hex hex hex

hex
    digit
    ''A'' . ''F''
    ''a'' . ''f''

number
    int frac exp

int
    digit
    onenine digits
    ''-'' digit
    ''-'' onenine digits

digits
    digit
    digit digits

digit
    ''0''
    onenine

onenine
    ''1'' . ''9''

frac
    ""
    ''.'' digits

exp
    ""
    ''E'' sign digits
    ''e'' sign digits

sign
    ""
    ''+''
    ''-''

ws
    ""
    ''0009'' ws
    ''000a'' ws
    ''000d'' ws
    ''0020'' ws'
%
expectvalue /Class
doit
JsonParser category: 'Kernel'
%
set compile_env: 0
! ------------------- Class definition for JsonParserTestCase
expectvalue /Class
doit
TestCase subclass: 'JsonParserTestCase'
  instVarNames: #( parser)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: JSON
  options: #()

%
expectvalue /Class
doit
JsonParserTestCase comment: 
'No class-specific documentation for JsonParserTestCase, hierarchy is: 
Object
  TestAsserter
    TestCase( testSelector)
      JsonParserTestCase
'
%
expectvalue /Class
doit
JsonParserTestCase category: 'Kernel'
%

! ------------------- Remove existing behavior from JsonParser
expectvalue /Metaclass3       
doit
JsonParser removeAllMethods.
JsonParser class removeAllMethods.
%
! ------------------- Class methods for JsonParser
! ------------------- Instance methods for JsonParser
set compile_env: 0
category: 'other'
method: JsonParser
array

	^((	$[ asParser , #space asParser star , $] asParser) 	==> [:tokens | #()])
	| ((	$[ asParser , elements , $] asParser) 					==> [:tokens | tokens at: 2])
%
category: 'other'
method: JsonParser
character

	^(($\ asParser , escape) 											==> [:tokens | tokens at: 2])
	| (($" asParser not , $\ asParser not , #any asParser) 	==> [:tokens | tokens at: 3])
%
category: 'other'
method: JsonParser
element

	^value trim
%
category: 'other'
method: JsonParser
elements

	^(element , ($, asParser , elements) star) ==> [:tokens | 
		(tokens at: 2) isEmpty
			ifTrue: [Array with: (tokens at: 1)]
			ifFalse: [(Array with: (tokens at: 1)) , (((tokens at: 2) at: 1) at: 2)]]
%
category: 'other'
method: JsonParser
escape

	^$" asParser
	| $\ asParser
	| $/ asParser
	| ($b asParser ==> [:tokens | Character codePoint: 8])
	| ($n asParser ==> [:tokens | Character lf])
	| ($r asParser ==> [:tokens | Character cr])
	| ($t asParser ==> [:tokens | Character tab])
	| (($u asParser , (#hex asParser times: 4) flatten) ==> [:tokens | Character codePoint: ('16r' , (tokens at: 2)) asNumber])
%
category: 'other'
method: JsonParser
exp

	^(($E asParser | $e asParser) , sign optional , #digit asParser plus) flatten
%
category: 'other'
method: JsonParser
frac

	^($. asParser , #digit asParser plus flatten) ==> [:tokens | '.' , tokens last]
%
category: 'other'
method: JsonParser
int

	^(sign optional , #digit asParser plus) flatten
%
category: 'other'
method: JsonParser
json

	^element
%
category: 'other'
method: JsonParser
member

	^(string trim , $: asParser , element) ==> [:tokens | (tokens at: 1) -> (tokens at: 3)]
%
category: 'other'
method: JsonParser
members

	^(member , ($, asParser , members) star) ==> [:tokens | 
		| assoc more |
		assoc := tokens at: 1.
		more := tokens at: 2.
		more isEmpty ifTrue: [
			Dictionary with: assoc
		] ifFalse: [
			((more at: 1) at: 2)	"ignore the comma"
				add: assoc;
				yourself.
		].
	]
%
category: 'other'
method: JsonParser
number

	^(int , frac optional , exp optional) ==> [:tokens | ((tokens at: 1) , ((tokens at: 2) ifNil: ['']) , ((tokens at: 3) ifNil: [''])) asNumber]
%
category: 'other'
method: JsonParser
object

	^((	${ asParser , #space asParser star , $} asParser) 	==> [:tokens | Dictionary new])
	| ((	${ asParser , members , $} asParser) 					==> [:tokens | tokens at: 2])
%
category: 'other'
method: JsonParser
sign

	^$+ asParser
	| $- asParser
%
category: 'other'
method: JsonParser
start

	^json
%
category: 'other'
method: JsonParser
string

	^($" asParser , character star , $" asParser) ==> [:tokens | String withAll: (tokens at: 2)]
%
category: 'other'
method: JsonParser
value

	^(array
	| object
	| string
	| ('true' asParser ==> [:tokens | true])
	| ('false' asParser ==> [:tokens | false])
	| ('null' asParser ==> [:tokens | nil])
	| number) memoized
%

! ------------------- Remove existing behavior from JsonParserTestCase
expectvalue /Metaclass3       
doit
JsonParserTestCase removeAllMethods.
JsonParserTestCase class removeAllMethods.
%
! ------------------- Class methods for JsonParserTestCase
! ------------------- Instance methods for JsonParserTestCase
set compile_env: 0
category: 'other'
method: JsonParserTestCase
setUp

	super setUp.
	parser := JsonParser new.
%
category: 'other'
method: JsonParserTestCase
testArray

	self
		assert: (parser parse: '[]') 		equals: #();
		assert: (parser parse: '[  ]') 		equals: #();

		assert: (parser parse: '[ "a" ]') 	equals: #('a');
		assert: (parser parse: '[true ]') 	equals: #(true);
		assert: (parser parse: '[false]') 	equals: #(false);
		assert: (parser parse: '[ null]') 	equals: #(nil);
		assert: (parser parse: '[ 1 ]') 	equals: #(1);
		assert: (parser parse: '[[]]') 		equals: #(#());

		assert: (parser parse: '[ true , false ]') 			equals: #(true false);
		assert: (parser parse: '[1, true , null , "abc"]') 	equals: #(1 true nil 'abc');

		yourself.
%
category: 'other'
method: JsonParserTestCase
testExponent

	self
		assert: (parser parse: '1E1') equals: 10;
		assert: (parser parse: '1E-1') equals: 0.1;
		assert: (parser parse: '-1.5E1') equals: -15;
		yourself.
%
category: 'other'
method: JsonParserTestCase
testFalse

	self assert: (parser parse: 'false') equals: false.
%
category: 'other'
method: JsonParserTestCase
testFraction

	self
		assert: (parser parse: '0.0') equals: 0;
		assert: (parser parse: '4.2') equals: 4.2;
		yourself.
%
category: 'other'
method: JsonParserTestCase
testInteger

	self
		assert: (parser parse: '0') equals: 0;
		assert: (parser parse: '42') equals: 42;
		assert: (parser parse: '-2') equals: -2;
		yourself.
%
category: 'other'
method: JsonParserTestCase
testNull

	self assert: (parser parse: 'null') equals: nil.
%
category: 'other'
method: JsonParserTestCase
testObject

	self
		assert: (parser parse: '{}') 		equals: Dictionary new;
		assert: (parser parse: '{  }') 		equals: Dictionary new;

		assert: (parser parse: '{"a":"b"}') 		equals: (Dictionary with: 'a' -> 'b');
		assert: (parser parse: '{
			"a":true, 
			"b" : false ,
			"c" : [null, 1, {"x":"y"}],
			"d" : { "foo" : "bar" }
		}') 		equals: (Dictionary new
			at: 'a' put: true;
			at: 'b' put: false;
			at: 'c' put: (Array with: nil with: 1 with: (Dictionary with: 'x' -> 'y'));
			at: 'd' put: (Dictionary with: 'foo' -> 'bar');
			yourself);
		yourself.
%
category: 'other'
method: JsonParserTestCase
testString

	| u |
	u := (Character codePoint: 16rFFFF) asString.
	self
		assert: (parser parse: '""') 		equals: '';
		assert: (parser parse: '"abc"') 	equals: 'abc';
		assert: (parser parse: '"13!#"') 	equals: '13!#';
		assert: (parser parse: '"x\"y"') 	equals: 'x"y';
		assert: (parser parse: '"x\\y"') 	equals: 'x\y';
		assert: (parser parse: '"x\/y"') 	equals: 'x/y';
		assert: (parser parse: '"x\by"') 	equals: 'x' , (Character codePoint: 08) asString , 'y';
		assert: (parser parse: '"x\ny"') 	equals: 'x' , Character lf 	asString , 'y';
		assert: (parser parse: '"x\ry"') 	equals: 'x' , Character cr 	asString , 'y';
		assert: (parser parse: '"x\ty"') 	equals: 'x' , Character tab	asString , 'y';
		assert: (parser parse: '"' , u , '"') 	equals: u;
		assert: (parser parse: '"\uFFFF"')	equals: u;
		yourself.
%
category: 'other'
method: JsonParserTestCase
testTrue

	self assert: (parser parse: 'true') equals: true.
%
