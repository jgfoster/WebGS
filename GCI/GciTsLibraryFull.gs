! ------------------- Remove existing behavior from GciTsLibraryFull
removeAllMethods GciTsLibraryFull
removeAllClassMethods GciTsLibraryFull
! ------------------- Class methods for GciTsLibraryFull
set compile_env: 0
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciFree_inLibrary: cLibrary

	FunctionGciFree := CCallout
		library: cLibrary
		name: 'GciFree'
		result: #'void'
		args: #(#'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciHostCallDebuggerMsg_inLibrary: cLibrary

	FunctionGciHostCallDebuggerMsg := CCallout
		library: cLibrary
		name: 'GciHostCallDebuggerMsg'
		result: #'int32'
		args: #(#'const char*')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciHostFtime_inLibrary: cLibrary

	FunctionGciHostFtime := CCallout
		library: cLibrary
		name: 'GciHostFtime'
		result: #'void'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciHostMilliSleep_inLibrary: cLibrary

	FunctionGciHostMilliSleep := CCallout
		library: cLibrary
		name: 'GciHostMilliSleep'
		result: #'void'
		args: #(#'uint32')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciI32ToOop_inLibrary: cLibrary

	FunctionGciI32ToOop := CCallout
		library: cLibrary
		name: 'GciI32ToOop'
		result: #'uint64'
		args: #(#'int32')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciMalloc_inLibrary: cLibrary

	FunctionGciMalloc := CCallout
		library: cLibrary
		name: 'GciMalloc'
		result: #'ptr'
		args: #(#'uint64' #'int32')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciNextUtf8Character_inLibrary: cLibrary

	FunctionGciNextUtf8Character := CCallout
		library: cLibrary
		name: 'GciNextUtf8Character'
		result: #'int64'
		args: #(#'const char*' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciRtlIsLoaded_inLibrary: cLibrary

	FunctionGciRtlIsLoaded := CCallout
		library: cLibrary
		name: 'GciRtlIsLoaded'
		result: #'int32'
		args: #()
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciRtlLoad_inLibrary: cLibrary

	FunctionGciRtlLoad := CCallout
		library: cLibrary
		name: 'GciRtlLoad'
		result: #'int32'
		args: #(#'int32' #'const char*' #'ptr' #'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciRtlLoadA_inLibrary: cLibrary

	FunctionGciRtlLoadA := CCallout
		library: cLibrary
		name: 'GciRtlLoadA'
		result: #'int32'
		args: #(#'int32' #'const char*' #'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciRtlUnload_inLibrary: cLibrary

	FunctionGciRtlUnload := CCallout
		library: cLibrary
		name: 'GciRtlUnload'
		result: #'void'
		args: #()
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciShutdown_inLibrary: cLibrary

	FunctionGciShutdown := CCallout
		library: cLibrary
		name: 'GciShutdown'
		result: #'void'
		args: #()
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTimeStampMsStr_inLibrary: cLibrary

	FunctionGciTimeStampMsStr := CCallout
		library: cLibrary
		name: 'GciTimeStampMsStr'
		result: #'void'
		args: #(#'int64' #'uint16' #'ptr' #'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsAbort_inLibrary: cLibrary

	FunctionGciTsAbort := CCallout
		library: cLibrary
		name: 'GciTsAbort'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsBegin_inLibrary: cLibrary

	FunctionGciTsBegin := CCallout
		library: cLibrary
		name: 'GciTsBegin'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsBreak_inLibrary: cLibrary

	FunctionGciTsBreak := CCallout
		library: cLibrary
		name: 'GciTsBreak'
		result: #'int32'
		args: #(#'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsCallInProgress_inLibrary: cLibrary

	FunctionGciTsCallInProgress := CCallout
		library: cLibrary
		name: 'GciTsCallInProgress'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsCancelWaitForEvent_inLibrary: cLibrary

	FunctionGciTsCancelWaitForEvent := CCallout
		library: cLibrary
		name: 'GciTsCancelWaitForEvent'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsCharToOop_inLibrary: cLibrary

	FunctionGciTsCharToOop := CCallout
		library: cLibrary
		name: 'GciTsCharToOop'
		result: #'uint64'
		args: #(#'uint32')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsClassRemoveAllMethods_inLibrary: cLibrary

	FunctionGciTsClassRemoveAllMethods := CCallout
		library: cLibrary
		name: 'GciTsClassRemoveAllMethods'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'uint16' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsClearStack_inLibrary: cLibrary

	FunctionGciTsClearStack := CCallout
		library: cLibrary
		name: 'GciTsClearStack'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsCommit_inLibrary: cLibrary

	FunctionGciTsCommit := CCallout
		library: cLibrary
		name: 'GciTsCommit'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsCompileMethod_inLibrary: cLibrary

	FunctionGciTsCompileMethod := CCallout
		library: cLibrary
		name: 'GciTsCompileMethod'
		result: #'uint64'
		args: #(#'ptr' #'uint64' #'uint64' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsContinueWith_inLibrary: cLibrary

	FunctionGciTsContinueWith := CCallout
		library: cLibrary
		name: 'GciTsContinueWith'
		result: #'uint64'
		args: #(#'ptr' #'uint64' #'uint64' #'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsDirtyObjsInit_inLibrary: cLibrary

	FunctionGciTsDirtyObjsInit := CCallout
		library: cLibrary
		name: 'GciTsDirtyObjsInit'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsDoubleToOop_inLibrary: cLibrary

	FunctionGciTsDoubleToOop := CCallout
		library: cLibrary
		name: 'GciTsDoubleToOop'
		result: #'uint64'
		args: #(#'ptr' #'double' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsDoubleToSmallDouble_inLibrary: cLibrary

	FunctionGciTsDoubleToSmallDouble := CCallout
		library: cLibrary
		name: 'GciTsDoubleToSmallDouble'
		result: #'uint64'
		args: #(#'double')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsEncrypt_inLibrary: cLibrary

	FunctionGciTsEncrypt := CCallout
		library: cLibrary
		name: 'GciTsEncrypt'
		result: #'char*'
		args: #(#'const char*' #'ptr' #'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsExecute__inLibrary: cLibrary

	FunctionGciTsExecute_ := CCallout
		library: cLibrary
		name: 'GciTsExecute_'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'int64' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsExecute_inLibrary: cLibrary

	FunctionGciTsExecute := CCallout
		library: cLibrary
		name: 'GciTsExecute'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsExecuteFetchBytes_inLibrary: cLibrary

	FunctionGciTsExecuteFetchBytes := CCallout
		library: cLibrary
		name: 'GciTsExecuteFetchBytes'
		result: #'int64'
		args: #(#'ptr' #'const char*' #'int64' #'uint64' #'uint64' #'uint64' #'ptr' #'int64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchBytes_inLibrary: cLibrary

	FunctionGciTsFetchBytes := CCallout
		library: cLibrary
		name: 'GciTsFetchBytes'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'int64' #'ptr' #'int64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchChars_inLibrary: cLibrary

	FunctionGciTsFetchChars := CCallout
		library: cLibrary
		name: 'GciTsFetchChars'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'int64' #'ptr' #'int64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchClass_inLibrary: cLibrary

	FunctionGciTsFetchClass := CCallout
		library: cLibrary
		name: 'GciTsFetchClass'
		result: #'uint64'
		args: #(#'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchObjInfo_inLibrary: cLibrary

	FunctionGciTsFetchObjInfo := CCallout
		library: cLibrary
		name: 'GciTsFetchObjInfo'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'int32' #'ptr' #'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchOops_inLibrary: cLibrary

	FunctionGciTsFetchOops := CCallout
		library: cLibrary
		name: 'GciTsFetchOops'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'int64' #'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchSize_inLibrary: cLibrary

	FunctionGciTsFetchSize := CCallout
		library: cLibrary
		name: 'GciTsFetchSize'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchSpecialClass_inLibrary: cLibrary

	FunctionGciTsFetchSpecialClass := CCallout
		library: cLibrary
		name: 'GciTsFetchSpecialClass'
		result: #'uint64'
		args: #(#'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchTraversal_inLibrary: cLibrary

	FunctionGciTsFetchTraversal := CCallout
		library: cLibrary
		name: 'GciTsFetchTraversal'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'int32' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchUnicode_inLibrary: cLibrary

	FunctionGciTsFetchUnicode := CCallout
		library: cLibrary
		name: 'GciTsFetchUnicode'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'ptr' #'int64' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchUtf8_inLibrary: cLibrary

	FunctionGciTsFetchUtf8 := CCallout
		library: cLibrary
		name: 'GciTsFetchUtf8'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'ptr' #'int64' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchUtf8Bytes_inLibrary: cLibrary

	FunctionGciTsFetchUtf8Bytes := CCallout
		library: cLibrary
		name: 'GciTsFetchUtf8Bytes'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'int64' #'ptr' #'int64' #'ptr' #'ptr' #'int32')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsFetchVaryingSize_inLibrary: cLibrary

	FunctionGciTsFetchVaryingSize := CCallout
		library: cLibrary
		name: 'GciTsFetchVaryingSize'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsGemTrace_inLibrary: cLibrary

	FunctionGciTsGemTrace := CCallout
		library: cLibrary
		name: 'GciTsGemTrace'
		result: #'int32'
		args: #(#'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsGetFreeOops_inLibrary: cLibrary

	FunctionGciTsGetFreeOops := CCallout
		library: cLibrary
		name: 'GciTsGetFreeOops'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsI32ToOop_inLibrary: cLibrary

	FunctionGciTsI32ToOop := CCallout
		library: cLibrary
		name: 'GciTsI32ToOop'
		result: #'uint64'
		args: #(#'int32')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsI64ToOop_inLibrary: cLibrary

	FunctionGciTsI64ToOop := CCallout
		library: cLibrary
		name: 'GciTsI64ToOop'
		result: #'uint64'
		args: #(#'ptr' #'int64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsIsKindOf_inLibrary: cLibrary

	FunctionGciTsIsKindOf := CCallout
		library: cLibrary
		name: 'GciTsIsKindOf'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsIsKindOfClass_inLibrary: cLibrary

	FunctionGciTsIsKindOfClass := CCallout
		library: cLibrary
		name: 'GciTsIsKindOfClass'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsIsSubclassOf_inLibrary: cLibrary

	FunctionGciTsIsSubclassOf := CCallout
		library: cLibrary
		name: 'GciTsIsSubclassOf'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsIsSubclassOfClass_inLibrary: cLibrary

	FunctionGciTsIsSubclassOfClass := CCallout
		library: cLibrary
		name: 'GciTsIsSubclassOfClass'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsLoad_inLibrary: cLibrary

	FunctionGciTsLoad := CCallout
		library: cLibrary
		name: 'GciTsLoad'
		result: #'int32'
		args: #(#'const char*' #'ptr' #'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsLogin_inLibrary: cLibrary

	FunctionGciTsLogin := CCallout
		library: cLibrary
		name: 'GciTsLogin'
		result: #'ptr'
		args: #(#'const char*' #'const char*' #'const char*' #'int32' #'const char*' #'const char*' #'const char*' #'uint32' #'int32' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsLogout_inLibrary: cLibrary

	FunctionGciTsLogout := CCallout
		library: cLibrary
		name: 'GciTsLogout'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsMoreTraversal_inLibrary: cLibrary

	FunctionGciTsMoreTraversal := CCallout
		library: cLibrary
		name: 'GciTsMoreTraversal'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNbExecute_inLibrary: cLibrary

	FunctionGciTsNbExecute := CCallout
		library: cLibrary
		name: 'GciTsNbExecute'
		result: #'int32'
		args: #(#'ptr' #'const char*' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNbLogin_inLibrary: cLibrary

	FunctionGciTsNbLogin := CCallout
		library: cLibrary
		name: 'GciTsNbLogin'
		result: #'ptr'
		args: #(#'const char*' #'const char*' #'const char*' #'int32' #'const char*' #'const char*' #'const char*' #'uint32' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNbLoginFinished_inLibrary: cLibrary

	FunctionGciTsNbLoginFinished := CCallout
		library: cLibrary
		name: 'GciTsNbLoginFinished'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNbLogout_inLibrary: cLibrary

	FunctionGciTsNbLogout := CCallout
		library: cLibrary
		name: 'GciTsNbLogout'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNbPerform_inLibrary: cLibrary

	FunctionGciTsNbPerform := CCallout
		library: cLibrary
		name: 'GciTsNbPerform'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'uint64' #'const char*' #'ptr' #'int32' #'int32' #'uint16' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNbResult_inLibrary: cLibrary

	FunctionGciTsNbResult := CCallout
		library: cLibrary
		name: 'GciTsNbResult'
		result: #'uint64'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewByteArray_inLibrary: cLibrary

	FunctionGciTsNewByteArray := CCallout
		library: cLibrary
		name: 'GciTsNewByteArray'
		result: #'uint64'
		args: #(#'ptr' #'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewObj_inLibrary: cLibrary

	FunctionGciTsNewObj := CCallout
		library: cLibrary
		name: 'GciTsNewObj'
		result: #'uint64'
		args: #(#'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewString__inLibrary: cLibrary

	FunctionGciTsNewString_ := CCallout
		library: cLibrary
		name: 'GciTsNewString_'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewString_inLibrary: cLibrary

	FunctionGciTsNewString := CCallout
		library: cLibrary
		name: 'GciTsNewString'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewSymbol_inLibrary: cLibrary

	FunctionGciTsNewSymbol := CCallout
		library: cLibrary
		name: 'GciTsNewSymbol'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewUnicodeString__inLibrary: cLibrary

	FunctionGciTsNewUnicodeString_ := CCallout
		library: cLibrary
		name: 'GciTsNewUnicodeString_'
		result: #'uint64'
		args: #(#'ptr' #'ptr' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewUnicodeString_inLibrary: cLibrary

	FunctionGciTsNewUnicodeString := CCallout
		library: cLibrary
		name: 'GciTsNewUnicodeString'
		result: #'uint64'
		args: #(#'ptr' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewUtf8String__inLibrary: cLibrary

	FunctionGciTsNewUtf8String_ := CCallout
		library: cLibrary
		name: 'GciTsNewUtf8String_'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'uint64' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsNewUtf8String_inLibrary: cLibrary

	FunctionGciTsNewUtf8String := CCallout
		library: cLibrary
		name: 'GciTsNewUtf8String'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsObjExists_inLibrary: cLibrary

	FunctionGciTsObjExists := CCallout
		library: cLibrary
		name: 'GciTsObjExists'
		result: #'int32'
		args: #(#'ptr' #'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsOopIsSpecial_inLibrary: cLibrary

	FunctionGciTsOopIsSpecial := CCallout
		library: cLibrary
		name: 'GciTsOopIsSpecial'
		result: #'int32'
		args: #(#'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsOopToChar_inLibrary: cLibrary

	FunctionGciTsOopToChar := CCallout
		library: cLibrary
		name: 'GciTsOopToChar'
		result: #'int32'
		args: #(#'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsOopToDouble_inLibrary: cLibrary

	FunctionGciTsOopToDouble := CCallout
		library: cLibrary
		name: 'GciTsOopToDouble'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsOopToI64_inLibrary: cLibrary

	FunctionGciTsOopToI64 := CCallout
		library: cLibrary
		name: 'GciTsOopToI64'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsPerform_inLibrary: cLibrary

	FunctionGciTsPerform := CCallout
		library: cLibrary
		name: 'GciTsPerform'
		result: #'uint64'
		args: #(#'ptr' #'uint64' #'uint64' #'const char*' #'ptr' #'int32' #'int32' #'uint16' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsPerformFetchBytes_inLibrary: cLibrary

	FunctionGciTsPerformFetchBytes := CCallout
		library: cLibrary
		name: 'GciTsPerformFetchBytes'
		result: #'int64'
		args: #(#'ptr' #'uint64' #'const char*' #'ptr' #'int32' #'ptr' #'int64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsProtectMethods_inLibrary: cLibrary

	FunctionGciTsProtectMethods := CCallout
		library: cLibrary
		name: 'GciTsProtectMethods'
		result: #'int32'
		args: #(#'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsReleaseAllObjs_inLibrary: cLibrary

	FunctionGciTsReleaseAllObjs := CCallout
		library: cLibrary
		name: 'GciTsReleaseAllObjs'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsReleaseObjs_inLibrary: cLibrary

	FunctionGciTsReleaseObjs := CCallout
		library: cLibrary
		name: 'GciTsReleaseObjs'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsRemoveOopsFromNsc_inLibrary: cLibrary

	FunctionGciTsRemoveOopsFromNsc := CCallout
		library: cLibrary
		name: 'GciTsRemoveOopsFromNsc'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsResolveSymbol_inLibrary: cLibrary

	FunctionGciTsResolveSymbol := CCallout
		library: cLibrary
		name: 'GciTsResolveSymbol'
		result: #'uint64'
		args: #(#'ptr' #'const char*' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsResolveSymbolObj_inLibrary: cLibrary

	FunctionGciTsResolveSymbolObj := CCallout
		library: cLibrary
		name: 'GciTsResolveSymbolObj'
		result: #'uint64'
		args: #(#'ptr' #'uint64' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsSaveObjs_inLibrary: cLibrary

	FunctionGciTsSaveObjs := CCallout
		library: cLibrary
		name: 'GciTsSaveObjs'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsSessionIsRemote_inLibrary: cLibrary

	FunctionGciTsSessionIsRemote := CCallout
		library: cLibrary
		name: 'GciTsSessionIsRemote'
		result: #'int32'
		args: #(#'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsSocket_inLibrary: cLibrary

	FunctionGciTsSocket := CCallout
		library: cLibrary
		name: 'GciTsSocket'
		result: #'int32'
		args: #(#'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsStoreBytes_inLibrary: cLibrary

	FunctionGciTsStoreBytes := CCallout
		library: cLibrary
		name: 'GciTsStoreBytes'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'int64' #'ptr' #'int64' #'uint64' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsStoreOops_inLibrary: cLibrary

	FunctionGciTsStoreOops := CCallout
		library: cLibrary
		name: 'GciTsStoreOops'
		result: #'int32'
		args: #(#'ptr' #'uint64' #'int64' #'ptr' #'int32' #'ptr' #'int32')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsStoreTrav_inLibrary: cLibrary

	FunctionGciTsStoreTrav := CCallout
		library: cLibrary
		name: 'GciTsStoreTrav'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsStoreTravDoTravRefs_inLibrary: cLibrary

	FunctionGciTsStoreTravDoTravRefs := CCallout
		library: cLibrary
		name: 'GciTsStoreTravDoTravRefs'
		result: #'int32'
		args: #(#'ptr' #'ptr' #'int32' #'ptr' #'int32' #'ptr' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsVersion_inLibrary: cLibrary

	FunctionGciTsVersion := CCallout
		library: cLibrary
		name: 'GciTsVersion'
		result: #'uint32'
		args: #(#'ptr' #'uint64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsWaitForEvent_inLibrary: cLibrary

	FunctionGciTsWaitForEvent := CCallout
		library: cLibrary
		name: 'GciTsWaitForEvent'
		result: #'int32'
		args: #(#'ptr' #'int32' #'int32' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciTsX509Login_inLibrary: cLibrary

	FunctionGciTsX509Login := CCallout
		library: cLibrary
		name: 'GciTsX509Login'
		result: #'ptr'
		args: #(#'ptr' #'ptr' #'ptr')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciUnload_inLibrary: cLibrary

	FunctionGciUnload := CCallout
		library: cLibrary
		name: 'GciUnload'
		result: #'void'
		args: #()
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunction_GciUtf8To8bit_inLibrary: cLibrary

	FunctionGciUtf8To8bit := CCallout
		library: cLibrary
		name: 'GciUtf8To8bit'
		result: #'int32'
		args: #(#'const char*' #'ptr' #'int64')
		varArgsAfter: -1.
%
category: 'Initializing - private'
classmethod: GciTsLibraryFull
initializeFunctions

	| library |
	library := CLibrary named: '$GEMSTONE/lib/libgcits-' , (System gemVersionAt: 'gsVersion') , '-64.dylib'.
	self
		initializeFunction_GciFree_inLibrary: library;
		initializeFunction_GciHostCallDebuggerMsg_inLibrary: library;
		initializeFunction_GciHostFtime_inLibrary: library;
		initializeFunction_GciHostMilliSleep_inLibrary: library;
		initializeFunction_GciI32ToOop_inLibrary: library;
		initializeFunction_GciMalloc_inLibrary: library;
		initializeFunction_GciNextUtf8Character_inLibrary: library;
		initializeFunction_GciRtlIsLoaded_inLibrary: library;
		initializeFunction_GciRtlLoad_inLibrary: library;
		initializeFunction_GciRtlLoadA_inLibrary: library;
		initializeFunction_GciRtlUnload_inLibrary: library;
		initializeFunction_GciShutdown_inLibrary: library;
		initializeFunction_GciTimeStampMsStr_inLibrary: library;
		initializeFunction_GciTsAbort_inLibrary: library;
		initializeFunction_GciTsBegin_inLibrary: library;
		initializeFunction_GciTsBreak_inLibrary: library;
		initializeFunction_GciTsCallInProgress_inLibrary: library;
		initializeFunction_GciTsCancelWaitForEvent_inLibrary: library;
		initializeFunction_GciTsCharToOop_inLibrary: library;
		initializeFunction_GciTsClassRemoveAllMethods_inLibrary: library;
		initializeFunction_GciTsClearStack_inLibrary: library;
		initializeFunction_GciTsCommit_inLibrary: library;
		initializeFunction_GciTsCompileMethod_inLibrary: library;
		initializeFunction_GciTsContinueWith_inLibrary: library;
		initializeFunction_GciTsDirtyObjsInit_inLibrary: library;
		initializeFunction_GciTsDoubleToOop_inLibrary: library;
		initializeFunction_GciTsDoubleToSmallDouble_inLibrary: library;
		initializeFunction_GciTsEncrypt_inLibrary: library;
		initializeFunction_GciTsExecute_inLibrary: library;
		initializeFunction_GciTsExecute__inLibrary: library;
		initializeFunction_GciTsExecuteFetchBytes_inLibrary: library;
		initializeFunction_GciTsFetchBytes_inLibrary: library;
		initializeFunction_GciTsFetchChars_inLibrary: library;
		initializeFunction_GciTsFetchClass_inLibrary: library;
		initializeFunction_GciTsFetchObjInfo_inLibrary: library;
		initializeFunction_GciTsFetchOops_inLibrary: library;
		initializeFunction_GciTsFetchSize_inLibrary: library;
		initializeFunction_GciTsFetchSpecialClass_inLibrary: library;
		initializeFunction_GciTsFetchTraversal_inLibrary: library;
		initializeFunction_GciTsFetchUnicode_inLibrary: library;
		initializeFunction_GciTsFetchUtf8_inLibrary: library;
		initializeFunction_GciTsFetchUtf8Bytes_inLibrary: library;
		initializeFunction_GciTsFetchVaryingSize_inLibrary: library;
		initializeFunction_GciTsGemTrace_inLibrary: library;
		initializeFunction_GciTsGetFreeOops_inLibrary: library;
		initializeFunction_GciTsI32ToOop_inLibrary: library;
		initializeFunction_GciTsI64ToOop_inLibrary: library;
		initializeFunction_GciTsIsKindOf_inLibrary: library;
		initializeFunction_GciTsIsKindOfClass_inLibrary: library;
		initializeFunction_GciTsIsSubclassOf_inLibrary: library;
		initializeFunction_GciTsIsSubclassOfClass_inLibrary: library;
		initializeFunction_GciTsLoad_inLibrary: library;
		initializeFunction_GciTsLogin_inLibrary: library;
		initializeFunction_GciTsLogout_inLibrary: library;
		initializeFunction_GciTsMoreTraversal_inLibrary: library;
		initializeFunction_GciTsNbExecute_inLibrary: library;
		initializeFunction_GciTsNbLogin_inLibrary: library;
		initializeFunction_GciTsNbLoginFinished_inLibrary: library;
		initializeFunction_GciTsNbLogout_inLibrary: library;
		initializeFunction_GciTsNbPerform_inLibrary: library;
		initializeFunction_GciTsNbResult_inLibrary: library;
		initializeFunction_GciTsNewByteArray_inLibrary: library;
		initializeFunction_GciTsNewObj_inLibrary: library;
		initializeFunction_GciTsNewString_inLibrary: library;
		initializeFunction_GciTsNewString__inLibrary: library;
		initializeFunction_GciTsNewSymbol_inLibrary: library;
		initializeFunction_GciTsNewUnicodeString_inLibrary: library;
		initializeFunction_GciTsNewUnicodeString__inLibrary: library;
		initializeFunction_GciTsNewUtf8String_inLibrary: library;
		initializeFunction_GciTsNewUtf8String__inLibrary: library;
		initializeFunction_GciTsObjExists_inLibrary: library;
		initializeFunction_GciTsOopIsSpecial_inLibrary: library;
		initializeFunction_GciTsOopToChar_inLibrary: library;
		initializeFunction_GciTsOopToDouble_inLibrary: library;
		initializeFunction_GciTsOopToI64_inLibrary: library;
		initializeFunction_GciTsPerform_inLibrary: library;
		initializeFunction_GciTsPerformFetchBytes_inLibrary: library;
		initializeFunction_GciTsProtectMethods_inLibrary: library;
		initializeFunction_GciTsReleaseAllObjs_inLibrary: library;
		initializeFunction_GciTsReleaseObjs_inLibrary: library;
		initializeFunction_GciTsRemoveOopsFromNsc_inLibrary: library;
		initializeFunction_GciTsResolveSymbol_inLibrary: library;
		initializeFunction_GciTsResolveSymbolObj_inLibrary: library;
		initializeFunction_GciTsSaveObjs_inLibrary: library;
		initializeFunction_GciTsSessionIsRemote_inLibrary: library;
		initializeFunction_GciTsSocket_inLibrary: library;
		initializeFunction_GciTsStoreBytes_inLibrary: library;
		initializeFunction_GciTsStoreOops_inLibrary: library;
		initializeFunction_GciTsStoreTrav_inLibrary: library;
		initializeFunction_GciTsStoreTravDoTravRefs_inLibrary: library;
		initializeFunction_GciTsVersion_inLibrary: library;
		initializeFunction_GciTsWaitForEvent_inLibrary: library;
		initializeFunction_GciTsX509Login_inLibrary: library;
		initializeFunction_GciUnload_inLibrary: library;
		initializeFunction_GciUtf8To8bit_inLibrary: library;
		yourself.
%
! ------------------- Instance methods for GciTsLibraryFull
set compile_env: 0
category: 'Functions'
method: GciTsLibraryFull
GciFree_: ptr
	"$GEMSTONE/include/gcits.hf line 1391
void GciFree(void* ptr) ;"

	"Interpreted as #void from #( #'ptr' )"

	^FunctionGciFree callWith: { ptr }
%
category: 'Functions'
method: GciTsLibraryFull
GciHostCallDebuggerMsg_: msg
	"$GEMSTONE/include/gcits.hf line 1384
int GciHostCallDebuggerMsg(const char* msg) ;"

	"Interpreted as #int32 from #( #'const char*' )"

	^FunctionGciHostCallDebuggerMsg callWith: { msg }
%
category: 'Functions'
method: GciTsLibraryFull
GciHostFtime_: sec _: millitm
	"$GEMSTONE/include/gcits.hf line 1398
void GciHostFtime(time_t *sec, unsigned short *millitm) ;"

	"Interpreted as #void from #( #'ptr' #'ptr' )"

	^FunctionGciHostFtime callWith: { sec. millitm }
%
category: 'Functions'
method: GciTsLibraryFull
GciHostMilliSleep_: milliSeconds
	"$GEMSTONE/include/gcits.hf line 1401
void GciHostMilliSleep(unsigned int milliSeconds) ;"

	"Interpreted as #void from #( #'uint32' )"

	^FunctionGciHostMilliSleep callWith: { milliSeconds }
%
category: 'Functions'
method: GciTsLibraryFull
GciI32ToOop_: arg
	"$GEMSTONE/include/gcits.hf line 1205
OopType GciI32ToOop(int arg) ;"

	"Interpreted as #uint64 from #( #'int32' )"

	^FunctionGciI32ToOop callWith: { arg }
%
category: 'Functions'
method: GciTsLibraryFull
GciMalloc_: length _: lineNum
	"$GEMSTONE/include/gcits.hf line 1381
void*GciMalloc(size_t length, int lineNum) ;"

	"Interpreted as #ptr from #( #'uint64' #'int32' )"

	^FunctionGciMalloc callWith: { length. lineNum }
%
category: 'Functions'
method: GciTsLibraryFull
GciNextUtf8Character_: src _: len _: chOut
	"$GEMSTONE/include/gcits.hf line 1341
ssize_t GciNextUtf8Character(const char* src,       size_t len,       uint *chOut) ;"

	"Interpreted as #int64 from #( #'const char*' #'uint64' #'ptr' )"

	^FunctionGciNextUtf8Character callWith: { src. len. chOut }
%
category: 'Functions'
method: GciTsLibraryFull
GciRtlIsLoaded
	"$GEMSTONE/include/gcirtl.hf line 94
BoolType GciRtlIsLoaded(void);"

	"Interpreted as #int32 from #( )"

	^FunctionGciRtlIsLoaded callWith: {  }
%
category: 'Functions'
method: GciTsLibraryFull
GciRtlLoad_: useRpc _: path _: errBuf _: errBufSize
	"$GEMSTONE/include/gcirtl.hf line 65
BoolType GciRtlLoad(BoolType useRpc, const char *path,    char errBuf[], size_t errBufSize);"

	"Interpreted as #int32 from #( #'int32' #'const char*' #'ptr' #'uint64' )"

	^FunctionGciRtlLoad callWith: { useRpc. path. errBuf. errBufSize }
%
category: 'Functions'
method: GciTsLibraryFull
GciRtlLoadA_: useRpc _: path _: errBuf _: errBufSize _: vmLibPath
	"$GEMSTONE/include/gcirtl.hf line 68
BoolType GciRtlLoadA(BoolType useRpc, const char *path,    char errBuf[], size_t errBufSize, GciRtlFnameBuf *vmLibPath );"

	"Interpreted as #int32 from #( #'int32' #'const char*' #'ptr' #'uint64' #'ptr' )"

	^FunctionGciRtlLoadA callWith: { useRpc. path. errBuf. errBufSize. vmLibPath }
%
category: 'Functions'
method: GciTsLibraryFull
GciRtlUnload
	"$GEMSTONE/include/gcirtl.hf line 90
void GciRtlUnload(void);"

	"Interpreted as #void from #( )"

	^FunctionGciRtlUnload callWith: {  }
%
category: 'Functions'
method: GciTsLibraryFull
GciShutdown
	"$GEMSTONE/include/gcits.hf line 1374
void GciShutdown() ;"

	"Interpreted as #void from #( )"

	^FunctionGciShutdown callWith: {  }
%
category: 'Functions'
method: GciTsLibraryFull
GciTimeStampMsStr_: seconds _: milliSeconds _: result _: resultSize
	"$GEMSTONE/include/gcits.hf line 1394
void GciTimeStampMsStr(time_t seconds, unsigned short milliSeconds,                char *result, size_t resultSize) ;"

	"Interpreted as #void from #( #'int64' #'uint16' #'ptr' #'uint64' )"

	^FunctionGciTimeStampMsStr callWith: { seconds. milliSeconds. result. resultSize }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsAbort_: sess _: err
	"$GEMSTONE/include/gcits.hf line 962
BoolType GciTsAbort(GciSession sess,        GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsAbort callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsBegin_: sess _: err
	"$GEMSTONE/include/gcits.hf line 970
BoolType GciTsBegin(GciSession sess,        GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsBegin callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsBreak_: sess _: hard _: err
	"$GEMSTONE/include/gcits.hf line 1248
BoolType GciTsBreak(GciSession sess,        BoolType hard,        GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsBreak callWith: { sess. hard. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsCallInProgress_: sess _: err
	"$GEMSTONE/include/gcits.hf line 954
int GciTsCallInProgress(GciSession sess,     GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsCallInProgress callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsCancelWaitForEvent_: sess _: err
	"$GEMSTONE/include/gcits.hf line 1293
BoolType GciTsCancelWaitForEvent(GciSession sess,       GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsCancelWaitForEvent callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsCharToOop_: ch
	"$GEMSTONE/include/gcits.hf line 1147
OopType GciTsCharToOop(uint ch) ;"

	"Interpreted as #uint64 from #( #'uint32' )"

	^FunctionGciTsCharToOop callWith: { ch }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsClassRemoveAllMethods_: sess _: aClass _: environmentId _: err
	"$GEMSTONE/include/gcits.hf line 872
BoolType GciTsClassRemoveAllMethods(GciSession sess,          OopType aClass,          ushort environmentId,          GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'uint16' #'ptr' )"

	^FunctionGciTsClassRemoveAllMethods callWith: { sess. aClass. environmentId. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsClearStack_: sess _: gsProcess _: err
	"$GEMSTONE/include/gcits.hf line 724
BoolType GciTsClearStack(GciSession sess,      OopType gsProcess,      GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsClearStack callWith: { sess. gsProcess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsCommit_: sess _: err
	"$GEMSTONE/include/gcits.hf line 978
BoolType GciTsCommit(GciSession sess,         GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsCommit callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsCompileMethod_: sess _: source _: aClass _: category _: symbolList _: overrideSelector _: compileFlags _: environmentId _: err
	"$GEMSTONE/include/gcits.hf line 911
OopType GciTsCompileMethod(GciSession sess,        OopType source,        OopType aClass,        OopType category,        OopType symbolList,        OopType overrideSelector,        int compileFlags,        ushort environmentId,        GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'uint64' #'uint64' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr' )"

	^FunctionGciTsCompileMethod callWith: { sess. source. aClass. category. symbolList. overrideSelector. compileFlags. environmentId. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsContinueWith_: sess _: gsProcess _: replaceTopOfStack _: continueWithError _: flags _: err
	"$GEMSTONE/include/gcits.hf line 939
OopType GciTsContinueWith(GciSession sess,       OopType gsProcess,       OopType replaceTopOfStack,       GciErrSType *continueWithError,       int flags,       GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'uint64' #'uint64' #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsContinueWith callWith: { sess. gsProcess. replaceTopOfStack. continueWithError. flags. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsDirtyObjsInit_: sess _: err
	"$GEMSTONE/include/gcits.hf line 1162
BoolType GciTsDirtyObjsInit(GciSession sess, GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsDirtyObjsInit callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsDoubleToOop_: sess _: aDouble _: err
	"$GEMSTONE/include/gcits.hf line 1182
OopType GciTsDoubleToOop(GciSession sess,        double aDouble,        GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'double' #'ptr' )"

	^FunctionGciTsDoubleToOop callWith: { sess. aDouble. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsDoubleToSmallDouble_: aFloat
	"$GEMSTONE/include/gcits.hf line 1171
OopType GciTsDoubleToSmallDouble(double aFloat) ;"

	"Interpreted as #uint64 from #( #'double' )"

	^FunctionGciTsDoubleToSmallDouble callWith: { aFloat }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsEncrypt_: password _: outBuf _: outBuffSize
	"$GEMSTONE/include/gcits.hf line 39
char* GciTsEncrypt(const char* password,       char *outBuf,       size_t outBuffSize) ;"

	"Interpreted as #char* from #( #'const char*' #'ptr' #'uint64' )"

	^FunctionGciTsEncrypt callWith: { password. outBuf. outBuffSize }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsExecute__: sess _: sourceStr _: sourceSize _: sourceOop _: contextObject _: symbolList _: flags _: environmentId _: err
	"$GEMSTONE/include/gcits.hf line 836
OopType GciTsExecute_(GciSession sess,          const char* sourceStr,          ssize_t sourceSize,          OopType sourceOop,          OopType contextObject,          OopType symbolList,          int flags ,          ushort environmentId ,          GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'int64' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr' )"

	^FunctionGciTsExecute_ callWith: { sess. sourceStr. sourceSize. sourceOop. contextObject. symbolList. flags. environmentId. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsExecute_: sess _: sourceStr _: sourceOop _: contextObject _: symbolList _: flags _: environmentId _: err
	"$GEMSTONE/include/gcits.hf line 805
OopType GciTsExecute(GciSession sess,           const char* sourceStr,           OopType sourceOop,           OopType contextObject,           OopType symbolList,         int flags ,         ushort environmentId ,         GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr' )"

	^FunctionGciTsExecute callWith: { sess. sourceStr. sourceOop. contextObject. symbolList. flags. environmentId. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsExecuteFetchBytes_: sess _: sourceStr _: sourceSize _: sourceOop _: contextObject _: symbolList _: result _: maxResultSize _: err
	"$GEMSTONE/include/gcits.hf line 858
ssize_t GciTsExecuteFetchBytes(GciSession sess,            const char* sourceStr,            ssize_t sourceSize,            OopType sourceOop,            OopType contextObject,            OopType symbolList,            ByteType *result,            ssize_t maxResultSize,            GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'const char*' #'int64' #'uint64' #'uint64' #'uint64' #'ptr' #'int64' #'ptr' )"

	^FunctionGciTsExecuteFetchBytes callWith: { sess. sourceStr. sourceSize. sourceOop. contextObject. symbolList. result. maxResultSize. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchBytes_: sess _: theObject _: startIndex _: dest _: numBytes _: err
	"$GEMSTONE/include/gcits.hf line 252
int64 GciTsFetchBytes(GciSession sess,          OopType theObject,          int64 startIndex,          ByteType *dest,          int64 numBytes,          GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'int64' #'ptr' #'int64' #'ptr' )"

	^FunctionGciTsFetchBytes callWith: { sess. theObject. startIndex. dest. numBytes. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchChars_: sess _: theObject _: startIndex _: cString _: maxSize _: err
	"$GEMSTONE/include/gcits.hf line 273
int64 GciTsFetchChars(GciSession sess,          OopType theObject,          int64 startIndex,          char *cString,          int64 maxSize,          GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'int64' #'ptr' #'int64' #'ptr' )"

	^FunctionGciTsFetchChars callWith: { sess. theObject. startIndex. cString. maxSize. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchClass_: sess _: obj _: err
	"$GEMSTONE/include/gcits.hf line 495
OopType GciTsFetchClass(GciSession sess,     OopType obj,     GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsFetchClass callWith: { sess. obj. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchObjInfo_: sess _: objId _: addToExportSet _: result _: buffer _: bufSize _: err
	"$GEMSTONE/include/gcits.hf line 461
int64 GciTsFetchObjInfo(GciSession sess,     OopType objId,     BoolType addToExportSet,     GciTsObjInfo *result,     ByteType *buffer,     size_t bufSize,     GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'int32' #'ptr' #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsFetchObjInfo callWith: { sess. objId. addToExportSet. result. buffer. bufSize. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchOops_: sess _: theObject _: startIndex _: theOops _: numOops _: err
	"$GEMSTONE/include/gcits.hf line 355
int GciTsFetchOops(GciSession sess,       OopType theObject,       int64 startIndex,       OopType *theOops,       int numOops,       GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'int64' #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsFetchOops callWith: { sess. theObject. startIndex. theOops. numOops. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchSize_: sess _: obj _: err
	"$GEMSTONE/include/gcits.hf line 475
int64 GciTsFetchSize(GciSession sess,         OopType obj,         GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsFetchSize callWith: { sess. obj. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchSpecialClass_: oop
	"$GEMSTONE/include/gcits.hf line 1130
OopType GciTsFetchSpecialClass(OopType oop) ;"

	"Interpreted as #uint64 from #( #'uint64' )"

	^FunctionGciTsFetchSpecialClass callWith: { oop }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchTraversal_: sess _: theOops _: numOops _: ctArgs _: err
	"$GEMSTONE/include/gcits.hf line 1084
int GciTsFetchTraversal(GciSession sess,     const OopType *theOops,     int numOops,     GciClampedTravArgsSType *ctArgs,     GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'int32' #'ptr' #'ptr' )"

	^FunctionGciTsFetchTraversal callWith: { sess. theOops. numOops. ctArgs. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchUnicode_: sess _: obj _: dest _: destSize _: requiredSize _: err
	"$GEMSTONE/include/gcits.hf line 685
int64 GciTsFetchUnicode(GciSession sess,     OopType obj,     ushort *dest,     int64 destSize,     int64 *requiredSize,     GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'ptr' #'int64' #'ptr' #'ptr' )"

	^FunctionGciTsFetchUnicode callWith: { sess. obj. dest. destSize. requiredSize. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchUtf8_: sess _: anObject _: dest _: destSize _: requiredSize _: err
	"$GEMSTONE/include/gcits.hf line 712
int64 GciTsFetchUtf8(GciSession sess,         OopType anObject,         ByteType *dest,         int64 destSize,         int64 *requiredSize,         GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'ptr' #'int64' #'ptr' #'ptr' )"

	^FunctionGciTsFetchUtf8 callWith: { sess. anObject. dest. destSize. requiredSize. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchUtf8Bytes_: sess _: aString _: startIndex _: dest _: bufSize _: utf8String _: err _: flags
	"$GEMSTONE/include/gcits.hf line 317
int64 GciTsFetchUtf8Bytes(GciSession sess,       OopType aString,       int64 startIndex,       ByteType *dest,       int64 bufSize,       OopType *utf8String,       GciErrSType *err ,       int flags = 0) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'int64' #'ptr' #'int64' #'ptr' #'ptr' #'int32' )"

	^FunctionGciTsFetchUtf8Bytes callWith: { sess. aString. startIndex. dest. bufSize. utf8String. err. flags }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsFetchVaryingSize_: sess _: obj _: err
	"$GEMSTONE/include/gcits.hf line 485
int64 GciTsFetchVaryingSize(GciSession sess,         OopType obj,         GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsFetchVaryingSize callWith: { sess. obj. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsGemTrace_: sess _: enable _: err
	"$GEMSTONE/include/gcits.hf line 179
int GciTsGemTrace(GciSession sess,      int enable,      GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsGemTrace callWith: { sess. enable. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsGetFreeOops_: sess _: buf _: numOopsRequested _: err
	"$GEMSTONE/include/gcits.hf line 208
int GciTsGetFreeOops(GciSession sess,         OopType *buf,         int numOopsRequested,         GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsGetFreeOops callWith: { sess. buf. numOopsRequested. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsI32ToOop_: arg
	"$GEMSTONE/include/gcits.hf line 1212
OopType GciTsI32ToOop(int arg) ;"

	"Interpreted as #uint64 from #( #'int32' )"

	^FunctionGciTsI32ToOop callWith: { arg }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsI64ToOop_: sess _: arg _: err
	"$GEMSTONE/include/gcits.hf line 1221
OopType GciTsI64ToOop(GciSession sess,     int64 arg,     GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'int64' #'ptr' )"

	^FunctionGciTsI64ToOop callWith: { sess. arg. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsIsKindOf_: sess _: obj _: aClass _: err
	"$GEMSTONE/include/gcits.hf line 514
int GciTsIsKindOf(GciSession sess,      OopType obj,      OopType aClass,      GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'uint64' #'ptr' )"

	^FunctionGciTsIsKindOf callWith: { sess. obj. aClass. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsIsKindOfClass_: sess _: obj _: aClass _: err
	"$GEMSTONE/include/gcits.hf line 538
int GciTsIsKindOfClass(GciSession sess,           OopType obj,           OopType aClass,           GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'uint64' #'ptr' )"

	^FunctionGciTsIsKindOfClass callWith: { sess. obj. aClass. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsIsSubclassOf_: sess _: cls _: aClass _: err
	"$GEMSTONE/include/gcits.hf line 526
int GciTsIsSubclassOf(GciSession sess,          OopType cls,          OopType aClass,          GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'uint64' #'ptr' )"

	^FunctionGciTsIsSubclassOf callWith: { sess. cls. aClass. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsIsSubclassOfClass_: sess _: cls _: aClass _: err
	"$GEMSTONE/include/gcits.hf line 550
int GciTsIsSubclassOfClass(GciSession sess,        OopType cls,        OopType aClass,        GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'uint64' #'ptr' )"

	^FunctionGciTsIsSubclassOfClass callWith: { sess. cls. aClass. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsLoad_: path _: errBuf _: errBufSize
	"$GEMSTONE/include/gcirtl.hf line 84
BoolType GciTsLoad(const char *path, char *errBuf, size_t errBufSize);"

	"Interpreted as #int32 from #( #'const char*' #'ptr' #'uint64' )"

	^FunctionGciTsLoad callWith: { path. errBuf. errBufSize }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsLogin_: StoneNameNrs _: HostUserId _: HostPassword _: hostPwIsEncrypted _: GemServiceNrs _: gemstoneUsername _: gemstonePassword _: loginFlags _: haltOnErrNum _: executedSessionInit _: err
	"$GEMSTONE/include/gcits.hf line 72
GciSession GciTsLogin(  const char *StoneNameNrs,  const char *HostUserId,  const char *HostPassword,  BoolType hostPwIsEncrypted,  const char *GemServiceNrs,  const char *gemstoneUsername,  const char *gemstonePassword,  unsigned int loginFlags ,  int haltOnErrNum,  BoolType *executedSessionInit,  GciErrSType *err) ;"

	"Interpreted as #ptr from #( #'const char*' #'const char*' #'const char*' #'int32' #'const char*' #'const char*' #'const char*' #'uint32' #'int32' #'ptr' #'ptr' )"

	^FunctionGciTsLogin callWith: { StoneNameNrs. HostUserId. HostPassword. hostPwIsEncrypted. GemServiceNrs. gemstoneUsername. gemstonePassword. loginFlags. haltOnErrNum. executedSessionInit. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsLogout_: sess _: err
	"$GEMSTONE/include/gcits.hf line 141
BoolType GciTsLogout(GciSession sess,         GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsLogout callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsMoreTraversal_: sess _: travBuff _: err
	"$GEMSTONE/include/gcits.hf line 1107
int GciTsMoreTraversal(GciSession sess,           GciTravBufType *travBuff,           GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'ptr' )"

	^FunctionGciTsMoreTraversal callWith: { sess. travBuff. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNbExecute_: sess _: sourceStr _: sourceOop _: contextObject _: symbolList _: flags _: environmentId _: err
	"$GEMSTONE/include/gcits.hf line 820
BoolType GciTsNbExecute(GciSession sess,           const char* sourceStr,           OopType sourceOop,           OopType contextObject,           OopType symbolList,         int flags ,         ushort environmentId ,         GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'const char*' #'uint64' #'uint64' #'uint64' #'int32' #'uint16' #'ptr' )"

	^FunctionGciTsNbExecute callWith: { sess. sourceStr. sourceOop. contextObject. symbolList. flags. environmentId. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNbLogin_: StoneNameNrs _: HostUserId _: HostPassword _: hostPwIsEncrypted _: GemServiceNrs _: gemstoneUsername _: gemstonePassword _: loginFlags _: haltOnErrNum _: loginPollSocket
	"$GEMSTONE/include/gcits.hf line 96
GciSession GciTsNbLogin(  const char *StoneNameNrs,  const char *HostUserId,  const char *HostPassword,  BoolType hostPwIsEncrypted,  const char *GemServiceNrs,  const char *gemstoneUsername,  const char *gemstonePassword,  unsigned int loginFlags ,  int haltOnErrNum,  int *loginPollSocket  ) ;"

	"Interpreted as #ptr from #( #'const char*' #'const char*' #'const char*' #'int32' #'const char*' #'const char*' #'const char*' #'uint32' #'int32' #'ptr' )"

	^FunctionGciTsNbLogin callWith: { StoneNameNrs. HostUserId. HostPassword. hostPwIsEncrypted. GemServiceNrs. gemstoneUsername. gemstonePassword. loginFlags. haltOnErrNum. loginPollSocket }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNbLoginFinished_: sess _: executedSessionInit _: err
	"$GEMSTONE/include/gcits.hf line 122
int  GciTsNbLoginFinished(GciSession sess,                     BoolType *executedSessionInit,                     GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'ptr' )"

	^FunctionGciTsNbLoginFinished callWith: { sess. executedSessionInit. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNbLogout_: sess _: err
	"$GEMSTONE/include/gcits.hf line 149
BoolType GciTsNbLogout(GciSession sess, GciErrSType *err);"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsNbLogout callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNbPerform_: sess _: receiver _: aSymbol _: selectorStr _: args _: numArgs _: flags _: environmentId _: err
	"$GEMSTONE/include/gcits.hf line 750
BoolType GciTsNbPerform(GciSession sess,         OopType receiver,         OopType aSymbol,         const char* selectorStr,         const OopType *args,         int numArgs,         int flags ,         ushort environmentId ,         GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'uint64' #'const char*' #'ptr' #'int32' #'int32' #'uint16' #'ptr' )"

	^FunctionGciTsNbPerform callWith: { sess. receiver. aSymbol. selectorStr. args. numArgs. flags. environmentId. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNbResult_: sess _: err
	"$GEMSTONE/include/gcits.hf line 768
OopType GciTsNbResult(GciSession sess,                                      GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'ptr' )"

	^FunctionGciTsNbResult callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewByteArray_: sess _: body _: numBytes _: err
	"$GEMSTONE/include/gcits.hf line 571
OopType GciTsNewByteArray(GciSession sess,       ByteType *body,       size_t numBytes,       GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsNewByteArray callWith: { sess. body. numBytes. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewObj_: sess _: aClass _: err
	"$GEMSTONE/include/gcits.hf line 561
OopType GciTsNewObj(GciSession sess,        OopType aClass,        GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsNewObj callWith: { sess. aClass. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewString__: sess _: cString _: nBytes _: err
	"$GEMSTONE/include/gcits.hf line 582
OopType GciTsNewString_(GciSession sess,     const char *cString,     size_t nBytes,     GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'uint64' #'ptr' )"

	^FunctionGciTsNewString_ callWith: { sess. cString. nBytes. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewString_: sess _: cString _: err
	"$GEMSTONE/include/gcits.hf line 593
OopType GciTsNewString(GciSession sess,           const char *cString,           GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'ptr' )"

	^FunctionGciTsNewString callWith: { sess. cString. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewSymbol_: sess _: cString _: err
	"$GEMSTONE/include/gcits.hf line 603
OopType GciTsNewSymbol(GciSession sess,           const char *cString,           GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'ptr' )"

	^FunctionGciTsNewSymbol callWith: { sess. cString. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewUnicodeString__: s _: str _: numShorts _: err
	"$GEMSTONE/include/gcits.hf line 614
OopType GciTsNewUnicodeString_(GciSession s,            const ushort* str,            size_t numShorts,            GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'ptr' #'uint64' #'ptr' )"

	^FunctionGciTsNewUnicodeString_ callWith: { s. str. numShorts. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewUnicodeString_: sess _: str _: err
	"$GEMSTONE/include/gcits.hf line 627
OopType GciTsNewUnicodeString(GciSession sess,           const ushort* str,           GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'ptr' #'ptr' )"

	^FunctionGciTsNewUnicodeString callWith: { sess. str. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewUtf8String__: sess _: utf8data _: nBytes _: convertToUnicode _: err
	"$GEMSTONE/include/gcits.hf line 660
OopType GciTsNewUtf8String_(GciSession sess,         const char* utf8data,         size_t nBytes,         BoolType convertToUnicode,         GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'uint64' #'int32' #'ptr' )"

	^FunctionGciTsNewUtf8String_ callWith: { sess. utf8data. nBytes. convertToUnicode. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsNewUtf8String_: sess _: utf8data _: convertToUnicode _: err
	"$GEMSTONE/include/gcits.hf line 643
OopType GciTsNewUtf8String(GciSession sess,        const char* utf8data,        BoolType convertToUnicode,        GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'int32' #'ptr' )"

	^FunctionGciTsNewUtf8String callWith: { sess. utf8data. convertToUnicode. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsObjExists_: sess _: obj
	"$GEMSTONE/include/gcits.hf line 504
BoolType GciTsObjExists(GciSession sess, OopType obj) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' )"

	^FunctionGciTsObjExists callWith: { sess. obj }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsOopIsSpecial_: oop
	"$GEMSTONE/include/gcits.hf line 1115
BoolType GciTsOopIsSpecial(OopType oop) ;"

	"Interpreted as #int32 from #( #'uint64' )"

	^FunctionGciTsOopIsSpecial callWith: { oop }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsOopToChar_: oop
	"$GEMSTONE/include/gcits.hf line 1139
int GciTsOopToChar(OopType oop) ;"

	"Interpreted as #int32 from #( #'uint64' )"

	^FunctionGciTsOopToChar callWith: { oop }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsOopToDouble_: sess _: oop _: result _: err
	"$GEMSTONE/include/gcits.hf line 1195
BoolType GciTsOopToDouble(GciSession sess,       OopType oop,       double *result,       GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'ptr' #'ptr' )"

	^FunctionGciTsOopToDouble callWith: { sess. oop. result. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsOopToI64_: sess _: oop _: result _: err
	"$GEMSTONE/include/gcits.hf line 1234
BoolType GciTsOopToI64(GciSession sess,           OopType oop,           int64 *result,           GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'ptr' #'ptr' )"

	^FunctionGciTsOopToI64 callWith: { sess. oop. result. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsPerform_: sess _: receiver _: aSymbol _: selectorStr _: args _: numArgs _: flags _: environmentId _: err
	"$GEMSTONE/include/gcits.hf line 735
OopType GciTsPerform(GciSession sess,         OopType receiver,         OopType aSymbol,         const char* selectorStr,         const OopType *args,         int numArgs,         int flags ,         ushort environmentId ,         GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'uint64' #'uint64' #'const char*' #'ptr' #'int32' #'int32' #'uint16' #'ptr' )"

	^FunctionGciTsPerform callWith: { sess. receiver. aSymbol. selectorStr. args. numArgs. flags. environmentId. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsPerformFetchBytes_: sess _: receiver _: selectorStr _: args _: numArgs _: result _: maxResultSize _: err
	"$GEMSTONE/include/gcits.hf line 782
ssize_t GciTsPerformFetchBytes(GciSession sess,            OopType receiver,            const char* selectorStr,            const OopType *args,            int numArgs,            ByteType *result,            ssize_t maxResultSize,            GciErrSType *err) ;"

	"Interpreted as #int64 from #( #'ptr' #'uint64' #'const char*' #'ptr' #'int32' #'ptr' #'int64' #'ptr' )"

	^FunctionGciTsPerformFetchBytes callWith: { sess. receiver. selectorStr. args. numArgs. result. maxResultSize. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsProtectMethods_: sess _: mode _: err
	"$GEMSTONE/include/gcits.hf line 886
BoolType GciTsProtectMethods(GciSession sess,          BoolType mode,          GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsProtectMethods callWith: { sess. mode. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsReleaseAllObjs_: sess _: err
	"$GEMSTONE/include/gcits.hf line 240
BoolType GciTsReleaseAllObjs(GciSession sess,          GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsReleaseAllObjs callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsReleaseObjs_: sess _: buf _: count _: err
	"$GEMSTONE/include/gcits.hf line 231
BoolType GciTsReleaseObjs(GciSession sess,       OopType *buf,       int count,       GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsReleaseObjs callWith: { sess. buf. count. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsRemoveOopsFromNsc_: sess _: theNsc _: theOops _: numOops _: err
	"$GEMSTONE/include/gcits.hf line 382
int GciTsRemoveOopsFromNsc(GciSession sess,        OopType theNsc,        const OopType *theOops,        int numOops,        GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsRemoveOopsFromNsc callWith: { sess. theNsc. theOops. numOops. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsResolveSymbol_: sess _: str _: symbolList _: err
	"$GEMSTONE/include/gcits.hf line 188
OopType GciTsResolveSymbol(GciSession sess,        const char* str,        OopType symbolList,        GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'const char*' #'uint64' #'ptr' )"

	^FunctionGciTsResolveSymbol callWith: { sess. str. symbolList. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsResolveSymbolObj_: sess _: str _: symbolList _: err
	"$GEMSTONE/include/gcits.hf line 198
OopType GciTsResolveSymbolObj(GciSession sess,           OopType str,           OopType symbolList,           GciErrSType *err) ;"

	"Interpreted as #uint64 from #( #'ptr' #'uint64' #'uint64' #'ptr' )"

	^FunctionGciTsResolveSymbolObj callWith: { sess. str. symbolList. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsSaveObjs_: sess _: buf _: count _: err
	"$GEMSTONE/include/gcits.hf line 220
BoolType GciTsSaveObjs(GciSession sess,           OopType *buf,           int count,           GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsSaveObjs callWith: { sess. buf. count. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsSessionIsRemote_: sess
	"$GEMSTONE/include/gcits.hf line 167
int GciTsSessionIsRemote(GciSession sess) ;"

	"Interpreted as #int32 from #( #'ptr' )"

	^FunctionGciTsSessionIsRemote callWith: { sess }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsSocket_: sess _: err
	"$GEMSTONE/include/gcits.hf line 159
int GciTsSocket(GciSession sess, GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' )"

	^FunctionGciTsSocket callWith: { sess. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsStoreBytes_: sess _: theObject _: startIndex _: theBytes _: numBytes _: ofClass _: err
	"$GEMSTONE/include/gcits.hf line 338
BoolType GciTsStoreBytes(GciSession sess,      OopType theObject,      int64 startIndex,      ByteType *theBytes,      int64 numBytes,      OopType ofClass,      GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'int64' #'ptr' #'int64' #'uint64' #'ptr' )"

	^FunctionGciTsStoreBytes callWith: { sess. theObject. startIndex. theBytes. numBytes. ofClass. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsStoreOops_: sess _: theObject _: startIndex _: theOops _: numOops _: err _: overlay
	"$GEMSTONE/include/gcits.hf line 367
BoolType GciTsStoreOops(GciSession sess,     OopType theObject,     int64 startIndex,     const OopType *theOops,     int numOops,     GciErrSType *err,     BoolType overlay = 0) ;"

	"Interpreted as #int32 from #( #'ptr' #'uint64' #'int64' #'ptr' #'int32' #'ptr' #'int32' )"

	^FunctionGciTsStoreOops callWith: { sess. theObject. startIndex. theOops. numOops. err. overlay }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsStoreTrav_: sess _: travBuff _: flag _: err
	"$GEMSTONE/include/gcits.hf line 1095
BoolType GciTsStoreTrav(GciSession sess,     GciTravBufType *travBuff,     int flag,     GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'int32' #'ptr' )"

	^FunctionGciTsStoreTrav callWith: { sess. travBuff. flag. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsStoreTravDoTravRefs_: sess _: oopsNoLongerReplicated _: numNotReplicated _: oopsGcedOnClient _: numGced _: stdArgs _: ctArgs _: err
	"$GEMSTONE/include/gcits.hf line 1064
int GciTsStoreTravDoTravRefs(GciSession sess,          const OopType *oopsNoLongerReplicated,          int numNotReplicated,          const OopType *oopsGcedOnClient,          int numGced,          GciStoreTravDoArgsSType *stdArgs,          GciClampedTravArgsSType *ctArgs,          GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'ptr' #'int32' #'ptr' #'int32' #'ptr' #'ptr' #'ptr' )"

	^FunctionGciTsStoreTravDoTravRefs callWith: { sess. oopsNoLongerReplicated. numNotReplicated. oopsGcedOnClient. numGced. stdArgs. ctArgs. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsVersion_: buf _: bufSize
	"$GEMSTONE/include/gcits.hf line 1317
uint GciTsVersion(char *buf,      size_t bufSize) ;"

	"Interpreted as #uint32 from #( #'ptr' #'uint64' )"

	^FunctionGciTsVersion callWith: { buf. bufSize }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsWaitForEvent_: sess _: latencyMs _: evout _: err
	"$GEMSTONE/include/gcits.hf line 1279
int GciTsWaitForEvent(GciSession sess,          int latencyMs,          GciEventType *evout,          GciErrSType *err) ;"

	"Interpreted as #int32 from #( #'ptr' #'int32' #'int32' #'ptr' )"

	^FunctionGciTsWaitForEvent callWith: { sess. latencyMs. evout. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciTsX509Login_: args _: executedSessionInit _: err
	"$GEMSTONE/include/gcits.hf line 131
GciSession GciTsX509Login(GciX509LoginArg *args,               BoolType *executedSessionInit,               GciErrSType *err) ;"

	"Interpreted as #ptr from #( #'ptr' #'ptr' #'ptr' )"

	^FunctionGciTsX509Login callWith: { args. executedSessionInit. err }
%
category: 'Functions'
method: GciTsLibraryFull
GciUnload
	"$GEMSTONE/include/gcits.hf line 1367
void GciUnload(void) ;"

	"Interpreted as #void from #( )"

	^FunctionGciUnload callWith: {  }
%
category: 'Functions'
method: GciTsLibraryFull
GciUtf8To8bit_: src _: dest _: destSize
	"$GEMSTONE/include/gcits.hf line 1329
BoolType GciUtf8To8bit(const char* src,           char *dest,           ssize_t destSize) ;"

	"Interpreted as #int32 from #( #'const char*' #'ptr' #'int64' )"

	^FunctionGciUtf8To8bit callWith: { src. dest. destSize }
%
