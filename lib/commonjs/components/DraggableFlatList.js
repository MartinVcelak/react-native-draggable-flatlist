var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var _extends2 = _interopRequireDefault(
  require("@babel/runtime/helpers/extends")
);
var _toConsumableArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/toConsumableArray")
);
var _slicedToArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/slicedToArray")
);
var _react = _interopRequireWildcard(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(
  require("react-native-reanimated")
);
var _CellRendererComponent = _interopRequireDefault(
  require("./CellRendererComponent")
);
var _constants = require("../constants");
var _PlaceholderItem = _interopRequireDefault(require("./PlaceholderItem"));
var _RowItem = _interopRequireDefault(require("./RowItem"));
var _propsContext = _interopRequireDefault(require("../context/propsContext"));
var _animatedValueContext = _interopRequireWildcard(
  require("../context/animatedValueContext")
);
var _refContext = _interopRequireWildcard(require("../context/refContext"));
var _draggableFlatListContext = _interopRequireDefault(
  require("../context/draggableFlatListContext")
);
var _useAutoScroll = require("../hooks/useAutoScroll");
var _useStableCallback = require("../hooks/useStableCallback");
var _ScrollOffsetListener = _interopRequireDefault(
  require("./ScrollOffsetListener")
);
var _utils = require("../utils");
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx";
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || ("object" != typeof e && "function" != typeof e))
    return { default: e };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = { __proto__: null },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) {
    if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : (n[u] = e[u]);
    }
  }
  return (n.default = e), t && t.set(e, n), n;
}
var AnimatedFlatList = _reactNativeReanimated.default.createAnimatedComponent(
  _reactNativeGestureHandler.FlatList
);
function DraggableFlatListInner(props) {
  var _this = this;
  var _useRefs = (0, _refContext.useRefs)(),
    cellDataRef = _useRefs.cellDataRef,
    containerRef = _useRefs.containerRef,
    flatlistRef = _useRefs.flatlistRef,
    keyToIndexRef = _useRefs.keyToIndexRef,
    propsRef = _useRefs.propsRef,
    animationConfigRef = _useRefs.animationConfigRef;
  var _useAnimatedValues = (0, _animatedValueContext.useAnimatedValues)(),
    activeCellOffset = _useAnimatedValues.activeCellOffset,
    activeCellSize = _useAnimatedValues.activeCellSize,
    activeIndexAnim = _useAnimatedValues.activeIndexAnim,
    containerSize = _useAnimatedValues.containerSize,
    scrollOffset = _useAnimatedValues.scrollOffset,
    scrollViewSize = _useAnimatedValues.scrollViewSize,
    spacerIndexAnim = _useAnimatedValues.spacerIndexAnim,
    horizontalAnim = _useAnimatedValues.horizontalAnim,
    placeholderOffset = _useAnimatedValues.placeholderOffset,
    touchTranslate = _useAnimatedValues.touchTranslate,
    autoScrollDistance = _useAnimatedValues.autoScrollDistance,
    panGestureState = _useAnimatedValues.panGestureState,
    isTouchActiveNative = _useAnimatedValues.isTouchActiveNative,
    viewableIndexMin = _useAnimatedValues.viewableIndexMin,
    viewableIndexMax = _useAnimatedValues.viewableIndexMax,
    disabled = _useAnimatedValues.disabled;
  var reset = (0, _useStableCallback.useStableCallback)(function () {
    activeIndexAnim.value = -1;
    spacerIndexAnim.value = -1;
    touchTranslate.value = 0;
    activeCellSize.value = -1;
    activeCellOffset.value = -1;
    setActiveKey(null);
  });
  var _props$dragHitSlop = props.dragHitSlop,
    dragHitSlop =
      _props$dragHitSlop === void 0
        ? _constants.DEFAULT_PROPS.dragHitSlop
        : _props$dragHitSlop,
    _props$scrollEnabled = props.scrollEnabled,
    scrollEnabled =
      _props$scrollEnabled === void 0
        ? _constants.DEFAULT_PROPS.scrollEnabled
        : _props$scrollEnabled,
    _props$activationDist = props.activationDistance,
    activationDistanceProp =
      _props$activationDist === void 0
        ? _constants.DEFAULT_PROPS.activationDistance
        : _props$activationDist;
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    activeKey = _useState2[0],
    setActiveKey = _useState2[1];
  var _useState3 = (0, _react.useState)(
      !propsRef.current.enableLayoutAnimationExperimental
    ),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    layoutAnimationDisabled = _useState4[0],
    setLayoutAnimationDisabled = _useState4[1];
  var keyExtractor = (0, _useStableCallback.useStableCallback)(function (
    item,
    index
  ) {
    if (!props.keyExtractor) {
      throw new Error("You must provide a keyExtractor to DraggableFlatList");
    }
    return props.keyExtractor(item, index);
  });
  var dataRef = (0, _react.useRef)(props.data);
  var dataHasChanged =
    dataRef.current.map(keyExtractor).join("") !==
    props.data.map(keyExtractor).join("");
  dataRef.current = props.data;
  if (dataHasChanged) {
    activeKey = null;
  }
  (0, _react.useEffect)(
    function () {
      if (!propsRef.current.enableLayoutAnimationExperimental) return;
      if (activeKey) {
        setLayoutAnimationDisabled(true);
      } else {
        setTimeout(function () {
          setLayoutAnimationDisabled(false);
        }, 100);
      }
    },
    [activeKey]
  );
  (0, _react.useLayoutEffect)(
    function () {
      props.data.forEach(function (d, i) {
        var key = keyExtractor(d, i);
        keyToIndexRef.current.set(key, i);
      });
    },
    [props.data, keyExtractor, keyToIndexRef]
  );
  var drag = (0, _useStableCallback.useStableCallback)(function (activeKey) {
    if (disabled.value) return;
    var index = keyToIndexRef.current.get(activeKey);
    var cellData = cellDataRef.current.get(activeKey);
    if (cellData) {
      activeCellOffset.value = cellData.measurements.offset;
      activeCellSize.value = cellData.measurements.size;
    }
    var onDragBegin = propsRef.current.onDragBegin;
    if (index !== undefined) {
      spacerIndexAnim.value = index;
      activeIndexAnim.value = index;
      setActiveKey(activeKey);
      onDragBegin == null ? void 0 : onDragBegin(index);
    }
  });
  var onContainerLayout = function onContainerLayout(_ref) {
    var layout = _ref.nativeEvent.layout;
    var width = layout.width,
      height = layout.height;
    containerSize.value = props.horizontal ? width : height;
    props.onContainerLayout == null
      ? void 0
      : props.onContainerLayout({ layout: layout, containerRef: containerRef });
  };
  var onListContentSizeChange = function onListContentSizeChange(w, h) {
    scrollViewSize.value = props.horizontal ? w : h;
    props.onContentSizeChange == null
      ? void 0
      : props.onContentSizeChange(w, h);
  };
  var onContainerTouchStart = function onContainerTouchStart() {
    if (!disabled.value) {
      isTouchActiveNative.value = true;
    }
    return false;
  };
  var onContainerTouchEnd = function onContainerTouchEnd() {
    isTouchActiveNative.value = false;
  };
  var extraData = (0, _react.useMemo)(
    function () {
      return { activeKey: activeKey, extraData: props.extraData };
    },
    [activeKey, props.extraData]
  );
  var renderItem = (0, _react.useCallback)(
    function (_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      var key = keyExtractor(item, index);
      if (index !== keyToIndexRef.current.get(key)) {
        keyToIndexRef.current.set(key, index);
      }
      return _react.default.createElement(_RowItem.default, {
        item: item,
        itemKey: key,
        renderItem: props.renderItem,
        drag: drag,
        extraData: props.extraData,
        __self: _this,
        __source: { fileName: _jsxFileName, lineNumber: 197, columnNumber: 9 },
      });
    },
    [props.renderItem, props.extraData, drag, keyExtractor]
  );
  var onRelease = (0, _useStableCallback.useStableCallback)(function (index) {
    props.onRelease == null ? void 0 : props.onRelease(index);
  });
  var onDragEnd = (0, _useStableCallback.useStableCallback)(function (_ref3) {
    var from = _ref3.from,
      to = _ref3.to;
    var onDragEnd = props.onDragEnd,
      data = props.data;
    var newData = (0, _toConsumableArray2.default)(data);
    if (from !== to) {
      newData.splice(from, 1);
      newData.splice(to, 0, data[from]);
    }
    onDragEnd == null
      ? void 0
      : onDragEnd({ from: from, to: to, data: newData });
    reset();
  });
  var onPlaceholderIndexChange = (0, _useStableCallback.useStableCallback)(
    function (index) {
      props.onPlaceholderIndexChange == null
        ? void 0
        : props.onPlaceholderIndexChange(index);
    }
  );
  (0, _reactNativeReanimated.useAnimatedReaction)(
    (function () {
      var _f = function _f() {
        return isTouchActiveNative.value;
      };
      _f._closure = { isTouchActiveNative: isTouchActiveNative };
      _f.asString =
        "function _f(){const{isTouchActiveNative}=jsThis._closure;{return isTouchActiveNative.value;}}";
      _f.__workletHash = 14702024657843;
      _f.__location =
        "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (234:4)";
      return _f;
    })(),
    (function () {
      var _f = function _f(cur, prev) {
        if (cur !== prev && !cur) {
          var hasMoved = !!touchTranslate.value;
          if (!hasMoved && activeIndexAnim.value >= 0 && !disabled.value) {
            (0, _reactNativeReanimated.runOnJS)(onRelease)(
              activeIndexAnim.value
            );
            (0, _reactNativeReanimated.runOnJS)(onDragEnd)({
              from: activeIndexAnim.value,
              to: spacerIndexAnim.value,
            });
          }
        }
      };
      _f._closure = {
        touchTranslate: touchTranslate,
        activeIndexAnim: activeIndexAnim,
        disabled: disabled,
        runOnJS: _reactNativeReanimated.runOnJS,
        onRelease: onRelease,
        onDragEnd: onDragEnd,
        spacerIndexAnim: spacerIndexAnim,
      };
      _f.asString =
        "function _f(cur,prev){const{touchTranslate,activeIndexAnim,disabled,runOnJS,onRelease,onDragEnd,spacerIndexAnim}=jsThis._closure;{if(cur!==prev&&!cur){const hasMoved=!!touchTranslate.value;if(!hasMoved&&activeIndexAnim.value>=0&&!disabled.value){runOnJS(onRelease)(activeIndexAnim.value);runOnJS(onDragEnd)({from:activeIndexAnim.value,to:spacerIndexAnim.value});}}}}";
      _f.__workletHash = 5951241873481;
      _f.__location =
        "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (237:4)";
      return _f;
    })(),
    [isTouchActiveNative, onDragEnd, onRelease]
  );
  (0, _reactNativeReanimated.useAnimatedReaction)(
    (function () {
      var _f = function _f() {
        return spacerIndexAnim.value;
      };
      _f._closure = { spacerIndexAnim: spacerIndexAnim };
      _f.asString =
        "function _f(){const{spacerIndexAnim}=jsThis._closure;{return spacerIndexAnim.value;}}";
      _f.__workletHash = 2960108028947;
      _f.__location =
        "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (253:4)";
      return _f;
    })(),
    (function () {
      var _f = function _f(cur, prev) {
        if (prev !== null && cur !== prev && cur >= 0 && prev >= 0) {
          (0, _reactNativeReanimated.runOnJS)(onPlaceholderIndexChange)(cur);
        }
      };
      _f._closure = {
        runOnJS: _reactNativeReanimated.runOnJS,
        onPlaceholderIndexChange: onPlaceholderIndexChange,
      };
      _f.asString =
        "function _f(cur,prev){const{runOnJS,onPlaceholderIndexChange}=jsThis._closure;{if(prev!==null&&cur!==prev&&cur>=0&&prev>=0){runOnJS(onPlaceholderIndexChange)(cur);}}}";
      _f.__workletHash = 16965253726735;
      _f.__location =
        "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (256:4)";
      return _f;
    })(),
    [spacerIndexAnim]
  );
  var gestureDisabled = (0, _reactNativeReanimated.useSharedValue)(false);
  var panGesture = _reactNativeGestureHandler.Gesture.Pan()
    .onBegin(
      (function () {
        var _f = function _f(evt) {
          gestureDisabled.value = disabled.value;
          if (gestureDisabled.value) return;
          panGestureState.value = evt.state;
        };
        _f._closure = {
          gestureDisabled: gestureDisabled,
          disabled: disabled,
          panGestureState: panGestureState,
        };
        _f.asString =
          "function _f(evt){const{gestureDisabled,disabled,panGestureState}=jsThis._closure;{gestureDisabled.value=disabled.value;if(gestureDisabled.value)return;panGestureState.value=evt.state;}}";
        _f.__workletHash = 17574034116918;
        _f.__location =
          "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (267:13)";
        return _f;
      })()
    )
    .onUpdate(
      (function () {
        var _f = function _f(evt) {
          if (gestureDisabled.value) return;
          panGestureState.value = evt.state;
          var translation = horizontalAnim.value
            ? evt.translationX
            : evt.translationY;
          touchTranslate.value = translation;
        };
        _f._closure = {
          gestureDisabled: gestureDisabled,
          panGestureState: panGestureState,
          horizontalAnim: horizontalAnim,
          touchTranslate: touchTranslate,
        };
        _f.asString =
          "function _f(evt){const{gestureDisabled,panGestureState,horizontalAnim,touchTranslate}=jsThis._closure;{if(gestureDisabled.value)return;panGestureState.value=evt.state;const translation=horizontalAnim.value?evt.translationX:evt.translationY;touchTranslate.value=translation;}}";
        _f.__workletHash = 5455568984874;
        _f.__location =
          "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (272:14)";
        return _f;
      })()
    )
    .onEnd(
      (function () {
        var _f = function _f(evt) {
          if (gestureDisabled.value) return;
          isTouchActiveNative.value = false;
          var translation = horizontalAnim.value
            ? evt.translationX
            : evt.translationY;
          touchTranslate.value = translation + autoScrollDistance.value;
          panGestureState.value = evt.state;
          if (activeIndexAnim.value === -1 || disabled.value) {
            touchTranslate.value = 0;
            return;
          }
          disabled.value = true;
          (0, _reactNativeReanimated.runOnJS)(onRelease)(activeIndexAnim.value);
          var springTo = placeholderOffset.value - activeCellOffset.value;
          touchTranslate.value = (0, _reactNativeReanimated.withSpring)(
            springTo,
            animationConfigRef.value,
            (function () {
              var _f = function _f() {
                (0, _reactNativeReanimated.runOnJS)(onDragEnd)({
                  from: activeIndexAnim.value,
                  to: spacerIndexAnim.value,
                });
                disabled.value = false;
              };
              _f._closure = {
                runOnJS: _reactNativeReanimated.runOnJS,
                onDragEnd: onDragEnd,
                activeIndexAnim: activeIndexAnim,
                spacerIndexAnim: spacerIndexAnim,
                disabled: disabled,
              };
              _f.asString =
                "function _f(){const{runOnJS,onDragEnd,activeIndexAnim,spacerIndexAnim,disabled}=jsThis._closure;{runOnJS(onDragEnd)({from:activeIndexAnim.value,to:spacerIndexAnim.value});disabled.value=false;}}";
              _f.__workletHash = 1618704508901;
              _f.__location =
                "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (303:8)";
              return _f;
            })()
          );
        };
        _f._closure = {
          gestureDisabled: gestureDisabled,
          isTouchActiveNative: isTouchActiveNative,
          horizontalAnim: horizontalAnim,
          touchTranslate: touchTranslate,
          autoScrollDistance: autoScrollDistance,
          panGestureState: panGestureState,
          activeIndexAnim: activeIndexAnim,
          disabled: disabled,
          runOnJS: _reactNativeReanimated.runOnJS,
          onRelease: onRelease,
          placeholderOffset: placeholderOffset,
          activeCellOffset: activeCellOffset,
          withSpring: _reactNativeReanimated.withSpring,
          animationConfigRef: animationConfigRef,
          onDragEnd: onDragEnd,
          spacerIndexAnim: spacerIndexAnim,
        };
        _f.asString =
          "function _f(evt){const{gestureDisabled,isTouchActiveNative,horizontalAnim,touchTranslate,autoScrollDistance,panGestureState,activeIndexAnim,disabled,runOnJS,onRelease,placeholderOffset,activeCellOffset,withSpring,animationConfigRef,onDragEnd,spacerIndexAnim}=jsThis._closure;{if(gestureDisabled.value)return;isTouchActiveNative.value=false;const translation=horizontalAnim.value?evt.translationX:evt.translationY;touchTranslate.value=translation+autoScrollDistance.value;panGestureState.value=evt.state;if(activeIndexAnim.value===-1||disabled.value){touchTranslate.value=0;return;}disabled.value=true;runOnJS(onRelease)(activeIndexAnim.value);const springTo=placeholderOffset.value-activeCellOffset.value;touchTranslate.value=withSpring(springTo,animationConfigRef.value,function(){runOnJS(onDragEnd)({from:activeIndexAnim.value,to:spacerIndexAnim.value});disabled.value=false;});}}";
        _f.__workletHash = 11754399665701;
        _f.__location =
          "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (280:11)";
        return _f;
      })()
    )
    .onTouchesDown(
      (function () {
        var _f = function _f() {
          (0, _reactNativeReanimated.runOnJS)(onContainerTouchStart)();
        };
        _f._closure = {
          runOnJS: _reactNativeReanimated.runOnJS,
          onContainerTouchStart: onContainerTouchStart,
        };
        _f.asString =
          "function _f(){const{runOnJS,onContainerTouchStart}=jsThis._closure;{runOnJS(onContainerTouchStart)();}}";
        _f.__workletHash = 4756906064016;
        _f.__location =
          "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (312:19)";
        return _f;
      })()
    )
    .onTouchesUp(
      (function () {
        var _f = function _f() {
          (0, _reactNativeReanimated.runOnJS)(onContainerTouchEnd)();
        };
        _f._closure = {
          runOnJS: _reactNativeReanimated.runOnJS,
          onContainerTouchEnd: onContainerTouchEnd,
        };
        _f.asString =
          "function _f(){const{runOnJS,onContainerTouchEnd}=jsThis._closure;{runOnJS(onContainerTouchEnd)();}}";
        _f.__workletHash = 9596402198608;
        _f.__location =
          "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (315:17)";
        return _f;
      })()
    );
  if (dragHitSlop) panGesture.hitSlop(dragHitSlop);
  if (activationDistanceProp) {
    var activeOffset = [-activationDistanceProp, activationDistanceProp];
    if (props.horizontal) {
      panGesture.activeOffsetX(activeOffset);
    } else {
      panGesture.activeOffsetY(activeOffset);
    }
  }
  var onScroll = (0, _useStableCallback.useStableCallback)(function (
    scrollOffset
  ) {
    props.onScrollOffsetChange == null
      ? void 0
      : props.onScrollOffsetChange(scrollOffset);
  });
  var scrollHandler = (0, _reactNativeReanimated.useAnimatedScrollHandler)(
    {
      onScroll: (function () {
        var _f = function _f(evt) {
          scrollOffset.value = horizontalAnim.value
            ? evt.contentOffset.x
            : evt.contentOffset.y;
          (0, _reactNativeReanimated.runOnJS)(onScroll)(scrollOffset.value);
        };
        _f._closure = {
          scrollOffset: scrollOffset,
          horizontalAnim: horizontalAnim,
          runOnJS: _reactNativeReanimated.runOnJS,
          onScroll: onScroll,
        };
        _f.asString =
          "function _f(evt){const{scrollOffset,horizontalAnim,runOnJS,onScroll}=jsThis._closure;{scrollOffset.value=horizontalAnim.value?evt.contentOffset.x:evt.contentOffset.y;runOnJS(onScroll)(scrollOffset.value);}}";
        _f.__workletHash = 5653789960368;
        _f.__location =
          "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/DraggableFlatList.tsx (337:16)";
        return _f;
      })(),
    },
    [horizontalAnim]
  );
  (0, _useAutoScroll.useAutoScroll)();
  var onViewableItemsChanged = (0, _useStableCallback.useStableCallback)(
    function (info) {
      var viewableIndices = info.viewableItems
        .filter(function (item) {
          return item.isViewable;
        })
        .map(function (item) {
          return item.index;
        })
        .filter(function (index) {
          return typeof index === "number";
        });
      var min = Math.min.apply(
        Math,
        (0, _toConsumableArray2.default)(viewableIndices)
      );
      var max = Math.max.apply(
        Math,
        (0, _toConsumableArray2.default)(viewableIndices)
      );
      viewableIndexMin.value = min;
      viewableIndexMax.value = max;
      props.onViewableItemsChanged == null
        ? void 0
        : props.onViewableItemsChanged(info);
    }
  );
  return _react.default.createElement(
    _draggableFlatListContext.default,
    {
      activeKey: activeKey,
      keyExtractor: keyExtractor,
      horizontal: !!props.horizontal,
      layoutAnimationDisabled: layoutAnimationDisabled,
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 365, columnNumber: 5 },
    },
    _react.default.createElement(
      _reactNativeGestureHandler.GestureDetector,
      {
        gesture: panGesture,
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 371, columnNumber: 7 },
      },
      _react.default.createElement(
        _reactNativeReanimated.default.View,
        {
          style: props.containerStyle,
          ref: containerRef,
          onLayout: onContainerLayout,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 372,
            columnNumber: 9,
          },
        },
        props.renderPlaceholder &&
          _react.default.createElement(_PlaceholderItem.default, {
            renderPlaceholder: props.renderPlaceholder,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 378,
              columnNumber: 13,
            },
          }),
        _react.default.createElement(
          AnimatedFlatList,
          (0, _extends2.default)({}, props, {
            data: props.data,
            onViewableItemsChanged: onViewableItemsChanged,
            CellRendererComponent: _CellRendererComponent.default,
            ref: flatlistRef,
            onContentSizeChange: onListContentSizeChange,
            scrollEnabled: !activeKey && scrollEnabled,
            renderItem: renderItem,
            extraData: extraData,
            keyExtractor: keyExtractor,
            onScroll: scrollHandler,
            scrollEventThrottle: 16,
            simultaneousHandlers: props.simultaneousHandlers,
            removeClippedSubviews: false,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 380,
              columnNumber: 11,
            },
          })
        ),
        !!props.onScrollOffsetChange &&
          _react.default.createElement(_ScrollOffsetListener.default, {
            onScrollOffsetChange: props.onScrollOffsetChange,
            scrollOffset: scrollOffset,
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 397,
              columnNumber: 13,
            },
          })
      )
    )
  );
}
function DraggableFlatList(props, ref) {
  return _react.default.createElement(
    _propsContext.default,
    (0, _extends2.default)({}, props, {
      __self: this,
      __source: { fileName: _jsxFileName, lineNumber: 413, columnNumber: 5 },
    }),
    _react.default.createElement(
      _animatedValueContext.default,
      {
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 414, columnNumber: 7 },
      },
      _react.default.createElement(
        _refContext.default,
        {
          flatListRef: ref,
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 415,
            columnNumber: 9,
          },
        },
        _react.default.createElement(
          MemoizedInner,
          (0, _extends2.default)({}, props, {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 416,
              columnNumber: 11,
            },
          })
        )
      )
    )
  );
}
var MemoizedInner = (0, _utils.typedMemo)(DraggableFlatListInner);
var _default = (exports.default = _react.default.forwardRef(DraggableFlatList));
//# sourceMappingURL=DraggableFlatList.js.map
