import { LocalStorageKey } from "@/config";
import { useState } from "react";

const KEY = LocalStorageKey;

const useLoginData = () => {
  const getLoginData = () => {
    const data = localStorage.getItem(KEY);
    return JSON.parse(data);
  };
  const [loginData, setLoginData] = useState(getLoginData());

  const saveLoginData = (data) => {
    localStorage.setItem(KEY, JSON.stringify(data));
    setLoginData(data);
  };

  return [loginData, saveLoginData];
};

export default useLoginData;
