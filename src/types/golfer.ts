export interface Golfer {
  firstName: string;
  lastName: string;
  id: number;
  quota1: number;
  quota2: number;
  quota3: number;
  quota4: number;
  quota5: number;
  quota6: number;
  average: number;
  guuid?: string;
  auth: boolean;
  pastScores: string [];
}