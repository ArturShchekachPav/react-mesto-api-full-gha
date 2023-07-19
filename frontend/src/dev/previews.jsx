import React from 'react';
import {
  ComponentPreview,
  Previews
} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import InfoTooltipPopup from '../components/InfoTooltipPopup';
import Register from '../components/Register';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}> <ComponentPreview path="/InfoTooltipPopup"> <InfoTooltipPopup/>
    </ComponentPreview> <ComponentPreview path="/Register"> <Register/> </ComponentPreview> </Previews>
  );
};

export default ComponentPreviews;
