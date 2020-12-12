import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";

import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Text,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from "react-native-svg";

function Mountain() {
  // TODOS
  // check how many days the month has 
  // render the day based on the number of months (remove polygons if necessary)
  // create the mood - color array 

  const [polygons, setPolygons] = useState(
   [
   {
      "id":1,
      "d":"M38.5 878.5L1.5 1281.5 109.5 929.5 38.5 878.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":63,
         "y":990,
         "fill":"black"
      }
   },
   {
      "id":2,
      "d":"M1.5 1281.5L109.7 929.9 135.7 1283 1.5 1281.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":80,
         "y":1200,
         "fill":"black"
      }
   },
   {
      "id":3,
      "d":"M109.7 929.9L246 1020.4 135.7 1283 109.7 929.9z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":170,
         "y":1100,
         "fill":"black"
      }
   },
   {
      "id":4,
      "d":"M246 1020.4L353.1 1279.8 135.7 1283 246 1020.4z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":240,
         "y":1220,
         "fill":"black"
      }
   },
   {
      "id":5,
      "d":"M348.8 915.8L312 1180.2 353.1 1279.8 454.7 1089.1 348.8 915.8z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":380,
         "y":1120,
         "fill":"black"
      }
   },
   {
      "id":6,
      "d":"M353.1 1279.8L543.4 1279.8 543.4 922.6 353.1 1279.8z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":480,
         "y":1190,
         "fill":"black"
      }
   },
   {
      "id":7,
      "d":"M543.4 1009L543.4 1280 621.2 1280 676.8 1107.8 543.4 1009z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeMiterlimit":"10",
      "strokeWidth":"3px",
      "day":{
         "x":600,
         "y":1180,
         "fill":"black"
      }
   },
   {
      "id":8,
      "d":"M676.8 1107.8L766.9 1175.2 771.3 1283 621.2 1280 676.8 1107.8z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":700,
         "y":1230,
         "fill":"black"
      }
   },
   {
      "id":9,
      "d":"M857.5 1281.5L770.8 1283 767.3 1175.4 935.5 997.3 857.5 1281.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":820,
         "y":1230,
         "fill":"black"
      }
   },
   {
      "id":10,
      "d":"M935.5 997.3L958.5 896.5 1021.5 1281.5 857.5 1281.5 935.5 997.3z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":940,
         "y":1230,
         "fill":"black"
      }
   },
   {
      "id":11,
      "d":"M882.1 865.9L935.5 997.3 767.3 1175.4 844.7 935.5 882.1 865.9z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":880,
         "y":1000,
         "fill":"black"
      }
   },
   {
      "id":12,
      "d":"M767.3 1175.4L844.7 935.5 543.4 1008.3 767.3 1175.4z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":720,
         "y":1060,
         "fill":"black"
      }
   },
   {
      "id":13,
      "d":"M576.7 784.3L678.8 975.6 844.7 935.5 576.7 784.3z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":710,
         "y":930,
         "fill":"black"
      }
   },
   {
      "id":14,
      "d":"M543.4 1008.3L678.8 975.6 576.7 784.3 543.4 922.6 543.4 1008.3z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":590,
         "y":940,
         "fill":"black"
      }
   },
   {
      "id":15,
      "d":"M348.8 915.8L441.5 771.5 454.7 1089.1 348.8 915.8z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":400,
         "y":940,
         "fill":"black"
      }
   },
   {
      "id":16,
      "d":"M348.8 915.8L312 1180.2 246 1020.4 109.7 929.9 348.8 915.8z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         "x":260,
         "y":990,
         "fill":"black"
      }
   },
   {
      "id":17,
      "d":"M109.8 929.7L131.2 735.6 275.8 788 348.8 916.2 109.8 929.7z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeMiterlimit":"10",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":18,
      "d":"M130.9 735L149.8 567.3 274.3 785.9 130.9 735z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":19,
      "d":"M286.7 338.2L149.8 567.3 235.1 716.8 286.7 338.2z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":20,
      "d":"M286.7 338.2L348.8 915.8 235.1 716.8 286.7 338.2z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":21,
      "d":"M309.2 547.4L348.8 915.8 533.5 626.5 309.2 547.4z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":22,
      "d":"M533.5 626.5L441.5 771.5 454.5 1088.4 543.4 922.2 576.8 784.4 584.5 732.5 533.5 626.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeMiterlimit":"10",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":23,
      "d":"M576.7 784.3L844.7 935.5 754.8 804.7 710.7 688.5 584.5 732.5 576.7 784.3z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":24,
      "d":"M728 629.5L849.9 710.9 882.1 865.9 844.7 935.5 754.8 804.7 728 629.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":25,
      "d":"M633.5 476.2L533.5 626.5 584.5 732.5 710.7 688.5 633.5 476.2z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":26,
      "d":"M754.8 804.7L688 368.5 633.5 476.2 754.8 804.7z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":27,
      "d":"M309.2 547.4L533.5 626.5 633.5 476 487 436.5 309.2 547.4z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":28,
      "d":"M559 249.5L632.4 478 500 440.5 494 120.5 559 249.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":29,
      "d":"M309.2 547.4L392 246.5 500 511.5 309.2 547.4z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":30,
      "d":"M398 268.5L417 208.5 500 177.5 500 447.5 500 511.5 398 268.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   },
   {
      "id":31,
      "d":"M442 218.5L408 238.5 480 1.5 494.2 121.6 494 172.5 494 180.5 442 218.5z",
      "fill":"#fff",
      "stroke":"#000",
      "strokeLinecap":"round",
      "strokeLinejoin":"round",
      "strokeWidth":"3px",
      "day":{
         
      }
   }
]
  )

  const markComplete=(polygon)=>{
    setPolygons(
      [...polygons.filter(p => p.id!==polygon.id),
        {...polygon,
          fill: "red",
          day: polygon.day?{
            x:polygon.day.x,
            y:polygon.day.y,
            fill:"white"
          }:{}
        }
      ]);

    // console.log([...polygons.filter(p => p.id===polygon.id)]);
    console.log(polygon.id);
  }

  return (
    <View style={styles.container}>
        <Svg viewBox="0 0 1023 1284.5">
          
          {polygons.map((polygon) => <G key={polygon.id}>
              <Path 
              {...polygon}
              onPressIn={() => markComplete(polygon)}
              />
              { polygon.day?
              <Text
              x={polygon.day.x}
              y={polygon.day.y}
              fill={polygon.day.fill}
              fontSize="50"
              fontWeight="bold"
              textAnchor="middle">
              {polygon.id}
              </Text>
              :<></>}
            </G>
          )}
        </Svg>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

export default Mountain;