import { Dispatch, SetStateAction, useState } from "react";

type useInputReturnType = [string, Dispatch<SetStateAction<string>>, (e: React.ChangeEvent<HTMLInputElement>) => void];

function useInput(initialState: string): useInputReturnType {
  const [value, setValue] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const changedValue = e.target.value;
    setValue(changedValue);
  };

  return [value, setValue, handleChange];
}

export default useInput;
