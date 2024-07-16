export interface MemoList {
 code: number
 memoTitle: string
 sentFrom: string
 sentTo: string
 date: Date
 attachment: 'Yes' | 'No',
 memoType: string
 action: "View more"
 message: string
 actionFilter: string
}