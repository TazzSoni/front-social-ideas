import React, { forwardRef } from "react";

export const BaseContainer = forwardRef(
  (
    {
      style,
      center,
      children,
      spaceBetween,
      direction = "row",
      spaceChildren,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexDirection: direction,
          justifyContent: spaceBetween ? "space-between" : null,
          margin: center ? "auto" : null,
          ...style,
        }}
        {...props}
      >
        {spaceChildren ? (
          <DirectionSpacer direction={direction} space={spaceChildren}>
            {children}
          </DirectionSpacer>
        ) : (
          children
        )}
      </div>
    );
  }
);

export const HContainer = forwardRef(({ ...props }, ref) => {
  return <BaseContainer ref={ref} {...props} direction={"row"} />;
});

export const VContainer = forwardRef(({ ...props }, ref) => {
  return <BaseContainer ref={ref} {...props} direction={"column"} />;
});

// TODO atomize this component
const DirectionSpacer = ({ children, direction, space }) => {
  const spaceProperty = direction === "row" ? "marginRight" : "marginTop";
  return (
    <>
      {React.Children.toArray(children).map((child, index) => (
        <div key={index} style={{ [spaceProperty]: space }}>
          {child}
        </div>
      ))}
    </>
  );
};
