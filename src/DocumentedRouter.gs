! ------------------- Remove existing behavior from DocumentedRouter
removeallmethods DocumentedRouter
removeallclassmethods DocumentedRouter
! ------------------- Class methods for DocumentedRouter
category: 'docs'
classmethod: DocumentedRouter
swaggerUiHtml

	^'<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>API Docs</title>
<link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" crossorigin></script>
<script>
window.onload = () => {
  window.ui = SwaggerUIBundle({
    url: "/openapi.json",
    dom_id: "#swagger-ui"
  });
};
</script>
</body>
</html>
'
%
! ------------------- Instance methods for DocumentedRouter
category: 'docs'
method: DocumentedRouter
installDocRoutes
	"Register the meta-endpoints that serve the spec and the Swagger UI. Called from initialize."

	super get: '/openapi.json' do: [:request :response |
		response
			content: spec asJson;
			contentType: 'application/json; charset=UTF-8';
			accessControlAllowOrigin: '*'.
	].
	super get: '/docs' do: [:request :response |
		response
			content: self class swaggerUiHtml;
			contentType: 'text/html; charset=UTF-8'.
	].
%
category: 'docs'
method: DocumentedRouter
spec
	"The OpenApiSpec this router populates. Configure it before registering routes:
		router spec title: 'Films API'; version: '1.0.0'; description: '...'."

	^spec
%
category: 'initialization'
method: DocumentedRouter
initialize

	super initialize.
	spec := OpenApiSpec new.
	self installDocRoutes.
%
category: 'routes'
method: DocumentedRouter
delete: aPath do: aBlock

	routes add: (Route method: 'DELETE' path: aPath block: aBlock)
%
category: 'routes'
method: DocumentedRouter
delete: aPath do: aBlock operation: anOperation

	self delete: aPath do: aBlock.
	spec addOperation: anOperation method: 'DELETE' path: aPath.
%
category: 'routes'
method: DocumentedRouter
get: aPath do: aBlock operation: anOperation

	super get: aPath do: aBlock.
	spec addOperation: anOperation method: 'GET' path: aPath.
%
category: 'routes'
method: DocumentedRouter
post: aPath do: aBlock operation: anOperation

	super post: aPath do: aBlock.
	spec addOperation: anOperation method: 'POST' path: aPath.
%
category: 'routes'
method: DocumentedRouter
put: aPath do: aBlock operation: anOperation

	super put: aPath do: aBlock.
	spec addOperation: anOperation method: 'PUT' path: aPath.
%
