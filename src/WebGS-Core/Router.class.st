"This is the abstract superclass for a web router.

The required methods are in the 'required' category."
Class {
	#name : 'Router',
	#superclass : 'Object',
	#instVars : [
		'routes'
	],
	#category : 'WebGS-Core'
}

{ #category : 'constructors' }
Router class >> new [

  ^self basicNew
    initialize;
    yourself
]

{ #category : 'handler' }
Router >> handle: aRequest [

	Log instance log: #'debug' string: 'Router>>handle: ' , aRequest printString.
  routes do: [:each | 
    (each handle: aRequest) ifNotNil: [:response | 
      Log instance log: #'debug' string: response printString.
      ^response
    ].
  ].
  ^nil
]

{ #category : 'initialization' }
Router >> initialize [

  routes := Array new.
]

{ #category : 'routes' }
Router >> get: aPath do: aBlock [

  routes add: (Route method: 'GET' path: aPath block: aBlock)
]

{ #category : 'routes' }
Router >> head: aPath do: aBlock [

  routes add: (Route method: 'HEAD' path: aPath block: aBlock).
]

{ #category : 'routes' }
Router >> post: aPath do: aBlock [

  routes add: (Route method: 'POST' path: aPath block: aBlock)
]

{ #category : 'routes' }
Router >> put: aPath do: aBlock [

  routes add: (Route method: 'PUT' path: aPath block: aBlock)
]
