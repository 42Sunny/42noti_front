export const handleKRDiffTime = (stringDate: string): Date => {
  //js 의 new Date 자체에서 로컬시간으로 변경해서 + 9 시간 해주기 때문에 -9시간 해서 보내줌
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  return new Date(new Date(stringDate).getTime() - KR_TIME_DIFF);
};
