import { useLocalStorage } from "../Utils/LocalStorage";
import Input from "./Input";
import Button from "./Button";

export default function Tasks({ id, onAddTask, onRemoveTask }: any) {
  let { getById } = useLocalStorage("projects", []);
  const project = getById(id);
  const tasks = project.tasks;
  const handleAddTask = () => {
    const value = (document.getElementById("task") as HTMLInputElement)?.value;
    if (!value) return;

    if (tasks.includes(value)) {
      const dialog = document.getElementById(
        "taskAddError"
      ) as HTMLDialogElement;
      dialog.showModal();

      return;
    }
    const { updateById } = useLocalStorage("projects", []);
    const newProject = {
      ...project,
      tasks: [...project.tasks, value],
    };
    updateById(project.id, newProject);
    onAddTask(value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };
  let content = <p className="my-20 text-2xl text-stone-400">No tasks yet</p>;
  if (tasks.length > 0) {
    content = (
      <ul className="flex-between bg-slate-400 my-10 rounded-lg py-5 overflow-y-scroll h-64">
        {tasks.map((task: any) => (
          <li key={tasks.indexOf(task)}>
            <div className="flex justify-between mx-5 my-3">
              <p className="text-xl font-roboto text-justify">{task}</p>
              <Button
                className="btn btn-danger"
                onClick={() => onRemoveTask(tasks.indexOf(task))}
              >
                Clear
              </Button>
            </div>
            <hr className="w-full border-x-gray-600" />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold my-8">Tasks</h1>
        <div className="flex gap-20">
          <Input id="task" onKeyPress={handleKeyPress} />
          <button className="btn" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        {content}
      </div>
      <dialog id="taskAddError" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-red-500 ">Error!</h3>
          <p className="py-4">Task Already Exist!</p>
        </div>
      </dialog>
    </>
  );
}
