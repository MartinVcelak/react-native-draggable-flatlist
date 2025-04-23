Object.defineProperty(exports, "__esModule", { value: true });
exports.isWeb = exports.isReanimatedV2 = exports.isIOS = exports.isAndroid = exports.SCROLL_POSITION_TOLERANCE = exports.DEFAULT_PROPS = exports.DEFAULT_ANIMATION_CONFIG = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var SCROLL_POSITION_TOLERANCE = (exports.SCROLL_POSITION_TOLERANCE = 2);
var DEFAULT_ANIMATION_CONFIG = (exports.DEFAULT_ANIMATION_CONFIG = {
  damping: 20,
  mass: 0.2,
  stiffness: 100,
  overshootClamping: false,
  restSpeedThreshold: 0.2,
  restDisplacementThreshold: 0.2,
});
var DEFAULT_PROPS = (exports.DEFAULT_PROPS = {
  autoscrollThreshold: 30,
  autoscrollSpeed: 100,
  animationConfig: DEFAULT_ANIMATION_CONFIG,
  scrollEnabled: true,
  dragHitSlop: 0,
  activationDistance: 0,
  dragItemOverflow: false,
});
var isIOS = (exports.isIOS = _reactNative.Platform.OS === "ios");
var isAndroid = (exports.isAndroid = _reactNative.Platform.OS === "android");
var isWeb = (exports.isWeb = _reactNative.Platform.OS === "web");
var isReanimatedV2 = (exports.isReanimatedV2 = !!_reactNativeReanimated.useSharedValue);
if (!isReanimatedV2) {
  throw new Error(
    "Your version of react-native-reanimated is too old for react-native-draggable-flatlist!"
  );
}
//# sourceMappingURL=constants.js.map
