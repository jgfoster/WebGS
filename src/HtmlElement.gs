! ------------------- Remove existing behavior from HtmlElement
removeAllMethods HtmlElement
removeAllClassMethods HtmlElement
! ------------------- Class methods for HtmlElement
! ------------------- Instance methods for HtmlElement
set compile_env: 0
category: 'Children'
method: HtmlElement
childrenWithTag: aString

	^children select: [:each | each tag = aString].
%
category: 'Children'
method: HtmlElement
childWithName: aString

	^children
		detect: [:each | each name = aString]
		ifNone: [nil].
%
category: 'Children'
method: HtmlElement
childWithTag: aString

	^children
		detect: [:each | each tag = aString]
		ifNone: [nil].
%
category: 'Children'
method: HtmlElement
labelForElement: anElement content: aString

	^(self labelWithContent: aString)
		for: anElement id;
		yourself.
%
category: 'Children'
method: HtmlElement
labelWithContent: aString

	| addSpaceFlag |
	aString isNil ifTrue: [^self].
	addSpaceFlag := false.
	^self label: [:label |
		aString subStrings do: [:each |
			addSpaceFlag ifTrue: [label space].
			label content: each.
			addSpaceFlag := true.
		].
		label.
	].
%
category: 'Children'
method: HtmlElement
listItemWithContent: aString

	^self li
		content: aString;
		yourself.
%
category: 'Children'
method: HtmlElement
space

	self addChild: Character space.
%
category: 'Children'
method: HtmlElement
spanWithClass: aString

	^self span
		class: aString;
		yourself.
%
category: 'Children'
method: HtmlElement
titleWithContent: aString

	^self title
		content: aString;
		yourself.
%
set compile_env: 0
category: 'Children-Form-Input'
method: HtmlElement
checkbox

	^self input
		type: 'checkbox';
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
checkbox: aBlock

	^aBlock value: self checkbox.
%
category: 'Children-Form-Input'
method: HtmlElement
checkboxNamed: nameString isChecked: aBoolean

	^self checkbox
		name: nameString;
		checked: aBoolean;
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
checkboxNamed: nameString isChecked: aBoolean label: textString

	| checkbox |
	checkbox := self checkbox
		name: nameString;
		checked: aBoolean;
		yourself.
	self labelForElement: checkbox content: textString.
	^checkbox.
%
category: 'Children-Form-Input'
method: HtmlElement
fileInput

	^self input
		type: 'file';
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
fileInput: aBlock

	^aBlock value: self fileInput.
%
category: 'Children-Form-Input'
method: HtmlElement
hiddenField

	^self input
		type: 'hidden';
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
hiddenField: aBlock

	^aBlock value: self hiddenField.
%
category: 'Children-Form-Input'
method: HtmlElement
hiddenFieldNamed: nameString value: valueString

	^self hiddenField
		name: nameString;
		value: valueString;
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
optionWithValue: valueString isSelected: aBoolean content: textString

	^self
		optionWithValue: valueString
		isSelected: aBoolean
		isDisabled: false
		content: textString.
%
category: 'Children-Form-Input'
method: HtmlElement
optionWithValue: valueString isSelected: selectedBoolean isDisabled: disabledBoolean content: textString

	| option |
	option := self option
		value: valueString;
		content: textString;
		yourself.
	selectedBoolean ifTrue: [option selected: true].
	disabledBoolean ifTrue: [option disabled: true].
	^option.
%
category: 'Children-Form-Input'
method: HtmlElement
radioButton

	^self input
		type: 'radio';
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
radioButton: aBlock

	^aBlock value: self radioButton.
%
category: 'Children-Form-Input'
method: HtmlElement
radioButtonNamed: nameString value: valueString isChecked: aBoolean label: textString

	| radioButton |
	radioButton := self radioButton
		name: nameString;
		value: valueString;
		checked: aBoolean;
		yourself.
	self labelForElement: radioButton content: textString.
	^radioButton.
%
category: 'Children-Form-Input'
method: HtmlElement
submitButton

	^self input
		type: 'submit';
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
submitButton: aBlock

	^aBlock value: self submitButton.
%
category: 'Children-Form-Input'
method: HtmlElement
submitButtonWithLabel: aString

	^self submitButton
		name: 'submit';
		value: aString;
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
textInput

	^self input
		type: 'text';
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
textInput: aBlock

	^aBlock value: self textInput.
%
category: 'Children-Form-Input'
method: HtmlElement
textInputNamed: nameString

	^self textInput
		name: nameString;
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
textInputNamed: nameString class: classString

	^(self textInputNamed: nameString)
		class: classString;
		yourself.
%
category: 'Children-Form-Input'
method: HtmlElement
textInputNamed: nameString class: classString value: valueString

	^(self
		textInputNamed: nameString
		class: classString)
		value: valueString;
		yourself.
%
