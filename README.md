# Astigmatism

A script I wrote to emulate a light trails effect in Adobe After Effects.\
Here's a demo [video](https://youtu.be/mX5hkP6o_e4) that I did, which utilizes the script.

## Description

Inspired by Max Cooper's Resynthesis [video](https://www.youtube.com/watch?v=Kpm1l0HfkV0), I wanted to emulate the light trails effect which is featured throughout the video. I noticed the effect was pretty similar to what people with [astigmatism](https://en.wikipedia.org/wiki/Astigmatism) see, thus I decided to name the project "Astigmatism". Although I've written the script that is needed to emulate the effect, you will need a solid understanding of Adobe After Effects in order to follow up, since a good part of achieving the effect is to experiment with the layers.\
Also, you will need images / videos that were taken at night with low lighting, since the multiple layers being rendered with the script won't translate well with footage that has too much light.

## Installation

- Add the source material (image or video) that you'll use for the effect. Rename it to MAIN.

- Add a Lumetri Color effect to MAIN, to increase the contrast (The Lumetri effect will come in handy later).

- Change the blending mode of MAIN to screen, also check the 3D layer checkbox.

- Add a Luma Key effect to MAIN to further increase contrast.

- Add a Camera layer and a Null layer to the composition. Rename the Null layer to Controls.

- In Controls, add a slider effect, and rename the slider to Z-dist.

- Duplicate MAIN and rename the duplicate to Copy.

- On the Position property of the Copy layer, Alt+Click the stopwatch symbol to enable JS expressions.\
  Add this expression:

```
thisComp.layer("Controls").effect("Z-dist")("Slider");
[position[0],position[1],z*(index-3)]
```

This expression makes possible for the frames to take values from the Z-dist slider on the Controls layer.\
The array below manipulates 3 dimensions [x, y and z].

Now the composition should look like this:

![Initial composition](https://i.imgur.com/T044oor.png)

- Add 3 more slider effects on Controls layer, named Z-Rot, Z-Rot Start and Z-Rot End.\
  As you can guess from the names, they respectively control the rotation, when the rotation starts and when it ends.

- On the Z Rotation property of the Copy layer, Alt+Click the stopwatch symbol to enable JS expressions again.\
  Add the code below:

```
zRot = thisComp.layer("Controls").effect("Z-Rot")("Slider");
zRotStart = thisComp.layer("Controls").effect("Z-Rot Start")("Slider");
zRotEnd = thisComp.layer("Controls").effect("Z-Rot End")("Slider");
laynum = index - 2;

if (laynum <= zRotStart)
	0
 else if (laynum >= zRotStart && laynum <= zRotStart +zRot)
 	(Math.pow((laynum-zRotStart),2) + (laynum-zRotStart))/2
 else if (laynum >= zRotStart + zRot && laynum <= zRotEnd)
    	zRot*(laynum-zRotStart-zRot) + (Math.pow(zRot,2)+zRot)/2
 else if (laynum >= zRotEnd && laynum <= zRotEnd + zRot)
    	zRot*(laynum-zRotStart-zRot) + (Math.pow(zRot,2)+zRot)/2 - (Math.pow((laynum-zRotEnd),2) + (laynum-zRotEnd))/2
 else if (laynum >= zRotEnd + zRot)
    	zRot*(zRotEnd-zRotStart)
```

On the first section of the code, each expression makes possible for the layers to get the values from the sliders with the same names on the Controls layer. The last one tells us the exact position of each layer in the sequence.\
On the second section, I based the statement off of this equation:

![Triangular Number Equation](https://i.imgur.com/Powv4Im.png)

By using this equation, the code can pinpoint where the layers are during the animation and the rotation increase or decrease will be gradual.\
So, before zRotStart, the rotation remains 0.\
If the layer is between zRotStart and zRotStart + zRot, the rotation will slowly increase.\
If the layer is between zRotStart + ZRot and ZRotEnd, the rotation will increase constantly.\
If the layer is between zRotEnd and zRotEnd + zRot, the rotation will decrease gradually.\
Finally, beyond zRotEnd + zRot, the rotation stays fixed as before.

Now, the composition should look something like this:

![Final composition](https://i.imgur.com/N1CKHlW.png)

- Add 2 more slider effects on Controls, rename them to Highlights and Shadows.\
  The Controls layer should look like this now:

![Controls layer](https://i.imgur.com/VDkz2Lh.png)

- Keyframe Lumetri color Tone properties with the sliders (Contrast, Highlights and Whites with Highlights slider, Shadows with Shadows slider).

This pretty much sums up how to set up the code for the light trails effect. Now, all that remains is to duplicate the Copy layer as much as you want and experiment with the sliders, blending modes and opacity of the copied layers.
