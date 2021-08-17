/* The comments below are short descriptions, read the README to understand how
the implementation of the code actually happens in Adobe AE */

//This statement makes possible for z to take values from the Controls slider layer
z = thisComp.layer("Controls").effect("Z-dist")("Slider");

//Since there are 3 dimensions, an array is needed to manipulate all 3 dimensions, x,y and z
[position[0], position[1], z * (index - 3)];

/*These variables are the slider functions that are added on the Controls layer
connected to the source image / video on the timeline  */
zRot = thisComp.layer("Controls").effect("Z-Rot")("Slider");
zRotStart = thisComp.layer("Controls").effect("Z-Rot Start")("Slider");
zRotEnd = thisComp.layer("Controls").effect("Z-Rot End")("Slider");
laynum = index - 2;

/* This part of the code detects where the copy layers of the main footage are at the timeline and
manipulates the rotation of each layer gradually, either increasing or decreasing the speed of the rotation
making the animation much smoother */
if (laynum <= zRotStart) 0;
else if (laynum >= zRotStart && laynum <= zRotStart + zRot)
  (Math.pow(laynum - zRotStart, 2) + (laynum - zRotStart)) / 2;
else if (laynum >= zRotStart + zRot && laynum <= zRotEnd)
  zRot * (laynum - zRotStart - zRot) + (Math.pow(zRot, 2) + zRot) / 2;
else if (laynum >= zRotEnd && laynum <= zRotEnd + zRot)
  zRot * (laynum - zRotStart - zRot) +
    (Math.pow(zRot, 2) + zRot) / 2 -
    (Math.pow(laynum - zRotEnd, 2) + (laynum - zRotEnd)) / 2;
else if (laynum >= zRotEnd + zRot) zRot * (zRotEnd - zRotStart);
