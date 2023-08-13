! ------------------- Remove existing behavior from Html4Element
removeAllMethods Html4Element
removeAllClassMethods Html4Element
! ------------------- Class methods for Html4Element
set compile_env: 0
category: 'code generation'
classmethod: Html4Element
attributes

^'abbr	TD, TH	%Text;	#IMPLIED	 	 	abbreviation for header cell
accept-charset	FORM	%Charsets;	#IMPLIED	 	 	list of supported charsets
accept	FORM, INPUT	%ContentTypes;	#IMPLIED	 	 	list of MIME types for file upload
accesskey	A, AREA, BUTTON, INPUT, LABEL, LEGEND, TEXTAREA	%Character;	#IMPLIED	 	 	accessibility key character
action	FORM	%URI;	#REQUIRED	 	 	server-side form handler
align	CAPTION	%CAlign;	#IMPLIED	D	L	relative to table
align	APPLET, IFRAME, IMG, INPUT, OBJECT	%IAlign;	#IMPLIED	D	L	vertical or horizontal alignment
align	LEGEND	%LAlign;	#IMPLIED	D	L	relative to fieldset
align	TABLE	%TAlign;	#IMPLIED	D	L	table position relative to window
align	HR	(left | center | right)	#IMPLIED	D	L
align	DIV, H1, H2, H3, H4, H5, H6, P	(left | center | right | justify)	#IMPLIED	D	L	align, text alignment
align	COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR	(left | center | right | justify | char)	#IMPLIED
alink	BODY	%Color;	#IMPLIED	D	L	color of selected links
alt	APPLET	%Text;	#IMPLIED	D	L	short description
alt	AREA, IMG	%Text;	#REQUIRED	 	 	short description
alt	INPUT	CDATA	#IMPLIED	 	 	short description
archive	APPLET	CDATA	#IMPLIED	D	L	comma-separated archive list
archive	OBJECT	CDATA	#IMPLIED	 	 	space-separated list of URIs
axis	TD, TH	CDATA	#IMPLIED	 	 	comma-separated list of related headers
background	BODY	%URI;	#IMPLIED	D	L	texture tile for document background
bgcolor	TABLE	%Color;	#IMPLIED	D	L	background color for cells
bgcolor	TR	%Color;	#IMPLIED	D	L	background color for row
bgcolor	TD, TH	%Color;	#IMPLIED	D	L	cell background color
bgcolor	BODY	%Color;	#IMPLIED	D	L	document background color
border	TABLE	%Pixels;	#IMPLIED	 	 	controls frame width around table
border	IMG, OBJECT	%Pixels;	#IMPLIED	D	L	link border width
cellpadding	TABLE	%Length;	#IMPLIED	 	 	spacing within cells
cellspacing	TABLE	%Length;	#IMPLIED	 	 	spacing between cells
char	COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR	%Character;	#IMPLIED	 	 	alignment char, e.g. char='':''
charoff	COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR	%Length;	#IMPLIED	 	 	offset for alignment char
charset	A, LINK, SCRIPT	%Charset;	#IMPLIED	 	 	char encoding of linked resource
checked	INPUT	(checked)	#IMPLIED	 	 	for radio buttons and check boxes
cite	BLOCKQUOTE, Q	%URI;	#IMPLIED	 	 	URI for source document or msg
cite	DEL, INS	%URI;	#IMPLIED	 	 	info on reason for change
class	All elements but BASE, BASEFONT, HEAD, HTML, META, PARAM, SCRIPT, STYLE, TITLE	CDATA	#IMPLIED	 	 	space-separated list of classes
classid	OBJECT	%URI;	#IMPLIED	 	 	identifies an implementation
clear	BR	(left | all | right | none)	none	D	L	control of text flow
code	APPLET	CDATA	#IMPLIED	D	L	applet class file
codebase	OBJECT	%URI;	#IMPLIED	 	 	base URI for classid, data, archive
codebase	APPLET	%URI;	#IMPLIED	D	L	optional base URI for applet
codetype	OBJECT	%ContentType;	#IMPLIED	 	 	content type for code
color	BASEFONT, FONT	%Color;	#IMPLIED	D	L	text color
cols	FRAMESET	%MultiLengths;	#IMPLIED	 	F	list of lengths, default: 100% (1 col)
cols	TEXTAREA	NUMBER	#REQUIRED
colspan	TD, TH	NUMBER	1	 	 	number of cols spanned by cell
compact	DIR, DL, MENU, OL, UL	(compact)	#IMPLIED	D	L	reduced interitem spacing
content	META	CDATA	#REQUIRED	 	 	associated information
coords	AREA	%Coords;	#IMPLIED	 	 	comma-separated list of lengths
coords	A	%Coords;	#IMPLIED	 	 	for use with client-side image maps
data	OBJECT	%URI;	#IMPLIED	 	 	reference to object''s data
datetime	DEL, INS	%Datetime;	#IMPLIED	 	 	date and time of change
declare	OBJECT	(declare)	#IMPLIED	 	 	declare but don''t instantiate flag
defer	SCRIPT	(defer)	#IMPLIED	 	 	UA may defer execution of script
dir	All elements but APPLET, BASE, BASEFONT, BDO, BR, FRAME, FRAMESET, IFRAME, PARAM, SCRIPT	(ltr | rtl)	#IMPLIED	 	 	direction for weak/neutral text
dir	BDO	(ltr | rtl)	#REQUIRED	 	 	directionality
disabled	BUTTON, INPUT, OPTGROUP, OPTION, SELECT, TEXTAREA	(disabled)	#IMPLIED	 	 	unavailable in this context
enctype	FORM	%ContentType;	""application/x-www- form-urlencoded""
face	BASEFONT, FONT	CDATA	#IMPLIED	D	L	comma-separated list of font names
for	LABEL	IDREF	#IMPLIED	 	 	matches field ID value
frame	TABLE	%TFrame;	#IMPLIED	 	 	which parts of frame to render
frameborder	FRAME, IFRAME	(1 | 0)	1	 	F	request frame borders?
headers	TD, TH	IDREFS	#IMPLIED	 	 	list of id''s for header cells
height	IFRAME	%Length;	#IMPLIED	 	L	frame height
height	TD, TH	%Length;	#IMPLIED	D	L	height for cell
height	IMG, OBJECT	%Length;	#IMPLIED	 	 	override height
height	APPLET	%Length;	#REQUIRED	D	L	initial height
href	A, AREA, LINK	%URI;	#IMPLIED	 	 	URI for linked resource
href	BASE	%URI;	#IMPLIED	 	 	URI that acts as base URI
hreflang	A, LINK	%LanguageCode;	#IMPLIED	 	 	language code
hspace	APPLET, IMG, OBJECT	%Pixels;	#IMPLIED	D	L	horizontal gutter
http-equiv	META	NAME	#IMPLIED	 	 	HTTP response header name
id	All elements but BASE, HEAD, HTML, META, SCRIPT, STYLE, TITLE	ID	#IMPLIED	 	 	document-wide unique id
ismap	IMG, INPUT	(ismap)	#IMPLIED	 	 	use server-side image map
label	OPTION	%Text;	#IMPLIED	 	 	for use in hierarchical menus
label	OPTGROUP	%Text;	#REQUIRED	 	 	for use in hierarchical menus
lang	All elements but APPLET, BASE, BASEFONT, BR, FRAME, FRAMESET, IFRAME, PARAM, SCRIPT	%LanguageCode;	#IMPLIED	 	 	language code
language	SCRIPT	CDATA	#IMPLIED	D	L	predefined script language name
link	BODY	%Color;	#IMPLIED	D	L	color of links
longdesc	IMG	%URI;	#IMPLIED	 	 	link to long description (complements alt)
longdesc	FRAME, IFRAME	%URI;	#IMPLIED	 	F	link to long description (complements title)
marginheight	FRAME, IFRAME	%Pixels;	#IMPLIED	 	F	margin height in pixels
marginwidth	FRAME, IFRAME	%Pixels;	#IMPLIED	 	F	margin widths in pixels
maxlength	INPUT	NUMBER	#IMPLIED	 	 	max chars for text fields
media	STYLE	%MediaDesc;	#IMPLIED	 	 	designed for use with these media
media	LINK	%MediaDesc;	#IMPLIED	 	 	for rendering on these media
method	FORM	(GET | POST)	GET	 	 	HTTP method used to submit the form
multiple	SELECT	(multiple)	#IMPLIED	 	 	default is single selection
name	BUTTON, TEXTAREA	CDATA	#IMPLIED
name	APPLET	CDATA	#IMPLIED	D	L	allows applets to find each other
name	SELECT	CDATA	#IMPLIED	 	 	field name
name	FORM	CDATA	#IMPLIED	 	 	name of form for scripting
name	FRAME, IFRAME	CDATA	#IMPLIED	 	F	name of frame for targetting
name	IMG	CDATA	#IMPLIED	 	 	name of image for scripting
name	A	CDATA	#IMPLIED	 	 	named link end
name	INPUT, OBJECT	CDATA	#IMPLIED	 	 	submit as part of form
name	MAP	CDATA	#REQUIRED	 	 	for reference by usemap
name	PARAM	CDATA	#REQUIRED	 	 	property name
name	META	NAME	#IMPLIED	 	 	metainformation name
nohref	AREA	(nohref)	#IMPLIED	 	 	this region has no action
noresize	FRAME	(noresize)	#IMPLIED	 	F	allow users to resize frames?
noshade	HR	(noshade)	#IMPLIED	D	L
nowrap	TD, TH	(nowrap)	#IMPLIED	D	L	suppress word wrap
object	APPLET	CDATA	#IMPLIED	D	L	serialized applet file
onblur	A, AREA, BUTTON, INPUT, LABEL, SELECT, TEXTAREA	%Script;	#IMPLIED	 	 	the element lost the focus
onchange	INPUT, SELECT, TEXTAREA	%Script;	#IMPLIED	 	 	the element value was changed
onclick	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a pointer button was clicked
ondblclick	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a pointer button was double clicked
onfocus	A, AREA, BUTTON, INPUT, LABEL, SELECT, TEXTAREA	%Script;	#IMPLIED	 	 	the element got the focus
onkeydown	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a key was pressed down
onkeypress	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a key was pressed and released
onkeyup	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a key was released
onload	FRAMESET	%Script;	#IMPLIED	 	F	all the frames have been loaded
onload	BODY	%Script;	#IMPLIED	 	 	the document has been loaded
onmousedown	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a pointer button was pressed down
onmousemove	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a pointer was moved within
onmouseout	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a pointer was moved away
onmouseover	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a pointer was moved onto
onmouseup	All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE	%Script;	#IMPLIED	 	 	a pointer button was released
onreset	FORM	%Script;	#IMPLIED	 	 	the form was reset
onselect	INPUT, TEXTAREA	%Script;	#IMPLIED	 	 	some text was selected
onsubmit	FORM	%Script;	#IMPLIED	 	 	the form was submitted
onunload	FRAMESET	%Script;	#IMPLIED	 	F	all the frames have been removed
onunload	BODY	%Script;	#IMPLIED	 	 	the document has been removed
profile	HEAD	%URI;	#IMPLIED	 	 	named dictionary of meta info
prompt	ISINDEX	%Text;	#IMPLIED	D	L	prompt message
readonly	TEXTAREA	(readonly)	#IMPLIED
readonly	INPUT	(readonly)	#IMPLIED	 	 	for text and passwd
rel	A, LINK	%LinkTypes;	#IMPLIED	 	 	forward link types
rev	A, LINK	%LinkTypes;	#IMPLIED	 	 	reverse link types
rows	FRAMESET	%MultiLengths;	#IMPLIED	 	F	list of lengths, default: 100% (1 row)
rows	TEXTAREA	NUMBER	#REQUIRED
rowspan	TD, TH	NUMBER	1	 	 	number of rows spanned by cell
rules	TABLE	%TRules;	#IMPLIED	 	 	rulings between rows and cols
scheme	META	CDATA	#IMPLIED	 	 	select form of content
scope	TD, TH	%Scope;	#IMPLIED	 	 	scope covered by header cells
scrolling	FRAME, IFRAME	(yes | no | auto)	auto	 	F	scrollbar or none
selected	OPTION	(selected)	#IMPLIED
shape	AREA	%Shape;	rect	 	 	controls interpretation of coords
shape	A	%Shape;	rect	 	 	for use with client-side image maps
size	HR	%Pixels;	#IMPLIED	D	L
size	FONT	CDATA	#IMPLIED	D	L	[+|-]nn e.g. size=""+1"", size=""4""
size	INPUT	CDATA	#IMPLIED	 	 	specific to each type of field
size	BASEFONT	CDATA	#REQUIRED	D	L	base font size for FONT elements
size	SELECT	NUMBER	#IMPLIED	 	 	rows visible
span	COL	NUMBER	1	 	 	COL attributes affect N columns
span	COLGROUP	NUMBER	1	 	 	default number of columns in group
src	SCRIPT	%URI;	#IMPLIED	 	 	URI for an external script
src	INPUT	%URI;	#IMPLIED	 	 	for fields with images
src	FRAME, IFRAME	%URI;	#IMPLIED	 	F	source of frame content
src	IMG	%URI;	#REQUIRED	 	 	URI of image to embed
standby	OBJECT	%Text;	#IMPLIED	 	 	message to show while loading
start	OL	NUMBER	#IMPLIED	D	L	starting sequence number
style	All elements but BASE, BASEFONT, HEAD, HTML, META, PARAM, SCRIPT, STYLE, TITLE	%StyleSheet;	#IMPLIED	 	 	associated style info
summary	TABLE	%Text;	#IMPLIED	 	 	purpose/structure for speech output
tabindex	A, AREA, BUTTON, INPUT, OBJECT, SELECT, TEXTAREA	NUMBER	#IMPLIED	 	 	position in tabbing order
target	A, AREA, BASE, FORM, LINK	%FrameTarget;	#IMPLIED	 	L	render in this frame
text	BODY	%Color;	#IMPLIED	D	L	document text color
title	All elements but BASE, BASEFONT, HEAD, HTML, META, PARAM, SCRIPT, TITLE	%Text;	#IMPLIED	 	 	advisory title
type	A, LINK	%ContentType;	#IMPLIED	 	 	advisory content type
type	OBJECT	%ContentType;	#IMPLIED	 	 	content type for data
type	PARAM	%ContentType;	#IMPLIED	 	 	content type for value when valuetype=ref
type	SCRIPT	%ContentType;	#REQUIRED	 	 	content type of script language
type	STYLE	%ContentType;	#REQUIRED	 	 	content type of style language
type	INPUT	%InputType;	TEXT	 	 	what kind of widget is needed
type	LI	%LIStyle;	#IMPLIED	D	L	list item style
type	OL	%OLStyle;	#IMPLIED	D	L	numbering style
type	UL	%ULStyle;	#IMPLIED	D	L	bullet style
type	BUTTON	(button | submit | reset)	submit	 	 	for use as form button
usemap	IMG, INPUT, OBJECT	%URI;	#IMPLIED	 	 	use client-side image map
valign	COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR	(top | middle | bottom | baseline)	#IMPLIED	 	 	vertical alignment in cells
value	INPUT	CDATA	#IMPLIED	 	 	Specify for radio buttons and checkboxes
value	OPTION	CDATA	#IMPLIED	 	 	defaults to element content
value	PARAM	CDATA	#IMPLIED	 	 	property value
value	BUTTON	CDATA	#IMPLIED	 	 	sent to server when submitted
value	LI	NUMBER	#IMPLIED	D	L	reset sequence number
valuetype	PARAM	(DATA | REF | OBJECT)	DATA	 	 	How to interpret value
version	HTML	CDATA	%HTML.Version;	D	L	Constant
vlink	BODY	%Color;	#IMPLIED	D	L	color of visited links
vspace	APPLET, IMG, OBJECT	%Pixels;	#IMPLIED	D	L	vertical gutter
width	HR	%Length;	#IMPLIED	D	L
width	IFRAME	%Length;	#IMPLIED	 	L	frame width
width	IMG, OBJECT	%Length;	#IMPLIED	 	 	override width
width	TABLE	%Length;	#IMPLIED	 	 	table width
width	TD, TH	%Length;	#IMPLIED	D	L	width for cell
width	APPLET	%Length;	#REQUIRED	D	L	initial width
width	COL	%MultiLength;	#IMPLIED	 	 	column width specification
width	COLGROUP	%MultiLength;	#IMPLIED	 	 	default width for enclosed COLs
width	PRE	NUMBER	#IMPLIED	D	L	'
%
category: 'code generation'
classmethod: Html4Element
buildAttribute: anArray

	| index key lf selector source tab types |
	key := anArray first first.
	(#('content') includes: key) ifTrue: [^self].		"hand-crafted methods"
	lf := Character lf asString.
	tab := Character tab asString.
	index := key indexOf: $-.
	selector := 0 == index
		ifTrue: [key]
		ifFalse: [(key copyFrom: 1 to: index - 1) , (key copyFrom: index + 1 to: index + 1) asUppercase , (key copyFrom: index + 2 to: key size)].
	(self duplicateSelectors includes: key) ifTrue: [selector := selector , 'Attribute'].
	source := selector , ': anObject' , lf , tab , '"'.
	anArray do: [:each |
		source add: (each at: 2) , lf , tab , tab , (each at: 3) , tab , (each at: 4) , tab ,
			((each at: 5) = 'D' ifTrue: ['deprecated'] ifFalse: ['']) , tab ,
			((each at: 6) = 'L' ifTrue: ['Loose DTD'] ifFalse: ['']) , tab ,
			((each at: 6) = 'F' ifTrue: ['Frameset DTD'] ifFalse: ['']) , tab , lf , tab , tab ,
			(each at: 7) , lf , tab.
	].
	source add: '(generated)"' , lf , lf ,
		tab , 'anObject' , lf ,
		tab , tab , 'ifNil: [attributes removeKey: ''' , key , ''' otherwise: nil]' , lf ,
		tab , tab , 'ifNotNil: [attributes at: ''' , key , ''' put: '.
	types := (anArray collect: [:each | each at: 3]) asSet.
	source add: ((types size == 1 and: [types any = ('(' , key , ')')])
		ifFalse: ['anObject asString']
		ifTrue: ['(anObject ifTrue: [''' , key , '''] ifFalse: [nil])']).
	source add: '].' , lf.
	[
		self
			compileMethod: source
			dictionaries: SymbolList new
			category: 'attributes'
			environmentId: 0.
	] on: CompileError do: [:ex |
		ex halt.
	].
%
category: 'code generation'
classmethod: Html4Element
buildAttributes

	| dict list |
	list := (self attributes subStrings: Character lf) collect: [:each | each subStrings: Character tab].
	dict := Dictionary new.
	list do: [:each |
		(dict at: each first ifAbsentPut: [Array new]) add: each.
	].
	dict keys asSortedCollection do: [:each |
		self buildAttribute: (dict at: each).
	].
%
category: 'code generation'
classmethod: Html4Element
buildDuplicateSelectors
"
	Html4Element buildDuplicateSelectors.
"
	| lf source symbolList tab |
	lf := Character lf asString.
	symbolList := GsCurrentSession currentSession symbolList.
	tab := Character tab asString.
	self duplicateSelectors do: [:each |
		source := each , ': anObject' , lf , tab , '"Some attribute names overlap with element names (generated method)."' , lf , lf ,
			tab , '^(anObject isKindOf: ExecBlock)' , lf ,
			tab , tab , 'ifTrue: [self ' , each , 'Element: anObject]' , lf ,
			tab , tab , 'ifFalse: [self ' , each , 'Attribute: anObject].' , lf.
		[
			self
				compileMethod: source
				dictionaries: symbolList
				category: 'either'
				environmentId: 0.
		] on: CompileError do: [:ex |
			ex halt.
		].
	].
%
category: 'code generation'
classmethod: Html4Element
buildElement: aString

	| lf list source tab tag |
	lf := Character lf asString.
	list := aString subStrings: Character tab.
	tab := Character tab asString.
	tag := list first asLowercase.
	(#('body' 'head' 'html') includes: tag) ifTrue: [^self].		"hand-coded methods"
	source := tag , lf , tab , '"' , (list at: 7).
	(list at: 2) = 'O' ifTrue: [source add: lf , tab , 'start tag is optional'].
	(list at: 3) = 'O' ifTrue: [source add: lf , tab , 'end tag is optional'].
	(list at: 4) = 'E' ifTrue: [source add: lf , tab , 'element is empty'].
	(list at: 5) = 'D' ifTrue: [source add: lf , tab , 'element is deprecated'].
	(list at: 6) = 'L' ifTrue: [source add: lf , tab , 'Loose DTD'].
	(list at: 6) = 'F' ifTrue: [source add: lf , tab , 'Frameset DTD'].
	source add: lf , tab , '(generated method)"' , lf , lf , tab , '^self newChildWithTag: ''' , tag , '''.' , lf.
	[
		self
			compileMethod: source
			dictionaries: SymbolList new
			category: 'elements'
			environmentId: 0.
	] on: CompileError do: [:ex |
		ex halt.
	].

	source := tag , ((self duplicateSelectors includes: tag) ifTrue: ['Element'] ifFalse: ['']).
	source add: ': aBlock' , lf , lf , tab , '^aBlock value: self ' , tag , '.' , lf.
	[
		self
			compileMethod: source
			dictionaries: GsCurrentSession currentSession symbolList
			category: 'elements'
			environmentId: 0.
	] on: CompileError do: [:ex |
		ex halt.
	].
%
category: 'code generation'
classmethod: Html4Element
buildElements

	(self elements subStrings: Character lf) do: [:each |
		self buildElement: each.
	].
%
category: 'code generation'
classmethod: Html4Element
buildMethods
"
	Html4Element buildMethods.
"
	self buildElements; buildAttributes; buildDuplicateSelectors.
%
category: 'code generation'
classmethod: Html4Element
duplicateSelectors
"
	Html4Element duplicateSelectors.
	( 'abbr', 'cite', 'code', 'dir', 'frame', 'label', 'link', 'object', 'span', 'style', 'title')
"
	| duplicates tags |
	duplicates := Set new.
	tags := (self elements subStrings: Character lf) collect: [:each | (each subStrings: Character tab) first asLowercase].
	(self attributes subStrings: Character lf) do: [:each |
		| attribute |
		attribute := (each subStrings: Character tab) first.
		(tags includes: attribute) ifTrue: [duplicates add: attribute].
	].
	^duplicates asSortedCollection.
%
category: 'code generation'
classmethod: Html4Element
elements

^'A	 	 	 	 	 	anchor
ABBR	 	 	 	 	 	abbreviated form (e.g., WWW, HTTP, etc.)
ACRONYM
ADDRESS	 	 	 	 	 	information on author
APPLET	 	 	 	D	L	Java applet
AREA	 	F	E	 	 	client-side image map area
B	 	 	 	 	 	bold text style
BASE	 	F	E	 	 	document base URI
BASEFONT	 	F	E	D	L	base font size
BDO	 	 	 	 	 	I18N BiDi over-ride
BIG	 	 	 	 	 	large text style
BLOCKQUOTE	 	 	 	 	 	long quotation
BODY	O	O	 	 	 	document body
BR	 	F	E	 	 	forced line break
BUTTON	 	 	 	 	 	push button
CAPTION	 	 	 	 	 	table caption
CENTER	 	 	 	D	L	shorthand for DIV align=center
CITE	 	 	 	 	 	citation
CODE	 	 	 	 	 	computer code fragment
COL	 	F	E	 	 	table column
COLGROUP	 	O	 	 	 	table column group
DD	 	O	 	 	 	definition description
DEL	 	 	 	 	 	deleted text
DFN	 	 	 	 	 	instance definition
DIR	 	 	 	D	L	directory list
DIV	 	 	 	 	 	generic language/style container
DL	 	 	 	 	 	definition list
DT	 	O	 	 	 	definition term
EM	 	 	 	 	 	emphasis
FIELDSET	 	 	 	 	 	form control group
FONT	 	 	 	D	L	local change to font
FORM	 	 	 	 	 	interactive form
FRAME	 	F	E	 	F	subwindow
FRAMESET	 	 	 	 	F	window subdivision
H1	 	 	 	 	 	heading
H2	 	 	 	 	 	heading
H3	 	 	 	 	 	heading
H4	 	 	 	 	 	heading
H5	 	 	 	 	 	heading
H6	 	 	 	 	 	heading
HEAD	O	O	 	 	 	document head
HR	 	F	E	 	 	horizontal rule
HTML	O	O	 	 	 	document root element
I	 	 	 	 	 	italic text style
IFRAME	 	 	 	 	L	inline subwindow
IMG	 	F	E	 	 	Embedded image
INPUT	 	F	E	 	 	form control
INS	 	 	 	 	 	inserted text
ISINDEX	 	F	E	D	L	single line prompt
KBD	 	 	 	 	 	text to be entered by the user
LABEL	 	 	 	 	 	form field label text
LEGEND	 	 	 	 	 	fieldset legend
LI	 	O	 	 	 	list item
LINK	 	F	E	 	 	a media-independent link
MAP	 	 	 	 	 	client-side image map
MENU	 	 	 	D	L	menu list
META	 	F	E	 	 	generic metainformation
NOFRAMES	 	 	 	 	F	alternate content container for non frame-based rendering
NOSCRIPT	 	 	 	 	 	alternate content container for non script-based rendering
OBJECT	 	 	 	 	 	generic embedded object
OL	 	 	 	 	 	ordered list
OPTGROUP	 	 	 	 	 	option group
OPTION	 	O	 	 	 	selectable choice
P	 	O	 	 	 	paragraph
PARAM	 	F	E	 	 	named property value
PRE	 	 	 	 	 	preformatted text
Q	 	 	 	 	 	short inline quotation
S	 	 	 	D	L	strike-through text style
SAMP	 	 	 	 	 	sample program output, scripts, etc.
SCRIPT	 	 	 	 	 	script statements
SELECT	 	 	 	 	 	option selector
SMALL	 	 	 	 	 	small text style
SPAN	 	 	 	 	 	generic language/style container
STRIKE	 	 	 	D	L	strike-through text
STRONG	 	 	 	 	 	strong emphasis
STYLE	 	 	 	 	 	style info
SUB	 	 	 	 	 	subscript
SUP	 	 	 	 	 	superscript
TABLE
TBODY	O	O	 	 	 	table body
TD	 	O	 	 	 	table data cell
TEXTAREA	 	 	 	 	 	multi-line text field
TFOOT	 	O	 	 	 	table footer
TH	 	O	 	 	 	table header cell
THEAD	 	O	 	 	 	table header
TITLE	 	 	 	 	 	document title
TR	 	O	 	 	 	table row
TT	 	 	 	 	 	teletype or monospaced text style
U	 	 	 	D	L	underlined text style
UL	 	 	 	 	 	unordered list
VAR	 	 	 	 	 	instance of a variable or program argument'
%
set compile_env: 0
category: 'other'
classmethod: Html4Element
comment

^'This class represents an HTML Element. To learn more see books about HTML or on-line resources, including the following:
	http://en.wikipedia.org/wiki/HTML_element
	http://www.w3schools.com/html/html_elements.asp

Although you can get a new instance using the class-side #''new'' method, the typical approach is to send the #''html'' message to get a new HTML document (an element with the tag ''html''). This top-level element is initialized with two child elements, a <head> and a <body>, accessed with the #''head'' and #''body'' messages respectively.

You can set attributes using messages based on the attribute name (e.g., the #''class:'' message will set the element''s class attribute).

You can create additional elements inside the head and/or body by sending messages based on the child element''s tag (e.g., the #''div'' message will create a <div> element). The basic way of creating a child element is based on a unary selector that returns the element. For example, the following creates a <b> element and add to it some text:
	HtmlElement html body bold text: ''Name''.

Most child elements can also be created with a keyword selector that takes a single argument, a one-argument block that receives the new element as an argument. This is useful for setting additional attributes or defining children of the new element (e.g., a <select> element typically has <option> elements as its children). For example:
	HtmlElement html body bold: [:bold | bold text: ''Name''].

Several of the elements also have multi-argument keyword selectors that handle common use-cases. For example:
	HtmlElement html body boldWithText: ''Name''.

The advantage of the last two examples is that they allow cascades to send additional messages to the <body> element while the first example would send additional messages to the <b> element.

Sending #''printString'' to an element shows you how it will be rendered.'.
%
category: 'other'
classmethod: Html4Element
html

	^self basicNew
		initializeAsHtml;
		yourself.
%
category: 'other'
classmethod: Html4Element
new

	self error: 'Use #''html'' to get a new instance'.
%
category: 'other'
classmethod: Html4Element
withTag: aString

	^self basicNew
		initializeWithTag: aString;
		yourself.
%
! ------------------- Instance methods for Html4Element
set compile_env: 0
category: 'attributes'
method: Html4Element
abbrAttribute: anObject
	"TD, TH
		%Text;	#IMPLIED
		abbreviation for header cell
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'abbr' otherwise: nil]
		ifNotNil: [attributes at: 'abbr' put: anObject asString].
%
category: 'attributes'
method: Html4Element
accept: anObject
	"FORM, INPUT
		%ContentTypes;	#IMPLIED
		list of MIME types for file upload
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'accept' otherwise: nil]
		ifNotNil: [attributes at: 'accept' put: anObject asString].
%
category: 'attributes'
method: Html4Element
acceptCharset: anObject
	"FORM
		%Charsets;	#IMPLIED
		list of supported charsets
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'accept-charset' otherwise: nil]
		ifNotNil: [attributes at: 'accept-charset' put: anObject asString].
%
category: 'attributes'
method: Html4Element
accesskey: anObject
	"A, AREA, BUTTON, INPUT, LABEL, LEGEND, TEXTAREA
		%Character;	#IMPLIED
		accessibility key character
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'accesskey' otherwise: nil]
		ifNotNil: [attributes at: 'accesskey' put: anObject asString].
%
category: 'attributes'
method: Html4Element
action: anObject
	"FORM
		%URI;	#REQUIRED
		server-side form handler
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'action' otherwise: nil]
		ifNotNil: [attributes at: 'action' put: anObject asString].
%
category: 'attributes'
method: Html4Element
align: anObject
	"CAPTION
		%CAlign;	#IMPLIED	deprecated	Loose DTD
		relative to table
	APPLET, IFRAME, IMG, INPUT, OBJECT
		%IAlign;	#IMPLIED	deprecated	Loose DTD
		vertical or horizontal alignment
	LEGEND
		%LAlign;	#IMPLIED	deprecated	Loose DTD
		relative to fieldset
	TABLE
		%TAlign;	#IMPLIED	deprecated	Loose DTD
		table position relative to window
	HR
		(left | center | right)	#IMPLIED	deprecated	Loose DTD

	DIV, H1, H2, H3, H4, H5, H6, P
		(left | center | right | justify)	#IMPLIED	deprecated	Loose DTD
		align, text alignment
	COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR
		(left | center | right | justify | char)	#IMPLIED

	(generated)"

	anObject
		ifNil: [attributes removeKey: 'align' otherwise: nil]
		ifNotNil: [attributes at: 'align' put: anObject asString].
%
category: 'attributes'
method: Html4Element
alink: anObject
	"BODY
		%Color;	#IMPLIED	deprecated	Loose DTD
		color of selected links
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'alink' otherwise: nil]
		ifNotNil: [attributes at: 'alink' put: anObject asString].
%
category: 'attributes'
method: Html4Element
alt: anObject
	"APPLET
		%Text;	#IMPLIED	deprecated	Loose DTD
		short description
	AREA, IMG
		%Text;	#REQUIRED
		short description
	INPUT
		CDATA	#IMPLIED
		short description
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'alt' otherwise: nil]
		ifNotNil: [attributes at: 'alt' put: anObject asString].
%
category: 'attributes'
method: Html4Element
archive: anObject
	"APPLET
		CDATA	#IMPLIED	deprecated	Loose DTD
		comma-separated archive list
	OBJECT
		CDATA	#IMPLIED
		space-separated list of URIs
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'archive' otherwise: nil]
		ifNotNil: [attributes at: 'archive' put: anObject asString].
%
category: 'attributes'
method: Html4Element
axis: anObject
	"TD, TH
		CDATA	#IMPLIED
		comma-separated list of related headers
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'axis' otherwise: nil]
		ifNotNil: [attributes at: 'axis' put: anObject asString].
%
category: 'attributes'
method: Html4Element
background: anObject
	"BODY
		%URI;	#IMPLIED	deprecated	Loose DTD
		texture tile for document background
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'background' otherwise: nil]
		ifNotNil: [attributes at: 'background' put: anObject asString].
%
category: 'attributes'
method: Html4Element
bgcolor: anObject
	"TABLE
		%Color;	#IMPLIED	deprecated	Loose DTD
		background color for cells
	TR
		%Color;	#IMPLIED	deprecated	Loose DTD
		background color for row
	TD, TH
		%Color;	#IMPLIED	deprecated	Loose DTD
		cell background color
	BODY
		%Color;	#IMPLIED	deprecated	Loose DTD
		document background color
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'bgcolor' otherwise: nil]
		ifNotNil: [attributes at: 'bgcolor' put: anObject asString].
%
category: 'attributes'
method: Html4Element
border: anObject
	"TABLE
		%Pixels;	#IMPLIED
		controls frame width around table
	IMG, OBJECT
		%Pixels;	#IMPLIED	deprecated	Loose DTD
		link border width
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'border' otherwise: nil]
		ifNotNil: [attributes at: 'border' put: anObject asString].
%
category: 'attributes'
method: Html4Element
cellpadding: anObject
	"TABLE
		%Length;	#IMPLIED
		spacing within cells
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'cellpadding' otherwise: nil]
		ifNotNil: [attributes at: 'cellpadding' put: anObject asString].
%
category: 'attributes'
method: Html4Element
cellspacing: anObject
	"TABLE
		%Length;	#IMPLIED
		spacing between cells
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'cellspacing' otherwise: nil]
		ifNotNil: [attributes at: 'cellspacing' put: anObject asString].
%
category: 'attributes'
method: Html4Element
char: anObject
	"COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR
		%Character;	#IMPLIED
		alignment char, e.g. char=':'
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'char' otherwise: nil]
		ifNotNil: [attributes at: 'char' put: anObject asString].
%
category: 'attributes'
method: Html4Element
charoff: anObject
	"COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR
		%Length;	#IMPLIED
		offset for alignment char
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'charoff' otherwise: nil]
		ifNotNil: [attributes at: 'charoff' put: anObject asString].
%
category: 'attributes'
method: Html4Element
charset: anObject
	"A, LINK, SCRIPT
		%Charset;	#IMPLIED
		char encoding of linked resource
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'charset' otherwise: nil]
		ifNotNil: [attributes at: 'charset' put: anObject asString].
%
category: 'attributes'
method: Html4Element
checked: anObject
	"INPUT
		(checked)	#IMPLIED
		for radio buttons and check boxes
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'checked' otherwise: nil]
		ifNotNil: [attributes at: 'checked' put: (anObject ifTrue: ['checked'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
citeAttribute: anObject
	"BLOCKQUOTE, Q
		%URI;	#IMPLIED
		URI for source document or msg
	DEL, INS
		%URI;	#IMPLIED
		info on reason for change
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'cite' otherwise: nil]
		ifNotNil: [attributes at: 'cite' put: anObject asString].
%
category: 'attributes'
method: Html4Element
class: anObject
	"All elements but BASE, BASEFONT, HEAD, HTML, META, PARAM, SCRIPT, STYLE, TITLE
		CDATA	#IMPLIED
		space-separated list of classes
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'class' otherwise: nil]
		ifNotNil: [attributes at: 'class' put: anObject asString].
%
category: 'attributes'
method: Html4Element
classid: anObject
	"OBJECT
		%URI;	#IMPLIED
		identifies an implementation
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'classid' otherwise: nil]
		ifNotNil: [attributes at: 'classid' put: anObject asString].
%
category: 'attributes'
method: Html4Element
clear: anObject
	"BR
		(left | all | right | none)	none	deprecated	Loose DTD
		control of text flow
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'clear' otherwise: nil]
		ifNotNil: [attributes at: 'clear' put: anObject asString].
%
category: 'attributes'
method: Html4Element
codeAttribute: anObject
	"APPLET
		CDATA	#IMPLIED	deprecated	Loose DTD
		applet class file
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'code' otherwise: nil]
		ifNotNil: [attributes at: 'code' put: anObject asString].
%
category: 'attributes'
method: Html4Element
codebase: anObject
	"OBJECT
		%URI;	#IMPLIED
		base URI for classid, data, archive
	APPLET
		%URI;	#IMPLIED	deprecated	Loose DTD
		optional base URI for applet
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'codebase' otherwise: nil]
		ifNotNil: [attributes at: 'codebase' put: anObject asString].
%
category: 'attributes'
method: Html4Element
codetype: anObject
	"OBJECT
		%ContentType;	#IMPLIED
		content type for code
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'codetype' otherwise: nil]
		ifNotNil: [attributes at: 'codetype' put: anObject asString].
%
category: 'attributes'
method: Html4Element
color: anObject
	"BASEFONT, FONT
		%Color;	#IMPLIED	deprecated	Loose DTD
		text color
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'color' otherwise: nil]
		ifNotNil: [attributes at: 'color' put: anObject asString].
%
category: 'attributes'
method: Html4Element
cols: anObject
	"FRAMESET
		%MultiLengths;	#IMPLIED			Frameset DTD
		list of lengths, default: 100% (1 col)
	TEXTAREA
		NUMBER	#REQUIRED

	(generated)"

	anObject
		ifNil: [attributes removeKey: 'cols' otherwise: nil]
		ifNotNil: [attributes at: 'cols' put: anObject asString].
%
category: 'attributes'
method: Html4Element
colspan: anObject
	"TD, TH
		NUMBER	1
		number of cols spanned by cell
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'colspan' otherwise: nil]
		ifNotNil: [attributes at: 'colspan' put: anObject asString].
%
category: 'attributes'
method: Html4Element
compact: anObject
	"DIR, DL, MENU, OL, UL
		(compact)	#IMPLIED	deprecated	Loose DTD
		reduced interitem spacing
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'compact' otherwise: nil]
		ifNotNil: [attributes at: 'compact' put: (anObject ifTrue: ['compact'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
coords: anObject
	"AREA
		%Coords;	#IMPLIED
		comma-separated list of lengths
	A
		%Coords;	#IMPLIED
		for use with client-side image maps
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'coords' otherwise: nil]
		ifNotNil: [attributes at: 'coords' put: anObject asString].
%
category: 'attributes'
method: Html4Element
data: anObject
	"OBJECT
		%URI;	#IMPLIED
		reference to object's data
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'data' otherwise: nil]
		ifNotNil: [attributes at: 'data' put: anObject asString].
%
category: 'attributes'
method: Html4Element
datetime: anObject
	"DEL, INS
		%Datetime;	#IMPLIED
		date and time of change
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'datetime' otherwise: nil]
		ifNotNil: [attributes at: 'datetime' put: anObject asString].
%
category: 'attributes'
method: Html4Element
declare: anObject
	"OBJECT
		(declare)	#IMPLIED
		declare but don't instantiate flag
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'declare' otherwise: nil]
		ifNotNil: [attributes at: 'declare' put: (anObject ifTrue: ['declare'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
defer: anObject
	"SCRIPT
		(defer)	#IMPLIED
		UA may defer execution of script
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'defer' otherwise: nil]
		ifNotNil: [attributes at: 'defer' put: (anObject ifTrue: ['defer'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
dirAttribute: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FRAME, FRAMESET, IFRAME, PARAM, SCRIPT
		(ltr | rtl)	#IMPLIED
		direction for weak/neutral text
	BDO
		(ltr | rtl)	#REQUIRED
		directionality
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'dir' otherwise: nil]
		ifNotNil: [attributes at: 'dir' put: anObject asString].
%
category: 'attributes'
method: Html4Element
disabled: anObject
	"BUTTON, INPUT, OPTGROUP, OPTION, SELECT, TEXTAREA
		(disabled)	#IMPLIED
		unavailable in this context
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'disabled' otherwise: nil]
		ifNotNil: [attributes at: 'disabled' put: (anObject ifTrue: ['disabled'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
enctype: anObject
	"FORM
		%ContentType;	""application/x-www- form-urlencoded""

	(generated)"

	anObject
		ifNil: [attributes removeKey: 'enctype' otherwise: nil]
		ifNotNil: [attributes at: 'enctype' put: anObject asString].
%
category: 'attributes'
method: Html4Element
face: anObject
	"BASEFONT, FONT
		CDATA	#IMPLIED	deprecated	Loose DTD
		comma-separated list of font names
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'face' otherwise: nil]
		ifNotNil: [attributes at: 'face' put: anObject asString].
%
category: 'attributes'
method: Html4Element
for: anObject
	"LABEL
		IDREF	#IMPLIED
		matches field ID value
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'for' otherwise: nil]
		ifNotNil: [attributes at: 'for' put: anObject asString].
%
category: 'attributes'
method: Html4Element
frameAttribute: anObject
	"TABLE
		%TFrame;	#IMPLIED
		which parts of frame to render
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'frame' otherwise: nil]
		ifNotNil: [attributes at: 'frame' put: anObject asString].
%
category: 'attributes'
method: Html4Element
frameborder: anObject
	"FRAME, IFRAME
		(1 | 0)	1			Frameset DTD
		request frame borders?
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'frameborder' otherwise: nil]
		ifNotNil: [attributes at: 'frameborder' put: anObject asString].
%
category: 'attributes'
method: Html4Element
headers: anObject
	"TD, TH
		IDREFS	#IMPLIED
		list of id's for header cells
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'headers' otherwise: nil]
		ifNotNil: [attributes at: 'headers' put: anObject asString].
%
category: 'attributes'
method: Html4Element
height: anObject
	"IFRAME
		%Length;	#IMPLIED		Loose DTD
		frame height
	TD, TH
		%Length;	#IMPLIED	deprecated	Loose DTD
		height for cell
	IMG, OBJECT
		%Length;	#IMPLIED
		override height
	APPLET
		%Length;	#REQUIRED	deprecated	Loose DTD
		initial height
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'height' otherwise: nil]
		ifNotNil: [attributes at: 'height' put: anObject asString].
%
category: 'attributes'
method: Html4Element
href

	^attributes at: 'href' ifAbsent: [nil].
%
category: 'attributes'
method: Html4Element
href: anObject
	"A, AREA, LINK
		%URI;	#IMPLIED
		URI for linked resource
	BASE
		%URI;	#IMPLIED
		URI that acts as base URI
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'href' otherwise: nil]
		ifNotNil: [attributes at: 'href' put: anObject asString].
%
category: 'attributes'
method: Html4Element
hreflang: anObject
	"A, LINK
		%LanguageCode;	#IMPLIED
		language code
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'hreflang' otherwise: nil]
		ifNotNil: [attributes at: 'hreflang' put: anObject asString].
%
category: 'attributes'
method: Html4Element
hspace: anObject
	"APPLET, IMG, OBJECT
		%Pixels;	#IMPLIED	deprecated	Loose DTD
		horizontal gutter
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'hspace' otherwise: nil]
		ifNotNil: [attributes at: 'hspace' put: anObject asString].
%
category: 'attributes'
method: Html4Element
httpEquiv: anObject
	"META
		NAME	#IMPLIED
		HTTP response header name
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'http-equiv' otherwise: nil]
		ifNotNil: [attributes at: 'http-equiv' put: anObject asString].
%
category: 'attributes'
method: Html4Element
id: anObject
	"All elements but BASE, HEAD, HTML, META, SCRIPT, STYLE, TITLE
		ID	#IMPLIED
		document-wide unique id
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'id' otherwise: nil]
		ifNotNil: [attributes at: 'id' put: anObject asString].
%
category: 'attributes'
method: Html4Element
ismap: anObject
	"IMG, INPUT
		(ismap)	#IMPLIED
		use server-side image map
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'ismap' otherwise: nil]
		ifNotNil: [attributes at: 'ismap' put: (anObject ifTrue: ['ismap'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
labelAttribute: anObject
	"OPTION
		%Text;	#IMPLIED
		for use in hierarchical menus
	OPTGROUP
		%Text;	#REQUIRED
		for use in hierarchical menus
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'label' otherwise: nil]
		ifNotNil: [attributes at: 'label' put: anObject asString].
%
category: 'attributes'
method: Html4Element
lang: anObject
	"All elements but APPLET, BASE, BASEFONT, BR, FRAME, FRAMESET, IFRAME, PARAM, SCRIPT
		%LanguageCode;	#IMPLIED
		language code
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'lang' otherwise: nil]
		ifNotNil: [attributes at: 'lang' put: anObject asString].
%
category: 'attributes'
method: Html4Element
language: anObject
	"SCRIPT
		CDATA	#IMPLIED	deprecated	Loose DTD
		predefined script language name
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'language' otherwise: nil]
		ifNotNil: [attributes at: 'language' put: anObject asString].
%
category: 'attributes'
method: Html4Element
linkAttribute: anObject
	"BODY
		%Color;	#IMPLIED	deprecated	Loose DTD
		color of links
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'link' otherwise: nil]
		ifNotNil: [attributes at: 'link' put: anObject asString].
%
category: 'attributes'
method: Html4Element
longdesc: anObject
	"IMG
		%URI;	#IMPLIED
		link to long description (complements alt)
	FRAME, IFRAME
		%URI;	#IMPLIED			Frameset DTD
		link to long description (complements title)
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'longdesc' otherwise: nil]
		ifNotNil: [attributes at: 'longdesc' put: anObject asString].
%
category: 'attributes'
method: Html4Element
marginheight: anObject
	"FRAME, IFRAME
		%Pixels;	#IMPLIED			Frameset DTD
		margin height in pixels
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'marginheight' otherwise: nil]
		ifNotNil: [attributes at: 'marginheight' put: anObject asString].
%
category: 'attributes'
method: Html4Element
marginwidth: anObject
	"FRAME, IFRAME
		%Pixels;	#IMPLIED			Frameset DTD
		margin widths in pixels
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'marginwidth' otherwise: nil]
		ifNotNil: [attributes at: 'marginwidth' put: anObject asString].
%
category: 'attributes'
method: Html4Element
maxlength: anObject
	"INPUT
		NUMBER	#IMPLIED
		max chars for text fields
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'maxlength' otherwise: nil]
		ifNotNil: [attributes at: 'maxlength' put: anObject asString].
%
category: 'attributes'
method: Html4Element
media: anObject
	"STYLE
		%MediaDesc;	#IMPLIED
		designed for use with these media
	LINK
		%MediaDesc;	#IMPLIED
		for rendering on these media
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'media' otherwise: nil]
		ifNotNil: [attributes at: 'media' put: anObject asString].
%
category: 'attributes'
method: Html4Element
method: anObject
	"FORM
		(GET | POST)	GET
		HTTP method used to submit the form
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'method' otherwise: nil]
		ifNotNil: [attributes at: 'method' put: anObject asString].
%
category: 'attributes'
method: Html4Element
multiple: anObject
	"SELECT
		(multiple)	#IMPLIED
		default is single selection
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'multiple' otherwise: nil]
		ifNotNil: [attributes at: 'multiple' put: (anObject ifTrue: ['multiple'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
name: anObject
	"BUTTON, TEXTAREA
		CDATA	#IMPLIED

	APPLET
		CDATA	#IMPLIED	deprecated	Loose DTD
		allows applets to find each other
	SELECT
		CDATA	#IMPLIED
		field name
	FORM
		CDATA	#IMPLIED
		name of form for scripting
	FRAME, IFRAME
		CDATA	#IMPLIED			Frameset DTD
		name of frame for targetting
	IMG
		CDATA	#IMPLIED
		name of image for scripting
	A
		CDATA	#IMPLIED
		named link end
	INPUT, OBJECT
		CDATA	#IMPLIED
		submit as part of form
	MAP
		CDATA	#REQUIRED
		for reference by usemap
	PARAM
		CDATA	#REQUIRED
		property name
	META
		NAME	#IMPLIED
		metainformation name
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'name' otherwise: nil]
		ifNotNil: [attributes at: 'name' put: anObject asString].
%
category: 'attributes'
method: Html4Element
nohref: anObject
	"AREA
		(nohref)	#IMPLIED
		this region has no action
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'nohref' otherwise: nil]
		ifNotNil: [attributes at: 'nohref' put: (anObject ifTrue: ['nohref'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
noresize: anObject
	"FRAME
		(noresize)	#IMPLIED			Frameset DTD
		allow users to resize frames?
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'noresize' otherwise: nil]
		ifNotNil: [attributes at: 'noresize' put: (anObject ifTrue: ['noresize'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
noshade: anObject
	"HR
		(noshade)	#IMPLIED	deprecated	Loose DTD

	(generated)"

	anObject
		ifNil: [attributes removeKey: 'noshade' otherwise: nil]
		ifNotNil: [attributes at: 'noshade' put: (anObject ifTrue: ['noshade'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
nowrap: anObject
	"TD, TH
		(nowrap)	#IMPLIED	deprecated	Loose DTD
		suppress word wrap
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'nowrap' otherwise: nil]
		ifNotNil: [attributes at: 'nowrap' put: (anObject ifTrue: ['nowrap'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
objectAttribute: anObject
	"APPLET
		CDATA	#IMPLIED	deprecated	Loose DTD
		serialized applet file
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'object' otherwise: nil]
		ifNotNil: [attributes at: 'object' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onblur: anObject
	"A, AREA, BUTTON, INPUT, LABEL, SELECT, TEXTAREA
		%Script;	#IMPLIED
		the element lost the focus
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onblur' otherwise: nil]
		ifNotNil: [attributes at: 'onblur' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onchange: anObject
	"INPUT, SELECT, TEXTAREA
		%Script;	#IMPLIED
		the element value was changed
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onchange' otherwise: nil]
		ifNotNil: [attributes at: 'onchange' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onclick: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a pointer button was clicked
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onclick' otherwise: nil]
		ifNotNil: [attributes at: 'onclick' put: anObject asString].
%
category: 'attributes'
method: Html4Element
ondblclick: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a pointer button was double clicked
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'ondblclick' otherwise: nil]
		ifNotNil: [attributes at: 'ondblclick' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onfocus: anObject
	"A, AREA, BUTTON, INPUT, LABEL, SELECT, TEXTAREA
		%Script;	#IMPLIED
		the element got the focus
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onfocus' otherwise: nil]
		ifNotNil: [attributes at: 'onfocus' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onkeydown: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a key was pressed down
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onkeydown' otherwise: nil]
		ifNotNil: [attributes at: 'onkeydown' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onkeypress: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a key was pressed and released
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onkeypress' otherwise: nil]
		ifNotNil: [attributes at: 'onkeypress' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onkeyup: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a key was released
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onkeyup' otherwise: nil]
		ifNotNil: [attributes at: 'onkeyup' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onload: anObject
	"FRAMESET
		%Script;	#IMPLIED			Frameset DTD
		all the frames have been loaded
	BODY
		%Script;	#IMPLIED
		the document has been loaded
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onload' otherwise: nil]
		ifNotNil: [attributes at: 'onload' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onmousedown: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a pointer button was pressed down
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onmousedown' otherwise: nil]
		ifNotNil: [attributes at: 'onmousedown' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onmousemove: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a pointer was moved within
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onmousemove' otherwise: nil]
		ifNotNil: [attributes at: 'onmousemove' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onmouseout: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a pointer was moved away
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onmouseout' otherwise: nil]
		ifNotNil: [attributes at: 'onmouseout' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onmouseover: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a pointer was moved onto
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onmouseover' otherwise: nil]
		ifNotNil: [attributes at: 'onmouseover' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onmouseup: anObject
	"All elements but APPLET, BASE, BASEFONT, BDO, BR, FONT, FRAME, FRAMESET, HEAD, HTML, IFRAME, ISINDEX, META, PARAM, SCRIPT, STYLE, TITLE
		%Script;	#IMPLIED
		a pointer button was released
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onmouseup' otherwise: nil]
		ifNotNil: [attributes at: 'onmouseup' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onreset: anObject
	"FORM
		%Script;	#IMPLIED
		the form was reset
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onreset' otherwise: nil]
		ifNotNil: [attributes at: 'onreset' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onselect: anObject
	"INPUT, TEXTAREA
		%Script;	#IMPLIED
		some text was selected
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onselect' otherwise: nil]
		ifNotNil: [attributes at: 'onselect' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onsubmit: anObject
	"FORM
		%Script;	#IMPLIED
		the form was submitted
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onsubmit' otherwise: nil]
		ifNotNil: [attributes at: 'onsubmit' put: anObject asString].
%
category: 'attributes'
method: Html4Element
onunload: anObject
	"FRAMESET
		%Script;	#IMPLIED			Frameset DTD
		all the frames have been removed
	BODY
		%Script;	#IMPLIED
		the document has been removed
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'onunload' otherwise: nil]
		ifNotNil: [attributes at: 'onunload' put: anObject asString].
%
category: 'attributes'
method: Html4Element
profile: anObject
	"HEAD
		%URI;	#IMPLIED
		named dictionary of meta info
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'profile' otherwise: nil]
		ifNotNil: [attributes at: 'profile' put: anObject asString].
%
category: 'attributes'
method: Html4Element
prompt: anObject
	"ISINDEX
		%Text;	#IMPLIED	deprecated	Loose DTD
		prompt message
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'prompt' otherwise: nil]
		ifNotNil: [attributes at: 'prompt' put: anObject asString].
%
category: 'attributes'
method: Html4Element
readonly: anObject
	"TEXTAREA
		(readonly)	#IMPLIED

	INPUT
		(readonly)	#IMPLIED
		for text and passwd
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'readonly' otherwise: nil]
		ifNotNil: [attributes at: 'readonly' put: (anObject ifTrue: ['readonly'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
rel: anObject
	"A, LINK
		%LinkTypes;	#IMPLIED
		forward link types
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'rel' otherwise: nil]
		ifNotNil: [attributes at: 'rel' put: anObject asString].
%
category: 'attributes'
method: Html4Element
rev: anObject
	"A, LINK
		%LinkTypes;	#IMPLIED
		reverse link types
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'rev' otherwise: nil]
		ifNotNil: [attributes at: 'rev' put: anObject asString].
%
category: 'attributes'
method: Html4Element
rows: anObject
	"FRAMESET
		%MultiLengths;	#IMPLIED			Frameset DTD
		list of lengths, default: 100% (1 row)
	TEXTAREA
		NUMBER	#REQUIRED

	(generated)"

	anObject
		ifNil: [attributes removeKey: 'rows' otherwise: nil]
		ifNotNil: [attributes at: 'rows' put: anObject asString].
%
category: 'attributes'
method: Html4Element
rowspan: anObject
	"TD, TH
		NUMBER	1
		number of rows spanned by cell
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'rowspan' otherwise: nil]
		ifNotNil: [attributes at: 'rowspan' put: anObject asString].
%
category: 'attributes'
method: Html4Element
rules: anObject
	"TABLE
		%TRules;	#IMPLIED
		rulings between rows and cols
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'rules' otherwise: nil]
		ifNotNil: [attributes at: 'rules' put: anObject asString].
%
category: 'attributes'
method: Html4Element
scheme: anObject
	"META
		CDATA	#IMPLIED
		select form of content
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'scheme' otherwise: nil]
		ifNotNil: [attributes at: 'scheme' put: anObject asString].
%
category: 'attributes'
method: Html4Element
scope: anObject
	"TD, TH
		%Scope;	#IMPLIED
		scope covered by header cells
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'scope' otherwise: nil]
		ifNotNil: [attributes at: 'scope' put: anObject asString].
%
category: 'attributes'
method: Html4Element
scrolling: anObject
	"FRAME, IFRAME
		(yes | no | auto)	auto			Frameset DTD
		scrollbar or none
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'scrolling' otherwise: nil]
		ifNotNil: [attributes at: 'scrolling' put: anObject asString].
%
category: 'attributes'
method: Html4Element
selected: anObject
	"OPTION
		(selected)	#IMPLIED

	(generated)"

	anObject
		ifNil: [attributes removeKey: 'selected' otherwise: nil]
		ifNotNil: [attributes at: 'selected' put: (anObject ifTrue: ['selected'] ifFalse: [nil])].
%
category: 'attributes'
method: Html4Element
shape: anObject
	"AREA
		%Shape;	rect
		controls interpretation of coords
	A
		%Shape;	rect
		for use with client-side image maps
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'shape' otherwise: nil]
		ifNotNil: [attributes at: 'shape' put: anObject asString].
%
category: 'attributes'
method: Html4Element
size: anObject
	"HR
		%Pixels;	#IMPLIED	deprecated	Loose DTD

	FONT
		CDATA	#IMPLIED	deprecated	Loose DTD
		[+|-]nn e.g. size=""+1"", size=""4""
	INPUT
		CDATA	#IMPLIED
		specific to each type of field
	BASEFONT
		CDATA	#REQUIRED	deprecated	Loose DTD
		base font size for FONT elements
	SELECT
		NUMBER	#IMPLIED
		rows visible
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'size' otherwise: nil]
		ifNotNil: [attributes at: 'size' put: anObject asString].
%
category: 'attributes'
method: Html4Element
spanAttribute: anObject
	"COL
		NUMBER	1
		COL attributes affect N columns
	COLGROUP
		NUMBER	1
		default number of columns in group
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'span' otherwise: nil]
		ifNotNil: [attributes at: 'span' put: anObject asString].
%
category: 'attributes'
method: Html4Element
src: anObject
	"SCRIPT
		%URI;	#IMPLIED
		URI for an external script
	INPUT
		%URI;	#IMPLIED
		for fields with images
	FRAME, IFRAME
		%URI;	#IMPLIED			Frameset DTD
		source of frame content
	IMG
		%URI;	#REQUIRED
		URI of image to embed
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'src' otherwise: nil]
		ifNotNil: [attributes at: 'src' put: anObject asString].
%
category: 'attributes'
method: Html4Element
standby: anObject
	"OBJECT
		%Text;	#IMPLIED
		message to show while loading
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'standby' otherwise: nil]
		ifNotNil: [attributes at: 'standby' put: anObject asString].
%
category: 'attributes'
method: Html4Element
start: anObject
	"OL
		NUMBER	#IMPLIED	deprecated	Loose DTD
		starting sequence number
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'start' otherwise: nil]
		ifNotNil: [attributes at: 'start' put: anObject asString].
%
category: 'attributes'
method: Html4Element
styleAttribute: anObject
	"All elements but BASE, BASEFONT, HEAD, HTML, META, PARAM, SCRIPT, STYLE, TITLE
		%StyleSheet;	#IMPLIED
		associated style info
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'style' otherwise: nil]
		ifNotNil: [attributes at: 'style' put: anObject asString].
%
category: 'attributes'
method: Html4Element
summary: anObject
	"TABLE
		%Text;	#IMPLIED
		purpose/structure for speech output
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'summary' otherwise: nil]
		ifNotNil: [attributes at: 'summary' put: anObject asString].
%
category: 'attributes'
method: Html4Element
tabindex: anObject
	"A, AREA, BUTTON, INPUT, OBJECT, SELECT, TEXTAREA
		NUMBER	#IMPLIED
		position in tabbing order
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'tabindex' otherwise: nil]
		ifNotNil: [attributes at: 'tabindex' put: anObject asString].
%
category: 'attributes'
method: Html4Element
target: anObject
	"A, AREA, BASE, FORM, LINK
		%FrameTarget;	#IMPLIED		Loose DTD
		render in this frame
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'target' otherwise: nil]
		ifNotNil: [attributes at: 'target' put: anObject asString].
%
category: 'attributes'
method: Html4Element
text: anObject
	"BODY
		%Color;	#IMPLIED	deprecated	Loose DTD
		document text color
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'text' otherwise: nil]
		ifNotNil: [attributes at: 'text' put: anObject asString].
%
category: 'attributes'
method: Html4Element
titleAttribute: anObject
	"All elements but BASE, BASEFONT, HEAD, HTML, META, PARAM, SCRIPT, TITLE
		%Text;	#IMPLIED
		advisory title
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'title' otherwise: nil]
		ifNotNil: [attributes at: 'title' put: anObject asString].
%
category: 'attributes'
method: Html4Element
type: anObject
	"A, LINK
		%ContentType;	#IMPLIED
		advisory content type
	OBJECT
		%ContentType;	#IMPLIED
		content type for data
	PARAM
		%ContentType;	#IMPLIED
		content type for value when valuetype=ref
	SCRIPT
		%ContentType;	#REQUIRED
		content type of script language
	STYLE
		%ContentType;	#REQUIRED
		content type of style language
	INPUT
		%InputType;	TEXT
		what kind of widget is needed
	LI
		%LIStyle;	#IMPLIED	deprecated	Loose DTD
		list item style
	OL
		%OLStyle;	#IMPLIED	deprecated	Loose DTD
		numbering style
	UL
		%ULStyle;	#IMPLIED	deprecated	Loose DTD
		bullet style
	BUTTON
		(button | submit | reset)	submit
		for use as form button
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'type' otherwise: nil]
		ifNotNil: [attributes at: 'type' put: anObject asString].
%
category: 'attributes'
method: Html4Element
usemap: anObject
	"IMG, INPUT, OBJECT
		%URI;	#IMPLIED
		use client-side image map
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'usemap' otherwise: nil]
		ifNotNil: [attributes at: 'usemap' put: anObject asString].
%
category: 'attributes'
method: Html4Element
valign: anObject
	"COL, COLGROUP, TBODY, TD, TFOOT, TH, THEAD, TR
		(top | middle | bottom | baseline)	#IMPLIED
		vertical alignment in cells
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'valign' otherwise: nil]
		ifNotNil: [attributes at: 'valign' put: anObject asString].
%
category: 'attributes'
method: Html4Element
value: anObject
	"INPUT
		CDATA	#IMPLIED
		Specify for radio buttons and checkboxes
	OPTION
		CDATA	#IMPLIED
		defaults to element content
	PARAM
		CDATA	#IMPLIED
		property value
	BUTTON
		CDATA	#IMPLIED
		sent to server when submitted
	LI
		NUMBER	#IMPLIED	deprecated	Loose DTD
		reset sequence number
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'value' otherwise: nil]
		ifNotNil: [attributes at: 'value' put: anObject asString].
%
category: 'attributes'
method: Html4Element
valuetype: anObject
	"PARAM
		(DATA | REF | OBJECT)	DATA
		How to interpret value
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'valuetype' otherwise: nil]
		ifNotNil: [attributes at: 'valuetype' put: anObject asString].
%
category: 'attributes'
method: Html4Element
version: anObject
	"HTML
		CDATA	%HTML.Version;	deprecated	Loose DTD
		Constant
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'version' otherwise: nil]
		ifNotNil: [attributes at: 'version' put: anObject asString].
%
category: 'attributes'
method: Html4Element
vlink: anObject
	"BODY
		%Color;	#IMPLIED	deprecated	Loose DTD
		color of visited links
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'vlink' otherwise: nil]
		ifNotNil: [attributes at: 'vlink' put: anObject asString].
%
category: 'attributes'
method: Html4Element
vspace: anObject
	"APPLET, IMG, OBJECT
		%Pixels;	#IMPLIED	deprecated	Loose DTD
		vertical gutter
	(generated)"

	anObject
		ifNil: [attributes removeKey: 'vspace' otherwise: nil]
		ifNotNil: [attributes at: 'vspace' put: anObject asString].
%
category: 'attributes'
method: Html4Element
width: anObject
	"HR
		%Length;	#IMPLIED	deprecated	Loose DTD

	IFRAME
		%Length;	#IMPLIED		Loose DTD
		frame width
	IMG, OBJECT
		%Length;	#IMPLIED
		override width
	TABLE
		%Length;	#IMPLIED
		table width
	TD, TH
		%Length;	#IMPLIED	deprecated	Loose DTD
		width for cell
	APPLET
		%Length;	#REQUIRED	deprecated	Loose DTD
		initial width
	COL
		%MultiLength;	#IMPLIED
		column width specification
	COLGROUP
		%MultiLength;	#IMPLIED
		default width for enclosed COLs
	PRE
		NUMBER	#IMPLIED	deprecated	Loose DTD

	(generated)"

	anObject
		ifNil: [attributes removeKey: 'width' otherwise: nil]
		ifNotNil: [attributes at: 'width' put: anObject asString].
%
set compile_env: 0
category: 'either'
method: Html4Element
abbr: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self abbrElement: anObject]
		ifFalse: [self abbrAttribute: anObject].
%
category: 'either'
method: Html4Element
cite: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self citeElement: anObject]
		ifFalse: [self citeAttribute: anObject].
%
category: 'either'
method: Html4Element
code: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self codeElement: anObject]
		ifFalse: [self codeAttribute: anObject].
%
category: 'either'
method: Html4Element
dir: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self dirElement: anObject]
		ifFalse: [self dirAttribute: anObject].
%
category: 'either'
method: Html4Element
frame: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self frameElement: anObject]
		ifFalse: [self frameAttribute: anObject].
%
category: 'either'
method: Html4Element
label: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self labelElement: anObject]
		ifFalse: [self labelAttribute: anObject].
%
category: 'either'
method: Html4Element
link: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self linkElement: anObject]
		ifFalse: [self linkAttribute: anObject].
%
category: 'either'
method: Html4Element
object: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self objectElement: anObject]
		ifFalse: [self objectAttribute: anObject].
%
category: 'either'
method: Html4Element
span: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self spanElement: anObject]
		ifFalse: [self spanAttribute: anObject].
%
category: 'either'
method: Html4Element
style: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self styleElement: anObject]
		ifFalse: [self styleAttribute: anObject].
%
category: 'either'
method: Html4Element
title: anObject
	"Some attribute names overlap with element names (generated method)."

	^(anObject isKindOf: ExecBlock)
		ifTrue: [self titleElement: anObject]
		ifFalse: [self titleAttribute: anObject].
%
set compile_env: 0
category: 'elements'
method: Html4Element
a
	"anchor
	(generated method)"

	^self newChildWithTag: 'a'.
%
category: 'elements'
method: Html4Element
a: aBlock

	^aBlock value: self a.
%
category: 'elements'
method: Html4Element
abbr
	"abbreviated form (e.g., WWW, HTTP, etc.)
	(generated method)"

	^self newChildWithTag: 'abbr'.
%
category: 'elements'
method: Html4Element
abbrElement: aBlock

	^aBlock value: self abbr.
%
category: 'elements'
method: Html4Element
acronym
	"
	(generated method)"

	^self newChildWithTag: 'acronym'.
%
category: 'elements'
method: Html4Element
acronym: aBlock

	^aBlock value: self acronym.
%
category: 'elements'
method: Html4Element
address
	"information on author
	(generated method)"

	^self newChildWithTag: 'address'.
%
category: 'elements'
method: Html4Element
address: aBlock

	^aBlock value: self address.
%
category: 'elements'
method: Html4Element
applet
	"Java applet
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'applet'.
%
category: 'elements'
method: Html4Element
applet: aBlock

	^aBlock value: self applet.
%
category: 'elements'
method: Html4Element
area
	"client-side image map area
	element is empty
	(generated method)"

	^self newChildWithTag: 'area'.
%
category: 'elements'
method: Html4Element
area: aBlock

	^aBlock value: self area.
%
category: 'elements'
method: Html4Element
b
	"bold text style
	(generated method)"

	^self newChildWithTag: 'b'.
%
category: 'elements'
method: Html4Element
b: aBlock

	^aBlock value: self b.
%
category: 'elements'
method: Html4Element
base
	"document base URI
	element is empty
	(generated method)"

	^self newChildWithTag: 'base'.
%
category: 'elements'
method: Html4Element
base: aBlock

	^aBlock value: self base.
%
category: 'elements'
method: Html4Element
basefont
	"base font size
	element is empty
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'basefont'.
%
category: 'elements'
method: Html4Element
basefont: aBlock

	^aBlock value: self basefont.
%
category: 'elements'
method: Html4Element
bdo
	"I18N BiDi over-ride
	(generated method)"

	^self newChildWithTag: 'bdo'.
%
category: 'elements'
method: Html4Element
bdo: aBlock

	^aBlock value: self bdo.
%
category: 'elements'
method: Html4Element
big
	"large text style
	(generated method)"

	^self newChildWithTag: 'big'.
%
category: 'elements'
method: Html4Element
big: aBlock

	^aBlock value: self big.
%
category: 'elements'
method: Html4Element
blockquote
	"long quotation
	(generated method)"

	^self newChildWithTag: 'blockquote'.
%
category: 'elements'
method: Html4Element
blockquote: aBlock

	^aBlock value: self blockquote.
%
category: 'elements'
method: Html4Element
body
	"document body
	start tag is optional
	end tag is optional"

	^self childWithTag: 'body'.
%
category: 'elements'
method: Html4Element
body: aBlock

	^aBlock value: self body.
%
category: 'elements'
method: Html4Element
br
	"forced line break
	element is empty
	(generated method)"

	^self newChildWithTag: 'br'.
%
category: 'elements'
method: Html4Element
br: aBlock

	^aBlock value: self br.
%
category: 'elements'
method: Html4Element
button
	"push button
	(generated method)"

	^self newChildWithTag: 'button'.
%
category: 'elements'
method: Html4Element
button: aBlock

	^aBlock value: self button.
%
category: 'elements'
method: Html4Element
caption
	"table caption
	(generated method)"

	^self newChildWithTag: 'caption'.
%
category: 'elements'
method: Html4Element
caption: aBlock

	^aBlock value: self caption.
%
category: 'elements'
method: Html4Element
center
	"shorthand for DIV align=center
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'center'.
%
category: 'elements'
method: Html4Element
center: aBlock

	^aBlock value: self center.
%
category: 'elements'
method: Html4Element
cite
	"citation
	(generated method)"

	^self newChildWithTag: 'cite'.
%
category: 'elements'
method: Html4Element
citeElement: aBlock

	^aBlock value: self cite.
%
category: 'elements'
method: Html4Element
code
	"computer code fragment
	(generated method)"

	^self newChildWithTag: 'code'.
%
category: 'elements'
method: Html4Element
codeElement: aBlock

	^aBlock value: self code.
%
category: 'elements'
method: Html4Element
col
	"table column
	element is empty
	(generated method)"

	^self newChildWithTag: 'col'.
%
category: 'elements'
method: Html4Element
col: aBlock

	^aBlock value: self col.
%
category: 'elements'
method: Html4Element
colgroup
	"table column group
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'colgroup'.
%
category: 'elements'
method: Html4Element
colgroup: aBlock

	^aBlock value: self colgroup.
%
category: 'elements'
method: Html4Element
dd
	"definition description
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'dd'.
%
category: 'elements'
method: Html4Element
dd: aBlock

	^aBlock value: self dd.
%
category: 'elements'
method: Html4Element
del
	"deleted text
	(generated method)"

	^self newChildWithTag: 'del'.
%
category: 'elements'
method: Html4Element
del: aBlock

	^aBlock value: self del.
%
category: 'elements'
method: Html4Element
dfn
	"instance definition
	(generated method)"

	^self newChildWithTag: 'dfn'.
%
category: 'elements'
method: Html4Element
dfn: aBlock

	^aBlock value: self dfn.
%
category: 'elements'
method: Html4Element
dir
	"directory list
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'dir'.
%
category: 'elements'
method: Html4Element
dirElement: aBlock

	^aBlock value: self dir.
%
category: 'elements'
method: Html4Element
div
	"generic language/style container
	(generated method)"

	^self newChildWithTag: 'div'.
%
category: 'elements'
method: Html4Element
div: aBlock

	^aBlock value: self div.
%
category: 'elements'
method: Html4Element
dl
	"definition list
	(generated method)"

	^self newChildWithTag: 'dl'.
%
category: 'elements'
method: Html4Element
dl: aBlock

	^aBlock value: self dl.
%
category: 'elements'
method: Html4Element
dt
	"definition term
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'dt'.
%
category: 'elements'
method: Html4Element
dt: aBlock

	^aBlock value: self dt.
%
category: 'elements'
method: Html4Element
em
	"emphasis
	(generated method)"

	^self newChildWithTag: 'em'.
%
category: 'elements'
method: Html4Element
em: aBlock

	^aBlock value: self em.
%
category: 'elements'
method: Html4Element
fieldset
	"form control group
	(generated method)"

	^self newChildWithTag: 'fieldset'.
%
category: 'elements'
method: Html4Element
fieldset: aBlock

	^aBlock value: self fieldset.
%
category: 'elements'
method: Html4Element
font
	"local change to font
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'font'.
%
category: 'elements'
method: Html4Element
font: aBlock

	^aBlock value: self font.
%
category: 'elements'
method: Html4Element
form
	"interactive form
	(generated method)"

	^self newChildWithTag: 'form'.
%
category: 'elements'
method: Html4Element
form: aBlock

	^aBlock value: self form.
%
category: 'elements'
method: Html4Element
frame
	"subwindow
	element is empty
	Frameset DTD
	(generated method)"

	^self newChildWithTag: 'frame'.
%
category: 'elements'
method: Html4Element
frameElement: aBlock

	^aBlock value: self frame.
%
category: 'elements'
method: Html4Element
frameset
	"window subdivision
	Frameset DTD
	(generated method)"

	^self newChildWithTag: 'frameset'.
%
category: 'elements'
method: Html4Element
frameset: aBlock

	^aBlock value: self frameset.
%
category: 'elements'
method: Html4Element
h1
	"heading
	(generated method)"

	^self newChildWithTag: 'h1'.
%
category: 'elements'
method: Html4Element
h1: aBlock

	^aBlock value: self h1.
%
category: 'elements'
method: Html4Element
h2
	"heading
	(generated method)"

	^self newChildWithTag: 'h2'.
%
category: 'elements'
method: Html4Element
h2: aBlock

	^aBlock value: self h2.
%
category: 'elements'
method: Html4Element
h3
	"heading
	(generated method)"

	^self newChildWithTag: 'h3'.
%
category: 'elements'
method: Html4Element
h3: aBlock

	^aBlock value: self h3.
%
category: 'elements'
method: Html4Element
h4
	"heading
	(generated method)"

	^self newChildWithTag: 'h4'.
%
category: 'elements'
method: Html4Element
h4: aBlock

	^aBlock value: self h4.
%
category: 'elements'
method: Html4Element
h5
	"heading
	(generated method)"

	^self newChildWithTag: 'h5'.
%
category: 'elements'
method: Html4Element
h5: aBlock

	^aBlock value: self h5.
%
category: 'elements'
method: Html4Element
h6
	"heading
	(generated method)"

	^self newChildWithTag: 'h6'.
%
category: 'elements'
method: Html4Element
h6: aBlock

	^aBlock value: self h6.
%
category: 'elements'
method: Html4Element
head
	"document head
	start tag is optional
	end tag is optional"

	^self childWithTag: 'head'.
%
category: 'elements'
method: Html4Element
head: aBlock

	^aBlock value: self head.
%
category: 'elements'
method: Html4Element
hr
	"horizontal rule
	element is empty
	(generated method)"

	^self newChildWithTag: 'hr'.
%
category: 'elements'
method: Html4Element
hr: aBlock

	^aBlock value: self hr.
%
category: 'elements'
method: Html4Element
html

	^self error: 'Should use the class-side method!'.
%
category: 'elements'
method: Html4Element
i
	"italic text style
	(generated method)"

	^self newChildWithTag: 'i'.
%
category: 'elements'
method: Html4Element
i: aBlock

	^aBlock value: self i.
%
category: 'elements'
method: Html4Element
iframe
	"inline subwindow
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'iframe'.
%
category: 'elements'
method: Html4Element
iframe: aBlock

	^aBlock value: self iframe.
%
category: 'elements'
method: Html4Element
img
	"Embedded image
	element is empty
	(generated method)"

	^self newChildWithTag: 'img'.
%
category: 'elements'
method: Html4Element
img: aBlock

	^aBlock value: self img.
%
category: 'elements'
method: Html4Element
input
	"form control
	element is empty
	(generated method)"

	^self newChildWithTag: 'input'.
%
category: 'elements'
method: Html4Element
input: aBlock

	^aBlock value: self input.
%
category: 'elements'
method: Html4Element
ins
	"inserted text
	(generated method)"

	^self newChildWithTag: 'ins'.
%
category: 'elements'
method: Html4Element
ins: aBlock

	^aBlock value: self ins.
%
category: 'elements'
method: Html4Element
isindex
	"single line prompt
	element is empty
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'isindex'.
%
category: 'elements'
method: Html4Element
isindex: aBlock

	^aBlock value: self isindex.
%
category: 'elements'
method: Html4Element
kbd
	"text to be entered by the user
	(generated method)"

	^self newChildWithTag: 'kbd'.
%
category: 'elements'
method: Html4Element
kbd: aBlock

	^aBlock value: self kbd.
%
category: 'elements'
method: Html4Element
label
	"form field label text
	(generated method)"

	^self newChildWithTag: 'label'.
%
category: 'elements'
method: Html4Element
labelElement: aBlock

	^aBlock value: self label.
%
category: 'elements'
method: Html4Element
legend
	"fieldset legend
	(generated method)"

	^self newChildWithTag: 'legend'.
%
category: 'elements'
method: Html4Element
legend: aBlock

	^aBlock value: self legend.
%
category: 'elements'
method: Html4Element
li
	"list item
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'li'.
%
category: 'elements'
method: Html4Element
li: aBlock

	^aBlock value: self li.
%
category: 'elements'
method: Html4Element
link
	"a media-independent link
	element is empty
	(generated method)"

	^self newChildWithTag: 'link'.
%
category: 'elements'
method: Html4Element
linkElement: aBlock

	^aBlock value: self link.
%
category: 'elements'
method: Html4Element
map
	"client-side image map
	(generated method)"

	^self newChildWithTag: 'map'.
%
category: 'elements'
method: Html4Element
map: aBlock

	^aBlock value: self map.
%
category: 'elements'
method: Html4Element
menu
	"menu list
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'menu'.
%
category: 'elements'
method: Html4Element
menu: aBlock

	^aBlock value: self menu.
%
category: 'elements'
method: Html4Element
meta
	"generic metainformation
	element is empty
	(generated method)"

	^self newChildWithTag: 'meta'.
%
category: 'elements'
method: Html4Element
meta: aBlock

	^aBlock value: self meta.
%
category: 'elements'
method: Html4Element
noframes
	"alternate content container for non frame-based rendering
	Frameset DTD
	(generated method)"

	^self newChildWithTag: 'noframes'.
%
category: 'elements'
method: Html4Element
noframes: aBlock

	^aBlock value: self noframes.
%
category: 'elements'
method: Html4Element
noscript
	"alternate content container for non script-based rendering
	(generated method)"

	^self newChildWithTag: 'noscript'.
%
category: 'elements'
method: Html4Element
noscript: aBlock

	^aBlock value: self noscript.
%
category: 'elements'
method: Html4Element
object
	"generic embedded object
	(generated method)"

	^self newChildWithTag: 'object'.
%
category: 'elements'
method: Html4Element
objectElement: aBlock

	^aBlock value: self object.
%
category: 'elements'
method: Html4Element
ol
	"ordered list
	(generated method)"

	^self newChildWithTag: 'ol'.
%
category: 'elements'
method: Html4Element
ol: aBlock

	^aBlock value: self ol.
%
category: 'elements'
method: Html4Element
optgroup
	"option group
	(generated method)"

	^self newChildWithTag: 'optgroup'.
%
category: 'elements'
method: Html4Element
optgroup: aBlock

	^aBlock value: self optgroup.
%
category: 'elements'
method: Html4Element
option
	"selectable choice
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'option'.
%
category: 'elements'
method: Html4Element
option: aBlock

	^aBlock value: self option.
%
category: 'elements'
method: Html4Element
p
	"paragraph
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'p'.
%
category: 'elements'
method: Html4Element
p: aBlock

	^aBlock value: self p.
%
category: 'elements'
method: Html4Element
param
	"named property value
	element is empty
	(generated method)"

	^self newChildWithTag: 'param'.
%
category: 'elements'
method: Html4Element
param: aBlock

	^aBlock value: self param.
%
category: 'elements'
method: Html4Element
pre
	"preformatted text
	(generated method)"

	^self newChildWithTag: 'pre'.
%
category: 'elements'
method: Html4Element
pre: aBlock

	^aBlock value: self pre.
%
category: 'elements'
method: Html4Element
q
	"short inline quotation
	(generated method)"

	^self newChildWithTag: 'q'.
%
category: 'elements'
method: Html4Element
q: aBlock

	^aBlock value: self q.
%
category: 'elements'
method: Html4Element
s
	"strike-through text style
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 's'.
%
category: 'elements'
method: Html4Element
s: aBlock

	^aBlock value: self s.
%
category: 'elements'
method: Html4Element
samp
	"sample program output, scripts, etc.
	(generated method)"

	^self newChildWithTag: 'samp'.
%
category: 'elements'
method: Html4Element
samp: aBlock

	^aBlock value: self samp.
%
category: 'elements'
method: Html4Element
script
	"script statements
	(generated method)"

	^self newChildWithTag: 'script'.
%
category: 'elements'
method: Html4Element
script: aBlock

	^aBlock value: self script.
%
category: 'elements'
method: Html4Element
select
	"option selector
	(generated method)"

	^self newChildWithTag: 'select'.
%
category: 'elements'
method: Html4Element
select: aBlock

	^aBlock value: self select.
%
category: 'elements'
method: Html4Element
small
	"small text style
	(generated method)"

	^self newChildWithTag: 'small'.
%
category: 'elements'
method: Html4Element
small: aBlock

	^aBlock value: self small.
%
category: 'elements'
method: Html4Element
span
	"generic language/style container
	(generated method)"

	^self newChildWithTag: 'span'.
%
category: 'elements'
method: Html4Element
spanElement: aBlock

	^aBlock value: self span.
%
category: 'elements'
method: Html4Element
strike
	"strike-through text
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'strike'.
%
category: 'elements'
method: Html4Element
strike: aBlock

	^aBlock value: self strike.
%
category: 'elements'
method: Html4Element
strong
	"strong emphasis
	(generated method)"

	^self newChildWithTag: 'strong'.
%
category: 'elements'
method: Html4Element
strong: aBlock

	^aBlock value: self strong.
%
category: 'elements'
method: Html4Element
style
	"style info
	(generated method)"

	^self newChildWithTag: 'style'.
%
category: 'elements'
method: Html4Element
styleElement: aBlock

	^aBlock value: self style.
%
category: 'elements'
method: Html4Element
sub
	"subscript
	(generated method)"

	^self newChildWithTag: 'sub'.
%
category: 'elements'
method: Html4Element
sub: aBlock

	^aBlock value: self sub.
%
category: 'elements'
method: Html4Element
sup
	"superscript
	(generated method)"

	^self newChildWithTag: 'sup'.
%
category: 'elements'
method: Html4Element
sup: aBlock

	^aBlock value: self sup.
%
category: 'elements'
method: Html4Element
table
	"
	(generated method)"

	^self newChildWithTag: 'table'.
%
category: 'elements'
method: Html4Element
table: aBlock

	^aBlock value: self table.
%
category: 'elements'
method: Html4Element
tbody
	"table body
	start tag is optional
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'tbody'.
%
category: 'elements'
method: Html4Element
tbody: aBlock

	^aBlock value: self tbody.
%
category: 'elements'
method: Html4Element
td
	"table data cell
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'td'.
%
category: 'elements'
method: Html4Element
td: aBlock

	^aBlock value: self td.
%
category: 'elements'
method: Html4Element
textarea
	"multi-line text field
	(generated method)"

	^self newChildWithTag: 'textarea'.
%
category: 'elements'
method: Html4Element
textarea: aBlock

	^aBlock value: self textarea.
%
category: 'elements'
method: Html4Element
tfoot
	"table footer
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'tfoot'.
%
category: 'elements'
method: Html4Element
tfoot: aBlock

	^aBlock value: self tfoot.
%
category: 'elements'
method: Html4Element
th
	"table header cell
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'th'.
%
category: 'elements'
method: Html4Element
th: aBlock

	^aBlock value: self th.
%
category: 'elements'
method: Html4Element
thead
	"table header
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'thead'.
%
category: 'elements'
method: Html4Element
thead: aBlock

	^aBlock value: self thead.
%
category: 'elements'
method: Html4Element
title
	"document title
	(generated method)"

	^self newChildWithTag: 'title'.
%
category: 'elements'
method: Html4Element
titleElement: aBlock

	^aBlock value: self title.
%
category: 'elements'
method: Html4Element
tr
	"table row
	end tag is optional
	(generated method)"

	^self newChildWithTag: 'tr'.
%
category: 'elements'
method: Html4Element
tr: aBlock

	^aBlock value: self tr.
%
category: 'elements'
method: Html4Element
tt
	"teletype or monospaced text style
	(generated method)"

	^self newChildWithTag: 'tt'.
%
category: 'elements'
method: Html4Element
tt: aBlock

	^aBlock value: self tt.
%
category: 'elements'
method: Html4Element
u
	"underlined text style
	element is deprecated
	Loose DTD
	(generated method)"

	^self newChildWithTag: 'u'.
%
category: 'elements'
method: Html4Element
u: aBlock

	^aBlock value: self u.
%
category: 'elements'
method: Html4Element
ul
	"unordered list
	(generated method)"

	^self newChildWithTag: 'ul'.
%
category: 'elements'
method: Html4Element
ul: aBlock

	^aBlock value: self ul.
%
category: 'elements'
method: Html4Element
var
	"instance of a variable or program argument
	(generated method)"

	^self newChildWithTag: 'var'.
%
category: 'elements'
method: Html4Element
var: aBlock

	^aBlock value: self var.
%
set compile_env: 0
category: 'other'
method: Html4Element
addChild: anObject

	anObject ifNil: [self error: 'Should not add nil as child to HtmlElement!'].
	children add: anObject.
	^anObject.
%
category: 'other'
method: Html4Element
addTo: nameString script: scriptString

	| element string |
	(element := self childWithTag: 'script') isNil ifTrue: [
		element := (self newChildWithTag: 'script')
			type: 'text/javascript';
			yourself.
	].
	string := scriptString copy trimSeparators.
	string notEmpty ifTrue: [
		string := Character tab asString , string.
		(string last == $; or: [string last == $}]) ifFalse: [string add: $;].
		string add: Character lf.
	].
	(element scriptForFunctionNamed: nameString) addAll: string.
%
category: 'other'
method: Html4Element
addToVariables: scriptString

	| element string |
	(element := self childWithTag: 'script') isNil ifTrue: [
		element := (self newChildWithTag: 'script')
			type: 'text/javascript';
			yourself.
	].
	string := scriptString copy trimSeparators.
	string notEmpty ifTrue: [
		string last == $; ifFalse: [string add: $;].
		string add: Character lf.
	].
	element scriptForVariables addAll: string.
%
category: 'other'
method: Html4Element
collection: aCollection do: aBlock
	"This allows you to cascade calls to the element and insert a do loop. For example:

	main div: [:div | div
		paragraph: [:p | p text: 'hello world!'];
		collection: allBugs do: [:each | div text: each title; break];
		yourself.
	].
"
	aCollection do: aBlock.
%
category: 'other'
method: Html4Element
content: anObject
	"META
		CDATA	#REQUIRED
		associated information
	otherwise, element content"

	tag = 'meta'
		ifFalse: [self addChild: anObject asString]
		ifTrue: [anObject
			ifNil: [attributes removeKey: 'content' otherwise: nil]
			ifNotNil: [attributes at: 'content' put: anObject asString]].
%
category: 'other'
method: Html4Element
entityNumber: anInteger

	(anInteger isKindOf: Integer) ifFalse: [self error: anInteger printString , ' is not an Integer!'].
	self addChild: anInteger.
%
category: 'other'
method: Html4Element
id

	^attributes
		at: 'id'
		ifAbsentPut: ['id' , self asOop printString].
%
category: 'other'
method: Html4Element
if: aBoolean then: aBlock

	aBoolean ifTrue: aBlock.
%
category: 'other'
method: Html4Element
if: aBoolean then: trueBlock else: falseBlock

	aBoolean
		ifTrue: trueBlock
		ifFalse: falseBlock.
%
category: 'other'
method: Html4Element
initialize

	attributes := StringKeyValueDictionary new.
	children := Array new.
%
category: 'other'
method: Html4Element
initializeAsHtml

	self initialize.
	tag := 'html'.
	attributes
		at: 'xmlns' put: 'http://www.w3.org/1999/xhtml';
		at: 'xml:lang' put: 'en';
		at: 'lang' put: 'en';
		yourself.
	(self newChildWithTag: 'head')
		addTo: 'load()' script: '';
		meta: [:meta | meta httpEquiv: 'Content-Type'; content: 'text/html;charset=UTF-8'; yourself];
		yourself.
	(self newChildWithTag: 'body')
		onload: 'load()';
		yourself.
%
category: 'other'
method: Html4Element
initializeWithTag: aString

	self initialize.
	tag := aString.
%
category: 'other'
method: Html4Element
newChildWithTag: aString

	^self addChild: (self class withTag: aString).
%
category: 'other'
method: Html4Element
scriptForFunctionNamed: aString

	| string index name child |
	tag = 'script' ifFalse: [self error: 'Should only be called on a <script> element'].
	string := aString.
	(index := string indexOf: $( ) == 0 ifTrue: [string := aString , '()'. index := aString size + 1].
	name := string copyFrom: 1 to: index - 1.
	child := children
		detect: [:each | (each key copyFrom: 1 to: (each key size min: name size)) = name]
		ifNone: [children add: string -> String new].
	child key = string ifFalse: [self error: 'Function argument names are inconsistent: ' , child key printString , ' vs. ' , string printString , '!'].
	^child value.
%
category: 'other'
method: Html4Element
scriptForVariables

	| child |
	tag = 'script' ifFalse: [self error: 'Should only be called on a <script> element'].
	child := children
		detect: [:each | each key = '']
		ifNone: [children add: '' -> String new].
	^child value.
%
category: 'other'
method: Html4Element
tag

	^tag.
%
category: 'other'
method: Html4Element
withIdValue: aBlock

	aBlock value: self id.
%
set compile_env: 0
category: 'printing'
method: Html4Element
encode: aString on: aStream

	aString do: [:each |
		| index |
		index := #($" $& $' $< $>) indexOf: each.
		0 < index ifTrue: [
			aStream nextPutAll: (#('&quot;' '&amp;' '&#39;' '&lt;' '&gt;') at: index).
		] ifFalse: [
			aStream nextPut: each.
		].
	].
%
category: 'printing'
method: Html4Element
prettyPrintOn: aStream level: anInteger

	anInteger ifNil: [^self].
	aStream lf.
	anInteger timesRepeat: [aStream tab].
%
category: 'printing'
method: Html4Element
prettyPrintString

	| stream |
	stream := WriteStream on: String new.
	self printOn: stream level: 0.
	^stream contents.
%
category: 'printing'
method: Html4Element
printOn: aStream
	"nil for normal, 1 for pretty-print"

	^self printOn: aStream level: nil.
%
category: 'printing'
method: Html4Element
printOn: aStream level: anInteger

	| nextLevel preLevel |
	tag = 'script' ifTrue: [^self printScriptOn: aStream level: anInteger].
	tag = 'html' ifTrue: [
		aStream nextPutAll: '<!DOCTYPE html PUBLIC ''-//W3C//DTD XHTML 1.0 Strict//EN'' ''http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd''>'.
	].
	self prettyPrintOn: aStream level: anInteger.
	aStream
		nextPut: $<;
		nextPutAll: tag;
		yourself.
	attributes keysAndValuesDo: [:key :value |
		(value notNil and: [value notEmpty]) ifTrue: [
			(value isKindOf: String) ifFalse: [self error: 'Key ' , key printString , ' has value of ' , value printString , ' instead of a String'].
			aStream
				space;
				nextPutAll: key;
				nextPutAll: '="';
				yourself.
			self encode: value on: aStream.
			aStream nextPut: $".
		].
	].
	tag = 'br' ifTrue: [
		aStream nextPutAll: ' />'.
		^self.
	].
	"(children isEmpty and: [tag ~= 'textarea']) ifTrue: [
		aStream nextPutAll: ' />'.
		^self.
	]."
	aStream nextPut: $>.
	tag = 'style' ifTrue: [
		children do: [:each |
			self prettyPrintOn: aStream level: anInteger.
			aStream nextPutAll: each
		].	"should only be strings, and don't bother encoding"
		aStream nextPutAll: '</style>'.
		^self.
	].
	nextLevel := anInteger ifNil: [nil] ifNotNil: [anInteger + 1].
	preLevel := 0.
	children do: [:each |
		(each isKindOf: String) ifTrue: [self prettyPrintOn: aStream level: nextLevel. preLevel := self printString: each on: aStream preLevel: preLevel] ifFalse: [
		(each isKindOf: Integer) ifTrue: [aStream nextPutAll: '&#'. each printOn: aStream. aStream nextPut: $;] ifFalse: [
		(each == Character space) ifTrue: [aStream nextPutAll: '&nbsp;'] ifFalse: [
		each printOn: aStream level: nextLevel]]].
	].
	self prettyPrintOn: aStream level: anInteger.
	aStream
		nextPutAll: '</';
		nextPutAll: tag;
		nextPut: $>;
		yourself.
%
category: 'printing'
method: Html4Element
printScriptOn: aStream level: anInteger

	self prettyPrintOn: aStream level: anInteger.
	aStream nextPutAll: '<script type="text/javascript"><!--'; lf.
	children do: [:each |
		each key = '' ifTrue: [
			aStream nextPutAll: each value.
		] ifFalse: [
			aStream
				nextPutAll: 'function ';
				nextPutAll: each key;
				nextPutAll: ' {';
				lf;
				nextPutAll: each value;
				nextPutAll: '}';
				lf.
		].
	].
	aStream nextPutAll: '//--></script>'.
%
category: 'printing'
method: Html4Element
printString
	"Override to increase max size!"

	| ws str |
	str := String new.
	ws := PrintStream printingOn: str maxSize: 1000000.
	self printOn: ws.
	^ ws _collection
%
category: 'printing'
method: Html4Element
printString: aString on: aStream preLevel: anInteger
	"General solution to #44343 (see also OldBug>>#'makeHTMLCompatible:')"

	| i string |
	0 < anInteger ifTrue: [
		aStream nextPutAll: aString.
		^aString = (Character lf asString , '</pre>')
			ifTrue: [anInteger - 1]
			ifFalse: [anInteger].
	].
	aString = '<pre>' ifTrue: [
		aStream nextPutAll: aString.
		^anInteger + 1.
	].
	i := 1.
	[
		i <= aString size and: [(aString at: i) == Character tab].
	] whileTrue: [
		aStream nextPutAll: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.
		i := i + 1.
	].
	[
		i <= aString size and: [(aString at: i) == Character space].
	] whileTrue: [
		aStream nextPutAll: '&nbsp;'.
		i := i + 1.
	].
	string := 1 == i
		ifTrue: [aString]
		ifFalse: [aString copyFrom: i to: aString size].
	self encode: string on: aStream.
	^anInteger.
%
category: 'printing'
method: Html4Element
printStyleOn: aStream

	aStream nextPutAll: '<style type="text/css">'; lf.
	children do: [:each |
		aStream nextPutAll: each; lf.
	].
	aStream nextPutAll: '</style>'.
%
