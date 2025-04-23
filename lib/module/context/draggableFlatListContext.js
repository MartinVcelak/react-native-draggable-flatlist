import React, { useContext, useMemo } from "react";
const DraggableFlatListContext = /*#__PURE__*/ React.createContext(undefined);
export default function DraggableFlatListProvider({
  activeKey,
  keyExtractor,
  horizontal,
  layoutAnimationDisabled,
  children,
}) {
  const value = useMemo(
    () => ({
      activeKey,
      keyExtractor,
      horizontal,
      layoutAnimationDisabled,
    }),
    [activeKey, keyExtractor, horizontal, layoutAnimationDisabled]
  );
  return /*#__PURE__*/ React.createElement(
    DraggableFlatListContext.Provider,
    {
      value: value,
    },
    children
  );
}
export function useDraggableFlatListContext() {
  const value = useContext(DraggableFlatListContext);
  if (!value) {
    throw new Error(
      "useDraggableFlatListContext must be called within DraggableFlatListProvider"
    );
  }
  return value;
}
//# sourceMappingURL=draggableFlatListContext.js.map
