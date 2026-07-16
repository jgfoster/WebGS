Class {
	#name : 'Film',
	#superclass : 'Object',
	#instVars : [
		'id',
		'title',
		'views'
	],
	#classInstVars : [
		'films'
	],
	#category : 'Films-Core'
}

{ #category : 'unclassified' }
Film class >> data [

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
]

{ #category : 'unclassified' }
Film class >> films [

  films ifNil: [
    films := self data collect: [:row | 
      self new initialize: row; yourself.
    ].
  ].
  ^films
]

{ #category : 'unclassified' }
Film class >> withId: anInteger [

  ^self films 
    detect: [:each | each id = anInteger]
    ifNone: [nil]
]

{ #category : 'initialization' }
Film >> initialize: anArray [

  id := anArray at: 1.
  title := anArray at: 2.
  views := anArray at: 3.
]

{ #category : 'accessors' }
Film >> id [

  ^id
]

{ #category : 'accessors' }
Film >> title [

  ^title
]

{ #category : 'accessors' }
Film >> views [

  ^views
]

{ #category : 'accessors' }
Film >> views: anInteger [

  views := anInteger
]
