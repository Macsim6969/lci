import { createAction, props } from "@ngrx/store";
import { MemoList } from "../../modules/memo/@shared/interfaces/memo.interface";

const MEMODATA = 'MEMODATA';

export const sendMemoData = createAction(
MEMODATA,
props<{data: MemoList[]}>()
)