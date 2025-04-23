var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestableDraggableFlatList = void 0;
var _extends2 = _interopRequireDefault(
  require("@babel/runtime/helpers/extends")
);
var _asyncToGenerator2 = _interopRequireDefault(
  require("@babel/runtime/helpers/asyncToGenerator")
);
var _slicedToArray2 = _interopRequireDefault(
  require("@babel/runtime/helpers/slicedToArray")
);
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _DraggableFlatList = _interopRequireDefault(
  require("../components/DraggableFlatList")
);
var _nestableScrollContainerContext = require("../context/nestableScrollContainerContext");
var _useNestedAutoScroll = require("../hooks/useNestedAutoScroll");
var _useStableCallback = require("../hooks/useStableCallback");
var _jsxFileName =
  "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/NestableDraggableFlatList.tsx";
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
function NestableDraggableFlatListInner(props, ref) {
  var hasSuppressedWarnings = (0, _react.useRef)(false);
  if (!hasSuppressedWarnings.current) {
    _reactNative.LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing",
    ]);
    console.reportErrorsAsExceptions = false;
    hasSuppressedWarnings.current = true;
  }
  var _useSafeNestableScrol = (0,
    _nestableScrollContainerContext.useSafeNestableScrollContainerContext)(),
    scrollableRef = _useSafeNestableScrol.scrollableRef,
    outerScrollOffset = _useSafeNestableScrol.outerScrollOffset,
    setOuterScrollEnabled = _useSafeNestableScrol.setOuterScrollEnabled;
  var listVerticalOffset = (0, _reactNativeReanimated.useSharedValue)(0);
  var _useState = (0, _react.useState)({}),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    animVals = _useState2[0],
    setAnimVals = _useState2[1];
  var defaultHoverOffset = (0, _reactNativeReanimated.useSharedValue)(0);
  var _useState3 = (0, _react.useState)(defaultHoverOffset),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    listHoverOffset = _useState4[0],
    setListHoverOffset = _useState4[1];
  var hoverOffset = (0, _reactNativeReanimated.useDerivedValue)(
    (function () {
      var _f = function _f() {
        return listHoverOffset.value + listVerticalOffset.value;
      };
      _f._closure = {
        listHoverOffset: listHoverOffset,
        listVerticalOffset: listVerticalOffset,
      };
      _f.asString =
        "function _f(){const{listHoverOffset,listVerticalOffset}=jsThis._closure;{return listHoverOffset.value+listVerticalOffset.value;}}";
      _f.__workletHash = 4066479402801;
      _f.__location =
        "/Users/Martin/dev/forks/react-native-draggable-flatlist/src/components/NestableDraggableFlatList.tsx (41:38)";
      return _f;
    })(),
    [listHoverOffset]
  );
  (0, _useNestedAutoScroll.useNestedAutoScroll)(
    Object.assign({}, animVals, { hoverOffset: hoverOffset })
  );
  var onListContainerLayout = (0, _useStableCallback.useStableCallback)(
    (function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (_ref) {
        var containerRef = _ref.containerRef;
        var nodeHandle = (0, _reactNative.findNodeHandle)(
          scrollableRef.current
        );
        var onSuccess = function onSuccess(_x, y) {
          listVerticalOffset.value = y;
        };
        var onFail = function onFail() {
          console.log("## nested draggable list measure fail");
        };
        containerRef.current.measureLayout(nodeHandle, onSuccess, onFail);
      });
      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    })()
  );
  var onDragBegin = (0, _useStableCallback.useStableCallback)(function (
    params
  ) {
    setOuterScrollEnabled(false);
    props.onDragBegin == null ? void 0 : props.onDragBegin(params);
  });
  var onDragEnd = (0, _useStableCallback.useStableCallback)(function (params) {
    setOuterScrollEnabled(true);
    props.onDragEnd == null ? void 0 : props.onDragEnd(params);
  });
  var onAnimValInit = (0, _useStableCallback.useStableCallback)(function (
    params
  ) {
    setListHoverOffset(params.hoverOffset);
    setAnimVals(Object.assign({}, params, { hoverOffset: hoverOffset }));
    props.onAnimValInit == null ? void 0 : props.onAnimValInit(params);
  });
  return _react.default.createElement(
    _DraggableFlatList.default,
    (0, _extends2.default)(
      {
        ref: ref,
        onContainerLayout: onListContainerLayout,
        activationDistance: props.activationDistance || 20,
        scrollEnabled: false,
      },
      props,
      {
        outerScrollOffset: outerScrollOffset,
        onDragBegin: onDragBegin,
        onDragEnd: onDragEnd,
        onAnimValInit: onAnimValInit,
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 89, columnNumber: 5 },
      }
    )
  );
}
var NestableDraggableFlatList = (exports.NestableDraggableFlatList = _react.default.forwardRef(
  NestableDraggableFlatListInner
));
//# sourceMappingURL=NestableDraggableFlatList.js.map
