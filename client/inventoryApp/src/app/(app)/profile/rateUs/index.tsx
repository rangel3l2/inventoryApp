import React from 'react';
import { Rating } from '@rneui/base';

interface MyComponentProps {
  initialRating: number;
  size: number;
  count: number;
  onChange: (rating: number) => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ initialRating, size, count, onChange,...props }) => {
 

  return (
<></>
  );
}


export default MyComponent;
