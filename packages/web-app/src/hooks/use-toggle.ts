import { useState } from 'react';

const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  // here, we freeze the array to a tuple
  return [value, toggleValue] as const;
};
export default useToggle;
