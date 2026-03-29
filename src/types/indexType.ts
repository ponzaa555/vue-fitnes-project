
export interface  WorkOutPlan{
    [Key : number] : DayPlain
}

export interface DayPlain{
    warmup : Exercise[],
    workout : Exercise[]
}

export interface Exercise {
    name : string,
    sets : number,
    reps : number
}

export interface ExerciseDes{
    [Key: string]:string
}