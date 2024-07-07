! ------- Create dictionary if it is not present
run
| aSymbol names userProfile |
aSymbol := #'Films'.
userProfile := System myUserProfile.
names := userProfile symbolList names.
(names includes: aSymbol) ifFalse: [
	| symbolDictionary |
	symbolDictionary := SymbolDictionary new name: aSymbol; yourself.
	userProfile insertDictionary: symbolDictionary at: names size + 1.
].
%
set compile_env: 0
! ------------------- Class definition for Film
expectvalue /Class
doit
Object subclass: 'Film'
  instVarNames: #( id title views)
  classVars: #()
  classInstVars: #(films)
  poolDictionaries: #()
  inDictionary: Films
  options: #()

%
! ------------------- Remove existing behavior from Film
removeAllMethods Film
removeAllClassMethods Film
! ------------------- Class methods for Film
set compile_env: 0
category: 'unclassified'
classmethod: Film
data

  ^#(
    #(1	'Barbie'	59019108)
    #(2	'The Super Mario Bros. Film'	53333425)
    #(3	'Spider-Man: Across the Spid…'	35372108)
    #(4	'Guardians of the Galaxy Vol 3'	33302024)
    #(5	'Oppenheimer'	30250590)
    #(6	'The Little Mermaid'	27659745)
    #(7	'Avatar: The Way of Water'	26258614)
    #(8	'Ant-Man and the Wasp: Quant…'	19898415)
    #(9	'John Wick: Chapter 4'	17359165)
    #(10	'Sound of Freedom'	17085161)
  )
%
set compile_env: 0
category: 'unclassified'
classmethod: Film
films

  films ifNil: [
    films := self data collect: [:row | 
      self new initialize: row; yourself.
    ].
  ].
  ^films
%
set compile_env: 0
category: 'unclassified'
classmethod: Film
withId: anInteger

  ^self films 
    detect: [:each | each id = anInteger]
    ifNone: [nil]
%
! ------------------- Instance methods for Film
set compile_env: 0
category: 'initialization'
method: Film
initialize: anArray

  id := anArray at: 1.
  title := anArray at: 2.
  views := anArray at: 3.
%
set compile_env: 0
category: 'accessors'
method: Film
id

  ^id
%
set compile_env: 0
category: 'accessors'
method: Film
title

  ^title
%
set compile_env: 0
category: 'accessors'
method: Film
views

  ^views
%
set compile_env: 0
category: 'accessors'
method: Film
views: anInteger

  views := anInteger
%
