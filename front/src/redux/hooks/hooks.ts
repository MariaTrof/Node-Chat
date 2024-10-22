import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store"; // путь к вашему store

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (selector: (state: RootState) => any) =>
  useSelector(selector);
