export type todos = {
    todo:string,
    isCompleted:boolean
  }

export type card = {
    title: string;
    todos: todos[];
}