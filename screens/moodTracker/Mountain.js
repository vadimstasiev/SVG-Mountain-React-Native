import React, { useState, useEffect } from "react";
import { View } from "react-native";

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
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1023 1284.5">
      <G data-name="Layer 2">
        <G data-name="mood tracker">
          <Path
            fill="#ccc"
            stroke="#000"
            onPress={() => {
              console.log("here", this);
            }}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M309.18 547.4l224.32 79.1 99.96-150.47L487 436.5 309.18 547.4z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M442 218.5l-34 20 72-237 14.21 120.12-.21 50.88v8l-52 38z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M398 268.5l19-60 83-31v334l-102-243z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M309.18 547.4L392 246.5l108 265-190.82 35.9z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M559 249.5l73.36 228.49L500 440.5l-6-320 65 129z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M754.75 804.65L688 368.5l-54.45 107.74 121.2 328.41z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M633.55 476.24L533.5 626.5l51 106 126.18-43.97-77.13-212.29z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M728 629.5l121.91 81.41 32.17 154.98-37.42 69.58-89.91-130.82L728 629.5z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M576.71 784.33l267.95 151.14-89.91-130.82-44.07-116.12L584.5 732.5l-7.79 51.83z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeMiterlimit={10}
            strokeWidth={3}
            d="M533.5 626.5l-92 145 12.95 316.86 88.95-166.18 33.35-137.74 7.75-51.94-51-106z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M309.18 547.4l39.63 368.44L533.5 626.5l-224.32-79.1z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M286.67 338.16l62.14 577.68-113.66-199.02 51.52-378.66z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M286.67 338.16L149.75 567.27l85.4 149.55 51.52-378.66z"
          />
          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M130.89 735.03l18.86-167.76 124.57 218.67-143.43-50.91z"
          />

          <Path
            fill="#fff"
            stroke="#000"
            strokeMiterlimit={10}
            strokeWidth={3}
            d="M109.77 929.66l21.4-194.08 144.63 52.41 73.02 128.2-239.05 13.47z"
          />

          <Path
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M348.81 915.84l-36.83 264.38-65.94-159.78-136.33-90.51 239.1-14.09z"
          />

          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M348.81 915.84L441.5 771.5l13.22 317.57-105.91-173.23z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M543.4 1008.3l135.36-32.72-102.05-191.25-33.31 138.28v85.69z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M576.71 784.33l102.05 191.25 165.9-40.11-267.95-151.14z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M767.27 1175.36l77.39-239.89-301.26 72.83 223.87 167.06z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M882.08 865.89l53.45 131.39-168.26 178.08 77.39-239.89 37.42-69.58z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M935.53 997.28L958.5 896.5l63 385h-164l78.03-284.22z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M857.5 1281.5l-86.72 1.5-3.51-107.64 168.26-178.08-78.03 284.22z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M676.76 1107.82l90.12 67.37 4.45 107.79-150.1-2.99 55.53-172.17z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeMiterlimit={10}
              strokeWidth={3}
              d="M543.4 1009.01v270.98h77.83l55.53-172.17-133.36-98.81z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M353.09 1279.83H543.4V922.61l-190.31 357.22z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M348.81 915.84l-36.83 264.38 41.11 99.61 101.63-190.76-105.91-173.23z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M246.04 1020.44l107.05 259.39-217.36 3.17 110.31-262.56z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M109.71 929.93l136.33 90.51L135.73 1283l-26.02-353.07z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M1.5 1281.5l108.21-351.57L135.73 1283 1.5 1281.5z"
            />
          </G>
          <G>
            <Path
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M38.5 878.5l-37 403 108-352-71-51z"
            />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default Mountain;
