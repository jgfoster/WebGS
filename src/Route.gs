! ------------------- Remove existing behavior from Route
removeAllMethods Route
removeAllClassMethods Route
! ------------------- Class methods for Route
set compile_env: 0
category: 'constructors'
classmethod: Route
method: methodString path: pathString block: aBlock

  ^self basicNew
    method: methodString;
    path: pathString;
    block: aBlock;
    yourself
%
set compile_env: 0
category: 'constructors'
classmethod: Route
new

  self error: 'Use #method:path:block:'
%
! ------------------- Instance methods for Route
set compile_env: 0
category: 'setters'
method: Route
block: aBlock

  block := aBlock.
%
set compile_env: 0
category: 'handler'
method: Route
handle: aRequest

  | args getArgument requestPathStream response |
  Log instance log: #'debug' string: 'Route>>handle: ' , 
    aRequest path printString , ' - ' , pathPieces printString.
  method = aRequest method ifFalse: [^nil].
  response := HttpResponse new.
  args := Array with: aRequest with: response.
  requestPathStream := ReadStream on: aRequest path.
  getArgument := false.
  pathPieces do: [:each | 
    Log instance log: #'debug' string: 'A - ' , each printString , ' - ' , getArgument printString.
    getArgument ifTrue: [
      | string |
      string := String new.
      [
        requestPathStream atEnd ifTrue: [
          ^nil.
        ].
        string add: requestPathStream next.
        Log instance log: #'debug' string: 'B - ' , string printString.
        string endsWith: each.
      ] whileFalse.
      args add: (string := string copyFrom: 1 to: string size - each size).
      Log instance log: #'debug' string: 'C - ' , string printString.
      getArgument := false.
    ] ifFalse: [
      each == $: ifTrue: [
        getArgument := true.
      ] ifFalse: [
        | requestPiece |
        requestPiece := requestPathStream next: each size.
        each = requestPiece ifFalse: [
          ^nil
        ].
      ].
    ].
  ].
  getArgument ifTrue: [
    args add: requestPathStream upToEnd.
  ].
  requestPathStream atEnd ifFalse: [
    ^nil
  ].
  args size: block argumentCount.
  Log instance log: #'debug' string: 'Route>>handle: ' , 
    aRequest printString , ' - ' , args printString.
  block valueWithArguments: args.
  ^response
%
set compile_env: 0
category: 'setters'
method: Route
path: aString

  | i j |
  aString first == $/ ifFalse: [
    self error: 'Path must begin with $/'.
  ].
  aString = '/' ifTrue: [
    pathPieces := #('/').
  ] ifFalse: [
    pathPieces := Array new.
    i := 1.
    [
      j := aString indexOf: $: startingAt: i.
      j > 0.
    ] whileTrue: [
      pathPieces add: (aString copyFrom: i to: j - 1).
      i := j.
      [ 
        | char |
        j := j + 1.
        char := aString at: j.
        (char isLetter or: [char isDigit or: [char == $_]]) and: [j < aString size].
      ] whileTrue.
      pathPieces add: $:.
      i := j.
    ].
    i < aString size ifTrue: [
      pathPieces add: (aString copyFrom: i to: aString size).
    ].
  ].
  Log instance log: #'debug' string: pathPieces printString.
%
set compile_env: 0
category: 'setters'
method: Route
method: aString

  method := aString.
%
