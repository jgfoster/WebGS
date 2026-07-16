"Abstract superclass for object that handles socket after listener's accept"
Class {
	#name : 'AbstractHttpServer',
	#superclass : 'Object',
	#instVars : [
		'router'
	],
	#category : 'WebGS-Core'
}

{ #category : 'other' }
AbstractHttpServer class >> serveClientSocket: aSocket router: aRouter [

	self subclassResponsibility.
]

{ #category : 'Initializing' }
AbstractHttpServer >> router: aRouter [

	router := aRouter.
]
