function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (n) {
          for (var e = 1; e < arguments.length; e++) {
            var t = arguments[e];
            for (var r in t) ({}.hasOwnProperty.call(t, r) && (n[r] = t[r]));
          }
          return n;
        }),
    _extends.apply(null, arguments)
  );
}
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { useAnimatedScrollHandler } from "react-native-reanimated";
import {
  NestableScrollContainerProvider,
  useSafeNestableScrollContainerContext,
} from "../context/nestableScrollContainerContext";
import { useStableCallback } from "../hooks/useStableCallback";
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
function NestableScrollContainerInner(props) {
  const {
    outerScrollOffset,
    containerSize,
    scrollViewSize,
    scrollableRef,
    outerScrollEnabled,
  } = useSafeNestableScrollContainerContext();
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      outerScrollOffset.value = contentOffset.y;
    },
  });
  const onLayout = useStableCallback((event) => {
    const {
      nativeEvent: { layout },
    } = event;
    containerSize.value = layout.height;
  });
  const onContentSizeChange = useStableCallback((w, h) => {
    var _props$onContentSizeC;
    scrollViewSize.value = h;
    (_props$onContentSizeC = props.onContentSizeChange) === null ||
    _props$onContentSizeC === void 0
      ? void 0
      : _props$onContentSizeC.call(props, w, h);
  });
  return /*#__PURE__*/ React.createElement(
    AnimatedScrollView,
    _extends({}, props, {
      onLayout: onLayout,
      onContentSizeChange: onContentSizeChange,
      scrollEnabled: outerScrollEnabled,
      ref: scrollableRef,
      scrollEventThrottle: 1,
      onScroll: onScroll,
    })
  );
}
export const NestableScrollContainer = /*#__PURE__*/ React.forwardRef(
  (props, forwardedRef) => {
    return /*#__PURE__*/ React.createElement(
      NestableScrollContainerProvider,
      {
        forwardedRef: forwardedRef || undefined,
      },
      /*#__PURE__*/ React.createElement(NestableScrollContainerInner, props)
    );
  }
);
//# sourceMappingURL=NestableScrollContainer.js.map
