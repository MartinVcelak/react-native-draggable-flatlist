import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { typedMemo } from "../utils";
const ScrollOffsetListener = ({ scrollOffset, onScrollOffsetChange }) => {
  useAnimatedReaction(
    () => {
      return scrollOffset.value;
    },
    (cur, prev) => {
      if (cur !== prev) {
        runOnJS(onScrollOffsetChange)(cur);
      }
    },
    [scrollOffset]
  );
  return null;
};
export default typedMemo(ScrollOffsetListener);
//# sourceMappingURL=ScrollOffsetListener.js.map
