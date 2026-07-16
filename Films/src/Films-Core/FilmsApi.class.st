"Demo app showing OpenAPI-documented routes via DocumentedRouter.

Launch with:  FilmsApi runHttp.
Then visit:   http://localhost:8888/docs"
Class {
	#name : 'FilmsApi',
	#superclass : 'Object',
	#category : 'Films-Core'
}

{ #category : 'launching' }
FilmsApi class >> runHttp [
"
	FilmsApi runHttp.
"

	^self runHttpOnPort: 8888
]

{ #category : 'launching' }
FilmsApi class >> runHttpOnPort: anInteger [
"
	FilmsApi runHttpOnPort: 8888.
"

	HttpListener new
		listenBacklog: 200;
		port: anInteger;
		server: HttpServer;
		router: self defaultRouter;
		run
]

{ #category : 'routes' }
FilmsApi class >> defaultRouter [
"
	A configured DocumentedRouter with the Films endpoints registered and the
	OpenAPI spec populated. Visit /openapi.json for the spec or /docs for Swagger UI.
"

	| router filmSchema |
	router := DocumentedRouter new.
	router spec
		title: 'Films API';
		version: '1.0.0';
		description: 'A demo of OpenAPI-documented routes served by WebGS.';
		server: 'http://localhost:8888' description: 'Local development server'.

	filmSchema := OpenApiSchema object
		property: 'id' type: 'integer';
		property: 'title' type: 'string';
		property: 'views' type: 'integer';
		required: #('id' 'title' 'views');
		yourself.
	router spec schema: 'Film' definition: filmSchema.

	router spec schema: 'Error' definition: (OpenApiSchema object
		property: 'error' type: 'string';
		required: #('error');
		yourself).

	self registerListRouteOn: router.
	self registerGetByIdRouteOn: router.

	^router
]

{ #category : 'routes' }
FilmsApi class >> registerGetByIdRouteOn: aRouter [

	aRouter
		get: '/films/:id'
		do: [:request :response :id |
			| film |
			film := Film withId: id asInteger.
			film ifNil: [
				response
					code: 404;
					content: (Dictionary new
						at: 'error' put: 'Film with id ' , id , ' not found';
						yourself) asJson;
					contentType: 'application/json; charset=UTF-8'.
			] ifNotNil: [
				response
					content: (self filmAsDictionary: film) asJson;
					contentType: 'application/json; charset=UTF-8'.
			].
		]
		operation: (OpenApiOperation new
			summary: 'Get a film by id';
			description: 'Returns a single film, or a 404 error if no film has the given id.';
			operationId: 'getFilmById';
			tag: 'films';
			response: 200 description: 'The requested film' schema: (OpenApiSchema ref: 'Film');
			response: 404 description: 'No film with that id' schema: (OpenApiSchema ref: 'Error');
			yourself).
]

{ #category : 'routes' }
FilmsApi class >> registerListRouteOn: aRouter [

	aRouter
		get: '/films'
		do: [:request :response |
			| rows |
			rows := Film films collect: [:each | self filmAsDictionary: each].
			response
				content: rows asArray asJson;
				contentType: 'application/json; charset=UTF-8'.
		]
		operation: (OpenApiOperation new
			summary: 'List all films';
			description: 'Returns the full collection of films known to the server.';
			operationId: 'listFilms';
			tag: 'films';
			response: 200
				description: 'A list of films'
				schema: (OpenApiSchema array: (OpenApiSchema ref: 'Film'));
			yourself).
]

{ #category : 'utilities' }
FilmsApi class >> filmAsDictionary: aFilm [

	^Dictionary new
		at: 'id' put: aFilm id;
		at: 'title' put: aFilm title;
		at: 'views' put: aFilm views;
		yourself
]
