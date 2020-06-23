import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import { View, Text, Animated } from "react-native";

export default CircleProgress = forwardRef((props, ref) => {
  const {
    edge,
    border,
    backgroundColor = "rgba(253,171,59,0.15)",
    progressColor = "#FDAB3B",
    from = 0,
    to = 100,
    duration = 1000,
    listenValue = () => {},
    children,
  } = props;

  const animValue = new Animated.Value(from);

  const rightRotate = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["180deg", "360deg", "360deg"],
  });

  const leftRotate = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "0deg", "180deg"],
  });

  const rightOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 0.50001, 1],
    outputRange: [1, 1, 0, 0],
  });

  const leftPointOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 0.50001, 1],
    outputRange: [0, 0, 1, 1],
  });

  const rightStyles = {
    transform: [{ rotate: rightRotate }],
  };

  const leftStyles = {
    transform: [{ rotate: leftRotate }],
  };

  const start = () => {
    Animated.timing(animValue, {
      to: to / 100,
      duration: duration,
      useNativeDriver: true,
    }).start();
  };

  const renderLeft = () => {
    return (
      <Animated.View
        style={[
          {
            width: edge,
            height: edge,
          },
          leftStyles,
        ]}
      >
        <View
          style={{
            width: edge / 2,
            height: edge,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: edge,
              height: edge,
              backgroundColor: "white",
              borderRadius: edge / 2,
              overflow: "hidden",
            }}
          >
            <View style={{ flex: 1, backgroundColor: backgroundColor }} />
          </View>
          <Animated.View
            style={{
              width: border / 2,
              height: border,
              overflow: "hidden",
              position: "absolute",
              right: 0,
              bottom: 0,
              opacity: leftPointOpacity,
            }}
          >
            <View
              style={{
                width: border,
                height: border,
                borderRadius: border / 2,
                backgroundColor: progressColor,
              }}
            />
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  const renderRight = () => {
    return (
      <Animated.View
        style={[
          {
            width: edge,
            height: edge,
            position: "absolute",
            opacity: rightOpacity,
          },
          rightStyles,
        ]}
      >
        <View
          style={{
            width: edge / 2,
            height: edge,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: edge,
              height: edge,
              backgroundColor: "white",
              borderRadius: edge / 2,
              overflow: "hidden",
            }}
          >
            <View style={{ flex: 1, backgroundColor: backgroundColor }} />
          </View>
          <View
            style={{
              width: border / 2,
              height: border,
              overflow: "hidden",
              position: "absolute",
              right: 0,
              bottom: 0,
            }}
          >
            <View
              style={{
                width: border,
                height: border,
                borderRadius: border / 2,
                backgroundColor: progressColor,
              }}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderRightBG = () => {
    return (
      <View
        style={{
          width: edge / 2,
          height: edge,
          position: "absolute",
          right: 0,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            backgroundColor: progressColor,
            width: edge,
            height: edge,
            borderRadius: edge / 2,
            right: edge / 2,
          }}
        />
      </View>
    );
  };

  const renderSmallCircle = () => {
    return (
      <View
        style={{
          width: edge - border * 2,
          height: edge - border * 2,
          backgroundColor: "white",
          position: "absolute",
          borderRadius: (edge - border * 2) / 2,
          top: border,
          left: border,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundColor,
            overflow: "hidden",
          }}
        >
          {children}
        </View>
      </View>
    );
  };

  const renderStartPoint = () => {
    return (
      <View
        style={{
          width: border / 2,
          height: border,
          overflow: "hidden",
          position: "absolute",
          left: edge / 2 - border / 2,
        }}
      >
        <View
          style={{
            width: border,
            height: border,
            backgroundColor: progressColor,
            borderRadius: border / 2,
          }}
        />
      </View>
    );
  };

  animValue.addListener(({ value }) => {
    listenValue((value * 100).toFixed(0));
  });

  useImperativeHandle(ref, () => ({
    start: start,
  }));

  return (
    <View
      style={{
        width: edge,
        height: edge,
        borderRadius: edge / 2,
        backgroundColor: progressColor,
      }}
    >
      {renderLeft()}
      {renderRightBG()}
      {renderRight()}
      {renderSmallCircle()}
      {renderStartPoint()}
    </View>
  );
});
