# rn-multi-progress

React Native Multi Progress

Usage:
<CircleProgress
        ref={ref}
        edge={300}
        border={50}
        listenValue={listenValue}>
{children}
</CircleProgress>

Props:
edge:number //Diameter
border:number //border
backgroundColor:string // default color
progressColor:string // progress color
from:number // min value(%)
to:number // max value(%)
duration:number // duration from min to max
listenValue:function // callback function return value while animation
children: ReactElement // View inside progress
