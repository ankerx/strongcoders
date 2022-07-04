export interface ILoginData {
  email: string;
  password: string;
}
export interface IRegisterData extends ILoginData {
  name: string;
}

type Exercise = {
  exerciseName: string;
  sets: number;
  reps: number;
};
export interface IWorkoutData {
  name: string;
  desc: string;
  level: string;
  username: string;
  exercises: Exercise[];
}
