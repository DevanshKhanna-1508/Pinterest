import {Dimensions} from 'react-native';

const {width: deviceWidth, height: deviceHeight} = Dimensions.get ('window');

export const wp = (percentage) => {
  const width = deviceWidth;
  return percentage * deviceHeight / 100;
};

export const hp = (percentage) => {
  const height = deviceHeight;
  return percentage * height / 100;
};

// function to convert responsive values into pixel

export const getcolumn = () => {
  if (deviceWidth >= 1024)
    //desktop
    return 4;
  else if (deviceWidth >= 780)
    //Tablet
    return 3;
  else
    //mobole
    return 2;
};

export const getImageSize = (index,width,height) => {
  // if (index%4==0) {return 300;}
  // else if (index%4==1) {return 150;}
  // else if (index%4==2) {return 200;}
  // else return 300;
  if(width<height)return 300;
  if(width>height)return 250;
  else return 200;
};


export const captilize= str=>{
  return str.replace(/\b\w/g, l => l.toUpperCase());
}
