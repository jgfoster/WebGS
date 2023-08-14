! ------- Create dictionary if it is not present
run
| aSymbol names userProfile |
aSymbol := #'GciApp'.
userProfile := System myUserProfile.
names := userProfile symbolList names.
(names includes: aSymbol) ifFalse: [
	| symbolDictionary |
	symbolDictionary := SymbolDictionary new name: aSymbol; yourself.
	userProfile insertDictionary: symbolDictionary at: names size + 1.
].
%
set compile_env: 0
! ------------------- Class definition for GciClampedTravArgsSType
expectvalue /Class
doit
CByteArray subclass: 'GciClampedTravArgsSType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciClampedTravArgsSType comment:
'
	"$GEMSTONE/include/gcicmn.ht line 663
class GciClampedTravArgsSType { public:  OopType clampSpec;  OopType resultOop;  GciTravBufType *travBuff;  int level;  int retrievalFlags;  BoolType isRpc;  GciClampedTravArgsSType() {    clampSpec = ((OopType)0x14);    resultOop = ((OopType)0x14);    travBuff = ((void*)0);    level = 0;    retrievalFlags = 0;    isRpc = 1;  }};"
'
%
set compile_env: 0
! ------------------- Class definition for GciDateTimeSType
expectvalue /Class
doit
CByteArray subclass: 'GciDateTimeSType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciDateTimeSType comment:
'
	"$GEMSTONE/include/gcicmn.ht line 696
class GciDateTimeSType { public:   int year;   int dayOfYear;   int milliseconds;   OopType timeZone;   GciDateTimeSType() {     year = 1901;     dayOfYear = 1;     milliseconds = 0;     timeZone = ((OopType)0x14);   }};"
'
%
set compile_env: 0
! ------------------- Class definition for GciFetchObjInfoArgsSType
expectvalue /Class
doit
CByteArray subclass: 'GciFetchObjInfoArgsSType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciFetchObjInfoArgsSType comment:
'
	"$GEMSTONE/include/gcilegacy.ht line 124
typedef struct {  int64 startIndex;  int64 bufSize;  int64 numReturned;  GciObjInfoSType *info;  ByteType *buffer;  int retrievalFlags;  BoolType isRpc;  } GciFetchObjInfoArgsSType;"
'
%
set compile_env: 0
! ------------------- Class definition for GciObjInfoSType
expectvalue /Class
doit
CByteArray subclass: 'GciObjInfoSType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciObjInfoSType comment:
'
	"$GEMSTONE/include/gcilegacy.ht line 60
class GciObjInfoSType{ public:  OopType objId;  OopType objClass;  int64 objSize;  int namedSize;  unsigned short objectSecurityPolicyId;  unsigned short _bits;  enum {         implem_mask = GC_IMPLEMENTATION_MASK,         indexable_mask = GC_INDEXABLE_MASK,         invariant_mask = GC_INVARIANT_MASK,         partial_mask = 0x10,         overlay_mask = 0x20,         is_placeholder = 0x40 ,        swiz_kind_mask = 0x300,           swiz_kind_shift = 8       };  inline unsigned char isInvariant() { return _bits & invariant_mask; }  inline unsigned char isIndexable() { return _bits & indexable_mask; }  inline unsigned char isPartial() { return _bits & partial_mask; }  inline unsigned char isOverlayed() { return _bits & overlay_mask; }  inline GciByteSwizEType byteSwizKind() const {     return (GciByteSwizEType)((_bits & swiz_kind_mask) >> swiz_kind_shift) ;  }  inline void setByteSwizKind(ushort val) {    ushort mask = swiz_kind_mask;    _bits = (ushort)( (_bits & ~ mask) | ((val << swiz_kind_shift) & mask) );  }  inline unsigned char objImpl() {    return (ByteType)( _bits & GC_IMPLEMENTATION_MASK);  }  inline void clearBits() { _bits = 0; }  inline void setBits(unsigned short b) { _bits = b; }  inline ushort bits() const { return _bits; }  inline void setObjImpl(unsigned char f) {    _bits = (ushort)( (_bits & ~ implem_mask) | (f & implem_mask) );  }  inline void setPlaceHolder() { _bits |= is_placeholder; }  inline void setInvariant(unsigned char val) {    if (val) { _bits |= (ushort)invariant_mask; } else { _bits &= (ushort)(~invariant_mask);}  }  inline void setIndexable(unsigned char val) {    if (val) { _bits |= (ushort)indexable_mask; } else { _bits &= (ushort)(~indexable_mask);}  }  inline void setPartial(unsigned char val) {    if (val) { _bits |= (ushort)partial_mask; } else { _bits &= (ushort)( ~partial_mask);}  }  inline void setOverlayed(unsigned char val) {    if (val) { _bits |= (ushort)overlay_mask; } else { _bits &= (ushort)(~overlay_mask);}  }};"
'
%
set compile_env: 0
! ------------------- Class definition for GciObjRepHdrSType
expectvalue /Class
doit
CByteArray subclass: 'GciObjRepHdrSType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciObjRepHdrSType comment:
'
	"$GEMSTONE/include/gci.ht line 281
class GciObjRepHdrSType{ public:  int valueBuffSize;  short namedSize;  unsigned short objectSecurityPolicyId;  OopType objId;  OopType oclass;  int64 firstOffset;  uint64 _idxSizeBits;  enum {    implem_mask = GC_IMPLEMENTATION_MASK,  indexable_mask = GC_INDEXABLE_MASK,         invariant_mask = GC_INVARIANT_MASK,         partial_mask = 0x10,         overlay_mask = 0x20,      no_read_auth_mask = 0x40,         clamped_mask = 0x80,        swiz_kind_mask = 0x300,              swiz_kind_shift = 8,         unused_mask = 0xFC00,        all_bits_mask = 0xFFFF,        all_bits_numDynIvs_mask = 0xFFFFFF       };  inline int64 idxSize() const {     return _idxSizeBits >> 24;  }  inline void setIdxSize(int64 size) {    _idxSizeBits = (size << 24) | (_idxSizeBits & all_bits_numDynIvs_mask) ;  }  inline void setIdxSizeBits(int64 size, uint bits, int nDynamicIvs) {    _idxSizeBits = (size << 24) | ((nDynamicIvs & 0xFF) << 16) | (bits & all_bits_mask);  }  inline int numDynamicIvs() {    return (_idxSizeBits >> 16) & 0xFF ;  }  inline int objImpl() const {    return _idxSizeBits & GC_IMPLEMENTATION_MASK;  }  inline void setObjImpl(int v) {    uint64 mask = GC_IMPLEMENTATION_MASK;    _idxSizeBits = ( _idxSizeBits & ~ mask) | (v & mask) ;  }  inline int64 objSize() const {    return idxSize() + namedSize;  }  inline GciByteSwizEType byteSwizKind() const {     return (GciByteSwizEType)((_idxSizeBits & swiz_kind_mask) >> swiz_kind_shift) ;  }  inline void setByteSwizKind(uint64 val) {    uint64 mask = swiz_kind_mask;    _idxSizeBits = (_idxSizeBits & ~ mask) | ((val << swiz_kind_shift) & mask);  }  inline void clearBits() {    uint64 mask = all_bits_mask ;    _idxSizeBits &= ~ mask;  }  inline unsigned char isClamped() const { return _idxSizeBits & clamped_mask; }  inline unsigned char noReadAuthorization() const { return _idxSizeBits & no_read_auth_mask; }  inline unsigned char isInvariant() const { return _idxSizeBits & invariant_mask; }  inline unsigned char isIndexable() const { return _idxSizeBits & indexable_mask; }  inline unsigned char isPartial() const { return _idxSizeBits & partial_mask; }  inline unsigned char isOverlayed() const { return _idxSizeBits & overlay_mask; }  inline void setIsClamped(unsigned char val) {    uint64 mask = clamped_mask;    if (val) { _idxSizeBits |= mask; } else { _idxSizeBits &= ~mask;}  }  inline void setNoReadAuth(unsigned char val) {    uint64 mask = no_read_auth_mask;    if (val) { _idxSizeBits |= mask; } else { _idxSizeBits &= ~mask;}  }  inline void setInvariant(unsigned char val) {    uint64 mask = invariant_mask;    if (val) { _idxSizeBits |= mask; } else { _idxSizeBits &= ~mask;}  }  inline void setIndexable(unsigned char val) {    uint64 mask = indexable_mask;    if (val) { _idxSizeBits |= mask; } else { _idxSizeBits &= ~mask;}  }  inline void setPartial(unsigned char val) {    uint64 mask = partial_mask;    if (val) { _idxSizeBits |= mask; } else { _idxSizeBits &= ~mask;}  }  inline void setOverlayed(unsigned char val) {    uint64 mask = overlay_mask;    if (val) { _idxSizeBits |= mask; } else { _idxSizeBits &= ~mask;}  }  inline void setIsClamped() {    uint64 mask = clamped_mask;    _idxSizeBits |= mask;  }  inline void setPartial() {    uint64 mask = partial_mask;    _idxSizeBits |= mask;  }  inline void clearPartial() {    uint64 mask = partial_mask;    _idxSizeBits &= ~ mask;  }  inline uint usedBytes() const {    return (uint)sizeof(*this) + (uint) (((uintptr_t)((this->valueBuffSize)) + ((sizeof(OopType)) - 1)) & ~((uintptr_t)(sizeof(OopType)) - 1) );  }  inline uint valueBufNumOops() const {    return this->valueBuffSize / (uint)sizeof(OopType);  }  static uint usedBytes(int valueBuffSize) {    return (uint) sizeof(GciObjRepHdrSType) + (uint) (((uintptr_t)((valueBuffSize)) + ((sizeof(OopType)) - 1)) & ~((uintptr_t)(sizeof(OopType)) - 1) );  }  inline GciObjRepHdrSType *nextReport() const {    return (GciObjRepHdrSType*)((char*)this + this->usedBytes());  }  inline ByteType* valueBufferBytes() const {    return (ByteType*)((char*)this + sizeof(*this));  }  inline OopType* valueBufferOops() const {    return (OopType*)((char*)this + sizeof(*this));  }} ;"
'
%
set compile_env: 0
! ------------------- Class definition for GciObjRepSType
expectvalue /Class
doit
CByteArray subclass: 'GciObjRepSType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciObjRepSType comment:
'
	"$GEMSTONE/include/gci.ht line 429
class GciObjRepSType { public:  GciObjRepHdrSType hdr;  union {    ByteType bytes[1];    OopType oops[1];  } u;  inline uint usedBytes() const {    return this->hdr.usedBytes();  }  inline GciObjRepSType* nextReport() const {    return (GciObjRepSType*) this->hdr.nextReport();  }  inline ByteType* valueBufferBytes() const {    return (ByteType*)this->u.bytes;  }  inline OopType* valueBufferOops() const {    return (OopType*)this->u.oops;  }};"
'
%
set compile_env: 0
! ------------------- Class definition for GciStoreTravDoArgsSType
expectvalue /Class
doit
CByteArray subclass: 'GciStoreTravDoArgsSType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciStoreTravDoArgsSType comment:
'
	"$GEMSTONE/include/gcicmn.ht line 747
class GciStoreTravDoArgsSType { public:  int doPerform;  int doFlags;  int alteredNumOops;  BoolType alteredCompleted;  union {    struct {      OopType receiver;      char pad[24];      const char* selector;      const OopType* args;      int numArgs;      ushort environmentId;    } perform;    struct {      OopType contextObject;      OopType sourceClass;      OopType symbolList;      int64 sourceSize;      const char* source;      const OopType* args;      int numArgs;      ushort environmentId;    } executestr;    struct {      OopType process;      OopType replaceTopOfStack;    } continueArgs ;  } u;  GciTravBufType* storeTravBuff;  OopType* alteredTheOops;  int storeTravFlags;};"
'
%
set compile_env: 0
! ------------------- Class definition for GciStoreTravDoArgsSType_continueArgs
expectvalue /Class
doit
CByteArray subclass: 'GciStoreTravDoArgsSType_continueArgs'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciStoreTravDoArgsSType_continueArgs comment:
'
	"$GEMSTONE/include/temp.h line 23
class GciStoreTravDoArgsSType_continueArgs {      OopType process;      OopType replaceTopOfStack;    } ;"
'
%
set compile_env: 0
! ------------------- Class definition for GciStoreTravDoArgsSType_executestr
expectvalue /Class
doit
CByteArray subclass: 'GciStoreTravDoArgsSType_executestr'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciStoreTravDoArgsSType_executestr comment:
'
	"$GEMSTONE/include/temp.h line 12
class GciStoreTravDoArgsSType_executestr {      OopType contextObject;      OopType sourceClass;      OopType symbolList;      int64 sourceSize;      const char* source;      const OopType* args;      int numArgs;      ushort environmentId;    } ;"
'
%
set compile_env: 0
! ------------------- Class definition for GciStoreTravDoArgsSType_perform
expectvalue /Class
doit
CByteArray subclass: 'GciStoreTravDoArgsSType_perform'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciStoreTravDoArgsSType_perform comment:
'
	"$GEMSTONE/include/temp.h line 3
class GciStoreTravDoArgsSType_perform {      OopType receiver;      char pad[24];      const char* selector;      const OopType* args;      int numArgs;      ushort environmentId;    } ;"
'
%
set compile_env: 0
! ------------------- Class definition for GciTravBufType
expectvalue /Class
doit
CByteArray subclass: 'GciTravBufType'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciTravBufType comment:
'
	"$GEMSTONE/include/gcicmn.ht line 458
class GciTravBufType{ public:   uint allocatedBytes;   uint usedBytes;   ByteType body[8];   inline GciObjRepSType* firstReport() {     return (GciObjRepSType*)body;   }   inline GciObjRepSType* readLimit() {      return (GciObjRepSType*)(body + usedBytes);   }   inline GciObjRepSType* writeLimit() {      return (GciObjRepSType*)(body + allocatedBytes);   }   inline GciObjRepHdrSType* firstReportHdr() {      return &firstReport()->hdr;   }   inline GciObjRepHdrSType* readLimitHdr() {      return &readLimit()->hdr;   }   inline GciObjRepHdrSType* writeLimitHdr() {      return &writeLimit()->hdr ;   }   GciObjRepHdrSType* findObjectReport(OopType objectId);   GciTravBufType(size_t allocationSize);   static GciTravBufType* malloc(size_t allocationSize, int lineNum = -1,     const char* fileName = ((void*)0));   BoolType legalSize();   void free();};"
'
%
set compile_env: 0
! ------------------- Class definition for GciTsObjInfo
expectvalue /Class
doit
CByteArray subclass: 'GciTsObjInfo'
  instVarNames: #()
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciTsObjInfo comment:
'
	"$GEMSTONE/include/gcits.hf line 391
class GciTsObjInfo { public:  OopType objId;  OopType objClass;  int64 objSize;  int namedSize;  uint access;  unsigned short objectSecurityPolicyId;  unsigned short _bits;  enum {     AUTH_NONE = 0, AUTH_READ = 1, AUTH_WRITE = 2  };  GciTsObjInfo() {    initialize();  }  void initialize() {    objId = ((OopType)0x14);    objClass = ((OopType)0x14);    objSize = 0;    namedSize = 0;    access = 0;    objectSecurityPolicyId = 0;    _bits = 0;  }  enum {      implem_mask = GC_IMPLEMENTATION_MASK,      indexable_mask = GC_INDEXABLE_MASK,      invariant_mask = GC_INVARIANT_MASK,      partial_mask = 0x10,      overlay_mask = 0x20,      is_placeholder = 0x40 ,      swiz_kind_mask = 0x300,           swiz_kind_shift = 8  };  inline unsigned char isInvariant() { return _bits & invariant_mask; }  inline unsigned char isIndexable() { return _bits & indexable_mask; }  inline unsigned char isPartial() { return _bits & partial_mask; }  inline unsigned char isOverlayed() { return _bits & overlay_mask; }  inline GciByteSwizEType byteSwizKind() const {     return (GciByteSwizEType)((_bits & swiz_kind_mask) >> swiz_kind_shift) ;  }  inline unsigned char objImpl() {    return _bits & GC_IMPLEMENTATION_MASK;  }};"
'
%
set compile_env: 0
! ------------------- Class definition for GciTsLibraryFull
expectvalue /Class
doit
Object subclass: 'GciTsLibraryFull'
  instVarNames: #()
  classVars: #( FunctionGciFree FunctionGciHostCallDebuggerMsg FunctionGciHostFtime FunctionGciHostMilliSleep FunctionGciI32ToOop FunctionGciMalloc FunctionGciNextUtf8Character FunctionGciRtlIsLoaded FunctionGciRtlLoad FunctionGciRtlLoadA FunctionGciRtlUnload FunctionGciShutdown FunctionGciTimeStampMsStr FunctionGciTsAbort FunctionGciTsBegin FunctionGciTsBreak FunctionGciTsCallInProgress FunctionGciTsCancelWaitForEvent FunctionGciTsCharToOop FunctionGciTsClassRemoveAllMethods FunctionGciTsClearStack FunctionGciTsCommit FunctionGciTsCompileMethod FunctionGciTsContinueWith FunctionGciTsDirtyObjsInit FunctionGciTsDoubleToOop FunctionGciTsDoubleToSmallDouble FunctionGciTsEncrypt FunctionGciTsExecute FunctionGciTsExecute_ FunctionGciTsExecuteFetchBytes FunctionGciTsFetchBytes FunctionGciTsFetchChars FunctionGciTsFetchClass FunctionGciTsFetchObjInfo FunctionGciTsFetchOops FunctionGciTsFetchSize FunctionGciTsFetchSpecialClass FunctionGciTsFetchTraversal FunctionGciTsFetchUnicode FunctionGciTsFetchUtf8 FunctionGciTsFetchUtf8Bytes FunctionGciTsFetchVaryingSize FunctionGciTsGemTrace FunctionGciTsGetFreeOops FunctionGciTsI32ToOop FunctionGciTsI64ToOop FunctionGciTsIsKindOf FunctionGciTsIsKindOfClass FunctionGciTsIsSubclassOf FunctionGciTsIsSubclassOfClass FunctionGciTsLoad FunctionGciTsLogin FunctionGciTsLogout FunctionGciTsMoreTraversal FunctionGciTsNbExecute FunctionGciTsNbLogin FunctionGciTsNbLoginFinished FunctionGciTsNbLogout FunctionGciTsNbPerform FunctionGciTsNbResult FunctionGciTsNewByteArray FunctionGciTsNewObj FunctionGciTsNewString FunctionGciTsNewString_ FunctionGciTsNewSymbol FunctionGciTsNewUnicodeString FunctionGciTsNewUnicodeString_ FunctionGciTsNewUtf8String FunctionGciTsNewUtf8String_ FunctionGciTsObjExists FunctionGciTsOopIsSpecial FunctionGciTsOopToChar FunctionGciTsOopToDouble FunctionGciTsOopToI64 FunctionGciTsPerform FunctionGciTsPerformFetchBytes FunctionGciTsProtectMethods FunctionGciTsReleaseAllObjs FunctionGciTsReleaseObjs FunctionGciTsRemoveOopsFromNsc FunctionGciTsResolveSymbol FunctionGciTsResolveSymbolObj FunctionGciTsSaveObjs FunctionGciTsSessionIsRemote FunctionGciTsSocket FunctionGciTsStoreBytes FunctionGciTsStoreOops FunctionGciTsStoreTrav FunctionGciTsStoreTravDoTravRefs FunctionGciTsVersion FunctionGciTsWaitForEvent FunctionGciTsX509Login FunctionGciUnload FunctionGciUtf8To8bit)
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
set compile_env: 0
! ------------------- Class definition for GciLibraryApp
expectvalue /Class
doit
WebApp subclass: 'GciLibraryApp'
  instVarNames: #( error gciSession requestDict
                    result sessions)
  classVars: #()
  classInstVars: #()
  poolDictionaries: #()
  inDictionary: GciApp
  options: #()

%
expectvalue /Class
doit
GciLibraryApp comment:
'The following code template was used to generate CByteArray subclasses.

| header class |
header := CHeader path: ''$GEMSTONE/include/gci.hf''.
#(GciClampedTravArgsSType) do: [:each |
	UserGlobals removeKey: each ifAbsent: [].
	class := header wrapperForTypeNamed: each asString.
	UserGlobals at: class name put: class.
].'
%
expectvalue /Class
doit
GciLibraryApp category: 'User Interface'
%

input GCI/GciClampedTravArgsSType.gs
input GCI/GciDateTimeSType.gs
input GCI/GciFetchObjInfoArgsSType.gs
input GCI/GciLibraryApp.gs
input GCI/GciObjInfoSType.gs
input GCI/GciObjRepHdrSType.gs
input GCI/GciObjRepSType.gs
input GCI/GciStoreTravDoArgsSType.gs
input GCI/GciStoreTravDoArgsSType_continueArgs.gs
input GCI/GciStoreTravDoArgsSType_executestr.gs
input GCI/GciStoreTravDoArgsSType_perform.gs
input GCI/GciTravBufType.gs
input GCI/GciTsLibraryFull.gs
input GCI/GciTsObjInfo.gs
